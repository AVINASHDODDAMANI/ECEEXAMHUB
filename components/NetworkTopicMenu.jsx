import Link from "next/link";
import { useState } from "react";
import { networkAnalysisTopicPages } from "../data/network-analysis-topic-pages";

export default function NetworkTopicMenu({ currentPath = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Network Analysis topics"
        aria-expanded={isOpen}
        aria-controls="network-topic-popover"
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
          id="network-topic-popover"
          className="absolute right-0 z-30 mt-2 max-h-[70vh] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
              Network Analysis
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">
              Jump directly to any topic in this subject.
            </p>
          </div>

          <div className="grid gap-2">
            {networkAnalysisTopicPages.map((topic, index) => {
              const isActive = currentPath === topic.route;

              return (
                <Link
                  key={topic.slug}
                  href={topic.route}
                  onClick={() => setIsOpen(false)}
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
                      <span className="block text-sm font-black text-slate-950">{topic.title}</span>
                      <span className="mt-1 block text-xs font-semibold text-slate-600">
                        {isActive ? "Current topic" : "Open topic"}
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
  );
}
