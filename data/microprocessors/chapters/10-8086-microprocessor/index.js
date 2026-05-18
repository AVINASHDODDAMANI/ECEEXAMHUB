import topicMicroprocessor from "./topics/8086-microprocessor";

export const topicMicroprocessorTopics = [
  topicMicroprocessor,
];

const topicMicroprocessorChapter = {
  ...{
  "slug": "8086-microprocessor",
  "title": "8086 Microprocessor",
  "number": "10",
  "summary": "8086 Microprocessor chapter for Microprocessors."
},
  concepts: topicMicroprocessorTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: topicMicroprocessorTopics.map((topic) => topic.title),
  topics: topicMicroprocessorTopics,
};

export default topicMicroprocessorChapter;
