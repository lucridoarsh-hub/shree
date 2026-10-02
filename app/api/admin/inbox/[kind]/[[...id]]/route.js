import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { guard, json } from "@/lib/api";

const KINDS = ["messages", "subscribers"];

async function setup(req, params) {
  const denied = await guard(req);
  if (denied) return { denied };
  const { kind, id } = await params;
  if (!KINDS.includes(kind)) return { denied: json({ error: "Unknown" }, 404) };
  if (id?.[0] && !ObjectId.isValid(id[0])) return { denied: json({ error: "Bad id" }, 400) };
  return { col: (await getDb()).collection(kind), oid: id?.[0] && new ObjectId(id[0]) };
}

export async function GET(req, { params }) {
  const s = await setup(req, params);
  if (s.denied) return s.denied;
  const rows = await s.col.find({}).sort({ createdAt: -1 }).limit(1000).toArray();
  return json(rows.map((d) => ({ ...d, _id: String(d._id) })));
}

// Mark a message read / unread.
export async function PUT(req, { params }) {
  const s = await setup(req, params);
  if (s.denied) return s.denied;
  if (!s.oid) return json({ error: "Missing id" }, 400);
  const body = await req.json().catch(() => ({}));
  await s.col.updateOne({ _id: s.oid }, { $set: { read: !!body.read } });
  return json({ ok: true });
}

export async function DELETE(req, { params }) {
  const s = await setup(req, params);
  if (s.denied) return s.denied;
  if (!s.oid) return json({ error: "Missing id" }, 400);
  await s.col.deleteOne({ _id: s.oid });
  return json({ ok: true });
}
