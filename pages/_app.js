import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </>
  );
}
