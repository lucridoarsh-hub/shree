"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { resources } from "@/lib/schema";
import { inr } from "@/lib/format";
import { api } from "./api";
import FieldInput from "./FieldInput";

const initial = (def, row) => {
  const v = {};
  for (const f of def.fields) {
    const cur = row?.[f.name];
    if (f.type === "list") v[f.name] = Array.isArray(cur) ? cur.join(", ") : cur ?? "";
    else if (f.type === "images") v[f.name] = Array.isArray(cur) ? cur : [];
    else if (f.type === "boolean") v[f.name] = row ? !!cur : f.default ?? false;
    else v[f.name] = cur ?? f.default ?? "";
  }
  return v;
};

export default function ResourceManager({ resource }) {
  const def = resources[resource];
  const [rows, setRows] = useState(null);
  const [refs, setRefs] = useState({});
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("");
  const [edit, setEdit] = useState(null); // { id|null, values }
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState("");

  const [tick, setTick] = useState(0);
  const load = useCallback(() => setTick((t) => t + 1), []);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await api(`/api/admin/${resource}`);
        const need = [...new Set(def.fields.filter((f) => f.type === "ref").map((f) => f.ref))];
        const entries = await Promise.all(need.map(async (r) => [r, await api(`/api/admin/${r}`)]));
        if (!alive) return;
        setRows(list);
        setRefs(Object.fromEntries(entries));
      } catch (e) {
        if (alive) setErr(e.message);
      }
    })();
    return () => { alive = false; };
  }, [resource, def, tick]);

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return (rows || []).filter((r) => (!filter || r[def.filter.name] === filter) && (!t || JSON.stringify(r).toLowerCase().includes(t)));
  }, [rows, q, filter, def]);

  const refLabel = (ref, slug) => {
    const o = (refs[ref] || []).find((x) => x.slug === slug);
    return o ? o.title || o.name : slug;
  };

  const cell = (c, r) => {
    const v = r[c.name];
    if (c.type === "image") return v ? <img src={v} alt="" className="cellimg" /> : "—";
    if (c.type === "bool") return v ? <span className="tag on">Yes</span> : c.name === "active" ? <span className="tag off">Hidden</span> : "—";
    if (c.type === "price") return v ? inr(v) : "—";
    if (c.type === "ref") return refLabel(c.ref, v);
    if (c.type === "list") return (v || []).join(", ");
    return v === undefined || v === "" ? "—" : String(v);
  };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const body = { ...edit.values };
    for (const f of def.fields) if (f.type === "list") body[f.name] = String(body[f.name] || "").split(",").map((s) => s.trim()).filter(Boolean);
    try {
      if (edit.id) await api(`/api/admin/${resource}/${edit.id}`, "PUT", body);
      else await api(`/api/admin/${resource}`, "POST", body);
      setEdit(null);
      setFlash("Saved");
      setTimeout(() => setFlash(""), 2500);
      load();
    } catch (x) {
      setErr(x.message);
    }
    setBusy(false);
  };

  const remove = async (r) => {
    if (!window.confirm(`Delete "${r.name || r.title || r.q || r.label}"? This cannot be undone.`)) return;
    try {
      await api(`/api/admin/${resource}/${r._id}`, "DELETE");
      setFlash("Deleted");
      setTimeout(() => setFlash(""), 2500);
      load();
    } catch (x) {
      setErr(x.message);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="head">
        <h1>{def.label}</h1>
        <button className="btn-a" onClick={() => { setErr(""); setEdit({ id: null, values: initial(def) }); }}>+ Add {def.singular}</button>
      </div>
      {flash && <div className="flash">{flash}</div>}
      {err && !edit && <div className="alert">{err}</div>}
      <div className="toolbar">
        <input placeholder={`Search ${def.label.toLowerCase()}...`} value={q} onChange={(e) => setQ(e.target.value)} />
        {def.filter && (
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">{def.filter.label}</option>
            {(refs[def.filter.ref] || []).map((o) => <option key={o.slug} value={o.slug}>{o.title}</option>)}
          </select>
        )}
        <span className="muted">{rows ? `${shown.length} of ${rows.length}` : "Loading..."}</span>
      </div>
      <div className="tablewrap">
        <table className="tbl">
          <thead><tr>{def.columns.map((c) => <th key={c.name}>{c.label}</th>)}<th /></tr></thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r._id}>
                {def.columns.map((c) => <td key={c.name} data-label={c.label}>{cell(c, r)}</td>)}
                <td className="acts">
                  <button className="btn-a ghost sm" onClick={() => { setErr(""); setEdit({ id: r._id, values: initial(def, r), slug: r.slug }); }}>Edit</button>
                  <button className="btn-a danger sm" onClick={() => remove(r)}>Delete</button>
                </td>
              </tr>
            ))}
            {rows && !shown.length && <tr><td colSpan={def.columns.length + 1} className="muted center">Nothing here yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {edit && (
        <div className="modalbg" onMouseDown={(e) => e.target === e.currentTarget && !busy && setEdit(null)}>
          <form className="modal" onSubmit={save}>
            <div className="mhead">
              <h2>{edit.id ? `Edit ${def.singular}` : `New ${def.singular}`}</h2>
              <button type="button" className="x" onClick={() => setEdit(null)} aria-label="Close">×</button>
            </div>
            <div className="mbody">
              {def.fields.map((f) => (
                <div key={f.name} className={`fld${f.type === "boolean" ? " inline" : ""}`}>
                  {f.type !== "boolean" && <label>{f.label}{f.required && " *"}</label>}
                  <FieldInput f={f} value={edit.values[f.name]} refs={refs} onChange={(val) => setEdit((s) => ({ ...s, values: { ...s.values, [f.name]: val } }))} />
                  {f.help && <small>{f.help}</small>}
                </div>
              ))}
              {edit.slug && <small className="muted">URL name: {edit.slug}</small>}
            </div>
            {err && <div className="alert">{err}</div>}
            <div className="mfoot">
              <button type="button" className="btn-a ghost" onClick={() => setEdit(null)}>Cancel</button>
              <button type="submit" className="btn-a" disabled={busy}>{busy ? "Saving..." : "Save"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
