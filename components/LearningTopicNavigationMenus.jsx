import Link from "next/link";
import { useMemo, useState } from "react";
import { getLearningSubject } from "../lib/learning-utils";
import { getSubjectPagePathByLearningSlug } from "../lib/seo";

export default function LearningTopicNavigationMenus({ topic }) {
  const [openMenu, setOpenMenu] = useState("");
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

  if (!subjectTopics.length && !subtopics.length) {
    return null;
  }

  return (
    <div className="flex flex-none items-center gap-2">
      {subjectTopics.length ? (
        <div className="relative">
          <MenuButton
            isOpen={openMenu === "topics"}
            label={`Open ${topic.subjectName} topics`}
            onClick={() => setOpenMenu((value) => (value === "topics" ? "" : "topics"))}
            controls="learning-subject-topic-menu"
          />

          {openMenu === "topics" ? (
            <div
              id="learning-subject-topic-menu"
              className="absolute right-0 z-30 mt-2 max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
            >
              <MenuHeader
                title={`${topic.subjectName} Topics`}
                text="Jump directly to any topic in this subject."
              />
              <div className="grid gap-2">
                {subjectTopics.map((item, index) => {
                  const isActive = item.slug === topic.slug;

                  return (
                    <Link
                      key={`${item.chapterTitle}-${item.slug}`}
                      href={item.href}
                      onClick={() => setOpenMenu("")}
                      className={`rounded-xl border p-3 text-left transition ${
                        isActive
                          ? "border-portal-300 bg-portal-50"
                          : "border-slate-200 bg-[#f8fbff] hover:border-portal-300 hover:bg-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white text-xs font-black text-portal-700 shadow-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-black text-slate-950">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-xs font-semibold text-slate-600">
                            {item.chapterTitle}
                          </span>
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {subtopics.length ? (
        <div className="relative">
          <MenuButton
            isOpen={openMenu === "subtopics"}
            label={`Open ${topic.title} subtopics`}
            onClick={() => setOpenMenu((value) => (value === "subtopics" ? "" : "subtopics"))}
            controls="learning-topic-subtopic-menu"
          />

          {openMenu === "subtopics" ? (
            <div
              id="learning-topic-subtopic-menu"
              className="absolute right-0 z-30 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
            >
              <MenuHeader
                title={`${topic.title} Subtopics`}
                text="Quick view of subtopics inside this topic."
                tone="emerald"
              />
              <div className="grid gap-2">
                {subtopics.map((subtopic, index) => (
                  <div
                    key={subtopic}
                    className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-xs font-black text-emerald-700 shadow-sm">
                        {index + 1}
                      </span>
                      <span className="text-sm font-bold text-slate-900">{subtopic}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function MenuHeader({ title, text, tone = "portal" }) {
  const toneClass =
    tone === "emerald"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-portal-200 bg-portal-50 text-portal-700";

  return (
    <div className={`mb-2 rounded-xl border px-3 py-2 ${toneClass}`}>
      <p className="text-xs font-black uppercase tracking-[0.12em]">{title}</p>
      <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">{text}</p>
    </div>
  );
}

function MenuButton({ isOpen, label, onClick, controls }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls={controls}
    >
      {isOpen ? (
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
