import sequentialCircuitDesign from "./topics/sequential-circuit-design";

export const sequentialCircuitDesignTopics = [
  sequentialCircuitDesign,
];

const sequentialCircuitDesignChapter = {
  ...{
  "number": "08",
  "slug": "sequential-circuit-design",
  "title": "Sequential Circuit Design",
  "summary": "Understand flip-flop timing, registers, counters, clock synchronization, and memory element behavior."
},
  concepts: sequentialCircuitDesignTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: sequentialCircuitDesignTopics.map((topic) => topic.title),
  topics: sequentialCircuitDesignTopics,
};

export default sequentialCircuitDesignChapter;
