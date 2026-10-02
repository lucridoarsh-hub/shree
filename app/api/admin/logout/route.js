import { NextResponse } from "next/server";
import { clearedCookie } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(clearedCookie.name, "", clearedCookie.options);
  return res;
}
