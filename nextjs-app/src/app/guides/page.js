import Link from "next/link";
import { guides } from "@/lib/guides";
import TrackedLink from "@/components/TrackedLink";

export const metadata = {
  title: "Medical Billing & Appeal Guides | Lower My Medical Bills",
  description:
    "Practical guides for denied claims, confusing EOBs, and high medical bills. Each guide ends with concrete next steps.",
  alternates: { canonical: "https://lowermymedicalbills.com/guides" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free Medical Billing & Appeal Guides",
    description: "Practical walkthroughs for denied claims, confusing EOBs, and high bills. Each guide ends with concrete next steps.",
    url: "https://lowermymedicalbills.com/guides",
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
        <div className="guides-hero-cta-row">
          <Link href="/templates" className="guides-hero-secondary-cta">
            Browse Templates
          </Link>
        </div>
      </section>

      <section className="guides-intent-section" aria-label="How to use the guide library">
        <div className="guides-intent-grid">
          <article className="guides-intent-card">
            <h2>Real Walkthrough</h2>
            <p>
              Start with <Link href="/guides/medical-bill-too-high-what-to-do">Medical Bill Too High</Link>,
              then follow with <Link href="/guides/medical-bill-negotiation-scripts-phone-email">Negotiation Scripts</Link>.
              This sequence mirrors what real users do after they verify billing errors and need a
              practical call script for next steps.
            </p>
          </article>
          <article className="guides-intent-card">
            <h2>What to Do in 24 Hours</h2>
            <ul>
              <li>Choose one guide based on your claim type (denial, billing error, or network issue).</li>
              <li>Pull supporting documents listed in that guide before making calls.</li>
              <li>Use the matching template and send at least one written follow-up same day.</li>
            </ul>
          </article>
          <article className="guides-intent-card">
            <h2>Common Mistakes</h2>
            <ul>
              <li>Reading multiple guides but never building one action sequence.</li>
              <li>Skipping deadline tracking until after a denial escalates.</li>
              <li>Failing to keep a paper trail for calls, portal messages, and claim references.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="guides-grid">
        {guides.map((guide) => (
          <article key={guide.slug} className="guide-card">
            <h2>
              <TrackedLink href={`/guides/${guide.slug}`} eventData={{ source: "guides_index_title", slug: guide.slug }}>
                {guide.title}
              </TrackedLink>
            </h2>
            <p>{guide.description}</p>
            <div className="guide-meta">
              <span>Updated {guide.updatedAt}</span>
              <TrackedLink href={`/guides/${guide.slug}`} eventData={{ source: "guides_index_cta", slug: guide.slug }}>
                Read guide
              </TrackedLink>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
