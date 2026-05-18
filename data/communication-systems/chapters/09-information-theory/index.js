import informationTheory from "./topics/information-theory";

export const informationTheoryTopics = [
  informationTheory,
];

const informationTheoryChapter = {
  ...{
  "number": "09",
  "slug": "information-theory",
  "title": "09 Information Theory",
  "summary": "Information Theory measures uncertainty, information content, and the ultimate rate limits of reliable communication through entropy and channel capacity."
},
  concepts: informationTheoryTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: informationTheoryTopics.map((topic) => topic.title),
  topics: informationTheoryTopics,
};

export default informationTheoryChapter;
