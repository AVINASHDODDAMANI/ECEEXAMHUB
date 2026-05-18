import combinationalLogic from "./chapters/01-combinational-logic";
import sequentialCircuits from "./chapters/02-sequential-circuits";
import logicImplementation from "./chapters/03-logic-implementation";

export const digitalElectronicsChapters = [
  combinationalLogic,
  sequentialCircuits,
  logicImplementation,
];

export const digitalElectronicsTopics = digitalElectronicsChapters.flatMap((chapter) => chapter.topics);

export const digitalElectronicsSubject = {
  number: "03",
  slug: "digital-electronics",
  title: "Digital",
  name: "Digital",
  weightage: "10-12 marks",
  description: "Cover combinational and sequential logic with emphasis on state machines, flip-flops, minimization, and logic families.",
  summary: "Cover combinational and sequential logic with emphasis on state machines, flip-flops, minimization, and logic families.",
  chapters: digitalElectronicsChapters,
};

export const digitalElectronicsTopicPageMap = digitalElectronicsTopics.reduce((pages, topic) => {
  pages[topic.slug] = topic;
  return pages;
}, {});
