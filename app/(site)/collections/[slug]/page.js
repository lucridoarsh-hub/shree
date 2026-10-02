import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ProductGrid from "@/components/ProductGrid";
import { getCategory, getProducts } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = await getCategory(slug);
  return { title: c ? c.title : "Collection" };
}

export default async function Collection({ params }) {
  const { slug } = await params;
  const c = await getCategory(slug);
  if (!c) notFound();
  const items = await getProducts({ collection: slug });
  return (
    <main>
      <PageBanner title={c.title} sub={c.blurb} image={c.image} crumbs={[{ label: c.title }]} />
      <div className="container" style={{ paddingBottom: 60 }}>
        <ProductGrid items={items} />
      </div>
    </main>
  );
}
