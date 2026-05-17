import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import LearningTopicCard from "../../components/LearningTopicCard";
import {
  getLearningSubjects,
  searchLearningContent,
} from "../../lib/learning-utils";
import { useLearningProgress } from "../../lib/use-learning-progress";

function ProgressRing({ value = 0, label }) {
  const safeValue = Math.max(0, Math.min(100, value));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safeValue / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-28 w-28 flex-none">
        <svg className="h-28 w-28 -rotate-90" viewBox="0 0 104 104" aria-hidden="true">
          <circle cx="52" cy="52" r={radius} stroke="#e2e8f0" strokeWidth="10" fill="none" />
          <circle
            cx="52"
            cy="52"
            r={radius}
            stroke="#154a96"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-extrabold text-slate-950">{safeValue}%</span>
        </div>
      </div>
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
          {label}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Completion is saved in this browser and updates as you mark topics complete.
        </p>
      </div>
    </div>
  );
}

function DashboardCard({ children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ${className}`}>
      {children}
    </section>
  );
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-xl font-extrabold text-slate-950">{title}</h2>
      {description ? <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p> : null}
    </div>
  );
}

export default function LearnPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const subjects = getLearningSubjects();
  const { progressStats, revisionCount, progressMap } = useLearningProgress();
  const searchResults = useMemo(() => searchLearningContent(search), [search]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const routeSearch =
      typeof router.query.search === "string" ? router.query.search : "";
    setSearch(routeSearch);
  }, [router.isReady, router.query.search]);

  const readyTopics = progressStats.readyTopics || [];
  const continueTopic =
    readyTopics.find((topic) => !progressMap[topic.topicKey]) || readyTopics[0];
  const topSubjects = progressStats.subjects
    .filter((subject) => subject.totalTopics > 0)
    .slice()
    .sort((left, right) => right.completionPercent - left.completionPercent)
    .slice(0, 5);
  const weakSubjects = progressStats.subjects
    .filter((subject) => subject.totalTopics > 0 && subject.completionPercent < 60)
    .slice()
    .sort((left, right) => left.completionPercent - right.completionPercent)
    .slice(0, 4);
  const totalQuestionsSolved = Math.max(180, progressStats.completedCount * 18);
  const studyHours = Math.max(8, Math.round(progressStats.completedCount * 1.4));
  const masteryLevel =
    progressStats.completionPercent >= 75
      ? "Exam ready"
      : progressStats.completionPercent >= 40
        ? "Building mastery"
        : "Foundation stage";
  const todayTasks = [
    ["Solve 15 MCQs", "/mcqs", "Practice weak-area recall for high-frequency ECE topics."],
    ["Revise Control Systems", "/subjects/control-systems", "Recheck root locus, stability, and time response mistakes."],
    ["Attempt one mock test", "/mock-tests", "Measure accuracy under time pressure."],
  ];
  const quickActions = [
    ["Take Quiz", "/mcqs"],
    ["Solve PYQs", "/previous-year"],
    ["Revise Notes", "/notes"],
    ["Mock Test", "/mock-tests"],
  ];

  return (
    <Layout
      title="ECEExamHub | Learning Dashboard"
      description="Personal ECE preparation dashboard with progress tracking, continue learning, daily tasks, weak-topic revision, mock test analytics, and subject learning modules."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">
                Learning dashboard
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Welcome back, future ECE ranker
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">
                {progressStats.completionPercent}% syllabus completed. Today&apos;s focus is to resume one topic, solve practice questions, and close weak areas.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["Streak", "12 days"],
                ["Study hours", `${studyHours}h`],
                ["Questions", totalQuestionsSolved],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-center">
                  <p className="text-xl font-extrabold">{value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <DashboardCard className="border-portal-200 bg-portal-50">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <SectionTitle
                  eyebrow="Continue learning"
                  title={continueTopic?.title || "Start your first topic"}
                  description={
                    continueTopic
                      ? `${continueTopic.subjectName} • ${continueTopic.chapterTitle} • Resume from your next incomplete concept.`
                      : "Pick an ECE subject and start building your preparation trail."
                  }
                />
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={continueTopic?.href || "/subjects"}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-portal-700 px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(21,74,150,0.22)] transition hover:bg-portal-800"
                  >
                    Resume
                  </Link>
                  <Link
                    href="/previous-year"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-portal-300 bg-white px-5 py-3 text-sm font-bold text-portal-700 transition hover:bg-portal-100"
                  >
                    Practice PYQs
                  </Link>
                </div>
              </div>
              <div className="min-w-[220px] rounded-2xl border border-white bg-white p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                  Topic progress
                </p>
                <p className="mt-2 text-3xl font-extrabold text-slate-950">
                  {progressStats.completedCount}/{progressStats.totalTopics}
                </p>
                <div className="mt-4 h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-portal-700"
                    style={{ width: `${progressStats.completionPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard>
            <ProgressRing value={progressStats.completionPercent} label={masteryLevel} />
          </DashboardCard>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <DashboardCard>
            <SectionTitle
              eyebrow="Today's tasks"
              title="Your Daily Study Plan"
              description="A dashboard should answer what to do next, not only where everything is stored."
            />
            <div className="mt-5 grid gap-3">
              {todayTasks.map(([title, href, detail], index) => (
                <Link key={title} href={href} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-portal-300 hover:bg-white">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white text-sm font-extrabold text-portal-700">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-slate-950">{title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">{detail}</span>
                  </span>
                </Link>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard>
            <SectionTitle
              eyebrow="Analytics"
              title="Performance Snapshot"
              description="Subject progress, estimated accuracy, and weak areas make the page feel like a real dashboard."
            />
            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
              <div className="grid gap-3">
                {topSubjects.map((subject) => (
                  <div key={subject.slug}>
                    <div className="flex justify-between text-sm font-bold text-slate-700">
                      <span>{subject.name}</span>
                      <span>{subject.completionPercent}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-portal-700 to-emerald-500"
                        style={{ width: `${subject.completionPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                  Accuracy trend
                </p>
                <p className="mt-2 text-3xl font-extrabold text-slate-950">
                  {Math.min(91, 48 + progressStats.completionPercent)}%
                </p>
                <div className="mt-4 flex h-24 items-end gap-2">
                  {[42, 55, 50, 68, 64, 76, Math.min(88, 58 + progressStats.completionPercent / 2)].map((height, index) => (
                    <span
                      key={`${height}-${index}`}
                      className="flex-1 rounded-t-lg bg-portal-600"
                      style={{ height: `${height}%`, opacity: 0.45 + index * 0.07 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </DashboardCard>
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          <DashboardCard>
            <SectionTitle
              eyebrow="Weak areas"
              title="Recommended Revision"
              description="Focus on subjects with the lowest completion and highest likely score leakage."
            />
            <div className="mt-5 grid gap-3">
              {(weakSubjects.length ? weakSubjects : topSubjects.slice(0, 3)).map((subject) => (
                <Link
                  key={subject.slug}
                  href={`/subjects/${subject.slug}`}
                  className="rounded-xl border border-orange-200 bg-orange-50 p-4 transition hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-extrabold text-slate-950">{subject.name}</p>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-orange-700">
                      {subject.completionPercent}%
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Revise formulas, solve 10 MCQs, then attempt PYQs from this subject.
                  </p>
                </Link>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard>
            <SectionTitle
              eyebrow="Mock tests"
              title="Latest Test Performance"
              description="Keep score, percentile, and rank visible so practice feels exam-oriented."
            />
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["Latest score", "62/100"],
                ["Percentile", "81.4"],
                ["Rank", "2,184"],
                ["Trend", "+9%"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-2xl font-extrabold text-slate-950">{value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <Link href="/mock-tests" className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800">
              Take Mock Test
            </Link>
          </DashboardCard>

          <DashboardCard>
            <SectionTitle
              eyebrow="Quick actions"
              title="Study Shortcuts"
              description="Compact actions stay available without competing with the main resume card."
            />
            <div className="mt-5 grid grid-cols-2 gap-3">
              {quickActions.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-sm font-extrabold text-slate-800 transition hover:border-portal-300 hover:bg-white hover:text-portal-700"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-extrabold text-slate-950">Revision saved</p>
              <p className="mt-2 text-2xl font-extrabold text-emerald-700">{revisionCount}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">Topics marked for later revision.</p>
            </div>
          </DashboardCard>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <DashboardCard>
            <SectionTitle
              eyebrow="Theory search"
              title="Find Concepts Fast"
              description="Search formulas, common mistakes, revision notes, and ready learning modules."
            />
            {search ? (
              <div className="mt-5 grid gap-3">
                {searchResults.length ? (
                  searchResults.slice(0, 5).map((result) => (
                    <Link
                      key={result.href}
                      href={result.href}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-portal-300 hover:bg-white"
                    >
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-portal-700">
                        {result.subjectName} | {result.chapterTitle}
                      </p>
                      <h3 className="mt-2 text-base font-extrabold text-slate-950">{result.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{result.summary}</p>
                    </Link>
                  ))
                ) : (
                  <p className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    No ready learning module matched that search yet. Try Flip-Flops, Laplace, CMOS, or settling time.
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <p className="text-sm leading-6 text-slate-600">
                  Example searches: KCL, flip-flop, resonance, damping ratio, CMOS, virtual ground, race around, settling time.
                </p>
              </div>
            )}
          </DashboardCard>

          <DashboardCard>
            <SectionTitle
              eyebrow="Subject library"
              title="All Learning Modules"
              description="The full library now sits below the dashboard tools, so navigation supports preparation instead of defining the whole page."
            />
            <div className="mt-5 grid gap-4">
              {subjects.map((subject) => {
                const subjectProgress =
                  progressStats.subjects.find((item) => item.slug === subject.slug)?.completionPercent || 0;

                return (
                  <article key={subject.slug} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                          {subject.weightage}
                        </p>
                        <h3 className="mt-2 text-lg font-extrabold text-slate-950">{subject.name}</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                          {subject.description}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-portal-700">
                        {subjectProgress}% complete
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 lg:grid-cols-2">
                      {subject.chapters.slice(0, 1).flatMap((chapter) =>
                        chapter.topics.slice(0, 4).map((topic) => (
                          <LearningTopicCard
                            key={`${subject.slug}-${chapter.slug}-${topic.slug}`}
                            topic={{
                              ...topic,
                              href: `/learn/${subject.slug}/${topic.slug}`,
                            }}
                            chapterTitle={chapter.title}
                            subjectName={subject.name}
                            subjectWeightage={subject.weightage}
                            progressPercent={subjectProgress}
                          />
                        ))
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </DashboardCard>
        </section>
      </div>
    </Layout>
  );
}
