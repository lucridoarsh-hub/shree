import Link from "next/link";
import { notFound } from "next/navigation";
import { stores } from "@/data/stores";
import { Pin, Phone } from "@/components/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return stores.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = stores.find((x) => x.slug === slug);
  return { title: s ? `${s.name} | Sree Sivani Jewellers Hyderabad` : "Store" };
}

export default async function StorePage({ params }) {
  const { slug } = await params;
  const s = stores.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = stores.filter((x) => x.slug !== s.slug).slice(0, 8);

  return (
    <main className="container">
      <div className="crumbs">
        <Link href="/">Home</Link> / <Link href="/">Stores</Link> / Hyderabad / {s.name}
      </div>
      <div className="detail">
        <div className="big">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.image} alt={s.name} />
        </div>
        <div>
          <h1>{s.name}</h1>
          <div className="info">
            <div><small>Address</small>{s.address}, Hyderabad</div>
            <div><small>Store Hours</small>{s.hours}</div>
            <div><small>Phone</small>{s.phones.join(", ")}</div>
            <div><small>Email</small>{s.email}</div>
          </div>
          <div className="btns">
            <a className="btn solid" href={s.map} target="_blank" rel="noreferrer"><Pin /> Get Direction</a>
            <a className="btn" href={`tel:${s.phones[0].replace(/\s/g, "")}`}><Phone width={16} height={16} /> Call Store</a>
          </div>
        </div>
      </div>
      <h2 className="section-title" style={{ paddingTop: 0 }}>Other Stores in Hyderabad</h2>
      <div className="others" style={{ marginTop: 20 }}>
        {others.map((o) => <Link key={o.slug} href={`/stores/hyderabad/${o.slug}`}>{o.name}</Link>)}
      </div>
    </main>
  );
}
