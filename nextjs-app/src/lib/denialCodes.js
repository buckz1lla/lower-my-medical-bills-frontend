import codes from "@/data/denial_codes.json";

export const allCodes = codes;

export const GROUP_ORDER = [
  "Contractual Obligation",
  "Non-Covered",
  "Remark",
];

export function toSlug(code) {
  return code.toLowerCase().replace(/[^a-z0-9]/g, "-");
}

export function getAllSlugs() {
  return codes.map((c) => ({ slug: toSlug(c.code) }));
}

export function getCodeBySlug(slug) {
  return codes.find((c) => toSlug(c.code) === slug) || null;
}

export function getCodesByGroup() {
  const map = {};
  for (const c of codes) {
    if (!map[c.group]) map[c.group] = [];
    map[c.group].push(c);
  }
  return map;
}

export function getRelatedCodes(code) {
  const entry = codes.find((c) => c.code === code);
  if (!entry || !entry.related_codes) return [];
  return entry.related_codes
    .map((rc) => codes.find((c) => c.code === rc))
    .filter(Boolean);
}
