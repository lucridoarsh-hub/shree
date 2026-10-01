// Smaller hero video (<=1280px wide). Usage: PEXELS_API_KEY=... node scripts/fetch-video.mjs
import fs from "node:fs";
const r = await fetch("https://api.pexels.com/videos/videos/27239910", { headers: { Authorization: process.env.PEXELS_API_KEY } });
const v = await r.json();
const f = v.video_files.filter((x) => x.file_type === "video/mp4" && x.width <= 1280).sort((a, b) => b.width - a.width)[0];
const buf = Buffer.from(await (await fetch(f.link)).arrayBuffer());
fs.writeFileSync("public/media/hero.mp4", buf);
console.log(f.width, f.height, (buf.length / 1e6).toFixed(1) + "MB");
