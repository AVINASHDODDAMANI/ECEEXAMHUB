import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import {
  getLearningMasteryState,
  getLearningSubjects,
  getLearningXp,
  searchLearningContent,
} from "../../lib/learning-utils";
import { useLearningProgress } from "../../lib/use-learning-progress";

function DashboardIcon({ name, className = "h-5 w-5" }) {
  if (name === "book") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M5 6.25A2.25 2.25 0 0 1 7.25 4H19v14H7.25A2.25 2.25 0 0 0 5 20.25v-14Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7.25 4v14A2.25 2.25 0 0 0 5 20.25H17.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "folder") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H10l1.7 1.8H17.5A2.5 2.5 0 0 1 20 10.3v6.2A2.5 2.5 0 0 1 17.5 19H6.5A2.5 2.5 0 0 1 4 16.5v-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "test") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="5" y="4" width="14" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 9h6M9 13h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m9.2 16 1.4 1.4 3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "trend") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m6.5 14 4-4 3 2.4 4-5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "streak") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M13.4 3c.5 2-1 3.4-2 4.6-1.2 1.4-2.1 2.6-2.1 4.5 0 1.8 1.2 3.4 2.9 3.9-.1-1.2.2-2.3 1-3.3 1.2-1.5 3-2.8 2.8-5.7 1.7 1.2 3 3.4 3 5.8A6 6 0 1 1 7 11.9C7 8.1 10.1 5.3 13.4 3Z" fill="currentColor" />
      </svg>
    );
  }

  if (name === "pulse") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M3.5 12h4l1.8-4 3.2 8 2.1-4h5.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="m8.8 12.2 2.1 2.2 4.4-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "warning") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M12 5 20 19H4L12 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="16.6" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (name === "notes") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="5" y="4" width="14" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 9h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "download") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M12 5v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m8.5 11.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "bookmark") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M7 5.5A1.5 1.5 0 0 1 8.5 4h7A1.5 1.5 0 0 1 17 5.5V20l-5-3-5 3V5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function DashboardCard({ children, className = "" }) {
  return (
    <section className={`rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({ title, description, actionLabel, actionHref }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-xl font-black tracking-tight text-slate-950">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
        ) : null}
      </div>
      {actionLabel && actionHref ? (
        <Link href={actionHref} className="text-sm font-bold text-portal-700 transition hover:text-portal-800">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

function StatCard({ icon, value, label, note, tintClassName }) {
  return (
    <DashboardCard className="p-4">
      <div className="flex items-center gap-4">
        <div className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl ${tintClassName}`}>
          <DashboardIcon name={icon} className="h-7 w-7" />
        </div>
        <div className="min-w-0">
          <p className="text-3xl font-black tracking-tight text-slate-950">{value}</p>
          <p className="mt-1 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
          <p className="mt-1 text-sm font-medium text-slate-500">{note}</p>
        </div>
      </div>
    </DashboardCard>
  );
}

function StudyMomentum({ xp, masteryState, completedCount, revisionCount }) {
  return (
    <DashboardCard className="p-4">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
          <DashboardIcon name="streak" className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
            <span className="text-3xl font-black tracking-tight text-slate-950">{xp}</span>
            <span className="pb-1 text-sm font-bold text-slate-500">Study XP</span>
          </div>
          <p className="text-sm font-semibold text-slate-700">{masteryState.label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Daily target: complete one topic and review {revisionCount || "one"} saved item.
          </p>
        </div>
        <div className="ml-auto hidden grid-cols-2 gap-2 md:grid">
          <div className="rounded-xl bg-blue-50 px-3 py-2 text-right">
            <p className="text-lg font-black text-slate-950">{completedCount}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-600">Done</p>
          </div>
          <div className="rounded-xl bg-emerald-50 px-3 py-2 text-right">
            <p className="text-lg font-black text-slate-950">{revisionCount}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-600">Revise</p>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}

function SubjectBar({ label, percent, barClassName }) {
  const masteryState = getLearningMasteryState(percent);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <span className="text-sm font-bold text-slate-500">
          {masteryState.label} | {percent}%
        </span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-3 rounded-full ${barClassName}`}
          style={{ width: `${Math.max(percent, percent ? 8 : 0)}%` }}
        />
      </div>
    </div>
  );
}

function StatusPill({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {children}
    </span>
  );
}

function QuickLinkTile({ href, label, icon, tintClassName }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-slate-300 hover:shadow-sm"
    >
      <div className={`flex h-11 w-11 flex-none items-center justify-center rounded-2xl ${tintClassName}`}>
        <DashboardIcon name={icon} className="h-5 w-5" />
      </div>
      <span className="text-sm font-semibold text-slate-800">{label}</span>
    </Link>
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
  const activeSubjects = progressStats.subjects.filter((subject) => subject.totalTopics > 0);
  const coveredPercent = progressStats.completionPercent || 0;
  const masteryState = getLearningMasteryState(coveredPercent, progressStats.completedCount);
  const studyXp = getLearningXp(progressStats.completedCount);
  const continueSubjectProgress = activeSubjects.find(
    (subject) => subject.slug === continueTopic?.subjectSlug
  );
  const continuePercent = continueSubjectProgress?.completionPercent || 0;
  const continueMasteryState = getLearningMasteryState(
    continuePercent,
    continueSubjectProgress?.completedTopics || 0
  );
  const focusSubjects = activeSubjects.slice().sort((a, b) => b.completionPercent - a.completionPercent).slice(0, 5);
  const prioritySubjects = activeSubjects
    .slice()
    .sort((a, b) => a.completionPercent - b.completionPercent)
    .slice(0, 5);
  const recentActivity = [
    {
      title: "Completed Test",
      subtitle: "GATE ECE Mock Test 4",
      meta: "Today, 9:30 AM",
      tag: "72%",
      icon: "check",
      tintClassName: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Studied Topic",
      subtitle: "Operational Amplifiers",
      meta: "Today, 8:15 AM",
      tag: "",
      icon: "book",
      tintClassName: "bg-blue-100 text-blue-600",
    },
    {
      title: "Added Note",
      subtitle: "Laplace Transform Properties",
      meta: "Yesterday, 7:45 PM",
      tag: "",
      icon: "notes",
      tintClassName: "bg-violet-100 text-violet-600",
    },
  ];
  const upcomingTests = [
    {
      title: "GATE ECE Mock Test 5",
      subtitle: "Full Length Mock Test",
      date: "24 May, 2025",
      time: "10:00 AM",
      tintClassName: "bg-violet-100 text-violet-600",
    },
    {
      title: "Control Systems - Test 3",
      subtitle: "Chapter Test",
      date: "25 May, 2025",
      time: "09:00 AM",
      tintClassName: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Digital Electronics - Test 2",
      subtitle: "Chapter Test",
      date: "26 May, 2025",
      time: "09:00 AM",
      tintClassName: "bg-amber-100 text-amber-600",
    },
  ];
  const searchPreview = search ? searchResults.slice(0, 3) : [];

  return (
    <Layout
      title="ECEExamHub | Learning Dashboard"
      description="Learning dashboard with subject mastery, tests, revision activity, quick links, and daily preparation focus."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="space-y-5">
        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <DashboardCard className="bg-transparent p-0 shadow-none">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Welcome back, Aspirant!
              </h1>
              <p className="mt-2 text-base leading-7 text-slate-500">
                Continue with your next topic, track progress, and keep revision on schedule.
              </p>
            </div>
          </DashboardCard>
          <StudyMomentum
            xp={studyXp}
            masteryState={masteryState}
            completedCount={progressStats.completedCount}
            revisionCount={revisionCount}
          />
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon="book"
            value={progressStats.completedCount}
            label="Topics Done"
            note={`${progressStats.totalTopics} ready topics on your path`}
            tintClassName="bg-blue-100 text-blue-600"
          />
          <StatCard
            icon="trend"
            value={studyXp}
            label="Study XP"
            note="Earned from completed learning topics"
            tintClassName="bg-emerald-100 text-emerald-600"
          />
          <StatCard
            icon="bookmark"
            value={revisionCount}
            label="Revision Queue"
            note="Saved topics waiting for recall"
            tintClassName="bg-amber-100 text-amber-600"
          />
          <StatCard
            icon="pulse"
            value={masteryState.label}
            label="Mastery"
            note={masteryState.note}
            tintClassName="bg-violet-100 text-violet-600"
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <DashboardCard>
            <SectionHeader
              title="Continue Learning"
              description="Resume the next incomplete topic from your current study path."
              actionLabel="Open Path"
              actionHref={continueTopic?.href || "/subjects"}
            />
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-[#625cf6] to-[#7f73ff] text-white shadow-sm">
                  <DashboardIcon name="pulse" className="h-7 w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xl font-black tracking-tight text-slate-950">
                        {continueTopic?.subjectName || "Analog Electronics"}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {continueTopic?.title || "BJT biasing and small signal models"}
                      </p>
                    </div>
                    <StatusPill className="bg-blue-100 text-blue-700">
                      {continueMasteryState.label}
                    </StatusPill>
                  </div>
                  <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-emerald-500 to-[#2f7df6]"
                      style={{ width: `${Math.max(continuePercent, continuePercent ? 8 : 0)}%` }}
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
                    <span>{continuePercent}% subject coverage</span>
                    <span>Daily target: finish this topic</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href={continueTopic?.href || "/subjects"}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1d63d8] px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(29,99,216,0.22)] transition hover:bg-[#1856bd]"
                >
                  Resume Topic
                </Link>
                <Link
                  href={continueTopic?.href || "/subjects"}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  View Details
                </Link>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard>
            <SectionHeader
              title="Upcoming Tests"
              description="Scheduled mock tests and chapter tests."
              actionLabel="View All"
              actionHref="/mock-tests"
            />
            <div className="mt-5 grid gap-3">
              {upcomingTests.map((test) => (
                <Link
                  key={test.title}
                  href="/mock-tests"
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:bg-white"
                >
                  <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl ${test.tintClassName}`}>
                    <DashboardIcon name="test" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold text-slate-900">{test.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{test.subtitle}</p>
                  </div>
                  <div className="text-right text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    <p>{test.date}</p>
                    <p className="mt-1">{test.time}</p>
                  </div>
                </Link>
              ))}
            </div>
          </DashboardCard>
        </section>

        <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-r from-[#091641] via-[#102867] to-[#163983] text-white shadow-[0_20px_56px_rgba(9,22,65,0.16)]">
          <div className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200">Preparation Overview</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">Today&apos;s Study Status</h2>
            </div>
            <StatusPill className="bg-emerald-500/16 text-emerald-200">{masteryState.label}</StatusPill>
          </div>
          <div className="grid gap-4 border-t border-white/10 px-5 py-5 md:grid-cols-3">
            {[
              [studyXp.toLocaleString(), "Study XP"],
              [`${coveredPercent}%`, "Syllabus Covered"],
              [revisionCount, "Revision Queue"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-4xl font-black tracking-tight">{value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">{label}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 bg-white px-5 py-5 text-slate-900">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Overall syllabus progress</p>
              <span className="text-sm font-black text-[#1d63d8]">{coveredPercent}%</span>
            </div>
            <div className="mt-3 h-2.5 rounded-full bg-slate-100">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-[#1d63d8] to-[#2a78f5]"
                style={{ width: `${coveredPercent}%` }}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <DashboardCard>
            <SectionHeader
              title="Subject Progress"
              description="Coverage across your most active subjects."
              actionLabel="View All"
              actionHref="/subjects"
            />
            <div className="mt-5 grid gap-4">
              {(focusSubjects.length ? focusSubjects : subjects.slice(0, 5)).map((subject, index) => (
                <SubjectBar
                  key={subject.slug || subject.name}
                  label={subject.name}
                  percent={subject.completionPercent || 0}
                  barClassName={["bg-emerald-500", "bg-blue-500", "bg-cyan-500", "bg-orange-500", "bg-violet-500"][index % 5]}
                />
              ))}
            </div>
          </DashboardCard>

          <DashboardCard>
            <SectionHeader
              title="Priority Subjects"
              description="Low-coverage subjects to pull back into your routine."
            />
            <div className="mt-5 grid gap-3">
              {prioritySubjects.map((subject) => (
                <Link
                  key={subject.slug}
                  href="/subjects"
                  className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 transition hover:bg-white"
                >
                  <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white text-orange-500">
                    <DashboardIcon name="warning" className="h-4 w-4" />
                  </div>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-slate-700">
                    {subject.name}
                  </span>
                  <span className="text-xs font-bold text-orange-700">
                    {subject.completionPercent}%
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/subjects" className="mt-5 inline-flex text-sm font-bold text-orange-600">
              Open subjects -&gt;
            </Link>
          </DashboardCard>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <DashboardCard>
            <SectionHeader
              title={search ? "Search Results" : "Recent Activity"}
              description={
                search
                  ? "Matched learning items for your dashboard search."
                  : "Your latest study, test, and revision actions."
              }
              actionLabel="View All"
              actionHref={search ? "/search" : "/learn"}
            />
            <div className="mt-5 grid gap-3">
              {search ? (
                searchPreview.length ? (
                  searchPreview.map((result) => (
                    <Link
                      key={result.href}
                      href={result.href}
                      className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:bg-white"
                    >
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                        <DashboardIcon name="notes" className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-semibold text-slate-900">{result.title}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {result.subjectName} • {result.chapterTitle}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm leading-7 text-slate-600">
                    No topic matched that search yet. Try KCL, Laplace, CMOS, resonance, or flip-flop.
                  </div>
                )
              ) : (
                recentActivity.map((item) => (
                  <div
                    key={`${item.title}-${item.subtitle}`}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl ${item.tintClassName}`}>
                      <DashboardIcon name={item.icon} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">{item.title}</p>
                      <p className="mt-1 truncate text-base font-semibold text-slate-900">{item.subtitle}</p>
                    </div>
                    <div className="text-right text-xs font-semibold text-slate-400">
                      {item.tag ? <p className="text-sm font-bold text-slate-600">{item.tag}</p> : null}
                      <p>{item.meta}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </DashboardCard>

          <DashboardCard>
            <SectionHeader
              title="Quick Links"
              description="Common revision and practice shortcuts."
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <QuickLinkTile href="/notes" label="My Notes" icon="notes" tintClassName="bg-blue-100 text-blue-600" />
              <QuickLinkTile href="/previous-year" label="PYQs" icon="folder" tintClassName="bg-emerald-100 text-emerald-600" />
              <QuickLinkTile href="/subjects" label="Bookmarks" icon="bookmark" tintClassName="bg-amber-100 text-amber-600" />
              <QuickLinkTile href="/notes" label="Formula Sheet" icon="trend" tintClassName="bg-violet-100 text-violet-600" />
              <QuickLinkTile href="/notes" label="Downloads" icon="download" tintClassName="bg-blue-100 text-blue-600" />
              <QuickLinkTile href="/learn" label="Study Plan" icon="check" tintClassName="bg-pink-100 text-pink-600" />
            </div>
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4">
              <p className="text-sm font-bold text-slate-700">
                Saved for revision: <span className="text-emerald-700">{revisionCount} topics</span>
              </p>
            </div>
          </DashboardCard>
        </section>
      </div>
    </Layout>
  );
}
