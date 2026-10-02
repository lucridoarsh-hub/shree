import "./admin.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminRoot({ children }) {
  return <div className="admin">{children}</div>;
}
