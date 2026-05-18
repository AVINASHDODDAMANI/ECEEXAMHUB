import introductionToCommunicationSystems from "./topics/introduction-to-communication-systems";

export const introductionToCommunicationSystemsTopics = [
  introductionToCommunicationSystems,
];

const introductionToCommunicationSystemsChapter = {
  ...{
  "number": "01",
  "slug": "introduction-to-communication-systems",
  "title": "01 Introduction to Communication Systems",
  "summary": "Communication Systems starts with one central story: information must travel from source to destination through hardware and a channel that may add noise or distortion."
},
  concepts: introductionToCommunicationSystemsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: introductionToCommunicationSystemsTopics.map((topic) => topic.title),
  topics: introductionToCommunicationSystemsTopics,
};

export default introductionToCommunicationSystemsChapter;
