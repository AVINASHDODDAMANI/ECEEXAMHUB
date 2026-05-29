import { SITE_URL } from "../lib/seo";

function buildRobotsTxt() {
  return `User-agent: *
Allow: /
Allow: /subjects/
Allow: /notes/
Allow: /learn/
Allow: /previous-year/
Allow: /solution/
Allow: /mcqs/
Allow: /practice/
Allow: /mock-tests/
Allow: /ece-exams/
Allow: /insights/
Disallow: /admin
Disallow: /api
Disallow: /login
Disallow: /search
Disallow: /signup

Sitemap: ${SITE_URL}/sitemap.xml`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
  res.write(buildRobotsTxt());
  res.end();

  return {
    props: {},
  };
}

export default function RobotsTxt() {
  return null;
}
