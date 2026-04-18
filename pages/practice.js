import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import CompactHeader from "../components/CompactHeader";
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
    <Layout title="ECEExamHub | Practice" hideNavbar pageClassName="pt-0">
      <CompactHeader />

      <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.95fr]">
          <div className="space-y-6">
            <section className="rounded-[1.75rem] border border-slate-800/80 bg-slate-950/95 p-5 shadow-panel">
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

          <aside className="space-y-6">
            <section className="rounded-[1.75rem] border border-slate-800/80 bg-slate-950/95 p-5 shadow-panel">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Practice Filters
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Keep the question visible while you filter.
                  </p>
                </div>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-300">
                  {filteredQuestions.length} items
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  Subject
                  <select
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
                  >
                    {SUBJECTS.map((item) => (
                      <option key={item} className="bg-slate-950 text-slate-100">
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-200">
                  Topic
                  <select
                    value={topic}
                    onChange={(event) => setTopic(event.target.value)}
                    className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-500"
                  >
                    {topics.map((item) => (
                      <option key={item} className="bg-slate-950 text-slate-100">
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/90 px-4 py-3 text-sm text-slate-400">
                  You can change the subject and topic without losing the current question flow.
                </div>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-slate-800/80 bg-slate-950/95 p-5 shadow-panel">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                Quick Stats
              </p>
              <div className="mt-5 grid gap-3">
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
