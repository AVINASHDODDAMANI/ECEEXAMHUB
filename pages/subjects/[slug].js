import Link from "next/link";
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

const BASIC_CONCEPT_SUMMARY = [
  ["Current", "Moving glowing dots"],
  ["Voltage", "Gradient with polarity signs"],
  ["Power", "Pulsing or glowing resistor"],
  ["Energy", "Time-based growth meter"],
  ["Passive", "Absorb or store energy animation"],
  ["Active", "Source energy emission"],
  ["Linear", "Straight-line graph"],
  ["Non-linear", "Curved response graph"],
  ["Bilateral", "Same behavior both directions"],
  ["Unilateral", "One-way flow block"],
];

function SubjectTheoryIcon() {
  return (
    <span className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#0f3270,#154a96)] text-white shadow-[0_14px_30px_rgba(15,50,112,0.24)]">
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 7h16M4 17h16M7 4v16M17 4v16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="7" cy="7" r="1.6" fill="currentColor" />
        <circle cx="17" cy="7" r="1.6" fill="currentColor" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        <circle cx="7" cy="17" r="1.6" fill="currentColor" />
        <circle cx="17" cy="17" r="1.6" fill="currentColor" />
      </svg>
    </span>
  );
}

function HeroMetric({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-xs font-bold text-slate-900 sm:text-sm">{value}</p>
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
        <div className="min-w-0">
          <svg viewBox="0 0 760 360" className="h-auto w-full" role="img" aria-label="Charge current and voltage circuit explanation">
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

        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
          <svg viewBox="0 0 760 430" className="h-auto w-full" role="img" aria-label="Step by step animated circuit guide">
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
          animation-delay: -4s;
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
          opacity: 0;
          animation: proLabelFade 24s linear infinite;
        }

        .label-charge { animation-delay: 0s; }
        .label-electron { animation-delay: 0s; }
        .label-conventional { animation-delay: 0s; }
        .label-voltage { animation-delay: 0s; }

        .pro-terminal-hot {
          animation: proTerminalPulse 1.8s ease-in-out infinite;
        }

        .pro-resistor-glow {
          opacity: 0;
          animation: proResistorPulse 1.8s ease-in-out infinite, proResistorVisible 24s linear infinite;
        }

        @keyframes proWireDraw {
          0% { stroke-dashoffset: 1400; opacity: 1; }
          14%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes proFadeIn {
          0%, 16% { opacity: 0; }
          22%, 100% { opacity: 1; }
        }

        @keyframes proStaticCharge {
          0%, 18% { opacity: 0; }
          23%, 34% { opacity: 1; }
          39%, 100% { opacity: 0; }
        }

        @keyframes proMovingCharge {
          0%, 32% { opacity: 0; }
          38%, 100% { opacity: 1; }
        }

        @keyframes proVoltage {
          0%, 45% { opacity: 0; }
          51%, 100% { opacity: 1; }
        }

        @keyframes proConventionalCurrent {
          0%, 55% { opacity: 0; transform: translateX(-14px); }
          61%, 100% { opacity: 0.72; transform: translateX(0); }
        }

        @keyframes proLabelFade {
          0%, 18% { opacity: 0; transform: translateY(6px); }
          24%, 100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes proTerminalPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.85; }
        }

        @keyframes proResistorVisible {
          0%, 66% { opacity: 0; }
          72%, 100% { opacity: 1; }
        }

        @keyframes proResistorPulse {
          0%, 100% { stroke-opacity: 0.28; }
          50% { stroke-opacity: 0.85; }
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
          <h5 className="text-base font-bold text-slate-900">Theory Explanation</h5>
          <div className="mt-2 grid gap-3 text-sm leading-7 text-slate-700">
            <p>
              Electric charge is the basic electrical property carried by particles such
              as electrons. In a metal wire, electrons are the moving charges. When a
              complete path exists, these charges can move around the circuit.
            </p>
            <p>
              Current is the flow of electric charge. Electron flow is from the negative
              terminal of the battery toward the positive terminal. Conventional current
              is shown from positive to negative, which is the reference direction used
              in most circuit analysis.
            </p>
            <p>
              Voltage is the potential difference created by the battery. It produces
              the electrical push that drives charge through the circuit. When the
              resistor is added, electrical energy is used in the resistor.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-3">
          <svg viewBox="0 0 900 440" className="h-auto w-full" role="img" aria-label="Animated DC circuit explaining charge current and voltage">
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
              <path className="pro-wire" d="M132 172V112H350M500 112H760V330H132V252" />
              <rect x="92" y="172" width="80" height="80" rx="12" fill="#ffffff" stroke="#111827" strokeWidth="4" />
              <path d="M116 194h32M132 178v32M118 232h28" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
              <text x="80" y="155" fill="#111827" fontSize="15" fontWeight="800">Battery</text>
              <text x="178" y="184" fill="#dc2626" fontSize="24" fontWeight="900">+</text>
              <text x="180" y="252" fill="#1d4ed8" fontSize="24" fontWeight="900">-</text>
            </g>

            <g id="step-5-resistor" className="pro-resistor">
              <path className="pro-resistor-glow" d="M350 112h20l12-20 24 40 24-40 24 40 24-40 12 20h10" fill="none" stroke="#f59e0b" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" filter="url(#proResistorGlowFilter)" />
              <path d="M350 112h20l12-20 24 40 24-40 24 40 24-40 12 20h10" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="397" y="76" fill="#111827" fontSize="17" fontWeight="900">Resistor (R)</text>
              <text x="382" y="154" fill="#92400e" fontSize="13" fontWeight="800">energy is used here</text>
            </g>

            <g id="step-2-charge-appearance" className="pro-static-charge">
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

            <g id="step-3-electron-flow" className="pro-moving-charge">
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

            <g id="step-4-voltage-effect" className="pro-voltage-layer">
              <path d="M132 172V112H350M500 112H760V330H132V252" fill="none" stroke="url(#proVoltageGradient)" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
              <circle className="pro-terminal-hot" cx="186" cy="176" r="20" fill="#ef4444" />
              <circle cx="186" cy="252" r="16" fill="#2563eb" opacity="0.28" />
              <text x="205" y="174" fill="#dc2626" fontSize="13" fontWeight="900">High potential</text>
              <text x="205" y="257" fill="#1d4ed8" fontSize="13" fontWeight="900">Low potential</text>
              <text className="pro-label label-voltage" x="590" y="68" fill="#0f766e" fontSize="15" fontWeight="900">
                Voltage pushes charge
              </text>
            </g>

            <g id="step-5-conventional-current" className="pro-current-arrow">
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

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[
            ["1", "Circuit Formation", "Wires and battery are drawn first. The battery terminals are marked clearly."],
            ["2", "Charge Appearance", "Blue dots appear on the wire. They represent electrons, which carry negative charge."],
            ["3", "Voltage Effect", "The positive terminal glows as high potential and the negative terminal stays lower intensity."],
            ["4", "Current Flow", "Blue dots move slowly around the circuit from negative to positive as electron flow."],
            ["5", "Conventional Current", "A subtle red arrow shows the analysis direction from positive to negative."],
            ["6", "Energy Use", "The resistor pulses softly to show where electrical energy is used."],
          ].map(([number, title, text]) => (
            <div key={number} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-portal-700">
                Step {number}: {title}
              </p>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
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
        <div className="mt-5 border-t border-slate-200 pt-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
            Fundamental Electrical Concepts
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            These ideas form the base of Network Analysis. Learn them first, then KCL,
            KVL, and circuit theorems become much easier to understand.
          </p>
          <div className="mt-4 divide-y divide-slate-200">
            {BASIC_CONCEPT_GUIDE.map((concept, conceptIndex) => (
              <section key={concept.title} className="py-5 first:pt-0 last:pb-0">
                {conceptIndex === 0 ? (
                  <ProfessionalChargeCircuitGuide />
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
          <div className="mt-5 border-t border-slate-200 pt-4">
            <h4 className="text-sm font-bold text-slate-900">Interactive Summary</h4>
            <div className="mt-3 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
              {BASIC_CONCEPT_SUMMARY.map(([concept, visual]) => (
                <div key={concept} className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2">
                  <span className="font-semibold text-slate-800">{concept}</span>
                  <span className="text-right text-slate-600">{visual}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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

function NetworkTopicList({ compact = false }) {
  return (
    <div className={compact ? "grid gap-3" : "grid gap-3"}>
      {NETWORK_ANALYSIS_TOPIC_GROUPS.map((group, index) => (
        <section key={group.title} className="border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
          <h3 className="text-xs font-bold leading-5 text-slate-900">
            {index + 1}. {group.title}
          </h3>
          <ul className="mt-1.5 grid gap-1 text-xs leading-5 text-slate-600">
            {group.topics.map((topic) => (
              <li key={`${group.title}-${topic}`} className="flex gap-2">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-portal-500" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function MobileConceptRoadmap({ concepts, activeIndex, setActiveIndex }) {
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

  function selectConcept(index) {
    setActiveIndex(index);
    setIsRoadmapOpen(false);
  }

  return (
    <section id="subject-roadmap" className="mt-5 scroll-mt-40 xl:hidden">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setIsRoadmapOpen((currentValue) => !currentValue)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
          aria-expanded={isRoadmapOpen}
          aria-controls="mobile-concept-roadmap"
        >
          <span className="min-w-0">
            <span className="block text-sm font-bold text-slate-900">Learning Roadmap</span>
            <span className="mt-0.5 block truncate text-xs leading-5 text-slate-500">
              Complete Network Analysis topic list.
            </span>
          </span>
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-slate-200 text-portal-700">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 6h12M4 10h12M4 14h12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>

        {isRoadmapOpen ? (
          <div id="mobile-concept-roadmap" className="border-t border-slate-200 px-3 py-3">
            <NetworkTopicList compact />

          </div>
        ) : null}
      </div>
    </section>
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

export default function SubjectTheoryPage({ subject, steps, learningMeta }) {
  const theoryKnowledge = subjectTheoryKnowledge[subject.title] || null;
  const chapterMeta = SUBJECT_META[subject.title] || null;
  const totalConcepts = steps.reduce((count, step) => count + step.points.length, 0);
  const subjectSummary =
    subject.description ||
    "A structured roadmap that moves from fundamentals to exam-level analysis and problem solving.";
  const notesHref = `/notes/${getSubjectSlug(subject.title)}`;
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const [quizSelections, setQuizSelections] = useState({});
  const { progressStats, isReady } = useLearningProgress();

  useEffect(() => {
    setActiveConceptIndex(0);
    setQuizSelections({});
  }, [subject.title]);

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
  const activeConcept = concepts[activeConceptIndex] || concepts[0];
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
    theoryKnowledge.commonMistakes?.[activeConceptIndex] ||
    theoryKnowledge.commonMistakes?.[0] ||
    "";
  const activeRealLifeInsight =
    activeTeaching.realLifeInsight || chapterMeta.studyTip;
  const selectedQuizIndex = quizSelections[activeConcept?.slug];
  const isQuizAnswered = typeof selectedQuizIndex === "number";
  const isQuizCorrect = isQuizAnswered && selectedQuizIndex === activeQuiz?.correctIndex;

  function getConceptStatus(index) {
    if (index < activeConceptIndex) {
      return "review";
    }

    if (index === activeConceptIndex) {
      return "current";
    }

    return "next";
  }

  return (
    <Layout title={`ECE Exam Guide | ${subject.title}`} pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1500px] pb-24 xl:pb-0">
        <nav aria-label="Breadcrumb" className="mb-5 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
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

        <section className="rounded-3xl border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-3 shadow-panel sm:p-4">
          <div className="grid gap-4 xl:grid-cols-[1.28fr_0.82fr]">
            <div className="flex flex-col gap-3 md:flex-row md:items-start">
              <SubjectTheoryIcon />
              <div className="min-w-0 flex-1">
                <p className="inline-flex rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-portal-700">
                  Subject Theory
                </p>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {subject.title}
                </h1>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  {chapterMeta.subtitle}
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  <HeroMetric label="Estimated Time" value={chapterMeta.estimatedTime} />
                  <HeroMetric label="Difficulty" value={chapterMeta.difficulty} />
                  <HeroMetric label="Concepts" value={`${concepts.length} Detailed Topics`} />
                  <HeroMetric label="Level" value={chapterMeta.level} />
                </div>
              </div>
            </div>

            <div className="grid gap-2.5">
              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-bold text-slate-900">Your Progress</h2>
                  <span className="text-xs font-semibold text-slate-500">
                    {isReady ? `${completionPercent}% Completed` : "Loading..."}
                  </span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-slate-100">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-portal-600 transition-all"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-medium text-slate-600">
                    {completedTopics} / {readyTopics} ready topics completed
                  </p>
                  <Link
                    href={learningMeta.continueHref || subject.href}
                    className="inline-flex justify-center rounded-lg bg-portal-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-portal-700"
                  >
                    {completionPercent > 0 ? "Continue Learning" : "Start Learning"}
                  </Link>
                </div>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                <Link
                  href={notesHref}
                  className="inline-flex justify-center rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Open Notes View
                </Link>
                <Link
                  href={`/practice?search=${encodeURIComponent(subject.search)}`}
                  className="inline-flex justify-center rounded-lg border border-portal-200 bg-white px-3 py-2.5 text-xs font-semibold text-portal-700 transition hover:bg-portal-50"
                >
                  Practice Questions
                </Link>
              </div>
            </div>
          </div>
        </section>

        <MobileConceptRoadmap
          concepts={concepts}
          activeIndex={activeConceptIndex}
          setActiveIndex={setActiveConceptIndex}
        />

        <section className="mt-5 grid gap-5 xl:grid-cols-[270px_minmax(0,1fr)_290px]">
          <aside className="hidden xl:block">
            <div className="xl:sticky xl:top-24">
              <SidebarCard title="Learning Roadmap">
                <NetworkTopicList />
              </SidebarCard>

              <div className="mt-4 grid gap-4">
                <SidebarCard title="Exam Focus">
                  <div className="grid gap-2">
                    {chapterMeta.examFocus.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm font-medium text-slate-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </SidebarCard>

                <SidebarCard title="Study Flow">
                  <div className="grid gap-2">
                    {steps.map((step, index) => (
                      <div
                        key={step.title}
                        className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
                          Module {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-5 text-slate-900">
                          {step.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </SidebarCard>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
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

            <section
              id="subject-concept"
              className="mt-5 scroll-mt-40 bg-white"
            >
              <div className="px-3 pb-4 sm:px-5 lg:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-portal-700">
                  Concept {String(activeConceptIndex + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 max-w-3xl text-base font-semibold leading-snug text-slate-950 sm:text-lg">
                  {activeConcept.title}
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
                  {activeConcept.summary}
                </p>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
                  In this topic, first understand what each quantity represents, then learn how to assign direction and polarity before writing equations. A negative answer is not a failure; it simply tells you that the actual direction is opposite to the reference direction chosen at the start.
                </p>
              </div>

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
                    <div className="mt-2 max-w-2xl overflow-hidden">
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
                  {activeConceptIndex === concepts.length - 1
                    ? "Finish this chapter, then move to practice questions to reinforce the theory."
                    : `Next Concept -> ${concepts[activeConceptIndex + 1]?.shortTitle}`}
                </p>
              </div>

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
                      Math.min(currentValue + 1, concepts.length - 1)
                    )
                  }
                  disabled={activeConceptIndex === concepts.length - 1}
                  className="rounded-xl bg-portal-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-portal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {activeConceptIndex === concepts.length - 1
                    ? "Last Concept"
                    : `Next: ${concepts[activeConceptIndex + 1]?.shortTitle}`}
                </button>
              </div>
            </section>

          </main>

          <aside className="min-w-0">
            <div className="grid gap-4 xl:sticky xl:top-24">
              <SidebarCard title="Key Concepts">
                <div className="grid gap-2">
                  {chapterMeta.keyConcepts.map((concept) => (
                    <div
                      key={concept}
                      className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm font-medium text-slate-700"
                    >
                      {concept}
                    </div>
                  ))}
                </div>
              </SidebarCard>

              <SidebarCard title="Formula Preview">
                <FormulaPreview formulas={activeFormulaPreview} />
              </SidebarCard>

              <SidebarCard title="Study Tips">
                <div className="grid gap-2">
                  {theoryKnowledge.studyTips.slice(0, 4).map((tip) => (
                    <div
                      key={tip}
                      className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 text-sm leading-6 text-slate-700"
                    >
                      {tip}
                    </div>
                  ))}
                </div>
              </SidebarCard>

              <SidebarCard title="Common Mistakes">
                <div className="grid gap-2">
                  {theoryKnowledge.commonMistakes.slice(0, 3).map((mistake) => (
                    <div
                      key={mistake}
                      className="rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-3 text-sm leading-6 text-slate-700"
                    >
                      {mistake}
                    </div>
                  ))}
                </div>
              </SidebarCard>

              <SidebarCard title="Study Tip">
                <p className="text-sm leading-7 text-slate-700">{chapterMeta.studyTip}</p>
              </SidebarCard>
            </div>
          </aside>
        </section>
      </div>

      <div className="fixed bottom-3 left-3 right-3 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur xl:hidden">
        <div className="grid grid-cols-4 gap-2">
          <a
            href="#subject-roadmap"
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Roadmap
          </a>
          <a
            href="#subject-concept"
            className="rounded-2xl px-2 py-3 text-center text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Theory
          </a>
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

export function getStaticProps({ params }) {
  const subject = subjectDirectory.find(
    (item) => getSubjectSlug(item.title) === params.slug
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
    },
  };
}
