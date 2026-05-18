import signalBasics from "./chapters/01-signal-basics";
import transformTechniques from "./chapters/02-transform-techniques";
import samplingAndZTransform from "./chapters/03-sampling-and-z-transform";

export const signalsAndSystemsChapters = [
  signalBasics,
  transformTechniques,
  samplingAndZTransform,
];

export const signalsAndSystemsTopics = signalsAndSystemsChapters.flatMap((chapter) => chapter.topics);

export const signalsAndSystemsSubject = {
  number: "04",
  slug: "signals-and-systems",
  title: "Signals",
  name: "Signals",
  weightage: "8-10 marks",
  description: "Focus on transforms, system properties, and spectral analysis that form the base for communication and control subjects.",
  summary: "Focus on transforms, system properties, and spectral analysis that form the base for communication and control subjects.",
  chapters: signalsAndSystemsChapters,
};

export const signalsAndSystemsTopicPageMap = signalsAndSystemsTopics.reduce((pages, topic) => {
  pages[topic.slug] = topic;
  return pages;
}, {});
