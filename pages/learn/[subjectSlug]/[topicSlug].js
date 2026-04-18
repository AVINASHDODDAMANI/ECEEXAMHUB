import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import EmptyState from "../../../components/EmptyState";
import Layout from "../../../components/layout";
import PreviousYearQuestionCard from "../../../components/PreviousYearQuestionCard";
import QuestionCard from "../../../components/QuestionCard";
import TopicAssistantPanel from "../../../components/TopicAssistantPanel";
import TopicSectionCard from "../../../components/TopicSectionCard";
import seedQuestions from "../../../data/questions";
import { fetchQuestions } from "../../../lib/api-client";
import {
  buildTopicKey,
  getLearningTopic,
  getReadyLearningTopics,
  getRelatedLearningTopics,
  getTopicQuestionFilters,
  getTopicQuestionSummary,
  getTopicQuestions,
} from "../../../lib/learning-utils";
import { hasQuestionTag } from "../../../lib/question-utils";
import { useLearningProgress } from "../../../lib/use-learning-progress";

const defaultSectionState = {
  explanation: true,
  pyqs: true,
  practice: true,
  important: true,
};

export default function LearningTopicPage({ topic, initialQuestions }) {
  const router = useRouter();
  const [questions, setQuestions] = useState(initialQuestions);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questionError, setQuestionError] = useState("");
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [sectionState, setSectionState] = useState(defaultSectionState);
  const {
    progressMap,
    revisionMap,
    progressStats,
    setTopicCompleted,
    setTopicSavedForRevision,
  } = useLearningProgress();

  const topicKey = buildTopicKey(topic.subjectSlug, topic.slug);
  const isCompleted = Boolean(progressMap[topicKey]);
  const isSavedForRevision = Boolean(revisionMap[topicKey]);
  const subjectProgress = progressStats.subjects.find(
    (subject) => subject.slug === topic.subjectSlug
  );
  const relatedTopics = useMemo(
    () => getRelatedLearningTopics(topic.relatedTopics || []),
    [topic.relatedTopics]
  );
  const topicQuestions = useMemo(
    () => getTopicQuestions(questions, topic.subjectSlug, topic.slug),
    [questions, topic.slug, topic.subjectSlug]
  );
  const questionSummary = useMemo(
    () => getTopicQuestionSummary(topicQuestions),
    [topicQuestions]
  );
  const importantQuestions = useMemo(
    () => topicQuestions.filter((question) => hasQuestionTag(question, "important")),
    [topicQuestions]
  );
  const activePracticeQuestion = topicQuestions[practiceIndex] || null;
  const sectionLinks = [
    { id: "explanation", label: "Explanation" },
    { id: "pyqs", label: "PYQs" },
    { id: "practice", label: "Practice" },
    { id: "important", label: "Important" },
  ];

  useEffect(() => {
    setPracticeIndex(0);
  }, [topicQuestions.length]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      setLoadingQuestions(true);
      setQuestionError("");

      try {
        const topicFilters = getTopicQuestionFilters(topic.subjectSlug, topic.slug);
        const latestQuestions = await fetchQuestions(topicFilters, {
          signal: controller.signal,
        });

        if (mounted) {
          setQuestions(latestQuestions);
        }
      } catch (error) {
        if (mounted && error.name !== "AbortError") {
          setQuestionError(error.message || "Unable to refresh topic questions.");
        }
      } finally {
        if (mounted) {
          setLoadingQuestions(false);
        }
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [topic.slug, topic.subjectSlug]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const hash = router.asPath.split("#")[1];

    if (!hash || !(hash in defaultSectionState)) {
      return;
    }

    setSectionState((currentValue) => ({
      ...currentValue,
      [hash]: true,
    }));

    window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }, [router.asPath, router.isReady]);

  function toggleSection(sectionId) {
    setSectionState((currentValue) => ({
      ...currentValue,
      [sectionId]: !currentValue[sectionId],
    }));
  }

  function jumpToSection(sectionId) {
    setSectionState((currentValue) => ({
      ...currentValue,
      [sectionId]: true,
    }));

    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }

  function toggleCompletedState() {
    setTopicCompleted(topic.subjectSlug, topic.slug, !isCompleted);
  }

  function toggleRevisionState() {
    setTopicSavedForRevision(topic.subjectSlug, topic.slug, !isSavedForRevision);
  }

  return (
    <Layout
      title={`ECEExamHub | ${topic.title}`}
      description={`${topic.title} learning page with explanations, formulas, PYQs, practice, and important questions for ${topic.subjectName}.`}
    >
      <div className="pb-24 xl:pb-0">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-6">
            <div className="rounded-[2rem] bg-slatebrand-900 p-8 text-white shadow-panel">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slatebrand-300">
                <Link href="/learn" className="transition hover:text-white">
                  Learn
                </Link>
                <span>/</span>
                <span>{topic.subjectName}</span>
                <span>/</span>
                <span>{topic.chapterTitle}</span>
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
                {topic.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slatebrand-100">
                {topic.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-slatebrand-700 bg-slatebrand-800/70 px-4 py-2 text-sm font-medium text-white">
                  {topic.subjectName}
                </span>
                <span className="rounded-full border border-slatebrand-700 bg-slatebrand-800/70 px-4 py-2 text-sm font-medium text-white">
                  {topic.subjectWeightage}
                </span>
                <span className="rounded-full border border-slatebrand-700 bg-slatebrand-800/70 px-4 py-2 text-sm font-medium text-white">
                  {topic.estimatedTime}
                </span>
                <span className="rounded-full border border-slatebrand-700 bg-slatebrand-800/70 px-4 py-2 text-sm font-medium text-white">
                  {questionSummary.total} linked question{questionSummary.total === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={toggleCompletedState}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                    isCompleted
                      ? "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
                      : "bg-accent-500 text-slate-950 hover:bg-accent-300"
                  }`}
                >
                  {isCompleted ? "Completed" : "Mark as Completed"}
                </button>
                <button
                  type="button"
                  onClick={toggleRevisionState}
                  className={`rounded-2xl border px-5 py-3 text-sm font-semibold transition ${
                    isSavedForRevision
                      ? "border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100"
                      : "border-slatebrand-700 text-white hover:bg-slatebrand-800"
                  }`}
                >
                  {isSavedForRevision ? "Saved for Revision" : "Save for Revision"}
                </button>
                <button
                  type="button"
                  onClick={() => jumpToSection("practice")}
                  className="rounded-2xl border border-slatebrand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slatebrand-800"
                >
                  Jump to Practice
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-panel">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Subject progress
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {subjectProgress?.completionPercent || 0}%
                </p>
                <div className="mt-4 h-2.5 rounded-full bg-slate-100">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-slatebrand-600 to-accent-500"
                    style={{ width: `${subjectProgress?.completionPercent || 0}%` }}
                  />
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-panel">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Exams covered
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {questionSummary.exams.length ? questionSummary.exams.join(" | ") : "Adding soon"}
                </p>
                <p className="mt-4 text-sm text-slate-600">
                  Years: {questionSummary.years.length ? questionSummary.years.join(", ") : "Pending"}
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-panel">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Important questions
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {questionSummary.importantCount}
                </p>
                <p className="mt-4 text-sm text-slate-600">
                  Priority revision signals for this topic.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-panel">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Exam insight
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{topic.insightSummary}</p>
              </div>
            </div>
          </div>

          <TopicAssistantPanel
            topic={topic}
            isCompleted={isCompleted}
            isSavedForRevision={isSavedForRevision}
            questionCount={questionSummary.total}
            importantCount={questionSummary.importantCount}
            subjectProgressPercent={subjectProgress?.completionPercent || 0}
            onJump={jumpToSection}
            onToggleCompleted={toggleCompletedState}
            onToggleRevision={toggleRevisionState}
          />
        </section>

        <section className="mt-6 flex flex-wrap gap-3">
          {sectionLinks.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => jumpToSection(section.id)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slatebrand-300 hover:text-slatebrand-900"
            >
              {section.label}
            </button>
          ))}
        </section>

        <section className="mt-8 grid gap-6">
          <TopicSectionCard
            id="explanation"
            eyebrow="Explanation"
            title="Understand the topic first"
            description="Read the explanation, key concepts, formulas, and worked examples before opening the question sections."
            open={sectionState.explanation}
            onToggle={() => toggleSection("explanation")}
            actions={
              <span className="rounded-full bg-slatebrand-100 px-4 py-2 text-sm font-semibold text-slatebrand-700">
                Beginner-first notes
              </span>
            }
          >
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
                  Concept Notes
                </p>
                <div className="mt-5 space-y-4">
                  {topic.overview.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-8 text-slate-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>

              <div className="grid gap-6">
                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
                    Learning Goals
                  </p>
                  <div className="mt-4 grid gap-3">
                    {topic.learningGoals.map((goal) => (
                      <div key={goal} className="rounded-2xl bg-white px-4 py-4">
                        <p className="text-sm leading-7 text-slate-700">{goal}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
                    Key Concepts
                  </p>
                  <div className="mt-4 grid gap-3">
                    {topic.keyConcepts.map((concept) => (
                      <div key={concept} className="rounded-2xl bg-white px-4 py-4">
                        <p className="text-sm leading-7 text-slate-700">{concept}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
                  Key Formulas
                </p>
                <div className="mt-5 grid gap-4">
                  {topic.formulas.map((formula) => (
                    <div key={formula.label} className="rounded-2xl bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
                        {formula.label}
                      </p>
                      <p className="mt-3 text-lg font-semibold text-slate-900">
                        {formula.expression}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{formula.note}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
                  Example Problems
                </p>
                <div className="mt-5 grid gap-4">
                  {topic.examples.map((example) => (
                    <div key={example.title} className="rounded-2xl bg-white p-4">
                      <h3 className="text-lg font-semibold text-slate-900">{example.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-700">{example.prompt}</p>
                      <div className="mt-4 space-y-2">
                        {example.steps.map((step, index) => (
                          <p key={step} className="text-sm leading-7 text-slate-600">
                            {index + 1}. {step}
                          </p>
                        ))}
                      </div>
                      <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slatebrand-500">
                          Answer
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-700">{example.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </TopicSectionCard>

          <TopicSectionCard
            id="pyqs"
            eyebrow="Previous Year Questions"
            title="See how exams ask this topic"
            description="Review topic-linked PYQs in one place so you can understand exam style before attempting more practice."
            open={sectionState.pyqs}
            onToggle={() => toggleSection("pyqs")}
            actions={
              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
                {questionSummary.total} PYQ-linked items
              </span>
            }
          >
            <div className="grid gap-5">
              {topicQuestions.length ? (
                topicQuestions.map((question) => (
                  <PreviousYearQuestionCard
                    key={question._id}
                    question={question}
                    showTopicMeta={false}
                  />
                ))
              ) : (
                <EmptyState
                  title="No solved PYQs are linked yet"
                  message="The explanation layer is ready. Add topic-matched questions and this section will populate automatically."
                />
              )}
            </div>
          </TopicSectionCard>

          <TopicSectionCard
            id="practice"
            eyebrow="Practice Questions"
            title="Try the topic yourself"
            description="Solve one question at a time. As soon as you click an option, the right answer turns green and a wrong pick turns red."
            open={sectionState.practice}
            onToggle={() => toggleSection("practice")}
            actions={
              <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                {loadingQuestions ? "Refreshing set..." : `${questionSummary.total} available`}
              </span>
            }
          >
            {questionError ? (
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                {questionError}
              </div>
            ) : null}

            <div className="mt-1">
              {activePracticeQuestion ? (
                <QuestionCard
                  key={`${activePracticeQuestion._id}-${practiceIndex}`}
                  question={activePracticeQuestion}
                  index={practiceIndex}
                  total={topicQuestions.length}
                  onNext={() =>
                    setPracticeIndex((value) => Math.min(value + 1, topicQuestions.length - 1))
                  }
                  onPrevious={() => setPracticeIndex((value) => Math.max(value - 1, 0))}
                />
              ) : (
                <EmptyState
                  title="Practice questions are still being added"
                  message="This topic already has the learning structure. Add or sync more questions and they will appear here automatically."
                />
              )}
            </div>
          </TopicSectionCard>

          <TopicSectionCard
            id="important"
            eyebrow="Important Questions"
            title="Revise the highest-priority questions"
            description="Use this short set when you want a faster revision loop before moving back to full PYQs or practice."
            open={sectionState.important}
            onToggle={() => toggleSection("important")}
            actions={
              <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                {importantQuestions.length} important item{importantQuestions.length === 1 ? "" : "s"}
              </span>
            }
          >
            {importantQuestions.length ? (
              <div className="grid gap-4">
                {importantQuestions.map((question) => (
                  <div
                    key={`important-${question._id}`}
                    className="rounded-3xl border border-amber-200 bg-amber-50 p-5"
                  >
                    <p className="text-sm font-semibold text-amber-800">
                      {(question.exam || []).join(" | ")} | {question.year}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{question.question}</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                      Review signal: important topic checkpoint
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Important-topic tagging is ready"
                message="As soon as more tagged questions are added, this revision list will update automatically."
              />
            )}
          </TopicSectionCard>
        </section>

        {relatedTopics.length ? (
          <section className="mt-8 rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
              Related Topics
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Continue the chapter journey
            </h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {relatedTopics.map((relatedTopic) => (
                <div
                  key={`${relatedTopic.subjectSlug}-${relatedTopic.slug}`}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-slatebrand-300"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slatebrand-700">
                      {relatedTopic.subjectName}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${
                        relatedTopic.status === "ready"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {relatedTopic.status === "ready" ? "Ready" : "Roadmap"}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">
                    {relatedTopic.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {relatedTopic.summary}
                  </p>
                  {relatedTopic.status === "ready" ? (
                    <Link
                      href={`/learn/${relatedTopic.subjectSlug}/${relatedTopic.slug}`}
                      className="mt-5 inline-flex rounded-2xl bg-slatebrand-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slatebrand-800"
                    >
                      Open Related Topic
                    </Link>
                  ) : (
                    <p className="mt-5 text-sm text-slate-500">
                      Learning structure is prepared and content expansion is next.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getReadyLearningTopics().map((topic) => ({
    params: {
      subjectSlug: topic.subjectSlug,
      topicSlug: topic.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const topic = getLearningTopic(params.subjectSlug, params.topicSlug);

  if (!topic || topic.status !== "ready") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      topic,
      initialQuestions: getTopicQuestions(
        seedQuestions,
        params.subjectSlug,
        params.topicSlug
      ),
    },
  };
}
