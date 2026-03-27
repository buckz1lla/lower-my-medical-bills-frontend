export const guides = [
  {
    slug: 'how-to-appeal-a-denied-insurance-claim',
    title: 'How to Appeal a Denied Insurance Claim',
    description: 'A practical 7-step process to challenge denied claims and improve approval odds.',
    updatedAt: '2026-03-26',
    sections: [
      {
        heading: 'Start with the denial reason code',
        body: 'Pull your EOB and denial letter. Write down the exact reason code and insurer explanation. You need this language in every phone call and appeal letter.',
      },
      {
        heading: 'Gather your supporting records',
        body: 'Collect itemized bills, clinical notes, referrals, prior authorization records, and your policy excerpt. Missing documentation is the most common avoidable failure point.',
      },
      {
        heading: 'Call and document everything',
        body: 'Call member services and ask what exact evidence would reverse the denial. Capture date, time, representative name, and reference number. Keep one running log.',
      },
      {
        heading: 'Submit a written appeal with structure',
        body: 'State who you are, claim ID, denial date, denial reason, and why it conflicts with your policy terms. Attach supporting records and request written confirmation.',
      },
      {
        heading: 'Escalate to external review if needed',
        body: 'If internal appeal is denied, request external review through your state or plan process. External reviewers are independent and often overturn weak denials.',
      },
    ],
    faq: [
      {
        q: 'How long do appeals take?',
        a: 'Most internal appeals take 30 to 60 days, with expedited paths for urgent care scenarios.',
      },
      {
        q: 'Can I appeal more than once?',
        a: 'Yes. Most plans have multiple levels of internal appeal followed by an external review option.',
      },
    ],
  },
  {
    slug: 'what-is-an-eob-and-how-to-read-it',
    title: 'What Is an EOB and How to Read It',
    description: 'Decode billed amount, allowed amount, insurance paid, and patient responsibility without guesswork.',
    updatedAt: '2026-03-26',
    sections: [
      {
        heading: 'Billed vs. allowed amount',
        body: 'Billed is what the provider charged. Allowed is what your plan recognizes. Big gaps are normal for in-network contracts but can signal out-of-network exposure.',
      },
      {
        heading: 'Insurance paid and adjustments',
        body: 'Insurance paid is the amount your plan covered. Adjustments include contractual write-downs and should reduce your final balance.',
      },
      {
        heading: 'Patient responsibility line',
        body: 'This line combines deductible, copay, and coinsurance. Compare it against your policy and prior deductible progress.',
      },
      {
        heading: 'Reason codes are the signal',
        body: 'Reason codes explain exactly why money shifted from insurer to patient. Track repeated codes; they often reveal process errors you can appeal.',
      },
    ],
    faq: [
      {
        q: 'Is an EOB a bill?',
        a: 'No. It is an explanation from your insurer. You still need to compare it against the provider bill.',
      },
      {
        q: 'What if my EOB and provider bill do not match?',
        a: 'Call the provider billing office first, then insurer member services with claim IDs and reason codes.',
      },
    ],
  },
  {
    slug: 'medical-bill-too-high-what-to-do',
    title: 'Medical Bill Too High? What to Do in the First 48 Hours',
    description: 'A rapid response checklist to prevent overpayment and preserve your appeal options.',
    updatedAt: '2026-03-26',
    sections: [
      {
        heading: 'Do not pay immediately',
        body: 'Ask for an itemized bill and match every charge against your EOB. Immediate payment can reduce leverage in disputes.',
      },
      {
        heading: 'Request coding and billing review',
        body: 'Ask whether any services were coded as out-of-network, unbundled, or duplicate. Coding corrections can drop balances quickly.',
      },
      {
        heading: 'Ask for hardship or prompt-pay options',
        body: 'Many providers have internal reductions and payment plans not publicly listed. Ask directly for all available programs.',
      },
      {
        heading: 'Build a paper trail',
        body: 'Keep screenshots, call logs, and PDFs. If escalation is required, documentation quality usually determines outcome quality.',
      },
    ],
    faq: [
      {
        q: 'Can I negotiate after insurance already paid?',
        a: 'Yes. You can still negotiate patient-responsibility portions directly with the provider.',
      },
      {
        q: 'Will negotiation hurt my credit?',
        a: 'Not if you stay engaged and document active dispute or payment-plan discussions.',
      },
    ],
  },
];

export const findGuideBySlug = (slug) => guides.find((g) => g.slug === slug);
