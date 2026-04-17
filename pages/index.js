import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import StatCard from "../components/StatCard";
import seedQuestions from "../data/questions";
import { EXAMS, SUBJECTS, getInsightData } from "../lib/question-utils";
import { fetchQuestions } from "../lib/api-client";

const highlights = [
  {
    title: "Topic-wise Practice",
    description: "Focus on Analog, Digital, Signals, Networks, and Control Systems.",
    href: "/practice",
  },
  {
    title: "Previous Year Questions",
    description: "Switch between GATE, ISRO, BEL, and BARC with year-based filtering.",
    href: "/previous-year",
  },
  {
    title: "Exam Insights",
    description: "Track weightage trends with lightweight subject coverage charts.",
    href: "/insights",
  },
];

export default function Home() {
  const [questions, setQuestions] = useState(seedQuestions);

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

  return (
    <Layout title="ECEExamHub | Home">
      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-[2rem] bg-slatebrand-900 p-8 text-white shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-300">
            Full-Stack ECE Prep Platform
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
            Practice exam-ready MCQs with explanations, filters, and insight dashboards.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slatebrand-100">
            ECEExamHub is designed for ECE students preparing for GATE, ISRO, BEL, and BARC. The UI stays scalable as new questions are added because the pages are driven by reusable cards, filters, and API-friendly data structures.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/practice"
              className="rounded-2xl bg-accent-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accent-300"
            >
              Start Practice
            </Link>
            <Link
              href="/admin"
              className="rounded-2xl border border-slatebrand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slatebrand-800"
            >
              Open Admin Panel
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <StatCard label="Subjects" value={SUBJECTS.length - 1} tone="accent" />
          <StatCard label="Target Exams" value={EXAMS.length - 1} tone="light" />
          <StatCard label="Seed Questions" value={questions.length} tone="dark" />
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        {highlights.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-panel transition hover:-translate-y-1"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
              Module
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          </Link>
        ))}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Coverage Snapshot
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Subjects included in the starter architecture
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {SUBJECTS.slice(1).map((subject) => (
              <div
                key={subject}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-lg font-semibold text-slate-900">{subject}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Topic-driven cards and filters automatically pick up new {subject.toLowerCase()} questions.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Weightage Summary
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Highest coverage subjects
          </h2>
          <div className="mt-6 space-y-4">
            {insightData.map((item) => (
              <div
                key={item.subject}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900">{item.subject}</p>
                  <p className="text-sm text-slate-500">{item.total} weighted entries</p>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  GATE {item.GATE} | ISRO {item.ISRO} | BEL {item.BEL} | BARC {item.BARC}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
