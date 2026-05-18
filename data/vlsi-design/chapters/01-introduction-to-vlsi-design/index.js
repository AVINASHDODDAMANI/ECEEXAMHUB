import introductionToVlsiDesign from "./topics/introduction-to-vlsi-design";

export const introductionToVlsiDesignTopics = [
  introductionToVlsiDesign,
];

const introductionToVlsiDesignChapter = {
  ...{
  "number": "01",
  "slug": "introduction-to-vlsi-design",
  "title": "Introduction to VLSI Design",
  "summary": "Understand SSI to VLSI evolution, chip scaling, IC design flow, Moore's Law, and the path from specification to silicon."
},
  concepts: introductionToVlsiDesignTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: introductionToVlsiDesignTopics.map((topic) => topic.title),
  topics: introductionToVlsiDesignTopics,
};

export default introductionToVlsiDesignChapter;
