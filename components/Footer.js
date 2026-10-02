"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WhatsApp, Up } from "./Icons";
import { waLink } from "@/lib/format";

const SOCIALS = [["facebook", "f", "Facebook"], ["instagram", "ig", "Instagram"], ["twitter", "x", "X"], ["youtube", "yt", "YouTube"]];
const ORDER = ["About", "Jewellery Guide", "Media", "Policies", "Quick Links"];

export default function Footer({ s, pages }) {
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [showUp, setShowUp] = useState(false);
  useEffect(() => {
    const f = () => setShowUp(window.scrollY > 400);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  const subscribe = async (e) => {
    e.preventDefault();
    setErr("");
    const email = new FormData(e.currentTarget).get("email");
    const r = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }).catch(() => null);
    if (r?.ok) setDone(true);
    else setErr((await r?.json().catch(() => ({})))?.error || "Something went wrong. Please try again.");
  };

  // Footer columns come from the Info Pages (grouped); "About" also links the built-in About and FAQ pages.
  const groups = {};
  for (const p of pages) (groups[p.group] ||= []).push({ label: p.title, href: `/info/${p.slug}` });
  groups.About = [{ label: "About Us", href: "/about" }, ...(groups.About || []), { label: "FAQ's", href: "/faq" }];
  const cols = [...ORDER, ...Object.keys(groups).filter((g) => !ORDER.includes(g))].filter((g) => groups[g]);
  const wa = waLink(s.whatsapp, `Hello ${s.siteName}, I would like to consult about jewellery.`);

  return (
    <footer>
      <section className="news">
        <h4>{s.newsletterTitle}</h4>
        <p>{s.newsletterText}</p>
        {done ? (
          <div className="ok">Thank you for subscribing.</div>
        ) : (
          <form onSubmit={subscribe}>
            <input type="email" name="email" required placeholder="Email" aria-label="Email" />
            <button className="btn solid" type="submit">Subscribe</button>
          </form>
        )}
        {err && <p className="form-err">{err}</p>}
      </section>
      <div className="foot">
        <div className="container">
          <div className="foot-top">
            <div className="contact">
              <div><small>Call Us</small><b>{s.phone}</b></div>
              <div><small>Email Us</small><b>{s.email}</b></div>
            </div>
            <div className="social">
              {SOCIALS.filter(([k]) => s[k]).map(([k, t, label]) => <a key={k} href={s[k]} aria-label={label} target="_blank" rel="noopener noreferrer">{t}</a>)}
              <a href={wa} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">wa</a>
            </div>
          </div>
          <div className="cols">
            {cols.map((h) => (
              <div key={h}>
                <h5>{h}</h5>
                <ul>{groups[h].map((i) => <li key={i.href}><Link href={i.href}>{i.label}</Link></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="help">
            <div>Ph: {s.phone}<br />({s.hours})</div>
            <div>General: {s.email}<br />Corporate: {s.emailCorporate}</div>
            <div><Link href="/contact"><b>Contact us</b></Link> &nbsp;|&nbsp; <Link href="/stores"><b>Find a Store</b></Link></div>
          </div>
          <div className="copy">{s.copyright}</div>
        </div>
      </div>
      <a className="wa" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><WhatsApp /></a>
      {showUp && (
        <button className="up" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><Up /></button>
      )}
    </footer>
  );
}
