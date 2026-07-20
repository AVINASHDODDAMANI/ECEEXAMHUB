import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/layout";
import { buildBreadcrumbList } from "../lib/seo";

const pagePath = "/network-analysis/circuit-elements";
const lastUpdated = "June 23, 2026";

const topicCards = [
  {
    title: "Resistor",
    href: "/network-analysis/resistor",
    description: "A resistor sets the overall current in a circuit and converts electrical energy into heat.",
    function: "Opposes current flow",
    unit: "Ohm",
    symbol: "resistor",
    breakdown: [
      "In a series branch, the same current flows through every element.",
      "It is used for current limiting, voltage division, biasing, and protection.",
      "A larger resistance gives a smaller circuit current for the same applied voltage.",
    ],
    formula: "V = IR",
    formulaMeaning: [
      "V is the reference voltage across the resistor.",
      "I is the reference current through it.",
      "R is the resistance value.",
    ],
    keyIdea: "A resistor does not consume current locally; it causes voltage drop and heat loss while setting the branch current.",
  },
  {
    title: "Capacitor",
    href: "/network-analysis/capacitor",
    description: "A capacitor stores energy between two plates and does not like sudden voltage changes.",
    function: "Stores electric-field energy",
    unit: "Farad",
    symbol: "capacitor",
    breakdown: [
      "It stores charge when voltage is applied.",
      "It is used in filters, timing circuits, coupling, and power supply smoothing.",
      "In DC, it charges first and then behaves almost like an open path.",
    ],
    formula: "Q = CV",
    formulaMeaning: [
      "Q is the charge stored on the plates.",
      "C is the capacitance.",
      "V is the voltage across the capacitor.",
    ],
    keyIdea: "A capacitor stores voltage energy and resists sudden voltage changes.",
  },
  {
    title: "Inductor",
    href: "/network-analysis/inductor",
    description: "An inductor stores energy in a magnetic field and does not like sudden current changes.",
    function: "Stores magnetic-field energy",
    unit: "Henry",
    symbol: "inductor",
    breakdown: [
      "It reacts when current tries to change quickly.",
      "It is used in filters, converters, motors, relays, and energy storage circuits.",
      "When current rises, it pushes back. When current falls, it releases stored energy.",
    ],
    formula: "V = L(di/dt)",
    formulaMeaning: [
      "V is the voltage across the inductor.",
      "L is the inductance.",
      "di/dt tells how quickly current is changing.",
    ],
    keyIdea: "An inductor stores current energy and resists sudden current changes.",
  },
  {
    title: "Independent Voltage Source",
    href: "/network-analysis/independent-voltage-source",
    description: "A voltage source gives the circuit a fixed electrical push between two points.",
    function: "Supplies voltage",
    unit: "Volt",
    symbol: "voltage",
    breakdown: [
      "It sets the voltage level that drives charge through the circuit.",
      "It is used as a battery, supply rail, or input signal source.",
      "It tries to maintain its voltage even when the connected load changes.",
    ],
    formula: "V = constant",
    formulaMeaning: ["The source tries to keep the same voltage across its terminals."],
    keyIdea: "A voltage source maintains a set voltage and pushes charge through the path.",
  },
  {
    title: "Independent Current Source",
    href: "/network-analysis/independent-current-source",
    description: "A current source tries to keep the same amount of current flowing through a branch.",
    function: "Supplies current",
    unit: "Ampere",
    symbol: "current",
    breakdown: [
      "It focuses on steady current instead of fixed voltage.",
      "It is used in biasing, transistor circuits, current mirrors, and circuit testing.",
      "The voltage may adjust, but the current tries to stay fixed within practical limits.",
    ],
    formula: "I = constant",
    formulaMeaning: ["The source tries to keep the branch current at a fixed value."],
    keyIdea: "A current source keeps current flow steady.",
  },
  {
    title: "Dependent Source",
    href: "/network-analysis/dependent-source",
    description: "A dependent source is an ideal controlled source whose output voltage or current depends on another voltage or current elsewhere in the circuit.",
    function: "Models active devices",
    unit: "V or A",
    symbol: "dependent",
    breakdown: [
      "It is a circuit element whose value is controlled by a separate circuit variable, not by its own terminals alone.",
      "Dependent sources model transistors, op-amps, amplifiers, and other active devices.",
      "The control signal sets the output relation, while the actual output power comes from an external supply.",
    ],
    formula: "VCVS: Vout = A Vin",
    formulaMeaning: [
      "This is one ideal example: a voltage-controlled voltage source.",
      "Vout is the output voltage produced by the dependent source.",
      "Vin is the controlling input voltage measured in a different part of the circuit.",
      "A is the gain factor; it defines the relationship, not the energy source.",
      "There are four dependent source types: VCVS, VCCS, CCVS, and CCCS.",
    ],
    keyIdea: "A dependent source is controlled by another circuit variable and relies on external power to deliver output energy.",
  },
  {
    title: "Source Transformation",
    href: "/network-analysis/source-transformation",
    description: "Source transformation changes the shape of a source circuit without changing what the load sees.",
    function: "Simplifies circuits",
    unit: "Equivalent form",
    symbol: "transform",
    breakdown: [
      "A voltage source with series resistance can become a current source with parallel resistance.",
      "It is used to simplify circuits before solving.",
      "The outside terminals behave the same, even though the inside drawing looks different.",
    ],
    formula: "I = V / R",
    formulaMeaning: [
      "I is the equivalent current source value.",
      "V is the original voltage source value.",
      "R is the same resistance used in the transformation.",
    ],
    keyIdea: "Source transformation changes circuit form while keeping terminal behavior the same.",
  },
];

const applications = [
  ["Mobile Charger", "Resistor", "Resistors help limit current and set safe operating points in charging circuits."],
  ["Camera Flash", "Capacitor", "A capacitor stores energy and releases it quickly for a bright flash."],
  ["Transformer", "Inductor", "Coils use magnetic-field behavior to transfer energy between windings."],
  ["Battery", "Voltage Source", "A battery is modeled as a voltage source for most basic circuit analysis."],
  ["Solar Panel System", "Current Source", "Solar cells are often approximated as current sources in circuit models."],
];

const mcqs = [
  {
    question: "Which circuit element primarily opposes current flow?",
    options: ["Resistor", "Capacitor", "Inductor", "Current source"],
    answer: "Resistor",
    explanation: "A resistor limits current and produces a voltage drop according to Ohm's law.",
  },
  {
    question: "Which passive element stores energy in an electric field?",
    options: ["Inductor", "Resistor", "Capacitor", "Voltage source"],
    answer: "Capacitor",
    explanation: "A capacitor stores energy between its plates in the form of an electric field.",
  },
  {
    question: "An inductor stores energy mainly in which form?",
    options: ["Heat", "Magnetic field", "Chemical energy", "Light"],
    answer: "Magnetic field",
    explanation: "The current through an inductor creates a magnetic field, and energy is stored in that field.",
  },
  {
    question: "Which element is classified as an active circuit element?",
    options: ["Resistor", "Capacitor", "Independent voltage source", "Inductor"],
    answer: "Independent voltage source",
    explanation: "Sources are active elements because they can supply energy to a network.",
  },
  {
    question: "Source transformation is mainly used to:",
    options: ["Remove all resistors", "Convert equivalent source forms", "Change AC into DC", "Store magnetic energy"],
    answer: "Convert equivalent source forms",
    explanation: "Source transformation converts between practical voltage source and current source models.",
  },
];

const faqs = [
  {
    question: "What are circuit elements?",
    answer:
      "Circuit elements are the basic building blocks used to form electrical networks, such as resistors, capacitors, inductors, voltage sources, current sources, and dependent sources.",
  },
  {
    question: "What are passive circuit elements?",
    answer:
      "Passive circuit elements do not generate energy on their own. Resistor, capacitor, and inductor are the common passive elements used in Network Analysis.",
  },
  {
    question: "What are active circuit elements?",
    answer:
      "Active circuit elements can supply energy to a network. Independent voltage sources, independent current sources, and dependent sources are treated as active elements.",
  },
  {
    question: "What is the difference between resistor and capacitor?",
    answer:
      "A resistor opposes current and dissipates energy as heat, while a capacitor stores energy in an electric field and is important in timing, filtering, and transient circuits.",
  },
  {
    question: "What is source transformation?",
    answer:
      "Source transformation is a circuit simplification technique that converts a practical voltage source into an equivalent current source, or the reverse, without changing the external terminal behavior.",
  },
];

const structuredData = [
  buildBreadcrumbList([
    { name: "Home", item: "/" },
    { name: "Notes", item: "/subjects" },
    { name: "Network Analysis", item: "/subjects/network-analysis" },
    { name: "Circuit Elements", item: pagePath },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function CircuitSymbol({ type, className = "h-24 w-full" }) {
  return (
    <svg viewBox="0 0 260 120" className={className} role="img" aria-label={`${type} circuit symbol`}>
      <defs>
        <linearGradient id={`wire-${type}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#154a96" />
          <stop offset="100%" stopColor="#137d46" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="244" height="104" rx="18" fill="#f8fbff" stroke="#d7e2ee" />
      <path d="M28 60H72" stroke={`url(#wire-${type})`} strokeWidth="6" strokeLinecap="round" />
      <path d="M188 60H232" stroke={`url(#wire-${type})`} strokeWidth="6" strokeLinecap="round" />
      {type === "resistor" ? (
        <path d="M72 60l12-20 18 40 18-40 18 40 18-40 18 40 14-20" fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      ) : null}
      {type === "capacitor" ? (
        <g stroke="#154a96" strokeWidth="7" strokeLinecap="round">
          <path d="M116 28v64" />
          <path d="M144 28v64" />
          <path d="M72 60h44" />
          <path d="M144 60h44" />
        </g>
      ) : null}
      {type === "inductor" ? (
        <path d="M72 60c10-38 30-38 40 0c10-38 30-38 40 0c10-38 28-38 36 0" fill="none" stroke="#137d46" strokeWidth="7" strokeLinecap="round" />
      ) : null}
      {type === "voltage" ? (
        <g>
          <circle cx="130" cy="60" r="32" fill="#fff" stroke="#154a96" strokeWidth="6" />
          <path d="M130 43v34M113 60h34" stroke="#154a96" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : null}
      {type === "current" ? (
        <g>
          <circle cx="130" cy="60" r="32" fill="#fff" stroke="#137d46" strokeWidth="6" />
          <path d="M130 82V42M130 42l-12 14M130 42l12 14" stroke="#137d46" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
      {type === "dependent" ? (
        <g>
          <path d="M130 22l38 38-38 38-38-38z" fill="#fff" stroke="#7c3aed" strokeWidth="6" />
          <path d="M130 43v34M113 60h34" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : null}
      {type === "transform" ? (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M88 44h80M168 44l-14-12M168 44l-14 12" stroke="#154a96" strokeWidth="6" />
          <path d="M172 76H92M92 76l14-12M92 76l14 12" stroke="#137d46" strokeWidth="6" />
        </g>
      ) : null}
    </svg>
  );
}

function HeroIllustration() {
  return (
    <motion.svg
      viewBox="0 0 520 320"
      className="h-auto w-full"
      role="img"
      aria-label="Circuit elements overview illustration"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
    >
      <rect x="20" y="26" width="480" height="268" rx="30" fill="#fff" stroke="#d7e2ee" />
      <path d="M90 160H160M360 160H430M260 74V116M260 204v44" stroke="#154a96" strokeWidth="8" strokeLinecap="round" />
      <path d="M160 160l12-24 22 48 22-48 22 48 22-48 22 48 16-24" fill="none" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="260" cy="160" r="44" fill="#f8fbff" stroke="#137d46" strokeWidth="8" />
      <path d="M260 132v56M232 160h56" stroke="#137d46" strokeWidth="7" strokeLinecap="round" />
      <path d="M86 104c18-30 42-30 60 0c18-30 42-30 60 0" fill="none" stroke="#154a96" strokeWidth="7" strokeLinecap="round" />
      <path d="M386 94v64M416 94v64" stroke="#7c3aed" strokeWidth="8" strokeLinecap="round" />
      <motion.circle cx="90" cy="160" r="8" fill="#2563eb" animate={{ x: [0, 340, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.path d="M48 252H472" stroke="#dbeafe" strokeWidth="12" strokeLinecap="round" animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 2.8, repeat: Infinity }} />
      <text x="58" y="56" fill="#0f172a" fontSize="18" fontWeight="800">Network Analysis</text>
      <text x="58" y="280" fill="#475569" fontSize="15" fontWeight="700">R, C, L and source models</text>
    </motion.svg>
  );
}

function Section({ eyebrow, title, children, id }) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35 }}
      className="mt-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5"
    >
      {eyebrow ? (
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-portal-700">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
      {children}
    </motion.section>
  );
}

function TopicCard({ topic, index }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.18) }}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-portal-300 hover:shadow-panel"
    >
      <CircuitSymbol type={topic.symbol} />
      <h3 className="mt-3 text-lg font-black text-slate-950">{topic.title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{topic.description}</p>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
        {topic.breakdown.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">Formula</p>
        <p className="mt-1 font-mono text-base font-black text-slate-950">{topic.formula}</p>
        <ul className="mt-2 grid gap-1.5 text-xs font-semibold leading-5 text-slate-600">
          {topic.formulaMeaning.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-amber-700">Key Idea</p>
        <p className="mt-1 text-sm font-bold leading-6 text-slate-900">{topic.keyIdea}</p>
      </div>
      <div className="mt-4 rounded-xl border border-portal-100 bg-portal-50/70 p-3">
        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-portal-700">Main Function</p>
        <p className="mt-1 text-sm font-bold text-slate-900">{topic.function}</p>
      </div>
      <Link
        href={topic.href}
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-portal-600 px-4 py-2.5 text-sm font-black text-white transition hover:bg-portal-700"
      >
        Learn More
      </Link>
    </motion.article>
  );
}

function ClassificationTable() {
  const groups = [
    ["Passive Elements", "Do not generate energy", ["Resistor", "Capacitor", "Inductor"]],
    ["Active Elements", "Can supply or control energy", ["Independent Voltage Source", "Independent Current Source", "Dependent Source"]],
  ];

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
      <div className="grid bg-slate-950 text-sm font-black text-white sm:grid-cols-[0.9fr_1fr_1.4fr]">
        <div className="px-4 py-3">Classification</div>
        <div className="px-4 py-3">Meaning</div>
        <div className="px-4 py-3">Elements</div>
      </div>
      {groups.map(([group, meaning, elements]) => (
        <div key={group} className="grid border-t border-slate-200 bg-white text-sm sm:grid-cols-[0.9fr_1fr_1.4fr]">
          <div className="px-4 py-4 font-black text-slate-950">{group}</div>
          <div className="px-4 py-4 font-semibold text-slate-700">{meaning}</div>
          <div className="flex flex-wrap gap-2 px-4 py-4">
            {elements.map((element) => (
              <span key={element} className="rounded-full border border-portal-200 bg-portal-50 px-3 py-1 text-xs font-bold text-portal-700">
                {element}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ComparisonTable() {
  const rows = [
    ["Resistor", "No", "Ohm", "Opposes current flow"],
    ["Capacitor", "Yes", "Farad", "Stores electric-field energy"],
    ["Inductor", "Yes", "Henry", "Stores magnetic-field energy"],
    ["Voltage Source", "Supplies energy", "Volt", "Maintains voltage"],
    ["Current Source", "Supplies energy", "Ampere", "Maintains current"],
  ];

  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
      <table className="min-w-[720px] w-full text-left text-sm">
        <thead className="bg-slate-950 text-white">
          <tr>
            {["Element", "Stores Energy", "Unit", "Main Function"].map((head) => (
              <th key={head} className="px-4 py-3 font-black">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row) => (
            <tr key={row[0]} className="transition hover:bg-portal-50/60">
              {row.map((cell, index) => (
                <td key={cell} className={`px-4 py-3 ${index === 0 ? "font-black text-slate-950" : "font-semibold text-slate-700"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function McqCard({ item, index }) {
  const [selected, setSelected] = useState("");
  const isAnswered = Boolean(selected);

  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <p className="text-sm font-black text-slate-950">
        {index + 1}. {item.question}
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {item.options.map((option) => {
          const isCorrect = option === item.answer;
          const isSelected = selected === option;
          const stateClass = !isAnswered
            ? "border-slate-200 bg-white hover:border-portal-300 hover:bg-portal-50"
            : isCorrect
              ? "border-emerald-300 bg-emerald-50 text-emerald-900"
              : isSelected
                ? "border-rose-300 bg-rose-50 text-rose-900"
                : "border-slate-200 bg-white text-slate-500";

          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              className={`min-h-11 rounded-xl border px-3 py-2 text-left text-sm font-bold transition ${stateClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {isAnswered ? (
        <p className="mt-3 rounded-xl border border-portal-100 bg-white px-3 py-2 text-sm font-semibold leading-6 text-slate-700">
          <span className="font-black text-slate-950">Answer: {item.answer}.</span> {item.explanation}
        </p>
      ) : null}
    </article>
  );
}

export function CircuitElementVisualizationGallery() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {topicCards.slice(0, 4).map((topic) => (
        <div key={topic.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <CircuitSymbol type={topic.symbol} />
          <h3 className="mt-3 text-base font-black text-slate-950">{topic.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{topic.function}</p>
        </div>
      ))}
    </div>
  );
}

export default function CircuitElementsPage() {
  return (
    <Layout
      title="Circuit Elements in Network Analysis | ECEExamGuide"
      description="Circuit Elements in Network Analysis explained as an SEO-friendly hub for ECE students: passive and active elements, quick revision notes, beginner MCQs, FAQs, and links to detailed pages."
      canonicalUrl={pagePath}
      keywords="Circuit Elements in Network Analysis, Basic Circuit Elements, Passive and Active Elements, Network Analysis Notes, ECE Circuit Elements, Circuit Elements for GATE, Circuit Elements for BEL Exam"
      structuredData={structuredData}
      appendSiteName={false}
      pageClassName="py-3 sm:py-5"
    >
      <div className="mx-auto max-w-7xl pb-12">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link>
          <span className="text-slate-300">/</span>
          <Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Notes</Link>
          <span className="text-slate-300">/</span>
          <Link href="/subjects/network-analysis" className="font-medium text-slate-600 transition hover:text-portal-700">Network Analysis</Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-portal-700">Circuit Elements</span>
        </nav>

        <header className="grid gap-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-portal-200 bg-portal-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-portal-700">
                Network Analysis
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">6 min read</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">Updated {lastUpdated}</span>
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Circuit Elements in Network Analysis
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
              Learn the fundamental building blocks of electrical and electronic circuits including resistors,
              capacitors, inductors, voltage sources, current sources, dependent sources, and source transformation.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#topics" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-black text-white transition hover:bg-portal-700">
                Explore Elements
              </a>
              <a href="#mcqs" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-portal-200 bg-white px-5 py-3 text-sm font-black text-portal-700 transition hover:bg-portal-50">
                Practice MCQs
              </a>
            </div>
          </motion.div>
          <HeroIllustration />
        </header>

        <Section id="overview" eyebrow="Concept Overview" title="What Are Circuit Elements?">
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
            <div className="grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>
                Circuit elements are ideal or practical building blocks used to represent how a real electrical
                network behaves. In Network Analysis, they help us write equations, predict voltage and current,
                and simplify complex circuits into understandable models.
              </p>
              <p>
                For ECE exams, this topic is the entry point for Ohm's Law, Kirchhoff's Laws, transient analysis,
                AC analysis, network theorems, and source transformation problems.
              </p>
              <div className="rounded-2xl border-l-4 border-portal-600 bg-portal-50 px-4 py-3">
                <p className="text-sm font-black text-slate-950">Exam relevance</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">
                  GATE, BEL, ISRO, and university questions often begin by identifying the correct element model
                  before applying KCL, KVL, or equivalent circuit methods.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4">
              <CircuitSymbol type="transform" className="h-40 w-full" />
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-black text-slate-700">
                <span className="rounded-xl bg-white px-2 py-2 shadow-sm">Model</span>
                <span className="rounded-xl bg-white px-2 py-2 shadow-sm">Equation</span>
                <span className="rounded-xl bg-white px-2 py-2 shadow-sm">Solution</span>
              </div>
            </div>
          </div>
        </Section>

        <Section id="classification" eyebrow="Passive vs Active" title="Classification of Circuit Elements">
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
            Circuit elements are commonly grouped as passive and active elements. This classification helps you
            decide whether an element only absorbs or stores energy, or can supply/control energy in the network.
          </p>
          <ClassificationTable />
        </Section>

        <section id="topics" className="mt-5">
          <div className="mb-4">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-portal-700">Interactive Topic Cards</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Choose a Circuit Element</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {topicCards.map((topic, index) => (
              <TopicCard key={topic.title} topic={topic} index={index} />
            ))}
          </div>
        </section>

        <Section id="comparison" eyebrow="Quick Comparison" title="Circuit Elements Comparison Table">
          <ComparisonTable />
        </Section>

        <Section id="applications" eyebrow="Engineering Context" title="Real World Applications">
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {applications.map(([device, element, text]) => (
              <article key={device} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-black text-portal-700 shadow-sm">
                  {device.slice(0, 1)}
                </div>
                <h3 className="mt-3 text-base font-black text-slate-950">{device}</h3>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-portal-700">{element}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="revision" eyebrow="Exam Revision" title="Quick Revision Notes">
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              "Resistor opposes current flow",
              "Capacitor stores electric field energy",
              "Inductor stores magnetic field energy",
              "Voltage source supplies voltage",
              "Current source supplies current",
            ].map((note) => (
              <div key={note} className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-slate-800">
                <span className="font-black text-emerald-700">✓</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="mcqs" eyebrow="Beginner Practice" title="Beginner MCQs on Circuit Elements">
          <div className="mt-4 grid gap-3">
            {mcqs.map((item, index) => (
              <McqCard key={item.question} item={item} index={index} />
            ))}
          </div>
        </Section>

        <Section id="faq" eyebrow="SEO FAQ" title="Circuit Elements FAQs">
          <div className="mt-4 grid gap-3">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <summary className="cursor-pointer text-base font-black text-slate-950">{item.question}</summary>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section id="related" eyebrow="Continue Learning" title="Related Network Analysis Topics">
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Ohm's Law", "/circuit-laws"],
              ["Kirchhoff's Laws", "/circuit-laws"],
              ["Network Theorems", "/network-theorems"],
              ["Network Analysis Notes", "/network-analysis-notes"],
              ["Network Analysis MCQs", "/mcqs/network-analysis"],
            ].map(([label, href]) => (
              <Link key={label} href={href} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-black text-slate-800 transition hover:border-portal-300 hover:bg-portal-50 hover:text-portal-700">
                {label}
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
}
