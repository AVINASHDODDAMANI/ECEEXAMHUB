import booleanAlgebraAndKmaps from "./topics/boolean-algebra-and-kmaps";
import combinationalCircuits from "./topics/combinational-circuits";

export const combinationalLogicTopics = [
  booleanAlgebraAndKmaps,
  combinationalCircuits,
];

const combinationalLogicChapter = {
  ...{
  "slug": "combinational-logic",
  "title": "Combinational Logic",
  "number": "01",
  "summary": "Combinational Logic chapter for Digital."
},
  concepts: combinationalLogicTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: combinationalLogicTopics.map((topic) => topic.title),
  topics: combinationalLogicTopics,
};

export default combinationalLogicChapter;
