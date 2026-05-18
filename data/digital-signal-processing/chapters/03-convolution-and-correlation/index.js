import convolutionAndCorrelation from "./topics/convolution-and-correlation";

export const convolutionAndCorrelationTopics = [
  convolutionAndCorrelation,
];

const convolutionAndCorrelationChapter = {
  ...{
  "number": "03",
  "slug": "convolution-and-correlation",
  "title": "Convolution and Correlation",
  "summary": "Learn linear convolution, circular convolution, auto-correlation, cross-correlation, overlap, and matching intuition."
},
  concepts: convolutionAndCorrelationTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: convolutionAndCorrelationTopics.map((topic) => topic.title),
  topics: convolutionAndCorrelationTopics,
};

export default convolutionAndCorrelationChapter;
