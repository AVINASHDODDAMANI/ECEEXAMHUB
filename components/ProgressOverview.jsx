export default function ProgressOverview({ progressStats, compact = false }) {
  return (
    <section className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Progress Tracking
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            GATE syllabus completion: {progressStats.completionPercent}%
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Completed topics: {progressStats.completedCount} of {progressStats.totalTopics} ready
            learning modules. Progress is stored locally in this browser for now.
          </p>
        </div>
        {!compact ? (
          <div className="rounded-3xl bg-slatebrand-900 px-5 py-4 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-slatebrand-300">
              Exam Focus
            </p>
            <p className="mt-2 text-lg font-semibold">Learn + PYQ + Practice</p>
          </div>
        ) : null}
      </div>

      <div className="mt-5 h-3 rounded-full bg-slate-100">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-slatebrand-600 to-accent-500"
          style={{ width: `${progressStats.completionPercent}%` }}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {progressStats.subjects.map((subject) => (
          <div
            key={subject.slug}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{subject.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {subject.weightage}
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slatebrand-700">
                {subject.completionPercent}%
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              {subject.completedTopics}/{subject.totalTopics} ready topics completed
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
