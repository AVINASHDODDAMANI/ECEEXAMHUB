export default function ProgressOverview({ progressStats, compact = false }) {
  const visibleSubjects = compact
    ? progressStats.subjects.filter((subject) => subject.totalTopics > 0).slice(0, 4)
    : progressStats.subjects;

  return (
    <section className={`rounded-[2rem] border border-white/60 bg-white/90 shadow-panel ${
      compact ? "p-4" : "p-6"
    }`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Progress Tracking
          </p>
          <h2 className={`mt-2 font-semibold text-slate-900 ${compact ? "text-xl" : "text-2xl"}`}>
            GATE syllabus completion: {progressStats.completionPercent}%
          </h2>
          <p className={`mt-3 max-w-2xl text-sm text-slate-600 ${compact ? "leading-6" : "leading-7"}`}>
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

      <div className={`mt-6 grid gap-4 ${compact ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-5"}`}>
        {visibleSubjects.map((subject) => (
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

      {compact && progressStats.subjects.filter((subject) => subject.totalTopics > 0).length > visibleSubjects.length ? (
        <p className="mt-4 text-sm text-slate-500">
          Open Learn to see the full subject progress breakdown.
        </p>
      ) : null}
    </section>
  );
}
