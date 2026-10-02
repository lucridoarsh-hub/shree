import PageBanner from "@/components/PageBanner";
import { getGoldRates, getSettings, parsePairs } from "@/lib/data";
import { inr } from "@/lib/format";

export const metadata = { title: "Today's Gold Rate in Hyderabad" };

export default async function GoldRate() {
  const [rates, s] = await Promise.all([getGoldRates(), getSettings()]);
  const history = parsePairs(s.goldHistory).map(([d, v]) => [d, Number(v)]).filter(([, v]) => v > 0);
  const max = Math.max(...history.map((h) => h[1]));
  const min = Math.min(...history.map((h) => h[1])) - 40;
  const k22 = rates.find((r) => /22/.test(r.label));
  const k24 = rates.find((r) => /24/.test(r.label));
  return (
    <main>
      <PageBanner title="Today's Gold Rate" sub="Hyderabad" image="/media/goldrate-1.jpg" crumbs={[{ label: "Gold Rate" }]} />
      <div className="container" style={{ paddingBottom: 60 }}>
        <div className="rates">
          {rates.map((r) => (
            <div className="rate" key={r.label}>
              <small>{r.label}</small>
              <b>{inr(r.price)}</b>
              <span>{r.unit}</span>
              {r.change !== 0 && <em className={r.change >= 0 ? "up" : "down"}>{r.change >= 0 ? "▲" : "▼"} {inr(Math.abs(r.change))}</em>}
            </div>
          ))}
        </div>

        {history.length > 1 && (
          <>
            <h2 className="section-title">22K Gold: Last 7 Days</h2>
            <div className="bars">
              {[...history].reverse().map(([d, v]) => (
                <div key={d} className="bar">
                  <span>{inr(v)}</span>
                  <i style={{ height: `${max === min ? 50 : ((v - min) / (max - min)) * 100}%` }} />
                  <small>{d}</small>
                </div>
              ))}
            </div>
          </>
        )}
        {k22 && k24 && (
          <table className="spec wide">
            <thead><tr><th>Weight</th><th>22K</th><th>24K</th></tr></thead>
            <tbody>
              {[1, 8, 10, 100].map((g) => (
                <tr key={g}><th>{g} g</th><td>{inr(g * k22.price)}</td><td>{inr(g * k24.price)}</td></tr>
              ))}
            </tbody>
          </table>
        )}
        {s.goldNote && <p className="muted" style={{ marginTop: 14 }}>{s.goldNote}</p>}
      </div>
    </main>
  );
}
