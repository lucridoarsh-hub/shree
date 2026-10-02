import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { rateLimit, clientIp } from "@/lib/auth";

const clip = (v, n) => String(v ?? "").trim().slice(0, n);
const TOPICS = ["Store enquiry", "Order or delivery", "Gold scheme", "Other"];

export async function POST(req) {
  if (!rateLimit(`contact:${clientIp(req)}`, 5, 10 * 60 * 1000)) return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  const b = await req.json().catch(() => ({}));
  if (b.website) return NextResponse.json({ ok: true }); // honeypot filled by bots
  const doc = { name: clip(b.name, 100), email: clip(b.email, 150), phone: clip(b.phone, 30), topic: TOPICS.includes(b.topic) ? b.topic : "Other", message: clip(b.message, 3000) };
  if (!doc.name || !doc.message || !/^\S+@\S+\.\S+$/.test(doc.email)) return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  await (await getDb()).collection("messages").insertOne({ ...doc, read: false, createdAt: new Date() });
  return NextResponse.json({ ok: true });
}
