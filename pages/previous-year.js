import { useEffect, useState } from "react";
import Layout from "../components/layout";
import FilterPanel from "../components/FilterPanel";
import EmptyState from "../components/EmptyState";
import { EXAMS } from "../lib/question-utils";
import { fetchFilters, fetchQuestions } from "../lib/api-client";

export default function PreviousYearPage() {
  const [search, setSearch] = useState("");
  const [exam, setExam] = useState("All Exams");
  const [year, setYear] = useState("");
  const [questions, setQuestions] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadFilterMetadata() {
      try {
        const payload = await fetchFilters({ exam }, { signal: controller.signal });
        if (mounted) {
          setYears(Array.isArray(payload.years) ? payload.years : []);
        }
      } catch (error) {
        if (mounted && error.name !== "AbortError") {
          setYears([]);
        }
      }
    }

    loadFilterMetadata();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [exam]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      setLoading(true);
      setLoadError("");

      try {
        const data = await fetchQuestions(
          { search, exam, year },
          { signal: controller.signal }
        );
        if (mounted) {
          setQuestions(data);
        }
      } catch (error) {
        if (mounted && error.name !== "AbortError") {
          setQuestions([]);
          setLoadError(error.message || "Unable to load previous year questions.");
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
  }, [search, exam, year]);

  useEffect(() => {
    setYear("");
  }, [exam]);

  return (
    <Layout
      title="ECEExamHub | Previous Year Questions"
      searchValue={search}
      onSearchChange={setSearch}
    >
      <FilterPanel
        title="Previous Year Filters"
        controls={
          <>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Exam
              <select
                value={exam}
                onChange={(event) => setExam(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slatebrand-400"
              >
                {EXAMS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Year
              <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slatebrand-400"
              >
                <option value="">All Years</option>
                {years.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Filtered sets include full solution text so students can review logic after each question.
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              This layout scales naturally as more exam-year combinations are added.
            </div>
          </>
        }
      />

      <section className="mt-6">
        {loadError ? (
          <EmptyState
            title="Unable to load previous year questions"
            message={loadError}
          />
        ) : loading ? (
          <EmptyState
            title="Loading previous year questions"
            message="Fetching solved questions from your current data source."
          />
        ) : questions.length ? (
          <div className="grid gap-5">
            {questions.map((question) => (
              <article
                key={question._id}
                className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-panel"
              >
                <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
                      {(question.exam || []).join(" | ")}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">
                      {question.subject} - {question.topic}
                    </h2>
                  </div>
                  <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                    Year {question.year}
                  </div>
                </div>

                <p className="mt-5 text-base leading-8 text-slate-800">
                  {question.question}
                </p>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {(question.options || []).map((option, index) => (
                    <div
                      key={`${index}-${option}`}
                      className={`rounded-2xl border px-4 py-3 text-sm ${
                        option === question.correctAnswer
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span className="mr-2 font-semibold">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
                    Solution
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {question.explanation}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No previous year questions found"
            message="Adjust the exam, year, or search filter to bring relevant solved questions back into view."
          />
        )}
      </section>
    </Layout>
  );
}
