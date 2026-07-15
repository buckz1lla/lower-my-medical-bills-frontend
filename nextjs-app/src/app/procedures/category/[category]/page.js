import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCategorySlugs,
  getCategoryBySlug,
  categoryToSlug,
  toSlug,
  commercialLow,
  commercialHigh,
  fmt,
} from "@/lib/procedures";
import { getCategoryContent } from "@/lib/procedureCategoryContent";

export async function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const data = getCategoryBySlug(categorySlug);
  if (!data) return {};

  const { category, procedures } = data;
  const title = `${category} Costs — Medicare Benchmark Rates for ${procedures.length} Procedures | Lower My Medical Bills`;
  const description = `Compare Medicare benchmark rates for ${procedures.length} common ${category.toLowerCase()} procedures. See what providers are typically paid and check whether your bill is fair.`;

  return {
    title,
    description,
    alternates: { canonical: `https://lowermymedicalbills.com/procedures/category/${categorySlug}` },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `https://lowermymedicalbills.com/procedures/category/${categorySlug}`,
      siteName: "Lower My Medical Bills",
      type: "website",
    },
  };
}

export default async function ProcedureCategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const data = getCategoryBySlug(categorySlug);
  if (!data) notFound();

  const { category, procedures } = data;
  const pageUrl = `https://lowermymedicalbills.com/procedures/category/${categorySlug}`;
  const categoryContent = getCategoryContent(category);

  const rateValues = procedures.map((p) => p.medicare_rate);
  const minRate = Math.min(...rateValues);
  const maxRate = Math.max(...rateValues);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Procedure Cost Guide",
        item: "https://lowermymedicalbills.com/procedures",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category,
        item: pageUrl,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category} Procedure Costs`,
    numberOfItems: procedures.length,
    itemListElement: procedures.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `${p.description} (CPT ${p.cpt})`,
      url: `https://lowermymedicalbills.com/procedures/${toSlug(p.description, p.cpt)}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much do ${category.toLowerCase()} procedures cost?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Medicare benchmark rates for common ${category.toLowerCase()} procedures range from $${fmt(minRate)} to $${fmt(maxRate)}. Commercial insurers typically pay 1.2–2× these rates. Your actual cost depends on your plan, deductible, and whether the provider is in network.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I know if my ${category.toLowerCase()} bill is too high?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Compare the amount you were charged to the Medicare benchmark for that specific CPT code. If your bill is more than about 2–3× the Medicare rate, it may be worth requesting an itemized bill and negotiating or appealing.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="proc-index-page">
        <nav className="proc-breadcrumb" aria-label="Breadcrumb">
          <Link href="/procedures">Procedure Cost Guide</Link>
          <span aria-hidden="true"> › </span>
          <span>{category}</span>
        </nav>

        <section className="proc-index-hero">
          <div className="proc-index-hero-inner">
            <h1>{category} Costs</h1>
            <p>
              Medicare benchmark rates for {procedures.length} common {category.toLowerCase()}{" "}
              {procedures.length === 1 ? "procedure" : "procedures"}, ranging from{" "}
              <strong>${fmt(minRate)}</strong> to <strong>${fmt(maxRate)}</strong>. Use these as
              a reference to check whether your bill is fair.
            </p>
            <div className="proc-index-cta-row">
              <Link href="/fair-price" className="btn-primary">
                Check My Specific Bill →
              </Link>
              <Link href="/analyzer" className="btn-secondary">
                Analyze My EOB
              </Link>
            </div>
          </div>
        </section>

        <section className="proc-index-content">
          <section className="proc-category-section">
            <div className="proc-card-grid">
              {procedures.map((p) => (
                <Link
                  key={p.cpt}
                  href={`/procedures/${toSlug(p.description, p.cpt)}`}
                  className="proc-card"
                >
                  <span className="proc-card-name">{p.description}</span>
                  <span className="proc-card-cpt">CPT {p.cpt}</span>
                  <span className="proc-card-rate">${fmt(p.medicare_rate)}</span>
                  <span className="proc-card-rate-label">Medicare rate</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="proc-explainer">
            <h2>Understanding {category.toLowerCase()} costs</h2>
            {categoryContent ? (
              <p>{categoryContent.summary}</p>
            ) : (
              <p>
                The rates shown above are 2024 CMS Medicare national average payment rates — the
                amounts the federal government pays providers for each service. They are the most
                widely published benchmark for what a procedure &ldquo;should&rdquo; cost, and
                commercial insurers use them as a reference point when negotiating their own
                contracts.
              </p>
            )}
            <p>
              For {category.toLowerCase()} services, commercial insurers typically pay between{" "}
              <strong>${fmt(commercialLow(minRate))}</strong> and{" "}
              <strong>${fmt(commercialHigh(maxRate))}</strong> across this category — roughly 1.2
              to 2 times Medicare. If you were billed significantly more than the commercial range
              for your specific procedure, the excess may be negotiable.
            </p>
            <p>
              Click any procedure above to see its detailed Medicare rate, the typical commercial
              range, and specific steps for disputing an overcharge.
            </p>
          </section>

          {categoryContent && (
            <section className="proc-category-guidance">
              <h2>Common billing problems with {category.toLowerCase()} charges</h2>
              <div className="proc-issue-list">
                {categoryContent.commonIssues.map((issue, idx) => (
                  <div className="proc-issue-item" key={idx}>
                    <h3>{issue.title}</h3>
                    <p>{issue.body}</p>
                  </div>
                ))}
              </div>
              <h3>How to push back on a {category.toLowerCase()} charge</h3>
              <p>{categoryContent.negotiation}</p>
            </section>
          )}
        </section>

        <section className="proc-index-disclaimer">
          <p>
            Rates shown are 2024 CMS Medicare national average payment rates and are provided for
            informational purposes only. Actual payments vary by geographic area, facility type,
            and payer contract. This is not medical or financial advice.
          </p>
        </section>
      </div>
    </>
  );
}
