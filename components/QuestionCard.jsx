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
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)] text-slate-900">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-slatebrand-500">
            {question.subject} | {question.topic}
          </p>
          <p className="mt-2 text-base font-medium leading-relaxed text-slate-900 sm:text-lg">
            {question.question}
          </p>
        </div>
        <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
          Q{index + 1} / {total}
        </div>
      </div>

      <div className="mt-4 grid gap-2.5">
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
              className={`w-full rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
                showCorrect
                  ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                  : showIncorrect
                  ? "border-rose-300 bg-rose-50 text-rose-700"
                  : isSelected
                  ? "border-slatebrand-300 bg-slatebrand-50 text-slatebrand-900"
                  : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slatebrand-300 hover:bg-white"
              } ${submitted ? "cursor-default" : "cursor-pointer"}`}
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span className="leading-6">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          {submitted ? (
            <button
              type="button"
              onClick={() => setShowExplanation((value) => !value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slatebrand-300 hover:bg-white"
            >
              {showExplanation ? "Hide Answer" : "Show Answer"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onPrevious}
            disabled={index === 0}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slatebrand-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={index === total - 1}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slatebrand-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {submitted ? (
          <div
            className={`rounded-xl px-4 py-2.5 text-sm font-medium ${
              isCorrect
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {isCorrect ? "Correct answer selected" : "Incorrect answer selected"}
          </div>
        ) : null}
      </div>

      {submitted && showExplanation ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
          <p className="font-semibold text-slate-900">Answer</p>
          <p className="mt-2">{question.correctAnswer}</p>
          <p className="mt-3 font-semibold text-slate-900">Explanation</p>
          <p className="mt-2">{question.explanation}</p>
        </div>
      ) : null}
    </article>
  );
}
