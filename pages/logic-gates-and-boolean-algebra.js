import Link from "next/link";
import Layout from "../components/layout";

function TopicSection({ title, children }) {
  return (
    <section className="topic-section rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
        {children}
      </div>
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

function GateAnimation() {
  return (
    <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-4">
      <style jsx>{`
        .signal-a {
          animation: moveA 2.6s linear infinite;
        }
        .signal-b {
          animation: moveB 2.6s linear infinite;
          animation-delay: 0.25s;
        }
        .signal-out {
          animation: glowOut 2.6s ease-in-out infinite;
        }
        .gate-core {
          animation: gatePulse 2.6s ease-in-out infinite;
        }
        @keyframes moveA {
          0% { transform: translateX(0); opacity: 0; }
          15% { opacity: 1; }
          55% { transform: translateX(210px); opacity: 1; }
          100% { transform: translateX(210px); opacity: 0; }
        }
        @keyframes moveB {
          0% { transform: translateX(0); opacity: 0; }
          15% { opacity: 1; }
          55% { transform: translateX(210px); opacity: 1; }
          100% { transform: translateX(210px); opacity: 0; }
        }
        @keyframes glowOut {
          0%, 55% { opacity: 0.25; transform: translateX(0); }
          70% { opacity: 1; transform: translateX(42px); }
          100% { opacity: 0.25; transform: translateX(90px); }
        }
        @keyframes gatePulse {
          0%, 45% { filter: drop-shadow(0 0 0 rgba(37, 99, 235, 0)); }
          60%, 76% { filter: drop-shadow(0 0 14px rgba(37, 99, 235, 0.34)); }
          100% { filter: drop-shadow(0 0 0 rgba(37, 99, 235, 0)); }
        }
      `}</style>
      <svg viewBox="0 0 720 260" className="w-full" role="img" aria-label="Animated AND gate signal flow">
        <rect x="20" y="24" width="680" height="212" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
        <text x="42" y="58" fill="#0f172a" fontSize="18" fontWeight="900">Animated working: AND gate</text>
        <text x="42" y="82" fill="#64748b" fontSize="13" fontWeight="700">Output becomes HIGH only when both input signals arrive as HIGH.</text>

        <line x1="78" y1="118" x2="308" y2="118" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <line x1="78" y1="166" x2="308" y2="166" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <line x1="426" y1="142" x2="630" y2="142" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />

        <circle className="signal-a" cx="86" cy="118" r="10" fill="#2563eb" />
        <circle className="signal-b" cx="86" cy="166" r="10" fill="#16a34a" />
        <circle className="signal-out" cx="450" cy="142" r="11" fill="#dc2626" />

        <path className="gate-core" d="M310 96 L358 96 C404 96 430 116 430 142 C430 168 404 188 358 188 L310 188 Z" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" />
        <text x="344" y="149" fill="#1d4ed8" fontSize="22" fontWeight="900">AND</text>

        <text x="44" y="123" fill="#1e40af" fontSize="14" fontWeight="900">A = 1</text>
        <text x="44" y="171" fill="#166534" fontSize="14" fontWeight="900">B = 1</text>
        <text x="642" y="147" fill="#991b1b" fontSize="14" fontWeight="900">Y = 1</text>
        <text x="250" y="224" fill="#475569" fontSize="13" fontWeight="800">Function: $$ Y = A \\cdot B $$</text>
      </svg>
    </div>
  );
}

export default function LogicGatesAndBooleanAlgebraPage() {
  return (
    <Layout
      title="Logic Gates and Boolean Algebra | Digital Electronics"
      description="Professional Digital Electronics theory on logic gates, Boolean algebra, De Morgan's theorem, SOP, POS, and logic simplification for ECE exams."
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1200px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/digital-electronics" className="font-medium text-slate-600 transition hover:text-portal-700">Digital Electronics</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">Logic Gates and Boolean Algebra</span></li>
          </ol>
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Digital Electronics / Logic Gates and Boolean Algebra
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Logic Gates and Boolean Algebra
          </h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Understand how physical voltage levels become logical decisions, how gates
            implement those decisions, and how Boolean algebra reduces hardware without
            changing the required function.
          </p>
        </section>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p>
              Logic gates are the basic decision-making circuits of digital electronics.
              They take binary inputs, process them according to a logical rule, and
              produce a binary output.
            </p>
            <p>
              Boolean algebra is the mathematical language used to describe and simplify
              these logic operations. It lets an engineer convert a requirement such as
              "turn ON only when two conditions are true" into a circuit that can be
              built using gates.
            </p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Industry relevance: every processor, controller, memory chip, FPGA, and digital IC is built from logic gate networks.</li>
              <li>Design relevance: simplification reduces gate count, silicon area, power dissipation, and propagation delay.</li>
              <li>Exam relevance: GATE and PSU exams repeatedly test gate truth tables, universal gates, De Morgan's theorem, SOP, POS, and simplification.</li>
              <li>Interview relevance: interviewers expect you to explain both the Boolean expression and the actual circuit behavior.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Binary values 0 and 1</li>
              <li>HIGH and LOW voltage levels</li>
              <li>Basic number systems</li>
              <li>Truth table reading</li>
              <li>Simple algebraic manipulation</li>
              <li>Idea of switches connected in series and parallel</li>
            </ul>
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p>
              A logic gate can be imagined as a controlled decision box. Inputs are
              questions, and the output is the answer. An AND gate asks, "Are all
              required conditions true?" An OR gate asks, "Is at least one condition
              true?" A NOT gate reverses the answer.
            </p>
            <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
              Boolean algebra is not abstract decoration; it is a hardware-saving tool.
              A simpler expression usually means fewer transistors and faster operation.
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="text-base font-bold text-slate-950">1. Basic Logic Gates</h3>
            <p>
              AND, OR, and NOT gates form the conceptual foundation. AND produces 1 only
              when all inputs are 1. OR produces 1 when at least one input is 1. NOT
              produces the complement of the input.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. Universal Gates</h3>
            <p>
              NAND and NOR are called universal gates because any logic function can be
              implemented using only NAND gates or only NOR gates. In real IC design,
              NAND and NOR structures are efficient because they map naturally to CMOS
              transistor networks.
            </p>
            <h3 className="text-base font-bold text-slate-950">3. Exclusive Gates</h3>
            <p>
              XOR detects difference: the output is 1 when inputs are unequal. XNOR
              detects equality: the output is 1 when inputs are the same. These gates are
              central in adders, parity generators, error detection, and comparators.
            </p>
            <h3 className="text-base font-bold text-slate-950">4. Boolean Algebra</h3>
            <p>
              Boolean algebra uses variables that can take only two values: 0 or 1. The
              goal is to describe logic behavior compactly and then simplify it without
              changing the truth table.
            </p>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="text-base font-bold text-slate-950">1. AND Function</h3>
            <p>
              If output should become 1 only when both input conditions are 1, the
              physical idea is series permission: both paths must allow conduction.
            </p>
            <p>{"$$ Y = A \\cdot B $$"}</p>
            <p>
              Meaning: if either $$ A $$ or $$ B $$ is 0, the product becomes 0. Only
              $$ 1 \\cdot 1 = 1 $$ gives HIGH output.
            </p>

            <h3 className="text-base font-bold text-slate-950">2. OR Function</h3>
            <p>
              If output should become 1 when any one input is 1, the physical idea is
              parallel permission: any active path can drive the output.
            </p>
            <p>{"$$ Y = A + B $$"}</p>

            <h3 className="text-base font-bold text-slate-950">3. NOT Function</h3>
            <p>
              NOT creates the opposite logic state. If input is HIGH, output is LOW; if
              input is LOW, output is HIGH.
            </p>
            <p>{"$$ Y = A' $$"}</p>

            <h3 className="text-base font-bold text-slate-950">4. De Morgan's Theorem</h3>
            <p>
              De Morgan's theorem explains how inversion distributes across AND and OR.
              It is the bridge between NAND/NOR implementation and simplified logic.
            </p>
            <p>{"$$ (A + B)' = A'B' $$"}</p>
            <p>{"$$ (AB)' = A' + B' $$"}</p>
            <p>
              Physical meaning: the complement of "at least one is true" means "both
              are false"; the complement of "both are true" means "at least one is
              false."
            </p>
          </TopicSection>

          <TopicSection title="Working Principle">
            <ol className="grid gap-2">
              <li>Inputs enter as voltage levels interpreted as logic 0 or logic 1.</li>
              <li>The transistor network inside the gate creates a pull-up or pull-down path.</li>
              <li>The gate rule decides whether the output node should be HIGH or LOW.</li>
              <li>Boolean algebra describes the same behavior symbolically.</li>
              <li>Simplification removes unnecessary logic while preserving the truth table.</li>
              <li>The simplified expression is implemented using gates, often NAND or NOR in hardware.</li>
            </ol>
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <GateAnimation />
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
                Basic Gate Symbols Diagram Here
              </div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
                Truth Table Diagram Here
              </div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
                NAND Universal Gate Implementation Here
              </div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
                Boolean Simplification Signal Flow Diagram Here
              </div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="grid gap-3 lg:grid-cols-2">
              <FormulaCard title="AND gate" formula={"$$ Y = AB $$"}>
                Output is HIGH only when all inputs are HIGH. It represents simultaneous
                permission or series logic.
              </FormulaCard>
              <FormulaCard title="OR gate" formula={"$$ Y = A + B $$"}>
                Output is HIGH when any input is HIGH. It represents alternative
                permission or parallel logic.
              </FormulaCard>
              <FormulaCard title="NOT gate" formula={"$$ Y = A' $$"}>
                Output is the complement of input. It is used when the circuit needs the
                opposite condition.
              </FormulaCard>
              <FormulaCard title="XOR gate" formula={"$$ Y = A \\oplus B = A'B + AB' $$"}>
                Output is HIGH when inputs are different. It is widely used in adders
                and parity circuits.
              </FormulaCard>
              <FormulaCard title="De Morgan's first theorem" formula={"$$ (A + B)' = A'B' $$"}>
                The complement of OR becomes AND of complements. This is essential for
                NOR-based realization.
              </FormulaCard>
              <FormulaCard title="De Morgan's second theorem" formula={"$$ (AB)' = A' + B' $$"}>
                The complement of AND becomes OR of complements. This is essential for
                NAND-based realization.
              </FormulaCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Arithmetic logic units inside processors</li>
              <li>Control logic in microcontrollers and embedded systems</li>
              <li>Memory address decoding and chip selection</li>
              <li>Comparators, parity circuits, and error detection</li>
              <li>Digital communication framing and checking</li>
              <li>FPGA and ASIC combinational logic blocks</li>
              <li>Industrial interlocks and safety logic</li>
              <li>Display drivers, counters, and timing controllers</li>
            </ul>
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
            <p>{"Find output of $$ Y = AB $$ for $$ A = 1, B = 0 $$."}</p>
            <p>{"$$ Y = 1 \\cdot 0 = 0 $$"}</p>
            <p>Since one input is LOW, AND output is LOW.</p>

            <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
            <p>{"Simplify $$ Y = A + AB $$."}</p>
            <p>{"Factor $$ A $$: $$ Y = A(1 + B) $$."}</p>
            <p>{"Since $$ 1 + B = 1 $$, $$ Y = A $$."}</p>
            <p>Interpretation: if A is already true, adding condition AB does not change the output.</p>

            <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
            <p>{"Realize $$ Y = A + B $$ using only NAND gates."}</p>
            <p>{"From De Morgan: $$ A + B = (A'B')' $$."}</p>
            <p>{"Use NAND as inverter: $$ A' = A \\text{ NAND } A $$ and $$ B' = B \\text{ NAND } B $$."}</p>
            <p>{"Then NAND those complements: $$ Y = A' \\text{ NAND } B' $$."}</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <ul className="grid gap-2">
              <li>Confusing Boolean addition with decimal addition. In Boolean algebra, $$ 1 + 1 = 1 $$.</li>
              <li>Forgetting that NAND and NOR include inversion at the output.</li>
              <li>Applying De Morgan's theorem without complementing every variable.</li>
              <li>Mixing SOP and POS forms during simplification.</li>
              <li>Assuming XOR is the same as OR. XOR becomes 0 when both inputs are 1.</li>
              <li>Ignoring propagation delay when many gates are cascaded.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-950">
                  <th className="py-2 pr-3">Gate</th>
                  <th className="py-2 pr-3">Expression</th>
                  <th className="py-2 pr-3">Output HIGH When</th>
                  <th className="py-2 pr-3">Main Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">AND</td><td className="py-2 pr-3">$$ AB $$</td><td className="py-2 pr-3">All inputs are HIGH</td><td className="py-2 pr-3">Enable logic</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">OR</td><td className="py-2 pr-3">$$ A+B $$</td><td className="py-2 pr-3">Any input is HIGH</td><td className="py-2 pr-3">Alternative conditions</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">NOT</td><td className="py-2 pr-3">$$ A' $$</td><td className="py-2 pr-3">Input is LOW</td><td className="py-2 pr-3">Inversion</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">XOR</td><td className="py-2 pr-3">$$ A'B+AB' $$</td><td className="py-2 pr-3">Inputs differ</td><td className="py-2 pr-3">Adder sum, parity</td></tr>
                <tr><td className="py-2 pr-3">XNOR</td><td className="py-2 pr-3">$$ AB+A'B' $$</td><td className="py-2 pr-3">Inputs are same</td><td className="py-2 pr-3">Equality detection</td></tr>
              </tbody>
            </table>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <ul className="grid gap-2">
              <li>Why are NAND and NOR called universal gates?</li>
              <li>Explain De Morgan's theorem with a physical interpretation.</li>
              <li>What is the difference between OR and XOR?</li>
              <li>Why does simplification reduce propagation delay?</li>
              <li>How can an inverter be made using NAND?</li>
              <li>What is the difference between SOP and POS?</li>
              <li>Why are Boolean variables limited to 0 and 1?</li>
            </ul>
          </TopicSection>

          <TopicSection title="Exam-Oriented Notes">
            <ul className="grid gap-2">
              <li>Remember Boolean identities: $$ A + A = A $$, $$ A \\cdot A = A $$, $$ A + 1 = 1 $$, $$ A \\cdot 0 = 0 $$.</li>
              <li>For universal-gate questions, first convert OR and AND using De Morgan's theorem.</li>
              <li>XOR is HIGH for odd number of HIGH inputs in multi-input parity logic.</li>
              <li>SOP corresponds to OR of product terms; POS corresponds to AND of sum terms.</li>
              <li>Truth tables are the safest way to verify a simplification.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Revision Summary">
            <ul className="grid gap-2">
              <li>Logic gates convert binary input conditions into binary output decisions.</li>
              <li>Boolean algebra describes gate behavior and helps reduce hardware.</li>
              <li>NAND and NOR are universal gates.</li>
              <li>De Morgan's theorem is the key tool for moving inversion across AND and OR.</li>
              <li>XOR detects difference; XNOR detects equality.</li>
              <li>{"Important relations: $$ (A+B)'=A'B' $$ and $$ (AB)'=A'+B' $$."}</li>
            </ul>
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
            <ul className="grid gap-2">
              <li>Explain AND, OR, and NOT gates using switch analogy.</li>
              <li>Why is NAND preferred in many digital implementations?</li>
              <li>Explain how Boolean simplification saves hardware.</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">Numerical</h3>
            <ul className="grid gap-2">
              <li>{"Simplify $$ Y = AB + AB' $$."}</li>
              <li>{"Realize $$ Y = A' + B $$ using NAND gates only."}</li>
              <li>{"Make a truth table for $$ Y = A \\oplus B $$."}</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">MCQs</h3>
            <ul className="grid gap-2">
              <li>Which gate is universal: AND, OR, NAND, or XOR?</li>
              <li>For XOR, what is the output when both inputs are 1?</li>
              <li>Which theorem converts $$ (A+B)' $$ into $$ A'B' $$?</li>
            </ul>
          </TopicSection>

          <div className="flex justify-end">
            <Link
              href="/karnaugh-map"
              className="inline-flex w-full justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto"
            >
              Next Karnaugh Map (K-Map)
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
