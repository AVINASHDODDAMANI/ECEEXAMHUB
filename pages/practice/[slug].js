import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import CircuitDiagram from "../../components/CircuitDiagram";
import EmptyState from "../../components/EmptyState";
import FormattedText, { InlineFormattedText } from "../../components/FormattedText";
import QuestionStem from "../../components/QuestionStem";
import Layout from "../../components/layout";
import { getOfficialPaper } from "../../data/official-previous-papers";
import { getPracticeSlug, practiceSections } from "../../data/practice-sections";
import seedQuestions from "../../data/questions";
import { fetchQuestions } from "../../lib/api-client";
import { getUniqueQuestions, hasQuestionTag } from "../../lib/question-utils";

const belPracticePaper = getOfficialPaper({
  slug: "bel-may-2025",
  exam: "BEL",
  year: 2025,
  month: "May",
});

function isBelMay2025Question(question) {
  return (
    question.year === 2025 &&
    (question.exam || []).includes("BEL") &&
    (question.month === "May" || String(question._id || "").startsWith("bel-may-2025-"))
  );
}

function buildPracticeQuestions(section, sourceQuestions, options = {}) {
  const limit = Math.max(1, Math.min(65, Number(options.limit) || 10));
  const uniqueSource = getUniqueQuestions(sourceQuestions);
  const filterBySet = (items) => {
    if (options.set === "important" || options.set === "repeated") {
      return items.filter((question) => hasQuestionTag(question, options.set));
    }
    return items;
  };

  if (options.scope === "all") return filterBySet(uniqueSource).slice(0, limit);

  if (section.exam === "BEL") {
    const paperQuestions = uniqueSource.filter(isBelMay2025Question);

    return paperQuestions.length
      ? filterBySet(paperQuestions).slice(0, limit)
      : filterBySet(getUniqueQuestions(seedQuestions).filter((question) =>
          (question.exam || []).includes(section.exam)
        )).slice(0, limit);
  }

  return filterBySet(uniqueSource.filter((question) =>
    (question.exam || []).includes(section.exam)
  )).slice(0, limit);
}

function PracticeSkeleton() {
  return (
    <div className="grid gap-4">
      {[0, 1, 2].map((card) => (
        <div
          key={card}
          className="animate-pulse rounded-xl border border-portal-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="h-3 w-40 rounded bg-slate-200" />
            <div className="h-6 w-20 rounded bg-slate-200" />
          </div>
          <div className="mt-4 h-4 w-11/12 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-8/12 rounded bg-slate-200" />
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="h-11 rounded-lg bg-slate-100" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PracticeExamPage({ section }) {
  const router = useRouter();
  const setOptions = useMemo(() => ({
    set: String(router.query.set || "full"),
    scope: String(router.query.scope || "exam"),
    limit: String(router.query.limit || "10"),
  }), [router.query.limit, router.query.scope, router.query.set]);
  const initialQuestions = useMemo(
    () => buildPracticeQuestions(section, seedQuestions, setOptions),
    [section.exam, setOptions]
  );
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const isBelPractice = section.exam === "BEL";
  const isMockMode = router.query.mode === "mock";
  const practicePaper = isBelPractice ? belPracticePaper : null;
  const practiceQuestions = useMemo(
    () => buildPracticeQuestions(section, questions, setOptions),
    [questions, section, setOptions]
  );
  const pageLabel = isMockMode ? `${section.exam} Mock Test` : section.label;
  const heroDescription = isBelPractice
    ? isMockMode
      ? "Attempt a focused BEL May 2025-style mock with the same previous-paper context and solved objective format."
      : "Practice a focused BEL May 2025-style set with the same previous-paper context and solved objective format."
    : isMockMode
      ? "Attempt a timed mock-style question set from the available exam practice bank."
    : "Mixed MCQ questions from all available subjects.";

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      setLoading(true);
      setLoadError("");

      try {
        const data = await fetchQuestions(
          isBelPractice
            ? { exam: section.exam, year: String(practicePaper?.year || 2025) }
            : setOptions.scope === "all"
              ? {}
              : { exam: section.exam },
          { signal: controller.signal }
        );

        if (mounted) {
          const nextQuestions = data.length
            ? buildPracticeQuestions(section, data, setOptions)
            : initialQuestions;
          setQuestions(nextQuestions);
          setSelectedAnswers({});
        }
      } catch (error) {
        if (mounted && error.name !== "AbortError") {
          setLoadError(error.message || "Unable to load practice questions.");
          setQuestions(initialQuestions);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [initialQuestions, isBelPractice, practicePaper?.year, section, setOptions]);

  function handleAnswer(questionId, option) {
    setSelectedAnswers((current) => {
      if (current[questionId]) {
        return current;
      }

      return { ...current, [questionId]: option };
    });
  }

  return (
    <Layout title={`ECE Exam Guide | ${pageLabel}`}>
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">
            {isBelPractice && !isMockMode ? ">" : "/"}
          </span>
          {isMockMode ? (
            <>
              <Link
                href="/mock-tests"
                className="font-medium text-portal-600 transition hover:text-portal-700"
              >
                Mock Tests
              </Link>
              <span className="text-slate-300" aria-hidden="true">/</span>
              <span className="font-medium text-slate-700">{pageLabel}</span>
            </>
          ) : isBelPractice ? (
            <>
              <Link
                href="/previous-year"
                className="font-medium text-portal-600 transition hover:text-portal-700"
              >
                Previous Papers
              </Link>
              <span className="text-slate-300" aria-hidden="true">&gt;</span>
              <Link
                href="/solution/bel-may-2025"
                className="font-medium text-portal-600 transition hover:text-portal-700"
              >
                BEL May 2025
              </Link>
              <span className="text-slate-300" aria-hidden="true">/</span>
              <span className="font-medium text-slate-700">{pageLabel}</span>
            </>
          ) : (
            <>
              <Link href="/practice" className="font-medium text-portal-600 transition hover:text-portal-700">
                Practice
              </Link>
              <span className="text-slate-300" aria-hidden="true">/</span>
              <span className="font-medium text-slate-700">{pageLabel}</span>
            </>
          )}
        </div>

        <section className="rounded-xl border border-portal-200 bg-white p-5 shadow-portal sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
            {isMockMode
              ? "Mock Test Session"
              : isBelPractice
                ? "BEL May 2025 Reference Practice"
                : section.title}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {pageLabel}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                {heroDescription}
              </p>
              {isMockMode ? (
                <p className="mt-3 text-xs font-bold text-emerald-700">
                  Unique-question set: duplicate question stems are automatically removed.
                </p>
              ) : null}
              {isBelPractice ? (
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    {practicePaper?.title || "BEL Probationary Engineer (ECE) Paper - May 2025"}
                  </span>
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    {practicePaper?.paperType || "Objective"}
                  </span>
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    {practiceQuestions.length}-question practice structure
                  </span>
                </div>
              ) : null}
            </div>
            <span className="rounded-lg border border-portal-200 bg-portal-50 px-3 py-2 text-sm font-bold text-portal-700">
              {loading ? "Loading..." : `${practiceQuestions.length} questions`}
            </span>
          </div>
        </section>

        <section className="mt-5 rounded-xl border border-portal-200 bg-white shadow-portal">
          {loadError ? (
            <div className="p-4">
              <EmptyState title="Unable to load practice" message={loadError} />
            </div>
          ) : loading ? (
            <div className="p-4">
              <PracticeSkeleton />
            </div>
          ) : practiceQuestions.length ? (
            <div className="divide-y divide-portal-100">
              {practiceQuestions.map((question, index) => (
                <PracticeQuestionBlock
                  key={question._id}
                  question={question}
                  index={index}
                  total={practiceQuestions.length}
                  selectedAnswer={selectedAnswers[question._id] || ""}
                  onSelect={handleAnswer}
                />
              ))}
            </div>
          ) : (
            <div className="p-4">
              <EmptyState
                title="No questions available"
                message="Practice questions for this exam have not been added yet."
              />
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

function PracticeQuestionBlock({
  question,
  index,
  total,
  selectedAnswer,
  onSelect,
}) {
  const hasAnswered = Boolean(selectedAnswer);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (!hasAnswered) {
      setShowExplanation(false);
    }
  }, [hasAnswered, question._id]);

  return (
    <article className="scroll-mt-28 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-600">
            Question {index + 1} of {total}
          </p>
          <QuestionStem
            question={question}
            className="mt-1 text-sm font-bold leading-6 text-slate-950 sm:text-base"
          />
        </div>
        <span className="w-fit rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
          {question.subject}
        </span>
      </div>

      {question.diagram ? (
        <div className="mt-4 flex w-full justify-center overflow-x-auto rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
          <div className="w-full min-w-[300px] max-w-[820px]">
            <CircuitDiagram question={question} />
          </div>
        </div>
      ) : null}

      <div className={question.optionDiagrams ? "mt-4 grid gap-3 md:grid-cols-2" : "mt-3 grid gap-2 sm:grid-cols-2"}>
        {(question.options || []).map((option, optionIndex) => {
          const optionDiagram = question.optionDiagrams?.[optionIndex];
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;
          const showCorrect = hasAnswered && isCorrect;
          const showWrong = hasAnswered && isSelected && !isCorrect;

          return (
            <button
              key={`${question._id}-${optionIndex}`}
              type="button"
              onClick={() => onSelect(question._id, option)}
              disabled={hasAnswered}
              className={`min-h-12 w-full rounded-lg border px-3 py-2.5 text-left text-sm font-semibold leading-6 transition ${
                showCorrect
                  ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                  : showWrong
                  ? "border-rose-300 bg-rose-50 text-rose-700"
                  : "border-slate-300 bg-slate-50 text-slate-800 hover:border-portal-300 hover:bg-white"
              } ${hasAnswered ? "cursor-default" : "cursor-pointer"}`}
            >
              <span className="flex items-start gap-2">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-md border border-slate-200 bg-white text-xs font-bold text-slate-700">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                {optionDiagram ? (
                  <span className="flex min-w-0 flex-1 items-center justify-center">
                    <CircuitDiagram question={{ ...question, diagram: optionDiagram }} />
                  </span>
                ) : (
                  <InlineFormattedText text={option} />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {hasAnswered ? (
        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p
            className={`text-xs font-bold uppercase tracking-[0.14em] ${
              selectedAnswer === question.correctAnswer ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {selectedAnswer === question.correctAnswer ? "Correct" : "Incorrect"}
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            Answer: {question.correctAnswer}
          </p>
          {question.explanation ? (
            <>
              <button
                type="button"
                onClick={() => setShowExplanation((current) => !current)}
                className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
              >
                {showExplanation ? "Hide Explanation" : "Show Explanation"}
              </button>
              {showExplanation ? (
                <FormattedText text={question.explanation} className="mt-3 text-sm leading-6 text-slate-700" />
              ) : null}
            </>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export function getStaticPaths() {
  return {
    paths: practiceSections.map((section) => ({
      params: { slug: getPracticeSlug(section.exam) },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const section = practiceSections.find(
    (item) => getPracticeSlug(item.exam) === params.slug
  );

  return {
    props: {
      section,
    },
  };
}
