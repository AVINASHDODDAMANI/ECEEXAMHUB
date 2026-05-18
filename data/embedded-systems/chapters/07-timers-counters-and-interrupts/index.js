import timersCountersAndInterrupts from "./topics/timers-counters-and-interrupts";

export const timersCountersAndInterruptsTopics = [
  timersCountersAndInterrupts,
];

const timersCountersAndInterruptsChapter = {
  ...{
  "number": "07",
  "slug": "timers-counters-and-interrupts",
  "title": "Timers, Counters, and Interrupts",
  "summary": "Study timers, counters, interrupt basics, interrupt handling, watchdog timer, and PWM generation."
},
  concepts: timersCountersAndInterruptsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: timersCountersAndInterruptsTopics.map((topic) => topic.title),
  topics: timersCountersAndInterruptsTopics,
};

export default timersCountersAndInterruptsChapter;
