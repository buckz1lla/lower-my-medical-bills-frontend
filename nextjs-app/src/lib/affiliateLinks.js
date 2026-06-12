// ============================================================
// Affiliate link registry
// ============================================================
// Every slot is DORMANT by default: it shows a safe, free, on-brand fallback
// (a government resource or one of our own guides) until a real partner URL is
// configured via its environment variable. Nothing labeled "(Partner)" ever
// ships unless you have actually been approved for that program and set the env
// var — this keeps the site honest and protects the trust/E-E-A-T positioning.
//
// To turn a slot into revenue:
//   1. Get approved for a relevant, reputable affiliate program.
//   2. Set the slot's env var (in Vercel + .env.local) to your tracking URL.
//   3. Redeploy. No code change required.
//
// See docs/affiliate-setup.md for which programs to apply to and why.
//
// IMPORTANT (Next.js): NEXT_PUBLIC_* env vars are only inlined into the client
// bundle when referenced literally. Do NOT switch to dynamic process.env[key]
// access — the values would be undefined in the browser. That is why ENV_URLS
// below uses literal references.

// Literal env references (required for Next.js static replacement in the client bundle).
const ENV_URLS = {
  plans: process.env.NEXT_PUBLIC_AFFILIATE_PLANS_URL || "",
  rights: process.env.NEXT_PUBLIC_AFFILIATE_RIGHTS_URL || "",
  appealsGuide: process.env.NEXT_PUBLIC_AFFILIATE_APPEALS_GUIDE_URL || "",
  coverageOptions: process.env.NEXT_PUBLIC_AFFILIATE_COVERAGE_URL || "",
  billHelp: process.env.NEXT_PUBLIC_AFFILIATE_BILL_HELP_URL || "",
  hsa: process.env.NEXT_PUBLIC_AFFILIATE_HSA_URL || "",
};

// Slot metadata. `fallbackUrl` is what shows when the slot is dormant.
// `category`/`note` are documentation for the setup guide and owner dashboard.
const AFFILIATE_SLOTS = {
  plans: {
    category: "Health plan comparison",
    envVar: "NEXT_PUBLIC_AFFILIATE_PLANS_URL",
    fallbackUrl: "https://www.healthcare.gov/see-plans/",
    partnerCta: "Compare Plans (Partner)",
    fallbackCta: "Compare Plans on HealthCare.gov",
    note: "Licensed marketplace/broker comparison. Only use reputable, clearly-licensed partners.",
  },
  rights: {
    category: "Billing protections",
    envVar: "NEXT_PUBLIC_AFFILIATE_RIGHTS_URL",
    fallbackUrl: "https://www.cms.gov/nosurprises",
    partnerCta: "See Protection Options (Partner)",
    fallbackCta: "Read Your Rights (CMS.gov)",
    note: "Usually best left on the free CMS fallback; few reputable paid partners fit here.",
  },
  appealsGuide: {
    category: "Appeal support",
    envVar: "NEXT_PUBLIC_AFFILIATE_APPEALS_GUIDE_URL",
    fallbackUrl: "https://www.healthcare.gov/appeal-insurance-company-decision/",
    partnerCta: "Appeal Support Guide (Partner)",
    fallbackCta: "Appeal Guide (CMS.gov)",
    note: "Patient-advocate / appeal-assistance services that charge transparently.",
  },
  coverageOptions: {
    category: "Coverage discovery",
    envVar: "NEXT_PUBLIC_AFFILIATE_COVERAGE_URL",
    fallbackUrl: "https://www.healthcare.gov/",
    partnerCta: "Browse Coverage (Partner)",
    fallbackCta: "Browse Options (HealthCare.gov)",
    note: "Licensed marketplace partners only.",
  },
  // --- Vetted, on-brand slots (dormant until configured) ---
  billHelp: {
    category: "Professional bill negotiation / patient advocacy",
    envVar: "NEXT_PUBLIC_AFFILIATE_BILL_HELP_URL",
    fallbackUrl: "/guides/medical-bill-negotiation-scripts-phone-email",
    partnerCta: "Get Help Negotiating This Bill (Partner)",
    fallbackCta: "Use Our Free Negotiation Scripts",
    note: "Reputable, transparent bill-negotiation/advocacy services that charge a clear fee or success-based cut. AVOID debt-settlement/predatory offers — they conflict with the site's trust positioning and AdSense policy.",
  },
  hsa: {
    category: "Tax-advantaged medical savings (HSA/FSA)",
    envVar: "NEXT_PUBLIC_AFFILIATE_HSA_URL",
    fallbackUrl: "https://www.irs.gov/publications/p969",
    partnerCta: "Open an HSA to Pay Pre-Tax (Partner)",
    fallbackCta: "How HSAs & FSAs Work (IRS)",
    note: "Established HSA providers (e.g. low-fee, well-reviewed custodians). Highly relevant for people managing ongoing medical costs.",
  },
};

const isExternal = (url) => /^https?:\/\//i.test(url);

const withUtm = (url, source) => {
  if (!url) {
    return "";
  }

  // Internal links (our own guides) should not carry referral UTM params.
  if (!isExternal(url)) {
    return url;
  }

  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}utm_source=lmmb&utm_medium=referral&utm_campaign=${source}`;
};

// Returns the link details for a slot:
//   { url, isAffiliate, cta, partnerCta, fallbackCta, category }
// `url` and `isAffiliate` are preserved for backward compatibility.
export const getAffiliateLink = (key, source = "results") => {
  const slot = AFFILIATE_SLOTS[key];
  if (!slot) {
    return { url: "", isAffiliate: false, cta: "", partnerCta: "", fallbackCta: "", category: "" };
  }

  const configured = (ENV_URLS[key] || "").trim();
  const isAffiliate = Boolean(configured);
  const target = isAffiliate ? configured : slot.fallbackUrl;

  return {
    url: withUtm(target, source),
    isAffiliate,
    partnerCta: slot.partnerCta,
    fallbackCta: slot.fallbackCta,
    cta: isAffiliate ? slot.partnerCta : slot.fallbackCta,
    category: slot.category,
  };
};

// Exposed for documentation / owner tooling.
export const AFFILIATE_SLOT_KEYS = Object.keys(AFFILIATE_SLOTS);
export { AFFILIATE_SLOTS };
