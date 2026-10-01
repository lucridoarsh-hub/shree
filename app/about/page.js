import PageBanner from "@/components/PageBanner";

export const metadata = { title: "About Us | Sree Sivani Jewellers" };

const facts = [["14", "Stores in Hyderabad"], ["100%", "HUID 916 hallmarked gold"], ["Insured", "Every piece of jewellery"], ["Buyback", "Guaranteed on all gold"]];

export default function About() {
  return (
    <main>
      <PageBanner title="About Us" sub="World's favourite jeweller (demo copy)" image="/media/about-1.jpg" crumbs={[{ label: "About Us" }]} />
      <div className="container">
        <div className="about">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/about-2.jpg" alt="Craftsmanship" />
          <div>
            <h2 className="section-title" style={{ textAlign: "left", paddingTop: 0 }}>Crafted with heritage</h2>
            <p>This is placeholder copy for the demo presentation. The live page carries the company&apos;s approved story, history and values.</p>
            <p>Sree Sivani Jewellers showrooms offer gold, diamond, platinum and precious-stone jewellery, with in-store customisation, expert consultation and easy savings schemes.</p>
          </div>
        </div>
        <div className="facts">{facts.map(([a, b]) => <div key={b}><b>{a}</b><span>{b}</span></div>)}</div>
      </div>
    </main>
  );
}
