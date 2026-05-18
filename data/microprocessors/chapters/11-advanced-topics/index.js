import advancedTopics from "./topics/advanced-topics";

export const advancedTopicsTopics = [
  advancedTopics,
];

const advancedTopicsChapter = {
  ...{
  "slug": "advanced-topics",
  "title": "Advanced Topics",
  "number": "11",
  "summary": "Advanced Topics chapter for Microprocessors."
},
  concepts: advancedTopicsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: advancedTopicsTopics.map((topic) => topic.title),
  topics: advancedTopicsTopics,
};

export default advancedTopicsChapter;
