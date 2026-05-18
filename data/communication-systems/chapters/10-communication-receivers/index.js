import communicationReceivers from "./topics/communication-receivers";

export const communicationReceiversTopics = [
  communicationReceivers,
];

const communicationReceiversChapter = {
  ...{
  "number": "10",
  "slug": "communication-receivers",
  "title": "10 Communication Receivers",
  "summary": "Communication Receivers recover useful information from weak, noisy RF signals using tuned amplification, frequency conversion, IF filtering, and detection."
},
  concepts: communicationReceiversTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: communicationReceiversTopics.map((topic) => topic.title),
  topics: communicationReceiversTopics,
};

export default communicationReceiversChapter;
