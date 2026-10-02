"use client";
import { useShop } from "./ShopProvider";
import { WhatsApp } from "./Icons";
import { productWaLink } from "@/lib/format";

export default function ProductActions({ p }) {
  const { wish, toggleWish, site } = useShop();
  return (
    <div className="btns">
      <a className="btn wa-btn" href={productWaLink(site, p)} target="_blank" rel="noopener noreferrer"><WhatsApp width={20} height={20} /> {site.whatsappCta}</a>
      <button className="btn" onClick={() => toggleWish(p.id)}>{wish.includes(p.id) ? "♥ Wishlisted" : "♡ Add to Wishlist"}</button>
    </div>
  );
}
