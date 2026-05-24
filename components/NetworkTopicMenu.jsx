import { useEffect, useRef, useState } from "react";

const networkTopics = [
  {
    title: "Basic Concepts",
    href: "/basic-concepts",
    subtopics: ["Charge", "Current", "Voltage", "Power", "Energy", "Active and passive elements"],
  },
  {
    title: "Circuit Elements",
    href: "/circuit-elements",
    subtopics: ["Resistor", "Capacitor", "Inductor", "Independent Voltage Source", "Independent Current Source", "Dependent Source", "Source Transformation"],
  },
  {
    title: "Circuit Laws",
    href: "/circuit-laws",
    subtopics: ["Ohm's Law", "Kirchhoff's Current Law (KCL)", "Kirchhoff's Voltage Law (KVL)"],
  },
  {
    title: "Network Theorems",
    href: "/network-theorems",
    subtopics: ["Superposition Theorem", "Thevenin's Theorem", "Norton's Theorem", "Maximum Power Transfer Theorem", "Reciprocity Theorem", "Millman's Theorem", "Star-Delta Transformation"],
  },
  {
    title: "DC Circuit Analysis",
    href: "/dc-circuit-analysis",
    subtopics: ["Basic Analysis", "Nodal Analysis", "Mesh Analysis", "Source Transformation", "Thevenin and Norton Methods", "Superposition Method"],
  },
  {
    title: "AC Fundamentals",
    href: "/ac-fundamentals",
    subtopics: ["Alternating Current", "Basic AC Quantities", "RMS, Average, and Peak Values", "Phase and Phase Difference", "AC Circuit Elements", "Impedance", "Power Factor"],
  },
  {
    title: "AC Circuit Analysis",
    href: "/ac-circuit-analysis",
    subtopics: ["Sinusoidal Signals", "Phasor Representation", "Impedance", "Series RLC Circuit Analysis", "Parallel RLC Circuit Analysis", "Resonance", "Power Factor"],
  },
  {
    title: "Transient Analysis",
    href: "/transient-analysis",
    subtopics: ["Transient Analysis", "RC Circuit Transient Analysis", "RC Discharging", "RL Circuit Transient Analysis", "Initial and Final Conditions", "General Transient Formula"],
  },
  {
    title: "Network Topology",
    href: "/network-topology",
    subtopics: ["Network Topology", "Basic Terms in Network Topology", "Tree in Network Topology", "Tie-Set or Loop Matrix", "Cut-Set or Node Separation", "Incidence Matrix"],
  },
  {
    title: "Laplace Transform Methods",
    href: "/laplace-transform-methods",
    subtopics: ["Laplace Transform", "s-domain Circuit Model", "Initial and Final Value Theorems", "Partial Fractions", "Transfer Function"],
  },
  {
    title: "Frequency Domain Analysis",
    href: "/frequency-domain-analysis",
    subtopics: ["Frequency Domain Analysis", "Sinusoidal Signals and Phasors", "Impedance", "RLC Series Circuit Analysis", "Resonance", "Frequency Response"],
  },
  {
    title: "Two-Port Networks",
    href: "/two-port-networks",
    subtopics: ["Z-Parameters", "Y-Parameters", "h-Parameters", "ABCD Parameters", "Reciprocity and Symmetry", "Conversion Between Parameters"],
  },
  {
    title: "Filters",
    href: "/filters",
    subtopics: ["Low Pass Filter", "High Pass Filter", "Band Pass Filter", "Band Stop Filter", "Cutoff frequency", "Bandwidth"],
  },
  {
    title: "Network Functions",
    href: "/network-functions",
    subtopics: ["Network Function", "Driving point function", "Transfer function", "Poles", "Zeros", "Frequency Response from H(s)"],
  },
];

function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function findSubtopicTarget(label) {
  const normalizedLabel = normalizeText(label);
  const headings = Array.from(document.querySelectorAll("h2, h3"));

  return (
    headings.find((heading) => normalizeText(heading.textContent) === normalizedLabel) ||
    headings.find((heading) => normalizeText(heading.textContent).includes(normalizedLabel)) ||
    headings.find((heading) => normalizedLabel.includes(normalizeText(heading.textContent)))
  );
}

export default function NetworkTopicMenu({ currentPath = "" }) {
  const [isSubtopicOpen, setIsSubtopicOpen] = useState(false);
  const menuRootRef = useRef(null);
  const currentTopic = networkTopics.find((topic) => topic.href === currentPath);
  const currentSubtopics = currentTopic?.subtopics || [];

  useEffect(() => {
    if (!isSubtopicOpen) {
      return undefined;
    }

    let lastScrollX = window.scrollX;
    let lastScrollY = window.scrollY;

    function handlePointerDown(event) {
      if (!menuRootRef.current?.contains(event.target)) {
        setIsSubtopicOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsSubtopicOpen(false);
      }
    }

    function handleScroll() {
      const moved = Math.abs(window.scrollX - lastScrollX) + Math.abs(window.scrollY - lastScrollY);

      if (moved > 8) {
        setIsSubtopicOpen(false);
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
  }, [isSubtopicOpen]);

  if (!currentSubtopics.length) {
    return null;
  }

  function jumpToSubtopic(subtopic) {
    const target = findSubtopicTarget(subtopic);

    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "auto" });
    }

    setIsSubtopicOpen(false);
  }

  return (
    <div ref={menuRootRef} className="relative flex-none">
      <MenuButton
        isOpen={isSubtopicOpen}
        label={`Open ${currentTopic.title} subtopics`}
        onClick={() => setIsSubtopicOpen((value) => !value)}
        controls="network-subtopic-popover"
      />

      {isSubtopicOpen ? (
        <div
          id="network-subtopic-popover"
          className="absolute right-0 z-30 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
              {currentTopic.title} Subtopics
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">
              Quick view of subtopics inside this topic.
            </p>
          </div>

          <div className="grid gap-2">
            {currentSubtopics.map((subtopic, index) => (
              <button
                type="button"
                key={subtopic}
                onClick={() => jumpToSubtopic(subtopic)}
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-emerald-300 hover:bg-white"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-xs font-black text-emerald-700 shadow-sm">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{subtopic}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
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
