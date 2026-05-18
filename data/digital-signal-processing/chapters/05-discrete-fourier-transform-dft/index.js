import discreteFourierTransformDft from "./topics/discrete-fourier-transform-dft";

export const discreteFourierTransformDftTopics = [
  discreteFourierTransformDft,
];

const discreteFourierTransformDftChapter = {
  ...{
  "number": "05",
  "slug": "discrete-fourier-transform-dft",
  "title": "Discrete Fourier Transform (DFT)",
  "summary": "Convert finite time-domain samples into frequency-domain bins and interpret magnitude spectrum and circular periodicity."
},
  concepts: discreteFourierTransformDftTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: discreteFourierTransformDftTopics.map((topic) => topic.title),
  topics: discreteFourierTransformDftTopics,
};

export default discreteFourierTransformDftChapter;
