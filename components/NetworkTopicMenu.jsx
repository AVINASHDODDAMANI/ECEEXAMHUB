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
  const currentTopic = networkTopics.find((topic) => topic.href === currentPath);
  const currentSubtopics = currentTopic?.subtopics || [];

  if (!currentSubtopics.length) {
    return null;
  }

  function jumpToSubtopic(event, subtopic) {
    event.preventDefault();
    const target = findSubtopicTarget(subtopic);

    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "auto" });
      if (target.id) {
        window.history.replaceState(null, "", `#${target.id}`);
      }
    }
  }

  return (
    <nav
      aria-label={`${currentTopic.title} subtopic links`}
      className="flex max-w-full flex-wrap justify-end gap-2"
    >
      {currentSubtopics.map((subtopic, index) => (
        <a
          key={subtopic}
          href={`#${normalizeText(subtopic).replaceAll(" ", "-")}`}
          onClick={(event) => jumpToSubtopic(event, subtopic)}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-left text-xs font-bold text-slate-800 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
        >
          <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-emerald-50 text-[10px] font-black text-emerald-700">
            {index + 1}
          </span>
          <span className="max-w-[12rem] truncate">{subtopic}</span>
        </a>
      ))}
    </nav>
  );
}
