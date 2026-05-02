import Link from "next/link";
import Layout from "../components/layout";

const dcTopics = [
  {
    title: "Basic Analysis",
    intro:
      "Basic DC analysis starts by reading the circuit with Ohm's Law, KCL, and KVL together.",
    breakdown: [
      "Ohm's Law connects voltage, current, and resistance in each element.",
      "KCL checks how current splits or combines at a node.",
      "KVL checks how voltage rises and drops around a loop.",
      "This approach works best when the circuit is small and easy to trace.",
    ],
    steps: [
      "Mark known source and resistor values.",
      "Choose current directions and voltage polarities.",
      "Apply Ohm's Law where voltage and resistance are known.",
      "Use KCL at junctions and KVL around loops.",
      "Solve the equations and check if signs make sense.",
    ],
    formula: "V = IR",
    formulaMeaning: [
      "V is the voltage across a resistor.",
      "I is the current through that resistor.",
      "R is the resistance limiting the current.",
    ],
    keyIdea: "Small DC circuits can often be solved by carefully combining Ohm's Law, KCL, and KVL.",
    animation:
      "Show current dots moving through resistors while node currents and loop voltage drops light up one by one.",
  },
  {
    title: "Nodal Analysis",
    intro:
      "Nodal analysis solves a circuit by focusing on node voltages instead of branch currents.",
    breakdown: [
      "A node is a connection point shared by circuit branches.",
      "One node is chosen as ground, so every other voltage is measured from it.",
      "Current through each connected branch is written using the node voltage.",
      "KCL turns those branch currents into equations.",
    ],
    steps: [
      "Choose the ground node.",
      "Name the unknown node voltages.",
      "Write KCL at each important node.",
      "Convert branch currents using voltage difference divided by resistance.",
      "Solve the node-voltage equations.",
      "Use the voltages to find required currents and power.",
    ],
    formula: "I = (Vnode - Vother) / R",
    formulaMeaning: [
      "Vnode is the voltage at the node you are solving.",
      "Vother is the voltage at the other end of the branch.",
      "R is the resistance in that branch.",
    ],
    keyIdea: "Nodal analysis is best when node voltages are easier to find than loop currents.",
    animation:
      "Highlight the ground node first, then show currents leaving each node as equations appear beside them.",
  },
  {
    title: "Mesh Analysis",
    intro:
      "Mesh analysis solves a circuit by assigning a current to each loop and tracking voltage drops.",
    breakdown: [
      "A mesh is a loop that does not contain another loop inside it.",
      "Each mesh gets its own assumed current direction.",
      "Shared resistors carry the difference between two mesh currents.",
      "KVL around each mesh creates the equations.",
    ],
    steps: [
      "Identify the independent meshes.",
      "Assign clockwise or anticlockwise mesh currents.",
      "Write KVL around each mesh.",
      "Handle shared resistors using current differences.",
      "Solve the mesh-current equations.",
      "Use mesh currents to find branch currents and voltages.",
    ],
    formula: "Vdrop = R(Imesh1 - Imesh2)",
    formulaMeaning: [
      "R is the shared resistance.",
      "Imesh1 is the current of the loop you are writing.",
      "Imesh2 is the neighboring loop current through the same resistor.",
    ],
    keyIdea: "Mesh analysis is best when loop currents make the circuit easier to describe.",
    animation:
      "Draw glowing circular arrows around each loop, then highlight shared resistors where currents oppose or assist.",
  },
  {
    title: "Source Transformation",
    intro:
      "Source transformation changes the shape of a source branch while keeping the outside behavior the same.",
    breakdown: [
      "A voltage source with a series resistor can become a current source with a parallel resistor.",
      "A current source with a parallel resistor can become a voltage source with a series resistor.",
      "The load connected to the terminals sees the same voltage-current behavior.",
      "This is useful when the new shape reveals simpler series or parallel paths.",
    ],
    steps: [
      "Find a source with its matching resistor.",
      "Check whether it is voltage-series or current-parallel form.",
      "Use V = IR to convert source value.",
      "Keep the resistor value the same.",
      "Redraw the circuit and simplify the new connections.",
    ],
    formula: "V = IR",
    formulaMeaning: [
      "V is the equivalent voltage source value.",
      "I is the equivalent current source value.",
      "R is the same resistor used in both forms.",
    ],
    keyIdea: "Source transformation changes circuit form without changing terminal behavior.",
    animation:
      "Show a battery and series resistor morphing into a current source and parallel resistor.",
  },
  {
    title: "Thevenin and Norton Methods",
    intro:
      "Thevenin and Norton methods replace a large network with a small equivalent seen by the load.",
    breakdown: [
      "Thevenin uses one voltage source with one series resistor.",
      "Norton uses one current source with one parallel resistor.",
      "Both describe the same two-terminal behavior.",
      "They are useful when the load changes or when a circuit is too large to solve repeatedly.",
    ],
    steps: [
      "Remove the load from the output terminals.",
      "Find the open-circuit voltage for Thevenin.",
      "Find the short-circuit current for Norton.",
      "Find the equivalent resistance seen from the terminals.",
      "Draw the simpler equivalent circuit.",
      "Reconnect the load and solve quickly.",
    ],
    formula: "Vth = In Rth",
    formulaMeaning: [
      "Vth is the Thevenin voltage.",
      "In is the Norton current.",
      "Rth is the same equivalent resistance used in both forms.",
    ],
    keyIdea: "A complex network can be replaced by a simple equivalent at the load terminals.",
    animation:
      "Collapse a complex network into Thevenin form, then flip it into Norton form while the load stays connected.",
  },
  {
    title: "Superposition Method",
    intro:
      "Superposition handles multiple independent sources by studying one source at a time.",
    breakdown: [
      "Only one independent source is kept active during each pass.",
      "Other independent voltage sources become short circuits.",
      "Other independent current sources become open circuits.",
      "Each partial voltage or current is added to get the final result.",
    ],
    steps: [
      "Choose the voltage or current to find.",
      "Keep one independent source active.",
      "Turn off all other independent sources.",
      "Solve the circuit for that single source.",
      "Repeat for every independent source.",
      "Add the partial results with correct sign or direction.",
    ],
    formula: "final response = response1 + response2 + ...",
    formulaMeaning: [
      "Response means the voltage or current you are finding.",
      "Each response comes from one active source.",
      "Signs matter because directions and polarities matter.",
    ],
    keyIdea: "Superposition breaks a multi-source circuit into smaller single-source circuits.",
    animation:
      "Fade all sources except one, show its current path, then combine colored paths into the final response.",
  },
];

const analysisFlow = [
  "Read the circuit and mark nodes, loops, sources, and resistors.",
  "Decide whether the circuit is easier by nodes, meshes, or direct laws.",
  "Simplify first if source transformation or equivalents reduce the circuit.",
  "Write equations using Ohm's Law, KCL, or KVL.",
  "Solve for unknown voltages and currents.",
  "Check power direction and signs to confirm the result makes physical sense.",
];

function TopicCard({ topic, index }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-portal-600 text-sm font-black text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">{topic.title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">{topic.intro}</p>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.86fr]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Concept Breakdown
              </h3>
              <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-700">
                {topic.breakdown.map((point) => (
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
              <p className="mt-2 rounded-lg bg-white px-3 py-2 font-mono text-sm font-bold leading-6 text-slate-950 sm:text-base">
                {topic.formula}
              </p>
              <ul className="mt-3 grid gap-1.5 text-xs leading-5 text-slate-600">
                {topic.formulaMeaning.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Step-by-Step Method
            </p>
            <ol className="mt-2 grid gap-2 text-sm leading-6 text-slate-700">
              {topic.steps.map((step, stepIndex) => (
                <li key={step} className="flex gap-2">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-md bg-white text-xs font-black text-portal-700">
                    {stepIndex + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                Key Idea
              </p>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-emerald-950">
                {topic.keyIdea}
              </p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
                Animation Idea
              </p>
              <p className="mt-1.5 text-sm leading-6 text-slate-700">{topic.animation}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DcCircuitAnalysisPage() {
  return (
    <Layout title="ECE Exam Guide | DC Circuit Analysis" pageClassName="py-3 sm:py-4">
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
                DC Circuit Analysis
              </span>
            </li>
          </ol>
        </nav>

        <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            DC Circuit Analysis
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            DC circuit analysis helps you find steady voltages, currents, and power in a
            circuit where current direction does not keep changing. The main skill is to
            choose the right method, simplify the network, and solve it step by step.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          {dcTopics.map((topic, index) => (
            <TopicCard key={topic.title} topic={topic} index={index} />
          ))}
        </section>

        <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            One DC Analysis Flow
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            DC analysis is not about memorizing one method. It is about reading the circuit
            and choosing the cleanest path to the answer.
          </p>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {analysisFlow.map((step, index) => (
              <li key={step} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <span className="inline-flex rounded-lg bg-portal-600 px-2.5 py-1 text-xs font-black text-white">
                  Step {index + 1}
                </span>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-800">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/network-theorems"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Network Theorems
          </Link>
          <Link
            href="/subjects/network-analysis"
            className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
          >
            Finish Network Analysis
          </Link>
        </div>
      </div>
    </Layout>
  );
}
