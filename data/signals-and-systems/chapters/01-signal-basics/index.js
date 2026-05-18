import signalClassification from "./topics/signal-classification";
import systemProperties from "./topics/system-properties";

export const signalBasicsTopics = [
  signalClassification,
  systemProperties,
];

const signalBasicsChapter = {
  ...{
  "slug": "signal-basics",
  "title": "Signal Basics and Systems",
  "number": "01",
  "summary": "Signal Basics and Systems chapter for Signals."
},
  concepts: signalBasicsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: signalBasicsTopics.map((topic) => topic.title),
  topics: signalBasicsTopics,
};

export default signalBasicsChapter;
