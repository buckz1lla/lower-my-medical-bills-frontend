import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getCodeBySlug,
  getRelatedCodes,
  toSlug,
} from "@/lib/denialCodes";
import { getDenialGuidance } from "@/lib/denialCodeGuidance";

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }) {
  const { code: slug } = await params;
  const entry = getCodeBySlug(slug);
  if (!entry) return {};

  const title = `${entry.type} ${entry.code}: ${entry.short} — What It Means & What To Do | Lower My Medical Bills`;
  const description = entry.plain;

  return {
    title,
    description,
    alternates: { canonical: `https://lowermymedicalbills.com/denial-codes/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `https://lowermymedicalbills.com/denial-codes/${slug}`,
      siteName: "Lower My Medical Bills",
      type: "article",
    },
  };
}

export default async function DenialCodePage({ params }) {
  const { code: slug } = await params;
  const entry = getCodeBySlug(slug);
  if (!entry) notFound();

  const relatedCodes = getRelatedCodes(entry.code);
  const guidance = getDenialGuidance(entry.group);

  // FAQPage JSON-LD — action steps as Q&A
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does ${entry.type} ${entry.code} mean?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.what_it_means,
        },
      },
      {
        "@type": "Question",
        name: `What should I do if I see ${entry.type} ${entry.code} on my EOB?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.action_steps.join(" "),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="dc-detail-page">
        <nav className="dc-breadcrumb" aria-label="Breadcrumb">
          <Link href="/denial-codes">Denial Code Library</Link>
          <span aria-hidden="true"> › </span>
          <span>{entry.group}</span>
          <span aria-hidden="true"> › </span>
          <span>
            {entry.type} {entry.code}
          </span>
        </nav>

        <div className="dc-detail-layout">
          {/* ── Main content ── */}
          <main className="dc-detail-main">
            <header className="dc-detail-header">
              <div className="dc-detail-header-top">
                <span className="dc-code-badge dc-code-badge--type" data-type={entry.type}>
                  {entry.type}
                </span>
                <span className="dc-detail-group-label">{entry.group}</span>
              </div>
              <h1>
                {entry.type} {entry.code}: {entry.short}
              </h1>
              <p className="dc-detail-plain">{entry.plain}</p>
            </header>

            <section className="dc-detail-section">
              <h2>What this means for your claim</h2>
              <p>{entry.what_it_means}</p>
            </section>

            <section className="dc-detail-section dc-action-section">
              <h2>What to do next</h2>
              <ol className="dc-action-steps">
                {entry.action_steps.map((step, i) => (
                  <li key={i} className="dc-action-step">
                    <span className="dc-step-num">{i + 1}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            {guidance && (
              <section className="dc-detail-section dc-guidance-section">
                <h2>{guidance.heading}</h2>
                <p>{guidance.intro}</p>
                <div className="dc-guidance-points">
                  {guidance.points.map((pt, i) => (
                    <div className="dc-guidance-point" key={i}>
                      <h3>{pt.title}</h3>
                      <p>{pt.body}</p>
                    </div>
                  ))}
                </div>
                <h3>Your appeal rights for {entry.type} {entry.code}</h3>
                <p>{guidance.appeal}</p>
              </section>
            )}

            {entry.related_guides && entry.related_guides.length > 0 && (
              <section className="dc-detail-section dc-related-guides-section">
                <h2>Related guides</h2>
                <ul className="dc-related-guides-list">
                  {entry.related_guides.map((slug) => (
                    <li key={slug}>
                      <Link href={`/guides/${slug}`} className="dc-guide-link">
                        {formatGuideSlug(slug)} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="dc-detail-section dc-analyzer-cta">
              <h2>Have more codes on your EOB?</h2>
              <p>
                Upload your full Explanation of Benefits and our analyzer will identify every
                adjustment code, explain each one in plain English, and flag anything worth
                disputing.
              </p>
              <Link href="/analyzer" className="btn-primary">
                Analyze My EOB Free →
              </Link>
            </section>
          </main>

          {/* ── Sidebar ── */}
          <aside className="dc-detail-sidebar">
            <div className="dc-sidebar-card dc-code-meta-card">
              <h3>Code Details</h3>
              <dl className="dc-meta-list">
                <dt>Code</dt>
                <dd>
                  <strong>
                    {entry.type} {entry.code}
                  </strong>
                </dd>
                <dt>Type</dt>
                <dd>{entry.type === "CARC" ? "Claim Adjustment Reason Code" : "Remittance Advice Remark Code"}</dd>
                <dt>Group</dt>
                <dd>{entry.group}</dd>
              </dl>
            </div>

            {relatedCodes.length > 0 && (
              <div className="dc-sidebar-card dc-related-codes-card">
                <h3>Related Codes</h3>
                <ul className="dc-related-codes-list">
                  {relatedCodes.map((rc) => (
                    <li key={rc.code}>
                      <Link href={`/denial-codes/${toSlug(rc.code)}`} className="dc-related-code-link">
                        <span className="dc-rc-code">
                          {rc.type} {rc.code}
                        </span>
                        <span className="dc-rc-short">{rc.short}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="dc-sidebar-card dc-sidebar-analyzer-cta">
              <h3>Free EOB Analysis</h3>
              <p>
                Let our AI read your EOB and tell you exactly what every code means and
                whether you&rsquo;re being overcharged.
              </p>
              <Link href="/analyzer" className="btn-primary dc-sidebar-btn">
                Start Free Review →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function formatGuideSlug(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
