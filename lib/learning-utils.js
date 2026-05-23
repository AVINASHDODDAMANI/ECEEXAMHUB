import { learningSubjects, topicLibrary } from "../data/learning-content";
import {
  communicationLearningSubject,
  communicationTopicPageMap,
} from "../data/communication-topic-pages";
import { dspLearningSubject, dspTopicPageMap } from "../data/dsp-topic-pages";
import { vlsiLearningSubject, vlsiTopicPageMap } from "../data/vlsi-topic-pages";
import { antennaLearningSubject, antennaTopicPageMap } from "../data/antenna-topic-pages";
import { embeddedLearningSubject, embeddedTopicPageMap } from "../data/embedded-topic-pages";
import { filterQuestions, hasQuestionTag } from "./question-utils";

export const LEARNING_PROGRESS_STORAGE_KEY = "eceexamhub-learning-progress";
export const LEARNING_REVISION_STORAGE_KEY = "eceexamhub-learning-revision";

function getMergedLearningSubjects() {
  const subjects = learningSubjects.map((subject) =>
    subject.slug === communicationLearningSubject.slug
      ? communicationLearningSubject
      : subject
  );

  const subjectsWithDsp = subjects.some((subject) => subject.slug === dspLearningSubject.slug)
    ? subjects.map((subject) => (subject.slug === dspLearningSubject.slug ? dspLearningSubject : subject))
    : [...subjects, dspLearningSubject];

  const subjectsWithVlsi = subjectsWithDsp.some((subject) => subject.slug === vlsiLearningSubject.slug)
    ? subjectsWithDsp.map((subject) => (subject.slug === vlsiLearningSubject.slug ? vlsiLearningSubject : subject))
    : [...subjectsWithDsp, vlsiLearningSubject];

  const subjectsWithAntenna = subjectsWithVlsi.some((subject) => subject.slug === antennaLearningSubject.slug)
    ? subjectsWithVlsi.map((subject) => (subject.slug === antennaLearningSubject.slug ? antennaLearningSubject : subject))
    : [...subjectsWithVlsi, antennaLearningSubject];

  return subjectsWithAntenna.some((subject) => subject.slug === embeddedLearningSubject.slug)
    ? subjectsWithAntenna.map((subject) => (subject.slug === embeddedLearningSubject.slug ? embeddedLearningSubject : subject))
    : [...subjectsWithAntenna, embeddedLearningSubject];
}

export function getTopicHref(subjectSlug, topicSlug) {
  return `/learn/${subjectSlug}/${topicSlug}`;
}

export function buildTopicKey(subjectSlug, topicSlug) {
  return `${subjectSlug}/${topicSlug}`;
}

export function getLearningSubjects() {
  return getMergedLearningSubjects();
}

export function getLearningSubject(subjectSlug) {
  return getMergedLearningSubjects().find((subject) => subject.slug === subjectSlug) || null;
}

export function getAllLearningTopics() {
  return getMergedLearningSubjects().flatMap((subject) =>
    subject.chapters.flatMap((chapter) =>
      chapter.topics.map((topic) => ({
        ...topic,
        subjectSlug: subject.slug,
        subjectName: subject.name,
        subjectWeightage: subject.weightage,
        chapterSlug: chapter.slug,
        chapterTitle: chapter.title,
        href: getTopicHref(subject.slug, topic.slug),
        topicKey: buildTopicKey(subject.slug, topic.slug),
      }))
    )
  );
}

export function getReadyLearningTopics() {
  return getAllLearningTopics().filter((topic) => topic.status === "ready");
}

export function getLearningTopic(subjectSlug, topicSlug) {
  const baseTopic = getAllLearningTopics().find(
    (topic) => topic.subjectSlug === subjectSlug && topic.slug === topicSlug
  );

  if (!baseTopic) {
    return null;
  }

  return {
    ...baseTopic,
    ...(topicLibrary[buildTopicKey(subjectSlug, topicSlug)] || {}),
    ...(subjectSlug === communicationLearningSubject.slug
      ? communicationTopicPageMap[topicSlug] || {}
      : {}),
    ...(subjectSlug === dspLearningSubject.slug ? dspTopicPageMap[topicSlug] || {} : {}),
    ...(subjectSlug === vlsiLearningSubject.slug ? vlsiTopicPageMap[topicSlug] || {} : {}),
    ...(subjectSlug === antennaLearningSubject.slug ? antennaTopicPageMap[topicSlug] || {} : {}),
    ...(subjectSlug === embeddedLearningSubject.slug ? embeddedTopicPageMap[topicSlug] || {} : {}),
  };
}

export function getRelatedLearningTopics(relatedTopics = []) {
  return relatedTopics
    .map((relatedTopic) =>
      getLearningTopic(relatedTopic.subjectSlug, relatedTopic.topicSlug)
    )
    .filter(Boolean);
}

export function getTopicQuestionFilters(subjectSlug, topicSlug) {
  const topic = getLearningTopic(subjectSlug, topicSlug);

  if (!topic) {
    return null;
  }

  return {
    subject: topic.subjectName,
    topic: topic.title,
  };
}

export function getTopicQuestions(questions = [], subjectSlug, topicSlug) {
  const topicFilters = getTopicQuestionFilters(subjectSlug, topicSlug);

  if (!topicFilters) {
    return [];
  }

  return filterQuestions(questions, topicFilters).sort((left, right) => right.year - left.year);
}

export function getTopicQuestionSummary(questions = []) {
  const exams = Array.from(
    new Set(questions.flatMap((question) => question.exam || []))
  ).sort((left, right) => left.localeCompare(right));
  const years = Array.from(
    new Set(questions.map((question) => question.year).filter(Boolean))
  ).sort((left, right) => right - left);

  return {
    total: questions.length,
    exams,
    years,
    importantCount: questions.filter((question) => hasQuestionTag(question, "important")).length,
    repeatedCount: questions.filter((question) => hasQuestionTag(question, "repeated")).length,
  };
}

export function searchLearningContent(query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return getReadyLearningTopics()
    .map((topic) => {
      const enrichedTopic = getLearningTopic(topic.subjectSlug, topic.slug);
      const conceptMatches = (enrichedTopic?.keyConcepts || []).filter((concept) =>
        concept.toLowerCase().includes(normalizedQuery)
      );
      const formulaMatches = (enrichedTopic?.formulas || []).filter(
        (formula) =>
          formula.label.toLowerCase().includes(normalizedQuery) ||
          formula.expression.toLowerCase().includes(normalizedQuery)
      );
      const theorySnippetMatches = [
        ...(enrichedTopic?.examPointers || []),
        ...(enrichedTopic?.commonMistakes || []),
        ...(enrichedTopic?.quickRevision || []),
      ].filter((item) => item.toLowerCase().includes(normalizedQuery));
      const matchesTopic =
        topic.title.toLowerCase().includes(normalizedQuery) ||
        topic.subjectName.toLowerCase().includes(normalizedQuery) ||
        topic.chapterTitle.toLowerCase().includes(normalizedQuery) ||
        topic.summary.toLowerCase().includes(normalizedQuery) ||
        (topic.subtopics || []).some((subtopic) =>
          subtopic.toLowerCase().includes(normalizedQuery)
        ) ||
        topic.concepts.some((concept) => concept.toLowerCase().includes(normalizedQuery)) ||
        conceptMatches.length > 0 ||
        formulaMatches.length > 0 ||
        theorySnippetMatches.length > 0;

      if (!matchesTopic) {
        return null;
      }

      return {
        href: topic.href,
        title: topic.title,
        subjectName: topic.subjectName,
        chapterTitle: topic.chapterTitle,
        summary: topic.summary,
        matchedSubtopics: (topic.subtopics || [])
          .filter((subtopic) => subtopic.toLowerCase().includes(normalizedQuery))
          .slice(0, 3),
        matchedConcepts: [...topic.concepts.filter((concept) =>
          concept.toLowerCase().includes(normalizedQuery)
        ), ...conceptMatches].slice(0, 3),
        matchedFormulas: formulaMatches.slice(0, 2),
        matchedTheorySnippets: theorySnippetMatches.slice(0, 3),
      };
    })
    .filter(Boolean);
}

export function readLearningProgress() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const rawValue = window.localStorage.getItem(LEARNING_PROGRESS_STORAGE_KEY);
    if (!rawValue) {
      return {};
    }

    const parsedValue = JSON.parse(rawValue);
    return parsedValue && typeof parsedValue === "object" ? parsedValue : {};
  } catch {
    return {};
  }
}

export function writeLearningProgress(progressMap) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    LEARNING_PROGRESS_STORAGE_KEY,
    JSON.stringify(progressMap)
  );
}

export function readLearningRevision() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const rawValue = window.localStorage.getItem(LEARNING_REVISION_STORAGE_KEY);
    if (!rawValue) {
      return {};
    }

    const parsedValue = JSON.parse(rawValue);
    return parsedValue && typeof parsedValue === "object" ? parsedValue : {};
  } catch {
    return {};
  }
}

export function writeLearningRevision(revisionMap) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    LEARNING_REVISION_STORAGE_KEY,
    JSON.stringify(revisionMap)
  );
}

export function getLearningProgressStats(progressMap = {}) {
  const readyTopics = getReadyLearningTopics();
  const completedTopics = readyTopics.filter((topic) => progressMap[topic.topicKey]);
  const totalTopics = readyTopics.length;
  const completedCount = completedTopics.length;

  return {
    totalTopics,
    completedCount,
    completionPercent: totalTopics
      ? Math.round((completedCount / totalTopics) * 100)
      : 0,
    readyTopics,
      subjects: getMergedLearningSubjects().map((subject) => {
        const subjectTopics = readyTopics.filter(
          (topic) => topic.subjectSlug === subject.slug
        );
      const subjectCompleted = subjectTopics.filter(
        (topic) => progressMap[topic.topicKey]
      ).length;

      return {
        slug: subject.slug,
        name: subject.name,
        weightage: subject.weightage,
        totalTopics: subjectTopics.length,
        completedTopics: subjectCompleted,
        completionPercent: subjectTopics.length
          ? Math.round((subjectCompleted / subjectTopics.length) * 100)
          : 0,
      };
    }),
  };
}

export function getLearningMasteryState(completionPercent = 0, completedTopics = 0) {
  if (completionPercent >= 100) {
    return {
      label: "Mastered",
      note: "All ready topics completed. Keep the subject warm with revision and PYQs.",
    };
  }

  if (completionPercent >= 70) {
    return {
      label: "Revision Ready",
      note: "Coverage is strong enough to shift more time into recall and exam practice.",
    };
  }

  if (completionPercent >= 25) {
    return {
      label: "In Progress",
      note: "Momentum is building. Finish the next topic to keep the path moving.",
    };
  }

  if (completionPercent > 0 || completedTopics > 0) {
    return {
      label: "Started",
      note: "The first topics are done. Consistency matters more than speed here.",
    };
  }

  return {
    label: "Beginner",
    note: "Start one topic to turn this subject into an active study path.",
  };
}

export function getLearningXp(completedTopics = 0) {
  return completedTopics * 40;
}
