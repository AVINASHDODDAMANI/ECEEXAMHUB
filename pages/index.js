import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import ProgressOverview from "../components/ProgressOverview";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import seedQuestions from "../data/questions";
import { getLearningSubjects } from "../lib/learning-utils";
import { EXAMS, getInsightData, hasQuestionTag } from "../lib/question-utils";
import { useLearningProgress } from "../lib/use-learning-progress";
import { fetchQuestions } from "../lib/api-client";

const heroStats = [
  { label: "Questions", value: "500+" },
  { label: "Topics", value: "20+" },
  { label: "PYQs", value: "Included" },
];

const featureCards = [
  {
    title: "Focused Practice",
    description:
      "Solve questions by subject and topic with instant feedback and a smooth study flow.",
    href: "/practice",
    cta: "Start Practice",
  },
  {
    title: "Past Year Questions",
    description:
      "Browse real exam questions filtered by year, exam, subject, and topic.",
    href: "/previous-year",
    cta: "Browse PYQs",
  },
  {
    title: "Concept Learning",
    description:
      "Read ready chapters, formula summaries, and linked questions for every topic.",
    href: "/learn",
    cta: "Browse Topics",
  },
  {
    title: "Progress Tracker",
    description:
      "Track completed topics and keep revision-ready concepts within reach.",
    href: "/learn",
    cta: "View Progress",
  },
];

const heroActions = [
  { label: "Start Practice", href: "/practice", variant: "primary" },
  { label: "Browse Topics", href: "/learn", variant: "secondary" },
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
      <div className="mx-auto max-w-5xl px-3 pb-6 pt-4 sm:px-6 lg:px-8">
        <HeroSection stats={heroStats} actions={heroActions} />

        <section className="mt-4 grid gap-3 grid-cols-2 md:grid-cols-4">
          {featureCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.95fr_0.95fr]">
          <article className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 text-slate-100 shadow-panel">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                  Important Questions
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                  Questions worth revising first
                </h2>
              </div>
              <Link
                href="/previous-year"
                className="rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                View PYQs
              </Link>
            </div>

            <div className="mt-5 grid gap-4">
              {importantQuestions.slice(0, 3).map((question) => (
                <div
                  key={question._id}
                  className="rounded-3xl border border-slate-800/70 bg-slate-900/80 p-4"
                >
                  <p className="text-sm font-semibold text-slate-300">
                    {question.subject} | {question.topic}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    {question.question}
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                    {question.exam.join(" | ")} | {question.year}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 text-slate-100 shadow-panel">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                  Starter Topics
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                  Good first topics for a beginner
                </h2>
              </div>
              <Link
                href="/learn"
                className="rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
              >
                Browse Topics
              </Link>
            </div>

            <div className="mt-5 grid gap-4">
              {starterTopics.map((topic) => (
                <Link
                  key={topic.topicKey}
                  href={topic.href}
                  className="rounded-3xl border border-slate-800/70 bg-slate-900/75 p-4 transition hover:-translate-y-0.5 hover:border-slate-600"
                >
                  <p className="text-sm font-semibold text-slate-300">
                    {topic.subjectName} | {topic.chapterTitle}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{topic.summary}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Estimated time: {topic.estimatedTime}
                  </p>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 text-slate-100 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
              Top Subjects
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
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
                    className="rounded-3xl border border-slate-800/70 bg-slate-900/80 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-white">{item.subject}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {subjectMeta?.weightage || `${item.total} weighted entries`}
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200">
                        {item.total}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      GATE {item.GATE} | ISRO {item.ISRO} | BEL {item.BEL} | BARC {item.BARC}
                    </p>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <section className="mt-8">
          <ProgressOverview progressStats={progressStats} />
        </section>

        <section className="mt-4 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-6 text-slate-100 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
              Learn Roadmap
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              Subject-wise chapters and expected weightage
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {learningSubjects.map((subject) => (
                <div
                  key={subject.slug}
                  className="rounded-3xl border border-slate-800/70 bg-slate-900/80 p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold text-white">{subject.name}</p>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200">
                      {subject.weightage}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {subject.description}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {subject.chapters.length} chapter group(s)
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Beginner Guide
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              If you are confused, follow this order
            </h2>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  01
                </p>
                <p className="mt-2 text-lg font-semibold text-white">Open Learn</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Read the topic summary and understand the basic concept first.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  02
                </p>
                <p className="mt-2 text-lg font-semibold text-white">Check PYQs</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  See how the exam asks questions from that topic in real papers.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  03
                </p>
                <p className="mt-2 text-lg font-semibold text-white">Practice MCQs</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Solve filtered questions until the pattern becomes familiar.
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </Layout>
  );
}
