import { guides } from "@/lib/guides";

const SITE_URL = "https://lowermymedicalbills.com";

export default function sitemap() {
  const now = new Date().toISOString();

  const staticRoutes = [
    "",
    "/analyzer",
    "/guides",
    "/templates",
    "/about",
    "/contact",
    "/editorial-policy",
    "/sources",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/affiliate-disclosure",
    "/fair-price",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : 0.8,
  }));

  const guideRoutes = guides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: guide.updatedAt,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // NOTE: Individual procedure, procedure-category, and denial-code detail pages
  // are intentionally excluded from the sitemap and marked noindex. They remain
  // live as on-site reference tools, but are kept out of Google's index so the
  // site is evaluated on its long-form guides and editorial/trust pages.
  return [...staticRoutes, ...guideRoutes];
}

