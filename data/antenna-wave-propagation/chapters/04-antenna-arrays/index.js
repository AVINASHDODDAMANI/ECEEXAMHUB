import antennaArrays from "./topics/antenna-arrays";

export const antennaArraysTopics = [
  antennaArrays,
];

const antennaArraysChapter = {
  ...{
  "number": "04",
  "slug": "antenna-arrays",
  "title": "Antenna Arrays",
  "summary": "Understand how multiple antenna elements combine fields, create array factor, and steer beams in broadside or end-fire directions."
},
  concepts: antennaArraysTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: antennaArraysTopics.map((topic) => topic.title),
  topics: antennaArraysTopics,
};

export default antennaArraysChapter;
