import antennaFundamentals from "./topics/antenna-fundamentals";

export const antennaFundamentalsTopics = [
  antennaFundamentals,
];

const antennaFundamentalsChapter = {
  ...{
  "number": "02",
  "slug": "antenna-fundamentals",
  "title": "Antenna Fundamentals",
  "summary": "Study radiation pattern, gain, directivity, beamwidth, polarization, effective aperture, and Friis transmission intuition."
},
  concepts: antennaFundamentalsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: antennaFundamentalsTopics.map((topic) => topic.title),
  topics: antennaFundamentalsTopics,
};

export default antennaFundamentalsChapter;
