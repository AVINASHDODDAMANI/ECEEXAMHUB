import groundWaveAndSkyWavePropagation from "./topics/ground-wave-and-sky-wave-propagation";

export const groundWaveAndSkyWavePropagationTopics = [
  groundWaveAndSkyWavePropagation,
];

const groundWaveAndSkyWavePropagationChapter = {
  ...{
  "number": "07",
  "slug": "ground-wave-and-sky-wave-propagation",
  "title": "Ground Wave and Sky Wave Propagation",
  "summary": "Study surface-wave travel, ionospheric reflection, critical frequency, MUF, and long-distance radio communication."
},
  concepts: groundWaveAndSkyWavePropagationTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: groundWaveAndSkyWavePropagationTopics.map((topic) => topic.title),
  topics: groundWaveAndSkyWavePropagationTopics,
};

export default groundWaveAndSkyWavePropagationChapter;
