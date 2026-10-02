import Link from "next/link";
import { notFound } from "next/navigation";
import { getStore, getStores } from "@/lib/data";
import { Pin, Phone } from "@/components/Icons";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = await getStore(slug);
  return { title: s ? `${s.name} Hyderabad` : "Store" };
}

export default async function StorePage({ params }) {
  const { slug } = await params;
  const [s, all] = await Promise.all([getStore(slug), getStores()]);
  if (!s) notFound();
  const others = all.filter((x) => x.slug !== s.slug).slice(0, 8);

  return (
    <main className="container">
      <div className="crumbs">
        <Link href="/">Home</Link> / <Link href="/stores">Stores</Link> / Hyderabad / {s.name}
      </div>
      <div className="detail">
        <div className="big">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.image} alt={s.name} />
        </div>
        <div>
          <h1>{s.name}</h1>
          <div className="info">
            <div><small>Address</small>{s.address}</div>
            <div><small>Store Hours</small>{s.hours}</div>
            {s.phones.length > 0 && <div><small>Phone</small>{s.phones.join(", ")}</div>}
            {s.email && <div><small>Email</small>{s.email}</div>}
          </div>
          <div className="btns">
            <a className="btn solid" href={s.map} target="_blank" rel="noreferrer"><Pin /> Get Direction</a>
            {s.phones[0] && <a className="btn" href={`tel:${s.phones[0].replace(/\s/g, "")}`}><Phone width={16} height={16} /> Call Store</a>}
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
