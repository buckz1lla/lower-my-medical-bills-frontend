import Link from "next/link";

export const metadata = {
  title: "Medical Billing Templates & Scripts | Lower My Medical Bills",
  description:
    "Copy-ready templates for appeal letters, billing calls, and dispute follow-ups when medical bills or claims are wrong.",
  alternates: { canonical: "https://www.lowermymedicalbills.com/templates" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Medical Billing Templates & Scripts",
    description:
      "Use these practical templates and scripts to dispute errors, appeal denials, and negotiate balances.",
    url: "https://www.lowermymedicalbills.com/templates",
    siteName: "Lower My Medical Bills",
    type: "website",
  },
};

const quickLinks = [
  {
    title: "Appeal Deadlines Timeline",
    href: "/guides/appeal-deadlines-internal-vs-external-review",
    desc: "Keep your internal and external review windows from expiring.",
  },
  {
    title: "Negotiation Phone + Email Scripts",
    href: "/guides/medical-bill-negotiation-scripts-phone-email",
    desc: "Use copy-ready language to ask for reductions and written terms.",
  },
  {
    title: "Financial Assistance Playbook",
    href: "/guides/hospital-charity-care-financial-assistance-guide",
    desc: "Apply for charity care and hardship programs with fewer delays.",
  },
  {
    title: "Network Gap Exception Request",
    href: "/guides/single-case-agreement-network-gap-exception",
    desc: "Request in-network terms when no specialist is available.",
  },
  {
    title: "Missing Info Denial Fix",
    href: "/guides/claim-denied-missing-information-how-to-fix",
    desc: "Resolve administrative denials caused by incomplete claim data.",
  },
];

export default function TemplatesPage() {
  return (
    <main className="templates-page">
      <section className="templates-hero">
        <p className="templates-kicker">Action Tools</p>
        <h1>Templates and Scripts You Can Use Today</h1>
        <p>
          These copy-ready templates are designed to help you move from confusion to
          action faster. Edit the placeholders, keep a paper trail, and always ask for
          written confirmation.
        </p>
      </section>

      <section className="templates-grid" aria-label="Template library">
        <article className="template-card">
          <h2>Billing Hold Request (Portal or Email)</h2>
          <p>Use when a claim is under review and you need to prevent collections movement.</p>
          <pre>{`Subject: Request for Temporary Billing Hold - Account [ACCOUNT_NUMBER]

Hello Billing Team,

I am requesting a temporary billing hold for account [ACCOUNT_NUMBER]. This balance is currently under active insurance review/appeal (claim ID: [CLAIM_ID], reference: [REFERENCE_NUMBER]).

Please confirm in writing that collections activity will be paused through [DATE] while this review is pending.

Thank you,
[FULL_NAME]
[PHONE]
[EMAIL]`}</pre>
        </article>

        <article className="template-card">
          <h2>Settlement Offer Request</h2>
          <p>Use after you validate the balance and want a written discounted resolution.</p>
          <pre>{`Subject: Settlement Request - Account [ACCOUNT_NUMBER]

Hello Billing Team,

I have reviewed the itemized bill and EOB for account [ACCOUNT_NUMBER]. I would like to resolve this account and am requesting a reduced settlement.

I can pay [OFFER_AMOUNT] as payment in full by [DATE] if accepted in writing.

Please confirm the final adjusted amount and that the account will be marked paid in full upon receipt.

Thank you,
[FULL_NAME]
[PHONE]
[EMAIL]`}</pre>
        </article>

        <article className="template-card">
          <h2>Claim Reprocessing Request (Insurer Call Script)</h2>
          <p>Use when coding, network status, or accumulator logic appears incorrect.</p>
          <pre>{`"I am calling about claim [CLAIM_ID] for date of service [DATE].
I believe this claim was processed incorrectly due to [ISSUE: network misclassification / duplicate line / deductible mismatch].
Please open a reprocessing request and provide the case reference number.
Can you also confirm the expected review timeline and where I can submit supporting documents?"`}</pre>
        </article>
      </section>

      <section className="templates-support-links">
        <h2>Related Playbooks</h2>
        <div className="templates-link-grid">
          {quickLinks.map((item) => (
            <Link key={item.href} href={item.href} className="templates-link-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span>Open playbook</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}