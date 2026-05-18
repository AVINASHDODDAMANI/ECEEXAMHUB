import fourierMethodsInNetworks from "./topics/fourier-methods-in-networks";
import networkSynthesisOverview from "./topics/network-synthesis-overview";
import stateSpaceRepresentation from "./topics/state-space-representation";
import specialNetworkStructures from "./topics/special-network-structures";
import advancedEquivalentTransformations from "./topics/advanced-equivalent-transformations";

export const advancedTopicsTopics = [
  fourierMethodsInNetworks,
  networkSynthesisOverview,
  stateSpaceRepresentation,
  specialNetworkStructures,
  advancedEquivalentTransformations,
];

const advancedTopics = {
  number: "15",
  slug: "advanced-topics",
  title: "Advanced Topics",
  route: "/subjects/network-analysis",
  summary: "Connect Network Analysis with Fourier methods, network synthesis, state-space ideas, and advanced circuit representations.",
  concepts: advancedTopicsTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: advancedTopicsTopics.map((topic) => topic.title),
  formula: {
    label: "State-space form",
    expression: "x_dot = Ax + Bu, y = Cx + Du",
    note: "State variables describe internal energy storage and dynamic network behavior.",
  },
  visualType: "advanced-map",
  visualFocus: "bridging circuit theory with systems, synthesis, and transform-domain methods",
  examFocus: "Conceptual links, special structures, transfer behavior, and advanced problem framing.",
  engineeringUse: "Used in system-level modeling, synthesis, control-oriented circuit analysis, and advanced signal networks.",
  topics: advancedTopicsTopics,
};

export default advancedTopics;
