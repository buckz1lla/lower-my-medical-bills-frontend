export const metadata = {
  title: "Contact | Lower My Medical Bills",
  description: "How to contact Lower My Medical Bills for support, corrections, and policy questions.",
  alternates: { canonical: "https://www.lowermymedicalbills.com/contact" },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <main className="content-page">
      <section className="content-card">
        <h1>Contact</h1>
        <p>
          Need help with site content, privacy requests, or a correction? Use the contact routes below
          and include relevant page URLs or claim context so we can respond faster.
        </p>

        <h2>Support</h2>
        <p>Email: support@lowermymedicalbills.com</p>

        <h2>Editorial corrections</h2>
        <p>Email: editorial@lowermymedicalbills.com</p>

        <h2>Privacy and data requests</h2>
        <p>Email: privacy@lowermymedicalbills.com</p>

        <h2>What to include in your message</h2>
        <ul>
          <li>The page URL or guide title you are referencing.</li>
          <li>A short description of the issue or requested update.</li>
          <li>Any time-sensitive deadline tied to your claim or appeal.</li>
        </ul>

        <h2>Response timing</h2>
        <p>
          We typically respond within 2 business days. If your issue is deadline-sensitive,
          include the exact due date in your subject line.
        </p>
      </section>
    </main>
  );
}
