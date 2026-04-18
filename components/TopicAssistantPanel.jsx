export default function TopicAssistantPanel({
  topic,
  isCompleted,
  isSavedForRevision,
  questionCount,
  importantCount,
  subjectProgressPercent,
  onJump,
  onToggleCompleted,
  onToggleRevision,
}) {
  const steps = [
    {
      id: "explanation",
      label: "Learn Concept",
      mobileLabel: "Learn",
      helper: "Read the concept in simple language.",
    },
    {
      id: "pyqs",
      label: "View PYQs",
      mobileLabel: "PYQs",
      helper: "See how this topic appears in real exams.",
    },
    {
      id: "practice",
      label: "Practice MCQs",
      mobileLabel: "Practice",
      helper: "Solve linked questions one by one.",
    },
  ];

  return (
    <>
      <aside className="hidden xl:block">
        <div className="sticky top-28 rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Topic Assistant
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{topic.title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Follow this order and the platform will feel much easier to use.
          </p>

          <div className="mt-5 grid gap-3">
            {steps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => onJump(step.id)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-slatebrand-300 hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
                  Step {index + 1}
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">{step.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.helper}</p>
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={onToggleCompleted}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isCompleted
                  ? "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
                  : "bg-slatebrand-900 text-white hover:bg-slatebrand-800"
              }`}
            >
              {isCompleted ? "Completed" : "Mark as Completed"}
            </button>

            <button
              type="button"
              onClick={onToggleRevision}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                isSavedForRevision
                  ? "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slatebrand-300"
              }`}
            >
              {isSavedForRevision ? "Saved for Revision" : "Save for Revision"}
            </button>
          </div>

          <div className="mt-5 grid gap-3">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Linked questions</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{questionCount}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Important set</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{importantCount}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Subject progress</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{subjectProgressPercent}%</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-4 z-40 px-4 xl:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-2 rounded-[1.75rem] bg-slatebrand-900/96 p-3 text-white shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur">
          {steps.map((step) => (
            <button
              key={step.id}
              type="button"
              onClick={() => onJump(step.id)}
              className="flex-1 rounded-2xl bg-white/10 px-3 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-white/20"
            >
              {step.mobileLabel}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
