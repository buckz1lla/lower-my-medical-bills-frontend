export const guides = [
  {
    slug: 'why-am-i-paying-after-deductible-met',
    title: 'Why Am I Still Paying After I Hit My Deductible?',
    description: 'If your deductible is met but bills keep coming, use this checklist to spot processing issues fast.',
    updatedAt: '2026-04-15',
    sections: [
      {
        heading: 'Confirm deductible status for the exact claim date',
        body: 'Check your insurer accumulator for the date of service, not just your current dashboard total. Claims can be processed out of order and may reflect an earlier deductible balance.',
      },
      {
        heading: 'Separate deductible from coinsurance and copays',
        body: 'Meeting your deductible does not eliminate coinsurance or copays. Verify whether your EOB patient responsibility is coming from coinsurance instead of deductible.',
      },
      {
        heading: 'Check for out-of-network processing',
        body: 'Out-of-network claims may use a separate deductible or may not count toward your in-network out-of-pocket maximum. Confirm network status line by line.',
      },
      {
        heading: 'Look for non-covered or excluded services',
        body: 'Plan exclusions can still create patient balances after deductible is met. Your EOB reason code should clearly indicate if the service was excluded.',
      },
      {
        heading: 'Request reprocessing when accumulator math looks wrong',
        body: 'If totals do not reconcile, ask member services for claim reprocessing and a written accumulator explanation. Keep reference numbers for every call.',
      },
    ],
    faq: [
      {
        q: 'Can I still owe money after meeting my deductible?',
        a: 'Yes. Coinsurance, copays, out-of-network rules, and non-covered services can still create balances.',
      },
      {
        q: 'What is the fastest way to verify this?',
        a: 'Compare the EOB cost-share fields to your plan accumulator and confirm network status for each claim line.',
      },
    ],
  },
  {
    slug: 'out-of-pocket-maximum-not-applied-correctly',
    title: 'Out-of-Pocket Maximum Not Applied Correctly: What to Do',
    description: 'Use this step-by-step process when your insurer should have covered more after you hit your OOP max.',
    updatedAt: '2026-04-15',
    sections: [
      {
        heading: 'Verify which costs count toward your OOP max',
        body: 'Premiums and many non-covered services do not count. Confirm your plan document definitions before disputing claim totals.',
      },
      {
        heading: 'Match claim dates to your accumulator timeline',
        body: 'Out-of-pocket logic is date-sensitive. If older claims were processed late, newer claims may have been cost-shared incorrectly.',
      },
      {
        heading: 'Check in-network versus out-of-network accumulators',
        body: 'Many plans track separate OOP buckets. A claim processed out-of-network may bypass your in-network max entirely.',
      },
      {
        heading: 'Request an accumulator correction review',
        body: 'Ask your insurer for a formal accumulator audit and claim reprocessing. Request written confirmation of corrected totals.',
      },
      {
        heading: 'Escalate with a structured appeal packet',
        body: 'If correction is denied, file an appeal with EOBs, accumulator screenshots, and a timeline showing when the threshold was reached.',
      },
    ],
    faq: [
      {
        q: 'How do I prove my OOP max was reached?',
        a: 'Use insurer accumulator screenshots plus claim-level EOB dates and amounts in one chronological packet.',
      },
      {
        q: 'Do pharmacy costs count toward medical OOP maximums?',
        a: 'Sometimes. It depends on your plan design and whether medical and pharmacy benefits share accumulators.',
      },
    ],
  },
  {
    slug: 'appeal-prior-authorization-denial',
    title: 'How to Appeal a Prior Authorization Denial',
    description: 'A practical template-driven process for overturning prior authorization denials faster.',
    updatedAt: '2026-04-15',
    sections: [
      {
        heading: 'Get the denial rationale and policy criteria',
        body: 'Request the exact denial reason, policy citation, and utilization-review criteria used by the plan. This is the backbone of your appeal.',
      },
      {
        heading: 'Collect provider evidence that maps to criteria',
        body: 'Ask your clinician to address each criterion directly, including diagnosis severity, failed alternatives, and urgency.',
      },
      {
        heading: 'Submit a structured first-level appeal',
        body: 'Format your letter in sections that mirror insurer requirements. Reviewers resolve appeals faster when evidence is criterion-by-criterion.',
      },
      {
        heading: 'Request expedited review for urgent care',
        body: 'When delays can worsen outcomes, request expedited handling and ask your provider to document medical urgency clearly.',
      },
      {
        heading: 'Escalate to external review when needed',
        body: 'If internal appeals fail, file for external review with your complete packet and all insurer correspondence.',
      },
    ],
    faq: [
      {
        q: 'What makes prior auth appeals successful?',
        a: 'Evidence mapped line-by-line to insurer criteria is usually the highest-impact improvement.',
      },
      {
        q: 'Can my provider submit the appeal for me?',
        a: 'Yes, many offices do. You should still request copies and track deadlines yourself.',
      },
    ],
  },
  {
    slug: 'er-bill-too-high-how-emergency-claims-should-be-processed',
    title: 'ER Bill Too High? How Emergency Claims Should Be Processed',
    description: 'Learn the emergency-claim rules that most often cause overcharges and how to dispute them.',
    updatedAt: '2026-04-15',
    sections: [
      {
        heading: 'Confirm emergency classification on the EOB',
        body: 'Emergency claims should be processed under emergency benefit rules. If coding missed emergency status, reprocessing can reduce patient cost share.',
      },
      {
        heading: 'Check facility and clinician network mismatches',
        body: 'You may have used an in-network hospital while receiving out-of-network clinician bills. This is a frequent source of excess balances.',
      },
      {
        heading: 'Review surprise-billing protections',
        body: 'Federal and state protections may limit what you owe for emergency services regardless of clinician network status.',
      },
      {
        heading: 'Request insurer reprocessing with written rationale',
        body: 'Ask for in-network adjudication where protections apply and request written claim notes and reference numbers.',
      },
      {
        heading: 'Open provider billing dispute in parallel',
        body: 'Notify billing you are actively disputing claim processing and request a temporary collections hold.',
      },
    ],
    faq: [
      {
        q: 'Can emergency care be treated as out-of-network?',
        a: 'Plans can label providers out-of-network, but patient liability may still be limited under emergency and surprise-billing protections.',
      },
      {
        q: 'Should I pay first and dispute later?',
        a: 'Usually no. Keep leverage by requesting holds while review is active.',
      },
    ],
  },
  {
    slug: 'balance-billing-explained-when-it-may-be-illegal',
    title: 'Balance Billing Explained (And When It May Be Illegal)',
    description: 'Understand balance billing risk, when protections apply, and how to challenge improper charges.',
    updatedAt: '2026-04-15',
    sections: [
      {
        heading: 'What balance billing means in plain language',
        body: 'Balance billing is the amount a provider seeks beyond what your insurer allowed and paid. It is common with out-of-network care.',
      },
      {
        heading: 'Situations where billing protections may apply',
        body: 'Emergency services and certain in-network facility encounters often have federal or state guardrails that limit patient liability.',
      },
      {
        heading: 'How to verify if your bill is protected',
        body: 'Compare site of care, provider network status, and service type against No Surprises and state-level rules for your claim date.',
      },
      {
        heading: 'Dispute process that preserves leverage',
        body: 'Submit a written dispute with EOB, itemized bill, and timeline. Request account hold while insurer and provider review the claim.',
      },
      {
        heading: 'Escalation paths when provider refuses correction',
        body: 'Use CMS and state regulator complaint channels with complete documentation if direct billing negotiations stall.',
      },
    ],
    faq: [
      {
        q: 'Is balance billing always illegal?',
        a: 'No. It depends on service type, network context, and whether legal protections apply to that scenario.',
      },
      {
        q: 'What evidence should I keep?',
        a: 'Keep EOBs, itemized bills, call logs, and all written responses from insurer and provider billing teams.',
      },
    ],
  },
  {
    slug: 'medical-bill-sent-to-collections-while-disputing',
    title: 'Medical Bill Sent to Collections While You Are Disputing?'
    ,
    description: 'Use this action plan when collections begin before your insurance dispute is resolved.',
    updatedAt: '2026-04-15',
    sections: [
      {
        heading: 'Get dispute status in writing immediately',
        body: 'Request written confirmation that your appeal or claim correction request is active and include reference numbers in all follow-ups.',
      },
      {
        heading: 'Request a billing and collections hold',
        body: 'Ask provider billing and any collections agency for a temporary hold while insurer review remains open.',
      },
      {
        heading: 'Document every communication with dates',
        body: 'A complete timeline often determines whether escalation succeeds. Keep call logs, letters, and portal screenshots.',
      },
      {
        heading: 'Dispute inaccurate collections reporting quickly',
        body: 'If balances are inaccurate during active review, file written disputes and include insurer claim-status documentation.',
      },
      {
        heading: 'Escalate to regulators if process rights are ignored',
        body: 'State insurance and consumer protection channels can help when billing or collections proceed despite active claim disputes.',
      },
    ],
    faq: [
      {
        q: 'Can collections continue during an active claim dispute?',
        a: 'Policies vary, but many providers will pause activity when disputes are documented and escalated appropriately.',
      },
      {
        q: 'What should I send first?',
        a: 'Send written notice of active dispute plus claim IDs, EOBs, and insurer reference numbers.',
      },
    ],
  },
  {
    slug: 'coordination-of-benefits-denial-how-to-fix-primary-secondary-insurance',
    title: 'Coordination of Benefits Denial: Fix Primary vs Secondary Insurance',
    description: 'COB denials are fixable with the right data. Use this process to correct payer order and reprocess claims.',
    updatedAt: '2026-04-15',
    sections: [
      {
        heading: 'Identify the exact COB denial language',
        body: 'Locate reason codes indicating other coverage or payer-order mismatch. This defines your correction path.',
      },
      {
        heading: 'Confirm which plan is primary for that date',
        body: 'Primary versus secondary status can differ by coverage type, employment status, and dependent rules.',
      },
      {
        heading: 'Update both insurers with matching information',
        body: 'Submit the same policy and member details to both plans to avoid repeated mismatch loops.',
      },
      {
        heading: 'Request coordinated reprocessing of affected claims',
        body: 'Ask both payers to reprocess in sequence and provide written confirmation of payment order.',
      },
      {
        heading: 'Track corrected EOBs before paying balances',
        body: 'Do not finalize payment until new EOBs reflect corrected COB adjudication and patient responsibility.',
      },
    ],
    faq: [
      {
        q: 'What is the most common COB error?',
        a: 'Incorrect primary plan assignment or outdated policy records is the most common cause.',
      },
      {
        q: 'Can old claims be corrected?',
        a: 'Often yes, if filing windows remain open and both insurers receive consistent updated information.',
      },
    ],
  },
  {
    slug: 'how-to-read-cpt-and-hcpcs-codes-on-medical-bill',
    title: 'How to Read CPT and HCPCS Codes on a Medical Bill',
    description: 'Use billing codes to spot mismatches, duplicate charges, and stronger appeal opportunities.',
    updatedAt: '2026-04-15',
    sections: [
      {
        heading: 'Where codes appear on bills and EOBs',
        body: 'CPT and HCPCS codes usually appear per service line with date and units. Match these directly to claim lines on your EOB.',
      },
      {
        heading: 'Why modifiers and units matter',
        body: 'Small modifier differences can change reimbursement and patient liability materially. Unit errors can also inflate balances.',
      },
      {
        heading: 'Compare coding against what you received',
        body: 'Review each line for services not received, duplicate entries, or upcoding patterns that may warrant challenge.',
      },
      {
        heading: 'Link code mismatches to denial reasons',
        body: 'Many denials stem from coding conflicts. Use reason codes and line details together to choose the right correction request.',
      },
      {
        heading: 'Build a code-focused dispute packet',
        body: 'Include itemized bill, EOB, disputed code lines, and your requested correction in one concise submission.',
      },
    ],
    faq: [
      {
        q: 'Do I need medical coding expertise to dispute charges?',
        a: 'No. You can still identify mismatches by comparing line descriptions, dates, units, and denial codes.',
      },
      {
        q: 'Should I call provider billing or insurer first?',
        a: 'Start with provider billing for coding clarification, then contact insurer with claim-specific details.',
      },
    ],
  },
  {
    slug: 'negotiate-hospital-bill-payment-plan-vs-lump-sum',
    title: 'Payment Plan vs Lump Sum: How to Negotiate a Hospital Bill',
    description: 'Choose the best payment strategy after claim review and negotiate from a stronger position.',
    updatedAt: '2026-04-15',
    sections: [
      {
        heading: 'Review and dispute first, negotiate second',
        body: 'Always validate the bill against your EOB before discussing payment terms. Negotiating too early can lock in avoidable balances.',
      },
      {
        heading: 'Ask for all available financial assistance options',
        body: 'Hospitals often offer discounts, hardship programs, or charity care tiers that are not proactively advertised.',
      },
      {
        heading: 'When lump-sum discounts make sense',
        body: 'If your balance is validated and cash flow allows, a one-time payment can unlock deeper reductions than standard plans.',
      },
      {
        heading: 'When payment plans are safer',
        body: 'If income is variable, stable low-payment plans reduce default risk while you continue any pending insurance escalations.',
      },
      {
        heading: 'Get negotiated terms in writing',
        body: 'Confirm total owed, payment dates, interest terms, and account status updates before making the first payment.',
      },
    ],
    faq: [
      {
        q: 'How much can hospitals typically reduce a bill?',
        a: 'Discounts vary widely, but documented financial hardship and clean billing discrepancies both improve outcomes.',
      },
      {
        q: 'Can I renegotiate after starting a payment plan?',
        a: 'Often yes, especially if new claim corrections reduce balance or your financial situation changes.',
      },
    ],
  },
  {
    slug: 'deductible-copay-coinsurance-out-of-pocket-max-difference',
    title: 'Deductible vs Copay vs Coinsurance vs Out-of-Pocket Max',
    description: 'A plain-English cost-share guide so you can predict what you owe before the next medical bill arrives.',
    updatedAt: '2026-04-15',
    sections: [
      {
        heading: 'Deductible: what you pay first each plan year',
        body: 'Your deductible is the amount you pay before insurance cost-sharing starts for most non-preventive services.',
      },
      {
        heading: 'Copay: fixed amount for specific services',
        body: 'Copays are set dollar amounts, often used for office visits, urgent care, or prescriptions depending on your plan design.',
      },
      {
        heading: 'Coinsurance: percentage after deductible',
        body: 'Coinsurance is your percent share of allowed charges after deductible requirements are met.',
      },
      {
        heading: 'Out-of-pocket max: your covered-service ceiling',
        body: 'Once you hit your in-network out-of-pocket maximum for covered services, eligible in-network care is generally paid at 100% by the plan.',
      },
      {
        heading: 'How these fields appear on an EOB',
        body: 'Most EOBs break responsibility into deductible, copay, and coinsurance columns. Use these to verify claims were adjudicated correctly.',
      },
    ],
    faq: [
      {
        q: 'Which cost category causes the most confusion?',
        a: 'Coinsurance after deductible is the most common surprise because people expect zero cost immediately after deductible is met.',
      },
      {
        q: 'Do these rules apply the same way out-of-network?',
        a: 'Usually no. Out-of-network benefits often use separate accumulators and higher patient cost share.',
      },
    ],
  },
  {
    slug: 'out-of-network-er-bill-after-in-network-hospital',
    title: 'Out-of-Network ER Bill After In-Network Hospital Visit: What to Do',
    description: 'If you used an in-network hospital but got an out-of-network ER bill, use this fast dispute checklist.',
    updatedAt: '2026-04-13',
    sections: [
      {
        heading: 'Confirm where care happened',
        body: 'Pull your EOB and verify whether the facility is listed as in-network while individual clinicians are marked out-of-network. That mismatch is the key trigger for dispute rights.',
      },
      {
        heading: 'Check emergency status coding',
        body: 'Ask your insurer whether the claim was processed as emergency care. If emergency status was missed, reprocessing can reduce your responsibility significantly.',
      },
      {
        heading: 'Request reprocessing at in-network rates',
        body: 'Call member services and request in-network adjudication based on emergency and facility-network protections. Ask for a written response and reference number.',
      },
      {
        heading: 'Dispute with provider billing in parallel',
        body: 'Tell the provider billing office you are disputing processing and request a hold on collections while payer review is active.',
      },
      {
        heading: 'Escalate to federal or state complaint channels',
        body: 'If corrected processing is denied, file through CMS No Surprises complaint flow and your state regulator. Include EOBs, dates, and call log references.',
      },
    ],
    faq: [
      {
        q: 'Do I have to pay the full out-of-network amount while dispute is open?',
        a: 'Usually no. Request an active billing hold while appeal or complaint review is in progress.',
      },
      {
        q: 'What documents help this dispute most?',
        a: 'Submit the EOB, provider bill, proof of in-network facility status, and a dated call log with insurer reference numbers.',
      },
    ],
  },
  {
    slug: 'surprise-anesthesia-bill-after-delivery',
    title: 'Surprise Anesthesia Bill After Delivery: Fight It in 5 Steps',
    description: 'A practical playbook for unexpected anesthesia charges after labor and delivery at an in-network hospital.',
    updatedAt: '2026-04-13',
    sections: [
      {
        heading: 'Identify the exact billing entity',
        body: 'Anesthesia is often billed by a separate physician group. Match the bill to the claim line and tax ID so disputes go to the right party.',
      },
      {
        heading: 'Compare provider network status vs hospital network',
        body: 'If delivery occurred at an in-network hospital, out-of-network anesthesia charges may be disputable under surprise-billing protections.',
      },
      {
        heading: 'Request insurer reprocessing first',
        body: 'Ask the insurer to reprocess anesthesia claim lines as in-network where protections apply. Request written confirmation and timeline.',
      },
      {
        heading: 'Ask anesthesia group for in-network adjustment',
        body: 'Send provider billing the insurer determination and ask for adjustment to in-network allowed amount while dispute is pending.',
      },
      {
        heading: 'Document every interaction',
        body: 'Keep one timeline with dates, names, and reference IDs. If escalation is required, documentation often determines final outcome quality.',
      },
    ],
    faq: [
      {
        q: 'Is anesthesia billing usually separate from the hospital bill?',
        a: 'Yes. It is commonly billed by a separate group, which is why network mismatches happen so often.',
      },
      {
        q: 'Should I pay first and dispute later?',
        a: 'Usually no. Request a temporary hold while insurer and provider review is active to preserve leverage.',
      },
    ],
  },
  {
    slug: 'claim-denied-medical-necessity-appeal-guide',
    title: 'Claim Denied for Medical Necessity: Appeal Guide',
    description: 'Use this structured appeal method when your insurer says treatment was not medically necessary.',
    updatedAt: '2026-04-13',
    sections: [
      {
        heading: 'Get the denial rationale in writing',
        body: 'Request full denial language, policy citation, and clinical review criteria used. You cannot build a strong appeal without exact reasoning.',
      },
      {
        heading: 'Collect clinician support evidence',
        body: 'Ask treating providers for notes explaining diagnosis severity, failed alternatives, and why requested treatment is appropriate now.',
      },
      {
        heading: 'Map evidence to policy criteria',
        body: 'Structure your appeal section-by-section against the insurer criteria so reviewers can quickly verify each requirement is met.',
      },
      {
        heading: 'Request peer-to-peer or expedited review when urgent',
        body: 'If care delays create clinical risk, ask provider office to initiate expedited review and peer discussion channels where available.',
      },
      {
        heading: 'Escalate to independent external review',
        body: 'If internal appeal fails, file external review promptly with complete packet. Independent reviewers can overturn weak necessity denials.',
      },
    ],
    faq: [
      {
        q: 'What is the strongest evidence for medical necessity appeals?',
        a: 'Detailed clinician notes tied directly to insurer criteria are usually most persuasive, especially when prior treatment failures are documented.',
      },
      {
        q: 'Can I request expedited review for non-emergency care?',
        a: 'Sometimes. If delay may worsen condition or function, ask your provider to document urgency and request expedited handling.',
      },
    ],
  },
  {
    slug: 'denied-claim-after-prior-authorization',
    title: 'Denied Claim After Prior Authorization: What to Do Next',
    description: 'If your claim was denied even though you had prior auth, use this playbook to challenge it quickly.',
    updatedAt: '2026-04-13',
    sections: [
      {
        heading: 'Get proof of approval first',
        body: 'Pull the prior authorization number, approval date, and covered service details from your portal, emails, or provider records. Appeals win faster when you show exact authorization evidence.',
      },
      {
        heading: 'Match the denied claim to the approved service',
        body: 'Compare CPT/HCPCS codes on the denial to what was authorized. Denials often happen when billing codes differ slightly from the approved request.',
      },
      {
        heading: 'Ask insurer to reprocess before formal appeal',
        body: 'Call member services and request immediate reprocessing based on prior authorization already on file. Ask for a reference number and expected completion date.',
      },
      {
        heading: 'Submit a focused written appeal if needed',
        body: 'Attach prior auth proof, denial EOB, and provider notes. State that the service was pre-approved and request reversal based on plan terms and insurer authorization history.',
      },
      {
        heading: 'Escalate if deadlines are close',
        body: 'If bills are aging, ask provider billing for a hold while appeal is active. If internal review fails, escalate to external review through your state process.',
      },
    ],
    faq: [
      {
        q: 'Can an insurer deny a service after approving prior authorization?',
        a: 'They can, but denials are often reversible when you provide documentation that service details match the approved request.',
      },
      {
        q: 'What is the fastest evidence to include in this appeal?',
        a: 'Include the authorization number, approval date, service code details, and denial EOB in one packet to speed review.',
      },
    ],
  },
  {
    slug: 'how-to-read-denial-codes-on-eob',
    title: 'How to Read Denial Codes on an EOB',
    description: 'Use denial reason codes to identify why a claim failed and which appeal path gives you the best odds.',
    updatedAt: '2026-04-13',
    sections: [
      {
        heading: 'Denial codes are your root-cause map',
        body: 'Every denial code points to a specific processing issue such as eligibility, coding mismatch, missing prior auth, non-covered service, or network status.',
      },
      {
        heading: 'Group codes into fixable vs non-fixable',
        body: 'Fixable denials usually involve documentation gaps, coding corrections, or coordination of benefits updates. Non-fixable denials are often true plan exclusions.',
      },
      {
        heading: 'Pair denial code with claim line details',
        body: 'Review service date, provider, procedure codes, and modifiers tied to each denied line. Appeals are stronger when you target the exact denied line item.',
      },
      {
        heading: 'Use the code to choose your script',
        body: 'Your call script should start with the exact denial code and request the insurer-specific correction path for that code family.',
      },
      {
        heading: 'Document each contact and outcome',
        body: 'Track date, representative, reference number, and next step after every call. This audit trail is essential if you need external review later.',
      },
    ],
    faq: [
      {
        q: 'Where do I find denial codes on my EOB?',
        a: 'Most insurers show denial or adjustment reason codes near each claim line, often with short code descriptions.',
      },
      {
        q: 'Do the same denial codes mean the same thing across insurers?',
        a: 'Not always. Code families may overlap, but wording and correction steps can differ by plan and claims platform.',
      },
    ],
  },
  {
    slug: 'request-itemized-medical-bill-template',
    title: 'How to Request an Itemized Medical Bill (Template + Checklist)',
    description: 'Use this template to request itemized billing and catch duplicate or incorrect charges before you pay.',
    updatedAt: '2026-04-13',
    sections: [
      {
        heading: 'Why itemized bills matter',
        body: 'Summary bills hide the details you need to dispute errors. An itemized bill breaks out each charge so you can compare against your EOB line by line.',
      },
      {
        heading: 'What to request from billing office',
        body: 'Ask for CPT/HCPCS codes, revenue codes, units, dates of service, and any adjustments already applied. Request delivery by secure portal or PDF.',
      },
      {
        heading: 'Template request script',
        body: 'Use clear wording: "I am requesting a complete itemized statement for all charges tied to account [number], including procedure codes, units, and dates, before I make payment."',
      },
      {
        heading: 'What to check once you receive it',
        body: 'Look for duplicate lines, services you did not receive, unbundled charges, and out-of-network flags that conflict with your insurer records.',
      },
      {
        heading: 'Escalate if they refuse to provide details',
        body: 'Ask for a supervisor, document refusal, and notify your insurer that provider billing details are being withheld during an active dispute.',
      },
    ],
    faq: [
      {
        q: 'Can a provider require payment before sending an itemized bill?',
        a: 'Policies vary, but you can still request itemization and place the account in review while you verify charges.',
      },
      {
        q: 'How quickly should I request itemization after getting a bill?',
        a: 'Request it immediately. Early requests protect your appeal timeline and reduce risk of premature collections activity.',
      },
    ],
  },
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
        body: "Newborn charges are sometimes billed twice: once under the mother's policy and once under the baby's. Look for duplicate procedure codes, especially for nursery days, initial exams, and screenings.",
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
