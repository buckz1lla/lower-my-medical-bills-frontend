import { guides } from "@/lib/guides";

const SITE_URL = "https://www.lowermymedicalbills.com";

export default function sitemap() {
  const now = new Date().toISOString();

  const staticRoutes = [
    "",
    "/analyzer",
    "/guides",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/affiliate-disclosure",
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

  return [...staticRoutes, ...guideRoutes];
}
