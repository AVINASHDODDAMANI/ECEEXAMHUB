import Link from "next/link";
import Layout from "../../components/layout";
import { officialPreviousPapers } from "../../data/official-previous-papers";
import {
  buildBreadcrumbList,
  generateCanonical,
  generateStructuredData,
} from "../../lib/seo";

const CORE_SUBJECTS = [
  { label: "Network Analysis", href: "/subjects/network-analysis" },
  { label: "Control Systems", href: "/subjects/control-systems" },
  { label: "Analog Electronics", href: "/subjects/analog-electronics" },
  { label: "Digital Electronics", href: "/subjects/digital-electronics" },
  { label: "Communication Systems", href: "/subjects/communication-systems" },
  { label: "Signals & Systems", href: "/subjects/signals-and-systems" },
  { label: "Electromagnetic Theory", href: "/subjects/electromagnetic-theory" },
];

const RESOURCE_LINKS = [
  { label: "BEL Mock Tests", href: "/mock-tests" },
  { label: "BEL Topic Wise Questions", href: "/practice/bel" },
  { label: "BEL Important Topics", href: "/bel-most-important-topics" },
  { label: "BEL Chapter Wise PYQs", href: "/bel-chapter-wise-pyqs" },
  { label: "BEL Formula Sheet", href: "/bel-formula-sheet" },
  { label: "BEL Repeated Questions", href: "/bel-electronics-repeated-questions" },
];

const BEL_FAQS = [
  {
    question: "Where can I find BEL Probationary Engineer previous year papers?",
    answer:
      "Use this BEL hub to open year-wise BEL Probationary Engineer ECE and Electronics previous year papers with solved questions, analysis and preparation links.",
  },
  {
    question: "What subjects are important for BEL PE ECE?",
    answer:
      "Network Analysis, Analog Electronics, Digital Electronics, Control Systems, Communication Systems, Signals and Systems, and Electromagnetic Theory are important for BEL PE ECE preparation.",
  },
  {
    question: "Does this page include BEL syllabus and exam pattern guidance?",
    answer:
      "Yes. The hub summarizes BEL exam pattern, syllabus focus, paper links, mock tests and topic-wise practice resources for ECE students.",
  },
  {
    question: "Can I practice BEL topic-wise questions?",
    answer:
      "Yes. Use the BEL practice and topic-wise question links from this hub after revising the related subject notes.",
  },
];

function getBelPapers() {
  return officialPreviousPapers
    .filter((paper) => paper.exam === "BEL")
    .map((paper) => ({
      title: `BEL ${paper.month ? `${paper.month} ` : ""}${paper.year} Paper`,
      href: `/solution/${paper.slug}`,
      description: paper.summary || "Open solved BEL previous year paper with explanations and analysis.",
      questionCount: paper.questionCount,
      year: paper.year,
      month: paper.month || "",
    }))
    .sort((left, right) => right.year - left.year || String(right.month).localeCompare(String(left.month)));
}

function faqStructuredData(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default function BelPreviousYearPapersHub() {
  const belPapers = getBelPapers();
  const title = "BEL Probationary Engineer ECE Previous Year Papers with Solutions | ECEExamGuide";
  const description =
    "Practice BEL Probationary Engineer ECE previous year papers with solved questions, detailed explanations, exam analysis, syllabus guidance, topic-wise questions, mock tests and preparation resources.";
  const path = "/previous-year-papers/bel";
  const structuredData = [
    ...generateStructuredData({
      type: "topic",
      title: "BEL Probationary Engineer ECE Previous Year Papers",
      description,
      path,
      subjectName: "Electronics and Communication Engineering",
      chapterTitle: "BEL Previous Year Papers",
      keywords:
        "BEL Probationary Engineer ECE question paper, BEL PE solved papers, BEL Electronics previous year papers, BEL PE topic wise questions, BEL PE exam analysis",
      about: [
        "BEL Probationary Engineer",
        "BEL ECE previous year papers",
        "BEL Electronics solved papers",
        "BEL PE exam analysis",
      ],
    }),
    buildBreadcrumbList([
      { name: "Home", item: "/" },
      { name: "Previous Papers", item: "/previous-year" },
      { name: "BEL Previous Year Papers", item: path },
    ]),
    faqStructuredData(BEL_FAQS),
  ];

  return (
    <Layout
      title={title}
      description={description}
      canonicalUrl={generateCanonical(path)}
      keywords="BEL Probationary Engineer ECE Question Paper, BEL PE ECE Question Paper, BEL Electronics Previous Year Papers, BEL PE Solved Papers, BEL Electronics Question Paper with Solutions, BEL PE Topic Wise Questions, BEL PE Exam Analysis"
      appendSiteName={false}
      structuredData={structuredData}
      pageClassName="py-5 sm:py-6"
    >
      <div className="mx-auto max-w-[1180px] space-y-6">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="font-semibold transition hover:text-portal-700">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <Link href="/previous-year" className="font-semibold transition hover:text-portal-700">Previous Papers</Link>
          <span aria-hidden="true">&gt;</span>
          <span className="font-extrabold text-slate-800">BEL Papers</span>
        </nav>

        <section className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-portal-700">
            BEL Preparation Hub
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            BEL Probationary Engineer ECE Previous Year Papers
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
            Practice BEL PE ECE solved papers, compare exam analysis, revise important Electronics topics, and move into mock tests or topic-wise questions from one BEL preparation hub.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="#bel-previous-year-papers" className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-slate-800">
              Open Papers
            </Link>
            <Link href="/practice/bel" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-800 transition hover:border-portal-300 hover:text-portal-700">
              Practice Topic Wise
            </Link>
            <Link href="/mock-tests" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-800 transition hover:border-portal-300 hover:text-portal-700">
              Take Mock Tests
            </Link>
          </div>
        </section>

        <section id="bel-previous-year-papers" className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">BEL Previous Year Papers</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {belPapers.map((paper) => (
              <Link key={paper.href} href={paper.href} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-portal-300 hover:bg-white">
                <p className="text-lg font-extrabold text-slate-950">{paper.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{paper.description}</p>
                <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.12em] text-portal-700">
                  {paper.questionCount || "Solved"} questions
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">BEL Exam Pattern</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              BEL Probationary Engineer papers usually mix core technical Electronics questions with General Aptitude and Reasoning. Use previous year papers to understand section balance, speed requirements, formula usage and repeated objective patterns.
            </p>
          </article>
          <article id="bel-syllabus" className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">BEL Syllabus Focus</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {CORE_SUBJECTS.map((subject) => (
                <Link key={subject.href} href={subject.href} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-extrabold text-slate-800 transition hover:border-portal-300 hover:text-portal-700">
                  {subject.label}
                </Link>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">BEL Cutoff</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              BEL cutoff depends on branch, category, paper difficulty and vacancy count. Treat cutoff as a moving target and prioritize accuracy in high-weightage technical topics plus steady aptitude and reasoning practice.
            </p>
          </article>
          <article className="rounded-[18px] border border-orange-200 bg-orange-50 p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">BEL Mock Tests & Topic Wise Questions</h2>
            <div className="mt-4 grid gap-2">
              {RESOURCE_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:text-portal-700">
                  {item.label}
                </Link>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">BEL PE FAQ</h2>
          <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {BEL_FAQS.map((item) => (
              <details key={item.question} className="p-4">
                <summary className="cursor-pointer text-sm font-extrabold text-slate-950">{item.question}</summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
