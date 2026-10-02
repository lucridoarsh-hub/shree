import "server-only";
import { cache } from "react";
import { getDb } from "./mongo";
import { resources, settingsDefaults } from "./schema";

const col = async (name) => (await getDb()).collection(name);
const visible = { active: { $ne: false } };
const sortOf = (name) => resources[name].sort;

// Strip Mongo internals before handing documents to components.
const pub = ({ _id, createdAt, updatedAt, ...r }) => r;

export const getSettings = cache(async () => {
  const doc = (await (await col("settings")).findOne({ _id: "site" })) || {};
  const { _id, updatedAt, ...rest } = doc;
  const s = { ...settingsDefaults };
  for (const k of Object.keys(settingsDefaults)) if (rest[k] !== undefined && rest[k] !== null) s[k] = rest[k];
  if (!s.siteUrl) s.siteUrl = process.env.SITE_URL || "";
  s.siteUrl = s.siteUrl.replace(/\/$/, "");
  return s;
});

export const getCategories = cache(async () => (await (await col("categories")).find(visible).sort(sortOf("categories")).toArray()).map(pub));

export async function getCategory(slug) {
  const c = await (await col("categories")).findOne({ slug, ...visible });
  return c ? pub(c) : null;
}

async function attachCategory(list) {
  const cats = await getCategories();
  const byslug = Object.fromEntries(cats.map((c) => [c.slug, c.title]));
  // Products of a hidden/deleted category are not shown on the site.
  return list.filter((p) => byslug[p.collection]).map((p) => ({ ...pub(p), id: p.slug, collectionTitle: byslug[p.collection] }));
}

export async function getProducts({ collection, featured, ids, limit = 0, excludeId } = {}) {
  const q = { ...visible };
  if (collection) q.collection = collection;
  if (featured) q.featured = true;
  if (ids) q.slug = { $in: ids };
  if (excludeId) q.slug = { ...(q.slug || {}), $ne: excludeId };
  let cur = (await col("products")).find(q).sort(sortOf("products"));
  if (limit) cur = cur.limit(limit);
  return attachCategory(await cur.toArray());
}

export async function getProduct(slug) {
  const p = await (await col("products")).findOne({ slug, ...visible });
  return p ? (await attachCategory([p]))[0] : null;
}

export async function searchProducts(text) {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const all = await getProducts();
  if (!words.length) return all;
  return all.filter((p) => {
    const hay = `${p.name} ${p.collectionTitle} ${p.metal} ${p.code}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

export const getOffers = cache(async () => (await (await col("offers")).find(visible).sort(sortOf("offers")).toArray()).map(pub));

const mapStore = (s) => ({
  ...pub(s),
  id: s.slug,
  map: s.map || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.name}, ${s.address}`)}`,
});
export const getStores = cache(async () => (await (await col("stores")).find(visible).sort(sortOf("stores")).toArray()).map(mapStore));
export async function getStore(slug) {
  const s = await (await col("stores")).findOne({ slug, ...visible });
  return s ? mapStore(s) : null;
}

export const getInfoPages = cache(async () => (await (await col("pages")).find(visible).sort(sortOf("pages")).toArray()).map(pub));
export async function getInfoPage(slug) {
  const p = await (await col("pages")).findOne({ slug, ...visible });
  return p ? pub(p) : null;
}

export const getFaqs = cache(async () => (await (await col("faqs")).find(visible).sort(sortOf("faqs")).toArray()).map(pub));
export const getGoldRates = cache(async () => (await (await col("goldrates")).find({}).sort(sortOf("goldrates")).toArray()).map(pub));

// "Label | value" lines -> [[label, value], ...]
export const parsePairs = (text) =>
  String(text || "")
    .split("\n")
    .map((l) => l.split("|").map((x) => x.trim()))
    .filter((p) => p[0] && p[1]);
