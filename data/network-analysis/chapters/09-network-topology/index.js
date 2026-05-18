import graphRepresentation from "./topics/graph-representation";
import treeCotreeBranchLink from "./topics/tree-cotree-branch-link";
import tieSetMatrix from "./topics/tie-set-matrix";
import cutSetMatrix from "./topics/cut-set-matrix";
import incidenceMatrix from "./topics/incidence-matrix";

export const networkTopologyTopics = [
  graphRepresentation,
  treeCotreeBranchLink,
  tieSetMatrix,
  cutSetMatrix,
  incidenceMatrix,
];

const networkTopology = {
  number: "09",
  slug: "network-topology",
  title: "Network Topology",
  route: "/network-topology",
  summary: "Represent electrical networks using graphs, nodes, branches, trees, links, loops, cut-sets, and incidence matrices.",
  concepts: networkTopologyTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: networkTopologyTopics.map((topic) => topic.title),
  formula: {
    label: "Independent loops",
    expression: "L = B - N + 1",
    note: "For a connected graph, independent loops depend on branches and nodes.",
  },
  visualType: "network-graph",
  visualFocus: "converting a circuit into graph-theory structure",
  examFocus: "Tree/link identification, tie-set/cut-set matrices, independent equations.",
  engineeringUse: "Used for systematic network equation formulation and computer-aided circuit analysis.",
  topics: networkTopologyTopics,
};

export default networkTopology;
