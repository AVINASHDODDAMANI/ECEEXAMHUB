import mathematicalModelingOfSystems from "./chapters/01-mathematical-modeling-of-systems";
import blockDiagramAndSignalFlowGraph from "./chapters/02-block-diagram-and-signal-flow-graph";
import timeResponseAnalysis from "./chapters/03-time-response-analysis";
import stabilityAnalysis from "./chapters/04-stability-analysis";
import rootLocusTechnique from "./chapters/05-root-locus-technique";
import frequencyResponseAnalysis from "./chapters/06-frequency-response-analysis";
import controllersAndCompensators from "./chapters/07-controllers-and-compensators";
import stateSpaceAnalysis from "./chapters/08-state-space-analysis";
import controlSystemDesign from "./chapters/09-control-system-design";

export const controlSystemsChapters = [
  mathematicalModelingOfSystems,
  blockDiagramAndSignalFlowGraph,
  timeResponseAnalysis,
  stabilityAnalysis,
  rootLocusTechnique,
  frequencyResponseAnalysis,
  controllersAndCompensators,
  stateSpaceAnalysis,
  controlSystemDesign,
];

export const controlSystemsTopics = controlSystemsChapters.flatMap((chapter) => chapter.topics);

export const controlSystemsSubject = {
  number: "09",
  slug: "control-systems",
  title: "Control Systems",
  name: "Control Systems",
  weightage: "",
  description: "Control Systems topic pages for GATE ECE.",
  summary: "Control Systems topic pages for GATE ECE.",
  chapters: controlSystemsChapters,
};

export const controlSystemsTopicPageMap = controlSystemsTopics.reduce((pages, topic) => {
  pages[topic.slug] = topic;
  return pages;
}, {});
