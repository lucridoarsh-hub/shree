import path from "node:path";

// Uploaded files live in the public folder by default; override with UPLOAD_DIR on the VPS
// (e.g. a persistent directory outside the release folder so deploys never wipe images).
export const uploadDir = () => process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");

export const TYPES = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

// Detect the real type from the file's first bytes, never from the client-supplied name/type.
export function sniff(buf) {
  const h = (i, ...b) => b.every((x, k) => buf[i + k] === x);
  if (h(0, 0xff, 0xd8, 0xff)) return ".jpg";
  if (h(0, 0x89, 0x50, 0x4e, 0x47)) return ".png";
  if (h(0, 0x47, 0x49, 0x46, 0x38)) return ".gif";
  if (h(0, 0x52, 0x49, 0x46, 0x46) && h(8, 0x57, 0x45, 0x42, 0x50)) return ".webp";
  if (h(4, 0x66, 0x74, 0x79, 0x70)) return ".mp4";
  if (h(0, 0x1a, 0x45, 0xdf, 0xa3)) return ".webm";
  return null;
}
