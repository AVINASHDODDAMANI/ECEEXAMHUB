export default function TopicSectionCard({
  id,
  eyebrow,
  title,
  description,
  open,
  onToggle,
  children,
  actions,
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-[2rem] border border-white/70 bg-white/92 p-6 shadow-panel transition-all duration-300"
    >
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h2>
          {description ? (
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3">
          {actions}
          <button
            type="button"
            onClick={onToggle}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slatebrand-300 hover:text-slatebrand-900"
          >
            {open ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">{children}</div>
      </div>
    </section>
  );
}
