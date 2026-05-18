import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Layout from "./layout";
import { getLearningSubject, getRelatedLearningTopics } from "../lib/learning-utils";
import { generateKeywords } from "../lib/seo";

const AntennaVisualizer = dynamic(() => import("./visualizers/AntennaVisualizer"), {
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

function AntennaChapterMenu({ topics = [], currentSlug }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Antenna and Wave Propagation chapters"
        aria-expanded={isOpen}
        aria-controls="antenna-topic-page-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div id="antenna-topic-page-menu" className="absolute right-0 z-30 mt-2 max-h-[72vh] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]">
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">Antenna & Wave Propagation Chapters</p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-700">Open any antenna or propagation topic directly.</p>
          </div>
          <div className="grid gap-2">
            {topics.map((item, index) => (
              <Link
                key={item.slug}
                href={`/learn/antenna-wave-propagation/${item.slug}`}
                onClick={() => setIsOpen(false)}
                className={`rounded-xl border p-3 text-left transition ${
                  item.slug === currentSlug
                    ? "border-portal-300 bg-portal-50"
                    : "border-slate-200 bg-[#f8fbff] hover:border-portal-300 hover:bg-white"
                }`}
              >
                <span className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-black leading-snug text-slate-950">{item.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function AntennaWavePropagationTopicPage({ topic }) {
  const relatedTopics = useMemo(() => getRelatedLearningTopics(topic.relatedTopics || []), [topic.relatedTopics]);
  const orderedTopics = useMemo(() => {
    const subject = getLearningSubject("antenna-wave-propagation");
    return subject ? subject.chapters.flatMap((chapter) => chapter.topics.filter((item) => item.status === "ready")) : [];
  }, []);
  const currentIndex = orderedTopics.findIndex((item) => item.slug === topic.slug);
  const previousTopic = currentIndex > 0 ? orderedTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex >= 0 && currentIndex < orderedTopics.length - 1 ? orderedTopics[currentIndex + 1] : null;

  const faqItems = useMemo(
    () => [
      {
        question: `Why is ${topic.shortTitle} important for GATE Antenna and Wave Propagation notes?`,
        answer: `${topic.shortTitle} connects antenna engineering tutorial ideas with Wave propagation for PSU, microwave and antenna notes, university revision, and antenna interview questions.`,
      },
      {
        question: `How should I revise ${topic.shortTitle} for PSU exams and interviews?`,
        answer: "Start with the physical diagram, use the visualization to remember the path or pattern, revise the formula meaning, then solve one diagram-based question.",
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
        subjectName: "Antenna & Wave Propagation",
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
        name: `${topic.shortTitle} Antenna and Wave Propagation Notes`,
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
          { "@type": "ListItem", position: 1, name: "Home", item: "https://eceexamguide.vercel.app/" },
          { "@type": "ListItem", position: 2, name: "Subjects", item: "https://eceexamguide.vercel.app/subjects" },
          { "@type": "ListItem", position: 3, name: "Antenna & Wave Propagation", item: "https://eceexamguide.vercel.app/subjects/antenna-and-wave-propagation" },
          { "@type": "ListItem", position: 4, name: topic.shortTitle, item: `https://eceexamguide.vercel.app/learn/antenna-wave-propagation/${topic.slug}` },
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
      canonicalUrl={`https://eceexamguide.vercel.app/learn/antenna-wave-propagation/${topic.slug}`}
      structuredData={structuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto min-w-0 max-w-[1200px] pb-20">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-col gap-3 pt-1 sm:flex-row sm:items-start sm:justify-between">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/antenna-and-wave-propagation" className="font-medium text-slate-600 transition hover:text-portal-700">Antenna & Wave Propagation</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="font-semibold text-portal-700">{topic.shortTitle}</span></li>
          </ol>
          <AntennaChapterMenu topics={orderedTopics} currentSlug={topic.slug} />
        </nav>

        <header className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Antenna & Wave Propagation</p>
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
              <div><h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">Important Parameters</h3><BulletList items={topic.keyConcepts} /></div>
            </div>
          </TopicSection>

          <TopicSection id="visualization" title="Step-by-Step Visualization">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This lightweight SVG animation explains {topic.shortTitle} for GATE Antenna and Wave Propagation notes, Wave propagation for PSU, Antenna engineering tutorial revision, antenna interview questions, and microwave and antenna notes.
            </p>
            <div className="mt-4"><AntennaVisualizer slug={topic.slug} /></div>
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

          <TopicSection id="formulas" title="Formula, Parameter, and Revision Highlight">
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
                <ol className="mt-3 grid gap-2">
                  {example.steps.map((step, index) => <li key={step} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-700"><span className="font-black text-portal-700">{index + 1}.</span> {step}</li>)}
                </ol>
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

          <TopicSection id="related-topics" title="Related Antenna & Wave Propagation Topics">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">Continue in the same order as the Antenna & Wave Propagation chapter menu.</p>
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
          <Link href={previousTopic ? `/learn/antenna-wave-propagation/${previousTopic.slug}` : "/subjects/antenna-and-wave-propagation"} className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            {previousTopic ? `Previous ${previousTopic.title}` : "Back to Antenna & Wave Propagation"}
          </Link>
          <Link href={nextTopic ? `/learn/antenna-wave-propagation/${nextTopic.slug}` : "/subjects/antenna-and-wave-propagation"} className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            {nextTopic ? `Next ${nextTopic.title}` : "Back to Antenna & Wave Propagation"}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
