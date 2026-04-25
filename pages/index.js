import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout";
import seedQuestions from "../data/questions";
import { getAllLearningTopics, getLearningSubjects, getReadyLearningTopics } from "../lib/learning-utils";
import { useLearningProgress } from "../lib/use-learning-progress";
import { fetchQuestions } from "../lib/api-client";

function Panel({ title, titleTone = "text-portal-700", children, action }) {
  return (
    <section className="rounded-2xl border border-portal-200 bg-white p-4 shadow-portal sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className={`text-[1.35rem] font-bold tracking-tight ${titleTone} sm:text-2xl`}>
          {title}
        </h2>
        {action || null}
      </div>
      <div className="mt-3 sm:mt-4">{children}</div>
    </section>
  );
}

function FeatureIcon({ type }) {
  if (type === "book") {
    return (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v15H7.5A2.5 2.5 0 0 0 5 21V6.5Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v15H7.5A2.5 2.5 0 0 0 5 21V6.5Zm0 0V20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 3h6l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "clipboard") {
    return (
      <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 4h6l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l1-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const [questions, setQuestions] = useState(seedQuestions);
  const learningSubjects = getLearningSubjects();
  const readyTopics = getReadyLearningTopics();
  const allTopics = getAllLearningTopics();
  const { progressStats } = useLearningProgress();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadQuestions() {
      try {
        const data = await fetchQuestions({}, { signal: controller.signal });
        if (mounted && data.length) {
          setQuestions(data);
        }
      } catch {
        // Seed data keeps the homepage working offline.
      }
    }

    loadQuestions();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const popularTopics = useMemo(
    () =>
      allTopics.slice(0, 12).map((topic) => ({
        label: topic.title,
        href:
          topic.status === "ready"
            ? `/learn/${topic.subjectSlug}/${topic.slug}`
            : `/learn?search=${encodeURIComponent(topic.title)}`,
      })),
    [allTopics]
  );

  const examLinks = [
    { label: "GATE ECE", href: "/previous-year?exam=GATE" },
    { label: "ESE (IES)", href: "/learn" },
    { label: "PSU Exams (EC)", href: "/previous-year?exam=BEL" },
    { label: "RRB JE (EC)", href: "/practice" },
    { label: "UPSC ECE", href: "/learn?search=communication" },
    { label: "University Semester Exams", href: "/subjects" },
  ];

  const studyMaterials = [
    { label: "Notes", href: "/notes" },
    { label: "Previous Year Papers", href: "/previous-year" },
    { label: "Important Questions", href: "/practice?search=important" },
    { label: "MCQs", href: "/mcqs" },
    { label: "Formula Sheet", href: "/learn?search=formula" },
    { label: "Textbooks Style Topics", href: "/learn" },
  ];

  const previousPaperGroups = [
    { label: "GATE ECE", href: "/previous-year?exam=GATE" },
    { label: "ESE (IES)", href: "/previous-year" },
    { label: "PSU Exams", href: "/previous-year?exam=BEL" },
    { label: "University Exams", href: "/subjects" },
  ];

  const highlights = [
    {
      icon: "book",
      title: "Well Explained",
      description: "Concise and easy to understand topics",
    },
    {
      icon: "document",
      title: "Exam Focused",
      description: "Important questions, PYQs, and patterns",
    },
    {
      icon: "clipboard",
      title: "Updated Regularly",
      description: "Latest syllabus and exam-oriented practice",
    },
    {
      icon: "people",
      title: "For All ECE Students",
      description: "Semester exams to competitive exam revision",
    },
  ];

  return (
    <Layout title="ECE Exam Guide | Home" pageClassName="py-3 sm:py-5">
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,2fr)_360px]">
        <div className="space-y-4 sm:space-y-6">
          <section className="rounded-2xl border border-portal-200 bg-gradient-to-r from-[#f7fbff] to-[#eef5ff] p-4 shadow-portal sm:p-6">
            <div className="max-w-4xl">
              <h1 className="text-[2rem] font-bold tracking-tight text-portal-700 sm:text-4xl">
                Welcome to ECE Exam Guide
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base sm:leading-8">
                Find notes, important questions, previous year papers, MCQs, and
                revision-ready learning paths for Electronics and Communication Engineering.
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-portal-200 bg-white/80 p-3.5 sm:rounded-2xl sm:p-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-portal-200 bg-portal-50 text-portal-600 sm:h-14 sm:w-14">
                    <FeatureIcon type={item.icon} />
                  </div>
                  <h2 className="mt-3 text-base font-bold text-portal-700 sm:mt-4 sm:text-lg">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 text-xs leading-6 text-slate-600 sm:mt-2 sm:text-sm sm:leading-7">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Panel title="Popular Topics" titleTone="text-green-700">
            <div className="grid gap-x-4 gap-y-2.5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 xl:grid-cols-4">
              {popularTopics.map((topic) => (
                <Link
                  key={topic.label}
                  href={topic.href}
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-700 transition hover:text-portal-700 sm:gap-3 sm:text-base"
                >
                  <span className="text-base text-green-700 sm:text-xl">{">"}</span>
                  <span>{topic.label}</span>
                </Link>
              ))}
            </div>
          </Panel>

          <Panel
            title="Previous Year Papers"
            titleTone="text-violet-700"
            action={
              <Link
                href="/previous-year"
                className="text-xs font-bold text-violet-600 transition hover:text-violet-700 sm:text-sm"
              >
                View all
              </Link>
            }
          >
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
              {previousPaperGroups.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl border border-violet-200 bg-violet-50 px-3 py-3 text-sm font-semibold text-slate-800 transition hover:border-violet-300 hover:bg-white sm:rounded-2xl sm:px-4 sm:py-4 sm:text-base"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-200 bg-white text-violet-600 sm:h-10 sm:w-10 sm:rounded-xl">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M8 3h6l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M14 3v5h5M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </Panel>
        </div>

        <aside className="space-y-4 sm:space-y-6">
          <Panel
            title="ECE Exams"
            action={
              <span className="rounded-full border border-portal-200 bg-portal-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-portal-700 sm:px-3 sm:text-xs">
                {learningSubjects.length} subjects
              </span>
            }
          >
            <div className="grid gap-2.5 sm:gap-3">
              {examLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 text-sm font-medium text-portal-700 transition hover:text-portal-800 sm:text-lg"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-portal-50 text-portal-600">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M3.5 7.5 10 4l6.5 3.5L10 11 3.5 7.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      <path d="M5.5 10.5v2L10 15l4.5-2.5v-2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm sm:text-base">{item.label}</span>
                </Link>
              ))}
            </div>

            <Link
              href="/subjects"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-portal-200 bg-[#f8fbff] px-4 py-2.5 text-sm font-bold text-portal-700 transition hover:bg-white sm:mt-6 sm:py-3 sm:text-base"
            >
              View all exams
            </Link>
          </Panel>

          <Panel title="Study Materials" titleTone="text-green-700">
            <div className="grid gap-2.5 sm:gap-3">
              {studyMaterials.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 text-sm font-medium text-portal-700 transition hover:text-portal-800 sm:text-base"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-green-200 bg-green-50 text-green-700">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M5 2.5h7l3 3V16a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 16V4A1.5 1.5 0 0 1 5.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M12 2.5V6h3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </Panel>

          <section className="rounded-2xl border border-orange-200 bg-orange-50 p-4 shadow-portal sm:p-5">
            <h2 className="text-[1.35rem] font-bold tracking-tight text-orange-700 sm:text-2xl">
              Study Progress
            </h2>
            <div className="mt-4 grid gap-2.5 sm:mt-5 sm:gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-xl border border-orange-200 bg-white px-3.5 py-3 sm:px-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  Questions
                </p>
                <p className="mt-1.5 text-xl font-bold text-orange-600 sm:mt-2 sm:text-2xl">{questions.length}</p>
              </div>
              <div className="rounded-xl border border-orange-200 bg-white px-3.5 py-3 sm:px-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  Ready Topics
                </p>
                <p className="mt-1.5 text-xl font-bold text-orange-600 sm:mt-2 sm:text-2xl">{readyTopics.length}</p>
              </div>
              <div className="rounded-xl border border-orange-200 bg-white px-3.5 py-3 sm:px-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  Completion
                </p>
                <p className="mt-1.5 text-xl font-bold text-orange-600 sm:mt-2 sm:text-2xl">
                  {progressStats.completionPercent}%
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </Layout>
  );
}
