"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import { waLink } from "@/lib/format";

const when = (d) => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

export default function Inbox({ kind }) {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  const load = useCallback(() => api(`/api/admin/inbox/${kind}`).then(setRows).catch((e) => setErr(e.message)), [kind]);
  useEffect(() => { load(); }, [load]);

  const del = async (r) => {
    if (!window.confirm("Delete this entry?")) return;
    await api(`/api/admin/inbox/${kind}/${r._id}`, "DELETE").catch((e) => setErr(e.message));
    load();
  };
  const mark = async (r) => {
    await api(`/api/admin/inbox/${kind}/${r._id}`, "PUT", { read: !r.read }).catch((e) => setErr(e.message));
    load();
  };
  const copy = async () => {
    await navigator.clipboard.writeText(rows.map((r) => r.email).join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="head">
        <h1>{kind === "messages" ? "Customer Messages" : "Newsletter Subscribers"}</h1>
        {kind === "subscribers" && rows?.length > 0 && <button className="btn-a" onClick={copy}>{copied ? "Copied!" : "Copy all emails"}</button>}
      </div>
      {err && <div className="alert">{err}</div>}
      {!rows && <p className="muted">Loading...</p>}
      {rows && !rows.length && <p className="muted">Nothing here yet.</p>}
      {kind === "messages" ? (
        rows?.map((r) => (
          <article key={r._id} className={`msg${r.read ? "" : " unread"}`}>
            <div className="msgtop"><b>{r.name}</b><span className="tag">{r.topic}</span><span className="muted">{when(r.createdAt)}</span></div>
            <p>{r.message}</p>
            <div className="msgmeta"><a href={`mailto:${r.email}`}>{r.email}</a>{r.phone && <> · <a href={`tel:${r.phone}`}>{r.phone}</a></>}</div>
            <div className="acts">
              {r.phone && <a className="btn-a wa sm" href={waLink(r.phone.replace(/\D/g, "").length === 10 ? `91${r.phone.replace(/\D/g, "")}` : r.phone, `Hello ${r.name}, thank you for contacting us.`)} target="_blank" rel="noopener noreferrer">Reply on WhatsApp</a>}
              <button className="btn-a ghost sm" onClick={() => mark(r)}>{r.read ? "Mark unread" : "Mark read"}</button>
              <button className="btn-a danger sm" onClick={() => del(r)}>Delete</button>
            </div>
          </article>
        ))
      ) : (
        rows?.length > 0 && (
          <div className="tablewrap">
            <table className="tbl">
              <thead><tr><th>Email</th><th>Subscribed</th><th /></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r._id}><td>{r.email}</td><td>{when(r.createdAt)}</td><td className="acts"><button className="btn-a danger sm" onClick={() => del(r)}>Delete</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
