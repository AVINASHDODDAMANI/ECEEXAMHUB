import specialAntennas from "./topics/special-antennas";

export const specialAntennasTopics = [
  specialAntennas,
];

const specialAntennasChapter = {
  ...{
  "number": "05",
  "slug": "special-antennas",
  "title": "Special Antennas",
  "summary": "Compare loop, helical, horn, parabolic reflector, and microstrip patch antennas through structure and radiation behavior."
},
  concepts: specialAntennasTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: specialAntennasTopics.map((topic) => topic.title),
  topics: specialAntennasTopics,
};

export default specialAntennasChapter;
