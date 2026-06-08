import { subjectDirectory } from "../data/subject-directory";
import { officialPreviousPapers } from "../data/official-previous-papers";
import { getSubjectSlug, subjectTheoryRoadmaps } from "../data/subject-theory-roadmaps";
import { getPracticeSlug, practiceSections } from "../data/practice-sections";
import { controlSystemTopicPages } from "../data/control-system-topic-pages";
import { seoLandingPageRoutes } from "../data/seo-landing-pages";
import { getLearningSubject, getReadyLearningTopics } from "./learning-utils";

const DEFAULT_SITE_URL = "https://eceexamguide.com";

export const SITE_URL = DEFAULT_SITE_URL;
export const SITE_NAME = "ECE Exam Guide";
export const SITE_LOCALE = "en_IN";
export const SITE_LANGUAGE = "en-IN";
export const SITE_ALTERNATE_NAMES = [
  "ECE Guide",
  "ECE Exam Guide Notes",
];
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/home-hero-ece-study.png`;
export const DEFAULT_OG_IMAGE_WIDTH = 1717;
export const DEFAULT_OG_IMAGE_HEIGHT = 916;
export const DEFAULT_META_DESCRIPTION =
  "ECE Exam Guide helps ECE students study Network Analysis, Digital Electronics, Analog Electronics, quick notes, PYQs, MCQs, formulas, and GATE, PSU, ESE, BEL, ISRO, DRDO, and university exam preparation.";

const SUBJECT_SEO_ALIASES = {
  "Network Analysis": [
    "Network Theory",
    "Circuit Theory",
    "Circuit Analysis",
    "Electrical Networks",
    "Network Analysis Quick Notes",
    "Network Analysis Notes",
    "Network Analysis for GATE ECE",
    "Network Analysis Digital Electronics Analog Electronics",
    "What is Network Analysis",
    "Introduction to Network Analysis",
    "Network Analysis theory notes",
    "Network Analysis notes PDF",
    "Network Analysis previous year questions",
  ],
  "Analog Electronics": [
    "Analog",
    "Analog Circuits",
    "Analog Electronics Quick Notes",
    "Analog Electronics Notes",
    "Analog Electronics for GATE ECE",
    "Electronic Devices and Circuits",
  ],
  "Digital Electronics": [
    "Digital",
    "Digital Logic",
    "Digital Electronics Quick Notes",
    "Digital Electronics Notes",
    "Digital Electronics for GATE ECE",
    "Logic Gates and Boolean Algebra",
  ],
  "Signals and Systems": ["Signals & Systems", "S and S", "Signals Systems"],
  "Communication Systems": ["Communications", "Comm Systems", "Communication Systems Quick Notes"],
  "Electromagnetic Theory": ["EMFT", "Electromagnetics", "EM Theory", "Electromagnetic Theory Quick Notes"],
  Microprocessors: ["8085", "8086", "Microprocessor Quick Notes", "MP"],
  "Digital Signal Processing": ["DSP", "Signal Processing", "DSP Quick Notes"],
  "Control Systems": ["Control", "Control System Quick Notes", "Feedback Control"],
  "VLSI Design": ["VLSI", "CMOS Design", "VLSI Quick Notes", "Chip Design"],
  "Antenna & Wave Propagation": ["AWP", "Antenna and Wave Propagation", "Antenna Quick Notes", "Wave Propagation"],
  "Embedded Systems": ["Embedded", "Embedded Quick Notes", "RTOS", "Microcontroller Systems"],
};

const TOPIC_SEO_ALIASES = {
  "Vector Calculus": ["Vector Calc", "Grad Div Curl", "Gradient Divergence Curl"],
  Electrostatics: ["Electrostatics Quick Notes", "Electric Field and Potential"],
  "Conductors and Dielectrics": ["Dielectrics", "Conductors", "Permittivity and Polarization"],
  Magnetostatics: ["Magnetic Field", "Biot Savart Law", "Ampere Law"],
  "Electromagnetic Induction": ["EM Induction", "Faraday Law", "Lenz Law"],
  "Maxwell's Equations": ["Maxwell Equations", "Maxwell Equation", "EMFT Maxwell"],
  "Electromagnetic Waves": ["EM Waves", "Plane Waves", "Electromagnetic Wave Propagation"],
  "Transmission Lines": ["TL", "Transmission Line", "Reflection Coefficient", "SWR"],
  Waveguides: ["Wave Guide", "TE TM Modes", "Cutoff Frequency"],
  Antennas: ["Antenna", "Radiation Pattern", "Gain and Directivity"],
  "Electromagnetic Compatibility and Applications": ["EMC", "EMI", "Shielding", "Radar Basics"],
  "Digital Signal Processing": ["DSP"],
  "Real-Time Operating Systems (RTOS)": ["RTOS", "Real Time OS"],
  "MOS Transistor Basics": ["MOSFET Basics", "NMOS PMOS", "MOS Basics"],
  "CMOS Logic Design": ["CMOS Logic", "CMOS Inverter", "NAND NOR CMOS"],
  "CMOS Fabrication Technology": ["CMOS Fabrication", "VLSI Fabrication"],
  "HDL and VLSI Automation Basics": ["HDL Basics", "Verilog VHDL", "RTL Design"],
};

const SEO_TERM_ALIASES = {
  MCQ: ["multiple choice questions", "mcqs"],
  PYQ: ["previous year questions", "pyqs", "previous year question"],
  Notes: ["quick notes", "handwritten notes", "study notes", "revision notes", "pdf notes", "theory notes"],
  GATE: ["gate ece", "gate electronics"],
  PSU: ["psu exams", "government exam preparation"],
};

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
  "VLSI Design": "vlsi-design",
  "Antenna & Wave Propagation": "antenna-wave-propagation",
  "Embedded Systems": "embedded-systems",
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
  "vlsi-design": "vlsi-design",
  "antenna-wave-propagation": "antenna-and-wave-propagation",
  "embedded-systems": "embedded-systems",
};

const NETWORK_CONTEXTUAL_TOPIC_ROUTES = {
  "network-theorems-topic": "/network-theorems",
  "nodal-and-mesh-analysis": "/dc-circuit-analysis",
  resonance: "/ac-circuit-analysis",
  "two-port-networks": "/two-port-networks",
  "first-order-transients": "/transient-analysis",
  "second-order-transients": "/transient-analysis",
};

const SUBJECT_CONTEXTUAL_TOPIC_ROUTES = {
  analog: {
    "operational-amplifiers": "/operational-amplifiers",
    "active-filters": "/active-filters-waveform-generators",
  },
  digital: {
    "boolean-algebra-and-kmaps": "/logic-gates-and-boolean-algebra",
    "flip-flops": "/sequential-circuits",
    "logic-families": "/logic-families",
  },
  signals: {
    "laplace-transform": "/laplace-transform",
    "sampling-theorem": "/sampling-theorem",
    "z-transform": "/z-transform",
  },
  networks: NETWORK_CONTEXTUAL_TOPIC_ROUTES,
  microprocessors: {
    "8086-microprocessor": "/8086-microprocessor",
  },
  "control-systems": {
    "time-response": "/time-response-analysis",
    "root-locus": "/root-locus-technique",
  },
};

function getContextualTopicHref(subjectTitle, topic) {
  const learningSubjectSlug = SUBJECT_TO_LEARNING_SLUG[subjectTitle];
  const contextualRoute = SUBJECT_CONTEXTUAL_TOPIC_ROUTES[learningSubjectSlug]?.[topic.slug];

  if (contextualRoute) {
    return contextualRoute;
  }

  return learningSubjectSlug
    ? `/learn/${learningSubjectSlug}/${topic.slug}`
    : `/subjects/${getSubjectSlug(subjectTitle)}`;
}

const GENERIC_NOINDEX_PATHS = new Set([
  "/admin",
  "/learn",
  "/login",
  "/search",
  "/signup",
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
  "/diagram-lab",
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
  "/8086-microprocessor",
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

const PREVIOUS_PAPER_SITEMAP_CATALOG = [
  { exam: "GATE", startYear: 2025, endYear: 2014 },
  { exam: "ISRO", startYear: 2024, endYear: 2014 },
  { exam: "BEL", startYear: 2025, endYear: 2014 },
  { exam: "BARC", startYear: 2024, endYear: 2014 },
  { exam: "ESE", startYear: 2024, endYear: 2014 },
  { exam: "DRDO", startYear: 2024, endYear: 2014 },
  { exam: "IOCL", startYear: 2024, endYear: 2014 },
  { exam: "SSC JE", startYear: 2024, endYear: 2015 },
  { exam: "RRB JE", startYear: 2024, endYear: 2015 },
  { exam: "State AE/JE", startYear: 2024, endYear: 2014 },
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

function getAcronym(value = "") {
  const tokens = String(value)
    .replace(/\([^)]*\)/g, " ")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);

  if (tokens.length < 2 || tokens.length > 6) {
    return "";
  }

  const acronym = tokens.map((token) => token[0]).join("").toUpperCase();
  return acronym.length >= 2 ? acronym : "";
}

function getBracketAliases(value = "") {
  const matches = String(value).match(/\(([^)]+)\)/g) || [];
  return matches
    .map((match) => match.replace(/[()]/g, "").trim())
    .filter(Boolean);
}

function getPhraseVariants(value = "") {
  if (!value) {
    return [];
  }

  const normalizedValue = String(value).trim();
  const withoutParentheses = normalizedValue.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();

  return uniqueStrings([
    normalizedValue,
    withoutParentheses,
    normalizedValue.replace(/&/g, "and"),
    normalizedValue.replace(/and/gi, "&"),
    normalizedValue.replace(/-/g, " "),
    ...getBracketAliases(normalizedValue),
    getAcronym(normalizedValue),
  ]);
}

export function getSubjectSeoAliases(subjectName = "") {
  return uniqueStrings([
    ...getPhraseVariants(subjectName),
    ...(SUBJECT_SEO_ALIASES[subjectName] || []),
  ]);
}

export function getTopicSeoAliases(title = "") {
  return uniqueStrings([
    ...getPhraseVariants(title),
    ...(TOPIC_SEO_ALIASES[title] || []),
  ]);
}

function getSemanticSeoTerms() {
  return Object.values(SEO_TERM_ALIASES).flat();
}

function getPrimaryAlias(value = "") {
  const aliases = SUBJECT_SEO_ALIASES[value] || TOPIC_SEO_ALIASES[value] || [];
  return aliases[0] || "";
}

function formatNameWithAlias(value = "") {
  const primaryAlias = getPrimaryAlias(value);
  return primaryAlias && primaryAlias.toLowerCase() !== String(value).toLowerCase()
    ? `${value} (${primaryAlias})`
    : value;
}

function cleanSeoTitlePrefix(value = "") {
  return String(value).replace(/^\d+\s+/, "").trim();
}

function formatSeoName(value = "") {
  return cleanSeoTitlePrefix(formatNameWithAlias(value));
}

export function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateCanonical(path = "/") {
  const rawPath = String(path || "/").trim();
  let canonicalPath = rawPath.split("#")[0].split("?")[0] || "/";

  if (/^https?:\/\//i.test(canonicalPath)) {
    try {
      canonicalPath = new URL(canonicalPath).pathname || "/";
    } catch {
      canonicalPath = "/";
    }
  }

  const pathWithLeadingSlash = canonicalPath.startsWith("/")
    ? canonicalPath
    : `/${canonicalPath}`;
  const normalizedPath = pathWithLeadingSlash === "/"
    ? "/"
    : pathWithLeadingSlash.replace(/\/+$/, "");

  return `${SITE_URL}${normalizedPath}`;
}

export function normalizeMetaTitle(title = SITE_NAME) {
  const cleanTitle = String(title || SITE_NAME).replace(/\s+/g, " ").trim() || SITE_NAME;
  const normalizedTitle = cleanTitle.toLowerCase();
  const includesSiteName = [SITE_NAME, ...SITE_ALTERNATE_NAMES].some(
    (name) => name && normalizedTitle.includes(String(name).toLowerCase())
  );

  return includesSiteName ? cleanTitle : `${cleanTitle} | ${SITE_NAME}`;
}

export function generatePageDescription(title = SITE_NAME, path = "/") {
  const cleanTitle = String(title || SITE_NAME)
    .replace(/\s*\|\s*ECE Exam Guide\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  const pathTerms = String(path || "/")
    .split("#")[0]
    .split("?")[0]
    .replace(/^\/+|\/+$/g, "")
    .replace(/[-/]+/g, " ")
    .trim();
  const pageTopic = cleanTitle && cleanTitle !== SITE_NAME
    ? cleanTitle
    : pathTerms || "ECE exam preparation";

  return `${pageTopic} for ECE students with concise quick notes, formulas, previous year questions, MCQs, solved practice, and exam-focused revision support.`;
}

export function generatePageKeywords(title = SITE_NAME, path = "/") {
  const titleTerms = String(title || "")
    .replace(/[|,]/g, " ")
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 2);
  const pathTerms = String(path || "")
    .replace(/[^a-z0-9]+/gi, " ")
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 2);

  return uniqueStrings([
    titleTerms,
    pathTerms,
    "ECE",
    "electronics engineering",
    "GATE ECE",
    "ECE notes",
    "ECE PYQ",
    "ECE MCQ",
    "previous year questions",
    "exam preparation",
  ]).join(", ");
}

export function getSubjectPagePathByLearningSlug(subjectSlug = "") {
  const pageSlug = LEARNING_SUBJECT_TO_SUBJECT_PAGE[subjectSlug];
  return pageSlug ? `/subjects/${pageSlug}` : `/subjects/${subjectSlug}`;
}

function buildYearRange(startYear, endYear) {
  return Array.from(
    { length: startYear - endYear + 1 },
    (_, index) => startYear - index
  );
}

function slugifyPaperPath(exam = "", year = "") {
  return `/solution/${slugify(`${exam}-${year}`)}`;
}

function sitemapRoute(path, priority = 0.8, changefreq = "daily") {
  return { path, priority, changefreq };
}

export function getNotesPagePathByLearningSlug(subjectSlug = "") {
  const pageSlug = LEARNING_SUBJECT_TO_SUBJECT_PAGE[subjectSlug];
  return pageSlug ? `/notes/${pageSlug}` : `/notes/${subjectSlug}`;
}

export function generateTitle({
  type = "content",
  title,
  subjectName,
  chapterTitle,
} = {}) {
  const subjectTitle = formatSeoName(subjectName || title);
  const topicTitle = formatSeoName(title);
  const chapterSeoTitle = formatSeoName(chapterTitle || title);

  if (type === "subject") {
    return `${subjectTitle} GATE ECE Quick Notes (Complete Theory + PYQs + Formulas)`;
  }

  if (type === "notes") {
    return `${subjectTitle} Quick Notes for GATE ECE PDF + PYQs + Formulas`;
  }

  if (type === "mcq") {
    return `${subjectTitle} MCQs for GATE ECE + PYQs + Practice Questions`;
  }

  if (type === "topic") {
    return `${topicTitle} GATE ECE Quick Notes + Formulas + Solved Examples | ${subjectTitle || "ECE"}`;
  }

  if (type === "chapter") {
    return `${chapterSeoTitle} Quick Notes for GATE ECE + PYQs + Formulas | ${subjectTitle || "ECE"}`;
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
    if ((subjectName || title) === "Network Analysis") {
      return "Learn Network Analysis for ECE with easy explanations, formulas, solved problems, important questions, and topic-wise quick notes.";
    }

    const focusTerms = topicNames.length ? topicNames.join(", ") : chapterNames.join(", ");
    return `Study ${formatNameWithAlias(subjectName || title)} quick notes for ECE students including ${focusTerms || "core concepts"}, handwritten explanations, exam-focused revision, and GATE preparation support.`;
  }

  if (type === "notes") {
    return `Download ${formatNameWithAlias(subjectName || title)} quick notes, formulas, solved examples, and previous year question support for ECE students and GATE preparation.`;
  }

  if (type === "mcq") {
    return `Practice ${formatNameWithAlias(subjectName || title)} MCQs for ECE with topic-wise questions, quick concept checks, and exam-focused revision support.`;
  }

  if (type === "topic") {
    const subtopicSummary = topicNames.length
      ? ` covering ${topicNames.slice(0, 4).join(", ")}`
      : "";
    return `${formatNameWithAlias(title)} explained for ECE and GATE preparation${subtopicSummary} with concepts, formulas, worked examples, revision tips, and related ${formatNameWithAlias(subjectName || "")} quick notes.`
      .replace(/\s+/g, " ")
      .trim();
  }

  if (type === "chapter") {
    return `${formatNameWithAlias(chapterTitle || title)} quick notes for ${formatNameWithAlias(subjectName || "ECE")} covering ${topicNames.join(", ") || summary || "important theory"}, key formulas, and exam preparation takeaways.`;
  }

  return summary || `${title} quick notes and exam preparation resources for ECE students.`;
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
    getTopicSeoAliases(title),
    getSubjectSeoAliases(subjectName),
    getTopicSeoAliases(chapterTitle),
    ...topicNames,
    ...chapterNames,
    ...extraKeywords,
    getSemanticSeoTerms(),
    "gate ece",
    "engineering notes",
    "ece quick notes",
    "ece handwritten notes",
    "ece exam preparation",
    `${subjectName || title} quick notes`,
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
    const subjectAliases = getSubjectSeoAliases(subjectName || title);
    entities.push({
      "@context": "https://schema.org",
      "@type": "Course",
      name: `${subjectName || title} for ECE`,
      alternateName: subjectAliases,
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
    const subjectAliases = getSubjectSeoAliases(subjectName || title);
    entities.push({
      "@context": "https://schema.org",
      "@type": "Course",
      name: `${subjectName || title} Quick Notes`,
      alternateName: subjectAliases,
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

  if (type === "mcq") {
    const subjectAliases = getSubjectSeoAliases(subjectName || title);
    entities.push({
      "@context": "https://schema.org",
      "@type": "Course",
      name: `${subjectName || title} MCQs`,
      alternateName: subjectAliases,
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
    const topicAliases = uniqueStrings([
      ...getTopicSeoAliases(title),
      ...getTopicSeoAliases(chapterTitle),
      ...getSubjectSeoAliases(subjectName),
    ]);
    entities.push({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: title,
      alternativeHeadline: topicAliases[0] || undefined,
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
          url: `${SITE_URL}/favicon-v4-192x192.png`,
          width: 192,
          height: 192,
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
        href: getContextualTopicHref(subjectTitle, topic),
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

  if (subjectTitle === "Network Analysis") {
    return [
      {
        question: "Is Network Analysis difficult for beginners?",
        answer:
          "It becomes manageable once voltage, current direction, polarity, KCL, and KVL are clear. Most difficulty comes from choosing an equation method before reading the circuit carefully.",
      },
      {
        question: "What is the best way to learn nodal and mesh analysis?",
        answer:
          "Start with small circuits, mark the reference node or mesh currents clearly, write one clean equation at a time, and compare the method with KCL or KVL after solving.",
      },
      {
        question: "Which Network Analysis topics matter most for exams?",
        answer:
          "Circuit laws, nodal and mesh analysis, network theorems, AC impedance, resonance, transient response, Laplace methods, and two-port networks are high-value areas for revision.",
      },
      {
        question: "Where is Network Analysis used in real electronics?",
        answer:
          "It is used in power supplies, amplifiers, filters, communication circuits, embedded hardware, PCB debugging, electric vehicles, robotics, and automation systems.",
      },
      {
        question: "How many Network Analysis numericals should I practice?",
        answer:
          "Practice enough problems after each topic to recognize the method without prompting. A short daily solving block is more useful than reading formulas for a long session.",
      },
      {
        question: "Is Network Analysis important for GATE ECE?",
        answer:
          "Yes. It supports direct circuit questions and also strengthens later work in analog electronics, signals, control systems, and communication circuits.",
      },
      {
        question: "What should I revise before starting Network Analysis?",
        answer:
          "Refresh algebra, basic electricity, resistor combinations, complex numbers for AC analysis, and elementary differential-equation ideas before transients.",
      },
    ];
  }

  return [
    {
      question: `What is covered in ${subjectTitle} quick notes for GATE ECE?`,
      answer: `${subjectTitle} quick notes cover exam-focused theory, formulas, worked examples, quick revision guidance, and high-value topics such as ${featuredTopics || "core subject concepts"}.`,
    },
    {
      question: `Are these ${subjectTitle} quick notes useful for university exams and handwritten revision?`,
      answer: `Yes. These ${subjectTitle} quick notes are structured for ECE handwritten revision, semester exams, and GATE-style concept review with topic-wise explanations.`,
    },
    {
      question: `How should I prepare ${subjectTitle} for ECE exam preparation?`,
      answer: `Start with the subject roadmap, revise one chapter at a time, practice the related topics, and then use the quick notes and formula sections for last-minute revision.`,
    },
  ];
}

export function getIndexableRoutes() {
  const subjectRoutes = subjectDirectory.map((subject) => ({
    path: `/subjects/${getSubjectSlug(subject.title)}`,
    priority: 0.9,
    changefreq: "daily",
  }));
  const notesRoutes = subjectDirectory.map((subject) => ({
    path: `/notes/${getSubjectSlug(subject.title)}`,
    priority: 0.8,
    changefreq: "daily",
  }));
  const mcqRoutes = subjectDirectory.map((subject) => ({
    path: `/mcqs/${getSubjectSlug(subject.title)}`,
    priority: 0.8,
    changefreq: "daily",
  }));
  const practiceRoutes = practiceSections.map((section) => ({
    path: `/practice/${getPracticeSlug(section.exam)}`,
    priority: 0.8,
    changefreq: "daily",
  }));
  const topicRoutes = getReadyLearningTopics().map((topic) => ({
    path: getContextualTopicHref(topic.subjectName, topic),
    priority: 0.8,
    changefreq: "daily",
  }));
  const staticRoutes = EDUCATIONAL_STATIC_ROUTES.map((path) => ({
    path,
    priority: 0.8,
    changefreq: "daily",
  }));
  const paperRoutes = PREVIOUS_PAPER_SITEMAP_CATALOG.flatMap((item) =>
    buildYearRange(item.startYear, item.endYear).map((year) => ({
      path: slugifyPaperPath(item.exam, year),
      priority: item.exam === "GATE" ? 0.6 : 0.4,
      changefreq: "weekly",
    }))
  );
  const officialPaperRoutes = officialPreviousPapers.map((paper) => ({
    path: paper.slug ? `/solution/${paper.slug}` : slugifyPaperPath(paper.exam, paper.year),
    priority: paper.exam === "GATE" ? 0.95 : 0.9,
    changefreq: "daily",
  }));
  const legacyOfficialPaperRoutes = [
    sitemapRoute("/previous-year/bel-2023", 0.8, "daily"),
  ];

  const routes = [
    sitemapRoute("/", 1, "daily"),
    sitemapRoute("/about", 0.5, "monthly"),
    sitemapRoute("/contact", 0.4, "monthly"),
    sitemapRoute("/faq", 0.6, "weekly"),
    sitemapRoute("/privacy", 0.3, "yearly"),
    sitemapRoute("/terms", 0.3, "yearly"),
    sitemapRoute("/subjects", 0.9, "daily"),
    sitemapRoute("/previous-year", 0.8, "daily"),
    sitemapRoute("/notes", 0.8, "daily"),
    sitemapRoute("/mcqs", 0.8, "daily"),
    sitemapRoute("/practice", 0.8, "daily"),
    sitemapRoute("/mock-tests", 0.8, "daily"),
    sitemapRoute("/ece-exams", 0.8, "daily"),
    sitemapRoute("/insights", 0.7, "daily"),
    ...seoLandingPageRoutes.map((path) =>
      sitemapRoute(path, path.includes("gate") ? 0.95 : 0.85, "daily")
    ),
    ...subjectRoutes,
    ...notesRoutes,
    ...mcqRoutes,
    ...practiceRoutes,
    ...topicRoutes,
    ...staticRoutes,
    ...officialPaperRoutes,
    ...paperRoutes,
    ...legacyOfficialPaperRoutes,
  ];

  const seenPaths = new Set();
  return routes.filter((route) => {
    if (seenPaths.has(route.path)) {
      return false;
    }

    seenPaths.add(route.path);
    return true;
  }).map((route) => ({
    ...route,
    priority: Number(route.priority ?? 0.8),
    changefreq: route.changefreq || "daily",
  }));
}
