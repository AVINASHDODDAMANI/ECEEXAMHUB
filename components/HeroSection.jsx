import Link from "next/link";

export default function HeroSection({ stats = [], actions = [] }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/95 px-5 py-10 text-slate-100 shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:px-8 sm:py-12 md:px-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.14),transparent_26%)] opacity-90" />
      <div className="relative mx-auto flex min-h-[420px] max-w-6xl flex-col justify-center gap-10">
        <div className="max-w-3xl space-y-6">
          <p className="inline-flex rounded-full border border-slate-700 bg-slate-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
            ECE exam prep made simple
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            One destination for GATE, ISRO, BEL, and BARC preparation.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Learn topics, practice MCQs, and explore past year questions with a compact study flow designed for fast exam readiness.
          </p>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  action.variant === "primary"
                    ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                    : "border border-slate-700 bg-slate-900/90 text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                } w-full`}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.75rem] border border-slate-800/80 bg-slate-900/85 px-5 py-4"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                {item.label}
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
