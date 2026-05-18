import vectorCalculus from "./topics/vector-calculus";

export const vectorCalculusTopics = [
  vectorCalculus,
];

const vectorCalculusChapter = {
  ...{
  "slug": "vector-calculus",
  "title": "Vector Calculus",
  "number": "01",
  "summary": "Vector Calculus chapter for Electromagnetic Theory."
},
  concepts: vectorCalculusTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: vectorCalculusTopics.map((topic) => topic.title),
  topics: vectorCalculusTopics,
};

export default vectorCalculusChapter;
