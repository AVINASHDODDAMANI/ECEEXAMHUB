import { getIndexableRoutes, generateCanonical } from "../lib/seo";

function buildSitemapXml() {
  const manualRoutes = [
    { path: "/", priority: 1.0, lastModified: new Date() },
    { path: "/notes/network-analysis", priority: 0.8, lastModified: new Date() },
    { path: "/previous-year/bel-2023", priority: 0.7, lastModified: new Date() },
  ];
  const uniqueRoutes = [
    ...getIndexableRoutes().map((route) => ({
      ...route,
      lastModified: new Date(),
    })),
    ...manualRoutes,
  ].filter((route, index, routes) => {
    return routes.findIndex((item) => item.path === route.path) === index;
  });
  const urls = uniqueRoutes
    .map(
      (route) => `
  <url>
    <loc>${generateCanonical(route.path)}</loc>
    <lastmod>${route.lastModified.toISOString()}</lastmod>
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
