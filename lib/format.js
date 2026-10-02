export const inr = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const digits = (s) => String(s || "").replace(/\D/g, "");

export const waLink = (number, text) => {
  const n = digits(number);
  return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
};

export const productWaLink = (site, p) => {
  const base = (site.siteUrl || "").replace(/\/$/, "");
  const lines = [`Hello ${site.siteName}, I am interested in this design:`, `${p.name}${p.code ? ` (Code: ${p.code})` : ""}`];
  if (base) lines.push(`${base}/products/${p.id}`);
  lines.push("Please share the price and availability.");
  return waLink(site.whatsapp, lines.join("\n"));
};
