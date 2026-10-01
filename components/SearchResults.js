"use client";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { products } from "@/data/catalog";

export default function SearchResults() {
  const q = (useSearchParams().get("q") || "").trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  const list = words.length
    ? products.filter((p) => words.every((w) => `${p.name} ${p.collectionTitle} ${p.metal}`.toLowerCase().includes(w)))
    : products;
  return (
    <>
      <p className="count" style={{ paddingTop: 22 }}>{list.length} result{list.length === 1 ? "" : "s"}{q ? ` for “${q}”` : ""}</p>
      <div className="pgrid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      {list.length === 0 && <p className="empty">Nothing found. Try “ring”, “gold” or “diamond”.</p>}
    </>
  );
}
