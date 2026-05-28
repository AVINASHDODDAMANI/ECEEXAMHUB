import Link from "next/link";
import Layout from "../components/layout";

const faqs = [
  {
    question: "Is ECE Exam Guide free to use?",
    answer:
      "The core preparation areas are available as free study resources, including subject pages, notes, MCQs, previous year question sections, mock tests, and practice pages. If premium features are added later, they should be clearly marked instead of hidden.",
  },
  {
    question: "Which exams does the platform support?",
    answer:
      "The content is mainly organized for GATE ECE preparation, but the same subjects are useful for ESE, PSU technical exams, and university semester exams. Students can use the platform for concept learning, formula revision, and question practice.",
  },
  {
    question: "How should I start preparing from this website?",
    answer:
      "Start with Notes, choose one core topic area, read the chapter flow, then move to related quick notes and practice questions. Once the basics feel stable, use PYQs and mock tests to check speed, accuracy, and repeated exam patterns.",
  },
  {
    question: "Why do some topics open as separate pages?",
    answer:
      "Important chapters such as Network Theorems, Op-Amps, K-Maps, Laplace Transform, and Root Locus have dedicated pages so students can open the topic directly without scrolling through a long subject overview.",
  },
  {
    question: "Can I track my preparation progress?",
    answer:
      "Yes. The learning dashboard and topic pages include progress-oriented features so you can mark completed topics and keep revision more visible while studying.",
  },
  {
    question: "What should I do if I find a mistake?",
    answer:
      "Use the contact page and send the page URL with a short explanation. Corrections are easier to review when the exact topic, formula, or question is mentioned clearly.",
  },
];

export default function FaqPage() {
  return (
    <Layout
      title="ECE Exam Guide FAQ"
      description="Frequently asked questions about ECE Exam Guide, GATE ECE preparation, notes, PYQs, MCQs, and mock tests."
    >
      <section className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">FAQ</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Questions students usually ask first
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
          This page answers the practical questions a student may have before using the
          platform: what is available, how to start, and how to report corrections.
        </p>

        <div className="mt-6 grid gap-4">
          {faqs.map((item) => (
            <article key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-extrabold text-slate-950">{item.question}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/subjects" className="rounded-xl bg-portal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-portal-800">
            Start With Notes
          </Link>
          <Link href="/contact" className="rounded-xl border border-portal-200 bg-white px-5 py-3 text-sm font-bold text-portal-700 transition hover:bg-portal-50">
            Report an Issue
          </Link>
        </div>
      </section>
    </Layout>
  );
}
