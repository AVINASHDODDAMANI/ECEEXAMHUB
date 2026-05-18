import timingDiagramsAndMachineCycles from "./topics/timing-diagrams-and-machine-cycles";

export const timingDiagramsAndMachineCyclesTopics = [
  timingDiagramsAndMachineCycles,
];

const timingDiagramsAndMachineCyclesChapter = {
  ...{
  "slug": "timing-diagrams-and-machine-cycles",
  "title": "Timing Diagrams and Machine Cycles",
  "number": "05",
  "summary": "Timing Diagrams and Machine Cycles chapter for Microprocessors."
},
  concepts: timingDiagramsAndMachineCyclesTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: timingDiagramsAndMachineCyclesTopics.map((topic) => topic.title),
  topics: timingDiagramsAndMachineCyclesTopics,
};

export default timingDiagramsAndMachineCyclesChapter;
