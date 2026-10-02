import { NextResponse } from "next/server";
import { checkCredentials, sessionCookie, rateLimit, clientIp } from "@/lib/auth";

export async function POST(req) {
  if (!rateLimit(`login:${clientIp(req)}`, 8, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  if (!checkCredentials(String(body.username || ""), String(body.password || ""))) {
    return NextResponse.json({ error: "Wrong username or password." }, { status: 401 });
  }
  const secure = (req.headers.get("x-forwarded-proto") || new URL(req.url).protocol.replace(":", "")) === "https";
  const c = sessionCookie(secure);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(c.name, c.value, c.options);
  return res;
}
