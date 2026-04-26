import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CircuitDiagram from "../../components/CircuitDiagram";
import EmptyState from "../../components/EmptyState";
import Layout from "../../components/layout";
import { getPracticeSlug, practiceSections } from "../../data/practice-sections";
import seedQuestions from "../../data/questions";
import { fetchQuestions } from "../../lib/api-client";

function buildTenQuestionSet(examQuestions, allQuestions) {
  const selected = [];
  const usedIds = new Set();

  [...examQuestions, ...allQuestions].forEach((question) => {
    if (selected.length >= 10 || usedIds.has(question._id)) {
      return;
    }

    selected.push(question);
    usedIds.add(question._id);
  });

  return selected;
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
  const initialQuestions = useMemo(
    () =>
      buildTenQuestionSet(
        seedQuestions.filter((question) => (question.exam || []).includes(section.exam)),
        seedQuestions
      ),
    [section.exam]
  );
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const practiceQuestions = buildTenQuestionSet(questions, seedQuestions);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      setLoading(true);
      setLoadError("");

      try {
        const data = await fetchQuestions(
          { exam: section.exam },
          { signal: controller.signal }
        );

        if (mounted) {
          const nextQuestions = data.length
            ? buildTenQuestionSet(data, seedQuestions)
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
  }, [initialQuestions, section.exam]);

  function handleAnswer(questionId, option) {
    setSelectedAnswers((current) => {
      if (current[questionId]) {
        return current;
      }

      return { ...current, [questionId]: option };
    });
  }

  return (
    <Layout title={`ECEExamHub | ${section.label}`}>
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <Link href="/practice" className="font-medium text-portal-600 transition hover:text-portal-700">
            Practice
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">{section.label}</span>
        </div>

        <section className="rounded-xl border border-portal-200 bg-white p-5 shadow-portal sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
            {section.title}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {section.label}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Mixed MCQ questions from all available subjects.
              </p>
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

  return (
    <article className="scroll-mt-28 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-600">
            Question {index + 1} of {total}
          </p>
          <h2 className="mt-1 text-sm font-bold leading-6 text-slate-950 sm:text-base">
            {question.question}
          </h2>
        </div>
        <span className="w-fit rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
          {question.subject}
        </span>
      </div>

      <div className="mt-3 max-w-[560px]">
        <CircuitDiagram question={question} />
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {(question.options || []).map((option, optionIndex) => {
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
                <span>{option}</span>
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
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {question.explanation}
            </p>
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
