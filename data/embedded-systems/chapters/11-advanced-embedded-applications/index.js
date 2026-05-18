import advancedEmbeddedApplications from "./topics/advanced-embedded-applications";

export const advancedEmbeddedApplicationsTopics = [
  advancedEmbeddedApplications,
];

const advancedEmbeddedApplicationsChapter = {
  ...{
  "number": "11",
  "slug": "advanced-embedded-applications",
  "title": "Advanced Embedded Applications",
  "summary": "Explore IoT, wireless embedded systems, automotive embedded control, robotics, and AI in embedded systems."
},
  concepts: advancedEmbeddedApplicationsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: advancedEmbeddedApplicationsTopics.map((topic) => topic.title),
  topics: advancedEmbeddedApplicationsTopics,
};

export default advancedEmbeddedApplicationsChapter;
