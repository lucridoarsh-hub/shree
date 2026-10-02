import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "ss_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

const secret = () => {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) throw new Error("SESSION_SECRET must be set (16+ chars)");
  return s;
};
const sign = (v) => crypto.createHmac("sha256", secret()).update(v).digest("hex");
const sha = (v) => crypto.createHash("sha256").update(String(v)).digest();

export function checkCredentials(user, pass) {
  const u = process.env.ADMIN_USER;
  const p = process.env.ADMIN_PASSWORD;
  if (!u || !p) return false;
  // Compare hashes so length differences do not leak and timing stays constant.
  const a = crypto.timingSafeEqual(sha(user), sha(u));
  const b = crypto.timingSafeEqual(sha(pass), sha(p));
  return a && b;
}

export const sessionCookie = (secure) => {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  return { name: COOKIE, value: `${exp}.${sign(String(exp))}`, options: { httpOnly: true, sameSite: "strict", secure, path: "/", maxAge: MAX_AGE } };
};
export const clearedCookie = { name: COOKIE, value: "", options: { httpOnly: true, sameSite: "strict", path: "/", maxAge: 0 } };

function valid(token) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  const good = sign(exp);
  return sig.length === good.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good));
}

export async function isAdmin() {
  try {
    return valid((await cookies()).get(COOKIE)?.value);
  } catch {
    return false;
  }
}

// Simple in-memory limiter (per process) used for login and public forms.
const hits = new Map();
export function rateLimit(key, max, windowMs) {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= max) {
    hits.set(key, arr);
    return false;
  }
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.length || now - v[v.length - 1] > windowMs) hits.delete(k);
  return true;
}
export const clientIp = (req) => (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
