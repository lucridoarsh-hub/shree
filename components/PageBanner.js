import Link from "next/link";

export default function PageBanner({ title, sub, image, crumbs = [] }) {
  return (
    <section className="banner" style={image ? { backgroundImage: `linear-gradient(90deg,rgba(60,28,10,.8),rgba(60,28,10,.3)),url(${image})` } : undefined}>
      <div className="container">
        <div className="bcrumbs">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}> / {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}</span>
          ))}
        </div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </section>
  );
}
