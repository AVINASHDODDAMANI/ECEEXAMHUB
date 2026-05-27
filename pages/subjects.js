import Link from "next/link";
import { useMemo } from "react";
import Layout from "../components/layout";
import { subjectDirectory } from "../data/subject-directory";
import { getSubjectSlug } from "../data/subject-theory-roadmaps";
import { getLearningMasteryState, getLearningSubject } from "../lib/learning-utils";
import { buildBreadcrumbList } from "../lib/seo";
import { useLearningProgress } from "../lib/use-learning-progress";

const subjectsStructuredData = [
  buildBreadcrumbList([
    { name: "Home", item: "/" },
    { name: "Subjects", item: "/subjects" },
  ]),
];

function SubjectIcon({ type }) {
  const common = "h-8 w-8";

  if (type === "network") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 12h4l2.5-6 5 12L17 9l4 3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "analog") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6v12M18 6v12M7 12h10M10 8l4 4-4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "digital") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 17V7h6v10m0-10v10h8V9c0-1.1-.9-2-2-2h-2v10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "signals") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 18V6m0 12h16M7 15l3-5 3 2 4-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "communication") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 15V9m0 0-2.5 2.5M12 9l2.5 2.5M7 20a5 5 0 0 1 10 0M5.5 15.5a9 9 0 0 1 13 0M4 12a12 12 0 0 1 16 0" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "electromagnetic") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5m0 0-4 4m4-4 4 4M8 19c0-2.2 1.8-4 4-4s4 1.8 4 4M5 19c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "microprocessor" || type === "processor" || type === "chip") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="7" width="10" height="10" rx="1.8" stroke="currentColor" strokeWidth="1.9" />
        <path d="M4 9V7m0 10v-2m16-8V7m0 10v-2M9 4H7m10 0h-2M9 20H7m10 0h-2M4 12H2m20 0h-2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "control") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12h4l2-5 4 10 2-5h4M7 4h10v16H7z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "satellite") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 9 4 4m11 5 5-5M9 15l-5 5m11-5 5 5M10 10l4 4m-8 0 8-8m4 4a4 4 0 1 1-8 8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "antenna") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 14v6m-3 0h6M8 20h8M12 14l-4 4M12 14l4 4M12 7a3 3 0 1 1 0 .01M7 12a7 7 0 0 1 10 0M4.5 15.5a10.5 10.5 0 0 1 15 0" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5h14v14H5zM9 9h6v6H9z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getLearningSubjectMap(subjectTitle) {
  const learningSlugByTitle = {
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

  return getLearningSubject(learningSlugByTitle[subjectTitle] || "");
}

const SUBJECT_CHAPTER_COUNT_MAP = {
  "Network Analysis": 15,
  "Analog Electronics": 10,
  "Digital Electronics": 15,
  "Signals and Systems": 13,
  "Communication Systems": 11,
  "Electromagnetic Theory": 11,
  Microprocessors: 11,
  "Digital Signal Processing": 11,
  "Control Systems": 15,
  "VLSI Design": 11,
  "Antenna & Wave Propagation": 10,
  "Embedded Systems": 11,
};

function getSubjectStats(subjectTitle, progressSubjects) {
  const subjectSlug = getSubjectSlug(subjectTitle);
  const matchedLearningSubject = getLearningSubjectMap(subjectTitle);
  const chapterCount =
    SUBJECT_CHAPTER_COUNT_MAP[subjectTitle] ||
    matchedLearningSubject?.chapters?.length ||
    0;
  const learningReadyCount =
    matchedLearningSubject?.chapters?.reduce(
      (total, chapter) =>
        total + chapter.topics.filter((topic) => topic.status === "ready").length,
      0
    ) || 0;
  const progressEntry =
    progressSubjects.find((entry) => getSubjectSlug(entry.name) === subjectSlug) || null;

  return {
    chapterCount,
    learningReadyCount,
    completionPercent: progressEntry?.completionPercent || 0,
    completedTopics: progressEntry?.completedTopics || 0,
  };
}

function getSubjectPositioning(subjectTitle) {
  const map = {
    "Network Analysis": {
      level: "Foundation",
      value: "Circuit intuition",
      tags: ["foundation", "exam-heavy"],
    },
    "Analog Electronics": {
      level: "Core",
      value: "Devices to amplifiers",
      tags: ["foundation", "exam-heavy"],
    },
    "Digital Electronics": {
      level: "Core",
      value: "Logic and design basics",
      tags: ["foundation", "quick-revision"],
    },
    "Signals and Systems": {
      level: "Gatekeeper",
      value: "Math-heavy signal analysis",
      tags: ["exam-heavy"],
    },
    "Communication Systems": {
      level: "Advanced",
      value: "Modulation to information theory",
      tags: ["exam-heavy"],
    },
    "Electromagnetic Theory": {
      level: "Advanced",
      value: "Field intuition and wave behavior",
      tags: ["exam-heavy"],
    },
    Microprocessors: {
      level: "Applied",
      value: "Architecture and instruction flow",
      tags: ["quick-revision"],
    },
    "Digital Signal Processing": {
      level: "Advanced",
      value: "Transforms and filter design",
      tags: ["exam-heavy"],
    },
    "Control Systems": {
      level: "Advanced",
      value: "Stability and response design",
      tags: ["exam-heavy"],
    },
    "VLSI Design": {
      level: "Specialized",
      value: "CMOS and chip design flow",
      tags: ["quick-revision"],
    },
    "Antenna & Wave Propagation": {
      level: "Specialized",
      value: "Radiation, patterns, propagation",
      tags: ["quick-revision"],
    },
    "Embedded Systems": {
      level: "Applied",
      value: "Controllers, timers, and RTOS",
      tags: ["quick-revision"],
    },
  };

  return map[subjectTitle] || { level: "Core", value: "Exam preparation", tags: [] };
}

export default function SubjectsPage() {
  const { progressStats } = useLearningProgress();
  const progressSubjects = progressStats.subjects || [];

  const subjectCards = useMemo(
    () =>
      subjectDirectory.map((subject) => {
        const stats = getSubjectStats(subject.title, progressSubjects);
        const positioning = getSubjectPositioning(subject.title);

        return {
          ...subject,
          subjectSlug: getSubjectSlug(subject.title),
          stats,
          positioning,
        };
      }),
    [progressSubjects]
  );

  return (
    <Layout
      title="ECE Subjects Notes and Study Materials | ECE Exam Guide"
      description="Explore electronics engineering subjects with ECE notes, syllabus-oriented study materials, MCQs, previous year papers, practice resources, and subject roadmaps."
      keywords="ECE subjects, gate ece subjects, ece notes, subject wise pyqs, electronics and communication subjects, ece study hub"
      canonicalUrl="/subjects"
      structuredData={subjectsStructuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1440px]">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur"
        >
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-400" aria-hidden="true">/</span>
          <span className="font-semibold text-slate-800">Subjects</span>
        </nav>

        <section className="mt-2">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                Subject hubs
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                ECE Subjects Notes and Study Materials
              </h1>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
                Explore the core ECE subjects that build Electronics and Communication Engineering preparation from fundamentals to exam practice. This subject hub brings together ECE notes, chapter roadmaps, syllabus-focused revision, and practice materials for students preparing for GATE, university exams, and technical recruitment tests. Start with electronics engineering subjects such as Network Analysis, Analog Electronics, Digital Electronics, Signals and Systems, Communication Systems, Control Systems, Microprocessors, and VLSI Design, then move into topic-wise resources that match your study plan.
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
                Each subject page helps you connect theory with active recall: use digital electronics notes for logic and sequential circuit revision, communication engineering notes for modulation and signal concepts, ECE MCQs for quick checks, and previous year papers to understand repeated exam patterns. The notes library supports concept review, while the MCQ and practice sections help test formulas, definitions, and problem-solving speed. Follow the syllabus, revise one subject at a time, and use these linked study materials to turn reading into focused ECE exam preparation.
              </p>
            </article>

            <nav
              aria-label="Subject study resources"
              className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-5"
            >
              <h2 className="text-lg font-extrabold tracking-tight text-slate-950">
                Continue with resources
              </h2>
              <div className="mt-4 grid gap-2">
                {[
                  ["Browse ECE notes", "/notes"],
                  ["Practice ECE MCQs", "/mcqs"],
                  ["Open previous year papers", "/previous-year"],
                  ["Study exam practice sets", "/practice"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
                  >
                    <span>{label}</span>
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                ))}
              </div>
              <Link
                href="/learn"
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-portal-700 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-portal-800"
              >
                Open dashboard
              </Link>
            </nav>
          </div>

          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-950">
            Choose the subject you want to study next
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {subjectCards.map((subject) => (
              (() => {
                const masteryState = getLearningMasteryState(
                  subject.stats.completionPercent,
                  subject.stats.completedTopics
                );

                return (
              <article
                key={subject.title}
                className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_14px_36px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-portal-300 hover:shadow-[0_22px_54px_rgba(15,23,42,0.12)]"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#154a96_0%,#0f766e_100%)] opacity-70 transition group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 flex-none items-center justify-center rounded-[18px] border transition duration-300 group-hover:scale-105 ${subject.accent.bg} ${subject.accent.border} ${subject.accent.text}`}
                    >
                      <SubjectIcon type={subject.icon} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-500">
                        {subject.positioning.level}
                      </p>
                      <h3 className="mt-0.5 text-lg font-extrabold tracking-tight text-slate-950 transition group-hover:text-portal-700">
                        {subject.title}
                      </h3>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                    {subject.stats.chapterCount} chapters
                  </span>
                </div>

                <p className="mt-3 text-sm font-semibold text-portal-700">
                  {subject.positioning.value}
                </p>
                <p className="mt-1.5 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                  {subject.description}
                </p>

                <div className="mt-3 flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-slate-500">
                  <span>{subject.stats.learningReadyCount} topics linked</span>
                  {subject.positioning.tags.slice(0, 1).map((tag) => (
                    <span key={`${subject.title}-${tag}`} className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-300" />
                      {tag.replace("-", " ")}
                    </span>
                  ))}
                </div>

                <div className="mt-4 rounded-[18px] border border-slate-200 bg-slate-50/80 px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-500">
                        {subject.stats.completedTopics} topics done
                      </p>
                      <p className="mt-1 text-sm font-extrabold text-slate-950">
                        {masteryState.label}
                      </p>
                    </div>
                    <p className="rounded-full border border-white bg-white px-2.5 py-1 text-sm font-extrabold text-portal-700 shadow-sm">
                      {subject.stats.completionPercent}%
                    </p>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-3 rounded-full bg-[linear-gradient(90deg,#154a96_0%,#0f766e_100%)] transition-all duration-500"
                      style={{ width: `${Math.max(subject.stats.completionPercent, 6)}%` }}
                    />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                    {masteryState.note}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={`/subjects/${subject.subjectSlug}`}
                    prefetch={false}
                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-[18px] bg-portal-700 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-portal-800"
                  >
                    <span>Open Hub</span>
                    <span aria-hidden="true" className="transition group-hover:translate-x-0.5">-&gt;</span>
                  </Link>
                  <Link
                    href={`/notes/${subject.subjectSlug}`}
                    prefetch={false}
                    className="inline-flex min-h-10 items-center justify-center rounded-[18px] border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
                  >
                    Notes
                  </Link>
                </div>
              </article>
                );
              })()
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
