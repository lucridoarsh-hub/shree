import StoreGrid from "@/components/StoreGrid";
import Faq from "@/components/Faq";
import { ICONS } from "@/components/Icons";
import { services, trust } from "@/data/stores";

// The Hyderabad store-locator page (the original reference page).
export default function Locator() {
  return (
    <main>
      <section className="hero">
        <video src="/media/hero.mp4" poster="/media/hero-poster.jpg" autoPlay muted loop playsInline preload="metadata" />
        <div className="hero-in">
          <h1>Your perfect store, perfectly crafted</h1>
          <div className="orn" />
          <p>From dazzling displays to dedicated service, find your favourite haven for heritage and haute jewellery.</p>
        </div>
        <a className="back" href="/stores">&lt;&lt; Go Back</a>
      </section>

      <div className="container">
        <h2 className="section-title">Sree Sivani Jewellers Stores in Hyderabad</h2>
        <StoreGrid />

        <h2 className="section-title">Service We Provide on Our Stores</h2>
        <p className="section-sub">Enjoy professional advice, try-before-you-buy setups, seamless billing, and localized support at each location.</p>
        <div className="services">
          {services.map((s) => (
            <div key={s.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt={s.title} loading="lazy" />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
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

      <h2 className="section-title">Have Some Questions?</h2>
      <p className="section-sub">We know how it feels to have questions and not know where to turn—so we made it easy to get the answers you need, without the stress.</p>
      <Faq />
    </main>
  );
}
