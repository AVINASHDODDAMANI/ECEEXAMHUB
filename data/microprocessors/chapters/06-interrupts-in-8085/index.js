import interruptsIn8085 from "./topics/interrupts-in-8085";

export const interruptsIn8085Topics = [
  interruptsIn8085,
];

const interruptsIn8085Chapter = {
  ...{
  "slug": "interrupts-in-8085",
  "title": "Interrupts in 8085",
  "number": "06",
  "summary": "Interrupts in 8085 chapter for Microprocessors."
},
  concepts: interruptsIn8085Topics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: interruptsIn8085Topics.map((topic) => topic.title),
  topics: interruptsIn8085Topics,
};

export default interruptsIn8085Chapter;
