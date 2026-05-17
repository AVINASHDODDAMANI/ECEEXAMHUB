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

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-portal-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
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

  const offerCards = [
    ["book", "Concept-Based Theory", "Detailed theory with examples, diagrams, formulas, and exam-focused notes.", "blue"],
    ["practice", "Topic-Wise Practice", "MCQs and important questions after each topic to strengthen concepts.", "green"],
    ["paper", "Previous Year Papers", "GATE, ESE, PSU, and university papers organized year-wise and subject-wise.", "orange"],
    ["target", "Revision Support", "Quick summaries, formula sheets, and focused revision resources.", "violet"],
    ["chart", "Progress Tracking", "Track completed topics, attempted practice, and overall preparation progress.", "cyan"],
  ];

  const subjects = [
    ["Analog Electronics", "/subjects/analog-electronics"],
    ["Digital Electronics", "/subjects/digital-electronics"],
    ["Signals & Systems", "/subjects/signals-and-systems"],
    ["Control Systems", "/subjects/control-systems"],
    ["Communication Systems", "/subjects/communication-systems"],
    ["Electromagnetic Theory", "/subjects/electromagnetic-theory"],
    ["Network Analysis", "/subjects/network-analysis"],
    ["Microprocessors", "/subjects/microprocessors"],
    ["Embedded Systems", "/subjects/embedded-systems"],
  ];

  const resources = [
    ["Theory", "/subjects"],
    ["MCQs", "/mcqs"],
    ["Previous Papers", "/previous-year"],
    ["Revision Notes", "/notes"],
    ["Practice", "/practice"],
    ["Exam Guides", "/ece-exams"],
  ];

  const seoLearningSections = [
    {
      title: "What Is GATE ECE Preparation?",
      text:
        "GATE ECE preparation is the process of building strong Electronics and Communication Engineering fundamentals, revising formulas, solving previous year questions, and practicing subject-wise problems with a consistent plan. ECE Exam Guide keeps the preparation flow connected: first learn the concept, then revise the notes, then solve MCQs and previous papers.",
      href: "/subjects",
      linkText: "Browse ECE subjects",
    },
    {
      title: "Best ECE Subjects To Start With",
      text:
        "Most students should begin with Network Analysis, Signals and Systems, Digital Electronics, Analog Electronics, and Control Systems because these subjects build the base for later topics. Communication Systems, Electromagnetic Theory, DSP, Microprocessors, VLSI, Antenna, and Embedded Systems become easier when the core circuit and signal ideas are already clear.",
      href: "/subjects/network-analysis",
      linkText: "Start Network Analysis",
    },
    {
      title: "How To Use Previous Year Questions",
      text:
        "Previous year questions should not be used only as a final test. Use them after each chapter to understand repeated patterns, formula traps, and common exam wording. On ECE Exam Guide, students can connect theory pages with notes, practice sets, and PYQ-style revision so preparation becomes more searchable and exam-focused.",
      href: "/previous-year",
      linkText: "Open previous papers",
    },
  ];

  return (
    <Layout
      title="ECE Exam Guide - GATE ECE Notes, PYQs, MCQs & Exam Preparation"
      description="ECE Exam Guide, also known as ECE Exam Hub, is a structured preparation platform for Electronics and Communication Engineering students with GATE ECE notes, subject-wise theory, MCQs, previous year papers, and revision resources."
      keywords="ECE Exam Guide, ece exam guide, ECE Exam Hub, ece exam hub, GATE ECE notes, ECE notes, ECE MCQs, ECE previous year papers, electronics and communication engineering preparation"
      pageClassName="py-0"
    >
      <div className="space-y-7 pb-8">
        <section className="grid gap-6 pt-8 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-portal-600">
              ECE Exam Guide
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              ECE Exam Guide for ECE Concepts.
              <span className="block text-emerald-600">Practice Smart.</span>
              <span className="block text-orange-600">Crack Exams.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              ECE Exam Guide brings detailed theory, topic-wise practice, previous year
              papers, and smart revision tools together for Electronics and Communication
              Engineering aspirants. Students can also find us as ECE Exam Hub.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/subjects"
                className="inline-flex items-center justify-center rounded-xl bg-portal-700 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(21,74,150,0.22)] transition hover:bg-portal-800"
              >
                Start Learning Now
                <span className="ml-2">-&gt;</span>
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center justify-center rounded-xl border border-portal-300 bg-white px-5 py-3 text-sm font-bold text-portal-700 transition hover:bg-portal-50"
              >
                Explore Theory
                <span className="ml-2">-&gt;</span>
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Concept Based", "Learning"],
                ["Exam Focused", "Content"],
                ["Topic-Wise", "Practice"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.10)]">
            <div className="grid gap-4 md:grid-cols-[1fr_220px] md:items-center">
              <div>
                <h2 className="text-xl font-extrabold text-portal-800">
                  Your Complete ECE Learning Workspace
                </h2>
                <div className="mt-4 grid gap-3">
                  {[
                    ["Learn Theory", "Detailed explanations from basics to advanced."],
                    ["Practice", "MCQs and important questions with solutions."],
                    ["Revise Smart", "Quick notes, formulas, and summaries."],
                    ["Track Progress", "Monitor learning and improve consistently."],
                  ].map(([title, text], index) => (
                    <div key={title} className="flex gap-3">
                      <IconBadge tone={["blue", "green", "orange", "violet"][index]}>
                        <SimpleIcon type={index === 1 ? "practice" : index === 3 ? "chart" : "book"} />
                      </IconBadge>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{title}</p>
                        <p className="text-xs leading-5 text-slate-600">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-4">
                <div className="rounded-xl border border-blue-200 bg-white p-3 shadow-sm">
                  <div className="h-24 rounded-lg border border-blue-100 bg-blue-50" />
                  <div className="mt-3 grid gap-2">
                    <div className="h-2 rounded-full bg-blue-200" />
                    <div className="h-2 w-2/3 rounded-full bg-blue-100" />
                  </div>
                </div>
                <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-3">
                  <p className="text-xs font-bold text-emerald-700">Ready Topics</p>
                  <p className="mt-1 text-3xl font-extrabold text-slate-950">{readyTopics.length}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle
            title="What This Platform Offers"
            description="Everything you need to learn, practice, revise, and measure your ECE preparation."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {offerCards.map(([icon, title, text, tone]) => (
              <article key={title} className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <div className="mx-auto flex justify-center">
                  <IconBadge tone={tone}>
                    <SimpleIcon type={icon} />
                  </IconBadge>
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-portal-800">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle
            title="Theory Subjects"
            description="Learn every core ECE subject with structured concepts and examples."
          />
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {subjects.map(([subject, href], index) => (
              <Link
                key={subject}
                href={href}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-portal-300 hover:bg-portal-50"
              >
                <IconBadge tone={["blue", "green", "violet", "cyan"][index % 4]}>
                  <SimpleIcon type={index % 2 === 0 ? "book" : "target"} />
                </IconBadge>
                <span>
                  <span className="block text-sm font-bold text-slate-900">{subject}</span>
                  <span className="text-xs font-semibold text-portal-700">Learn all concepts -&gt;</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-portal-600">
                GATE ECE Guide
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
                ECE Exam Guide for Notes, PYQs, MCQs, and Revision
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                ECE Exam Guide, also known as ECE Exam Hub, is built for students who
                want one organized place for Electronics and Communication Engineering
                theory, subject-wise notes, formulas, previous year papers, and
                exam-focused practice.
              </p>
            </div>

            <div className="grid gap-4">
              {seoLearningSections.map((section) => (
                <article key={section.title} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="text-base font-bold text-slate-950">{section.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{section.text}</p>
                  <Link
                    href={section.href}
                    className="mt-2 inline-flex text-sm font-bold text-portal-700 transition hover:text-portal-800"
                  >
                    {section.linkText} -&gt;
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-blue-50 p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-portal-800">
                All Study Resources in One Place
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Access every core resource quickly from one clean workspace.
              </p>
            </div>
            <Link
              href="/learn"
              className="inline-flex justify-center rounded-xl border border-portal-200 bg-white px-4 py-2.5 text-sm font-bold text-portal-700 transition hover:bg-portal-50"
            >
              Browse All Resources
            </Link>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {resources.map(([label, href], index) => (
              <Link key={label} href={href} className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-portal-300">
                <IconBadge tone={["blue", "green", "violet", "orange", "cyan"][index % 5]}>
                  <SimpleIcon type={index === 1 ? "practice" : index === 2 ? "paper" : "book"} />
                </IconBadge>
                <p className="mt-3 text-sm font-bold text-slate-900">{label}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-portal-800">Your Study Progress</h2>
                <p className="mt-1 text-sm text-slate-600">Keep going. Consistency is the real advantage.</p>
              </div>
              <Link href="/learn" className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-portal-700">
                Go to Dashboard -&gt;
              </Link>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Topics Completed", `${progressStats.completedTopics || 0} / ${readyTopics.length}`],
                ["Questions Available", questions.length],
                ["Overall Progress", `${progressStats.completionPercent}%`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold text-slate-500">{label}</p>
                  <p className="mt-2 text-2xl font-extrabold text-slate-950">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold text-portal-800">Why Students Choose Us</h2>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
              {[
                "Detailed theory for every concept",
                "Topic-wise learning and practice",
                "Covers GATE, ESE, PSU, and university exams",
                `Updated guides across ${examDirectory.length} exam paths`,
              ].map((item) => (
                <p key={item} className="flex gap-2">
                  <span className="mt-1.5 h-4 w-4 rounded-full border border-emerald-300 bg-emerald-50" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-gradient-to-r from-portal-800 to-blue-700 px-5 py-6 text-white shadow-[0_18px_40px_rgba(21,74,150,0.26)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold">Start Your ECE Success Journey Today</h2>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Learn concepts in detail, practice with confidence, and prepare with a focused plan.
              </p>
            </div>
            <Link href="/subjects" className="rounded-xl bg-white px-5 py-3 text-center text-sm font-extrabold text-portal-800 transition hover:bg-blue-50">
              Start Learning Now -&gt;
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
