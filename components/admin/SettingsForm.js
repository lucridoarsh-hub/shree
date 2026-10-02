"use client";
import { useEffect, useState } from "react";
import { settingsFields } from "@/lib/schema";
import { api } from "./api";
import FieldInput from "./FieldInput";

export default function SettingsForm() {
  const [v, setV] = useState(null);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api("/api/admin/settings").then((d) => {
      const x = { ...d };
      for (const f of settingsFields) if (f.type === "list") x[f.name] = Array.isArray(d[f.name]) ? d[f.name].join(", ") : d[f.name] || "";
      setV(x);
    }).catch((e) => setErr(e.message));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setMsg("");
    const body = { ...v };
    for (const f of settingsFields) if (f.type === "list") body[f.name] = String(body[f.name] || "").split(",").map((s) => s.trim()).filter(Boolean);
    try {
      await api("/api/admin/settings", "PUT", body);
      setMsg("Settings saved. Changes are live on the website.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (x) {
      setErr(x.message);
    }
    setBusy(false);
  };

  if (!v) return <p className="muted">{err || "Loading..."}</p>;
  return (
    <form onSubmit={save} className="settings">
      <div className="head"><h1>Site Settings</h1><button className="btn-a" disabled={busy}>{busy ? "Saving..." : "Save all changes"}</button></div>
      {msg && <div className="flash">{msg}</div>}
      {err && <div className="alert">{err}</div>}
      {settingsFields.map((f, i) =>
        f.section ? (
          <h2 key={i} className="sect">{f.section}</h2>
        ) : (
          <div key={f.name} className={`fld${f.type === "boolean" ? " inline" : ""}`}>
            {f.type !== "boolean" && <label>{f.label}</label>}
            <FieldInput f={f} value={v[f.name]} onChange={(val) => setV((s) => ({ ...s, [f.name]: val }))} />
            {f.help && <small>{f.help}</small>}
          </div>
        )
      )}
      <div className="stickysave"><button className="btn-a" disabled={busy}>{busy ? "Saving..." : "Save all changes"}</button></div>
    </form>
  );
}
