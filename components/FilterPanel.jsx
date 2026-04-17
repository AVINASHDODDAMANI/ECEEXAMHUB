export default function FilterPanel({ title, controls }) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/90 p-5 shadow-panel">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-700">
          Filters
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{controls}</div>
    </section>
  );
}
