import Link from "next/link";

export const metadata = {
  title: "EOB Analyzer | Lower My Medical Bills",
  description:
    "Upload your Explanation of Benefits to detect billing errors and savings opportunities.",
};

export default function AnalyzerPage() {
  return (
    <main className="home-page">
      <section className="how-grid">
        <h1 style={{ fontFamily: "var(--font-heading)", marginBottom: 8 }}>
          Analyzer Migration In Progress
        </h1>
        <p>
          The analyzer workflow is being ported from CRA to Next.js. During this
          phase, keep using the current production analyzer while we migrate
          upload, results, and PDF export features.
        </p>
        <p style={{ marginTop: 10 }}>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </p>
      </section>
    </main>
  );
}
