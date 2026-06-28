// Hand-written, category-specific medical billing guidance.
//
// Purpose: give each procedure-cost page substantial, genuinely useful, and
// DISTINCT editorial content instead of repeating the same boilerplate across
// every page. Each entry reflects how this category of service is actually
// coded and adjudicated — common billing errors, what to verify on your own
// bill, and negotiation/appeal angles specific to that service type.
//
// Integrity: this is general educational guidance grounded in standard CPT/CMS
// billing practice. It contains no fabricated rates, statistics, or outcomes.

export const CATEGORY_CONTENT = {
  "Office Visit": {
    summary:
      "Office visits are billed with Evaluation and Management (E/M) codes, and the single biggest cost driver is the complexity level the provider selects. Higher levels (99204, 99214, 99215) pay substantially more than lower ones, so an office visit billed a level or two above the care you actually received is one of the most common — and most reversible — billing errors.",
    commonIssues: [
      {
        title: "Upcoded visit level",
        body: "Since the 2021 E/M guideline change, the visit level is driven by either medical decision-making or total time. If a routine, low-complexity visit was billed as 99214 or 99215, the documentation may not support it. Ask for the visit note and compare it to what the level requires.",
      },
      {
        title: "Modifier 25 on the same day as a procedure",
        body: "When a provider performs a minor procedure and also bills an office visit on the same date, the visit needs modifier 25 and must represent a separate, significant service. A reflexive office-visit charge stacked on top of a procedure is worth questioning.",
      },
      {
        title: "New-patient code for an established patient",
        body: "New-patient codes (99202–99205) pay more than established-patient codes (99211–99215). If you have been seen by that provider or group within three years, a new-patient code may be incorrect.",
      },
    ],
    negotiation:
      "Because the Medicare benchmark for each E/M level is published, you can anchor a self-pay or dispute conversation to the correct level. If the documentation does not support the billed level, ask for the claim to be recoded rather than simply discounted.",
  },

  "Emergency Room": {
    summary:
      "An ER visit almost never produces a single charge. You typically receive a facility fee (the hospital's charge for using the ER, billed at one of five severity levels) plus separate professional fees from the ER physician, and often radiologists, pathologists, or specialists who were consulted. Each of these is a distinct claim, which is why ER bills are unusually prone to errors and surprise out-of-network charges.",
    commonIssues: [
      {
        title: "Facility level coded too high",
        body: "The ER facility fee (99281–99285) is supposed to reflect the resources actually used. A minor visit billed at a level 4 or 5 facility charge is common. The professional fee and facility fee should tell a consistent story about how sick you were.",
      },
      {
        title: "Out-of-network physicians at an in-network hospital",
        body: "You can go to an in-network ER and still be treated by out-of-network physician groups. Under the federal No Surprises Act, emergency care generally cannot be balance-billed at out-of-network rates — this is one of the strongest appeal angles for an ER bill.",
      },
      {
        title: "Duplicate or unbundled ancillary charges",
        body: "Imaging and labs ordered in the ER are billed separately. Watch for the same test appearing twice, or a panel broken into individual components that add up to more than the panel itself.",
      },
    ],
    negotiation:
      "If any portion was processed out-of-network, cite the No Surprises Act before paying. For the facility fee, request the itemized bill and compare the billed level against the actual services rendered.",
  },

  "Preventive Care": {
    summary:
      "Under the Affordable Care Act, a defined list of preventive services — annual wellness visits, many screenings, and routine immunizations — must be covered at no cost to you when delivered in-network. When a preventive visit generates a bill, the cause is usually a coding issue rather than a real charge.",
    commonIssues: [
      {
        title: "Preventive visit converted to a diagnostic one",
        body: "If you mention a new symptom during a wellness visit and the provider addresses it, the visit can be partly recoded as diagnostic (problem-oriented), which is cost-shared. Ask whether a diagnostic E/M code was added and whether it was truly separate from the preventive service.",
      },
      {
        title: "Wrong diagnosis code attached to a screening",
        body: "A screening test billed with a diagnostic (rather than screening) diagnosis code can flip a $0 preventive service into a cost-shared one. This is a coding correction your provider can make and resubmit.",
      },
      {
        title: "Out-of-network preventive care",
        body: "The no-cost-sharing rule applies to in-network preventive care. If the provider or lab was out-of-network, preventive protection may not apply.",
      },
    ],
    negotiation:
      "Preventive billing disputes are usually won by correcting the diagnosis or visit code, not by negotiating a discount. Ask your provider's billing office to review whether the service qualifies as ACA-preventive and to resubmit if it was miscoded.",
  },

  "Hospital Care": {
    summary:
      "Inpatient hospital physician services are billed per day with admission codes, daily subsequent-care codes, and a discharge code. The largest hidden cost driver here is your admission status: whether you were formally admitted as an inpatient or held under observation, which is technically outpatient and can change your financial responsibility dramatically.",
    commonIssues: [
      {
        title: "Observation status billed as inpatient (or vice versa)",
        body: "Observation stays are outpatient and are cost-shared differently than inpatient admissions, sometimes leaving you with much larger bills for self-administered drugs. Confirm your actual status for each day of the stay.",
      },
      {
        title: "Daily visit codes for days without a documented visit",
        body: "Subsequent hospital care codes (99231–99233) should correspond to an actual physician encounter that day. Charges for days with no documented visit are worth challenging.",
      },
      {
        title: "Multiple physicians billing the same daily care",
        body: "During a hospital stay several physicians may round. Make sure you are not being billed twice for the same daily management by providers in the same specialty group.",
      },
    ],
    negotiation:
      "Request the itemized bill and a copy of the physician progress notes. Matching billed daily codes to documented encounters is the fastest way to find removable charges on a hospital bill.",
  },

  "Critical Care": {
    summary:
      "Critical care (99291 and add-on 99292) is time-based: it bills the total time a physician spent providing critical care to an unstable patient. Because it is one of the higher-paying codes and is defined by minutes, the most common disputes are about whether the documented time and the patient's condition truly meet the critical-care threshold.",
    commonIssues: [
      {
        title: "Insufficient documented time",
        body: "The first critical-care code requires a minimum of 30–74 minutes of documented critical care. If the note does not record the time, the charge is vulnerable.",
      },
      {
        title: "Critical care billed alongside a separate E/M visit",
        body: "A routine evaluation-and-management visit generally should not be billed for the same encounter as critical care unless it was a distinct, separately documented service.",
      },
      {
        title: "Condition did not meet the critical-care definition",
        body: "Critical care requires a high probability of imminent or life-threatening deterioration. A stable patient's visit billed as critical care is worth questioning.",
      },
    ],
    negotiation:
      "Ask for the documentation supporting the critical-care time and the clinical justification. If either is missing, request recoding to the appropriate visit level.",
  },

  "Lab": {
    summary:
      "Lab charges are small individually but multiply quickly, and they are billed by whoever runs the test — which may be a reference lab you never saw, not the office that drew your blood. The two recurring cost problems are panels billed as separate components (unbundling) and large markups when a test is sent to an out-of-network reference lab.",
    commonIssues: [
      {
        title: "Unbundled panels",
        body: "Common panels (a metabolic panel, a lipid panel, a CBC) have a single bundled code. When the individual component tests are billed separately, the total often exceeds the bundled panel price. Compare your line items against the standard panel definition.",
      },
      {
        title: "Out-of-network reference lab",
        body: "Your in-network doctor can send your sample to an out-of-network lab. Ask which lab processed the test and whether an in-network option was available — this is a frequent source of surprise lab bills.",
      },
      {
        title: "Duplicate draws or repeated tests",
        body: "Watch for the same test billed twice on one date, or a venipuncture (draw) fee charged multiple times for a single blood draw.",
      },
    ],
    negotiation:
      "For unbundling, ask the lab to rebill using the correct panel code. For out-of-network labs, ask both your insurer and the lab whether the claim can be reprocessed at the in-network rate.",
  },

  "Vaccine": {
    summary:
      "A vaccine generates two charges: the product itself and a separate administration fee for giving it. Most routine immunizations are covered as ACA preventive care at no cost in-network, so a vaccine bill usually signals a network or coding issue rather than a legitimate charge.",
    commonIssues: [
      {
        title: "Administration fee billed when the vaccine is preventive",
        body: "When a vaccine is covered as preventive, the administration fee is generally meant to be covered too. A separate cost-shared admin charge is worth questioning.",
      },
      {
        title: "Out-of-network pharmacy or provider",
        body: "Preventive coverage applies in-network. A vaccine given at an out-of-network location may not be fully covered.",
      },
      {
        title: "Non-routine vaccine billed as routine (or vice versa)",
        body: "Travel or occupational vaccines may not fall under preventive coverage. Confirm which category your vaccine falls into.",
      },
    ],
    negotiation:
      "Confirm the vaccine appears on your plan's covered preventive list and that the provider was in-network. Most vaccine bills resolve by correcting network or preventive-coverage processing.",
  },

  "Imaging": {
    summary:
      "Imaging (X-ray, ultrasound, CT, MRI) is billed in two parts: a technical component for the equipment and facility, and a professional component for the radiologist who reads the scan. Hospital outpatient imaging departments often carry large facility markups, and prior-authorization problems are a leading cause of imaging denials.",
    commonIssues: [
      {
        title: "Facility markup at a hospital outpatient department",
        body: "The same scan can cost far more at a hospital outpatient department than at a freestanding imaging center, largely due to the facility (technical) component. If your scan was non-emergent, an independent center may have been a lower-cost option.",
      },
      {
        title: "Prior-authorization denial",
        body: "Advanced imaging (CT, MRI) frequently requires prior authorization. If your claim was denied for lack of authorization that your provider was responsible for obtaining, that denial can often be appealed.",
      },
      {
        title: "Technical and professional components billed separately and redundantly",
        body: "When the global service is split, make sure you are not paying more than the global rate by being billed for both components plus an additional charge.",
      },
    ],
    negotiation:
      "For high facility fees, ask whether the charge reflects a hospital outpatient setting and whether a financial-assistance or self-pay rate applies. For authorization denials, ask your provider to file a retro-authorization or appeal.",
  },

  "Cardiology": {
    summary:
      "Cardiology services such as echocardiograms and stress tests are often bundled procedures with both a technical component (the test) and a professional component (the interpretation). The most common billing problems are paying separately for components that should be billed globally, and being charged for an interpretation that overlaps with another service.",
    commonIssues: [
      {
        title: "Global service split into separately billed components",
        body: "When a cardiac test is performed and read in the same facility, it is often billed globally. Separate technical and professional charges that exceed the global rate are worth reviewing.",
      },
      {
        title: "Interpretation billed on top of a bundled visit",
        body: "Some interpretations are already included in a related service. Confirm you are not being billed twice for the same read.",
      },
      {
        title: "Facility fee for an office-based test",
        body: "A test performed in a physician office should not usually carry a separate hospital facility fee. Question facility charges that do not match where the test was done.",
      },
    ],
    negotiation:
      "Request the itemized breakdown of technical versus professional charges and compare the total to the global Medicare benchmark for the procedure.",
  },

  "Mental Health": {
    summary:
      "Outpatient mental health is billed primarily by session length — a 45-minute psychotherapy session (90834) is a different code and price than a 60-minute one (90837). Federal mental health parity law requires plans to cover behavioral health no more restrictively than medical care, which gives strong footing when claims are wrongly denied or cost-shared.",
    commonIssues: [
      {
        title: "Session length coded longer than the visit",
        body: "If a standard 45-minute session was billed as a 60-minute session (90837), the higher charge may not be supported. Compare the billed code to your actual appointment length.",
      },
      {
        title: "Parity violations in coverage",
        body: "If your plan applies stricter visit limits, higher copays, or tougher authorization to mental health than to comparable medical care, that may violate federal parity law and can be challenged.",
      },
      {
        title: "Telehealth processed incorrectly",
        body: "Telehealth mental health sessions need the correct place-of-service and modifier. A denial tied to telehealth coding is often a fixable resubmission rather than a true non-covered service.",
      },
    ],
    negotiation:
      "For coverage denials, raise mental health parity directly with your insurer. For session-length charges, ask for the visit documentation to confirm the billed code matches the time spent.",
  },

  "Physical Therapy": {
    summary:
      "Physical therapy is billed in timed units governed by Medicare's 8-minute rule, which determines how many units a session can support based on the minutes of direct one-on-one treatment. Overbilled units and plan visit caps are the two recurring cost issues for PT.",
    commonIssues: [
      {
        title: "More timed units than the session minutes support",
        body: "Under the 8-minute rule, the number of billable timed units is tied to total treatment minutes. A session billed for more units than the documented time allows is a common and checkable error.",
      },
      {
        title: "Visit caps and authorization limits",
        body: "Many plans limit covered PT visits per year or require re-authorization after a set number. Denials beyond a cap can sometimes be appealed with documentation of medical necessity.",
      },
      {
        title: "Group therapy billed as one-on-one",
        body: "One-on-one timed codes pay more than group therapy. If your session was partly group-based, confirm it was billed correctly.",
      },
    ],
    negotiation:
      "Ask for the treatment time log and compare it against the units billed. For cap denials, request the medical-necessity criteria and file an appeal if continued therapy is clinically justified.",
  },

  "Minor Procedure": {
    summary:
      "Minor procedures carry a global period — a window (often 0 or 10 days) during which related follow-up care is already included in the procedure's price. The most common billing problems are being charged separately for care that the global period already covers, and an office-visit charge stacked on top of the procedure without justification.",
    commonIssues: [
      {
        title: "Follow-up visits billed inside the global period",
        body: "Routine follow-up for the procedure during its global period is generally included. A separate visit charge for normal post-procedure care may be inappropriate.",
      },
      {
        title: "Office visit stacked on the procedure",
        body: "An office visit billed the same day as a minor procedure requires modifier 25 and must be a separate, significant service. Question a reflexive visit charge added to the procedure.",
      },
      {
        title: "Supplies or trays billed separately when bundled",
        body: "Many routine supplies are bundled into the procedure. Separate charges for standard supplies are worth reviewing.",
      },
    ],
    negotiation:
      "Ask whether any follow-up or visit charges fall within the procedure's global period, and request removal of services that the global package already includes.",
  },

  "Procedure": {
    summary:
      "Outpatient procedures are frequently subject to bundling rules: certain steps are considered part of a larger procedure and should not be billed separately. Unbundling — charging individually for components that belong to one procedure — is one of the most common ways a procedure bill becomes inflated.",
    commonIssues: [
      {
        title: "Unbundled procedure components",
        body: "National Correct Coding Initiative (NCCI) edits define which services should be billed together. Separate charges for steps that are part of the main procedure may be unbundling.",
      },
      {
        title: "Improper use of modifiers to bypass bundling",
        body: "Modifiers like 59 are sometimes applied to force separate payment for services that should be bundled. If a modifier looks like it was used to unbundle routine steps, it is worth questioning.",
      },
      {
        title: "Add-on charges for standard supplies",
        body: "Routine supplies and standard equipment are often included in the procedure price. Separate line items for them can indicate over-itemization.",
      },
    ],
    negotiation:
      "Request the itemized bill and compare line items against the main procedure code. Ask the billing office to confirm that separately billed components are not subject to bundling edits.",
  },

  "Surgery": {
    summary:
      "Surgery is billed under a global surgical package: a single price that already includes the operation, routine pre-operative evaluation, and normal post-operative care for a defined period (often 90 days for major surgery). The biggest cost problems are paying separately for care the global package covers, plus assistant-surgeon and multiple-procedure charges that have their own rules.",
    commonIssues: [
      {
        title: "Post-operative visits billed inside the global period",
        body: "Routine post-surgical follow-up during the global period is already paid for. Separate office-visit charges for normal recovery care may be inappropriate.",
      },
      {
        title: "Assistant surgeon charges that are not supported",
        body: "Not every procedure justifies an assistant surgeon, and assistant services are paid at a reduced rate. An unsupported or full-price assistant charge is worth reviewing.",
      },
      {
        title: "Multiple-procedure reductions not applied",
        body: "When several procedures are performed in one session, secondary procedures are typically reduced. If each procedure was billed at full price, the reduction may have been missed.",
      },
    ],
    negotiation:
      "Ask for the operative report and the global-period rules for your procedure. Confirm that follow-up care, assistant-surgeon billing, and multiple-procedure reductions were all handled correctly before paying.",
  },
};

/** Return the editorial content block for a category, or null if none exists. */
export function getCategoryContent(category) {
  return CATEGORY_CONTENT[category] || null;
}
