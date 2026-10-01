import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { cities } from "@/data/catalog";

export const metadata = { title: "Find a Store | Sree Sivani Jewellers" };

export default function Stores() {
  return (
    <main>
      <PageBanner title="Find a Store" sub="Choose your city to see showrooms near you." image="/media/hero-1.jpg" crumbs={[{ label: "Stores" }]} />
      <div className="container">
        <div className="citygrid">
          {cities.map((c) =>
            c.active ? (
              <Link key={c.slug} href={`/stores/${c.slug}`} className="city on">
                <b>{c.name}</b><span>{c.count} stores</span>
              </Link>
            ) : (
              <div key={c.slug} className="city">
                <b>{c.name}</b><span>{c.count} stores · demo not included</span>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
