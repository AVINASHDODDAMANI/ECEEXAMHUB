import digitalModulationTechniques from "./topics/digital-modulation-techniques";

export const digitalModulationTechniquesTopics = [
  digitalModulationTechniques,
];

const digitalModulationTechniquesChapter = {
  ...{
  "number": "07",
  "slug": "digital-modulation-techniques",
  "title": "07 Digital Modulation Techniques",
  "summary": "Digital Modulation maps bits and symbols onto carrier changes, leading to ASK, FSK, PSK, QPSK, and QAM families with different bandwidth and noise tradeoffs."
},
  concepts: digitalModulationTechniquesTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: digitalModulationTechniquesTopics.map((topic) => topic.title),
  topics: digitalModulationTechniquesTopics,
};

export default digitalModulationTechniquesChapter;
