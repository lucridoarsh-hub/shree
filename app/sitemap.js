import { getSettings, getCategories, getProducts, getStores, getInfoPages } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const s = await getSettings();
  const base = s.siteUrl;
  if (!base) return [];
  const [cats, products, stores, pages] = await Promise.all([getCategories(), getProducts(), getStores(), getInfoPages()]);
  const fixed = ["", "/stores", "/stores/hyderabad", "/offers", "/gold-rate", "/gold-scheme", "/about", "/faq", "/contact"];
  return [
    ...fixed.map((p) => ({ url: base + p })),
    ...cats.map((c) => ({ url: `${base}/collections/${c.slug}` })),
    ...products.map((p) => ({ url: `${base}/products/${p.id}` })),
    ...stores.map((x) => ({ url: `${base}/stores/hyderabad/${x.slug}` })),
    ...pages.map((x) => ({ url: `${base}/info/${x.slug}` })),
  ];
}
