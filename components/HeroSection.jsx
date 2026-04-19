import Link from "next/link";

export default function HeroSection({ stats = [], actions = [], examTags = [] }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-blue-200/20 bg-[linear-gradient(135deg,#1b53d1_0%,#2b66e4_35%,#1743b0_100%)] px-6 py-12 text-white shadow-[0_28px_60px_rgba(23,67,176,0.28)] sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.10),transparent_24%),linear-gradient(120deg,rgba(255,255,255,0.06),transparent_38%)]" />
      <div className="pointer-events-none absolute -left-12 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-8 top-8 h-64 w-64 rounded-full bg-sky-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-100">
          Theory · Practice · Revision
        </p>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Crack ECE Exams Smarter, Not Harder
        </h1>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-50">
          {examTags.map((tag, index) => (
            <span key={tag} className="flex items-center gap-3">
              {index ? <span className="h-px w-5 bg-white/35" /> : null}
              {tag}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-[1.6rem] border border-white/15 bg-white/95 px-5 py-4 shadow-[0_18px_40px_rgba(7,18,60,0.18)]">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 flex-none text-slate-400" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M14.167 14.167L17.5 17.5M15.833 9.167A6.667 6.667 0 1 1 2.5 9.167a6.667 6.667 0 0 1 13.333 0Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-left text-base text-slate-500">
              Search Signals and Systems, Networks, formulas, and revision notes...
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`rounded-2xl px-7 py-4 text-lg font-semibold shadow-[0_16px_32px_rgba(7,18,60,0.2)] transition ${
                action.variant === "primary"
                  ? "bg-[linear-gradient(180deg,#29a55f_0%,#1d7d46_100%)] text-white hover:brightness-105"
                  : "bg-[linear-gradient(180deg,#2f66e6_0%,#1d49b8_100%)] text-white hover:brightness-105"
              }`}
            >
              {action.label}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.4rem] border border-white/15 bg-white/10 px-4 py-4 text-left backdrop-blur-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
