import { SITE_URL } from "../lib/seo";

function buildRobotsTxt() {
  return `User-agent: *
Allow: /
Allow: /subjects/
Allow: /notes/
Allow: /learn/
Allow: /previous-year
Allow: /solution/
Disallow: /admin
Disallow: /api
Disallow: /search
Disallow: /practice
Disallow: /mcqs
Disallow: /mock-tests
Disallow: /ece-exams
Disallow: /insights

Sitemap: ${SITE_URL}/sitemap.xml`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain");
  res.write(buildRobotsTxt());
  res.end();

  return {
    props: {},
  };
}

export default function RobotsTxt() {
  return null;
}
