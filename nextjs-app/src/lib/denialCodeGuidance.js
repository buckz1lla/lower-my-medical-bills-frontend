// Hand-written, group-specific guidance for denial / adjustment codes.
// Goal: give each denial-code page substantive, genuinely useful context about
// how to respond to that *class* of adjustment — grounded in real U.S. billing,
// appeal, and patient-protection rules (ACA internal/external appeal rights,
// the No Surprises Act, nonprofit-hospital charity care obligations, etc.).
// No fabricated statistics or dollar figures.

const GROUP_GUIDANCE = {
  "Contractual Obligation": {
    heading: "How to handle a contractual-obligation adjustment",
    intro:
      "Contractual Obligation (CO) codes describe the part of a claim that is governed by the contract between your insurer and the provider. In most cases the adjustment itself is legitimate — it reflects the agreed network discount, your deductible, your coinsurance, or your copay. The money you should focus on is the patient-responsibility line, because that is the amount you can actually verify, dispute, or have reprocessed.",
    points: [
      {
        title: "Confirm the math against your plan documents",
        body: "Pull your Summary of Benefits and Coverage and your member-portal accumulators. Check that the allowed amount matches the in-network contracted rate and that your deductible, coinsurance, or copay was applied at the correct stage. A surprising number of patient-responsibility errors come from accumulators that didn't update after a prior claim.",
      },
      {
        title: "Check whether your out-of-pocket maximum was reached",
        body: "Once you hit your annual out-of-pocket maximum, your coinsurance and copays for covered, in-network services should drop to $0. If an EOB still shows patient responsibility after you've met that limit, call member services and ask for the claim to be reprocessed against your accumulator.",
      },
      {
        title: "Make sure the service was coded the way it actually happened",
        body: "A visit coded as a higher-complexity level, or a preventive screening miscoded as a diagnostic (sick) visit, can shift cost onto you. Request an itemized bill, compare the CPT codes to what you actually received, and ask the provider's billing office to correct and rebill any mismatch before you pay.",
      },
    ],
    appeal:
      "If you believe a contractual adjustment was applied incorrectly — wrong network status, wrong accumulator, or a coding error — start with the provider's billing office for coding issues and your insurer's member services for benefit-application issues. If they disagree, you have the right under the Affordable Care Act to a formal internal appeal, and if that's denied, an independent external review.",
  },
  "Non-Covered": {
    heading: "How to handle a non-covered or denied service",
    intro:
      "Non-covered codes mean the insurer is declining to pay — either because the plan excludes the service, because medical necessity wasn't established, or because a requirement like prior authorization or timely filing wasn't met. These are the adjustments most worth contesting, because a denial is not the final word: a large share of denials are overturned on appeal when the patient or provider supplies the right documentation.",
    points: [
      {
        title: "Find the exact reason for the denial in writing",
        body: "\"Not covered\" is a category, not an explanation. Call your insurer and ask specifically why: Is the service excluded from your plan? Was it deemed not medically necessary? Was prior authorization missing? Was the claim filed late by the provider? The precise reason determines who fixes it and how.",
      },
      {
        title: "Decide whether it's the provider's error or a true plan exclusion",
        body: "If the problem is a missing prior authorization, a coding error, or late filing, that is usually the provider's responsibility — and in many states they cannot bill you for their own administrative mistakes. If the service is genuinely excluded from your plan, your path is an appeal or financial assistance, not a billing correction.",
      },
      {
        title: "Gather support for medical necessity before you appeal",
        body: "When a denial is based on medical necessity, ask your treating physician for a letter of medical necessity and the clinical notes that justify the service. Insurers overturn a meaningful portion of these denials once the supporting documentation is in front of a reviewer.",
      },
    ],
    appeal:
      "You have a federally protected right to appeal a denial. Request the insurer's full reason and your plan's appeal deadline in writing, then file an internal appeal with your supporting documents. If the internal appeal is denied, you can request an independent external review — a reviewer with no financial stake in the outcome. If the service was an emergency or from an out-of-network provider at an in-network facility, the federal No Surprises Act may also protect you from balance billing.",
  },
  Remark: {
    heading: "How to use a remark code on your EOB",
    intro:
      "Remittance Advice Remark Codes (RARC) don't usually create a charge on their own. Instead they add context to an accompanying adjustment code — explaining why a claim was reduced, what additional information is needed, or what action the provider or patient must take. Read a remark code as a clue: it tells you what to ask about and where the real issue lives.",
    points: [
      {
        title: "Pair the remark with its adjustment code",
        body: "A remark code almost always travels alongside a CARC adjustment. Look at the two together on your EOB — the adjustment tells you the dollar impact, and the remark tells you the underlying reason. Resolving the issue means addressing the adjustment, using the remark as your guide.",
      },
      {
        title: "Act quickly when a remark requests information",
        body: "Some remark codes signal that the insurer needs additional records, an itemized bill, or proof of timely filing before they'll pay. These often carry deadlines. If the request is the provider's to fulfill, follow up with their billing office; if it's yours, send what's asked for promptly so the claim can be reprocessed.",
      },
      {
        title: "Keep a written record of every follow-up",
        body: "Because remark codes frequently kick off a back-and-forth between you, the provider, and the insurer, write down dates, names, and reference numbers for every call. That record is what makes a later appeal credible if the claim isn't resolved in your favor.",
      },
    ],
    appeal:
      "If a remark code points to a reduced or denied payment that you believe is wrong, treat it the same way you'd treat the adjustment it accompanies: request a written explanation, supply any information the insurer asked for, and file a formal internal appeal if the issue isn't resolved. Your ACA appeal rights — internal review and then independent external review — apply here too.",
  },
};

export function getDenialGuidance(group) {
  return GROUP_GUIDANCE[group] || null;
}
