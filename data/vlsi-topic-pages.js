import {
  vlsiDesignChapters,
  vlsiDesignTopicPageMap,
  vlsiDesignTopics,
} from "./vlsi-design";
import { enrichTopicPage } from "./topic-page-compat";

export const vlsiTopics = vlsiDesignTopics;

export const vlsiLearningSubject = {
  slug: "vlsi-design",
  name: "VLSI Design",
  weightage: "6-8 marks",
  description:
    "Study MOS devices, CMOS logic, fabrication, layout, design styles, interconnects, testing, verification, HDL, and CAD automation for GATE and PSU exams.",
  chapters: vlsiDesignChapters.map((chapter) => ({
    slug: chapter.slug,
    title: chapter.title,
    topics: chapter.topics.map((topic) => ({
      slug: topic.slug,
      title: topic.title,
      summary: topic.summary,
      estimatedTime: "35 min",
      status: "ready",
      concepts: topic.concepts,
      subtopics: topic.subtopics,
    })),
  })),
};

export const vlsiTopicPageMap = Object.fromEntries(
  Object.entries(vlsiDesignTopicPageMap).map(([slug, topic]) => [
    slug,
    enrichTopicPage(topic, "VLSI Design"),
  ])
);
