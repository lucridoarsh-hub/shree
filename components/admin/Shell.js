"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV = [
  ["/admin", "Dashboard"],
  ["/admin/products", "Products"],
  ["/admin/categories", "Categories"],
  ["/admin/offers", "Offers"],
  ["/admin/stores", "Stores"],
  ["/admin/pages", "Info Pages"],
  ["/admin/faqs", "FAQs"],
  ["/admin/goldrates", "Gold Rates"],
  ["/admin/settings", "Site Settings"],
  ["/admin/messages", "Messages", "unread"],
  ["/admin/subscribers", "Subscribers"],
];

export default function Shell({ unread, children }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };
  return (
    <div className="shell">
      <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      <aside className={open ? "side open" : "side"} onClick={() => setOpen(false)}>
        <div className="brand">Admin Panel</div>
        <nav>
          {NAV.map(([href, label, badge]) => (
            <Link key={href} href={href} className={path === href ? "on" : ""}>
              {label}{badge && unread > 0 && <span className="badge-a">{unread}</span>}
            </Link>
          ))}
        </nav>
        <div className="sidefoot">
          <a href="/" target="_blank" rel="noopener noreferrer">View website ↗</a>
          <button onClick={logout}>Log out</button>
        </div>
      </aside>
      <main className="adminmain">{children}</main>
    </div>
  );
}
