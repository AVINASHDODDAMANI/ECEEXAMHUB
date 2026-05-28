import Link from "next/link";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { getSearchRedirectHref } from "../lib/search-redirects";

function LineIcon({ type, className = "h-8 w-8" }) {
  const icons = {
    notes: (
      <>
        <path d="M5 5.5h6.5a3 3 0 0 1 3 3V19a3 3 0 0 0-3-3H5V5.5Z" />
        <path d="M19 5.5h-6.5a3 3 0 0 0-3 3V19a3 3 0 0 1 3-3H19V5.5Z" />
        <path d="M8 9h3M16 9h-3M8 12h3M16 12h-3" />
      </>
    ),
    paper: (
      <>
        <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5Z" />
        <path d="M14 3.5V8h4M9 12h6M9 15h6M9 18h3" />
      </>
    ),
    cloud: (
      <>
        <path d="M8 18h9a4 4 0 0 0 .8-7.92A6 6 0 0 0 6.4 8.5 4.5 4.5 0 0 0 8 18Z" />
        <path d="M12 12v7M9.5 15.5 12 18l2.5-2.5" />
      </>
    ),
    target: (
      <>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM16 8l4-4M18 4h2v2" />
      </>
    ),
    digital: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M9 3v4M12 3v4M15 3v4M9 17v4M12 17v4M15 17v4M3 9h4M3 12h4M3 15h4M17 9h4M17 12h4M17 15h4" />
      </>
    ),
    analog: (
      <>
        <path d="M3 12h4l2-5 4 10 2-5h6" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
    signal: <path d="M5 12h1M9 7v10M12 4v16M15 7v10M18 10v4M21 12h-1" />,
    communication: (
      <>
        <path d="M12 21V10M8 21h8M9 10a3 3 0 0 1 6 0M6 8a6 6 0 0 1 12 0M3 6a9 9 0 0 1 18 0" />
        <path d="M12 10.5v.01" />
      </>
    ),
    control: (
      <>
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
        <path d="M12 2.5v3M12 18.5v3M4.5 4.5l2.1 2.1M17.4 17.4l2.1 2.1M2.5 12h3M18.5 12h3M4.5 19.5l2.1-2.1M17.4 6.6l2.1-2.1" />
      </>
    ),
    network: (
      <>
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="M11.1 6.8 6 17M12.9 6.8 18 17M7 19h10" />
      </>
    ),
    magnet: (
      <>
        <path d="M7 5v7a5 5 0 0 0 10 0V5" />
        <path d="M7 5h4M13 5h4M7 9h4M13 9h4" />
      </>
    ),
    chip: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
      </>
    ),
    users: (
      <>
        <path d="M16 20a4 4 0 0 0-8 0M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM20 19a3 3 0 0 0-4-2.8M17 9.4a2.5 2.5 0 1 0-1-4.8M4 19a3 3 0 0 1 4-2.8M7 9.4a2.5 2.5 0 1 1 1-4.8" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16M8 14h3M8 17h6" />
      </>
    ),
    bulb: (
      <>
        <path d="M9 18h6M10 21h4M8.5 15.5a6 6 0 1 1 7 0c-.8.6-1.2 1.3-1.4 2.5H9.9c-.2-1.2-.6-1.9-1.4-2.5Z" />
      </>
    ),
    calculator: (
      <>
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M9 7h6M9 11h.01M12 11h.01M15 11h.01M9 15h.01M12 15h.01M15 15h.01M9 18h.01M12 18h.01M15 18h.01" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 6h4a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8h8" />
      </>
    ),
    formula: (
      <>
        <path d="M7 4h10M9 4c2 4-2 12 0 16M5 20h8M14 12l5 5M19 12l-5 5" />
      </>
    ),
    diagram: (
      <>
        <rect x="4" y="4" width="5" height="5" rx="1" />
        <rect x="15" y="4" width="5" height="5" rx="1" />
        <rect x="9.5" y="15" width="5" height="5" rx="1" />
        <path d="M9 6.5h6M12 9v6" />
      </>
    ),
    checklist: (
      <>
        <path d="M9 5h6M9 5a3 3 0 0 1 6 0M7 5H5.5A1.5 1.5 0 0 0 4 6.5v13A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 18.5 5H17" />
        <path d="m8 12 1.5 1.5L12 11M8 17h6" />
      </>
    ),
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icons[type] || icons.notes}
      </g>
    </svg>
  );
}

function HeroBooks() {
  const books = [
    ["COMMUNICATION SYSTEMS", "bg-[#0d2a66]", "w-[93%]"],
    ["SIGNALS & SYSTEMS", "bg-[#f97316]", "w-[98%]"],
    ["DIGITAL ELECTRONICS", "bg-[#082456]", "w-[91%]"],
    ["CONTROL SYSTEMS", "bg-[#4c2a92]", "w-[96%]"],
    ["NETWORK THEORY", "bg-[#071f4a]", "w-[89%]"],
  ];

  return (
    <div className="relative mx-auto hidden h-[380px] w-full max-w-[470px] lg:block">
      <div className="absolute inset-0 rounded-full border border-blue-400/20" />
      <div className="absolute inset-8 rounded-full border border-blue-400/20" />
      <div className="absolute right-0 top-8 h-56 w-64 opacity-40">
        {[0, 1, 2, 3, 4].map((index) => (
          <span
            key={index}
            className="absolute right-0 h-px bg-blue-300/40"
            style={{ top: `${index * 42}px`, width: `${150 + index * 22}px` }}
          />
        ))}
      </div>

      <div className="absolute bottom-4 right-6 w-[360px]">
        <div className="relative mx-auto mb-[-8px] h-24 w-72">
          <div className="absolute left-8 top-4 h-16 w-48 rounded-b-[50%] bg-[#061936] shadow-xl" />
          <div className="absolute left-0 top-0 h-16 w-72 -skew-x-12 bg-[linear-gradient(145deg,#1f4b8d,#071b3f)] shadow-2xl" />
          <div className="absolute right-8 top-8 h-1.5 w-20 rounded-full bg-orange-500" />
          <div className="absolute right-7 top-8 h-20 w-1 rounded-full bg-orange-500" />
          <div className="absolute right-5 top-[82px] h-7 w-3 rounded-full bg-orange-500" />
        </div>

        <div className="grid gap-1.5">
          {books.map(([label, color, width], index) => (
            <div
              key={label}
              className={`${width} ${color} relative ml-auto h-[52px] rounded-l-xl rounded-r-sm border border-white/10 px-6 py-3 text-sm font-extrabold tracking-wide text-white shadow-[0_16px_22px_rgba(0,0,0,0.32)]`}
              style={{ transform: `translateX(${index % 2 === 0 ? 0 : -16}px)` }}
            >
              <span>{label}</span>
              <span className="absolute right-0 top-1 h-[44px] w-20 rounded-l-2xl bg-white shadow-inner" />
              <span className="absolute bottom-1 right-0 h-1 w-24 rounded-l-full bg-orange-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourceRow({ icon, title, text, cta, children }) {
  return (
    <section className="grid gap-6 rounded-xl bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)] lg:grid-cols-[210px_1fr] lg:items-center">
      <div>
        <span className="text-[#061b4f]">
          <LineIcon type={icon} className="h-8 w-8" />
        </span>
        <h2 className="mt-3 text-2xl font-extrabold leading-tight text-[#071d49]">{title}</h2>
        <p className="mt-3 text-sm font-medium leading-6 text-[#243653]">{text}</p>
        <Link
          href={cta[1]}
          className="mt-4 inline-flex h-10 items-center rounded-md bg-[#061b4f] px-4 text-xs font-extrabold text-white transition hover:bg-[#0b2a70]"
        >
          {cta[0]} <span className="ml-2">-&gt;</span>
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{children}</div>
    </section>
  );
}

function ContentCard({ title, meta, action, href, icon, badge, warm = false }) {
  return (
    <Link
      href={href}
      className="flex min-h-[160px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#ff7417] hover:shadow-[0_14px_35px_rgba(15,23,42,0.10)]"
    >
      {icon ? (
        <span className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${warm ? "bg-orange-100 text-[#061b4f]" : "bg-[#173d78] text-white"}`}>
          <LineIcon type={icon} className="h-8 w-8" />
        </span>
      ) : null}
      {badge ? (
        <span className={`mb-3 w-fit rounded px-2 py-0.5 text-[10px] font-extrabold text-white ${badge === "NEW" ? "bg-green-500" : "bg-violet-600"}`}>
          {badge}
        </span>
      ) : null}
      <h3 className="text-base font-extrabold leading-snug text-[#071d49]">{title}</h3>
      <p className="mt-3 text-xs font-semibold leading-5 text-[#243653]">{meta}</p>
      <span className="mt-auto pt-5 text-xs font-extrabold text-[#ff5f00]">
        {action} <span aria-hidden="true">-&gt;</span>
      </span>
    </Link>
  );
}

export default function Home() {
  const router = useRouter();
  const [homeSearchValue, setHomeSearchValue] = useState("");
  const stats = [
    ["New", "Student Community", "users"],
    ["Growing", "Quick Notes Library", "paper"],
    ["Coming Soon", "More PYQ Papers", "checklist"],
    ["Regular", "Content Updates", "cloud"],
  ];

  const notes = [
    ["Analog Electronics", "120+ Quick Notes", "analog", "/notes/analog-electronics"],
    ["Digital Electronics", "150+ Quick Notes", "digital", "/notes/digital-electronics"],
    ["Signals & Systems", "90+ Quick Notes", "signal", "/notes/signals-and-systems"],
    ["Communication Systems", "110+ Quick Notes", "communication", "/notes/communication-systems"],
    ["Control Systems", "80+ Quick Notes", "control", "/notes/control-systems"],
  ];

  const pyqs = [
    ["GATE ECE 2025 Paper", "55 solved questions with MSQ support", "NEW", "/solution/gate-2025"],
    ["BEL ECE December 2025 Paper", "125 solved objective questions", "NEW", "/solution/bel-december-2025"],
    ["BEL ECE May 2025 Paper", "125 solved objective questions", "NEW", "/solution/bel-may-2025"],
    ["BEL Electronics December 2023 Paper", "125 official paper questions", "UPDATED", "/solution/bel-december-2023"],
  ];

  const theories = [
    ["Fourier Series", "Explained with examples and applications", "route", "/fourier-series"],
    ["Laplace Transform", "Properties, theorems and solved examples", "route", "/laplace-transform"],
    ["Control System Stability", "Routh, Nyquist, Bode explained", "control", "/stability-analysis"],
    ["Communication Theory", "Modulation, demodulation and theory basics", "communication", "/communication-systems-notes"],
    ["Semiconductor Basics", "Diodes, BJTs, MOSFETs and characteristics", "bulb", "/semiconductor-fundamentals"],
  ];

  const numericals = [
    ["Network Theorem Problems", "40+ Problems", "/network-theorems"],
    ["Control Systems Numericals", "35+ Problems", "/control-system-design"],
    ["Signals & Systems Problems", "45+ Problems", "/systems-and-their-properties"],
    ["Analog Electronics Numericals", "50+ Problems", "/analog-to-digital-and-digital-to-analog-converters"],
    ["Digital Electronics Numericals", "60+ Problems", "/digital-ics-and-applications"],
  ];

  const featureBand = [
    ["Exam Focused Content", "Curated by ECE experts", "target", "text-[#ff7417]"],
    ["Easy to Understand", "Simple language & neat diagrams", "diagram", "text-emerald-400"],
    ["Updated Regularly", "Latest papers & new content", "checklist", "text-blue-400"],
    ["Download & Study Anywhere", "Access on all devices", "cloud", "text-violet-400"],
  ];

  const revision = [
    ["Formula Sheet", "Download PDF", "formula", "/gate-ece-formulas"],
    ["One Page Revision", "Short & crisp quick notes", "paper", "/notes"],
    ["Important Diagrams", "High yield diagrams", "diagram", "/diagram-lab"],
    ["Last Minute Prep", "High weightage topics", "checklist", "/ece-important-questions"],
    ["Most Expected Qs", "Important questions", "paper", "/ece-important-questions"],
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
      title="ECE Exam Guide - Your Complete Guide to ECE Exam Success"
      description="Find high-quality ECE quick notes, previous year question papers, study materials, and exam resources for GATE, PSU, and university exam preparation."
      keywords="ECE Exam Guide, ECE quick notes, ECE notes, ECE PYQ papers, electronics and communication engineering, GATE ECE quick revision"
      pageClassName="!px-0 py-0"
    >
      <section className="relative overflow-hidden bg-[#061f45]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(34,105,188,0.42),transparent_35%),linear-gradient(135deg,#071c3d_0%,#092e63_54%,#041a38_100%)]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(44,121,210,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(44,121,210,0.22)_1px,transparent_1px)] [background-size:72px_72px]"
        />
        <div className="relative mx-auto grid max-w-[1320px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center lg:py-16">
          <div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-normal text-white sm:text-5xl lg:text-[3.8rem]">
              ECE Exam Guide
              <span className="block text-[#ff7a1a]">for ECE Exam Success</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/90">
              Find high-quality quick notes, PYQ papers, study materials and resources designed
              to help ECE students excel in their exams.
            </p>

            <form onSubmit={handleHomeSearch} className="mt-7 flex max-w-[590px] overflow-hidden rounded-lg border border-white/20 bg-white p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
              <label htmlFor="home-search" className="sr-only">
                Search quick notes, subjects, PYQ papers
              </label>
              <span className="flex w-12 items-center justify-center text-[#061f45]">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M14.167 14.167 17.5 17.5M15.833 9.167A6.667 6.667 0 1 1 2.5 9.167a6.667 6.667 0 0 1 13.333 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <input
                id="home-search"
                name="q"
                type="search"
                value={homeSearchValue}
                onChange={(event) => setHomeSearchValue(event.target.value)}
                placeholder="Search quick notes, subjects, PYQ papers, concepts, numericals..."
                className="min-w-0 flex-1 border-0 bg-transparent px-1 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
              />
              <button className="rounded-md bg-[#ff7417] px-7 py-3 text-sm font-extrabold text-white transition hover:bg-[#e96009]">
                Search
              </button>
            </form>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(([value, label, icon], index) => (
                <div
                  key={label}
                  className={`flex items-center gap-4 ${index ? "lg:border-l lg:border-white/25 lg:pl-5" : ""}`}
                >
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-[#ff7417] text-[#ff7417]">
                    <LineIcon type={icon} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-xl font-extrabold leading-tight text-white">
                      {value}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-white/85">{label}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <HeroBooks />
        </div>
      </section>

      <section className="bg-[#f5f8fc] px-5 py-7 sm:px-8">
        <div className="mx-auto max-w-[1320px] space-y-7">
          <ResourceRow
            icon="calendar"
            title="Important Quick Notes"
            text="Well-structured quick notes for fast revision and exam preparation."
            cta={["View All Quick Notes", "/notes"]}
          >
            {notes.map(([title, meta, icon, href]) => (
              <ContentCard
                key={title}
                title={title}
                meta={meta}
                action="Download Quick Notes"
                href={href}
                icon={icon}
              />
            ))}
          </ResourceRow>

          <ResourceRow
            icon="paper"
            title="Latest Updated PYQs"
            text="Stay ahead with the most recently updated papers."
            cta={["View All PYQs", "/previous-year"]}
          >
            {pyqs.map(([title, meta, badge, href]) => (
              <ContentCard
                key={title}
                title={title}
                meta={meta}
                action="View Paper"
                href={href}
                badge={badge}
              />
            ))}
          </ResourceRow>

          <ResourceRow
            icon="bulb"
            title="Important Theory Concepts"
            text="Key theory concepts with easy explanations and diagrams."
            cta={["Explore Concepts", "/subjects"]}
          >
            {theories.map(([title, meta, icon, href]) => (
              <ContentCard
                key={title}
                title={title}
                meta={meta}
                action="Read More"
                href={href}
                icon={icon}
                warm
              />
            ))}
          </ResourceRow>

          <ResourceRow
            icon="calculator"
            title="Important Numericals"
            text="Practice important numericals with step-by-step solutions."
            cta={["View All Numericals", "/practice"]}
          >
            {numericals.map(([title, meta, href]) => (
              <ContentCard
                key={title}
                title={title}
                meta={meta}
                action="Solve Now"
                href={href}
              />
            ))}
          </ResourceRow>

          <section className="grid gap-5 rounded-xl bg-[#061f55] px-6 py-6 text-white shadow-[0_18px_45px_rgba(6,31,85,0.22)] md:grid-cols-4">
            {featureBand.map(([title, text, icon, color], index) => (
              <div
                key={title}
                className={`flex items-center gap-4 ${index ? "border-t border-white/20 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0" : ""}`}
              >
                <span className={`flex h-14 w-14 flex-none items-center justify-center rounded-xl border border-current ${color}`}>
                  <LineIcon type={icon} className="h-7 w-7" />
                </span>
                <span>
                  <span className="block text-base font-extrabold text-white">{title}</span>
                  <span className="mt-1 block text-sm font-medium text-white/85">{text}</span>
                </span>
              </div>
            ))}
          </section>

          <section className="rounded-xl bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-[#071d49]">Quick Revision Hub</h2>
              <div className="mx-auto mt-1 h-1 w-12 rounded-full bg-[#ff7417]" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {revision.map(([title, meta, icon, href]) => (
                <Link
                  key={title}
                  href={href}
                  className="flex min-h-[84px] items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-[#ff7417] hover:shadow-sm"
                >
                  <span className="text-[#ff7417]">
                    <LineIcon type={icon} className="h-8 w-8" />
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-[#071d49]">{title}</span>
                    <span className="mt-1 block text-xs font-semibold text-[#243653]">{meta}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <div className="grid overflow-hidden rounded-xl bg-[#061f55] shadow-[0_18px_45px_rgba(6,31,85,0.22)] md:grid-cols-4">
            {stats.map(([value, label, icon], index) => (
              <div
                key={label}
                className={`flex items-center justify-center gap-5 px-6 py-7 ${
                  index ? "border-t border-white/20 md:border-l md:border-t-0" : ""
                }`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#ff7417] text-[#ff7417]">
                  <LineIcon type={icon} className="h-7 w-7" />
                </span>
                <span>
                  <span className="block text-2xl font-extrabold leading-tight text-white">
                    {value}
                  </span>
                  <span className="text-sm font-semibold text-white/86">{label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
