import cmosFabricationTechnology from "./topics/cmos-fabrication-technology";

export const cmosFabricationTechnologyTopics = [
  cmosFabricationTechnology,
];

const cmosFabricationTechnologyChapter = {
  ...{
  "number": "04",
  "slug": "cmos-fabrication-technology",
  "title": "CMOS Fabrication Technology",
  "summary": "Follow wafer processing through oxidation, lithography, diffusion/implantation, deposition, etching, and well formation."
},
  concepts: cmosFabricationTechnologyTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: cmosFabricationTechnologyTopics.map((topic) => topic.title),
  topics: cmosFabricationTechnologyTopics,
};

export default cmosFabricationTechnologyChapter;
