import {
  communicationSystemsChapters,
  communicationSystemsTopicPageMap,
  communicationSystemsTopics,
} from "./communication-systems";
import { enrichTopicPage } from "./topic-page-compat";

export const communicationTopicPages = communicationSystemsTopics;

export const communicationLearningSubject = {
  slug: "communications",
  name: "Communication Systems",
  weightage: "8-10 marks",
  description:
    "Cover analog and digital communication concepts, noise, modulation, and information theory for high-yield ECE exams.",
  chapters: communicationSystemsChapters.map((chapter) => ({
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

export const communicationTopicPageMap = Object.fromEntries(
  Object.entries(communicationSystemsTopicPageMap).map(([slug, topic]) => [
    slug,
    enrichTopicPage(topic, "Communication Systems"),
  ])
);
