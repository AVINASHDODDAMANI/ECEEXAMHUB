import { useState } from "react";

export default function QuestionCard({
  question,
  index,
  total,
  onNext,
  onPrevious,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = submitted && selectedOption === question.correctAnswer;

  return (
    <article className="rounded-[2rem] border border-white/60 bg-white/95 p-6 shadow-panel">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Practice Question
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            {question.subject} - {question.topic}
          </h2>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
          Question {index + 1} of {total}
        </div>
      </div>

      <p className="text-lg leading-8 text-slate-800">{question.question}</p>

      {question.diagram ? (
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
          <img
            src={question.diagram}
            alt="Question diagram"
            className="h-56 w-full object-cover"
          />
        </div>
      ) : null}

      <div className="mt-6 grid gap-3">
        {(question.options || []).map((option, optionIndex) => {
          const isSelected = selectedOption === option;
          const showCorrect = submitted && option === question.correctAnswer;
          const showIncorrect = submitted && isSelected && option !== question.correctAnswer;

          return (
            <button
              key={`${optionIndex}-${option}`}
              type="button"
              disabled={submitted}
              onClick={() => setSelectedOption(option)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                showCorrect
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : showIncorrect
                  ? "border-rose-400 bg-rose-50 text-rose-700"
                  : isSelected
                  ? "border-slatebrand-400 bg-slatebrand-50 text-slatebrand-900"
                  : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slatebrand-300 hover:bg-white"
              }`}
            >
              <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-slatebrand-700 shadow-sm">
                {String.fromCharCode(65 + optionIndex)}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={!selectedOption || submitted}
            className="rounded-2xl bg-slatebrand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slatebrand-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Check Answer
          </button>
          <button
            type="button"
            onClick={onPrevious}
            disabled={index === 0}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slatebrand-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={index === total - 1}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slatebrand-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p
              className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                isCorrect ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {isCorrect ? "Correct Answer" : "Review This Concept"}
            </p>
            <p className="mt-3 text-base font-medium text-slate-900">
              Correct option: {question.correctAnswer}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {question.explanation}
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}
