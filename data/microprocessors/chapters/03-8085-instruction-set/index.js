import topicInstructionSet from "./topics/8085-instruction-set";

export const topicInstructionSetTopics = [
  topicInstructionSet,
];

const topicInstructionSetChapter = {
  ...{
  "slug": "8085-instruction-set",
  "title": "8085 Instruction Set",
  "number": "03",
  "summary": "8085 Instruction Set chapter for Microprocessors."
},
  concepts: topicInstructionSetTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: topicInstructionSetTopics.map((topic) => topic.title),
  topics: topicInstructionSetTopics,
};

export default topicInstructionSetChapter;
