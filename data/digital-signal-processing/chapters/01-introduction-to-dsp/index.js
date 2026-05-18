import introductionToDsp from "./topics/introduction-to-dsp";

export const introductionToDspTopics = [
  introductionToDsp,
];

const introductionToDspChapter = {
  ...{
  "number": "01",
  "slug": "introduction-to-dsp",
  "title": "Introduction to DSP",
  "summary": "Understand analog signals, digital signals, basic DSP systems, advantages, and real-world processing flow."
},
  concepts: introductionToDspTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: introductionToDspTopics.map((topic) => topic.title),
  topics: introductionToDspTopics,
};

export default introductionToDspChapter;
