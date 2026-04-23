export default function FilterPanel({ title, controls }) {
  return (
    <section className="rounded-2xl border border-portal-200 bg-white p-4 shadow-portal sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <span className="rounded-full border border-portal-200 bg-portal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-portal-700">
          Filters
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{controls}</div>
    </section>
  );
}
