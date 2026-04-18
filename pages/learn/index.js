import Link from "next/link";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import LearningTopicCard from "../../components/LearningTopicCard";
import ProgressOverview from "../../components/ProgressOverview";
import { previousExamArchives, upcomingExamSyllabus } from "../../data/exam-roadmaps";
import {
  getLearningSubjects,
  searchLearningContent,
} from "../../lib/learning-utils";
import { useLearningProgress } from "../../lib/use-learning-progress";

export default function LearnPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const subjects = getLearningSubjects();
  const { progressStats, revisionCount } = useLearningProgress();
  const searchResults = useMemo(() => searchLearningContent(search), [search]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const routeSearch =
      typeof router.query.search === "string" ? router.query.search : "";
    setSearch(routeSearch);
  }, [router.isReady, router.query.search]);

  return (
    <Layout title="ECEExamHub | Learn" searchValue={search} onSearchChange={setSearch}>
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[2rem] bg-slatebrand-900 p-8 text-white shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-300">
            Learn Concepts
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            Move from question practice to complete chapter-wise ECE preparation.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slatebrand-100">
            Each ready topic combines explanation, formulas, PYQs, practice flow, and
            important-question signals in one place. Use the search bar to find a concept,
            topic, or formula and jump straight into revision.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slatebrand-700 bg-slatebrand-800/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slatebrand-300">
                Ready modules
              </p>
              <p className="mt-3 text-3xl font-semibold">{progressStats.totalTopics}</p>
            </div>
            <div className="rounded-3xl border border-slatebrand-700 bg-slatebrand-800/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slatebrand-300">
                Subjects
              </p>
              <p className="mt-3 text-3xl font-semibold">{subjects.length}</p>
            </div>
            <div className="rounded-3xl border border-slatebrand-700 bg-slatebrand-800/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slatebrand-300">
                Completion
              </p>
              <p className="mt-3 text-3xl font-semibold">
                {progressStats.completionPercent}%
              </p>
            </div>
            <div className="rounded-3xl border border-slatebrand-700 bg-slatebrand-800/70 p-4 sm:col-span-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slatebrand-300">
                Revision list
              </p>
              <p className="mt-3 text-3xl font-semibold">{revisionCount}</p>
              <p className="mt-2 text-sm text-slatebrand-100">
                Topics saved for revision are stored in this browser and will stay ready for quick review.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Search Intelligence
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Concepts, topics, and formulas
          </h2>
          {search ? (
            <div className="mt-5 grid gap-4">
              {searchResults.length ? (
                searchResults.map((result) => (
                  <Link
                    key={result.href}
                    href={result.href}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-slatebrand-300"
                  >
                    <p className="text-sm font-semibold text-slatebrand-700">
                      {result.subjectName} | {result.chapterTitle}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                      {result.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{result.summary}</p>
                    {result.matchedSubtopics.length ? (
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                        Subtopic matches: {result.matchedSubtopics.join(" | ")}
                      </p>
                    ) : null}
                    {result.matchedConcepts.length ? (
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                        Matches: {result.matchedConcepts.join(" | ")}
                      </p>
                    ) : null}
                    {result.matchedFormulas.length ? (
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                        Formula matches:{" "}
                        {result.matchedFormulas.map((formula) => formula.label).join(" | ")}
                      </p>
                    ) : null}
                  </Link>
                ))
              ) : (
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  No ready learning module matched that search yet. Try a topic like
                  {" "}Flip-Flops, Laplace, or CMOS.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="text-sm leading-7 text-slate-600">
                Example searches: KCL, flip-flop, resonance, damping ratio, CMOS,
                virtual ground.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mt-8">
        <ProgressOverview progressStats={progressStats} />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <article className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Upcoming Exams Syllabus
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            What to finish for the next exam cycle
          </h2>
          <div className="mt-6 grid gap-4">
            {upcomingExamSyllabus.map((section) => (
              <div key={section.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
                    {section.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{section.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {section.focusAreas.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Previous Exams Syllabus
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            How to revise from older papers
          </h2>
          <div className="mt-6 grid gap-4">
            {previousExamArchives.map((section) => (
              <div key={section.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-orange-700">
                    {section.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{section.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {section.focusAreas.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8 grid gap-6">
        {subjects.map((subject) => (
          <article
            key={subject.slug}
            className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-panel"
          >
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
                  {subject.weightage}
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                  {subject.name}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  {subject.description}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-50 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Progress
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {progressStats.subjects.find((item) => item.slug === subject.slug)?.completionPercent || 0}%
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Chapters
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {subject.chapters.length}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Topics
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {subject.chapters.reduce((total, chapter) => total + chapter.topics.length, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6">
              {subject.chapters.map((chapter) => (
                <section key={chapter.slug} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{chapter.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">
                        This chapter includes topic-by-topic learning blocks and subtopic breakdowns.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-700">
                        {chapter.topics.length} topics
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slatebrand-700">
                        {chapter.topics.reduce(
                          (total, topic) => total + (topic.subtopics || []).length,
                          0
                        )}{" "}
                        subtopics
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    {chapter.topics.map((topic) => (
                      <LearningTopicCard
                        key={`${subject.slug}-${chapter.slug}-${topic.slug}`}
                        topic={{
                          ...topic,
                          href: `/learn/${subject.slug}/${topic.slug}`,
                        }}
                        chapterTitle={chapter.title}
                        subjectName={subject.name}
                        subjectWeightage={subject.weightage}
                        progressPercent={
                          progressStats.subjects.find((item) => item.slug === subject.slug)
                            ?.completionPercent || 0
                        }
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>
    </Layout>
  );
}
