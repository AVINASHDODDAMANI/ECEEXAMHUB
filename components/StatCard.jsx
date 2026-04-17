export default function StatCard({ label, value, tone = "dark" }) {
  const tones = {
    dark: "bg-slatebrand-900 text-white",
    light: "bg-white text-slate-900 border border-slate-200",
    accent: "bg-accent-500 text-slate-950",
  };

  return (
    <div className={`rounded-3xl p-5 shadow-panel ${tones[tone]}`}>
      <p className="text-sm uppercase tracking-[0.2em] opacity-75">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </div>
  );
}
