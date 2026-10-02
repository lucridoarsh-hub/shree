import { getDb } from "@/lib/mongo";
import { settingsFields, settingsDefaults } from "@/lib/schema";
import { sanitize } from "@/lib/sanitize";
import { guard, json } from "@/lib/api";

export async function GET(req) {
  const denied = await guard(req);
  if (denied) return denied;
  const doc = (await (await getDb()).collection("settings").findOne({ _id: "site" })) || {};
  const { _id, updatedAt, ...rest } = doc;
  return json({ ...settingsDefaults, ...rest });
}

export async function PUT(req) {
  const denied = await guard(req);
  if (denied) return denied;
  const body = await req.json().catch(() => null);
  if (!body) return json({ error: "Invalid request" }, 400);
  const { data, error } = sanitize(settingsFields, body);
  if (error) return json({ error }, 400);
  await (await getDb()).collection("settings").updateOne({ _id: "site" }, { $set: { ...data, updatedAt: new Date() } }, { upsert: true });
  return json({ ok: true });
}
