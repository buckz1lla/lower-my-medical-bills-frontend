import Link from "next/link";
import { allCodes, getCodesByGroup, toSlug, GROUP_ORDER } from "@/lib/denialCodes";

export const metadata = {
  title: "Insurance Denial & Adjustment Code Library — CARC/RARC Explained | Lower My Medical Bills",
  description:
    "Plain-English explanations of the most common insurance denial and adjustment codes (CARC and RARC). Understand why your claim was adjusted and exactly what to do next.",
  alternates: { canonical: "https://lowermymedicalbills.com/denial-codes" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Insurance Denial Code Library — CARC & RARC Explained",
    description:
      "Look up any CARC or RARC code from your Explanation of Benefits. Get plain-English explanations and step-by-step action plans.",
    url: "https://lowermymedicalbills.com/denial-codes",
    siteName: "Lower My Medical Bills",
    type: "website",
  },
};

const TYPE_LABELS = {
  CO: "Contractual Obligation",
  PR: "Patient Responsibility",
  OA: "Other Adjustments",
  PI: "Payer-Initiated",
  CR: "Correction / Reversal",
  CARC: "Claim Adjustment Reason",
  RARC: "Remark Code",
};

const SEVERITY_LABELS = {
  dispute: "Dispute This",
  action: "Action Needed",
  info: "Informational",
};

export default function DenialCodesIndexPage() {
  const byGroup = getCodesByGroup();
  const totalCount = allCodes.length;
  const carcCodes = allCodes.filter((c) => c.type === "CARC");
  const rarcCodes = allCodes.filter((c) => c.type === "RARC");

  // Build ordered group list
  const orderedGroups = GROUP_ORDER.filter((g) => byGroup[g]);

  return (
    <div className="dc-index-page">
      <section className="dc-hero">
        <div className="dc-hero-inner">
          <p className="dc-hero-eyebrow">Reference Library</p>
          <h1>Insurance Denial &amp; Adjustment Code Library</h1>
          <p className="dc-hero-sub">
            When your Explanation of Benefits (EOB) shows a denial or adjustment, it lists a
            code — but not what it means or what to do about it. This library covers{" "}
            <strong>{totalCount} CARC and RARC codes</strong> with plain-English explanations
            and specific action steps.
          </p>
          <div className="dc-hero-cta-row">
            <Link href="/analyzer" className="btn-primary">
              Analyze My EOB →
            </Link>
            <Link href="/guides" className="btn-secondary">
              Dispute Guides
            </Link>
          </div>
        </div>
        <div className="dc-hero-stats">
          <div className="dc-stat">
            <span className="dc-stat-number">{totalCount}</span>
            <span className="dc-stat-label">Codes Covered</span>
          </div>
          <div className="dc-stat">
            <span className="dc-stat-number">{carcCodes.length}</span>
            <span className="dc-stat-label">CARC Codes</span>
          </div>
          <div className="dc-stat">
            <span className="dc-stat-number">{rarcCodes.length}</span>
            <span className="dc-stat-label">RARC Codes</span>
          </div>
        </div>
      </section>

      <section className="dc-explainer-band">
        <div className="dc-explainer-inner">
          <div className="dc-explainer-item">
            <strong>CARC</strong>
            <span>Claim Adjustment Reason Code — explains why a payment was reduced or denied</span>
          </div>
          <div className="dc-explainer-divider" aria-hidden="true">|</div>
          <div className="dc-explainer-item">
            <strong>RARC</strong>
            <span>Remittance Advice Remark Code — provides additional context or instructions</span>
          </div>
          <div className="dc-explainer-divider" aria-hidden="true">|</div>
          <div className="dc-explainer-item">
            <strong>EOB</strong>
            <span>Explanation of Benefits — the statement your insurer sends after processing a claim</span>
          </div>
        </div>
      </section>

      <section className="dc-content">
        <div className="dc-jump-bar">
          <span className="dc-jump-label">Jump to:</span>
          {orderedGroups.map((g) => (
            <a key={g} href={`#${slugifyGroup(g)}`} className="dc-jump-link">
              {g} <span className="dc-jump-count">({byGroup[g].length})</span>
            </a>
          ))}
        </div>

        {orderedGroups.map((group) => (
          <section
            key={group}
            id={slugifyGroup(group)}
            className="dc-group-section"
          >
            <div className="dc-group-header">
              <h2 className="dc-group-heading">{group}</h2>
              <span className="dc-group-count">{byGroup[group].length} codes</span>
            </div>
            <div className="dc-card-grid">
              {byGroup[group].map((c) => (
                <Link
                  key={c.code}
                  href={`/denial-codes/${toSlug(c.code)}`}
                  className="dc-card"
                >
                  <div className="dc-card-top">
                    <span className="dc-code-badge dc-code-badge--type" data-type={c.type}>
                      {c.type}
                    </span>
                    <span className="dc-code-num">{c.code}</span>
                  </div>
                  <p className="dc-card-short">{c.short}</p>
                  <p className="dc-card-plain">{c.plain}</p>
                  <span className="dc-card-cta">See action steps →</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="dc-index-bottom-cta">
        <div className="dc-bottom-cta-inner">
          <h2>Got a denial code on your EOB?</h2>
          <p>
            Upload your Explanation of Benefits and our analyzer will identify every adjustment
            code, explain what it means, and tell you if it&rsquo;s worth disputing.
          </p>
          <Link href="/analyzer" className="btn-primary">
            Analyze My EOB Free →
          </Link>
        </div>
      </section>
    </div>
  );
}

function slugifyGroup(group) {
  return group.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
