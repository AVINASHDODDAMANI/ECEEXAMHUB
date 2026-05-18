import embeddedSystemDesignProcess from "./topics/embedded-system-design-process";

export const embeddedSystemDesignProcessTopics = [
  embeddedSystemDesignProcess,
];

const embeddedSystemDesignProcessChapter = {
  ...{
  "number": "10",
  "slug": "embedded-system-design-process",
  "title": "Embedded System Design Process",
  "summary": "Follow requirement analysis, hardware-software co-design, testing, debugging, PCB basics, and validation."
},
  concepts: embeddedSystemDesignProcessTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: embeddedSystemDesignProcessTopics.map((topic) => topic.title),
  topics: embeddedSystemDesignProcessTopics,
};

export default embeddedSystemDesignProcessChapter;
