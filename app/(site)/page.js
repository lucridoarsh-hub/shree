import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import { getSettings, getCategories, getProducts, getOffers, getStores } from "@/lib/data";

export default async function Home() {
  const [s, categories, offers, stores] = await Promise.all([getSettings(), getCategories(), getOffers(), getStores()]);
  let featured = await getProducts({ featured: true, limit: 8 });
  if (!featured.length) featured = await getProducts({ limit: 8 });
  return (
    <main>
      <Hero s={s} big>
        <h1>{s.heroTitle}</h1>
        <div className="orn" />
        <p>{s.heroText}</p>
        <div className="btns">
          {s.heroBtn1Text && <Link className="btn solid" href={s.heroBtn1Href || "/"}>{s.heroBtn1Text}</Link>}
          {s.heroBtn2Text && <Link className="btn light" href={s.heroBtn2Href || "/"}>{s.heroBtn2Text}</Link>}
        </div>
      </Hero>

      <div className="container">
        {categories.length > 0 && (
          <>
            <h2 className="section-title">Shop by Category</h2>
            <div className="cats">
              {categories.map((c) => (
                <Link key={c.slug} href={`/collections/${c.slug}`} className="cat">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={c.title} loading="lazy" />
                  <span>{c.title}</span>
                </Link>
              ))}
            </div>
          </>
        )}

        {featured.length > 0 && (
          <>
            <h2 className="section-title">Featured Designs</h2>
            <div className="pgrid">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          </>
        )}
      </div>

      {offers.length > 0 && (
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
      )}

      {stores.length > 0 && (
        <div className="container">
          <h2 className="section-title">Visit Our Stores in Hyderabad</h2>
          <p className="section-sub">{stores.length} showrooms across the city with try-before-you-buy, in-store customisation and expert consultation.</p>
          <div className="mini-stores">
            {stores.slice(0, 4).map((x) => (
              <Link key={x.slug} href={`/stores/hyderabad/${x.slug}`} className="mini">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={x.image} alt={x.name} loading="lazy" />
                <b>{x.name}</b>
                <small>{x.hours}</small>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", padding: "10px 0 60px" }}>
            <Link className="btn solid" href="/stores/hyderabad">View all Hyderabad stores</Link>
          </div>
        </div>
      )}
    </main>
  );
}
