import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import NetworkTheoryDiagram from "../../components/NetworkTheoryDiagram";
import { subjectDirectory } from "../../data/subject-directory";
import {
  getSubjectSlug,
  subjectTheoryKnowledge,
  subjectTheoryRoadmaps,
} from "../../data/subject-theory-roadmaps";
import { getLearningSubject } from "../../lib/learning-utils";
import { useLearningProgress } from "../../lib/use-learning-progress";

const SUBJECT_TO_LEARNING_SLUG = {
  "Network Analysis": "networks",
  "Analog Electronics": "analog",
  "Digital Electronics": "digital",
  "Signals and Systems": "signals",
  "Communication Systems": "communications",
  "Control Systems": "control-systems",
};

const SUBJECT_META = {
  "Network Analysis": {
    subtitle: "The chapter that teaches how electrical circuits are understood, simplified, and solved.",
    estimatedTime: "8-10 Hours",
    difficulty: "Medium",
    level: "Beginner to Advanced",
    keyConcepts: [
      "Circuit Variables",
      "KCL and KVL",
      "Nodal and Mesh Analysis",
      "Network Theorems",
      "Two-Port Networks",
      "AC and Transients",
    ],
    examFocus: [
      "Circuit variables and sign convention",
      "KCL, KVL, nodal, and mesh analysis",
      "Thevenin, Norton, and superposition",
      "Resonance and first-order transients",
    ],
    studyTip:
      "Start from circuit variables and laws, then move to solving methods, theorems, AC analysis, and transient response in that order.",
  },
};

const NETWORK_ANALYSIS_TOPIC_GROUPS = [
  {
    title: "Basic Concepts",
    topics: [
      "Electric charge, current, voltage",
      "Power and energy",
      "Passive vs active elements",
      "Linear and non-linear elements",
      "Bilateral and unilateral elements",
    ],
  },
  {
    title: "Circuit Elements",
    topics: [
      "Resistors, capacitors, inductors",
      "Independent and dependent sources",
      "Source transformation",
    ],
  },
  {
    title: "Circuit Laws",
    topics: ["Ohm's Law", "Kirchhoff's Current Law (KCL)", "Kirchhoff's Voltage Law (KVL)"],
  },
  {
    title: "Network Theorems",
    topics: [
      "Superposition Theorem",
      "Thevenin's Theorem",
      "Norton's Theorem",
      "Maximum Power Transfer Theorem",
      "Reciprocity Theorem",
      "Millman's Theorem",
      "Compensation Theorem",
    ],
  },
  {
    title: "DC Circuit Analysis",
    topics: [
      "Series and parallel circuits",
      "Mesh analysis",
      "Nodal analysis",
      "Star-Delta (Y-Delta) transformation",
    ],
  },
  {
    title: "AC Fundamentals",
    topics: ["Sinusoidal signals", "Phase and phasors", "RMS, average values", "Complex impedance"],
  },
  {
    title: "AC Circuit Analysis",
    topics: [
      "RL, RC, RLC circuits",
      "Series and parallel resonance",
      "Power in AC circuits: real, reactive, apparent",
      "Power factor",
    ],
  },
  {
    title: "Transient Analysis",
    topics: [
      "First-order circuits: RC, RL",
      "Second-order circuits: RLC",
      "Natural and forced response",
      "Time constants",
    ],
  },
  {
    title: "Network Topology",
    topics: ["Graph theory basics", "Trees, branches, nodes, loops", "Tie-set and cut-set matrices"],
  },
  {
    title: "Laplace Transform Methods",
    topics: [
      "Laplace transform basics",
      "Circuit analysis using Laplace",
      "Transfer function",
      "Initial and final value theorems",
    ],
  },
  {
    title: "Frequency Domain Analysis",
    topics: ["Frequency response", "Bode plots", "Resonance and bandwidth"],
  },
  {
    title: "Two-Port Networks",
    topics: ["Z, Y, h, ABCD parameters", "Interconnections of two-port networks"],
  },
  {
    title: "Filters",
    topics: [
      "Low-pass and high-pass filters",
      "Band-pass and band-stop filters",
      "Active and passive filters",
    ],
  },
  {
    title: "Network Functions",
    topics: ["Poles and zeros", "Stability", "Transfer function behavior"],
  },
  {
    title: "Advanced Topics",
    topics: ["Fourier series and transforms", "Network synthesis", "State-space analysis"],
  },
];

const NETWORK_TOPIC_TARGET_SLUGS = {
  "Circuit Elements": "circuit-variables",
  "Circuit Laws": "kirchhoff-laws",
  "Network Theorems": "network-theorems",
  "DC Circuit Analysis": "systematic-solving",
  "AC Fundamentals": "ac-analysis",
  "AC Circuit Analysis": "ac-analysis",
  "Transient Analysis": "transient-response",
  "Network Topology": "graph-theory",
  "Laplace Transform Methods": "transient-response",
  "Frequency Domain Analysis": "ac-analysis",
  "Two-Port Networks": "two-port-networks",
  Filters: "ac-analysis",
  "Network Functions": "ac-analysis",
  "Advanced Topics": "special-networks",
};

const NETWORK_TOPIC_TARGET_ANCHORS = {
  "Basic Concepts": "fundamental-electrical-concepts",
};

export const NETWORK_TOPIC_ROUTES = {
  "Basic Concepts": "/basic-concepts",
  "Circuit Elements": "/circuit-elements",
  "Circuit Laws": "/circuit-laws",
  "Network Theorems": "/network-theorems",
};

export const NETWORK_ROUTE_ACTIVE_INDEX = {
  "/basic-concepts": 0,
  "/circuit-elements": 1,
  "/circuit-laws": 2,
  "/network-theorems": 3,
};

const BASIC_CONCEPT_GUIDE = [
  {
    title: "Electric Charge, Current, and Voltage",
    sections: [
      {
        heading: "Electric Charge (Q)",
        body:
          "Electric charge is the fundamental property of matter responsible for electrical phenomena. It is measured in coulombs (C). In metallic conductors, electrons are the main moving particles, and their movement is what makes electrical behavior possible inside a circuit.",
        points: [
          "Positive charge means deficiency of electrons.",
          "Negative charge means excess of electrons.",
          "Electrons carry negative charge and move through conductors when a circuit is complete.",
        ],
        keyIdea:
          "Electricity exists because charges can move from one place to another.",
      },
      {
        heading: "Charge Flow in a Circuit",
        body:
          "In a simple circuit, the battery creates an electric field. This field pushes electrons through the conductor. Electrons physically move from the negative terminal toward the positive terminal, but conventional current is taken in the opposite direction, from positive to negative.",
        points: [
          "The voltage source creates the electric field.",
          "The electric field pushes electrons through the closed path.",
          "Electron flow is from negative to positive.",
          "Conventional current is assumed from positive to negative.",
        ],
        animation:
          "Show moving glowing dots as charge motion, and label both electron flow and conventional current direction clearly.",
      },
      {
        heading: "Electric Current (I)",
        formula: "I = Q / t",
        body:
          "Electric current is the rate at which electric charge flows through a conductor. Its unit is ampere (A), where 1 ampere means 1 coulomb of charge passes a point every second.",
        points: [
          "More moving charge produces higher current.",
          "Faster charge movement also produces higher current.",
          "Current is measured through an element or branch.",
          "The marked current direction is a reference direction used for solving.",
        ],
        animation:
          "Use slow glowing dots moving in a continuous loop, with a smooth direction arrow showing conventional current.",
      },
      {
        heading: "Voltage (V)",
        body:
          "Voltage is the driving force that pushes electric charge through a circuit. It is also called potential difference and is measured in volts (V). Voltage represents energy available per unit charge.",
        points: [
          "A battery creates a potential difference between its terminals.",
          "This potential difference produces an electric field in the circuit.",
          "The electric field causes charge motion, which produces current.",
          "Without voltage, there is no electrical push, so current cannot flow in an ideal open circuit.",
        ],
        animation:
          "Show a brighter positive terminal, a dimmer negative terminal, and a subtle high-to-low gradient along the circuit path.",
      },
      {
        heading: "Putting It Together",
        body:
          "Charge is the quantity of electricity, current is how fast that charge flows, and voltage is what pushes the charge through the circuit. In analysis, voltage causes current, and current represents the movement of charge.",
        points: [
          "Charge (Q): the electrical quantity.",
          "Current (I): the rate of charge flow.",
          "Voltage (V): the push or potential difference that drives charge.",
        ],
        keyIdea:
          "In a simple circuit, voltage provides the cause and current shows the resulting flow of charge.",
      },
      {
        heading: "Real-Life Analogy",
        body:
          "A useful way to remember these ideas is the water-flow analogy. Charge is like water, current is like the flow rate of water, and voltage is like water pressure.",
        points: [
          "Charge is similar to water quantity.",
          "Current is similar to water flow.",
          "Voltage is similar to pressure that pushes the flow.",
        ],
      },
    ],
  },
  {
    title: "Power and Energy",
    sections: [
      {
        heading: "Electric Power (P)",
        formula: "P = V I",
        body:
          "Power is the rate at which electrical energy is used, absorbed, or transferred. Its unit is watt (W). A heater, for example, converts electrical power into heat.",
        points: [
          "Positive power usually means an element is absorbing energy.",
          "Negative power means an element is delivering energy.",
          "Power depends on both voltage and current.",
        ],
        animation:
          "Make the resistor or load glow softly every one to two seconds to show energy consumption.",
      },
      {
        heading: "Electrical Energy (E)",
        formula: "E = P x t",
        body:
          "Energy is the total electrical work done over time. Its unit is joule (J), and practical electricity usage is often measured in kilowatt-hour (kWh).",
        points: [
          "Power is the rate of energy use.",
          "Energy is the accumulated result over time.",
          "Electricity bills measure energy consumed over a period of time.",
        ],
        animation:
          "Use a simple time-progress bar or increasing meter to show energy accumulating gradually.",
      },
    ],
  },
  {
    title: "Passive and Active Elements",
    sections: [
      {
        heading: "Passive Elements",
        body:
          "Passive elements cannot generate energy on their own. They only absorb energy, dissipate it, or store it temporarily.",
        points: [
          "Resistor: converts electrical energy into heat.",
          "Capacitor: stores energy in an electric field.",
          "Inductor: stores energy in a magnetic field.",
        ],
        animation:
          "Show a resistor glowing for heat, a capacitor filling and emptying, or an inductor with a soft field ripple.",
      },
      {
        heading: "Active Elements",
        body:
          "Active elements can supply energy to a circuit. They are the sources that drive current through the network.",
        points: ["Battery", "Voltage source", "Current source", "Generator"],
        animation:
          "Show energy pulses beginning at the source and moving into the circuit.",
      },
    ],
  },
  {
    title: "Linear and Non-Linear Elements",
    sections: [
      {
        heading: "Linear Elements",
        formula: "V = I R",
        body:
          "A linear element has a proportional relationship between voltage and current. If voltage doubles, current also doubles, as long as resistance is constant.",
        points: [
          "The voltage-current graph is a straight line.",
          "The response is predictable.",
          "An ideal resistor is the most common example.",
        ],
        animation:
          "Show a straight-line graph building smoothly as voltage and current increase together.",
      },
      {
        heading: "Non-Linear Elements",
        body:
          "A non-linear element does not follow a straight-line voltage-current relation. Its behavior changes depending on the operating condition.",
        points: ["Diode", "Transistor", "Semiconductor junctions"],
        animation:
          "Show a curved graph where current stays low at first and then rises sharply after turn-on.",
      },
    ],
  },
  {
    title: "Bilateral and Unilateral Elements",
    sections: [
      {
        heading: "Bilateral Elements",
        body:
          "A bilateral element behaves the same when current direction is reversed. Its electrical behavior does not depend on the direction of current flow.",
        points: ["Resistor", "Inductor", "Capacitor"],
        animation:
          "Show current flowing in both directions without changing the component behavior.",
      },
      {
        heading: "Unilateral Elements",
        body:
          "A unilateral element allows current more easily in one direction than the other. Its behavior changes when direction is reversed.",
        points: ["Diode", "Transistor"],
        animation:
          "Show forward current flowing freely and reverse current being blocked.",
      },
    ],
  },
];

function SubjectTheoryIcon() {
  return (
    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl border border-blue-100 bg-white text-portal-700 shadow-[0_10px_24px_rgba(15,50,112,0.14)] sm:h-16 sm:w-16">
      <svg className="h-9 w-9 sm:h-12 sm:w-12" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M14 22a23 23 0 0 1 37 0" stroke="#1476d4" strokeWidth="4" strokeLinecap="round" />
        <path d="M12 42a23 23 0 0 0 38 5" stroke="#062b57" strokeWidth="4" strokeLinecap="round" />
        <path d="M19 25 31 18 44 25M18 28l4 15 16 7 16-18M24 43l14-11M38 50l-4-18M44 25l-10 7M50 36l-12-4" stroke="#062b57" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="27" r="4.3" fill="#062b57" />
        <circle cx="31" cy="17" r="4.3" fill="#062b57" />
        <circle cx="48" cy="27" r="4.3" fill="#1476d4" />
        <circle cx="24" cy="43" r="4.1" fill="#1476d4" />
        <circle cx="39" cy="50" r="4.1" fill="#062b57" />
        <circle cx="34" cy="32" r="6.2" fill="#1476d4" />
        <circle cx="34" cy="32" r="12" stroke="#062b57" strokeWidth="4" />
        <path d="M43 41 52 50" stroke="#062b57" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function HeroMetric({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 shadow-sm sm:rounded-xl sm:px-3 sm:py-2.5">
      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-500 sm:text-[10px] sm:tracking-[0.14em]">
        {label}
      </p>
      <p className="mt-0.5 text-xs font-bold leading-5 text-slate-900 sm:mt-1 sm:text-sm">{value}</p>
    </div>
  );
}

function SidebarCard({ title, children }) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-portal-700">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function ChargeCurrentVoltageInfographic() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h4 className="text-center text-xl font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        1. Electric Charge, Current, And Voltage
      </h4>

      <div className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-700 sm:text-base">
        Electricity exists because charges can move from one place to another.
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_290px]">
        <div className="min-w-0 overflow-x-auto">
          <svg viewBox="0 0 760 360" className="h-auto w-full max-w-full" role="img" aria-label="Charge current and voltage circuit explanation">
            <defs>
              <linearGradient id="batteryBody" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#d7932b" />
                <stop offset="45%" stopColor="#f0b14b" />
                <stop offset="46%" stopColor="#111827" />
                <stop offset="100%" stopColor="#030712" />
              </linearGradient>
              <marker id="blueArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0 0 9 4.5 0 9Z" fill="#1d4ed8" />
              </marker>
              <marker id="redArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0 0 9 4.5 0 9Z" fill="#dc2626" />
              </marker>
              <filter id="electronGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path d="M90 96H292M408 96H620V290H90V205" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M90 150V96" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
            <path d="M292 96h18l10-16 20 32 20-32 20 32 20-32 10 16h18" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <text x="320" y="60" fill="#111827" fontSize="18" fontWeight="800">Resistor (R)</text>

            <rect x="58" y="150" width="64" height="140" rx="16" fill="url(#batteryBody)" stroke="#374151" strokeWidth="2" />
            <rect x="79" y="137" width="22" height="16" rx="4" fill="#6b7280" />
            <text x="82" y="198" fill="#ffffff" fontSize="28" fontWeight="900">+</text>
            <text x="82" y="270" fill="#ffffff" fontSize="28" fontWeight="900">−</text>
            <text x="20" y="220" fill="#111827" fontSize="16" fontWeight="800">Battery</text>
            <text x="10" y="244" fill="#111827" fontSize="13" fontWeight="600">(Voltage Source)</text>
            <text x="125" y="178" fill="#dc2626" fontSize="26" fontWeight="900">+</text>
            <text x="132" y="270" fill="#1d4ed8" fontSize="26" fontWeight="900">−</text>

            {[155, 220, 520, 585].map((x) => (
              <g key={`top-electron-${x}`}>
                <circle cx={x} cy="96" r="11" fill="#3b82f6" filter="url(#electronGlow)" />
                <text x={x - 4} y="101" fill="#ffffff" fontSize="17" fontWeight="900">−</text>
              </g>
            ))}
            {[620, 620, 620].map((x, index) => (
              <g key={`right-electron-${index}`}>
                <circle cx={x} cy={145 + index * 55} r="11" fill="#3b82f6" filter="url(#electronGlow)" />
                <text x={x - 4} y={150 + index * 55} fill="#ffffff" fontSize="17" fontWeight="900">−</text>
              </g>
            ))}
            {[150, 260, 370, 480, 590].map((x) => (
              <g key={`bottom-electron-${x}`}>
                <circle cx={x} cy="290" r="11" fill="#3b82f6" filter="url(#electronGlow)" />
                <text x={x - 4} y="295" fill="#ffffff" fontSize="17" fontWeight="900">−</text>
              </g>
            ))}
            {[90, 90].map((x, index) => (
              <g key={`left-electron-${index}`}>
                <circle cx={x} cy={130 + index * 60} r="11" fill="#3b82f6" filter="url(#electronGlow)" />
                <text x={x - 4} y={135 + index * 60} fill="#ffffff" fontSize="17" fontWeight="900">−</text>
              </g>
            ))}

            <path d="M250 172H390" stroke="#1d4ed8" strokeWidth="3" markerEnd="url(#blueArrow)" />
            <text x="285" y="160" fill="#1d4ed8" fontSize="17" fontWeight="900">Electron Flow</text>
            <text x="392" y="160" fill="#111827" fontSize="15" fontWeight="700">(actual)</text>
            <text x="258" y="194" fill="#111827" fontSize="14" fontWeight="600">Electrons move from negative terminal to positive terminal.</text>

            <path d="M245 242H415" stroke="#dc2626" strokeWidth="3" markerEnd="url(#redArrow)" />
            <text x="270" y="230" fill="#dc2626" fontSize="17" fontWeight="900">Conventional Current Flow</text>
            <text x="255" y="263" fill="#111827" fontSize="14" fontWeight="600">By convention, current is assumed to flow from positive to negative.</text>

            <path d="M140 112H115" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M210 112H185" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M535 112H510" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M600 112H575" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M620 155V180" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M620 215V240" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M170 278H195" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M300 278H325" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M430 278H455" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
          </svg>

          <div className="mt-4 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-extrabold uppercase tracking-wide text-emerald-800">Key Idea</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Electricity exists because charges can move from one place to another.
              </p>
            </div>
            <div className="rounded-xl border border-dashed border-blue-300 bg-white p-4">
              <h5 className="text-center text-sm font-extrabold uppercase tracking-wide text-blue-700">
                Working Flow
              </h5>
              <ol className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                {[
                  "The battery creates a potential difference between its positive and negative terminals.",
                  "This voltage produces an electric field inside the conductor.",
                  "Electrons move from the negative terminal to the positive terminal.",
                  "This movement of charge is called electric current.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4">
            <h5 className="text-sm font-extrabold uppercase tracking-wide text-[#071b58]">
              Electric Charge (Q)
            </h5>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
              <p><span className="font-bold text-blue-700">− Negative charge:</span> excess of electrons.</p>
              <p><span className="font-bold text-red-600">+ Positive charge:</span> deficiency of electrons.</p>
              <p>Electrons carry <span className="font-bold text-blue-700">negative</span> charge.</p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
            <h5 className="text-center text-sm font-extrabold uppercase tracking-wide text-emerald-800">
              Voltage (V)
            </h5>
            <p className="mt-3 text-center text-sm leading-6 text-slate-700">
              Voltage is the driving force that pushes charges through a circuit.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-2xl font-black text-red-600">+</span>
              <div className="h-9 w-28 rounded-md bg-gradient-to-r from-red-500 via-slate-200 to-blue-600" />
              <span className="text-2xl font-black text-blue-700">−</span>
            </div>
            <div className="mt-2 flex justify-between text-xs font-semibold text-slate-700">
              <span>High Potential (+)</span>
              <span>Low Potential (−)</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h5 className="text-center text-sm font-extrabold uppercase tracking-wide text-slate-700">
              Legend
            </h5>
            <div className="mt-3 grid gap-2 text-sm text-slate-700">
              <p><span className="font-bold text-blue-700">Blue dot:</span> electron or negative charge</p>
              <p><span className="font-bold text-red-600">Red arrow:</span> conventional current (+ to −)</p>
              <p><span className="font-bold text-blue-700">Blue arrow:</span> electron flow (− to +)</p>
              <p><span className="font-bold text-slate-900">Black line:</span> conductor or wire</p>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm leading-6 text-amber-950">
        <span className="font-bold">Charge (Q)</span> → quantity of electricity
        <span className="mx-3 text-amber-700">|</span>
        <span className="font-bold">Current (I)</span> → rate of charge flow
        <span className="mx-3 text-amber-700">|</span>
        <span className="font-bold">Voltage (V)</span> → driving force
      </div>
    </section>
  );
}

function StepAnimatedCircuitGuide() {
  const steps = [
    ["Step 1", "Basic Circuit", "Wires and battery appear first. The battery terminals are labelled + and -."],
    ["Step 2", "Electric Charge", "Blue dots appear on the wire. They represent electrons, which carry negative charge."],
    ["Step 3", "Current", "The blue dots start moving from the negative terminal toward the positive terminal."],
    ["Step 4", "Voltage", "The battery terminals glow to show high potential and low potential."],
    ["Step 5", "Resistor", "The resistor is added. It glows softly because electrical energy is used there."],
    ["Step 6", "Combined View", "Charge motion, current direction, voltage, and resistor energy use are shown together."],
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <style>{`
        .stage-card {
          opacity: 0.38;
          animation: guideStage 36s linear infinite;
        }
        .stage-1 { animation-delay: 0s; }
        .stage-2 { animation-delay: -30s; }
        .stage-3 { animation-delay: -24s; }
        .stage-4 { animation-delay: -18s; }
        .stage-5 { animation-delay: -12s; }
        .stage-6 { animation-delay: -6s; }

        .guide-step-2,
        .guide-step-3,
        .guide-step-4,
        .guide-step-5,
        .guide-step-6 {
          opacity: 0;
        }
        .guide-step-2 { animation: guideReveal2 36s linear infinite; }
        .guide-step-3 { animation: guideReveal3 36s linear infinite; }
        .guide-step-4 { animation: guideReveal4 36s linear infinite; }
        .guide-step-5 { animation: guideReveal5 36s linear infinite; }
        .guide-step-6 { animation: guideReveal6 36s linear infinite; }

        .terminal-glow { animation: guidePulse 2.2s ease-in-out infinite; }
        .resistor-glow { animation: guideResistorPulse 2s ease-in-out infinite; }
        .charge-static { animation: guideChargeBreathe 2.4s ease-in-out infinite; }

        @keyframes guideStage {
          0%, 13% { opacity: 1; transform: translateY(-1px); }
          19%, 100% { opacity: 0.38; transform: translateY(0); }
        }
        @keyframes guideReveal2 {
          0%, 15% { opacity: 0; }
          18%, 32% { opacity: 1; }
          35%, 100% { opacity: 0; }
        }
        @keyframes guideReveal3 {
          0%, 32% { opacity: 0; }
          35%, 100% { opacity: 1; }
        }
        @keyframes guideReveal4 {
          0%, 49% { opacity: 0; }
          52%, 100% { opacity: 1; }
        }
        @keyframes guideReveal5 {
          0%, 65% { opacity: 0; }
          68%, 100% { opacity: 1; }
        }
        @keyframes guideReveal6 {
          0%, 82% { opacity: 0; }
          85%, 100% { opacity: 1; }
        }
        @keyframes guidePulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.95; }
        }
        @keyframes guideResistorPulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.72; }
        }
        @keyframes guideChargeBreathe {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
      `}</style>

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        1. Electric Charge, Current, And Voltage
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-700">
        Electricity exists because charges can move from one place to another.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div>
          <h5 className="text-base font-bold text-slate-900">Theory Explanation</h5>
          <div className="mt-2 grid gap-3 text-sm leading-7 text-slate-700">
            <p>
              Electric charge is the basic electrical quantity responsible for all electrical
              effects. In metal wires, electrons carry negative charge and can move when a
              complete circuit path is available.
            </p>
            <p>
              Current is the rate of flow of charge. When the battery is connected in a
              closed circuit, electrons move through the wire from the negative terminal
              toward the positive terminal. In circuit theory, conventional current is
              shown in the opposite direction, from positive to negative.
            </p>
            <p>
              Voltage is the potential difference created by the battery. It acts as the
              electrical push that makes charge move. When a resistor is added, electrical
              energy is used in the resistor, so it is shown with a soft glow in the
              animation.
            </p>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60 p-2 shadow-sm sm:p-3">
          <div className="max-w-full overflow-x-auto overscroll-x-contain rounded-xl">
          <svg viewBox="0 0 760 430" className="h-auto w-full max-w-full" role="img" aria-label="Step by step animated circuit guide">
          <defs>
            <linearGradient id="guideBattery" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#d7932b" />
              <stop offset="45%" stopColor="#f0b14b" />
              <stop offset="46%" stopColor="#111827" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>
            <linearGradient id="guideVoltageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#93c5fd" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.45" />
            </linearGradient>
            <marker id="guideRedArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
              <path d="M0 0 9 4.5 0 9Z" fill="#dc2626" />
            </marker>
            <marker id="guideBlueArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
              <path d="M0 0 9 4.5 0 9Z" fill="#1d4ed8" />
            </marker>
            <filter id="guideElectronGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="guideResistorGlow" x="-60%" y="-120%" width="220%" height="340%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="24" y="28" width="712" height="372" rx="22" fill="#ffffff" stroke="#e2e8f0" />

          <g id="guide-step-1-basic-circuit">
            <path d="M118 130H650V316H118V240" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M118 178V130" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
            <rect x="82" y="178" width="72" height="126" rx="16" fill="url(#guideBattery)" stroke="#334155" strokeWidth="2" />
            <rect x="106" y="164" width="24" height="16" rx="4" fill="#64748b" />
            <text x="107" y="220" fill="#ffffff" fontSize="30" fontWeight="900">+</text>
            <text x="110" y="282" fill="#ffffff" fontSize="30" fontWeight="900">-</text>
            <text x="55" y="205" fill="#111827" fontSize="15" fontWeight="800">Battery</text>
            <text x="40" y="227" fill="#475569" fontSize="12" fontWeight="700">Voltage source</text>
            <text x="160" y="182" fill="#dc2626" fontSize="24" fontWeight="900">+</text>
            <text x="162" y="302" fill="#1d4ed8" fontSize="24" fontWeight="900">-</text>
          </g>

          <g id="guide-step-2-electric-charge" className="guide-step-2 charge-static">
            {[220, 330, 470, 600].map((x) => (
              <g key={`guide-top-charge-${x}`}>
                <circle cx={x} cy="130" r="10" fill="#3b82f6" filter="url(#guideElectronGlow)" />
                <text x={x - 4} y="135" fill="#ffffff" fontSize="15" fontWeight="900">-</text>
              </g>
            ))}
            {[250, 400, 550].map((x) => (
              <g key={`guide-bottom-charge-${x}`}>
                <circle cx={x} cy="316" r="10" fill="#3b82f6" filter="url(#guideElectronGlow)" />
                <text x={x - 4} y="321" fill="#ffffff" fontSize="15" fontWeight="900">-</text>
              </g>
            ))}
            <text x="238" y="84" fill="#1d4ed8" fontSize="15" fontWeight="900">Electric charge (Q)</text>
            <text x="238" y="106" fill="#475569" fontSize="13" fontWeight="700">Blue dots represent electrons.</text>
          </g>

          <g id="guide-step-3-current" className="guide-step-3">
            <circle r="6" fill="#1d4ed8" filter="url(#guideElectronGlow)">
              <animateMotion dur="9s" repeatCount="indefinite" path="M118 240V316H650V130H118V178" />
            </circle>
            <circle r="6" fill="#1d4ed8" filter="url(#guideElectronGlow)">
              <animateMotion dur="9s" begin="-3s" repeatCount="indefinite" path="M118 240V316H650V130H118V178" />
            </circle>
            <circle r="6" fill="#1d4ed8" filter="url(#guideElectronGlow)">
              <animateMotion dur="9s" begin="-6s" repeatCount="indefinite" path="M118 240V316H650V130H118V178" />
            </circle>
            <path d="M272 206H442" stroke="#dc2626" strokeWidth="3" markerEnd="url(#guideRedArrow)" />
            <text x="284" y="195" fill="#dc2626" fontSize="15" fontWeight="900">Conventional current (+ to -)</text>
            <path d="M442 246H272" stroke="#1d4ed8" strokeWidth="3" markerEnd="url(#guideBlueArrow)" />
            <text x="286" y="270" fill="#1d4ed8" fontSize="15" fontWeight="900">Electron flow (- to +)</text>
          </g>

          <g id="guide-step-4-voltage" className="guide-step-4">
            <path d="M118 130H650V316H118V240" fill="none" stroke="url(#guideVoltageGradient)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity="0.38" />
            <circle className="terminal-glow" cx="164" cy="178" r="19" fill="#ef4444" opacity="0.35" />
            <circle className="terminal-glow" cx="164" cy="302" r="19" fill="#2563eb" opacity="0.35" />
            <text x="178" y="172" fill="#dc2626" fontSize="13" fontWeight="900">High potential</text>
            <text x="178" y="309" fill="#1d4ed8" fontSize="13" fontWeight="900">Low potential</text>
            <text x="500" y="84" fill="#0f766e" fontSize="15" fontWeight="900">Voltage pushes charge</text>
          </g>

          <g id="guide-step-5-resistor" className="guide-step-5">
            <path className="resistor-glow" d="M342 130h18l10-18 20 36 20-36 20 36 20-36 10 18h18" fill="none" stroke="#f59e0b" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" filter="url(#guideResistorGlow)" />
            <path d="M342 130h18l10-18 20 36 20-36 20 36 20-36 10 18h18" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <text x="382" y="100" fill="#111827" fontSize="16" fontWeight="900">Resistor (R)</text>
            <text x="368" y="168" fill="#92400e" fontSize="13" fontWeight="800">energy is used here</text>
          </g>

          <g id="guide-step-6-final" className="guide-step-6">
            <rect x="208" y="342" width="365" height="36" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <text x="230" y="365" fill="#0f172a" fontSize="14" fontWeight="800">
              Charge moves {"->"} current flows {"->"} voltage provides the push.
            </text>
          </g>
          </svg>
          </div>
        </div>

        <aside className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step[0]}
              className={`stage-card stage-${index + 1} rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm`}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-portal-700">
                {step[0]}: {step[1]}
              </p>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{step[2]}</p>
            </div>
          ))}
        </aside>
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm leading-6 text-amber-950">
        <span className="font-bold">Charge (Q)</span> {"->"} quantity of electricity
        <span className="mx-3 text-amber-700">|</span>
        <span className="font-bold">Current (I)</span> {"->"} rate of charge flow
        <span className="mx-3 text-amber-700">|</span>
        <span className="font-bold">Voltage (V)</span> {"->"} driving force
      </div>
    </section>
  );
}

function ProfessionalChargeCircuitGuide() {
  const steps = [
    ["1", "Circuit Formation", "The circuit path is created first, connecting the battery and wire into a complete loop. The positive and negative terminals are clearly identified."],
    ["2", "Charge Appearance", "Blue particles represent electrons, the tiny moving charges that carry electricity through the wire."],
    ["3", "Voltage Effect", "The battery creates a voltage difference, which acts like a push that sets the charges in motion."],
    ["4", "Current Flow", "Electrons start moving from the negative terminal toward the positive terminal, creating a steady flow called current."],
    ["5", "Conventional Current", "A red arrow shows the assumed direction of current from positive to negative, used for circuit analysis."],
    ["6", "Energy Use", "As charges pass through the resistor, electrical energy is converted into heat, shown by a soft pulsing effect."],
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <style>{`
        .pro-wire {
          fill: none;
          stroke: #111827;
          stroke-width: 5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: proWireDraw 24s ease-in-out infinite;
        }

        .pro-resistor {
          opacity: 0;
          animation: proFadeIn 24s linear infinite;
        }

        .pro-static-charge {
          opacity: 0;
          animation: proStaticCharge 24s linear infinite;
        }

        .pro-moving-charge {
          opacity: 0;
          animation: proMovingCharge 24s linear infinite;
        }

        .pro-voltage-layer {
          opacity: 0;
          animation: proVoltage 24s linear infinite;
        }

        .pro-current-arrow {
          opacity: 0;
          animation: proConventionalCurrent 24s linear infinite;
        }

        .pro-label {
          opacity: 1;
        }

        .pro-terminal-hot {
          animation: proTerminalPulse 1.8s ease-in-out infinite;
        }

        .pro-resistor-glow {
          opacity: 0;
          animation: proResistorPulse 1.8s ease-in-out infinite, proResistorVisible 24s linear infinite;
        }

        .pro-stage-card {
          opacity: 0.42;
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        .pro-stage-1 { animation: proStageOne 24s linear infinite; }
        .pro-stage-2 { animation: proStageTwo 24s linear infinite; }
        .pro-stage-3 { animation: proStageThree 24s linear infinite; }
        .pro-stage-4 { animation: proStageFour 24s linear infinite; }
        .pro-stage-5 { animation: proStageFive 24s linear infinite; }
        .pro-stage-6 { animation: proStageSix 24s linear infinite; }

        @keyframes proWireDraw {
          0% { stroke-dashoffset: 1400; opacity: 1; }
          16%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes proFadeIn {
          0%, 80% { opacity: 0; }
          84%, 100% { opacity: 1; }
        }

        @keyframes proStaticCharge {
          0%, 16% { opacity: 0; }
          19%, 100% { opacity: 1; }
        }

        @keyframes proVoltage {
          0%, 32% { opacity: 0; }
          35%, 100% { opacity: 1; }
        }

        @keyframes proMovingCharge {
          0%, 48% { opacity: 0; }
          51%, 100% { opacity: 1; }
        }

        @keyframes proConventionalCurrent {
          0%, 64% { opacity: 0; transform: translateX(-14px); }
          67%, 100% { opacity: 0.72; transform: translateX(0); }
        }

        @keyframes proTerminalPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.85; }
        }

        @keyframes proResistorVisible {
          0%, 80% { opacity: 0; }
          84%, 100% { opacity: 1; }
        }

        @keyframes proResistorPulse {
          0%, 100% { stroke-opacity: 0.28; }
          50% { stroke-opacity: 0.85; }
        }

        @keyframes proStageOne {
          0%, 16% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          19%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes proStageTwo {
          0%, 16% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          19%, 32% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          35%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes proStageThree {
          0%, 32% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          35%, 48% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          51%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes proStageFour {
          0%, 48% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          51%, 64% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          67%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes proStageFive {
          0%, 64% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          67%, 80% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          83%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes proStageSix {
          0%, 80% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          84%, 100% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
        }
      `}</style>

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        1. Electric Charge, Current, And Voltage
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-700">
        Electric charge moves in a closed circuit, current describes that motion, and voltage provides the push.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div>
          <h5 className="text-base font-bold text-slate-900">
            Electric Charge, Current, and Voltage
          </h5>
          <div className="mt-2 grid gap-3 text-sm leading-7 text-slate-700">
            <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4">
              <h6 className="text-sm font-bold text-slate-950">Electric Charge (Q)</h6>
              <p className="mt-2">
                Electricity begins with charge, the basic property that allows particles
                to interact electrically. In conductors, electrons carry negative charge
                and are free to move when the circuit is closed.
              </p>
              <ul className="mt-3 grid gap-2 text-sm leading-6">
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  A negative charge means excess electrons.
                </li>
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  A positive charge means a lack of electrons.
                </li>
              </ul>
              <p className="mt-3 font-semibold text-slate-900">
                When a complete path is available, these electrons start moving, and
                this movement creates electricity.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h6 className="text-sm font-bold text-slate-950">Electric Current (I)</h6>
              <p className="mt-2">
                Electric current describes how fast charge moves through a circuit. It
                is not a separate substance; it is the organized motion of electrons
                through the wire.
              </p>
              <ul className="mt-3 grid gap-2 text-sm leading-6">
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  Electrons physically move from the negative terminal to the positive terminal.
                </li>
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  For analysis, conventional current is taken from positive to negative.
                </li>
              </ul>
              <p className="mt-3 font-semibold text-slate-900">
                Current is the motion of charge, not a material that gets used up.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
              <h6 className="text-sm font-bold text-slate-950">Voltage (V)</h6>
              <p className="mt-2">
                Voltage causes charge to move. It represents the energy difference
                between two points, created by a source such as a battery.
              </p>
              <ul className="mt-3 grid gap-2 text-sm leading-6">
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  The positive terminal has higher potential.
                </li>
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  The negative terminal has lower potential.
                </li>
              </ul>
              <p className="mt-3">
                This difference pushes electrons through the circuit, much like pressure
                pushes water through a pipe. When a component such as a resistor is
                added, part of this electrical energy is converted into heat.
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4">
              <h6 className="text-sm font-bold text-slate-950">Charge Relation</h6>
              <p className="mt-2">
                Electric charge represents the quantity of electricity transferred in a
                circuit.
              </p>
              <p className="mt-3 text-sm font-bold text-slate-900">Formula:</p>
              <p className="mt-1 font-mono text-base font-bold text-portal-700">Q = I x t</p>
              <p className="mt-3 text-sm font-bold text-slate-900">Where:</p>
              <ul className="mt-2 grid gap-2 text-sm leading-6">
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  Q = Charge, measured in coulombs (C)
                </li>
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  I = Current, measured in amperes (A)
                </li>
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  t = Time, measured in seconds (s)
                </li>
              </ul>
              <p className="mt-3">
                <span className="font-bold text-slate-900">Meaning: </span>
                If current flows for a certain time, a definite amount of charge is
                transferred through the circuit. More current or more time means more
                charge has moved.
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-3">
          <div className="max-w-full overflow-x-auto overscroll-x-contain rounded-xl">
          <svg viewBox="0 0 900 440" className="h-auto w-full max-w-full" role="img" aria-label="Animated DC circuit explaining charge current and voltage">
            <defs>
              <linearGradient id="proVoltageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.42" />
                <stop offset="55%" stopColor="#bfdbfe" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.35" />
              </linearGradient>
              <marker id="proRedArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                <path d="M0 0 10 5 0 10Z" fill="#dc2626" />
              </marker>
              <marker id="proBlueArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                <path d="M0 0 10 5 0 10Z" fill="#1d4ed8" />
              </marker>
              <filter id="proElectronGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="proResistorGlowFilter" x="-80%" y="-150%" width="260%" height="400%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="20" y="25" width="860" height="385" rx="22" fill="#ffffff" stroke="#e2e8f0" />

            <g id="step-1-circuit-formation">
              <path className="pro-wire" d="M132 172V112H760V330H132V252" />
              <rect x="92" y="172" width="80" height="80" rx="12" fill="#ffffff" stroke="#111827" strokeWidth="4" />
              <path d="M116 194h32M132 178v32M118 232h28" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
              <text x="80" y="155" fill="#111827" fontSize="15" fontWeight="800">Battery</text>
              <text x="178" y="184" fill="#dc2626" fontSize="24" fontWeight="900">+</text>
              <text x="180" y="252" fill="#1d4ed8" fontSize="24" fontWeight="900">-</text>
            </g>

            <g id="step-6-energy-use" className="pro-resistor">
              <path
                className="pro-resistor-glow"
                d="M350 112h20l12-20 24 40 24-40 24 40 24-40 12 20h10"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#proResistorGlowFilter)"
              />
              <path d="M350 112h20l12-20 24 40 24-40 24 40 24-40 12 20h10" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="397" y="76" fill="#111827" fontSize="17" fontWeight="900">Resistor (R)</text>
              <text x="382" y="154" fill="#92400e" fontSize="13" fontWeight="800">energy is used here</text>
            </g>

            <g
              id="step-2-charge-appearance"
              className="pro-static-charge"
            >
              {[260, 610, 710].map((x) => (
                <g key={`pro-static-top-${x}`}>
                  <circle cx={x} cy="112" r="9" fill="#2563eb" filter="url(#proElectronGlow)" />
                  <text x={x - 3.5} y="117" fill="#ffffff" fontSize="14" fontWeight="900">-</text>
                </g>
              ))}
              {[260, 430, 610].map((x) => (
                <g key={`pro-static-bottom-${x}`}>
                  <circle cx={x} cy="330" r="9" fill="#2563eb" filter="url(#proElectronGlow)" />
                  <text x={x - 3.5} y="335" fill="#ffffff" fontSize="14" fontWeight="900">-</text>
                </g>
              ))}
              <text className="pro-label label-charge" x="230" y="65" fill="#1d4ed8" fontSize="15" fontWeight="900">
                Electric Charge (Q)
              </text>
            </g>

            <g
              id="step-4-current-flow"
              className="pro-moving-charge"
            >
              <circle r="6" fill="#1d4ed8" filter="url(#proElectronGlow)">
                <animateMotion dur="11s" repeatCount="indefinite" path="M132 252V330H760V112H500H350H132V172" />
              </circle>
              <circle r="6" fill="#1d4ed8" filter="url(#proElectronGlow)">
                <animateMotion dur="11s" begin="-3.66s" repeatCount="indefinite" path="M132 252V330H760V112H500H350H132V172" />
              </circle>
              <circle r="6" fill="#1d4ed8" filter="url(#proElectronGlow)">
                <animateMotion dur="11s" begin="-7.32s" repeatCount="indefinite" path="M132 252V330H760V112H500H350H132V172" />
              </circle>
              <path d="M580 185H390" stroke="#1d4ed8" strokeWidth="3" markerEnd="url(#proBlueArrow)" />
              <text className="pro-label label-electron" x="405" y="174" fill="#1d4ed8" fontSize="15" fontWeight="900">
                Electron flow (- to +)
              </text>
            </g>

            <g
              id="step-3-voltage-effect"
              className="pro-voltage-layer"
            >
              <path d="M132 172V112H760V330H132V252" fill="none" stroke="url(#proVoltageGradient)" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
              <circle className="pro-terminal-hot" cx="186" cy="176" r="20" fill="#ef4444" />
              <circle cx="186" cy="252" r="16" fill="#2563eb" opacity="0.28" />
              <text x="205" y="174" fill="#dc2626" fontSize="13" fontWeight="900">High potential</text>
              <text x="205" y="257" fill="#1d4ed8" fontSize="13" fontWeight="900">Low potential</text>
              <text className="pro-label label-voltage" x="590" y="68" fill="#0f766e" fontSize="15" fontWeight="900">
                Voltage pushes charge
              </text>
            </g>

            <g
              id="step-5-conventional-current"
              className="pro-current-arrow"
            >
              <path d="M300 245H555" stroke="#dc2626" strokeWidth="3" markerEnd="url(#proRedArrow)" />
              <text className="pro-label label-conventional" x="330" y="235" fill="#dc2626" fontSize="15" fontWeight="900">
                Conventional current (+ to -)
              </text>
            </g>

            <g id="final-note">
              <rect x="255" y="360" width="390" height="34" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
              <text x="280" y="382" fill="#0f172a" fontSize="14" fontWeight="800">
                Charge moves, current flows, and voltage provides the push.
              </text>
            </g>
          </svg>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {steps.map(([number, title, text]) => (
            <div
              key={number}
              className={`pro-stage-card pro-stage-${number} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-portal-700">
                Step {number}: {title}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PowerEnergyGuide() {
  const steps = [
    ["1", "Power Generation", "The source provides voltage and current, creating electrical power in the circuit."],
    ["2", "Power Flow", "Electrical power moves through the circuit along with current."],
    ["3", "Power Use", "When current passes through a component like a resistor, power is absorbed."],
    ["4", "Energy Conversion", "The absorbed power is converted into other forms such as heat or light."],
    ["5", "Energy Over Time", "As time passes, energy continues to accumulate based on power usage."],
    ["6", "Total Energy", "The total energy used depends on how long the circuit operates."],
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <style>{`
        .power-flow-dot {
          opacity: 0;
          filter: url(#powerFlowGlow);
          animation: powerFlowVisible 18s ease-in-out infinite;
        }

        .power-wire {
          stroke-dasharray: 1700;
          stroke-dashoffset: 1700;
          animation: powerWireDraw 18s ease-in-out infinite;
        }

        .power-flow-guide {
          opacity: 0;
          stroke-dasharray: 8 12;
          animation: powerFlowGuide 18s linear infinite;
        }

        .power-resistor-glow {
          opacity: 0;
          animation: powerGlowVisible 18s ease-in-out infinite, powerGlowPulse 2s ease-in-out infinite;
        }

        .energy-bar {
          transform-origin: 270px 344px;
          transform: scaleX(0);
          animation: energyFill 18s cubic-bezier(0.42, 0, 0.2, 1) infinite;
        }

        .power-stage-card {
          opacity: 0.42;
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        .power-stage-1 { animation: powerStageOne 18s linear infinite; }
        .power-stage-2 { animation: powerStageTwo 18s linear infinite; }
        .power-stage-3 { animation: powerStageThree 18s linear infinite; }
        .power-stage-4 { animation: powerStageFour 18s linear infinite; }
        .power-stage-5 { animation: powerStageFive 18s linear infinite; }
        .power-stage-6 { animation: powerStageSix 18s linear infinite; }

        @keyframes powerWireDraw {
          0% { stroke-dashoffset: 1700; opacity: 1; }
          22%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes powerFlowVisible {
          0%, 23% { opacity: 0; }
          30%, 100% { opacity: 1; }
        }

        @keyframes powerFlowGuide {
          0%, 23% { opacity: 0; stroke-dashoffset: 0; }
          30% { opacity: 0.45; stroke-dashoffset: 0; }
          100% { opacity: 0.45; stroke-dashoffset: -180; }
        }

        @keyframes powerGlowVisible {
          0%, 30% { opacity: 0; }
          36%, 100% { opacity: 0.9; }
        }

        @keyframes powerGlowPulse {
          0%, 100% { stroke-opacity: 0.24; }
          50% { stroke-opacity: 0.62; }
        }

        @keyframes energyFill {
          0%, 58% { transform: scaleX(0); }
          78% { transform: scaleX(0.58); }
          100% { transform: scaleX(1); }
        }

        @keyframes powerStageOne {
          0%, 16% { opacity: 1; transform: translateY(-1px); border-color: #059669; background-color: #ecfdf5; }
          19%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes powerStageTwo {
          0%, 16% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          19%, 32% { opacity: 1; transform: translateY(-1px); border-color: #059669; background-color: #ecfdf5; }
          35%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes powerStageThree {
          0%, 32% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          35%, 48% { opacity: 1; transform: translateY(-1px); border-color: #059669; background-color: #ecfdf5; }
          51%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes powerStageFour {
          0%, 48% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          51%, 64% { opacity: 1; transform: translateY(-1px); border-color: #059669; background-color: #ecfdf5; }
          67%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes powerStageFive {
          0%, 64% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          67%, 82% { opacity: 1; transform: translateY(-1px); border-color: #059669; background-color: #ecfdf5; }
          85%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes powerStageSix {
          0%, 82% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          85%, 100% { opacity: 1; transform: translateY(-1px); border-color: #059669; background-color: #ecfdf5; }
        }
      `}</style>

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        2. Power and Energy
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-center text-sm font-bold text-emerald-800">
        Power shows how fast electrical energy is used, while energy shows how much is used over time.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div>
          <h5 className="text-base font-bold text-slate-900">Power and Energy</h5>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
              Step 1
            </p>
            <h6 className="mt-1 text-sm font-bold text-slate-950">Electric Power (P)</h6>
            <p className="mt-1.5 text-sm leading-6 text-slate-700">
              Power tells how quickly electrical energy is converted or transferred in a
              circuit. It shows the rate at which a device uses energy.
            </p>
            <p className="mt-2 rounded-lg border border-white bg-white px-3 py-1.5 font-mono text-sm font-bold text-emerald-700">
              P = V I
            </p>
            <ul className="mt-2 grid gap-1.5 text-sm leading-6">
              {["P = Power, measured in watts (W)", "V = Voltage, measured in volts (V)", "I = Current, measured in amperes (A)"].map((item) => (
                <li key={item} className="rounded-md border border-emerald-200 bg-white px-3 py-1.5 font-semibold text-emerald-800">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              More voltage or more current means more power. A heater uses electrical
              power and converts it into heat.
            </p>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-amber-700">
              Step 2
            </p>
            <h6 className="mt-1 text-sm font-bold text-slate-950">Electrical Energy (E)</h6>
            <p className="mt-1.5 text-sm leading-6 text-slate-700">
              Energy is the total amount of electrical work done over time. It increases
              when power is used for a longer duration.
            </p>
            <p className="mt-2 rounded-lg border border-white bg-white px-3 py-1.5 font-mono text-sm font-bold text-amber-700">
              E = P x t
            </p>
            <ul className="mt-2 grid gap-1.5 text-sm leading-6">
              {["E = Energy, measured in joules (J)", "P = Power, measured in watts (W)", "t = Time, measured in seconds (s)"].map((item) => (
                <li key={item} className="rounded-md border border-amber-200 bg-white px-3 py-1.5 font-semibold text-amber-800">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Power is the rate of energy use. Energy is the total amount used, which is
              why electricity bills measure energy in kilowatt-hours.
            </p>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700">
              Step 3
            </p>
            <h6 className="mt-1 text-sm font-bold text-slate-950">Putting It Together</h6>
            <p className="mt-1.5 text-sm leading-6 text-slate-700">
              Voltage pushes charge and current moves charge. Power tells how fast
              energy is being used, and energy tells the total amount used over time.
            </p>
            <div className="mt-2 grid gap-1.5 text-sm leading-6">
              <p className="rounded-md border border-blue-200 bg-white px-3 py-1.5 font-semibold text-blue-800">
                Power = speed of energy use.
              </p>
              <p className="rounded-md border border-blue-200 bg-white px-3 py-1.5 font-semibold text-blue-800">
                Energy = total usage over time.
              </p>
              <p className="rounded-md border border-blue-200 bg-white px-3 py-1.5 font-semibold text-blue-800">
                Higher power or longer time means more energy consumed.
              </p>
            </div>
          </div>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-3">
          <div className="max-w-full overflow-x-auto overscroll-x-contain rounded-xl">
          <svg viewBox="0 0 900 460" className="h-auto w-full max-w-full" role="img" aria-label="Animated circuit showing power flow and energy accumulation">
            <defs>
              <marker id="powerArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                <path d="M0 0 10 5 0 10Z" fill="#059669" />
              </marker>
              <filter id="powerGlowFilter" x="-80%" y="-150%" width="260%" height="400%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="powerFlowGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="energyMeterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#16a34a" />
                <stop offset="70%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#86efac" />
              </linearGradient>
            </defs>
            <rect x="20" y="25" width="860" height="405" rx="22" fill="#ffffff" stroke="#e2e8f0" />

            <rect x="65" y="58" width="185" height="52" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
            <text x="86" y="80" fill="#0f172a" fontSize="13" fontWeight="800">Source creates</text>
            <text x="86" y="99" fill="#047857" fontSize="15" fontWeight="900">P = V x I</text>

            <rect x="365" y="58" width="180" height="52" rx="14" fill="#fffbeb" stroke="#fde68a" />
            <text x="388" y="80" fill="#0f172a" fontSize="13" fontWeight="800">Load absorbs</text>
            <text x="388" y="99" fill="#b45309" fontSize="15" fontWeight="900">power as heat</text>

            <rect x="635" y="58" width="190" height="52" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
            <text x="656" y="80" fill="#0f172a" fontSize="13" fontWeight="800">Time accumulates</text>
            <text x="656" y="99" fill="#1d4ed8" fontSize="15" fontWeight="900">E = P x t</text>

            <path className="power-wire" d="M150 225V150H750V295H150V252" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="108" y="188" width="84" height="64" rx="12" fill="#ffffff" stroke="#111827" strokeWidth="4" />
            <path d="M132 206h34M150 194v30M132 235h34" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
            <text x="106" y="174" fill="#111827" fontSize="15" fontWeight="800">Battery source</text>
            <text x="200" y="202" fill="#dc2626" fontSize="20" fontWeight="900">V</text>
            <text x="201" y="238" fill="#059669" fontSize="16" fontWeight="900">I</text>

            <path className="power-resistor-glow" d="M378 150h20l12-20 24 40 24-40 24 40 24-40 12 20h24" fill="none" stroke="#f59e0b" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" filter="url(#powerGlowFilter)" />
            <path d="M378 150h20l12-20 24 40 24-40 24 40 24-40 12 20h24" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="407" y="203" fill="#111827" fontSize="16" fontWeight="900">Resistor / Load</text>
            <path d="M455 184v-24" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />

            <path className="power-flow-guide" d="M250 128H650" stroke="#059669" strokeWidth="4" strokeLinecap="round" markerEnd="url(#powerArrow)" />
            <text className="power-flow-dot" x="366" y="120" fill="#047857" fontSize="15" fontWeight="900">power travels with current</text>
            <circle className="power-flow-dot" r="6.5" fill="#10b981">
              <animateMotion dur="10.5s" repeatCount="indefinite" path="M150 252V295H750V150H542H378H150V225" />
            </circle>
            <circle className="power-flow-dot" r="6.5" fill="#34d399">
              <animateMotion dur="10.5s" begin="-3.5s" repeatCount="indefinite" path="M150 252V295H750V150H542H378H150V225" />
            </circle>
            <circle className="power-flow-dot" r="6.5" fill="#6ee7b7">
              <animateMotion dur="10.5s" begin="-7s" repeatCount="indefinite" path="M150 252V295H750V150H542H378H150V225" />
            </circle>

            <text x="155" y="348" fill="#0f172a" fontSize="14" fontWeight="900">Energy meter</text>
            <rect x="270" y="332" width="430" height="24" rx="12" fill="#f1f5f9" stroke="#cbd5e1" />
            <rect className="energy-bar" x="270" y="332" width="430" height="24" rx="12" fill="url(#energyMeterGradient)" />
            <text x="370" y="382" fill="#0f172a" fontSize="14" fontWeight="900">total energy used increases with time</text>
            <text x="716" y="350" fill="#047857" fontSize="13" fontWeight="900">time</text>
          </svg>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {steps.map(([number, title, text]) => (
            <div
              key={number}
              className={`power-stage-card power-stage-${number} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-700">
                Step {number}: {title}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
          Voltage pushes charge, current moves it, power shows how fast energy is used,
          and energy tells how much is consumed over time.
        </div>
      </div>
    </section>
  );
}

function PassiveActiveGuide() {
  const steps = [
    {
      id: 1,
      title: "Source Activation",
      label: "Active source supplies energy",
      text: "The battery starts the circuit by supplying electrical energy.",
      detail:
        "An active element can deliver energy to the network. In this circuit, the battery creates the electrical push that allows current and energy transfer to begin.",
      note: "Active source: supplies energy",
    },
    {
      id: 2,
      title: "Energy Flow",
      label: "Energy flows through the circuit",
      text: "Energy particles follow the wire path continuously.",
      detail:
        "After the circuit path is complete, energy is transferred through the conductors. The moving particles trace the same closed path as the wire, so the flow is easy to follow.",
      note: "Energy transfer follows the closed path",
    },
    {
      id: 3,
      title: "Resistor Response",
      label: "Electrical energy is converted into heat",
      text: "The resistor absorbs energy and dissipates it as heat.",
      detail:
        "A resistor is passive because it cannot create energy. It absorbs electrical energy from the circuit and converts that energy into heat.",
      note: "Resistor: energy is dissipated",
    },
    {
      id: 4,
      title: "Capacitor Response",
      label: "Energy is stored in an electric field",
      text: "Charge builds between the plates and releases smoothly.",
      detail:
        "A capacitor is passive because it stores energy temporarily. Charge separation between its plates creates an electric field, then the stored energy can be released back to the circuit.",
      note: "Capacitor: electric-field storage",
    },
    {
      id: 5,
      title: "Inductor Response",
      label: "Energy is stored in a magnetic field",
      text: "Current through the coil creates a magnetic field.",
      detail:
        "An inductor is passive because it stores energy only when current flows through it. The coil creates a magnetic field that grows and collapses with current changes.",
      note: "Inductor: magnetic-field storage",
    },
    {
      id: 6,
      title: "Energy Distribution",
      label: "Energy is distributed throughout the circuit",
      text: "The supplied energy reaches each passive element.",
      detail:
        "The active source supplies energy, and the passive elements decide what happens to it: the resistor uses it, the capacitor stores it electrically, and the inductor stores it magnetically.",
      note: "Source supplies; passive elements respond",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <style>{`
        .pa-component {
          opacity: 0;
          animation: paComponentFade 18s ease-in-out infinite;
        }

        .pa-source {
          animation-delay: 0.4s;
        }

        .pa-resistor {
          animation-delay: 1s;
        }

        .pa-capacitor {
          animation-delay: 1.25s;
        }

        .pa-inductor {
          animation-delay: 1.5s;
        }

        .pa-drawn-wire {
          stroke-dasharray: 1780;
          stroke-dashoffset: 1780;
          animation: paDrawCircuit 18s ease-in-out infinite;
        }

        .pa-source-pulse {
          animation: paSourcePulse 18s ease-in-out infinite;
        }

        .pa-energy-particle {
          filter: url(#paPulseGlow);
          opacity: 0;
          animation: paFlowVisible 18s ease-in-out infinite;
        }

        .pa-resistor-heat {
          opacity: 0;
          animation: paHeatVisible 18s ease-in-out infinite, paHeatPulse 1.8s ease-in-out infinite;
        }

        .pa-capacitor-fill {
          transform-origin: 518px 155px;
          transform: scaleY(0);
          opacity: 0;
          animation: paCapacitorFill 18s ease-in-out infinite;
        }

        .pa-capacitor-field {
          opacity: 0;
          animation: paCapacitorField 18s ease-in-out infinite;
        }

        .pa-inductor-wave-one {
          transform-origin: 654px 155px;
          opacity: 0;
          animation: paRippleOne 18s ease-in-out infinite;
        }

        .pa-inductor-wave-two {
          transform-origin: 654px 155px;
          opacity: 0;
          animation: paRippleTwo 18s ease-in-out infinite;
        }

        .pa-distribution {
          opacity: 0;
          animation: paDistributionVisible 18s ease-in-out infinite;
        }

        .pa-stage-card {
          opacity: 0.42;
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        .pa-stage-1 { animation: paStageOne 18s linear infinite; }
        .pa-stage-2 { animation: paStageTwo 18s linear infinite; }
        .pa-stage-3 { animation: paStageThree 18s linear infinite; }
        .pa-stage-4 { animation: paStageFour 18s linear infinite; }
        .pa-stage-5 { animation: paStageFive 18s linear infinite; }
        .pa-stage-6 { animation: paStageSix 18s linear infinite; }

        @keyframes paComponentFade {
          0%, 4% { opacity: 0; transform: translateY(4px); }
          10%, 100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes paDrawCircuit {
          0% { stroke-dashoffset: 1780; }
          18%, 100% { stroke-dashoffset: 0; }
        }

        @keyframes paSourcePulse {
          0%, 8% { filter: drop-shadow(0 0 0 rgba(37, 99, 235, 0)); }
          13%, 100% { filter: drop-shadow(0 0 10px rgba(37, 99, 235, 0.28)); }
        }

        @keyframes paFlowVisible {
          0%, 20% { opacity: 0; }
          27%, 100% { opacity: 0.95; }
        }

        @keyframes paHeatVisible {
          0%, 34% { opacity: 0; }
          41%, 100% { opacity: 0.9; }
        }

        @keyframes paHeatPulse {
          0%, 100% { stroke-opacity: 0.24; }
          50% { stroke-opacity: 0.78; }
        }

        @keyframes paCapacitorFill {
          0%, 49% { transform: scaleY(0); opacity: 0; }
          58% { transform: scaleY(1); opacity: 0.86; }
          72% { transform: scaleY(0.25); opacity: 0.46; }
          86%, 100% { transform: scaleY(0.9); opacity: 0.82; }
        }

        @keyframes paCapacitorField {
          0%, 49% { opacity: 0; }
          58% { opacity: 0.46; }
          72% { opacity: 0.18; }
          86%, 100% { opacity: 0.42; }
        }

        @keyframes paRippleOne {
          0%, 64% { opacity: 0; transform: scale(0.78); }
          72% { opacity: 0.48; transform: scale(0.9); }
          90%, 100% { opacity: 0; transform: scale(1.28); }
        }

        @keyframes paRippleTwo {
          0%, 68% { opacity: 0; transform: scale(0.82); }
          78% { opacity: 0.38; transform: scale(1); }
          96%, 100% { opacity: 0; transform: scale(1.38); }
        }

        @keyframes paDistributionVisible {
          0%, 82% { opacity: 0; stroke-dashoffset: 0; }
          88%, 100% { opacity: 1; stroke-dashoffset: -120; }
        }

        @keyframes paStageOne {
          0%, 16% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          19%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes paStageTwo {
          0%, 16% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          19%, 32% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          35%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes paStageThree {
          0%, 32% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          35%, 48% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          51%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes paStageFour {
          0%, 48% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          51%, 64% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          67%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes paStageFive {
          0%, 64% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          67%, 82% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          85%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes paStageSix {
          0%, 82% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          85%, 100% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pa-drawn-wire,
          .pa-source-pulse,
          .pa-resistor-heat,
          .pa-capacitor-fill,
          .pa-capacitor-field,
          .pa-inductor-wave-one,
          .pa-inductor-wave-two,
          .pa-distribution,
          .pa-stage-card {
            animation: none;
          }

          .pa-drawn-wire {
            stroke-dashoffset: 0;
          }

          .pa-component,
          .pa-energy-particle,
          .pa-resistor-heat,
          .pa-capacitor-fill,
          .pa-capacitor-field,
          .pa-distribution {
            opacity: 1;
          }
        }
      `}</style>

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        3. Passive and Active Elements
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-800">
        Active elements supply energy. Passive elements absorb, store, release, or dissipate that energy.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div>
          <h5 className="text-base font-bold text-slate-900">Passive and Active Elements</h5>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700">
            <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700">
                Active Type
              </p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Active Element Supplies</h6>
              <p className="mt-1.5">
                The battery is the active element. It provides the voltage and energy
                needed to make the circuit operate.
              </p>
              <p className="mt-2 rounded-md border border-blue-200 bg-white px-3 py-2 font-semibold text-blue-800">
                Active source supplies energy.
              </p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-orange-700">
                Passive Type
              </p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Passive Elements Respond</h6>
              <p className="mt-1.5">
                The resistor, capacitor, and inductor do not generate energy. They absorb,
                dissipate, store, or release the supplied energy.
              </p>
              <p className="mt-2 rounded-md border border-orange-200 bg-white px-3 py-2 font-semibold text-orange-800">
                Passive elements use or store energy.
              </p>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                Energy Behavior
              </p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Energy Is Distributed</h6>
              <p className="mt-1.5">
                Energy flows from the source through the complete circuit path and reaches
                each passive element in sequence.
              </p>
              <p className="mt-2 rounded-md border border-emerald-200 bg-white px-3 py-2 font-semibold text-emerald-800">
                Source to resistor, capacitor, and inductor.
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-3">
          <div className="max-w-full overflow-x-auto overscroll-x-contain rounded-xl">
          <svg viewBox="0 0 900 460" className="h-auto w-full max-w-full" role="img" aria-label="Animated circuit showing passive and active elements">
            <defs>
              <filter id="paPulseGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="paHeatGlow" x="-80%" y="-150%" width="260%" height="400%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="20" y="24" width="860" height="405" rx="18" fill="#ffffff" stroke="#e2e8f0" />
            <path
              className="pa-drawn-wire"
              d="M145 230V155H760V305H145V260"
              fill="none"
              stroke="#111827"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g className="pa-component pa-source">
              <rect className="pa-source-pulse" x="103" y="190" width="84" height="70" rx="10" fill="#ffffff" stroke="#111827" strokeWidth="4" />
              <path d="M128 210h34M145 196v30M128 244h34" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
              <text x="102" y="176" fill="#111827" fontSize="15" fontWeight="800">Battery</text>
              <text x="196" y="214" fill="#2563eb" fontSize="14" fontWeight="900">Active source</text>
              <text x="196" y="234" fill="#2563eb" fontSize="13" fontWeight="700">supplies energy</text>
            </g>

            <g className="pa-component pa-resistor">
              <path className="pa-resistor-heat" d="M315 155h18l12-20 22 40 22-40 22 40 22-40 12 20h18" fill="none" stroke="#f97316" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" filter="url(#paHeatGlow)" />
              <path d="M315 155h18l12-20 22 40 22-40 22 40 22-40 12 20h18" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="352" y="205" fill="#9a3412" fontSize="14" fontWeight="900">Heat loss</text>
            </g>

            <g className="pa-component pa-capacitor">
              <rect className="pa-capacitor-field" x="504" y="137" width="24" height="36" rx="7" fill="#bfdbfe" />
              <rect className="pa-capacitor-fill" x="509" y="139" width="14" height="32" rx="5" fill="#2563eb" opacity="0.82" />
              <path d="M500 132v46M530 132v46" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
              <text x="482" y="205" fill="#1d4ed8" fontSize="14" fontWeight="900">Electric field</text>
            </g>

            <g className="pa-component pa-inductor">
              <circle className="pa-inductor-wave-one" cx="654" cy="155" r="34" fill="none" stroke="#10b981" strokeWidth="3" />
              <circle className="pa-inductor-wave-two" cx="654" cy="155" r="44" fill="none" stroke="#10b981" strokeWidth="2" />
              <path d="M610 155c8-20 20 20 28 0s20 20 28 0 20 20 28 0" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
              <text x="612" y="205" fill="#047857" fontSize="14" fontWeight="900">Magnetic field</text>
            </g>

            <g>
              <circle className="pa-energy-particle" r="6.5" fill="#2563eb">
                <animateMotion dur="8.5s" repeatCount="indefinite" path="M145 260V305H760V155H694H610H530H500H463H315H145V230" />
              </circle>
              <circle className="pa-energy-particle" r="6.5" fill="#22c55e">
                <animateMotion dur="8.5s" begin="-2.8s" repeatCount="indefinite" path="M145 260V305H760V155H694H610H530H500H463H315H145V230" />
              </circle>
              <circle className="pa-energy-particle" r="6.5" fill="#60a5fa">
                <animateMotion dur="8.5s" begin="-5.6s" repeatCount="indefinite" path="M145 260V305H760V155H694H610H530H500H463H315H145V230" />
              </circle>
            </g>

            <g className="pa-distribution">
              <path d="M183 296C250 355 345 370 450 352C562 332 646 346 721 297" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 12" />
              <text x="277" y="382" fill="#047857" fontSize="15" fontWeight="900">Energy is distributed throughout the circuit</text>
            </g>
          </svg>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`pa-stage-card pa-stage-${step.id} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-portal-700">
                Step {step.id}: {step.title}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">{step.detail}</p>
              <p className="mt-2 rounded-md bg-white px-2 py-1 text-xs font-bold text-slate-800">
                {step.note}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
          <h6 className="text-sm font-extrabold text-slate-950">Where the formulas come from</h6>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700 lg:grid-cols-3">
            <div className="rounded-lg border border-orange-200 bg-white p-3">
              <p className="font-bold text-orange-800">Resistor power</p>
              <p className="mt-2 font-mono text-sm font-bold text-orange-700">P = V I, V = I R</p>
              <p className="mt-1 font-mono text-sm font-bold text-orange-700">So, P = I^2 R</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                This is power dissipated as heat. P is power in watts, I is current in amperes,
                and R is resistance in ohms.
              </p>
            </div>

            <div className="rounded-lg border border-blue-200 bg-white p-3">
              <p className="font-bold text-blue-800">Capacitor stored energy</p>
              <p className="mt-2 font-mono text-sm font-bold text-blue-700">q = C V</p>
              <p className="mt-1 font-mono text-sm font-bold text-blue-700">E = 1/2 C V^2</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                While charging, voltage rises from 0 to V, so average voltage is V/2.
                Energy = charge x average voltage = CV x V/2.
              </p>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-white p-3">
              <p className="font-bold text-emerald-800">Inductor stored energy</p>
              <p className="mt-2 font-mono text-sm font-bold text-emerald-700">v = L di/dt</p>
              <p className="mt-1 font-mono text-sm font-bold text-emerald-700">E = 1/2 L I^2</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Energy builds as current rises from 0 to I. L is inductance in henrys,
                and I is current in amperes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LinearNonLinearGuide() {
  const stepPairs = [
    {
      number: "1",
      linearTitle: "Apply Voltage",
      linearText: "Voltage is applied across the linear element.",
      nonLinearTitle: "Apply Voltage",
      nonLinearText: "Voltage is applied across the non-linear element.",
    },
    {
      number: "2",
      linearTitle: "Steady Response",
      linearText: "Current increases steadily as voltage increases.",
      nonLinearTitle: "Low Current Start",
      nonLinearText: "Current remains very low at first, even as voltage increases.",
    },
    {
      number: "3",
      linearTitle: "Straight-Line Behavior",
      linearText: "The V-I relation stays proportional at every operating point.",
      nonLinearTitle: "Turn-On Region",
      nonLinearText: "After a certain voltage, current rises sharply and behavior changes.",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <style>{`
        .ln-axis {
          stroke-dasharray: 720;
          stroke-dashoffset: 720;
          animation: lnAxisDraw 18s ease-in-out infinite;
        }

        .ln-linear-line {
          stroke-dasharray: 410;
          stroke-dashoffset: 410;
          animation: lnLinearDraw 18s ease-in-out infinite;
        }

        .ln-curve {
          stroke-dasharray: 560;
          stroke-dashoffset: 560;
          animation: lnCurveDraw 18s ease-in-out infinite;
        }

        .ln-linear-point {
          opacity: 0;
          animation: lnLinearPoint 18s ease-in-out infinite;
        }

        .ln-turn-on {
          opacity: 0;
          animation: lnTurnOn 18s ease-in-out infinite, lnPulse 1.8s ease-in-out infinite;
        }

        .ln-low-region {
          opacity: 0;
          animation: lnLowRegion 18s ease-in-out infinite;
        }

        .ln-stage-card {
          opacity: 0.42;
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        .ln-stage-pair-1 { animation: lnStagePairOne 18s linear infinite; }
        .ln-stage-pair-2 { animation: lnStagePairTwo 18s linear infinite; }
        .ln-stage-pair-3 { animation: lnStagePairThree 18s linear infinite; }

        @keyframes lnAxisDraw {
          0% { stroke-dashoffset: 720; }
          16%, 100% { stroke-dashoffset: 0; }
        }

        @keyframes lnLinearDraw {
          0%, 18% { stroke-dashoffset: 410; opacity: 0; }
          28%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes lnCurveDraw {
          0%, 55% { stroke-dashoffset: 560; opacity: 0; }
          76%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes lnLinearPoint {
          0%, 25% { opacity: 0; transform: translate(0, 0); }
          36% { opacity: 1; transform: translate(55px, -42px); }
          47%, 100% { opacity: 1; transform: translate(110px, -84px); }
        }

        @keyframes lnLowRegion {
          0%, 50% { opacity: 0; }
          58%, 100% { opacity: 0.36; }
        }

        @keyframes lnTurnOn {
          0%, 66% { opacity: 0; }
          74%, 100% { opacity: 1; }
        }

        @keyframes lnPulse {
          0%, 100% { transform: scale(0.96); }
          50% { transform: scale(1.08); }
        }

        @keyframes lnStagePairOne {
          0%, 28% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          34%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes lnStagePairTwo {
          0%, 28% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          34%, 62% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          68%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes lnStagePairThree {
          0%, 62% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          68%, 100% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ln-axis,
          .ln-linear-line,
          .ln-curve,
          .ln-linear-point,
          .ln-turn-on,
          .ln-low-region,
          .ln-stage-card {
            animation: none;
          }

          .ln-axis,
          .ln-linear-line,
          .ln-curve {
            stroke-dashoffset: 0;
          }

          .ln-linear-point,
          .ln-turn-on,
          .ln-low-region {
            opacity: 1;
          }
        }
      `}</style>

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        4. Linear and Non-Linear Elements
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-800">
        Some elements respond in a simple proportional way. Others change behavior depending on operating conditions.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div>
          <h5 className="text-base font-bold text-slate-900">Linear and Non-Linear Elements</h5>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700">
            <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700">Linear Type</p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Linear Elements</h6>
              <p className="mt-1.5">
                A linear element behaves in a direct and proportional way. If voltage
                doubles, current also doubles, as long as resistance is constant.
              </p>
              <p className="mt-2 rounded-md border border-blue-200 bg-white px-3 py-2 font-mono text-sm font-bold text-blue-800">
                V = I R
              </p>
              <p className="mt-2 rounded-md border border-blue-200 bg-white px-3 py-2 font-semibold text-blue-800">
                The output follows the input in a straight and predictable manner.
              </p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-orange-700">Non-Linear Type</p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Non-Linear Elements</h6>
              <p className="mt-1.5">
                A non-linear element does not follow one fixed proportional relation.
                Small voltage may produce almost no current, but after turn-on the current
                can rise sharply.
              </p>
              <p className="mt-2 rounded-md border border-orange-200 bg-white px-3 py-2 font-semibold text-orange-800">
                The response depends on the operating condition.
              </p>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">Graph Comparison</p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Putting It Together</h6>
              <p className="mt-1.5">
                A straight V-I graph means proportional behavior. A curved V-I graph means
                the element behaves differently in different regions.
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <p className="rounded-md border border-emerald-200 bg-white px-3 py-2 font-semibold text-emerald-800">
                  Linear: straight line
                </p>
                <p className="rounded-md border border-emerald-200 bg-white px-3 py-2 font-semibold text-emerald-800">
                  Non-linear: curved response
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:hidden">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-blue-700">
              Linear element
            </p>
            <div className="mt-3 rounded-xl border border-blue-100 bg-white p-2">
              <svg viewBox="0 0 360 300" className="h-auto w-full" role="img" aria-label="Linear element straight line graph">
                <defs>
                  <marker id="lnMobileLinearArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                    <path d="M0 0 10 5 0 10Z" fill="#111827" />
                  </marker>
                  <filter id="lnMobileLinearGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect x="12" y="14" width="336" height="266" rx="18" fill="#ffffff" stroke="#dbeafe" />
                <text x="34" y="46" fill="#0f172a" fontSize="16" fontWeight="900">Linear element</text>
                <text x="34" y="69" fill="#1d4ed8" fontSize="13" fontWeight="800">V and I rise together</text>
                <g transform="translate(56 240)">
                  <path d="M0 0H245M0 0V-160" fill="none" stroke="#111827" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lnMobileLinearArrow)" />
                  <text x="202" y="30" fill="#111827" fontSize="13" fontWeight="900">Voltage</text>
                  <text x="-28" y="-169" fill="#111827" fontSize="13" fontWeight="900">Current</text>
                  <path d="M22 -18L220 -142" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="142" cy="-93" r="8" fill="#2563eb" filter="url(#lnMobileLinearGlow)" />
                  <text x="82" y="-150" fill="#1d4ed8" fontSize="14" fontWeight="900">Straight-line V-I graph</text>
                  <text x="98" y="-58" fill="#1d4ed8" fontSize="13" fontWeight="800">proportional response</text>
                </g>
              </svg>
            </div>
            <div className="mt-3 grid gap-2.5">
              {stepPairs.map((step) => (
                <div
                  key={`mobile-linear-${step.number}`}
                  className={`ln-stage-card ln-stage-pair-${step.number} rounded-lg border border-blue-100 bg-white px-3 py-2.5 shadow-sm`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-portal-700">
                    Step {step.number}: {step.linearTitle}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{step.linearText}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-orange-700">
              Non-linear element
            </p>
            <div className="mt-3 rounded-xl border border-orange-100 bg-white p-2">
              <svg viewBox="0 0 360 300" className="h-auto w-full" role="img" aria-label="Non-linear element curved graph">
                <defs>
                  <marker id="lnMobileNonLinearArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                    <path d="M0 0 10 5 0 10Z" fill="#111827" />
                  </marker>
                  <filter id="lnMobileNonLinearGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect x="12" y="14" width="336" height="266" rx="18" fill="#ffffff" stroke="#fed7aa" />
                <text x="34" y="46" fill="#0f172a" fontSize="16" fontWeight="900">Non-linear element</text>
                <text x="34" y="69" fill="#c2410c" fontSize="13" fontWeight="800">low first, sharp later</text>
                <g transform="translate(56 240)">
                  <path d="M0 0H245M0 0V-160" fill="none" stroke="#111827" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lnMobileNonLinearArrow)" />
                  <text x="202" y="30" fill="#111827" fontSize="13" fontWeight="900">Voltage</text>
                  <text x="-28" y="-169" fill="#111827" fontSize="13" fontWeight="900">Current</text>
                  <rect x="22" y="-22" width="112" height="17" rx="9" fill="#fed7aa" opacity="0.72" />
                  <path d="M20 -8C88 -8 124 -10 148 -26C176 -45 193 -86 222 -146" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
                  <g transform="translate(148 -26)">
                    <circle r="13" fill="#fb923c" filter="url(#lnMobileNonLinearGlow)" />
                    <circle r="5" fill="#ffffff" />
                  </g>
                  <path d="M148 -26v44" stroke="#c2410c" strokeWidth="2.5" strokeDasharray="5 6" />
                  <text x="96" y="35" fill="#c2410c" fontSize="13" fontWeight="900">turn-on point</text>
                  <text x="82" y="-150" fill="#c2410c" fontSize="14" fontWeight="900">Curved V-I graph</text>
                </g>
              </svg>
            </div>
            <div className="mt-3 grid gap-2.5">
              {stepPairs.map((step) => (
                <div
                  key={`mobile-non-linear-${step.number}`}
                  className={`ln-stage-card ln-stage-pair-${step.number} rounded-lg border border-orange-100 bg-white px-3 py-2.5 shadow-sm`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-orange-700">
                    Step {step.number}: {step.nonLinearTitle}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{step.nonLinearText}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden min-w-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-3 md:block">
          <div className="max-w-full overflow-x-auto overscroll-x-contain rounded-xl">
          <svg viewBox="0 0 900 460" className="h-auto w-full max-w-full" role="img" aria-label="Animated graph comparing linear and non-linear elements">
            <defs>
              <marker id="lnArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                <path d="M0 0 10 5 0 10Z" fill="#111827" />
              </marker>
              <filter id="lnPointGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="20" y="24" width="860" height="405" rx="18" fill="#ffffff" stroke="#e2e8f0" />

            <rect x="70" y="58" width="230" height="54" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
            <text x="92" y="81" fill="#0f172a" fontSize="14" fontWeight="800">Linear element</text>
            <text x="92" y="101" fill="#1d4ed8" fontSize="15" fontWeight="900">V and I rise together</text>

            <rect x="600" y="58" width="230" height="54" rx="14" fill="#fff7ed" stroke="#fed7aa" />
            <text x="622" y="81" fill="#0f172a" fontSize="14" fontWeight="800">Non-linear element</text>
            <text x="622" y="101" fill="#c2410c" fontSize="15" fontWeight="900">low first, sharp later</text>

            <g transform="translate(95 330)">
              <path className="ln-axis" d="M0 0H270M0 0V-220" fill="none" stroke="#111827" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lnArrow)" />
              <text x="250" y="32" fill="#111827" fontSize="14" fontWeight="900">Voltage</text>
              <text x="-22" y="-222" fill="#111827" fontSize="14" fontWeight="900">Current</text>
              <path className="ln-linear-line" d="M20 -18L238 -186" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
              <circle className="ln-linear-point" cx="42" cy="-34" r="8" fill="#2563eb" filter="url(#lnPointGlow)" />
              <text x="70" y="-198" fill="#1d4ed8" fontSize="15" fontWeight="900">Straight-line V-I graph</text>
              <text x="92" y="-76" fill="#1d4ed8" fontSize="13" fontWeight="800">proportional</text>
            </g>

            <g transform="translate(535 330)">
              <path className="ln-axis" d="M0 0H270M0 0V-220" fill="none" stroke="#111827" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lnArrow)" />
              <text x="250" y="32" fill="#111827" fontSize="14" fontWeight="900">Voltage</text>
              <text x="-22" y="-222" fill="#111827" fontSize="14" fontWeight="900">Current</text>
              <rect className="ln-low-region" x="20" y="-22" width="128" height="18" rx="9" fill="#fed7aa" />
              <path className="ln-curve" d="M18 -8C88 -8 126 -10 154 -26C181 -42 199 -90 226 -184" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
              <g className="ln-turn-on" transform="translate(154 -26)">
                <circle r="13" fill="#fb923c" filter="url(#lnPointGlow)" />
                <circle r="5" fill="#ffffff" />
              </g>
              <path d="M154 -26v44" stroke="#c2410c" strokeWidth="2.5" strokeDasharray="5 6" />
              <text x="102" y="36" fill="#c2410c" fontSize="13" fontWeight="900">turn-on point</text>
              <text x="58" y="-198" fill="#c2410c" fontSize="15" fontWeight="900">Curved V-I graph</text>
            </g>
          </svg>
          </div>
        </div>

        <div className="hidden gap-3 md:grid lg:grid-cols-2">
          <div className="grid gap-2.5">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-blue-700">
              Linear element
            </p>
            {stepPairs.map((step) => (
              <div
                key={`linear-${step.number}`}
                className={`ln-stage-card ln-stage-pair-${step.number} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-portal-700">
                  Step {step.number}: {step.linearTitle}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{step.linearText}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-2.5">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-orange-700">
              Non-linear element
            </p>
            {stepPairs.map((step) => (
              <div
                key={`non-linear-${step.number}`}
                className={`ln-stage-card ln-stage-pair-${step.number} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-orange-700">
                  Step {step.number}: {step.nonLinearTitle}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{step.nonLinearText}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
          <h6 className="text-sm font-extrabold text-slate-950">Formula and examples</h6>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700 lg:grid-cols-3">
            <div className="rounded-lg border border-blue-200 bg-white p-3">
              <p className="font-bold text-blue-800">Ohm's law</p>
              <p className="mt-2 font-mono text-sm font-bold text-blue-700">V = I R</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                V is voltage, I is current, and R is resistance. If R stays constant,
                voltage and current remain proportional.
              </p>
            </div>
            <div className="rounded-lg border border-orange-200 bg-white p-3">
              <p className="font-bold text-orange-800">Non-linear examples</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                Diode, transistor, and semiconductor junctions.
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                These devices do not keep one constant V-I ratio across all operating regions.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-white p-3">
              <p className="font-bold text-emerald-800">Final concept</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Linear elements are predictable. Non-linear elements change their response
                depending on voltage, current, temperature, or bias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BilateralUnilateralGuide() {
  const stepPairs = [
    {
      number: "1",
      bilateralTitle: "Apply Current",
      bilateralText: "Current is applied to the bilateral element.",
      unilateralTitle: "Apply Current",
      unilateralText: "Current is applied to the unilateral element.",
    },
    {
      number: "2",
      bilateralTitle: "Same Flow Both Ways",
      bilateralText: "Current can flow normally from left to right and right to left.",
      unilateralTitle: "Forward Flow",
      unilateralText: "Current flows easily only in the allowed forward direction.",
    },
    {
      number: "3",
      bilateralTitle: "Symmetry",
      bilateralText: "Reversing current direction does not change the behavior.",
      unilateralTitle: "Reverse Blocking",
      unilateralText: "Reverse current is reduced or blocked because direction matters.",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <style>{`
        .bu-path {
          stroke-dasharray: 720;
          stroke-dashoffset: 720;
          animation: buPathDraw 18s ease-in-out infinite;
        }

        .bu-forward-dot {
          opacity: 0;
          filter: url(#buGlow);
          animation: buForwardVisible 18s ease-in-out infinite;
        }

        .bu-bilateral-reverse-dot {
          opacity: 0;
          filter: url(#buGlow);
          animation: buBilateralReverseVisible 18s ease-in-out infinite;
        }

        .bu-blocked-dot {
          opacity: 0;
          filter: url(#buGlow);
          animation: buBlockedDotVisible 18s ease-in-out infinite;
        }

        .bu-diode-block {
          opacity: 0;
          animation: buBlockVisible 18s ease-in-out infinite, buBlockPulse 1.8s ease-in-out infinite;
        }

        .bu-symmetry {
          opacity: 0;
          animation: buSymmetryVisible 18s ease-in-out infinite;
        }

        .bu-stage-card {
          opacity: 0.42;
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        .bu-stage-pair-1 { animation: buStagePairOne 18s linear infinite; }
        .bu-stage-pair-2 { animation: buStagePairTwo 18s linear infinite; }
        .bu-stage-pair-3 { animation: buStagePairThree 18s linear infinite; }

        @keyframes buPathDraw {
          0% { stroke-dashoffset: 720; }
          18%, 100% { stroke-dashoffset: 0; }
        }

        @keyframes buForwardVisible {
          0%, 18% { opacity: 0; }
          26%, 100% { opacity: 1; }
        }

        @keyframes buBilateralReverseVisible {
          0%, 36% { opacity: 0; }
          44%, 100% { opacity: 0.82; }
        }

        @keyframes buBlockedDotVisible {
          0%, 68% { opacity: 0; }
          76%, 86% { opacity: 0.82; }
          92%, 100% { opacity: 0.18; }
        }

        @keyframes buSymmetryVisible {
          0%, 66% { opacity: 0; }
          74%, 100% { opacity: 1; }
        }

        @keyframes buBlockVisible {
          0%, 66% { opacity: 0; }
          74%, 100% { opacity: 1; }
        }

        @keyframes buBlockPulse {
          0%, 100% { transform: scale(0.96); }
          50% { transform: scale(1.06); }
        }

        @keyframes buStagePairOne {
          0%, 28% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          34%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes buStagePairTwo {
          0%, 28% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          34%, 62% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          68%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes buStagePairThree {
          0%, 62% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          68%, 100% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bu-path,
          .bu-forward-dot,
          .bu-bilateral-reverse-dot,
          .bu-blocked-dot,
          .bu-diode-block,
          .bu-symmetry,
          .bu-stage-card {
            animation: none;
          }

          .bu-path {
            stroke-dashoffset: 0;
          }

          .bu-forward-dot,
          .bu-bilateral-reverse-dot,
          .bu-blocked-dot,
          .bu-diode-block,
          .bu-symmetry {
            opacity: 1;
          }
        }
      `}</style>

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        5. Bilateral and Unilateral Elements
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-800">
        Bilateral elements behave the same both ways. Unilateral elements depend on direction.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div>
          <h5 className="text-base font-bold text-slate-900">Bilateral and Unilateral Elements</h5>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700">
            <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700">Bilateral Type</p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Bilateral Elements</h6>
              <p className="mt-1.5">
                A bilateral element works the same even when current direction is reversed.
                It does not care which way current flows through it.
              </p>
              <p className="mt-2 rounded-md border border-blue-200 bg-white px-3 py-2 font-semibold text-blue-800">
                Same response in both directions.
              </p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-orange-700">Unilateral Type</p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Unilateral Elements</h6>
              <p className="mt-1.5">
                A unilateral element behaves differently when direction is reversed.
                Current may flow easily one way and become restricted or blocked the other way.
              </p>
              <p className="mt-2 rounded-md border border-orange-200 bg-white px-3 py-2 font-semibold text-orange-800">
                Direction and polarity matter.
              </p>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">Direction Comparison</p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Putting It Together</h6>
              <p className="mt-1.5">
                Bilateral elements are symmetrical. Unilateral elements are asymmetrical
                and are useful for control, switching, and rectification.
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <p className="rounded-md border border-emerald-200 bg-white px-3 py-2 font-semibold text-emerald-800">
                  Bilateral: no direction effect
                </p>
                <p className="rounded-md border border-emerald-200 bg-white px-3 py-2 font-semibold text-emerald-800">
                  Unilateral: direction-dependent
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:hidden">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-blue-700">
              Bilateral element
            </p>
            <div className="mt-3 rounded-xl border border-blue-100 bg-white p-2">
              <svg viewBox="0 0 360 240" className="h-auto w-full" role="img" aria-label="Bilateral element current flow in both directions">
                <defs>
                  <marker id="buMobileBlueArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                    <path d="M0 0 10 5 0 10Z" fill="#2563eb" />
                  </marker>
                  <filter id="buMobileBlueGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect x="12" y="14" width="336" height="206" rx="18" fill="#ffffff" stroke="#dbeafe" />
                <text x="32" y="47" fill="#0f172a" fontSize="16" fontWeight="900">Bilateral element</text>
                <text x="32" y="70" fill="#1d4ed8" fontSize="13" fontWeight="800">same behavior both ways</text>
                <g transform="translate(45 126)">
                  <path d="M0 0H270" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
                  <path d="M98 0h16l10-16 19 32 19-32 19 32 10-16h16" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="112" y="-38" fill="#111827" fontSize="14" fontWeight="900">Resistor</text>
                  <path d="M18 -34H92" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" markerEnd="url(#buMobileBlueArrow)" />
                  <path d="M252 34H178" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" markerEnd="url(#buMobileBlueArrow)" />
                  <text x="54" y="67" fill="#1d4ed8" fontSize="13" fontWeight="900">left to right = right to left</text>
                  <circle className="bu-forward-dot" r="7" fill="#2563eb" filter="url(#buMobileBlueGlow)">
                    <animateMotion dur="5.5s" repeatCount="indefinite" path="M0 0H270" />
                  </circle>
                  <circle className="bu-bilateral-reverse-dot" r="7" fill="#60a5fa" filter="url(#buMobileBlueGlow)">
                    <animateMotion dur="5.5s" begin="-2.75s" repeatCount="indefinite" path="M270 0H0" />
                  </circle>
                </g>
              </svg>
            </div>
            <div className="mt-3 grid gap-2.5">
              {stepPairs.map((step) => (
                <div
                  key={`mobile-bilateral-${step.number}`}
                  className={`bu-stage-card bu-stage-pair-${step.number} rounded-lg border border-blue-100 bg-white px-3 py-2.5 shadow-sm`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-portal-700">
                    Step {step.number}: {step.bilateralTitle}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{step.bilateralText}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-orange-700">
              Unilateral element
            </p>
            <div className="mt-3 rounded-xl border border-orange-100 bg-white p-2">
              <svg viewBox="0 0 360 240" className="h-auto w-full" role="img" aria-label="Unilateral element forward flow and reverse blocking">
                <defs>
                  <marker id="buMobileGreenArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                    <path d="M0 0 10 5 0 10Z" fill="#059669" />
                  </marker>
                  <filter id="buMobileOrangeGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect x="12" y="14" width="336" height="206" rx="18" fill="#ffffff" stroke="#fed7aa" />
                <text x="32" y="47" fill="#0f172a" fontSize="16" fontWeight="900">Unilateral element</text>
                <text x="32" y="70" fill="#c2410c" fontSize="13" fontWeight="800">forward allowed, reverse blocked</text>
                <g transform="translate(45 126)">
                  <path d="M0 0H270" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
                  <path d="M112 -28L166 0L112 28Z" fill="#ffffff" stroke="#111827" strokeWidth="5" strokeLinejoin="round" />
                  <path d="M174 -30V30" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
                  <text x="108" y="-40" fill="#111827" fontSize="14" fontWeight="900">Diode</text>
                  <path d="M18 -34H102" stroke="#059669" strokeWidth="4" strokeLinecap="round" markerEnd="url(#buMobileGreenArrow)" />
                  <text x="24" y="-50" fill="#047857" fontSize="13" fontWeight="900">forward flow</text>
                  <g className="bu-diode-block" transform="translate(222 0)">
                    <circle r="23" fill="#fee2e2" stroke="#dc2626" strokeWidth="4" />
                    <path d="M-10 -10L10 10M10 -10L-10 10" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
                  </g>
                  <text className="bu-diode-block" x="142" y="67" fill="#dc2626" fontSize="13" fontWeight="900">reverse current blocked</text>
                  <circle className="bu-forward-dot" r="7" fill="#10b981" filter="url(#buMobileOrangeGlow)">
                    <animateMotion dur="5.5s" repeatCount="indefinite" path="M0 0H170" />
                  </circle>
                  <circle className="bu-blocked-dot" r="7" fill="#fb923c" filter="url(#buMobileOrangeGlow)">
                    <animateMotion dur="5.5s" begin="-2.75s" repeatCount="indefinite" path="M270 0H190" />
                  </circle>
                </g>
              </svg>
            </div>
            <div className="mt-3 grid gap-2.5">
              {stepPairs.map((step) => (
                <div
                  key={`mobile-unilateral-${step.number}`}
                  className={`bu-stage-card bu-stage-pair-${step.number} rounded-lg border border-orange-100 bg-white px-3 py-2.5 shadow-sm`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-orange-700">
                    Step {step.number}: {step.unilateralTitle}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{step.unilateralText}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden min-w-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-3 md:block">
          <div className="max-w-full overflow-x-auto overscroll-x-contain rounded-xl">
          <svg viewBox="0 0 900 460" className="h-auto w-full max-w-full" role="img" aria-label="Animated circuit comparing bilateral and unilateral elements">
            <defs>
              <marker id="buGreenArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                <path d="M0 0 10 5 0 10Z" fill="#059669" />
              </marker>
              <marker id="buBlueArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                <path d="M0 0 10 5 0 10Z" fill="#2563eb" />
              </marker>
              <filter id="buGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="20" y="24" width="860" height="405" rx="18" fill="#ffffff" stroke="#e2e8f0" />

            <rect x="70" y="58" width="255" height="54" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
            <text x="92" y="81" fill="#0f172a" fontSize="14" fontWeight="800">Bilateral element</text>
            <text x="92" y="101" fill="#1d4ed8" fontSize="15" fontWeight="900">same behavior both ways</text>

            <rect x="585" y="58" width="255" height="54" rx="14" fill="#fff7ed" stroke="#fed7aa" />
            <text x="607" y="81" fill="#0f172a" fontSize="14" fontWeight="800">Unilateral element</text>
            <text x="607" y="101" fill="#c2410c" fontSize="15" fontWeight="900">forward allowed, reverse blocked</text>

            <g transform="translate(90 230)">
              <path className="bu-path" d="M0 0H270" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
              <path d="M105 0h18l10-16 20 32 20-32 20 32 10-16h18" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="115" y="-45" fill="#111827" fontSize="15" fontWeight="900">Resistor</text>
              <path className="bu-symmetry" d="M35 -42H105" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" markerEnd="url(#buBlueArrow)" />
              <path className="bu-symmetry" d="M235 42H165" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" markerEnd="url(#buBlueArrow)" />
              <text className="bu-symmetry" x="48" y="68" fill="#1d4ed8" fontSize="14" fontWeight="900">same response after reversal</text>
              <circle className="bu-forward-dot" r="7" fill="#2563eb">
                <animateMotion dur="5.5s" repeatCount="indefinite" path="M0 0H270" />
              </circle>
              <circle className="bu-bilateral-reverse-dot" r="7" fill="#60a5fa">
                <animateMotion dur="5.5s" begin="-2.75s" repeatCount="indefinite" path="M270 0H0" />
              </circle>
            </g>

            <g transform="translate(545 230)">
              <path className="bu-path" d="M0 0H270" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
              <path d="M118 -28L172 0L118 28Z" fill="#ffffff" stroke="#111827" strokeWidth="5" strokeLinejoin="round" />
              <path d="M180 -30V30" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
              <text x="112" y="-50" fill="#111827" fontSize="15" fontWeight="900">Diode</text>
              <path d="M35 -42H116" stroke="#059669" strokeWidth="4" strokeLinecap="round" markerEnd="url(#buGreenArrow)" />
              <text x="36" y="-58" fill="#047857" fontSize="14" fontWeight="900">forward flow</text>
              <g className="bu-diode-block" transform="translate(222 0)">
                <circle r="24" fill="#fee2e2" stroke="#dc2626" strokeWidth="4" />
                <path d="M-10 -10L10 10M10 -10L-10 10" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
              </g>
              <text className="bu-diode-block" x="150" y="68" fill="#dc2626" fontSize="14" fontWeight="900">reverse blocked</text>
              <circle className="bu-forward-dot" r="7" fill="#10b981">
                <animateMotion dur="5.5s" repeatCount="indefinite" path="M0 0H175" />
              </circle>
              <circle className="bu-blocked-dot" r="7" fill="#fb923c">
                <animateMotion dur="5.5s" begin="-2.75s" repeatCount="indefinite" path="M270 0H190" />
              </circle>
            </g>

            <rect x="265" y="355" width="370" height="36" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <text x="286" y="378" fill="#0f172a" fontSize="14" fontWeight="900">
              Direction decides whether behavior stays same or changes.
            </text>
          </svg>
          </div>
        </div>

        <div className="hidden gap-3 md:grid lg:grid-cols-2">
          <div className="grid gap-2.5">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-blue-700">
              Bilateral element
            </p>
            {stepPairs.map((step) => (
              <div
                key={`bilateral-${step.number}`}
                className={`bu-stage-card bu-stage-pair-${step.number} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-portal-700">
                  Step {step.number}: {step.bilateralTitle}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{step.bilateralText}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-2.5">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-orange-700">
              Unilateral element
            </p>
            {stepPairs.map((step) => (
              <div
                key={`unilateral-${step.number}`}
                className={`bu-stage-card bu-stage-pair-${step.number} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-orange-700">
                  Step {step.number}: {step.unilateralTitle}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{step.unilateralText}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
          <h6 className="text-sm font-extrabold text-slate-950">Examples and behavior</h6>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700 lg:grid-cols-3">
            <div className="rounded-lg border border-blue-200 bg-white p-3">
              <p className="font-bold text-blue-800">Bilateral examples</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Resistor, inductor, and capacitor. Their resistance or impedance is the
                same for either current direction in ideal circuit analysis.
              </p>
            </div>
            <div className="rounded-lg border border-orange-200 bg-white p-3">
              <p className="font-bold text-orange-800">Unilateral examples</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Diode and transistor. Their behavior depends on polarity, biasing, and
                allowed current direction.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-white p-3">
              <p className="font-bold text-emerald-800">Final concept</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Bilateral elements treat current direction equally. Unilateral elements
                control or restrict current based on direction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BasicConceptGuideContent({ withIntro = true }) {
  return (
    <div
      id="fundamental-electrical-concepts"
      className={withIntro ? "mt-5 scroll-mt-40 border-t border-slate-200 pt-4" : "scroll-mt-40"}
    >
      {withIntro ? (
        <>
          <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
            Fundamental Electrical Concepts
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            These ideas form the base of Network Analysis. Learn them first, then KCL,
            KVL, and circuit theorems become much easier to understand.
          </p>
        </>
      ) : null}
      <div className={withIntro ? "mt-4 divide-y divide-slate-200" : "divide-y divide-slate-200"}>
        {BASIC_CONCEPT_GUIDE.map((concept, conceptIndex) => (
          <section key={concept.title} className="py-5 first:pt-0 last:pb-0">
            {conceptIndex === 0 ? (
              <ProfessionalChargeCircuitGuide />
            ) : conceptIndex === 1 ? (
              <PowerEnergyGuide />
            ) : conceptIndex === 2 ? (
              <PassiveActiveGuide />
            ) : conceptIndex === 3 ? (
              <LinearNonLinearGuide />
            ) : conceptIndex === 4 ? (
              <BilateralUnilateralGuide />
            ) : (
              <>
                <h4 className="text-base font-bold text-slate-900">
                  {conceptIndex + 1}. {concept.title}
                </h4>
                <div className="mt-3 grid gap-4">
                  {concept.sections.map((section) => (
                    <div key={section.heading}>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h5 className="text-sm font-bold text-slate-900">{section.heading}</h5>
                        {section.formula ? (
                          <code className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-portal-700">
                            {section.formula}
                          </code>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{section.body}</p>
                      {section.points?.length ? (
                        <ul className="mt-2 grid gap-1.5 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                          {section.points.map((point) => (
                            <li key={point} className="flex gap-2">
                              <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {section.keyIdea ? (
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                          Key idea: {section.keyIdea}
                        </p>
                      ) : null}
                      {section.animation ? (
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                          Animation idea:{" "}
                          <span className="font-medium normal-case tracking-normal text-slate-600">
                            {section.animation}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

function NetworkOverviewPanel({ overviewCards = [] }) {
  return (
    <section className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {overviewCards.map((item) => (
          <article
            key={item.title}
            className={item.points?.length ? "lg:col-span-2" : ""}
          >
            <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
              {item.title}
            </h2>
            {item.description ? (
              <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
                {item.description}
              </p>
            ) : null}
            {item.points?.length ? (
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function OverviewRow({ item }) {
  return (
    <article className="py-5 first:pt-0 last:pb-0">
      <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
        {item.title}
      </h2>

      {item.description ? (
        <p className="mt-2 text-base leading-8 text-slate-700">{item.description}</p>
      ) : null}
      {item.points?.length ? (
        <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-700 sm:grid-cols-2 sm:text-base">
          {item.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span className="mt-3 h-2 w-2 flex-none rounded-full bg-portal-600" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {item.title === "What Will You Learn?" ? (
        <BasicConceptGuideContent />
      ) : null}
    </article>
  );
}

function ConceptRoadmapItem({ concept, index, isActive, status, onClick }) {
  const statusLabel =
    status === "current" ? "Current" : status === "review" ? "Review" : "Next";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
        isActive
          ? "border-portal-300 bg-portal-50 shadow-sm"
          : "border-transparent bg-slate-50 hover:border-slate-200 hover:bg-white"
      }`}
    >
      <div className="flex gap-3">
        <span
          className={`flex h-9 w-9 flex-none items-center justify-center rounded-full text-xs font-bold ${
            isActive ? "bg-portal-600 text-white" : "bg-white text-slate-700"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-5 text-slate-900">{concept.shortTitle}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            {statusLabel}
          </p>
        </div>
      </div>
    </button>
  );
}

function NetworkTopicList({ compact = false, concepts = [], activeIndex = 0, onSelectTopic }) {
  const router = useRouter();

  function getTopicTargetIndex(title) {
    if (NETWORK_TOPIC_TARGET_ANCHORS[title]) {
      return 0;
    }

    const targetSlug = NETWORK_TOPIC_TARGET_SLUGS[title];
    const conceptIndex = concepts.findIndex((concept) => concept.slug === targetSlug);
    return conceptIndex >= 0 ? conceptIndex + 1 : 1;
  }

  function handleTopicSelect(title) {
    if (!onSelectTopic) {
      return;
    }

    onSelectTopic(getTopicTargetIndex(title), NETWORK_TOPIC_TARGET_ANCHORS[title]);
  }

  return (
    <div className={compact ? "grid gap-2.5" : "grid gap-2.5"}>
      {NETWORK_ANALYSIS_TOPIC_GROUPS.map((group, index) => {
        const targetIndex = getTopicTargetIndex(group.title);
        const routeHref = NETWORK_TOPIC_ROUTES[group.title];
        const isActive = activeIndex === targetIndex;
        const className = `flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
          isActive || router.pathname === routeHref
            ? "border-portal-300 bg-portal-50 shadow-sm"
            : "border-slate-200 bg-slate-50/80 hover:border-portal-200 hover:bg-white"
        }`;
        const content = (
          <>
            <span
              className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg text-[11px] font-black shadow-sm ${
                isActive || router.pathname === routeHref ? "bg-portal-600 text-white" : "bg-white text-portal-700"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-bold leading-5 text-slate-900">{group.title}</span>
          </>
        );

        if (routeHref) {
          return (
            <Link
              key={group.title}
              href={routeHref}
              className={className}
            >
              {content}
            </Link>
          );
        }

        return (
          <button
            key={group.title}
            type="button"
            onClick={() => handleTopicSelect(group.title)}
            className={className}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}

function MobileConceptRoadmap({ concepts, activeIndex, onSelectTopic }) {
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

  function selectTopic(index) {
    onSelectTopic(index);
    setIsRoadmapOpen(false);
  }

  return (
    <section id="subject-roadmap" className="mt-5 scroll-mt-40 xl:hidden">
      <div className="rounded-2xl border border-portal-200 bg-white shadow-[0_16px_34px_rgba(15,50,112,0.12)]">
        <button
          type="button"
          onClick={() => setIsRoadmapOpen((currentValue) => !currentValue)}
          className="flex w-full items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-portal-50 via-white to-blue-50 px-4 py-3 text-left"
          aria-expanded={isRoadmapOpen}
          aria-controls="mobile-concept-roadmap"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-portal-600 text-white shadow-[0_10px_20px_rgba(18,59,121,0.24)]">
              {isRoadmapOpen ? (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-black text-slate-950">Learning Roadmap</span>
              <span className="mt-0.5 block truncate text-xs font-semibold leading-5 text-portal-700">
                Main Network Analysis topics
              </span>
            </span>
          </span>
          <span className="flex flex-none items-center gap-2 rounded-full border border-portal-200 bg-white px-3 py-1.5 text-xs font-bold text-portal-700 shadow-sm">
            {isRoadmapOpen ? "Close" : "Open"}
          </span>
        </button>

        {isRoadmapOpen ? (
          <div id="mobile-concept-roadmap" className="border-t border-slate-200 px-3 py-3">
            <NetworkTopicList
              compact
              concepts={concepts}
              activeIndex={activeIndex}
              onSelectTopic={selectTopic}
            />

          </div>
        ) : null}
      </div>
    </section>
  );
}

function NetworkTopicMenu({ concepts, activeIndex, onSelectTopic }) {
  const [isOpen, setIsOpen] = useState(false);

  function selectTopic(index, anchorId) {
    onSelectTopic(index, anchorId);
    setIsOpen(false);
  }

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Network Analysis topics"
        aria-expanded={isOpen}
        aria-controls="network-topic-menu"
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
          id="network-topic-menu"
          className="absolute right-0 z-30 mt-2 max-h-[70vh] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <NetworkTopicList
            compact
            concepts={concepts}
            activeIndex={activeIndex}
            onSelectTopic={selectTopic}
          />
        </div>
      ) : null}
    </div>
  );
}

function FormulaPreview({ formulas = [] }) {
  if (!formulas.length) {
    return (
      <p className="text-sm leading-6 text-slate-600">
        Formula highlights for this concept will appear here.
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {formulas.map((formula) => (
        <div
          key={`${formula.label}-${formula.expression}`}
          className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {formula.label}
          </p>
          <p className="mt-2 text-base font-bold text-slate-900">{formula.expression}</p>
          {formula.note ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">{formula.note}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function StudyFlowCard({ step, index }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-white text-sm font-bold text-portal-700 shadow-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900">{step.title}</p>
          <div className="mt-3 grid gap-2">
            {step.points.map((point) => (
              <div
                key={`${step.title}-${point}`}
                className="rounded-xl border border-white/80 bg-white px-3 py-2 text-sm leading-6 text-slate-700"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function FallbackSubjectPage({ subject, steps, totalConcepts, subjectSummary }) {
  return (
    <>
      <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <SubjectTheoryIcon />
          <div className="min-w-0 flex-1">
            <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-portal-700">
              Subject Overview
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {subject.title}
            </h1>
            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
              {subjectSummary}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <HeroMetric label="Roadmap Modules" value={String(steps.length).padStart(2, "0")} />
              <HeroMetric label="Core Topics" value={String(totalConcepts).padStart(2, "0")} />
              <HeroMetric label="Learning View" value="Guided Subject" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              How To Study This Subject
            </h2>
            <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">
              Follow this order so the subject builds from basics to problem solving.
            </p>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
            {steps.length} modules
          </span>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {steps.map((step, index) => (
            <StudyFlowCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}

export default function SubjectTheoryPage({
  subject,
  steps,
  learningMeta,
  initialActiveConceptIndex = 0,
  standaloneTopicPage = "",
}) {
  const theoryKnowledge = subjectTheoryKnowledge[subject.title] || null;
  const chapterMeta = SUBJECT_META[subject.title] || null;
  const totalConcepts = steps.reduce((count, step) => count + step.points.length, 0);
  const subjectSummary =
    subject.description ||
    "A structured roadmap that moves from fundamentals to exam-level analysis and problem solving.";
  const notesHref = `/notes/${getSubjectSlug(subject.title)}`;
  const [activeConceptIndex, setActiveConceptIndex] = useState(initialActiveConceptIndex);
  const [quizSelections, setQuizSelections] = useState({});
  const { progressStats, isReady } = useLearningProgress();

  useEffect(() => {
    setActiveConceptIndex(initialActiveConceptIndex);
    setQuizSelections({});
  }, [initialActiveConceptIndex, subject.title]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [initialActiveConceptIndex]);

  if (!theoryKnowledge || !chapterMeta) {
    return (
      <Layout title={`ECE Exam Guide | ${subject.title}`} pageClassName="py-3 sm:py-4">
        <div className="mx-auto max-w-[1200px]">
          <nav aria-label="Breadcrumb" className="mb-5 pt-1">
            <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
              <li>
                <Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">
                  Home
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <Link
                  href="/subjects"
                  className="font-medium text-slate-600 transition hover:text-portal-700"
                >
                  Subjects
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">
                  {subject.title}
                </span>
              </li>
            </ol>
          </nav>

          <FallbackSubjectPage
            subject={subject}
            steps={steps}
            totalConcepts={totalConcepts}
            subjectSummary={subjectSummary}
          />
        </div>
      </Layout>
    );
  }

  const concepts = theoryKnowledge.concepts || [];
  const isConceptIntroPage = activeConceptIndex === 0;
  const activeConceptDataIndex = isConceptIntroPage ? 0 : activeConceptIndex - 1;
  const activeConcept = concepts[activeConceptDataIndex] || concepts[0];
  const activeTeaching = activeConcept?.teaching || {};
  const subjectProgress = progressStats.subjects.find(
    (item) => item.slug === learningMeta.learningSubjectSlug
  );
  const completionPercent = subjectProgress?.completionPercent || 0;
  const completedTopics = subjectProgress?.completedTopics || 0;
  const readyTopics = subjectProgress?.totalTopics || learningMeta.readyTopics || 0;
  const activeFormulaPreview =
    activeConcept?.formulas?.length > 0
      ? activeConcept.formulas.slice(0, 3)
      : concepts.flatMap((concept) => concept.formulas || []).slice(0, 3);
  const activeIntuition =
    activeTeaching.intuition?.length ? activeTeaching.intuition : [activeConcept.summary];
  const activeExplanation =
    activeTeaching.explanation?.length ? activeTeaching.explanation : activeConcept.paragraphs || [];
  const activeInterpretation =
    activeTeaching.interpretation?.length ? activeTeaching.interpretation : activeConcept.learnPoints || [];
  const activeWorkedExample = activeTeaching.workedExample || null;
  const activeQuiz = activeTeaching.quiz || null;
  const activeCommonMistake =
    activeTeaching.commonMistake ||
    theoryKnowledge.commonMistakes?.[activeConceptDataIndex] ||
    theoryKnowledge.commonMistakes?.[0] ||
    "";
  const activeRealLifeInsight =
    activeTeaching.realLifeInsight || chapterMeta.studyTip;
  const selectedQuizIndex = quizSelections[activeConcept?.slug];
  const isQuizAnswered = typeof selectedQuizIndex === "number";
  const isQuizCorrect = isQuizAnswered && selectedQuizIndex === activeQuiz?.correctIndex;

  if (standaloneTopicPage === "basic-concepts") {
    return (
      <Layout title="ECE Exam Guide | Basic Concepts" pageClassName="py-3 sm:py-4">
        <div className="mx-auto max-w-[1200px] pb-24">
          <nav aria-label="Breadcrumb" className="mb-5 pt-1">
            <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
              <li>
                <Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">
                  Home
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">
                  Subjects
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <Link
                  href="/subjects/network-analysis"
                  className="font-medium text-slate-600 transition hover:text-portal-700"
                >
                  Network Analysis
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">
                  Basic Concepts
                </span>
              </li>
            </ol>
          </nav>

          <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-5 shadow-panel sm:p-6">
            <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
              Network Analysis
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Basic Concepts
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
              These are the base ideas that make circuits readable: charge, current,
              voltage, power, energy, and element behavior. The original diagrams and
              step-by-step explanations are kept below in a cleaner page flow.
            </p>
          </section>

          <section className="mt-5">
            <BasicConceptGuideContent withIntro={false} />
          </section>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/subjects/network-analysis"
              className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Network Analysis
            </Link>
            <Link
              href="/circuit-elements"
              className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
            >
              Next Circuit Elements
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  function getConceptStatus(index) {
    if (index < activeConceptIndex) {
      return "review";
    }

    if (index === activeConceptIndex) {
      return "current";
    }

    return "next";
  }

  function selectRoadmapTopic(index, anchorId = "subject-concept") {
    setActiveConceptIndex(index);

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        document.getElementById(anchorId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }

  return (
    <Layout title={`ECE Exam Guide | ${subject.title}`} pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1500px] pb-24 xl:pb-0">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-start justify-between gap-3 pt-1"
        >
          <ol className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-slate-500">
            <li>
              <Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">
                Home
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <Link
                href="/subjects"
                className="font-medium text-slate-600 transition hover:text-portal-700"
              >
                Subjects
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <span className="font-semibold text-portal-700">
                {subject.title}
              </span>
            </li>
          </ol>
          <NetworkTopicMenu
            concepts={concepts}
            activeIndex={activeConceptIndex}
            onSelectTopic={selectRoadmapTopic}
          />
        </nav>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
          <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
            <div className="min-w-0">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
                  ECE Core Chapter
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  {subject.title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
                  {chapterMeta.subtitle}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <HeroMetric label="Estimated Time" value={chapterMeta.estimatedTime} />
                  <HeroMetric label="Difficulty" value={chapterMeta.difficulty} />
                  <HeroMetric label="Concepts" value={`${concepts.length} Detailed Topics`} />
                  <HeroMetric label="Level" value={chapterMeta.level} />
                </div>
              </div>
            </div>

            <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold text-slate-950">Study Progress</h2>
                  <span className="text-xs font-semibold text-slate-500">
                    {isReady ? `${completionPercent}% Completed` : "Loading..."}
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-portal-600 transition-all"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-xs font-medium text-slate-600">
                  {completedTopics} / {readyTopics} ready topics completed
                </p>
              </div>

              <Link
                href={learningMeta.continueHref || subject.href}
                className="inline-flex justify-center rounded-xl bg-portal-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-portal-700"
              >
                {completionPercent > 0 ? "Continue Learning" : "Start Learning"}
              </Link>

              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <Link
                  href={notesHref}
                  className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Notes
                </Link>
                <Link
                  href={`/practice?search=${encodeURIComponent(subject.search)}`}
                  className="inline-flex justify-center rounded-xl border border-portal-200 bg-white px-3 py-2.5 text-xs font-bold text-portal-700 transition hover:bg-portal-50"
                >
                  Practice
                </Link>
              </div>
            </div>
          </div>
        </section>

        {isConceptIntroPage ? (
          <div className="mt-5">
            <NetworkOverviewPanel overviewCards={theoryKnowledge.overviewCards} />
          </div>
        ) : null}

        <section className="mt-5">
          <main className="min-w-0">
            {!isConceptIntroPage ? (
              <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
                <div className="divide-y divide-slate-200">
                {theoryKnowledge.overviewCards.map((item, index) => (
                  <OverviewRow
                    key={item.title}
                    item={item}
                  />
                ))}
                </div>
              </section>
            ) : null}

            {isConceptIntroPage ? (
              <div className="mt-5 flex justify-end">
                <Link
                  href="/basic-concepts"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto"
                >
                  Next Basic Concepts
                </Link>
              </div>
            ) : null}

            {!isConceptIntroPage ? (
            <section
              id="subject-concept"
              className="mt-5 scroll-mt-40 bg-white"
            >
              <div className="px-3 pb-4 sm:px-5 lg:px-6">
                {isConceptIntroPage ? (
                  null
                ) : (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-portal-700">
                      Concept {String(activeConceptIndex).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 max-w-3xl text-base font-semibold leading-snug text-slate-950 sm:text-lg">
                      {activeConcept.title}
                    </h2>
                    <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
                      {activeConcept.summary}
                    </p>
                  </>
                )}
              </div>

              {isConceptIntroPage ? null : (
              <>
              <div className="grid gap-5 border-t border-slate-200 px-3 pt-4 sm:px-5 lg:px-6">
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      Core Idea
                    </h3>
                    <div className="mt-2 space-y-2.5">
                      {activeIntuition.map((line, index) => (
                        <p
                          key={`${activeConcept.slug}-intuition-${index}`}
                          className="text-sm leading-6 text-slate-700"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      Step-by-Step Theory
                    </h3>
                    <ol className="mt-2 list-decimal space-y-2.5 pl-5 text-sm leading-6 text-slate-700">
                      {activeExplanation.map((line, index) => (
                        <li
                          key={`${activeConcept.slug}-explanation-${index}`}
                        >
                          {line}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      How To Read It In Circuits
                    </h3>
                    <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
                      {activeInterpretation.map((point) => (
                        <li
                          key={`${activeConcept.slug}-interpretation-${point}`}
                          className="flex gap-2"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      Circuit Diagram
                    </h3>
                    <div className="mt-2 max-w-2xl overflow-x-auto">
                      <NetworkTheoryDiagram type={activeConcept.diagram} />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      {activeConcept.diagramNote}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      Key Relation
                    </h3>
                    <div className="mt-2 divide-y divide-slate-200">
                      {activeConcept.formulas.map((formula) => (
                        <div
                          key={`${formula.label}-${formula.expression}`}
                          className="py-2.5 first:pt-0 last:pb-0"
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                            {formula.label}
                          </p>
                          <p className="mt-1.5 text-sm font-bold text-slate-900 sm:text-base">
                            {formula.expression}
                          </p>
                          <p className="mt-1.5 text-xs leading-5 text-slate-600">{formula.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {activeWorkedExample ? (
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <h3 className="text-base font-bold text-slate-900">Worked Example</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                    {activeWorkedExample.prompt}
                  </p>
                  <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    {activeWorkedExample.steps?.map((step, index) => (
                      <li
                        key={`${activeConcept.slug}-worked-step-${index}`}
                        className="flex gap-2.5"
                      >
                        <span className="font-bold text-portal-700">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-3 border-l-2 border-portal-400 pl-3">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-portal-700">
                      Final Answer
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-900">
                      {activeWorkedExample.result}
                    </p>
                  </div>
                </div>
              ) : null}

              {activeQuiz ? (
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <h3 className="text-base font-bold text-slate-900">Quick Quiz</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {activeQuiz.question}
                  </p>
                  <div className="mt-3 grid gap-2">
                    {activeQuiz.options.map((option, optionIndex) => {
                      const optionLetter = String.fromCharCode(65 + optionIndex);
                      const isSelected = selectedQuizIndex === optionIndex;
                      const isCorrectOption = optionIndex === activeQuiz.correctIndex;
                      const optionClassName = isSelected
                        ? isCorrectOption
                          ? "text-emerald-800"
                          : "text-amber-800"
                        : "text-slate-700 hover:text-portal-700";

                      return (
                        <button
                          key={`${activeConcept.slug}-quiz-${option}`}
                          type="button"
                          onClick={() =>
                            setQuizSelections((currentValue) => ({
                              ...currentValue,
                              [activeConcept.slug]: optionIndex,
                            }))
                          }
                          className={`flex w-full items-center gap-3 border-b border-slate-200 py-2 text-left text-sm font-medium transition last:border-b-0 ${optionClassName}`}
                        >
                          <span className="w-5 flex-none text-xs font-bold">
                            {optionLetter}
                          </span>
                          <span className="flex-1">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3 border-l-2 border-slate-300 pl-3">
                    <p className="text-sm font-bold text-slate-900">
                      {isQuizAnswered ? (isQuizCorrect ? "Correct" : "Try Again") : "Answer Guide"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {isQuizAnswered
                        ? activeQuiz.explanation
                        : "Choose one option to check your understanding of this concept."}
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 grid gap-4 border-t border-slate-200 pt-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Common Mistake</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {activeCommonMistake}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">Real-Life Insight</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {activeRealLifeInsight}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-portal-700">
                  Next Step
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {activeConceptIndex === concepts.length
                    ? "Finish this chapter, then move to practice questions to reinforce the theory."
                    : `Next Concept -> ${concepts[activeConceptIndex]?.shortTitle}`}
                </p>
              </div>
              </>
              )}

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setActiveConceptIndex((currentValue) => Math.max(currentValue - 1, 0))}
                  disabled={activeConceptIndex === 0}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous Concept
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveConceptIndex((currentValue) =>
                      Math.min(currentValue + 1, concepts.length)
                    )
                  }
                  disabled={activeConceptIndex === concepts.length}
                  className="rounded-xl bg-portal-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-portal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {activeConceptIndex === concepts.length
                    ? "Last Concept"
                    : `Next: ${concepts[activeConceptIndex]?.shortTitle}`}
                </button>
              </div>
            </section>
            ) : null}

          </main>

        </section>
      </div>

      <div className="fixed bottom-3 left-3 right-3 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur xl:hidden">
        <div className="grid grid-cols-4 gap-2">
          <Link
            href="/basic-concepts"
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Roadmap
          </Link>
          <Link
            href="/circuit-elements"
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Theory
          </Link>
          <Link
            href={notesHref}
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Notes
          </Link>
          <Link
            href={subject.href}
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Learn
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: subjectDirectory.map((subject) => ({
      params: { slug: getSubjectSlug(subject.title) },
    })),
    fallback: false,
  };
}

export function getSubjectTheoryProps(subjectSlug, extraProps = {}) {
  const subject = subjectDirectory.find(
    (item) => getSubjectSlug(item.title) === subjectSlug
  );
  const learningSubjectSlug = SUBJECT_TO_LEARNING_SLUG[subject.title] || "";
  const learningSubject = learningSubjectSlug ? getLearningSubject(learningSubjectSlug) : null;
  const learningTopics = learningSubject
    ? learningSubject.chapters.flatMap((chapter) =>
        chapter.topics.map((topic) => ({
          ...topic,
          href: `/learn/${learningSubjectSlug}/${topic.slug}`,
        }))
      )
    : [];
  const readyTopics = learningTopics.filter((topic) => topic.status === "ready");

  return {
    props: {
      subject,
      steps: subjectTheoryRoadmaps[subject.title] || [],
      learningMeta: {
        learningSubjectSlug,
        totalTopics: learningTopics.length,
        readyTopics: readyTopics.length,
        continueHref: readyTopics[0]?.href || subject.href,
      },
      ...extraProps,
    },
  };
}

export function getStaticProps({ params }) {
  return getSubjectTheoryProps(params.slug);
}
