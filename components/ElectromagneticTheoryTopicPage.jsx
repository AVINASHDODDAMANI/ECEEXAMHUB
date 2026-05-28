import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import EducationalTheoryLayout, {
  EducationalBulletList,
  EducationalExampleCard,
  EducationalFormulaGrid,
  EducationalInfoCard,
} from "./EducationalTheoryLayout";
import Layout from "./layout";
import LearningTopicNavigationMenus from "./LearningTopicNavigationMenus";
import { getRelatedLearningTopics } from "../lib/learning-utils";
import { generateKeywords, SITE_URL } from "../lib/seo";

const ElectromagneticTheoryVisualizer = dynamic(
  () => import("./visualizers/ElectromagneticTheoryVisualizer"),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-[26px] border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-600 shadow-sm">
        Loading animated visualization...
      </div>
    ),
  }
);

const sectionLinks = [
  { id: "introduction", label: "Introduction" },
  { id: "intuition", label: "Basic Intuition" },
  { id: "visualization", label: "Visualization" },
  { id: "theory", label: "Core Theory" },
  { id: "formulas", label: "Formulas" },
  { id: "examples", label: "Examples" },
  { id: "exam-focus", label: "Exam Focus" },
  { id: "faq", label: "FAQ" },
  { id: "related-topics", label: "Related Topics" },
];

function TopicSection({ id, title, children }) {
  return (
    <section
      id={id}
      className="min-w-0 scroll-mt-28 overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items = [], bulletClassName = "bg-portal-600" }) {
  return (
    <ul className="mt-3 grid min-w-0 gap-2 text-sm leading-7 text-slate-700 sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex min-w-0 gap-2.5">
          <span className={`mt-2.5 h-1.5 w-1.5 flex-none rounded-full ${bulletClassName}`} />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FormulaGrid({ formulas = [] }) {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {formulas.map((formula) => (
        <article key={formula.label} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">
            {formula.label}
          </h3>
          <p className="mt-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-950 sm:text-base">
            {formula.expression}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{formula.note}</p>
        </article>
      ))}
    </div>
  );
}

function FAQCard({ question, answer }) {
  return (
    <details className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <summary className="cursor-pointer text-sm font-black text-slate-950">
        {question}
      </summary>
      <p className="mt-3 text-sm leading-6 text-slate-700">{answer}</p>
    </details>
  );
}

export default function ElectromagneticTheoryTopicPage({ topic }) {
  const relatedTopics = useMemo(
    () => getRelatedLearningTopics(topic.relatedTopics || []),
    [topic.relatedTopics]
  );
  const previousTopic = topic.previous || null;
  const nextTopic = topic.next || null;

  const faqItems = useMemo(
    () => [
      {
        question: `Why is ${topic.shortTitle} important for GATE ECE Electromagnetic Theory?`,
        answer: `${topic.shortTitle} connects field intuition with formula-based problem solving, which is why it appears in GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, and university exam preparation.`,
      },
      {
        question: `How should I revise ${topic.shortTitle} for PSU Electromagnetic Theory?`,
        answer: "Revise the basic intuition first, use the animated visualization to remember the concept flow, then solve formula-based numericals and quick conceptual questions.",
      },
      {
        question: `What is the fastest takeaway from ${topic.shortTitle}?`,
        answer: topic.quickRevision?.[0] || topic.insightSummary,
      },
    ],
    [topic]
  );
  const seoKeywords = useMemo(
    () =>
      generateKeywords({
        title: topic.shortTitle || topic.title,
        subjectName: "Electromagnetic Theory",
        topicNames: topic.subtopics || [],
        extraKeywords: [topic.keywords, ...(topic.keyConcepts || [])],
      }),
    [topic]
  );

  const structuredData = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: `${topic.shortTitle} Electromagnetic Theory Quick Notes`,
        description: topic.metaDescription,
        learningResourceType: "Theory Quick Notes",
        educationalLevel: "Undergraduate engineering",
        teaches: topic.shortTitle,
        keywords: seoKeywords,
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Notes", item: `${SITE_URL}/subjects` },
          { "@type": "ListItem", position: 3, name: "Electromagnetic Theory", item: `${SITE_URL}/subjects/electromagnetic-theory` },
          { "@type": "ListItem", position: 4, name: topic.shortTitle, item: `${SITE_URL}/learn/electromagnetics/${topic.slug}` },
        ],
      },
    ],
    [faqItems, seoKeywords, topic]
  );

  const standardSections = [
    {
      id: "introduction",
      title: "Topic Introduction",
      navLabel: "Introduction",
      children: (
        <div className="grid gap-3">
          {topic.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ),
    },
    {
      id: "intuition",
      title: "Key Idea / Intuition",
      navLabel: "Intuition",
      children: (
        <>
          <p>{topic.intuition}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">
                Learning Goals
              </h3>
              <EducationalBulletList items={topic.learningGoals} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">
                Key Concepts
              </h3>
              <EducationalBulletList items={topic.keyConcepts} />
            </div>
          </div>
        </>
      ),
    },
    {
      id: "mathematical-definition",
      title: "Mathematical Definition",
      navLabel: "Definition",
      children: (
        <>
          <p>
            Read each formula as a field question first, then use the notation for
            calculation. This keeps the operator meaning clear during EMFT numericals.
          </p>
          <EducationalFormulaGrid formulas={topic.formulas} />
        </>
      ),
    },
    {
      id: "visual-understanding",
      title: "Visual Understanding",
      navLabel: "Visual",
      children: (
        <>
          <p>
            This lightweight SVG animation explains {topic.shortTitle} step by step
            for GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT
            quick notes, and university exam preparation.
          </p>
          <div className="mt-4">
            <ElectromagneticTheoryVisualizer slug={topic.slug} />
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {topic.theoryCards.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-base font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.detail}</p>
              </article>
            ))}
          </div>
        </>
      ),
    },
    {
      id: "worked-example",
      title: "Worked Example",
      navLabel: "Example",
      children: (
        <>
          {topic.examples.map((example) => (
            <EducationalExampleCard key={example.title} example={example} />
          ))}
        </>
      ),
    },
    {
      id: "important-notes",
      title: "Important Notes",
      navLabel: "Notes",
      children: (
        <>
          <div className="grid gap-3 md:grid-cols-2">
            <EducationalInfoCard title="Common Mistakes">
              <EducationalBulletList items={topic.commonMistakes} bulletClassName="bg-rose-500" />
            </EducationalInfoCard>
            <EducationalInfoCard title="Exam Pointers">
              <EducationalBulletList items={topic.examPointers} />
            </EducationalInfoCard>
          </div>
          <div className="mt-4 grid gap-3">
            {faqItems.map((item) => (
              <FAQCard key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </>
      ),
    },
    {
      id: "quick-summary",
      title: "Quick Summary",
      navLabel: "Summary",
      children: (
        <>
          <EducationalInfoCard title="Quick Revision Takeaway" tone="emerald">
            <EducationalBulletList items={topic.quickRevision} bulletClassName="bg-emerald-500" />
          </EducationalInfoCard>
          <EducationalInfoCard title="Exam-Oriented Tip" tone="amber">
            <p className="font-semibold text-slate-800">{topic.insightSummary}</p>
          </EducationalInfoCard>
          {relatedTopics.length ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTopics.map((relatedTopic) => (
                <Link
                  key={`${relatedTopic.subjectSlug}-${relatedTopic.slug}`}
                  href={`/learn/${relatedTopic.subjectSlug}/${relatedTopic.slug}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-portal-200 hover:bg-portal-50"
                >
                  <h3 className="text-sm font-black text-slate-900">{relatedTopic.shortTitle}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{relatedTopic.summary}</p>
                </Link>
              ))}
            </div>
          ) : null}
        </>
      ),
    },
  ];

  const standardFooter = (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href={
          previousTopic
            ? `/learn/electromagnetics/${previousTopic.slug}`
            : "/subjects/electromagnetic-theory"
        }
        className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
      >
        {previousTopic ? `Previous ${previousTopic.title}` : "Back to Electromagnetic Theory"}
      </Link>
      <Link
        href={
          nextTopic
            ? `/learn/electromagnetics/${nextTopic.slug}`
            : "/subjects/electromagnetic-theory"
        }
        className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
      >
        {nextTopic ? `Next ${nextTopic.title}` : "Back to Electromagnetic Theory"}
      </Link>
    </div>
  );

  return (
    <Layout
      title={topic.metaTitle}
      description={topic.metaDescription}
      keywords={seoKeywords}
      canonicalUrl={`${SITE_URL}/learn/electromagnetics/${topic.slug}`}
      structuredData={structuredData}
      pageClassName="py-3 sm:py-4"
    >
      <EducationalTheoryLayout
        eyebrow="Electromagnetic Theory"
        title={topic.title}
        summary={topic.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Notes", href: "/subjects" },
          { label: "Electromagnetic Theory", href: "/subjects/electromagnetic-theory" },
          { label: topic.shortTitle },
        ]}
        menu={<LearningTopicNavigationMenus topic={topic} mode="subtopics" />}
        metrics={[
          { label: "Core question", value: topic.coreQuestion },
          { label: "Exam focus", value: topic.examFocus },
          { label: "Engineering use", value: topic.engineeringUse },
        ]}
        sections={standardSections}
        footer={standardFooter}
        navLabel={`${topic.shortTitle} topic sections`}
      />
    </Layout>
  );
}
