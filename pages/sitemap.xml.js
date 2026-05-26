import { getIndexableRoutes, generateCanonical } from "../lib/seo";

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemapXml() {
  const generatedAt = new Date();
  const uniqueRoutes = getIndexableRoutes().map((route) => ({
    ...route,
    lastModified: route.lastModified || generatedAt,
    changefreq: route.changefreq || "daily",
    priority: Number(route.priority ?? 0.8),
  }));
  const urls = uniqueRoutes
    .map(
      (route) => `
  <url>
    <loc>${escapeXml(generateCanonical(route.path))}</loc>
    <lastmod>${route.lastModified.toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "application/xml");
  res.write(buildSitemapXml());
  res.end();

  return {
    props: {},
  };
}

export default function SitemapXml() {
  return null;
}
