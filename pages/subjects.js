import Link from "next/link";
import Layout from "../components/layout";
import { subjectDirectory, subjectResources } from "../data/subject-directory";

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

function ResourceIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 2.5h7l3 3V16A1.5 1.5 0 0 1 13.5 17.5h-8A1.5 1.5 0 0 1 4 16V4A1.5 1.5 0 0 1 5.5 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 2.5V6h3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function SubjectsPage() {
  return (
    <Layout title="ECE Exam Guide | Subjects">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-5 flex items-center gap-2 border-b border-portal-100 pb-4 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span>›</span>
          <span className="font-medium text-slate-700">Subjects</span>
        </div>

        <section className="rounded-2xl border border-portal-200 bg-white p-5 shadow-portal sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-portal-200 bg-portal-50 text-portal-600">
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v15H7.5A2.5 2.5 0 0 0 5 21V6.5Z" stroke="currentColor" strokeWidth="1.9" />
                <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v15H7.5A2.5 2.5 0 0 0 5 21V6.5Zm0 0V20" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold tracking-tight text-portal-700 sm:text-4xl">
                Subjects
              </h1>
              <p className="mt-3 text-base leading-8 text-slate-600">
                Explore all core and advanced subjects of Electronics and Communication Engineering.
              </p>
              <p className="mt-1 text-base leading-8 text-slate-600">
                Click on any subject to access Notes, PYQs, MCQs, Formula Sheets, Important Questions and more.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 shadow-portal">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-700">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
                <path d="M10 8v4m0-6h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold text-portal-700">All study resources in one place!</p>
              <p className="mt-1 text-base leading-7 text-slate-600">
                Each subject page includes Notes, Previous Year Questions, MCQs, Formula Sheets,
                Important Questions and more to help you prepare better.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Core Subjects</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {subjectDirectory.map((subject) => (
              <article
                key={subject.title}
                className="rounded-2xl border border-portal-200 bg-white p-5 shadow-portal transition hover:-translate-y-0.5 hover:border-portal-300"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div
                    className={`flex h-16 w-16 flex-none items-center justify-center rounded-full border ${subject.accent.bg} ${subject.accent.border} ${subject.accent.text}`}
                  >
                    <SubjectIcon type={subject.icon} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[1.1rem] font-bold leading-7 text-slate-900">
                      {subject.id}. {subject.title}
                    </h3>
                    <p className="mt-2 text-base leading-8 text-slate-600">
                      {subject.description}
                    </p>
                    <Link
                      href={subject.href}
                      className="mt-4 inline-flex items-center gap-2 text-base font-bold text-portal-600 transition hover:text-portal-700"
                    >
                      Explore
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 shadow-portal">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3 lg:min-w-[280px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-200 bg-white text-green-700">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v15H7.5A2.5 2.5 0 0 0 5 21V6.5Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v15H7.5A2.5 2.5 0 0 0 5 21V6.5Zm0 0V20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-lg font-bold text-slate-900">
                More resources inside each subject:
              </p>
            </div>

            <div className="grid flex-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
              {subjectResources.map((resource) => (
                <Link
                  key={resource.label}
                  href={resource.href}
                  className={`flex items-center gap-3 rounded-xl border ${resource.border} ${resource.bg} px-4 py-3 text-sm font-semibold ${resource.color} transition hover:bg-white`}
                >
                  <ResourceIcon />
                  <span>{resource.label}</span>
                </Link>
              ))}
              <div className="flex items-center px-2 text-sm font-medium text-slate-600">
                and more...
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
