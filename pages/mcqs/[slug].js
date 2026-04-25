import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import EmptyState from "../../components/EmptyState";
import Layout from "../../components/layout";
import PreviousYearQuestionCard from "../../components/PreviousYearQuestionCard";
import { subjectDirectory } from "../../data/subject-directory";
import seedQuestions from "../../data/questions";
import { getSubjectSlug } from "../../data/subject-theory-roadmaps";
import { fetchQuestions } from "../../lib/api-client";

const questionSubjectMap = {
  "Network Analysis": "Networks",
  "Analog Electronics": "Analog",
  "Digital Electronics": "Digital",
  "Signals and Systems": "Signals",
  "Control Systems": "Control Systems",
};

function getQuestionSubject(subject) {
  return questionSubjectMap[subject.title] || subject.title;
}

function McqSkeletonList() {
  return (
    <div className="grid gap-4">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-lg border border-portal-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="h-3 w-32 rounded bg-slate-200" />
            <div className="h-6 w-20 rounded bg-slate-200" />
          </div>
          <div className="mt-4 h-4 w-11/12 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-8/12 rounded bg-slate-200" />
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {[0, 1, 2, 3].map((option) => (
              <div key={option} className="h-10 rounded-lg bg-slate-100" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function McqTopicPage({ subject }) {
  const questionSubject = getQuestionSubject(subject);
  const initialQuestions = useMemo(
    () => seedQuestions.filter((question) => question.subject === questionSubject),
    [questionSubject]
  );
  const [questions, setQuestions] = useState(initialQuestions);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      setLoading(true);
      setLoadError("");

      try {
        const data = await fetchQuestions(
          { subject: questionSubject },
          { signal: controller.signal }
        );
        if (mounted) {
          setQuestions(data.length ? data : initialQuestions);
        }
      } catch (error) {
        if (mounted && error.name !== "AbortError") {
          setLoadError(error.message || "Unable to load MCQs.");
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
  }, [initialQuestions, questionSubject]);

  return (
    <Layout title={`ECEExamHub | ${subject.title} MCQs`}>
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <Link href="/mcqs" className="font-medium text-portal-600 transition hover:text-portal-700">
            MCQs
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">{subject.title}</span>
        </div>

        <section className="rounded-xl border border-portal-200 bg-white p-5 shadow-portal sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
            MCQ practice
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {subject.title}
            </h1>
            <span className="rounded-lg border border-portal-200 bg-portal-50 px-3 py-2 text-sm font-bold text-portal-700">
              {loading ? "Loading..." : `${questions.length} questions`}
            </span>
          </div>
        </section>

        <section className="mt-5">
          {loadError ? (
            <EmptyState title="Unable to load MCQs" message={loadError} />
          ) : loading ? (
            <McqSkeletonList />
          ) : questions.length ? (
            <div className="grid gap-4">
              {questions.map((question) => (
                <PreviousYearQuestionCard
                  key={question._id}
                  question={question}
                  showTopicMeta={false}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No MCQs available"
              message="Questions for this topic have not been added yet."
            />
          )}
        </section>
      </div>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: subjectDirectory.map((subject) => ({
      params: { slug: getSubjectSlug(subject.title) },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const subject = subjectDirectory.find(
    (item) => getSubjectSlug(item.title) === params.slug
  );

  return {
    props: {
      subject,
    },
  };
}
