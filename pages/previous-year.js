import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import EmptyState from "../components/EmptyState";
import Layout from "../components/layout";
import PreviousYearQuestionCard from "../components/PreviousYearQuestionCard";
import { officialPreviousPapers } from "../data/official-previous-papers";
import { fetchFilters, fetchQuestions } from "../lib/api-client";
import { EXAMS, SUBJECTS } from "../lib/question-utils";
import {
  getSolvedPercentage,
  slugifyPaper,
} from "../lib/paper-document";
import { buildBreadcrumbList, generateStructuredData } from "../lib/seo";

const initialFilters = {
  exam: "All Exams",
  year: "",
  subject: "All Subjects",
  topic: "All Topics",
  paperType: "All Types",
};

const paperTypeOptions = ["All Types", "Objective", "General Aptitude + Engineering"];

const previousYearStructuredData = [
  ...generateStructuredData({
    type: "topic",
    title: "ECE Previous Year Question Papers",
    description:
      "Browse ECE previous year question papers for GATE, ISRO, BEL, BARC, ESE, DRDO, IOCL, SSC JE, RRB JE, and State AE/JE with year-wise paper links and solved questions.",
    path: "/previous-year",
    subjectName: "Electronics and Communication Engineering",
    chapterTitle: "Previous Year Papers",
    keywords:
      "ECE previous year papers, GATE ECE question papers, ISRO ECE previous papers, BEL electronics paper, solved previous year questions, ECE PYQ",
    about: ["GATE ECE", "ECE question papers", "solved previous year questions"],
  }),
  buildBreadcrumbList([
    { name: "Home", item: "/" },
    { name: "Previous Papers", item: "/previous-year" },
  ]),
];

const featuredExamOptions = [
  {
    key: "ALL",
    exam: "All Exams",
    title: "All Exams",
    subtitle: "Complete archive",
    logo: "all",
  },
  {
    key: "BEL",
    exam: "BEL",
    title: "BEL",
    subtitle: "Bharat Electronics Limited",
    logo: "bel",
  },
  {
    key: "ISRO",
    exam: "ISRO",
    title: "ISRO",
    subtitle: "Indian Space Research Organisation",
    logo: "isro",
  },
  {
    key: "GATE",
    exam: "GATE",
    title: "GATE",
    subtitle: "Graduate Aptitude Test in Engineering",
    logo: "gate-mark",
  },
  {
    key: "PSU",
    search: "BEL",
    sortLabel: "PSU",
    title: "PSU",
    subtitle: "Public Sector Undertakings",
    logo: "psu",
  },
  {
    key: "IES",
    search: "ESE",
    sortLabel: "IES",
    title: "IES",
    subtitle: "IES (ESE)",
    logo: "ies",
  },
  {
    key: "DRDO",
    search: "DRDO",
    sortLabel: "DRDO",
    title: "DRDO",
    subtitle: "Defence Research & Development Org.",
    logo: "drdo",
  },
  {
    key: "IOCL",
    search: "IOCL",
    sortLabel: "IOCL",
    title: "IOCL",
    subtitle: "Indian Oil Corporation Ltd.",
    logo: "iocl",
  },
];

const examHighlights = {
  "All Exams": {
    title: "All Exams",
    subtitle: "Unified Paper Library",
    description: "Browse every available ECE paper set in one place before narrowing down.",
    icon: "layers",
    accent: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      text: "text-slate-700",
      badge: "bg-slate-100 text-slate-700",
    },
  },
  BEL: {
    title: "BEL",
    subtitle: "Bharat Electronics Limited",
    description: "Objective-style recruitment papers for electronics-heavy engineering roles.",
    icon: "industry",
    accent: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      badge: "bg-blue-100 text-blue-700",
    },
  },
  ISRO: {
    title: "ISRO",
    subtitle: "Indian Space Research Organisation",
    description: "Scientist and engineer recruitment practice with core technical coverage.",
    icon: "satellite",
    accent: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-700",
      badge: "bg-orange-100 text-orange-700",
    },
  },
  GATE: {
    title: "GATE",
    subtitle: "Graduate Aptitude Test in Engineering",
    description: "Aptitude plus technical papers arranged year-wise for focused preparation.",
    icon: "gate",
    accent: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-700",
    },
  },
  BARC: {
    title: "BARC",
    subtitle: "Atomic Research Recruitment",
    description: "Higher-rigor paper sets geared toward technical selection rounds.",
    icon: "atom",
    accent: {
      bg: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-700",
      badge: "bg-violet-100 text-violet-700",
    },
  },
};

const paperRoleLabels = {
  BEL: "Engineer Trainee (Electronics)",
  ISRO: "Scientist / Engineer (Electronics)",
  GATE: "GATE ECE Previous Paper",
  BARC: "Scientific Officer (Electronics)",
  ESE: "Engineering Services Examination",
  DRDO: "Scientist / Engineer Electronics",
  IOCL: "Engineer / Officer Electronics",
  "SSC JE": "Junior Engineer Electronics",
  "RRB JE": "Junior Engineer Electronics",
  "State AE/JE": "Assistant / Junior Engineer Electronics",
};

function getPaperTypeFromExam(examName) {
  return examName === "GATE" ? "General Aptitude + Engineering" : "Objective";
}

function getExamCardSortLabel(card) {
  return card.sortLabel || card.exam || card.search || card.title;
}

function getExamCardDisplayText(card) {
  return card.subtitle || card.title;
}

function buildYearRange(startYear, endYear) {
  return Array.from(
    { length: startYear - endYear + 1 },
    (_, index) => startYear - index
  );
}

const previousPaperYearCatalog = [
  { exam: "GATE", years: buildYearRange(2024, 2014) },
  { exam: "ISRO", years: buildYearRange(2024, 2014) },
  { exam: "BEL", years: buildYearRange(2025, 2014).filter((year) => year !== 2024) },
  { exam: "BARC", years: buildYearRange(2024, 2014) },
  { exam: "ESE", years: buildYearRange(2024, 2014) },
  { exam: "DRDO", years: buildYearRange(2024, 2014) },
  { exam: "IOCL", years: buildYearRange(2024, 2014) },
  { exam: "SSC JE", years: buildYearRange(2024, 2015) },
  { exam: "RRB JE", years: buildYearRange(2024, 2015) },
  { exam: "State AE/JE", years: buildYearRange(2024, 2014) },
];

const previousPaperCatalogEntries = previousPaperYearCatalog.flatMap((item) =>
  item.years.map((year) => ({
    id: `${item.exam}-${year}`,
    exam: item.exam,
    year,
    title: `${item.exam} ${year} ECE Previous Paper`,
    role: paperRoleLabels[item.exam] || "ECE Previous Paper",
    paperType: getPaperTypeFromExam(item.exam),
    subjects: ["Electronics"],
    topics: ["Previous Paper"],
    questionCount: 0,
    solvedCount: 0,
    repeatedCount: 0,
    importantCount: 0,
    sourceLabel: "Year-wise paper catalog",
    summary: "Year-wise paper entry added to keep the archive complete.",
  }))
);

function questionMatchesPaperType(question, selectedPaperType) {
  if (selectedPaperType === "All Types") {
    return true;
  }

  return (question.exam || []).some(
    (examName) => getPaperTypeFromExam(examName) === selectedPaperType
  );
}

function paperMatchesSelection(paper, selectedPaperType = "All Types", filters = initialFilters, searchValue = "") {
  const normalizedSearch = searchValue.trim().toLowerCase();
  const searchText = [
    paper.exam,
    paper.year,
    paper.title,
    paper.role,
    paper.sourceLabel,
    ...(paper.subjects || []),
    ...(paper.topics || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (selectedPaperType !== "All Types" && paper.paperType !== selectedPaperType) {
    return false;
  }

  if (filters.exam !== initialFilters.exam && paper.exam !== filters.exam) {
    return false;
  }

  if (filters.year && Number(paper.year) !== Number(filters.year)) {
    return false;
  }

  if (
    filters.subject !== initialFilters.subject &&
    !(paper.subjects || []).includes(filters.subject)
  ) {
    return false;
  }

  if (
    filters.topic !== initialFilters.topic &&
    !(paper.topics || []).includes(filters.topic)
  ) {
    return false;
  }

  return !normalizedSearch || searchText.includes(normalizedSearch);
}

function mergePaperEntry(current, paper) {
  const subjectSet = new Set([
    ...(current?.subjectSet || []),
    ...(current?.subjects || []),
    ...(paper.subjects || []),
  ]);
  const topicSet = new Set([
    ...(current?.topicSet || []),
    ...(current?.topics || []),
    ...(paper.topics || []),
  ]);

  return {
    ...(current || {}),
    ...paper,
    questionCount: Math.max(current?.questionCount || 0, paper.questionCount || 0),
    solvedCount: Math.max(current?.solvedCount || 0, paper.solvedCount || 0),
    repeatedCount: Math.max(current?.repeatedCount || 0, paper.repeatedCount || 0),
    importantCount: Math.max(current?.importantCount || 0, paper.importantCount || 0),
    isOfficialPdf: Boolean(current?.isOfficialPdf || paper.isOfficialPdf),
    pdfHref: paper.pdfHref || current?.pdfHref,
    sourceLabel: paper.sourceLabel || current?.sourceLabel,
    summary: paper.summary || current?.summary,
    subjectSet,
    topicSet,
  };
}

function buildPaperEntries(
  questions = [],
  selectedPaperType = "All Types",
  filters = initialFilters,
  searchValue = ""
) {
  const paperMap = new Map();

  previousPaperCatalogEntries
    .filter((paper) => paperMatchesSelection(paper, selectedPaperType, filters, searchValue))
    .forEach((paper) => {
      paperMap.set(paper.id, {
        ...paper,
        subjectSet: new Set(paper.subjects || []),
        topicSet: new Set(paper.topics || []),
      });
    });

  questions.forEach((question) => {
    const examList =
      Array.isArray(question.exam) && question.exam.length
        ? question.exam
        : ["General"];

    examList
      .filter(
        (examName) =>
          filters.exam === initialFilters.exam || examName === filters.exam
      )
      .forEach((examName) => {
        const paperType = getPaperTypeFromExam(examName);

        if (selectedPaperType !== "All Types" && paperType !== selectedPaperType) {
          return;
        }

        const key = `${examName}-${question.year}`;
        const current =
          paperMap.get(key) || {
            id: key,
            exam: examName,
            year: question.year,
            title: `${examName} ${question.year} ECE Previous Paper`,
            role: paperRoleLabels[examName] || "ECE Previous Paper",
            paperType,
            questionCount: 0,
            solvedCount: 0,
            repeatedCount: 0,
            importantCount: 0,
            subjectSet: new Set(),
            topicSet: new Set(),
          };

        current.questionCount += 1;

        if (question.explanation) {
          current.solvedCount += 1;
        }

        if ((question.tags || []).includes("repeated")) {
          current.repeatedCount += 1;
        }

        if ((question.tags || []).includes("important")) {
          current.importantCount += 1;
        }

        if (question.subject) {
          current.subjectSet.add(question.subject);
        }

        if (question.topic) {
          current.topicSet.add(question.topic);
        }

        paperMap.set(key, current);
      });
  });

  officialPreviousPapers
    .filter((paper) => paperMatchesSelection(paper, selectedPaperType, filters, searchValue))
    .forEach((paper) => {
      const key = paper.id || `${paper.exam}-${paper.year}`;
      paperMap.set(
        key,
        mergePaperEntry(paperMap.get(key), {
          ...paper,
          isOfficialPdf: true,
        })
      );
    });

  return [...paperMap.values()]
    .map((paper) => ({
      id: paper.id,
      exam: paper.exam,
      year: paper.year,
      month: paper.month,
      slug: paper.slug,
      title: paper.title,
      role: paper.role,
      paperType: paper.paperType,
      questionCount: paper.questionCount,
      solvedCount: paper.solvedCount,
      repeatedCount: paper.repeatedCount,
      importantCount: paper.importantCount,
      subjectCount: paper.subjectSet.size,
      topicCount: paper.topicCount || paper.topicSet.size,
      subjects: [...paper.subjectSet],
      topics: [...paper.topicSet],
      isOfficialPdf: Boolean(paper.isOfficialPdf),
      pdfHref: paper.pdfHref,
      sourceLabel: paper.sourceLabel,
      summary: paper.summary,
    }))
    .sort(
      (left, right) =>
        right.year - left.year ||
        right.questionCount - left.questionCount ||
        left.exam.localeCompare(right.exam)
    );
}

function getFiltersFromQuery(query = {}) {
  return {
    exam:
      typeof query.exam === "string" && query.exam
        ? query.exam
        : initialFilters.exam,
    year: typeof query.year === "string" ? query.year : initialFilters.year,
    subject:
      typeof query.subject === "string" && query.subject
        ? query.subject
        : initialFilters.subject,
    topic:
      typeof query.topic === "string" && query.topic
        ? query.topic
        : initialFilters.topic,
    paperType:
      typeof query.paperType === "string" && query.paperType
        ? query.paperType
        : initialFilters.paperType,
  };
}

function buildRouteQuery(searchValue, filters) {
  const nextQuery = {};

  if (searchValue.trim()) {
    nextQuery.search = searchValue.trim();
  }

  if (filters.exam !== initialFilters.exam) {
    nextQuery.exam = filters.exam;
  }

  if (filters.year) {
    nextQuery.year = filters.year;
  }

  if (filters.subject !== initialFilters.subject) {
    nextQuery.subject = filters.subject;
  }

  if (filters.topic !== initialFilters.topic) {
    nextQuery.topic = filters.topic;
  }

  if (filters.paperType !== initialFilters.paperType) {
    nextQuery.paperType = filters.paperType;
  }

  return nextQuery;
}

function buildSolutionHref(paper, filters = initialFilters, searchValue = "") {
  const searchParams = new URLSearchParams({
    exam: paper.exam,
    year: String(paper.year),
  });
  const solutionSlug = paper.slug || slugifyPaper(paper.exam, paper.year);

  if (paper.month) {
    searchParams.set("month", paper.month);
  }

  if (paper.id && paper.isOfficialPdf) {
    searchParams.set("paperId", paper.id);
  }

  if (searchValue.trim()) {
    searchParams.set("search", searchValue.trim());
  }

  if (filters.subject !== initialFilters.subject) {
    searchParams.set("subject", filters.subject);
  }

  if (filters.topic !== initialFilters.topic) {
    searchParams.set("topic", filters.topic);
  }

  if (filters.paperType !== initialFilters.paperType) {
    searchParams.set("paperType", filters.paperType);
  }

  return `/solution/${solutionSlug}?${searchParams.toString()}`;
}

function getExamHighlight(examName) {
  return (
    examHighlights[examName] || {
      title: examName,
      subtitle: "Previous Papers",
      description: "Focused paper practice with exam-wise and year-wise filtering.",
      icon: "document",
      accent: {
        bg: "bg-slate-50",
        border: "border-slate-200",
        text: "text-slate-700",
        badge: "bg-slate-100 text-slate-700",
      },
    }
  );
}

function formatSubjectSummary(subjects = []) {
  if (!subjects.length) {
    return "Mixed ECE subjects";
  }

  if (subjects.length <= 2) {
    return subjects.join(", ");
  }

  return `${subjects.slice(0, 2).join(", ")} +${subjects.length - 2}`;
}

function buildActiveFilterBadges(searchValue, filters) {
  const badges = [];

  if (searchValue.trim()) {
    badges.push(`Search: ${searchValue.trim()}`);
  }

  if (filters.exam !== initialFilters.exam) {
    badges.push(filters.exam);
  }

  if (filters.year) {
    badges.push(`Year ${filters.year}`);
  }

  if (filters.subject !== initialFilters.subject) {
    badges.push(filters.subject);
  }

  if (filters.topic !== initialFilters.topic) {
    badges.push(filters.topic);
  }

  if (filters.paperType !== initialFilters.paperType) {
    badges.push(filters.paperType);
  }

  return badges;
}

function formatCurrentSelection(filters) {
  const parts = [];

  if (filters.exam !== initialFilters.exam) {
    parts.push(filters.exam);
  }

  if (filters.year) {
    parts.push(filters.year);
  }

  if (filters.subject !== initialFilters.subject) {
    parts.push(filters.subject);
  }

  if (filters.topic !== initialFilters.topic) {
    parts.push(filters.topic);
  }

  if (filters.paperType !== initialFilters.paperType) {
    parts.push(filters.paperType);
  }

  return parts.length ? parts.join(" / ") : "All exams / all years";
}

function getSelectionContextText(filters) {
  const yearLabel = filters.year ? ` ${filters.year}` : "";
  const subjectLabel =
    filters.subject !== initialFilters.subject ? ` for ${filters.subject}` : "";
  const topicLabel =
    filters.topic !== initialFilters.topic ? `, ${filters.topic}` : "";

  if (filters.exam === initialFilters.exam) {
    return `Showing year-wise ECE previous papers from all listed exams${yearLabel}${subjectLabel}${topicLabel}.`;
  }

  const examLabel = filters.exam;
  return `Showing year-wise ECE previous papers from ${examLabel}${yearLabel}${subjectLabel}${topicLabel}.`;
}

function buildNextFilters(current, field, value) {
  const nextValue = { ...current, [field]: value };

  if (field === "exam") {
    nextValue.year = "";
  }

  if (field === "subject") {
    nextValue.topic = "All Topics";
  }

  return nextValue;
}

function getPaperRoleLabel(examName) {
  return paperRoleLabels[examName] || `${examName} Previous Paper`;
}

function getPaperTitle(paper) {
  return paper.title || paper.role || getPaperRoleLabel(paper.exam);
}

function getPaperContextLabel(paper) {
  const monthLabel = paper.month ? `${paper.month} ${paper.year}` : paper.year;
  return `${paper.exam} exam | ECE branch | ${monthLabel} previous paper`;
}

function getQuestionCountLabel(paper) {
  if (paper.questionCount) {
    return `${paper.questionCount} ${paper.questionCount === 1 ? "question" : "questions"}`;
  }

  return paper.isOfficialPdf ? "Official PDF" : "Questions pending";
}

function getPaperScopeLabel(paper) {
  if (!paper.topicCount) {
    return "Topics pending";
  }

  return `${paper.topicCount} ${paper.topicCount === 1 ? "topic" : "topics"} in this set`;
}

function getSolutionStatusLabel(paper) {
  if (paper.isOfficialPdf && !paper.solvedCount) {
    return "Official paper";
  }

  return paper.solvedCount
    ? `${getSolvedPercentage(paper.solvedCount, paper.questionCount)}% solved`
    : "Limited";
}

function mergeOfficialOptions(payload = {}, filters = initialFilters) {
  const matchingPapers = officialPreviousPapers.filter((paper) =>
    paperMatchesSelection(paper, "All Types", filters, "")
  );
  const matchingCatalogPapers = previousPaperCatalogEntries.filter((paper) =>
    paperMatchesSelection(paper, "All Types", filters, "")
  );
  const appendUnique = (items = [], additions = []) =>
    Array.from(new Set([...(items || []), ...additions])).filter(Boolean);

  return {
    subjects: appendUnique(
      Array.isArray(payload.subjects) ? payload.subjects : SUBJECTS,
      [
        ...matchingPapers.flatMap((paper) => paper.subjects || []),
        ...matchingCatalogPapers.flatMap((paper) => paper.subjects || []),
      ]
    ),
    exams: appendUnique(
      Array.isArray(payload.exams) ? payload.exams : EXAMS,
      [
        ...matchingPapers.map((paper) => paper.exam),
        ...matchingCatalogPapers.map((paper) => paper.exam),
      ]
    ),
    topics: appendUnique(
      Array.isArray(payload.topics) ? payload.topics : ["All Topics"],
      [
        ...matchingPapers.flatMap((paper) => paper.topics || []),
        ...matchingCatalogPapers.flatMap((paper) => paper.topics || []),
      ]
    ),
    years: Array.from(
      new Set([
        ...(Array.isArray(payload.years) ? payload.years : []),
        ...matchingPapers.map((paper) => paper.year),
        ...matchingCatalogPapers.map((paper) => paper.year),
      ])
    ).sort((left, right) => Number(right) - Number(left)),
  };
}

function buildPaginationItems(currentPage, totalPages) {
  if (totalPages <= 1) {
    return [1];
  }

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    pages.push("left-gap");
  }

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (end < totalPages - 1) {
    pages.push("right-gap");
  }

  pages.push(totalPages);

  return pages;
}

function UiIcon({ type, className = "h-5 w-5" }) {
  if (type === "home") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1v-9.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "calendar") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 3v3m10-3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 3h6l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14 3v5h5M9 13h6M9 17h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "layers") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 4 20 8l-8 4-8-4 8-4ZM4 12l8 4 8-4M4 16l8 4 8-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "filter") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6h16l-6.5 7.5V19l-3 1v-6.5L4 6Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "refresh") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 12a8 8 0 0 1 13.66-5.66L20 8.67M20 4v4.67h-4.67M20 12a8 8 0 0 1-13.66 5.66L4 15.33M4 20v-4.67h4.67"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "eye") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "play") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 6.5v11l8-5.5-8-5.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "download") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 4v10m0 0 4-4m-4 4-4-4M5 20h14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "folder") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3.5 8.5A2.5 2.5 0 0 1 6 6h4l1.6 2H18a2.5 2.5 0 0 1 2.5 2.5V17A2.5 2.5 0 0 1 18 19.5H6A2.5 2.5 0 0 1 3.5 17V8.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "dots-vertical") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="5.5" r="1.6" fill="currentColor" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        <circle cx="12" cy="18.5" r="1.6" fill="currentColor" />
      </svg>
    );
  }

  if (type === "bulb") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 18h6m-5 3h4m-5.5-6.5c-1.3-1-2-2.6-2-4.3a5.5 5.5 0 1 1 11 0c0 1.7-.7 3.3-2 4.3-.8.7-1.5 1.5-1.8 2.5h-3.4c-.3-1-.9-1.8-1.8-2.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "spark") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3v4M12 17v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M3 12h4m10 0h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "chevron-left") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="m14 7-5 5 5 5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "chevron-right") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="m10 7 5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "chevron-down") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="m6.5 9.5 5.5 5 5.5-5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "check") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="m6.5 12.5 3.5 3.5 7.5-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PreviousPaperIcon({ type }) {
  const common = "h-7 w-7";

  if (type === "layers") {
    return <UiIcon type="layers" className={common} />;
  }

  if (type === "gate") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3.5 9 12 4l8.5 5L12 14 3.5 9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 11v3.5L12 18l5.5-3.5V11"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "government" || type === "state") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 10h16M6 10V8l6-4 6 4v2M7 20v-6m5 6v-6m5 6v-6M4 20h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "industry") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 20V9l6 3V7l6 3V4l4 2v14H4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "satellite") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="m13.5 4.5 6 6-2.25 2.25-6-6L13.5 4.5ZM9 9l6 6M8 12l-4 4m5-9L5 11m10 8 4-4m-1-6 2 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 18h3v3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "atom") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        <path
          d="M12 5c3.2 0 5.8 3.1 5.8 7s-2.6 7-5.8 7-5.8-3.1-5.8-7 2.6-7 5.8-7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          transform="rotate(60 12 12)"
        />
        <path
          d="M12 5c3.2 0 5.8 3.1 5.8 7s-2.6 7-5.8 7-5.8-3.1-5.8-7 2.6-7 5.8-7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          transform="rotate(-60 12 12)"
        />
      </svg>
    );
  }

  return <UiIcon type="document" className={common} />;
}

function ExamLogoBadge({ type, className = "" }) {
  if (type === "all") {
    return (
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 ${className}`}
      >
        <UiIcon type="layers" className="h-6 w-6" />
      </span>
    );
  }

  if (type === "bel") {
    return (
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-[#d7e5ff] bg-white text-[#1e63ff] ${className}`}
      >
        <span className="text-lg font-black tracking-tight">BEL</span>
      </span>
    );
  }

  if (type === "isro") {
    return (
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-[#ffe0cf] bg-white text-[#ff7b2f] ${className}`}
      >
        <span className="text-sm font-black tracking-tight">ISRO</span>
      </span>
    );
  }

  if (type === "gate-mark") {
    return (
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-[#dbeedb] bg-white text-[#1f9a56] ${className}`}
      >
        <span className="text-lg font-black tracking-tight">GATE</span>
      </span>
    );
  }

  if (type === "psu") {
    return (
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 ${className}`}
      >
        <PreviousPaperIcon type="government" />
      </span>
    );
  }

  if (type === "ies") {
    return (
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 ${className}`}
      >
        <PreviousPaperIcon type="document" />
      </span>
    );
  }

  if (type === "drdo") {
    return (
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-[#d9e6ff] bg-white text-[#2a5cc8] ${className}`}
      >
        <span className="text-xs font-black tracking-[0.12em]">DRDO</span>
      </span>
    );
  }

  if (type === "iocl") {
    return (
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-[#ffd6c1] bg-white ${className}`}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f17c2e] text-[10px] font-black tracking-[0.14em] text-[#1f54c6]">
          IOCL
        </span>
      </span>
    );
  }

  return (
    <span
      className={`flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 ${className}`}
    >
      <UiIcon type="document" className="h-6 w-6" />
    </span>
  );
}

function FilterTile({ label, icon, children, className = "" }) {
  return (
    <div
      className={`rounded-[16px] border border-[#e4eaf6] bg-white px-3 py-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:rounded-[18px] sm:px-4 sm:py-3 ${className}`}
    >
      <div className="flex items-start gap-2.5 sm:gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f4f8ff] text-portal-600 sm:mt-1 sm:h-9 sm:w-9 sm:rounded-xl">
          <UiIcon type={icon} className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
          <div className="mt-0.5 sm:mt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SelectControl({ value, onChange, children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none bg-transparent py-0.5 pr-7 text-sm font-semibold text-slate-900 outline-none sm:py-1 sm:pr-8 sm:text-base"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-400">
        <UiIcon type="chevron-down" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </span>
    </div>
  );
}

function PaginationButton({ active, children, onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-10 min-w-[40px] items-center justify-center rounded-xl border px-3 text-sm font-semibold transition ${
        active
          ? "border-portal-600 bg-portal-600 text-white shadow-[0_12px_24px_rgba(21,74,150,0.22)]"
          : "border-portal-200 bg-white text-slate-700 hover:border-portal-300 hover:text-portal-700"
      } ${disabled ? "cursor-not-allowed opacity-45 hover:border-portal-200 hover:text-slate-700" : ""}`}
    >
      {children}
    </button>
  );
}

export default function PreviousYearPage() {
  const router = useRouter();
  const examRailRef = useRef(null);
  const [search, setSearch] = useState("");
  const [filterForm, setFilterForm] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [questions, setQuestions] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    subjects: SUBJECTS,
    exams: EXAMS,
    topics: ["All Topics"],
    years: [],
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadFilterMetadata() {
      try {
        const payload = await fetchFilters(
          {
            exam: filterForm.exam,
            year: filterForm.year,
            subject: filterForm.subject,
            topic: filterForm.topic,
          },
          { signal: controller.signal }
        );

        if (mounted) {
          setFilterOptions(mergeOfficialOptions(payload, filterForm));
        }
      } catch (error) {
        if (mounted && error.name !== "AbortError") {
          setFilterOptions(mergeOfficialOptions({}, filterForm));
        }
      }
    }

    loadFilterMetadata();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [filterForm.exam, filterForm.year, filterForm.subject, filterForm.topic]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      setLoading(true);
      setLoadError("");

      try {
        const data = await fetchQuestions(
          {
            search,
            exam: activeFilters.exam,
            year: activeFilters.year,
            subject: activeFilters.subject,
            topic: activeFilters.topic,
          },
          { signal: controller.signal }
        );

        if (mounted) {
          setQuestions(data);
        }
      } catch (error) {
        if (mounted && error.name !== "AbortError") {
          setQuestions([]);
          setLoadError(error.message || "Unable to load previous year questions.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [search, activeFilters.exam, activeFilters.year, activeFilters.subject, activeFilters.topic]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const routeSearch =
      typeof router.query.search === "string" ? router.query.search : "";
    const routeFilters = getFiltersFromQuery(router.query);

    setSearch(routeSearch);
    setFilterForm(routeFilters);
    setActiveFilters(routeFilters);
  }, [
    router.isReady,
    router.query.exam,
    router.query.paperType,
    router.query.search,
    router.query.subject,
    router.query.topic,
    router.query.year,
  ]);

  const visibleQuestions = useMemo(() => {
    return questions.filter((question) =>
      questionMatchesPaperType(question, activeFilters.paperType)
    );
  }, [questions, activeFilters.paperType]);

  const visiblePapers = useMemo(
    () => buildPaperEntries(questions, activeFilters.paperType, activeFilters, search),
    [questions, activeFilters, search]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    activeFilters.exam,
    activeFilters.paperType,
    activeFilters.subject,
    activeFilters.topic,
    activeFilters.year,
  ]);

  const solvedCount = visibleQuestions.filter((question) => Boolean(question.explanation)).length;
  const repeatedCount = visibleQuestions.filter((question) =>
    (question.tags || []).includes("repeated")
  ).length;
  const importantCount = visibleQuestions.filter((question) =>
    (question.tags || []).includes("important")
  ).length;
  const hasQuestionBankSelection =
    Boolean(search.trim()) ||
    activeFilters.year !== initialFilters.year ||
    activeFilters.subject !== initialFilters.subject ||
    activeFilters.topic !== initialFilters.topic;
  const latestYear = visiblePapers[0]?.year || filterOptions.years[0] || "--";
  const solutionCoverage = visibleQuestions.length
    ? Math.round((solvedCount / visibleQuestions.length) * 100)
    : 0;
  const selectedArchiveTitle =
    activeFilters.exam !== initialFilters.exam
      ? `${activeFilters.exam} Previous Papers`
      : search.trim()
        ? `${search.trim()} Previous Papers`
        : "ECE Previous Papers Archive";
  const archiveMetrics = [
    {
      label: "Papers",
      value: String(visiblePapers.length),
      detail: "Exam-wise sets",
    },
    {
      label: "Questions",
      value: String(visibleQuestions.length),
      detail: "Currently in view",
    },
    {
      label: "Solutions",
      value: `${solutionCoverage}%`,
      detail: `${solvedCount} explained`,
    },
    {
      label: "Latest year",
      value: String(latestYear),
      detail: "Newest paper found",
    },
  ];
  const patternMetrics = [
    ["Repeated", repeatedCount, "Patterns seen more than once"],
    ["Important", importantCount, "High-priority questions"],
    ["Paper type", activeFilters.paperType, "Current attempt format"],
  ];
  const activeFilterBadges = useMemo(
    () => buildActiveFilterBadges(search, activeFilters),
    [search, activeFilters]
  );
  const examCards = useMemo(() => {
    const availableExams = Array.from(
      new Set(["All Exams", ...(filterOptions.exams.length ? filterOptions.exams : EXAMS)])
    );

    return availableExams.map((examName) => {
      const highlight = getExamHighlight(examName);
      const examQuestions =
        examName === "All Exams"
          ? questions.filter((question) =>
              questionMatchesPaperType(question, activeFilters.paperType)
            )
          : questions.filter(
              (question) =>
                (question.exam || []).includes(examName) &&
                questionMatchesPaperType(question, activeFilters.paperType)
            );
      const examPapers =
        examName === "All Exams"
          ? visiblePapers
          : visiblePapers.filter((paper) => paper.exam === examName);
      const examYears = Array.from(new Set(examPapers.map((paper) => paper.year))).sort(
        (left, right) => right - left
      );

      return {
        ...highlight,
        exam: examName,
        isAll: examName === "All Exams",
        paperCount: examPapers.length,
        questionCount: examQuestions.length,
        yearLabel: examYears.length
          ? `${examYears[examYears.length - 1]} - ${examYears[0]}`
          : "Question bank",
      };
    });
  }, [activeFilters.paperType, filterOptions.exams, questions, visiblePapers]);
  const featuredCards = useMemo(
    () => {
      const cards = featuredExamOptions.map((card) => ({
        ...card,
        isSelected: card.exam
          ? activeFilters.exam === card.exam
          : search.trim().toLowerCase() === (card.search || "").toLowerCase(),
      }));
      const allExamCard = cards.find((card) => card.key === "ALL");
      const examCards = cards
        .filter((card) => card.key !== "ALL")
        .sort((left, right) => {
          if (left.isSelected !== right.isSelected) {
            return left.isSelected ? -1 : 1;
          }

          return getExamCardSortLabel(left).localeCompare(getExamCardSortLabel(right));
        });

      return allExamCard ? [allExamCard, ...examCards] : examCards;
    },
    [activeFilters.exam, search]
  );

  const totalPages = Math.max(1, Math.ceil(visiblePapers.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedPapers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return visiblePapers.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, visiblePapers]);

  const pageStart = visiblePapers.length ? (currentPage - 1) * pageSize + 1 : 0;
  const pageEnd = Math.min(currentPage * pageSize, visiblePapers.length);
  const paginationItems = useMemo(
    () => buildPaginationItems(currentPage, totalPages),
    [currentPage, totalPages]
  );

  function commitSelection(nextSearch, nextFilters) {
    setSearch(nextSearch);
    setFilterForm(nextFilters);
    setActiveFilters(nextFilters);
    router.push(
      {
        pathname: router.pathname,
        query: buildRouteQuery(nextSearch, nextFilters),
      },
      undefined,
      { shallow: true }
    );
  }

  function handleFilterChange(field, value) {
    commitSelection(search, buildNextFilters(filterForm, field, value));
  }

  function handleResetFilters() {
    commitSelection(search, {
      ...initialFilters,
      exam: activeFilters.exam,
    });
  }

  function handleExamCardSelect(card) {
    if (card.key === "ALL") {
      commitSelection("", {
        ...initialFilters,
        paperType: activeFilters.paperType,
      });
      return;
    }

    commitSelection(card.search || "", {
      ...initialFilters,
      exam: card.exam || initialFilters.exam,
      paperType: activeFilters.paperType,
    });
  }

  function scrollExamRail(direction) {
    examRailRef.current?.scrollBy({
      left: direction * 240,
      behavior: "smooth",
    });
  }

  return (
    <Layout
      title="ECE Previous Year Papers | GATE and PSU PYQs"
      description="Browse searchable ECE previous year question papers for GATE, ISRO, BEL, BARC, ESE, DRDO, IOCL, SSC JE, RRB JE, and State AE/JE with year-wise paper solutions."
      keywords="ECE previous year papers, GATE ECE previous papers, ECE question paper, solved previous year questions, ISRO ECE paper, BEL electronics paper"
      canonicalUrl="/previous-year"
      structuredData={previousYearStructuredData}
      searchValue={search}
      onSearchChange={setSearch}
      pageClassName="py-5 sm:py-6"
    >
      <div className="mx-auto max-w-[1440px] space-y-6">
        <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_38px_rgba(15,23,42,0.06)] sm:p-6">
          <nav
            className="flex flex-wrap items-center gap-2 text-sm text-slate-500"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="font-semibold text-portal-700 transition hover:text-portal-800"
            >
              Home
            </Link>
            <span aria-hidden="true" className="text-slate-300">
              /
            </span>
            <span className="font-semibold text-slate-800">Previous Papers</span>
          </nav>

          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Previous Year Papers
              </h1>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Browse exam-wise ECE papers, filter by year or subject, and open solved sets when available.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {archiveMetrics.slice(0, 3).map((metric) => (
                <span
                  key={metric.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700"
                >
                  <span className="font-extrabold text-slate-950">{metric.value}</span>{" "}
                  {metric.label.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[30px] border border-[#e2e9f7] bg-white shadow-[0_18px_60px_rgba(17,43,92,0.08)]">
          <div className="space-y-5 p-3 sm:space-y-6 sm:p-6">
            <section className="space-y-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                    Exam archive
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
                    Select Exam Family
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Choose an exam family to open a focused previous-paper library with year-wise practice.
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {patternMetrics.map(([label, value, detail]) => (
                    <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-lg font-extrabold text-slate-950">{value}</p>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
                        {label}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:hidden">
                {featuredCards.map((card) => (
                  <button
                    key={`mobile-${card.key}`}
                    type="button"
                    onClick={() => handleExamCardSelect(card)}
                    className={`group flex min-h-[110px] w-full flex-col rounded-[16px] border bg-white p-3 text-left shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition sm:min-h-[126px] sm:rounded-[18px] sm:p-3.5 ${
                      card.isSelected
                        ? "border-portal-500 ring-1 ring-portal-500"
                        : "border-[#e3eaf7] hover:border-portal-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2.5 sm:gap-3">
                      <ExamLogoBadge type={card.logo} className="scale-[0.88] sm:scale-100" />
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full sm:h-6 sm:w-6 ${
                          card.isSelected
                            ? "bg-portal-600 text-white"
                            : "bg-slate-100 text-transparent"
                        }`}
                      >
                        <UiIcon type="check" className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </span>
                    </div>

                    <h2 className="mt-2.5 min-h-[2.5rem] text-[0.82rem] font-bold leading-5 tracking-tight text-slate-900 sm:mt-3 sm:text-[0.95rem]">
                      {getExamCardDisplayText(card)}
                    </h2>
                  </button>
                ))}
              </div>

              <div className="hidden items-center gap-3 lg:grid lg:grid-cols-[44px_minmax(0,1fr)_44px]">
                <button
                  type="button"
                  onClick={() => scrollExamRail(-1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#dfe7f6] bg-white text-slate-500 shadow-sm transition hover:border-portal-300 hover:text-portal-700"
                  aria-label="Scroll previous exams"
                >
                  <UiIcon type="chevron-left" className="h-5 w-5" />
                </button>

                <div
                  ref={examRailRef}
                  className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {featuredCards.map((card) => (
                    <button
                      key={card.key}
                      type="button"
                      onClick={() => handleExamCardSelect(card)}
                      className={`group min-w-[132px] snap-start rounded-[18px] border bg-white p-3 text-left shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition ${
                        card.isSelected
                          ? "border-portal-500 ring-1 ring-portal-500"
                          : "border-[#e3eaf7] hover:border-portal-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <ExamLogoBadge type={card.logo} />
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
                            card.isSelected
                              ? "bg-portal-600 text-white"
                              : "bg-slate-100 text-transparent"
                          }`}
                        >
                          <UiIcon type="check" className="h-3.5 w-3.5" />
                        </span>
                      </div>

                      <h2 className="mt-3 min-h-[2.5rem] text-sm font-bold leading-5 tracking-tight text-slate-900">
                        {getExamCardDisplayText(card)}
                      </h2>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollExamRail(1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#dfe7f6] bg-white text-slate-500 shadow-sm transition hover:border-portal-300 hover:text-portal-700"
                  aria-label="Scroll next exams"
                >
                  <UiIcon type="chevron-right" className="h-5 w-5" />
                </button>
              </div>
            </section>

            <section
              id="filters"
              className="rounded-[24px] border border-[#e6edf9] bg-[#fbfdff] p-2.5 sm:p-4"
            >
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_180px] sm:gap-3">
                <FilterTile label="Year" icon="calendar">
                  <SelectControl
                    value={filterForm.year}
                    onChange={(event) => handleFilterChange("year", event.target.value)}
                  >
                    <option value="">All Years</option>
                    {filterOptions.years.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </SelectControl>
                </FilterTile>

                <FilterTile label="Subject / Paper" icon="document">
                  <SelectControl
                    value={filterForm.subject}
                    onChange={(event) => handleFilterChange("subject", event.target.value)}
                  >
                    {filterOptions.subjects.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </SelectControl>
                </FilterTile>

                <FilterTile label="Type" icon="layers">
                  <SelectControl
                    value={filterForm.paperType}
                    onChange={(event) => handleFilterChange("paperType", event.target.value)}
                  >
                    {paperTypeOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </SelectControl>
                </FilterTile>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center gap-1.5 rounded-[16px] border border-[#dfe7f6] bg-white px-3 py-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-portal-300 hover:text-portal-700 sm:gap-2 sm:rounded-[18px] sm:px-4 sm:py-4 sm:text-sm"
                >
                  <UiIcon type="refresh" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Reset Filters
                </button>
              </div>

              {activeFilterBadges.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeFilterBadges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-[#dfe7f6] bg-white px-2.5 py-1 text-xs font-medium text-slate-700 sm:px-3 sm:py-1.5 sm:text-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>

            <section
              id="paper-library"
              className="overflow-hidden rounded-[24px] border border-[#e6edf9] bg-white"
            >
              <div className="border-b border-[#e9eef8] px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 sm:text-sm">Selected Exam / Filter</p>
                    <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                      {formatCurrentSelection(activeFilters)}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {getSelectionContextText(activeFilters)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#dfe7f6] bg-[#f7faff] px-2.5 py-1 text-xs font-semibold text-portal-700 sm:px-3 sm:py-1.5 sm:text-sm">
                      {visiblePapers.length} papers
                    </span>
                    <span className="rounded-full border border-[#dfe7f6] bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 sm:px-3 sm:py-1.5 sm:text-sm">
                      Latest {latestYear}
                    </span>
                  </div>
                </div>
              </div>

              {loadError ? (
                <div className="p-5 sm:p-6">
                  <EmptyState title="Unable to load paper library" message={loadError} />
                </div>
              ) : loading ? (
                <div className="p-5 sm:p-6">
                  <EmptyState
                    title="Loading paper sets"
                    message="Grouping exam-wise and year-wise papers from the current data source."
                  />
                </div>
              ) : visiblePapers.length ? (
                <>
                  <div className="grid gap-3 p-4 sm:p-5 lg:hidden">
                    {paginatedPapers.map((paper) => {
                      const hasSolutions = paper.solvedCount > 0;
                      const hasPaperAccess = hasSolutions || paper.isOfficialPdf;
                      const solutionHref = buildSolutionHref(paper, activeFilters, search);

                      return (
                        <article
                          key={paper.id}
                          className="rounded-[20px] border border-[#e4eaf6] bg-[#fbfdff] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="inline-flex rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-bold text-portal-700">
                                {paper.year}
                              </span>
                              <p className="mt-3 text-base font-bold text-slate-900">
                                {getPaperTitle(paper)}
                              </p>
                              <p className="mt-1 text-sm leading-6 text-slate-600">
                                {getPaperContextLabel(paper)}
                              </p>
                            </div>
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                hasPaperAccess
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {hasPaperAccess ? "Available" : "Limited"}
                            </span>
                          </div>

                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {getQuestionCountLabel(paper)}
                          </p>

                          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                            <div className="rounded-xl border border-[#e4eaf6] bg-white px-3 py-2">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                                Type
                              </p>
                              <p className="mt-1 font-semibold text-slate-800">{paper.paperType}</p>
                            </div>
                            <div className="rounded-xl border border-[#e4eaf6] bg-white px-3 py-2">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                                Questions
                              </p>
                              <p className="mt-1 font-semibold text-slate-800">
                                {paper.questionCount || (paper.isOfficialPdf ? "PDF" : "Pending")}
                              </p>
                            </div>
                            <div className="rounded-xl border border-[#e4eaf6] bg-white px-3 py-2">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                                Solved
                              </p>
                              <p className="mt-1 font-semibold text-slate-800">
                                {paper.questionCount
                                  ? `${getSolvedPercentage(paper.solvedCount, paper.questionCount)}%`
                                  : "Source"}
                              </p>
                            </div>
                            <div className="rounded-xl border border-[#e4eaf6] bg-white px-3 py-2">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                                Signals
                              </p>
                              <p className="mt-1 font-semibold text-slate-800">
                                {paper.repeatedCount + paper.importantCount}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 grid gap-2 sm:grid-cols-3">
                            <Link
                              href={solutionHref}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-portal-700 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-portal-800"
                            >
                              <UiIcon type="eye" className="h-4 w-4" />
                              View Solution
                            </Link>
                          </div>
                        </article>
                      );
                    })}

                    <div className="rounded-[20px] border border-[#e4eaf6] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                      <div className="flex flex-col gap-4">
                        <p className="text-sm text-slate-600">
                          Showing {pageStart} to {pageEnd} of {visiblePapers.length} papers
                        </p>

                        {totalPages > 1 ? (
                          <div className="flex items-center justify-between gap-2">
                            <PaginationButton
                              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                              disabled={currentPage === 1}
                            >
                              <UiIcon type="chevron-left" className="h-4 w-4" />
                            </PaginationButton>

                            <span className="text-sm font-semibold text-slate-700">
                              Page {currentPage} of {totalPages}
                            </span>

                            <PaginationButton
                              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                              disabled={currentPage === totalPages}
                            >
                              <UiIcon type="chevron-right" className="h-4 w-4" />
                            </PaginationButton>
                          </div>
                        ) : null}

                        <label className="flex items-center justify-between gap-3 text-sm text-slate-600">
                          <span>Show per page</span>
                          <span className="relative inline-flex items-center rounded-xl border border-[#dfe7f6] bg-white px-3 py-2">
                            <select
                              value={pageSize}
                              onChange={(event) => setPageSize(Number(event.target.value))}
                              className="appearance-none bg-transparent pr-6 font-semibold text-slate-700 outline-none"
                            >
                              {[8, 12, 16].map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <span className="pointer-events-none absolute right-3 text-slate-400">
                              <UiIcon type="chevron-down" className="h-4 w-4" />
                            </span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="hidden overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:block">
                    <div className="min-w-[1220px]">
                      <table className="min-w-full text-left">
                        <thead className="bg-[#fbfcff] text-sm text-slate-500">
                          <tr>
                            <th className="px-6 py-4 font-bold">Year</th>
                            <th className="px-6 py-4 font-bold">Paper / Exam</th>
                            <th className="px-6 py-4 font-bold">Exam Pattern</th>
                            <th className="px-6 py-4 font-bold">Questions</th>
                            <th className="px-6 py-4 font-bold">Pattern Signals</th>
                            <th className="px-6 py-4 font-bold">Solutions</th>
                            <th className="px-6 py-4 font-bold">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedPapers.map((paper, index) => {
                            const hasSolutions = paper.solvedCount > 0;
                            const hasPaperAccess = hasSolutions || paper.isOfficialPdf;
                            const solutionHref = buildSolutionHref(paper, activeFilters, search);

                            return (
                              <tr
                                key={paper.id}
                                className={
                                  index === paginatedPapers.length - 1
                                    ? ""
                                    : "border-b border-[#edf1f8]"
                                }
                              >
                                <td className="px-6 py-5 align-top">
                                  <span className="text-lg font-bold text-portal-600">
                                    {paper.year}
                                  </span>
                                </td>
                                <td className="px-6 py-5 align-top">
                                  <p className="text-base font-semibold text-slate-900">
                                    {getPaperTitle(paper)}
                                  </p>
                                  <p className="mt-1 text-sm text-slate-500">
                                    {getPaperContextLabel(paper)}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-500">
                                    {getQuestionCountLabel(paper)}
                                  </p>
                                </td>
                                <td className="px-6 py-5 align-top">
                                  <p className="text-sm font-semibold text-slate-700">
                                    {paper.paperType}
                                  </p>
                                </td>
                                <td className="px-6 py-5 align-top">
                                  <p className="text-sm font-bold text-slate-900">
                                    {paper.questionCount || (paper.isOfficialPdf ? "PDF" : "Pending")}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-500">
                                    {getPaperScopeLabel(paper)}
                                  </p>
                                </td>
                                <td className="px-6 py-5 align-top">
                                  <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
                                      {paper.repeatedCount} repeated
                                    </span>
                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                      {paper.importantCount} important
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-5 align-top">
                                  <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                      hasPaperAccess
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-slate-100 text-slate-600"
                                    }`}
                                  >
                                    {getSolutionStatusLabel(paper)}
                                  </span>
                                </td>
                                <td className="px-6 py-5 align-top">
                                  <div className="flex items-center gap-3">
                                    <Link
                                      href={solutionHref}
                                      className="inline-flex items-center gap-2 rounded-xl bg-portal-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-portal-800"
                                    >
                                      <UiIcon type="eye" className="h-4 w-4" />
                                      View Solution
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <div className="border-t border-[#edf1f8] px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm text-slate-600">
                            Showing {pageStart} to {pageEnd} of {visiblePapers.length} papers
                          </p>

                          <div className="flex items-center gap-6">
                            {totalPages > 1 ? (
                              <div className="flex items-center gap-2">
                                <PaginationButton
                                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                  disabled={currentPage === 1}
                                >
                                  <UiIcon type="chevron-left" className="h-4 w-4" />
                                </PaginationButton>

                                {paginationItems.map((item) =>
                                  typeof item === "number" ? (
                                    <PaginationButton
                                      key={item}
                                      active={item === currentPage}
                                      onClick={() => setCurrentPage(item)}
                                    >
                                      {item}
                                    </PaginationButton>
                                  ) : (
                                    <span key={item} className="px-1 text-slate-400">
                                      ...
                                    </span>
                                  )
                                )}

                                <PaginationButton
                                  onClick={() =>
                                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                                  }
                                  disabled={currentPage === totalPages}
                                >
                                  <UiIcon type="chevron-right" className="h-4 w-4" />
                                </PaginationButton>
                              </div>
                            ) : null}

                            <label className="flex items-center gap-3 text-sm text-slate-600">
                              <span>Show</span>
                              <span className="relative inline-flex items-center rounded-xl border border-[#dfe7f6] bg-white px-3 py-2">
                                <select
                                  value={pageSize}
                                  onChange={(event) => setPageSize(Number(event.target.value))}
                                  className="appearance-none bg-transparent pr-6 font-semibold text-slate-700 outline-none"
                                >
                                  {[8, 12, 16].map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                <span className="pointer-events-none absolute right-3 text-slate-400">
                                  <UiIcon type="chevron-down" className="h-4 w-4" />
                                </span>
                              </span>
                              <span>per page</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-5 sm:p-6">
                  <EmptyState
                    title="No paper sets match the current filters"
                    message="Reset the filters or widen the selection to bring more previous papers back."
                  />
                </div>
              )}
            </section>

            <section
              id="disclaimer"
              className="rounded-[20px] border border-[#f5dfae] bg-[#fffaf0] px-4 py-4 sm:px-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#f59f0b]">
                  <UiIcon type="bulb" className="h-5 w-5" />
                </span>
                <p className="text-sm leading-7 text-slate-700">
                  <span className="font-semibold text-slate-900">Disclaimer:</span> All papers are
                  provided for educational purposes only. Please refer to the official website for
                  latest notifications, syllabus updates, and other official information.
                </p>
              </div>
            </section>
          </div>
        </section>

        {hasQuestionBankSelection ? (
          <section className="rounded-[28px] border border-[#e2e9f7] bg-white p-5 shadow-[0_18px_60px_rgba(17,43,92,0.06)] sm:p-6">
            <div className="flex flex-col gap-4 border-b border-[#e9eef8] pb-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <h2
                  id="question-bank"
                  className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
                >
                  Question Bank
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {formatCurrentSelection(activeFilters)}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-600 xl:justify-end">
                <span>{visibleQuestions.length} questions in view</span>
                <span>{solvedCount} with explanations</span>
              </div>
            </div>

            <div className="mt-6">
              {loadError ? (
                <EmptyState title="Unable to load previous year questions" message={loadError} />
              ) : loading ? (
                <EmptyState
                  title="Loading previous year questions"
                  message="Fetching solved questions from your current data source."
                />
              ) : visibleQuestions.length ? (
                <div className="grid gap-4">
                  {visibleQuestions.map((question) => (
                    <PreviousYearQuestionCard key={question._id} question={question} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No previous year questions found"
                  message="Adjust the filters or search term to bring relevant solved questions back into view."
                />
              )}
            </div>
          </section>
        ) : null}
      </div>
    </Layout>
  );
}
