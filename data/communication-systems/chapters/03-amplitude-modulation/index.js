import amplitudeModulation from "./topics/amplitude-modulation";

export const amplitudeModulationTopics = [
  amplitudeModulation,
];

const amplitudeModulationChapter = {
  ...{
  "number": "03",
  "slug": "amplitude-modulation",
  "title": "03 Amplitude Modulation (AM)",
  "summary": "Amplitude Modulation varies the carrier amplitude according to the message and introduces carrier, upper sideband, and lower sideband components in the spectrum."
},
  concepts: amplitudeModulationTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: amplitudeModulationTopics.map((topic) => topic.title),
  topics: amplitudeModulationTopics,
};

export default amplitudeModulationChapter;
