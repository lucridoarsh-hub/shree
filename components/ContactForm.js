"use client";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <div className="emptybox"><p className="ok">Thank you! This is a demo, so your message was not sent anywhere.</p></div>;
  return (
    <form className="cform" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <input required placeholder="Full name" aria-label="Full name" />
      <input required type="email" placeholder="Email" aria-label="Email" />
      <input placeholder="Phone" aria-label="Phone" />
      <select aria-label="Topic" defaultValue="Store enquiry">
        <option>Store enquiry</option><option>Order or delivery</option><option>Gold scheme</option><option>Other</option>
      </select>
      <textarea required rows={5} placeholder="How can we help?" aria-label="Message" />
      <button className="btn solid" type="submit">Send Message</button>
    </form>
  );
}
