import antennasAndPropagationBasics from "./topics/antennas-and-propagation-basics";

export const antennasAndPropagationBasicsTopics = [
  antennasAndPropagationBasics,
];

const antennasAndPropagationBasicsChapter = {
  ...{
  "number": "11",
  "slug": "antennas-and-propagation-basics",
  "title": "11 Antennas and Propagation Basics",
  "summary": "Antennas and Propagation Basics explain how electromagnetic energy is radiated, directed, and carried through ground, sky, and space-wave paths."
},
  concepts: antennasAndPropagationBasicsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: antennasAndPropagationBasicsTopics.map((topic) => topic.title),
  topics: antennasAndPropagationBasicsTopics,
};

export default antennasAndPropagationBasicsChapter;
