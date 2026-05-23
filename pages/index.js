import Link from "next/link";
import Layout from "../components/layout";
import { previousPaperDirectory } from "../data/previous-paper-directory";
import { subjectDirectory } from "../data/subject-directory";
import { getSubjectSlug } from "../data/subject-theory-roadmaps";
import { getReadyLearningTopics } from "../lib/learning-utils";
import { useLearningProgress } from "../lib/use-learning-progress";

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

function SectionHeader({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "left" ? "max-w-2xl" : "mx-auto max-w-3xl text-center"}>
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
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
  const { progressStats } = useLearningProgress();
  const readyTopics = getReadyLearningTopics();

  const heroStats = [
    ["Subjects", "12"],
    ["Resources", "500+"],
    ["Updates", "Weekly"],
    ["Prep", "GATE + Semester"],
  ];

  const outcomes = [
    ["Crack GATE faster", "Follow a subject-wise plan that turns scattered preparation into a weekly exam routine.", "target"],
    ["Track weak topics", "See where accuracy drops and revise the exact ECE concepts that cost marks.", "chart"],
    ["Practice PYQs efficiently", "Move from theory to previous year patterns while the concept is still fresh.", "paper"],
    ["Revise with AI guidance", "Use assistant-style prompts for formulas, mistakes, and next-step recommendations.", "brain"],
  ];

  const studyGroups = [
    {
      step: "01",
      title: "Build the base",
      description: "Start with a subject hub, then move into structured notes before you begin solving under pressure.",
      accent: "border-portal-300 bg-white",
      resources: [
        ["Subject Hubs", "/subjects"],
        ["Notes Library", "/notes"],
      ],
    },
    {
      step: "02",
      title: "Practice by pattern",
      description: "Shift from concepts to active recall with topic MCQs and previous year questions while the chapter is still fresh.",
      accent: "border-emerald-200 bg-emerald-50/70",
      resources: [
        ["Topic MCQs", "/mcqs"],
        ["Latest PYQs", "/previous-year"],
      ],
    },
    {
      step: "03",
      title: "Measure and improve",
      description: "Use mocks, weak-topic tracking, and guided revision to turn study sessions into visible score gains.",
      accent: "border-orange-200 bg-orange-50/80",
      resources: [
        ["Mock Tests", "/mock-tests"],
        ["Learning Path", "/learn"],
      ],
    },
  ];

  const testimonials = [
    ["The dashboard view makes revision feel measurable instead of random.", "Ananya", "GATE ECE aspirant"],
    ["PYQs next to concepts helped me revise faster before tests.", "Rohit", "Final year ECE student"],
    ["Weak-topic tracking is exactly what an exam platform should show first.", "Meera", "PSU preparation"],
  ];

  const trendingSubjects = subjectDirectory.slice(0, 3).map((subject, index) => ({
    title: subject.title,
    href: `/subjects/${getSubjectSlug(subject.title)}`,
    pulse: ["4.8k this week", "4.2k this week", "3.9k this week"][index],
    tag: ["High momentum", "Exam favorite", "Fast revision"][index],
  }));

  const recentNotes = readyTopics.slice(0, 3).map((topic, index) => ({
    title: topic.title,
    href: topic.href,
    subject: topic.subjectName,
    stamp: ["Added 2 days ago", "Added this week", "Fresh revision"][index],
  }));

  const latestPyqs = previousPaperDirectory.slice(0, 3).map((paper, index) => ({
    title: paper.title,
    href: paper.href,
    meta: paper.meta,
    stamp: ["Latest set", "Updated set", "Most solved"][index],
  }));

  const announcements = [
    {
      title: "Weekly subject updates",
      text: "New notes, refreshed PYQ links, and smarter navigation are now added every week.",
    },
    {
      title: "Semester + GATE flow",
      text: "The platform now highlights the fastest path from theory to practice for both prep styles.",
    },
    {
      title: "More activity signals coming",
      text: "Trending resources, download insights, and recent additions now have a dedicated home on the landing page.",
    },
  ];

  return (
    <Layout
      title="ECE Exam Guide - GATE ECE Notes, PYQs, MCQs & Mock Tests"
      description="Prepare for GATE ECE and Electronics and Communication exams with structured notes, practice questions, PYQs, mock tests, progress tracking, and smart revision workflows."
      keywords="GATE ECE preparation, ECE notes, ECE MCQs, previous year questions, mock tests, electronics and communication engineering"
      pageClassName="py-0"
    >
      <div className="mx-auto max-w-[1320px] space-y-12 pb-8">
        <section className="grid gap-8 pt-5 lg:grid-cols-[minmax(0,1fr)_560px] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-portal-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-portal-700 shadow-sm">
              Notes, PYQs, playlists, and structured ECE exam prep
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[4.25rem] lg:leading-[1.02]">
              ECE Exam Guide
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
              One place for Notes, PYQs, Playlists, and Smart Exam Preparation.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Built for ECE students preparing for GATE, semester exams, and technical revisions with more structure than scattered Drive folders.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
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
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {heroStats.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white/95 px-4 py-4 shadow-sm">
                  <p className="text-2xl font-extrabold text-slate-950">{value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
              {[
                "Structured subject-wise navigation",
                "Faster revision than random folders",
                "Clear path from concept to PYQ",
              ].map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-3 py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <DashboardPreview
            completionPercent={progressStats.completionPercent}
            completedTopics={progressStats.completedCount}
          />
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,#e0f2fe_0%,#ffffff_38%,#f8fafc_100%)] p-5 shadow-sm sm:p-6">
          <SectionHeader
            align="left"
            eyebrow="Live on the platform"
            title="A Homepage That Feels Active"
            description="Students trust platforms that show movement. These blocks make the site feel updated, maintained, and worth returning to."
          />
          <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-5">
              <div className="rounded-2xl border border-cyan-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-extrabold text-slate-950">Trending This Week</p>
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-cyan-700">
                    Live
                  </span>
                </div>
                <div className="mt-4 grid gap-3">
                  {trendingSubjects.map((item) => (
                    <Link key={item.title} href={item.href} className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-cyan-300 hover:bg-cyan-50">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-extrabold text-slate-950">{item.title}</p>
                          <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                            {item.tag}
                          </p>
                        </div>
                        <span className="text-xs font-extrabold text-cyan-700">{item.pulse}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-extrabold text-slate-950">Recently Added Notes</p>
                <div className="mt-4 grid gap-3">
                  {recentNotes.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-emerald-300 hover:bg-emerald-50">
                      <p className="text-sm font-extrabold text-slate-950">{item.title}</p>
                      <div className="mt-1 flex items-center justify-between gap-3 text-xs font-bold text-slate-500">
                        <span>{item.subject}</span>
                        <span className="text-emerald-700">{item.stamp}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-2xl border border-orange-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-extrabold text-slate-950">Latest PYQs</p>
                <div className="mt-4 grid gap-3">
                  {latestPyqs.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-orange-300 hover:bg-orange-50">
                      <p className="text-sm font-extrabold text-slate-950">{item.title}</p>
                      <div className="mt-1 flex items-center justify-between gap-3 text-xs font-bold text-slate-500">
                        <span>{item.meta}</span>
                        <span className="text-orange-700">{item.stamp}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-violet-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-extrabold text-slate-950">Announcements</p>
                <div className="mt-4 grid gap-3">
                  {announcements.map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-sm font-extrabold text-slate-950">{item.title}</p>
                      <p className="mt-1 text-xs leading-6 text-slate-600">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader
              align="left"
              eyebrow="Exam outcomes"
              title="Built Around Marks, Speed, and Confidence"
              description="Students do not need another static notes archive. They need a system that tells them what to learn, what to practice, and what to fix next."
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {outcomes.map(([title, text, icon]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700">
                    <MiniIcon type={icon} />
                  </span>
                  <h3 className="mt-4 text-base font-extrabold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-orange-200 bg-orange-50 p-6 shadow-sm">
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

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeader
            align="left"
            eyebrow="What to do first"
            title="One Clear Study Flow"
            description="The homepage now prioritizes a single learning path, then gives secondary choices only when they help a student move forward."
          />
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {studyGroups.map((group, index) => (
              <div
                key={group.title}
                className={`rounded-[28px] border p-5 shadow-sm ${group.accent} ${
                  index === 0 ? "lg:-translate-y-1" : ""
                }`}
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                  Step {group.step}
                </p>
                <h3 className="mt-3 text-2xl font-extrabold text-slate-950">{group.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{group.description}</p>
                <div className="mt-6 grid gap-3">
                  {group.resources.map(([label, href]) => (
                    <Link
                      key={label}
                      href={href}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-portal-300 hover:text-portal-700"
                    >
                      <span>{label}</span>
                      <span aria-hidden="true">-&gt;</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
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

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeader
            align="left"
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
