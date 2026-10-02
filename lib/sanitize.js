import { slugify, digits } from "./format";

const safeUrl = (v) => {
  const s = String(v ?? "").trim().slice(0, 1000);
  if (!s) return "";
  if (/^\/(?!\/)/.test(s) || /^https?:\/\//i.test(s)) return s;
  return null;
};

// Validates and coerces `body` using a list of field definitions (from lib/schema.js).
// Returns { data } or { error }.
export function sanitize(fields, body) {
  const data = {};
  for (const f of fields) {
    if (!f.name) continue;
    let v = body?.[f.name];
    switch (f.type) {
      case "number": {
        if (v === "" || v == null) v = f.default ?? 0;
        v = Number(v);
        if (!Number.isFinite(v) || (!f.allowNegative && v < 0) || v > 1e10) return { error: `${f.label} must be a valid number` };
        if (f.required && !v) return { error: `${f.label} is required` };
        break;
      }
      case "boolean":
        v = v === undefined ? f.default ?? false : v === true || v === "true" || v === 1;
        break;
      case "image":
      case "video":
      case "url": {
        const u = safeUrl(v);
        if (u === null) return { error: `${f.label} must be a link starting with / or https://` };
        v = u;
        break;
      }
      case "images": {
        const arr = Array.isArray(v) ? v : [];
        v = [];
        for (const x of arr.slice(0, 12)) {
          const u = safeUrl(x);
          if (u === null) return { error: `${f.label} contains an invalid link` };
          if (u) v.push(u);
        }
        break;
      }
      case "list": {
        const arr = Array.isArray(v) ? v : String(v ?? "").split(",");
        v = arr.map((x) => String(x).trim().slice(0, 200)).filter(Boolean).slice(0, 30);
        break;
      }
      case "digits":
        v = digits(v).slice(0, 15);
        break;
      case "select": {
        v = String(v ?? f.default ?? "");
        if (f.options && !f.options.includes(v)) return { error: `${f.label} is invalid` };
        break;
      }
      case "textarea":
        v = String(v ?? "").replace(/\r\n/g, "\n").slice(0, 30000);
        break;
      default:
        v = String(v ?? "").trim().slice(0, 500);
    }
    if (f.required && (v === "" || v == null || (Array.isArray(v) && !v.length))) return { error: `${f.label} is required` };
    data[f.name] = v;
  }
  return { data };
}

export const makeSlug = (text) => slugify(text) || "item";
