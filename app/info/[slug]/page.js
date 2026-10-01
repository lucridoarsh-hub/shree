import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { infoPages } from "@/data/catalog";

export const dynamicParams = false;
export const generateStaticParams = () => infoPages.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = infoPages.find((x) => x.slug === slug);
  return { title: p ? `${p.title} | Sree Sivani Jewellers` : "Info" };
}

export default async function Info({ params }) {
  const { slug } = await params;
  const p = infoPages.find((x) => x.slug === slug);
  if (!p) notFound();
  const siblings = infoPages.filter((x) => x.group === p.group);
  return (
    <main>
      <PageBanner title={p.title} crumbs={[{ label: p.group }, { label: p.title }]} />
      <div className="container infolayout">
        <aside>
          <h4>{p.group}</h4>
          {siblings.map((s) => <Link key={s.slug} href={`/info/${s.slug}`} className={s.slug === slug ? "on" : ""}>{s.title}</Link>)}
        </aside>
        <article>
          {p.body.map((t) => <p key={t}>{t}</p>)}
        </article>
      </div>
    </main>
  );
}
