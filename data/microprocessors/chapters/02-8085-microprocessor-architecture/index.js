import topicMicroprocessorArchitecture from "./topics/8085-microprocessor-architecture";

export const topicMicroprocessorArchitectureTopics = [
  topicMicroprocessorArchitecture,
];

const topicMicroprocessorArchitectureChapter = {
  ...{
  "slug": "8085-microprocessor-architecture",
  "title": "8085 Microprocessor Architecture",
  "number": "02",
  "summary": "8085 Microprocessor Architecture chapter for Microprocessors."
},
  concepts: topicMicroprocessorArchitectureTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: topicMicroprocessorArchitectureTopics.map((topic) => topic.title),
  topics: topicMicroprocessorArchitectureTopics,
};

export default topicMicroprocessorArchitectureChapter;
