import Link from "next/link";
import { useMemo, useState } from "react";
import Layout from "../components/layout";
import { subjectDirectory, subjectResources } from "../data/subject-directory";
import { getSubjectSlug } from "../data/subject-theory-roadmaps";
import { buildBreadcrumbList } from "../lib/seo";

const notesStructuredData = [
  buildBreadcrumbList([
    { name: "Home", item: "/" },
    { name: "Notes", item: "/notes" },
  ]),
];

const NOTE_COLLECTIONS = [
  { id: "all", label: "All Notes" },
  { id: "circuits", label: "Circuits" },
  { id: "systems", label: "Systems" },
  { id: "hardware", label: "Hardware" },
];

const SUBJECT_COLLECTIONS = {
  circuits: ["Network Analysis", "Analog Electronics", "Digital Electronics"],
  systems: [
    "Signals and Systems",
    "Communication Systems",
    "Control Systems",
    "Digital Signal Processing",
    "Electromagnetic Theory",
    "Antenna & Wave Propagation",
  ],
  hardware: ["Microprocessors", "VLSI Design", "Embedded Systems"],
};

function getNotesHref(subject) {
  return `/notes/${getSubjectSlug(subject.title)}`;
}

function matchesCollection(subject, collectionId) {
  return (
    collectionId === "all" ||
    (SUBJECT_COLLECTIONS[collectionId] || []).includes(subject.title)
  );
}

function NotesTopicIcon({ accent }) {
  return (
    <span
      className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl border ${accent.border} ${accent.bg} ${accent.text}`}
    >
      <svg className="h-6 w-6" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 2.5h7l3 3V16A1.5 1.5 0 0 1 13.5 17.5h-8A1.5 1.5 0 0 1 4 16V4A1.5 1.5 0 0 1 5.5 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 2.5V6h3M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function NotesMetric({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-2xl font-extrabold tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.75" stroke="currentColor" strokeWidth="1.8" />
      <path d="m13.25 13.25 3.25 3.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function NotesPage() {
  const [query, setQuery] = useState("");
  const [activeCollection, setActiveCollection] = useState("all");
  const [selectedTitle, setSelectedTitle] = useState(subjectDirectory[0]?.title || "");
  const normalizedQuery = query.trim().toLowerCase();

  const visibleSubjects = useMemo(
    () =>
      subjectDirectory.filter((subject) => {
        const searchText = `${subject.title} ${subject.description} ${subject.search || ""}`.toLowerCase();

        return (
          matchesCollection(subject, activeCollection) &&
          (!normalizedQuery || searchText.includes(normalizedQuery))
        );
      }),
    [activeCollection, normalizedQuery]
  );
  const selectedSubject =
    visibleSubjects.find((subject) => subject.title === selectedTitle) ||
    visibleSubjects[0] ||
    null;
  const focusConcepts = selectedSubject?.description
    .split(",")
    .map((concept) => concept.trim().replace(/\.$/, ""))
    .filter(Boolean)
    .slice(0, 4) || [];

  return (
    <Layout
      title="ECE Notes by Subject | Electronics Study Notes"
      description="Browse subject-wise ECE notes for electronics engineering revision with chapter paths, formulas, linked MCQs, and previous year paper practice."
      canonicalUrl="/notes"
      structuredData={notesStructuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1200px] pb-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500"
        >
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">Notes</span>
        </nav>

        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-panel">
          <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_360px] sm:p-6">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-portal-700">
                ECE Notes Library
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Notes
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Open subject-wise notes for theory revision, formulas, chapter flow, and linked practice.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <NotesMetric label="Subjects" value={subjectDirectory.length} />
                <NotesMetric label="Collections" value={NOTE_COLLECTIONS.length - 1} />
                <NotesMetric label="Study paths" value="Notes + PYQs" />
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-950">Quick resources</p>
              <nav aria-label="Notes study links" className="mt-3 grid gap-2">
                {subjectResources.slice(1).map((resource) => (
                  <Link
                    key={resource.label}
                    href={resource.href}
                    className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-semibold transition hover:bg-white ${resource.border} ${resource.bg} ${resource.color}`}
                  >
                    <span>{resource.label}</span>
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-lg font-bold tracking-tight text-slate-950">
            Move from notes to exam practice
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/mcqs"
              className="inline-flex min-h-11 items-center rounded-xl border border-portal-200 bg-portal-50 px-4 py-2.5 text-sm font-bold text-portal-700 transition hover:border-portal-300 hover:bg-white"
            >
              Practice ECE MCQs
            </Link>
            <Link
              href="/previous-year"
              className="inline-flex min-h-11 items-center rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-bold text-orange-700 transition hover:border-orange-300 hover:bg-white"
            >
              Solve previous year papers
            </Link>
          </div>
        </section>

        <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                Browse Subject Notes
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Select a subject to preview its note path before opening the full chapter page.
              </p>
            </div>

            <label className="relative block w-full lg:w-[340px]">
              <span className="sr-only">Search notes</span>
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon />
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search notes or topics"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-portal-300 focus:bg-white"
              />
            </label>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Note collections">
            {NOTE_COLLECTIONS.map((collection) => (
              <button
                key={collection.id}
                type="button"
                onClick={() => setActiveCollection(collection.id)}
                className={`whitespace-nowrap rounded-xl border px-3 py-2 text-sm font-bold transition ${
                  activeCollection === collection.id
                    ? "border-portal-600 bg-portal-600 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-portal-200 hover:bg-white hover:text-portal-700"
                }`}
              >
                {collection.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
            <div className="grid gap-3 sm:grid-cols-2">
              {visibleSubjects.map((subject) => {
                const isSelected = selectedSubject?.title === subject.title;

                return (
                  <button
                    key={subject.title}
                    type="button"
                    onClick={() => setSelectedTitle(subject.title)}
                    className={`group min-w-0 rounded-2xl border p-4 text-left transition ${
                      isSelected
                        ? "border-portal-300 bg-portal-50 shadow-sm"
                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-portal-200 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <NotesTopicIcon accent={subject.accent} />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                          Subject {String(subject.id).padStart(2, "0")}
                        </p>
                        <h3 className="mt-1 text-base font-bold leading-6 text-slate-950 group-hover:text-portal-700">
                          {subject.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                      {subject.description}
                    </p>
                  </button>
                );
              })}

              {!visibleSubjects.length ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 sm:col-span-2">
                  <p className="text-base font-bold text-slate-900">No notes matched</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Try another subject name or switch back to All Notes.
                  </p>
                </div>
              ) : null}
            </div>

            <aside className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-5">
              {selectedSubject ? (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <NotesTopicIcon accent={selectedSubject.accent} />
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${selectedSubject.accent.border} ${selectedSubject.accent.bg} ${selectedSubject.accent.text}`}>
                      Ready to open
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
                    {selectedSubject.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {selectedSubject.description}
                  </p>

                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      Focus areas
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {focusConcepts.map((concept) => (
                        <span
                          key={concept}
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                    <Link
                      href={getNotesHref(selectedSubject)}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl bg-portal-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-portal-700"
                    >
                      Open Notes
                    </Link>
                    <Link
                      href={selectedSubject.href}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-portal-200 hover:text-portal-700"
                    >
                      Subject Roadmap
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flex min-h-[320px] items-center">
                  <p className="text-sm leading-7 text-slate-600">
                    Choose another collection or clear the search to preview available notes.
                  </p>
                </div>
              )}
            </aside>
          </div>
        </section>
      </div>
    </Layout>
  );
}
