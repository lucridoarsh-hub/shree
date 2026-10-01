import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { collections, products, offers } from "@/data/catalog";
import { stores } from "@/data/stores";

export default function Home() {
  const featured = [...products.filter((p) => p.collection === "new-arrivals").slice(0, 4), ...products.filter((p) => p.collection === "diamond-jewellery").slice(0, 4)];
  return (
    <main>
      <section className="hero big">
        <video src="/media/hero.mp4" poster="/media/hero-poster.jpg" autoPlay muted loop playsInline preload="metadata" />
        <div className="hero-in">
          <h1>Jewellery that tells your story</h1>
          <div className="orn" />
          <p>Heritage gold, certified diamonds and designs crafted for life&apos;s brightest moments.</p>
          <div className="btns">
            <Link className="btn solid" href="/collections/new-arrivals">Shop New Arrivals</Link>
            <Link className="btn light" href="/stores">Find a Store</Link>
          </div>
        </div>
      </section>

      <div className="container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="cats">
          {collections.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="cat">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/media/p-${c.prefix}-1.jpg`} alt={c.title} loading="lazy" />
              <span>{c.title}</span>
            </Link>
          ))}
        </div>

        <h2 className="section-title">Featured Designs</h2>
        <div className="pgrid">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </div>

      <section className="offer-strip">
        <div className="container">
          <h2 className="section-title">Current Offers</h2>
          <div className="offers-grid">
            {offers.slice(0, 3).map((o) => (
              <Link href="/offers" key={o.title} className="offer-card" style={{ backgroundImage: `linear-gradient(0deg,rgba(40,15,5,.85),rgba(40,15,5,.1)),url(${o.image})` }}>
                <h3>{o.title}</h3>
                <span>View offer →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <h2 className="section-title">Visit Our Stores in Hyderabad</h2>
        <p className="section-sub">{stores.length} showrooms across the city with try-before-you-buy, in-store customisation and expert consultation.</p>
        <div className="mini-stores">
          {stores.slice(0, 4).map((s) => (
            <Link key={s.slug} href={`/stores/hyderabad/${s.slug}`} className="mini">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt={s.name} loading="lazy" />
              <b>{s.name}</b>
              <small>{s.hours}</small>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", padding: "10px 0 60px" }}>
          <Link className="btn solid" href="/stores/hyderabad">View all Hyderabad stores</Link>
        </div>
      </div>
    </main>
  );
}
