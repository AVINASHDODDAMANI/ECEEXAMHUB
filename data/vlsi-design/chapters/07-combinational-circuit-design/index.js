import combinationalCircuitDesign from "./topics/combinational-circuit-design";

export const combinationalCircuitDesignTopics = [
  combinationalCircuitDesign,
];

const combinationalCircuitDesignChapter = {
  ...{
  "number": "07",
  "slug": "combinational-circuit-design",
  "title": "Combinational Circuit Design",
  "summary": "Revise CMOS gate construction, adders, multiplexers, decoders, and input-output signal flow in combinational logic."
},
  concepts: combinationalCircuitDesignTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: combinationalCircuitDesignTopics.map((topic) => topic.title),
  topics: combinationalCircuitDesignTopics,
};

export default combinationalCircuitDesignChapter;
