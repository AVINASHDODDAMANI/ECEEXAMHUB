import frequencyResponseFunction from "./topics/frequency-response-function";
import magnitudeAndPhase from "./topics/magnitude-and-phase";
import bodePlotBasics from "./topics/bode-plot-basics";
import bandwidthAndCutoffFrequency from "./topics/bandwidth-and-cutoff-frequency";
import resonanceAndSelectivity from "./topics/resonance-and-selectivity";

export const frequencyDomainAnalysisTopics = [
  frequencyResponseFunction,
  magnitudeAndPhase,
  bodePlotBasics,
  bandwidthAndCutoffFrequency,
  resonanceAndSelectivity,
];

const frequencyDomainAnalysis = {
  number: "11",
  slug: "frequency-domain-analysis",
  title: "Frequency Domain Analysis",
  route: "/frequency-domain-analysis",
  summary: "Study how circuit gain and phase vary with frequency using transfer functions, Bode plots, bandwidth, and resonance.",
  concepts: frequencyDomainAnalysisTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: frequencyDomainAnalysisTopics.map((topic) => topic.title),
  formula: {
    label: "Frequency response",
    expression: "H(j omega) = H(s)|s=j omega",
    note: "Frequency response is found by evaluating the transfer function on the imaginary axis.",
  },
  visualType: "frequency-sweep",
  visualFocus: "input frequency sweep and output amplitude/phase change",
  examFocus: "Magnitude, phase, cutoff frequency, bandwidth, resonant frequency, Q factor.",
  engineeringUse: "Used in filters, amplifiers, control loops, communication receivers, and signal conditioning.",
  topics: frequencyDomainAnalysisTopics,
};

export default frequencyDomainAnalysis;
