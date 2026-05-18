import waveguides from "./topics/waveguides";

export const waveguidesTopics = [
  waveguides,
];

const waveguidesChapter = {
  ...{
  "slug": "waveguides",
  "title": "Waveguides",
  "number": "09",
  "summary": "Waveguides chapter for Electromagnetic Theory."
},
  concepts: waveguidesTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: waveguidesTopics.map((topic) => topic.title),
  topics: waveguidesTopics,
};

export default waveguidesChapter;
