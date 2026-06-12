import { guides } from "@/lib/guides";
import { allCodes, toSlug } from "@/lib/denialCodes";
import { getAllProcedures, toSlug as procToSlug, getAllCategorySlugs } from "@/lib/procedures";

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

  const procedureRoutes = getAllProcedures().map((p) => ({
    url: `${SITE_URL}/procedures/${procToSlug(p.description, p.cpt)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const procedureCategoryRoutes = getAllCategorySlugs().map((slug) => ({
    url: `${SITE_URL}/procedures/category/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...guideRoutes, ...denialCodeRoutes, ...procedureRoutes, ...procedureCategoryRoutes];
}
