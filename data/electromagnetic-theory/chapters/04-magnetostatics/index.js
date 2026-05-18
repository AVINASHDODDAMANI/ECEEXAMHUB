import magnetostatics from "./topics/magnetostatics";

export const magnetostaticsTopics = [
  magnetostatics,
];

const magnetostaticsChapter = {
  ...{
  "slug": "magnetostatics",
  "title": "Magnetostatics",
  "number": "04",
  "summary": "Magnetostatics chapter for Electromagnetic Theory."
},
  concepts: magnetostaticsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: magnetostaticsTopics.map((topic) => topic.title),
  topics: magnetostaticsTopics,
};

export default magnetostaticsChapter;
