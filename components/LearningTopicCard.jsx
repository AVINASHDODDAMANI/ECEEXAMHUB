import Link from "next/link";

export default function LearningTopicCard({
  topic,
  chapterTitle,
  subjectName,
  subjectWeightage,
  progressPercent = 0,
}) {
  const isReady = topic.status === "ready";

  return (
    <article className="rounded-2xl border border-portal-200 bg-white p-4 shadow-portal transition hover:-translate-y-0.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-portal-200 bg-portal-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-portal-700">
            {chapterTitle}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] ${
              isReady
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {isReady ? "Ready" : "Roadmap"}
          </span>
        </div>
        <span className="rounded-full border border-portal-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-portal-700">
          {progressPercent}%
        </span>
      </div>

      <h3 className="mt-3 text-lg font-bold text-slate-900">{topic.title}</h3>
      <p className="mt-1 text-xs text-slate-500">
        {subjectName} | {subjectWeightage} | {topic.estimatedTime}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{topic.summary}</p>

      <div className="mt-4 h-2 rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-portal-600 to-[#f4c542]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {topic.concepts.slice(0, 3).map((concept) => (
          <span
            key={`${topic.slug}-${concept}`}
            className="rounded-full border border-portal-200 bg-[#f8fbff] px-2.5 py-1 text-[11px] font-medium text-slate-600"
          >
            {concept}
          </span>
        ))}
      </div>

      {(topic.subtopics || []).length ? (
        <div className="mt-4 rounded-xl border border-portal-200 bg-[#f8fbff] p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-portal-600">
              Subtopics
            </p>
            <span className="rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold text-portal-700">
              {(topic.subtopics || []).length}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(topic.subtopics || []).slice(0, 4).map((subtopic) => (
              <span
                key={`${topic.slug}-${subtopic}`}
                className="rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600"
              >
                {subtopic}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {isReady ? (
        <Link
          href={topic.href}
          className="mt-4 inline-flex rounded-xl bg-portal-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-portal-700"
        >
          Open Topic Hub
        </Link>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-portal-300 bg-[#f8fbff] px-4 py-3 text-sm text-slate-500">
          Chapter structure is ready. Detailed quick notes and integrated question sets are queued next.
        </div>
      )}
    </article>
  );
}
