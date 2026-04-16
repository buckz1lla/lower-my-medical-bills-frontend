import Link from "next/link";

export const metadata = {
  title: "About & Methodology | Lower My Medical Bills",
  description:
    "How Lower My Medical Bills works, who built it, and what the tool can and cannot determine. Written by a health insurance data engineer.",
  alternates: { canonical: "https://www.lowermymedicalbills.com/about" },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <main className="content-page">
      <section className="content-card">
        <h1>About This Tool</h1>

        <div className="about-byline">
          <p>
            <strong>Built by a health insurance data engineer.</strong> I work inside the industry
            and see how claims are processed, where billing errors occur, and what consumers
            typically don&apos;t know to ask. This site exists to close that gap — giving you the
            same working knowledge of the system that people inside it already have.
          </p>
          <p className="about-byline-meta">Last reviewed: April 2026</p>
        </div>

        <h2>Who this is for</h2>
        <p>
          This tool is for people who received an Explanation of Benefits (EOB) from their insurer
          and want to understand whether it was processed correctly — and what to do if it wasn&apos;t.
          You don&apos;t need to know billing codes or insurance jargon. You need a document and a few
          minutes.
        </p>
        <p style={{ marginTop: "10px" }}>Common situations where this helps:</p>
        <ul>
          <li>A bill arrived that seems higher than expected after insurance paid its share</li>
          <li>A claim was denied and you&apos;re not sure why or whether to appeal</li>
          <li>You had a large event (surgery, ER visit, childbirth) and are sorting through multiple bills</li>
          <li>You want to verify your deductible, out-of-pocket maximum, or coinsurance was applied correctly</li>
          <li>You received an out-of-network bill after receiving care at an in-network facility</li>
        </ul>

        <h2>How the review works</h2>
        <p>
          When you upload an EOB, the tool parses the document and checks it against a curated set
          of common billing error patterns. Here is what that process evaluates:
        </p>
        <ol className="about-method-steps">
          <li>
            <strong>Service and code validation</strong> — CPT and HCPCS codes are checked against
            the service type, setting, and date to surface known patterns for upcoding, unbundling,
            or duplicate billing.
          </li>
          <li>
            <strong>In-network and out-of-network classification</strong> — Provider network status
            is evaluated against claim processing flags to identify possible surprise billing
            scenarios or misclassification.
          </li>
          <li>
            <strong>Benefits accumulator check</strong> — Deductible and out-of-pocket maximum
            figures are checked for consistency across claims to flag potential accumulation errors.
          </li>
          <li>
            <strong>Denial code interpretation</strong> — Remittance advice remark codes (RARCs)
            and claim adjustment reason codes (CARCs) are mapped to plain-English explanations and
            the most common appeal pathways.
          </li>
          <li>
            <strong>Patient responsibility review</strong> — The member&apos;s share of each line item
            is assessed relative to standard cost-sharing rules to flag possible overpayment.
          </li>
        </ol>
        <p style={{ marginTop: "12px" }}>
          Results are organized into a ranked <strong>Claim Signal Queue</strong>, paired with a
          <strong> Verification Checklist</strong> of specific items to confirm before making calls,
          and an <strong>Appeal Prep Path</strong> when escalation looks warranted.
        </p>

        <h2>What this tool cannot determine</h2>
        <div className="about-limit-box">
          <p>
            This is <strong>educational guidance based on pattern analysis</strong>, not a legal or
            medical determination. The tool works with the data on your EOB and applies heuristic
            rules — it does not have access to your plan documents, your provider&apos;s billing records,
            your full claims history, or your insurer&apos;s adjudication system.
          </p>
          <ul>
            <li>
              Savings estimates are directional, not guaranteed. Actual outcomes depend on your
              specific plan language and the facts of your claim.
            </li>
            <li>
              Appeal likelihood signals reflect common patterns, not the specifics of your case.
            </li>
            <li>
              This tool does not provide legal, medical, or insurance advice.
            </li>
            <li>
              Always confirm findings with your insurer and provider before withholding payment
              or filing a formal dispute.
            </li>
          </ul>
        </div>

        <h2>Data and privacy</h2>
        <p>
          Uploaded files are used to run the analysis and return results to you. Files are processed
          for the active request and are not retained for any other purpose. No account is required
          and no personal health data is linked to your identity on this site.
        </p>
        <p style={{ marginTop: "8px" }}>
          For full details see the{" "}
          <Link href="/privacy" className="about-inline-link">
            Privacy Policy
          </Link>
          .
        </p>

        <h2>Sources and grounding</h2>
        <p>
          Billing error patterns are grounded in publicly available references including CMS billing
          guidelines, the AMA CPT code set, NUBC and NUCC claim form instructions, and published
          insurer processing manuals. The denial code library references the standard X12 835
          transaction set (CARCs and RARCs). This content reflects my working knowledge from the
          industry and is updated periodically as patterns evolve.
        </p>

        <div className="about-cta-block">
          <p>Ready to review your EOB?</p>
          <Link href="/analyzer" className="btn-primary">
            Start My Claim Review
          </Link>
        </div>
      </section>
    </main>
  );
}
