import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import GuideToc from "@/components/GuideToc";
import ReadingProgress from "@/components/ReadingProgress";
import { guides, findGuideBySlug } from "@/lib/guides";
import { getAffiliateLink } from "@/lib/affiliateLinks";
import { getGuideSources } from "@/lib/sources";
import { notFound } from "next/navigation";

const SITE_URL = "https://lowermymedicalbills.com";

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
  const guideSources = getGuideSources(guide.slug);

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
      "@type": "Person",
      name: "Lower My Medical Bills Editorial Team",
      jobTitle: "Health insurance data engineer",
      description:
        "Written and reviewed by a health insurance data engineer who works inside claims processing.",
      url: `${SITE_URL}/about`,
    },
    reviewedBy: {
      "@type": "Person",
      name: "Lower My Medical Bills Editorial Team",
      jobTitle: "Health insurance data engineer",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Lower My Medical Bills",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    citation: guideSources.map((source) => ({
      "@type": "CreativeWork",
      name: source.label,
      publisher: source.publisher,
      url: source.url,
    })),
    isAccessibleForFree: true,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${SITE_URL}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: canonicalUrl,
      },
    ],
  };

  const guidedPathway = (GUIDE_PATHWAYS[guide.slug] || [])
    .map((nextSlug) => findGuideBySlug(nextSlug))
    .filter(Boolean);

  const relatedGuides = guides
    .filter((g) => g.slug !== guide.slug && !guidedPathway.some((pathGuide) => pathGuide.slug === g.slug))
    .slice(0, 3);

  return (
    <article className="guide-article-page">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
              Written and reviewed by a{" "}
              <Link href="/about" className="guide-author-link">
                health insurance data engineer
              </Link>
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

      <GuideToc sections={guide.sections} />

      {guide.sections.map((section, idx) => (
        <div className="guide-section-wrap" key={`${guide.slug}-${idx}`}>
          <section className="guide-section">
            <h2 id={`section-${idx}`}>{section.heading}</h2>
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

      {guideSources.length ? (
        <section className="guide-sources" aria-labelledby="guide-sources-heading">
          <h2 id="guide-sources-heading">Sources &amp; references</h2>
          <p className="guide-sources-intro">
            This guide is grounded in primary government sources. Verify the details that apply to
            your specific plan and claim.
          </p>
          <ul className="guide-sources-list">
            {guideSources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.label}
                </a>
                <span className="guide-source-publisher">{source.publisher}</span>
              </li>
            ))}
          </ul>
          <p className="guide-sources-method">
            See our{" "}
            <Link href="/sources">sources and methodology</Link> and{" "}
            <Link href="/editorial-policy">editorial policy</Link> for how this guidance is built
            and reviewed.
          </p>
        </section>
      ) : null}

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
