"use client";
import Link from "next/link";
import { useState } from "react";
import { Pin } from "./Icons";

export default function StoreGrid({ stores }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const list = term
    ? stores.filter((s) => `${s.name} ${s.address} ${s.phones.join(" ")}`.toLowerCase().includes(term))
    : stores;

  return (
    <>
      <div className="tools">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by area, store or phone" aria-label="Search stores" />
      </div>
      <p className="count">{list.length} store{list.length === 1 ? "" : "s"} in Hyderabad</p>
      <div className="grid">
        {list.map((s) => (
          <article className="card" key={s.slug}>
            <Link href={`/stores/hyderabad/${s.slug}`} className="ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt={s.name} loading="lazy" />
            </Link>
            <div className="body">
              <h3>{s.name}</h3>
              <p className="addr">{s.address}</p>
              <p className="row"><b>Store Hours:</b> {s.hours}</p>
              <p className="row"><b>Phone:</b> {s.phones.join(", ")}</p>
              <p className="row"><b>Email:</b> <a className="mail" href={`mailto:${s.email}`}>{s.email}</a></p>
            </div>
            <div className="actions">
              <Link className="btn" href={`/stores/hyderabad/${s.slug}`}>View Store Details</Link>
              <a className="btn" href={s.map} target="_blank" rel="noreferrer"><Pin /> Get Direction</a>
            </div>
          </article>
        ))}
      </div>
      {list.length === 0 && <p className="empty">No stores match your search.</p>}
    </>
  );
}
