"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Store, Phone, Search, Heart, Bag, User, Menu, Chevron, Truck } from "./Icons";
import { useShop } from "./ShopProvider";
import { collections } from "@/data/catalog";

const PLACEHOLDERS = ["Diamond Necklace", "Gold Bangles", "Platinum Ring", "Diamond Earrings", "Mangalsutra"];

export default function Header() {
  const router = useRouter();
  const { wish, cart } = useShop();
  const [open, setOpen] = useState(false);
  const [ph, setPh] = useState(0);
  const [q, setQ] = useState("");
  useEffect(() => {
    const t = setInterval(() => setPh((p) => (p + 1) % PLACEHOLDERS.length), 2200);
    return () => clearInterval(t);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };
  const badge = (n) => (n > 0 ? <span className="badge">{n}</span> : null);

  return (
    <>
      <div className="promo">
        Save the BIG Joy for later through our Easy Gold Scheme <Link href="/gold-scheme">Click for Join Scheme</Link>
      </div>
      <div className="sticky">
        <div className="hdr">
          <Link href="/" className="logo" aria-label="Sree Sivani Jewellers">
            <Image src="/logo.jpeg" alt="Sree Sivani Jewellers" width={680} height={775} priority />
          </Link>
          <Link href="/stores" className="hdr-link hide-md"><Store /> Store</Link>
          <a href="tel:+919346104233" className="hdr-link hide-md"><Phone /> +91 93461 04233</a>
          <form className="search" onSubmit={submit}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search for ${PLACEHOLDERS[ph]}`} aria-label="Search" />
            <button type="submit" aria-label="Search"><Search /></button>
          </form>
          <div className="pill hide-md"><span className="flag" /> India <Chevron /></div>
          <div className="hdr-right">
            <Link href="/gold-scheme" className="scheme hide-md">Gold<br />Scheme</Link>
            <div className="icons">
              <Link href="/contact" className="hide-md" aria-label="Account"><User /></Link>
              <Link href="/wishlist" className="ic" aria-label="Wishlist"><Heart />{badge(wish.length)}</Link>
              <Link href="/cart" className="ic" aria-label="Cart"><Bag />{badge(cart.length)}</Link>
              <button onClick={() => setOpen(true)} aria-label="Menu"><Menu width={30} height={30} /></button>
            </div>
          </div>
        </div>
        <nav className="nav">
          {collections.map((c) => (
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
        {collections.map((c) => <Link key={c.slug} href={`/collections/${c.slug}`}>{c.title}</Link>)}
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
