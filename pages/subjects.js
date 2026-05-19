import Link from "next/link";
import { useMemo } from "react";
import Layout from "../components/layout";
import { subjectDirectory } from "../data/subject-directory";
import { getSubjectSlug } from "../data/subject-theory-roadmaps";
import { getLearningSubject } from "../lib/learning-utils";
import { useLearningProgress } from "../lib/use-learning-progress";

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
      title="ECE Subjects Hub | Notes, PYQs, MCQs and Topic Roadmaps"
      description="Explore subject-wise ECE study hubs with theory roadmaps, notes, previous year questions, revision paths, and learning progress across GATE, PSU, and semester preparation."
      keywords="ECE subjects, gate ece subjects, ece notes, subject wise pyqs, electronics and communication subjects, ece study hub"
      pageClassName="py-4 sm:py-6"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-400" aria-hidden="true">/</span>
          <span className="font-semibold text-slate-800">Subjects</span>
        </div>

        <section className="mt-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                Subject hubs
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                Choose the subject you want to study next.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                All subject theory notes are already added. These cards now help you compare subjects quickly by showing what the subject covers, how much content is mapped, how much you have completed, and where to go next for notes, search, or the full hub.
              </p>
            </div>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
            >
              Open dashboard
            </Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {subjectCards.map((subject) => (
              <article
                key={subject.title}
                className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_14px_36px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-portal-300 hover:shadow-[0_18px_48px_rgba(15,23,42,0.1)]"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#154a96_0%,#0f766e_100%)] opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 flex-none items-center justify-center rounded-[18px] border ${subject.accent.bg} ${subject.accent.border} ${subject.accent.text}`}
                    >
                      <SubjectIcon type={subject.icon} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                        {subject.positioning.level}
                      </p>
                      <h3 className="mt-1 text-lg font-extrabold tracking-tight text-slate-950 group-hover:text-portal-700">
                        {subject.title}
                      </h3>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-600">
                    {subject.stats.chapterCount} chapters
                  </span>
                </div>

                <p className="mt-3 text-sm font-semibold text-portal-700">
                  Best used for: {subject.positioning.value}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  {subject.description}
                </p>

                <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  {subject.stats.learningReadyCount} guided learning topics currently linked
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {subject.positioning.tags.map((tag) => (
                    <span
                      key={`${subject.title}-${tag}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600"
                    >
                      {tag.replace("-", " ")}
                    </span>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  {[
                    ["Chapters", subject.stats.chapterCount],
                    ["Done", subject.stats.completedTopics],
                    ["Progress", `${subject.stats.completionPercent}%`],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-2.5">
                      <p className="text-base font-extrabold text-slate-950">{value}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-[linear-gradient(90deg,#154a96_0%,#0f766e_100%)] transition-all"
                    style={{ width: `${Math.max(subject.stats.completionPercent, 6)}%` }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/subjects/${subject.subjectSlug}`}
                    className="inline-flex items-center justify-center rounded-[18px] bg-portal-700 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-portal-800"
                  >
                    Open Subject Hub
                  </Link>
                  <Link
                    href={`/notes/${subject.subjectSlug}`}
                    className="inline-flex items-center justify-center rounded-[18px] border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
                  >
                    Open Notes
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
