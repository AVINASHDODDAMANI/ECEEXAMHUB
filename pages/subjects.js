import Link from "next/link";
import { useMemo } from "react";
import Layout from "../components/layout";
import PageBanner from "../components/PageBanner";
import { getLearningSubjects } from "../lib/learning-utils";
import { useLearningProgress } from "../lib/use-learning-progress";

export default function SubjectsPage() {
  const learningSubjects = getLearningSubjects();
  const { progressStats } = useLearningProgress();

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

  return (
    <Layout title="ECEExamHub | Subjects">
      <div className="mx-auto max-w-6xl">
        <PageBanner
          eyebrow="Subjects"
          title="Pick Your Subject"
          description="Open a subject and move straight into its chapter-wise learning flow."
          metrics={[
            { label: "Subjects", value: String(learningSubjects.length) },
            { label: "Ready Topics", value: String(progressStats.totalTopics) },
            { label: "Completion", value: `${progressStats.completionPercent}%` },
          ]}
        />

        <section className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {subjectCards.map((subject, index) => {
            const accents = [
              "from-[#173ea7] to-[#305ed8]",
              "from-[#2b6af0] to-[#1847b7]",
              "from-[#0e7b7b] to-[#0c596d]",
            ];

            return (
              <article
                key={subject.slug}
                className={`rounded-lg bg-gradient-to-br ${accents[index % accents.length]} p-3.5 text-white shadow-[0_18px_40px_rgba(23,67,176,0.18)]`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                  Subject
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight">{subject.name}</h2>
                <p className="mt-1.5 text-sm leading-5 text-white/80">{subject.description}</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] text-white/80">
                  <span className="rounded-md border border-white/20 bg-white/10 px-2 py-1">{subject.weightage}</span>
                  <span className="rounded-md border border-white/20 bg-white/10 px-2 py-1">{subject.topicCount} topics</span>
                  <span className="rounded-md border border-white/20 bg-white/10 px-2 py-1">{subject.readyCount} ready</span>
                </div>
                <Link
                  href="/learn"
                  className="mt-3 inline-flex rounded-lg border border-white/25 bg-white/15 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  Access Subject
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    </Layout>
  );
}
