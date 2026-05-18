import vlsiDesignStyles from "./topics/vlsi-design-styles";

export const vlsiDesignStylesTopics = [
  vlsiDesignStyles,
];

const vlsiDesignStylesChapter = {
  ...{
  "number": "05",
  "slug": "vlsi-design-styles",
  "title": "VLSI Design Styles",
  "summary": "Compare full-custom, semi-custom, standard-cell, gate-array, FPGA, and ASIC design tradeoffs."
},
  concepts: vlsiDesignStylesTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: vlsiDesignStylesTopics.map((topic) => topic.title),
  topics: vlsiDesignStylesTopics,
};

export default vlsiDesignStylesChapter;
