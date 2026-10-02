// Small fetch wrapper for the admin API. Throws Error(message) on failure.
export async function api(url, method = "GET", body) {
  const r = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await r.json().catch(() => ({}));
  if (r.status === 401) {
    window.location.assign("/admin/login");
    throw new Error("Session expired. Please log in again.");
  }
  if (!r.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

export async function upload(file) {
  const fd = new FormData();
  fd.append("file", file);
  const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || "Upload failed");
  return data.url;
}
