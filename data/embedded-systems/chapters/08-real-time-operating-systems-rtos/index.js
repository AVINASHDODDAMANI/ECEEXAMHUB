import realTimeOperatingSystemsRtos from "./topics/real-time-operating-systems-rtos";

export const realTimeOperatingSystemsRtosTopics = [
  realTimeOperatingSystemsRtos,
];

const realTimeOperatingSystemsRtosChapter = {
  ...{
  "number": "08",
  "slug": "real-time-operating-systems-rtos",
  "title": "Real-Time Operating Systems (RTOS)",
  "summary": "Understand RTOS basics, tasks, threads, scheduling, semaphores, mutexes, and interprocess communication."
},
  concepts: realTimeOperatingSystemsRtosTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: realTimeOperatingSystemsRtosTopics.map((topic) => topic.title),
  topics: realTimeOperatingSystemsRtosTopics,
};

export default realTimeOperatingSystemsRtosChapter;
