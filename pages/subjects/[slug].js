import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import NetworkTheoryDiagram from "../../components/NetworkTheoryDiagram";
import { subjectDirectory } from "../../data/subject-directory";
import {
  getSubjectSlug,
  subjectTheoryKnowledge,
  subjectTheoryRoadmaps,
} from "../../data/subject-theory-roadmaps";
import { getLearningSubject } from "../../lib/learning-utils";
import { useLearningProgress } from "../../lib/use-learning-progress";

const SUBJECT_TO_LEARNING_SLUG = {
  "Network Analysis": "networks",
  "Analog Electronics": "analog",
  "Digital Electronics": "digital",
  "Signals and Systems": "signals",
  "Communication Systems": "communications",
  "Control Systems": "control-systems",
};

const SUBJECT_META = {
  "Network Analysis": {
    subtitle: "The chapter that teaches how electrical circuits are understood, simplified, and solved.",
    estimatedTime: "8-10 Hours",
    difficulty: "Medium",
    level: "Beginner to Advanced",
    keyConcepts: [
      "Circuit Variables",
      "KCL and KVL",
      "Nodal and Mesh Analysis",
      "Network Theorems",
      "Two-Port Networks",
      "AC and Transients",
    ],
    examFocus: [
      "Circuit variables and sign convention",
      "KCL, KVL, nodal, and mesh analysis",
      "Thevenin, Norton, and superposition",
      "Resonance and first-order transients",
    ],
    studyTip:
      "Start from circuit variables and laws, then move to solving methods, theorems, AC analysis, and transient response in that order.",
  },
};

const NETWORK_ANALYSIS_TOPIC_GROUPS = [
  {
    title: "Basic Concepts",
    topics: [
      "Electric charge, current, voltage",
      "Power and energy",
      "Passive vs active elements",
      "Linear and non-linear elements",
      "Bilateral and unilateral elements",
    ],
  },
  {
    title: "Circuit Elements",
    topics: [
      "Resistors, capacitors, inductors",
      "Independent and dependent sources",
      "Source transformation",
    ],
  },
  {
    title: "Circuit Laws",
    topics: ["Ohm's Law", "Kirchhoff's Current Law (KCL)", "Kirchhoff's Voltage Law (KVL)"],
  },
  {
    title: "Network Theorems",
    topics: [
      "Superposition Theorem",
      "Thevenin's Theorem",
      "Norton's Theorem",
      "Maximum Power Transfer Theorem",
      "Reciprocity Theorem",
      "Millman's Theorem",
      "Compensation Theorem",
    ],
  },
  {
    title: "DC Circuit Analysis",
    topics: [
      "Series and parallel circuits",
      "Mesh analysis",
      "Nodal analysis",
      "Star-Delta (Y-Delta) transformation",
    ],
  },
  {
    title: "AC Fundamentals",
    topics: ["Sinusoidal signals", "Phase and phasors", "RMS, average values", "Complex impedance"],
  },
  {
    title: "AC Circuit Analysis",
    topics: [
      "RL, RC, RLC circuits",
      "Series and parallel resonance",
      "Power in AC circuits: real, reactive, apparent",
      "Power factor",
    ],
  },
  {
    title: "Transient Analysis",
    topics: [
      "First-order circuits: RC, RL",
      "Second-order circuits: RLC",
      "Natural and forced response",
      "Time constants",
    ],
  },
  {
    title: "Network Topology",
    topics: ["Graph theory basics", "Trees, branches, nodes, loops", "Tie-set and cut-set matrices"],
  },
  {
    title: "Laplace Transform Methods",
    topics: [
      "Laplace transform basics",
      "Circuit analysis using Laplace",
      "Transfer function",
      "Initial and final value theorems",
    ],
  },
  {
    title: "Frequency Domain Analysis",
    topics: ["Frequency response", "Bode plots", "Resonance and bandwidth"],
  },
  {
    title: "Two-Port Networks",
    topics: ["Z, Y, h, ABCD parameters", "Interconnections of two-port networks"],
  },
  {
    title: "Filters",
    topics: [
      "Low-pass and high-pass filters",
      "Band-pass and band-stop filters",
      "Active and passive filters",
    ],
  },
  {
    title: "Network Functions",
    topics: ["Poles and zeros", "Stability", "Transfer function behavior"],
  },
  {
    title: "Advanced Topics",
    topics: ["Fourier series and transforms", "Network synthesis", "State-space analysis"],
  },
];

function SubjectTheoryIcon() {
  return (
    <span className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#0f3270,#154a96)] text-white shadow-[0_14px_30px_rgba(15,50,112,0.24)]">
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 7h16M4 17h16M7 4v16M17 4v16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
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
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-xs font-bold text-slate-900 sm:text-sm">{value}</p>
    </div>
  );
}

function SidebarCard({ title, children }) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-portal-700">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function OverviewRow({ item }) {
  return (
    <article className="py-5 first:pt-0 last:pb-0">
      <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
        {item.title}
      </h2>

      {item.description ? (
        <p className="mt-2 text-base leading-8 text-slate-700">{item.description}</p>
      ) : null}
      {item.points?.length ? (
        <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-700 sm:grid-cols-2 sm:text-base">
          {item.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span className="mt-3 h-2 w-2 flex-none rounded-full bg-portal-600" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function ConceptRoadmapItem({ concept, index, isActive, status, onClick }) {
  const statusLabel =
    status === "current" ? "Current" : status === "review" ? "Review" : "Next";

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
          className={`flex h-9 w-9 flex-none items-center justify-center rounded-full text-xs font-bold ${
            isActive ? "bg-portal-600 text-white" : "bg-white text-slate-700"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-5 text-slate-900">{concept.shortTitle}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            {statusLabel}
          </p>
        </div>
      </div>
    </button>
  );
}

function NetworkTopicList({ compact = false }) {
  return (
    <div className={compact ? "grid gap-3" : "grid gap-3"}>
      {NETWORK_ANALYSIS_TOPIC_GROUPS.map((group, index) => (
        <section key={group.title} className="border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
          <h3 className="text-xs font-bold leading-5 text-slate-900">
            {index + 1}. {group.title}
          </h3>
          <ul className="mt-1.5 grid gap-1 text-xs leading-5 text-slate-600">
            {group.topics.map((topic) => (
              <li key={`${group.title}-${topic}`} className="flex gap-2">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-portal-500" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function MobileConceptRoadmap({ concepts, activeIndex, setActiveIndex }) {
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

  function selectConcept(index) {
    setActiveIndex(index);
    setIsRoadmapOpen(false);
  }

  return (
    <section id="subject-roadmap" className="mt-5 scroll-mt-40 xl:hidden">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setIsRoadmapOpen((currentValue) => !currentValue)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
          aria-expanded={isRoadmapOpen}
          aria-controls="mobile-concept-roadmap"
        >
          <span className="min-w-0">
            <span className="block text-sm font-bold text-slate-900">Learning Roadmap</span>
            <span className="mt-0.5 block truncate text-xs leading-5 text-slate-500">
              Complete Network Analysis topic list.
            </span>
          </span>
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-slate-200 text-portal-700">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 6h12M4 10h12M4 14h12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>

        {isRoadmapOpen ? (
          <div id="mobile-concept-roadmap" className="border-t border-slate-200 px-3 py-3">
            <NetworkTopicList compact />

          </div>
        ) : null}
      </div>
    </section>
  );
}

function FormulaPreview({ formulas = [] }) {
  if (!formulas.length) {
    return (
      <p className="text-sm leading-6 text-slate-600">
        Formula highlights for this concept will appear here.
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {formulas.map((formula) => (
        <div
          key={`${formula.label}-${formula.expression}`}
          className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {formula.label}
          </p>
          <p className="mt-2 text-base font-bold text-slate-900">{formula.expression}</p>
          {formula.note ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">{formula.note}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function StudyFlowCard({ step, index }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-white text-sm font-bold text-portal-700 shadow-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900">{step.title}</p>
          <div className="mt-3 grid gap-2">
            {step.points.map((point) => (
              <div
                key={`${step.title}-${point}`}
                className="rounded-xl border border-white/80 bg-white px-3 py-2 text-sm leading-6 text-slate-700"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function FallbackSubjectPage({ subject, steps, totalConcepts, subjectSummary }) {
  return (
    <>
      <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <SubjectTheoryIcon />
          <div className="min-w-0 flex-1">
            <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-portal-700">
              Subject Overview
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {subject.title}
            </h1>
            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
              {subjectSummary}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <HeroMetric label="Roadmap Modules" value={String(steps.length).padStart(2, "0")} />
              <HeroMetric label="Core Topics" value={String(totalConcepts).padStart(2, "0")} />
              <HeroMetric label="Learning View" value="Guided Subject" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              How To Study This Subject
            </h2>
            <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">
              Follow this order so the subject builds from basics to problem solving.
            </p>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
            {steps.length} modules
          </span>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {steps.map((step, index) => (
            <StudyFlowCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}

export default function SubjectTheoryPage({ subject, steps, learningMeta }) {
  const theoryKnowledge = subjectTheoryKnowledge[subject.title] || null;
  const chapterMeta = SUBJECT_META[subject.title] || null;
  const totalConcepts = steps.reduce((count, step) => count + step.points.length, 0);
  const subjectSummary =
    subject.description ||
    "A structured roadmap that moves from fundamentals to exam-level analysis and problem solving.";
  const notesHref = `/notes/${getSubjectSlug(subject.title)}`;
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const [quizSelections, setQuizSelections] = useState({});
  const { progressStats, isReady } = useLearningProgress();

  useEffect(() => {
    setActiveConceptIndex(0);
    setQuizSelections({});
  }, [subject.title]);

  if (!theoryKnowledge || !chapterMeta) {
    return (
      <Layout title={`ECE Exam Guide | ${subject.title}`} pageClassName="py-3 sm:py-4">
        <div className="mx-auto max-w-[1200px]">
          <nav aria-label="Breadcrumb" className="mb-5 pt-1">
            <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
              <li>
                <Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">
                  Home
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <Link
                  href="/subjects"
                  className="font-medium text-slate-600 transition hover:text-portal-700"
                >
                  Subjects
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">
                  {subject.title}
                </span>
              </li>
            </ol>
          </nav>

          <FallbackSubjectPage
            subject={subject}
            steps={steps}
            totalConcepts={totalConcepts}
            subjectSummary={subjectSummary}
          />
        </div>
      </Layout>
    );
  }

  const concepts = theoryKnowledge.concepts || [];
  const activeConcept = concepts[activeConceptIndex] || concepts[0];
  const activeTeaching = activeConcept?.teaching || {};
  const subjectProgress = progressStats.subjects.find(
    (item) => item.slug === learningMeta.learningSubjectSlug
  );
  const completionPercent = subjectProgress?.completionPercent || 0;
  const completedTopics = subjectProgress?.completedTopics || 0;
  const readyTopics = subjectProgress?.totalTopics || learningMeta.readyTopics || 0;
  const activeFormulaPreview =
    activeConcept?.formulas?.length > 0
      ? activeConcept.formulas.slice(0, 3)
      : concepts.flatMap((concept) => concept.formulas || []).slice(0, 3);
  const activeIntuition =
    activeTeaching.intuition?.length ? activeTeaching.intuition : [activeConcept.summary];
  const activeExplanation =
    activeTeaching.explanation?.length ? activeTeaching.explanation : activeConcept.paragraphs || [];
  const activeInterpretation =
    activeTeaching.interpretation?.length ? activeTeaching.interpretation : activeConcept.learnPoints || [];
  const activeWorkedExample = activeTeaching.workedExample || null;
  const activeQuiz = activeTeaching.quiz || null;
  const activeCommonMistake =
    activeTeaching.commonMistake ||
    theoryKnowledge.commonMistakes?.[activeConceptIndex] ||
    theoryKnowledge.commonMistakes?.[0] ||
    "";
  const activeRealLifeInsight =
    activeTeaching.realLifeInsight || chapterMeta.studyTip;
  const selectedQuizIndex = quizSelections[activeConcept?.slug];
  const isQuizAnswered = typeof selectedQuizIndex === "number";
  const isQuizCorrect = isQuizAnswered && selectedQuizIndex === activeQuiz?.correctIndex;

  function getConceptStatus(index) {
    if (index < activeConceptIndex) {
      return "review";
    }

    if (index === activeConceptIndex) {
      return "current";
    }

    return "next";
  }

  return (
    <Layout title={`ECE Exam Guide | ${subject.title}`} pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1500px] pb-24 xl:pb-0">
        <nav aria-label="Breadcrumb" className="mb-5 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li>
              <Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">
                Home
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <Link
                href="/subjects"
                className="font-medium text-slate-600 transition hover:text-portal-700"
              >
                Subjects
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">
                {subject.title}
              </span>
            </li>
          </ol>
        </nav>

        <section className="rounded-3xl border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-3 shadow-panel sm:p-4">
          <div className="grid gap-4 xl:grid-cols-[1.28fr_0.82fr]">
            <div className="flex flex-col gap-3 md:flex-row md:items-start">
              <SubjectTheoryIcon />
              <div className="min-w-0 flex-1">
                <p className="inline-flex rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-portal-700">
                  Subject Theory
                </p>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {subject.title}
                </h1>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  {chapterMeta.subtitle}
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  <HeroMetric label="Estimated Time" value={chapterMeta.estimatedTime} />
                  <HeroMetric label="Difficulty" value={chapterMeta.difficulty} />
                  <HeroMetric label="Concepts" value={`${concepts.length} Detailed Topics`} />
                  <HeroMetric label="Level" value={chapterMeta.level} />
                </div>
              </div>
            </div>

            <div className="grid gap-2.5">
              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-bold text-slate-900">Your Progress</h2>
                  <span className="text-xs font-semibold text-slate-500">
                    {isReady ? `${completionPercent}% Completed` : "Loading..."}
                  </span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-slate-100">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-portal-600 transition-all"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-medium text-slate-600">
                    {completedTopics} / {readyTopics} ready topics completed
                  </p>
                  <Link
                    href={learningMeta.continueHref || subject.href}
                    className="inline-flex justify-center rounded-lg bg-portal-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-portal-700"
                  >
                    {completionPercent > 0 ? "Continue Learning" : "Start Learning"}
                  </Link>
                </div>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                <Link
                  href={notesHref}
                  className="inline-flex justify-center rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Open Notes View
                </Link>
                <Link
                  href={`/practice?search=${encodeURIComponent(subject.search)}`}
                  className="inline-flex justify-center rounded-lg border border-portal-200 bg-white px-3 py-2.5 text-xs font-semibold text-portal-700 transition hover:bg-portal-50"
                >
                  Practice Questions
                </Link>
              </div>
            </div>
          </div>
        </section>

        <MobileConceptRoadmap
          concepts={concepts}
          activeIndex={activeConceptIndex}
          setActiveIndex={setActiveConceptIndex}
        />

        <section className="mt-5 grid gap-5 xl:grid-cols-[270px_minmax(0,1fr)_290px]">
          <aside className="hidden xl:block">
            <div className="xl:sticky xl:top-24">
              <SidebarCard title="Learning Roadmap">
                <NetworkTopicList />
              </SidebarCard>

              <div className="mt-4 grid gap-4">
                <SidebarCard title="Exam Focus">
                  <div className="grid gap-2">
                    {chapterMeta.examFocus.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm font-medium text-slate-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </SidebarCard>

                <SidebarCard title="Study Flow">
                  <div className="grid gap-2">
                    {steps.map((step, index) => (
                      <div
                        key={step.title}
                        className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
                          Module {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-5 text-slate-900">
                          {step.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </SidebarCard>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
              <div className="divide-y divide-slate-200">
              {theoryKnowledge.overviewCards.map((item, index) => (
                <OverviewRow
                  key={item.title}
                  item={item}
                />
              ))}
              </div>
            </section>

            <section
              id="subject-concept"
              className="mt-5 scroll-mt-40 bg-white"
            >
              <div className="px-3 pb-4 sm:px-5 lg:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-portal-700">
                  Concept {String(activeConceptIndex + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 max-w-3xl text-base font-semibold leading-snug text-slate-950 sm:text-lg">
                  {activeConcept.title}
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
                  {activeConcept.summary}
                </p>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
                  In this topic, first understand what each quantity represents, then learn how to assign direction and polarity before writing equations. A negative answer is not a failure; it simply tells you that the actual direction is opposite to the reference direction chosen at the start.
                </p>
              </div>

              <div className="grid gap-5 border-t border-slate-200 px-3 pt-4 sm:px-5 lg:px-6">
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      Core Idea
                    </h3>
                    <div className="mt-2 space-y-2.5">
                      {activeIntuition.map((line, index) => (
                        <p
                          key={`${activeConcept.slug}-intuition-${index}`}
                          className="text-sm leading-6 text-slate-700"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      Step-by-Step Theory
                    </h3>
                    <ol className="mt-2 list-decimal space-y-2.5 pl-5 text-sm leading-6 text-slate-700">
                      {activeExplanation.map((line, index) => (
                        <li
                          key={`${activeConcept.slug}-explanation-${index}`}
                        >
                          {line}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      How To Read It In Circuits
                    </h3>
                    <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
                      {activeInterpretation.map((point) => (
                        <li
                          key={`${activeConcept.slug}-interpretation-${point}`}
                          className="flex gap-2"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      Circuit Diagram
                    </h3>
                    <div className="mt-2 max-w-2xl overflow-hidden">
                      <NetworkTheoryDiagram type={activeConcept.diagram} />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      {activeConcept.diagramNote}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      Key Relation
                    </h3>
                    <div className="mt-2 divide-y divide-slate-200">
                      {activeConcept.formulas.map((formula) => (
                        <div
                          key={`${formula.label}-${formula.expression}`}
                          className="py-2.5 first:pt-0 last:pb-0"
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                            {formula.label}
                          </p>
                          <p className="mt-1.5 text-sm font-bold text-slate-900 sm:text-base">
                            {formula.expression}
                          </p>
                          <p className="mt-1.5 text-xs leading-5 text-slate-600">{formula.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {activeWorkedExample ? (
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <h3 className="text-base font-bold text-slate-900">Worked Example</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                    {activeWorkedExample.prompt}
                  </p>
                  <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    {activeWorkedExample.steps?.map((step, index) => (
                      <li
                        key={`${activeConcept.slug}-worked-step-${index}`}
                        className="flex gap-2.5"
                      >
                        <span className="font-bold text-portal-700">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-3 border-l-2 border-portal-400 pl-3">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-portal-700">
                      Final Answer
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-900">
                      {activeWorkedExample.result}
                    </p>
                  </div>
                </div>
              ) : null}

              {activeQuiz ? (
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <h3 className="text-base font-bold text-slate-900">Quick Quiz</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {activeQuiz.question}
                  </p>
                  <div className="mt-3 grid gap-2">
                    {activeQuiz.options.map((option, optionIndex) => {
                      const optionLetter = String.fromCharCode(65 + optionIndex);
                      const isSelected = selectedQuizIndex === optionIndex;
                      const isCorrectOption = optionIndex === activeQuiz.correctIndex;
                      const optionClassName = isSelected
                        ? isCorrectOption
                          ? "text-emerald-800"
                          : "text-amber-800"
                        : "text-slate-700 hover:text-portal-700";

                      return (
                        <button
                          key={`${activeConcept.slug}-quiz-${option}`}
                          type="button"
                          onClick={() =>
                            setQuizSelections((currentValue) => ({
                              ...currentValue,
                              [activeConcept.slug]: optionIndex,
                            }))
                          }
                          className={`flex w-full items-center gap-3 border-b border-slate-200 py-2 text-left text-sm font-medium transition last:border-b-0 ${optionClassName}`}
                        >
                          <span className="w-5 flex-none text-xs font-bold">
                            {optionLetter}
                          </span>
                          <span className="flex-1">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3 border-l-2 border-slate-300 pl-3">
                    <p className="text-sm font-bold text-slate-900">
                      {isQuizAnswered ? (isQuizCorrect ? "Correct" : "Try Again") : "Answer Guide"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {isQuizAnswered
                        ? activeQuiz.explanation
                        : "Choose one option to check your understanding of this concept."}
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 grid gap-4 border-t border-slate-200 pt-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Common Mistake</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {activeCommonMistake}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">Real-Life Insight</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {activeRealLifeInsight}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-portal-700">
                  Next Step
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {activeConceptIndex === concepts.length - 1
                    ? "Finish this chapter, then move to practice questions to reinforce the theory."
                    : `Next Concept -> ${concepts[activeConceptIndex + 1]?.shortTitle}`}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setActiveConceptIndex((currentValue) => Math.max(currentValue - 1, 0))}
                  disabled={activeConceptIndex === 0}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous Concept
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

          <aside className="min-w-0">
            <div className="grid gap-4 xl:sticky xl:top-24">
              <SidebarCard title="Key Concepts">
                <div className="grid gap-2">
                  {chapterMeta.keyConcepts.map((concept) => (
                    <div
                      key={concept}
                      className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm font-medium text-slate-700"
                    >
                      {concept}
                    </div>
                  ))}
                </div>
              </SidebarCard>

              <SidebarCard title="Formula Preview">
                <FormulaPreview formulas={activeFormulaPreview} />
              </SidebarCard>

              <SidebarCard title="Study Tips">
                <div className="grid gap-2">
                  {theoryKnowledge.studyTips.slice(0, 4).map((tip) => (
                    <div
                      key={tip}
                      className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 text-sm leading-6 text-slate-700"
                    >
                      {tip}
                    </div>
                  ))}
                </div>
              </SidebarCard>

              <SidebarCard title="Common Mistakes">
                <div className="grid gap-2">
                  {theoryKnowledge.commonMistakes.slice(0, 3).map((mistake) => (
                    <div
                      key={mistake}
                      className="rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-3 text-sm leading-6 text-slate-700"
                    >
                      {mistake}
                    </div>
                  ))}
                </div>
              </SidebarCard>

              <SidebarCard title="Study Tip">
                <p className="text-sm leading-7 text-slate-700">{chapterMeta.studyTip}</p>
              </SidebarCard>
            </div>
          </aside>
        </section>
      </div>

      <div className="fixed bottom-3 left-3 right-3 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur xl:hidden">
        <div className="grid grid-cols-4 gap-2">
          <a
            href="#subject-roadmap"
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Roadmap
          </a>
          <a
            href="#subject-concept"
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Theory
          </a>
          <Link
            href={notesHref}
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Notes
          </Link>
          <Link
            href={subject.href}
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Learn
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: subjectDirectory.map((subject) => ({
      params: { slug: getSubjectSlug(subject.title) },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const subject = subjectDirectory.find(
    (item) => getSubjectSlug(item.title) === params.slug
  );
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
      learningMeta: {
        learningSubjectSlug,
        totalTopics: learningTopics.length,
        readyTopics: readyTopics.length,
        continueHref: readyTopics[0]?.href || subject.href,
      },
    },
  };
}
