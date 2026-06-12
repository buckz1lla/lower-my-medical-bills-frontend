export const metadata = {
  title: "Privacy Policy | Lower My Medical Bills",
  description: "How Lower My Medical Bills handles uploaded documents and usage data.",
  alternates: { canonical: "https://lowermymedicalbills.com/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="content-page">
      <section className="content-card">
        <h1>Privacy Policy</h1>
        <p>
          We built this tool to handle your medical billing documents with as little data
          retention as possible. We do not sell your data, and we avoid collecting personal
          information we do not need.
        </p>

        <h2>Your uploaded file is never stored</h2>
        <p>
          When you upload an EOB, it is analyzed in memory and never written to our disk.
          The only thing we keep from the raw file is an irreversible SHA-256 fingerprint
          (a one-way hash) so that if you upload the same file again, we recognize it and
          do not charge you twice. That fingerprint cannot be turned back into your document.
        </p>

        <h2>Analysis results auto-delete</h2>
        <ul>
          <li>The parsed results of your analysis are automatically and permanently deleted 24 hours after upload.</li>
          <li>You can delete an analysis yourself at any time from the &ldquo;Pick up where you left off&rdquo; list on the analyzer page.</li>
          <li>Files are transmitted over encrypted HTTPS.</li>
          <li>We do not share your billing data with any third party.</li>
        </ul>

        <h2>What we do retain</h2>
        <p>
          To keep the service reliable and prevent abuse, we retain anonymized operational
          logs and payment records (handled by our payment processor). Payment records are
          tied to the file fingerprint described above, not to the contents of your document.
        </p>

        <h2>Your control</h2>
        <p>
          You can remove your analysis at any time, and anything you do not delete is purged
          automatically within 24 hours. For any additional privacy request or question,
          contact us through the support channel listed on the live site.
        </p>
      </section>
    </main>
  );
}
