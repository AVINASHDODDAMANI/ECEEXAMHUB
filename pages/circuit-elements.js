import Link from "next/link";
import Layout from "../components/layout";

const circuitElementSections = [
  {
    title: "Resistor",
    intro:
      "A resistor slows down current and turns part of the electrical energy into heat.",
    breakdown: [
      "It controls how much current can pass through a branch.",
      "It is used for current limiting, voltage division, biasing, and protection.",
      "A larger resistance makes the current flow weaker for the same voltage.",
    ],
    formula: "V = IR",
    formulaMeaning: [
      "V is the voltage across the resistor.",
      "I is the current through it.",
      "R is the resistance value.",
    ],
    keyIdea: "A resistor controls current by using up energy as heat.",
    animation:
      "Show current dots entering the resistor, slowing down, and creating a soft heat glow.",
  },
  {
    title: "Capacitor",
    intro:
      "A capacitor stores energy between two plates and does not like sudden voltage changes.",
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
    animation:
      "Show charges collecting on two plates while the electric field glow builds between them.",
  },
  {
    title: "Inductor",
    intro:
      "An inductor stores energy in a magnetic field and does not like sudden current changes.",
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
    animation:
      "Show current moving through a coil while magnetic field rings grow around it.",
  },
  {
    title: "Independent Voltage Source",
    intro:
      "A voltage source gives the circuit a fixed electrical push between two points.",
    breakdown: [
      "It sets the voltage level that drives charge through the circuit.",
      "It is used as a battery, supply rail, or input signal source.",
      "It tries to maintain its voltage even when the connected load changes.",
    ],
    formula: "V = constant",
    formulaMeaning: ["The source tries to keep the same voltage across its terminals."],
    keyIdea: "A voltage source maintains a set voltage and pushes charge through the path.",
    animation:
      "Show a battery creating a pressure-like push that sends current dots around the loop.",
  },
  {
    title: "Independent Current Source",
    intro:
      "A current source tries to keep the same amount of current flowing through a branch.",
    breakdown: [
      "It focuses on steady current instead of fixed voltage.",
      "It is used in biasing, transistor circuits, current mirrors, and circuit testing.",
      "The voltage may adjust, but the current tries to stay fixed within practical limits.",
    ],
    formula: "I = constant",
    formulaMeaning: ["The source tries to keep the branch current at a fixed value."],
    keyIdea: "A current source keeps current flow steady.",
    animation:
      "Show equally spaced current dots moving at a constant speed through one branch.",
  },
  {
    title: "Dependent Source",
    intro:
      "A dependent source is controlled by another voltage or current somewhere in the circuit.",
    breakdown: [
      "It connects one part of the circuit to another part.",
      "It is useful for modeling transistors, amplifiers, and controlled devices.",
      "A small input can control a larger output, which is the basic idea behind amplification.",
    ],
    formula: "Vout = A Vin",
    formulaMeaning: [
      "Vout is the output voltage.",
      "Vin is the controlling input voltage.",
      "A is the gain.",
    ],
    keyIdea: "A dependent source lets one circuit quantity control another.",
    animation:
      "Show a small input signal controlling a brighter and larger output path.",
  },
  {
    title: "Source Transformation",
    intro:
      "Source transformation changes the shape of a source circuit without changing what the load sees.",
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
    animation:
      "Show a voltage source and series resistor morphing into a current source and parallel resistor.",
  },
];

function ElementCard({ section, index }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-portal-600 text-sm font-black text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">{section.title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            {section.intro}
          </p>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.82fr]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Concept Breakdown
              </h3>
              <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-700">
                {section.breakdown.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-portal-100 bg-portal-50/60 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-portal-700">
                Formula
              </p>
              <p className="mt-2 rounded-lg bg-white px-3 py-2 font-mono text-base font-bold text-slate-950">
                {section.formula}
              </p>
              <ul className="mt-3 grid gap-1.5 text-xs leading-5 text-slate-600">
                {section.formulaMeaning.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                Key Idea
              </p>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-emerald-950">
                {section.keyIdea}
              </p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
                Animation Idea
              </p>
              <p className="mt-1.5 text-sm leading-6 text-slate-700">{section.animation}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CircuitElementsPage() {
  return (
    <Layout title="ECE Exam Guide | Circuit Elements" pageClassName="py-3 sm:py-4">
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
                Circuit Elements
              </span>
            </li>
          </ol>
        </nav>

        <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Circuit Elements
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Circuit elements are the parts that shape how voltage, current, and energy move
            through a circuit. Some elements slow current down, some store energy, some push
            charges, and some control other parts of the circuit.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          {circuitElementSections.map((section, index) => (
            <ElementCard key={section.title} section={section} index={index} />
          ))}
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/basic-concepts"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Basic Concepts
          </Link>
          <Link
            href="/circuit-laws"
            className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
          >
            Next Circuit Laws
          </Link>
        </div>
      </div>
    </Layout>
  );
}
