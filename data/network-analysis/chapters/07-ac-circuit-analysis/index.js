import rlRcRlcCircuits from "./topics/rl-rc-rlc-circuits";
import powerInAcCircuits from "./topics/power-in-ac-circuits";
import powerFactor from "./topics/power-factor";
import seriesAndParallelResonance from "./topics/series-and-parallel-resonance";

export const acCircuitAnalysisTopics = [
  rlRcRlcCircuits,
  powerInAcCircuits,
  powerFactor,
  seriesAndParallelResonance,
];

const acCircuitAnalysis = {
  number: "07",
  slug: "ac-circuit-analysis",
  title: "AC Circuit Analysis",
  route: "/ac-circuit-analysis",
  summary: "Analyze RL, RC, and RLC circuits in sinusoidal steady state using impedance, phasors, power factor, and resonance.",
  concepts: acCircuitAnalysisTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: acCircuitAnalysisTopics.map((topic) => topic.title),
  formula: {
    label: "Impedance relations",
    expression: "ZR = R, ZL = j omega L, ZC = 1/(j omega C)",
    note: "AC analysis becomes DC-like algebra when elements are replaced by impedance.",
  },
  visualType: "impedance-triangle",
  visualFocus: "phasor current, voltage, impedance, and power triangle behavior",
  examFocus: "Impedance calculation, phase angle, power factor, resonance frequency, Q factor.",
  engineeringUse: "Used in filters, tuned circuits, power-factor correction, RF networks, and AC power analysis.",
  topics: acCircuitAnalysisTopics,
};

export default acCircuitAnalysis;
