import {
  antennaWavePropagationChapters,
  antennaWavePropagationTopicPageMap,
  antennaWavePropagationTopics,
} from "./antenna-wave-propagation";
import { enrichTopicPage } from "./topic-page-compat";

export const antennaTopics = antennaWavePropagationTopics;

export const antennaLearningSubject = {
  slug: "antenna-wave-propagation",
  name: "Antenna & Wave Propagation",
  weightage: "4-6 marks",
  description:
    "Study antenna parameters, dipoles, arrays, special antennas, propagation modes, ionospheric propagation, space wave links, measurements, and modern applications for GATE and PSU exams.",
  chapters: antennaWavePropagationChapters.map((chapter) => ({
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

export const antennaTopicPageMap = Object.fromEntries(
  Object.entries(antennaWavePropagationTopicPageMap).map(([slug, topic]) => [
    slug,
    enrichTopicPage(topic, "Antenna & Wave Propagation"),
  ])
);
