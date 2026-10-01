import PageBanner from "@/components/PageBanner";
import SchemeCalc from "@/components/SchemeCalc";
import { schemeSteps } from "@/data/catalog";

export const metadata = { title: "Easy Gold Scheme | Sree Sivani Jewellers" };

export default function Scheme() {
  return (
    <main>
      <PageBanner title="Save the BIG Joy for later" sub="Our Easy Gold Scheme: flexible monthly contributions, special benefits, guaranteed value at maturity." image="/media/svc-3.jpg" crumbs={[{ label: "Gold Scheme" }]} />
      <div className="container">
        <div className="steps">
          {schemeSteps.map((s) => (
            <div key={s.n}><span>{s.n}</span><h3>{s.t}</h3><p>{s.d}</p></div>
          ))}
        </div>
        <h2 className="section-title">Scheme Calculator</h2>
        <SchemeCalc />
      </div>
    </main>
  );
}
