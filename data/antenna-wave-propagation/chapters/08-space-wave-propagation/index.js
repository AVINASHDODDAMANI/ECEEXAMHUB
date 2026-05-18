import spaceWavePropagation from "./topics/space-wave-propagation";

export const spaceWavePropagationTopics = [
  spaceWavePropagation,
];

const spaceWavePropagationChapter = {
  ...{
  "number": "08",
  "slug": "space-wave-propagation",
  "title": "Space Wave Propagation",
  "summary": "Understand line-of-sight links, tropospheric propagation, duct propagation, microwave propagation, and radar signal paths."
},
  concepts: spaceWavePropagationTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: spaceWavePropagationTopics.map((topic) => topic.title),
  topics: spaceWavePropagationTopics,
};

export default spaceWavePropagationChapter;
