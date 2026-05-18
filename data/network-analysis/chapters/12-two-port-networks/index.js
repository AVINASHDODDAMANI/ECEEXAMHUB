import twoPortDefinitions from "./topics/two-port-definitions";
import zAndYParameters from "./topics/z-and-y-parameters";
import hAndGParameters from "./topics/h-and-g-parameters";
import abcdParameters from "./topics/abcd-parameters";
import twoPortInterconnections from "./topics/two-port-interconnections";

export const twoPortNetworksTopics = [
  twoPortDefinitions,
  zAndYParameters,
  hAndGParameters,
  abcdParameters,
  twoPortInterconnections,
];

const twoPortNetworks = {
  number: "12",
  slug: "two-port-networks",
  title: "Two-Port Networks",
  route: "/two-port-networks",
  summary: "Model input-output behavior of linear networks using Z, Y, h, g, ABCD parameters and interconnection rules.",
  concepts: twoPortNetworksTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: twoPortNetworksTopics.map((topic) => topic.title),
  formula: {
    label: "ABCD form",
    expression: "[V1 I1]^T = [A B; C D] [V2 -I2]^T",
    note: "ABCD parameters are especially useful for cascaded two-port networks.",
  },
  visualType: "two-port-block",
  visualFocus: "input-output terminal variables and parameter conversion",
  examFocus: "Parameter definitions, open/short conditions, conversion, cascade multiplication.",
  engineeringUse: "Used in transmission lines, filters, amplifier stages, matching networks, and cascaded circuit blocks.",
  topics: twoPortNetworksTopics,
};

export default twoPortNetworks;
