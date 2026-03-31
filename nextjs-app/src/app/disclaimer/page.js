export const metadata = {
  title: "Disclaimer | Lower My Medical Bills",
  description: "Important limitations and intended use of analysis output.",
  alternates: { canonical: "https://www.lowermymedicalbills.com/disclaimer" },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return (
    <main className="content-page">
      <section className="content-card">
        <h1>Disclaimer</h1>
        <p>
          This tool helps identify possible billing issues but does not replace professional
          advice from licensed legal, clinical, or insurance experts.
        </p>
        <ul>
          <li>Outputs are generated from uploaded data and heuristic analysis.</li>
          <li>Potential savings estimates are directional and not guaranteed outcomes.</li>
          <li>Confirm all numbers with your insurer and provider before making payments.</li>
        </ul>
      </section>
    </main>
  );
}
