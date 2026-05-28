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

function LogicFamilyAnimation() {
  return (
    <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-4">
      <style jsx>{`
        .input-wave { animation: inputWave 3.6s ease-in-out infinite; }
        .switch-node { animation: switchNode 3.6s ease-in-out infinite; }
        .output-wave { animation: outputWave 3.6s ease-in-out infinite; }
        .noise-band { animation: noiseBand 3.6s ease-in-out infinite; }
        @keyframes inputWave {
          0%, 30% { transform: translateY(34px); }
          45%, 75% { transform: translateY(0); }
          90%, 100% { transform: translateY(34px); }
        }
        @keyframes switchNode {
          0%, 34% { fill: #94a3b8; transform: scale(.92); }
          48%, 78% { fill: #16a34a; transform: scale(1.08); }
          92%, 100% { fill: #94a3b8; transform: scale(.92); }
        }
        @keyframes outputWave {
          0%, 38% { transform: translateY(34px); opacity: .45; }
          54%, 82% { transform: translateY(0); opacity: 1; }
          96%, 100% { transform: translateY(34px); opacity: .45; }
        }
        @keyframes noiseBand {
          0%, 100% { opacity: .25; }
          45%, 80% { opacity: .85; }
        }
      `}</style>
      <svg viewBox="0 0 800 340" className="w-full" role="img" aria-label="Animated logic family switching and noise margin">
        <rect x="20" y="22" width="760" height="286" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
        <text x="44" y="58" fill="#0f172a" fontSize="18" fontWeight="900">Animated working: logic level switching</text>
        <text x="44" y="82" fill="#64748b" fontSize="13" fontWeight="700">A logic family defines voltage thresholds, drive strength, speed, and power behavior.</text>

        <rect x="72" y="118" width="180" height="104" rx="18" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="96" y="145" fill="#0f172a" fontSize="14" fontWeight="900">Input voltage</text>
        <path className="input-wave" d="M98 192 H142 V150 H212" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="96" y="240" fill="#1d4ed8" fontSize="13" fontWeight="800">LOW to HIGH transition</text>

        <rect x="310" y="106" width="180" height="128" rx="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" />
        <text x="358" y="140" fill="#1d4ed8" fontSize="20" fontWeight="900">CMOS</text>
        <text x="344" y="166" fill="#1d4ed8" fontSize="13" fontWeight="800">threshold decides logic</text>
        <circle className="switch-node" cx="400" cy="194" r="15" style={{ transformOrigin: "400px 194px" }} />

        <rect x="548" y="118" width="180" height="104" rx="18" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="572" y="145" fill="#0f172a" fontSize="14" fontWeight="900">Output voltage</text>
        <path className="output-wave" d="M572 192 H616 V150 H690" fill="none" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="572" y="240" fill="#991b1b" fontSize="13" fontWeight="800">valid HIGH after delay</text>

        <rect className="noise-band" x="102" y="258" width="596" height="28" rx="12" fill="#fef3c7" stroke="#f59e0b" />
        <text x="128" y="277" fill="#92400e" fontSize="13" fontWeight="900">Noise margin: safe voltage gap between guaranteed LOW/HIGH regions</text>
      </svg>
    </div>
  );
}

export default function LogicFamiliesPage() {
  return (
    <Layout title="Logic Families GATE ECE Quick Notes + CMOS TTL Formulas + PYQs" description="Deep theory notes on TTL, CMOS, fan-in, fan-out, noise margin, propagation delay, power dissipation, and logic-family comparison." pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1440px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Notes</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/digital-electronics" className="font-medium text-slate-600 transition hover:text-portal-700">Digital Electronics</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">Logic Families</span></li>
          </ol>
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Digital Electronics / Logic Families</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Logic Families</h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Learn how practical logic gates are built, why TTL and CMOS behave
            differently, and how speed, power, fan-out, and noise margin decide whether
            a digital circuit works reliably.
          </p>
        </section>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p>
              A logic family is a group of digital ICs built using the same internal
              circuit technology and compatible voltage levels. Examples include TTL and
              CMOS.
            </p>
            <p>
              Logic gates are not only Boolean symbols. In real hardware, they are
              transistor circuits with limited speed, finite current drive, power
              consumption, and noise tolerance. Logic families describe these practical
              electrical properties.
            </p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Industry relevance: IC selection, microcontroller interfacing, FPGA I/O compatibility, and mixed-voltage board design require logic-family knowledge.</li>
              <li>Reliability relevance: wrong voltage levels or weak drive strength can make a circuit fail even when the Boolean logic is correct.</li>
              <li>Exam relevance: GATE and PSU questions often ask TTL vs CMOS, fan-in, fan-out, noise margin, propagation delay, and power dissipation.</li>
              <li>Interview relevance: strong answers connect symbolic logic to real transistor-level electrical behavior.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Logic gates and Boolean functions</li>
              <li>Voltage levels for logic 0 and logic 1</li>
              <li>Basic BJT and MOSFET switching idea</li>
              <li>Current, power, and delay concepts</li>
              <li>Input/output loading</li>
              <li>Noise and signal integrity basics</li>
            </ul>
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p>
              Think of a logic family as the electrical personality of a gate. Two gates
              may both perform NAND logically, but one may switch faster, consume more
              power, drive more loads, or tolerate more noise.
            </p>
            <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
              Boolean algebra tells what the circuit should do. Logic families tell
              whether the real circuit can do it safely, quickly, and efficiently.
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="text-base font-bold text-slate-950">1. TTL Logic</h3>
            <p>
              TTL means Transistor-Transistor Logic. It is based mainly on bipolar
              junction transistors. TTL is known for good speed and strong output drive,
              but it generally consumes more static power than CMOS.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. CMOS Logic</h3>
            <p>
              CMOS means Complementary MOS logic. It uses paired NMOS and PMOS networks.
              Ideally, CMOS consumes very low static power because there is no direct DC
              path from supply to ground in a stable logic state.
            </p>
            <h3 className="text-base font-bold text-slate-950">3. Logic-Level Compatibility</h3>
            <p>
              A receiving gate must correctly interpret the output voltage of the
              driving gate. If the output HIGH of one family is not high enough for the
              input HIGH requirement of another family, the interface becomes unreliable.
            </p>
            <h3 className="text-base font-bold text-slate-950">4. Speed, Power, and Loading</h3>
            <p>
              Real gates have propagation delay, input capacitance, output current
              limits, and switching power. These parameters decide maximum clock speed,
              battery life, heat, and the number of gates that can be driven.
            </p>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="text-base font-bold text-slate-950">1. Fan-Out</h3>
            <p>
              Fan-out tells how many similar gate inputs one output can drive without
              violating logic levels.
            </p>
            <p>{"$$ \\text{Fan-out} = \\frac{I_{OH}}{I_{IH}} \\quad \\text{or} \\quad \\frac{I_{OL}}{I_{IL}} $$"}</p>
            <p>
              Use the smaller value because the gate must work safely in both HIGH and
              LOW states.
            </p>

            <h3 className="text-base font-bold text-slate-950">2. Noise Margin</h3>
            <p>
              Noise margin is the safe voltage gap that allows a signal to tolerate
              unwanted disturbance without being misread.
            </p>
            <p>{"$$ NM_H = V_{OH(min)} - V_{IH(min)} $$"}</p>
            <p>{"$$ NM_L = V_{IL(max)} - V_{OL(max)} $$"}</p>

            <h3 className="text-base font-bold text-slate-950">3. Power-Delay Product</h3>
            <p>
              Power-delay product estimates switching energy. A family with low PDP is
              efficient because it performs switching using less energy.
            </p>
            <p>{"$$ PDP = P_D \\times t_p $$"}</p>
          </TopicSection>

          <TopicSection title="Working Principle">
            <ol className="grid gap-2">
              <li>Input voltage arrives at a logic-family gate.</li>
              <li>The gate compares that voltage with its input threshold range.</li>
              <li>Internal BJT or MOS transistor networks switch accordingly.</li>
              <li>The output stage drives a valid LOW or HIGH voltage.</li>
              <li>The next gate must receive enough voltage and current to identify the logic state.</li>
              <li>Noise margin, fan-out, delay, and power decide practical reliability.</li>
            </ol>
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <LogicFamilyAnimation />
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">TTL NAND Gate Internal Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">CMOS Inverter Circuit Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Noise Margin Voltage Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Fan-Out Loading Diagram Here</div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="grid gap-3 lg:grid-cols-2">
              <FormulaCard title="High-level noise margin" formula={"$$ NM_H = V_{OH(min)} - V_{IH(min)} $$"}>Shows how much positive noise can be tolerated while still reading HIGH correctly.</FormulaCard>
              <FormulaCard title="Low-level noise margin" formula={"$$ NM_L = V_{IL(max)} - V_{OL(max)} $$"}>Shows how much noise can be tolerated while still reading LOW correctly.</FormulaCard>
              <FormulaCard title="Fan-out" formula={"$$ \\text{Fan-out}=\\min\\left(\\frac{I_{OH}}{I_{IH}},\\frac{I_{OL}}{I_{IL}}\\right) $$"}>The smaller current-ratio limit decides the safe number of loads.</FormulaCard>
              <FormulaCard title="Power-delay product" formula={"$$ PDP=P_Dt_p $$"}>Represents energy spent per switching operation approximately.</FormulaCard>
              <FormulaCard title="Dynamic CMOS power" formula={"$$ P_{dyn}=\\alpha C_L V_{DD}^2 f $$"}>CMOS dynamic power rises with capacitance, square of supply voltage, switching activity, and frequency.</FormulaCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Choosing IC families for digital boards</li>
              <li>Interfacing microcontrollers with sensors and displays</li>
              <li>Low-power CMOS design in mobile devices</li>
              <li>High-speed logic in communication hardware</li>
              <li>FPGA and ASIC I/O compatibility</li>
              <li>Mixed-voltage level shifting</li>
              <li>Noise-tolerant industrial digital systems</li>
              <li>Timing and power analysis in VLSI design</li>
            </ul>
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
            <p>{"If $$ V_{OH(min)}=4.4V $$ and $$ V_{IH(min)}=3.5V $$, find high noise margin."}</p>
            <p>{"$$ NM_H=4.4-3.5=0.9V $$."}</p>

            <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
            <p>{"If output LOW current capacity is $$ 16mA $$ and each input needs $$ 1.6mA $$, fan-out in LOW state is:"}</p>
            <p>{"$$ \\text{Fan-out}=16/1.6=10 $$."}</p>

            <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
            <p>{"A CMOS gate has $$ C_L=20pF, V_{DD}=5V, f=1MHz, \\alpha=0.5 $$. Find dynamic power."}</p>
            <p>{"$$ P=\\alpha C_LV_{DD}^2f=0.5\\times20pF\\times25\\times1MHz=250\\mu W $$."}</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <ul className="grid gap-2">
              <li>Thinking all logic gates with the same symbol have identical electrical behavior.</li>
              <li>Ignoring voltage-level compatibility between TTL and CMOS.</li>
              <li>Using only HIGH-state fan-out and forgetting LOW-state current limit.</li>
              <li>Assuming CMOS consumes zero power at high frequency.</li>
              <li>Confusing fan-in with fan-out.</li>
              <li>Ignoring propagation delay in cascaded logic paths.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-950">
                  <th className="py-2 pr-3">Parameter</th>
                  <th className="py-2 pr-3">TTL</th>
                  <th className="py-2 pr-3">CMOS</th>
                  <th className="py-2 pr-3">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Device</td><td className="py-2 pr-3">BJT based</td><td className="py-2 pr-3">MOSFET based</td><td className="py-2 pr-3">Internal switching technology</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Static power</td><td className="py-2 pr-3">Higher</td><td className="py-2 pr-3">Very low</td><td className="py-2 pr-3">Power in stable state</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Input impedance</td><td className="py-2 pr-3">Lower</td><td className="py-2 pr-3">Very high</td><td className="py-2 pr-3">Input loading</td></tr>
                <tr><td className="py-2 pr-3">Noise margin</td><td className="py-2 pr-3">Moderate</td><td className="py-2 pr-3">High</td><td className="py-2 pr-3">Noise tolerance</td></tr>
              </tbody>
            </table>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <ul className="grid gap-2">
              <li>What is a logic family?</li>
              <li>Why is CMOS preferred in low-power digital ICs?</li>
              <li>What is fan-out?</li>
              <li>What is noise margin, and why is it important?</li>
              <li>Why does CMOS consume dynamic power during switching?</li>
              <li>What is propagation delay?</li>
              <li>How do you check TTL-CMOS compatibility?</li>
            </ul>
          </TopicSection>

          <TopicSection title="Exam-Oriented Quick Notes">
            <ul className="grid gap-2">
              <li>CMOS has very high input impedance and low static power.</li>
              <li>TTL generally has stronger bipolar drive but higher power consumption.</li>
              <li>Noise margin formulas are frequently asked directly.</li>
              <li>Fan-out is limited by both HIGH and LOW current conditions.</li>
              <li>{"Dynamic CMOS power depends on $$ V_{DD}^2 $$, so supply reduction strongly saves power."}</li>
            </ul>
          </TopicSection>

          <TopicSection title="Revision Summary">
            <ul className="grid gap-2">
              <li>Logic families describe practical electrical behavior of gates.</li>
              <li>TTL is BJT-based; CMOS is MOSFET-based.</li>
              <li>Fan-out tells how many inputs one output can drive.</li>
              <li>Noise margin tells how much noise a logic level can tolerate.</li>
              <li>{"Key formulas: $$ NM_H=V_{OH(min)}-V_{IH(min)} $$, $$ NM_L=V_{IL(max)}-V_{OL(max)} $$, $$ P_{dyn}=\\alpha C_LV_{DD}^2f $$."}</li>
            </ul>
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
            <ul className="grid gap-2">
              <li>Explain why logic-family compatibility matters.</li>
              <li>Compare TTL and CMOS for power and input impedance.</li>
              <li>Why is noise margin important in industrial environments?</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">Numerical</h3>
            <ul className="grid gap-2">
              <li>{"Find $$ NM_H $$ for $$ V_{OH(min)}=3.8V $$ and $$ V_{IH(min)}=2.7V $$."}</li>
              <li>{"Find fan-out if output current is $$ 20mA $$ and each input needs $$ 2mA $$."}</li>
              <li>{"Calculate CMOS dynamic power for $$ C_L=10pF, V_{DD}=3.3V, f=5MHz, \\alpha=0.2 $$."}</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">MCQs</h3>
            <ul className="grid gap-2">
              <li>Which family generally has lower static power: TTL or CMOS?</li>
              <li>Fan-out is related to voltage, current, resistance, or frequency?</li>
              <li>Which parameter describes tolerance to unwanted voltage disturbance?</li>
            </ul>
          </TopicSection>

          <div className="flex justify-end">
            <Link href="/memories" className="inline-flex w-full justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto">
              Next Memories
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
