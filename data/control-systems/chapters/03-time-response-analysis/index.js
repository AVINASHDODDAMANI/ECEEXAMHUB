import timeResponseAnalysis from "./topics/time-response-analysis";

export const timeResponseAnalysisTopics = [
  timeResponseAnalysis,
];

const timeResponseAnalysisChapter = {
  ...{
  "number": "03",
  "slug": "time-response-analysis",
  "title": "Time Response Analysis",
  "summary": "Time response analysis studies how control systems behave with time when standard inputs such as step, ramp, and impulse are applied."
},
  concepts: timeResponseAnalysisTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: timeResponseAnalysisTopics.map((topic) => topic.title),
  topics: timeResponseAnalysisTopics,
};

export default timeResponseAnalysisChapter;
