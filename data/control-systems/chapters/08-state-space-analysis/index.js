import stateSpaceAnalysis from "./topics/state-space-analysis";

export const stateSpaceAnalysisTopics = [
  stateSpaceAnalysis,
];

const stateSpaceAnalysisChapter = {
  ...{
  "number": "08",
  "slug": "state-space-analysis",
  "title": "State Space Analysis",
  "summary": "State space analysis describes systems using internal variables, making it powerful for multi-input, multi-output, modern control design."
},
  concepts: stateSpaceAnalysisTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: stateSpaceAnalysisTopics.map((topic) => topic.title),
  topics: stateSpaceAnalysisTopics,
};

export default stateSpaceAnalysisChapter;
