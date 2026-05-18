import microcontrollers from "./topics/microcontrollers";

export const microcontrollersTopics = [
  microcontrollers,
];

const microcontrollersChapter = {
  ...{
  "number": "03",
  "slug": "microcontrollers",
  "title": "Microcontrollers",
  "summary": "Build intuition for 8051 architecture, CPU, RAM, ROM, I/O ports, timers, serial communication, ARM basics, and registers."
},
  concepts: microcontrollersTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: microcontrollersTopics.map((topic) => topic.title),
  topics: microcontrollersTopics,
};

export default microcontrollersChapter;
