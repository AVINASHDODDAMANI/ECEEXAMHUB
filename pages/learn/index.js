import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import LearningTopicCard from "../../components/LearningTopicCard";
import PageBanner from "../../components/PageBanner";
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
      <PageBanner
        eyebrow="Theory Library"
        title="Find theory quickly, understand it simply, and revise it faster"
        description="Browse concept notes, formulas, mistakes, and quick revision summaries in a smaller library layout."
        metrics={[
          { label: "Ready", value: String(progressStats.totalTopics) },
          { label: "Subjects", value: String(subjects.length) },
          { label: "Revision", value: String(revisionCount) },
        ]}
      />

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Theory Search
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            Concepts, formulas, mistakes, and revision points
          </h2>
          {search ? (
            <div className="mt-4 grid gap-3">
              {searchResults.length ? (
                searchResults.map((result) => (
                  <Link
                    key={result.href}
                    href={result.href}
                    className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-slatebrand-300"
                  >
                    <p className="text-sm font-semibold text-slatebrand-700">
                      {result.subjectName} | {result.chapterTitle}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                      {result.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{result.summary}</p>
                    {result.matchedSubtopics.length ? (
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                        Subtopics: {result.matchedSubtopics.join(" | ")}
                      </p>
                    ) : null}
                    {result.matchedConcepts.length ? (
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                        Concepts: {result.matchedConcepts.join(" | ")}
                      </p>
                    ) : null}
                    {result.matchedFormulas.length ? (
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                        Formulas: {result.matchedFormulas.map((formula) => formula.label).join(" | ")}
                      </p>
                    ) : null}
                    {result.matchedTheorySnippets.length ? (
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                        Theory: {result.matchedTheorySnippets.join(" | ")}
                      </p>
                    ) : null}
                  </Link>
                ))
              ) : (
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  No ready learning module matched that search yet. Try Flip-Flops,
                  Laplace, CMOS, or settling time.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-4 rounded-[1.2rem] border border-dashed border-slate-300 bg-slate-50 p-4">
              <p className="text-sm leading-6 text-slate-600">
                Example searches: KCL, flip-flop, resonance, damping ratio, CMOS,
                virtual ground, race around, settling time.
              </p>
            </div>
          )}
        </div>

        <ProgressOverview progressStats={progressStats} compact />
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-2">
        <article className="rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Upcoming Exams Syllabus
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            What to finish for the next exam cycle
          </h2>
          <div className="mt-4 grid gap-3">
            {upcomingExamSyllabus.map((section) => (
              <div key={section.title} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
                    {section.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{section.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
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

        <article className="rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
            Previous Exams Syllabus
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            How to revise from older papers
          </h2>
          <div className="mt-4 grid gap-3">
            {previousExamArchives.map((section) => (
              <div key={section.title} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-orange-700">
                    {section.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{section.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
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

      <section className="mt-6 grid gap-4">
        {subjects.map((subject) => (
          <article
            key={subject.slug}
            className="rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)]"
          >
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slatebrand-500">
                  {subject.weightage}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  {subject.name}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                  {subject.description}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.1rem] bg-slate-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Progress
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {progressStats.subjects.find((item) => item.slug === subject.slug)?.completionPercent || 0}%
                  </p>
                </div>
                <div className="rounded-[1.1rem] bg-slate-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Chapters
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {subject.chapters.length}
                  </p>
                </div>
                <div className="rounded-[1.1rem] bg-slate-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Topics
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {subject.chapters.reduce((total, chapter) => total + chapter.topics.length, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              {subject.chapters.map((chapter) => (
                <section key={chapter.slug} className="rounded-[1.3rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{chapter.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">
                        Topic-by-topic notes and subtopic breakdowns.
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

                  <div className="mt-3 grid gap-3 lg:grid-cols-2">
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
