import PageBanner from "@/components/PageBanner";
import { goldRates, goldHistory, inr } from "@/data/catalog";

export const metadata = { title: "Today's Gold Rate in Hyderabad | Sree Sivani Jewellers" };

export default function GoldRate() {
  const max = Math.max(...goldHistory.map((h) => h[1]));
  const min = Math.min(...goldHistory.map((h) => h[1])) - 40;
  return (
    <main>
      <PageBanner title="Today's Gold Rate" sub="Hyderabad · demo rates, updated for presentation only" image="/media/goldrate-1.jpg" crumbs={[{ label: "Gold Rate" }]} />
      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="rates">
          {goldRates.map((r) => (
            <div className="rate" key={r.label}>
              <small>{r.label}</small>
              <b>{inr(r.price)}</b>
              <span>{r.unit}</span>
              <em className={r.change >= 0 ? "up" : "down"}>{r.change >= 0 ? "▲" : "▼"} {inr(Math.abs(r.change))}</em>
            </div>
          ))}
        </div>

        <h2 className="section-title">22K Gold: Last 7 Days</h2>
        <div className="bars">
          {[...goldHistory].reverse().map(([d, v]) => (
            <div key={d} className="bar">
              <span>{inr(v)}</span>
              <i style={{ height: `${((v - min) / (max - min)) * 100}%` }} />
              <small>{d}</small>
            </div>
          ))}
        </div>
        <table className="spec wide">
          <thead><tr><th>Weight</th><th>22K</th><th>24K</th></tr></thead>
          <tbody>
            {[1, 8, 10, 100].map((g) => (
              <tr key={g}><th>{g} g</th><td>{inr(g * goldRates[1].price)}</td><td>{inr(g * goldRates[0].price)}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="muted" style={{ marginTop: 14 }}>Rates are static demo values and exclude making charges and GST.</p>
      </div>
    </main>
  );
}
