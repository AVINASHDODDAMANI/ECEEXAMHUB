import communicationProtocols from "./topics/communication-protocols";

export const communicationProtocolsTopics = [
  communicationProtocols,
];

const communicationProtocolsChapter = {
  ...{
  "number": "06",
  "slug": "communication-protocols",
  "title": "Communication Protocols",
  "summary": "Compare UART, SPI, I2C, CAN, USB basics, and data packet transfer in embedded systems."
},
  concepts: communicationProtocolsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: communicationProtocolsTopics.map((topic) => topic.title),
  topics: communicationProtocolsTopics,
};

export default communicationProtocolsChapter;
