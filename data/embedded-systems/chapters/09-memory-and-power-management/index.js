import memoryAndPowerManagement from "./topics/memory-and-power-management";

export const memoryAndPowerManagementTopics = [
  memoryAndPowerManagement,
];

const memoryAndPowerManagementChapter = {
  ...{
  "number": "09",
  "slug": "memory-and-power-management",
  "title": "Memory and Power Management",
  "summary": "Connect memory organization, EEPROM, Flash, cache, low-power modes, wake-up flow, and power optimization."
},
  concepts: memoryAndPowerManagementTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: memoryAndPowerManagementTopics.map((topic) => topic.title),
  topics: memoryAndPowerManagementTopics,
};

export default memoryAndPowerManagementChapter;
