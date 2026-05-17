import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout";
import seedQuestions from "../data/questions";
import { fetchQuestions } from "../lib/api-client";
import { hasQuestionTag } from "../lib/question-utils";
import { getReadyLearningTopics } from "../lib/learning-utils";

function MetricCard({ label, value, detail }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-2xl font-extrabold text-slate-950">{value}</p>
      <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      {detail ? <p className="mt-2 text-sm leading-5 text-slate-600">{detail}</p> : null}
    </div>
  );
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function TestCard({ test, featured = false }) {
  return (
    <article
      className={`rounded-2xl border bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ${
        featured ? "border-portal-300" : "border-slate-200"
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
            {test.type}
          </p>
          <h3 className="mt-2 text-xl font-extrabold text-slate-950">{test.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{test.subtitle}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] ${
            test.difficulty === "Advanced"
              ? "bg-orange-100 text-orange-700"
              : test.difficulty === "Moderate"
                ? "bg-cyan-100 text-cyan-700"
                : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {test.difficulty}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Questions", test.count],
          ["Duration", test.duration],
          ["Marks", test.marks],
          ["Review", test.review],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-lg font-extrabold text-slate-950">{value}</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {test.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600">
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={test.href}
          className={`inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-sm font-extrabold transition ${
            featured
              ? "bg-portal-700 text-white shadow-[0_12px_28px_rgba(21,74,150,0.22)] hover:bg-portal-800"
              : "border border-portal-300 bg-portal-50 text-portal-700 hover:bg-white"
          }`}
        >
          Start Test
        </Link>
      </div>
    </article>
  );
}

export default function MockTestsPage() {
  const [questions, setQuestions] = useState(seedQuestions);
  const readyTopics = getReadyLearningTopics();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      try {
        const data = await fetchQuestions({}, { signal: controller.signal });
        if (mounted && data.length) {
          setQuestions(data);
        }
      } catch {
        // Seed data keeps the page working offline.
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const importantQuestions = useMemo(
    () => questions.filter((question) => hasQuestionTag(question, "important")),
    [questions]
  );
  const repeatedQuestions = useMemo(
    () => questions.filter((question) => hasQuestionTag(question, "repeated")),
    [questions]
  );

  const mockTests = useMemo(
    () => [
      {
        title: "GATE ECE Full-Length Simulation",
        subtitle: "A professional mock flow for time management, accuracy tracking, and post-test review.",
        type: "Featured mock",
        count: Math.min(65, Math.max(30, questions.length)),
        duration: "180 min",
        marks: "100",
        review: "Detailed",
        difficulty: "Advanced",
        tags: ["Full syllabus", "Negative marking", "Rank estimate"],
        href: "/practice",
      },
      {
        title: "High-Impact Questions Mock",
        subtitle: "Prioritize important questions and frequently tested concepts before a major test day.",
        type: "Priority practice",
        count: importantQuestions.length,
        duration: "45 min",
        marks: "50",
        review: "Topic-wise",
        difficulty: "Moderate",
        tags: ["Important", "Scoring areas", "Fast revision"],
        href: "/practice?search=important",
      },
      {
        title: "Repeated PYQ Pattern Mock",
        subtitle: "Practice repeated question styles to identify patterns that return across exam cycles.",
        type: "PYQ pattern",
        count: repeatedQuestions.length,
        duration: "60 min",
        marks: "65",
        review: "PYQ linked",
        difficulty: "Moderate",
        tags: ["Repeated", "GATE style", "Pattern recall"],
        href: "/previous-year?search=repeated",
      },
      {
        title: "Subject Weak-Area Drill",
        subtitle: "Use ready learning topics to create focused tests for subjects that need improvement.",
        type: "Adaptive drill",
        count: readyTopics.length,
        duration: "30 min",
        marks: "30",
        review: "Concept map",
        difficulty: "Foundation",
        tags: ["Weak topics", "Subject focus", "Revision"],
        href: "/learn",
      },
    ],
    [importantQuestions.length, questions.length, readyTopics.length, repeatedQuestions.length]
  );

  const analytics = [
    ["Latest score", "62/100", "Next target: 70+"],
    ["Accuracy", "78%", "Strong in networks"],
    ["Percentile", "81.4", "Estimated rank range"],
    ["Time left", "14 min", "Improve pacing"],
  ];

  return (
    <Layout
      title="ECEExamHub | Professional Mock Tests"
      description="Take GATE ECE mock tests with professional test cards, timing, score analytics, weak-area review, PYQ pattern practice, and exam readiness tracking."
    >
      <div className="mx-auto max-w-7xl space-y-7">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
          <div className="grid gap-0 lg:grid-cols-[1fr_420px]">
            <div className="bg-slate-950 p-6 text-white sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">
                Exam simulation center
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
                Take Mock Tests Like the Real Exam
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                Practice under time pressure, review accuracy trends, identify weak subjects, and convert every mock into a focused revision plan.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/practice"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-cyan-50"
                >
                  Start Full Mock
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Review Weak Topics
                </Link>
              </div>
            </div>

            <div className="bg-slate-50 p-5 sm:p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                Performance snapshot
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {analytics.map(([label, value, detail]) => (
                  <MetricCard key={label} label={label} value={value} detail={detail} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Mock sets" value={mockTests.length} detail="Full and focused formats" />
          <MetricCard label="Question bank" value={questions.length} detail="Available for practice" />
          <MetricCard label="Important" value={importantQuestions.length} detail="High-priority questions" />
          <MetricCard label="Ready topics" value={readyTopics.length} detail="Linked to learning modules" />
        </section>

        <section>
          <SectionTitle
            eyebrow="Test catalog"
            title="Choose the Right Mock for Your Preparation Stage"
            description="Use full-length mocks for exam stamina, PYQ pattern mocks for recognition, and weak-area drills when analytics show a specific gap."
          />
          <div className="mt-5 grid gap-5">
            <TestCard test={mockTests[0]} featured />
            <div className="grid gap-5 xl:grid-cols-3">
              {mockTests.slice(1).map((test) => (
                <TestCard key={test.title} test={test} />
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
            <SectionTitle
              eyebrow="Post-test review"
              title="Turn Every Score Into an Action Plan"
              description="A professional mock section should not stop at starting tests. Students need a clear review loop after every attempt."
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Analyze", "Check score, accuracy, skipped questions, and time spent."],
                ["Diagnose", "Separate concept errors from calculation and time-pressure mistakes."],
                ["Revise", "Open linked notes, PYQs, and weak-topic drills for the next session."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-extrabold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">
              Exam rules
            </p>
            <h2 className="mt-2 text-xl font-extrabold text-slate-950">
              Attempt Conditions
            </h2>
            <div className="mt-4 grid gap-3">
              {[
                "Use a single sitting with no paused revision in between.",
                "Mark questions for review instead of guessing blindly.",
                "Spend more time reviewing mistakes than celebrating the score.",
                "Repeat weak-area drills before the next full mock.",
              ].map((rule) => (
                <p key={rule} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-700">
                  {rule}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
