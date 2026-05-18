import diodes from "./topics/diodes";
import transistorBiasing from "./topics/transistor-biasing";

export const diodesAndTransistorsTopics = [
  diodes,
  transistorBiasing,
];

const diodesAndTransistorsChapter = {
  ...{
  "slug": "diodes-and-transistors",
  "title": "Diodes and Transistor Circuits",
  "number": "02",
  "summary": "Diodes and Transistor Circuits chapter for Analog."
},
  concepts: diodesAndTransistorsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: diodesAndTransistorsTopics.map((topic) => topic.title),
  topics: diodesAndTransistorsTopics,
};

export default diodesAndTransistorsChapter;
