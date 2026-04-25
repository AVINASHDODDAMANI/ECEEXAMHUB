import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import EmptyState from "../components/EmptyState";
import Layout from "../components/layout";
import PreviousYearQuestionCard from "../components/PreviousYearQuestionCard";
import {
  previousPaperBenefits,
  previousPaperQuickLinks,
} from "../data/previous-paper-directory";
import { fetchFilters, fetchQuestions } from "../lib/api-client";
import { EXAMS, SUBJECTS } from "../lib/question-utils";

const initialFilters = {
  exam: "All Exams",
  year: "",
  subject: "All Subjects",
  topic: "All Topics",
  paperType: "All Types",
};

const paperTypeOptions = ["All Types", "Objective", "General Aptitude + Engineering"];

function PreviousPaperIcon({ type }) {
  const common = "h-7 w-7";

  if (type === "gate") {
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

  if (type === "book") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v15H7.5A2.5 2.5 0 0 0 5 21V6.5Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v15H7.5A2.5 2.5 0 0 0 5 21V6.5Zm0 0V20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
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

  if (type === "dots") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 12h.01M12 12h.01M18 12h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
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

function getPaperType(question) {
  return (question.exam || []).includes("GATE")
    ? "General Aptitude + Engineering"
    : "Objective";
}

function formatPaperName(question) {
  const primaryExam = (question.exam || [])[0] || question.subject;
  return `${primaryExam} ${question.year}`;
}

function SidebarCard({ title, children, action }) {
  return (
    <section className="rounded-2xl border border-portal-200 bg-white p-5 shadow-portal">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
        {action || null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function PreviousYearPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterForm, setFilterForm] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [questions, setQuestions] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    subjects: SUBJECTS,
    exams: EXAMS,
    topics: ["All Topics"],
    years: [],
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadFilterMetadata() {
      try {
        const payload = await fetchFilters(
          {
            exam: filterForm.exam,
            year: filterForm.year,
            subject: filterForm.subject,
            topic: filterForm.topic,
          },
          { signal: controller.signal }
        );

        if (mounted) {
          setFilterOptions({
            subjects: Array.isArray(payload.subjects) ? payload.subjects : SUBJECTS,
            exams: Array.isArray(payload.exams) ? payload.exams : EXAMS,
            topics: Array.isArray(payload.topics) ? payload.topics : ["All Topics"],
            years: Array.isArray(payload.years) ? payload.years : [],
          });
        }
      } catch (error) {
        if (mounted && error.name !== "AbortError") {
          setFilterOptions({
            subjects: SUBJECTS,
            exams: EXAMS,
            topics: ["All Topics"],
            years: [],
          });
        }
      }
    }

    loadFilterMetadata();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [filterForm.exam, filterForm.year, filterForm.subject, filterForm.topic]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      setLoading(true);
      setLoadError("");

      try {
        const data = await fetchQuestions(
          {
            search,
            exam: activeFilters.exam,
            year: activeFilters.year,
            subject: activeFilters.subject,
            topic: activeFilters.topic,
          },
          { signal: controller.signal }
        );

        if (mounted) {
          setQuestions(data);
        }
      } catch (error) {
        if (mounted && error.name !== "AbortError") {
          setQuestions([]);
          setLoadError(error.message || "Unable to load previous year questions.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [search, activeFilters.exam, activeFilters.year, activeFilters.subject, activeFilters.topic]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const routeSearch =
      typeof router.query.search === "string" ? router.query.search : "";
    setSearch(routeSearch);
  }, [router.isReady, router.query.search]);

  const visibleQuestions = useMemo(() => {
    if (activeFilters.paperType === "All Types") {
      return questions;
    }

    return questions.filter(
      (question) => getPaperType(question) === activeFilters.paperType
    );
  }, [questions, activeFilters.paperType]);

  const recentPapers = useMemo(
    () =>
      [...visibleQuestions]
        .sort((left, right) => right.year - left.year)
        .slice(0, 5),
    [visibleQuestions]
  );

  const solvedCount = visibleQuestions.filter((question) => Boolean(question.explanation)).length;
  const examCount = filterOptions.exams.filter((item) => item !== "All Exams").length;

  function updateFilter(field, value) {
    setFilterForm((current) => {
      const nextValue = { ...current, [field]: value };

      if (field === "exam") {
        nextValue.year = "";
      }

      if (field === "subject") {
        nextValue.topic = "All Topics";
      }

      return nextValue;
    });
  }

  function handleApplyFilters() {
    setActiveFilters(filterForm);
  }

  function handleResetFilters() {
    setFilterForm(initialFilters);
    setActiveFilters(initialFilters);
  }

  return (
    <Layout
      title="ECE Exam Guide | Previous Papers"
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,2.1fr)_360px]">
          <div className="space-y-6">
            <div className="mb-1 flex items-center gap-2 border-b border-portal-100 pb-4 text-sm text-slate-500">
              <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
                Home
              </Link>
              <span aria-hidden="true">&gt;</span>
              <span className="font-medium text-slate-700">Previous Papers</span>
            </div>

            <section className="rounded-2xl border border-portal-200 bg-white p-5 shadow-portal sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-violet-200 bg-violet-50 text-violet-700">
                  <PreviousPaperIcon type="document" />
                </div>
                <div className="max-w-4xl">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Previous Papers
                  </h1>
                  <p className="mt-3 text-base leading-8 text-slate-600">
                    Practice with previous year papers to understand exam pattern, important topics,
                    and question types.
                  </p>
                  <p className="mt-1 text-base leading-8 text-slate-600">
                    All papers are available with solutions where available in the current bank.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-portal-200 bg-[#fbfcff] p-4">
                  <p className="text-3xl font-bold text-slate-900">{visibleQuestions.length}+</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">Question Bank</p>
                  <p className="mt-1 text-sm text-slate-600">Across exams and years</p>
                </div>
                <div className="rounded-2xl border border-portal-200 bg-[#fbfcff] p-4">
                  <p className="text-3xl font-bold text-slate-900">{examCount}+</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">Exams Covered</p>
                  <p className="mt-1 text-sm text-slate-600">GATE, ESE, PSU & more</p>
                </div>
                <div className="rounded-2xl border border-portal-200 bg-[#fbfcff] p-4">
                  <p className="text-3xl font-bold text-slate-900">Free</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">Access</p>
                  <p className="mt-1 text-sm text-slate-600">Open paper practice</p>
                </div>
                <div className="rounded-2xl border border-portal-200 bg-[#fbfcff] p-4">
                  <p className="text-3xl font-bold text-slate-900">{solvedCount}</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">With Solutions</p>
                  <p className="mt-1 text-sm text-slate-600">Detailed explanations</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-portal-200 bg-white p-5 shadow-portal">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Recently Added Papers
                </h2>
                <a href="#results" className="text-base font-bold text-portal-600 transition hover:text-portal-700">
                  View all
                </a>
              </div>

              {recentPapers.length ? (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-0 text-left">
                    <thead>
                      <tr className="text-sm text-slate-500">
                        <th className="border-b border-portal-100 px-4 py-3 font-bold">Exam</th>
                        <th className="border-b border-portal-100 px-4 py-3 font-bold">Paper / Year</th>
                        <th className="border-b border-portal-100 px-4 py-3 font-bold">Type</th>
                        <th className="border-b border-portal-100 px-4 py-3 font-bold">Solutions</th>
                        <th className="border-b border-portal-100 px-4 py-3 font-bold">Open</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPapers.map((question) => {
                        const primaryExam = (question.exam || [])[0] || question.subject;
                        const paperType = getPaperType(question);
                        const searchHref = `/previous-year?search=${encodeURIComponent(question.topic)}`;

                        return (
                          <tr key={question._id} className="text-sm text-slate-700">
                            <td className="border-b border-portal-100 px-4 py-3 font-medium">{primaryExam}</td>
                            <td className="border-b border-portal-100 px-4 py-3">{formatPaperName(question)}</td>
                            <td className="border-b border-portal-100 px-4 py-3">{paperType}</td>
                            <td className="border-b border-portal-100 px-4 py-3">
                              <span className={question.explanation ? "text-green-600" : "text-rose-600"}>
                                {question.explanation ? "Available" : "Not Available"}
                              </span>
                            </td>
                            <td className="border-b border-portal-100 px-4 py-3">
                              <Link
                                href={searchHref}
                                className="inline-flex rounded-lg border border-portal-300 px-3 py-1.5 font-semibold text-portal-700 transition hover:bg-portal-50"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="mt-4 text-center">
                    <a href="#results" className="text-base font-bold text-portal-600 transition hover:text-portal-700">
                      View all papers -&gt;
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <EmptyState
                    title="No recent papers available"
                    message="Apply a broader filter set or search another topic to see more paper entries."
                  />
                </div>
              )}
            </section>

            <section id="results">
              {loadError ? (
                <EmptyState
                  title="Unable to load previous year questions"
                  message={loadError}
                />
              ) : loading ? (
                <EmptyState
                  title="Loading previous year questions"
                  message="Fetching solved questions from your current data source."
                />
              ) : visibleQuestions.length ? (
                <div className="grid gap-4">
                  {visibleQuestions.map((question) => (
                    <PreviousYearQuestionCard key={question._id} question={question} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No previous year questions found"
                  message="Adjust the filters or search term to bring relevant solved questions back into view."
                />
              )}
            </section>
          </div>

          <aside className="space-y-4">
            <SidebarCard
              title="Filter Papers"
              action={
                <svg className="h-6 w-6 text-slate-700" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              }
            >
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Select Exam
                  <select
                    value={filterForm.exam}
                    onChange={(event) => updateFilter("exam", event.target.value)}
                    className="rounded-xl border border-portal-200 bg-white px-4 py-3 text-base outline-none transition focus:border-portal-400"
                  >
                    {filterOptions.exams.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Select Year
                  <select
                    value={filterForm.year}
                    onChange={(event) => updateFilter("year", event.target.value)}
                    className="rounded-xl border border-portal-200 bg-white px-4 py-3 text-base outline-none transition focus:border-portal-400"
                  >
                    <option value="">Choose Year</option>
                    {filterOptions.years.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Paper Type
                  <select
                    value={filterForm.paperType}
                    onChange={(event) => updateFilter("paperType", event.target.value)}
                    className="rounded-xl border border-portal-200 bg-white px-4 py-3 text-base outline-none transition focus:border-portal-400"
                  >
                    {paperTypeOptions.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="rounded-xl bg-portal-600 px-4 py-3 text-base font-bold text-white transition hover:bg-portal-700"
                >
                  Apply Filter
                </button>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-base font-semibold text-portal-600 transition hover:text-portal-700"
                >
                  Reset
                </button>
              </div>
            </SidebarCard>

            <SidebarCard title="What You'll Get">
              <div className="grid gap-3">
                {previousPaperBenefits.map((item, index) => (
                  <div key={item} className="flex items-center gap-3 text-base text-slate-700">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        index === 0
                          ? "bg-violet-50 text-violet-700"
                          : index === 1
                          ? "bg-green-50 text-green-700"
                          : index === 2
                          ? "bg-orange-50 text-orange-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M4 10.5 8 14l8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </SidebarCard>

            <SidebarCard title="Quick Links">
              <div className="grid gap-3">
                {previousPaperQuickLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between gap-3 text-base text-slate-700 transition hover:text-portal-700"
                  >
                    <span>{item.label}</span>
                    <span className="text-xl text-slate-400" aria-hidden="true">&gt;</span>
                  </Link>
                ))}
              </div>
            </SidebarCard>

            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-portal">
              <h2 className="text-2xl font-bold tracking-tight text-portal-700">
                Can't find a paper?
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Request a paper and we'll try to add it.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex rounded-xl bg-white px-4 py-3 text-base font-bold text-portal-700 transition hover:bg-portal-50"
              >
                Request Paper
              </button>
            </section>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
