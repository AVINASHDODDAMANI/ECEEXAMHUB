import ohmsLaw from "./topics/ohms-law";
import kirchhoffsCurrentLaw from "./topics/kirchhoffs-current-law";
import kirchhoffsVoltageLaw from "./topics/kirchhoffs-voltage-law";
import seriesAndParallelReduction from "./topics/series-and-parallel-reduction";
import signConventionInEquations from "./topics/sign-convention-in-equations";

export const circuitLawsTopics = [
  ohmsLaw,
  kirchhoffsCurrentLaw,
  kirchhoffsVoltageLaw,
  seriesAndParallelReduction,
  signConventionInEquations,
];

const circuitLaws = {
  number: "03",
  slug: "circuit-laws",
  title: "Circuit Laws",
  route: "/circuit-laws",
  summary: "Use Ohm's law, KCL, and KVL to convert circuit diagrams into solvable algebraic equations.",
  concepts: circuitLawsTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: circuitLawsTopics.map((topic) => topic.title),
  formula: {
    label: "Kirchhoff laws",
    expression: "sum i_node = 0, sum v_loop = 0",
    note: "KCL follows charge conservation and KVL follows energy conservation.",
  },
  visualType: "node-loop",
  visualFocus: "current balance at a node and voltage balance around a loop",
  examFocus: "Writing correct KCL/KVL equations with signs and source polarities.",
  engineeringUse: "Used in every systematic circuit-solving method, including nodal, mesh, AC, and transient analysis.",
  topics: circuitLawsTopics,
};

export default circuitLaws;
