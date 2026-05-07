import Link from "next/link";
import Layout from "../components/layout";

function TopicSection({ title, children }) {
  return (
    <section className="topic-section rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
      <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">{children}</div>
    </section>
  );
}

function FormulaCard({ title, formula, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <h3 className="text-base font-bold text-slate-950">{title}</h3>
      <p className="mt-2 font-bold text-portal-700">{formula}</p>
      <div className="mt-2 text-sm leading-6 text-slate-700">{children}</div>
    </div>
  );
}

function CounterAnimation() {
  return (
    <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-4">
      <style jsx>{`
        .clk-pulse { animation: clkPulse 4s ease-in-out infinite; }
        .state-0 { animation: state0 4s ease-in-out infinite; }
        .state-1 { animation: state1 4s ease-in-out infinite; }
        .state-2 { animation: state2 4s ease-in-out infinite; }
        .state-3 { animation: state3 4s ease-in-out infinite; }
        .arrow-flow { animation: arrowFlow 4s ease-in-out infinite; }
        @keyframes clkPulse {
          0%, 12%, 30%, 48%, 66%, 84%, 100% { opacity: .35; stroke-width: 4; }
          18%, 36%, 54%, 72% { opacity: 1; stroke-width: 8; }
        }
        @keyframes state0 { 0%, 20%, 100% { opacity: 1; transform: scale(1.04); } 25%, 95% { opacity: .35; transform: scale(1); } }
        @keyframes state1 { 0%, 20%, 45%, 100% { opacity: .35; transform: scale(1); } 25%, 40% { opacity: 1; transform: scale(1.04); } }
        @keyframes state2 { 0%, 45%, 65%, 100% { opacity: .35; transform: scale(1); } 50%, 62% { opacity: 1; transform: scale(1.04); } }
        @keyframes state3 { 0%, 65%, 88%, 100% { opacity: .35; transform: scale(1); } 70%, 84% { opacity: 1; transform: scale(1.04); } }
        @keyframes arrowFlow { 0%, 15% { opacity: .2; } 20%, 84% { opacity: 1; } 100% { opacity: .2; } }
      `}</style>
      <svg viewBox="0 0 780 340" className="w-full" role="img" aria-label="Animated binary counter state transition">
        <rect x="20" y="22" width="740" height="286" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
        <text x="44" y="58" fill="#0f172a" fontSize="18" fontWeight="900">Animated working: 2-bit up counter</text>
        <text x="44" y="82" fill="#64748b" fontSize="13" fontWeight="700">Each clock pulse moves the stored state to the next binary count.</text>

        <path className="clk-pulse" d="M70 126 H105 V98 H145 V126 H185 V98 H225 V126 H265 V98 H305 V126" fill="none" stroke="#16a34a" strokeLinecap="round" strokeLinejoin="round" />
        <text x="70" y="155" fill="#166534" fontSize="14" fontWeight="900">clock pulses</text>

        <g className="state-0" style={{ transformOrigin: "410px 130px" }}>
          <rect x="360" y="108" width="100" height="56" rx="16" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
          <text x="410" y="143" textAnchor="middle" fill="#1d4ed8" fontSize="22" fontWeight="900">00</text>
        </g>
        <g className="state-1" style={{ transformOrigin: "560px 130px" }}>
          <rect x="510" y="108" width="100" height="56" rx="16" fill="#f0fdf4" stroke="#16a34a" strokeWidth="3" />
          <text x="560" y="143" textAnchor="middle" fill="#166534" fontSize="22" fontWeight="900">01</text>
        </g>
        <g className="state-2" style={{ transformOrigin: "560px 230px" }}>
          <rect x="510" y="208" width="100" height="56" rx="16" fill="#fff7ed" stroke="#f97316" strokeWidth="3" />
          <text x="560" y="243" textAnchor="middle" fill="#9a3412" fontSize="22" fontWeight="900">10</text>
        </g>
        <g className="state-3" style={{ transformOrigin: "410px 230px" }}>
          <rect x="360" y="208" width="100" height="56" rx="16" fill="#fef2f2" stroke="#dc2626" strokeWidth="3" />
          <text x="410" y="243" textAnchor="middle" fill="#991b1b" fontSize="22" fontWeight="900">11</text>
        </g>

        <path className="arrow-flow" d="M463 136 H505" stroke="#64748b" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow)" />
        <path className="arrow-flow" d="M560 166 V202" stroke="#64748b" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow)" />
        <path className="arrow-flow" d="M507 236 H465" stroke="#64748b" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow)" />
        <path className="arrow-flow" d="M410 206 V170" stroke="#64748b" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#64748b" />
          </marker>
        </defs>

        <rect x="64" y="198" width="240" height="64" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="84" y="225" fill="#0f172a" fontSize="14" fontWeight="900">Sequence</text>
        <text x="84" y="249" fill="#475569" fontSize="14" fontWeight="800">{"00 -> 01 -> 10 -> 11 -> 00"}</text>
      </svg>
    </div>
  );
}

export default function CountersPage() {
  return (
    <Layout title="Counters | Digital Electronics" description="Deep theory notes on asynchronous counters, synchronous counters, up/down counters, mod-N counters, ring counters, and Johnson counters." pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1200px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/digital-electronics" className="font-medium text-slate-600 transition hover:text-portal-700">Digital Electronics</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">Counters</span></li>
          </ol>
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Digital Electronics / Counters</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Counters</h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Learn how flip-flops are connected to count clock pulses, generate binary
            sequences, divide frequency, and create timing states for digital systems.
          </p>
        </section>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p>
              A counter is a sequential circuit that moves through a predefined sequence
              of states whenever clock pulses are applied. The most common counter
              sequence is binary counting.
            </p>
            <p>
              Counters are important because digital systems often need to count events,
              create delays, divide clock frequency, generate addresses, or step through
              control states.
            </p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Industry relevance: timers, frequency dividers, digital clocks, microcontrollers, communication systems, and event counters use counter circuits.</li>
              <li>Design relevance: counters convert clock pulses into useful timing and state information.</li>
              <li>Exam relevance: GATE and PSU questions often test mod number, flip-flop count, asynchronous delay, synchronous design, ring counters, and Johnson counters.</li>
              <li>Interview relevance: counters reveal whether you understand clocking, state transitions, and flip-flop behavior.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Sequential circuits and flip-flops</li>
              <li>D, T, and JK flip-flop behavior</li>
              <li>Clock edge and propagation delay</li>
              <li>Binary number systems</li>
              <li>State tables and timing diagrams</li>
              <li>Basic modulo arithmetic</li>
            </ul>
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p>
              A counter is like a digital odometer. Each clock pulse is like a tick that
              asks the circuit to move to the next stored number.
            </p>
            <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
              A counter does not count time directly; it counts clock edges. Time is
              measured only because clock edges occur at a known rate.
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="text-base font-bold text-slate-950">1. Counter State</h3>
            <p>
              If a counter has n flip-flops, it has n stored bits and can represent up
              to $$ 2^n $$ states. A 3-bit counter can represent 8 states from 000 to
              111.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. Asynchronous Counter</h3>
            <p>
              In an asynchronous counter, only the first flip-flop receives the external
              clock. Later flip-flops are triggered by previous flip-flop outputs. This
              creates ripple delay.
            </p>
            <h3 className="text-base font-bold text-slate-950">3. Synchronous Counter</h3>
            <p>
              In a synchronous counter, all flip-flops receive the clock at the same
              time. Combinational logic decides which flip-flops should toggle. This is
              faster and more predictable.
            </p>
            <h3 className="text-base font-bold text-slate-950">4. Mod-N Counter</h3>
            <p>
              A mod-N counter has N valid states before it repeats. A decade counter is
              a mod-10 counter because it counts 0 through 9 and then resets.
            </p>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="text-base font-bold text-slate-950">1. Number of States</h3>
            <p>{"With $$ n $$ flip-flops, each flip-flop stores one bit."}</p>
            <p>{"$$ \\text{Maximum states} = 2^n $$"}</p>
            <p>
              Physical meaning: each added flip-flop doubles the number of possible
              stored combinations.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. Flip-Flops Needed for Mod-N Counter</h3>
            <p>{"Choose smallest $$ n $$ such that:"}</p>
            <p>{"$$ 2^n \\ge N $$"}</p>
            <p>
              For mod-10, $$ 2^3=8 $$ is insufficient and $$ 2^4=16 $$ is enough, so 4
              flip-flops are required.
            </p>
            <h3 className="text-base font-bold text-slate-950">3. Frequency Division</h3>
            <p>
              A binary counter divides frequency because each flip-flop toggles at half
              the frequency of the previous stage.
            </p>
            <p>{"$$ f_{out}=\\frac{f_{clk}}{2^n} $$"}</p>
          </TopicSection>

          <TopicSection title="Working Principle">
            <ol className="grid gap-2">
              <li>Clock pulse arrives at the counter.</li>
              <li>Flip-flops sample their toggle or next-state inputs.</li>
              <li>The present state changes to the next count value.</li>
              <li>Output bits represent the current count.</li>
              <li>After the final valid state, reset or feedback logic returns the counter to the starting state.</li>
              <li>The sequence repeats for each new clock pulse.</li>
            </ol>
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <CounterAnimation />
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Asynchronous Ripple Counter Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Synchronous Counter Logic Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Counter Timing Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Ring Counter State Diagram Here</div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="grid gap-3 lg:grid-cols-2">
              <FormulaCard title="Maximum states" formula={"$$ 2^n $$"}>An n-bit counter can represent at most $$ 2^n $$ unique binary states.</FormulaCard>
              <FormulaCard title="Flip-flops required" formula={"$$ n=\\lceil \\log_2 N \\rceil $$"}>For a mod-N counter, choose enough flip-flops to cover N states.</FormulaCard>
              <FormulaCard title="Frequency division" formula={"$$ f_{out}=\\frac{f_{clk}}{2^n} $$"}>A complete n-bit binary counter divides clock frequency by $$ 2^n $$.</FormulaCard>
              <FormulaCard title="Mod counter sequence" formula={"$$ 0,1,2,...,N-1,0 $$"}>After N states, the counter returns to its starting state.</FormulaCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Digital clocks and timers</li>
              <li>Frequency dividers in communication systems</li>
              <li>Program counters in processors</li>
              <li>Event counters in embedded systems</li>
              <li>Memory address sequencing</li>
              <li>PWM and time-base generation</li>
              <li>Traffic-light and vending-machine controllers</li>
              <li>Ring counters in sequence generators</li>
            </ul>
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
            <p>{"How many states can a 3-bit counter represent?"}</p>
            <p>{"$$ 2^3=8 $$ states: 000 to 111."}</p>
            <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
            <p>{"How many flip-flops are required for a mod-12 counter?"}</p>
            <p>{"Need smallest n such that $$ 2^n \\ge 12 $$."}</p>
            <p>{"$$ 2^3=8 $$ insufficient, $$ 2^4=16 $$ sufficient. So 4 flip-flops are needed."}</p>
            <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
            <p>{"A 4-bit binary counter receives a 1 MHz clock. What is frequency after the 4th flip-flop?"}</p>
            <p>{"$$ f_{out}=\\frac{1\\,MHz}{2^4}=\\frac{1\\,MHz}{16}=62.5\\,kHz $$."}</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <ul className="grid gap-2">
              <li>Confusing number of flip-flops with number of states.</li>
              <li>Forgetting unused states in mod-N counters where N is not a power of 2.</li>
              <li>Ignoring ripple delay in asynchronous counters.</li>
              <li>Assuming all flip-flops trigger at the same time in ripple counters.</li>
              <li>Using $$ 2^n $$ states without checking reset logic.</li>
              <li>Mixing ring counter and Johnson counter sequences.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-950">
                  <th className="py-2 pr-3">Counter Type</th>
                  <th className="py-2 pr-3">Clocking</th>
                  <th className="py-2 pr-3">Speed</th>
                  <th className="py-2 pr-3">Main Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Asynchronous</td><td className="py-2 pr-3">Ripple clock</td><td className="py-2 pr-3">Slower</td><td className="py-2 pr-3">Simple low-speed counting</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Synchronous</td><td className="py-2 pr-3">Common clock</td><td className="py-2 pr-3">Faster</td><td className="py-2 pr-3">High-speed digital systems</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Ring</td><td className="py-2 pr-3">Shifted one-hot state</td><td className="py-2 pr-3">Predictable</td><td className="py-2 pr-3">Sequence generation</td></tr>
                <tr><td className="py-2 pr-3">Johnson</td><td className="py-2 pr-3">Twisted ring</td><td className="py-2 pr-3">Moderate</td><td className="py-2 pr-3">More states with fewer flip-flops</td></tr>
              </tbody>
            </table>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <ul className="grid gap-2">
              <li>What is a counter?</li>
              <li>What is the difference between asynchronous and synchronous counters?</li>
              <li>Why is ripple counter slower?</li>
              <li>How many flip-flops are needed for a mod-10 counter?</li>
              <li>How does a counter divide frequency?</li>
              <li>What is the difference between ring and Johnson counter?</li>
              <li>What are unused states in a mod-N counter?</li>
            </ul>
          </TopicSection>

          <TopicSection title="Exam-Oriented Notes">
            <ul className="grid gap-2">
              <li>For mod-N counters, use smallest n satisfying $$ 2^n \\ge N $$.</li>
              <li>Asynchronous counters have accumulated propagation delay.</li>
              <li>Synchronous counters are preferred for high-speed designs.</li>
              <li>A ring counter with n flip-flops has n states.</li>
              <li>A Johnson counter with n flip-flops has 2n states.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Revision Summary">
            <ul className="grid gap-2">
              <li>Counters are sequential circuits that count clock pulses.</li>
              <li>An n-bit binary counter has up to $$ 2^n $$ states.</li>
              <li>Asynchronous counters ripple; synchronous counters update together.</li>
              <li>Mod-N counters repeat after N states.</li>
              <li>{"Key formulas: $$ 2^n $$ states, $$ n=\\lceil\\log_2N\\rceil $$, $$ f_{out}=f_{clk}/2^n $$."}</li>
            </ul>
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
            <ul className="grid gap-2">
              <li>Explain why counters are sequential circuits.</li>
              <li>Why does ripple delay occur in asynchronous counters?</li>
              <li>Compare ring and Johnson counters.</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">Numerical</h3>
            <ul className="grid gap-2">
              <li>{"Find number of states for a 5-bit counter."}</li>
              <li>{"Find flip-flops required for a mod-20 counter."}</li>
              <li>{"A 3-bit counter receives 8 kHz clock. Find divided output frequency."}</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">MCQs</h3>
            <ul className="grid gap-2">
              <li>Which counter is faster: synchronous or asynchronous?</li>
              <li>How many states does a 4-bit binary counter have?</li>
              <li>How many states does a 4-bit Johnson counter have?</li>
            </ul>
          </TopicSection>

          <div className="flex justify-end">
            <Link href="/subjects/digital-electronics" className="inline-flex w-full justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto">
              Next Registers and Shift Registers
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
