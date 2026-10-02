import { NextResponse } from "next/server";
import { isAdmin } from "./auth";

export const json = (data, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });

// Guards admin API routes: must be logged in, and mutating calls must come from our own origin.
export async function guard(req) {
  if (!(await isAdmin())) return json({ error: "Please log in again." }, 401);
  if (req.method !== "GET") {
    const origin = req.headers.get("origin");
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    if (origin && new URL(origin).host !== host) return json({ error: "Bad origin" }, 403);
  }
  return null;
}
