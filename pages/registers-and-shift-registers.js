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

function ShiftRegisterAnimation() {
  return (
    <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-4">
      <style jsx>{`
        .serial-bit { animation: serialBit 4.2s linear infinite; }
        .clk-flash { animation: clkFlash 4.2s ease-in-out infinite; }
        .stage-one { animation: stageOne 4.2s ease-in-out infinite; }
        .stage-two { animation: stageTwo 4.2s ease-in-out infinite; }
        .stage-three { animation: stageThree 4.2s ease-in-out infinite; }
        .stage-four { animation: stageFour 4.2s ease-in-out infinite; }
        @keyframes serialBit {
          0% { opacity: 0; transform: translateX(0); }
          12%, 28% { opacity: 1; }
          38%, 100% { opacity: 0; transform: translateX(158px); }
        }
        @keyframes clkFlash {
          0%, 18%, 38%, 58%, 78%, 100% { opacity: .28; stroke-width: 4; }
          28%, 48%, 68%, 88% { opacity: 1; stroke-width: 8; }
        }
        @keyframes stageOne { 0%, 20% { opacity: .25; } 28%, 100% { opacity: 1; } }
        @keyframes stageTwo { 0%, 40% { opacity: .25; } 48%, 100% { opacity: 1; } }
        @keyframes stageThree { 0%, 60% { opacity: .25; } 68%, 100% { opacity: 1; } }
        @keyframes stageFour { 0%, 80% { opacity: .25; } 88%, 100% { opacity: 1; } }
      `}</style>
      <svg viewBox="0 0 800 340" className="w-full" role="img" aria-label="Animated serial-in serial-out shift register">
        <rect x="20" y="22" width="760" height="286" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
        <text x="44" y="58" fill="#0f172a" fontSize="18" fontWeight="900">Animated working: 4-bit shift register</text>
        <text x="44" y="82" fill="#64748b" fontSize="13" fontWeight="700">At every clock pulse, each flip-flop passes its stored bit to the next stage.</text>

        <line x1="70" y1="144" x2="190" y2="144" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <circle className="serial-bit" cx="82" cy="144" r="10" fill="#2563eb" />
        <text x="46" y="149" fill="#1e40af" fontSize="14" fontWeight="900">Serial In</text>

        {[0, 1, 2, 3].map((index) => (
          <g key={index}>
            <rect
              x={190 + index * 125}
              y="112"
              width="86"
              height="68"
              rx="16"
              fill="#eff6ff"
              stroke="#2563eb"
              strokeWidth="3"
            />
            <text x={233 + index * 125} y="139" textAnchor="middle" fill="#1d4ed8" fontSize="13" fontWeight="900">D FF</text>
            <circle className={`stage-${["one", "two", "three", "four"][index]}`} cx={233 + index * 125} cy="160" r="11" fill={index % 2 === 0 ? "#16a34a" : "#f59e0b"} />
            {index < 3 ? (
              <line x1={276 + index * 125} y1="144" x2={315 + index * 125} y2="144" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            ) : null}
          </g>
        ))}

        <line x1="690" y1="144" x2="742" y2="144" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <text x="650" y="202" fill="#991b1b" fontSize="14" fontWeight="900">Serial Out</text>

        <path className="clk-flash" d="M120 252 H158 V224 H202 V252 H246 V224 H290 V252 H334 V224 H378 V252" fill="none" stroke="#16a34a" strokeLinecap="round" strokeLinejoin="round" />
        <text x="120" y="282" fill="#166534" fontSize="14" fontWeight="900">clock shifts data one stage per pulse</text>
      </svg>
    </div>
  );
}

export default function RegistersAndShiftRegistersPage() {
  return (
    <Layout title="Registers and Shift Registers GATE ECE Quick Notes + Formulas + PYQs | Digital Electronics" description="Deep theory notes on registers, shift registers, SISO, SIPO, PISO, PIPO, serial/parallel conversion, and digital storage." pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1440px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Notes</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/digital-electronics" className="font-medium text-slate-600 transition hover:text-portal-700">Digital Electronics</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">Registers and Shift Registers</span></li>
          </ol>
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Digital Electronics / Registers and Shift Registers</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Registers and Shift Registers</h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Learn how groups of flip-flops store binary words, move data bit-by-bit, and
            convert information between serial and parallel formats in real digital systems.
          </p>
        </section>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p>
              A register is a group of flip-flops used to store a binary word. If one
              flip-flop stores one bit, then a 4-bit register uses four flip-flops to
              store four bits simultaneously.
            </p>
            <p>
              A shift register is a register that can move stored data from one flip-flop
              to the next on each clock pulse. This makes it useful for serial data
              transfer, delay, conversion, and sequence generation.
            </p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Industry relevance: CPUs, microcontrollers, communication interfaces, display drivers, sensors, and memory buffers all use registers.</li>
              <li>System relevance: registers hold operands, addresses, status flags, instructions, and temporary data during processing.</li>
              <li>Exam relevance: GATE and PSU questions often test SISO, SIPO, PISO, PIPO, serial/parallel conversion, and shift timing.</li>
              <li>Interview relevance: shift registers reveal whether you understand clocked data movement, not just storage.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>D flip-flop operation</li>
              <li>Clock edge and timing diagrams</li>
              <li>Sequential circuits</li>
              <li>Binary words and bit positions</li>
              <li>Serial and parallel data concepts</li>
              <li>Setup time and propagation delay basics</li>
            </ul>
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p>
              A register is like a row of small memory boxes. Each box stores one bit.
              A shift register is like a conveyor belt: every clock pulse moves each bit
              one position forward.
            </p>
            <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
              Registers store a word. Shift registers move a word.
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="text-base font-bold text-slate-950">1. Register as Parallel Storage</h3>
            <p>
              In a basic register, all flip-flops share the same clock. On the clock
              edge, every flip-flop samples its input and stores one bit. Together, they
              store a complete binary word.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. Shift Register as Data Movement</h3>
            <p>
              In a shift register, the output of one flip-flop is connected to the input
              of the next. Each clock pulse shifts the stored pattern by one position.
            </p>
            <h3 className="text-base font-bold text-slate-950">3. Serial and Parallel Transfer</h3>
            <p>
              Serial transfer sends one bit at a time through one line. Parallel transfer
              sends many bits at the same time through multiple lines. Shift registers
              connect these two worlds.
            </p>
            <h3 className="text-base font-bold text-slate-950">4. Shift Register Types</h3>
            <p>
              SISO accepts serial input and gives serial output. SIPO accepts serial
              input and gives parallel output. PISO accepts parallel input and gives
              serial output. PIPO accepts and gives data in parallel form.
            </p>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="text-base font-bold text-slate-950">1. Storage Capacity</h3>
            <p>{"If a register has $$ n $$ flip-flops, it stores $$ n $$ bits."}</p>
            <p>{"$$ \\text{Register capacity} = n\\text{-bit word} $$"}</p>
            <p>
              Physical meaning: each flip-flop stores one binary voltage state, so the
              register width equals the number of flip-flops.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. Number of States</h3>
            <p>{"An n-bit register can hold $$ 2^n $$ different binary patterns."}</p>
            <p>{"$$ \\text{Possible stored words} = 2^n $$"}</p>
            <h3 className="text-base font-bold text-slate-950">3. Shift Time</h3>
            <p>
              In a serial shift register, one bit moves one stage per clock pulse.
              Therefore, loading or unloading n bits serially needs n clock pulses.
            </p>
            <p>{"$$ T_{shift}=nT_{clk} $$"}</p>
          </TopicSection>

          <TopicSection title="Working Principle">
            <ol className="grid gap-2">
              <li>Input data is applied to the register or first shift stage.</li>
              <li>The clock edge arrives.</li>
              <li>Each flip-flop samples its input at that clock edge.</li>
              <li>In a shift register, each stage passes its previous bit to the next stage.</li>
              <li>After several clock pulses, the data pattern appears at later stages or output pins.</li>
              <li>Depending on the mode, data is read serially, parallelly, or both.</li>
            </ol>
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <ShiftRegisterAnimation />
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">4-Bit Register Circuit Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">SISO Shift Register Timing Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">SIPO Serial-to-Parallel Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">PISO Parallel-to-Serial Diagram Here</div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="grid gap-3 lg:grid-cols-2">
              <FormulaCard title="Register width" formula={"$$ \\text{bits stored}=n $$"}>An n-flip-flop register stores an n-bit binary word.</FormulaCard>
              <FormulaCard title="Possible words" formula={"$$ 2^n $$"}>An n-bit register can store $$ 2^n $$ different binary combinations.</FormulaCard>
              <FormulaCard title="Serial shift time" formula={"$$ T_{shift}=nT_{clk} $$"}>To shift n bits serially, n clock periods are required.</FormulaCard>
              <FormulaCard title="Shift frequency relation" formula={"$$ f_{clk}=\\frac{1}{T_{clk}} $$"}>Higher clock frequency shifts bits faster, but timing limits must still be satisfied.</FormulaCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>CPU registers and instruction registers</li>
              <li>Serial communication interfaces</li>
              <li>Parallel-to-serial conversion in transmitters</li>
              <li>Serial-to-parallel conversion in receivers</li>
              <li>LED display drivers and scanning circuits</li>
              <li>Temporary buffers in digital systems</li>
              <li>Delay lines and sequence generators</li>
              <li>Data alignment in communication hardware</li>
            </ul>
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
            <p>{"How many flip-flops are required for an 8-bit register?"}</p>
            <p>An 8-bit register stores 8 bits, so it requires 8 flip-flops.</p>
            <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
            <p>{"How many different words can a 5-bit register store?"}</p>
            <p>{"$$ 2^5=32 $$ different binary words."}</p>
            <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
            <p>{"A 6-bit SISO shift register uses a 2 MHz clock. How long does it take to shift all 6 bits?"}</p>
            <p>{"$$ T_{clk}=1/f=1/(2\\,MHz)=0.5\\,\\mu s $$"}</p>
            <p>{"$$ T_{shift}=6T_{clk}=6\\times0.5=3\\,\\mu s $$"}</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <ul className="grid gap-2">
              <li>Confusing a register with memory array; a register stores a small word close to logic.</li>
              <li>Thinking shift register shifts all bits instantly instead of one stage per clock pulse.</li>
              <li>Mixing SISO, SIPO, PISO, and PIPO names.</li>
              <li>Forgetting that all stages update together at the clock edge.</li>
              <li>Ignoring serial loading time in timing questions.</li>
              <li>Assuming shift direction without checking left-shift or right-shift connections.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-950">
                  <th className="py-2 pr-3">Type</th>
                  <th className="py-2 pr-3">Input</th>
                  <th className="py-2 pr-3">Output</th>
                  <th className="py-2 pr-3">Main Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">SISO</td><td className="py-2 pr-3">Serial</td><td className="py-2 pr-3">Serial</td><td className="py-2 pr-3">Delay line</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">SIPO</td><td className="py-2 pr-3">Serial</td><td className="py-2 pr-3">Parallel</td><td className="py-2 pr-3">Serial receiver</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">PISO</td><td className="py-2 pr-3">Parallel</td><td className="py-2 pr-3">Serial</td><td className="py-2 pr-3">Serial transmitter</td></tr>
                <tr><td className="py-2 pr-3">PIPO</td><td className="py-2 pr-3">Parallel</td><td className="py-2 pr-3">Parallel</td><td className="py-2 pr-3">Temporary word storage</td></tr>
              </tbody>
            </table>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <ul className="grid gap-2">
              <li>What is a register?</li>
              <li>Why is one flip-flop required per stored bit?</li>
              <li>What is the difference between register and shift register?</li>
              <li>Explain SISO, SIPO, PISO, and PIPO.</li>
              <li>How does a shift register perform serial-to-parallel conversion?</li>
              <li>Why do all flip-flops in a register share the same clock?</li>
              <li>Where are registers used inside a CPU?</li>
            </ul>
          </TopicSection>

          <TopicSection title="Exam-Oriented Quick Notes">
            <ul className="grid gap-2">
              <li>An n-bit register needs n flip-flops.</li>
              <li>SISO and PISO produce serial output.</li>
              <li>SIPO and PIPO produce parallel output.</li>
              <li>Serial loading/unloading of n bits takes n clock pulses.</li>
              <li>Shift registers are often tested through timing diagrams.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Revision Summary">
            <ul className="grid gap-2">
              <li>Registers store binary words.</li>
              <li>Shift registers move stored data one stage per clock pulse.</li>
              <li>SISO, SIPO, PISO, and PIPO describe input/output data format.</li>
              <li>Registers are built using flip-flops with a common clock.</li>
              <li>{"Key relations: $$ n $$ flip-flops store $$ n $$ bits, possible words $$ =2^n $$, serial shift time $$ =nT_{clk} $$."}</li>
            </ul>
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
            <ul className="grid gap-2">
              <li>Explain how a shift register moves data.</li>
              <li>Differentiate SIPO and PISO with applications.</li>
              <li>Why are registers important in processors?</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">Numerical</h3>
            <ul className="grid gap-2">
              <li>{"How many flip-flops are needed for a 12-bit register?"}</li>
              <li>{"How many binary words can a 6-bit register store?"}</li>
              <li>{"A 10-bit serial shift register has 1 MHz clock. Find full shift time."}</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">MCQs</h3>
            <ul className="grid gap-2">
              <li>Which shift register converts serial input to parallel output?</li>
              <li>How many flip-flops are needed for a 4-bit register?</li>
              <li>Which register type accepts parallel input and gives serial output?</li>
            </ul>
          </TopicSection>

          <div className="flex justify-end">
            <Link href="/logic-families" className="inline-flex w-full justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto">
              Next Logic Families
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
