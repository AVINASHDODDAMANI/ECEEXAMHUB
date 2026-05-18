import antennaMeasurements from "./topics/antenna-measurements";

export const antennaMeasurementsTopics = [
  antennaMeasurements,
];

const antennaMeasurementsChapter = {
  ...{
  "number": "09",
  "slug": "antenna-measurements",
  "title": "Antenna Measurements",
  "summary": "Learn radiation pattern testing, gain measurement, VSWR, impedance measurement, matching, and reflection coefficient intuition."
},
  concepts: antennaMeasurementsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: antennaMeasurementsTopics.map((topic) => topic.title),
  topics: antennaMeasurementsTopics,
};

export default antennaMeasurementsChapter;
