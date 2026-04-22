import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import Layout from "../components/layout";
import PageBanner from "../components/PageBanner";
import PreviousYearQuestionCard from "../components/PreviousYearQuestionCard";
import seedQuestions from "../data/questions";
import { fetchQuestions } from "../lib/api-client";

export default function McqsPage() {
  const [questions, setQuestions] = useState(seedQuestions);
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
        if (mounted && data.length) {
          setQuestions(data);
        }
      } catch (error) {
        if (mounted && error.name !== "AbortError") {
          setLoadError(error.message || "Unable to load MCQ questions.");
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

  return (
    <Layout title="ECEExamHub | MCQs">
      <div className="mx-auto max-w-6xl">
        <PageBanner
          eyebrow="MCQs"
          title="MCQ Practice Bank"
          description="Solve questions with options, instant answers, explanations, and exam tags."
          metrics={[
            { label: "Questions", value: loading ? "..." : String(questions.length) },
            { label: "Mode", value: "MCQ List" },
            { label: "View", value: "Separate" },
          ]}
        />

        <section className="mt-6">
          {loadError ? (
            <EmptyState title="Unable to load MCQs" message={loadError} />
          ) : loading ? (
            <EmptyState title="Loading MCQs" message="Fetching the full question list." />
          ) : (
            <div className="grid gap-4">
              {questions.map((question) => (
                <PreviousYearQuestionCard key={question._id} question={question} />
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
