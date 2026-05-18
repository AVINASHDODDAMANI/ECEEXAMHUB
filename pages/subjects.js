import Link from "next/link";
import Layout from "../components/layout";
import { examDirectory } from "../data/exam-directory";
import { subjectDirectory } from "../data/subject-directory";
import { getSubjectSlug } from "../data/subject-theory-roadmaps";
import { getLearningSubject, getReadyLearningTopics } from "../lib/learning-utils";
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

function SparkIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6L12 3Zm6 10 1 2.8 3 1-3 1-1 2.8-1-2.8-3-1 3-1 1-2.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2H19v16.5H8.5A2.5 2.5 0 0 0 6 21.5m0-17v17m0-17H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M14.167 14.167L17.5 17.5M15.833 9.167A6.667 6.667 0 1 1 2.5 9.167a6.667 6.667 0 0 1 13.333 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PREP_PATHS = [
  {
    title: "Semester Sprint",
    description: "Start from chapter-wise theory, then jump to topic revision and likely exam asks.",
    href: "/notes",
    badge: "Fastest path",
  },
  {
    title: "GATE-Focused Study",
    description: "Use concept flow, high-value topics, and question-first practice for long-term prep.",
    href: "/learn",
    badge: "High retention",
  },
  {
    title: "PYQ Revision",
    description: "Move directly into previous year patterns when you already know the basics.",
    href: "/previous-year",
    badge: "Exam pattern",
  },
];

function getSubjectStats(subjectTitle, progressSubjects) {
  const subjectSlug = getSubjectSlug(subjectTitle);
  const matchedLearningSubject = getLearningSubjectMap(subjectTitle);
  const chapterCount = matchedLearningSubject?.chapters?.length || 0;
  const topicCount =
    matchedLearningSubject?.chapters?.reduce(
      (total, chapter) =>
        total + chapter.topics.filter((topic) => topic.status === "ready").length,
      0
    ) || 0;
  const progressEntry =
    progressSubjects.find((entry) => getSubjectSlug(entry.name) === subjectSlug) || null;

  return {
    chapterCount,
    topicCount,
    completionPercent: progressEntry?.completionPercent || 0,
    completedTopics: progressEntry?.completedTopics || 0,
  };
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

export default function SubjectsPage() {
  const { progressStats } = useLearningProgress();
  const readyTopics = getReadyLearningTopics();
  const totalChapterCount = subjectDirectory.reduce((total, subject) => {
    const learningSubject = getLearningSubjectMap(subject.title);
    return total + (learningSubject?.chapters?.length || 0);
  }, 0);
  const totalCompletion = progressStats.completionPercent || 0;

  return (
    <Layout
      title="ECE Subjects Hub | Notes, PYQs, MCQs and Topic Roadmaps"
      description="Explore subject-wise ECE study hubs with theory roadmaps, notes, previous year questions, revision paths, and learning progress across GATE, PSU, and semester preparation."
      keywords="ECE subjects, gate ece subjects, ece notes, subject wise pyqs, electronics and communication subjects, ece study hub"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">Subjects</span>
        </div>

        <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-[linear-gradient(140deg,#0f2f5e_0%,#154a96_48%,#0f766e_100%)] text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)]">
          <div className="grid gap-8 px-5 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:px-8">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-50">
                <SparkIcon />
                Subject-first preparation
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl">
                Choose one subject and study with a structured system — not a scattered collection of PDFs.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-blue-50/92">
                Each subject hub is thoughtfully designed for ECE students to transition from unorganized browsing to focused, effective revision. With curated theory modules, concise notes, previous year questions (PYQs), and guided learning paths, students gain both conceptual clarity and a clear direction for what to study next.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/learn"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-portal-800 transition hover:bg-blue-50"
                >
                  Open Learning Dashboard
                </Link>
                <Link
                  href="/search"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/16"
                >
                  Search Topics and PYQs
                </Link>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-4">
                {[
                  ["Subjects", subjectDirectory.length],
                  ["Ready topics", readyTopics.length],
                  ["Chapters mapped", totalChapterCount],
                  ["Your progress", `${totalCompletion}%`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
                    <p className="text-2xl font-extrabold text-white">{value}</p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-100/80">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 self-start">
              <div className="rounded-[28px] border border-white/14 bg-white/10 p-5 backdrop-blur">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-100">
                  How students use this
                </p>
                <div className="mt-4 grid gap-3">
                  {[
                    "Open a subject hub and identify the highest-weight chapters first.",
                    "Use notes and theory pages to learn only what the exam keeps repeating.",
                    "Switch into PYQs or MCQs while the topic is still fresh.",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl bg-slate-950/18 px-4 py-3 text-sm leading-6 text-blue-50">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/14 bg-white p-5 text-slate-900 shadow-[0_18px_40px_rgba(8,15,40,0.12)]">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                  Explore by goal
                </p>
                <div className="mt-4 grid gap-3">
                  {PREP_PATHS.map((path) => (
                    <Link
                      key={path.title}
                      href={path.href}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-portal-300 hover:bg-portal-50"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-base font-extrabold text-slate-950">{path.title}</h2>
                        <span className="rounded-full bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-portal-700">
                          {path.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{path.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Search before you scroll",
              description: "Jump straight to topics like EMFT module 3, network theorems, or CMOS inverter instead of hunting through folders.",
              href: "/search",
              icon: <SearchIcon />,
            },
            {
              title: "Study one subject deeply",
              description: "Every card below links into a focused hub so students can stay inside one stream instead of bouncing across disconnected pages.",
              href: "/learn",
              icon: <BookIcon />,
            },
            {
              title: "Prepare for multiple exam paths",
              description: `Use the same subject base for semester exams, GATE, and ${examDirectory.length}+ exam-oriented resource tracks.`,
              href: "/ece-exams",
              icon: <SparkIcon />,
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-portal-300 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-portal-200 bg-portal-50 text-portal-700">
                {item.icon}
              </span>
              <h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                Subject hubs
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                Start from the subject you need to win next.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                Each hub is structured to feel like a study workspace with roadmap depth, progress visibility, and faster entry points into theory, notes, and revision.
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
            >
              Search all resources
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {subjectDirectory.map((subject) => {
              const subjectSlug = getSubjectSlug(subject.title);
              const stats = getSubjectStats(subject.title, progressStats.subjects || []);

              return (
                <article
                  key={subject.title}
                  className="group rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-portal-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl border ${subject.accent.bg} ${subject.accent.border} ${subject.accent.text}`}
                      >
                        <SubjectIcon type={subject.icon} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                          Subject {String(subject.id).padStart(2, "0")}
                        </p>
                        <h3 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950 group-hover:text-portal-700">
                          {subject.title}
                        </h3>
                      </div>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-600">
                      {stats.topicCount} topics
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {subject.description}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      ["Chapters", stats.chapterCount],
                      ["Completed", stats.completedTopics],
                      ["Progress", `${stats.completionPercent}%`],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                        <p className="text-lg font-extrabold text-slate-950">{value}</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-[linear-gradient(90deg,#154a96_0%,#0f766e_100%)] transition-all"
                      style={{ width: `${Math.max(stats.completionPercent, 6)}%` }}
                    />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      href={`/subjects/${subjectSlug}`}
                      className="inline-flex items-center justify-center rounded-xl bg-portal-700 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-portal-800"
                    >
                      Open Subject Hub
                    </Link>
                    <Link
                      href={`/notes/${subjectSlug}`}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
                    >
                      Notes
                    </Link>
                    <Link
                      href={`/search?q=${encodeURIComponent(subject.search)}`}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
                    >
                      Search
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}
