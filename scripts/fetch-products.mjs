// Downloads product/collection/banner imagery from Pexels. Usage: PEXELS_API_KEY=... node scripts/fetch-products.mjs
import fs from "node:fs";
import path from "node:path";
const KEY = process.env.PEXELS_API_KEY;
if (!KEY) throw new Error("PEXELS_API_KEY missing");
const OUT = path.join(process.cwd(), "public", "media");
const used = new Set();
// ids already used by fetch-pexels.mjs are not tracked; duplicates across scripts are harmless for a demo.

async function photos(query, names, orientation) {
  const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=40${orientation ? `&orientation=${orientation}` : ""}`, { headers: { Authorization: KEY } });
  if (!r.ok) throw new Error(`${query}: ${r.status}`);
  const list = (await r.json()).photos.filter((p) => !used.has(p.id));
  if (list.length < names.length) console.warn("only", list.length, "for", query);
  for (let i = 0; i < Math.min(names.length, list.length); i++) {
    used.add(list[i].id);
    const buf = Buffer.from(await (await fetch(list[i].src.large)).arrayBuffer());
    fs.writeFileSync(path.join(OUT, names[i]), buf);
  }
  console.log(query, names.length);
}

const n = (p, c) => Array.from({ length: c }, (_, i) => `${p}-${i + 1}.jpg`);
const jobs = [
  ["gold earrings jewellery", n("p-earrings", 8)],
  ["pendant necklace gold diamond", n("p-pendants", 8)],
  ["gold ring diamond ring", n("p-rings", 8)],
  ["diamond jewellery necklace set", n("p-diamond", 8)],
  ["gold bangles bracelet chain jewellery", n("p-more", 8)],
  ["jewellery gift box present", n("p-gifting", 8)],
  ["indian bridal gold jewellery set", n("p-wedding", 8)],
  ["new jewellery collection gold necklace", n("p-new", 8)],
  ["gold coin bar", n("p-express", 8)],
  ["jewellery offers sale gold", n("banner", 3), "landscape"],
  ["jewellery craftsman workshop gold", n("about", 2), "landscape"],
  ["gold bars bullion investment", ["goldrate-1.jpg"], "landscape"],
  ["gift card present ribbon", ["giftcard-1.jpg"], "landscape"],
  ["customer support smiling woman", ["contact-1.jpg"], "landscape"],
];
for (const [q, names, o] of jobs) await photos(q, names, o);
