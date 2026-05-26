import Link from "next/link";
import Layout from "../components/layout";
import NetworkTopicMenu from "../components/NetworkTopicMenu";

const lawSections = [
  {
    title: "Ohm's Law",
    intro:
      "Ohm's Law connects the push, the flow, and the opposition in a circuit.",
    breakdown: [
      "Voltage acts like the push that tries to move charge through the path.",
      "Current is the actual movement of charge through the component.",
      "Resistance makes that movement harder, so the current becomes smaller.",
      "If voltage increases and resistance stays the same, current increases.",
      "If resistance increases and voltage stays the same, current decreases.",
    ],
    formula: "V = IR",
    formulaMeaning: [
      "V is the voltage across the element. It shows how much electrical push is available.",
      "I is the current through the element. It shows how much charge is moving.",
      "R is the resistance. It shows how strongly the element slows current.",
    ],
    example:
      "If the same resistor is connected to a stronger battery, current moves faster. If a bigger resistor is used with the same battery, current slows down.",
    keyIdea: "Voltage pushes, resistance limits, and current is the result.",
    animation:
      "Show current dots speeding up when voltage increases and slowing down when the resistor becomes larger.",
  },
  {
    title: "Kirchhoff's Current Law (KCL)",
    intro:
      "KCL helps us understand what happens when current reaches a junction.",
    breakdown: [
      "A junction is a meeting point where wires or branches connect.",
      "Current may split into different branches or combine from different branches.",
      "The node does not store charge like a tank.",
      "So the current arriving at the node must be matched by current leaving it.",
      "This is why node analysis works: every junction has a current balance.",
    ],
    formula: "current entering = current leaving",
    formulaMeaning: [
      "Entering current means current flowing into the node.",
      "Leaving current means current flowing out through connected branches.",
      "The balance means charge is not piling up at the junction.",
    ],
    example:
      "If 6 A enters a junction and one branch takes 2 A, the remaining branches together must carry 4 A away.",
    keyIdea: "At a junction, current splits or combines, but charge does not disappear.",
    animation:
      "Show moving current dots reaching a node and splitting into two or three branch paths.",
  },
  {
    title: "Kirchhoff's Voltage Law (KVL)",
    intro:
      "KVL helps us track energy as charge moves around a closed loop.",
    breakdown: [
      "A voltage source gives energy to the charge.",
      "Components use that energy as the charge moves through them.",
      "When we return to the starting point of the loop, the energy balance must be complete.",
      "The voltage gained from sources is used as voltage drops across components.",
      "This is why loop equations work: the loop cannot create extra energy by itself.",
    ],
    formula: "sum of voltages around a loop = 0",
    formulaMeaning: [
      "Voltage rise means energy is added, usually by a source.",
      "Voltage drop means energy is used by a component.",
      "The total becomes zero because every gain is balanced by drops in a closed loop.",
    ],
    example:
      "In a simple battery-resistor loop, the battery may add 12 V. The resistor then drops 12 V, so the loop balances.",
    keyIdea: "Around a closed loop, energy gained equals energy used.",
    animation:
      "Show a bright energy bar rising at the battery and fading step by step across each component.",
  },
];

const flowSteps = [
  {
    title: "Voltage Applied",
    text: "A source creates electrical push across the circuit.",
  },
  {
    title: "Current Starts",
    text: "Ohm's Law decides how much current flows through each resistive path.",
  },
  {
    title: "Current Splits",
    text: "At junctions, KCL keeps incoming and outgoing current balanced.",
  },
  {
    title: "Voltage Drops",
    text: "Across components, voltage is used as electrical energy is converted or stored.",
  },
  {
    title: "Loop Balances",
    text: "KVL makes sure the total voltage rise and total voltage drop match.",
  },
  {
    title: "Stable Operation",
    text: "The circuit settles into values that satisfy Ohm's Law, KCL, and KVL together.",
  },
];

function LawCard({ section, index }) {
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

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.86fr]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Visual Understanding
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

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Simple Example
            </p>
            <p className="mt-1.5 text-sm leading-6 text-slate-700">{section.example}</p>
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

function FlowStep({ step, index }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <span className="inline-flex rounded-lg bg-portal-600 px-2.5 py-1 text-xs font-black text-white">
        Step {index + 1}
      </span>
      <h3 className="mt-3 text-sm font-bold text-slate-950">{step.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{step.text}</p>
    </div>
  );
}

export default function CircuitLawsPage() {
  return (
    <Layout title="Circuit Laws GATE ECE Notes + KCL KVL Formulas + PYQs" pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1440px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
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
                Circuit Laws
              </span>
            </li>
          </ol>
          <NetworkTopicMenu currentPath="/circuit-laws" />
        </nav>

        <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Circuit Laws
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Circuit laws help us predict how a circuit settles after a source is connected.
            Ohm's Law explains flow through an element. KCL explains what happens at a
            junction. KVL explains how energy balances around a closed path.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          {lawSections.map((section, index) => (
            <LawCard key={section.title} section={section} index={index} />
          ))}
        </section>

        <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            How The Laws Work Together
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            In a real circuit, these laws do not act separately. Voltage starts the action.
            Resistance shapes the current. Nodes split and combine current. Loops balance
            voltage rises and drops. A correct circuit solution must satisfy all three at
            the same time.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {flowSteps.map((step, index) => (
              <FlowStep key={step.title} step={step} index={index} />
            ))}
          </div>
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/circuit-elements"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Circuit Elements
          </Link>
          <Link
            href="/network-theorems"
            className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
          >
            Next Network Theorems
          </Link>
        </div>
      </div>
    </Layout>
  );
}
