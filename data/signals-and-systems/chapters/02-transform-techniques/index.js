import laplaceTransform from "./topics/laplace-transform";
import fourierTransform from "./topics/fourier-transform";

export const transformTechniquesTopics = [
  laplaceTransform,
  fourierTransform,
];

const transformTechniquesChapter = {
  ...{
  "slug": "transform-techniques",
  "title": "Transform Techniques",
  "number": "02",
  "summary": "Transform Techniques chapter for Signals."
},
  concepts: transformTechniquesTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: transformTechniquesTopics.map((topic) => topic.title),
  topics: transformTechniquesTopics,
};

export default transformTechniquesChapter;
