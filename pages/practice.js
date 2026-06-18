import Link from "next/link";
import Layout from "../components/layout";
import { getPracticeSlug, practiceSections } from "../data/practice-sections";
import { buildBreadcrumbList } from "../lib/seo";

const practiceStructuredData = [
  buildBreadcrumbList([
    { name: "Home", item: "/" },
    { name: "Practice", item: "/practice" },
  ]),
];

const heroStats = [
  { label: "Accuracy", value: "82%", note: "Target score", tone: "blue", icon: "target" },
  { label: "Questions Solved", value: "1240", note: "Practice bank", tone: "green", icon: "book" },
  { label: "Daily Streak", value: "12", note: "Days", tone: "orange", icon: "fire" },
  { label: "Exam Tracks", value: practiceSections.length, note: "Available", tone: "violet", icon: "trophy" },
];

const practiceCategories = [
  { label: "Network Theory", icon: "antenna" },
  { label: "Signals & Systems", icon: "wave" },
  { label: "Digital Electronics", icon: "chip" },
  { label: "Analog Electronics", icon: "opamp" },
  { label: "Control Systems", icon: "control" },
  { label: "Communication", icon: "satellite" },
  { label: "DSP", icon: "bars" },
  { label: "EMFT", icon: "globe" },
];

const progressItems = [
  ["Questions Solved", "1240"],
  ["Tests Attempted", "38"],
  ["Correct Answers", "1017"],
];

const toneClasses = {
  blue: "bg-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.24)]",
  green: "bg-emerald-500 text-white shadow-[0_12px_24px_rgba(16,185,129,0.22)]",
  orange: "bg-orange-500 text-white shadow-[0_12px_24px_rgba(249,115,22,0.22)]",
  violet: "bg-violet-600 text-white shadow-[0_12px_24px_rgba(124,58,237,0.22)]",
};

function PracticeIcon({ type, className = "h-5 w-5" }) {
  const icons = {
    target: (
      <>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM16 8l4-4M18 4h2v2" />
      </>
    ),
    book: <path d="M5 5.5h6.5a3 3 0 0 1 3 3V19a3 3 0 0 0-3-3H5V5.5ZM19 5.5h-6.5a3 3 0 0 0-3 3V19a3 3 0 0 1 3-3H19V5.5Z" />,
    fire: <path d="M12 21c3.4 0 6-2.5 6-5.9 0-2.2-1-4-2.6-5.5-.4 1.5-1.3 2.4-2.4 3.1.2-3.2-1.1-5.9-4.1-8.2.1 3.4-1.9 5.2-3 7.1A6.4 6.4 0 0 0 4 15.1C4 18.5 6.6 21 12 21Z" />,
    trophy: <path d="M8 4h8v3.5a4 4 0 0 1-8 0V4ZM8 6H5.5A1.5 1.5 0 0 0 4 7.5v.5a3 3 0 0 0 3 3h1M16 6h2.5A1.5 1.5 0 0 1 20 7.5v.5a3 3 0 0 1-3 3h-1M12 11.5V16M9 20h6M10 16h4v4h-4v-4Z" />,
    rocket: <path d="M13.5 4.5C16 3.8 18 4 19 5c1 1 .9 3-.5 5.5l-3.1 3.1-4.9-4.9 3-4.2ZM10.5 8.7 7.2 8 4.5 10.7l3.7 1.1M15.3 13.5l.7 3.3-2.7 2.7-1.1-3.7M8 16l-3 3M11.5 12.5l-4 4" />,
    paper: <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5ZM14 3.5V8h4M9 12h6M9 15h6M9 18h3" />,
    antenna: <path d="M12 21V10M8 21h8M9 10a3 3 0 0 1 6 0M6 8a6 6 0 0 1 12 0M3 6a9 9 0 0 1 18 0" />,
    wave: <path d="M3 12h2c1.8 0 1.8-5 3.6-5s1.8 10 3.6 10S14 7 15.8 7s1.8 5 3.6 5H21" />,
    chip: <path d="M8 8h8v8H8V8ZM10 3v5M14 3v5M10 16v5M14 16v5M3 10h5M3 14h5M16 10h5M16 14h5" />,
    opamp: <path d="M7 6v12l10-6L7 6ZM3 12h4M17 12h4M9 10h2M9 14h2" />,
    control: <path d="M5 12h3M16 12h3M8 8h8v8H8V8ZM10 5v3M14 5v3M10 16v3M14 16v3" />,
    satellite: <path d="M7 15c2-1 3-2.5 3.5-4.5C8.5 11 7 12 6 14l1 1ZM11 10l4-4M14 5l5 5M13 12l4 4M16 17l3-3M4 19h7M7.5 15.5 11 19" />,
    bars: <path d="M4 17V9M8 17V6M12 17v-5M16 17V4M20 17v-7" />,
    globe: <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3.5 12h17M12 3c2.2 2.3 3.2 5.3 3.2 9s-1 6.7-3.2 9c-2.2-2.3-3.2-5.3-3.2-9S9.8 5.3 12 3Z" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {icons[type] || icons.book}
      </g>
    </svg>
  );
}

function MiniDiagramCard({ title, className = "", children }) {
  return (
    <div className={`rounded-xl border border-indigo-100 bg-white/90 p-3 shadow-[0_14px_30px_rgba(79,70,229,0.08)] backdrop-blur ${className}`.trim()}>
      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-indigo-800">{title}</p>
      <div className="mt-2 h-16 text-indigo-950">{children}</div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.12),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7f9ff_100%)] p-3">
      <div className="absolute inset-0 opacity-50" aria-hidden="true">
        <div className="absolute left-16 top-28 h-px w-[78%] border-t border-dashed border-indigo-200" />
        <div className="absolute left-[38%] top-8 h-[80%] border-l border-dashed border-indigo-200" />
        <div className="absolute right-16 top-16 h-[82%] border-l border-dashed border-indigo-200" />
      </div>

      <MiniDiagramCard title="Logic Gates" className="absolute left-7 top-7 w-36">
        <svg viewBox="0 0 170 82" className="h-full w-full">
          <path d="M20 28h35M20 54h35M55 20h34c25 0 38 14 44 22-6 8-19 22-44 22H55c13-12 13-32 0-44Z" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M133 42h26" stroke="currentColor" strokeWidth="3" />
          <text x="10" y="32" fontSize="12" fontWeight="700" fill="currentColor">A</text>
          <text x="10" y="58" fontSize="12" fontWeight="700" fill="currentColor">B</text>
          <text x="161" y="46" fontSize="12" fontWeight="700" fill="currentColor">Y</text>
        </svg>
      </MiniDiagramCard>

      <MiniDiagramCard title="Op-Amp Circuit" className="absolute right-4 top-10 w-44">
        <svg viewBox="0 0 190 82" className="h-full w-full">
          <path d="M72 18v46l60-23-60-23Z" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M18 41h35M53 41h19M132 41h35M95 28h18M95 54h18M52 41l10-10 10 10 10-10 10 10" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M98 18V8h48v27" fill="none" stroke="currentColor" strokeWidth="3" />
          <text x="101" y="15" fontSize="11" fontWeight="700" fill="currentColor">Rf</text>
          <text x="167" y="45" fontSize="11" fontWeight="700" fill="currentColor">Vo</text>
        </svg>
      </MiniDiagramCard>

      <MiniDiagramCard title="Control Systems" className="absolute left-0 top-44 w-52">
        <svg viewBox="0 0 250 82" className="h-full w-full">
          <path d="M12 40h42M80 40h30M155 40h45M96 62H70V40M200 40v22H96" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="67" cy="40" r="13" fill="white" stroke="currentColor" strokeWidth="3" />
          <rect x="110" y="26" width="45" height="28" fill="white" stroke="currentColor" strokeWidth="3" />
          <rect x="96" y="62" width="48" height="17" fill="white" stroke="currentColor" strokeWidth="3" />
          <text x="119" y="44" fontSize="12" fontWeight="700" fill="currentColor">G(s)</text>
          <text x="106" y="75" fontSize="11" fontWeight="700" fill="currentColor">H(s)</text>
        </svg>
      </MiniDiagramCard>

      <div className="absolute left-[38%] top-10 w-64 rounded-[20px] bg-[#111c67] p-4 text-white shadow-[0_22px_52px_rgba(17,24,100,0.26)]">
        <p className="text-xs font-extrabold">Your Progress</p>
        <div className="mt-3 grid grid-cols-[76px_1fr] gap-4">
          <div className="grid h-[76px] w-[76px] place-items-center rounded-full bg-[conic-gradient(#18d8c8_0_82%,#6548f5_82%_100%)] p-1.5">
            <div className="grid h-full w-full place-items-center rounded-full bg-[#111c67] text-center">
              <span className="block text-xl font-extrabold">82%</span>
              <span className="block text-[10px] text-indigo-100">Accuracy</span>
            </div>
          </div>
          <div className="space-y-2 text-[11px]">
            {progressItems.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-indigo-100">{label}</span>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex h-14 items-end gap-1.5 border-t border-white/15 pt-3">
          {[18, 28, 38, 30, 52, 42, 35, 48, 66, 36, 54, 72, 44, 62, 58, 81].map((height, index) => (
            <span
              key={index}
              className="flex-1 rounded-t bg-gradient-to-t from-violet-500 to-cyan-400"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <MiniDiagramCard title="DSP - Signal" className="absolute right-8 top-56 w-36">
        <svg viewBox="0 0 150 82" className="h-full w-full">
          <path d="M10 42h18c7 0 7-28 15-28s8 56 16 56 8-56 16-56 8 56 16 56 8-28 15-28h34" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M10 16h130M10 68h130" stroke="currentColor" strokeWidth="1" strokeDasharray="4 5" opacity=".25" />
        </svg>
      </MiniDiagramCard>

      <div className="absolute bottom-7 left-[24%] w-[340px] rotate-[-4deg] rounded-[22px] border-[6px] border-[#1d2b78] bg-[#eef3ff] p-3 shadow-[0_22px_52px_rgba(30,41,120,0.24)]">
        <div className="rounded-xl bg-white p-3">
          <p className="text-xs font-extrabold text-indigo-950">MCQ Practice</p>
          <div className="mt-2 rounded-lg bg-slate-50 p-2.5">
            <p className="text-[10px] font-bold text-slate-700">In the given op-amp circuit, output voltage is</p>
            <div className="mt-2 grid grid-cols-[1fr_100px] gap-2">
              <svg viewBox="0 0 150 92" className="h-20 w-full text-indigo-950">
                <path d="M58 20v50l58-25-58-25Z" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M8 45h24M32 45h26M116 45h25M80 30h18M80 60h18M32 45l8-8 8 8 8-8 8 8" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M83 20V10h42v25" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
              <div className="space-y-1.5 text-[9px] font-bold text-slate-700">
                <div className="rounded border border-slate-200 bg-white px-2 py-1">A. Rf/R1 Vin</div>
                <div className="rounded border border-emerald-300 bg-emerald-50 px-2 py-1 text-emerald-700">B. (1 + Rf/R1) Vin</div>
                <div className="rounded border border-slate-200 bg-white px-2 py-1">C. R1/Rf Vin</div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-bold text-slate-600">Previous</span>
            <span className="rounded-lg bg-violet-600 px-3 py-1.5 text-[10px] font-bold text-white">Next</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-12 h-48 w-36">
        <div className="absolute bottom-0 right-2 h-28 w-24 rounded-t-[56px] bg-[#15338a] shadow-[0_18px_42px_rgba(15,23,42,0.2)]" />
        <div className="absolute right-8 top-6 h-16 w-16 rounded-full bg-[#f7b69c]" />
        <div className="absolute right-11 top-3 h-10 w-20 rounded-t-full bg-[#0f1c66]" />
        <div className="absolute right-4 top-[6rem] h-16 w-10 rotate-[-25deg] rounded-full bg-[#f7b69c]" />
      </div>
    </div>
  );
}

function StatCard({ stat }) {
  return (
    <article className="rounded-xl border border-indigo-100 bg-white p-3 shadow-[0_12px_26px_rgba(79,70,229,0.07)]">
      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${toneClasses[stat.tone]}`}>
        <PracticeIcon type={stat.icon} className="h-[18px] w-[18px]" />
      </span>
      <p className="mt-3 text-xs font-bold text-slate-700">{stat.label}</p>
      <p className="mt-1 text-2xl font-extrabold tracking-tight text-indigo-950">{stat.value}</p>
      <p className="mt-1 text-[11px] font-semibold text-slate-500">{stat.note}</p>
    </article>
  );
}

export default function PracticePage() {
  return (
    <Layout
      title="ECE Numerical Practice | Exam Question Sets"
      description="Practice ECE numericals and exam-wise question sets for GATE, BEL, ISRO, BARC, and electronics engineering revision."
      canonicalUrl="/practice"
      structuredData={practiceStructuredData}
      pageClassName="py-3"
    >
      <div className="mx-auto max-w-[1440px]">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500"
        >
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">Numerical Practice</span>
        </nav>

        <section className="overflow-hidden rounded-[24px] border border-indigo-100 bg-white px-4 py-5 shadow-[0_20px_64px_rgba(67,56,202,0.08)] sm:px-6 lg:px-7">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.94fr)_minmax(500px,1.06fr)]">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.06em] text-indigo-700">
                <PracticeIcon type="target" className="h-4 w-4" />
                Practice. Improve. Succeed.
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-[#111a55] sm:text-6xl lg:text-7xl">
                Practice ECE Questions Like a{" "}
                <span className="relative inline-block text-violet-600">
                  Real Exam
                  <span className="absolute -bottom-2 left-1 h-1.5 w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-300" />
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                Topic-wise MCQs, previous year questions, mock tests, progress tracking,
                and smart revision for GATE, BEL, DRDO, and semester exams.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/practice/gate"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(79,70,229,0.25)] transition hover:-translate-y-0.5"
                >
                  <PracticeIcon type="rocket" className="h-5 w-5" />
                  Start Practice
                </Link>
                <Link
                  href="/previous-year"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-extrabold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <PracticeIcon type="paper" className="h-5 w-5" />
                  View PYQs
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4">
                {heroStats.map((stat) => (
                  <StatCard key={stat.label} stat={stat} />
                ))}
              </div>
            </div>

            <HeroVisual />
          </div>

          <div className="mt-6 rounded-xl border border-indigo-100 bg-white/95 p-3 shadow-[0_14px_36px_rgba(79,70,229,0.07)]">
            <h2 className="text-sm font-extrabold text-indigo-950">Popular Practice Categories</h2>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
              {practiceCategories.map((category) => (
                <Link
                  key={category.label}
                  href={`/practice?search=${encodeURIComponent(category.label)}`}
                  className="group flex min-h-[88px] flex-col items-center justify-center rounded-xl border border-transparent bg-indigo-50/70 px-2 py-3 text-center transition hover:border-indigo-200 hover:bg-white hover:shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-indigo-700 shadow-sm transition group-hover:text-violet-700">
                    <PracticeIcon type={category.icon} className="h-5 w-5" />
                  </span>
                  <span className="mt-2 text-[11px] font-extrabold leading-4 text-indigo-950">{category.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
                Choose an exam track
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Numerical Practice Sections
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Each track opens a focused question set so revision stays aligned with the exam pattern.
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {practiceSections.map((section) => (
              <Link
                key={section.exam}
                href={`/practice/${getPracticeSlug(section.exam)}`}
                className="group flex min-h-[168px] flex-col rounded-xl border border-portal-200 bg-white p-4 shadow-portal transition-all duration-300 hover:-translate-y-1 hover:border-portal-400 hover:shadow-[0_14px_30px_rgba(15,23,42,0.11)]"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-portal-200 bg-portal-50 text-portal-700">
                    <PracticeIcon type="paper" className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">
                      {section.exam} track
                    </p>
                    <h3 className="mt-1 text-sm font-bold leading-5 text-slate-950 group-hover:text-portal-700">
                      {section.label}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-600">
                  {section.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-bold text-portal-700">
                  Open practice set
                  <PracticeIcon type="arrow" className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
