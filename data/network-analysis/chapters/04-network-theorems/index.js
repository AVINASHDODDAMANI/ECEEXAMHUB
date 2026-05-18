import superpositionTheorem from "./topics/superposition-theorem";
import theveninTheorem from "./topics/thevenin-theorem";
import nortonTheorem from "./topics/norton-theorem";
import maximumPowerTransferTheorem from "./topics/maximum-power-transfer-theorem";
import reciprocityMillmanCompensation from "./topics/reciprocity-millman-compensation";

export const networkTheoremsTopics = [
  superpositionTheorem,
  theveninTheorem,
  nortonTheorem,
  maximumPowerTransferTheorem,
  reciprocityMillmanCompensation,
];

const networkTheorems = {
  number: "04",
  slug: "network-theorems",
  title: "Network Theorems",
  route: "/network-theorems",
  summary: "Simplify linear networks using Superposition, Thevenin, Norton, Maximum Power Transfer, Reciprocity, Millman, and related theorems.",
  concepts: networkTheoremsTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: networkTheoremsTopics.map((topic) => topic.title),
  formula: {
    label: "Thevenin-Norton relation",
    expression: "Vth = In Rth",
    note: "Thevenin and Norton are two equivalent views of the same two-terminal network.",
  },
  visualType: "equivalent-network",
  visualFocus: "complex network collapsing into equivalent source-resistance forms",
  examFocus: "Equivalent resistance, load current, superposition signs, and maximum power condition.",
  engineeringUse: "Used to simplify circuits, analyze changing loads, and isolate sections of practical electrical networks.",
  topics: networkTheoremsTopics,
};

export default networkTheorems;
