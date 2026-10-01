import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { offers } from "@/data/catalog";

export const metadata = { title: "Offers | Sree Sivani Jewellers" };

export default function Offers() {
  return (
    <main>
      <PageBanner title="Offers" sub="Unlock Joy with extra discounts across gold, diamond and gifting." image="/media/banner-1.jpg" crumbs={[{ label: "Offers" }]} />
      <div className="container offers-list">
        {offers.map((o) => (
          <article key={o.title} className="offer-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={o.image} alt={o.title} loading="lazy" />
            <div>
              <h2>{o.title}</h2>
              <p>{o.text}</p>
              <p>Use code <span className="code">{o.code}</span></p>
              <Link className="btn solid" href="/stores/hyderabad">Visit a Store</Link>
            </div>
          </article>
        ))}
        <p className="muted" style={{ paddingBottom: 50 }}>Terms and conditions apply. Offers shown are sample content for this demo.</p>
      </div>
    </main>
  );
}
