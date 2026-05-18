import stickDiagramsAndLayoutDesign from "./topics/stick-diagrams-and-layout-design";

export const stickDiagramsAndLayoutDesignTopics = [
  stickDiagramsAndLayoutDesign,
];

const stickDiagramsAndLayoutDesignChapter = {
  ...{
  "number": "06",
  "slug": "stick-diagrams-and-layout-design",
  "title": "Stick Diagrams and Layout Design",
  "summary": "Connect stick diagrams, lambda rules, metal/polysilicon/diffusion layers, contacts, and layout-to-circuit reasoning."
},
  concepts: stickDiagramsAndLayoutDesignTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: stickDiagramsAndLayoutDesignTopics.map((topic) => topic.title),
  topics: stickDiagramsAndLayoutDesignTopics,
};

export default stickDiagramsAndLayoutDesignChapter;
