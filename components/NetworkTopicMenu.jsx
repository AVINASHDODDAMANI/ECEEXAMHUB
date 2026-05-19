import Link from "next/link";
import { useState } from "react";

const networkTopics = [
  {
    title: "Basic Concepts",
    href: "/basic-concepts",
    subtopics: ["Charge", "Current", "Voltage", "Power", "Energy", "Active and passive elements"],
  },
  {
    title: "Circuit Elements",
    href: "/circuit-elements",
    subtopics: ["Resistor", "Capacitor", "Inductor", "Independent sources", "Dependent sources"],
  },
  {
    title: "Circuit Laws",
    href: "/circuit-laws",
    subtopics: ["Ohm's Law", "Kirchhoff's Current Law (KCL)", "Kirchhoff's Voltage Law (KVL)"],
  },
  {
    title: "Network Theorems",
    href: "/network-theorems",
    subtopics: ["Superposition", "Thevenin theorem", "Norton theorem", "Maximum power transfer"],
  },
  {
    title: "DC Circuit Analysis",
    href: "/dc-circuit-analysis",
    subtopics: ["Nodal analysis", "Mesh analysis", "Supernode", "Supermesh", "Dependent sources"],
  },
  {
    title: "AC Fundamentals",
    href: "/ac-fundamentals",
    subtopics: ["RMS value", "Phasors", "Impedance", "Reactance", "Power factor"],
  },
  {
    title: "AC Circuit Analysis",
    href: "/ac-circuit-analysis",
    subtopics: ["Series RLC", "Parallel RLC", "Resonance", "Quality factor", "Bandwidth"],
  },
  {
    title: "Transient Analysis",
    href: "/transient-analysis",
    subtopics: ["RC transient", "RL transient", "RLC transient", "Initial condition", "Final condition"],
  },
  {
    title: "Network Topology",
    href: "/network-topology",
    subtopics: ["Graph", "Tree", "Twig and link", "Tie-set matrix", "Cut-set matrix"],
  },
  {
    title: "Laplace Transform Methods",
    href: "/laplace-transform-methods",
    subtopics: ["s-domain model", "Initial value theorem", "Final value theorem", "Partial fractions"],
  },
  {
    title: "Frequency Domain Analysis",
    href: "/frequency-domain-analysis",
    subtopics: ["Frequency response", "Bode idea", "Filter response", "Poles and zeros"],
  },
  {
    title: "Two-Port Networks",
    href: "/two-port-networks",
    subtopics: ["Z parameters", "Y parameters", "h parameters", "ABCD parameters", "Reciprocity"],
  },
  {
    title: "Filters",
    href: "/filters",
    subtopics: ["Low-pass", "High-pass", "Band-pass", "Band-stop", "Cutoff frequency"],
  },
  {
    title: "Network Functions",
    href: "/network-functions",
    subtopics: ["Driving-point function", "Transfer function", "Poles", "Zeros", "Stability"],
  },
];

export default function NetworkTopicMenu({ currentPath = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubtopicOpen, setIsSubtopicOpen] = useState(false);
  const currentTopic = networkTopics.find((topic) => topic.href === currentPath);
  const currentSubtopics = currentTopic?.subtopics || [];

  return (
    <div className="flex flex-none items-center gap-2">
      <div className="relative">
        <MenuButton
          isOpen={isOpen}
          label="Open Network Analysis topics"
          onClick={() => {
            setIsOpen((value) => !value);
            setIsSubtopicOpen(false);
          }}
          controls="network-topic-popover"
        />

        {isOpen ? (
          <div
            id="network-topic-popover"
            className="absolute right-0 z-30 mt-2 max-h-[70vh] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
          >
            <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
                Network Analysis Topics
              </p>
              <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">
                Jump directly to any topic in this subject.
              </p>
            </div>

            <div className="grid gap-2">
              {networkTopics.map((topic, index) => {
                const isActive = currentPath === topic.href;

                return (
                  <Link
                    key={topic.href}
                    href={topic.href}
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

      {currentSubtopics.length ? (
        <div className="relative">
          <MenuButton
            isOpen={isSubtopicOpen}
            label={`Open ${currentTopic.title} subtopics`}
            onClick={() => {
              setIsSubtopicOpen((value) => !value);
              setIsOpen(false);
            }}
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
