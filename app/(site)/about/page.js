import PageBanner from "@/components/PageBanner";
import { getSettings, parsePairs } from "@/lib/data";

export const metadata = { title: "About Us" };

export default async function About() {
  const s = await getSettings();
  const facts = parsePairs(s.aboutFacts);
  return (
    <main>
      <PageBanner title="About Us" sub={s.aboutSub} image={s.aboutBanner} crumbs={[{ label: "About Us" }]} />
      <div className="container">
        <div className="about">
          {s.aboutImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.aboutImage} alt="Craftsmanship" />
          )}
          <div>
            <h2 className="section-title" style={{ textAlign: "left", paddingTop: 0 }}>{s.aboutTitle}</h2>
            {s.aboutBody.split(/\n{2,}/).map((t) => <p key={t}>{t}</p>)}
          </div>
        </div>
        <div className="facts">{facts.map(([a, b]) => <div key={b}><b>{a}</b><span>{b}</span></div>)}</div>
      </div>
    </main>
  );
}
