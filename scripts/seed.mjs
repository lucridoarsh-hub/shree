// Fills an empty database with the starter content (categories, products, stores, pages ...).
//   npm run seed           -> only fills collections that are empty
//   npm run seed -- --reset -> DELETES products/categories/offers/stores/pages/faqs/goldrates first
import { MongoClient } from "mongodb";
import { collections, products, offers, infoPages, goldRates } from "./seed-data/catalog.mjs";
import { stores, faqs } from "./seed-data/stores.mjs";

const uri = process.env.MONGODB_URL;
if (!uri) throw new Error("MONGODB_URL missing. Run with: node --env-file=.env.local scripts/seed.mjs");
const dbName = process.env.MONGODB_DB || "sreesivani";
const reset = process.argv.includes("--reset");

const client = await new MongoClient(uri).connect();
const db = client.db(dbName);
const now = new Date();
const stamp = (rows) => rows.map((r) => ({ ...r, createdAt: now, updatedAt: now }));

async function fill(name, rows) {
  const c = db.collection(name);
  if (reset) await c.deleteMany({});
  if (await c.estimatedDocumentCount()) return console.log(`- ${name}: already has data, skipped`);
  await c.insertMany(stamp(rows));
  console.log(`- ${name}: inserted ${rows.length}`);
}

const groupOrder = ["About", "Jewellery Guide", "Media", "Policies", "Quick Links"];

await fill("categories", collections.map((c, i) => ({ slug: c.slug, title: c.title, blurb: c.blurb, image: `/media/p-${c.prefix}-1.jpg`, order: i + 1, active: true })));
await fill("products", products.map((p, i) => ({
  slug: p.id, name: p.name, collection: p.collection, image: p.image, gallery: [], metal: p.metal, weight: p.weight,
  price: p.price, mrp: p.mrp, code: p.code, description: "", featured: (p.collection === "new-arrivals" || p.collection === "diamond-jewellery") && Number(p.id.split("-").pop()) <= 4,
  active: true, order: i + 1,
})));
await fill("offers", offers.map((o, i) => ({ title: o.title, text: o.text, code: o.code, image: o.image, order: i + 1, active: true })));
await fill("stores", stores.map((s, i) => ({ slug: s.slug, name: s.name, address: s.address, hours: s.hours, phones: s.phones, email: s.email, image: s.image, map: "", order: i + 1, active: true })));
await fill("pages", infoPages.filter((p) => p.title !== "About Us").map((p, i) => ({
  slug: p.slug, title: p.title, group: p.group, order: i + 1, active: true,
  body: `Information about "${p.title}" at Sree Sivani Jewellers.\n\nPlease add the full text of this page from the admin panel (Info Pages).\n\nFor any questions please contact our customer care on WhatsApp or call +91 93461 04233 (Mon to Saturday 10AM-6.30PM).`,
})));
await fill("faqs", faqs.map((f, i) => ({ ...f, order: i + 1, active: true })));
await fill("goldrates", goldRates.map((r, i) => ({ label: r.label, unit: r.unit, price: r.price, change: r.change, order: i + 1 })));

await db.collection("products").createIndex({ slug: 1 }, { unique: true });
await db.collection("products").createIndex({ collection: 1, active: 1 });
for (const n of ["categories", "stores", "pages"]) await db.collection(n).createIndex({ slug: 1 }, { unique: true });
await db.collection("subscribers").createIndex({ email: 1 }, { unique: true });
await db.collection("messages").createIndex({ createdAt: -1 });
console.log(`Done. Database: ${dbName}`);
await client.close();
