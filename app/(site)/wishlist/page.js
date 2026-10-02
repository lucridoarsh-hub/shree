"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";
import { useShop } from "@/components/ShopProvider";

export default function Wishlist() {
  const { wish } = useShop();
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (!wish.length) return;
    fetch(`/api/products?ids=${encodeURIComponent(wish.join(","))}`)
      .then((r) => r.json())
      .then((list) => setItems(Array.isArray(list) ? list : []))
      .catch(() => {});
  }, [wish]);
  const shown = items.filter((p) => wish.includes(p.id));
  return (
    <main>
      <PageBanner title="My Wishlist" crumbs={[{ label: "Wishlist" }]} />
      <div className="container" style={{ paddingBottom: 60 }}>
        {shown.length ? (
          <div className="pgrid" style={{ paddingTop: 28 }}>{shown.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        ) : (
          <div className="emptybox">
            <p>Your wishlist is empty. Tap the heart on any design to save it.</p>
            <Link className="btn solid" href="/collections/new-arrivals">Browse New Arrivals</Link>
          </div>
        )}
      </div>
    </main>
  );
}
