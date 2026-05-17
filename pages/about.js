import Link from "next/link";
import Layout from "../components/layout";

const values = [
  {
    title: "Concepts before shortcuts",
    text: "Every topic should first make sense as an engineering idea. Formulas, tricks, and PYQs become easier only after the concept is clear.",
  },
  {
    title: "One connected preparation flow",
    text: "Students should not jump between random notes, questions, and videos. The platform connects subjects, notes, practice, PYQs, and mock tests in one place.",
  },
  {
    title: "Revision that respects exam pressure",
    text: "ECE preparation is long, so pages are written to support quick revision, repeated practice, and topic-wise confidence before the exam.",
  },
];

const focusAreas = [
  "GATE ECE preparation",
  "Semester and university exams",
  "PSU and ESE-oriented revision",
  "Topic-wise MCQ practice",
  "Previous year question preparation",
  "Formula and concept revision",
];

export default function AboutPage() {
  return (
    <Layout
      title="About ECE Exam Guide"
      description="Learn about ECE Exam Guide, a structured preparation platform for Electronics and Communication Engineering students."
    >
      <div className="mx-auto max-w-5xl space-y-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">About</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Built for ECE students who want clarity, not clutter
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-700">
            ECE Exam Guide is a focused preparation workspace for Electronics and
            Communication Engineering students. The aim is simple: help students learn the
            subject in a structured way, revise faster, and move confidently from theory to
            exam-style questions.
          </p>
          <p className="mt-3 text-base leading-8 text-slate-700">
            The site brings together subject roadmaps, detailed notes, MCQs, previous year
            question practice, mock tests, and progress tracking so preparation feels less
            scattered. It is designed for students who are preparing seriously but still
            need clean explanations and a practical path through the syllabus.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {values.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-extrabold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
            What this platform is trying to solve
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Many ECE students know what to study, but not in what order, how deeply, or how
            to connect theory with practice. ECE Exam Guide tries to reduce that confusion
            by organizing preparation around subjects, chapters, revision points, and
            exam-focused practice.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/subjects" className="rounded-xl bg-portal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-portal-800">
              Browse Subjects
            </Link>
            <Link href="/mock-tests" className="rounded-xl border border-portal-200 bg-white px-5 py-3 text-sm font-bold text-portal-700 transition hover:bg-portal-50">
              Try Mock Tests
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
