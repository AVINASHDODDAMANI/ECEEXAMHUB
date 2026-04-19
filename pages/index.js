import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout";
import HeroSection from "../components/HeroSection";
import seedQuestions from "../data/questions";
import {
  getLearningSubjects,
  getLearningTopic,
  getReadyLearningTopics,
} from "../lib/learning-utils";
import { hasQuestionTag } from "../lib/question-utils";
import { useLearningProgress } from "../lib/use-learning-progress";
import { fetchQuestions } from "../lib/api-client";

const heroActions = [
  { label: "Start Learning", href: "/learn", variant: "primary" },
  { label: "Take a Mock Test", href: "/practice", variant: "secondary" },
];

const examTags = ["GATE", "ISRO", "BEL", "BARC"];
const paperExams = ["GATE", "ISRO", "DRDO", "BEL", "BARC"];

function SectionTitle({ id, title, description, actionLabel, actionHref }) {
  return (
    <div id={id} className="scroll-mt-28 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        ) : null}
      </div>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#1b53d1] hover:text-[#1b53d1]"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

export default function Home() {
  const [questions, setQuestions] = useState(seedQuestions);
  const learningSubjects = getLearningSubjects();
  const readyTopics = getReadyLearningTopics();
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

  const heroStats = [
    { label: "Questions", value: String(questions.length).padStart(2, "0") },
    { label: "Ready Topics", value: String(progressStats.totalTopics).padStart(2, "0") },
    { label: "Completion", value: `${progressStats.completionPercent}%` },
  ];

  const subjectCards = useMemo(
    () =>
      learningSubjects.map((subject) => {
        const subjectProgress = progressStats.subjects.find((item) => item.slug === subject.slug);
        const topicCount = subject.chapters.reduce(
          (total, chapter) => total + chapter.topics.length,
          0
        );

        return {
          ...subject,
          topicCount,
          readyCount: subjectProgress?.totalTopics || 0,
        };
      }),
    [learningSubjects, progressStats.subjects]
  );

  const paperCollections = useMemo(() => {
    return paperExams.map((examName) => {
      const examQuestions = questions.filter((question) =>
        (question.exam || []).includes(examName)
      );
      const years = Array.from(
        new Set(examQuestions.map((question) => question.year).filter(Boolean))
      ).sort((left, right) => right - left);

      return {
        exam: examName,
        count: examQuestions.length,
        latestYear: years[0] || "Soon",
        years,
        featured: examQuestions.slice(0, 3),
      };
    });
  }, [questions]);

  const mcqTopics = useMemo(
    () =>
      readyTopics.slice(0, 6).map((topic) => ({
        title: topic.title,
        subject: topic.subjectName,
        href: `/practice?search=${encodeURIComponent(topic.title)}`,
        summary: topic.summary,
      })),
    [readyTopics]
  );

  const noteCards = useMemo(
    () =>
      readyTopics.slice(0, 6).map((topic) => ({
        title: topic.title,
        subject: topic.subjectName,
        href: topic.href,
        summary: topic.summary,
      })),
    [readyTopics]
  );

  const formulaCards = useMemo(
    () =>
      readyTopics
        .map((topic) => {
          const enriched = getLearningTopic(topic.subjectSlug, topic.slug);
          const topFormula = enriched?.formulas?.[0];

          if (!topFormula) {
            return null;
          }

          return {
            title: topFormula.label,
            expression: topFormula.expression,
            note: topFormula.note,
            topicTitle: topic.title,
            href: topic.href,
          };
        })
        .filter(Boolean)
        .slice(0, 6),
    [readyTopics]
  );

  const importantQuestions = useMemo(
    () => questions.filter((question) => hasQuestionTag(question, "important")),
    [questions]
  );

  const mockTests = useMemo(() => {
    const repeated = questions.filter((question) => hasQuestionTag(question, "repeated"));

    return [
      {
        title: "Important Questions Mock",
        subtitle: "Solve the most important questions first",
        count: importantQuestions.length,
        href: "/practice?search=important",
      },
      {
        title: "Repeated Questions Mock",
        subtitle: "Practice the questions that appear again and again",
        count: repeated.length,
        href: "/previous-year?search=repeated",
      },
      {
        title: "Subject Focus Mock",
        subtitle: "Take a topic-wise test from your current weak areas",
        count: readyTopics.length,
        href: "/practice",
      },
    ];
  }, [importantQuestions.length, questions, readyTopics.length]);

  return (
    <Layout title="ECEExamHub | Home" pageClassName="pt-5">
      <div className="mx-auto max-w-6xl">
        <HeroSection stats={heroStats} actions={heroActions} examTags={examTags} />

        <section className="mt-8">
          <SectionTitle
            id="subjects"
            title="Subjects"
            description="Only subject-wise access lives here. Open a subject and go directly to its chapters and theory notes."
            actionLabel="Open Learn"
            actionHref="/learn"
          />
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {subjectCards.map((subject, index) => {
              const accents = [
                "from-[#173ea7] to-[#305ed8]",
                "from-[#2b6af0] to-[#1847b7]",
                "from-[#0e7b7b] to-[#0c596d]",
              ];

              return (
                <article
                  key={subject.slug}
                  className={`rounded-[1.5rem] bg-gradient-to-br ${accents[index % accents.length]} p-4 text-white shadow-[0_18px_40px_rgba(23,67,176,0.18)]`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    Subject
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight">{subject.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/80">{subject.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/80">
                    <span>{subject.weightage}</span>
                    <span>{subject.topicCount} topics</span>
                    <span>{subject.readyCount} ready</span>
                  </div>
                  <Link
                    href="/learn"
                    className="mt-4 inline-flex rounded-xl border border-white/25 bg-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Access All Chapters
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle
            id="previous-papers"
            title="Previous Papers"
            description="This section is only for previous year papers and exam-wise coverage across GATE, ISRO, DRDO, BEL, and related exam collections."
            actionLabel="View All Papers"
            actionHref="/previous-year"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {paperCollections.map((item, index) => (
              <span
                key={item.exam}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  index === 0
                    ? "bg-[#1b53d1] text-white"
                    : "border border-slate-200 bg-white text-slate-700"
                }`}
              >
                {item.exam}
              </span>
            ))}
          </div>
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
            <div className="grid gap-3">
              {paperCollections.map((item) => (
                <article
                  key={item.exam}
                  className="rounded-[1.3rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{item.exam} Papers</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        Latest year: {item.latestYear} | Total items: {item.count}
                      </p>
                    </div>
                    <Link
                      href={`/previous-year?exam=${encodeURIComponent(item.exam)}`}
                      className="inline-flex rounded-xl bg-[#1b53d1] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-105"
                    >
                      View Papers
                    </Link>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.years.length ? (
                      item.years.slice(0, 5).map((year) => (
                        <span
                          key={`${item.exam}-${year}`}
                          className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {year}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                        Collection building in progress
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slatebrand-500">
                Exam Coverage
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                Previous year access by exam and year
              </h3>
              <div className="mt-4 grid gap-3">
                {paperCollections.map((item) => (
                  <div
                    key={`summary-${item.exam}`}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-slate-900">{item.exam}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.count ? `${item.count} question entries available` : "Adding previous papers next"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle
            id="mcqs"
            title="MCQs"
            description="This section is only for practice questions users solve topic-wise."
            actionLabel="Open Practice"
            actionHref="/practice"
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {mcqTopics.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.3rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slatebrand-500">
                  {item.subject}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex rounded-xl bg-[#1b53d1] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-105"
                >
                  Start MCQs
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle
            id="notes"
            title="Notes"
            description="This section contains only study notes and theory pages. Duplicates are removed."
            actionLabel="Browse Notes"
            actionHref="/learn"
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {noteCards.map((item) => (
              <article
                key={`note-${item.title}`}
                className="rounded-[1.3rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slatebrand-500">
                  {item.subject}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#1b53d1] hover:text-[#1b53d1]"
                >
                  View Notes
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle
            id="formulas"
            title="Formulas"
            description="This section contains only formulas and quick formula-based revision entries."
            actionLabel="Search Formulas"
            actionHref="/learn?search=formula"
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {formulaCards.map((item) => (
              <article
                key={`${item.topicTitle}-${item.title}`}
                className="rounded-[1.3rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slatebrand-500">
                  {item.topicTitle}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 rounded-xl bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-900">
                  {item.expression}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#1b53d1] hover:text-[#1b53d1]"
                >
                  View Formula
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle
            id="mock-tests"
            title="Mock Tests"
            description="This section is built from important and repeated questions users should solve first."
            actionLabel="Start Practice"
            actionHref="/practice"
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {mockTests.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-[1.3rem] p-4 text-white shadow-[0_18px_38px_rgba(23,67,176,0.16)] ${
                  index === 0
                    ? "bg-[linear-gradient(135deg,#1b53d1_0%,#1743b0_100%)]"
                    : index === 1
                    ? "bg-[linear-gradient(135deg,#1f8b4b_0%,#176a39_100%)]"
                    : "bg-[linear-gradient(135deg,#3c4f7e_0%,#293861_100%)]"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                  Mock Set
                </p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/80">{item.subtitle}</p>
                <p className="mt-3 text-sm font-semibold">{item.count} items ready</p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex rounded-xl border border-white/20 bg-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Start Mock
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
