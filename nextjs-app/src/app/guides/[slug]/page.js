import Link from "next/link";
import { guides, findGuideBySlug } from "@/lib/guides";
import { getAffiliateLink } from "@/lib/affiliateLinks";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = findGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | Lower My Medical Bills`,
    description: guide.description,
  };
}

export default async function GuideArticlePage({ params }) {
  const { slug } = await params;
  const guide = findGuideBySlug(slug);

  if (!guide) notFound();

  const appealsLink = getAffiliateLink("appealsGuide", "guide-article");
  const plansLink = getAffiliateLink("plans", "guide-article");

  return (
    <article className="guide-article-page">
      <Link href="/guides" className="guide-back-link">
        ← Back to all guides
      </Link>

      <header className="guide-header">
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
        <span>Updated {guide.updatedAt}</span>
      </header>

      {guide.sections.map((section, idx) => (
        <section className="guide-section" key={`${guide.slug}-${idx}`}>
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
        </section>
      ))}

      <section className="guide-cta-box">
        <h2>Ready to apply this to your own bill?</h2>
        <p>
          Upload your EOB and get a claim-by-claim review with an appeal prep
          plan.
        </p>
        <Link href="/analyzer" className="guide-primary-cta">
          Analyze My EOB
        </Link>
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
    </article>
  );
}
