import { useState } from "react";
import CircuitDiagram from "./CircuitDiagram";
import FormattedText, { InlineFormattedText } from "./FormattedText";
import QuestionStem from "./QuestionStem";
import { formatQuestionTag, hasQuestionTag } from "../lib/question-utils";

function getCorrectAnswers(question = {}) {
  return Array.isArray(question.correctAnswers) && question.correctAnswers.length
    ? question.correctAnswers
    : question.correctAnswer
      ? [question.correctAnswer]
      : [];
}

function getCorrectAnswerText(question = {}) {
  const correctAnswers = getCorrectAnswers(question);

  return question.correctAnswer || correctAnswers.join(", ");
}

function getQuestionExamLabel(question = {}) {
  const exam = (question.exam || []).includes("GATE")
    ? "GATE"
    : (question.exam || [])[0] || "ECE";
  const year = question.year ? ` ${question.year}` : "";
  const branch = exam === "GATE" ? " ECE" : "";

  return `${exam}${year}${branch}`.trim();
}

function getQuestionSeoTitle(question = {}) {
  const questionNumber = question.questionId ? ` Question ${question.questionId}` : " Question";
  const subject = question.subject || "Electronics";

  return `${getQuestionExamLabel(question)} ${subject}${questionNumber}`;
}

function getQuestionDifficulty(question = {}) {
  if (question.difficulty) {
    return question.difficulty;
  }

  if (Number(question.marks || 0) >= 2) {
    return "Medium";
  }

  return "Easy";
}

function getQuestionConcept(question = {}) {
  return question.concept || question.topic || question.subject || "ECE concept";
}

function sameAnswerSet(left = [], right = []) {
  return (
    left.length === right.length &&
    left.every((answer) => right.includes(answer))
  );
}

export default function PreviousYearQuestionCard({
  question,
  showTopicMeta = true,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const isImportant = hasQuestionTag(question, "important");
  const isRepeated = hasQuestionTag(question, "repeated");
  const correctAnswers = getCorrectAnswers(question);
  const correctAnswerText = getCorrectAnswerText(question);
  const seoTitle = getQuestionSeoTitle(question);
  const difficulty = getQuestionDifficulty(question);
  const concept = getQuestionConcept(question);
  const isMultiAnswer = correctAnswers.length > 1 || question.questionType === "MSQ";
  const maxSelectableAnswers =
    isMultiAnswer && correctAnswers.length > 1
      ? correctAnswers.length
      : question.options?.length || 0;
  const hasAnswerKey = correctAnswers.length > 0;
  const submittedAnswers = isMultiAnswer ? selectedOptions : [selectedOption].filter(Boolean);
  const selectedAnswerText = submittedAnswers.join(", ");
  const isCorrect =
    hasAnswerKey &&
    submitted &&
    (isMultiAnswer
      ? sameAnswerSet(submittedAnswers, correctAnswers)
      : selectedOption === correctAnswers[0]);

  function handleOptionSelect(option) {
    if (submitted) return;
    if (isMultiAnswer) {
      setSelectedOptions((current) => {
        if (current.includes(option)) {
          return current.filter((item) => item !== option);
        }

        if (current.length >= maxSelectableAnswers) {
          return current;
        }

        return [...current, option];
      });
      return;
    }

    setSelectedOption(option);
    setSubmitted(true);
  }

  return (
    <article
      className={`rounded-lg border bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.1)] ${
        isImportant ? "border-amber-200" : "border-slate-200"
      }`}
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slatebrand-500">
              {(question.exam || []).join(" | ")}
            </p>
            {isImportant ? (
              <span className="rounded-md bg-amber-100 px-2 py-1 text-[11px] font-medium text-amber-800">
                Important
              </span>
            ) : null}
            {isRepeated ? (
              <span className="rounded-md bg-sky-100 px-2 py-1 text-[11px] font-medium text-sky-800">
                Repeated
              </span>
            ) : null}
          </div>
          <h2 id={`question-${question._id || question.questionId || "pyq"}`} className="mt-1.5 text-base font-semibold text-slate-900">
            {seoTitle}
          </h2>
          {showTopicMeta ? (
            <p className="mt-1 text-xs font-semibold text-slate-500">
              {question.subject} | {question.topic}
            </p>
          ) : null}
        </div>
        <div className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
          Year {question.year}
        </div>
      </div>

      <QuestionStem question={question} className="mt-3 text-sm leading-6 text-slate-800" />

      <dl className="mt-3 grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Topic", question.topic || "Previous year question"],
          ["Concept", concept],
          ["Difficulty", difficulty],
          ["Solution", question.explanation ? "Step-by-step explanation" : "Answer key pending"],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="font-extrabold uppercase tracking-[0.12em] text-slate-500">{label}</dt>
            <dd className="mt-1 font-semibold text-slate-800">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 max-w-[560px]">
        <CircuitDiagram question={question} />
      </div>
      <p className="mt-1 text-sm leading-6 text-slate-500">
        {isMultiAnswer
          ? `Select exactly ${maxSelectableAnswers} options, then submit.`
          : "Select an option to check your answer."}
      </p>

      <div className={question.optionDiagrams ? "mt-3 grid grid-cols-2 gap-3" : "mt-3 grid gap-2 md:grid-cols-2"}>
        {(question.options || []).map((option, index) => {
          const optionDiagram = question.optionDiagrams?.[index];
          const isSelected = isMultiAnswer
            ? selectedOptions.includes(option)
            : selectedOption === option;
          const isSelectionLimitReached =
            isMultiAnswer &&
            !isSelected &&
            selectedOptions.length >= maxSelectableAnswers;
          const showCorrect = hasAnswerKey && submitted && correctAnswers.includes(option);
          const showIncorrect =
            hasAnswerKey && submitted && isSelected && !correctAnswers.includes(option);

          return (
            <button
              key={`${index}-${option}`}
              type="button"
              onClick={() => handleOptionSelect(option)}
              className={`flex min-w-0 items-start rounded-lg border px-2 py-2.5 text-left text-sm transition sm:px-3 ${
                showCorrect
                  ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                  : showIncorrect
                ? "border-rose-300 bg-rose-50 text-rose-700"
                : isSelected
                ? "border-slatebrand-300 bg-slatebrand-50 text-slatebrand-900"
                : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slatebrand-300 hover:bg-white"
              } ${submitted ? "cursor-default" : isSelectionLimitReached ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
              disabled={submitted}
            >
              {isMultiAnswer ? (
                <span
                  aria-hidden="true"
                  className={`mr-2 mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[11px] font-extrabold ${
                    isSelected
                      ? "border-slatebrand-700 bg-slatebrand-700 text-white"
                      : "border-slate-300 bg-white text-transparent"
                  }`}
                >
                  ✓
                </span>
              ) : null}
              <span className="mr-2 font-semibold">{String.fromCharCode(65 + index)}.</span>
              {optionDiagram ? (
                <span className="flex min-w-0 flex-1 items-center justify-center">
                  <CircuitDiagram question={{ ...question, diagram: optionDiagram }} />
                </span>
              ) : (
                <InlineFormattedText text={option} />
              )}
            </button>
          );
        })}
      </div>

      {isMultiAnswer && !submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!selectedOptions.length}
          className="mt-3 rounded-lg border border-slatebrand-300 bg-white px-3 py-2 text-sm font-medium text-slatebrand-700 transition hover:bg-slatebrand-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit Answer
        </button>
      ) : null}

      {(question.tags || []).length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {(question.tags || []).map((tag) => (
            <span
              key={`${question._id}-${tag}`}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600"
            >
              {formatQuestionTag(tag)}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-3">
        {submitted && hasAnswerKey ? (
          <div
            className={`rounded-lg border p-3 ${
              isCorrect ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
            }`}
          >
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
                isCorrect ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {isCorrect ? "Correct answer" : "Wrong answer"}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-900">
              Your answer: {selectedAnswerText}
            </p>
            {!isCorrect ? (
              <p className="mt-2 text-sm font-medium text-slate-700">
                Correct answer: <InlineFormattedText text={correctAnswerText} />
              </p>
            ) : null}
          </div>
        ) : null}

        {submitted && !hasAnswerKey ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-800">
            Answer key pending for this uploaded paper question.
          </div>
        ) : null}

        {submitted && hasAnswerKey ? (
          <button
            type="button"
            onClick={() => setShowExplanation((value) => !value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slatebrand-300"
          >
            {showExplanation ? "Hide Explanation" : "Show Answer & Explanation"}
          </button>
        ) : null}

        {submitted && hasAnswerKey && showExplanation ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slatebrand-500">
              Explanation
            </p>
            <FormattedText text={question.explanation} className="mt-2 text-sm leading-6 text-slate-700" />
          </div>
        ) : null}
      </div>
    </article>
  );
}
