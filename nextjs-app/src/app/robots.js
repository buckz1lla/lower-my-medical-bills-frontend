const SITE_URL = "https://lowermymedicalbills.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/owner", "/owner/analytics", "/owner/login"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
