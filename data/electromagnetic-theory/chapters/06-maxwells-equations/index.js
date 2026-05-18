import maxwellsEquations from "./topics/maxwells-equations";

export const maxwellsEquationsTopics = [
  maxwellsEquations,
];

const maxwellsEquationsChapter = {
  ...{
  "slug": "maxwells-equations",
  "title": "Maxwell's Equations",
  "number": "06",
  "summary": "Maxwell's Equations chapter for Electromagnetic Theory."
},
  concepts: maxwellsEquationsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: maxwellsEquationsTopics.map((topic) => topic.title),
  topics: maxwellsEquationsTopics,
};

export default maxwellsEquationsChapter;
