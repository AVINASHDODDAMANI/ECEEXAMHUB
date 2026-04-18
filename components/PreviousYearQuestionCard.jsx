import { formatQuestionTag, hasQuestionTag } from "../lib/question-utils";

export default function PreviousYearQuestionCard({
  question,
  showTopicMeta = true,
}) {
  const isImportant = hasQuestionTag(question, "important");
  const isRepeated = hasQuestionTag(question, "repeated");

  return (
    <article
      className={`rounded-[2rem] border bg-white/90 p-6 shadow-panel ${
        isImportant ? "border-amber-200" : "border-white/60"
      }`}
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
              {(question.exam || []).join(" | ")}
            </p>
            {isImportant ? (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                Important
              </span>
            ) : null}
            {isRepeated ? (
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
                Repeated
              </span>
            ) : null}
          </div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            {showTopicMeta ? `${question.subject} | ${question.topic}` : question.topic}
          </h2>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
          Year {question.year}
        </div>
      </div>

      <p className="mt-5 text-base leading-8 text-slate-800">{question.question}</p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {(question.options || []).map((option, index) => (
          <div
            key={`${index}-${option}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
          >
            <span className="mr-2 font-semibold">{String.fromCharCode(65 + index)}.</span>
            {option}
          </div>
        ))}
      </div>

      {(question.tags || []).length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {(question.tags || []).map((tag) => (
            <span
              key={`${question._id}-${tag}`}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
            >
              {formatQuestionTag(tag)}
            </span>
          ))}
        </div>
      ) : null}

      <details className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-slatebrand-700">
          Show Answer and Explanation
        </summary>
        <div className="border-t border-slate-200 px-5 py-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
            Correct Answer
          </p>
          <p className="mt-3 text-base font-medium text-slate-900">
            {question.correctAnswer}
          </p>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
            Explanation
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-700">{question.explanation}</p>
        </div>
      </details>
    </article>
  );
}
