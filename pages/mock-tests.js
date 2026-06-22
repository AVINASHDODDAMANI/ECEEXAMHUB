import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout";
import seedQuestions from "../data/questions";
import { fetchQuestions } from "../lib/api-client";
import { getReadyLearningTopics } from "../lib/learning-utils";
import { getUniqueQuestions, hasQuestionTag } from "../lib/question-utils";

const tracks = [
  { key: "all", label: "All" },
  { key: "full", label: "Full" },
  { key: "pyq", label: "PYQ" },
  { key: "drill", label: "Drill" },
];

function Icon({ type, className = "h-4 w-4" }) {
  const paths = {
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
    list: (
      <>
        <path d="M8 7h11M8 12h11M8 17h11" />
        <path d="M4.5 7h.01M4.5 12h.01M4.5 17h.01" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M21.5 12h-3M12 21.5v-3M2.5 12h3" />
      </>
    ),
    arrow: <path d="M5 12h13M13 7l5 5-5 5" />,
    check: <path d="m5 12.5 4 4L19 6.5" />,
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

function MetricCard({ label, value, detail }) {
  return (
    <div className="rounded-xl border border-[#dfe7f3] bg-white px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.035)]">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-600">{detail}</p>
    </div>
  );
}

function DifficultyBadge({ value }) {
  const tone =
    value === "Advanced"
      ? "border-orange-200 bg-orange-50 text-orange-700"
      : value === "Moderate"
        ? "border-sky-200 bg-sky-50 text-sky-700"
        : "border-emerald-200 bg-emerald-50 text-emerald-700";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${tone}`}>
      {value}
    </span>
  );
}

function TestRow({ test, featured = false }) {
  return (
    <article
      className={`rounded-xl border bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.045)] ${
        featured ? "border-portal-300 ring-1 ring-portal-100" : "border-[#dfe7f3]"
      }`}
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px_auto] lg:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-600">
              {test.type}
            </span>
            <DifficultyBadge value={test.difficulty} />
          </div>
          <h2 className="mt-3 text-lg font-extrabold tracking-tight text-slate-950">
            {test.title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">{test.subtitle}</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            ["Q", test.count],
            ["Time", test.duration],
            ["Marks", test.marks],
            ["Review", test.review],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-[#e5ebf5] bg-[#fbfcff] px-3 py-2">
              <p className="text-sm font-extrabold text-slate-950">{value}</p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>

        <Link
          href={test.href}
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
            featured
              ? "bg-portal-700 text-white shadow-[0_12px_24px_rgba(21,74,150,0.2)] hover:bg-portal-800"
              : "border border-portal-300 bg-portal-50 text-portal-700 hover:bg-white"
          }`}
        >
          Start
          <Icon type="arrow" />
        </Link>
      </div>
    </article>
  );
}

function ReviewItem({ title, value, detail, icon }) {
  return (
    <div className="rounded-xl border border-[#dfe7f3] bg-white p-4 shadow-[0_8px_22px_rgba(15,23,42,0.035)]">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-portal-50 text-portal-700">
          <Icon type={icon} className="h-5 w-5" />
        </span>
        <div>
          <p className="font-extrabold text-slate-950">{title}</p>
          <p className="mt-1 text-sm font-bold text-portal-700">{value}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
        </div>
      </div>
    </div>
  );
}

export default function MockTestsPage() {
  const [questions, setQuestions] = useState(seedQuestions);
  const [activeTrack, setActiveTrack] = useState("all");
  const readyTopics = getReadyLearningTopics();
  const uniqueQuestions = useMemo(() => getUniqueQuestions(questions), [questions]);

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
    () => uniqueQuestions.filter((question) => hasQuestionTag(question, "important")),
    [uniqueQuestions]
  );
  const repeatedQuestions = useMemo(
    () => uniqueQuestions.filter((question) => hasQuestionTag(question, "repeated")),
    [uniqueQuestions]
  );
  const gateQuestions = useMemo(() => uniqueQuestions.filter((q) => (q.exam || []).includes("GATE")), [uniqueQuestions]);
  const belQuestions = useMemo(() => uniqueQuestions.filter((q) => (q.exam || []).includes("BEL")), [uniqueQuestions]);

  const mockTests = useMemo(
    () => [
      {
        id: "gate-full",
        track: "full",
        title: "GATE ECE Full-Length Simulation",
        subtitle: "Complete exam pattern with timing, scoring discipline, and end-of-test review.",
        type: "Full mock",
        count: Math.min(65, gateQuestions.length),
        duration: "180m",
        marks: "100",
        review: "Full",
        difficulty: "Advanced",
        href: "/practice/gate?mode=mock&set=full&limit=65",
      },
      {
        id: "bel-style",
        track: "pyq",
        title: "BEL Previous-Paper Style Mock",
        subtitle: "Objective practice aligned with PSU-style technical and aptitude sections.",
        type: "PSU mock",
        count: Math.min(10, belQuestions.length),
        duration: "25m",
        marks: "10",
        review: "Solved",
        difficulty: "Moderate",
        href: "/practice/bel?mode=mock&set=pyq&limit=10",
      },
      {
        id: "priority",
        track: "drill",
        title: "High-Impact Questions Drill",
        subtitle: "Important-tagged questions for fast scoring-area revision before a mock.",
        type: "Priority",
        count: Math.min(25, importantQuestions.length),
        duration: "45m",
        marks: "50",
        review: "Topic",
        difficulty: "Moderate",
        href: "/practice/gate?mode=mock&set=important&scope=all&limit=25",
      },
      {
        id: "repeated",
        track: "pyq",
        title: "Repeated PYQ Pattern Mock",
        subtitle: "Repeated question styles grouped for pattern recognition and recall speed.",
        type: "PYQ",
        count: Math.min(30, repeatedQuestions.length),
        duration: "60m",
        marks: "65",
        review: "PYQ",
        difficulty: "Moderate",
        href: "/practice/gate?mode=mock&set=repeated&scope=all&limit=30",
      },
      {
        id: "weak-area",
        track: "drill",
        title: "Subject Weak-Area Drill",
        subtitle: "Focused route into ready learning topics when a subject needs repair.",
        type: "Adaptive",
        count: readyTopics.length,
        duration: "30m",
        marks: "30",
        review: "Concept",
        difficulty: "Foundation",
        href: "/learn",
      },
    ],
    [belQuestions.length, gateQuestions.length, importantQuestions.length, readyTopics.length, repeatedQuestions.length]
  );

  const visibleTests =
    activeTrack === "all"
      ? mockTests
      : mockTests.filter((test) => test.track === activeTrack);

  return (
    <Layout
      title="ECE Mock Tests | Exam Practice Dashboard"
      description="Take ECE mock tests with full-length simulations, BEL practice, PYQ pattern drills, important questions, and structured post-test review."
      pageClassName="py-3 sm:py-5"
    >
      <div className="mx-auto max-w-[1440px] space-y-5">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-slate-500"
        >
          <Link href="/" className="font-semibold text-portal-700 transition hover:text-portal-800">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-extrabold text-slate-800">Mock Tests</span>
        </nav>

        <section className="rounded-2xl border border-[#dfe7f3] bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:p-5">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_560px] xl:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                Mock test workspace
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Exam Practice Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                Full mocks, PSU-style practice, PYQ patterns, and weak-area drills in one focused test center.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <MetricCard label="Question bank" value={uniqueQuestions.length} detail="Unique practice items" />
              <MetricCard label="Ready topics" value={readyTopics.length} detail="Linked revision modules" />
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-4">
          <MetricCard label="Mock formats" value={mockTests.length} detail="Full, PYQ, and drills" />
          <MetricCard label="Important" value={importantQuestions.length} detail="High-priority questions" />
          <MetricCard label="PYQ patterns" value={repeatedQuestions.length} detail="Unique pattern-recall items" />
          <MetricCard label="Target pace" value="1.8m" detail="Average per question" />
        </section>

        <section className="rounded-2xl border border-[#dfe7f3] bg-white shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-4 border-b border-[#edf2f8] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
                Test catalog
              </p>
              <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950">
                Scheduled Practice Sets
              </h2>
            </div>
            <div className="inline-flex w-full overflow-hidden rounded-xl border border-[#dfe7f3] bg-slate-50 p-1 sm:w-auto">
              {tracks.map((track) => (
                <button
                  key={track.key}
                  type="button"
                  onClick={() => setActiveTrack(track.key)}
                  className={`min-h-9 flex-1 rounded-lg px-3 text-sm font-extrabold transition sm:flex-none ${
                    activeTrack === track.key
                      ? "bg-portal-700 text-white shadow-sm"
                      : "text-slate-600 hover:bg-white hover:text-portal-700"
                  }`}
                >
                  {track.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:p-5">
            {visibleTests.map((test, index) => (
              <TestRow key={test.id} test={test} featured={activeTrack === "all" && index === 0} />
            ))}
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-2xl border border-[#dfe7f3] bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
              Review queue
            </p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950">
              Post-Test Actions
            </h2>
            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              <ReviewItem
                icon="target"
                title="Accuracy Review"
                value="78% target"
                detail="Separate concept errors from calculation and reading mistakes."
              />
              <ReviewItem
                icon="clock"
                title="Time Audit"
                value="14m buffer"
                detail="Find questions where time spent was higher than the mark value."
              />
              <ReviewItem
                icon="list"
                title="Revision Links"
                value="Topic route"
                detail="Move directly from weak topics into notes, PYQs, and drills."
              />
            </div>
          </div>

          <aside className="rounded-2xl border border-orange-200 bg-orange-50 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-700">
              Attempt discipline
            </p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950">
              Test Rules
            </h2>
            <div className="mt-4 grid gap-2">
              {[
                "Single sitting",
                "Mark for review",
                "No mid-test revision",
                "Analyze before next attempt",
              ].map((rule) => (
                <div key={rule} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-bold text-slate-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <Icon type="check" className="h-3.5 w-3.5" />
                  </span>
                  {rule}
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </Layout>
  );
}
