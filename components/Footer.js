"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { footer } from "@/data/stores";
import { pageHref } from "@/data/catalog";
import { WhatsApp, Up } from "./Icons";

export default function Footer() {
  const [done, setDone] = useState(false);
  const [showUp, setShowUp] = useState(false);
  useEffect(() => {
    const f = () => setShowUp(window.scrollY > 400);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <footer>
      <section className="news">
        <h4>Join Our Newsletter Now!</h4>
        <p>Be the first to know about new designs, events, and more!</p>
        {done ? (
          <div className="ok">Thank you for subscribing (demo).</div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <input type="email" required placeholder="Email" aria-label="Email" />
            <button className="btn solid" type="submit">Subscribe</button>
          </form>
        )}
      </section>
      <div className="foot">
        <div className="container">
          <div className="foot-top">
            <div className="contact">
              <div><small>Call Us</small><b>+91 93461 04233</b></div>
              <div><small>Email Us</small><b>care@sreesivanijewellers.com</b></div>
            </div>
            <div className="social">
              {["f", "ig", "x", "wa"].map((s) => <a key={s} href={s === "wa" ? "https://wa.me/919346104233" : "#"} aria-label={s}{...(s === "wa" ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{s}</a>)}
            </div>
          </div>
          <div className="cols">
            {Object.entries(footer).map(([h, items]) => (
              <div key={h}>
                <h5>{h}</h5>
                <ul>{items.map((i) => <li key={i}><Link href={i === "About Us" ? "/about" : i.startsWith("FAQ") ? "/faq" : pageHref(i)}>{i}</Link></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="help">
            <div>Ph: +91 93461 04233<br />(Mon To Saturday 10AM-6.30PM)</div>
            <div>General: care@sreesivanijewellers.com<br />Corporate: b2b@sreesivanijewellers.com</div>
            <div><Link href="/contact"><b>Contact us</b></Link> &nbsp;|&nbsp; <Link href="/stores"><b>Find a Store</b></Link></div>
          </div>
          <div className="copy">
            @Sree Sivani Jewellers 2026. All rights reserved · Demo presentation website, not the official site.
          </div>
        </div>
      </div>
      <a className="wa" href="https://wa.me/919346104233" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsApp /></a>
      {showUp && (
        <button className="up" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><Up /></button>
      )}
    </footer>
  );
}
