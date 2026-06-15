import Link from "next/link";
import Layout from "./layout";
import ControlSystemSubtopicMenu from "./ControlSystemSubtopicMenu";
import ControlSystemVisualizer from "./ControlSystemVisualizer";
import { controlSystemTopicPages } from "../data/control-system-topic-pages";
import { generateKeywords } from "../lib/seo";

function TopicSection({ id, title, children }) {
  return (
    <section
      id={id}
      className="topic-section min-w-0 scroll-mt-32 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function MiniCard({ title, children }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <h3 className="text-base font-bold text-slate-950">{title}</h3>
      {children}
    </div>
  );
}

function FormulaBox({ children }) {
  return (
    <div className="mt-3 rounded-xl border border-portal-100 bg-[#f8fbff] px-4 py-3 font-mono text-sm font-bold leading-7 text-slate-950 sm:text-base">
      {children}
    </div>
  );
}

function BulletList({ items, bulletClassName = "bg-portal-600" }) {
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

function getControlSystemSubtopics(topic) {
  const subtopics = [
    ...(topic.subtopics || []).map((label) => ({ label, targetId: "theory" })),
    ...(topic.coreTheory || []).map((item) => ({ label: item.title, targetId: "theory" })),
    ...(topic.formulas || []).map(([label]) => ({ label, targetId: "formulas" })),
    ...(topic.examples || []).map(([label]) => ({ label, targetId: "examples" })),
  ];
  const seen = new Set();

  return subtopics.filter((subtopic) => {
    const key = subtopic.label.toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

const sectionLinks = [
  { id: "introduction", label: "Introduction" },
  { id: "why-it-matters", label: "Why It Matters" },
  { id: "intuition", label: "Intuition" },
  { id: "visualization", label: "Visualization" },
  { id: "theory", label: "Core Theory" },
  { id: "working", label: "Working" },
  { id: "formulas", label: "Formulas" },
  { id: "examples", label: "Examples" },
  { id: "faq", label: "FAQ" },
  { id: "practice", label: "Practice" },
];

export default function ControlSystemTopicPage({ topic }) {
  const relatedTopics = controlSystemTopicPages
    .filter((item) => item.slug !== topic.slug)
    .slice(0, 4);
  const seoKeywords = generateKeywords({
    title: topic.shortTitle || topic.title,
    subjectName: "Control Systems",
    topicNames: topic.subtopics || [],
    extraKeywords: [topic.keywords, ...(topic.keyConcepts || [])],
  });
  const faqItems = [
    {
      question: `Why is ${topic.title} important for GATE ECE?`,
      answer: `${topic.title} is important because it supports numerical problem solving in Control Systems and helps connect formulas with practical engineering behavior.`,
    },
    {
      question: `What should I revise first in ${topic.title}?`,
      answer: topic.examNotes?.[0] || topic.summary,
    },
    {
      question: `How should I practice ${topic.title} for university exams?`,
      answer: `Start with the intuition, memorize the core formulas, solve standard examples, and then practice previous-year style questions on ${topic.examFocus.toLowerCase()}.`,
    },
  ];
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: `${topic.title} in Control Systems`,
      description: topic.summary,
      learningResourceType: "Theory Quick Notes",
      educationalLevel: "Undergraduate engineering",
      teaches: topic.title,
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
  ];

  return (
    <Layout
      title={`${topic.title} GATE ECE Quick Notes + Formulas + Solved Examples | Control Systems`}
      description={`${topic.summary} Includes intuition, animated visualization, formulas, solved examples, exam quick notes, and practice for GATE ECE and university exams.`}
      keywords={seoKeywords}
      structuredData={structuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto min-w-0 max-w-[1440px] pb-20">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-col gap-3 pt-1 sm:flex-row sm:items-start sm:justify-between"
        >
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Notes</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/control-systems" className="font-medium text-slate-600 transition hover:text-portal-700">Control Systems</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="font-semibold text-portal-700">{topic.title}</span></li>
          </ol>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Control Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{topic.title}</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">{topic.summary}</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Core question</p>
              <p className="mt-1 leading-6">{topic.coreQuestion}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Exam focus</p>
              <p className="mt-1 leading-6">{topic.examFocus}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Engineering use</p>
              <p className="mt-1 leading-6">{topic.engineeringUse}</p>
            </div>
          </div>
        </header>

        <ControlSystemSubtopicMenu
          title={topic.shortTitle || topic.title}
          subtopics={getControlSystemSubtopics(topic)}
        />

        <nav aria-label={`${topic.title} topic sections`} className="sticky top-20 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {sectionLinks.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-portal-200 hover:bg-portal-50 hover:text-portal-700"
              >
                {section.label}
              </a>
            ))}
          </div>
        </nav>

        <article className="mt-5 grid gap-5">
          <TopicSection id="introduction" title="Introduction">
            {topic.intro.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{paragraph}</p>
            ))}
          </TopicSection>

          <TopicSection id="why-it-matters" title="Why It Matters">
            <BulletList items={topic.why} />
          </TopicSection>

          <TopicSection id="prerequisites" title="Prerequisites">
            <BulletList items={topic.prerequisites} />
          </TopicSection>

          <TopicSection id="intuition" title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{topic.intuition}</p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              Read the topic as a physical behavior first, then let the equations describe that behavior.
            </blockquote>
            <div className="diagram-placeholder mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              {topic.diagram}
            </div>
            <div className="animation-placeholder mt-3 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              {topic.animation}
            </div>
          </TopicSection>

          <TopicSection id="visualization" title="Step-by-Step Visualization">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Use this animated view to connect the exam formula with the physical idea behind {topic.title}.
            </p>
            <ControlSystemVisualizer slug={topic.slug} />
          </TopicSection>

          <TopicSection id="theory" title="Core Theory">
            <div className="mt-4 grid gap-3">
              {topic.coreTheory.map((item) => (
                <MiniCard key={item.title} title={item.title}>
                  <FormulaBox>{item.formula}</FormulaBox>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item.detail}</p>
                </MiniCard>
              ))}
            </div>
          </TopicSection>

          <TopicSection id="working" title="Working Principle">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The working method is to move from the physical system to the mathematical model, then use the model to predict or improve behavior.
            </p>
            <BulletList items={topic.workingSteps} />
            <div className="animation-placeholder mt-4 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Step-by-Step Operation Animation Here
            </div>
          </TopicSection>

          <TopicSection id="formulas" title="Formula Explanation">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {topic.formulas.map(([title, formula, note]) => (
                <MiniCard key={title} title={title}>
                  <FormulaBox>{formula}</FormulaBox>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{note}</p>
                </MiniCard>
              ))}
            </div>
          </TopicSection>

          <TopicSection id="diagram" title="Diagram Explanation Placeholder">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The diagram should show the signal flow, physical interpretation, and the main mathematical variables used in this topic.
            </p>
            <div className="diagram-placeholder mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              {topic.diagram}
            </div>
            <div className="animation-placeholder mt-3 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Interactive Framer Motion Visualization Placeholder
            </div>
          </TopicSection>

          <TopicSection id="applications" title="Real-World Applications">
            <BulletList items={topic.applications} />
          </TopicSection>

          <TopicSection id="examples" title="Solved Examples">
            <div className="mt-4 grid gap-3">
              {topic.examples.map(([title, prompt, solution]) => (
                <MiniCard key={title} title={title}>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{prompt}</p>
                  <FormulaBox>{solution}</FormulaBox>
                </MiniCard>
              ))}
            </div>
          </TopicSection>

          <TopicSection id="common-mistakes" title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={topic.mistakes} />
          </TopicSection>

          <TopicSection id="interview" title="Interview Questions">
            <BulletList items={topic.interview} />
          </TopicSection>

          <TopicSection id="exam-notes" title="Exam Quick Notes">
            <BulletList items={topic.examNotes} />
          </TopicSection>

          <TopicSection id="revision" title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={[topic.summary, ...topic.examNotes.slice(0, 4)]} />
          </TopicSection>

          <TopicSection id="faq" title={`${topic.title} FAQ`}>
            <div className="mt-4 grid gap-3">
              {faqItems.map((item) => (
                <MiniCard key={item.question} title={item.question}>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
                </MiniCard>
              ))}
            </div>
          </TopicSection>

          <TopicSection id="related-topics" title="Related Control Systems Topics">
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedTopics.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-portal-200 hover:bg-portal-50 hover:text-portal-700"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </TopicSection>

          <TopicSection id="practice" title="Practice Questions">
            <BulletList items={topic.practice} />
          </TopicSection>
        </article>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={topic.previous ? `/${topic.previous.slug}` : "/introduction-to-control-systems"}
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            {topic.previous ? `Previous ${topic.previous.title}` : "Previous Introduction to Control Systems"}
          </Link>
          <Link
            href={topic.next ? `/${topic.next.slug}` : "/subjects/control-systems"}
            className="next-topic-btn inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
          >
            {topic.next ? `Next ${topic.next.title}` : "Back to Control Systems"}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
