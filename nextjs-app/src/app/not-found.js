import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Lower My Medical Bills",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="content-page">
      <section className="content-card" style={{ textAlign: "center", padding: "48px 24px" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", marginBottom: 12 }}>
          Page not found
        </h1>
        <p style={{ color: "var(--ink-soft)", marginBottom: 24 }}>
          This page may have moved or the link may be incorrect.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/guides" className="btn-secondary">
            Browse Guides
          </Link>
        </div>
      </section>
    </main>
  );
}
