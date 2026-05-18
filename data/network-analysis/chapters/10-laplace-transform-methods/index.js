import laplaceTransformBasics from "./topics/laplace-transform-basics";
import sDomainCircuitModels from "./topics/s-domain-circuit-models";
import initialConditionSources from "./topics/initial-condition-sources";
import transferFunction from "./topics/transfer-function";
import initialAndFinalValueTheorems from "./topics/initial-and-final-value-theorems";

export const laplaceTransformMethodsTopics = [
  laplaceTransformBasics,
  sDomainCircuitModels,
  initialConditionSources,
  transferFunction,
  initialAndFinalValueTheorems,
];

const laplaceTransformMethods = {
  number: "10",
  slug: "laplace-transform-methods",
  title: "Laplace Transform Methods",
  route: "/laplace-transform-methods",
  summary: "Solve circuits in the s-domain using Laplace transforms, impedances, initial conditions, transfer functions, and inverse transforms.",
  concepts: laplaceTransformMethodsTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: laplaceTransformMethodsTopics.map((topic) => topic.title),
  formula: {
    label: "s-domain impedance",
    expression: "ZR = R, ZL = sL, ZC = 1/(sC)",
    note: "Laplace-domain impedance turns differential circuit equations into algebra.",
  },
  visualType: "s-domain-flow",
  visualFocus: "time-domain circuit transformed into an algebraic s-domain model",
  examFocus: "Initial conditions, partial fractions, transfer function, final value theorem validity.",
  engineeringUse: "Used for switching response, system modeling, transfer functions, and transient circuit design.",
  topics: laplaceTransformMethodsTopics,
};

export default laplaceTransformMethods;
