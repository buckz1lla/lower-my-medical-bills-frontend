import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getProcedureBySlug,
  toSlug,
  getRelated,
  commercialLow,
  commercialHigh,
  fmt,
} from "@/lib/procedures";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProcedureBySlug(slug);
  if (!p) return {};

  const title = `${p.description} Cost — CPT ${p.cpt} Medicare Rate | Lower My Medical Bills`;
  const description = `The 2024 Medicare rate for ${p.description} (CPT ${p.cpt}) is $${fmt(p.medicare_rate)}. Commercial insurers typically pay $${fmt(commercialLow(p.medicare_rate))}–$${fmt(commercialHigh(p.medicare_rate))}. Check if your bill is fair.`;

  return {
    title,
    description,
    alternates: { canonical: `https://lowermymedicalbills.com/procedures/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `https://lowermymedicalbills.com/procedures/${slug}`,
      siteName: "Lower My Medical Bills",
      type: "article",
    },
  };
}

export default async function ProcedurePage({ params }) {
  const { slug } = await params;
  const p = getProcedureBySlug(slug);
  if (!p) notFound();

  const related = getRelated(p.cpt, p.category);
  const low = commercialLow(p.medicare_rate);
  const high = commercialHigh(p.medicare_rate);
  const pageUrl = `https://lowermymedicalbills.com/procedures/${slug}`;

  // Structured data for Google rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: p.description,
    procedureType: p.category,
    code: { "@type": "MedicalCode", codeValue: p.cpt, codingSystem: "CPT" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does ${p.description} cost without insurance?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Without insurance, you may be billed the chargemaster (list) rate, which can be 3–10× the Medicare rate. For ${p.description}, that could mean a bill of $${fmt(p.medicare_rate * 3)}–$${fmt(p.medicare_rate * 5)} or more. Always ask for the self-pay or cash-pay rate before accepting the listed price — providers often offer significant discounts.`,
        },
      },
      {
        "@type": "Question",
        name: `What is CPT code ${p.cpt}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `CPT ${p.cpt} is the Current Procedural Terminology code assigned to ${p.description}. It is used by providers, insurers, and Medicare to identify and bill for this specific service. You will find it on your Explanation of Benefits (EOB) or itemized bill.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I negotiate the cost of ${p.description}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Negotiating medical bills is common and often successful. Referencing the Medicare rate of $${fmt(p.medicare_rate)} gives you a credible, federally published benchmark to anchor the conversation. Many providers will accept 1–1.5× Medicare as a cash settlement.`,
        },
      },
    ],
  };

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
        name: p.category,
        item: pageUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: p.description,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="proc-page">
        <nav className="proc-breadcrumb" aria-label="Breadcrumb">
          <Link href="/procedures">Procedure Cost Guide</Link>
          <span aria-hidden="true"> › </span>
          <span>{p.category}</span>
          <span aria-hidden="true"> › </span>
          <span>{p.description}</span>
        </nav>

        <div className="proc-page-layout">
          {/* Main content */}
          <main className="proc-main">
            <header className="proc-header">
              <span className="proc-category-badge">{p.category}</span>
              <h1>{p.description}</h1>
              <p className="proc-cpt-line">CPT Code: <strong>{p.cpt}</strong></p>
            </header>

            {/* Rate cards */}
            <section className="proc-rates-section">
              <div className="proc-rate-card proc-rate-card--medicare">
                <span className="proc-rate-label">2024 Medicare Benchmark</span>
                <span className="proc-rate-amount">${fmt(p.medicare_rate)}</span>
                <span className="proc-rate-note">CMS national average payment rate</span>
              </div>
              <div className="proc-rate-card proc-rate-card--commercial">
                <span className="proc-rate-label">Typical Commercial Range</span>
                <span className="proc-rate-amount">${fmt(low)} – ${fmt(high)}</span>
                <span className="proc-rate-note">What most insurers actually pay (1.2–2× Medicare)</span>
              </div>
            </section>

            {/* Bill checker CTA */}
            <section className="proc-checker-cta">
              <h2>Was your bill higher than this?</h2>
              <p>
                Enter what you were charged below to instantly see how your bill compares
                to the Medicare benchmark — and whether it&rsquo;s worth disputing.
              </p>
              <Link
                href={`/fair-price?q=${encodeURIComponent(p.description)}&cpt=${p.cpt}`}
                className="btn-primary proc-checker-btn"
              >
                Check My Bill for {p.description} →
              </Link>
            </section>

            {/* Explainer */}
            <section className="proc-explainer">
              <h2>Understanding the cost of {p.description}</h2>

              <h3>What does the Medicare rate mean?</h3>
              <p>
                The Medicare rate of <strong>${fmt(p.medicare_rate)}</strong> is the amount
                the federal government pays providers for CPT {p.cpt} under the Medicare
                Physician Fee Schedule. It&rsquo;s the most widely published benchmark for
                what a procedure "should" cost and is used as a reference point by commercial
                insurers when negotiating their own rates.
              </p>

              <h3>What do commercial insurers pay?</h3>
              <p>
                Commercial insurers (Blue Cross, Aetna, UnitedHealth, etc.) negotiate rates
                independently with each provider network. As a rule of thumb, these rates
                fall in the <strong>${fmt(low)} – ${fmt(high)}</strong> range for{" "}
                {p.description} — roughly 1.2 to 2 times Medicare. If you were billed
                significantly more, the excess may be negotiable.
              </p>

              <h3>What if I was billed more than the commercial range?</h3>
              <p>
                Bills above the typical commercial range are common, especially for
                uninsured or out-of-network patients who receive chargemaster (list) prices.
                You have several options:
              </p>
              <ul className="proc-tip-list">
                <li>
                  <strong>Ask for the Medicare rate or self-pay discount</strong> — many
                  providers will accept this immediately.
                </li>
                <li>
                  <strong>Request an itemized bill</strong> — billing errors are common
                  and can account for hundreds or thousands of dollars.
                </li>
                <li>
                  <strong>Appeal if you have insurance</strong> — if the procedure was
                  denied or you were billed out-of-network, you have the right to appeal.
                </li>
                <li>
                  <strong>Ask about financial assistance</strong> — nonprofit hospitals
                  are required by law to offer charity care programs.
                </li>
              </ul>
            </section>

            {/* FAQ */}
            <section className="proc-faq">
              <h2>Frequently asked questions</h2>
              <div className="proc-faq-item">
                <h3>How much does {p.description} cost without insurance?</h3>
                <p>
                  Without insurance, you may be billed the chargemaster (list) rate, which
                  can be 3–10× the Medicare rate. For {p.description}, that could mean a
                  bill of ${fmt(p.medicare_rate * 3)}–${fmt(p.medicare_rate * 5)} or more.
                  Always ask for the self-pay or cash-pay rate before accepting the listed
                  price — providers often offer significant discounts.
                </p>
              </div>
              <div className="proc-faq-item">
                <h3>What is CPT code {p.cpt}?</h3>
                <p>
                  CPT {p.cpt} is the Current Procedural Terminology code assigned to{" "}
                  {p.description}. It&rsquo;s used by providers, insurers, and Medicare to
                  identify and bill for this specific service. You&rsquo;ll find it on your
                  Explanation of Benefits (EOB) or itemized bill.
                </p>
              </div>
              <div className="proc-faq-item">
                <h3>Can I negotiate the cost of {p.description}?</h3>
                <p>
                  Yes. Negotiating medical bills is common and often successful. Referencing
                  the Medicare rate of <strong>${fmt(p.medicare_rate)}</strong> gives you a
                  credible, federally published benchmark to anchor the conversation. Many
                  providers will accept 1–1.5× Medicare as a cash settlement.
                </p>
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="proc-sidebar">
            <div className="proc-sidebar-card">
              <h3>Analyze your full EOB</h3>
              <p>
                Upload your Explanation of Benefits to get a complete claim-by-claim review,
                flag billing errors, and generate a ready-to-send appeal letter.
              </p>
              <Link href="/analyzer" className="btn-primary proc-sidebar-btn">
                Upload My EOB →
              </Link>
            </div>

            {related.length > 0 && (
              <div className="proc-sidebar-card">
                <h3>Related procedures</h3>
                <ul className="proc-related-list">
                  {related.map((r) => (
                    <li key={r.cpt}>
                      <Link href={`/procedures/${toSlug(r.description, r.cpt)}`}>
                        <span className="proc-related-name">{r.description}</span>
                        <span className="proc-related-rate">${fmt(r.medicare_rate)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="proc-sidebar-card proc-sidebar-card--subtle">
              <p className="proc-sidebar-disclaimer">
                Rates are 2024 CMS Medicare national averages. Actual payments vary by
                location and payer. Not medical or financial advice.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
