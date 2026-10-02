import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/lib/data";

export const metadata = { title: "Search" };

export default async function Search({ searchParams }) {
  const sp = await searchParams;
  const q = String(sp.q || "").trim().slice(0, 100);
  const list = await searchProducts(q);
  return (
    <main>
      <PageBanner title="Search" crumbs={[{ label: "Search" }]} />
      <div className="container" style={{ paddingBottom: 60 }}>
        <p className="count" style={{ paddingTop: 22 }}>{list.length} result{list.length === 1 ? "" : "s"}{q ? ` for “${q}”` : ""}</p>
        <div className="pgrid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        {list.length === 0 && <p className="empty">Nothing found. Try “ring”, “gold” or “diamond”.</p>}
      </div>
    </main>
  );
}
