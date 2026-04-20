import Link from "next/link";

export const metadata = {
  title: "Editorial Policy | Lower My Medical Bills",
  description:
    "How Lower My Medical Bills researches, updates, and quality-checks medical billing and appeal guidance.",
  alternates: { canonical: "https://www.lowermymedicalbills.com/editorial-policy" },
  robots: { index: true, follow: true },
};

export default function EditorialPolicyPage() {
  return (
    <main className="content-page">
      <section className="content-card">
        <h1>Editorial Policy</h1>
        <p>
          Lower My Medical Bills publishes practical guidance for understanding EOBs,
          billing errors, and claim appeals. Our goal is to make complex insurance workflows
          easier to follow without overstating legal or financial outcomes.
        </p>

        <h2>How content is created</h2>
        <ul>
          <li>Topics are selected from recurring patient billing and denial scenarios.</li>
          <li>Guides are drafted as action workflows, not generic encyclopedia summaries.</li>
          <li>Recommendations focus on documentation quality, process sequencing, and timeline control.</li>
        </ul>

        <h2>Source standards</h2>
        <p>
          We prioritize primary or first-party policy sources, including federal agency guidance,
          insurer documentation, and standard claim-processing references. Background sources are
          used only when they improve clarity and do not contradict primary materials.
        </p>

        <h2>Updates and corrections</h2>
        <p>
          We review high-traffic pages on a recurring schedule and update guidance when regulations,
          insurer practices, or appeal timelines materially change. If a page is revised, its updated
          date is refreshed in the guide metadata.
        </p>

        <h2>Limits of content</h2>
        <p>
          This site provides educational guidance and workflow support. It is not legal advice,
          medical advice, or a guarantee of claim outcomes. For case-specific decisions, users
          should confirm details directly with their insurer, provider billing office, and licensed
          professionals.
        </p>

        <h2>Related pages</h2>
        <ul>
          <li><Link href="/about">About and methodology</Link></li>
          <li><Link href="/sources">Source methodology</Link></li>
          <li><Link href="/disclaimer">Disclaimer</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </section>
    </main>
  );
}
