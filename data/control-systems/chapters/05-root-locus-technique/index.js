import rootLocusTechnique from "./topics/root-locus-technique";

export const rootLocusTechniqueTopics = [
  rootLocusTechnique,
];

const rootLocusTechniqueChapter = {
  ...{
  "number": "05",
  "slug": "root-locus-technique",
  "title": "Root Locus Technique",
  "summary": "Root locus shows how closed-loop poles move as system gain changes, making it a visual method for stability and transient-response design."
},
  concepts: rootLocusTechniqueTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: rootLocusTechniqueTopics.map((topic) => topic.title),
  topics: rootLocusTechniqueTopics,
};

export default rootLocusTechniqueChapter;
