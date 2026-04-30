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

function SubjectTheoryIcon() {
  return (
    <span className="flex h-20 w-20 flex-none items-center justify-center rounded-[24px] bg-[linear-gradient(180deg,#0f3270,#154a96)] text-white shadow-[0_18px_40px_rgba(15,50,112,0.28)]">
      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-portal-700">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function OverviewCard({ item, tone = "blue" }) {
  const toneClassName =
    tone === "emerald"
      ? "border-emerald-200 bg-emerald-50/70"
      : tone === "amber"
      ? "border-amber-200 bg-amber-50/75"
      : "border-portal-200 bg-portal-50/70";

  return (
    <article className={`rounded-[24px] border p-4 ${toneClassName}`}>
      <h2 className="text-lg font-bold text-slate-900">{item.title}</h2>
      {item.description ? (
        <p className="mt-2 text-sm leading-7 text-slate-700">{item.description}</p>
      ) : null}
      {item.points?.length ? (
        <div className="mt-4 grid gap-2">
          {item.points.map((point) => (
            <div
              key={point}
              className="rounded-xl border border-white/80 bg-white/90 px-3 py-2 text-sm leading-6 text-slate-700"
            >
              {point}
            </div>
          ))}
        </div>
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

function MobileConceptRoadmap({ concepts, activeIndex, setActiveIndex }) {
  return (
    <section id="subject-roadmap" className="mt-4 xl:hidden">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-portal-700">
          Chapter Concepts
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
              className={`w-[220px] rounded-2xl border px-3 py-3 text-left ${
                index === activeIndex
                  ? "border-portal-300 bg-portal-50 shadow-sm"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs font-bold ${
                    index === activeIndex
                      ? "bg-portal-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {index === activeIndex ? "Open" : "View"}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-5 text-slate-900">
                {concept.shortTitle}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{concept.title}</p>
            </button>
          ))}
        </div>
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
  const { progressStats, isReady } = useLearningProgress();

  useEffect(() => {
    setActiveConceptIndex(0);
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
  const chapterOutline = concepts.map((concept, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: concept.shortTitle,
    detail: concept.title,
  }));

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

        <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-6">
          <div className="grid gap-5 xl:grid-cols-[1.28fr_0.9fr]">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <SubjectTheoryIcon />
              <div className="min-w-0 flex-1">
                <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-portal-700">
                  Subject Theory
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
                  <HeroMetric label="Concepts" value={`${concepts.length} Detailed Topics`} />
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
                    {completionPercent > 0 ? "Continue Learning" : "Start Learning"}
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href={notesHref}
                  className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Open Notes View
                </Link>
                <Link
                  href={`/practice?search=${encodeURIComponent(subject.search)}`}
                  className="inline-flex justify-center rounded-xl border border-portal-200 bg-white px-4 py-3 text-sm font-semibold text-portal-700 transition hover:bg-portal-50"
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
                <p className="text-sm leading-6 text-slate-600">
                  Each concept builds toward full circuit analysis.
                </p>
                <div className="mt-4 grid gap-2">
                  {concepts.map((concept, index) => (
                    <ConceptRoadmapItem
                      key={concept.slug}
                      concept={concept}
                      index={index}
                      isActive={index === activeConceptIndex}
                      status={getConceptStatus(index)}
                      onClick={() => setActiveConceptIndex(index)}
                    />
                  ))}
                </div>
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
            <section className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {theoryKnowledge.overviewCards.map((item, index) => (
                <OverviewCard
                  key={item.title}
                  item={item}
                  tone={index === 1 ? "emerald" : index === 2 ? "amber" : "blue"}
                />
              ))}
            </section>

            <section
              id="subject-concept"
              className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5"
            >
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-portal-600 text-sm font-bold text-white shadow-sm">
                      {activeConceptIndex + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-portal-700">
                        Concept {String(activeConceptIndex + 1).padStart(2, "0")}
                      </p>
                      <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        {activeConcept.title}
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                        {activeConcept.summary}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex rounded-full bg-portal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
                    {getConceptStatus(activeConceptIndex) === "current" ? "Current Topic" : "Topic"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeConcept.learnPoints.map((point) => (
                    <span
                      key={`${activeConcept.slug}-${point}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Concept Explanation</h3>
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
                    <p className="text-sm font-bold text-emerald-800">What You Must Understand</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {activeConcept.learnPoints.map((point) => (
                        <div
                          key={`${activeConcept.slug}-learn-${point}`}
                          className="rounded-xl border border-white/80 bg-white px-3 py-2 text-sm leading-6 text-slate-700"
                        >
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff,#eff5ff)] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-portal-700">
                    Circuit Diagram
                  </p>
                  <div className="mt-3 overflow-hidden rounded-2xl border border-white/80 bg-white">
                    <NetworkTheoryDiagram type={activeConcept.diagram} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {activeConcept.diagramNote}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-lg font-bold text-slate-900">Important Relations</h3>
                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  {activeConcept.formulas.map((formula) => (
                    <div
                      key={`${formula.label}-${formula.expression}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        {formula.label}
                      </p>
                      <p className="mt-2 text-base font-bold text-slate-900">
                        {formula.expression}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{formula.note}</p>
                    </div>
                  ))}
                </div>
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

            <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Chapter Structure
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                The chapter moves from basic electrical quantities to systematic solving methods,
                equivalent circuits, AC behavior, and transient response.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                {chapterOutline.map((item) => (
                  <div
                    key={`${item.number}-${item.title}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
                      {item.number}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 lg:grid-cols-2">
                {steps.map((step, index) => (
                  <StudyFlowCard key={step.title} step={step} index={index} />
                ))}
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
