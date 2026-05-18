import resistors from "./topics/resistors";
import capacitors from "./topics/capacitors";
import inductors from "./topics/inductors";
import independentSources from "./topics/independent-sources";
import dependentSourcesAndSourceTransformation from "./topics/dependent-sources-and-source-transformation";

export const circuitElementsTopics = [
  resistors,
  capacitors,
  inductors,
  independentSources,
  dependentSourcesAndSourceTransformation,
];

const circuitElements = {
  number: "02",
  slug: "circuit-elements",
  title: "Circuit Elements",
  route: "/circuit-elements",
  summary: "Understand resistors, capacitors, inductors, independent sources, dependent sources, and source transformations.",
  concepts: circuitElementsTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: circuitElementsTopics.map((topic) => topic.title),
  formula: {
    label: "Element laws",
    expression: "v = Ri, i = C dv/dt, v = L di/dt",
    note: "Each element law describes how that element absorbs, stores, or delivers energy.",
  },
  visualType: "element-bank",
  visualFocus: "R, L, C, and source behavior under the same reference direction",
  examFocus: "Element equations, source types, source transformation, stored energy.",
  engineeringUse: "Used to model physical components before applying KCL, KVL, nodal, mesh, or transient analysis.",
  topics: circuitElementsTopics,
};

export default circuitElements;
