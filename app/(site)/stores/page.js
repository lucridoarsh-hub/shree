import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { getStores } from "@/lib/data";

export const metadata = { title: "Find a Store" };

export default async function Stores() {
  const stores = await getStores();
  return (
    <main>
      <PageBanner title="Find a Store" sub="Choose your city to see showrooms near you." image="/media/hero-1.jpg" crumbs={[{ label: "Stores" }]} />
      <div className="container">
        <div className="citygrid">
          <Link href="/stores/hyderabad" className="city on">
            <b>Hyderabad</b><span>{stores.length} stores</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
