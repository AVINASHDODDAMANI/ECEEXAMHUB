import electrostatics from "./topics/electrostatics";

export const electrostaticsTopics = [
  electrostatics,
];

const electrostaticsChapter = {
  ...{
  "slug": "electrostatics",
  "title": "Electrostatics",
  "number": "02",
  "summary": "Electrostatics chapter for Electromagnetic Theory."
},
  concepts: electrostaticsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: electrostaticsTopics.map((topic) => topic.title),
  topics: electrostaticsTopics,
};

export default electrostaticsChapter;
