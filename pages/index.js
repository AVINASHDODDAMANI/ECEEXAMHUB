import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { examDirectory } from "../data/exam-directory";
import seedQuestions from "../data/questions";
import { getReadyLearningTopics } from "../lib/learning-utils";
import { useLearningProgress } from "../lib/use-learning-progress";
import { fetchQuestions } from "../lib/api-client";

function IconBadge({ children, tone = "blue" }) {
  const tones = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    violet: "border-violet-200 bg-violet-50 text-violet-700",
    cyan: "border-cyan-200 bg-cyan-50 text-cyan-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };

  return (
    <span className={`flex h-11 w-11 items-center justify-center rounded-xl border ${tones[tone]}`}>
      {children}
    </span>
  );
}

function SimpleIcon({ type }) {
  const common = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
  };

  if (type === "book") {
    return (
      <svg {...common}>
        <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21V5.5Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 5.5V21M9 7h6M9 11h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "practice") {
    return (
      <svg {...common}>
        <path d="M8 4h8l2 3v13H6V7l2-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 12h6M9 16h4M8 4v3h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "chart") {
    return (
      <svg {...common}>
        <path d="M5 19V5M5 19h14M9 16v-5M13 16V8M17 16v-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "target") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "paper") {
    return (
      <svg {...common}>
        <path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 3v5h4M8 13h7M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M12 3 4 7l8 4 8-4-8-4ZM4 12l8 4 8-4M4 17l8 4 8-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionTitle({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "left" ? "text-left" : "mx-auto max-w-3xl text-center";

  return (
    <div className={alignment}>
      {eyebrow ? (
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-portal-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
      ) : null}
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
        // Seed data keeps the homepage working offline.
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const proofStats = [
    ["Ready topics", readyTopics.length],
    ["Practice questions", questions.length],
    ["Exam paths", examDirectory.length],
    ["Core subjects", 12],
  ];

  const learningFlow = [
    ["Learn", "Build fundamentals with concise theory, diagrams, examples, and formulas.", "book", "blue", "/subjects"],
    ["Practice", "Move from topic MCQs to previous year style questions while the concept is fresh.", "practice", "green", "/mcqs"],
    ["Test", "Use mock tests and timed practice to turn revision into exam readiness.", "target", "orange", "/mock-tests"],
    ["Track", "Keep your completed topics, question attempts, and revision progress visible.", "chart", "cyan", "/learn"],
  ];

  const focusSubjects = [
    ["Network Analysis", "/subjects/network-analysis"],
    ["Analog Electronics", "/subjects/analog-electronics"],
    ["Digital Electronics", "/subjects/digital-electronics"],
    ["Signals & Systems", "/subjects/signals-and-systems"],
    ["Control Systems", "/subjects/control-systems"],
    ["Communication Systems", "/subjects/communication-systems"],
    ["Electromagnetic Theory", "/subjects/electromagnetic-theory"],
    ["Microprocessors", "/subjects/microprocessors"],
  ];

  const differentiators = [
    "Topic-wise learning path instead of scattered links",
    "PYQ and practice flow connected to subject preparation",
    "Progress dashboard for completed topics and revision",
    "Formula-first notes for faster final revision",
  ];

  const trustItems = [
    "Free access to theory, notes, MCQs, PYQs, and mock-test areas",
    "Search built into the top navigation for quick topic discovery",
    "Structured for GATE, ESE, PSU, and university exam preparation",
    "No confusing premium wall on the core study resources",
  ];

  return (
    <Layout
      title="ECE Exam Guide - GATE ECE Notes, PYQs, MCQs & Mock Tests"
      description="Prepare for GATE ECE and other Electronics and Communication exams with structured subject notes, topic-wise practice, previous year questions, mock tests, revision resources, and progress tracking."
      keywords="GATE ECE preparation, ECE notes, ECE MCQs, previous year questions, mock tests, electronics and communication engineering"
      pageClassName="py-0"
    >
      <div className="space-y-8 pb-8">
        <section className="grid gap-6 pt-7 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-portal-600">
              Complete ECE preparation workspace
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Master ECE Concepts, Practice Smart & Crack Exams
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Learn core Electronics and Communication subjects, solve practice questions,
              revise previous year patterns, and track your preparation from one focused
              dashboard.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/subjects"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-portal-700 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(21,74,150,0.22)] transition hover:bg-portal-800"
              >
                Start Free GATE ECE Preparation
                <span className="ml-2">-&gt;</span>
              </Link>
              <Link
                href="/mock-tests"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-portal-300 bg-white px-5 py-3 text-sm font-bold text-portal-700 transition hover:bg-portal-50"
              >
                Take a Free Mock Test
                <span className="ml-2">-&gt;</span>
              </Link>
              <Link
                href="/previous-year"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
              >
                Practice PYQs
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {proofStats.map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                  <p className="text-2xl font-extrabold text-slate-950">{value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.10)]">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Today&apos;s plan
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-950">
                Learn, practice, revise
              </h2>
            </div>
            <div className="grid gap-4 p-5">
              {learningFlow.map(([title, text, icon, tone, href], index) => (
                <Link key={title} href={href} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-portal-300 hover:bg-portal-50">
                  <IconBadge tone={tone}>
                    <SimpleIcon type={icon} />
                  </IconBadge>
                  <span>
                    <span className="block text-sm font-extrabold text-slate-950">
                      {index + 1}. {title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-600">{text}</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-3 border-t border-slate-200 bg-[#f8fafc] px-5 py-4 text-center">
              <div>
                <p className="text-lg font-extrabold text-slate-950">{progressStats.completedTopics || 0}</p>
                <p className="text-[11px] font-semibold text-slate-500">Completed</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-950">{progressStats.completionPercent}%</p>
                <p className="text-[11px] font-semibold text-slate-500">Progress</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-950">Free</p>
                <p className="text-[11px] font-semibold text-slate-500">Core tools</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle
            eyebrow="Preparation system"
            title="One Flow for Learning, Practice, PYQs, and Mock Tests"
            description="The homepage now points students to the workflows they actually need instead of repeating the same feature copy."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {learningFlow.map(([title, text, icon, tone, href]) => (
              <Link key={title} href={href} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-portal-300 hover:shadow-md">
                <IconBadge tone={tone}>
                  <SimpleIcon type={icon} />
                </IconBadge>
                <h3 className="mt-4 text-base font-extrabold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionTitle
              align="left"
              eyebrow="Why it is different"
              title="Built Like an Exam Prep System, Not a Link Directory"
              description="Students need fewer dead ends and more momentum. These are the product promises the site now makes clearly."
            />
            <div className="mt-5 grid gap-3">
              {differentiators.map((item) => (
                <p key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                  <span className="mt-1 h-3 w-3 flex-none rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionTitle
              align="left"
              eyebrow="Start by subject"
              title="Core ECE Subjects"
              description="A compact subject grid keeps the homepage useful without turning it into a long archive."
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {focusSubjects.map(([subject, href], index) => (
                <Link
                  key={subject}
                  href={href}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-portal-300 hover:bg-portal-50"
                >
                  <IconBadge tone={["blue", "green", "violet", "cyan", "orange"][index % 5]}>
                    <SimpleIcon type={index % 2 === 0 ? "book" : "target"} />
                  </IconBadge>
                  <span className="text-sm font-bold text-slate-900">{subject}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <SectionTitle
              align="left"
              eyebrow="Trust signals"
              title="Clear, Honest, and Easy to Verify"
              description="Rather than fake testimonials, the site highlights what users can immediately test for themselves."
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {trustItems.map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-sm font-semibold leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700">
              Daily engagement
            </p>
            <h2 className="mt-2 text-xl font-extrabold text-slate-950">
              Keep Momentum Visible
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Use the dashboard, topic progress, mock tests, and searchable practice sets as
              the foundation for streaks, leaderboards, and richer analytics later.
            </p>
            <Link href="/practice" className="mt-5 inline-flex rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-700">
              Start Daily Practice -&gt;
            </Link>
          </div>
        </section>

        <section className="rounded-2xl bg-[linear-gradient(135deg,#123b79_0%,#0f766e_100%)] px-5 py-6 text-white shadow-[0_18px_40px_rgba(21,74,150,0.26)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold">Start Free ECE Exam Preparation Today</h2>
              <p className="mt-2 text-sm leading-6 text-blue-50">
                Choose a subject, solve practice questions, and keep your preparation progress visible.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/subjects" className="rounded-xl bg-white px-5 py-3 text-center text-sm font-extrabold text-portal-800 transition hover:bg-blue-50">
                Browse Subjects
              </Link>
              <Link href="/mcqs" className="rounded-xl border border-white/40 px-5 py-3 text-center text-sm font-extrabold text-white transition hover:bg-white/10">
                Practice MCQs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
