import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/layout";
import { getSearchRedirectHref } from "../lib/search-redirects";

function Icon({ type, className = "h-6 w-6" }) {
  const icons = {
    search: <path d="M14.2 14.2 18 18M16 9.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />,
    users: <path d="M16 19a4 4 0 0 0-8 0M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM21 19a3 3 0 0 0-4-2.8M18 9.5a2.5 2.5 0 1 0-1-4.8M3 19a3 3 0 0 1 4-2.8M6 9.5a2.5 2.5 0 1 1 1-4.8" />,
    paper: <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5ZM14 3.5V8h4M9 12h6M9 15h6M9 18h3" />,
    book: <path d="M5 5.5h6.5a3 3 0 0 1 3 3V19a3 3 0 0 0-3-3H5V5.5ZM19 5.5h-6.5a3 3 0 0 0-3 3V19a3 3 0 0 1 3-3H19V5.5Z" />,
    file: <path d="M8 3.5h6l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5ZM14 3.5V8h4M9 12h6M9 16h6" />,
    network: <path d="M12 5v4M12 15v4M7 8.5l3.5 2M13.5 13l3.5 2M17 8.5l-3.5 2M10.5 13 7 15M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM7 6.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM17 6.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7 13.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM17 13.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />,
    analog: <path d="M3 12h4l2-5 4 10 2-5h6" />,
    digital: <path d="M4 12h4M16 12h4M8 6v12l8-6-8-6Z" />,
    signal: <path d="M4 12h2M9 7v10M12 4v16M15 8v8M18 11v2M21 12h-1" />,
    antenna: <path d="M12 21V10M8 21h8M9 10a3 3 0 0 1 6 0M6 8a6 6 0 0 1 12 0M3 6a9 9 0 0 1 18 0" />,
    control: <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2.5v3M12 18.5v3M4.5 4.5l2.1 2.1M17.4 17.4l2.1 2.1M2.5 12h3M18.5 12h3" />,
    dsp: <path d="M4 17V7M8 17V5M12 17v-7M16 17V4M20 17V9" />,
    chip: <path d="M8 8h8v8H8V8ZM10 3v5M14 3v5M10 16v5M14 16v5M3 10h5M3 14h5M16 10h5M16 14h5" />,
    shield: <path d="M12 3.5 19 6v5.5c0 4.2-2.8 7.8-7 9-4.2-1.2-7-4.8-7-9V6l7-2.5ZM9 12l2 2 4-4" />,
    atom: <path d="M12 12h.01M20 12c0 2-3.6 3.7-8 3.7S4 14 4 12s3.6-3.7 8-3.7 8 1.7 8 3.7ZM16 18.9c-1.7 1-4.6-1.7-6.6-5.3S6.9 6.8 8.6 5.9c1.7-1 4.6 1.7 6.6 5.3s2.5 6.8.8 7.7ZM8 18.9c-1.7-1-.9-4.1.8-7.7s4.9-6.3 6.6-5.3c1.7 1 .9 4.1-.8 7.7S9.7 19.9 8 18.9Z" />,
    calculator: <path d="M7 3.5h10A1.5 1.5 0 0 1 18.5 5v14A1.5 1.5 0 0 1 17 20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5ZM8.5 7h7M9 11h.01M12 11h.01M15 11h.01M9 14.5h.01M12 14.5h.01M15 14.5h.01M9 18h.01M12 18h.01M15 18h.01" />,
    sigma: <path d="M17 5H7l5 7-5 7h10M18 12l3 3M21 12l-3 3" />,
    diagram: <path d="M4 5h5v5H4V5ZM15 5h5v5h-5V5ZM9.5 15h5v5h-5v-5ZM9 7.5h6M12 10v5" />,
    clock: <path d="M12 8v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    target: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM16 8l4-4M18 4h2v2" />,
    cloud: <path d="M8 18h9a4 4 0 0 0 .8-7.9A6 6 0 0 0 6.4 8.5 4.5 4.5 0 0 0 8 18Z" />,
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

function SectionTitle({ title, actionLabel, href }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-xl font-extrabold text-[#071d49] sm:text-2xl">{title}</h2>
      {href ? (
        <Link href={href} className="inline-flex items-center gap-2 text-sm font-extrabold text-[#004ce8] hover:text-[#ff7417]">
          {actionLabel}
          <Icon type="arrow" className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}

function ComingSoonBadge({ className = "" }) {
  return (
    <span className={`rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-amber-700 ${className}`.trim()}>
      Coming Soon
    </span>
  );
}

function SubjectCard({ title, href, icon, color, comingSoon = false }) {
  const content = (
    <>
      {comingSoon ? <ComingSoonBadge className="absolute right-2 top-2" /> : null}
      <Icon type={icon} className={`h-10 w-10 ${color}`} />
      <h3 className="mt-4 text-sm font-extrabold leading-5 text-[#071d49]">{title}</h3>
    </>
  );
  const className = `relative flex min-h-[126px] flex-col items-center justify-center rounded-lg border border-[#dfe6f1] bg-white p-4 text-center shadow-[0_8px_18px_rgba(15,23,42,0.035)] transition ${
    comingSoon
      ? "cursor-default opacity-85"
      : "hover:-translate-y-0.5 hover:border-[#ff7417] hover:shadow-[0_16px_30px_rgba(15,23,42,0.08)]"
  }`;

  return comingSoon ? (
    <div className={className} aria-label={`${title} coming soon`}>
      {content}
    </div>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function FeatureCard({ icon, title, text, cta, href, accent = "emerald", comingSoon = false }) {
  const styles = {
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    orange: "text-orange-600 bg-orange-50 border-orange-100",
  };

  const content = (
    <>
      {comingSoon ? <ComingSoonBadge className="absolute right-4 top-4" /> : null}
      <div className="flex items-start gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${styles[accent]}`}>
          <Icon type={icon} className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-extrabold text-[#071d49]">{title}</h3>
          <p className="mt-3 max-w-[220px] text-sm leading-6 text-[#33415c]">{text}</p>
        </div>
      </div>
      <span className={`absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-extrabold ${styles[accent]}`}>
        {comingSoon ? "Coming Soon" : cta}
        {!comingSoon ? <Icon type="arrow" className="h-3.5 w-3.5" /> : null}
      </span>
      <Icon
        type={icon}
        className="absolute bottom-4 right-4 h-16 w-16 text-slate-200 transition group-hover:text-slate-300"
      />
    </>
  );
  const className = `group relative min-h-[190px] overflow-hidden rounded-lg border border-[#dfe6f1] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition ${
    comingSoon ? "cursor-default opacity-90" : "hover:-translate-y-0.5 hover:border-[#ff7417]"
  }`;

  return comingSoon ? (
    <div className={className} aria-label={`${title} coming soon`}>
      {content}
    </div>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function PaperCard({ badge, title, text, href, updated = false }) {
  return (
    <Link
      href={href}
      className="flex min-h-[190px] flex-col rounded-lg border border-[#dfe6f1] bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:border-[#ff7417]"
    >
      <span className={`w-fit rounded px-2 py-1 text-[10px] font-extrabold text-white ${updated ? "bg-[#1b64e8]" : "bg-[#0ca33a]"}`}>
        {badge}
      </span>
      <h3 className="mt-4 text-base font-extrabold leading-6 text-[#071d49]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#33415c]">{text}</p>
      <span className={`mt-auto inline-flex items-center gap-2 pt-5 text-sm font-extrabold ${updated ? "text-[#1b64e8]" : "text-[#078b33]"}`}>
        View Paper
        <Icon type="arrow" className="h-4 w-4" />
      </span>
    </Link>
  );
}

function RevisionCard({ icon, title, text, href, color, comingSoon = false }) {
  const content = (
    <>
      <Icon type={icon} className={`h-8 w-8 ${color}`} />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-extrabold text-[#071d49]">{title}</span>
        <span className="mt-1 block text-xs font-semibold text-[#33415c]">{text}</span>
      </span>
      {comingSoon ? <ComingSoonBadge /> : null}
    </>
  );
  const className = `flex min-h-[78px] items-center gap-3 rounded-lg border border-[#dfe6f1] bg-white p-4 transition ${
    comingSoon ? "cursor-default opacity-90" : "hover:border-[#ff7417] hover:shadow-sm"
  }`;

  return comingSoon ? (
    <div className={className} aria-label={`${title} coming soon`}>
      {content}
    </div>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function WhyItem({ icon, title, text, color }) {
  return (
    <div className="flex items-center gap-4 border-[#e6edf6] px-2 py-3 md:border-l md:first:border-l-0">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${color}`}>
        <Icon type={icon} className="h-6 w-6" />
      </span>
      <span>
        <span className="block text-sm font-extrabold text-[#071d49]">{title}</span>
        <span className="mt-1 block text-xs font-semibold leading-5 text-[#33415c]">{text}</span>
      </span>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [homeSearchValue, setHomeSearchValue] = useState("");

  const subjects = [
    ["Network Analysis", "/notes/network-analysis", "network", "text-emerald-600"],
    ["Analog Electronics", "/notes/analog-electronics", "analog", "text-orange-600"],
    ["Digital Electronics", "/notes/digital-electronics", "digital", "text-blue-600"],
    ["Signals & Systems", "/notes/signals-and-systems", "signal", "text-violet-600"],
    ["Communication Systems", "/notes/communication-systems", "antenna", "text-emerald-600"],
    ["Control Systems", "/notes/control-systems", "control", "text-orange-600"],
    ["DSP", "/notes/digital-signal-processing", "dsp", "text-pink-500", true],
    ["VLSI Design", "/notes/vlsi-design", "chip", "text-violet-600", true],
  ];

  const exams = [
    ["GATE ECE", "/gate-previous-year-question-papers", "atom"],
    ["BEL PE", "/bel-previous-year-question-papers", "shield"],
    ["ISRO", "/previous-year?search=ISRO", "antenna"],
    ["DRDO", "/previous-year?search=DRDO", "network"],
    ["ESE", "/previous-year?search=ESE", "file"],
    ["PSU Exams", "/previous-year?search=BEL", "paper"],
  ];

  function handleHomeSearch(event) {
    event.preventDefault();
    const query = homeSearchValue.trim();

    if (!query) {
      return;
    }

    router.push(getSearchRedirectHref(query) || `/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <Layout
      title="Network Analysis, Digital Electronics, Analog Electronics Notes | ECE Exam Guide"
      description="Study Network Analysis, Digital Electronics, Analog Electronics and other ECE subjects with quick notes, PYQs, MCQs, formulas, numericals, and GATE, BEL, ISRO, DRDO, ESE, PSU, and university exam resources."
      keywords="Network Analysis, Digital Electronics, Analog Electronics, ECE Exam Guide, ECE quick notes, GATE ECE notes, electronics formula sheet, ECE previous year questions, BEL ECE PYQ"
      pageClassName="!max-w-none !px-0 py-0"
    >
      <section className="relative overflow-hidden bg-[#061f45]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#061f45_0%,#082b5f_45%,#051a3a_100%)]" />
        <img
          src="/images/home-hero-ece-study.png"
          alt="ECE student studying electronics notes with laptop and circuit background"
          className="absolute inset-y-0 right-0 h-full w-full object-cover object-[72%_center] opacity-55 sm:opacity-65 lg:w-[58%] lg:object-center lg:opacity-95"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#061f45_0%,rgba(6,31,69,0.94)_52%,rgba(6,31,69,0.42)_100%)] lg:bg-[linear-gradient(90deg,#061f45_0%,rgba(6,31,69,0.96)_34%,rgba(6,31,69,0.45)_62%,rgba(6,31,69,0.05)_100%)]" />

        <div className="relative mx-auto max-w-[1440px] px-4 py-5 sm:px-8 sm:py-9 lg:py-14">
          <div className="max-w-[650px]">
            <p className="text-xs font-extrabold text-[#ff7417] sm:text-base">
              Your One Stop Destination for ECE Exam Success
            </p>
            <h1 className="mt-2 text-[2rem] font-extrabold leading-tight text-white sm:mt-3 sm:text-5xl lg:text-[3.8rem]">
              Learn. Practice. Excel.
              <span className="block">
                Crack Every <span className="text-[#ff7417]">ECE Exam</span>
              </span>
            </h1>
            <p className="mt-3 max-w-[590px] text-sm font-medium leading-6 !text-white/90 sm:mt-4 sm:text-lg sm:leading-8">
              Network Analysis, Digital Electronics, Analog Electronics, quick revision sheets, previous year questions,
              numericals and exam resources for GATE, BEL, ISRO, DRDO, ESE, PSU and University exams.
            </p>

            <form onSubmit={handleHomeSearch} className="mt-4 grid max-w-[620px] grid-cols-[40px_minmax(0,1fr)_auto] items-center rounded-lg bg-white p-1 shadow-[0_18px_36px_rgba(0,0,0,0.22)] sm:mt-6 sm:grid-cols-[44px_minmax(0,1fr)_auto]">
              <span className="flex h-10 items-center justify-center text-[#071d49] sm:h-12">
                <Icon type="search" className="h-5 w-5" />
              </span>
              <input
                type="search"
                value={homeSearchValue}
                onChange={(event) => setHomeSearchValue(event.target.value)}
                placeholder="Search notes, PYQs, concepts, numericals..."
                className="min-w-0 border-0 bg-transparent text-xs font-semibold text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0 sm:text-sm"
              />
              <button className="h-10 rounded-md bg-[#ff7417] px-4 text-xs font-extrabold text-white transition hover:bg-[#e96009] sm:h-12 sm:px-8 sm:text-sm">
                Search
              </button>
            </form>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:grid-cols-4 sm:gap-3">
              {[
                ["Growing", "Student Community", "users"],
                ["Curated", "Question Bank", "paper"],
                ["Ready", "Quick Notes", "book"],
                ["Updating", "PYQ Papers", "file"],
              ].map(([value, label, icon]) => (
                <div key={label} className="flex min-h-[58px] items-center gap-2 rounded-lg border border-white/18 bg-white/5 px-3 py-2 text-white backdrop-blur-sm sm:min-h-[70px] sm:gap-3 sm:px-4 sm:py-3">
                  <Icon type={icon} className="h-5 w-5 text-[#ff7417] sm:h-6 sm:w-6" />
                  <span>
                    <span className="block text-sm font-extrabold leading-5 sm:text-lg">{value}</span>
                    <span className="text-[10px] font-semibold !text-white/85 sm:text-xs">{label}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
              {exams.map(([label, href, icon]) => (
                <Link key={label} href={href} className="flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-white px-3 text-xs font-extrabold text-[#071d49] shadow-[0_10px_22px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:text-[#ff7417] sm:min-h-[58px] sm:text-sm">
                  <Icon type={icon} className="h-5 w-5 text-[#145dff]" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7faff] px-4 py-7 sm:px-8">
        <div className="mx-auto max-w-[1440px] space-y-7">
          <section>
            <SectionTitle title="Popular Subjects" actionLabel="View All Subjects" href="/subjects" />
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {subjects.map(([title, href, icon, color, comingSoon]) => (
                <SubjectCard
                  key={title}
                  title={title}
                  href={href}
                  icon={icon}
                  color={color}
                  comingSoon={Boolean(comingSoon)}
                />
              ))}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            <FeatureCard
              icon="book"
              title="Quick Notes"
              text="Short, crisp and exam oriented quick notes."
              cta="Explore Quick Notes"
              href="/notes"
              accent="emerald"
            />
            <FeatureCard
              icon="paper"
              title="Previous Year Questions"
              text="Chapter wise and exam wise PYQs with solutions."
              cta="Explore PYQs"
              href="/previous-year"
              accent="blue"
            />
            <FeatureCard
              icon="calculator"
              title="Numericals"
              text="Practice important numericals with step-by-step solutions."
              cta="Solve Numericals"
              href="/practice"
              accent="orange"
              comingSoon
            />
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-lg border border-[#dfe6f1] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              <SectionTitle title="Latest Updated Papers" actionLabel="View All Papers" href="/previous-year" />
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <PaperCard badge="NEW" title="GATE ECE 2025 Paper" text="65 solved questions with MSQ support" href="/solution/gate-2025" />
                <PaperCard badge="NEW" title="BEL ECE Dec 2025 Paper" text="125 solved objective questions" href="/solution/bel-december-2025" />
                <PaperCard badge="NEW" title="BEL ECE May 2025 Paper" text="125 solved objective questions" href="/solution/bel-may-2025" />
                <PaperCard badge="UPDATED" title="BEL Electronics Dec 2023" text="125 official paper questions" href="/solution/bel-december-2023" updated />
              </div>
            </div>

            <aside className="rounded-lg border border-orange-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              <div className="flex items-center justify-between gap-3 border-b border-[#edf1f7] pb-4">
                <h2 className="text-lg font-extrabold text-[#071d49]">Study Dashboard</h2>
                <ComingSoonBadge />
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-[132px_1fr] xl:grid-cols-1">
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[conic-gradient(#f59e0b_0_32%,#edf1f7_32%_100%)]">
                  <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-xl font-extrabold text-[#071d49]">Soon</span>
                    <span className="mt-1 text-[10px] font-bold text-[#33415c]">Progress Tools</span>
                  </div>
                </div>
                <div className="grid gap-3">
                  {[
                    ["Track", "Topic completion", "book", "text-blue-600"],
                    ["Save", "Solved PYQ history", "paper", "text-blue-600"],
                    ["Review", "Numerical practice", "calculator", "text-orange-600"],
                    ["Build", "Daily study streak", "clock", "text-orange-600"],
                  ].map(([value, label, icon, color]) => (
                    <div key={label} className="flex items-center gap-3">
                      <Icon type={icon} className={`h-6 w-6 ${color}`} />
                      <span>
                        <span className="block text-sm font-extrabold text-[#071d49]">{value}</span>
                        <span className="text-xs font-semibold text-[#33415c]">{label}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-800">
                  We are preparing personal progress tracking. Until then, use notes and PYQs directly.
                </p>
              </div>
            </aside>
          </section>

          <section className="rounded-lg border border-[#dfe6f1] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
            <SectionTitle title="Quick Revision Hub" />
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <RevisionCard icon="sigma" title="Formula Sheet" text="Download PDF" href="/gate-ece-formulas" color="text-emerald-600" />
              <RevisionCard icon="file" title="One Page Revision" text="Short & crisp notes" href="/notes" color="text-blue-600" comingSoon />
              <RevisionCard icon="diagram" title="Important Diagrams" text="High yield diagrams" href="/diagram-lab" color="text-rose-500" comingSoon />
              <RevisionCard icon="clock" title="Last Minute Prep" text="High weightage topics" href="/ece-important-questions" color="text-emerald-600" comingSoon />
              <RevisionCard icon="shield" title="Most Expected Qs" text="Important questions" href="/bel-expected-questions-2026" color="text-red-500" comingSoon />
            </div>
          </section>

          <section className="rounded-lg border border-[#dfe6f1] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
            <h2 className="text-xl font-extrabold text-[#071d49] sm:text-2xl">Why ECE Exam Guide?</h2>
            <div className="mt-4 grid gap-2 md:grid-cols-5">
              <WhyItem icon="target" title="Exam Focused Content" text="Curated for ECE exams" color="bg-orange-50 text-orange-600" />
              <WhyItem icon="book" title="Easy to Understand" text="Simple language and neat diagrams" color="bg-sky-50 text-sky-600" />
              <WhyItem icon="clock" title="Updated Regularly" text="Latest papers and content added" color="bg-blue-50 text-blue-600" />
              <WhyItem icon="cloud" title="Download & Study Anywhere" text="Access on all devices" color="bg-violet-50 text-violet-600" />
              <WhyItem icon="users" title="Trusted by Students" text="Built for focused revision" color="bg-emerald-50 text-emerald-600" />
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
}
