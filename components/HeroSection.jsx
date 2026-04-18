import Link from "next/link";

export default function HeroSection({ stats = [], actions = [] }) {
  return (
   <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/95 px-3 py-4 text-slate-100 shadow-md sm:px-4 sm:py-5">
  <div className="relative mx-auto max-w-6xl flex flex-col gap-4">

    <div className="max-w-2xl space-y-3">
      <p className="text-[10px] uppercase tracking-widest text-slate-400">
        ECE EXAM PREP
      </p>

      <h1 className="text-lg font-semibold text-white sm:text-xl">
        One destination for GATE, ISRO, BEL, and BARC preparation.
      </h1>

      <p className="text-xs text-slate-400 leading-5">
        Learn, practice MCQs, and explore PYQs in a compact flow.
      </p>

      <div className="flex gap-2">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`px-3 py-1.5 text-xs rounded-lg font-semibold ${
              action.variant === "primary"
                ? "bg-amber-500 text-black"
                : "border border-slate-600 text-white"
            }`}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-lg bg-slate-900 px-2 py-2 text-center"
        >
          <p className="text-[10px] text-slate-400">{item.label}</p>
          <p className="text-sm font-semibold text-white">{item.value}</p>
        </div>
      ))}
    </div>

  </div>
</section>
  );
}
