import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductActions from "@/components/ProductActions";
import ProductGallery from "@/components/ProductGallery";
import Price from "@/components/Price";
import { getProduct, getProducts, getSettings } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = await getProduct(id);
  return p ? { title: p.name, description: p.description?.slice(0, 160) || undefined, openGraph: { images: [p.image] } } : { title: "Product" };
}

export default async function Product({ params }) {
  const { id } = await params;
  const [p, s] = await Promise.all([getProduct(id), getSettings()]);
  if (!p) notFound();
  const related = await getProducts({ collection: p.collection, excludeId: p.id, limit: 4 });
  const purity = p.metal?.includes("22") ? "22K / 916 HUID hallmarked" : p.metal?.includes("18") ? "18K / 750 hallmarked" : "Certified";
  const rows = [["Product code", p.code], ["Metal", p.metal], ["Approx. weight", p.weight], ["Purity", p.metal ? purity : ""]].filter((r) => r[1]);

  return (
    <main className="container">
      <div className="crumbs">
        <Link href="/">Home</Link> / <Link href={`/collections/${p.collection}`}>{p.collectionTitle}</Link> / {p.name}
      </div>
      <div className="detail">
        <ProductGallery images={[p.image, ...(p.gallery || [])]} alt={p.name} />
        <div>
          <h1>{p.name}</h1>
          <Price p={p} large />
          {s.showPrice && p.price > 0 && s.priceNote && <small className="muted">{s.priceNote}</small>}
          <ProductActions p={p} />
          {p.description && <p className="desc">{p.description}</p>}
          {rows.length > 0 && (
            <table className="spec">
              <tbody>{rows.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody>
            </table>
          )}
          <div className="trust-mini">
            <span>✔ Insured jewellery</span><span>✔ Guaranteed buyback</span><span>✔ 100% HUID hallmarked</span>
          </div>
          <p style={{ marginTop: 14 }}><Link className="btn" href="/stores/hyderabad">Check availability at a store</Link></p>
        </div>
      </div>
      {related.length > 0 && (
        <>
          <h2 className="section-title" style={{ paddingTop: 0 }}>You May Also Like</h2>
          <div className="pgrid" style={{ paddingBottom: 60 }}>{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </>
      )}
    </main>
  );
}
