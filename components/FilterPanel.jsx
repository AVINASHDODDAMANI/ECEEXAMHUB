export default function FilterPanel({ title, controls }) {
  return (
    <section className="rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-700">
          Filters
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{controls}</div>
    </section>
  );
}
