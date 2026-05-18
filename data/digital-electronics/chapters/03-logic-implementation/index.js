import logicFamilies from "./topics/logic-families";
import memories from "./topics/memories";

export const logicImplementationTopics = [
  logicFamilies,
  memories,
];

const logicImplementationChapter = {
  ...{
  "slug": "logic-implementation",
  "title": "Logic Implementation",
  "number": "03",
  "summary": "Logic Implementation chapter for Digital."
},
  concepts: logicImplementationTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: logicImplementationTopics.map((topic) => topic.title),
  topics: logicImplementationTopics,
};

export default logicImplementationChapter;
