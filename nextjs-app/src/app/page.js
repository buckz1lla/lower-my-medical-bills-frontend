import Link from "next/link";

const FEATURED_GUIDES = [
  {
    slug: "how-to-appeal-a-denied-insurance-claim",
    title: "How to Appeal a Denied Claim",
    summary: "A 7-step process to challenge denials and improve approval odds.",
  },
  {
    slug: "what-is-an-eob-and-how-to-read-it",
    title: "How to Read Your EOB",
    summary: "Decode billed, allowed, and patient responsibility without guesswork.",
  },
  {
    slug: "surprise-out-of-network-bills",
    title: "Fight a Surprise Out-of-Network Bill",
    summary: "Federal law may cap what you owe. Here is how to use it.",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <header className="hero">
        <p className="hero-kicker">Medical Bill Review</p>
        <h1>Catch Billing Errors Before You Pay</h1>
        <p className="hero-copy">
          Upload your Explanation of Benefits and get clear, actionable findings
          on duplicates, denials, and out-of-network charges.
        </p>
        <div className="hero-actions">
          <Link href="/analyzer" className="btn-primary">
            Start Free EOB Analysis
          </Link>
          <Link href="/guides" className="btn-secondary">
            See How It Works
          </Link>
        </div>
      </header>

      <main className="content">
        <section className="stats-grid" aria-label="What users get">
          <article className="stat-card">
            <h2>3-minute review</h2>
            <p>Upload and get a readable claim breakdown instantly.</p>
          </article>
          <article className="stat-card">
            <h2>Plain-English output</h2>
            <p>No insurance jargon. Just what you can challenge and how.</p>
          </article>
          <article className="stat-card">
            <h2>Appeal guidance</h2>
            <p>Denied claims are flagged with practical next steps.</p>
          </article>
        </section>

        <section className="how-grid" aria-label="How it works">
          <h2>How It Works</h2>
          <ol>
            <li>
              <strong>Upload your EOB.</strong> PDF, image, or CSV exports are
              accepted.
            </li>
            <li>
              <strong>We parse each line item.</strong> Billed, allowed, paid,
              and responsibility are reconciled.
            </li>
            <li>
              <strong>You get actions to take.</strong> Use findings to call
              billing or file appeals.
            </li>
          </ol>
        </section>

        <section className="faq" aria-label="Frequently asked questions">
          <h2>FAQ</h2>
          <details>
            <summary>Is this a bill negotiation service?</summary>
            <p>
              It is an analysis tool that helps you identify likely claim issues
              and prepare a stronger conversation with billing or insurance.
            </p>
          </details>
          <details>
            <summary>Do I need an account?</summary>
            <p>No. You can run analysis without creating an account.</p>
          </details>
          <details>
            <summary>Can this help with denied claims?</summary>
            <p>
              Yes. Denials are highlighted and paired with suggested appeal
              actions.
            </p>
          </details>
        </section>

        <section className="home-guides" aria-label="Featured guides">
          <h2>Free Guides</h2>
          <div className="guides-grid">
            {FEATURED_GUIDES.map((g) => (
              <article key={g.slug} className="guide-card">
                <h3>
                  <Link href={`/guides/${g.slug}`}>{g.title}</Link>
                </h3>
                <p>{g.summary}</p>
                <div className="guide-meta">
                  <Link href={`/guides/${g.slug}`}>Read guide</Link>
                </div>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 18 }}>
            <Link href="/guides" className="btn-secondary">
              View all guides
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
