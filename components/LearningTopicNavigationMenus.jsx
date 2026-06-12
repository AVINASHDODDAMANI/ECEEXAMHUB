import Link from "next/link";
import { useMemo } from "react";
import { getLearningSubject } from "../lib/learning-utils";
import { getSubjectPagePathByLearningSlug } from "../lib/seo";

export default function LearningTopicNavigationMenus({ topic, mode = "all" }) {
  const subject = useMemo(
    () => getLearningSubject(topic.subjectSlug),
    [topic.subjectSlug]
  );
  const subjectTopics = useMemo(() => {
    if (!subject) {
      return [];
    }

    return subject.chapters.flatMap((chapter) =>
      chapter.topics.map((item) => ({
        ...item,
        chapterTitle: chapter.title,
        href:
          item.status === "ready"
            ? `/learn/${subject.slug}/${item.slug}`
            : getSubjectPagePathByLearningSlug(subject.slug),
      }))
    );
  }, [subject]);
  const subtopics = topic.subtopics || [];

  const showSubjectTopics = mode !== "subtopics" && subjectTopics.length > 0;
  const showSubtopics = mode !== "topics" && subtopics.length > 0;

  if (!showSubjectTopics && !showSubtopics) {
    return null;
  }

  return (
    <div className="flex max-w-full flex-none flex-wrap items-center justify-end gap-2">
      {showSubjectTopics ? (
        <nav
          aria-label={`${topic.subjectName} topic links`}
          className="flex max-w-full flex-wrap justify-end gap-2"
        >
          {subjectTopics.map((item, index) => {
            const isActive = item.slug === topic.slug;

            return (
              <Link
                key={`${item.chapterTitle}-${item.slug}`}
                href={item.href}
                title={`${item.title} - ${item.chapterTitle}`}
                className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold shadow-sm transition ${
                  isActive
                    ? "border-portal-300 bg-portal-50 text-portal-800"
                    : "border-portal-200 bg-white text-slate-800 hover:border-portal-300 hover:bg-portal-50"
                }`}
              >
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-white text-[10px] font-black text-portal-700 shadow-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="max-w-[11rem] truncate">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      ) : null}

      {showSubtopics ? (
        <div
          aria-label={`${topic.title} subtopics`}
          className="flex max-w-full flex-wrap justify-end gap-2"
        >
          {subtopics.map((subtopic, index) => (
            <span
              key={subtopic}
              title={subtopic}
              className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800"
            >
              <span className="flex h-5 w-5 flex-none items-center justify-center rounded-md bg-white text-[10px] font-black text-emerald-700 shadow-sm">
                {index + 1}
              </span>
              <span className="max-w-[11rem] truncate">{subtopic}</span>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
