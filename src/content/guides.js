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
  {
    slug: 'surprise-out-of-network-bills',
    title: 'How to Fight a Surprise Out-of-Network Bill',
    description: 'Federal law may protect you from unexpected out-of-network charges. Here is how to use it.',
    updatedAt: '2026-03-27',
    sections: [
      {
        heading: 'What the No Surprises Act covers',
        body: 'As of 2022, the No Surprises Act limits what out-of-network providers can bill you in emergency situations and for certain scheduled care at in-network facilities. If a provider is out-of-network but the facility is in-network, the law often caps your cost at your in-network rate.',
      },
      {
        heading: 'Check your EOB for the magic words',
        body: 'Look for "out-of-network" or "non-participating provider" on your EOB. Also check whether the care was at an in-network hospital or surgery center. If yes, the No Surprises Act likely applies and you may have overpaid.',
      },
      {
        heading: 'Request an itemized bill and compare',
        body: 'Get the full itemized bill from the provider and your EOB from the insurer. Compare every line. Out-of-network providers sometimes bill for services already covered under your in-network processing.',
      },
      {
        heading: 'File a complaint if protections were violated',
        body: 'If you believe the No Surprises Act was violated, file a complaint with CMS at cms.gov/nosurprises. Your state insurance commissioner is another avenue. Documented complaints often resolve faster than direct disputes.',
      },
      {
        heading: 'Negotiate directly as a fallback',
        body: 'If the law does not apply, contact the provider billing office and ask for the in-network or Medicare rate. Many providers will match it rather than pursue collections.',
      },
    ],
    faq: [
      {
        q: 'Does the No Surprises Act apply to ground ambulance services?',
        a: 'Ground ambulance is currently excluded from No Surprises Act protections, though some states have separate rules. Air ambulance is covered.',
      },
      {
        q: 'Can the provider send me to collections while I dispute?',
        a: 'During an active good-faith dispute, most providers are prohibited from sending the balance to collections. Document all communication.',
      },
    ],
  },
  {
    slug: 'deductible-copay-out-of-pocket-explained',
    title: 'Deductible, Copay, and Out-of-Pocket Max: What You Actually Owe',
    description: 'Break down the three cost-sharing terms that determine every medical bill you receive.',
    updatedAt: '2026-03-27',
    sections: [
      {
        heading: 'The deductible: your annual starting line',
        body: 'Your deductible is the amount you pay out of pocket before insurance starts contributing. If your deductible is $2,000, the first $2,000 of covered medical costs each year is entirely on you. Preventive services like annual checkups are usually exempt.',
      },
      {
        heading: 'Copays and coinsurance: after the deductible',
        body: 'Once you hit your deductible, cost-sharing kicks in. A copay is a fixed dollar amount ($30 for a specialist visit). Coinsurance is a percentage — if yours is 20%, you pay 20% of covered costs and insurance pays 80%.',
      },
      {
        heading: 'The out-of-pocket maximum: your ceiling',
        body: 'This is the most you will ever pay in a plan year for covered services. Once you hit this number, insurance pays 100% for the rest of the year. Premium payments do not count toward it.',
      },
      {
        heading: 'Why your EOB can still surprise you',
        body: 'Out-of-network charges, non-covered services, and billing errors can add costs that do not count against your deductible or out-of-pocket max. Always check that the service was coded correctly and processed as in-network if you used an in-network provider.',
      },
      {
        heading: 'How to track where you stand mid-year',
        body: 'Log into your insurance member portal and look for a cost summary or benefits accumulator. It shows current deductible progress, copay history, and remaining out-of-pocket balance. Reconcile this against your EOBs quarterly.',
      },
    ],
    faq: [
      {
        q: 'Do separate deductibles apply for family vs. individual coverage?',
        a: 'Yes. Family plans often have both an individual deductible and a family deductible. Either threshold being met can trigger insurance to start sharing costs.',
      },
      {
        q: 'Does my deductible reset every January 1?',
        a: 'Most plans reset on the plan anniversary date, which is commonly January 1 but not always. Check your plan documents for your specific reset date.',
      },
    ],
  },
  {
    slug: 'baby-medical-bills-guide',
    title: 'Having a Baby and Drowning in Bills? Start Here',
    description: 'A practical guide to sorting through hospital bills, newborn charges, and insurance surprises after delivery.',
    updatedAt: '2026-03-27',
    sections: [
      {
        heading: 'Expect multiple separate bills',
        body: 'After a delivery you will typically receive separate bills from the hospital, your OB, the anesthesiologist, the pediatrician, and possibly a neonatologist. Each provider bills independently. Keep a folder and log every bill as it arrives.',
      },
      {
        heading: 'Add your newborn to insurance within 30 days',
        body: 'Most plans require enrollment within 30 days of birth to avoid coverage gaps. If you miss this window, NICU or pediatric claims may be denied entirely. Call your HR or insurer the week you return home.',
      },
      {
        heading: 'Review for duplicate billing between mom and baby',
        body: 'Newborn charges are sometimes billed twice: once under the mother\'s policy and once under the baby\'s. Look for duplicate procedure codes, especially for nursery days, initial exams, and screenings.',
      },
      {
        heading: 'NICU bills are negotiable',
        body: 'NICU stays can generate bills in the tens of thousands. Hospitals often have charity care or financial assistance programs that are never proactively offered. Ask the billing office directly for all available programs and request an itemized statement before paying anything.',
      },
      {
        heading: 'Dispute anesthesia charges if billed out-of-network',
        body: 'Anesthesiologists are one of the most common sources of surprise out-of-network bills during in-network deliveries. Under the No Surprises Act, your insurer should process this at the in-network rate. File a dispute if yours did not.',
      },
    ],
    faq: [
      {
        q: 'What if the hospital and my insurer disagree on what is owed?',
        a: 'Start with the insurer: get a written explanation of benefits with the denial reason code. Then contact the hospital billing office with that code and request a peer-to-peer review or corrected claim.',
      },
      {
        q: 'Is a well-baby visit the same as a sick visit for billing?',
        a: 'No. Well-baby visits are usually 100% covered as preventive care. If the pediatrician or biller adds a diagnosis code from that same visit, it can convert the claim to a non-preventive visit and trigger a copay. Ask the billing office to separate the charges.',
      },
    ],
  },
  {
    slug: 'in-network-vs-out-of-network-costs',
    title: 'In-Network vs. Out-of-Network: What It Actually Costs You',
    description: 'Understand why two visits to "different" doctors can leave you with wildly different bills.',
    updatedAt: '2026-03-27',
    sections: [
      {
        heading: 'What "in-network" means on your bill',
        body: 'In-network providers have signed a contract with your insurer that sets maximum allowed rates. When you use one, your insurer applies the contracted discount before calculating your cost share. Out-of-network providers have no such contract — they can bill any amount, and your insurer may pay little or nothing.',
      },
      {
        heading: 'How to verify network status before an appointment',
        body: 'Always verify directly with both the provider and your insurer. Provider directories on insurer websites are often outdated. Call your insurer before a procedure, get a reference number, and ask the provider to confirm they will bill under your plan.',
      },
      {
        heading: 'The balance billing trap',
        body: 'Balance billing is when an out-of-network provider bills you for the gap between what they charged and what your insurer paid. This is the main financial risk of OON care. In some states and for some services, balance billing is restricted or banned.',
      },
      {
        heading: 'When out-of-network care is unavoidable',
        body: 'Emergencies are the clearest case. Mental health and specialty care also involve frequent network gaps. If you must use an OON provider, request a single-case agreement — a temporary in-network exception that your insurer may grant for ongoing treatment.',
      },
      {
        heading: 'How to dispute an OON charge after the fact',
        body: 'Gather your EOB, the provider bill, and any proof that you attempted to find an in-network alternative. Submit a written appeal citing the network gap. Also check whether the No Surprises Act applies to your situation before negotiating directly.',
      },
    ],
    faq: [
      {
        q: 'Can my insurer retroactively change a provider to out-of-network?',
        a: 'Yes, if the provider left the network after your referral but before treatment. If you had a referral in writing, appeal using that documentation and the date the referral was issued.',
      },
      {
        q: 'Does my out-of-pocket maximum protect me from OON charges?',
        a: 'Usually not. Most plans have separate in-network and out-of-network accumulators, meaning OON costs may not count toward your in-network out-of-pocket maximum. Check your plan documents carefully.',
      },
    ],
  },
];

export const findGuideBySlug = (slug) => guides.find((g) => g.slug === slug);
