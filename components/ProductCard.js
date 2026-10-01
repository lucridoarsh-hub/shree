"use client";
import Link from "next/link";
import { Heart } from "./Icons";
import { useShop } from "./ShopProvider";
import { inr } from "@/data/catalog";

export default function ProductCard({ p }) {
  const { wish, toggleWish } = useShop();
  const on = wish.includes(p.id);
  return (
    <article className="pcard">
      <button className={`wishbtn ${on ? "on" : ""}`} onClick={() => toggleWish(p.id)} aria-label="Wishlist" aria-pressed={on}>
        <Heart fill={on ? "currentColor" : "none"} />
      </button>
      <Link href={`/products/${p.id}`} className="pimg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} loading="lazy" />
      </Link>
      <div className="pbody">
        <small>{p.metal} · {p.weight}</small>
        <h3><Link href={`/products/${p.id}`}>{p.name}</Link></h3>
        <div className="price"><b>{inr(p.price)}</b> <s>{inr(p.mrp)}</s></div>
      </div>
    </article>
  );
}
