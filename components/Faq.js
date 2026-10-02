"use client";
import { useState } from "react";
import { Chevron } from "./Icons";

export default function Faq({ faqs }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {faqs.map((f, i) => (
        <div key={f.q} className={`faq-item ${open === i ? "open" : ""}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {f.q}<Chevron />
          </button>
          <div className="faq-a"><div><p>{f.a}</p></div></div>
        </div>
      ))}
    </div>
  );
}
