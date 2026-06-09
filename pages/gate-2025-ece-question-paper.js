import Link from "next/link";
import CircuitDiagram from "../components/CircuitDiagram";
import FormattedText, { InlineFormattedText } from "../components/FormattedText";
import Layout from "../components/layout";
import QuestionStem from "../components/QuestionStem";
import gate2025Questions from "../data/gate-2025-questions";
import { seoLandingPages } from "../data/seo-landing-pages";
import { buildBreadcrumbList, generateCanonical, SITE_NAME } from "../lib/seo";

const page = seoLandingPages["gate-2025-ece-question-paper"];

const subjectAliases = {
  "General Aptitude": "GA",
  "Engineering Mathematics": "Maths",
  "Network Analysis": "Networks",
  "Signals and Systems": "Signals",
  "Communication Systems": "Communication",
  "Control Systems": "Control",
  "Analog Electronics": "Analog",
  "Digital Electronics": "Digital",
  "Electronic Devices": "Devices",
  "Electromagnetic Theory": "EMFT",
};

function cleanText(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function getCorrectAnswer(question = {}) {
  if (question.correctAnswer) {
    return question.correctAnswer;
  }

  if (Array.isArray(question.correctAnswers) && question.correctAnswers.length) {
    return question.correctAnswers.join(", ");
  }

  return "Answer key pending";
}

function buildSubjectRows(questions = []) {
  const subjectMap = new Map();

  questions.forEach((question) => {
    const subject = question.subject || "ECE";
    const current = subjectMap.get(subject) || {
      subject,
      questions: 0,
      marks: 0,
      topics: new Set(),
    };

    current.questions += 1;
    current.marks += Number(question.marks || 0);

    if (question.topic) {
      current.topics.add(question.topic);
    }

    subjectMap.set(subject, current);
  });

  return [...subjectMap.values()]
    .map((item) => ({
      ...item,
      label: subjectAliases[item.subject] || item.subject,
      topics: [...item.topics].slice(0, 4),
    }))
    .sort((left, right) => right.marks - left.marks || right.questions - left.questions);
}

function buildQuestionStructuredData(questions = []) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GATE ECE 2025 Previous Year Question Paper with Detailed Solutions",
    itemListElement: questions.map((question, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${generateCanonical(page.path)}#question-${question.questionId || index + 1}`,
      item: {
        "@type": "Question",
        name: `GATE ECE 2025 Question ${question.questionId || index + 1}`,
        text: cleanText(question.question),
        eduQuestionType: question.questionType || "Multiple choice",
        educationalLevel: "Graduate Aptitude Test in Engineering",
        about: [question.subject, question.topic].filter(Boolean),
        acceptedAnswer: {
          "@type": "Answer",
          text: cleanText(
            `Correct answer: ${getCorrectAnswer(question)}. ${question.explanation || ""}`
          ),
        },
      },
    })),
  };
}

const subjectRows = buildSubjectRows(gate2025Questions);
const totalMarks = gate2025Questions.reduce(
  (sum, question) => sum + Number(question.marks || 0),
  0
);
const importantTopics = [
  "General Aptitude",
  "Engineering Mathematics",
  "Network Analysis",
  "Signals and Systems",
  "Communication Systems",
  "Control Systems",
  "Analog Electronics",
  "Digital Electronics",
  "Electronic Devices",
  "Electromagnetic Theory",
];

export default function Gate2025EceQuestionPaperPage() {
  const structuredData = [
    buildBreadcrumbList([
      { name: "Home", item: "/" },
      { name: "GATE Previous Papers", item: "/gate-previous-year-question-papers" },
      { name: page.heading, item: page.path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "GATE ECE 2025 Previous Year Question Paper with Detailed Solutions",
      headline: "GATE ECE 2025 Previous Year Question Paper with Detailed Solutions",
      description: page.description,
      url: generateCanonical(page.path),
      publisher: {
        "@type": "EducationalOrganization",
        name: SITE_NAME,
      },
      about: importantTopics,
      keywords: page.keywords,
    },
    buildQuestionStructuredData(gate2025Questions),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((item) => ({
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
      title="GATE 2025 ECE Question Paper PDF with Solutions"
      description="Download and practice the complete GATE 2025 ECE question paper PDF with detailed solutions, answer key, 65 solved questions, circuit diagrams, numerical explanations, and topic-wise analysis."
      keywords={page.keywords}
      canonicalUrl={page.path}
      structuredData={structuredData}
      appendSiteName={false}
      pageClassName="py-3 sm:py-4"
    >
      <main className="mx-auto max-w-6xl pb-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500"
        >
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <Link href="/gate-previous-year-question-papers" className="font-medium text-portal-600 transition hover:text-portal-700">
            GATE Papers
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">GATE ECE 2025</span>
        </nav>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-portal-700">
            GATE 2025 Paper Analysis
          </p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                GATE 2025 ECE Question Paper PDF with Solutions
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                Download and practice the complete GATE 2025 ECE question paper PDF with detailed solutions, answer key, 65 solved questions, circuit diagrams, numerical explanations, and topic-wise analysis.
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                This clean URL includes the full question list, subject-wise weightage, difficulty guidance, important topics, and FAQ content directly in the page HTML for easier crawling and revision.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#questions"
                  className="inline-flex min-h-11 items-center rounded-xl bg-portal-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-portal-700"
                >
                  Practice Questions
                </a>
                <Link
                  href="/solution/gate-2025"
                  className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
                >
                  Open Interactive Solution
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Questions", gate2025Questions.length],
                ["Total Marks", totalMarks || 100],
                ["Difficulty", "Moderate"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xl font-black tracking-tight text-slate-950">{value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-black tracking-tight text-slate-950">Exam Overview</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              The GATE EC 2025 paper contains General Aptitude, Engineering Mathematics, and core ECE questions. Use this page for answer-key practice, detailed solution review, and quick topic diagnosis.
            </p>
          </article>
          <article className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-black tracking-tight text-slate-950">Difficulty Analysis</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Overall difficulty is moderate: aptitude and mathematics are scoring, while circuit, communication, control, signal, device, and EMFT questions need careful formula selection.
            </p>
          </article>
          <article className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-black tracking-tight text-slate-950">Important Topics</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Prioritize networks, signals, communication systems, control systems, analog electronics, digital electronics, electronic devices, EMFT, and engineering mathematics before retaking the paper.
            </p>
          </article>
        </section>

        <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-xl font-black tracking-tight text-slate-950">
            Subject-Wise Weightage
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-black">Subject</th>
                  <th className="px-4 py-3 font-black">Questions</th>
                  <th className="px-4 py-3 font-black">Marks</th>
                  <th className="px-4 py-3 font-black">Key Topics Covered</th>
                </tr>
              </thead>
              <tbody>
                {subjectRows.map((row) => (
                  <tr key={row.subject} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 font-bold text-slate-950">{row.label}</td>
                    <td className="px-4 py-3 text-slate-700">{row.questions}</td>
                    <td className="px-4 py-3 text-slate-700">{row.marks || "Mixed"}</td>
                    <td className="px-4 py-3 text-slate-600">{row.topics.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="questions" className="mt-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-950">
                GATE ECE 2025 Questions and Answer Key
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                All questions are rendered as crawlable HTML with options, correct answers, and concise explanations.
              </p>
            </div>
            <Link href="/solution/gate-2025" className="text-sm font-bold text-portal-700 transition hover:text-portal-800">
              Use interactive practice mode
            </Link>
          </div>

          <div className="mt-5 grid gap-4">
            {gate2025Questions.map((question, index) => (
              <article
                key={question._id}
                id={`question-${question.questionId || index + 1}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-2 border-b border-slate-200 pb-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-portal-700">
                      GATE ECE 2025 | {question.subject}
                    </p>
                    <h3 className="mt-1 text-base font-black text-slate-950">
                      Question {question.questionId || index + 1}: {question.topic}
                    </h3>
                  </div>
                  <span className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-slate-600">
                    {question.marks || 1} mark{Number(question.marks || 1) > 1 ? "s" : ""}
                  </span>
                </div>

                <QuestionStem question={question} className="mt-3 text-sm leading-7 text-slate-800" />
                <div className="mt-3 max-w-[560px]">
                  <CircuitDiagram question={question} />
                </div>

                {question.options?.length ? (
                  <ol className="mt-3 grid gap-2 md:grid-cols-2">
                    {question.options.map((option, optionIndex) => (
                      <li
                        key={`${question._id}-${optionIndex}`}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-700"
                      >
                        <strong>{String.fromCharCode(65 + optionIndex)}.</strong>{" "}
                        <InlineFormattedText text={option} />
                      </li>
                    ))}
                  </ol>
                ) : null}

                <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-3">
                  <p className="text-sm font-bold text-emerald-900">
                    Correct Answer: {getCorrectAnswer(question)}
                  </p>
                  {question.explanation ? (
                    <FormattedText text={question.explanation} className="mt-2 text-sm leading-7 text-emerald-950" />
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-xl font-black tracking-tight text-slate-950">FAQ</h2>
          <div className="mt-4 grid gap-3">
            {page.faqs.map((item) => (
              <article key={item.question} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <h3 className="text-sm font-black text-slate-900">{item.question}</h3>
                <p className="mt-1 text-sm leading-7 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
