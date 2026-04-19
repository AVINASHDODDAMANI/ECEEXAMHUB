export default function StatCard({ label, value, tone = "dark" }) {
  const tones = {
    dark: "bg-[linear-gradient(135deg,#1b53d1_0%,#1743b0_100%)] text-white border border-blue-200/20",
    light: "bg-white text-slate-900 border border-slate-200",
    accent: "bg-[linear-gradient(135deg,#2ea25b_0%,#1c7e45_100%)] text-white border border-emerald-200/20",
  };

  return (
    <div className={`rounded-[1.4rem] p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ${tones[tone]}`}>
      <p className="text-[11px] uppercase tracking-[0.2em] opacity-75">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
