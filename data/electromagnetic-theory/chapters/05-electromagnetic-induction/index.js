import electromagneticInduction from "./topics/electromagnetic-induction";

export const electromagneticInductionTopics = [
  electromagneticInduction,
];

const electromagneticInductionChapter = {
  ...{
  "slug": "electromagnetic-induction",
  "title": "Electromagnetic Induction",
  "number": "05",
  "summary": "Electromagnetic Induction chapter for Electromagnetic Theory."
},
  concepts: electromagneticInductionTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: electromagneticInductionTopics.map((topic) => topic.title),
  topics: electromagneticInductionTopics,
};

export default electromagneticInductionChapter;
