import topicProgrammablePeripheralInterface from "./topics/8255-programmable-peripheral-interface";

export const topicProgrammablePeripheralInterfaceTopics = [
  topicProgrammablePeripheralInterface,
];

const topicProgrammablePeripheralInterfaceChapter = {
  ...{
  "slug": "8255-programmable-peripheral-interface",
  "title": "8255 Programmable Peripheral Interface",
  "number": "09",
  "summary": "8255 Programmable Peripheral Interface chapter for Microprocessors."
},
  concepts: topicProgrammablePeripheralInterfaceTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: topicProgrammablePeripheralInterfaceTopics.map((topic) => topic.title),
  topics: topicProgrammablePeripheralInterfaceTopics,
};

export default topicProgrammablePeripheralInterfaceChapter;
