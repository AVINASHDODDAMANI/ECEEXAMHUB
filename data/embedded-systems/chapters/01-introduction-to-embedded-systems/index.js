import introductionToEmbeddedSystems from "./topics/introduction-to-embedded-systems";

export const introductionToEmbeddedSystemsTopics = [
  introductionToEmbeddedSystems,
];

const introductionToEmbeddedSystemsChapter = {
  ...{
  "number": "01",
  "slug": "introduction-to-embedded-systems",
  "title": "Introduction to Embedded Systems",
  "summary": "Understand embedded-system meaning, characteristics, types, applications, and the sensor-to-processing-to-output flow."
},
  concepts: introductionToEmbeddedSystemsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: introductionToEmbeddedSystemsTopics.map((topic) => topic.title),
  topics: introductionToEmbeddedSystemsTopics,
};

export default introductionToEmbeddedSystemsChapter;
