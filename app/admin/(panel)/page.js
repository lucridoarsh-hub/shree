import Link from "next/link";
import { getDb } from "@/lib/mongo";

const TILES = [
  ["products", "Products", "/admin/products"],
  ["categories", "Categories", "/admin/categories"],
  ["offers", "Offers", "/admin/offers"],
  ["stores", "Stores", "/admin/stores"],
  ["messages", "Messages", "/admin/messages"],
  ["subscribers", "Subscribers", "/admin/subscribers"],
];

export default async function Dashboard() {
  const db = await getDb();
  const counts = await Promise.all(TILES.map(([c]) => db.collection(c).countDocuments({})));
  const unread = await db.collection("messages").countDocuments({ read: false });
  return (
    <div>
      <div className="head"><h1>Dashboard</h1></div>
      <div className="tiles">
        {TILES.map(([c, label, href], i) => (
          <Link key={c} href={href} className="tile"><b>{counts[i]}</b><span>{label}</span>{c === "messages" && unread > 0 && <em>{unread} unread</em>}</Link>
        ))}
      </div>
      <h2 className="sect">Quick guide</h2>
      <ul className="guide">
        <li><b>Products</b>: add photos, price, category. Tick “Show on home page” to feature a design.</li>
        <li><b>Site Settings</b>: change the logo, WhatsApp number, top bar, home banner, About page, footer and social links.</li>
        <li><b>Info Pages</b>: edit policy and guide pages; the “Group” decides which footer column they appear in.</li>
        <li>Every change is live on the website immediately. Customers reach you on WhatsApp from the product pages.</li>
      </ul>
    </div>
  );
}
