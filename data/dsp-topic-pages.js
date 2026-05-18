import {
  digitalSignalProcessingChapters,
  digitalSignalProcessingTopicPageMap,
  digitalSignalProcessingTopics,
} from "./digital-signal-processing";
import { enrichTopicPage } from "./topic-page-compat";

export const dspTopics = digitalSignalProcessingTopics;

export const dspLearningSubject = {
  slug: "dsp",
  name: "Digital Signal Processing",
  weightage: "6-8 marks",
  description:
    "Study sampling, discrete-time signals, convolution, z-transform, DFT, FFT, digital filters, filter design, reconstruction, and DSP processors for GATE and PSU exams.",
  chapters: digitalSignalProcessingChapters.map((chapter) => ({
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

export const dspTopicPageMap = Object.fromEntries(
  Object.entries(digitalSignalProcessingTopicPageMap).map(([slug, topic]) => [
    slug,
    enrichTopicPage(topic, "Digital Signal Processing"),
  ])
);
