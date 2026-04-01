import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";

export const metadata = {
  title: "Lower My Medical Bills - Free EOB Analyzer & Appeal Prep Tool",
  description:
    "Upload your Explanation of Benefits to spot potential billing errors and get the documents you need to prepare a stronger appeal. Free analysis.",
  alternates: { canonical: "https://www.lowermymedicalbills.com" },
  openGraph: {
    title: "Lower My Medical Bills - Free EOB Analyzer & Appeal Prep",
    description: "Spot potential billing errors in your EOB for free. Unlock appeal prep documents to dispute charges.",
    url: "https://www.lowermymedicalbills.com",
    siteName: "Lower My Medical Bills",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="home-page home">
      <section className="hero">
        <h1>Take Control of Your Medical Bills</h1>
        <p>
          Understand what you&apos;re paying for and discover potential savings
          opportunities.
        </p>
        <Link href="/analyzer" className="cta-button">
          Start Analyzing Your EOB
        </Link>
      </section>

      <section className="features">
        <h3>What We Help You With</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">&#128270;</div>
            <h4>Check My EOB</h4>
            <p>
              Upload your Explanation of Benefits and review potential billing
              issues before you call your insurer or provider.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128161;</div>
            <h4>Understand Your Coverage</h4>
            <p>
              Learn about in-network vs out-of-network claims, deductibles, and
              how your plan works for you.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128221;</div>
            <h4>Appeal Support</h4>
            <p>
                Get step-by-step appeal preparation guidance for denied claims,
                including what to document and who to contact.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128176;</div>
            <h4>Spot Issues to Review</h4>
            <p>
              Surface billing errors, duplicate charges, and other claim details
              worth reviewing before you appeal.
            </p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h3>How It Works</h3>
        <ol className="steps">
          <li>
            <span className="step-number">1</span>
            <div className="step-content">
              <h4>Upload Your EOB</h4>
              <p>
                Simply upload your Explanation of Benefits (PDF, image, or
                spreadsheet).
              </p>
            </div>
          </li>
          <li>
            <span className="step-number">2</span>
            <div className="step-content">
              <h4>We Analyze</h4>
              <p>
                Our system examines every claim for errors, billing issues, and
                potential appeal opportunities.
              </p>
            </div>
          </li>
          <li>
            <span className="step-number">3</span>
            <div className="step-content">
              <h4>Get Results</h4>
              <p>
                Receive a detailed report with prioritized actions you can take.
              </p>
            </div>
          </li>
          <li>
            <span className="step-number">4</span>
            <div className="step-content">
              <h4>Take Action</h4>
              <p>
                 Use your report to prepare a stronger appeal with the right
                 documents and talking points in hand.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="resource-section">
        <div className="resource-header">
          <h3>Learn Before You Call Billing</h3>
          <TrackedLink href="/guides" className="resource-link" eventData={{ source: "home_resource_header" }}>
            See all guides
          </TrackedLink>
        </div>
        <div className="resource-grid">
          <TrackedLink
            href="/guides/how-to-appeal-a-denied-insurance-claim"
            className="resource-card"
            eventData={{ source: "home_resource_card", slug: "how-to-appeal-a-denied-insurance-claim" }}
          >
            <h4>How to Appeal a Denied Insurance Claim</h4>
            <p>
              Use a 7-step framework to file a stronger appeal and avoid common
              denial traps.
            </p>
          </TrackedLink>
          <TrackedLink
            href="/guides/what-is-an-eob-and-how-to-read-it"
            className="resource-card"
            eventData={{ source: "home_resource_card", slug: "what-is-an-eob-and-how-to-read-it" }}
          >
            <h4>What Is an EOB and How to Read It</h4>
            <p>
              Decode claim lines fast so you can spot errors and avoid paying
              the wrong amount.
            </p>
          </TrackedLink>
          <TrackedLink
            href="/guides/medical-bill-too-high-what-to-do"
            className="resource-card"
            eventData={{ source: "home_resource_card", slug: "medical-bill-too-high-what-to-do" }}
          >
            <h4>Medical Bill Too High? What to Do First</h4>
            <p>
              Follow a first-48-hours checklist that protects leverage and keeps
              appeals viable.
            </p>
          </TrackedLink>
        </div>
      </section>

      <section className="trust-section">
        <h2>Your Privacy &amp; Security</h2>
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon">&#128274;</div>
            <h3>Secure Uploads</h3>
            <p>
              Files are transmitted over encrypted HTTPS and are not stored
              after analysis is complete.
            </p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">&#128100;</div>
            <h3>No Account Required</h3>
            <p>
              Analyze your EOB without creating an account or sharing personal
              health information.
            </p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">&#128172;</div>
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
            <summary>What types of billing errors are most common?</summary>
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
            <summary>What if my claim was denied can I appeal?</summary>
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
