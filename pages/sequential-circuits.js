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

function SequentialAnimation() {
  return (
    <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-4">
      <style jsx>{`
        .data-bit { animation: dataMove 3.4s linear infinite; }
        .clock-edge { animation: clockFlash 3.4s ease-in-out infinite; }
        .stored-bit { animation: storePulse 3.4s ease-in-out infinite; }
        .q-bit { animation: qMove 3.4s ease-in-out infinite; }
        .ff-core { animation: ffGlow 3.4s ease-in-out infinite; }
        @keyframes dataMove {
          0% { opacity: 0; transform: translateX(0); }
          18%, 48% { opacity: 1; }
          56%, 100% { opacity: 0; transform: translateX(250px); }
        }
        @keyframes clockFlash {
          0%, 38% { opacity: .25; stroke-width: 4; }
          48%, 62% { opacity: 1; stroke-width: 8; }
          78%, 100% { opacity: .25; stroke-width: 4; }
        }
        @keyframes storePulse {
          0%, 50% { opacity: .25; transform: scale(.92); }
          62%, 88% { opacity: 1; transform: scale(1); }
          100% { opacity: .35; transform: scale(.96); }
        }
        @keyframes qMove {
          0%, 62% { opacity: .18; transform: translateX(0); }
          74%, 92% { opacity: 1; transform: translateX(84px); }
          100% { opacity: .2; transform: translateX(132px); }
        }
        @keyframes ffGlow {
          0%, 42% { filter: drop-shadow(0 0 0 rgba(37,99,235,0)); }
          54%, 82% { filter: drop-shadow(0 0 16px rgba(37,99,235,.36)); }
          100% { filter: drop-shadow(0 0 0 rgba(37,99,235,0)); }
        }
      `}</style>
      <svg viewBox="0 0 780 330" className="w-full" role="img" aria-label="Animated D flip-flop storage">
        <rect x="20" y="22" width="740" height="282" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
        <text x="44" y="58" fill="#0f172a" fontSize="18" fontWeight="900">Animated working: D flip-flop stores a bit on clock edge</text>
        <text x="44" y="82" fill="#64748b" fontSize="13" fontWeight="700">Unlike combinational logic, output depends on present input plus stored state.</text>

        <line x1="84" y1="132" x2="326" y2="132" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <circle className="data-bit" cx="94" cy="132" r="10" fill="#2563eb" />
        <text x="48" y="137" fill="#1e40af" fontSize="14" fontWeight="900">D</text>

        <path className="clock-edge" d="M112 238 H156 V204 H204 V238 H256" fill="none" stroke="#16a34a" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="256" y1="220" x2="326" y2="188" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <text x="48" y="236" fill="#166534" fontSize="14" fontWeight="900">CLK</text>

        <rect className="ff-core" x="326" y="104" width="180" height="118" rx="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" />
        <text x="367" y="145" fill="#1d4ed8" fontSize="22" fontWeight="900">D FF</text>
        <text x="350" y="176" fill="#1d4ed8" fontSize="13" fontWeight="800">samples D at clock edge</text>
        <circle className="stored-bit" cx="416" cy="200" r="13" fill="#f59e0b" />

        <line x1="506" y1="152" x2="682" y2="152" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <circle className="q-bit" cx="526" cy="152" r="10" fill="#dc2626" />
        <text x="696" y="157" fill="#991b1b" fontSize="14" fontWeight="900">Q</text>

        <rect x="112" y="266" width="560" height="28" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="134" y="285" fill="#475569" fontSize="13" fontWeight="900">Function: next state follows D only at the active clock edge.</text>
      </svg>
    </div>
  );
}

export default function SequentialCircuitsPage() {
  return (
    <Layout title="Sequential Circuits GATE ECE Notes + Flip-Flop Formulas + PYQs" description="Deep theory notes on latches, flip-flops, truth tables, excitation tables, characteristic equations, timing, and clocked storage." pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1440px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/digital-electronics" className="font-medium text-slate-600 transition hover:text-portal-700">Digital Electronics</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">Sequential Circuits</span></li>
          </ol>
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Digital Electronics / Sequential Circuits</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Sequential Circuits</h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Learn how digital circuits remember information, how latches and flip-flops
            store bits, and why clock timing turns logic into counters, registers, and
            finite-state machines.
          </p>
        </section>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p>
              A sequential circuit is a digital circuit whose output depends on present
              inputs and past history. This history is stored in memory elements such as
              latches and flip-flops.
            </p>
            <p>
              Sequential logic is important because real digital systems must remember
              counts, states, instructions, addresses, flags, and previous decisions.
            </p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Industry relevance: processors, registers, counters, memory controllers, communication interfaces, and FSMs are built from sequential logic.</li>
              <li>Timing relevance: setup time, hold time, clock edge, and propagation delay decide whether digital hardware works reliably.</li>
              <li>Exam relevance: GATE and PSU questions often test flip-flop truth tables, excitation tables, characteristic equations, and state transitions.</li>
              <li>Interview relevance: candidates are expected to explain why memory is needed and how clocked storage prevents uncontrolled changes.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Logic gates and Boolean algebra</li>
              <li>Combinational circuits</li>
              <li>Basic feedback idea</li>
              <li>Clock signal and timing diagram basics</li>
              <li>Truth table interpretation</li>
              <li>Binary states 0 and 1</li>
            </ul>
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p>
              A combinational circuit is like a calculator with no memory. A sequential
              circuit is like a notebook: it can remember what happened earlier and use
              that stored information for the next output.
            </p>
            <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
              Sequential logic answers: "What should the output be now, considering what
              the circuit remembered before?"
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="text-base font-bold text-slate-950">1. Memory Through Feedback</h3>
            <p>
              Sequential circuits store data by feeding output information back into the
              circuit. This feedback creates stable states, so a bit can remain stored
              even after the input changes.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. Latches</h3>
            <p>
              A latch is level-sensitive. It can respond while an enable signal is
              active. SR and D latches are basic storage elements, but uncontrolled level
              sensitivity can cause timing problems.
            </p>
            <h3 className="text-base font-bold text-slate-950">3. Flip-Flops</h3>
            <p>
              A flip-flop is edge-triggered. It samples input only at a clock edge. This
              makes system behavior predictable because many storage elements update
              together at controlled instants.
            </p>
            <h3 className="text-base font-bold text-slate-950">4. State</h3>
            <p>
              The stored value is called the present state. After the next clock edge,
              the circuit moves to a next state based on inputs and current state.
            </p>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="text-base font-bold text-slate-950">1. D Flip-Flop</h3>
            <p>
              A D flip-flop copies input D to output Q only at the active clock edge.
            </p>
            <p>{"$$ Q_{n+1} = D $$"}</p>
            <p>
              Physical meaning: the next stored bit equals the data bit sampled at the
              clock edge.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. T Flip-Flop</h3>
            <p>
              A T flip-flop holds when T is 0 and toggles when T is 1.
            </p>
            <p>{"$$ Q_{n+1} = T \\oplus Q_n $$"}</p>
            <p>
              Physical meaning: T controls whether the stored bit should remain same or
              change to its complement.
            </p>
            <h3 className="text-base font-bold text-slate-950">3. JK Flip-Flop</h3>
            <p>
              JK flip-flop improves SR behavior by allowing the 11 input condition to
              toggle instead of becoming invalid.
            </p>
            <p>{"$$ Q_{n+1}=JQ_n' + K'Q_n $$"}</p>
          </TopicSection>

          <TopicSection title="Working Principle">
            <ol className="grid gap-2">
              <li>Inputs and present state are applied to the sequential circuit.</li>
              <li>Combinational logic decides the next-state value.</li>
              <li>The clock edge arrives.</li>
              <li>Flip-flops sample and store the next-state value.</li>
              <li>The stored value becomes the new present state.</li>
              <li>Outputs are generated from present state, inputs, or both depending on circuit type.</li>
            </ol>
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <SequentialAnimation />
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">SR Latch Circuit Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">D Flip-Flop Timing Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">JK Flip-Flop State Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Sequential Circuit Block Diagram Here</div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="grid gap-3 lg:grid-cols-2">
              <FormulaCard title="D flip-flop" formula={"$$ Q_{n+1}=D $$"}>The next stored bit is simply the input sampled at the active clock edge.</FormulaCard>
              <FormulaCard title="T flip-flop" formula={"$$ Q_{n+1}=T\\oplus Q_n $$"}>If T is 0, output holds. If T is 1, output toggles.</FormulaCard>
              <FormulaCard title="JK flip-flop" formula={"$$ Q_{n+1}=JQ_n' + K'Q_n $$"}>J sets, K resets, and J=K=1 toggles the state.</FormulaCard>
              <FormulaCard title="Setup condition" formula={"$$ t_{clk} \\ge t_{pd}+t_{setup}+t_{skew} $$"}>Clock period must be long enough for data to travel and settle before sampling.</FormulaCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Registers inside processors</li>
              <li>Counters and timers</li>
              <li>Finite-state machines in controllers</li>
              <li>Memory elements and data buffers</li>
              <li>Serial communication shift logic</li>
              <li>Clocked control units in digital ICs</li>
              <li>Debouncing and synchronization circuits</li>
              <li>Pipeline registers in high-speed CPUs</li>
            </ul>
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
            <p>{"A D flip-flop has $$ D=1 $$ at the active clock edge. Find next state."}</p>
            <p>{"Using $$ Q_{n+1}=D $$, next state is $$ 1 $$."}</p>
            <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
            <p>{"A T flip-flop has $$ Q_n=0 $$ and $$ T=1 $$. Find $$ Q_{n+1} $$."}</p>
            <p>{"$$ Q_{n+1}=T\\oplus Q_n=1\\oplus0=1 $$."}</p>
            <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
            <p>{"For a JK flip-flop with $$ J=1, K=1, Q_n=1 $$, find next state."}</p>
            <p>{"When J=K=1, JK flip-flop toggles, so $$ Q_{n+1}=0 $$."}</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <ul className="grid gap-2">
              <li>Confusing latch level sensitivity with flip-flop edge triggering.</li>
              <li>Forgetting that sequential output depends on previous state.</li>
              <li>Using D flip-flop equation for JK or T flip-flop questions.</li>
              <li>Ignoring setup and hold time in timing problems.</li>
              <li>Thinking clock changes data; clock only controls when data is sampled.</li>
              <li>Missing the invalid condition in basic SR latch analysis.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-950">
                  <th className="py-2 pr-3">Element</th>
                  <th className="py-2 pr-3">Control</th>
                  <th className="py-2 pr-3">Key Behavior</th>
                  <th className="py-2 pr-3">Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Latch</td><td className="py-2 pr-3">Level</td><td className="py-2 pr-3">Transparent when enabled</td><td className="py-2 pr-3">Basic storage</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">D FF</td><td className="py-2 pr-3">Clock edge</td><td className="py-2 pr-3">Stores D</td><td className="py-2 pr-3">Registers</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">T FF</td><td className="py-2 pr-3">Clock edge</td><td className="py-2 pr-3">Toggles when T=1</td><td className="py-2 pr-3">Counters</td></tr>
                <tr><td className="py-2 pr-3">JK FF</td><td className="py-2 pr-3">Clock edge</td><td className="py-2 pr-3">Set, reset, hold, toggle</td><td className="py-2 pr-3">General sequential logic</td></tr>
              </tbody>
            </table>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <ul className="grid gap-2">
              <li>What is the main difference between combinational and sequential circuits?</li>
              <li>Why does a flip-flop need a clock?</li>
              <li>What is setup time and hold time?</li>
              <li>Why is SR latch invalid for S=R=1?</li>
              <li>How does JK flip-flop remove the invalid condition?</li>
              <li>Why are D flip-flops widely used in registers?</li>
              <li>What does present state and next state mean?</li>
            </ul>
          </TopicSection>

          <TopicSection title="Exam-Oriented Notes">
            <ul className="grid gap-2">
              <li>D flip-flop is easiest: next state equals D.</li>
              <li>T flip-flop toggles only when T=1.</li>
              <li>JK flip-flop toggles when J=K=1.</li>
              <li>Always identify whether the circuit is latch-based or flip-flop-based.</li>
              <li>For state tables, write present state, input, next state, and output separately.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Revision Summary">
            <ul className="grid gap-2">
              <li>Sequential circuits have memory.</li>
              <li>Output depends on present input and past state.</li>
              <li>Latches are level-sensitive; flip-flops are edge-triggered.</li>
              <li>D flip-flop stores data; T flip-flop toggles; JK can set, reset, hold, or toggle.</li>
              <li>{"Important equations: $$ Q_{n+1}=D $$, $$ Q_{n+1}=T\\oplus Q_n $$, $$ Q_{n+1}=JQ_n'+K'Q_n $$."}</li>
            </ul>
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
            <ul className="grid gap-2">
              <li>Explain why sequential circuits require memory.</li>
              <li>Differentiate latch and flip-flop with timing behavior.</li>
              <li>Why is clock synchronization important?</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">Numerical</h3>
            <ul className="grid gap-2">
              <li>{"Find $$ Q_{n+1} $$ for D=0."}</li>
              <li>{"Find $$ Q_{n+1} $$ for T=1 and $$ Q_n=1 $$."}</li>
              <li>{"Find JK next state for J=0, K=1, $$ Q_n=1 $$."}</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">MCQs</h3>
            <ul className="grid gap-2">
              <li>Which device is edge-triggered: latch or flip-flop?</li>
              <li>Which flip-flop is commonly used in registers?</li>
              <li>Which flip-flop toggles when input T is 1?</li>
            </ul>
          </TopicSection>

          <div className="flex justify-end">
            <Link href="/counters" className="inline-flex w-full justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto">
              Next Counters
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
