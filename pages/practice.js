import { useEffect, useState } from "react";
import Layout from "../components/layout";
import FilterPanel from "../components/FilterPanel";
import QuestionCard from "../components/QuestionCard";
import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";
import { SUBJECTS, getTopics, filterQuestions } from "../lib/question-utils";
import { fetchQuestions } from "../lib/api-client";

export default function PracticePage() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [topic, setTopic] = useState("All Topics");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const topics = getTopics(questions, subject);
  const filteredQuestions = filterQuestions(questions, { search, subject, topic });
  const activeQuestion = filteredQuestions[currentIndex] || null;

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
          setLoadError(error.message || "Unable to load questions.");
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

  useEffect(() => {
    setTopic("All Topics");
    setCurrentIndex(0);
  }, [subject]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [search, topic]);

  return (
    <Layout
      title="ECEExamHub | Practice"
      searchValue={search}
      onSearchChange={setSearch}
    >
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Filtered Questions"
          value={loading ? "..." : filteredQuestions.length}
          tone="dark"
        />
        <StatCard
          label="Active Subject"
          value={subject === "All Subjects" ? "All" : subject}
          tone="light"
        />
        <StatCard
          label="Current Topic"
          value={topic === "All Topics" ? "Mixed" : topic}
          tone="accent"
        />
      </section>

      <section className="mt-6">
        <FilterPanel
          title="Practice Filters"
          controls={
            <>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Subject
                <select
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slatebrand-400"
                >
                  {SUBJECTS.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Topic
                <select
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slatebrand-400"
                >
                  {topics.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                One question is shown at a time. Submit your answer to reveal the explanation.
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Previous and Next buttons keep the flow smooth on both desktop and mobile.
              </div>
            </>
          }
        />
      </section>

      <section className="mt-6">
        {loadError ? (
          <EmptyState
            title="Unable to load questions"
            message={loadError}
          />
        ) : loading ? (
          <EmptyState
            title="Loading questions"
            message="Fetching the latest question set from your API."
          />
        ) : activeQuestion ? (
          <QuestionCard
            key={`${activeQuestion._id}-${currentIndex}`}
            question={activeQuestion}
            index={currentIndex}
            total={filteredQuestions.length}
            onNext={() =>
              setCurrentIndex((value) => Math.min(value + 1, filteredQuestions.length - 1))
            }
            onPrevious={() => setCurrentIndex((value) => Math.max(value - 1, 0))}
          />
        ) : (
          <EmptyState
            title="No questions match the selected filters"
            message="Try changing the subject, topic, or search term to load a different MCQ set."
          />
        )}
      </section>
    </Layout>
  );
}
