import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { resources } from "@/lib/schema";
import { sanitize, makeSlug } from "@/lib/sanitize";
import { guard, json } from "@/lib/api";

const serialize = (d) => ({ ...d, _id: String(d._id) });

async function setup(req, params) {
  const denied = await guard(req);
  if (denied) return { denied };
  const { resource, id } = await params;
  if (!Object.hasOwn(resources, resource)) return { denied: json({ error: "Unknown resource" }, 404) };
  const oid = id?.[0];
  if (oid && !ObjectId.isValid(oid)) return { denied: json({ error: "Bad id" }, 400) };
  const def = resources[resource];
  const col = (await getDb()).collection(resource);
  return { def, col, resource, oid: oid && new ObjectId(oid) };
}

async function uniqueSlug(col, base, exceptId) {
  let slug = base;
  for (let i = 2; await col.findOne({ slug, ...(exceptId ? { _id: { $ne: exceptId } } : {}) }, { projection: { _id: 1 } }); i++) slug = `${base}-${i}`;
  return slug;
}

async function checkRefs(def, data) {
  const db = await getDb();
  for (const f of def.fields) {
    if (f.type === "ref" && data[f.name]) {
      if (!(await db.collection(f.ref).findOne({ slug: data[f.name] }, { projection: { _id: 1 } }))) return `${f.label} does not exist`;
    }
  }
  return null;
}

export async function GET(req, { params }) {
  const s = await setup(req, params);
  if (s.denied) return s.denied;
  const rows = await s.col.find({}).sort(s.def.sort).toArray();
  return json(rows.map(serialize));
}

export async function POST(req, { params }) {
  const s = await setup(req, params);
  if (s.denied) return s.denied;
  const body = await req.json().catch(() => null);
  if (!body) return json({ error: "Invalid request" }, 400);
  const fields = s.def.fields.map((f) => (f.type === "ref" ? { ...f, type: "text" } : f));
  const { data, error } = sanitize(fields, body);
  if (error) return json({ error }, 400);
  const refErr = await checkRefs(s.def, data);
  if (refErr) return json({ error: refErr }, 400);
  if (s.def.slugFrom) data.slug = await uniqueSlug(s.col, makeSlug(body.slug || data[s.def.slugFrom]));
  const now = new Date();
  const r = await s.col.insertOne({ ...data, createdAt: now, updatedAt: now });
  return json(serialize({ ...data, _id: r.insertedId }), 201);
}

export async function PUT(req, { params }) {
  const s = await setup(req, params);
  if (s.denied) return s.denied;
  if (!s.oid) return json({ error: "Missing id" }, 400);
  const body = await req.json().catch(() => null);
  if (!body) return json({ error: "Invalid request" }, 400);
  const fields = s.def.fields.map((f) => (f.type === "ref" ? { ...f, type: "text" } : f));
  const { data, error } = sanitize(fields, body);
  if (error) return json({ error }, 400);
  const refErr = await checkRefs(s.def, data);
  if (refErr) return json({ error: refErr }, 400);
  const r = await s.col.findOneAndUpdate({ _id: s.oid }, { $set: { ...data, updatedAt: new Date() } }, { returnDocument: "after" });
  if (!r) return json({ error: "Not found" }, 404);
  return json(serialize(r));
}

export async function DELETE(req, { params }) {
  const s = await setup(req, params);
  if (s.denied) return s.denied;
  if (!s.oid) return json({ error: "Missing id" }, 400);
  if (s.resource === "categories") {
    const doc = await s.col.findOne({ _id: s.oid });
    const used = doc && (await (await getDb()).collection("products").countDocuments({ collection: doc.slug }));
    if (used) return json({ error: `This category still has ${used} product(s). Move or delete them first.` }, 409);
  }
  await s.col.deleteOne({ _id: s.oid });
  return json({ ok: true });
}
