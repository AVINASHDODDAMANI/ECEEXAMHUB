import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import PageBanner from "../components/PageBanner";
import QuestionCard from "../components/QuestionCard";
import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";
import { SUBJECTS, getTopics, filterQuestions } from "../lib/question-utils";
import { fetchQuestions } from "../lib/api-client";

export default function PracticePage() {
  const router = useRouter();
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

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const routeSearch =
      typeof router.query.search === "string" ? router.query.search : "";
    setSearch(routeSearch);
  }, [router.isReady, router.query.search]);

  return (
    <Layout title="ECEExamHub | Practice">
      <div className="mx-auto max-w-6xl">
        <PageBanner
          eyebrow="MCQ Practice"
          title="Practice questions in a smaller, cleaner workspace"
          description="Filter by subject and topic, then solve one question at a time without oversized panels."
          metrics={[
            { label: "Visible", value: loading ? "..." : String(filteredQuestions.length) },
            { label: "Subject", value: subject === "All Subjects" ? "All" : subject },
            { label: "Topic", value: topic === "All Topics" ? "Mixed" : topic },
          ]}
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_0.9fr]">
          <div>
            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              {loadError ? (
                <EmptyState title="Unable to load questions" message={loadError} />
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
          </div>

          <aside className="space-y-4">
            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slatebrand-500">
                    Practice Filters
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Keep the question visible while you filter.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {filteredQuestions.length} items
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Subject
                  <select
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-slatebrand-400"
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
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-slatebrand-400"
                  >
                    {topics.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                  Change filters without losing the current study flow.
                </div>
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slatebrand-500">
                Quick Stats
              </p>
              <div className="mt-4 grid gap-3">
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
              </div>
            </section>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
