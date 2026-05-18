import conductorsAndDielectrics from "./topics/conductors-and-dielectrics";

export const conductorsAndDielectricsTopics = [
  conductorsAndDielectrics,
];

const conductorsAndDielectricsChapter = {
  ...{
  "slug": "conductors-and-dielectrics",
  "title": "Conductors and Dielectrics",
  "number": "03",
  "summary": "Conductors and Dielectrics chapter for Electromagnetic Theory."
},
  concepts: conductorsAndDielectricsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: conductorsAndDielectricsTopics.map((topic) => topic.title),
  topics: conductorsAndDielectricsTopics,
};

export default conductorsAndDielectricsChapter;
