import { getIndexableRoutes, generateCanonical } from "../lib/seo";

function buildSitemapXml() {
  const lastModified = new Date().toISOString();
  const urls = getIndexableRoutes()
    .map(
      (route) => `
  <url>
    <loc>${generateCanonical(route.path)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
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
