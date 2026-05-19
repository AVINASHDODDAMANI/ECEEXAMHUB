import Link from "next/link";
import { useMemo } from "react";
import Layout from "../../../components/layout";
import CommunicationSystemTopicPage from "../../../components/CommunicationSystemTopicPage";
import DigitalSignalProcessingTopicPage from "../../../components/DigitalSignalProcessingTopicPage";
import ElectromagneticTheoryTopicPage from "../../../components/ElectromagneticTheoryTopicPage";
import MicroprocessorTopicPage from "../../../components/MicroprocessorTopicPage";
import VLSIDesignTopicPage from "../../../components/VLSIDesignTopicPage";
import AntennaWavePropagationTopicPage from "../../../components/AntennaWavePropagationTopicPage";
import EmbeddedSystemsTopicPage from "../../../components/EmbeddedSystemsTopicPage";
import LearningTopicNavigationMenus from "../../../components/LearningTopicNavigationMenus";
import seedQuestions from "../../../data/questions";
import {
  buildTopicKey,
  getLearningTopic,
  getReadyLearningTopics,
  getRelatedLearningTopics,
  getTopicQuestions,
} from "../../../lib/learning-utils";
import { useLearningProgress } from "../../../lib/use-learning-progress";
import {
  generateCanonical,
  generateDescription,
  generateKeywords,
  generateStructuredData,
  getNotesPagePathByLearningSlug,
  generateTitle,
  getSubjectPagePathByLearningSlug,
} from "../../../lib/seo";

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

  if (topic.subjectSlug === "vlsi-design") {
    return <VLSIDesignTopicPage topic={topic} />;
  }

  if (topic.subjectSlug === "antenna-wave-propagation") {
    return <AntennaWavePropagationTopicPage topic={topic} />;
  }

  if (topic.subjectSlug === "embedded-systems") {
    return <EmbeddedSystemsTopicPage topic={topic} />;
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
  const faqItems = useMemo(
    () => [
      {
        question: `What should I study first in ${topic.title}?`,
        answer:
          topic.learningGoals?.[0] ||
          topic.summary,
      },
      {
        question: `How is ${topic.title} useful for GATE ECE and university exams?`,
        answer: `${topic.title} is useful for ${topic.subjectName} notes because it combines concept clarity, formula-based revision, and exam-style worked examples for ECE students.`,
      },
      {
        question: `Which topics should I revise after ${topic.title}?`,
        answer:
          relatedTopics.length > 0
            ? `After ${topic.title}, revise ${relatedTopics
                .slice(0, 3)
                .map((item) => item.title)
                .join(", ")}.`
            : `After ${topic.title}, continue with the next ${topic.subjectName} chapter in your learning roadmap.`,
      },
    ],
    [relatedTopics, topic]
  );
  const canonicalUrl = generateCanonical(`/learn/${topic.subjectSlug}/${topic.slug}`);
  const seoTitle = generateTitle({
    type: "topic",
    title: topic.title,
    subjectName: topic.subjectName,
  });
  const seoDescription = generateDescription({
    type: "topic",
    title: topic.title,
    subjectName: topic.subjectName,
    chapterTitle: topic.chapterTitle,
    summary: topic.summary,
  });
  const seoKeywords = generateKeywords({
    title: topic.title,
    subjectName: topic.subjectName,
    chapterTitle: topic.chapterTitle,
    topicNames: topic.subtopics || [],
    extraKeywords: topic.keyConcepts || [],
  });
  const structuredData = generateStructuredData({
    type: "topic",
    title: topic.title,
    description: seoDescription,
    path: `/learn/${topic.subjectSlug}/${topic.slug}`,
    subjectName: topic.subjectName,
    chapterTitle: topic.chapterTitle,
    keywords: seoKeywords,
    about: [...(topic.keyConcepts || []), ...(topic.subtopics || [])],
    breadcrumbItems: [
      { name: "Home", item: "/" },
      { name: "Subjects", item: "/subjects" },
      { name: topic.subjectName, item: getSubjectPagePathByLearningSlug(topic.subjectSlug) },
      { name: topic.chapterTitle, item: canonicalUrl },
      { name: topic.title, item: canonicalUrl },
    ],
    faqItems,
  });

  const sectionLinks = [
    { id: "overview", label: "Overview" },
    { id: "concepts", label: "Concepts" },
    { id: "formulas", label: "Formulas" },
    { id: "examples", label: "Examples" },
    { id: "revision", label: "Revision" },
    { id: "faq", label: "FAQ" },
  ];
  const subjectHubHref = getSubjectPagePathByLearningSlug(topic.subjectSlug);
  const subjectNotesHref = getNotesPagePathByLearningSlug(topic.subjectSlug);
  const crossLinks = [
    {
      title: `${topic.subjectName} Subject Hub`,
      description: `Open the full ${topic.subjectName} roadmap, chapter flow, and subject-level revision guidance.`,
      href: subjectHubHref,
      badge: "Subject",
    },
    {
      title: `${topic.subjectName} Notes`,
      description: `Move to chapter-wise ${topic.subjectName.toLowerCase()} notes for broader revision and faster recap.`,
      href: subjectNotesHref,
      badge: "Notes",
    },
    {
      title: `${topic.subjectName} Practice`,
      description: `Search more questions, related concepts, and connected study material in the same subject.`,
      href: `/search?q=${encodeURIComponent(topic.subjectName)}`,
      badge: "Search",
    },
  ];

  function toggleCompletedState() {
    setTopicCompleted(topic.subjectSlug, topic.slug, !isCompleted);
  }

  function toggleRevisionState() {
    setTopicSavedForRevision(topic.subjectSlug, topic.slug, !isSavedForRevision);
  }

  return (
    <Layout
      title={seoTitle}
      description={seoDescription}
      keywords={seoKeywords}
      canonicalUrl={canonicalUrl}
      structuredData={structuredData}
    >
      <div className="mx-auto max-w-5xl pb-12">
        <section className="rounded-[1rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              <Link href="/learn" className="transition hover:text-slate-900">
                Learn
              </Link>
              <span>/</span>
              <span>{topic.subjectName}</span>
              <span>/</span>
              <span>{topic.chapterTitle}</span>
            </div>
            <LearningTopicNavigationMenus topic={topic} />
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

        <section className="mt-6 rounded-[1rem] border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Continue This Subject</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Use these internal paths to move from this topic into the main subject hub,
            full notes, and broader revision across {topic.subjectName}.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {crossLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-portal-300 hover:bg-white hover:shadow-sm"
              >
                <span className="rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[11px] font-bold text-portal-700">
                  {item.badge}
                </span>
                <h3 className="mt-3 text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="faq"
          className="mt-6 rounded-[1rem] border border-slate-200 bg-white p-4 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900">{topic.title} FAQ</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Quick answers for students searching {topic.title.toLowerCase()} explained,
            {` ${topic.subjectName.toLowerCase()} notes, and GATE ECE preparation.`}
          </p>
          <div className="mt-4 grid gap-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
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
    revalidate: 86400,
  };
}
