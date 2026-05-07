import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    function typesetMath() {
      if (typeof window !== "undefined" && window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise().catch(() => {});
      }
    }

    typesetMath();
    router.events.on("routeChangeComplete", typesetMath);

    return () => {
      router.events.off("routeChangeComplete", typesetMath);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="theme-color" content="#123b79" />
        <meta
          name="google-site-verification"
          content="jhFrRO_BMQtPKAZBDFQyUiyjIu7kLsHh7RO7ovnXYkc"
        />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </Head>
      <Script
        id="mathjax-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.MathJax = {
              tex: {
                inlineMath: [['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                processEscapes: true
              },
              svg: {
                fontCache: 'global'
              },
              options: {
                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
              }
            };
          `,
        }}
      />
      <Script
        id="mathjax-script"
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}
