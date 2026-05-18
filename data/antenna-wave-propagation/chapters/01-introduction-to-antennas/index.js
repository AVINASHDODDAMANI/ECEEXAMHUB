import introductionToAntennas from "./topics/introduction-to-antennas";

export const introductionToAntennasTopics = [
  introductionToAntennas,
];

const introductionToAntennasChapter = {
  ...{
  "number": "01",
  "slug": "introduction-to-antennas",
  "title": "Introduction to Antennas",
  "summary": "Understand what antennas do, how radiation begins, how transmission and reception work, and how antenna categories differ."
},
  concepts: introductionToAntennasTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: introductionToAntennasTopics.map((topic) => topic.title),
  topics: introductionToAntennasTopics,
};

export default introductionToAntennasChapter;
