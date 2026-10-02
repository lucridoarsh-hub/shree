"use client";

export default function Error({ reset }) {
  return (
    <main className="container" style={{ padding: "80px 0", textAlign: "center" }}>
      <h1>Something went wrong</h1>
      <p style={{ margin: "12px 0 24px" }}>Please try again in a moment.</p>
      <button className="btn solid" onClick={reset}>Try again</button>
    </main>
  );
}
