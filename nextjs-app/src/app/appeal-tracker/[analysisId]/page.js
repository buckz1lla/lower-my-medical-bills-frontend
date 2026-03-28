import Link from "next/link";

export const metadata = {
  title: "Appeal Tracker | Lower My Medical Bills",
  description: "Track billing and insurance appeal follow-ups.",
};

export default function AppealTrackerPage({ params }) {
  return (
    <main className="content-page">
      <section className="content-card">
        <h1>Appeal Tracker Migration In Progress</h1>
        <p>
          The full tracker workflow is next in the migration queue. For now, keep using the
          current production tracker while Next parity is completed.
        </p>
        <p>
          Active analysis: <strong>{params.analysisId}</strong>
        </p>
        <p>
          <Link href={`/results/${params.analysisId}`} className="btn-primary">
            Back to Results
          </Link>
        </p>
      </section>
    </main>
  );
}
