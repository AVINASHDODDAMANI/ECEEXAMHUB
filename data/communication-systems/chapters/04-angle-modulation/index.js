import angleModulation from "./topics/angle-modulation";

export const angleModulationTopics = [
  angleModulation,
];

const angleModulationChapter = {
  ...{
  "number": "04",
  "slug": "angle-modulation",
  "title": "04 Angle Modulation",
  "summary": "Angle Modulation changes the carrier angle through frequency or phase variation, leading to FM and PM with strong noise-performance advantages."
},
  concepts: angleModulationTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: angleModulationTopics.map((topic) => topic.title),
  topics: angleModulationTopics,
};

export default angleModulationChapter;
