"use client";
import { useState } from "react";

export default function LoginForm() {
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    if (r?.ok) {
      window.location.href = "/admin";
      return;
    }
    setErr((await r?.json().catch(() => ({})))?.error || "Could not log in.");
    setBusy(false);
  };
  return (
    <form className="loginbox" onSubmit={submit}>
      <h1>Admin Login</h1>
      <input name="username" placeholder="Username" autoComplete="username" required autoFocus />
      <input name="password" type="password" placeholder="Password" autoComplete="current-password" required />
      {err && <div className="alert">{err}</div>}
      <button className="btn-a" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}
