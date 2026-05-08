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

function MemoryAnimation() {
  return (
    <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-4">
      <style jsx>{`
        .addr-line { animation: addrMove 3.8s ease-in-out infinite; }
        .selected-cell { animation: selectCell 3.8s ease-in-out infinite; }
        .data-line { animation: dataMove 3.8s ease-in-out infinite; }
        .control-line { animation: controlPulse 3.8s ease-in-out infinite; }
        @keyframes addrMove {
          0% { opacity: 0; transform: translateX(0); }
          15%, 45% { opacity: 1; }
          60%, 100% { opacity: 0; transform: translateX(170px); }
        }
        @keyframes selectCell {
          0%, 42% { opacity: .25; transform: scale(.96); }
          54%, 82% { opacity: 1; transform: scale(1.08); }
          100% { opacity: .35; transform: scale(1); }
        }
        @keyframes dataMove {
          0%, 56% { opacity: .2; transform: translateX(0); }
          70%, 92% { opacity: 1; transform: translateX(96px); }
          100% { opacity: .2; transform: translateX(130px); }
        }
        @keyframes controlPulse {
          0%, 35% { opacity: .25; stroke-width: 4; }
          48%, 78% { opacity: 1; stroke-width: 8; }
          100% { opacity: .25; stroke-width: 4; }
        }
      `}</style>
      <svg viewBox="0 0 800 350" className="w-full" role="img" aria-label="Animated memory read operation">
        <rect x="20" y="22" width="760" height="292" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
        <text x="44" y="58" fill="#0f172a" fontSize="18" fontWeight="900">Animated working: memory read operation</text>
        <text x="44" y="82" fill="#64748b" fontSize="13" fontWeight="700">Address selects a storage cell; control signal enables read; data appears on the data bus.</text>

        <rect x="74" y="128" width="128" height="54" rx="16" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
        <text x="138" y="160" textAnchor="middle" fill="#1d4ed8" fontSize="15" fontWeight="900">Address Bus</text>
        <circle className="addr-line" cx="210" cy="155" r="9" fill="#2563eb" />
        <line x1="202" y1="155" x2="344" y2="155" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />

        <path className="control-line" d="M94 238 H150 V210 H206 V238 H262" fill="none" stroke="#16a34a" strokeLinecap="round" strokeLinejoin="round" />
        <text x="94" y="268" fill="#166534" fontSize="14" fontWeight="900">Read Enable</text>

        <rect x="344" y="100" width="210" height="156" rx="22" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
        <text x="449" y="126" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">Memory Array</text>
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => {
            const selected = row === 1 && col === 2;
            return (
              <rect
                key={`${row}-${col}`}
                className={selected ? "selected-cell" : ""}
                x={374 + col * 38}
                y={144 + row * 30}
                width="28"
                height="22"
                rx="6"
                fill={selected ? "#fef3c7" : "#eff6ff"}
                stroke={selected ? "#f59e0b" : "#bfdbfe"}
                strokeWidth="2"
                style={selected ? { transformOrigin: `${388 + col * 38}px ${155 + row * 30}px` } : undefined}
              />
            );
          })
        )}

        <line x1="554" y1="176" x2="692" y2="176" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <circle className="data-line" cx="570" cy="176" r="10" fill="#dc2626" />
        <rect x="692" y="150" width="58" height="52" rx="14" fill="#fef2f2" stroke="#fecaca" strokeWidth="2" />
        <text x="721" y="181" textAnchor="middle" fill="#991b1b" fontSize="14" fontWeight="900">Data</text>

        <rect x="320" y="278" width="370" height="28" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="340" y="297" fill="#475569" fontSize="13" fontWeight="900">Read cycle: address selects location, memory returns stored word.</text>
      </svg>
    </div>
  );
}

export default function MemoriesPage() {
  return (
    <Layout title="Memories | Digital Electronics" description="Deep theory notes on semiconductor memories, RAM, ROM, SRAM, DRAM, PROM, EPROM, EEPROM, address lines, capacity, and access time." pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1200px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/digital-electronics" className="font-medium text-slate-600 transition hover:text-portal-700">Digital Electronics</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">Memories</span></li>
          </ol>
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Digital Electronics / Memories</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Memories</h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Learn how digital systems store information, how address lines select memory
            locations, and how RAM, ROM, SRAM, DRAM, PROM, EPROM, and EEPROM differ in
            structure and use.
          </p>
        </section>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p>
              Memory is the part of a digital system that stores binary information.
              It may store data, instructions, configuration bits, lookup tables, or
              intermediate results.
            </p>
            <p>
              A memory device is organized as many storage locations. Each location has
              an address, and each address stores a fixed number of bits called a word.
            </p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Industry relevance: processors, microcontrollers, phones, routers, SSDs, display systems, and embedded devices all depend on memory hierarchy.</li>
              <li>Design relevance: address width, word size, access time, volatility, and cost decide system architecture.</li>
              <li>Exam relevance: GATE and PSU questions often test memory capacity, address lines, RAM/ROM differences, SRAM vs DRAM, and ROM types.</li>
              <li>Interview relevance: memory questions reveal whether you understand storage organization, not just definitions.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Binary numbers and bit positions</li>
              <li>Registers and flip-flop storage</li>
              <li>Address and data bus concept</li>
              <li>Read and write control signals</li>
              <li>Basic MOS capacitor and transistor switching idea</li>
              <li>Volatile vs non-volatile storage idea</li>
            </ul>
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p>
              Memory is like a huge set of numbered lockers. The address tells which
              locker to open. The data bus carries what is read from or written into that
              locker.
            </p>
            <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
              Address selects where. Data tells what. Control decides read or write.
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="text-base font-bold text-slate-950">1. Memory Organization</h3>
            <p>
              A memory is usually described as number of locations multiplied by word
              size. For example, 1024 x 8 memory has 1024 addressable locations, and each
              location stores 8 bits.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. RAM</h3>
            <p>
              RAM means Random Access Memory. Any location can be read or written using
              its address. RAM is usually volatile, meaning data is lost when power is
              removed.
            </p>
            <h3 className="text-base font-bold text-slate-950">3. SRAM and DRAM</h3>
            <p>
              SRAM stores data using flip-flop-like latch cells. It is fast but uses more
              transistors per bit. DRAM stores data as charge on a capacitor. It is dense
              and cheaper per bit but needs periodic refresh.
            </p>
            <h3 className="text-base font-bold text-slate-950">4. ROM</h3>
            <p>
              ROM means Read Only Memory. It stores permanent or semi-permanent
              information such as firmware, boot code, and lookup tables. PROM, EPROM,
              and EEPROM differ in how they are programmed and erased.
            </p>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="text-base font-bold text-slate-950">1. Address Lines and Locations</h3>
            <p>{"If memory has $$ n $$ address lines, each address line can be 0 or 1."}</p>
            <p>{"$$ \\text{Number of locations}=2^n $$"}</p>
            <p>
              Physical meaning: every additional address pin doubles the number of
              uniquely selectable memory locations.
            </p>
            <h3 className="text-base font-bold text-slate-950">2. Memory Capacity</h3>
            <p>{"If each location stores $$ m $$ bits:"}</p>
            <p>{"$$ \\text{Capacity}=2^n \\times m\\text{ bits} $$"}</p>
            <p>
              This means capacity depends on both how many locations exist and how wide
              each stored word is.
            </p>
            <h3 className="text-base font-bold text-slate-950">3. Bytes</h3>
            <p>{"Since $$ 1\\text{ byte}=8\\text{ bits} $$, total bytes are:"}</p>
            <p>{"$$ \\text{Capacity in bytes}=\\frac{2^n \\times m}{8} $$"}</p>
          </TopicSection>

          <TopicSection title="Working Principle">
            <ol className="grid gap-2">
              <li>Processor places address on the address bus.</li>
              <li>Address decoder selects one memory row or location.</li>
              <li>Control lines choose read or write operation.</li>
              <li>For read, selected cell drives data onto the data bus.</li>
              <li>For write, data bus value is stored into the selected cell.</li>
              <li>Timing parameters decide when data becomes valid and when it must be stable.</li>
            </ol>
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <MemoryAnimation />
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Memory Array Architecture Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">SRAM Cell Circuit Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">DRAM Cell and Refresh Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Read/Write Timing Diagram Here</div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="grid gap-3 lg:grid-cols-2">
              <FormulaCard title="Addressable locations" formula={"$$ 2^n $$"}>With n address lines, memory can select $$ 2^n $$ unique locations.</FormulaCard>
              <FormulaCard title="Memory capacity" formula={"$$ C=2^n \\times m\\text{ bits} $$"}>Here m is word size in bits. Capacity depends on location count and word width.</FormulaCard>
              <FormulaCard title="Byte conversion" formula={"$$ 1\\text{ byte}=8\\text{ bits} $$"}>Use this to convert memory capacity from bits to bytes.</FormulaCard>
              <FormulaCard title="DRAM refresh idea" formula={"$$ Q=CV $$"}>DRAM stores a bit as capacitor charge; leakage reduces charge, so refresh is required.</FormulaCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Program storage in microcontrollers</li>
              <li>RAM in computers and phones</li>
              <li>Cache memory in processors</li>
              <li>Firmware storage using EEPROM or flash</li>
              <li>Lookup tables in DSP and control systems</li>
              <li>Frame buffers in display systems</li>
              <li>Configuration memory in FPGAs</li>
              <li>Data logging in embedded instruments</li>
            </ul>
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
            <p>{"How many locations are addressed by 10 address lines?"}</p>
            <p>{"$$ 2^{10}=1024 $$ locations."}</p>

            <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
            <p>{"Find capacity of memory with 12 address lines and 8-bit word size."}</p>
            <p>{"Locations $$ =2^{12}=4096 $$."}</p>
            <p>{"Capacity $$ =4096\\times8=32768 $$ bits $$ =4096 $$ bytes $$ =4KB $$."}</p>

            <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
            <p>{"A memory is organized as $$ 16K \\times 16 $$. Find address lines and capacity in bytes."}</p>
            <p>{"$$ 16K=16\\times1024=16384=2^{14} $$, so 14 address lines are needed."}</p>
            <p>{"Capacity $$ =16K\\times16 $$ bits $$ =32KB $$."}</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <ul className="grid gap-2">
              <li>Confusing address lines with data lines.</li>
              <li>Forgetting to multiply number of locations by word size.</li>
              <li>Mixing bits and bytes during capacity calculation.</li>
              <li>Assuming all RAM is DRAM or all ROM is permanently unchangeable.</li>
              <li>Forgetting that DRAM needs refresh but SRAM does not.</li>
              <li>Ignoring access time in high-speed memory questions.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-950">
                  <th className="py-2 pr-3">Memory</th>
                  <th className="py-2 pr-3">Volatile?</th>
                  <th className="py-2 pr-3">Speed</th>
                  <th className="py-2 pr-3">Typical Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">SRAM</td><td className="py-2 pr-3">Yes</td><td className="py-2 pr-3">Very fast</td><td className="py-2 pr-3">Cache</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">DRAM</td><td className="py-2 pr-3">Yes</td><td className="py-2 pr-3">Moderate</td><td className="py-2 pr-3">Main memory</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">ROM</td><td className="py-2 pr-3">No</td><td className="py-2 pr-3">Read-focused</td><td className="py-2 pr-3">Firmware</td></tr>
                <tr><td className="py-2 pr-3">EEPROM</td><td className="py-2 pr-3">No</td><td className="py-2 pr-3">Slower write</td><td className="py-2 pr-3">Configuration data</td></tr>
              </tbody>
            </table>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <ul className="grid gap-2">
              <li>What is the difference between RAM and ROM?</li>
              <li>Why does DRAM need refresh?</li>
              <li>Why is SRAM faster than DRAM?</li>
              <li>What is the role of address lines?</li>
              <li>What is word size in memory organization?</li>
              <li>How do you calculate memory capacity?</li>
              <li>Where is EEPROM used?</li>
            </ul>
          </TopicSection>

          <TopicSection title="Exam-Oriented Notes">
            <ul className="grid gap-2">
              <li>Address lines decide number of locations, not word size.</li>
              <li>Data lines usually match word size.</li>
              <li>SRAM uses more area but is faster; DRAM is denser but needs refresh.</li>
              <li>ROM is non-volatile; RAM is generally volatile.</li>
              <li>Always convert bits to bytes carefully by dividing by 8.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Revision Summary">
            <ul className="grid gap-2">
              <li>Memory stores binary information at addressable locations.</li>
              <li>Address bus selects location; data bus carries information.</li>
              <li>RAM is read/write and usually volatile.</li>
              <li>ROM is non-volatile and stores permanent or semi-permanent data.</li>
              <li>{"Key formulas: locations $$ =2^n $$ and capacity $$ =2^n\\times m $$ bits."}</li>
            </ul>
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
            <ul className="grid gap-2">
              <li>Explain address bus and data bus using a memory example.</li>
              <li>Compare SRAM and DRAM physically.</li>
              <li>Why is ROM used for boot code?</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">Numerical</h3>
            <ul className="grid gap-2">
              <li>{"Find locations for 15 address lines."}</li>
              <li>{"Find capacity of $$ 8K\\times8 $$ memory in bytes."}</li>
              <li>{"How many address lines are required for 64K locations?"}</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">MCQs</h3>
            <ul className="grid gap-2">
              <li>Which memory needs refresh: SRAM or DRAM?</li>
              <li>Which bus selects memory location?</li>
              <li>How many bits are in one byte?</li>
            </ul>
          </TopicSection>

          <div className="flex justify-end">
            <Link href="/analog-to-digital-and-digital-to-analog-converters" className="inline-flex w-full justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto">
              Next Analog to Digital and Digital to Analog Converters
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
