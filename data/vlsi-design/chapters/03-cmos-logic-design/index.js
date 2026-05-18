import cmosLogicDesign from "./topics/cmos-logic-design";

export const cmosLogicDesignTopics = [
  cmosLogicDesign,
];

const cmosLogicDesignChapter = {
  ...{
  "number": "03",
  "slug": "cmos-logic-design",
  "title": "CMOS Logic Design",
  "summary": "Study CMOS inverter action, pull-up and pull-down networks, NAND/NOR logic, and static CMOS switching intuition."
},
  concepts: cmosLogicDesignTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: cmosLogicDesignTopics.map((topic) => topic.title),
  topics: cmosLogicDesignTopics,
};

export default cmosLogicDesignChapter;
