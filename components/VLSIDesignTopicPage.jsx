import { useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Layout from "./layout";
import LearningTopicNavigationMenus from "./LearningTopicNavigationMenus";
import { getRelatedLearningTopics } from "../lib/learning-utils";
import { generateKeywords, SITE_URL } from "../lib/seo";

const VLSIVisualizer = dynamic(() => import("./visualizers/VLSIVisualizer"), {
  ssr: false,
  loading: () => (
    <div className="rounded-[26px] border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-600 shadow-sm">
      Loading animated visualization...
    </div>
  ),
});

const sectionLinks = [
  { id: "introduction", label: "Introduction" },
  { id: "intuition", label: "Basic Intuition" },
  { id: "visualization", label: "Visualization" },
  { id: "theory", label: "Core Theory" },
  { id: "formulas", label: "Highlights" },
  { id: "examples", label: "Examples" },
  { id: "exam-focus", label: "Exam Focus" },
  { id: "faq", label: "FAQ" },
  { id: "related-topics", label: "Related Topics" },
];

function TopicSection({ id, title, children }) {
  return (
    <section id={id} className="min-w-0 scroll-mt-28 overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
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

function FAQCard({ question, answer }) {
  return (
    <details className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <summary className="cursor-pointer text-sm font-black text-slate-950">{question}</summary>
      <p className="mt-3 text-sm leading-6 text-slate-700">{answer}</p>
    </details>
  );
}

export default function VLSIDesignTopicPage({ topic }) {
  const relatedTopics = useMemo(() => getRelatedLearningTopics(topic.relatedTopics || []), [topic.relatedTopics]);
  const previousTopic = topic.previous || null;
  const nextTopic = topic.next || null;

  const faqItems = useMemo(
    () => [
      {
        question: `Why is ${topic.shortTitle} important for GATE VLSI notes?`,
        answer: `${topic.shortTitle} links semiconductor design notes with CMOS design tutorial ideas, PSU exam preparation, university revision, and VLSI interview questions.`,
      },
      {
        question: `How should I revise ${topic.shortTitle} for PSU exams and interviews?`,
        answer: "Revise the basic intuition first, use the visualization to remember the signal or fabrication flow, then practice one diagram-based and one conceptual question.",
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
        subjectName: "VLSI Design",
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
        name: `${topic.shortTitle} VLSI Design Notes`,
        description: topic.metaDescription,
        learningResourceType: "Theory Notes",
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
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Subjects", item: `${SITE_URL}/subjects` },
          { "@type": "ListItem", position: 3, name: "VLSI Design", item: `${SITE_URL}/subjects/vlsi-design` },
          { "@type": "ListItem", position: 4, name: topic.shortTitle, item: `${SITE_URL}/learn/vlsi-design/${topic.slug}` },
        ],
      },
    ],
    [faqItems, seoKeywords, topic]
  );

  return (
    <Layout
      title={topic.metaTitle}
      description={topic.metaDescription}
      keywords={seoKeywords}
      canonicalUrl={`${SITE_URL}/learn/vlsi-design/${topic.slug}`}
      structuredData={structuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto min-w-0 max-w-[1440px] pb-20">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-col gap-3 pt-1 sm:flex-row sm:items-start sm:justify-between">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/vlsi-design" className="font-medium text-slate-600 transition hover:text-portal-700">VLSI Design</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="font-semibold text-portal-700">{topic.shortTitle}</span></li>
          </ol>
          <LearningTopicNavigationMenus topic={topic} mode="subtopics" />
        </nav>

        <header className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">VLSI Design</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{topic.title}</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">{topic.summary}</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"><p className="font-bold text-slate-950">Core question</p><p className="mt-1 leading-6">{topic.coreQuestion}</p></div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"><p className="font-bold text-slate-950">Exam focus</p><p className="mt-1 leading-6">{topic.examFocus}</p></div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"><p className="font-bold text-slate-950">Engineering use</p><p className="mt-1 leading-6">{topic.engineeringUse}</p></div>
          </div>
        </header>

        <nav aria-label={`${topic.shortTitle} topic sections`} className="sticky top-20 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {sectionLinks.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-portal-200 hover:bg-portal-50 hover:text-portal-700">
                {section.label}
              </a>
            ))}
          </div>
        </nav>

        <article className="mt-5 grid gap-5">
          <TopicSection id="introduction" title="Introduction">
            {topic.intro.map((paragraph) => <p key={paragraph} className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{paragraph}</p>)}
          </TopicSection>

          <TopicSection id="intuition" title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{topic.intuition}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div><h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">Learning Goals</h3><BulletList items={topic.learningGoals} /></div>
              <div><h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">Important Labels and Signals</h3><BulletList items={topic.keyConcepts} /></div>
            </div>
          </TopicSection>

          <TopicSection id="visualization" title="Step-by-Step Visualization">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This lightweight SVG animation explains {topic.shortTitle} for GATE VLSI notes, CMOS design tutorial revision, VLSI design for PSU, semiconductor design notes, and VLSI interview questions.
            </p>
            <div className="mt-4"><VLSIVisualizer slug={topic.slug} /></div>
          </TopicSection>

          <TopicSection id="theory" title="Core Theory">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {topic.theoryCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <h3 className="text-base font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item.detail}</p>
                </article>
              ))}
            </div>
          </TopicSection>

          <TopicSection id="formulas" title="Formula, Rule, and Revision Highlight">
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <h3 className="text-sm font-black uppercase tracking-[0.12em] text-emerald-800">{topic.formulas[0]?.label}</h3>
              <p className="mt-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-black text-slate-950">{topic.formulas[0]?.expression}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{topic.formulas[0]?.note}</p>
            </div>
            <BulletList items={topic.quickRevision} bulletClassName="bg-emerald-500" />
          </TopicSection>

          <TopicSection id="examples" title="Worked Example and Common Traps">
            {topic.examples.map((example) => (
              <article key={example.title} className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-base font-black text-slate-950">{example.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{example.prompt}</p>
                <div className="mt-3 grid gap-2">
                  {example.steps.map((step) => <div key={step} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-700">{step}</div>)}
                </div>
                <div className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800">Answer: {example.answer}</div>
              </article>
            ))}
            <div className="mt-4"><h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">Common Mistakes</h3><BulletList items={topic.commonMistakes} bulletClassName="bg-rose-500" /></div>
          </TopicSection>

          <TopicSection id="exam-focus" title="Exam Focus">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">Exam Pointers</h3><BulletList items={topic.examPointers} /></div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4"><h3 className="text-sm font-black uppercase tracking-[0.12em] text-amber-800">Exam-Oriented Tip</h3><p className="mt-3 text-sm font-semibold leading-7 text-slate-800">{topic.insightSummary}</p></div>
            </div>
          </TopicSection>

          <TopicSection id="faq" title={`${topic.shortTitle} FAQ`}>
            <div className="mt-4 grid gap-3">{faqItems.map((item) => <FAQCard key={item.question} question={item.question} answer={item.answer} />)}</div>
          </TopicSection>

          <TopicSection id="related-topics" title="Related VLSI Topics">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">Continue in the same order as the VLSI Design chapter menu.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTopics.map((relatedTopic) => (
                <Link key={`${relatedTopic.subjectSlug}-${relatedTopic.slug}`} href={`/learn/${relatedTopic.subjectSlug}/${relatedTopic.slug}`} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-portal-200 hover:bg-portal-50">
                  <h3 className="text-sm font-black text-slate-900">{relatedTopic.shortTitle}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{relatedTopic.summary}</p>
                </Link>
              ))}
            </div>
          </TopicSection>
        </article>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href={previousTopic ? `/learn/vlsi-design/${previousTopic.slug}` : "/subjects/vlsi-design"} className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            {previousTopic ? `Previous ${previousTopic.title}` : "Back to VLSI Design"}
          </Link>
          <Link href={nextTopic ? `/learn/vlsi-design/${nextTopic.slug}` : "/subjects/vlsi-design"} className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            {nextTopic ? `Next ${nextTopic.title}` : "Back to VLSI Design"}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
