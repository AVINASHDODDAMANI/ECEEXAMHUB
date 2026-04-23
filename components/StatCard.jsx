export default function StatCard({ label, value, tone = "dark" }) {
  const tones = {
    dark: "border border-portal-200 bg-gradient-to-r from-portal-600 to-portal-700 text-white",
    light: "border border-portal-200 bg-white text-slate-900",
    accent: "border border-emerald-200 bg-gradient-to-r from-emerald-600 to-green-700 text-white",
  };

  return (
    <div className={`rounded-2xl p-4 shadow-portal ${tones[tone]}`}>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-80">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
