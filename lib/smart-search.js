import { getLearningTopic, getReadyLearningTopics } from "./learning-utils";

function normalizeText(value = "") {
  return value.toLowerCase().replace(/[^a-z0-9]+/gi, " ").trim();
}

function toTitleCase(value = "") {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildTopicLookup() {
  return getReadyLearningTopics().reduce((accumulator, topic) => {
    accumulator.set(`${topic.subjectName}::${topic.title}`, topic);
    return accumulator;
  }, new Map());
}

function buildConceptItems() {
  return getReadyLearningTopics().map((topic) => {
    const enrichedTopic = getLearningTopic(topic.subjectSlug, topic.slug);

    return {
      id: `concept-${topic.topicKey}`,
      group: "Concepts",
      type: "concept",
      href: topic.href,
      title: topic.title,
      subtitle: `${topic.subjectName} -> ${topic.chapterTitle}`,
      description: topic.summary,
      badge: "Learn",
      searchText: normalizeText(
        [
          topic.title,
          topic.subjectName,
          topic.chapterTitle,
          topic.summary,
          ...(topic.subtopics || []),
          ...(topic.concepts || []),
          ...(enrichedTopic?.keyConcepts || []),
          ...(enrichedTopic?.learningGoals || []),
          ...(enrichedTopic?.formulas || []).flatMap((formula) => [
            formula.label,
            formula.expression,
            formula.note,
          ]),
        ].join(" ")
      ),
      scoreText: normalizeText([topic.title, topic.subjectName, topic.chapterTitle].join(" ")),
    };
  });
}

function buildQuestionGroupItems(questions = []) {
  const topicLookup = buildTopicLookup();
  const grouped = questions.reduce((accumulator, question) => {
    const groupKey = `${question.subject}::${question.topic}`;
    const current = accumulator[groupKey] || {
      groupKey,
      subject: question.subject,
      topic: question.topic,
      questions: [],
      exams: new Set(),
      years: new Set(),
      tags: new Set(),
    };

    current.questions.push(question);
    (question.exam || []).forEach((exam) => current.exams.add(exam));
    if (question.year) {
      current.years.add(question.year);
    }
    (question.tags || []).forEach((tag) => current.tags.add(tag));

    accumulator[groupKey] = current;
    return accumulator;
  }, {});

  return Object.values(grouped).flatMap((group) => {
    const relatedTopic = topicLookup.get(`${group.subject}::${group.topic}`);
    const years = Array.from(group.years).sort((left, right) => right - left);
    const exams = Array.from(group.exams);
    const questionText = group.questions
      .flatMap((question) => [question.question, question.explanation, ...(question.options || [])])
      .join(" ");
    const yearPreview = years.slice(0, 3).join(", ");
    const pyqHref = relatedTopic
      ? `${relatedTopic.href}#pyqs`
      : `/previous-year?search=${encodeURIComponent(group.topic)}`;
    const practiceHref = relatedTopic
      ? `${relatedTopic.href}#practice`
      : `/practice?search=${encodeURIComponent(group.topic)}`;

    return [
      {
        id: `pyq-${group.groupKey}`,
        group: "PYQs",
        type: "pyq",
        href: pyqHref,
        title: group.topic,
        subtitle: `${group.subject} | ${(exams || []).join(" | ") || "Exam archive"}`,
        description: years.length
          ? `Previous year questions from ${yearPreview}`
          : "Previous year question archive",
        badge: "PYQ",
        searchText: normalizeText(
          [group.subject, group.topic, exams.join(" "), years.join(" "), questionText].join(" ")
        ),
        scoreText: normalizeText([group.topic, group.subject].join(" ")),
      },
      {
        id: `practice-${group.groupKey}`,
        group: "Practice",
        type: "practice",
        href: practiceHref,
        title: `${group.topic} MCQs`,
        subtitle: `${group.subject} | ${group.questions.length} question${
          group.questions.length === 1 ? "" : "s"
        }`,
        description: `Practice this topic with concept-linked MCQs and explanations.`,
        badge: "MCQ",
        searchText: normalizeText(
          [group.subject, group.topic, exams.join(" "), years.join(" "), questionText].join(" ")
        ),
        scoreText: normalizeText([group.topic, group.subject, "mcq practice"].join(" ")),
      },
    ];
  });
}

function scoreItem(item, queryTokens, normalizedQuery) {
  let score = 0;
  const scoreText = item.scoreText || "";

  if (scoreText.startsWith(normalizedQuery)) {
    score += 120;
  }

  if (scoreText.includes(normalizedQuery)) {
    score += 70;
  }

  queryTokens.forEach((token) => {
    if (scoreText.startsWith(token)) {
      score += 22;
    }
    if (scoreText.includes(token)) {
      score += 10;
    }
    if (item.searchText.includes(token)) {
      score += 4;
    }
  });

  return score;
}

export function buildSmartSearchIndex(questions = []) {
  return [...buildConceptItems(), ...buildQuestionGroupItems(questions)];
}

export function getGroupedSmartSearchResults(query = "", index = [], maxPerGroup = 4) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  const queryTokens = normalizedQuery.split(" ").filter(Boolean);

  const matchedItems = index
    .filter((item) => queryTokens.every((token) => item.searchText.includes(token)))
    .map((item) => ({
      ...item,
      matchScore: scoreItem(item, queryTokens, normalizedQuery),
    }))
    .sort((left, right) => right.matchScore - left.matchScore || left.title.localeCompare(right.title));

  const grouped = ["Concepts", "PYQs", "Practice"]
    .map((groupName) => ({
      group: groupName,
      items: matchedItems.filter((item) => item.group === groupName).slice(0, maxPerGroup),
    }))
    .filter((group) => group.items.length);

  return grouped;
}

export function getSearchSuggestions(query = "") {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  return normalizedQuery
    .split(" ")
    .filter(Boolean)
    .map((token) => toTitleCase(token))
    .slice(0, 3);
}
