import Link from "next/link";
import Layout from "../../components/layout";
import { subjectDirectory } from "../../data/subject-directory";
import {
  getSubjectSlug,
  subjectTheoryRoadmaps,
} from "../../data/subject-theory-roadmaps";

function StepIcon({ index }) {
  return (
    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-portal-600 text-sm font-bold text-white">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

export default function SubjectTheoryPage({ subject, steps }) {
  return (
    <Layout title={`ECE Exam Guide | ${subject.title}`}>
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <Link href="/subjects" className="font-medium text-portal-600 transition hover:text-portal-700">
            Subjects
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">{subject.title}</span>
        </div>

        <section className="rounded-xl border border-portal-200 bg-white p-5 shadow-portal sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
            Step-by-step theory
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {subject.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Follow these steps in order. Start with the basics, then move toward exam-level
            applications and problem solving.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href={subject.href}
              className="rounded-lg bg-portal-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-portal-700"
            >
              Open Learning Topics
            </Link>
            <Link
              href={`/practice?search=${encodeURIComponent(subject.search)}`}
              className="rounded-lg border border-portal-200 bg-white px-3 py-2 text-sm font-bold text-portal-700 transition hover:bg-portal-50"
            >
              Practice Questions
            </Link>
          </div>
        </section>

        <section className="mt-5 grid gap-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-portal-300 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-portal-400 hover:shadow-[0_14px_30px_rgba(15,23,42,0.1)] sm:p-5"
            >
              <div className="flex gap-4">
                <StepIcon index={index} />
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-slate-900">
                    {step.title}
                  </h2>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {step.points.map((point) => (
                      <div
                        key={`${step.title}-${point}`}
                        className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold leading-5 text-slate-800"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: subjectDirectory.map((subject) => ({
      params: { slug: getSubjectSlug(subject.title) },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const subject = subjectDirectory.find(
    (item) => getSubjectSlug(item.title) === params.slug
  );

  return {
    props: {
      subject,
      steps: subjectTheoryRoadmaps[subject.title] || [],
    },
  };
}
