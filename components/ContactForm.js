"use client";
import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState({ sent: false, busy: false, err: "" });
  if (state.sent) return <div className="emptybox"><p className="ok">Thank you! We have received your message and will get back to you shortly.</p></div>;

  const submit = async (e) => {
    e.preventDefault();
    setState({ sent: false, busy: true, err: "" });
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    if (r?.ok) return setState({ sent: true, busy: false, err: "" });
    setState({ sent: false, busy: false, err: (await r?.json().catch(() => ({})))?.error || "Could not send. Please try again." });
  };

  return (
    <form className="cform" onSubmit={submit}>
      <input required name="name" placeholder="Full name" aria-label="Full name" maxLength={100} />
      <input required type="email" name="email" placeholder="Email" aria-label="Email" />
      <input name="phone" placeholder="Phone" aria-label="Phone" maxLength={30} />
      <select name="topic" aria-label="Topic" defaultValue="Store enquiry">
        <option>Store enquiry</option><option>Order or delivery</option><option>Gold scheme</option><option>Other</option>
      </select>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }} />
      <textarea required name="message" rows={5} placeholder="How can we help?" aria-label="Message" maxLength={3000} />
      {state.err && <p className="form-err">{state.err}</p>}
      <button className="btn solid" type="submit" disabled={state.busy}>{state.busy ? "Sending..." : "Send Message"}</button>
    </form>
  );
}
