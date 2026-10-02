"use client";
import { useState } from "react";
import { WhatsApp } from "./Icons";
import { useShop } from "./ShopProvider";
import { inr, waLink } from "@/lib/format";

export default function SchemeCalc() {
  const { site } = useShop();
  const [m, setM] = useState(5000);
  const paid = m * 10;
  const bonus = m; // one instalment as bonus
  const msg = `Hello ${site.siteName}, I would like to join the Easy Gold Scheme with a monthly instalment of ${inr(m)}.`;
  return (
    <div className="calc">
      <label>Monthly instalment: <b>{inr(m)}</b></label>
      <input type="range" min={1000} max={50000} step={500} value={m} onChange={(e) => setM(+e.target.value)} />
      <div className="calc-out">
        <div><small>You pay (10 months)</small><b>{inr(paid)}</b></div>
        <div><small>Bonus</small><b>{inr(bonus)}</b></div>
        <div><small>Jewellery value</small><b>{inr(paid + bonus)}</b></div>
      </div>
      <a className="btn wa-btn" href={waLink(site.whatsapp, msg)} target="_blank" rel="noopener noreferrer"><WhatsApp width={20} height={20} /> Join Scheme on WhatsApp</a>
    </div>
  );
}
