import Link from "next/link";
import Layout from "../../components/layout";
import { subjectDirectory } from "../../data/subject-directory";
import {
  getSubjectSlug,
  subjectTheoryRoadmaps,
} from "../../data/subject-theory-roadmaps";

function QuickNoteStep({ step, index }) {
  return (
    <article className="rounded-xl border border-portal-300 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-portal-400 hover:shadow-[0_14px_30px_rgba(15,23,42,0.1)] sm:p-5">
      <div className="flex gap-4">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-portal-600 text-sm font-bold text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-900">{step.title}</h2>
          <div className="mt-3 grid gap-2">
            {step.points.map((point) => (
              <p
                key={`${step.title}-${point}`}
                className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium leading-6 text-slate-800"
              >
                {point}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function NoteTopicPage({ subject, steps }) {
  return (
    <Layout title={`ECEExamHub | ${subject.title} Notes`}>
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <Link href="/notes" className="font-medium text-portal-600 transition hover:text-portal-700">
            Notes
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">{subject.title}</span>
        </div>

        <section className="rounded-xl border border-portal-200 bg-white p-5 shadow-portal sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
            Quick notes
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {subject.title}
          </h1>
        </section>

        <section className="mt-5 grid gap-3">
          {steps.map((step, index) => (
            <QuickNoteStep key={step.title} step={step} index={index} />
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
