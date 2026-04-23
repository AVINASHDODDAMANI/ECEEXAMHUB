export default function ProgressOverview({ progressStats, compact = false }) {
  const visibleSubjects = compact
    ? progressStats.subjects.filter((subject) => subject.totalTopics > 0).slice(0, 4)
    : progressStats.subjects;

  return (
    <section className={`rounded-2xl border border-portal-200 bg-white shadow-portal ${
      compact ? "p-4" : "p-6"
    }`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-portal-600">
            Progress Tracking
          </p>
          <h2 className={`mt-2 font-bold text-slate-900 ${compact ? "text-xl" : "text-2xl"}`}>
            GATE syllabus completion: {progressStats.completionPercent}%
          </h2>
          <p className={`mt-3 max-w-2xl text-sm text-slate-600 ${compact ? "leading-6" : "leading-7"}`}>
            Completed topics: {progressStats.completedCount} of {progressStats.totalTopics} ready
            learning modules. Progress is stored locally in this browser for now.
          </p>
        </div>
        {!compact ? (
          <div className="rounded-2xl border border-portal-200 bg-portal-50 px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
              Exam Focus
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">Learn + PYQ + Practice</p>
          </div>
        ) : null}
      </div>

      <div className="mt-5 h-3 rounded-full bg-slate-100">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-portal-600 to-[#f4c542]"
          style={{ width: `${progressStats.completionPercent}%` }}
        />
      </div>

      <div className={`mt-6 grid gap-4 ${compact ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-5"}`}>
        {visibleSubjects.map((subject) => (
          <div
            key={subject.slug}
            className="rounded-2xl border border-portal-200 bg-[#f8fbff] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900">{subject.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {subject.weightage}
                </p>
              </div>
              <span className="rounded-full border border-portal-200 bg-white px-3 py-1 text-xs font-bold text-portal-700">
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
