import Link from "next/link";

export const metadata = {
  title: "Guides | Lower My Medical Bills",
  description:
    "Read practical guides to appeal denied claims and lower medical bills.",
};

const guides = [
  {
    title: "How to Appeal a Denied Insurance Claim",
    summary: "A practical, step-by-step checklist to file stronger appeals.",
  },
  {
    title: "What Is an EOB and How to Read It",
    summary: "Decode claim lines and find red flags before paying.",
  },
  {
    title: "Medical Bill Too High? What to Do First",
    summary: "Use a first-48-hours action plan to protect leverage.",
  },
];

export default function GuidesPage() {
  return (
    <main className="home-page">
      <section className="faq">
        <h1 style={{ fontFamily: "var(--font-heading)", marginBottom: 8 }}>
          Billing Guides
        </h1>
        {guides.map((guide) => (
          <article className="stat-card" key={guide.title}>
            <h2>{guide.title}</h2>
            <p>{guide.summary}</p>
          </article>
        ))}
        <p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </p>
      </section>
    </main>
  );
}
