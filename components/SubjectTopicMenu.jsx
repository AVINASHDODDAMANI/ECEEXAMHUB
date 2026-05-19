import Link from "next/link";
import { useMemo, useState } from "react";
import { getLearningSubject } from "../lib/learning-utils";
import { getSubjectPagePathByLearningSlug } from "../lib/seo";

const subjectToLearningSlug = {
  "Network Analysis": "networks",
  "Analog Electronics": "analog",
  "Digital Electronics": "digital",
  "Signals and Systems": "signals",
  "Communication Systems": "communications",
  "Electromagnetic Theory": "electromagnetics",
  Microprocessors: "microprocessors",
  "Digital Signal Processing": "dsp",
  "Control Systems": "control-systems",
  "VLSI Design": "vlsi-design",
  "Antenna & Wave Propagation": "antenna-wave-propagation",
  "Embedded Systems": "embedded-systems",
};

export default function SubjectTopicMenu({ subjectTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const learningSlug = subjectToLearningSlug[subjectTitle];
  const subject = useMemo(
    () => (learningSlug ? getLearningSubject(learningSlug) : null),
    [learningSlug]
  );
  const topics = useMemo(() => {
    if (!subject) {
      return [];
    }

    return subject.chapters.flatMap((chapter) =>
      chapter.topics.map((topic) => ({
        ...topic,
        chapterTitle: chapter.title,
        href:
          topic.status === "ready"
            ? `/learn/${subject.slug}/${topic.slug}`
            : getSubjectPagePathByLearningSlug(subject.slug),
      }))
    );
  }, [subject]);

  if (!topics.length) {
    return null;
  }

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label={`Open ${subjectTitle} topics`}
        aria-expanded={isOpen}
        aria-controls="subject-topic-popover"
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

      {isOpen ? (
        <div
          id="subject-topic-popover"
          className="absolute right-0 z-30 mt-2 max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
              {subjectTitle} Topics
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">
              Jump directly to any topic in this subject.
            </p>
          </div>

          <div className="grid gap-2">
            {topics.map((topic, index) => (
              <Link
                key={`${topic.chapterTitle}-${topic.slug}`}
                href={topic.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white text-xs font-black text-portal-700 shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black text-slate-950">{topic.title}</span>
                    <span className="mt-1 block text-xs font-semibold text-slate-600">
                      {topic.chapterTitle}
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
