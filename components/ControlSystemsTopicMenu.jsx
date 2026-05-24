import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const controlSystemTopics = [
  { title: "Introduction to Control Systems", href: "/introduction-to-control-systems" },
  { title: "Mathematical Modeling of Systems", href: "/mathematical-modeling-of-systems" },
  { title: "Block Diagram and Signal Flow Graph", href: "/block-diagram-and-signal-flow-graph" },
  { title: "Time Response Analysis", href: "/time-response-analysis" },
  { title: "Stability Analysis", href: "/stability-analysis" },
  { title: "Root Locus Technique", href: "/root-locus-technique" },
  { title: "Frequency Response Analysis", href: "/frequency-response-analysis" },
  { title: "Controllers and Compensators", href: "/controllers-and-compensators" },
  { title: "State Space Analysis", href: "/state-space-analysis" },
  { title: "Control System Design", href: "/control-system-design" },
];

export default function ControlSystemsTopicMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRootRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!menuRootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={menuRootRef} className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Control Systems topics"
        aria-expanded={isOpen}
        aria-controls="control-systems-topic-menu"
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
          id="control-systems-topic-menu"
          className="absolute right-0 z-30 mt-2 max-h-[72vh] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
              Control Systems Topics
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-700">
              Jump directly to any Control Systems topic.
            </p>
          </div>

          <div className="grid gap-2">
            {controlSystemTopics.map((topic, index) => (
              <Link
                key={topic.title}
                href={topic.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
              >
                <span className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="block text-sm font-black leading-snug text-slate-950">
                    {topic.title}
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
