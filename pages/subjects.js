import Link from "next/link";
import Layout from "../components/layout";
import { subjectDirectory } from "../data/subject-directory";
import { getSubjectSlug } from "../data/subject-theory-roadmaps";

function SubjectIcon({ type }) {
  const common = "h-8 w-8";

  if (type === "network") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 12h4l2.5-6 5 12L17 9l4 3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "analog") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6v12M18 6v12M7 12h10M10 8l4 4-4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "digital") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 17V7h6v10m0-10v10h8V9c0-1.1-.9-2-2-2h-2v10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "signals") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 18V6m0 12h16M7 15l3-5 3 2 4-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "communication") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 15V9m0 0-2.5 2.5M12 9l2.5 2.5M7 20a5 5 0 0 1 10 0M5.5 15.5a9 9 0 0 1 13 0M4 12a12 12 0 0 1 16 0" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "electromagnetic") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5m0 0-4 4m4-4 4 4M8 19c0-2.2 1.8-4 4-4s4 1.8 4 4M5 19c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "microprocessor" || type === "processor" || type === "chip") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="7" width="10" height="10" rx="1.8" stroke="currentColor" strokeWidth="1.9" />
        <path d="M4 9V7m0 10v-2m16-8V7m0 10v-2M9 4H7m10 0h-2M9 20H7m10 0h-2M4 12H2m20 0h-2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "control") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12h4l2-5 4 10 2-5h4M7 4h10v16H7z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "satellite") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 9 4 4m11 5 5-5M9 15l-5 5m11-5 5 5M10 10l4 4m-8 0 8-8m4 4a4 4 0 1 1-8 8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "antenna") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 14v6m-3 0h6M8 20h8M12 14l-4 4M12 14l4 4M12 7a3 3 0 1 1 0 .01M7 12a7 7 0 0 1 10 0M4.5 15.5a10.5 10.5 0 0 1 15 0" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5h14v14H5zM9 9h6v6H9z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SubjectsPage() {
  return (
    <Layout title="ECE Exam Guide | Subjects">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">Subjects</span>
        </div>

        <section className="rounded-xl border border-portal-200 bg-white p-5 shadow-portal">
          <h1 className="text-3xl font-bold tracking-tight text-portal-700 sm:text-4xl">
            Subjects
          </h1>
        </section>

        <section className="mt-5">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Core Subjects
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subjectDirectory.map((subject) => (
              <Link
                key={subject.title}
                href={`/subjects/${getSubjectSlug(subject.title)}`}
                className="group rounded-xl border border-portal-300 bg-white p-4 shadow-portal transition-all duration-300 hover:-translate-y-1 hover:border-portal-400 hover:shadow-[0_14px_30px_rgba(15,23,42,0.11)]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 flex-none items-center justify-center rounded-lg border ${subject.accent.bg} ${subject.accent.border} ${subject.accent.text}`}
                  >
                    <SubjectIcon type={subject.icon} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">
                      Subject {String(subject.id).padStart(2, "0")}
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
