import { getLearningTopic, getReadyLearningTopics } from "./learning-utils";
import { subjectDirectory } from "../data/subject-directory";

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
          ...(enrichedTopic?.examPointers || []),
          ...(enrichedTopic?.commonMistakes || []),
          ...(enrichedTopic?.quickRevision || []),
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

const curatedSearchItems = [
  {
    id: "topic-basic-concepts",
    group: "Topics",
    type: "topic",
    href: "/basic-concepts",
    title: "Basic Concepts",
    subtitle: "Network Analysis | Fundamental electrical concepts",
    description:
      "Start here for charge, current, voltage, power, energy, active/passive elements, and bilateral/unilateral behavior.",
    badge: "Topic",
    keywords: [
      "basic",
      "basics",
      "basic concepts",
      "fundamental",
      "fundamentals",
      "current",
      "electric current",
      "charge",
      "voltage",
      "power",
      "energy",
      "active element",
      "passive element",
      "bilateral",
      "unilateral",
      "network analysis basics",
    ],
  },
  {
    id: "topic-circuit-elements",
    group: "Topics",
    type: "topic",
    href: "/circuit-elements",
    title: "Circuit Elements",
    subtitle: "Network Analysis | R, L, C and sources",
    description:
      "Learn resistors, capacitors, inductors, independent sources, dependent sources, and element behavior.",
    badge: "Topic",
    keywords: ["resistor", "capacitor", "inductor", "rlc", "source", "circuit element"],
  },
  {
    id: "topic-circuit-laws",
    group: "Topics",
    type: "topic",
    href: "/circuit-laws",
    title: "Circuit Laws",
    subtitle: "Network Analysis | KCL, KVL, Ohm's law",
    description:
      "Use Ohm's law, Kirchhoff's current law, and Kirchhoff's voltage law to write circuit equations.",
    badge: "Topic",
    keywords: ["ohm", "ohms law", "kcl", "kvl", "kirchhoff", "law", "laws"],
  },
  {
    id: "topic-network-theorems",
    group: "Topics",
    type: "topic",
    href: "/network-theorems",
    title: "Network Theorems",
    subtitle: "Network Analysis | Thevenin, Norton, Superposition",
    description:
      "Study the main network theorems used to simplify and solve circuits quickly.",
    badge: "Topic",
    keywords: ["thevenin", "norton", "superposition", "maximum power", "theorem", "theorems"],
  },
  {
    id: "topic-dc-circuit-analysis",
    group: "Topics",
    type: "topic",
    href: "/dc-circuit-analysis",
    title: "DC Circuit Analysis",
    subtitle: "Network Analysis | DC solving methods",
    description:
      "Solve direct-current circuits using reductions, KCL, KVL, nodal analysis, and mesh analysis.",
    badge: "Topic",
    keywords: ["dc", "direct current", "dc analysis", "nodal", "mesh", "circuit analysis"],
  },
  {
    id: "notes-network-analysis",
    group: "Notes",
    type: "notes",
    href: "/notes/network-analysis",
    title: "Network Analysis Notes",
    subtitle: "Notes | Revision material",
    description:
      "Open structured notes for Network Analysis with formulas, topic roadmap, and revision support.",
    badge: "Notes",
    keywords: ["network notes", "download notes", "formula", "revision", "pdf"],
  },
  {
    id: "mcq-network-analysis",
    group: "MCQs",
    type: "mcq",
    href: "/mcqs/network-analysis",
    title: "Network Analysis MCQs",
    subtitle: "MCQs | Practice questions",
    description:
      "Practice Network Analysis objective questions linked to circuit concepts and explanations.",
    badge: "MCQ",
    keywords: ["network mcq", "mcqs", "question", "questions", "practice", "current electricity questions"],
  },
];

function buildCuratedItems() {
  const subjectItems = subjectDirectory.map((subject) => ({
    id: `subject-${subject.id}`,
    group: "Subjects",
    type: "subject",
    href: subject.href,
    title: subject.title,
    subtitle: "Subject Library",
    description: subject.description,
    badge: "Subject",
    keywords: [subject.search, subject.title, subject.description],
  }));

  return [...curatedSearchItems, ...subjectItems].map((item) => ({
    ...item,
    searchText: normalizeText(
      [item.title, item.subtitle, item.description, ...(item.keywords || [])].join(" ")
    ),
    scoreText: normalizeText([item.title, item.subtitle, ...(item.keywords || [])].join(" ")),
  }));
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

  if (item.title && normalizeText(item.title) === normalizedQuery) {
    score += 180;
  }

  if (scoreText === normalizedQuery) {
    score += 150;
  }

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
    if (token.length >= 3) {
      scoreText.split(" ").forEach((word) => {
        if (word.startsWith(token) || token.startsWith(word)) {
          score += 5;
        }
      });
    }
  });

  return score;
}

export function buildSmartSearchIndex(questions = []) {
  return [...buildCuratedItems(), ...buildConceptItems(), ...buildQuestionGroupItems(questions)];
}

export function getSmartSearchResults(query = "", index = [], maxResults = 24) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  const queryTokens = normalizedQuery.split(" ").filter(Boolean);

  return index
    .map((item) => ({
      ...item,
      matchScore: scoreItem(item, queryTokens, normalizedQuery),
    }))
    .filter((item) => item.matchScore > 0)
    .sort((left, right) => right.matchScore - left.matchScore || left.title.localeCompare(right.title))
    .slice(0, maxResults);
}

export function getGroupedSmartSearchResults(query = "", index = [], maxPerGroup = 4) {
  const matchedItems = getSmartSearchResults(query, index, 40);

  const grouped = ["Topics", "Subjects", "Concepts", "MCQs", "PYQs", "Practice", "Notes"]
    .map((groupName) => ({
      group: groupName,
      items: matchedItems.filter((item) => item.group === groupName).slice(0, maxPerGroup),
    }))
    .filter((group) => group.items.length);

  return grouped;
}

export function getSearchSuggestions(query = "", index = [], maxSuggestions = 6) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return getPopularSearches(maxSuggestions);
  }

  const directSuggestions = getSmartSearchResults(query, index, maxSuggestions).map((item) => ({
    label: item.title,
    href: item.href,
    group: item.group,
  }));

  const seenLabels = new Set(directSuggestions.map((item) => item.label));
  const tokenSuggestions = normalizedQuery
    .split(" ")
    .filter((token) => token.length >= 2)
    .map((token) => ({
      label: toTitleCase(token),
      href: `/search?q=${encodeURIComponent(token)}`,
      group: "Search",
    }))
    .filter((item) => !seenLabels.has(item.label));

  return [...directSuggestions, ...tokenSuggestions].slice(0, maxSuggestions);
}

export function getPopularSearches(limit = 6) {
  return [
    { label: "Basic Concepts", href: "/basic-concepts", group: "Topic" },
    { label: "Current", href: "/basic-concepts", group: "Topic" },
    { label: "Voltage", href: "/basic-concepts", group: "Topic" },
    { label: "Circuit Laws", href: "/circuit-laws", group: "Topic" },
    { label: "Network Analysis MCQs", href: "/mcqs/network-analysis", group: "MCQs" },
    { label: "Network Analysis Notes", href: "/notes/network-analysis", group: "Notes" },
  ].slice(0, limit);
}
