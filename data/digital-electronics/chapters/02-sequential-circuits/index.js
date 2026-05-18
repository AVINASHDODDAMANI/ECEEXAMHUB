import flipFlops from "./topics/flip-flops";
import counters from "./topics/counters";

export const sequentialCircuitsTopics = [
  flipFlops,
  counters,
];

const sequentialCircuitsChapter = {
  ...{
  "slug": "sequential-circuits",
  "title": "Sequential Circuits",
  "number": "02",
  "summary": "Sequential Circuits chapter for Digital."
},
  concepts: sequentialCircuitsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: sequentialCircuitsTopics.map((topic) => topic.title),
  topics: sequentialCircuitsTopics,
};

export default sequentialCircuitsChapter;
