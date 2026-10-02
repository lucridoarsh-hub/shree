import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { uploadDir, TYPES } from "@/lib/uploads";

// Serves files uploaded from the admin panel straight from disk, so new uploads work
// immediately in production (Next only indexes the public folder at startup).
export async function GET(req, { params }) {
  const { path: parts } = await params;
  const name = parts.length === 1 ? parts[0] : "";
  const type = TYPES[path.extname(name).toLowerCase()];
  if (!type || !/^[\w.-]+$/.test(name) || name.includes("..")) return new Response("Not found", { status: 404 });
  const file = path.join(uploadDir(), name);
  let stat;
  try {
    stat = await fsp.stat(file);
  } catch {
    return new Response("Not found", { status: 404 });
  }
  const headers = { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable", "Accept-Ranges": "bytes", "X-Content-Type-Options": "nosniff" };
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get("range") || "");
  if (m && (m[1] || m[2])) {
    let start = m[1] ? Number(m[1]) : Math.max(0, stat.size - Number(m[2]));
    let end = m[1] && m[2] ? Math.min(Number(m[2]), stat.size - 1) : stat.size - 1;
    if (start > end || start >= stat.size) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${stat.size}` } });
    return new Response(Readable.toWeb(fs.createReadStream(file, { start, end })), {
      status: 206,
      headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${stat.size}`, "Content-Length": String(end - start + 1) },
    });
  }
  return new Response(Readable.toWeb(fs.createReadStream(file)), { headers: { ...headers, "Content-Length": String(stat.size) } });
}
