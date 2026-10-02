"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Store, Phone, Search, Heart, User, Menu, Chevron, Truck, WhatsApp } from "./Icons";
import { useShop } from "./ShopProvider";
import { waLink } from "@/lib/format";

export default function Header({ s, categories }) {
  const router = useRouter();
  const { wish } = useShop();
  const hints = s.searchHints?.length ? s.searchHints : ["Diamond Necklace"];
  const [open, setOpen] = useState(false);
  const [ph, setPh] = useState(0);
  const [q, setQ] = useState("");
  useEffect(() => {
    const t = setInterval(() => setPh((p) => (p + 1) % hints.length), 2200);
    return () => clearInterval(t);
  }, [hints.length]);

  const submit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };
  const badge = (n) => (n > 0 ? <span className="badge">{n}</span> : null);
  const tel = `tel:+${String(s.phone).replace(/\D/g, "")}`;

  return (
    <>
      {s.promoText && (
        <div className="promo">
          {s.promoText} {s.promoLinkText && <Link href={s.promoLinkHref || "/"}>{s.promoLinkText}</Link>}
        </div>
      )}
      <div className="sticky">
        <div className="hdr">
          <Link href="/" className="logo" aria-label={s.siteName}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.logo} alt={s.siteName} />
          </Link>
          <Link href="/stores" className="hdr-link hide-md"><Store /> Store</Link>
          <a href={tel} className="hdr-link hide-md"><Phone /> {s.phone}</a>
          <form className="search" onSubmit={submit}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search for ${hints[ph % hints.length]}`} aria-label="Search" />
            <button type="submit" aria-label="Search"><Search /></button>
          </form>
          <div className="pill hide-md"><span className="flag" /> India <Chevron /></div>
          <div className="hdr-right">
            <Link href="/gold-scheme" className="scheme hide-md">Gold<br />Scheme</Link>
            <div className="icons">
              <Link href="/contact" className="hide-md" aria-label="Contact"><User /></Link>
              <Link href="/wishlist" className="ic" aria-label="Wishlist"><Heart />{badge(wish.length)}</Link>
              <a href={waLink(s.whatsapp, `Hello ${s.siteName}, I would like to consult about jewellery.`)} target="_blank" rel="noopener noreferrer" className="ic hdr-wa" aria-label="Chat on WhatsApp"><WhatsApp width={26} height={26} /></a>
              <button onClick={() => setOpen(true)} aria-label="Menu"><Menu width={30} height={30} /></button>
            </div>
          </div>
        </div>
        <nav className="nav">
          {categories.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`}>{c.slug === "express-delivery" && <Truck />}{c.title}</Link>
          ))}
          <Link href="/offers" className="offers">Offers</Link>
          <Link href="/gold-rate" className="gold-rate">Today&apos;s Gold Rate</Link>
        </nav>
      </div>
      <div className={`drawer-bg ${open ? "on" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "on" : ""}`} onClick={() => setOpen(false)}>
        <button style={{ fontSize: 28, float: "right" }} aria-label="Close">×</button>
        <h3 style={{ margin: "6px 0 16px" }}>Menu</h3>
        <form className="drawer-search" onSubmit={(e) => { submit(e); setOpen(false); }} onClick={(e) => e.stopPropagation()}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jewellery" aria-label="Search" />
          <button type="submit">Go</button>
        </form>
        <Link href="/">Home</Link>
        <Link href="/stores">Find a Store</Link>
        {categories.map((c) => <Link key={c.slug} href={`/collections/${c.slug}`}>{c.title}</Link>)}
        <Link href="/offers">Offers</Link>
        <Link href="/gold-rate">Today&apos;s Gold Rate</Link>
        <Link href="/gold-scheme">Gold Scheme</Link>
        <Link href="/about">About Us</Link>
        <Link href="/faq">FAQ&apos;s</Link>
        <Link href="/contact">Contact Us</Link>
      </aside>
    </>
  );
}
