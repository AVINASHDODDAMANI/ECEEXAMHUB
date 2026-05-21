import Link from "next/link";
import Layout from "../components/layout";
import { getPracticeSlug, practiceSections } from "../data/practice-sections";
import { buildBreadcrumbList } from "../lib/seo";

const practiceStructuredData = [
  buildBreadcrumbList([
    { name: "Home", item: "/" },
    { name: "Practice", item: "/practice" },
  ]),
];

function PracticeIcon() {
  return (
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-portal-200 bg-portal-50 text-portal-700">
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 4h10M5 8h10M5 12h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="m12.5 14.5 1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function PracticePage() {
  return (
    <Layout
      title="ECE Practice Materials | Exam Question Sets"
      description="Open ECE practice materials for exam-wise question sets, revision drills, and linked MCQ practice for electronics engineering preparation."
      canonicalUrl="/practice"
      structuredData={practiceStructuredData}
      pageClassName="py-3"
    >
      <div className="mx-auto max-w-[1200px]">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500"
        >
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">Practice</span>
        </nav>

        <section className="rounded-xl border border-portal-200 bg-white p-5 shadow-portal">
          <h1 className="text-3xl font-bold tracking-tight text-portal-700 sm:text-4xl">
            Practice
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Work through exam-focused practice sections, then use MCQs for faster topic checks.
          </p>
          <Link
            href="/mcqs"
            className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-portal-200 bg-portal-50 px-4 py-2.5 text-sm font-bold text-portal-700 transition hover:border-portal-300 hover:bg-white"
          >
            Practice subject-wise MCQs
          </Link>
        </section>

        <section className="mt-5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Practice Sections
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {practiceSections.map((section) => (
              <Link
                key={section.exam}
                href={`/practice/${getPracticeSlug(section.exam)}`}
                className="group rounded-xl border border-portal-300 bg-white p-4 shadow-portal transition-all duration-300 hover:-translate-y-1 hover:border-portal-400 hover:shadow-[0_14px_30px_rgba(15,23,42,0.11)]"
              >
                <div className="flex items-center gap-3">
                  <PracticeIcon />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">
                      {section.title}
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-6 text-slate-950 group-hover:text-portal-700">
                      {section.label}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
