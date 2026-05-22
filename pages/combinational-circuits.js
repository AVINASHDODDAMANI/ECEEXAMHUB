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

function CombinationalAnimation() {
  return (
    <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-4">
      <style jsx>{`
        .bit-a { animation: bitA 3.2s linear infinite; }
        .bit-b { animation: bitB 3.2s linear infinite; animation-delay: .25s; }
        .sum-bit { animation: sumBit 3.2s ease-in-out infinite; }
        .carry-bit { animation: carryBit 3.2s ease-in-out infinite; }
        .logic-core { animation: corePulse 3.2s ease-in-out infinite; }
        @keyframes bitA {
          0% { transform: translateX(0); opacity: 0; }
          15%, 58% { opacity: 1; }
          60%, 100% { transform: translateX(240px); opacity: 0; }
        }
        @keyframes bitB {
          0% { transform: translateX(0); opacity: 0; }
          15%, 58% { opacity: 1; }
          60%, 100% { transform: translateX(240px); opacity: 0; }
        }
        @keyframes sumBit {
          0%, 56% { opacity: .18; transform: translateX(0); }
          68%, 88% { opacity: 1; transform: translateX(72px); }
          100% { opacity: .18; transform: translateX(120px); }
        }
        @keyframes carryBit {
          0%, 62% { opacity: .18; transform: translateX(0); }
          74%, 90% { opacity: 1; transform: translateX(72px); }
          100% { opacity: .18; transform: translateX(120px); }
        }
        @keyframes corePulse {
          0%, 48% { filter: drop-shadow(0 0 0 rgba(37,99,235,0)); }
          60%, 80% { filter: drop-shadow(0 0 15px rgba(37,99,235,.34)); }
          100% { filter: drop-shadow(0 0 0 rgba(37,99,235,0)); }
        }
      `}</style>
      <svg viewBox="0 0 780 320" className="w-full" role="img" aria-label="Animated half-adder combinational circuit">
        <rect x="20" y="22" width="740" height="270" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
        <text x="44" y="58" fill="#0f172a" fontSize="18" fontWeight="900">Animated working: half adder as a combinational circuit</text>
        <text x="44" y="82" fill="#64748b" fontSize="13" fontWeight="700">Inputs directly create outputs through fixed logic, without memory or clock storage.</text>

        <line x1="82" y1="126" x2="330" y2="126" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <line x1="82" y1="178" x2="330" y2="178" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <circle className="bit-a" cx="92" cy="126" r="10" fill="#2563eb" />
        <circle className="bit-b" cx="92" cy="178" r="10" fill="#16a34a" />
        <text x="46" y="131" fill="#1e40af" fontSize="14" fontWeight="900">A</text>
        <text x="46" y="183" fill="#166534" fontSize="14" fontWeight="900">B</text>

        <rect className="logic-core" x="330" y="104" width="170" height="96" rx="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" />
        <text x="366" y="145" fill="#1d4ed8" fontSize="20" fontWeight="900">XOR</text>
        <text x="365" y="174" fill="#1d4ed8" fontSize="20" fontWeight="900">AND</text>

        <line x1="500" y1="132" x2="675" y2="132" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <line x1="500" y1="172" x2="675" y2="172" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <circle className="sum-bit" cx="520" cy="132" r="10" fill="#dc2626" />
        <circle className="carry-bit" cx="520" cy="172" r="10" fill="#f59e0b" />
        <text x="690" y="137" fill="#991b1b" fontSize="14" fontWeight="900">Sum</text>
        <text x="690" y="177" fill="#92400e" fontSize="14" fontWeight="900">Carry</text>

        <rect x="112" y="228" width="560" height="40" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="134" y="254" fill="#475569" fontSize="14" fontWeight="900">Function: Sum = A XOR B, Carry = A.B. Output depends only on present inputs.</text>
      </svg>
    </div>
  );
}

export default function CombinationalCircuitsPage() {
  return (
    <Layout title="Combinational Circuits | Digital Electronics" description="Deep theory notes on adders, subtractors, MUX, DEMUX, encoders, decoders, comparators, and combinational circuit design." pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1440px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/digital-electronics" className="font-medium text-slate-600 transition hover:text-portal-700">Digital Electronics</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">Combinational Circuits</span></li>
          </ol>
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Digital Electronics / Combinational Circuits</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Combinational Circuits</h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Learn how present input bits are transformed directly into useful outputs
            such as sums, differences, selected data, decoded lines, encoded addresses,
            and comparison decisions.
          </p>
        </section>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p>
              A combinational circuit is a digital circuit whose output depends only on
              the present input combination. It has no memory element and does not need a
              clock to remember previous states.
            </p>
            <p>
              Adders, subtractors, multiplexers, demultiplexers, encoders, decoders, and
              comparators are standard combinational building blocks used inside almost
              every digital system.
            </p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Industry relevance: ALUs, buses, instruction decoders, data selectors, display drivers, and memory address logic use combinational circuits.</li>
              <li>Design relevance: these blocks convert Boolean theory into real reusable hardware modules.</li>
              <li>Exam relevance: GATE and PSU questions frequently test half/full adders, subtractors, MUX realization, decoders, and comparators.</li>
              <li>Interview relevance: candidates are often asked to design a circuit from a truth table or implement a function using MUX/decoder.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Logic gates and truth tables</li>
              <li>Boolean algebra and K-map simplification</li>
              <li>Binary addition and subtraction</li>
              <li>SOP and POS forms</li>
              <li>Enable/select line concept</li>
              <li>Basic propagation delay idea</li>
            </ul>
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p>
              A combinational circuit behaves like a fixed decision machine. Give it an
              input pattern, and it immediately produces the corresponding output
              pattern after a small gate delay.
            </p>
            <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
              Combinational logic answers: "What should the output be right now for
              these inputs?"
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="text-base font-bold text-slate-950">1. No Memory</h3>
            <p>
              A combinational circuit does not store history. If the same input appears
              again, the same output appears again, independent of what happened earlier.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. Functional Blocks</h3>
            <p>
              Adders perform binary addition, subtractors perform difference operations,
              MUX selects one input out of many, DEMUX routes one input to many outputs,
              encoders compress active lines into binary code, decoders expand binary
              code into active output lines, and comparators compare magnitudes.
            </p>
            <h3 className="text-base font-bold text-slate-950">3. Timing Behavior</h3>
            <p>
              Even without memory, outputs are not mathematically instant. Signals pass
              through gates, so propagation delay decides how soon the correct output
              becomes valid.
            </p>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="text-base font-bold text-slate-950">1. Half Adder</h3>
            <p>Adding two one-bit numbers gives a sum bit and a carry bit.</p>
            <p>{"$$ S = A \\oplus B = A'B + AB' $$"}</p>
            <p>{"$$ C = AB $$"}</p>
            <p>
              Physical meaning: Sum is 1 when inputs are different. Carry is 1 only when
              both inputs are 1.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. Full Adder</h3>
            <p>A full adder adds A, B, and carry-in.</p>
            <p>{"$$ S = A \\oplus B \\oplus C_{in} $$"}</p>
            <p>{"$$ C_{out} = AB + BC_{in} + AC_{in} $$"}</p>
            <p>
              Carry-out becomes 1 when at least two of the three inputs are 1.
            </p>
            <h3 className="text-base font-bold text-slate-950">3. 2:1 MUX</h3>
            <p>{"For select input S, output is $$ Y = S'I_0 + SI_1 $$."}</p>
            <p>
              If S is 0, input I0 is selected. If S is 1, input I1 is selected.
            </p>
          </TopicSection>

          <TopicSection title="Working Principle">
            <ol className="grid gap-2">
              <li>Define the required input and output variables.</li>
              <li>Build the truth table from the required behavior.</li>
              <li>Write Boolean expressions for each output.</li>
              <li>Simplify expressions using Boolean algebra or K-map.</li>
              <li>Implement the simplified expressions using gates or standard blocks.</li>
              <li>Check propagation delay and verify the circuit against the truth table.</li>
            </ol>
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <CombinationalAnimation />
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Half Adder Circuit Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Full Adder Block Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">MUX Data Selection Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Decoder Output Line Diagram Here</div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="grid gap-3 lg:grid-cols-2">
              <FormulaCard title="Half adder sum" formula={"$$ S = A \\oplus B $$"}>Sum is HIGH when the two input bits are different.</FormulaCard>
              <FormulaCard title="Half adder carry" formula={"$$ C = AB $$"}>Carry is HIGH only when both bits are 1.</FormulaCard>
              <FormulaCard title="Full adder sum" formula={"$$ S = A \\oplus B \\oplus C_{in} $$"}>Sum is the odd-parity result of the three input bits.</FormulaCard>
              <FormulaCard title="Full adder carry" formula={"$$ C_{out}=AB+AC_{in}+BC_{in} $$"}>Carry is generated when at least two input bits are 1.</FormulaCard>
              <FormulaCard title="2:1 MUX" formula={"$$ Y=S'I_0+SI_1 $$"}>The select signal chooses which input reaches the output.</FormulaCard>
              <FormulaCard title="Half subtractor" formula={"$$ D=A\\oplus B,\\quad B_{out}=A'B $$"}>Borrow occurs when subtracting 1 from 0.</FormulaCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Arithmetic logic units in CPUs</li>
              <li>Address decoding in memory systems</li>
              <li>Data selection in buses and multiplexed channels</li>
              <li>Binary comparison in control processors</li>
              <li>Display decoding for seven-segment displays</li>
              <li>Error checking and parity generation</li>
              <li>FPGA combinational logic design</li>
              <li>Digital communication switching and routing</li>
            </ul>
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
            <p>{"For a half adder with $$ A=1, B=1 $$:"}</p>
            <p>{"$$ S=A\\oplus B=0 $$ and $$ C=AB=1 $$."}</p>
            <p>So the binary result is 10, which is decimal 2.</p>
            <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
            <p>{"For a 2:1 MUX, let $$ I_0=0, I_1=1, S=1 $$."}</p>
            <p>{"$$ Y=S'I_0+SI_1=0\\cdot0+1\\cdot1=1 $$."}</p>
            <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
            <p>{"Find full-adder output for $$ A=1, B=0, C_{in}=1 $$."}</p>
            <p>{"$$ S=1\\oplus0\\oplus1=0 $$."}</p>
            <p>{"$$ C_{out}=AB+AC_{in}+BC_{in}=0+1+0=1 $$."}</p>
            <p>The output is Sum 0 and Carry 1.</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <ul className="grid gap-2">
              <li>Confusing combinational circuits with sequential circuits.</li>
              <li>Forgetting carry-in while designing a full adder.</li>
              <li>Writing MUX equations with select input reversed.</li>
              <li>Assuming output changes instantly without propagation delay.</li>
              <li>Mixing encoder and decoder functions.</li>
              <li>Ignoring invalid or priority cases in encoders.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-950">
                  <th className="py-2 pr-3">Block</th>
                  <th className="py-2 pr-3">Function</th>
                  <th className="py-2 pr-3">Key Signal</th>
                  <th className="py-2 pr-3">Typical Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Adder</td><td className="py-2 pr-3">Adds binary bits</td><td className="py-2 pr-3">Carry</td><td className="py-2 pr-3">ALU arithmetic</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">MUX</td><td className="py-2 pr-3">Selects one input</td><td className="py-2 pr-3">Select line</td><td className="py-2 pr-3">Data routing</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Decoder</td><td className="py-2 pr-3">Activates one output</td><td className="py-2 pr-3">Enable</td><td className="py-2 pr-3">Memory selection</td></tr>
                <tr><td className="py-2 pr-3">Comparator</td><td className="py-2 pr-3">Compares magnitudes</td><td className="py-2 pr-3">A&gt;B, A=B, A&lt;B</td><td className="py-2 pr-3">Decision logic</td></tr>
              </tbody>
            </table>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <ul className="grid gap-2">
              <li>What is the difference between combinational and sequential circuits?</li>
              <li>Why does a full adder need carry-in?</li>
              <li>How can a MUX implement any Boolean function?</li>
              <li>What is the difference between encoder and decoder?</li>
              <li>Why does propagation delay matter in combinational logic?</li>
              <li>How is XOR used in adders?</li>
              <li>What is a priority encoder?</li>
            </ul>
          </TopicSection>

          <TopicSection title="Exam-Oriented Notes">
            <ul className="grid gap-2">
              <li>Half adder has no carry-in; full adder includes carry-in.</li>
              <li>For MUX realization, select lines become variables and data inputs become 0, 1, or remaining variables.</li>
              <li>Decoder outputs correspond to minterms.</li>
              <li>Comparator output often has three lines: greater, equal, less.</li>
              <li>Check whether encoder is normal or priority encoder before solving.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Revision Summary">
            <ul className="grid gap-2">
              <li>Combinational output depends only on present inputs.</li>
              <li>There is no memory and no feedback storage path.</li>
              <li>Adders and subtractors perform arithmetic.</li>
              <li>MUX and DEMUX route data.</li>
              <li>Encoders and decoders convert between active lines and binary codes.</li>
              <li>{"Core formulas: $$ S=A\\oplus B $$, $$ C=AB $$, $$ Y=S'I_0+SI_1 $$."}</li>
            </ul>
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
            <ul className="grid gap-2">
              <li>Explain why a combinational circuit has no memory.</li>
              <li>Differentiate MUX and DEMUX with one example.</li>
              <li>Why is XOR important in binary addition?</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">Numerical</h3>
            <ul className="grid gap-2">
              <li>{"Find half-adder output for $$ A=0, B=1 $$."}</li>
              <li>{"Find full-adder output for $$ A=1, B=1, C_{in}=1 $$."}</li>
              <li>{"Evaluate a 2:1 MUX for $$ I_0=1, I_1=0, S=1 $$."}</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">MCQs</h3>
            <ul className="grid gap-2">
              <li>Which circuit selects one input from many?</li>
              <li>Which block converts binary input into one active output line?</li>
              <li>Which output of a half adder is generated by AND gate?</li>
            </ul>
          </TopicSection>

          <div className="flex justify-end">
            <Link href="/sequential-circuits" className="inline-flex w-full justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto">
              Next Sequential Circuits
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
