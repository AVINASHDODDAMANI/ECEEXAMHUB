import memoryInterfacing from "./topics/memory-interfacing";

export const memoryInterfacingTopics = [
  memoryInterfacing,
];

const memoryInterfacingChapter = {
  ...{
  "slug": "memory-interfacing",
  "title": "Memory Interfacing",
  "number": "07",
  "summary": "Memory Interfacing chapter for Microprocessors."
},
  concepts: memoryInterfacingTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: memoryInterfacingTopics.map((topic) => topic.title),
  topics: memoryInterfacingTopics,
};

export default memoryInterfacingChapter;
