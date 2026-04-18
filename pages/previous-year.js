import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EmptyState from "../components/EmptyState";
import FilterPanel from "../components/FilterPanel";
import Layout from "../components/layout";
import PreviousYearQuestionCard from "../components/PreviousYearQuestionCard";
import { fetchFilters, fetchQuestions } from "../lib/api-client";
import { EXAMS, SUBJECTS, hasQuestionTag } from "../lib/question-utils";

function buildImportantTopics(questions) {
  const topicMap = questions.reduce((accumulator, question) => {
    const isImportant = hasQuestionTag(question, "important");
    const isRepeated = hasQuestionTag(question, "repeated");

    if (!isImportant && !isRepeated) {
      return accumulator;
    }

    const current = accumulator[question.topic] || {
      topic: question.topic,
      subject: question.subject,
      importantCount: 0,
      repeatedCount: 0,
      total: 0,
    };

    current.total += 1;
    current.importantCount += isImportant ? 1 : 0;
    current.repeatedCount += isRepeated ? 1 : 0;

    accumulator[question.topic] = current;
    return accumulator;
  }, {});

  return Object.values(topicMap).sort((left, right) => {
    if (right.importantCount !== left.importantCount) {
      return right.importantCount - left.importantCount;
    }

    if (right.repeatedCount !== left.repeatedCount) {
      return right.repeatedCount - left.repeatedCount;
    }

    return right.total - left.total;
  });
}

function HighlightSection({ title, items, emptyMessage, renderItem }) {
  return (
    <section className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-panel">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {items.length ? (
        <div className="mt-5 grid gap-4">{items.map(renderItem)}</div>
      ) : (
        <p className="mt-5 text-sm leading-7 text-slate-600">{emptyMessage}</p>
      )}
    </section>
  );
}

export default function PreviousYearPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [exam, setExam] = useState("All Exams");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [topic, setTopic] = useState("All Topics");
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
          { exam, year, subject, topic },
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
  }, [exam, year, subject, topic]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      setLoading(true);
      setLoadError("");

      try {
        const data = await fetchQuestions(
          { search, exam, year, subject, topic },
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
  }, [search, exam, year, subject, topic]);

  useEffect(() => {
    setTopic("All Topics");
  }, [subject]);

  useEffect(() => {
    setYear("");
  }, [exam]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const routeSearch =
      typeof router.query.search === "string" ? router.query.search : "";
    setSearch(routeSearch);
  }, [router.isReady, router.query.search]);

  const importantQuestions = questions.filter((question) =>
    hasQuestionTag(question, "important")
  );
  const repeatedQuestions = questions.filter((question) =>
    hasQuestionTag(question, "repeated")
  );
  const importantTopics = buildImportantTopics(questions).slice(0, 6);

  return (
    <Layout
      title="ECEExamHub | Previous Year Questions"
      searchValue={search}
      onSearchChange={setSearch}
    >
      <FilterPanel
        title="Previous Year Filters"
        controls={
          <>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Exam
              <select
                value={exam}
                onChange={(event) => setExam(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slatebrand-400"
              >
                {filterOptions.exams.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Year
              <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slatebrand-400"
              >
                <option value="">All Years</option>
                {filterOptions.years.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Subject
              <select
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slatebrand-400"
              >
                {filterOptions.subjects.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Topic
              <select
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slatebrand-400"
              >
                {filterOptions.topics.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </>
        }
      />

      <section className="mt-6">
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
        ) : questions.length ? (
          <>
            <div className="grid gap-5">
              {questions.map((question) => (
                <PreviousYearQuestionCard key={question._id} question={question} />
              ))}
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-3">
              <HighlightSection
                title="Important Questions"
                items={importantQuestions.slice(0, 4)}
                emptyMessage="No important-tagged questions match the current filters."
                renderItem={(question) => (
                  <div
                    key={`important-${question._id}`}
                    className="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-amber-800">
                      {question.subject} | {question.topic}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{question.question}</p>
                    <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                      Year {question.year}
                    </p>
                  </div>
                )}
              />

              <HighlightSection
                title="Repeated Questions"
                items={repeatedQuestions.slice(0, 4)}
                emptyMessage="No repeated questions match the current filters."
                renderItem={(question) => (
                  <div
                    key={`repeated-${question._id}`}
                    className="rounded-3xl border border-sky-200 bg-sky-50 px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-sky-800">
                      {question.subject} | {question.topic}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{question.question}</p>
                    <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                      {(question.exam || []).join(" | ")}
                    </p>
                  </div>
                )}
              />

              <HighlightSection
                title="Important Topics"
                items={importantTopics}
                emptyMessage="Important topics will appear here once questions are tagged."
                renderItem={(item) => (
                  <div
                    key={`topic-${item.topic}`}
                    className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-slate-900">{item.topic}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.subject}</p>
                    <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                      Important {item.importantCount} | Repeated {item.repeatedCount}
                    </p>
                  </div>
                )}
              />
            </div>
          </>
        ) : (
          <EmptyState
            title="No previous year questions found"
            message="Adjust the filters or search term to bring relevant solved questions back into view."
          />
        )}
      </section>
    </Layout>
  );
}
