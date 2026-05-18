import fastFourierTransformFft from "./topics/fast-fourier-transform-fft";

export const fastFourierTransformFftTopics = [
  fastFourierTransformFft,
];

const fastFourierTransformFftChapter = {
  ...{
  "number": "06",
  "slug": "fast-fourier-transform-fft",
  "title": "Fast Fourier Transform (FFT)",
  "summary": "Understand why FFT is used, Radix-2 FFT, DIT, DIF, butterfly computation, and complexity reduction."
},
  concepts: fastFourierTransformFftTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: fastFourierTransformFftTopics.map((topic) => topic.title),
  topics: fastFourierTransformFftTopics,
};

export default fastFourierTransformFftChapter;
