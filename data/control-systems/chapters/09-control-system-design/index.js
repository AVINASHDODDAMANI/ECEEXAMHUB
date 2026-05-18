import controlSystemDesign from "./topics/control-system-design";

export const controlSystemDesignTopics = [
  controlSystemDesign,
];

const controlSystemDesignChapter = {
  ...{
  "number": "09",
  "slug": "control-system-design",
  "title": "Control System Design",
  "summary": "Control system design selects controllers and compensators so a system meets stability, accuracy, speed, overshoot, and robustness specifications."
},
  concepts: controlSystemDesignTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: controlSystemDesignTopics.map((topic) => topic.title),
  topics: controlSystemDesignTopics,
};

export default controlSystemDesignChapter;
