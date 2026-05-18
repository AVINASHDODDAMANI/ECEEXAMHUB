import embeddedSystemArchitecture from "./topics/embedded-system-architecture";

export const embeddedSystemArchitectureTopics = [
  embeddedSystemArchitecture,
];

const embeddedSystemArchitectureChapter = {
  ...{
  "number": "02",
  "slug": "embedded-system-architecture",
  "title": "Embedded System Architecture",
  "summary": "Study processor, memory, input/output devices, sensors, actuators, ADC, DAC, timers, firmware, drivers, and middleware."
},
  concepts: embeddedSystemArchitectureTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: embeddedSystemArchitectureTopics.map((topic) => topic.title),
  topics: embeddedSystemArchitectureTopics,
};

export default embeddedSystemArchitectureChapter;
