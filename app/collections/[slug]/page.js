import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ProductGrid from "@/components/ProductGrid";
import { collections, products } from "@/data/catalog";

export const dynamicParams = false;
export const generateStaticParams = () => collections.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  return { title: c ? `${c.title} | Sree Sivani Jewellers` : "Collection" };
}

export default async function Collection({ params }) {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <main>
      <PageBanner title={c.title} sub={c.blurb} image={`/media/p-${c.prefix}-2.jpg`} crumbs={[{ label: c.title }]} />
      <div className="container" style={{ paddingBottom: 60 }}>
        <ProductGrid items={products.filter((p) => p.collection === slug)} />
      </div>
    </main>
  );
}
