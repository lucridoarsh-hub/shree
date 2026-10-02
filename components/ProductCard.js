"use client";
import Link from "next/link";
import { Heart, WhatsApp } from "./Icons";
import Price from "./Price";
import { useShop } from "./ShopProvider";
import { productWaLink } from "@/lib/format";

export default function ProductCard({ p }) {
  const { wish, toggleWish, site } = useShop();
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
        <small>{[p.metal, p.weight].filter(Boolean).join(" · ")}</small>
        <h3><Link href={`/products/${p.id}`}>{p.name}</Link></h3>
        <div className="prow">
          <Price p={p} />
          <a className="wa-mini" href={productWaLink(site, p)} target="_blank" rel="noopener noreferrer" aria-label={`${site.whatsappCta}: ${p.name}`} title={site.whatsappCta}><WhatsApp width={20} height={20} /></a>
        </div>
      </div>
    </article>
  );
}
