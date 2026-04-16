import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";

export const metadata = {
  title: "Lower My Medical Bills - Appeal-First EOB Review Tool",
  description:
    "Upload your Explanation of Benefits to triage risk, prioritize next actions, and prepare a stronger insurance appeal.",
  alternates: { canonical: "https://www.lowermymedicalbills.com" },
  openGraph: {
    title: "Lower My Medical Bills - Appeal-First EOB Review",
    description: "Triage claim risk and prepare a stronger appeal plan from your EOB in minutes.",
    url: "https://www.lowermymedicalbills.com",
    siteName: "Lower My Medical Bills",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="home-page home">
      <section className="hero">
        <span className="hero-kicker">Appeal-first claim triage</span>
        <h1>Turn a confusing EOB into a concrete action plan</h1>
        <p>
          We flag high-risk claim lines, explain why they matter, and help you
          prepare for insurer and provider conversations with more confidence.
        </p>
        <Link href="/analyzer" className="cta-button">
          Start My Claim Review
        </Link>
      </section>

      <section className="features">
        <h3>What Makes Our Workflow Different</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">&#128270;</div>
            <h4>Risk-First Review</h4>
            <p>
              We prioritize the claim lines most likely to affect what you owe
              so you can focus on the highest-leverage issues first.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128161;</div>
            <h4>Plain-English Explanations</h4>
            <p>
              Decode deductibles, coinsurance, and network status without
              insurance jargon slowing you down.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128221;</div>
            <h4>Appeal-Ready Prep</h4>
            <p>
                Build a stronger case with a practical checklist, key claim
                details, and what to gather before you escalate.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128176;</div>
            <h4>Next-Step Prioritization</h4>
            <p>
              Know exactly what to do now, what can wait, and where you may be
              able to reduce your out-of-pocket burden.
            </p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h3>Your 4-Step Review Path</h3>
        <ol className="steps">
          <li>
            <span className="step-number">1</span>
            <div className="step-content">
              <h4>Upload Your EOB</h4>
              <p>
                Drop in your Explanation of Benefits file (PDF, image, CSV, or
                XLSX).
              </p>
            </div>
          </li>
          <li>
            <span className="step-number">2</span>
            <div className="step-content">
              <h4>We Triage the Claims</h4>
              <p>
                We identify likely billing problems and categorize them by
                urgency and potential impact.
              </p>
            </div>
          </li>
          <li>
            <span className="step-number">3</span>
            <div className="step-content">
              <h4>Review Your Action Brief</h4>
              <p>
                See your top findings, what they mean, and how to approach each
                one.
              </p>
            </div>
          </li>
          <li>
            <span className="step-number">4</span>
            <div className="step-content">
              <h4>Escalate with Confidence</h4>
              <p>
                 Use your brief to call billing, contact your insurer, or draft
                 a cleaner appeal packet.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="resource-section">
        <div className="resource-header">
          <h3>Build Your Billing Playbook</h3>
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
        <h2>Privacy-Respecting by Default</h2>
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon">&#128274;</div>
            <h3>Secure Uploads</h3>
            <p>
              Files move through encrypted HTTPS and are removed after
              processing whenever possible.
            </p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">&#128100;</div>
            <h3>No Account Required</h3>
            <p>
              Start a review without creating an account or committing to a
              subscription flow.
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
