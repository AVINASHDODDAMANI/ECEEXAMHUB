import blockDiagramAndSignalFlowGraph from "./topics/block-diagram-and-signal-flow-graph";

export const blockDiagramAndSignalFlowGraphTopics = [
  blockDiagramAndSignalFlowGraph,
];

const blockDiagramAndSignalFlowGraphChapter = {
  ...{
  "number": "02",
  "slug": "block-diagram-and-signal-flow-graph",
  "title": "Block Diagram and Signal Flow Graph",
  "summary": "Block diagrams and signal flow graphs represent complex control systems visually so their overall transfer function can be found systematically."
},
  concepts: blockDiagramAndSignalFlowGraphTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: blockDiagramAndSignalFlowGraphTopics.map((topic) => topic.title),
  topics: blockDiagramAndSignalFlowGraphTopics,
};

export default blockDiagramAndSignalFlowGraphChapter;
