export default function EmptyState({ title, message }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-panel">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>
    </div>
  );
}
