export const metadata = {
  title: "Terms of Use | Lower My Medical Bills",
  description: "Terms for using the Lower My Medical Bills analysis experience.",
  alternates: { canonical: "https://www.lowermymedicalbills.com/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="content-page">
      <section className="content-card">
        <h1>Terms of Use</h1>
        <p>
          Lower My Medical Bills provides educational analysis tools. Results are informational
          and do not constitute legal, medical, or insurance advice.
        </p>
        <h2>Use of service</h2>
        <ul>
          <li>You are responsible for the accuracy and legality of documents you upload.</li>
          <li>You agree not to misuse the service or attempt unauthorized access.</li>
          <li>We may update or pause features as we improve reliability and accuracy.</li>
        </ul>
        <h2>Limitation</h2>
        <p>
          Final billing decisions are made by providers and insurers. Always verify findings
          directly against your EOB and billing statements.
        </p>
      </section>
    </main>
  );
}
