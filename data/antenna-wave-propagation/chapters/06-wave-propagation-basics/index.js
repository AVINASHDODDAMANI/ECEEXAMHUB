import wavePropagationBasics from "./topics/wave-propagation-basics";

export const wavePropagationBasicsTopics = [
  wavePropagationBasics,
];

const wavePropagationBasicsChapter = {
  ...{
  "number": "06",
  "slug": "wave-propagation-basics",
  "title": "Wave Propagation Basics",
  "summary": "Visualize reflection, refraction, diffraction, scattering, and the difference between ground wave, sky wave, and space wave paths."
},
  concepts: wavePropagationBasicsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: wavePropagationBasicsTopics.map((topic) => topic.title),
  topics: wavePropagationBasicsTopics,
};

export default wavePropagationBasicsChapter;
