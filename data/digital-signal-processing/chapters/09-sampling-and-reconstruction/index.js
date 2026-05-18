import samplingAndReconstruction from "./topics/sampling-and-reconstruction";

export const samplingAndReconstructionTopics = [
  samplingAndReconstruction,
];

const samplingAndReconstructionChapter = {
  ...{
  "number": "09",
  "slug": "sampling-and-reconstruction",
  "title": "Sampling and Reconstruction",
  "summary": "Learn sampling theorem, aliasing, reconstruction, under-sampling, proper sampling, and quantization noise."
},
  concepts: samplingAndReconstructionTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: samplingAndReconstructionTopics.map((topic) => topic.title),
  topics: samplingAndReconstructionTopics,
};

export default samplingAndReconstructionChapter;
