import pulseModulation from "./topics/pulse-modulation";

export const pulseModulationTopics = [
  pulseModulation,
];

const pulseModulationChapter = {
  ...{
  "number": "05",
  "slug": "pulse-modulation",
  "title": "05 Pulse Modulation",
  "summary": "Pulse Modulation turns information into sampled pulses and compares how pulse amplitude, width, or position can represent a message."
},
  concepts: pulseModulationTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: pulseModulationTopics.map((topic) => topic.title),
  topics: pulseModulationTopics,
};

export default pulseModulationChapter;
