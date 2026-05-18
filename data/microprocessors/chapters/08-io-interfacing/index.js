import ioInterfacing from "./topics/io-interfacing";

export const ioInterfacingTopics = [
  ioInterfacing,
];

const ioInterfacingChapter = {
  ...{
  "slug": "io-interfacing",
  "title": "I/O Interfacing",
  "number": "08",
  "summary": "I/O Interfacing chapter for Microprocessors."
},
  concepts: ioInterfacingTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: ioInterfacingTopics.map((topic) => topic.title),
  topics: ioInterfacingTopics,
};

export default ioInterfacingChapter;
