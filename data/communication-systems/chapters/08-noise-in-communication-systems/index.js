import noiseInCommunicationSystems from "./topics/noise-in-communication-systems";

export const noiseInCommunicationSystemsTopics = [
  noiseInCommunicationSystems,
];

const noiseInCommunicationSystemsChapter = {
  ...{
  "number": "08",
  "slug": "noise-in-communication-systems",
  "title": "08 Noise in Communication Systems",
  "summary": "Noise in Communication Systems explains how unwanted random disturbances degrade signal quality and why SNR, bandwidth, and modulation choice matter."
},
  concepts: noiseInCommunicationSystemsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: noiseInCommunicationSystemsTopics.map((topic) => topic.title),
  topics: noiseInCommunicationSystemsTopics,
};

export default noiseInCommunicationSystemsChapter;
