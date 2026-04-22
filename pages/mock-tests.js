import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout";
import PageBanner from "../components/PageBanner";
import seedQuestions from "../data/questions";
import { fetchQuestions } from "../lib/api-client";
import { hasQuestionTag } from "../lib/question-utils";
import { getReadyLearningTopics } from "../lib/learning-utils";

export default function MockTestsPage() {
  const [questions, setQuestions] = useState(seedQuestions);
  const readyTopics = getReadyLearningTopics();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      try {
        const data = await fetchQuestions({}, { signal: controller.signal });
        if (mounted && data.length) {
          setQuestions(data);
        }
      } catch {
        // Seed data keeps the page working offline.
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const importantQuestions = useMemo(
    () => questions.filter((question) => hasQuestionTag(question, "important")),
    [questions]
  );

  const mockTests = useMemo(() => {
    const repeated = questions.filter((question) => hasQuestionTag(question, "repeated"));

    return [
      {
        title: "Important Questions Mock",
        subtitle: "Solve the most important questions first",
        count: importantQuestions.length,
        href: "/practice?search=important",
      },
      {
        title: "Repeated Questions Mock",
        subtitle: "Practice the questions that appear again and again",
        count: repeated.length,
        href: "/previous-year?search=repeated",
      },
      {
        title: "Subject Focus Mock",
        subtitle: "Take a topic-wise test from your current weak areas",
        count: readyTopics.length,
        href: "/practice",
      },
    ];
  }, [importantQuestions.length, questions, readyTopics.length]);

  return (
    <Layout title="ECEExamHub | Mock Tests">
      <div className="mx-auto max-w-6xl">
        <PageBanner
          eyebrow="Mock Tests"
          title="Mock Test Sets"
          description="Jump into focused revision sets built from important and repeated questions."
          metrics={[
            { label: "Mock Sets", value: String(mockTests.length) },
            { label: "Important", value: String(importantQuestions.length) },
            { label: "Ready Topics", value: String(readyTopics.length) },
          ]}
        />

        <section className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {mockTests.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-lg p-3.5 text-white shadow-[0_18px_38px_rgba(23,67,176,0.16)] ${
                index === 0
                  ? "bg-[linear-gradient(135deg,#1b53d1_0%,#1743b0_100%)]"
                  : index === 1
                  ? "bg-[linear-gradient(135deg,#1f8b4b_0%,#176a39_100%)]"
                  : "bg-[linear-gradient(135deg,#3c4f7e_0%,#293861_100%)]"
              }`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">
                Mock Set
              </p>
              <h2 className="mt-1 text-[15px] font-semibold">{item.title}</h2>
              <p className="mt-1.5 text-sm leading-5 text-white/80">{item.subtitle}</p>
              <p className="mt-2.5 text-sm font-medium">{item.count} items ready</p>
              <Link
                href={item.href}
                className="mt-3 inline-flex rounded-lg border border-white/20 bg-white/15 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/20"
              >
                Start Mock
              </Link>
            </article>
          ))}
        </section>
      </div>
    </Layout>
  );
}
