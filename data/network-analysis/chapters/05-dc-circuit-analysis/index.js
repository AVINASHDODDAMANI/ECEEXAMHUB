import seriesAndParallelCircuits from "./topics/series-and-parallel-circuits";
import voltageAndCurrentDivision from "./topics/voltage-and-current-division";
import nodalAnalysis from "./topics/nodal-analysis";
import meshAnalysis from "./topics/mesh-analysis";
import starDeltaTransformation from "./topics/star-delta-transformation";

export const dcCircuitAnalysisTopics = [
  seriesAndParallelCircuits,
  voltageAndCurrentDivision,
  nodalAnalysis,
  meshAnalysis,
  starDeltaTransformation,
];

const dcCircuitAnalysis = {
  number: "05",
  slug: "dc-circuit-analysis",
  title: "DC Circuit Analysis",
  route: "/dc-circuit-analysis",
  summary: "Solve resistive DC circuits using series-parallel reduction, nodal analysis, mesh analysis, and star-delta transformations.",
  concepts: dcCircuitAnalysisTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: dcCircuitAnalysisTopics.map((topic) => topic.title),
  formula: {
    label: "Divider rules",
    expression: "Vx = Vs Rx / sum R, Ix = Is Gx / sum G",
    note: "Divider formulas are shortcuts after confirming series or parallel structure.",
  },
  visualType: "dc-solver-flow",
  visualFocus: "choosing reduction, nodal, mesh, or transformation based on circuit shape",
  examFocus: "Fast equation selection, resistor reduction, source handling, node/mesh setup.",
  engineeringUse: "Used for bias networks, power distribution, sensor circuits, and low-frequency resistive models.",
  topics: dcCircuitAnalysisTopics,
};

export default dcCircuitAnalysis;
