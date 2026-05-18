import zTransform from "./topics/z-transform";

export const zTransformTopics = [
  zTransform,
];

const zTransformChapter = {
  ...{
  "number": "04",
  "slug": "z-transform",
  "title": "Z-Transform",
  "summary": "Connect discrete-time sequences with Z-transform, ROC, inverse transform, pole-zero plots, and system stability."
},
  concepts: zTransformTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: zTransformTopics.map((topic) => topic.title),
  topics: zTransformTopics,
};

export default zTransformChapter;
