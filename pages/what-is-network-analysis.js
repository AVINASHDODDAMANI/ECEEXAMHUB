import SeoLandingPage from "../components/SeoLandingPage";
import { seoLandingPages } from "../data/seo-landing-pages";

export default function WhatIsNetworkAnalysisPage() {
  return <SeoLandingPage page={seoLandingPages["network-analysis-intro"]} />;
}
