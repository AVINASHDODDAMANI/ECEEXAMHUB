import electromagneticWaves from "./topics/electromagnetic-waves";

export const electromagneticWavesTopics = [
  electromagneticWaves,
];

const electromagneticWavesChapter = {
  ...{
  "slug": "electromagnetic-waves",
  "title": "Electromagnetic Waves",
  "number": "07",
  "summary": "Electromagnetic Waves chapter for Electromagnetic Theory."
},
  concepts: electromagneticWavesTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: electromagneticWavesTopics.map((topic) => topic.title),
  topics: electromagneticWavesTopics,
};

export default electromagneticWavesChapter;
