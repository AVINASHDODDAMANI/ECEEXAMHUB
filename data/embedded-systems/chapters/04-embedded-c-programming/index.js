import embeddedCProgramming from "./topics/embedded-c-programming";

export const embeddedCProgrammingTopics = [
  embeddedCProgramming,
];

const embeddedCProgrammingChapter = {
  ...{
  "number": "04",
  "slug": "embedded-c-programming",
  "title": "Embedded C Programming",
  "summary": "Learn Embedded C basics, data types, variables, bitwise operations, functions, pointers, and interrupt programming."
},
  concepts: embeddedCProgrammingTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: embeddedCProgrammingTopics.map((topic) => topic.title),
  topics: embeddedCProgrammingTopics,
};

export default embeddedCProgrammingChapter;
