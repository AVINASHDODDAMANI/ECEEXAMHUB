import samplingTheorem from "./topics/sampling-theorem";
import zTransform from "./topics/z-transform";

export const samplingAndZTransformTopics = [
  samplingTheorem,
  zTransform,
];

const samplingAndZTransformChapter = {
  ...{
  "slug": "sampling-and-z-transform",
  "title": "Sampling and Z-Transform",
  "number": "03",
  "summary": "Sampling and Z-Transform chapter for Signals."
},
  concepts: samplingAndZTransformTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: samplingAndZTransformTopics.map((topic) => topic.title),
  topics: samplingAndZTransformTopics,
};

export default samplingAndZTransformChapter;
