# Affiliate Setup Guide

This site earns affiliate revenue **only** when you connect real, approved partner
programs. Until then, every affiliate slot quietly shows a safe, free fallback
(a government resource or one of our own guides) and earns nothing. That is by
design — nothing labeled "(Partner)" ever appears to users unless you have been
approved for that program and set its environment variable.

> **Reality check:** Affiliate is a *secondary* revenue stream for this site. The
> primary lever is the paid EOB analysis (Stripe). Affiliate should stay tasteful
> and on-brand — a single predatory offer can undermine the trust (E-E-A-T) that
> makes the whole site rank and convert.

---

## How the system works

All slots are defined in [`src/lib/affiliateLinks.js`](../src/lib/affiliateLinks.js).
Each slot has:

- a **fallback URL** (shown while dormant — free + on-brand),
- an **environment variable** (set this to your tracking URL to activate it),
- **CTA labels** for the partner vs. fallback states.

To activate a slot:

1. Get approved for a relevant program (see candidates below).
2. Set the slot's env var to your tracking/affiliate URL — in **Vercel → Project →
   Settings → Environment Variables** and in your local `.env.local`.
3. Redeploy. No code change needed. The CTA automatically switches to the
   "(Partner)" label and points to your link (with `utm_source=lmmb` appended).

To deactivate, clear the env var and redeploy — it falls back to the safe link.

---

## Slots and what fits each

| Slot env var | Category | Good fits | Avoid |
|---|---|---|---|
| `NEXT_PUBLIC_AFFILIATE_BILL_HELP_URL` | Bill negotiation / patient advocacy | Transparent, fee- or success-based medical bill negotiation & advocacy services | Debt settlement, "we'll erase your debt" offers |
| `NEXT_PUBLIC_AFFILIATE_HSA_URL` | HSA / FSA accounts | Established, low-fee HSA custodians | Anything with hidden fees or poor reviews |
| `NEXT_PUBLIC_AFFILIATE_PLANS_URL` | Health plan comparison | Licensed marketplace/broker comparison tools | Unlicensed lead-gen, "junk" short-term plans |
| `NEXT_PUBLIC_AFFILIATE_COVERAGE_URL` | Coverage discovery | Licensed marketplace partners | Same as above |
| `NEXT_PUBLIC_AFFILIATE_APPEALS_GUIDE_URL` | Appeal support | Patient-advocate / appeal-assistance services | Anything misleading about outcomes |
| `NEXT_PUBLIC_AFFILIATE_RIGHTS_URL` | Billing protections | (Usually leave on free CMS fallback) | — |

---

## Recommended approach (conservative)

Given the trust positioning, start with the two slots most relevant to a visitor
who just learned they owe money, and that have reputable programs:

1. **HSA/FSA provider** (`HSA_URL`) — genuinely useful, low brand risk. Research
   established custodians' affiliate/referral programs.
2. **Bill negotiation / patient advocacy** (`BILL_HELP_URL`) — highest intent
   match, but vet the partner carefully for transparency and reputation before
   activating.

Leave the marketplace/insurance slots on their free `.gov` fallbacks unless you
find a clearly-licensed partner — unlicensed insurance lead-gen carries
compliance and trust risk.

---

## Compliance checklist before activating any slot

- [ ] The partner is reputable, transparent about fees, and well-reviewed.
- [ ] The offer is genuinely relevant to someone disputing a medical bill.
- [ ] The CTA labeling clearly reads "(Partner)".
- [ ] The `/affiliate-disclosure` page is accurate for the live partners.
- [ ] The offer does **not** conflict with Google AdSense program policies.
- [ ] You are not implying guaranteed outcomes (debt erased, claim always won, etc.).
