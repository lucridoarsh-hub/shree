// Banner with the video/poster configured in admin Settings.
export default function Hero({ s, big, extra, children }) {
  return (
    <section className={`hero${big ? " big" : ""}`} style={!s.heroVideo && s.heroPoster ? { backgroundImage: `url(${s.heroPoster})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
      {s.heroVideo && <video src={s.heroVideo} poster={s.heroPoster || undefined} autoPlay muted loop playsInline preload="metadata" />}
      <div className="hero-in">{children}</div>
      {extra}
    </section>
  );
}
