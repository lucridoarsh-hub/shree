"use client";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items }) {
  const [sort, setSort] = useState("featured");
  const [metal, setMetal] = useState("All");
  const metals = ["All", ...new Set(items.map((p) => p.metal))];

  const list = useMemo(() => {
    let l = metal === "All" ? [...items] : items.filter((p) => p.metal === metal);
    if (sort === "low") l.sort((a, b) => a.price - b.price);
    if (sort === "high") l.sort((a, b) => b.price - a.price);
    return l;
  }, [items, sort, metal]);

  return (
    <>
      <div className="filters">
        <div className="chips">
          {metals.map((m) => (
            <button key={m} className={`chip ${metal === m ? "on" : ""}`} onClick={() => setMetal(m)}>{m}</button>
          ))}
        </div>
        <label>
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </label>
      </div>
      <p className="count">{list.length} designs</p>
      <div className="pgrid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      {list.length === 0 && <p className="empty">No designs match this filter.</p>}
    </>
  );
}
