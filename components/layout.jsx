import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AdRail } from "./AdSlot";
import Footer from "./Footer";
import Navbar from "./navbar";
import {
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_OG_IMAGE,
  DEFAULT_META_DESCRIPTION,
  SITE_ALTERNATE_NAMES,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  generatePageDescription,
  generatePageKeywords,
  generateCanonical,
  normalizeMetaTitle,
  shouldNoIndexPath,
} from "../lib/seo";

function buildDefaultStructuredData({
  title,
  description,
  canonicalUrl,
  image,
  noIndex,
}) {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "@id": organizationId,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/ece-exam-guide-mark-v2.svg`,
      },
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      publisher: {
        "@id": organizationId,
      },
      inLanguage: SITE_LANGUAGE,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": webpageId,
      url: canonicalUrl,
      name: title,
      description,
      isPartOf: {
        "@id": websiteId,
      },
      publisher: {
        "@id": organizationId,
      },
      image,
      inLanguage: SITE_LANGUAGE,
      isAccessibleForFree: true,
      potentialAction: noIndex
        ? undefined
        : {
            "@type": "ReadAction",
            target: [canonicalUrl],
          },
    },
  ];
}

function closeExpandedPopupMenus(eventTarget = null) {
  if (typeof document === "undefined") {
    return;
  }

  const openButtons = Array.from(
    document.querySelectorAll('button[aria-expanded="true"][aria-controls]')
  );

  openButtons.forEach((button) => {
    const controlId = button.getAttribute("aria-controls");
    const controlledElement = controlId ? document.getElementById(controlId) : null;
    const isPopupMenu = /menu|popover/i.test(controlId || "");

    if (!isPopupMenu) {
      return;
    }

    if (
      eventTarget &&
      (button.contains(eventTarget) || controlledElement?.contains(eventTarget))
    ) {
      return;
    }

    button.click();
  });
}

export default function Layout({
  children,
  title = SITE_NAME,
  description = "",
  canonicalUrl = "",
  keywords = "",
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  ogImageWidth = DEFAULT_OG_IMAGE_WIDTH,
  ogImageHeight = DEFAULT_OG_IMAGE_HEIGHT,
  structuredData = [],
  noIndex = false,
  searchValue = "",
  onSearchChange,
  hideNavbar = false,
  pageClassName = "py-2 sm:py-3",
  showAds = true,
}) {
  const router = useRouter();
  const pathOnly = (router.asPath || "/").split("#")[0].split("?")[0] || "/";
  const resolvedCanonicalUrl = generateCanonical(canonicalUrl || pathOnly);
  const resolvedTitle = normalizeMetaTitle(title);
  const resolvedDescription = String(description || "").trim()
    ? String(description).replace(/\s+/g, " ").trim()
    : title === SITE_NAME
      ? DEFAULT_META_DESCRIPTION
      : generatePageDescription(title, pathOnly);
  const resolvedKeywords = String(keywords || "").trim()
    ? String(keywords).replace(/\s+/g, " ").trim()
    : generatePageKeywords(title, pathOnly);
  const effectiveNoIndex = noIndex || shouldNoIndexPath(router.pathname || pathOnly, router.asPath || pathOnly);
  const shouldShowAds = showAds && !effectiveNoIndex && !hideNavbar;
  const defaultStructuredData = buildDefaultStructuredData({
    title: resolvedTitle,
    description: resolvedDescription,
    canonicalUrl: resolvedCanonicalUrl,
    image: ogImage,
    noIndex: effectiveNoIndex,
  });
  const structuredDataItems = Array.isArray(structuredData)
    ? [...defaultStructuredData, ...structuredData]
    : [...defaultStructuredData, ...[structuredData].filter(Boolean)];
  const twitterDomain = (() => {
    try {
      return new URL(SITE_URL).hostname;
    } catch {
      return "eceexamguide.com";
    }
  })();

  useEffect(() => {
    let lastScrollX = window.scrollX;
    let lastScrollY = window.scrollY;

    function handlePointerDown(event) {
      closeExpandedPopupMenus(event.target);
    }

    function handleScroll() {
      const moved = Math.abs(window.scrollX - lastScrollX) + Math.abs(window.scrollY - lastScrollY);
      lastScrollX = window.scrollX;
      lastScrollY = window.scrollY;

      if (moved > 8) {
        closeExpandedPopupMenus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{resolvedTitle}</title>
        <meta name="description" content={resolvedDescription} key="description" />
        <meta name="keywords" content={resolvedKeywords} key="keywords" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content={SITE_NAME} key="author" />
        <meta name="publisher" content={SITE_NAME} key="publisher" />
        <meta name="language" content={SITE_LANGUAGE} key="language" />
        <meta name="rating" content="general" key="rating" />
        <meta name="referrer" content="strict-origin-when-cross-origin" key="referrer" />
        <meta
          name="robots"
          content={effectiveNoIndex ? "noindex, nofollow, noarchive" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"}
          key="robots"
        />
        <meta
          name="googlebot"
          content={effectiveNoIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"}
          key="googlebot"
        />
        <link rel="icon" href="/favicon-v4.ico" sizes="any" key="favicon" />
        <link rel="icon" href="/brand/ece-exam-guide-mark-v2.svg" type="image/svg+xml" key="favicon-svg" />
        <link rel="icon" href="/favicon-v4-48x48.png" type="image/png" sizes="48x48" key="favicon-48" />
        <link rel="icon" href="/favicon-v4-32x32.png" type="image/png" sizes="32x32" key="favicon-32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-v4.png" sizes="180x180" key="apple-touch-icon" />
        <link rel="canonical" href={resolvedCanonicalUrl} key="canonical" />
        <link rel="alternate" hrefLang="en-IN" href={resolvedCanonicalUrl} key="alternate-en-in" />
        <link rel="alternate" hrefLang="x-default" href={resolvedCanonicalUrl} key="alternate-default" />
        <link rel="manifest" href="/site.webmanifest" key="manifest" />
        <meta name="application-name" content={SITE_NAME} key="application-name" />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} key="apple-title" />
        <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
        <meta property="og:type" content={ogType} key="og:type" />
        <meta property="og:title" content={resolvedTitle} key="og:title" />
        <meta property="og:description" content={resolvedDescription} key="og:description" />
        <meta property="og:url" content={resolvedCanonicalUrl} key="og:url" />
        {ogImage ? <meta property="og:image" content={ogImage} key="og:image" /> : null}
        {ogImage ? <meta property="og:image:alt" content={resolvedTitle} key="og:image:alt" /> : null}
        {ogImage ? <meta property="og:image:width" content={String(ogImageWidth)} key="og:image:width" /> : null}
        {ogImage ? <meta property="og:image:height" content={String(ogImageHeight)} key="og:image:height" /> : null}
        <meta property="og:locale" content={SITE_LOCALE} key="og:locale" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:domain" content={twitterDomain} key="twitter:domain" />
        <meta name="twitter:url" content={resolvedCanonicalUrl} key="twitter:url" />
        <meta name="twitter:title" content={resolvedTitle} key="twitter:title" />
        <meta name="twitter:description" content={resolvedDescription} key="twitter:description" />
        {ogImage ? <meta name="twitter:image" content={ogImage} key="twitter:image" /> : null}
        {ogImage ? <meta name="twitter:image:alt" content={resolvedTitle} key="twitter:image:alt" /> : null}
        {structuredDataItems.map((item, index) => (
          <script
            key={`structured-data-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
      </Head>

      <div className="site-compact relative min-h-screen overflow-x-clip bg-[#f3f6f0]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_top,rgba(37,93,145,0.07),transparent_62%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(180deg,rgba(255,253,248,0.72),rgba(255,253,248,0))]"
        />
        <div className="relative z-10">
          {!hideNavbar && <Navbar searchValue={searchValue} onSearchChange={onSearchChange} />}
          <main className={`mx-auto w-full max-w-[1440px] px-3 pb-5 ${pageClassName} sm:px-6 sm:pb-7 lg:px-8`}>
            {shouldShowAds ? (
              <div className="site-ad-layout">
                <div className="min-w-0">{children}</div>
                <AdRail />
              </div>
            ) : (
              children
            )}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
