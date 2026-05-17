import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { examDirectory } from "../data/exam-directory";
import seedQuestions from "../data/questions";
import { getReadyLearningTopics } from "../lib/learning-utils";
import { useLearningProgress } from "../lib/use-learning-progress";
import { fetchQuestions } from "../lib/api-client";

function MiniIcon({ type }) {
  const common = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
  };

  const paths = {
    play: "M8 5v14l11-7L8 5Z",
    target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    chart: "M4 19V5m0 14h16M8 16v-5m4 5V7m4 9v-8",
    spark: "M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6L12 3Zm6 10 1 2.8 3 1-3 1-1 2.8-1-2.8-3-1 3-1 1-2.8Z",
    paper: "M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm7 0v5h4M8 13h7M8 17h5",
    brain: "M9 4a3 3 0 0 0-3 3v1a4 4 0 0 0 0 8v1a3 3 0 0 0 5 2.2A3 3 0 0 0 16 17v-1a4 4 0 0 0 0-8V7a3 3 0 0 0-5-2.2A3 3 0 0 0 9 4Z",
  };

  return (
    <svg {...common}>
      <path
        d={paths[type] || paths.spark}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionHeader({ eyebrow, title, description, align = "center" }) {
  return (
    <div className={align === "left" ? "max-w-2xl" : "mx-auto max-w-3xl text-center"}>
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function DashboardPreview({ completionPercent, completedTopics }) {
  const subjectBars = [
    ["Network Theory", 82, "bg-emerald-500"],
    ["Analog Electronics", 68, "bg-portal-600"],
    ["Signals", 54, "bg-cyan-500"],
    ["Control Systems", 47, "bg-orange-500"],
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.14)]">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-950 px-5 py-4 text-white">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
            Live prep dashboard
          </p>
          <h2 className="mt-1 text-lg font-extrabold">Today&apos;s GATE ECE focus</h2>
        </div>
        <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
          12 day streak
        </div>
      </div>

      <div className="grid gap-4 p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Syllabus", `${completionPercent || 72}%`],
            ["Solved", "1,240"],
            ["Topics", completedTopics || 38],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-2xl font-extrabold text-slate-950">{value}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-portal-200 bg-portal-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                Continue learning
              </p>
              <h3 className="mt-2 text-xl font-extrabold text-slate-950">
                Analog Electronics
              </h3>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                BJT biasing and small signal models
              </p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-portal-700">
              68%
            </span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white">
            <div className="h-2 w-[68%] rounded-full bg-portal-700" />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.78fr]">
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-extrabold text-slate-950">Subject mastery</p>
            <div className="mt-4 grid gap-3">
              {subjectBars.map(([label, value, color]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-100">
                    <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
            <p className="text-sm font-extrabold text-slate-950">Weak topics</p>
            <div className="mt-3 grid gap-2">
              {["Root locus", "Fourier transform", "MOSFET biasing"].map((item) => (
                <span key={item} className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [questions, setQuestions] = useState(seedQuestions);
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
        // Seed data keeps the homepage useful without the API.
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const stats = [
    ["Ready topics", readyTopics.length],
    ["Practice questions", questions.length],
    ["Exam paths", examDirectory.length],
    ["Core subjects", 12],
  ];

  const outcomes = [
    ["Crack GATE faster", "Follow a subject-wise plan that turns scattered preparation into a weekly exam routine.", "target"],
    ["Track weak topics", "See where accuracy drops and revise the exact ECE concepts that cost marks.", "chart"],
    ["Practice PYQs efficiently", "Move from theory to previous year patterns while the concept is still fresh.", "paper"],
    ["Revise with AI guidance", "Use assistant-style prompts for formulas, mistakes, and next-step recommendations.", "brain"],
  ];

  const featureHighlights = [
    ["Learn", "Concise ECE theory, formulas, diagrams, and exam pointers.", "/subjects"],
    ["Practice", "Topic MCQs and previous year style questions for active recall.", "/mcqs"],
    ["Mock Tests", "Timed exam practice with score, rank, and trend-focused feedback.", "/mock-tests"],
  ];

  const testimonials = [
    ["The dashboard view makes revision feel measurable instead of random.", "Ananya", "GATE ECE aspirant"],
    ["PYQs next to concepts helped me revise faster before tests.", "Rohit", "Final year ECE student"],
    ["Weak-topic tracking is exactly what an exam platform should show first.", "Meera", "PSU preparation"],
  ];

  return (
    <Layout
      title="ECE Exam Guide - GATE ECE Notes, PYQs, MCQs & Mock Tests"
      description="Prepare for GATE ECE and Electronics and Communication exams with structured notes, practice questions, PYQs, mock tests, progress tracking, and smart revision workflows."
      keywords="GATE ECE preparation, ECE notes, ECE MCQs, previous year questions, mock tests, electronics and communication engineering"
      pageClassName="py-0"
    >
      <div className="space-y-10 pb-10">
        <section className="grid gap-7 pt-7 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-portal-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-portal-700 shadow-sm">
              GATE ECE + PSU + university exam preparation
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Improve Your ECE Exam Readiness Every Day
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Master concepts, solve PYQs, track weak areas, and turn every study session into visible score improvement.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/learn"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-portal-700 px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_38px_rgba(21,74,150,0.24)] transition hover:bg-portal-800"
              >
                Start Learning
                <span className="ml-2">-&gt;</span>
              </Link>
              <Link
                href="/mock-tests"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-orange-300 hover:text-orange-700"
              >
                Take Mock Test
              </Link>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-4">
              {stats.map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-sm">
                  <p className="text-2xl font-extrabold text-slate-950">{value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <DashboardPreview
            completionPercent={progressStats.completionPercent}
            completedTopics={progressStats.completedCount}
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionHeader
              align="left"
              eyebrow="Exam outcomes"
              title="Built Around Marks, Speed, and Confidence"
              description="Students do not need another static notes archive. They need a system that tells them what to learn, what to practice, and what to fix next."
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {outcomes.map(([title, text, icon]) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700">
                    <MiniIcon type={icon} />
                  </span>
                  <h3 className="mt-4 text-base font-extrabold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">
              PYQ engine
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
              Practice Previous Year Questions With Purpose
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Use PYQs to identify repeat patterns, mark high-value topics, and connect exam questions back to the exact subject module.
            </p>
            <div className="mt-5 rounded-xl bg-white p-4">
              <div className="flex items-center justify-between text-sm font-bold text-slate-700">
                <span>PYQ readiness</span>
                <span>76%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[76%] rounded-full bg-orange-500" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {["GATE", "ESE", "PSU"].map((item) => (
                  <span key={item} className="rounded-lg bg-slate-50 px-2 py-2 text-xs font-extrabold text-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/previous-year" className="mt-5 inline-flex rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-700">
              Solve PYQs -&gt;
            </Link>
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="What to do first"
            title="One Clear Study Flow"
            description="The homepage now prioritizes a single learning path, then gives secondary choices only when they help a student move forward."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {featureHighlights.map(([title, text, href], index) => (
              <Link
                key={title}
                href={href}
                className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  index === 0
                    ? "border-portal-300 bg-portal-700 text-white"
                    : "border-slate-200 bg-white text-slate-950 hover:border-portal-300"
                }`}
              >
                <p className={`text-xs font-extrabold uppercase tracking-[0.18em] ${index === 0 ? "text-blue-100" : "text-portal-700"}`}>
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-xl font-extrabold">{title}</h3>
                <p className={`mt-2 text-sm leading-6 ${index === 0 ? "text-blue-50" : "text-slate-600"}`}>
                  {text}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              align="left"
              eyebrow="AI study assistant"
              title="Ask What to Revise Next"
              description="A preparation platform feels premium when it can interpret performance. This section positions the assistant as a guide for formulas, mistakes, weak topics, and daily plans."
            />
            <div className="mt-5 flex flex-wrap gap-3">
              {["Explain this formula", "Find weak topics", "Make a 45 min plan"].map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">
              Smart revision prompt
            </p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-xl bg-white/10 p-4 text-sm leading-6 text-slate-100">
                I scored 42% in Control Systems. What should I revise before my next mock?
              </div>
              <div className="rounded-xl bg-cyan-400/15 p-4 text-sm leading-6 text-cyan-50">
                Start with root locus rules, then solve 10 stability MCQs, revise Bode plot margins, and finish with 5 PYQs from frequency response.
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Student confidence"
            title="A Homepage That Feels Like Progress"
            description="The messaging now focuses on measurable preparation outcomes instead of only listing available resources."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {testimonials.map(([quote, name, role]) => (
              <figure key={name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <blockquote className="text-sm font-semibold leading-7 text-slate-700">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4">
                  <p className="font-extrabold text-slate-950">{name}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    {role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-[linear-gradient(135deg,#123b79_0%,#0f766e_100%)] px-5 py-7 text-white shadow-[0_18px_40px_rgba(21,74,150,0.26)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100">
                Primary action
              </p>
              <h2 className="mt-2 text-2xl font-extrabold">Start Learning and Track Your Next Win</h2>
              <p className="mt-2 text-sm leading-6 text-blue-50">
                Open your dashboard, resume a topic, and let progress guide the next study session.
              </p>
            </div>
            <Link href="/learn" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-center text-sm font-extrabold text-portal-800 transition hover:bg-blue-50">
              Start Learning -&gt;
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
