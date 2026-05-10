import Link from "next/link";
import { useMemo } from "react";
import Layout from "../../../components/layout";
import CommunicationSystemTopicPage from "../../../components/CommunicationSystemTopicPage";
import DigitalSignalProcessingTopicPage from "../../../components/DigitalSignalProcessingTopicPage";
import ElectromagneticTheoryTopicPage from "../../../components/ElectromagneticTheoryTopicPage";
import MicroprocessorTopicPage from "../../../components/MicroprocessorTopicPage";
import seedQuestions from "../../../data/questions";
import {
  buildTopicKey,
  getLearningTopic,
  getReadyLearningTopics,
  getRelatedLearningTopics,
  getTopicQuestions,
} from "../../../lib/learning-utils";
import { useLearningProgress } from "../../../lib/use-learning-progress";

function NotesSection({ id, title, description, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-[1rem] border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        ) : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items = [], tone = "plain" }) {
  if (!items.length) {
    return null;
  }

  const toneClassName =
    tone === "soft"
      ? "border-slate-200 bg-slate-50"
      : tone === "warm"
      ? "border-amber-100 bg-amber-50/60"
      : "border-slate-200 bg-white";

  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div
          key={item}
          className={`rounded-lg border px-3 py-2 text-sm leading-6 text-slate-700 ${toneClassName}`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default function LearningTopicPage({ topic }) {
  if (topic.subjectSlug === "communications") {
    return <CommunicationSystemTopicPage topic={topic} />;
  }

  if (topic.subjectSlug === "electromagnetics") {
    return <ElectromagneticTheoryTopicPage topic={topic} />;
  }

  if (topic.subjectSlug === "microprocessors") {
    return <MicroprocessorTopicPage topic={topic} />;
  }

  if (topic.subjectSlug === "dsp") {
    return <DigitalSignalProcessingTopicPage topic={topic} />;
  }

  const {
    progressMap,
    revisionMap,
    setTopicCompleted,
    setTopicSavedForRevision,
  } = useLearningProgress();

  const topicKey = buildTopicKey(topic.subjectSlug, topic.slug);
  const isCompleted = Boolean(progressMap[topicKey]);
  const isSavedForRevision = Boolean(revisionMap[topicKey]);
  const relatedTopics = useMemo(
    () => getRelatedLearningTopics(topic.relatedTopics || []),
    [topic.relatedTopics]
  );

  const sectionLinks = [
    { id: "overview", label: "Overview" },
    { id: "concepts", label: "Concepts" },
    { id: "formulas", label: "Formulas" },
    { id: "examples", label: "Examples" },
    { id: "revision", label: "Revision" },
  ];

  function toggleCompletedState() {
    setTopicCompleted(topic.subjectSlug, topic.slug, !isCompleted);
  }

  function toggleRevisionState() {
    setTopicSavedForRevision(topic.subjectSlug, topic.slug, !isSavedForRevision);
  }

  return (
    <Layout
      title={`ECEExamHub | ${topic.title}`}
      description={`${topic.title} notes page with concepts, formulas, examples, and revision guidance for ${topic.subjectName}.`}
    >
      <div className="mx-auto max-w-5xl pb-12">
        <section className="rounded-[1rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            <Link href="/learn" className="transition hover:text-slate-900">
              Learn
            </Link>
            <span>/</span>
            <span>{topic.subjectName}</span>
            <span>/</span>
            <span>{topic.chapterTitle}</span>
          </div>

          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {topic.title}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">{topic.summary}</p>

              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-600">
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1">
                  {topic.subjectName}
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1">
                  {topic.subjectWeightage}
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1">
                  {topic.estimatedTime}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={toggleCompletedState}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isCompleted
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {isCompleted ? "Completed" : "Mark Complete"}
              </button>
              <button
                type="button"
                onClick={toggleRevisionState}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isSavedForRevision
                    ? "border border-amber-200 bg-amber-50 text-amber-800"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {isSavedForRevision ? "Saved" : "Save for Revision"}
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {sectionLinks.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-white"
              >
                {section.label}
              </a>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-4">
          <NotesSection
            id="overview"
            title="Topic Overview"
            description="Start here for the big picture before memorizing formulas or steps."
          >
            <div className="grid gap-3">
              {(topic.overview || []).map((paragraph) => (
                <p
                  key={paragraph}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {(topic.subtopics || []).length ? (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Subtopics Covered
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {topic.subtopics.map((subtopic) => (
                    <span
                      key={subtopic}
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600"
                    >
                      {subtopic}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </NotesSection>

          <NotesSection
            id="concepts"
            title="Core Concepts"
            description="Read these ideas in plain language and use them as your understanding checklist."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Learning Goals
                </p>
                <div className="mt-2">
                  <BulletList items={topic.learningGoals || []} tone="soft" />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Key Concepts
                </p>
                <div className="mt-2">
                  <BulletList items={topic.keyConcepts || []} tone="soft" />
                </div>
              </div>
            </div>

            {(topic.concepts || []).length ? (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Quick Concept Map
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {topic.concepts.map((concept) => (
                    <span
                      key={concept}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </NotesSection>

          <NotesSection
            id="formulas"
            title="Formulas and Meaning"
            description="Keep formulas close to their meaning so they are easier to remember and apply."
          >
            <div className="grid gap-3">
              {(topic.formulas || []).map((formula) => (
                <div
                  key={formula.label}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {formula.label}
                  </p>
                  <p className="mt-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-base font-semibold text-slate-900">
                    {formula.expression}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{formula.note}</p>
                </div>
              ))}
            </div>
          </NotesSection>

          <NotesSection
            id="examples"
            title="Worked Examples"
            description="Use these solved examples to see how the concept is applied step by step."
          >
            <div className="grid gap-4">
              {(topic.examples || []).map((example) => (
                <article
                  key={example.title}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="text-base font-semibold text-slate-900">{example.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{example.prompt}</p>
                  <div className="mt-3 grid gap-2">
                    {example.steps.map((step, index) => (
                      <div
                        key={step}
                        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-700"
                      >
                        <span className="font-semibold text-slate-900">{index + 1}.</span> {step}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-md border border-slate-200 bg-white px-3 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Answer
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">{example.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </NotesSection>

          <NotesSection
            id="revision"
            title="Revision and Exam Focus"
            description="Use this block for last-minute revision, common traps, and exam-oriented reading."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Common Mistakes
                </p>
                <div className="mt-2">
                  <BulletList items={topic.commonMistakes || []} tone="warm" />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Exam Pointers
                </p>
                <div className="mt-2">
                  <BulletList items={topic.examPointers || []} tone="soft" />
                </div>
              </div>
            </div>

            {(topic.quickRevision || []).length ? (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Quick Revision
                </p>
                <div className="mt-2">
                  <BulletList items={topic.quickRevision} tone="soft" />
                </div>
              </div>
            ) : null}

            {topic.insightSummary ? (
              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Exam Insight
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{topic.insightSummary}</p>
              </div>
            ) : null}
          </NotesSection>
        </div>

        {relatedTopics.length ? (
          <section className="mt-6 rounded-[1rem] border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Related Topics</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Continue with the next topic once these notes feel clear.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {relatedTopics.map((relatedTopic) => (
                <div
                  key={`${relatedTopic.subjectSlug}-${relatedTopic.slug}`}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="rounded-md border border-slate-200 bg-white px-2 py-1">
                      {relatedTopic.subjectName}
                    </span>
                    <span className="rounded-md border border-slate-200 bg-white px-2 py-1">
                      {relatedTopic.chapterTitle}
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">
                    {relatedTopic.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">
                    {relatedTopic.summary}
                  </p>
                  <Link
                    href={`/learn/${relatedTopic.subjectSlug}/${relatedTopic.slug}`}
                    className="mt-3 inline-flex rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Open Topic
                  </Link>
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
