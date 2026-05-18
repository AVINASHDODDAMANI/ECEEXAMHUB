import dipoleAndMonopoleAntennas from "./topics/dipole-and-monopole-antennas";

export const dipoleAndMonopoleAntennasTopics = [
  dipoleAndMonopoleAntennas,
];

const dipoleAndMonopoleAntennasChapter = {
  ...{
  "number": "03",
  "slug": "dipole-and-monopole-antennas",
  "title": "Dipole and Monopole Antennas",
  "summary": "Build intuition for Hertzian dipoles, half-wave dipoles, quarter-wave monopoles, current distribution, and radiation resistance."
},
  concepts: dipoleAndMonopoleAntennasTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: dipoleAndMonopoleAntennasTopics.map((topic) => topic.title),
  topics: dipoleAndMonopoleAntennasTopics,
};

export default dipoleAndMonopoleAntennasChapter;
