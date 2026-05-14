import Link from "next/link";
import { getProceduresByCategory, toSlug, fmt } from "@/lib/procedures";

export const metadata = {
  title: "Medical Procedure Cost Guide — Medicare Benchmark Rates | Lower My Medical Bills",
  description:
    "Look up what Medicare pays for 80+ common medical procedures. Compare against your bill to spot overcharges and negotiate with confidence.",
  alternates: { canonical: "https://lowermymedicalbills.com/procedures" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Medical Procedure Cost Guide — What Should You Pay?",
    description:
      "Free reference: Medicare benchmark rates for office visits, ER visits, MRIs, surgeries, labs, and more. Use these to check if your bill is fair.",
    url: "https://lowermymedicalbills.com/procedures",
    siteName: "Lower My Medical Bills",
    type: "website",
  },
};

const CATEGORY_ORDER = [
  "Office Visit",
  "Emergency Room",
  "Preventive Care",
  "Hospital Care",
  "Critical Care",
  "Lab",
  "Imaging",
  "Cardiology",
  "Mental Health",
  "Physical Therapy",
  "Minor Procedure",
  "Procedure",
  "Surgery",
  "Vaccine",
];

export default function ProceduresIndexPage() {
  const byCategory = getProceduresByCategory();
  const ordered = CATEGORY_ORDER.filter((c) => byCategory[c]);

  return (
    <div className="proc-index-page">
      <section className="proc-index-hero">
        <div className="proc-index-hero-inner">
          <h1>Medical Procedure Cost Guide</h1>
          <p>
            Medicare benchmark rates for 80+ common procedures. Use these as a reference
            to understand what providers are typically paid — and whether your bill is fair.
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
        <div className="proc-index-jump">
          <p className="proc-index-jump-label">Jump to category:</p>
          <div className="proc-index-jump-links">
            {ordered.map((cat) => (
              <a key={cat} href={`#${slugifyCategory(cat)}`} className="proc-jump-link">
                {cat}
              </a>
            ))}
          </div>
        </div>

        {ordered.map((cat) => (
          <section key={cat} id={slugifyCategory(cat)} className="proc-category-section">
            <h2 className="proc-category-heading">{cat}</h2>
            <div className="proc-card-grid">
              {byCategory[cat].map((p) => (
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
        ))}
      </section>

      <section className="proc-index-disclaimer">
        <p>
          Rates shown are 2024 CMS Medicare national average payment rates and are provided
          for informational purposes only. Actual payments vary by geographic area, facility
          type, and payer contract. Commercial insurers typically pay 1.2–2× Medicare.
        </p>
      </section>
    </div>
  );
}

function slugifyCategory(cat) {
  return cat.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
