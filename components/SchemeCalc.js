"use client";
import { useState } from "react";
import { inr } from "@/data/catalog";

export default function SchemeCalc() {
  const [m, setM] = useState(5000);
  const [done, setDone] = useState(false);
  const paid = m * 10;
  const bonus = m; // demo: one instalment as bonus
  return (
    <div className="calc">
      <label>Monthly instalment: <b>{inr(m)}</b></label>
      <input type="range" min={1000} max={50000} step={500} value={m} onChange={(e) => setM(+e.target.value)} />
      <div className="calc-out">
        <div><small>You pay (10 months)</small><b>{inr(paid)}</b></div>
        <div><small>Bonus (demo)</small><b>{inr(bonus)}</b></div>
        <div><small>Jewellery value</small><b>{inr(paid + bonus)}</b></div>
      </div>
      {done ? <p className="ok">Thanks! This is a demo, no enrolment was created.</p> : <button className="btn solid" onClick={() => setDone(true)}>Join Scheme</button>}
    </div>
  );
}
