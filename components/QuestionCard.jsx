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
    <article className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm text-slate-900">
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slatebrand-500">
            {question.subject} | {question.topic}
          </p>
          <p className="mt-1.5 text-sm font-medium leading-6 text-slate-900 sm:text-base">
            {question.question}
          </p>
        </div>
        <div className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
          Q{index + 1} / {total}
        </div>
      </div>

      <div className="mt-3 grid gap-2">
        {(question.options || []).map((option, optionIndex) => {
          const isSelected = selectedOption === option;
          const showCorrect = submitted && option === question.correctAnswer;
          const showIncorrect = submitted && isSelected && option !== question.correctAnswer;

          return (
            <button
              type="button"
              key={`${optionIndex}-${option}`}
              onClick={() => {
                if (submitted) return;

                setSelectedOption(option);
                setSubmitted(true);
              }}
              className={`w-full rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition ${
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
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-[11px] font-semibold text-slate-700">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span className="leading-6">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          {submitted ? (
            <button
              type="button"
              onClick={() => setShowExplanation((value) => !value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slatebrand-300 hover:bg-white"
            >
              {showExplanation ? "Hide Answer" : "Show Answer"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onPrevious}
            disabled={index === 0}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slatebrand-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={index === total - 1}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slatebrand-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {submitted ? (
          <div
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
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
        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
          <p className="font-semibold text-slate-900">Answer</p>
          <p className="mt-1.5">{question.correctAnswer}</p>
          <p className="mt-2.5 font-semibold text-slate-900">Explanation</p>
          <p className="mt-1.5">{question.explanation}</p>
        </div>
      ) : null}
    </article>
  );
}
