import { useState } from "react";
import { formatQuestionTag, hasQuestionTag } from "../lib/question-utils";

export default function PreviousYearQuestionCard({
  question,
  showTopicMeta = true,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const isImportant = hasQuestionTag(question, "important");
  const isRepeated = hasQuestionTag(question, "repeated");
  const isCorrect = submitted && selectedOption === question.correctAnswer;

  function handleOptionSelect(option) {
    if (submitted) {
      return;
    }

    setSelectedOption(option);
    setSubmitted(true);
    setShowExplanation(false);
  }

  return (
    <article
      className={`rounded-[1.5rem] border bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ${
        isImportant ? "border-amber-200" : "border-slate-200"
      }`}
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
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
          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            {showTopicMeta ? `${question.subject} | ${question.topic}` : question.topic}
          </h2>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          Year {question.year}
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-800">{question.question}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Select an option to check your answer.
      </p>

      <div className="mt-4 grid gap-2.5 md:grid-cols-2">
        {(question.options || []).map((option, index) => {
          const isSelected = selectedOption === option;
          const showCorrect = submitted && option === question.correctAnswer;
          const showIncorrect = submitted && isSelected && option !== question.correctAnswer;

          return (
            <button
              key={`${index}-${option}`}
              type="button"
              onClick={() => handleOptionSelect(option)}
              className={`flex items-start rounded-xl border px-3 py-3 text-left text-sm transition ${
                showCorrect
                  ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                  : showIncorrect
                  ? "border-rose-300 bg-rose-50 text-rose-700"
                  : isSelected
                  ? "border-slatebrand-300 bg-slatebrand-50 text-slatebrand-900"
                  : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slatebrand-300 hover:bg-white"
              } ${submitted ? "cursor-default" : "cursor-pointer"}`}
              disabled={submitted}
            >
              <span className="mr-2 font-semibold">{String.fromCharCode(65 + index)}.</span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {(question.tags || []).length ? (
        <div className="mt-4 flex flex-wrap gap-2">
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

      <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4">
        {submitted ? (
          <div
            className={`rounded-[1.1rem] border p-4 ${
              isCorrect ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
            }`}
          >
            <p
              className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                isCorrect ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {isCorrect ? "Correct answer" : "Wrong answer"}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-900">
              Your answer: {selectedOption}
            </p>
            {!isCorrect ? (
              <p className="mt-2 text-sm font-medium text-slate-700">
                Correct answer: {question.correctAnswer}
              </p>
            ) : null}
          </div>
        ) : null}

        {submitted ? (
          <button
            type="button"
            onClick={() => setShowExplanation((value) => !value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slatebrand-300"
          >
            {showExplanation ? "Hide Explanation" : "Show Answer & Explanation"}
          </button>
        ) : null}

        {submitted && showExplanation ? (
          <div className="rounded-[1.1rem] border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
              Explanation
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{question.explanation}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
}
