"use client";
import { useRef, useState } from "react";
import { upload } from "./api";

function ImageField({ value, onChange, video }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      onChange(await upload(file));
    } catch (x) {
      setErr(x.message);
    }
    setBusy(false);
  };
  return (
    <div className="imgfield">
      {value && (video && /\.(mp4|webm)$/i.test(value) ? <video src={value} muted className="imgprev" /> : <img src={value} alt="" className="imgprev" />)}
      <div className="imgctl">
        <input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="/uploads/... or https://..." />
        <input ref={ref} type="file" accept={video ? "image/*,video/mp4,video/webm" : "image/*"} hidden onChange={pick} />
        <button type="button" className="btn-a" onClick={() => ref.current.click()} disabled={busy}>{busy ? "Uploading..." : "Upload"}</button>
        {value && <button type="button" className="btn-a ghost" onClick={() => onChange("")}>Remove</button>}
      </div>
      {err && <p className="err">{err}</p>}
    </div>
  );
}

function ImagesField({ value, onChange }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const list = Array.isArray(value) ? value : [];
  const pick = async (e) => {
    const files = [...(e.target.files || [])];
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    setErr("");
    try {
      const urls = [];
      for (const f of files) urls.push(await upload(f));
      onChange([...list, ...urls]);
    } catch (x) {
      setErr(x.message);
    }
    setBusy(false);
  };
  return (
    <div className="imgs">
      {list.map((u, i) => (
        <div key={u + i} className="thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={u} alt="" />
          <button type="button" aria-label="Remove" onClick={() => onChange(list.filter((_, k) => k !== i))}>×</button>
        </div>
      ))}
      <input ref={ref} type="file" accept="image/*" multiple hidden onChange={pick} />
      <button type="button" className="thumb add" onClick={() => ref.current.click()} disabled={busy}>{busy ? "..." : "+ Add"}</button>
      {err && <p className="err">{err}</p>}
    </div>
  );
}

// Renders one form control for a field definition from lib/schema.js
export default function FieldInput({ f, value, onChange, refs, lockSlug }) {
  const v = value ?? "";
  switch (f.type) {
    case "boolean":
      return (
        <label className="check">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} /> {f.label}
        </label>
      );
    case "textarea":
      return <textarea rows={f.rows || 4} value={v} onChange={(e) => onChange(e.target.value)} />;
    case "number":
      return <input type="number" step="any" min={f.allowNegative ? undefined : 0} value={v} onChange={(e) => onChange(e.target.value)} />;
    case "select":
      return (
        <select value={v} onChange={(e) => onChange(e.target.value)}>
          {f.options.map((o) => <option key={o}>{o}</option>)}
        </select>
      );
    case "ref":
      return (
        <select value={v} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select...</option>
          {(refs?.[f.ref] || []).map((o) => <option key={o.slug} value={o.slug}>{o.title || o.name}</option>)}
        </select>
      );
    case "image":
      return <ImageField value={v} onChange={onChange} />;
    case "video":
      return <ImageField value={v} onChange={onChange} video />;
    case "images":
      return <ImagesField value={value} onChange={onChange} />;
    default:
      return (
        <>
          <input value={v} onChange={(e) => onChange(e.target.value)} list={f.suggestions ? `dl-${f.name}` : undefined} inputMode={f.type === "digits" ? "numeric" : undefined} />
          {f.suggestions && <datalist id={`dl-${f.name}`}>{f.suggestions.map((s) => <option key={s} value={s} />)}</datalist>}
        </>
      );
  }
}
