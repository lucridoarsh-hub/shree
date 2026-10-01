import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductActions from "@/components/ProductActions";
import { products, inr } from "@/data/catalog";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ id: p.id }));

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
  return { title: p ? `${p.name} | Sree Sivani Jewellers` : "Product" };
}

export default async function Product({ params }) {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
  if (!p) notFound();
  const related = products.filter((x) => x.collection === p.collection && x.id !== p.id).slice(0, 4);
  const rows = [["Product code", p.code], ["Metal", p.metal], ["Approx. weight", p.weight], ["Purity", p.metal.includes("22") ? "22K / 916 HUID hallmarked" : p.metal.includes("18") ? "18K / 750 hallmarked" : "Certified"]];

  return (
    <main className="container">
      <div className="crumbs">
        <Link href="/">Home</Link> / <Link href={`/collections/${p.collection}`}>{p.collectionTitle}</Link> / {p.name}
      </div>
      <div className="detail">
        <div className="big sq">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} />
        </div>
        <div>
          <h1>{p.name}</h1>
          <div className="price lg"><b>{inr(p.price)}</b> <s>{inr(p.mrp)}</s> <span className="save">Save {inr(p.mrp - p.price)}</span></div>
          <small className="muted">Inclusive of all taxes. Final price depends on the day&apos;s gold rate (demo).</small>
          <ProductActions id={p.id} />
          <table className="spec">
            <tbody>{rows.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody>
          </table>
          <div className="trust-mini">
            <span>✔ Insured jewellery</span><span>✔ Guaranteed buyback</span><span>✔ 100% HUID hallmarked</span>
          </div>
          <p style={{ marginTop: 14 }}><Link className="btn" href="/stores/hyderabad">Check availability at a store</Link></p>
        </div>
      </div>
      <h2 className="section-title" style={{ paddingTop: 0 }}>You May Also Like</h2>
      <div className="pgrid" style={{ paddingBottom: 60 }}>{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
    </main>
  );
}
