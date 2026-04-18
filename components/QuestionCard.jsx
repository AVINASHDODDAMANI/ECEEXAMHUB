import { useEffect, useState } from "react";

export default function QuestionCard({
  question,
  index,
  total,
  onNext,
  onPrevious,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const isCorrect = submitted && selectedOption === question.correctAnswer;

  useEffect(() => {
    setSelectedOption("");
    setSubmitted(false);
    setShowExplanation(false);
  }, [question._id]);

  return (
    <article className="rounded-[1.75rem] border border-slate-800/80 bg-slate-950/95 p-5 shadow-panel text-slate-100">
      <div className="flex flex-col gap-3 border-b border-slate-800 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
            {question.subject} • {question.topic}
          </p>
          <p className="mt-2 text-lg font-medium text-white sm:text-xl leading-relaxed">
            {question.question}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-900/80 px-3 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
          Q{index + 1} / {total}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {(question.options || []).map((option, optionIndex) => {
          const isSelected = selectedOption === option;
          const showCorrect = submitted && option === question.correctAnswer;
          const showIncorrect = submitted && isSelected && option !== question.correctAnswer;

          return (
            <button
              type="button"
              key={`${optionIndex}-${option}`}
              onClick={() => {
                if (submitted) {
                  return;
                }

                setSelectedOption(option);
                setSubmitted(true);
                setShowExplanation(false);
              }}
              className={`w-full rounded-2xl border px-4 py-4 text-left text-sm font-medium transition ${
                showCorrect
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-100"
                  : showIncorrect
                  ? "border-rose-400 bg-rose-500/10 text-rose-100"
                  : isSelected
                  ? "border-slate-500 bg-slate-900 text-white"
                  : "border-slate-700 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-900"
              } ${submitted ? "cursor-default" : "cursor-pointer"}`}
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-semibold text-slate-200">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span className="leading-6">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-slate-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          {submitted ? (
            <button
              type="button"
              onClick={() => setShowExplanation((value) => !value)}
              className="rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
            >
              {showExplanation ? "Hide Answer" : "Show Answer"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onPrevious}
            disabled={index === 0}
            className="rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={index === total - 1}
            className="rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {submitted ? (
          <div
            className={`rounded-2xl px-4 py-3 text-sm font-medium ${
              isCorrect
                ? "bg-emerald-500/10 text-emerald-100 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-100 border border-rose-500/20"
            }`}
          >
            {isCorrect ? "Correct answer selected" : "Incorrect answer selected"}
          </div>
        ) : null}
      </div>

      {submitted && showExplanation ? (
        <div className="mt-4 rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 text-sm leading-7 text-slate-300">
          <p className="font-semibold text-white">Answer</p>
          <p className="mt-2">{question.correctAnswer}</p>
          <p className="mt-3 font-semibold text-white">Explanation</p>
          <p className="mt-2">{question.explanation}</p>
        </div>
      ) : null}
    </article>
  );
}
