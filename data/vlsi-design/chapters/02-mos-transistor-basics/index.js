import mosTransistorBasics from "./topics/mos-transistor-basics";

export const mosTransistorBasicsTopics = [
  mosTransistorBasics,
];

const mosTransistorBasicsChapter = {
  ...{
  "number": "02",
  "slug": "mos-transistor-basics",
  "title": "MOS Transistor Basics",
  "summary": "Build intuition for NMOS and PMOS structure, gate-source voltage, channel formation, current flow, and operating regions."
},
  concepts: mosTransistorBasicsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: mosTransistorBasicsTopics.map((topic) => topic.title),
  topics: mosTransistorBasicsTopics,
};

export default mosTransistorBasicsChapter;
