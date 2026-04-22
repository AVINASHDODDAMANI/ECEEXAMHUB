import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import HeroSection from "../components/HeroSection";
import seedQuestions from "../data/questions";
import { getLearningSubjects, getReadyLearningTopics } from "../lib/learning-utils";
import { useLearningProgress } from "../lib/use-learning-progress";
import { fetchQuestions } from "../lib/api-client";

const heroActions = [
  { label: "Open Subjects", href: "/subjects", variant: "primary" },
  { label: "Open Mock Tests", href: "/mock-tests", variant: "secondary" },
];

const examTags = ["GATE", "ISRO", "BEL", "BARC"];

export default function Home() {
  const [questions, setQuestions] = useState(seedQuestions);
  const learningSubjects = getLearningSubjects();
  const readyTopics = getReadyLearningTopics();
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
        // Seed data keeps the homepage working offline.
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const heroStats = [
    { label: "Questions", value: String(questions.length).padStart(2, "0") },
    { label: "Ready Topics", value: String(progressStats.totalTopics).padStart(2, "0") },
    { label: "Completion", value: `${progressStats.completionPercent}%` },
  ];

  const homepageSections = [
    {
      title: "Subjects",
      value: `${learningSubjects.length}`,
      detail: "subject tracks",
      description: "Open only the subject section and move into chapter-wise learning from there.",
      href: "/subjects",
      cardClassName:
        "border-blue-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] hover:border-blue-300",
      badgeClassName:
        "bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white",
    },
    {
      title: "MCQs",
      value: `${questions.length}`,
      detail: "question cards",
      description: "Open the MCQ page separately with options, answers, explanations, and exam tags.",
      href: "/mcqs",
      cardClassName:
        "border-cyan-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#eefcfb_100%)] hover:border-cyan-300",
      badgeClassName:
        "bg-cyan-100 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white",
    },
    {
      title: "Notes",
      value: `${readyTopics.length}`,
      detail: "ready notes",
      description: "Open only the notes library with all topic-wise notes in one place.",
      href: "/notes",
      cardClassName:
        "border-amber-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#fff7eb_100%)] hover:border-amber-300",
      badgeClassName:
        "bg-amber-100 text-amber-700 group-hover:bg-amber-500 group-hover:text-white",
    },
    {
      title: "Mock Tests",
      value: "03",
      detail: "mock sets",
      description: "Open only the mock test section with revision-focused mock question sets.",
      href: "/mock-tests",
      cardClassName:
        "border-emerald-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#ecfdf5_100%)] hover:border-emerald-300",
      badgeClassName:
        "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white",
    },
  ];

  return (
    <Layout title="ECEExamHub | Home" pageClassName="pt-5">
      <div className="mx-auto max-w-6xl">
        <HeroSection stats={heroStats} actions={heroActions} examTags={examTags} />

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {homepageSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className={`group rounded-lg border p-3.5 shadow-sm transition hover:-translate-y-1 ${section.cardClassName}`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {section.title}
              </p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xl font-semibold tracking-tight text-slate-900">{section.value}</p>
                  <p className="text-xs text-slate-500">{section.detail}</p>
                </div>
                <span className={`rounded-md px-2 py-1 text-[11px] font-medium transition ${section.badgeClassName}`}>
                  Open
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-5 text-slate-600">{section.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </Layout>
  );
}
