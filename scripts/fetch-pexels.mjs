// One-off: downloads demo imagery/video from Pexels into public/media. Usage: PEXELS_API_KEY=... node scripts/fetch-pexels.mjs
import fs from "node:fs";
import path from "node:path";
const KEY = process.env.PEXELS_API_KEY;
if (!KEY) throw new Error("PEXELS_API_KEY missing");
const OUT = path.join(process.cwd(), "public", "media");
const used = new Set();

async function search(kind, query, n, orientation) {
  const base = kind === "video" ? "https://api.pexels.com/videos/search" : "https://api.pexels.com/v1/search";
  const r = await fetch(`${base}?query=${encodeURIComponent(query)}&per_page=${n + 10}${orientation ? `&orientation=${orientation}` : ""}`, { headers: { Authorization: KEY } });
  if (!r.ok) throw new Error(`${query}: ${r.status}`);
  const j = await r.json();
  return kind === "video" ? j.videos : j.photos;
}
async function save(url, file) {
  const r = await fetch(url);
  fs.writeFileSync(path.join(OUT, file), Buffer.from(await r.arrayBuffer()));
}
async function photos(query, names, orientation = "landscape", size = "large") {
  const list = (await search("photo", query, names.length, orientation)).filter((p) => !used.has(p.id));
  for (let i = 0; i < names.length; i++) {
    const p = list[i]; used.add(p.id);
    await save(p.src[size], names[i]); console.log(names[i], p.id);
  }
}

await photos("gold jewellery necklace luxury", ["hero-1.jpg", "hero-2.jpg", "hero-3.jpg"], "landscape", "large2x");
await photos("jewellery store showroom interior", ["store-1.jpg", "store-2.jpg", "store-3.jpg", "store-4.jpg", "store-5.jpg", "store-6.jpg", "store-7.jpg"]);
await photos("jewelry shop display gold", ["store-8.jpg", "store-9.jpg", "store-10.jpg", "store-11.jpg", "store-12.jpg", "store-13.jpg", "store-14.jpg"]);
await photos("jeweler crafting ring diamond", ["svc-1.jpg"]);
await photos("woman trying gold jewellery shop", ["svc-2.jpg"]);
await photos("gold coins savings", ["svc-3.jpg"]);
await photos("indian bride gold jewellery", ["promo-1.jpg", "promo-2.jpg"]);

const vids = (await search("video", "gold jewellery", 3, "landscape")).filter((v) => v.width >= v.height);
const v = vids[0];
const file = v.video_files.filter((f) => f.file_type === "video/mp4" && f.width <= 1920).sort((a, b) => b.width - a.width)[0];
await save(file.link, "hero.mp4");
await save(v.image, "hero-poster.jpg");
console.log("video", v.id, file.width);
