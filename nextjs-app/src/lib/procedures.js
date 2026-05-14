import rates from "@/data/cms_rates.json";

/**
 * Convert a procedure description + CPT into a URL-friendly slug.
 * e.g. "Office Visit - Established Patient, Low Complexity" + "99213"
 *   => "office-visit-established-patient-low-complexity-99213"
 */
export function toSlug(description, cpt) {
  return (
    description
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") +
    "-" +
    cpt
  );
}

/** All procedures as a flat array (from static JSON). */
export function getAllProcedures() {
  return rates;
}

/** Find a procedure by slug. */
export function getProcedureBySlug(slug) {
  return rates.find((p) => toSlug(p.description, p.cpt) === slug) || null;
}

/** All slugs — used by generateStaticParams. */
export function getAllSlugs() {
  return rates.map((p) => toSlug(p.description, p.cpt));
}

/** Group procedures by category. */
export function getProceduresByCategory() {
  return rates.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});
}

/** Typical commercial range helpers. */
export function commercialLow(medicareRate) {
  return Math.round(medicareRate * 1.2 * 100) / 100;
}
export function commercialHigh(medicareRate) {
  return Math.round(medicareRate * 2.0 * 100) / 100;
}

/** Format a dollar value. */
export function fmt(n) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Related procedures in the same category (excluding self). */
export function getRelated(cpt, category, limit = 5) {
  return rates
    .filter((p) => p.category === category && p.cpt !== cpt)
    .slice(0, limit);
}
