import frequencyResponseAnalysis from "./topics/frequency-response-analysis";

export const frequencyResponseAnalysisTopics = [
  frequencyResponseAnalysis,
];

const frequencyResponseAnalysisChapter = {
  ...{
  "number": "06",
  "slug": "frequency-response-analysis",
  "title": "Frequency Response Analysis",
  "summary": "Frequency response analysis studies system behavior under sinusoidal inputs and uses plots such as Bode, polar, and Nyquist to judge stability and performance."
},
  concepts: frequencyResponseAnalysisTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: frequencyResponseAnalysisTopics.map((topic) => topic.title),
  topics: frequencyResponseAnalysisTopics,
};

export default frequencyResponseAnalysisChapter;
