import interfacingTechniques from "./topics/interfacing-techniques";

export const interfacingTechniquesTopics = [
  interfacingTechniques,
];

const interfacingTechniquesChapter = {
  ...{
  "number": "05",
  "slug": "interfacing-techniques",
  "title": "Interfacing Techniques",
  "summary": "Understand LED, LCD, keyboard, sensor, and motor interfacing with GPIO, timing, drivers, and feedback."
},
  concepts: interfacingTechniquesTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: interfacingTechniquesTopics.map((topic) => topic.title),
  topics: interfacingTechniquesTopics,
};

export default interfacingTechniquesChapter;
