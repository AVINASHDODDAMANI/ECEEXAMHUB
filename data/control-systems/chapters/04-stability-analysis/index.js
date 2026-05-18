import stabilityAnalysis from "./topics/stability-analysis";

export const stabilityAnalysisTopics = [
  stabilityAnalysis,
];

const stabilityAnalysisChapter = {
  ...{
  "number": "04",
  "slug": "stability-analysis",
  "title": "Stability Analysis",
  "summary": "Stability analysis checks whether a control system output remains bounded and eventually settles instead of growing uncontrollably."
},
  concepts: stabilityAnalysisTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: stabilityAnalysisTopics.map((topic) => topic.title),
  topics: stabilityAnalysisTopics,
};

export default stabilityAnalysisChapter;
