export default function InsightChart({ data }) {
  const maxValue = Math.max(...data.map((item) => item.total), 1);

  return (
    <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-panel">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Topic Weightage
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            Exam Coverage by Subject
          </h2>
        </div>
        <div className="rounded-full bg-slatebrand-100 px-3 py-1 text-xs font-semibold text-slatebrand-700">
          Higher bar = more frequently asked
        </div>
      </div>

      <div className="space-y-5">
        {data.map((item) => (
          <div key={item.subject}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-800">{item.subject}</span>
              <span className="text-slate-500">{item.total} weighted questions</span>
            </div>
            <div className="h-4 rounded-full bg-slate-100">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-slatebrand-500 to-accent-500"
                style={{ width: `${(item.total / maxValue) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              GATE {item.GATE} | ISRO {item.ISRO} | BEL {item.BEL} | BARC {item.BARC}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
