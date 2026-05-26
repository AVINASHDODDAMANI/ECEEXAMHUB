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

function KMapAnimation() {
  const cells = [
    ["1", "1", "0", "0"],
    ["0", "1", "1", "0"],
    ["0", "0", "1", "1"],
    ["0", "0", "0", "0"],
  ];

  return (
    <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-4">
      <style jsx>{`
        .group-one { animation: groupOne 4.2s ease-in-out infinite; }
        .group-two { animation: groupTwo 4.2s ease-in-out infinite; }
        .formula-one { animation: textOne 4.2s ease-in-out infinite; }
        .formula-two { animation: textTwo 4.2s ease-in-out infinite; }
        @keyframes groupOne {
          0%, 12% { opacity: 0; transform: scale(0.96); }
          22%, 52% { opacity: 1; transform: scale(1); }
          70%, 100% { opacity: 0.28; transform: scale(1); }
        }
        @keyframes groupTwo {
          0%, 50% { opacity: 0; transform: scale(0.96); }
          60%, 88% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.28; transform: scale(1); }
        }
        @keyframes textOne {
          0%, 12% { opacity: 0; transform: translateY(6px); }
          22%, 52% { opacity: 1; transform: translateY(0); }
          70%, 100% { opacity: 0.3; }
        }
        @keyframes textTwo {
          0%, 50% { opacity: 0; transform: translateY(6px); }
          60%, 88% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0.35; }
        }
      `}</style>
      <svg viewBox="0 0 760 390" className="w-full" role="img" aria-label="Animated K-map grouping">
        <rect x="20" y="22" width="720" height="346" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
        <text x="44" y="58" fill="#0f172a" fontSize="18" fontWeight="900">Animated working: grouping adjacent 1s</text>
        <text x="44" y="82" fill="#64748b" fontSize="13" fontWeight="700">Groups remove variables that change inside the group and keep variables that stay constant.</text>

        <text x="166" y="112" fill="#334155" fontSize="13" fontWeight="900">CD</text>
        <text x="58" y="190" fill="#334155" fontSize="13" fontWeight="900">AB</text>
        {["00", "01", "11", "10"].map((label, index) => (
          <text key={`col-${label}`} x={158 + index * 82} y="142" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="900">{label}</text>
        ))}
        {["00", "01", "11", "10"].map((label, index) => (
          <text key={`row-${label}`} x="100" y={176 + index * 52} textAnchor="middle" fill="#334155" fontSize="13" fontWeight="900">{label}</text>
        ))}

        {cells.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <g key={`${rowIndex}-${colIndex}`}>
              <rect x={126 + colIndex * 82} y={154 + rowIndex * 52} width="64" height="42" rx="10" fill={value === "1" ? "#eff6ff" : "#f8fafc"} stroke="#cbd5e1" strokeWidth="2" />
              <text x={158 + colIndex * 82} y={181 + rowIndex * 52} textAnchor="middle" fill={value === "1" ? "#1d4ed8" : "#94a3b8"} fontSize="18" fontWeight="900">{value}</text>
            </g>
          ))
        )}

        <rect className="group-one" x="128" y="156" width="144" height="38" rx="18" fill="none" stroke="#16a34a" strokeWidth="5" />
        <rect className="group-two" x="210" y="208" width="144" height="90" rx="18" fill="none" stroke="#dc2626" strokeWidth="5" />

        <g className="formula-one">
          <rect x="450" y="145" width="226" height="64" rx="16" fill="#f0fdf4" stroke="#bbf7d0" />
          <text x="470" y="172" fill="#166534" fontSize="14" fontWeight="900">Group 1: AB = 00, C = 0</text>
          <text x="470" y="194" fill="#166534" fontSize="16" fontWeight="900">Term: A'B'C'</text>
        </g>

        <g className="formula-two">
          <rect x="450" y="226" width="226" height="72" rx="16" fill="#fef2f2" stroke="#fecaca" />
          <text x="470" y="253" fill="#991b1b" fontSize="14" fontWeight="900">Group 2: B = 1, C = 1</text>
          <text x="470" y="275" fill="#991b1b" fontSize="16" fontWeight="900">Term: BC</text>
        </g>

        <text x="44" y="336" fill="#475569" fontSize="14" fontWeight="800">Simplified idea: larger valid groups produce fewer variables and simpler hardware.</text>
      </svg>
    </div>
  );
}

export default function KarnaughMapPage() {
  return (
    <Layout
      title="Karnaugh Map (K-Map) GATE ECE Notes + Boolean PYQs | Digital Electronics"
      description="Deep educational guide to Karnaugh maps, grouping, prime implicants, essential prime implicants, don't-care conditions, and logic simplification."
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1440px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/digital-electronics" className="font-medium text-slate-600 transition hover:text-portal-700">Digital Electronics</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">Karnaugh Map (K-Map)</span></li>
          </ol>
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Digital Electronics / Karnaugh Map</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Karnaugh Map (K-Map)</h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Learn how a truth table becomes a visual map, how adjacent 1s are grouped,
            and why each group removes changing variables to produce a simpler digital circuit.
          </p>
        </section>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p>
              A Karnaugh Map, or K-Map, is a visual method for simplifying Boolean
              expressions. It arranges truth-table outputs so adjacent cells differ by
              only one variable.
            </p>
            <p>
              Its importance is practical: a simplified expression usually needs fewer
              gates, fewer interconnections, less chip area, lower power, and smaller
              propagation delay.
            </p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Industry relevance: combinational logic inside ASICs, FPGAs, decoders, controllers, and datapaths is optimized by reducing Boolean expressions.</li>
              <li>Hardware relevance: fewer product terms usually mean fewer gates, lower capacitance, and better timing.</li>
              <li>Exam relevance: GATE and PSU questions often ask minimal SOP/POS, grouping, prime implicants, and don't-care usage.</li>
              <li>Interview relevance: K-map questions test whether you understand simplification physically, not only algebraically.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Binary variables and truth tables</li>
              <li>AND, OR, NOT, NAND, NOR gates</li>
              <li>Boolean algebra laws</li>
              <li>SOP and POS forms</li>
              <li>Minterms and maxterms</li>
              <li>Gray-code ordering idea</li>
            </ul>
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p>
              Imagine a K-map as a smart seating arrangement for truth-table rows. Rows
              that differ by only one variable sit next to each other. When two adjacent
              cells both contain 1, the changing variable is not important for producing
              the output, so it can be removed.
            </p>
            <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
              K-map simplification is variable cancellation by visual adjacency.
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="text-base font-bold text-slate-950">1. Why Gray-Code Order Is Used</h3>
            <p>
              K-map rows and columns are ordered as 00, 01, 11, 10 instead of normal
              binary order. This ensures neighboring cells differ by only one variable,
              which is the condition needed for cancellation.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. Grouping Rule</h3>
            <p>
              Groups must contain 1, 2, 4, 8, or another power of two cells. Larger
              groups remove more variables, so the final expression becomes simpler.
            </p>
            <h3 className="text-base font-bold text-slate-950">3. Prime and Essential Prime Implicants</h3>
            <p>
              A prime implicant is a valid group that cannot be expanded further. An
              essential prime implicant covers at least one 1 that no other group covers.
              Essential groups must be included in the final answer.
            </p>
            <h3 className="text-base font-bold text-slate-950">4. Don't-Care Conditions</h3>
            <p>
              Don't-care cells represent input combinations that will not occur or whose
              output does not matter. They can be treated as 1 only when they help create
              a larger group.
            </p>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="text-base font-bold text-slate-950">1. Adjacent Minterm Cancellation</h3>
            <p>{"Consider two adjacent minterms: $$ A'B'C' + A'B'C $$"}</p>
            <p>{"Factor the common part: $$ A'B'(C' + C) $$"}</p>
            <p>{"Since $$ C' + C = 1 $$, the expression becomes $$ A'B' $$."}</p>
            <p>
              Physical meaning: output remains 1 whether C is 0 or 1, so C is not
              controlling the output for this group.
            </p>

            <h3 className="text-base font-bold text-slate-950">2. Four-Cell Group Cancellation</h3>
            <p>{"A four-cell group can remove two changing variables."}</p>
            <p>{"Example: $$ A'B'C'D + A'B'CD + A'BC'D + A'BCD $$"}</p>
            <p>{"Common constant variable is $$ A' $$, so the simplified term is $$ A' $$."}</p>
          </TopicSection>

          <TopicSection title="Working Principle">
            <ol className="grid gap-2">
              <li>Convert the Boolean function or truth table into minterms.</li>
              <li>Place 1s in the K-map cells using Gray-code order.</li>
              <li>Mark don't-care cells if given.</li>
              <li>Make the largest possible power-of-two groups.</li>
              <li>Allow edge wrapping because opposite edges are adjacent in K-map logic.</li>
              <li>Write one simplified term for each group by keeping only variables that remain constant.</li>
              <li>OR all group terms to obtain the minimized SOP expression.</li>
            </ol>
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <KMapAnimation />
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">2-Variable K-Map Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">3-Variable K-Map Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">4-Variable K-Map Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Don't-Care Grouping Diagram Here</div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="grid gap-3 lg:grid-cols-2">
              <FormulaCard title="Complement law" formula={"$$ X + X' = 1 $$"}>This is the algebraic reason a changing variable disappears inside a K-map group.</FormulaCard>
              <FormulaCard title="Two adjacent minterms" formula={"$$ XY + XY' = X $$"}>If only one variable changes between adjacent 1s, that variable is removed.</FormulaCard>
              <FormulaCard title="Power-of-two grouping" formula={"$$ 1, 2, 4, 8, 16, ... $$"}>Groups must contain powers of two because each grouping cancels a whole set of changing variables.</FormulaCard>
              <FormulaCard title="SOP from K-map" formula={"$$ F = P_1 + P_2 + P_3 + ... $$"}>Each product term comes from one group; final SOP is the OR of all group terms.</FormulaCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Minimizing control logic in embedded hardware</li>
              <li>Reducing FPGA look-up table usage</li>
              <li>Designing decoders, encoders, and multiplexing logic</li>
              <li>Reducing gate count in ASIC datapaths</li>
              <li>Improving propagation delay in combinational paths</li>
              <li>Optimizing display drivers and alarm logic</li>
              <li>Reducing power in battery-operated digital circuits</li>
              <li>Verifying Boolean expressions during technical interviews</li>
            </ul>
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
            <p>{"Simplify $$ F = A'B' + A'B $$."}</p>
            <p>{"Factor common $$ A' $$: $$ F = A'(B' + B) $$."}</p>
            <p>{"Since $$ B' + B = 1 $$, $$ F = A' $$."}</p>

            <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
            <p>{"For $$ F(A,B,C)=\\Sigma m(1,3,5,7) $$, all minterms have $$ C=1 $$."}</p>
            <p>{"The four-cell group cancels A and B, so $$ F = C $$."}</p>

            <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
            <p>{"Simplify $$ F(A,B,C,D)=\\Sigma m(0,1,2,3,8,9,10,11) $$."}</p>
            <p>{"All listed minterms have $$ B=0 $$ while A, C, and D vary."}</p>
            <p>{"Therefore, the simplified result is $$ F = B' $$."}</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <ul className="grid gap-2">
              <li>Using normal binary order instead of Gray-code order in K-map labels.</li>
              <li>Making groups of 3, 6, or 10 cells. Groups must be powers of two.</li>
              <li>Forgetting that edge cells can wrap around and be adjacent.</li>
              <li>Including don't-care cells even when they do not help simplification.</li>
              <li>Writing variables that change inside a group instead of removing them.</li>
              <li>Missing essential prime implicants that cover unique 1s.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-950">
                  <th className="py-2 pr-3">Method</th>
                  <th className="py-2 pr-3">Best For</th>
                  <th className="py-2 pr-3">Strength</th>
                  <th className="py-2 pr-3">Limitation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Boolean algebra</td><td className="py-2 pr-3">Symbolic simplification</td><td className="py-2 pr-3">Works for any variables</td><td className="py-2 pr-3">Can be lengthy</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">K-map</td><td className="py-2 pr-3">2 to 5 variables</td><td className="py-2 pr-3">Visual and fast</td><td className="py-2 pr-3">Hard for many variables</td></tr>
                <tr><td className="py-2 pr-3">Tabulation</td><td className="py-2 pr-3">Many variables</td><td className="py-2 pr-3">Systematic</td><td className="py-2 pr-3">More procedural</td></tr>
              </tbody>
            </table>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <ul className="grid gap-2">
              <li>Why does K-map use Gray-code ordering?</li>
              <li>What does it mean when a variable changes inside a group?</li>
              <li>What is a prime implicant?</li>
              <li>What makes a prime implicant essential?</li>
              <li>When should don't-care conditions be used?</li>
              <li>Why are edge cells adjacent in a K-map?</li>
              <li>How does K-map simplification reduce hardware delay?</li>
            </ul>
          </TopicSection>

          <TopicSection title="Exam-Oriented Notes">
            <ul className="grid gap-2">
              <li>Always label 4-variable K-map columns and rows in Gray-code order: 00, 01, 11, 10.</li>
              <li>Make the largest possible groups first, then cover remaining 1s.</li>
              <li>A single 1 can be grouped alone only if no adjacent grouping is possible.</li>
              <li>Overlapping is allowed if it helps create larger groups or cover essential cells.</li>
              <li>Don't-care cells are optional; use them only when they simplify the expression.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Revision Summary">
            <ul className="grid gap-2">
              <li>K-map is a visual method for Boolean simplification.</li>
              <li>Adjacent cells differ by only one variable.</li>
              <li>Changing variables disappear from a group term.</li>
              <li>Groups must be powers of two.</li>
              <li>Larger groups produce simpler expressions.</li>
              <li>{"Core cancellation idea: $$ XY + XY' = X $$."}</li>
            </ul>
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
            <ul className="grid gap-2">
              <li>Explain why K-map cells are arranged in Gray-code order.</li>
              <li>Why does a larger group produce a simpler expression?</li>
              <li>What is the role of don't-care conditions?</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">Numerical</h3>
            <ul className="grid gap-2">
              <li>{"Simplify $$ F(A,B,C)=\\Sigma m(0,2,4,6) $$."}</li>
              <li>{"Simplify $$ F(A,B,C,D)=\\Sigma m(1,3,5,7,9,11,13,15) $$."}</li>
              <li>{"Use don't-cares to simplify $$ F=\\Sigma m(1,3,7)+d(5) $$."}</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">MCQs</h3>
            <ul className="grid gap-2">
              <li>Which grouping size is invalid: 2, 4, 6, or 8?</li>
              <li>Which ordering is used in K-map labels: binary or Gray code?</li>
              <li>What happens to a variable that changes inside a group?</li>
            </ul>
          </TopicSection>

          <div className="flex justify-end">
            <Link href="/combinational-circuits" className="inline-flex w-full justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto">
              Next Combinational Circuits
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
