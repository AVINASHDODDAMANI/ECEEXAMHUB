import discreteTimeSignalsAndSystems from "./topics/discrete-time-signals-and-systems";

export const discreteTimeSignalsAndSystemsTopics = [
  discreteTimeSignalsAndSystems,
];

const discreteTimeSignalsAndSystemsChapter = {
  ...{
  "number": "02",
  "slug": "discrete-time-signals-and-systems",
  "title": "Discrete-Time Signals and Systems",
  "summary": "Study sequences, unit impulse, unit step, exponential and sinusoidal sequences, operations, and system properties."
},
  concepts: discreteTimeSignalsAndSystemsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: discreteTimeSignalsAndSystemsTopics.map((topic) => topic.title),
  topics: discreteTimeSignalsAndSystemsTopics,
};

export default discreteTimeSignalsAndSystemsChapter;
