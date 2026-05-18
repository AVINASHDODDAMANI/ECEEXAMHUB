import transmissionLines from "./topics/transmission-lines";

export const transmissionLinesTopics = [
  transmissionLines,
];

const transmissionLinesChapter = {
  ...{
  "slug": "transmission-lines",
  "title": "Transmission Lines",
  "number": "08",
  "summary": "Transmission Lines chapter for Electromagnetic Theory."
},
  concepts: transmissionLinesTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: transmissionLinesTopics.map((topic) => topic.title),
  topics: transmissionLinesTopics,
};

export default transmissionLinesChapter;
