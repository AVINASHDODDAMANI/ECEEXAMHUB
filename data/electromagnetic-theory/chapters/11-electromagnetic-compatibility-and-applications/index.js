import electromagneticCompatibilityAndApplications from "./topics/electromagnetic-compatibility-and-applications";

export const electromagneticCompatibilityAndApplicationsTopics = [
  electromagneticCompatibilityAndApplications,
];

const electromagneticCompatibilityAndApplicationsChapter = {
  ...{
  "slug": "electromagnetic-compatibility-and-applications",
  "title": "Electromagnetic Compatibility and Applications",
  "number": "11",
  "summary": "Electromagnetic Compatibility and Applications chapter for Electromagnetic Theory."
},
  concepts: electromagneticCompatibilityAndApplicationsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: electromagneticCompatibilityAndApplicationsTopics.map((topic) => topic.title),
  topics: electromagneticCompatibilityAndApplicationsTopics,
};

export default electromagneticCompatibilityAndApplicationsChapter;
