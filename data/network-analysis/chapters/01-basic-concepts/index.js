import electricChargeCurrentVoltage from "./topics/electric-charge-current-voltage";
import powerAndEnergy from "./topics/power-and-energy";
import passiveSignConvention from "./topics/passive-sign-convention";
import activeAndPassiveElements from "./topics/active-and-passive-elements";
import linearNonlinearBilateralUnilateral from "./topics/linear-nonlinear-bilateral-unilateral";

export const basicConceptsTopics = [
  electricChargeCurrentVoltage,
  powerAndEnergy,
  passiveSignConvention,
  activeAndPassiveElements,
  linearNonlinearBilateralUnilateral,
];

const basicConcepts = {
  number: "01",
  slug: "basic-concepts",
  title: "Basic Concepts",
  route: "/basic-concepts",
  summary: "Build the foundation of Network Analysis through charge, current, voltage, power, energy, sign convention, and element behavior.",
  concepts: basicConceptsTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: basicConceptsTopics.map((topic) => topic.title),
  formula: {
    label: "Basic circuit relations",
    expression: "I = dQ/dt, P = VI, V = IR",
    note: "Mark current direction and voltage polarity before using these relations.",
  },
  visualType: "circuit-flow",
  visualFocus: "current direction, voltage drop, and power absorption in a simple circuit",
  examFocus: "Definitions, passive sign convention, power absorbed/delivered, element classification.",
  engineeringUse: "Used before every circuit calculation to define references, read energy flow, and avoid sign mistakes.",
  topics: basicConceptsTopics,
};

export default basicConcepts;
