import Link from "next/link";
import Layout from "../components/layout";
import { examDirectory, examResources } from "../data/exam-directory";

function ExamIcon({ type }) {
  const common = "h-7 w-7";

  if (type === "gate" || type === "graduation") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3.5 9 12 4l8.5 5L12 14 3.5 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6.5 11v3.5L12 18l5.5-3.5V11" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "government" || type === "state") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 10h16M6 10V8l6-4 6 4v2M7 20v-6m5 6v-6m5 6v-6M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "industry") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 20V9l6 3V7l6 3V4l4 2v14H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 3h6l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 3v5h5M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "train") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 4h8a4 4 0 0 1 4 4v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 18 6 21m10-3 2 3M8 9h8M9 13h.01M15 13h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "briefcase") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-11 3h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Zm0 0a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 3h6l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export default function EceExamsPage() {
  return (
    <Layout title="ECE Exam Guide | ECE Exams">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,2.1fr)_400px]">
          <div className="space-y-6">
            <div className="mb-1 flex items-center gap-2 border-b border-portal-100 pb-4 text-sm text-slate-500">
              <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
                Home
              </Link>
              <span>›</span>
              <span className="font-medium text-slate-700">ECE Exams</span>
            </div>

            <section className="rounded-2xl border border-portal-200 bg-white p-5 shadow-portal sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-portal-200 bg-portal-50 text-portal-600">
                  <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 4h6l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l1-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="max-w-4xl">
                  <h1 className="text-3xl font-bold tracking-tight text-portal-700 sm:text-4xl">
                    ECE Exams
                  </h1>
                  <p className="mt-3 text-base leading-8 text-slate-600">
                    Find everything you need to crack top ECE competitive exams.
                  </p>
                  <p className="mt-1 text-base leading-8 text-slate-600">
                    Syllabus, Previous Papers, Important Topics, MCQs and Preparation Resources
                    all in one place.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Top ECE Competitive Exams
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {examDirectory.map((exam) => (
                  <article
                    key={exam.title}
                    className="rounded-2xl border border-portal-200 bg-white p-5 shadow-portal transition hover:-translate-y-0.5 hover:border-portal-300"
                  >
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full border ${exam.accent.bg} ${exam.accent.border} ${exam.accent.text}`}
                    >
                      <ExamIcon type={exam.icon} />
                    </div>
                    <h3 className={`mt-5 text-[1.1rem] font-bold leading-7 ${exam.accent.text}`}>
                      {exam.title}
                    </h3>
                    <p className="mt-3 text-base leading-8 text-slate-600">
                      {exam.description}
                    </p>
                    <Link
                      href={exam.href}
                      className="mt-4 inline-flex items-center gap-2 text-base font-bold text-portal-600 transition hover:text-portal-700"
                    >
                      Explore
                      <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-portal">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-700">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m12 17 5.878 3.09-1.123-6.545 4.756-4.636-6.572-.955L12 2 9.061 7.954l-6.572.955 4.756 4.636-1.123 6.545L12 17Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-portal-700">
                    Everything in one place
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-base text-slate-600">
                    {examResources.map((resource) => (
                      <span key={resource} className="flex items-center gap-2">
                        <span className="text-portal-500">•</span>
                        <span>{resource}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-portal-200 bg-white p-5 shadow-portal">
              <h2 className="text-2xl font-bold tracking-tight text-portal-700">ECE Exams</h2>
              <div className="mt-4 border-t border-portal-100 pt-2">
                {examDirectory.map((exam) => (
                  <Link
                    key={exam.title}
                    href={exam.href}
                    className="flex items-start gap-4 border-b border-portal-100 py-4 last:border-b-0 hover:bg-[#f8fbff]"
                  >
                    <div
                      className={`flex h-14 w-14 flex-none items-center justify-center rounded-full border ${exam.accent.bg} ${exam.accent.border} ${exam.accent.text}`}
                    >
                      <ExamIcon type={exam.icon} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-lg font-bold ${exam.accent.text}`}>{exam.title}</p>
                      <p className="mt-1 text-base leading-7 text-slate-600">
                        {exam.shortDescription}
                      </p>
                    </div>
                    <span className="pt-2 text-xl text-slate-400">›</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-portal">
              <h2 className="text-2xl font-bold tracking-tight text-portal-700">Stay Updated</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Get latest exam updates, notifications and study resources on your email.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_112px] xl:grid-cols-[minmax(0,1fr)_112px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-xl border border-blue-200 bg-white px-4 py-3 text-base outline-none transition focus:border-portal-400"
                />
                <button
                  type="button"
                  className="rounded-xl bg-portal-700 px-4 py-3 text-base font-bold text-white transition hover:bg-portal-800"
                >
                  Subscribe
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
