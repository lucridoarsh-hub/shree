import StoreGrid from "@/components/StoreGrid";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import { ICONS } from "@/components/Icons";
import { services, trust } from "@/lib/static";
import { getSettings, getStores, getFaqs } from "@/lib/data";

// The Hyderabad store-locator page.
export default async function Locator() {
  const [s, stores, faqs] = await Promise.all([getSettings(), getStores(), getFaqs()]);
  return (
    <main>
      <Hero s={s} extra={<a className="back" href="/stores">&lt;&lt; Go Back</a>}>
        <h1>Your perfect store, perfectly crafted</h1>
        <div className="orn" />
        <p>From dazzling displays to dedicated service, find your favourite haven for heritage and haute jewellery.</p>
      </Hero>

      <div className="container">
        <h2 className="section-title">{s.siteName} Stores in Hyderabad</h2>
        <StoreGrid stores={stores} />

        <h2 className="section-title">Service We Provide on Our Stores</h2>
        <p className="section-sub">Enjoy professional advice, try-before-you-buy setups, seamless billing, and localized support at each location.</p>
        <div className="services">
          {services.map((x) => (
            <div key={x.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={x.image} alt={x.title} loading="lazy" />
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="trust-wrap">
        <div className="trust">
          {trust.map((t) => {
            const I = ICONS[t.icon];
            return <div key={t.label}><I />{t.label}</div>;
          })}
        </div>
      </section>

      {faqs.length > 0 && (
        <>
          <h2 className="section-title">Have Some Questions?</h2>
          <p className="section-sub">We know how it feels to have questions and not know where to turn—so we made it easy to get the answers you need, without the stress.</p>
          <Faq faqs={faqs} />
        </>
      )}
    </main>
  );
}
