import basicConcepts from "./chapters/01-basic-concepts";
import circuitElements from "./chapters/02-circuit-elements";
import circuitLaws from "./chapters/03-circuit-laws";
import networkTheorems from "./chapters/04-network-theorems";
import dcCircuitAnalysis from "./chapters/05-dc-circuit-analysis";
import acFundamentals from "./chapters/06-ac-fundamentals";
import acCircuitAnalysis from "./chapters/07-ac-circuit-analysis";
import transientAnalysis from "./chapters/08-transient-analysis";
import networkTopology from "./chapters/09-network-topology";
import laplaceTransformMethods from "./chapters/10-laplace-transform-methods";
import frequencyDomainAnalysis from "./chapters/11-frequency-domain-analysis";
import twoPortNetworks from "./chapters/12-two-port-networks";
import filters from "./chapters/13-filters";
import networkFunctions from "./chapters/14-network-functions";
import advancedTopics from "./chapters/15-advanced-topics";

export const networkAnalysisTopicPages = [
  basicConcepts,
  circuitElements,
  circuitLaws,
  networkTheorems,
  dcCircuitAnalysis,
  acFundamentals,
  acCircuitAnalysis,
  transientAnalysis,
  networkTopology,
  laplaceTransformMethods,
  frequencyDomainAnalysis,
  twoPortNetworks,
  filters,
  networkFunctions,
  advancedTopics,
];

export const networkAnalysisTopicPageMap = networkAnalysisTopicPages.reduce((pages, chapter) => {
  pages[chapter.slug] = chapter;
  return pages;
}, {});

export const networkAnalysisSubject = {
  slug: "network-analysis",
  title: "Network Analysis",
  summary: "Network Analysis chapters, topics, formulas, visualization notes, and exam-focused study data for GATE ECE.",
  chapters: networkAnalysisTopicPages,
};

export const NETWORK_ANALYSIS_TOPIC_GROUPS = networkAnalysisTopicPages.map((chapter) => ({
  title: chapter.title,
  topics: chapter.subtopics,
}));

export const NETWORK_TOPIC_TARGET_SLUGS = {
  "Circuit Elements": "circuit-variables",
  "Circuit Laws": "kirchhoff-laws",
  "Network Theorems": "network-theorems",
  "DC Circuit Analysis": "systematic-solving",
  "AC Fundamentals": "ac-analysis",
  "AC Circuit Analysis": "ac-analysis",
  "Transient Analysis": "transient-response",
  "Network Topology": "graph-theory",
  "Laplace Transform Methods": "transient-response",
  "Frequency Domain Analysis": "ac-analysis",
  "Two-Port Networks": "two-port-networks",
  Filters: "ac-analysis",
  "Network Functions": "ac-analysis",
  "Advanced Topics": "special-networks",
};

export const NETWORK_TOPIC_TARGET_ANCHORS = {
  "Basic Concepts": "fundamental-electrical-concepts",
};

export const NETWORK_TOPIC_ROUTES = networkAnalysisTopicPages.reduce((routes, chapter) => {
  routes[chapter.title] = chapter.route;
  return routes;
}, {});

export const NETWORK_ROUTE_ACTIVE_INDEX = networkAnalysisTopicPages.reduce((indexes, chapter, index) => {
  indexes[chapter.route] = index;
  return indexes;
}, {});
