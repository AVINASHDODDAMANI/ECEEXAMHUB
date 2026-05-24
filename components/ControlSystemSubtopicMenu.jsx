import { useEffect, useRef, useState } from "react";

export default function ControlSystemSubtopicMenu({ title, subtopics = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRootRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    let lastScrollX = window.scrollX;
    let lastScrollY = window.scrollY;

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

    function handleScroll() {
      const moved = Math.abs(window.scrollX - lastScrollX) + Math.abs(window.scrollY - lastScrollY);

      if (moved > 8) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  if (!subtopics.length) {
    return null;
  }

  function jumpToSubtopic(targetId) {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsOpen(false);
  }

  return (
    <div ref={menuRootRef} className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label={`Open ${title} subtopics`}
        aria-expanded={isOpen}
        aria-controls="control-system-subtopic-menu"
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
          id="control-system-subtopic-menu"
          className="absolute right-0 z-30 mt-2 max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
              {title} Subtopics
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">
              Jump inside this topic.
            </p>
          </div>

          <div className="grid gap-2">
            {subtopics.map((subtopic, index) => (
              <button
                key={subtopic.label}
                type="button"
                onClick={() => jumpToSubtopic(subtopic.targetId)}
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-emerald-300 hover:bg-white"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white text-xs font-black text-emerald-700 shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-black text-slate-950">{subtopic.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
