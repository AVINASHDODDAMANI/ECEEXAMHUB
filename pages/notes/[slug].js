import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import NetworkTheoryDiagram from "../../components/NetworkTheoryDiagram";
import { subjectDirectory } from "../../data/subject-directory";
import seedQuestions from "../../data/questions";
import {
  getSubjectSlug,
  subjectTheoryKnowledge,
  subjectTheoryRoadmaps,
} from "../../data/subject-theory-roadmaps";
import { getLearningSubject } from "../../lib/learning-utils";
import { useLearningProgress } from "../../lib/use-learning-progress";
import {
  buildSubjectFaqs,
  generateCanonical,
  generateDescription,
  generateKeywords,
  generateStructuredData,
  generateTitle,
  getNotesPagePathByLearningSlug,
  getSubjectRelatedLinks,
  getSubjectPagePathByLearningSlug,
} from "../../lib/seo";

const SUBJECT_TO_LEARNING_SLUG = {
  "Network Analysis": "networks",
  "Analog Electronics": "analog",
  "Digital Electronics": "digital",
  "Signals and Systems": "signals",
  "Communication Systems": "communications",
  "Control Systems": "control-systems",
};

const DEDICATED_NOTE_SLUGS = new Set([
  "network-analysis",
  "digital-electronics",
]);

const CHAPTER_META = {
  "Network Analysis": {
    subtitle: "The foundation of all electrical and electronic circuits",
    estimatedTime: "8-10 Hours",
    difficulty: "Medium",
    level: "Beginner to Advanced",
    keyConcepts: [
      "Circuit Elements",
      "Sources",
      "Voltage & Current",
      "Power & Energy",
      "Network Topologies",
    ],
    examFocus: [
      "KCL and KVL",
      "Nodal and Mesh Analysis",
      "Thevenin and Norton Theorem",
      "Superposition Theorem",
      "AC Circuit Analysis",
    ],
    applications: [
      {
        title: "Power Systems",
        detail: "Load flow, fault analysis, and practical network balancing.",
      },
      {
        title: "Electronics",
        detail: "Amplifiers, filters, oscillators, and bias-network understanding.",
      },
      {
        title: "Communication Systems",
        detail: "Resonant circuits, matching sections, and receiver front ends.",
      },
      {
        title: "Control Systems",
        detail: "Feedback circuits and dynamic electrical system modeling.",
      },
      {
        title: "Electrical Machines",
        detail: "Equivalent circuits for motors, transformers, and generators.",
      },
    ],
    quickActions: [
      { label: "Practice MCQs", href: "/mcqs/network-analysis" },
      { label: "Previous Papers", href: "/previous-year" },
      { label: "Formula Sheet", href: "/learn?search=formula%20network" },
      { label: "Open Learning Topics", href: "/learn?search=network" },
    ],
    studyTip:
      "Start from basics and follow the roadmap in order. Practice regularly and keep one formula plus mistakes sheet for revision.",
  },
};

const TAB_OPTIONS = [
  { id: "theory", label: "Theory" },
  { id: "why", label: "Why Important?" },
  { id: "study", label: "What We Will Study" },
  { id: "use", label: "Real-Life Use" },
];

function buildNotesSeo(subject, theoryKnowledge, seoOverride = null) {
  const relatedLinks = getSubjectRelatedLinks(subject.title);
  const topicNames =
    theoryKnowledge?.concepts?.map((concept) => concept.shortTitle || concept.title) ||
    relatedLinks.map((item) => item.title);
  const faqItems = buildSubjectFaqs(subject.title, topicNames);
  const defaultTitle = generateTitle({ type: "notes", subjectName: subject.title });
  const defaultDescription = generateDescription({
    type: "notes",
    subjectName: subject.title,
    topics: topicNames,
  });
  const title = seoOverride?.title || defaultTitle;
  const description = seoOverride?.description || defaultDescription;
  const keywords = generateKeywords({
    subjectName: subject.title,
    topicNames,
    extraKeywords: ["quick notes", "handwritten notes", "chapter wise notes", "exam revision"],
  });
  const canonicalUrl = generateCanonical(`/notes/${getSubjectSlug(subject.title)}`);
  const structuredData = generateStructuredData({
    type: "notes",
    title: `${subject.title} Quick Notes`,
    description,
    path: `/notes/${getSubjectSlug(subject.title)}`,
    subjectName: subject.title,
    keywords,
    about: topicNames,
    breadcrumbItems: [
      { name: "Home", item: "/" },
      { name: "Quick Notes", item: "/notes" },
      { name: subject.title, item: `/notes/${getSubjectSlug(subject.title)}` },
    ],
    faqItems,
  });
  const searchIntents = [
    `${subject.title} quick notes`,
    `${subject.title} notes`,
    `${subject.title} handwritten notes`,
    `${subject.title} gate ece notes`,
    `${subject.title} formulas`,
    `${subject.title} important questions`,
    `${subject.title} revision notes`,
  ];

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    structuredData,
    faqItems,
    relatedLinks,
    searchIntents,
  };
}

function NotesTopicIcon() {
  return (
    <span className="flex h-20 w-20 flex-none items-center justify-center rounded-[24px] bg-[linear-gradient(180deg,#0f3270,#154a96)] text-white shadow-[0_18px_40px_rgba(15,50,112,0.28)]">
      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16M4 17h16M7 4v16M17 4v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="7" cy="7" r="1.6" fill="currentColor" />
        <circle cx="17" cy="7" r="1.6" fill="currentColor" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        <circle cx="7" cy="17" r="1.6" fill="currentColor" />
        <circle cx="17" cy="17" r="1.6" fill="currentColor" />
      </svg>
    </span>
  );
}

function HeroMetric({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-1.5 text-sm font-bold text-slate-900 sm:text-base">{value}</p>
    </div>
  );
}

function SidebarCard({ title, children }) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-portal-700">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function RoadmapItem({ item, index, isActive, status, onClick }) {
  const statusLabel =
    status === "completed" ? "Completed" : status === "in-progress" ? "In Progress" : "To Study";
  const statusClassName =
    status === "completed"
      ? "text-emerald-700"
      : status === "in-progress"
      ? "text-sky-700"
      : "text-slate-500";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
        isActive
          ? "border-portal-300 bg-portal-50 shadow-sm"
          : "border-transparent bg-slate-50 hover:border-slate-200 hover:bg-white"
      }`}
    >
      <div className="flex gap-3">
        <span
          className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs font-bold ${
            isActive ? "bg-portal-600 text-white" : "bg-white text-slate-700"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-5 text-slate-900">{item.shortTitle}</p>
          <p className={`mt-1 text-xs font-semibold ${statusClassName}`}>{statusLabel}</p>
        </div>
      </div>
    </button>
  );
}

function MobileRoadmap({ concepts, activeIndex, getStatus, setActiveIndex }) {
  return (
    <section className="mt-4 xl:hidden">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-portal-700">
          Learning Roadmap
        </h2>
        <span className="text-xs font-medium text-slate-500">
          {activeIndex + 1} / {concepts.length}
        </span>
      </div>
      <div className="-mx-3 overflow-x-auto px-3">
        <div className="flex min-w-max gap-3 pb-1">
          {concepts.map((concept, index) => (
            <button
              key={concept.slug}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`w-[210px] rounded-2xl border px-3 py-3 text-left ${
                index === activeIndex
                  ? "border-portal-300 bg-portal-50 shadow-sm"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs font-bold ${
                    index === activeIndex ? "bg-portal-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {getStatus(index) === "completed"
                    ? "Done"
                    : getStatus(index) === "in-progress"
                    ? "Now"
                    : "Next"}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-5 text-slate-900">
                {concept.shortTitle}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function TabButton({ option, activeTab, setActiveTab }) {
  return (
    <button
      type="button"
      onClick={() => setActiveTab(option.id)}
      className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
        activeTab === option.id
          ? "border-portal-600 bg-portal-600 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-portal-200 hover:text-portal-700"
      }`}
    >
      {option.label}
    </button>
  );
}

function FormulaPreview({ formulas = [] }) {
  return (
    <div className="grid gap-3">
      {formulas.map((formula) => (
        <div key={`${formula.label}-${formula.expression}`} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {formula.label}
          </p>
          <p className="mt-2 text-base font-bold text-slate-900">{formula.expression}</p>
        </div>
      ))}
    </div>
  );
}

function ChapterOutlineGrid({ concepts = [] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {concepts.map((concept, index) => (
        <div
          key={concept.slug}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
        >
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="mt-1 text-sm font-semibold leading-5 text-slate-900">
            {concept.shortTitle}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{concept.title}</p>
        </div>
      ))}
    </div>
  );
}

function FallbackNotesPage({ subject, steps, seoOverride }) {
  const seo = buildNotesSeo(subject, null, seoOverride);

  return (
    <Layout
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      canonicalUrl={seo.canonicalUrl}
      structuredData={seo.structuredData}
    >
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">
            /
          </span>
          <Link href="/notes" className="font-medium text-portal-600 transition hover:text-portal-700">
            Quick Notes
          </Link>
          <span className="text-slate-300" aria-hidden="true">
            /
          </span>
          <span className="font-medium text-slate-700">{subject.title}</span>
        </div>

        <section className="rounded-xl border border-portal-200 bg-white p-5 shadow-portal sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
            Quick notes
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {subject.title}
          </h1>
        </section>

        <section className="mt-5 grid gap-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-portal-300 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="flex gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-portal-600 text-sm font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-slate-900">{step.title}</h2>
                  <div className="mt-3 grid gap-2">
                    {step.points.map((point) => (
                      <p
                        key={`${step.title}-${point}`}
                        className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium leading-6 text-slate-800"
                      >
                        {point}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </Layout>
  );
}

export default function NoteTopicPage({
  subject,
  steps,
  theoryKnowledge,
  learningMeta,
  seoOverride,
}) {
  const seo = buildNotesSeo(subject, theoryKnowledge, seoOverride);
  const chapterMeta = CHAPTER_META[subject.title];
  const { progressStats, isReady } = useLearningProgress();
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("theory");
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareLabel, setShareLabel] = useState("Share");

  useEffect(() => {
    setActiveTab("theory");
  }, [activeConceptIndex]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const favoriteKey = `eceexamhub-favorite-${subject.title}`;
    setIsFavorite(window.localStorage.getItem(favoriteKey) === "true");
  }, [subject.title]);

  if (!theoryKnowledge || !chapterMeta) {
    return <FallbackNotesPage subject={subject} steps={steps} seoOverride={seoOverride} />;
  }

  const concepts = theoryKnowledge.concepts || [];
  const activeConcept = concepts[activeConceptIndex] || concepts[0];
  const allFormulas = concepts.flatMap((concept) => concept.formulas || []);
  const formulaPreview = allFormulas.slice(0, 4);
  const conceptCount = concepts.length;
  const formulaCount = allFormulas.length;
  const subjectProgress = progressStats.subjects.find(
    (item) => item.slug === learningMeta.learningSubjectSlug
  );
  const featuredLearningTopics = (learningMeta.learningTopics || []).slice(0, 6);
  const subjectHubHref = getSubjectPagePathByLearningSlug(learningMeta.learningSubjectSlug);
  const subjectNotesHref = getNotesPagePathByLearningSlug(learningMeta.learningSubjectSlug);
  const completedTopics = subjectProgress?.completedTopics || 0;
  const readyTopics = subjectProgress?.totalTopics || learningMeta.readyTopics || 0;
  const completionPercent = subjectProgress?.completionPercent || 0;
  const actionLabel = completionPercent > 0 ? "Continue Learning" : "Start Learning";

  function getRoadmapStatus(index) {
    if (index === 0 && activeConceptIndex === 0) {
      return "completed";
    }

    if (index < activeConceptIndex) {
      return "completed";
    }

    if (index === activeConceptIndex) {
      return "in-progress";
    }

    return "locked";
  }

  function toggleFavorite() {
    if (typeof window === "undefined") {
      return;
    }

    const favoriteKey = `eceexamhub-favorite-${subject.title}`;
    const nextValue = !isFavorite;
    setIsFavorite(nextValue);
    window.localStorage.setItem(favoriteKey, String(nextValue));
  }

  function downloadNotes() {
    if (typeof window === "undefined") {
      return;
    }

    window.print();
  }

  async function shareNotes() {
    if (typeof window === "undefined") {
      return;
    }

    const shareData = {
      title: `${subject.title} Quick Notes`,
      text: `Read ${subject.title} quick notes on ECE Exam Guide`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareLabel("Link Copied");
      window.setTimeout(() => setShareLabel("Share"), 1800);
    } catch {
      setShareLabel("Copy Failed");
      window.setTimeout(() => setShareLabel("Share"), 1800);
    }
  }

  function renderTheoryTab() {
    return (
      <div className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <div>
          <h3 className="text-2xl font-bold text-portal-700">{activeConcept.title}</h3>
          <div className="mt-4 grid gap-3">
            {activeConcept.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-7 text-slate-700 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4">
            <p className="text-sm font-bold text-emerald-800">In Simple Words</p>
            <p className="mt-2 text-sm leading-7 text-emerald-900">{activeConcept.summary}</p>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff,#eff5ff)] p-4">
          <div className="overflow-hidden rounded-2xl border border-white/80 bg-white">
            <NetworkTheoryDiagram type={activeConcept.diagram} />
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{activeConcept.diagramNote}</p>
        </div>
      </div>
    );
  }

  function renderWhyTab() {
    const importanceCards = [
      {
        title: "Foundation",
        detail: activeConcept.summary,
      },
      {
        title: "Problem Solving",
        detail:
          activeConcept.learnPoints[0] ||
          "This idea improves how you approach and solve circuit problems step by step.",
      },
      {
        title: "Advanced Link",
        detail:
          activeConcept.learnPoints[1] ||
          "This concept connects directly to later circuit and systems subjects.",
      },
      {
        title: "Exam Value",
        detail:
          activeConcept.formulas?.length
            ? `Key formulas and concepts from ${activeConcept.shortTitle} appear in direct and numerical questions.`
            : `${activeConcept.shortTitle} strengthens conceptual and analytical accuracy in exams.`,
      },
    ];

    return (
      <div>
        <h3 className="text-xl font-bold text-slate-900">
          Why is {activeConcept.shortTitle} important?
        </h3>
        <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
          This concept matters because it improves both your circuit intuition and your ability
          to solve numerical questions with confidence.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {importanceCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
            >
              <p className="text-sm font-bold text-slate-900">{card.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.detail}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderStudyTab() {
    return (
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            What we will study in {activeConcept.shortTitle}
          </h3>
          <div className="mt-4 grid gap-2">
            {activeConcept.learnPoints.map((point) => (
              <div
                key={`${activeConcept.slug}-${point}`}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm leading-6 text-slate-700"
              >
                {point}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900">Formula and relation preview</h3>
          <div className="mt-4 grid gap-3">
            {activeConcept.formulas.map((formula) => (
              <div
                key={`${formula.label}-${formula.expression}`}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {formula.label}
                </p>
                <p className="mt-2 text-base font-bold text-slate-900">{formula.expression}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{formula.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderUseTab() {
    return (
      <div>
        <h3 className="text-xl font-bold text-slate-900">
          Where is {activeConcept.shortTitle} used?
        </h3>
        <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
          The chapter is not only for exams. These ideas are used across power, electronics,
          communication, control, and machine-related circuits.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {chapterMeta.applications.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
            >
              <p className="text-sm font-bold text-slate-900">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderActiveTab() {
    if (activeTab === "why") {
      return renderWhyTab();
    }

    if (activeTab === "study") {
      return renderStudyTab();
    }

    if (activeTab === "use") {
      return renderUseTab();
    }

    return renderTheoryTab();
  }

  return (
    <Layout
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      canonicalUrl={seo.canonicalUrl}
      structuredData={seo.structuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1500px] pb-24 xl:pb-0">
        <div className="mb-5 flex flex-wrap items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">
            /
          </span>
          <Link href="/notes" className="font-medium text-portal-600 transition hover:text-portal-700">
            Quick Notes
          </Link>
          <span className="text-slate-300" aria-hidden="true">
            /
          </span>
          <span className="font-medium text-slate-700">{subject.title}</span>
        </div>

        <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-6">
          <div className="grid gap-5 xl:grid-cols-[1.28fr_0.86fr]">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <NotesTopicIcon />
              <div className="min-w-0 flex-1">
                <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-portal-700">
                  Step-By-Step Theory
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {subject.title}
                </h1>
                <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                  {chapterMeta.subtitle}
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <HeroMetric label="Estimated Time" value={chapterMeta.estimatedTime} />
                  <HeroMetric label="Difficulty" value={chapterMeta.difficulty} />
                  <HeroMetric label="Topics" value={`${conceptCount} Core Concepts`} />
                  <HeroMetric label="Level" value={chapterMeta.level} />
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-slate-900">Your Progress</h2>
                  <span className="text-sm font-semibold text-slate-500">
                    {isReady ? `${completionPercent}% Completed` : "Loading..."}
                  </span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-portal-600 transition-all"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-medium text-slate-600">
                    {completedTopics} / {readyTopics} ready topics completed
                  </p>
                  <Link
                    href={learningMeta.continueHref || subject.href}
                    className="inline-flex justify-center rounded-xl bg-portal-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-portal-700"
                  >
                    {actionLabel}
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={toggleFavorite}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    isFavorite
                      ? "border-amber-300 bg-amber-50 text-amber-800"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {isFavorite ? "Favorited" : "Mark as Favorite"}
                </button>
                <button
                  type="button"
                  onClick={downloadNotes}
                  className="rounded-xl border border-portal-200 bg-white px-4 py-3 text-sm font-semibold text-portal-700 transition hover:bg-portal-50"
                >
                  Download Quick Notes PDF
                </button>
              </div>
            </div>
          </div>
        </section>

        {subject.title === "Network Analysis" ? (
          <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Network Analysis Quick Notes
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                Download Network Analysis quick notes, formulas, important questions, and previous
                year paper support for ECE students. This page is designed for quick revision
                as well as concept building, so you can move from basic circuit laws to
                systematic problem solving without depending only on short formula lists.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                Network Analysis is one of the most important foundation subjects in ECE
                because it teaches how to read a circuit, choose the right method, and solve
                it with confidence. Once nodal equations, mesh equations, source
                transformations, and equivalent theorems become clear, later subjects like
                analog electronics, control systems, and communication circuits also become
                easier to understand.
              </p>

              <h3 className="mt-6 text-xl font-bold text-slate-900">Topics Covered</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
                These quick notes focus on the high-value topics that usually appear in university
                exams, GATE ECE revision, and practice sets for circuit problem solving.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>
                  <strong>Nodal Analysis:</strong> learn how to choose a reference node and
                  write KCL-based equations cleanly.
                </li>
                <li>
                  <strong>Mesh Analysis:</strong> solve planar circuits step by step using loop
                  currents and KVL relations.
                </li>
                <li>
                  <strong>Thevenin Theorem:</strong> reduce a complex linear network into an
                  equivalent voltage source and resistance.
                </li>
                <li>
                  <strong>Norton Theorem:</strong> convert circuit networks into an equivalent
                  current source form for faster analysis.
                </li>
              </ul>
            </div>
          </section>
        ) : null}

        <MobileRoadmap
          concepts={concepts}
          activeIndex={activeConceptIndex}
          getStatus={getRoadmapStatus}
          setActiveIndex={setActiveConceptIndex}
        />

        <section className="mt-5 grid gap-5 xl:grid-cols-[270px_minmax(0,1fr)_290px]">
          <aside className="hidden xl:block">
            <div className="xl:sticky xl:top-24">
              <SidebarCard title="Learning Roadmap">
                <p className="text-sm leading-6 text-slate-600">
                  Follow the path to master this chapter.
                </p>
                <div className="mt-4 grid gap-2">
                  {concepts.map((concept, index) => (
                    <RoadmapItem
                      key={concept.slug}
                      item={concept}
                      index={index}
                      isActive={index === activeConceptIndex}
                      status={getRoadmapStatus(index)}
                      onClick={() => setActiveConceptIndex(index)}
                    />
                  ))}
                </div>
              </SidebarCard>

              <div className="mt-4 grid gap-4">
                <SidebarCard title="Exam Focus">
                  <div className="grid gap-2">
                    {chapterMeta.examFocus.map((item) => (
                      <p
                        key={item}
                        className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm font-medium text-slate-700"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </SidebarCard>

                <SidebarCard title="Quick Actions">
                  <div className="grid gap-2">
                    {chapterMeta.quickActions.map((action) => (
                      <Link
                        key={action.label}
                        href={action.href}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
                      >
                        <span>{action.label}</span>
                        <span aria-hidden="true">›</span>
                      </Link>
                    ))}
                  </div>
                </SidebarCard>
              </div>
            </div>
          </aside>

          <main>
            <section className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-emerald-500 text-sm font-bold text-white">
                      {activeConceptIndex + 1}
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        {activeConcept.title}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {activeConcept.summary}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                      getRoadmapStatus(activeConceptIndex) === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    {getRoadmapStatus(activeConceptIndex) === "completed"
                      ? "Completed"
                      : "In Progress"}
                  </span>
                </div>

                <div className="-mx-1 overflow-x-auto px-1">
                  <div className="flex min-w-max gap-2">
                    {TAB_OPTIONS.map((option) => (
                      <TabButton
                        key={option.id}
                        option={option}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5">{renderActiveTab()}</div>
            </section>

            <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                What We Will Study in This Chapter
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                This chapter is divided into {conceptCount} core concepts that build from basic
                circuit quantities to advanced network behavior.
              </p>

              <div className="mt-5">
                <ChapterOutlineGrid concepts={concepts} />
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4">
                <p className="text-sm font-bold text-emerald-800">Learning Outcome</p>
                <p className="mt-2 text-sm leading-7 text-emerald-900">
                  By the end of this chapter, you will be able to analyze electrical networks
                  using circuit laws, systematic methods, equivalent circuits, AC concepts, and
                  transient reasoning with more confidence.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setActiveConceptIndex((currentValue) => Math.max(currentValue - 1, 0))}
                  disabled={activeConceptIndex === 0}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveConceptIndex((currentValue) =>
                      Math.min(currentValue + 1, concepts.length - 1)
                    )
                  }
                  disabled={activeConceptIndex === concepts.length - 1}
                  className="rounded-xl bg-portal-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-portal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {activeConceptIndex === concepts.length - 1
                    ? "Last Concept"
                    : `Next: ${concepts[activeConceptIndex + 1]?.shortTitle}`}
                </button>
              </div>
            </section>
          </main>

          <aside>
            <div className="grid gap-4 xl:sticky xl:top-24">
              <SidebarCard title="Key Concepts">
                <div className="grid gap-2">
                  {chapterMeta.keyConcepts.map((concept) => (
                    <p
                      key={concept}
                      className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm font-medium text-slate-700"
                    >
                      {concept}
                    </p>
                  ))}
                </div>
              </SidebarCard>

              <SidebarCard title="Formula Preview">
                <FormulaPreview formulas={formulaPreview} />
              </SidebarCard>

              <SidebarCard title="Chapter Stats">
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                    <p className="text-sm font-bold text-slate-900">{conceptCount}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
                      Detailed Concepts
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                    <p className="text-sm font-bold text-slate-900">{formulaCount}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
                      Core Formulas
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                    <p className="text-sm font-bold text-slate-900">{learningMeta.readyTopics}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
                      Ready Quick Notes
                    </p>
                  </div>
                </div>
              </SidebarCard>

              <SidebarCard title="Study Tip">
                <p className="text-sm leading-7 text-slate-700">{chapterMeta.studyTip}</p>
              </SidebarCard>
            </div>
          </aside>
        </section>

        <section className="mt-6 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Related {subject.title} Topics
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
            Use these internal links to move from general {subject.title.toLowerCase()} quick notes
            into exam-focused topics and explanations.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {seo.relatedLinks.map((item) => (
              <Link
                key={`${item.href}-${item.title}`}
                href={item.href}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition hover:border-portal-200 hover:bg-portal-50"
              >
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                {item.summary ? (
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                ) : null}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Continue With {subject.title}
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
            These links connect your quick notes page to the main subject hub and the most
            important learning topics, making it easier for both students and search
            engines to navigate the full {subject.title.toLowerCase()} preparation path.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              {
                title: `${subject.title} Notes Hub`,
                description: "Open the roadmap, chapter sequence, and subject-level preparation guidance.",
                href: subjectHubHref,
                badge: "Subject",
              },
              {
                title: `${subject.title} Quick Notes Home`,
                description: "Stay on the full quick notes path for this subject and revise it chapter by chapter.",
                href: subjectNotesHref,
                badge: "Quick Notes",
              },
              {
                title: `${subject.title} Search`,
                description: "Find connected formulas, theory pages, and related study material across the site.",
                href: `/search?q=${encodeURIComponent(subject.title)}`,
                badge: "Search",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition hover:-translate-y-0.5 hover:border-portal-300 hover:bg-white hover:shadow-sm"
              >
                <span className="rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[11px] font-bold text-portal-700">
                  {item.badge}
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </Link>
            ))}
          </div>

          {featuredLearningTopics.length ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {featuredLearningTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={topic.href}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-portal-200 hover:bg-portal-50"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-portal-700">
                    {topic.chapterTitle}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-slate-900">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{topic.summary}</p>
                </Link>
              ))}
            </div>
          ) : null}
        </section>

        <section className="mt-6 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            High-Intent {subject.title} Searches
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
            These are the common search phrases students use when looking for {subject.title.toLowerCase()}
            quick notes, revision material, and exam-focused study help.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {seo.searchIntents.map((item) => (
              <Link
                key={item}
                href={`/search?q=${encodeURIComponent(item)}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-portal-300 hover:bg-white hover:text-portal-700"
              >
                {item}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {subject.title} Quick Notes FAQ
          </h2>
          <div className="mt-5 grid gap-3">
            {seo.faqItems.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
              >
                <summary className="cursor-pointer text-sm font-bold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-3 left-3 right-3 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur xl:hidden">
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Roadmap
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("study")}
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Formulas
          </button>
          <Link
            href="/mcqs/network-analysis"
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Practice
          </Link>
          <button
            type="button"
            onClick={downloadNotes}
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            PDF
          </button>
        </div>
      </div>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: subjectDirectory
      .map((subject) => getSubjectSlug(subject.title))
      .filter((slug) => !DEDICATED_NOTE_SLUGS.has(slug))
      .map((slug) => ({
        params: { slug },
      })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const subject = subjectDirectory.find(
    (item) => getSubjectSlug(item.title) === params.slug
  );
  const theoryKnowledge = subjectTheoryKnowledge[subject.title] || null;
  const learningSubjectSlug = SUBJECT_TO_LEARNING_SLUG[subject.title] || "";
  const learningSubject = learningSubjectSlug ? getLearningSubject(learningSubjectSlug) : null;
  const learningTopics = learningSubject
    ? learningSubject.chapters.flatMap((chapter) =>
        chapter.topics.map((topic) => ({
          ...topic,
          href: `/learn/${learningSubjectSlug}/${topic.slug}`,
        }))
      )
    : [];
  const readyTopics = learningTopics.filter((topic) => topic.status === "ready");

  return {
    props: {
      subject,
      steps: subjectTheoryRoadmaps[subject.title] || [],
      theoryKnowledge,
      learningMeta: {
        learningSubjectSlug,
        totalTopics: learningTopics.length,
        readyTopics: readyTopics.length,
        continueHref: readyTopics[0]?.href || subject.href,
        learningTopics: readyTopics,
        questionCount: seedQuestions.filter((question) => question.subject === "Networks").length,
      },
    },
    revalidate: 86400,
  };
}
