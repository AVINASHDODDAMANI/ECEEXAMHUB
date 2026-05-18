import drivingPointAndTransferFunctions from "./topics/driving-point-and-transfer-functions";
import polesAndZeros from "./topics/poles-and-zeros";
import naturalFrequencies from "./topics/natural-frequencies";
import stabilityFromPoleLocations from "./topics/stability-from-pole-locations";
import networkResponseInterpretation from "./topics/network-response-interpretation";

export const networkFunctionsTopics = [
  drivingPointAndTransferFunctions,
  polesAndZeros,
  naturalFrequencies,
  stabilityFromPoleLocations,
  networkResponseInterpretation,
];

const networkFunctions = {
  number: "14",
  slug: "network-functions",
  title: "Network Functions",
  route: "/network-functions",
  summary: "Analyze transfer functions, driving-point functions, poles, zeros, stability, and network response behavior.",
  concepts: networkFunctionsTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: networkFunctionsTopics.map((topic) => topic.title),
  formula: {
    label: "Network function",
    expression: "H(s) = Output(s) / Input(s)",
    note: "Poles and zeros of H(s) summarize the dynamic behavior of the network.",
  },
  visualType: "pole-zero-map",
  visualFocus: "pole-zero movement and response shaping",
  examFocus: "Pole-zero plots, stability, transfer function formation, response interpretation.",
  engineeringUse: "Used in filter design, amplifier response, system modeling, stability checks, and frequency shaping.",
  topics: networkFunctionsTopics,
};

export default networkFunctions;
