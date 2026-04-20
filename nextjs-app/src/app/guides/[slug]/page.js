import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import { guides, findGuideBySlug } from "@/lib/guides";
import { getAffiliateLink } from "@/lib/affiliateLinks";
import { notFound } from "next/navigation";

const SITE_URL = "https://www.lowermymedicalbills.com";

const GUIDE_PATHWAYS = {
  "medical-bill-too-high-what-to-do": [
    "request-itemized-medical-bill-template",
    "medical-bill-negotiation-scripts-phone-email",
    "hospital-charity-care-financial-assistance-guide",
  ],
  "how-to-appeal-a-denied-insurance-claim": [
    "appeal-deadlines-internal-vs-external-review",
    "how-to-read-denial-codes-on-eob",
    "claim-denied-missing-information-how-to-fix",
  ],
  "surprise-out-of-network-bills": [
    "balance-billing-explained-when-it-may-be-illegal",
    "out-of-network-er-bill-after-in-network-hospital",
    "single-case-agreement-network-gap-exception",
  ],
  "out-of-network-er-bill-after-in-network-hospital": [
    "surprise-out-of-network-bills",
    "balance-billing-explained-when-it-may-be-illegal",
    "medical-bill-sent-to-collections-while-disputing",
  ],
  "denied-claim-after-prior-authorization": [
    "appeal-prior-authorization-denial",
    "claim-denied-medical-necessity-appeal-guide",
    "appeal-deadlines-internal-vs-external-review",
  ],
  "claim-denied-medical-necessity-appeal-guide": [
    "how-to-read-denial-codes-on-eob",
    "how-to-appeal-a-denied-insurance-claim",
    "appeal-deadlines-internal-vs-external-review",
  ],
  "medical-bill-sent-to-collections-while-disputing": [
    "how-to-appeal-a-denied-insurance-claim",
    "medical-bill-negotiation-scripts-phone-email",
    "hospital-charity-care-financial-assistance-guide",
  ],
  "how-to-read-denial-codes-on-eob": [
    "claim-denied-missing-information-how-to-fix",
    "how-to-appeal-a-denied-insurance-claim",
    "appeal-deadlines-internal-vs-external-review",
  ],
  "what-is-an-eob-and-how-to-read-it": [
    "request-itemized-medical-bill-template",
    "how-to-read-cpt-and-hcpcs-codes-on-medical-bill",
    "medical-bill-too-high-what-to-do",
  ],
  "in-network-vs-out-of-network-costs": [
    "single-case-agreement-network-gap-exception",
    "surprise-out-of-network-bills",
    "balance-billing-explained-when-it-may-be-illegal",
  ],
};

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = findGuideBySlug(slug);
  if (!guide) return {};
  const canonical = `${SITE_URL}/guides/${guide.slug}`;
  return {
    title: `${guide.title} | Lower My Medical Bills`,
    description: guide.description,
    alternates: { canonical },
    openGraph: {
      title: `${guide.title} | Lower My Medical Bills`,
      description: guide.description,
      url: canonical,
      siteName: "Lower My Medical Bills",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | Lower My Medical Bills`,
      description: guide.description,
    },
  };
}

export default async function GuideArticlePage({ params }) {
  const { slug } = await params;
  const guide = findGuideBySlug(slug);

  if (!guide) notFound();

  const appealsLink = getAffiliateLink("appealsGuide", "guide-article");
  const plansLink = getAffiliateLink("plans", "guide-article");
  const canonicalUrl = `${SITE_URL}/guides/${guide.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    datePublished: guide.updatedAt,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Organization",
      name: "Lower My Medical Bills",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Lower My Medical Bills",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    isAccessibleForFree: true,
  };

  const guidedPathway = (GUIDE_PATHWAYS[guide.slug] || [])
    .map((nextSlug) => findGuideBySlug(nextSlug))
    .filter(Boolean);

  const relatedGuides = guides
    .filter((g) => g.slug !== guide.slug && !guidedPathway.some((pathGuide) => pathGuide.slug === g.slug))
    .slice(0, 3);

  return (
    <article className="guide-article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Link href="/guides" className="guide-back-link">
        ← Back to all guides
      </Link>

      <header className="guide-header">
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
        <div className="guide-metadata">
          <div className="guide-authorship">
            <span className="guide-badge">Fact-Checked Guide</span>
            <span className="guide-attribution">
              Written and reviewed by <strong>Lower My Medical Bills</strong>
            </span>
          </div>
          <div className="guide-dates">
            <span className="guide-date-item">
              <strong>Reviewed:</strong> {guide.updatedAt}
            </span>
            <span className="guide-date-item">
              <strong>Updated:</strong> {guide.updatedAt}
            </span>
          </div>
        </div>
        <nav className="guide-header-links" aria-label="Guide transparency links">
          <Link href="/editorial-policy">Editorial policy</Link>
          <Link href="/sources">Sources</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      {guide.sections.map((section, idx) => (
        <div className="guide-section-wrap" key={`${guide.slug}-${idx}`}>
          <section className="guide-section">
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>

          {idx === 1 ? (
            <section className="guide-inline-cta">
              <p className="guide-inline-cta-eyebrow">Do this before your next billing call</p>
              <h3>Run your EOB through the analyzer in 2 minutes</h3>
              <p>
                Get a focused review and action checklist based on your claim details before you call
                insurer or provider billing.
              </p>
              <TrackedLink
                href="/analyzer"
                className="guide-primary-cta"
                eventName="guide_to_analyzer_click"
                eventData={{ source: "guide_inline_cta", slug: guide.slug }}
              >
                Check My EOB Now
              </TrackedLink>
            </section>
          ) : null}
        </div>
      ))}

      <section className="guide-cta-box">
        <h2>Ready to apply this to your own bill?</h2>
        <p>
          Upload your EOB and get a claim-by-claim review with an appeal prep
          plan.
        </p>
        <TrackedLink
          href="/analyzer"
          className="guide-primary-cta"
          eventName="guide_to_analyzer_click"
          eventData={{ source: "guide_primary_cta", slug: guide.slug }}
        >
          Analyze My EOB
        </TrackedLink>
      </section>

      <section className="guide-cta-box guide-cta-box-secondary">
        <h2>Need outside help?</h2>
        <p>
          Use official resources and vetted marketplaces to compare options and
          escalate appeals.
        </p>
        <div className="guide-link-row">
          <a href={appealsLink.url} target="_blank" rel="noreferrer">
            Appeals Guide
          </a>
          <a href={plansLink.url} target="_blank" rel="noreferrer">
            Compare Plan Options
          </a>
        </div>
      </section>

      <section className="guide-faq">
        <h2>FAQ</h2>
        {guide.faq.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>

      {guidedPathway.length ? (
        <section className="guide-cta-box guide-cta-box-pathway">
          <h2>Continue your review path</h2>
          <p>
            Next reads selected for this scenario so you can move from diagnosis to
            action without losing momentum.
          </p>
          <div className="guide-link-row">
            {guidedPathway.map((item) => (
              <TrackedLink
                key={item.slug}
                href={`/guides/${item.slug}`}
                eventName="guide_pathway_click"
                eventData={{ source: "guide_pathway", from_slug: guide.slug, to_slug: item.slug }}
              >
                {item.title}
              </TrackedLink>
            ))}
          </div>
        </section>
      ) : null}

      <section className="guide-cta-box guide-cta-box-secondary">
        <h2>Related guides</h2>
        <div className="guide-link-row">
          {relatedGuides.map((item) => (
            <TrackedLink
              key={item.slug}
              href={`/guides/${item.slug}`}
              eventName="guide_related_click"
              eventData={{ source: "guide_related", from_slug: guide.slug, to_slug: item.slug }}
            >
              {item.title}
            </TrackedLink>
          ))}
        </div>
      </section>
    </article>
  );
}
