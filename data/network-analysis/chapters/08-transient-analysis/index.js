import initialAndFinalConditions from "./topics/initial-and-final-conditions";
import rcTransients from "./topics/rc-transients";
import rlTransients from "./topics/rl-transients";
import rlcSecondOrderResponse from "./topics/rlc-second-order-response";
import naturalForcedCompleteResponse from "./topics/natural-forced-complete-response";

export const transientAnalysisTopics = [
  initialAndFinalConditions,
  rcTransients,
  rlTransients,
  rlcSecondOrderResponse,
  naturalForcedCompleteResponse,
];

const transientAnalysis = {
  number: "08",
  slug: "transient-analysis",
  title: "Transient Analysis",
  route: "/transient-analysis",
  summary: "Study first-order and second-order circuit response when switching changes stored energy in capacitors and inductors.",
  concepts: transientAnalysisTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: transientAnalysisTopics.map((topic) => topic.title),
  formula: {
    label: "First-order response",
    expression: "x(t) = x(infinity) + [x(0+) - x(infinity)] e^(-t/tau)",
    note: "A first-order response moves exponentially from initial value to final value.",
  },
  visualType: "exponential-response",
  visualFocus: "charging, discharging, and time-constant movement",
  examFocus: "Initial/final values, time constant, switch timing, capacitor/inductor continuity.",
  engineeringUse: "Used in switching circuits, filters, pulse shaping, power supplies, and protection networks.",
  topics: transientAnalysisTopics,
};

export default transientAnalysis;
