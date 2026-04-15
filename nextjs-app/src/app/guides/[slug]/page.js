import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import { guides, findGuideBySlug } from "@/lib/guides";
import { getAffiliateLink } from "@/lib/affiliateLinks";
import { notFound } from "next/navigation";

const SITE_URL = "https://www.lowermymedicalbills.com";

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
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Organization",
      name: "Lower My Medical Bills",
    },
    publisher: {
      "@type": "Organization",
      name: "Lower My Medical Bills",
    },
  };

  const relatedGuides = guides
    .filter((g) => g.slug !== guide.slug)
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
        <span>Updated {guide.updatedAt}</span>
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
