import PageBanner from "@/components/PageBanner";
import { getOffers, getSettings } from "@/lib/data";
import { waLink } from "@/lib/format";
import { WhatsApp } from "@/components/Icons";

export const metadata = { title: "Offers" };

export default async function Offers() {
  const [offers, s] = await Promise.all([getOffers(), getSettings()]);
  return (
    <main>
      <PageBanner title="Offers" sub="Unlock Joy with extra discounts across gold, diamond and gifting." image={offers[0]?.image} crumbs={[{ label: "Offers" }]} />
      <div className="container offers-list">
        {offers.map((o) => (
          <article key={o.title} className="offer-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={o.image} alt={o.title} loading="lazy" />
            <div>
              <h2>{o.title}</h2>
              <p>{o.text}</p>
              {o.code && <p>Use code <span className="code">{o.code}</span></p>}
              <a className="btn wa-btn" href={waLink(s.whatsapp, `Hello ${s.siteName}, I would like to know more about the offer: ${o.title}`)} target="_blank" rel="noopener noreferrer"><WhatsApp width={20} height={20} /> {s.whatsappCta}</a>
            </div>
          </article>
        ))}
        {offers.length === 0 && <p className="empty">No offers right now. Please check back soon.</p>}
        <p className="muted" style={{ paddingBottom: 50 }}>Terms and conditions apply.</p>
      </div>
    </main>
  );
}
