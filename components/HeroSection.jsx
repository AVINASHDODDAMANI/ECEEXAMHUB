import Link from "next/link";

export default function HeroSection({ stats = [], actions = [], examTags = [] }) {
  return (
    <section className="relative overflow-hidden rounded-[1rem] border border-blue-200/20 bg-[linear-gradient(135deg,#1b53d1_0%,#2b66e4_35%,#1743b0_100%)] px-4 py-4 text-white shadow-[0_24px_48px_rgba(23,67,176,0.24)] sm:px-5 sm:py-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.10),transparent_24%),linear-gradient(120deg,rgba(255,255,255,0.06),transparent_38%)]" />
      <div className="mx-auto max-w-4xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-100">
          Theory | Practice | Revision
        </p>
        <h1 className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[1.75rem]">
          Crack ECE Exams Smarter, Not Harder
        </h1>

        <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-50">
          {examTags.map((tag) => (
            <span key={tag} className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                action.variant === "primary"
                  ? "bg-[linear-gradient(180deg,#29a55f_0%,#1d7d46_100%)] text-white hover:brightness-105"
                  : "bg-[linear-gradient(180deg,#2f66e6_0%,#1d49b8_100%)] text-white hover:brightness-105"
              }`}
            >
              {action.label}
            </Link>
          ))}
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-left backdrop-blur-sm"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-100">
                {item.label}
              </p>
              <p className="mt-0.5 text-base font-semibold text-white sm:text-lg">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
