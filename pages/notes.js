import Link from "next/link";
import Layout from "../components/layout";
import { subjectDirectory } from "../data/subject-directory";
import { getSubjectSlug } from "../data/subject-theory-roadmaps";

function NotesTopicIcon() {
  return (
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-portal-200 bg-portal-50 text-portal-700">
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 2.5h7l3 3V16A1.5 1.5 0 0 1 13.5 17.5h-8A1.5 1.5 0 0 1 4 16V4A1.5 1.5 0 0 1 5.5 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 2.5V6h3M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function NotesPage() {
  return (
    <Layout title="ECEExamHub | Notes" pageClassName="py-3">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">Notes</span>
        </div>

        <section className="rounded-xl border border-portal-200 bg-white p-5 shadow-portal">
          <h1 className="text-3xl font-bold tracking-tight text-portal-700 sm:text-4xl">
            Notes
          </h1>
        </section>

        <section className="mt-5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Topic Names
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subjectDirectory.map((subject) => (
              <Link
                key={subject.title}
                href={`/notes/${getSubjectSlug(subject.title)}`}
                className="group rounded-xl border border-portal-300 bg-white p-4 shadow-portal transition-all duration-300 hover:-translate-y-1 hover:border-portal-400 hover:shadow-[0_14px_30px_rgba(15,23,42,0.11)]"
              >
                <div className="flex items-center gap-3">
                  <NotesTopicIcon />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">
                      Topic {String(subject.id).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-6 text-slate-950 group-hover:text-portal-700">
                      {subject.title}
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
