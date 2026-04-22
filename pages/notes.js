import Link from "next/link";
import Layout from "../components/layout";
import PageBanner from "../components/PageBanner";
import { getLearningSubjects } from "../lib/learning-utils";
import { useLearningProgress } from "../lib/use-learning-progress";

export default function NotesPage() {
  const learningSubjects = getLearningSubjects();
  const { progressStats } = useLearningProgress();
  const readyNotesCount = learningSubjects.reduce(
    (subjectTotal, subject) =>
      subjectTotal +
      subject.chapters.reduce(
        (chapterTotal, chapter) =>
          chapterTotal + chapter.topics.filter((topic) => topic.status === "ready").length,
        0
      ),
    0
  );

  return (
    <Layout title="ECEExamHub | Notes">
      <div className="mx-auto max-w-6xl">
        <PageBanner
          eyebrow="Notes"
          title="Notes Library"
          description="Read quick theory notes, topic summaries, and revision-ready concepts."
          metrics={[
            { label: "Ready Notes", value: String(readyNotesCount) },
            { label: "Completion", value: `${progressStats.completionPercent}%` },
            { label: "View", value: "Separate" },
          ]}
        />

        <section className="mt-6 grid gap-4">
          {learningSubjects.map((subject) => {
            const subjectProgress = progressStats.subjects.find((item) => item.slug === subject.slug);
            const readyChapters = subject.chapters
              .map((chapter) => ({
                ...chapter,
                topics: chapter.topics.filter((topic) => topic.status === "ready"),
              }))
              .filter((chapter) => chapter.topics.length > 0);

            if (!readyChapters.length) {
              return null;
            }

            return (
              <article
                key={subject.slug}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">
                      {subject.weightage}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-slate-900">{subject.name}</h2>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {subject.description}
                    </p>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    {subjectProgress?.totalTopics || 0} ready topics
                  </div>
                </div>

                <div className="mt-4 grid gap-4">
                  {readyChapters.map((chapter) => (
                    <section
                      key={`${subject.slug}-${chapter.slug}`}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">
                            {chapter.title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {chapter.topics.length} note topic{chapter.topics.length === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 grid gap-3">
                        {chapter.topics.map((topic) => (
                          <div
                            key={`${subject.slug}-${chapter.slug}-${topic.slug}`}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-3"
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div className="min-w-0">
                                <h4 className="text-sm font-semibold text-slate-900">
                                  {topic.title}
                                </h4>
                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                  {topic.summary}
                                </p>
                                {(topic.subtopics || []).length ? (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {topic.subtopics.slice(0, 4).map((subtopic) => (
                                      <span
                                        key={`${topic.slug}-${subtopic}`}
                                        className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-600"
                                      >
                                        {subtopic}
                                      </span>
                                    ))}
                                  </div>
                                ) : null}
                              </div>

                              <Link
                                href={`/learn/${subject.slug}/${topic.slug}`}
                                className="inline-flex rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 transition hover:bg-amber-500 hover:text-white"
                              >
                                View Notes
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </Layout>
  );
}
