"use client";

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", textAlign: "center", padding: "80px 20px" }}>
        <h1>We will be right back</h1>
        <p style={{ margin: "12px 0 24px" }}>The website could not load. Please try again in a moment.</p>
        <button onClick={reset} style={{ padding: "10px 22px", borderRadius: 24, border: "1px solid #c8283f", background: "#c8283f", color: "#fff", cursor: "pointer" }}>Try again</button>
      </body>
    </html>
  );
}
