import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { rateLimit, clientIp } from "@/lib/auth";

export async function POST(req) {
  if (!rateLimit(`sub:${clientIp(req)}`, 5, 10 * 60 * 1000)) return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  const b = await req.json().catch(() => ({}));
  const email = String(b.email || "").trim().toLowerCase().slice(0, 150);
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  await (await getDb()).collection("subscribers").updateOne({ email }, { $setOnInsert: { email, createdAt: new Date() } }, { upsert: true });
  return NextResponse.json({ ok: true });
}
