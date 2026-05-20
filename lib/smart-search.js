import { officialPreviousPapers } from "../data/official-previous-papers";
import {
  getAllLearningTopics,
  getLearningSubjects,
  getLearningTopic,
  getReadyLearningTopics,
} from "./learning-utils";
import { slugifyPaper } from "./paper-document";
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

function titleFromPath(path = "") {
  return toTitleCase(path.replace(/^\/+/, "").replace(/-/g, " "));
}

const staticTopicRoutes = [
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

const staticTopicAliases = {
  "/bipolar-junction-transistor": ["BJT", "BJT transistor"],
  "/bjt-amplifiers": ["BJT amplifier", "CE amplifier", "CB amplifier", "CC amplifier"],
  "/bjt-and-mosfet": ["BJT MOSFET", "transistor comparison"],
  "/block-diagram-and-signal-flow-graph": ["block diagram", "signal flow graph", "SFG", "Mason gain formula"],
  "/circuit-laws": ["KCL", "KVL", "Ohm law", "Kirchhoff law"],
  "/karnaugh-map": ["K map", "K-map", "Boolean minimization"],
  "/logic-gates-and-boolean-algebra": ["logic gates", "Boolean algebra"],
  "/operational-amplifiers": ["op amp", "op-amp", "operational amplifier"],
  "/root-locus-technique": ["root locus"],
  "/sampling-theorem": ["Nyquist sampling", "aliasing"],
  "/two-port-networks": ["two port", "Z parameters", "Y parameters", "ABCD parameters"],
  "/z-transform": ["Z transform", "ROC"],
};

function buildTopicLookup() {
  return getAllLearningTopics().reduce((accumulator, topic) => {
    accumulator.set(`${topic.subjectName}::${topic.title}`, topic);
    return accumulator;
  }, new Map());
}

function buildConceptItems() {
  return getAllLearningTopics().flatMap((topic) => {
    const enrichedTopic = getLearningTopic(topic.subjectSlug, topic.slug);
    const topicHref = topic.status === "ready"
      ? topic.href
      : `/subjects/${getSubjectSlugFromDirectory(topic.subjectName)}`;
    const topicItem = {
      id: `concept-${topic.topicKey}`,
      group: "Concepts",
      type: "concept",
      href: topicHref,
      title: topic.title,
      subtitle: `${topic.subjectName} -> ${topic.chapterTitle}`,
      description: topic.summary,
      badge: topic.status === "ready" ? "Learn" : "Roadmap",
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

    const subtopicItems = (topic.subtopics || []).map((subtopic) => ({
      id: `subtopic-${topic.topicKey}-${normalizeText(subtopic).replace(/\s+/g, "-")}`,
      group: "Topics",
      type: "subtopic",
      href: topicHref,
      title: subtopic,
      subtitle: `${topic.subjectName} -> ${topic.title}`,
      description: `Study ${subtopic} inside ${topic.title} for ECE exam preparation.`,
      badge: "Topic",
      searchText: normalizeText(
        [subtopic, topic.title, topic.subjectName, topic.chapterTitle, topic.summary].join(" ")
      ),
      scoreText: normalizeText([subtopic, topic.title, topic.subjectName].join(" ")),
    }));

    const formulaItems = (enrichedTopic?.formulas || []).map((formula) => ({
      id: `formula-${topic.topicKey}-${normalizeText(formula.label).replace(/\s+/g, "-")}`,
      group: "Concepts",
      type: "formula",
      href: topicHref,
      title: formula.label,
      subtitle: `${topic.subjectName} -> ${topic.title}`,
      description: [formula.expression, formula.note].filter(Boolean).join(" - "),
      badge: "Formula",
      searchText: normalizeText(
        [formula.label, formula.expression, formula.note, topic.title, topic.subjectName].join(" ")
      ),
      scoreText: normalizeText([formula.label, formula.expression, topic.title].join(" ")),
    }));

    return [topicItem, ...subtopicItems, ...formulaItems];
  });
}

function getSubjectSlugFromDirectory(subjectName = "") {
  const subject = subjectDirectory.find(
    (item) =>
      item.title === subjectName ||
      item.search === subjectName ||
      normalizeText(item.title) === normalizeText(subjectName)
  );

  return subject?.href?.replace("/subjects/", "") || normalizeText(subjectName).replace(/\s+/g, "-");
}

function buildYearRange(startYear, endYear) {
  return Array.from(
    { length: startYear - endYear + 1 },
    (_, index) => startYear - index
  );
}

const previousPaperSearchCatalog = [
  { exam: "GATE", years: buildYearRange(2024, 2014) },
  { exam: "ISRO", years: buildYearRange(2024, 2014) },
  { exam: "BEL", years: buildYearRange(2023, 2014) },
  { exam: "BARC", years: buildYearRange(2024, 2014) },
  { exam: "ESE", years: buildYearRange(2024, 2014) },
  { exam: "DRDO", years: buildYearRange(2024, 2014) },
  { exam: "IOCL", years: buildYearRange(2024, 2014) },
  { exam: "SSC JE", years: buildYearRange(2024, 2015) },
  { exam: "RRB JE", years: buildYearRange(2024, 2015) },
  { exam: "State AE/JE", years: buildYearRange(2024, 2014) },
];

function buildChapterItems() {
  return getLearningSubjects().flatMap((subject) =>
    subject.chapters.map((chapter) => {
      const readyTopic = (chapter.topics || []).find((topic) => topic.status === "ready");
      const href = readyTopic
        ? `/learn/${subject.slug}/${readyTopic.slug}`
        : `/subjects/${getSubjectSlugFromDirectory(subject.name)}`;

      return {
        id: `chapter-${subject.slug}-${chapter.slug}`,
        group: "Chapters",
        type: "chapter",
        href,
        title: chapter.title,
        subtitle: `${subject.name} | Chapter`,
        description: `Chapter roadmap covering ${(chapter.topics || [])
          .map((topic) => topic.title)
          .slice(0, 4)
          .join(", ")}.`,
        badge: "Chapter",
        searchText: normalizeText(
          [
            subject.name,
            subject.description,
            chapter.title,
            ...(chapter.topics || []).flatMap((topic) => [
              topic.title,
              topic.summary,
              ...(topic.concepts || []),
              ...(topic.subtopics || []),
            ]),
          ].join(" ")
        ),
        scoreText: normalizeText([chapter.title, subject.name].join(" ")),
      };
    })
  );
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
    id: "topic-ac-fundamentals",
    group: "Topics",
    type: "topic",
    href: "/ac-fundamentals",
    title: "AC Fundamentals",
    subtitle: "Network Analysis | AC waveform, RMS, phase, impedance, and power",
    description:
      "Learn alternating current basics, RMS value, phase difference, RLC elements, impedance, power factor, resonance, and phasors.",
    badge: "Topic",
    keywords: [
      "ac",
      "alternating current",
      "rms",
      "average value",
      "phase",
      "phasor",
      "impedance",
      "reactance",
      "power factor",
      "resonance",
    ],
  },
  {
    id: "topic-ac-circuit-analysis",
    group: "Topics",
    type: "topic",
    href: "/ac-circuit-analysis",
    title: "AC Circuit Analysis",
    subtitle: "Network Analysis | Phasors, impedance, RLC, power, and resonance",
    description:
      "Study complete AC circuit analysis with phasors, impedance, pure R/L/C circuits, series and parallel RLC circuits, power factor, and resonance.",
    badge: "Topic",
    keywords: [
      "ac circuit analysis",
      "phasor",
      "impedance",
      "reactance",
      "series rlc",
      "parallel rlc",
      "real power",
      "reactive power",
      "apparent power",
      "power factor",
      "resonance",
    ],
  },
  {
    id: "topic-transient-analysis",
    group: "Topics",
    type: "topic",
    href: "/transient-analysis",
    title: "Transient Analysis",
    subtitle: "Network Analysis | RC, RL, time constants, and exponential response",
    description:
      "Study complete transient analysis with natural and forced response, RC charging and discharging, RL response, initial and final conditions, and solved examples.",
    badge: "Topic",
    keywords: [
      "transient analysis",
      "transient response",
      "rc charging",
      "rc discharging",
      "rl transient",
      "time constant",
      "natural response",
      "forced response",
      "initial condition",
      "final condition",
      "exponential response",
    ],
  },
  {
    id: "topic-network-topology",
    group: "Topics",
    type: "topic",
    href: "/network-topology",
    title: "Network Topology",
    subtitle: "Network Analysis | Graphs, trees, tie-sets, cut-sets, and matrices",
    description:
      "Learn network topology through graph representation, nodes, branches, loops, meshes, trees, twigs, links, tie-set matrix, cut-set matrix, incidence matrix, and examples.",
    badge: "Topic",
    keywords: [
      "network topology",
      "graph theory",
      "tree",
      "twigs",
      "links",
      "chords",
      "tie set",
      "cut set",
      "incidence matrix",
      "loop matrix",
      "node branch graph",
    ],
  },
  {
    id: "topic-laplace-transform-methods",
    group: "Topics",
    type: "topic",
    href: "/laplace-transform-methods",
    title: "Laplace Transform Methods",
    subtitle: "Network Analysis | s-domain circuits, inverse transform, and transient solving",
    description:
      "Study Laplace transform methods for circuits with transform pairs, properties, s-domain element models, inverse Laplace, initial and final value theorems, and worked RC analysis.",
    badge: "Topic",
    keywords: [
      "laplace transform",
      "laplace transform methods",
      "s domain",
      "inverse laplace",
      "initial value theorem",
      "final value theorem",
      "rc laplace",
      "rlc laplace",
      "partial fractions",
      "transient analysis using laplace",
    ],
  },
  {
    id: "topic-frequency-domain-analysis",
    group: "Topics",
    type: "topic",
    href: "/frequency-domain-analysis",
    title: "Frequency Domain Analysis",
    subtitle: "Network Analysis | Phasors, impedance, resonance, and frequency response",
    description:
      "Learn frequency domain analysis with sinusoidal signals, phasors, impedance, resonance, AC power, and filter response using custom visuals and worked examples.",
    badge: "Topic",
    keywords: [
      "frequency domain analysis",
      "phasor",
      "impedance",
      "resonance",
      "frequency response",
      "low pass filter",
      "high pass filter",
      "band pass filter",
      "ac power",
      "rlc resonance",
    ],
  },
  {
    id: "topic-two-port-networks",
    group: "Topics",
    type: "topic",
    href: "/two-port-networks",
    title: "Two-Port Networks",
    subtitle: "Network Analysis | Z, Y, h, ABCD parameters and cascade modeling",
    description:
      "Study two-port networks with port variables, Z/Y/h/ABCD parameters, reciprocity, symmetry, parameter conversion, and cascade connection using animated visual explanations.",
    badge: "Topic",
    keywords: [
      "two port networks",
      "two-port networks",
      "z parameters",
      "y parameters",
      "h parameters",
      "abcd parameters",
      "transmission parameters",
      "cascade networks",
      "reciprocity",
      "symmetry",
    ],
  },
  {
    id: "topic-filters",
    group: "Topics",
    type: "topic",
    href: "/filters",
    title: "Filters",
    subtitle: "Network Analysis | Low-pass, high-pass, band-pass, and band-stop behavior",
    description:
      "Learn filters through RC derivations, cutoff frequency, bandwidth, quality factor, and animated response views for low-pass, high-pass, band-pass, and band-stop networks.",
    badge: "Topic",
    keywords: [
      "filters",
      "low pass filter",
      "high pass filter",
      "band pass filter",
      "band stop filter",
      "cutoff frequency",
      "bandwidth",
      "quality factor",
      "rc filter",
      "frequency selective circuits",
    ],
  },
  {
    id: "topic-network-functions",
    group: "Topics",
    type: "topic",
    href: "/network-functions",
    title: "Network Functions",
    subtitle: "Network Analysis | Poles, zeros, transfer behavior, and s-domain response",
    description:
      "Learn network functions with driving-point and transfer functions, pole-zero interpretation, stability, frequency response, and animated time and s-domain explanations.",
    badge: "Topic",
    keywords: [
      "network functions",
      "transfer function",
      "driving point function",
      "poles and zeros",
      "pole zero plot",
      "stability",
      "impulse response",
      "step response",
      "s domain",
      "network theory functions",
    ],
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
  const staticTopicItems = staticTopicRoutes.map((href) => {
    const title = titleFromPath(href);
    const aliases = staticTopicAliases[href] || [];

    return {
      id: `static-topic-${href.replace(/[^a-z0-9]+/gi, "-")}`,
      group: "Topics",
      type: "topic",
      href,
      title,
      subtitle: "Topic Page | ECE theory",
      description: `Open ${title} theory, formulas, examples, and exam-focused revision material.`,
      badge: "Topic",
      keywords: [title, href.replace(/[-/]/g, " "), ...aliases],
    };
  });

  return [...curatedSearchItems, ...staticTopicItems, ...subjectItems].map((item) => ({
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

function buildIndividualQuestionItems(questions = []) {
  return questions.map((question, index) => {
    const exams = question.exam || [];
    const primaryExam = exams[0] || "ECE";
    const href = question.year
      ? `/solution/${slugifyPaper(primaryExam, question.year)}?exam=${encodeURIComponent(
          primaryExam
        )}&year=${encodeURIComponent(question.year)}`
      : `/practice?search=${encodeURIComponent(question.topic || question.subject || "")}`;

    return {
      id: `question-${question._id || index}`,
      group: "Questions",
      type: "question",
      href,
      title: question.question,
      subtitle: `${question.subject || "ECE"} | ${question.topic || "Practice question"}`,
      description: [
        exams.length ? `${exams.join(", ")} ${question.year || ""}`.trim() : "",
        question.explanation || question.correctAnswer || "Practice question with answer support.",
      ]
        .filter(Boolean)
        .join(" - "),
      badge: "Question",
      searchText: normalizeText(
        [
          question.question,
          question.correctAnswer,
          question.explanation,
          question.subject,
          question.topic,
          question.year,
          exams.join(" "),
          ...(question.options || []),
          ...(question.tags || []),
        ].join(" ")
      ),
      scoreText: normalizeText([question.question, question.topic, question.subject].join(" ")),
    };
  });
}

function buildPaperItems(questions = []) {
  const paperMap = new Map();

  previousPaperSearchCatalog.forEach((catalogItem) => {
    catalogItem.years.forEach((year) => {
      const key = `${catalogItem.exam}-${year}`;
      paperMap.set(key, {
        exam: catalogItem.exam,
        year,
        questions: [],
        subjects: new Set(["Electronics"]),
        topics: new Set(["Previous Paper"]),
        tags: new Set(),
      });
    });
  });

  questions.forEach((question) => {
    (question.exam || []).forEach((exam) => {
      const key = `${exam}-${question.year}`;
      const current =
        paperMap.get(key) || {
          exam,
          year: question.year,
          questions: [],
          subjects: new Set(),
          topics: new Set(),
          tags: new Set(),
        };

      current.questions.push(question);
      if (question.subject) {
        current.subjects.add(question.subject);
      }
      if (question.topic) {
        current.topics.add(question.topic);
      }
      (question.tags || []).forEach((tag) => current.tags.add(tag));
      paperMap.set(key, current);
    });
  });

  officialPreviousPapers.forEach((paper) => {
    const key = `${paper.exam}-${paper.year}`;
    const current =
      paperMap.get(key) || {
        exam: paper.exam,
        year: paper.year,
        questions: [],
        subjects: new Set(),
        topics: new Set(),
        tags: new Set(),
      };

    (paper.subjects || []).forEach((subject) => current.subjects.add(subject));
    (paper.topics || []).forEach((topic) => current.topics.add(topic));
    current.officialPaper = paper;
    paperMap.set(key, current);
  });

  return [...paperMap.values()].map((paper) => {
    const title =
      paper.officialPaper?.title || `${paper.exam} ${paper.year} ECE Previous Paper`;
    const questionCount = paper.officialPaper?.questionCount || paper.questions.length;

    return {
      id: `paper-${paper.exam}-${paper.year}`,
      group: "Papers",
      type: "paper",
      href: `/solution/${slugifyPaper(paper.exam, paper.year)}?exam=${encodeURIComponent(
        paper.exam
      )}&year=${encodeURIComponent(paper.year)}`,
      title,
      subtitle: `${paper.exam} | ECE previous paper | ${paper.year}`,
      description: `${questionCount || "Official"} question${
        questionCount === 1 ? "" : "s"
      } from ${paper.exam} ${paper.year}.`,
      badge: "Paper",
      searchText: normalizeText(
        [
          title,
          paper.exam,
          paper.year,
          "ece previous paper question paper pyq solution",
          [...paper.subjects].join(" "),
          [...paper.topics].join(" "),
          [...paper.tags].join(" "),
          paper.officialPaper?.summary,
          paper.questions.map((question) => question.question).join(" "),
        ].join(" ")
      ),
      scoreText: normalizeText([title, paper.exam, paper.year, "previous paper"].join(" ")),
    };
  });
}

export function buildSmartSearchIndex(questions = []) {
  return [
    ...buildCuratedItems(),
    ...buildChapterItems(),
    ...buildConceptItems(),
    ...buildPaperItems(questions),
    ...buildQuestionGroupItems(questions),
    ...buildIndividualQuestionItems(questions),
  ];
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

function getSubjectMatch(normalizedQuery = "", index = []) {
  if (!normalizedQuery) {
    return null;
  }

  const exactMatch = index.find(
    (item) => item.group === "Subjects" && normalizeText(item.title) === normalizedQuery
  );

  if (exactMatch) {
    return exactMatch.title;
  }

  const partialMatch = index.find(
    (item) =>
      item.group === "Subjects" &&
      normalizeText(item.title).includes(normalizedQuery)
  );

  return partialMatch?.title || null;
}

function isSubjectRelevantItem(item, normalizedSubject = "") {
  if (!normalizedSubject) {
    return true;
  }

  return normalizeText([item.title, item.subtitle, item.description].join(" ")).includes(
    normalizedSubject
  );
}

export function getGroupedSmartSearchResults(query = "", index = [], maxPerGroup = 4) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  const matchedItems = index
    .map((item) => ({
      ...item,
      matchScore: scoreItem(item, normalizedQuery.split(" ").filter(Boolean), normalizedQuery),
    }))
    .filter((item) => item.matchScore > 0)
    .sort((left, right) => right.matchScore - left.matchScore || left.title.localeCompare(right.title));

  const matchedSubject = getSubjectMatch(normalizedQuery, index);
  const normalizedSubject = normalizeText(matchedSubject || "");
  const groupOrder = matchedSubject
    ? ["Subjects", "Chapters", "Topics", "Concepts", "Notes", "MCQs", "Papers", "PYQs", "Questions", "Practice"]
    : ["Topics", "Chapters", "Subjects", "Concepts", "Papers", "Questions", "MCQs", "PYQs", "Practice", "Notes"];

  const grouped = groupOrder
    .map((groupName) => ({
      group: groupName,
      items: matchedItems
        .filter((item) => item.group === groupName)
        .filter((item) => isSubjectRelevantItem(item, normalizedSubject))
        .slice(0, maxPerGroup),
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
    { label: "GATE ECE Previous Papers", href: "/previous-year?exam=GATE", group: "Papers" },
    { label: "Network Analysis", href: "/subjects/network-analysis", group: "Subject" },
    { label: "BJT Amplifiers", href: "/bjt-amplifiers", group: "Topic" },
    { label: "Control Systems", href: "/subjects/control-systems", group: "Subject" },
    { label: "Network Analysis MCQs", href: "/mcqs/network-analysis", group: "MCQs" },
    { label: "Network Analysis Notes", href: "/notes/network-analysis", group: "Notes" },
  ].slice(0, limit);
}
