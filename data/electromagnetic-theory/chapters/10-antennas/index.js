import antennas from "./topics/antennas";

export const antennasTopics = [
  antennas,
];

const antennasChapter = {
  ...{
  "slug": "antennas",
  "title": "Antennas",
  "number": "10",
  "summary": "Antennas chapter for Electromagnetic Theory."
},
  concepts: antennasTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: antennasTopics.map((topic) => topic.title),
  topics: antennasTopics,
};

export default antennasChapter;
