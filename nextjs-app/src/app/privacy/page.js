export const metadata = {
  title: "Privacy Policy | Lower My Medical Bills",
  description: "How Lower My Medical Bills handles uploaded documents and usage data.",
};

export default function PrivacyPage() {
  return (
    <main className="content-page">
      <section className="content-card">
        <h1>Privacy Policy</h1>
        <p>
          We only use uploaded files to run billing analysis and return results to you.
          We do not sell user data, and we avoid collecting unnecessary personal information.
        </p>
        <h2>Data handling</h2>
        <ul>
          <li>Files are transmitted over encrypted HTTPS.</li>
          <li>Analysis inputs are processed for the active request flow.</li>
          <li>Operational logs are retained only as needed for reliability and abuse prevention.</li>
        </ul>
        <h2>Your control</h2>
        <p>
          If you need a data deletion request or have privacy questions, contact us through the
          support channel listed on the live site.
        </p>
      </section>
    </main>
  );
}
