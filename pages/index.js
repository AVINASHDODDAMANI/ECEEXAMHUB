import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import ProgressOverview from "../components/ProgressOverview";
import seedQuestions from "../data/questions";
import { getLearningSubjects } from "../lib/learning-utils";
import { EXAMS, getInsightData, hasQuestionTag } from "../lib/question-utils";
import { useLearningProgress } from "../lib/use-learning-progress";
import { fetchQuestions } from "../lib/api-client";

const quickActions = [
  {
    eyebrow: "Step 1",
    title: "Topic-wise Practice",
    description:
      "Pick a subject, choose a topic, and solve one MCQ at a time with answer checking built in.",
    bullets: ["Best for daily practice", "Easy filtering by subject and topic"],
    href: "/practice",
    cta: "Start Practicing",
    accentClass: "from-blue-50 via-white to-blue-100/70",
    badgeClass: "bg-blue-100 text-blue-700",
    buttonClass: "bg-blue-600 hover:bg-blue-500",
  },
  {
    eyebrow: "Step 2",
    title: "Previous Year Questions",
    description:
      "Open real past questions, filter by exam and year, and focus on repeated or important ones first.",
    bullets: ["Great for exam pattern understanding", "Quickly find important PYQs"],
    href: "/previous-year",
    cta: "Solve Past Papers",
    accentClass: "from-orange-50 via-white to-amber-100/70",
    badgeClass: "bg-orange-100 text-orange-700",
    buttonClass: "bg-orange-500 hover:bg-orange-400",
  },
  {
    eyebrow: "Step 3",
    title: "Learn Concepts",
    description:
      "Read concepts in plain language, revise formulas, and move into linked PYQs and practice from the same topic.",
    bullets: ["Best place to start if you are new", "Concepts, examples, and formulas together"],
    href: "/learn",
    cta: "Explore Topics",
    accentClass: "from-cyan-50 via-white to-teal-100/70",
    badgeClass: "bg-teal-100 text-teal-700",
    buttonClass: "bg-teal-600 hover:bg-teal-500",
  },
];

export default function Home() {
  const [questions, setQuestions] = useState(seedQuestions);
  const learningSubjects = getLearningSubjects();
  const { progressStats } = useLearningProgress();

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
        // Keep seed questions as fallback so home always renders.
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const insightData = getInsightData(questions);
  const importantQuestions = questions.filter((question) => hasQuestionTag(question, "important"));
  const starterTopics = progressStats.readyTopics.slice(0, 3);
  const topSubjects = insightData.slice(0, 3);

  return (
    <Layout title="ECEExamHub | Home">
      <section className="rounded-[2.25rem] border border-white/70 bg-white/88 px-6 py-10 text-center shadow-panel backdrop-blur sm:px-10">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex rounded-full bg-slatebrand-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-slatebrand-600">
            Clean ECE Preparation Dashboard
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slatebrand-900 sm:text-5xl">
            Prepare for GATE, ISRO, BEL, and BARC exams without confusion.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Everything is arranged in the order a beginner actually needs:
            learn the idea, open previous year questions, then practice until the topic feels easy.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/learn"
              className="rounded-2xl bg-slatebrand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slatebrand-800"
            >
              Start With Learn
            </Link>
            <Link
              href="/previous-year"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slatebrand-300 hover:text-slatebrand-800"
            >
              Open Previous Year Questions
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 text-left sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Subjects
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{learningSubjects.length}</p>
            <p className="mt-2 text-sm text-slate-600">Core ECE subjects organized chapter-wise.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Exams
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{EXAMS.length - 1}</p>
            <p className="mt-2 text-sm text-slate-600">GATE, ISRO, BEL, and BARC coverage.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Ready Topics
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{progressStats.totalTopics}</p>
            <p className="mt-2 text-sm text-slate-600">Concept pages already prepared for study.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Progress
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {progressStats.completionPercent}%
            </p>
            <p className="mt-2 text-sm text-slate-600">Track what you have finished so far.</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Main Sections
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slatebrand-900">
            Start here if you want the simplest flow
          </h2>
          <p className="text-sm leading-7 text-slate-600 sm:text-base">
            These three sections are arranged to remove guesswork and help beginners know what to do next.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {quickActions.map((item) => (
            <article
              key={item.title}
              className={`rounded-[2rem] border border-white/80 bg-gradient-to-br ${item.accentClass} p-6 shadow-panel transition hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${item.badgeClass}`}>
                  {item.eyebrow}
                </span>
                <span className="rounded-2xl bg-white/80 px-3 py-2 text-lg font-bold text-slatebrand-900">
                  {item.title
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
              <h3 className="mt-5 text-3xl font-bold tracking-tight text-slatebrand-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>

              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slatebrand-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={item.href}
                className={`mt-6 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold text-white transition ${item.buttonClass}`}
              >
                {item.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <ProgressOverview progressStats={progressStats} />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_1.1fr_0.85fr]">
        <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slatebrand-500">
                Important Questions
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slatebrand-900">
                Questions worth revising first
              </h2>
            </div>
            <Link
              href="/previous-year"
              className="rounded-2xl bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-200"
            >
              View PYQs
            </Link>
          </div>

          <div className="mt-5 grid gap-4">
            {importantQuestions.slice(0, 3).map((question) => (
              <div
                key={question._id}
                className="rounded-3xl border border-amber-200 bg-amber-50/80 p-4"
              >
                <p className="text-sm font-semibold text-amber-800">
                  {question.subject} | {question.topic}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {question.question}
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                  {question.exam.join(" | ")} | {question.year}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slatebrand-500">
                Starter Topics
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slatebrand-900">
                Good first topics for a beginner
              </h2>
            </div>
            <Link
              href="/learn"
              className="rounded-2xl bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-200"
            >
              Browse Topics
            </Link>
          </div>

          <div className="mt-5 grid gap-4">
            {starterTopics.map((topic) => (
              <Link
                key={topic.topicKey}
                href={topic.href}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-slatebrand-300"
              >
                <p className="text-sm font-semibold text-slatebrand-700">
                  {topic.subjectName} | {topic.chapterTitle}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{topic.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{topic.summary}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                  Estimated time: {topic.estimatedTime}
                </p>
              </Link>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slatebrand-500">
            Top Subjects
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slatebrand-900">
            Subjects with the most question weight
          </h2>
          <div className="mt-5 grid gap-4">
            {topSubjects.map((item) => {
              const subjectMeta = learningSubjects.find(
                (subject) => subject.name === item.subject
              );

              return (
                <div
                  key={item.subject}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{item.subject}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {subjectMeta?.weightage || `${item.total} weighted entries`}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slatebrand-700">
                      {item.total}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    GATE {item.GATE} | ISRO {item.ISRO} | BEL {item.BEL} | BARC {item.BARC}
                  </p>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Learn Roadmap
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slatebrand-900">
            Subject-wise chapters and expected weightage
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {learningSubjects.map((subject) => (
              <div
                key={subject.slug}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-slate-900">{subject.name}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slatebrand-700">
                    {subject.weightage}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {subject.description}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {subject.chapters.length} chapter group(s)
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] bg-slatebrand-900 p-6 text-white shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-300">
            Beginner Guide
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            If you are confused, follow this order
          </h2>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slatebrand-300">
                01
              </p>
              <p className="mt-2 text-lg font-semibold">Open Learn</p>
              <p className="mt-2 text-sm leading-7 text-slatebrand-100">
                Read the topic summary and understand the basic concept first.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slatebrand-300">
                02
              </p>
              <p className="mt-2 text-lg font-semibold">Check PYQs</p>
              <p className="mt-2 text-sm leading-7 text-slatebrand-100">
                See how the exam asks questions from that topic in real papers.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slatebrand-300">
                03
              </p>
              <p className="mt-2 text-lg font-semibold">Practice MCQs</p>
              <p className="mt-2 text-sm leading-7 text-slatebrand-100">
                Solve filtered questions until the pattern becomes familiar.
              </p>
            </div>
          </div>
        </article>
      </section>
    </Layout>
  );
}
