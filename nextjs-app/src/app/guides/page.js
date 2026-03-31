import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata = {
  title: "Medical Billing & Appeal Guides | Lower My Medical Bills",
  description:
    "Practical guides for denied claims, confusing EOBs, and high medical bills. Each guide ends with concrete next steps.",
  alternates: { canonical: "https://www.lowermymedicalbills.com/guides" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free Medical Billing & Appeal Guides",
    description: "Practical walkthroughs for denied claims, confusing EOBs, and high bills. Each guide ends with concrete next steps.",
    url: "https://www.lowermymedicalbills.com/guides",
    siteName: "Lower My Medical Bills",
    type: "website",
  },
};

export default function GuidesPage() {
  return (
    <main className="guides-page">
      <section className="guides-hero">
        <p className="guides-kicker">Free Resource Library</p>
        <h1>Medical Billing &amp; Appeal Guides</h1>
        <p>
          Practical walkthroughs for denied claims, confusing EOBs, and high
          medical bills. Each guide ends with concrete next steps.
        </p>
      </section>

      <section className="guides-grid">
        {guides.map((guide) => (
          <article key={guide.slug} className="guide-card">
            <h2>
              <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
            </h2>
            <p>{guide.description}</p>
            <div className="guide-meta">
              <span>Updated {guide.updatedAt}</span>
              <Link href={`/guides/${guide.slug}`}>Read guide</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
