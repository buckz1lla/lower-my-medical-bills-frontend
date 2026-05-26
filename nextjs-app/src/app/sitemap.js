import { guides } from "@/lib/guides";
import { allCodes, toSlug } from "@/lib/denialCodes";

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
    "/denial-codes",
    "/procedures",
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

  const denialCodeRoutes = allCodes.map((c) => ({
    url: `${SITE_URL}/denial-codes/${toSlug(c.code)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...guideRoutes, ...denialCodeRoutes];
}
