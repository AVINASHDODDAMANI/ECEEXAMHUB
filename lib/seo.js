import { subjectDirectory } from "../data/subject-directory";
import { getSubjectSlug, subjectTheoryRoadmaps } from "../data/subject-theory-roadmaps";
import { controlSystemTopicPages } from "../data/control-system-topic-pages";
import { getLearningSubject, getReadyLearningTopics } from "./learning-utils";

export const SITE_URL = "https://eceexamguide.vercel.app";
export const SITE_NAME = "ECE Exam Guide";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/ece-exam-guide-lockup-v2.svg`;

const SUBJECT_TO_LEARNING_SLUG = {
  "Network Analysis": "networks",
  "Analog Electronics": "analog",
  "Digital Electronics": "digital",
  "Signals and Systems": "signals",
  "Communication Systems": "communications",
  "Electromagnetic Theory": "electromagnetics",
  Microprocessors: "microprocessors",
  "Digital Signal Processing": "dsp",
  "Control Systems": "control-systems",
};

const LEARNING_SUBJECT_TO_SUBJECT_PAGE = {
  analog: "analog-electronics",
  communications: "communication-systems",
  "control-systems": "control-systems",
  digital: "digital-electronics",
  dsp: "digital-signal-processing",
  electromagnetics: "electromagnetic-theory",
  microprocessors: "microprocessors",
  networks: "network-analysis",
  signals: "signals-and-systems",
};

const GENERIC_NOINDEX_PATHS = new Set([
  "/admin",
  "/ece-exams",
  "/insights",
  "/learn",
  "/mcqs",
  "/mock-tests",
  "/notes",
  "/practice",
  "/previous-year",
  "/search",
]);

const EDUCATIONAL_STATIC_ROUTES = [
  "/ac-circuit-analysis",
  "/ac-fundamentals",
  "/active-filters-waveform-generators",
  "/amplifiers",
  "/analog-to-digital-and-digital-to-analog-converters",
  "/basic-concepts",
  "/bipolar-junction-transistor",
  "/bjt-amplifiers",
  "/bjt-and-mosfet",
  "/block-diagram-and-signal-flow-graph",
  "/circuit-elements",
  "/circuit-laws",
  "/combinational-circuits",
  "/controllers-and-compensators",
  "/control-system-design",
  "/convolution",
  "/counters",
  "/dc-circuit-analysis",
  "/diodes",
  "/diodes-and-applications",
  "/digital-ics-and-applications",
  "/feedback-amplifiers",
  "/field-effect-transistors",
  "/filters",
  "/fourier-series",
  "/fourier-transform",
  "/frequency-domain-analysis",
  "/frequency-response-analysis",
  "/frequency-response-and-filters",
  "/introduction-to-control-systems",
  "/introduction-to-signals",
  "/karnaugh-map",
  "/laplace-transform",
  "/laplace-transform-methods",
  "/logic-families",
  "/logic-gates-and-boolean-algebra",
  "/mathematical-modeling-of-systems",
  "/mathematical-representation-of-signals",
  "/memories",
  "/network-functions",
  "/network-theorems",
  "/network-topology",
  "/number-systems-and-codes",
  "/operational-amplifiers",
  "/oscillators",
  "/power-supplies",
  "/registers-and-shift-registers",
  "/root-locus-technique",
  "/sampling-theorem",
  "/semiconductor-fundamentals",
  "/sequential-circuits",
  "/stability-analysis",
  "/state-space-analysis",
  "/systems-and-their-properties",
  "/time-response-analysis",
  "/transient-analysis",
  "/two-port-networks",
  "/z-transform",
];

function uniqueStrings(items = []) {
  return Array.from(
    new Set(
      items
        .flat()
        .filter(Boolean)
        .map((item) => String(item).trim())
        .filter(Boolean)
    )
  );
}

export function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateCanonical(path = "/") {
  const normalizedPath = path === "/" ? "" : path.replace(/\/+$/, "");
  return `${SITE_URL}${normalizedPath || "/"}`;
}

export function getSubjectPagePathByLearningSlug(subjectSlug = "") {
  const pageSlug = LEARNING_SUBJECT_TO_SUBJECT_PAGE[subjectSlug];
  return pageSlug ? `/subjects/${pageSlug}` : `/subjects/${subjectSlug}`;
}

export function generateTitle({
  type = "content",
  title,
  subjectName,
  chapterTitle,
} = {}) {
  if (type === "subject") {
    return `${subjectName || title} Notes for ECE | GATE Preparation`;
  }

  if (type === "notes") {
    return `${subjectName || title} Handwritten Notes for ECE | GATE Preparation`;
  }

  if (type === "topic") {
    return `${title} Explained for GATE ECE | ${subjectName || "ECE Notes"}`;
  }

  if (type === "chapter") {
    return `${chapterTitle || title} Notes for ECE | ${subjectName || "GATE Preparation"}`;
  }

  return `${title} | ${SITE_NAME}`;
}

export function generateDescription({
  type = "content",
  title,
  subjectName,
  chapterTitle,
  summary,
  chapters = [],
  topics = [],
} = {}) {
  const chapterNames = chapters.slice(0, 4).map((item) => item.title || item);
  const topicNames = topics.slice(0, 6).map((item) => item.title || item);

  if (type === "subject") {
    const focusTerms = topicNames.length ? topicNames.join(", ") : chapterNames.join(", ");
    return `Study ${subjectName || title} notes for ECE students including ${focusTerms || "core concepts"}, handwritten explanations, exam-focused revision, and GATE preparation support.`;
  }

  if (type === "notes") {
    return `Access ${subjectName || title} handwritten notes for ECE with chapter-wise theory, formulas, solved examples, quick revision points, and GATE exam preparation guidance.`;
  }

  if (type === "topic") {
    return `${title} explained for ECE and GATE preparation with concepts, formulas, worked examples, revision tips, and related ${subjectName || ""} notes.`
      .replace(/\s+/g, " ")
      .trim();
  }

  if (type === "chapter") {
    return `${chapterTitle || title} notes for ${subjectName || "ECE"} covering ${topicNames.join(", ") || summary || "important theory"}, key formulas, and exam preparation takeaways.`;
  }

  return summary || `${title} notes and exam preparation resources for ECE students.`;
}

export function generateKeywords({
  title,
  subjectName,
  chapterTitle,
  topicNames = [],
  chapterNames = [],
  extraKeywords = [],
} = {}) {
  return uniqueStrings([
    title,
    subjectName,
    chapterTitle,
    ...topicNames,
    ...chapterNames,
    ...extraKeywords,
    "gate ece",
    "engineering notes",
    "ece handwritten notes",
    "ece exam preparation",
    `${subjectName || title} notes`,
    `${subjectName || title} gate ece`,
  ]).join(", ");
}

export function buildBreadcrumbList(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item.startsWith("http")
        ? item.item
        : generateCanonical(item.item),
    })),
  };
}

export function generateStructuredData({
  type = "topic",
  title,
  description,
  path,
  subjectName,
  chapterTitle,
  keywords,
  about = [],
  breadcrumbItems = [],
  faqItems = [],
} = {}) {
  const pageUrl = generateCanonical(path);
  const entities = [];

  if (type === "subject") {
    entities.push({
      "@context": "https://schema.org",
      "@type": "Course",
      name: `${subjectName || title} for ECE`,
      description,
      provider: {
        "@type": "EducationalOrganization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      about: uniqueStrings([subjectName, ...about]),
      url: pageUrl,
      keywords,
    });
  }

  if (type === "notes") {
    entities.push({
      "@context": "https://schema.org",
      "@type": "Course",
      name: `${subjectName || title} Notes`,
      description,
      provider: {
        "@type": "EducationalOrganization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      about: uniqueStrings([subjectName, chapterTitle, ...about]),
      url: pageUrl,
      keywords,
    });
  }

  if (type === "topic" || type === "chapter") {
    entities.push({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: title,
      description,
      url: pageUrl,
      author: {
        "@type": "EducationalOrganization",
        name: SITE_NAME,
      },
      publisher: {
        "@type": "EducationalOrganization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/brand/ece-exam-guide-mark-v2.svg`,
        },
      },
      about: uniqueStrings([subjectName, chapterTitle, ...about]),
      keywords,
      image: DEFAULT_OG_IMAGE,
    });
  }

  if (breadcrumbItems.length) {
    entities.push(buildBreadcrumbList(breadcrumbItems));
  }

  if (faqItems.length) {
    entities.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return entities;
}

export function shouldNoIndexPath(pathname = "", asPath = "") {
  if (GENERIC_NOINDEX_PATHS.has(pathname)) {
    return true;
  }

  if (pathname.startsWith("/api")) {
    return true;
  }

  if (pathname.startsWith("/mcqs/") || pathname.startsWith("/practice/")) {
    return true;
  }

  if (asPath.includes("?search=") || asPath.includes("?q=") || asPath.includes("?page=")) {
    return true;
  }

  return false;
}

export function getSubjectLearningTopics(subjectTitle) {
  const learningSubjectSlug = SUBJECT_TO_LEARNING_SLUG[subjectTitle];
  const learningSubject = learningSubjectSlug
    ? getLearningSubject(learningSubjectSlug)
    : null;

  if (!learningSubject) {
    return [];
  }

  return learningSubject.chapters.flatMap((chapter) =>
    chapter.topics
      .filter((topic) => topic.status === "ready")
      .map((topic) => ({
        ...topic,
        chapterTitle: chapter.title,
        href: `/learn/${learningSubjectSlug}/${topic.slug}`,
      }))
  );
}

export function getSubjectChapterLinks(subjectTitle) {
  const learningSubjectSlug = SUBJECT_TO_LEARNING_SLUG[subjectTitle];
  const learningSubject = learningSubjectSlug
    ? getLearningSubject(learningSubjectSlug)
    : null;

  if (learningSubject) {
    return learningSubject.chapters.map((chapter) => ({
      title: chapter.title,
      href:
        chapter.topics.find((topic) => topic.status === "ready")?.slug
          ? `/learn/${learningSubjectSlug}/${chapter.topics.find((topic) => topic.status === "ready").slug}`
          : `/subjects/${getSubjectSlug(subjectTitle)}`,
    }));
  }

  if (subjectTheoryRoadmaps[subjectTitle]) {
    return subjectTheoryRoadmaps[subjectTitle].map((step) => ({
      title: step.title,
      href: `/subjects/${getSubjectSlug(subjectTitle)}`,
    }));
  }

  return [];
}

export function getSubjectRelatedLinks(subjectTitle) {
  if (subjectTitle === "Control Systems") {
    return controlSystemTopicPages.slice(0, 4).map((topic) => ({
      title: topic.title,
      href: `/${topic.slug}`,
      summary: topic.summary,
    }));
  }

  return getSubjectLearningTopics(subjectTitle).slice(0, 6).map((topic) => ({
    title: topic.title,
    href: topic.href,
    summary: topic.summary,
  }));
}

export function buildSubjectFaqs(subjectTitle, topicTitles = []) {
  const featuredTopics = topicTitles.slice(0, 4).join(", ");

  return [
    {
      question: `What is covered in ${subjectTitle} notes for GATE ECE?`,
      answer: `${subjectTitle} notes cover exam-focused theory, formulas, worked examples, quick revision guidance, and high-value topics such as ${featuredTopics || "core subject concepts"}.`,
    },
    {
      question: `Are these ${subjectTitle} notes useful for university exams and handwritten revision?`,
      answer: `Yes. These ${subjectTitle} notes are structured for ECE handwritten revision, semester exams, and GATE-style concept review with topic-wise explanations.`,
    },
    {
      question: `How should I prepare ${subjectTitle} for ECE exam preparation?`,
      answer: `Start with the subject roadmap, revise one chapter at a time, practice the related topics, and then use the notes and formula sections for quick last-minute revision.`,
    },
  ];
}

export function getIndexableRoutes() {
  const subjectRoutes = subjectDirectory.map((subject) => ({
    path: `/subjects/${getSubjectSlug(subject.title)}`,
    priority: 0.9,
  }));
  const notesRoutes = subjectDirectory.map((subject) => ({
    path: `/notes/${getSubjectSlug(subject.title)}`,
    priority: 0.8,
  }));
  const topicRoutes = getReadyLearningTopics().map((topic) => ({
    path: `/learn/${topic.subjectSlug}/${topic.slug}`,
    priority: 0.8,
  }));
  const staticRoutes = EDUCATIONAL_STATIC_ROUTES.map((path) => ({
    path,
    priority: 0.7,
  }));

  return [
    { path: "/", priority: 1 },
    { path: "/subjects", priority: 0.9 },
    ...subjectRoutes,
    ...notesRoutes,
    ...topicRoutes,
    ...staticRoutes,
  ];
}
