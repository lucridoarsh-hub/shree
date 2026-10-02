import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { getInfoPage, getInfoPages } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getInfoPage(slug);
  return { title: p ? p.title : "Info" };
}

export default async function Info({ params }) {
  const { slug } = await params;
  const [p, all] = await Promise.all([getInfoPage(slug), getInfoPages()]);
  if (!p) notFound();
  const siblings = all.filter((x) => x.group === p.group);
  return (
    <main>
      <PageBanner title={p.title} crumbs={[{ label: p.group }, { label: p.title }]} />
      <div className="container infolayout">
        <aside>
          <h4>{p.group}</h4>
          {siblings.map((x) => <Link key={x.slug} href={`/info/${x.slug}`} className={x.slug === slug ? "on" : ""}>{x.title}</Link>)}
        </aside>
        <article>
          {p.body.split(/\n{2,}/).filter(Boolean).map((t) => <p key={t}>{t}</p>)}
        </article>
      </div>
    </main>
  );
}
