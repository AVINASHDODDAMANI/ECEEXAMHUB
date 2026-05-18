import {
  embeddedSystemsChapters,
  embeddedSystemsTopicPageMap,
  embeddedSystemsTopics,
} from "./embedded-systems";
import { enrichTopicPage } from "./topic-page-compat";

export const embeddedTopics = embeddedSystemsTopics;

export const embeddedLearningSubject = {
  slug: "embedded-systems",
  name: "Embedded Systems",
  weightage: "4-6 marks",
  description:
    "Study microcontrollers, Embedded C, interfacing, communication protocols, timers, interrupts, RTOS, memory, power, design flow, and modern embedded applications.",
  chapters: embeddedSystemsChapters.map((chapter) => ({
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

export const embeddedTopicPageMap = Object.fromEntries(
  Object.entries(embeddedSystemsTopicPageMap).map(([slug, topic]) => [
    slug,
    enrichTopicPage(topic, "Embedded Systems"),
  ])
);
