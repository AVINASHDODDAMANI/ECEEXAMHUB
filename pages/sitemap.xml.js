import { SITE_URL, getIndexableRoutes } from "../lib/seo";

const DEFAULT_LAST_MODIFIED = new Date("2026-06-01T00:00:00.000Z");

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemapUrl(path = "/") {
  const rawPath = String(path || "/").trim();
  let sitemapPath = rawPath.split("#")[0].split("?")[0] || "/";

  if (/^https?:\/\//i.test(sitemapPath)) {
    try {
      sitemapPath = new URL(sitemapPath).pathname || "/";
    } catch {
      sitemapPath = "/";
    }
  }

  const pathWithLeadingSlash = sitemapPath.startsWith("/")
    ? sitemapPath
    : `/${sitemapPath}`;
  const normalizedPath = pathWithLeadingSlash === "/"
    ? "/"
    : pathWithLeadingSlash.replace(/\/+$/, "");

  return `${SITE_URL}${normalizedPath}`;
}

function buildSitemapXml() {
  const uniqueRoutes = getIndexableRoutes().map((route) => ({
    ...route,
    lastModified: route.lastModified ? new Date(route.lastModified) : DEFAULT_LAST_MODIFIED,
    changefreq: route.changefreq || "daily",
    priority: Number(route.priority ?? 0.8),
  }));
  const urls = uniqueRoutes
    .map(
      (route) => `
  <url>
    <loc>${escapeXml(buildSitemapUrl(route.path))}</loc>
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
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
  res.write(buildSitemapXml());
  res.end();

  return {
    props: {},
  };
}

export default function SitemapXml() {
  return null;
}
