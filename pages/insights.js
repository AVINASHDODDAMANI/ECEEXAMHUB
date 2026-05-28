import { useEffect, useState } from "react";
import Layout from "../components/layout";
import InsightChart from "../components/InsightChart";
import FilterPanel from "../components/FilterPanel";
import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";
import { EXAMS, filterQuestions, getInsightData } from "../lib/question-utils";
import { fetchQuestions } from "../lib/api-client";

export default function InsightsPage() {
  const [search, setSearch] = useState("");
  const [exam, setExam] = useState("All Exams");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      setLoading(true);
      setLoadError("");

      try {
        const data = await fetchQuestions({}, { signal: controller.signal });
        if (mounted) {
          setQuestions(data);
        }
      } catch (error) {
        if (mounted && error.name !== "AbortError") {
          setQuestions([]);
          setLoadError(error.message || "Unable to load insight data.");
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
  }, []);

  const filteredQuestions = filterQuestions(questions, { search, exam });
  const insightData = getInsightData(filteredQuestions);

  return (
    <Layout
      title="ECE Exam Guide | Insights"
      searchValue={search}
      onSearchChange={setSearch}
    >
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Visible Questions" value={loading ? "..." : filteredQuestions.length} tone="dark" />
        <StatCard label="Notes Covered" value={loading ? "..." : insightData.length} tone="light" />
        <StatCard
          label="Selected Exam"
          value={exam === "All Exams" ? "Mixed" : exam}
          tone="accent"
        />
      </section>

      <section className="mt-6">
        <FilterPanel
          title="Insight Filters"
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

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Bar widths reflect how often subjects appear in the current question pool.
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Use this page to decide which topics deserve extra revision time before the exam.
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                The chart is data-driven, so new questions automatically update the weightage view.
              </div>
            </>
          }
        />
      </section>

      <section className="mt-6">
        {loadError ? (
          <EmptyState title="Unable to load insights" message={loadError} />
        ) : loading ? (
          <EmptyState
            title="Loading insights"
            message="Pulling the latest question set for subject coverage analysis."
          />
        ) : (
          <InsightChart data={insightData} />
        )}
      </section>
    </Layout>
  );
}
