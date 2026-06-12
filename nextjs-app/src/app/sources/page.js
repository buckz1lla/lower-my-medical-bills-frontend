import { getAllSources } from "@/lib/sources";

export const metadata = {
  title: "Sources and Methodology | Lower My Medical Bills",
  description:
    "Primary source categories and methodology used to build medical billing and appeal guidance.",
  alternates: { canonical: "https://lowermymedicalbills.com/sources" },
  robots: { index: true, follow: true },
};

export default function SourcesPage() {
  const sources = getAllSources();
  return (
    <main className="content-page">
      <section className="content-card">
        <h1>Sources and Methodology</h1>
        <p>
          Our content is built from process-level claim adjudication logic, publicly available policy
          materials, and recurring denial and billing workflows seen in real-world patient scenarios.
          We prioritize primary sources whenever possible.
        </p>

        <h2>Primary sources we cite</h2>
        <p>
          These are the authoritative government sources our guides reference directly. Each guide
          links to the sources most relevant to its topic.
        </p>
        <ul className="sources-link-list">
          {sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
              <span className="sources-link-publisher">{source.publisher}</span>
            </li>
          ))}
        </ul>

        <h2>Primary source categories</h2>
        <ul>
          <li>Federal protections and agency guidance, including No Surprises implementation resources.</li>
          <li>Insurer claim-processing rules, member handbooks, and appeal procedures.</li>
          <li>Provider billing and financial assistance policy documents.</li>
          <li>Standardized coding and transaction frameworks used in adjudication workflows.</li>
        </ul>

        <h2>How we convert sources into playbooks</h2>
        <ul>
          <li>Map each policy concept to a patient action step.</li>
          <li>Sequence actions by time sensitivity and leverage preservation.</li>
          <li>Add scripts and templates for common communication points.</li>
          <li>Highlight assumptions and known limits when data is incomplete.</li>
        </ul>

        <h2>Quality checks before publication</h2>
        <ul>
          <li>Terminology consistency across EOB, claim, and billing language.</li>
          <li>Timeline coherence for appeal and dispute windows.</li>
          <li>Cross-checks for likely edge cases (network status, COB, accumulator logic).</li>
        </ul>

        <h2>Important limitation</h2>
        <p>
          Rules vary by plan, employer contract, state law, and service type. Always verify final
          claim outcomes with your insurer and provider billing team using your specific claim IDs.
        </p>
      </section>
    </main>
  );
}
