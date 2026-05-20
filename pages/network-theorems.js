import Link from "next/link";
import Layout from "../components/layout";
import NetworkTopicMenu from "../components/NetworkTopicMenu";

const theoremSections = [
  {
    title: "Superposition Theorem",
    intro:
      "Superposition lets you study one source at a time instead of trying to understand every push together.",
    formula: "final response = response from source 1 + response from source 2 + ...",
    formulaMeaning: [
      "Response means the voltage or current you want to find.",
      "Each source is tested alone.",
      "The separate answers are added with their signs.",
    ],
    breakdown: [
      "Only linear circuits can be handled this way.",
      "When one source is active, the other independent sources are turned off.",
      "A voltage source turned off becomes a short path.",
      "A current source turned off becomes an open path.",
      "The final current or voltage is the sum of all individual effects.",
    ],
    steps: [
      "Choose the voltage or current you want to find.",
      "Keep one independent source active.",
      "Turn off all other independent sources.",
      "Solve the circuit for that one source.",
      "Repeat for every source.",
      "Add all partial answers with correct direction or polarity.",
    ],
    keyIdea: "Complex source action becomes easier when each source gets its own turn.",
    animation:
      "Show multiple sources fading out one by one, then show each partial current path combining into the final answer.",
  },
  {
    title: "Thevenin's Theorem",
    intro:
      "Thevenin turns a complicated two-terminal network into one voltage source with one series resistor.",
    formula: "Vth with Rth in series",
    formulaMeaning: [
      "Vth is the open-terminal voltage seen by the load.",
      "Rth is the resistance looking back into the network.",
      "The load sees the same external behavior after replacement.",
    ],
    breakdown: [
      "The inside circuit may be large, but the load only feels terminal voltage and resistance.",
      "The original network is replaced by a simpler equivalent source.",
      "This is very useful when the load changes again and again.",
      "Instead of solving the whole circuit repeatedly, you solve the equivalent once.",
    ],
    steps: [
      "Remove the load resistor.",
      "Find the open-circuit voltage across the load terminals. This is Vth.",
      "Turn off independent sources and find the resistance seen from the load terminals. This is Rth.",
      "Draw Vth in series with Rth.",
      "Reconnect the load and solve the simple circuit.",
    ],
    keyIdea: "A big network can look like one voltage source and one resistor to the load.",
    animation:
      "Show a large circuit collapsing into a battery and a series resistor while the load terminals stay fixed.",
  },
  {
    title: "Norton's Theorem",
    intro:
      "Norton gives the same kind of simplification as Thevenin, but in current-source form.",
    formula: "In with Rn in parallel",
    formulaMeaning: [
      "In is the short-circuit current through the output terminals.",
      "Rn is the resistance looking back into the network.",
      "Rn has the same value as Rth for the same network.",
    ],
    breakdown: [
      "The original network is replaced by one current source.",
      "The equivalent resistance sits in parallel with that current source.",
      "This form is helpful when branch currents are easier to think about.",
      "Thevenin and Norton are two views of the same terminal behavior.",
    ],
    steps: [
      "Remove the load.",
      "Short the output terminals and find the current through the short. This is In.",
      "Turn off independent sources and find the resistance seen from the terminals. This is Rn.",
      "Draw In in parallel with Rn.",
      "Reconnect the load and solve using current division if useful.",
    ],
    keyIdea: "A big network can also look like one current source and one parallel resistor.",
    animation:
      "Show a complex network transforming into a current source with a parallel resistor feeding the load.",
  },
  {
    title: "Maximum Power Transfer Theorem",
    intro:
      "This theorem tells us when a load receives the strongest possible power from a source network.",
    formula: "RL = Rth,  Pmax = Vth^2 / 4Rth",
    formulaMeaning: [
      "RL is the load resistance.",
      "Rth is the Thevenin resistance of the source network.",
      "Pmax is the highest power the load can receive in a DC resistive circuit.",
    ],
    breakdown: [
      "If the load is too small, current is high but voltage across the load drops.",
      "If the load is too large, voltage is high but current becomes weak.",
      "Maximum power happens at the balanced point.",
      "That balance occurs when the load equals the source-side resistance.",
    ],
    steps: [
      "Find the Thevenin equivalent of the network seen by the load.",
      "Identify Rth.",
      "Choose the load value equal to Rth.",
      "Use the simplified circuit to find load current and power.",
      "For maximum power, use Pmax = Vth^2 / 4Rth.",
    ],
    keyIdea: "The load gets maximum power when it matches the source-side resistance.",
    animation:
      "Show a power bar rising as RL approaches Rth, peaking at the match point, then falling after mismatch.",
  },
  {
    title: "Reciprocity Theorem",
    intro:
      "Reciprocity says that in some linear circuits, source and response positions can be swapped and the response stays linked.",
    formula: "response at B due to source at A = response at A due to same source at B",
    formulaMeaning: [
      "The circuit must be linear and bilateral.",
      "The same source value is moved to the other location.",
      "The measured response is checked at the original source location.",
    ],
    breakdown: [
      "The circuit behaves symmetrically from the two selected points.",
      "It works well with passive resistor networks.",
      "It does not apply freely to circuits with dependent sources or unilateral devices.",
      "It is useful for checking network behavior and simplifying some measurements.",
    ],
    steps: [
      "Apply a source at one branch.",
      "Measure the response in another branch.",
      "Move the same source to the measured branch.",
      "Measure the response in the original branch.",
      "Compare both responses.",
    ],
    keyIdea: "In a linear bilateral network, source and response locations can sometimes trade places.",
    animation:
      "Show a source icon and meter icon swapping positions while the highlighted response stays equal.",
  },
  {
    title: "Millman's Theorem",
    intro:
      "Millman's Theorem helps combine several parallel voltage-source branches into one equivalent voltage.",
    formula: "Veq = (V1/R1 + V2/R2 + ...)/(1/R1 + 1/R2 + ...)",
    formulaMeaning: [
      "Each voltage source contributes according to its branch resistance.",
      "Smaller resistance gives that source more influence.",
      "Veq is the single equivalent node voltage.",
    ],
    breakdown: [
      "Parallel source branches pull the common node toward their own voltages.",
      "A branch with low resistance pulls harder.",
      "The final node voltage is a weighted balance of all branches.",
      "This saves time in circuits with many source-resistor branches in parallel.",
    ],
    steps: [
      "Identify all parallel branches with voltage source and series resistance.",
      "Calculate each V/R term.",
      "Add all V/R terms in the numerator.",
      "Add all 1/R terms in the denominator.",
      "Divide to get the equivalent voltage.",
      "Use the equivalent source for further solving.",
    ],
    keyIdea: "Parallel source branches combine into one weighted voltage source.",
    animation:
      "Show several source branches pulling one common node, then merging into one equivalent source.",
  },
  {
    title: "Star-Delta Transformation",
    intro:
      "Star-Delta transformation changes a three-resistor shape into another shape that is easier to solve.",
    formula: "Delta to Star: RA = RbRc / (Ra + Rb + Rc)",
    formulaMeaning: [
      "Each star resistor depends on the two neighboring delta resistors.",
      "The denominator is the sum of all three delta resistors.",
      "The outside three terminals keep the same behavior.",
    ],
    breakdown: [
      "Some resistor networks are not simple series or parallel.",
      "A star shape has three resistors meeting at one center point.",
      "A delta shape has three resistors forming a triangle.",
      "Changing one shape into the other can reveal series-parallel simplifications.",
      "The outside terminals behave the same after transformation.",
    ],
    steps: [
      "Find the three terminals of the star or delta network.",
      "Decide which transformation makes the circuit simpler.",
      "Apply the correct conversion formulas.",
      "Redraw the circuit with the new resistor shape.",
      "Look for new series or parallel combinations.",
      "Continue simplifying the circuit.",
    ],
    keyIdea: "Change the resistor shape so hidden series-parallel paths become visible.",
    animation:
      "Show a triangle of resistors smoothly folding into a Y-shape, then highlight the newly simplified branches.",
  },
];

const learningFlow = [
  {
    title: "Start With Sources",
    text: "If many sources are active, use Superposition to see each source effect clearly.",
  },
  {
    title: "Reduce The Network",
    text: "Use Thevenin or Norton when a large circuit only matters at two terminals.",
  },
  {
    title: "Choose The Load",
    text: "Use Maximum Power Transfer when the goal is strongest power delivery to the load.",
  },
  {
    title: "Check Symmetry",
    text: "Use Reciprocity when the circuit is linear and bilateral and source-response positions can be exchanged.",
  },
  {
    title: "Merge Parallel Sources",
    text: "Use Millman's Theorem when several source-resistor branches share the same two nodes.",
  },
  {
    title: "Reshape Resistors",
    text: "Use Star-Delta when the network is not directly series or parallel.",
  },
];

function TheoremCard({ theorem, index }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-portal-600 text-sm font-black text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">{theorem.title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">{theorem.intro}</p>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                What Happens Physically
              </h3>
              <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-700">
                {theorem.breakdown.map((point) => (
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
                {theorem.formula}
              </p>
              <ul className="mt-3 grid gap-1.5 text-xs leading-5 text-slate-600">
                {theorem.formulaMeaning.map((line) => (
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
              {theorem.steps.map((step, stepIndex) => (
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
                {theorem.keyIdea}
              </p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
                Animation Idea
              </p>
              <p className="mt-1.5 text-sm leading-6 text-slate-700">{theorem.animation}</p>
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

export default function NetworkTheoremsPage() {
  return (
    <Layout title="ECE Exam Guide | Network Theorems" pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1200px] pb-24">
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
                Network Theorems
              </span>
            </li>
          </ol>
          <NetworkTopicMenu currentPath="/network-theorems" />
        </nav>

        <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Network Theorems
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Network theorems are circuit shortcuts with meaning. They help you turn messy
            circuits into smaller, clearer versions while keeping the same behavior at the
            part you care about.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          {theoremSections.map((theorem, index) => (
            <TheoremCard key={theorem.title} theorem={theorem} index={index} />
          ))}
        </section>

        <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            One Learning Flow
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            These theorems are not separate tricks. They are choices. First understand what
            makes the circuit difficult. Then choose the theorem that removes that difficulty
            with the least work.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {learningFlow.map((step, index) => (
              <FlowStep key={step.title} step={step} index={index} />
            ))}
          </div>
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/circuit-laws"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Circuit Laws
          </Link>
          <Link
            href="/dc-circuit-analysis"
            className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
          >
            Next DC Circuit Analysis
          </Link>
        </div>
      </div>
    </Layout>
  );
}
