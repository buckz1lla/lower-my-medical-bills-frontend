// Primary-source registry for guide citations.
// Every URL here points to an authoritative government source (CMS, HealthCare.gov,
// HHS, IRS, CFPB) and has been verified to resolve. Citing primary sources is a core
// E-E-A-T trust signal for this YMYL (health + money) content.

export const SOURCES = {
  hcgovAppeals: {
    label: "How to appeal an insurance company decision",
    publisher: "HealthCare.gov (CMS)",
    url: "https://www.healthcare.gov/appeal-insurance-company-decision/",
  },
  hcgovInternalAppeal: {
    label: "Internal appeals process",
    publisher: "HealthCare.gov (CMS)",
    url: "https://www.healthcare.gov/appeal-insurance-company-decision/internal-appeals/",
  },
  hcgovExternalReview: {
    label: "External review process",
    publisher: "HealthCare.gov (CMS)",
    url: "https://www.healthcare.gov/appeal-insurance-company-decision/external-review/",
  },
  cmsNoSurprises: {
    label: "Ending Surprise Medical Bills (No Surprises Act)",
    publisher: "Centers for Medicare & Medicaid Services",
    url: "https://www.cms.gov/nosurprises",
  },
  cmsMedicalBillRights: {
    label: "Your rights and protections against surprise medical bills",
    publisher: "Centers for Medicare & Medicaid Services",
    url: "https://www.cms.gov/medical-bill-rights",
  },
  cmsNoSurprisesRules: {
    label: "No Surprises Act rules and fact sheets",
    publisher: "Centers for Medicare & Medicaid Services",
    url: "https://www.cms.gov/nosurprises/policies-and-resources/overview-of-rules-fact-sheets",
  },
  irsCharitableHospitals: {
    label: "Charitable hospitals: requirements under Section 501(c)(3)",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/charities-non-profits/charitable-hospitals-general-requirements-for-tax-exemption-under-section-501c3",
  },
  irs501r: {
    label: "Section 501(r) financial assistance requirements for tax-exempt hospitals",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/charities-non-profits/charitable-organizations/requirements-for-501c3-hospitals-under-the-affordable-care-act-section-501r",
  },
  cfpbDebtCollection: {
    label: "Debt collection: know your rights",
    publisher: "Consumer Financial Protection Bureau",
    url: "https://www.consumerfinance.gov/consumer-tools/debt-collection/",
  },
  cfpbDisputeDebt: {
    label: "What to do if you don't owe the debt or want verification",
    publisher: "Consumer Financial Protection Bureau",
    url: "https://www.consumerfinance.gov/ask-cfpb/what-if-i-believe-i-do-not-owe-the-debt-or-i-want-more-information-about-the-debt-en-1403/",
  },
  cfpbReplyCollector: {
    label: "How to reply to a debt collector",
    publisher: "Consumer Financial Protection Bureau",
    url: "https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-when-a-debt-collector-contacts-me-en-1695/",
  },
  cfpbNegotiateSettlement: {
    label: "How to negotiate a settlement with a debt collector",
    publisher: "Consumer Financial Protection Bureau",
    url: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-best-way-to-negotiate-a-settlement-with-a-debt-collector-en-1447/",
  },
  hhsAca: {
    label: "About the Affordable Care Act",
    publisher: "U.S. Department of Health & Human Services",
    url: "https://www.hhs.gov/healthcare/index.html",
  },
};

// Maps each guide slug to the primary sources most relevant to its topic.
export const GUIDE_SOURCES = {
  "why-am-i-paying-after-deductible-met": ["cmsMedicalBillRights", "hcgovAppeals"],
  "out-of-pocket-maximum-not-applied-correctly": ["cmsMedicalBillRights", "hcgovAppeals"],
  "appeal-prior-authorization-denial": ["hcgovAppeals", "hcgovInternalAppeal", "hcgovExternalReview"],
  "er-bill-too-high-how-emergency-claims-should-be-processed": ["cmsNoSurprises", "cmsMedicalBillRights", "cmsNoSurprisesRules"],
  "balance-billing-explained-when-it-may-be-illegal": ["cmsNoSurprises", "cmsMedicalBillRights", "cmsNoSurprisesRules"],
  "medical-bill-sent-to-collections-while-disputing": ["cfpbDebtCollection", "cfpbDisputeDebt", "cfpbReplyCollector"],
  "coordination-of-benefits-denial-how-to-fix-primary-secondary-insurance": ["hcgovAppeals", "cmsMedicalBillRights"],
  "how-to-read-cpt-and-hcpcs-codes-on-medical-bill": ["cmsMedicalBillRights", "cmsNoSurprises"],
  "negotiate-hospital-bill-payment-plan-vs-lump-sum": ["irsCharitableHospitals", "cfpbNegotiateSettlement", "cmsMedicalBillRights"],
  "deductible-copay-coinsurance-out-of-pocket-max-difference": ["cmsMedicalBillRights", "hcgovAppeals"],
  "out-of-network-er-bill-after-in-network-hospital": ["cmsNoSurprises", "cmsMedicalBillRights", "cmsNoSurprisesRules"],
  "surprise-anesthesia-bill-after-delivery": ["cmsNoSurprises", "cmsMedicalBillRights"],
  "claim-denied-medical-necessity-appeal-guide": ["hcgovAppeals", "hcgovInternalAppeal", "hcgovExternalReview"],
  "denied-claim-after-prior-authorization": ["hcgovAppeals", "hcgovInternalAppeal", "hcgovExternalReview"],
  "how-to-read-denial-codes-on-eob": ["hcgovAppeals", "cmsMedicalBillRights"],
  "request-itemized-medical-bill-template": ["cmsNoSurprises", "cmsMedicalBillRights"],
  "how-to-appeal-a-denied-insurance-claim": ["hcgovAppeals", "hcgovInternalAppeal", "hcgovExternalReview"],
  "what-is-an-eob-and-how-to-read-it": ["cmsMedicalBillRights", "hcgovAppeals"],
  "medical-bill-too-high-what-to-do": ["cmsMedicalBillRights", "irsCharitableHospitals", "cfpbDebtCollection"],
  "surprise-out-of-network-bills": ["cmsNoSurprises", "cmsMedicalBillRights", "cmsNoSurprisesRules"],
  "deductible-copay-out-of-pocket-explained": ["cmsMedicalBillRights", "hcgovAppeals"],
  "baby-medical-bills-guide": ["cmsNoSurprises", "cmsMedicalBillRights"],
  "in-network-vs-out-of-network-costs": ["cmsNoSurprises", "cmsMedicalBillRights"],
  "appeal-deadlines-internal-vs-external-review": ["hcgovInternalAppeal", "hcgovExternalReview", "hcgovAppeals"],
  "hospital-charity-care-financial-assistance-guide": ["irsCharitableHospitals", "irs501r", "cmsMedicalBillRights"],
  "single-case-agreement-network-gap-exception": ["hcgovAppeals", "cmsMedicalBillRights"],
  "medical-bill-negotiation-scripts-phone-email": ["cfpbNegotiateSettlement", "irsCharitableHospitals", "cmsMedicalBillRights"],
  "claim-denied-missing-information-how-to-fix": ["hcgovAppeals", "hcgovInternalAppeal"],
};

// Returns the resolved source objects for a guide slug, filtering out any unknown ids.
// Falls back to the two broadly-applicable consumer-rights sources if a slug is unmapped.
export function getGuideSources(slug) {
  const ids = GUIDE_SOURCES[slug] || ["cmsMedicalBillRights", "hcgovAppeals"];
  return ids.map((id) => SOURCES[id]).filter(Boolean);
}

// Flat, de-duplicated list of every source for the /sources page.
export function getAllSources() {
  return Object.values(SOURCES);
}
