import opAmpFundamentals from "./chapters/01-op-amp-fundamentals";
import diodesAndTransistors from "./chapters/02-diodes-and-transistors";
import frequencyResponseAndFeedback from "./chapters/03-frequency-response-and-feedback";

export const analogElectronicsChapters = [
  opAmpFundamentals,
  diodesAndTransistors,
  frequencyResponseAndFeedback,
];

export const analogElectronicsTopics = analogElectronicsChapters.flatMap((chapter) => chapter.topics);

export const analogElectronicsSubject = {
  number: "02",
  slug: "analog-electronics",
  title: "Analog",
  name: "Analog",
  weightage: "10-12 marks",
  description: "Build strong command over op-amps, feedback, and analog building blocks that appear repeatedly in GATE and PSU exams.",
  summary: "Build strong command over op-amps, feedback, and analog building blocks that appear repeatedly in GATE and PSU exams.",
  chapters: analogElectronicsChapters,
};

export const analogElectronicsTopicPageMap = analogElectronicsTopics.reduce((pages, topic) => {
  pages[topic.slug] = topic;
  return pages;
}, {});
