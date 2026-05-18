import digitalCommunication from "./topics/digital-communication";

export const digitalCommunicationTopics = [
  digitalCommunication,
];

const digitalCommunicationChapter = {
  ...{
  "number": "06",
  "slug": "digital-communication",
  "title": "06 Digital Communication",
  "summary": "Digital Communication converts analog or discrete information into binary-friendly forms using sampling, quantization, encoding, and tracking methods such as PCM and delta modulation."
},
  concepts: digitalCommunicationTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: digitalCommunicationTopics.map((topic) => topic.title),
  topics: digitalCommunicationTopics,
};

export default digitalCommunicationChapter;
