import introductionToMicroprocessors from "./topics/introduction-to-microprocessors";

export const introductionToMicroprocessorsTopics = [
  introductionToMicroprocessors,
];

const introductionToMicroprocessorsChapter = {
  ...{
  "slug": "introduction-to-microprocessors",
  "title": "Introduction to Microprocessors",
  "number": "01",
  "summary": "Introduction to Microprocessors chapter for Microprocessors."
},
  concepts: introductionToMicroprocessorsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: introductionToMicroprocessorsTopics.map((topic) => topic.title),
  topics: introductionToMicroprocessorsTopics,
};

export default introductionToMicroprocessorsChapter;
