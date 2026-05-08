import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./navbar";

const SITE_URL = "https://eceexamguide.vercel.app";
const SITE_NAME = "ECE Exam Guide";
const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/ece-exam-guide-lockup-v2.svg`;
const defaultStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/ece-exam-guide-mark-v2.svg`,
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
];

export default function Layout({
  children,
  title = SITE_NAME,
  description = "ECE Exam Guide helps ECE students learn concepts, solve previous papers, practice MCQs, and track exam progress.",
  canonicalUrl = "",
  keywords = "",
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  structuredData = [],
  noIndex = false,
  searchValue = "",
  onSearchChange,
  hideNavbar = false,
  pageClassName = "py-3 sm:py-4",
}) {
  const router = useRouter();
  const pathOnly = (router.asPath || "/").split("#")[0].split("?")[0] || "/";
  const resolvedCanonicalUrl = canonicalUrl || `${SITE_URL}${pathOnly === "/" ? "" : pathOnly}`;
  const structuredDataItems = Array.isArray(structuredData)
    ? [...defaultStructuredData, ...structuredData]
    : [...defaultStructuredData, ...[structuredData].filter(Boolean)];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="description" />
        {keywords ? <meta name="keywords" content={keywords} key="keywords" /> : null}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content={SITE_NAME} key="author" />
        <meta
          name="robots"
          content={noIndex ? "noindex, nofollow" : "index, follow"}
          key="robots"
        />
        <link rel="canonical" href={resolvedCanonicalUrl} key="canonical" />
        <link rel="manifest" href="/site.webmanifest" key="manifest" />
        <meta name="application-name" content={SITE_NAME} key="application-name" />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} key="apple-title" />
        <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
        <meta property="og:type" content={ogType} key="og:type" />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:url" content={resolvedCanonicalUrl} key="og:url" />
        {ogImage ? <meta property="og:image" content={ogImage} key="og:image" /> : null}
        <meta property="og:locale" content="en_IN" key="og:locale" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:domain" content="eceexamguide.vercel.app" key="twitter:domain" />
        <meta name="twitter:url" content={resolvedCanonicalUrl} key="twitter:url" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta name="twitter:description" content={description} key="twitter:description" />
        {ogImage ? <meta name="twitter:image" content={ogImage} key="twitter:image" /> : null}
        {structuredDataItems.map((item, index) => (
          <script
            key={`structured-data-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
      </Head>

      <div className="relative min-h-screen overflow-x-clip bg-[#f4f7fb]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_top,rgba(21,74,150,0.12),transparent_62%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0))]"
        />
        <div className="relative z-10">
          {!hideNavbar && <Navbar searchValue={searchValue} onSearchChange={onSearchChange} />}
          <main
            className={`mx-auto w-full max-w-[1440px] px-3 pb-8 ${pageClassName} sm:px-6 sm:pb-10 lg:px-8`}
          >
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
