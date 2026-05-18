import mathematicalModelingOfSystems from "./topics/mathematical-modeling-of-systems";

export const mathematicalModelingOfSystemsTopics = [
  mathematicalModelingOfSystems,
];

const mathematicalModelingOfSystemsChapter = {
  ...{
  "number": "01",
  "slug": "mathematical-modeling-of-systems",
  "title": "Mathematical Modeling of Systems",
  "summary": "Mathematical modeling converts physical systems into equations and transfer functions so engineers can predict, analyze, and design control behavior."
},
  concepts: mathematicalModelingOfSystemsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: mathematicalModelingOfSystemsTopics.map((topic) => topic.title),
  topics: mathematicalModelingOfSystemsTopics,
};

export default mathematicalModelingOfSystemsChapter;
