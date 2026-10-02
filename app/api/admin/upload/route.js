import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { guard, json } from "@/lib/api";
import { uploadDir, sniff } from "@/lib/uploads";

const MAX_IMAGE = 10 * 1024 * 1024;
const MAX_VIDEO = 60 * 1024 * 1024;

export async function POST(req) {
  const denied = await guard(req);
  if (denied) return denied;
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || typeof file === "string") return json({ error: "No file received" }, 400);
  if (file.size > MAX_VIDEO) return json({ error: "File is too large" }, 413);
  const buf = Buffer.from(await file.arrayBuffer());
  const ext = sniff(buf);
  if (!ext) return json({ error: "Only JPG, PNG, WebP, GIF images (and MP4/WebM video) are allowed." }, 415);
  const isVideo = ext === ".mp4" || ext === ".webm";
  if (!isVideo && buf.length > MAX_IMAGE) return json({ error: "Image must be under 10 MB." }, 413);
  const name = `${Date.now()}-${crypto.randomBytes(5).toString("hex")}${ext}`;
  const dir = uploadDir();
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), buf);
  return json({ url: `/uploads/${name}` });
}
