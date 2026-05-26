import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";

export const metadata = {
  title: "Lower My Medical Bills - Appeal-First EOB Review Tool",
  description:
    "Upload your Explanation of Benefits to triage risk, prioritize next actions, and prepare a stronger insurance appeal.",
  alternates: { canonical: "https://lowermymedicalbills.com" },
  openGraph: {
    title: "Lower My Medical Bills - Appeal-First EOB Review",
    description: "Triage claim risk and prepare a stronger appeal plan from your EOB in minutes.",
    url: "https://lowermymedicalbills.com",
    siteName: "Lower My Medical Bills",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="home-page home">
      <section className="hero">
        <div className="hero-text">
          <span className="hero-kicker">EOB Review &middot; Appeal Guidance</span>
          <h1>Turn a confusing EOB into a concrete action plan</h1>
          <p>
            We flag high-risk claim lines, explain why they matter, and help you
            prepare for insurer and provider conversations with more confidence.
          </p>
          <Link href="/analyzer" className="cta-button">
            Start My Claim Review
          </Link>
          <div className="hero-trust-row">
            <span>🔒 Secure upload</span>
            <span>No account required</span>
            <span>Results in seconds</span>
          </div>
        </div>

        <div className="hero-mock-wrap" aria-hidden="true">
          <div className="hero-mock-card">
            <div className="hero-mock-bar">
              <span>EOB Analysis</span>
              <span className="hero-mock-badge">Sample Result</span>
            </div>
            <div className="hero-mock-body">
              <div className="hero-mock-claim-line">WakeMed Outpatient &middot; Lab Services</div>
              <div className="hero-mock-savings-block">
                <div className="hero-mock-savings-label">Potential Savings Identified</div>
                <div className="hero-mock-savings-amount">$261.95</div>
                <div className="hero-mock-savings-note">Out-of-network lab &middot; Appeal eligible</div>
              </div>
              <div className="hero-mock-signals">
                <div className="hero-mock-signal hero-mock-signal-high">
                  <span className="hero-mock-signal-dot" />
                  <div className="hero-mock-signal-text">
                    <strong>OON Referred Ancillary</strong>
                    <span>High leverage &middot; Confidence: Medium</span>
                  </div>
                </div>
                <div className="hero-mock-signal hero-mock-signal-mid">
                  <span className="hero-mock-signal-dot" />
                  <div className="hero-mock-signal-text">
                    <strong>Network Auth Not Documented</strong>
                    <span>Verify before appealing</span>
                  </div>
                </div>
              </div>
              <div className="hero-mock-checklist">
                <div className="hero-mock-check">✓ Appeal prep steps generated</div>
                <div className="hero-mock-check">✓ Verification checklist ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-trust-band" aria-label="Policy and transparency links">
        <p>Built for transparency:</p>
        <div className="home-trust-links">
          <Link href="/editorial-policy">Editorial Policy</Link>
          <Link href="/sources">Source Methodology</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </section>

      <section className="how-it-works">
        <div className="hiw-header">
          <h3>How It Works</h3>
          <p className="hiw-sub">From confusing EOB to clear action plan in four steps.</p>
        </div>
        <ol className="hiw-steps" role="list">
          <li className="hiw-step">
            <div className="hiw-step-num" aria-hidden="true">1</div>
            <div className="hiw-step-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <h4>Upload Your EOB</h4>
            <p>Drop in your PDF, image, CSV, or XLSX. No account needed.</p>
          </li>
          <li className="hiw-step">
            <div className="hiw-step-num" aria-hidden="true">2</div>
            <div className="hiw-step-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <h4>We Triage the Claims</h4>
            <p>High-risk lines surface first — sorted by urgency and potential dollar impact.</p>
          </li>
          <li className="hiw-step">
            <div className="hiw-step-num" aria-hidden="true">3</div>
            <div className="hiw-step-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <h4>Read Your Action Brief</h4>
            <p>Plain-English breakdowns of every flag — no jargon, no guesswork.</p>
          </li>
          <li className="hiw-step">
            <div className="hiw-step-num" aria-hidden="true">4</div>
            <div className="hiw-step-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
            </div>
            <h4>Escalate with Confidence</h4>
            <p>Use your brief to call billing, contact your insurer, or draft an appeal.</p>
          </li>
        </ol>
      </section>

      <section className="sample-brief-section" aria-label="Sample action brief preview">
        <div className="sample-brief-label-row">
          <h3>What Your Action Brief Looks Like</h3>
          <span className="sample-badge">Sample Output</span>
        </div>
        <p className="sample-brief-intro">
          This is a representative example of what the review surfaces. Your actual results depend on
          the EOB you upload.
        </p>

        <div className="sample-brief-card">
          <div className="sample-brief-header">
            <span className="sample-brief-title">Action Brief — EOB Review</span>
            <span className="sample-brief-meta">3 signals found &middot; 2 high priority</span>
          </div>

          <ol className="sample-signal-list">
            <li className="sample-signal-item sample-signal-high">
              <div className="sample-signal-top">
                <span className="sample-priority-badge sample-priority-high">High Priority</span>
                <span className="sample-signal-amount">Est. impact: ~$340</span>
              </div>
              <h4>Out-of-Network Misclassification</h4>
              <p>
                The rendering provider appears in the insurer&#39;s network directory but the claim was
                processed at out-of-network rates, resulting in a higher patient share.
              </p>
              <div className="sample-signal-action">
                <span className="sample-action-label">Verify:</span>
                Confirm network status with your insurer using the provider NPI before paying.
              </div>
            </li>

            <li className="sample-signal-item sample-signal-high">
              <div className="sample-signal-top">
                <span className="sample-priority-badge sample-priority-high">High Priority</span>
                <span className="sample-signal-amount">Est. impact: ~$185</span>
              </div>
              <h4>Duplicate Line Item</h4>
              <p>
                Procedure code 99213 appears twice on the same date of service with identical
                rendering provider and billed amount.
              </p>
              <div className="sample-signal-action">
                <span className="sample-action-label">Verify:</span>
                Request an itemized bill and confirm the charge appeared only once on the claim.
              </div>
            </li>

            <li className="sample-signal-item sample-signal-watch">
              <div className="sample-signal-top">
                <span className="sample-priority-badge sample-priority-watch">Review Needed</span>
                <span className="sample-signal-amount">Impact unclear</span>
              </div>
              <h4>Deductible Accumulation Gap</h4>
              <p>
                Year-to-date deductible applied on this EOB does not match the accumulation shown
                on your prior EOB from 34 days earlier.
              </p>
              <div className="sample-signal-action">
                <span className="sample-action-label">Verify:</span>
                Request a current deductible accumulation statement from member services.
              </div>
            </li>
          </ol>

          <div className="sample-brief-footer">
            <span className="sample-brief-disclaimer">
              &#9432; Sample only. Not based on real data. Actual results depend on your EOB.
            </span>
            <Link href="/analyzer" className="cta-button sample-brief-cta">
              Run My EOB Review
            </Link>
          </div>
        </div>
      </section>

      <section className="trust-section">
        <h2>Privacy-Respecting by Default</h2>
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <h3>Secure Uploads</h3>
            <p>
              Files move through encrypted HTTPS and are removed after
              processing whenever possible.
            </p>
          </div>
          <div className="trust-card">
            <div className="trust-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
            <h3>No Account Required</h3>
            <p>
              Start a review without creating an account or committing to a
              subscription flow.
            </p>
          </div>
          <div className="trust-card">
            <div className="trust-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg></div>
            <h3>Plain-English Results</h3>
            <p>
              We translate insurance jargon into clear action steps you can use
              today.
            </p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>What is an Explanation of Benefits (EOB)?</summary>
            <p>
              An EOB is a statement from your insurance company showing what was
              billed, what the plan paid, and what you owe. It is not a bill
              itself, but it tells you how your claim was processed.
            </p>
          </details>
          <details className="faq-item">
            <summary>What issues do you usually flag?</summary>
            <p>
              Common errors include duplicate charges, upcoding, unbundling, and
              out-of-network billing for in-network providers.
            </p>
          </details>
          <details className="faq-item">
            <summary>Does this work for hospital bills, not just insurance EOBs?</summary>
            <p>
              Our tool is optimized for EOB documents from your insurer.
              Itemized hospital bills in CSV format also work.
            </p>
          </details>
          <details className="faq-item">
            <summary>Is my medical information safe when I upload?</summary>
            <p>
              Yes. Files are sent over encrypted HTTPS, analyzed in memory, and
              not retained on our servers after processing.
            </p>
          </details>
          <details className="faq-item">
            <summary>What if my claim was denied, can I still appeal?</summary>
            <p>
              Yes. If we detect a denied claim on your EOB, we highlight it and
              can generate a customized appeal prep document.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
