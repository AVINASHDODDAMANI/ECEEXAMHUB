import { useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import NetworkTopicMenu from "../components/NetworkTopicMenu";

const parameterCards = [
  {
    title: "Z-parameters",
    subtitle: "Impedance form",
    tone: "border-sky-200 bg-sky-50/75",
    equations: ["V1 = Z11 I1 + Z12 I2", "V2 = Z21 I1 + Z22 I2"],
    note: "Best when open-circuit conditions are convenient.",
  },
  {
    title: "Y-parameters",
    subtitle: "Admittance form",
    tone: "border-emerald-200 bg-emerald-50/75",
    equations: ["I1 = Y11 V1 + Y12 V2", "I2 = Y21 V1 + Y22 V2"],
    note: "Best when short-circuit conditions are convenient.",
  },
  {
    title: "h-parameters",
    subtitle: "Hybrid form",
    tone: "border-amber-200 bg-amber-50/75",
    equations: ["V1 = h11 I1 + h12 V2", "I2 = h21 I1 + h22 V2"],
    note: "Very common in transistor modeling.",
  },
  {
    title: "ABCD parameters",
    subtitle: "Transmission form",
    tone: "border-rose-200 bg-rose-50/75",
    equations: ["V1 = A V2 + B I2", "I1 = C V2 + D I2"],
    note: "Very strong for cascaded networks and transmission lines.",
  },
];

function FormulaBox({ children, tone = "blue" }) {
  const tones = {
    blue: "border-sky-200 bg-sky-50/90 text-slate-950",
    amber: "border-amber-200 bg-amber-50/90 text-amber-950",
    teal: "border-teal-200 bg-teal-50/90 text-slate-950",
    rose: "border-rose-200 bg-rose-50/90 text-slate-950",
  };

  return (
    <p className={`mt-3 rounded-xl border px-4 py-3 font-mono text-sm font-bold leading-6 sm:text-base ${tones[tone]}`}>
      {children}
    </p>
  );
}

function BulletList({ items, bulletClassName = "bg-sky-600" }) {
  return (
    <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className={`mt-2.5 h-1.5 w-1.5 flex-none rounded-full ${bulletClassName}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ConceptCard({ title, children, accent = "border-slate-200 bg-white" }) {
  return (
    <article className={`rounded-2xl border p-4 shadow-sm sm:p-5 ${accent}`}>
      <h2 className="text-xl font-bold tracking-tight text-slate-950">{title}</h2>
      {children}
    </article>
  );
}

function MiniCard({ title, children, accent = "border-slate-200 bg-slate-50/80" }) {
  return (
    <div className={`rounded-xl border p-4 ${accent}`}>
      <h3 className="text-base font-bold text-slate-950">{title}</h3>
      {children}
    </div>
  );
}

function SignalFlowAnimator() {
  const [mode, setMode] = useState("ports");

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#fff8f1,#f8fbff)] p-4">
      <div className="flex flex-wrap gap-2">
        {[
          ["ports", "Port View"],
          ["z", "Z Model"],
          ["cascade", "Cascade View"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              mode === key
                ? "bg-fuchsia-700 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <svg viewBox="0 0 560 300" role="img" aria-label="Animated two-port network explanation" className="h-auto w-full">
            <rect width="560" height="300" fill="#ffffff" />

            {mode === "ports" ? (
              <>
                <line x1="70" y1="92" x2="70" y2="208" stroke="#0f172a" strokeWidth="4" />
                <line x1="490" y1="92" x2="490" y2="208" stroke="#0f172a" strokeWidth="4" />
                <rect x="178" y="72" width="204" height="156" rx="24" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
                <text x="280" y="120" textAnchor="middle" className="fill-slate-950 text-[22px] font-black">Two-Port</text>
                <text x="280" y="148" textAnchor="middle" className="fill-slate-500 text-[14px] font-bold">internal network hidden</text>
                <text x="70" y="82" textAnchor="middle" className="fill-sky-700 text-[14px] font-black">Port 1</text>
                <text x="490" y="82" textAnchor="middle" className="fill-emerald-700 text-[14px] font-black">Port 2</text>
                <text x="54" y="118" className="fill-sky-700 text-[13px] font-black">V1</text>
                <text x="54" y="194" className="fill-sky-700 text-[13px] font-black">I1 in</text>
                <text x="502" y="118" className="fill-emerald-700 text-[13px] font-black">V2</text>
                <text x="502" y="194" className="fill-emerald-700 text-[13px] font-black">I2 in</text>
                <circle r="6" fill="#0ea5e9">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M70,150 L178,150" />
                </circle>
                <circle r="6" fill="#10b981">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M490,150 L382,150" />
                </circle>
              </>
            ) : null}

            {mode === "z" ? (
              <>
                <rect x="96" y="64" width="368" height="172" rx="24" fill="#eff6ff" stroke="#93c5fd" strokeWidth="3" />
                <text x="280" y="104" textAnchor="middle" className="fill-slate-950 text-[22px] font-black">Z-parameter model</text>
                <text x="280" y="138" textAnchor="middle" className="fill-sky-700 text-[16px] font-black">V1 = Z11 I1 + Z12 I2</text>
                <text x="280" y="170" textAnchor="middle" className="fill-sky-700 text-[16px] font-black">V2 = Z21 I1 + Z22 I2</text>
                <text x="280" y="204" textAnchor="middle" className="fill-slate-600 text-[13px] font-bold">open-circuit conditions reveal the coefficients</text>
              </>
            ) : null}

            {mode === "cascade" ? (
              <>
                <rect x="58" y="92" width="118" height="112" rx="20" fill="#fdf2f8" stroke="#f9a8d4" strokeWidth="3" />
                <rect x="220" y="92" width="118" height="112" rx="20" fill="#ecfeff" stroke="#67e8f9" strokeWidth="3" />
                <rect x="382" y="92" width="118" height="112" rx="20" fill="#fef3c7" stroke="#fcd34d" strokeWidth="3" />
                <text x="117" y="152" textAnchor="middle" className="fill-fuchsia-700 text-[18px] font-black">N1</text>
                <text x="279" y="152" textAnchor="middle" className="fill-cyan-700 text-[18px] font-black">N2</text>
                <text x="441" y="152" textAnchor="middle" className="fill-amber-700 text-[18px] font-black">N3</text>
                <path d="M176 148H220M338 148H382" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" markerEnd="url(#tpArrow)" />
                <text x="280" y="56" textAnchor="middle" className="fill-slate-950 text-[20px] font-black">Cascade chain</text>
                <text x="280" y="238" textAnchor="middle" className="fill-slate-700 text-[14px] font-bold">[ABCD]total = [ABCD]1 x [ABCD]2 x [ABCD]3</text>
                <circle r="6" fill="#ec4899">
                  <animateMotion dur="2.8s" repeatCount="indefinite" path="M58,148 L500,148" />
                </circle>
              </>
            ) : null}

            <defs>
              <marker id="tpArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0 0L8 4L0 8Z" fill="#0f172a" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-fuchsia-700">Animated explanation</p>
          <h3 className="mt-2 text-xl font-bold text-slate-950">Input to output thinking</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            A two-port model lets us stop tracking every internal branch and focus on how the input
            variables and output variables are related. That is exactly why it is so useful for amplifiers,
            filters, and cascaded signal blocks.
          </p>
          <BulletList
            bulletClassName="bg-fuchsia-600"
            items={[
              "Port 1 carries the input variables V1 and I1.",
              "Port 2 carries the output variables V2 and I2.",
              "Different parameter sets express the same physical network in different convenient forms.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function ParameterFamilyPanel() {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {parameterCards.map((card) => (
        <MiniCard key={card.title} title={card.title} accent={card.tone}>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">{card.subtitle}</p>
          {card.equations.map((equation) => (
            <FormulaBox key={equation} tone="blue">{equation}</FormulaBox>
          ))}
          <p className="mt-3 text-sm leading-6 text-slate-700">{card.note}</p>
        </MiniCard>
      ))}
    </div>
  );
}

function ZParameterDerivationPanel() {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#eff6ff,#ffffff)] p-4">
          <h3 className="text-lg font-bold text-slate-950">Open-circuit method</h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            Z-parameters are extracted by opening one port current at a time. That removes one current
            term and lets each coefficient appear directly as a ratio.
          </p>
          <FormulaBox tone="blue">I2 = 0 gives Z11 = V1 / I1 and Z21 = V2 / I1</FormulaBox>
          <FormulaBox tone="teal">I1 = 0 gives Z22 = V2 / I2 and Z12 = V1 / I2</FormulaBox>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#fff7ed,#ffffff)]">
          <svg viewBox="0 0 460 260" role="img" aria-label="Z-parameter derivation animation" className="h-auto w-full">
            <rect width="460" height="260" fill="transparent" />
            <line x1="62" y1="90" x2="62" y2="192" stroke="#0f172a" strokeWidth="4" />
            <line x1="398" y1="90" x2="398" y2="192" stroke="#0f172a" strokeWidth="4" />
            <rect x="148" y="74" width="164" height="132" rx="22" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
            <text x="230" y="121" textAnchor="middle" className="fill-slate-950 text-[20px] font-black">Z block</text>
            <text x="230" y="148" textAnchor="middle" className="fill-slate-500 text-[13px] font-bold">open one current, solve one ratio</text>
            <text x="42" y="126" className="fill-sky-700 text-[12px] font-black">I1</text>
            <text x="406" y="126" className="fill-rose-700 text-[12px] font-black">I2 = 0</text>
            <line x1="408" y1="108" x2="432" y2="132" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" />
            <line x1="432" y1="108" x2="408" y2="132" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" />
            <circle r="6" fill="#0ea5e9">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M62,142 L148,142" />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function TwoPortNetworksPage() {
  return (
    <Layout title="ECE Exam Guide | Two-Port Networks" pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1440px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-fuchsia-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-fuchsia-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/network-analysis" className="font-medium text-slate-600 transition hover:text-fuchsia-700">Network Analysis</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-fuchsia-50 px-3 py-1 font-semibold text-fuchsia-700">Two-Port Networks</span></li>
          </ol>
          <NetworkTopicMenu currentPath="/two-port-networks" />
        </nav>

        <section className="rounded-[30px] border border-fuchsia-200 bg-[linear-gradient(135deg,rgba(253,242,248,0.98),rgba(239,246,255,0.96))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-fuchsia-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-fuchsia-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Two-Port Networks - Complete Step-by-Step Guide
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Two-port networks describe a four-terminal circuit by relating input and output variables.
            Instead of solving the full internal network every time, we summarize how signals pass from
            one port to another using parameter equations.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          <ConceptCard title="1. What is a Two-Port Network?" accent="border-fuchsia-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A two-port network has two terminals at the input and two terminals at the output.
              It is a four-terminal block used to describe how the input side and output side are related.
            </p>
            <p className="mt-3 rounded-xl border border-fuchsia-200 bg-fuchsia-50 px-4 py-3 text-sm font-bold leading-7 text-fuchsia-950 sm:text-base">
              Key idea: instead of analyzing the whole internal circuit every time, we express the network using V1, I1, V2, and I2.
            </p>
            <SignalFlowAnimator />
          </ConceptCard>

          <ConceptCard title="2. Port Variables" accent="border-sky-200 bg-white">
            <BulletList
              items={[
                "V1 and I1 are the input-port voltage and current.",
                "V2 and I2 are the output-port voltage and current.",
                "By convention, port currents are usually taken as entering the network terminals.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="3. Why Two-Port Networks?" accent="border-amber-200 bg-white">
            <BulletList
              bulletClassName="bg-amber-500"
              items={[
                "They simplify large circuits into compact input-output models.",
                "They are widely used to model amplifiers and filters.",
                "They make cascaded network analysis easier.",
                "They help compare signal transfer behavior without redrawing the internal circuit each time.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="4. Types of Two-Port Parameters" accent="border-slate-200 bg-white">
            <ParameterFamilyPanel />
          </ConceptCard>

          <ConceptCard title="5. Z-Parameters in Detail" accent="border-sky-200 bg-white">
            <FormulaBox tone="blue">V1 = Z11 I1 + Z12 I2</FormulaBox>
            <FormulaBox tone="blue">V2 = Z21 I1 + Z22 I2</FormulaBox>
            <BulletList
              items={[
                "Z11 is the driving-point input impedance.",
                "Z22 is the driving-point output impedance.",
                "Z12 and Z21 capture how one port influences the other port.",
              ]}
            />
            <ZParameterDerivationPanel />
          </ConceptCard>

          <ConceptCard title="6. Y-Parameters" accent="border-emerald-200 bg-white">
            <FormulaBox tone="teal">I1 = Y11 V1 + Y12 V2</FormulaBox>
            <FormulaBox tone="teal">I2 = Y21 V1 + Y22 V2</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Y-parameters are admittance parameters, so they are naturally found under short-circuit conditions.
            </p>
          </ConceptCard>

          <ConceptCard title="7. h-Parameters" accent="border-amber-200 bg-white">
            <FormulaBox tone="amber">V1 = h11 I1 + h12 V2</FormulaBox>
            <FormulaBox tone="amber">I2 = h21 I1 + h22 V2</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Hybrid parameters mix voltage and current variables. They are especially useful in transistor small-signal models.
            </p>
          </ConceptCard>

          <ConceptCard title="8. ABCD Parameters" accent="border-rose-200 bg-white">
            <FormulaBox tone="rose">V1 = A V2 + B I2</FormulaBox>
            <FormulaBox tone="rose">I1 = C V2 + D I2</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              ABCD parameters, also called transmission parameters, are extremely useful when networks are cascaded one after another.
            </p>
          </ConceptCard>

          <ConceptCard title="9. Matrix Representation" accent="border-slate-200 bg-white">
            <FormulaBox tone="blue">[V] = [Z][I]</FormulaBox>
            <FormulaBox tone="teal">[I] = [Y][V]</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Matrix form makes the relationships compact and is the preferred language for derivation, conversion, and computer-based analysis.
            </p>
          </ConceptCard>

          <ConceptCard title="10. Reciprocity and Symmetry" accent="border-sky-200 bg-white">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Reciprocity" accent="border-sky-200 bg-sky-50/75">
                <FormulaBox tone="blue">Z12 = Z21</FormulaBox>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Reciprocity means the transfer behavior is the same in either direction under the correct conditions.
                </p>
              </MiniCard>
              <MiniCard title="Symmetry" accent="border-emerald-200 bg-emerald-50/75">
                <FormulaBox tone="teal">Z11 = Z22</FormulaBox>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Symmetry means the network looks electrically similar from both ports.
                </p>
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="11. Conversion Between Parameters" accent="border-amber-200 bg-white">
            <FormulaBox tone="amber">[Y] = [Z]^-1</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Parameter conversion is common in exam problems because one form may be easy to measure while another form may be easier to use in the next calculation.
            </p>
          </ConceptCard>

          <ConceptCard title="12. Cascade Connection" accent="border-fuchsia-200 bg-white">
            <FormulaBox tone="rose">[ABCD]total = [ABCD]1 x [ABCD]2</FormulaBox>
            <BulletList
              bulletClassName="bg-fuchsia-600"
              items={[
                "Transmission parameters multiply directly in cascade order.",
                "This is why ABCD form is preferred for chained network blocks.",
                "Amplifier stages and transmission sections are often handled this way.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="13. Practical Applications" accent="border-slate-200 bg-white">
            <BulletList
              items={[
                "Amplifiers",
                "Filters",
                "Communication systems",
                "Transmission lines",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="14. Common Mistakes" accent="border-rose-200 bg-white">
            <BulletList
              bulletClassName="bg-rose-500"
              items={[
                "Using the wrong sign convention for port currents.",
                "Confusing open-circuit and short-circuit extraction conditions.",
                "Mixing Z, Y, h, and ABCD formulas in the same derivation without conversion.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="15. Final Summary" accent="border-fuchsia-200 bg-white">
            <p className="mt-2 rounded-xl border border-fuchsia-200 bg-fuchsia-50 px-4 py-3 text-sm font-bold leading-7 text-fuchsia-950 sm:text-base">
              Two-port networks provide a systematic input-output description for complex circuits by relating
              port voltages and currents through parameter matrices, making transfer analysis, conversion,
              and cascade design much more manageable.
            </p>
          </ConceptCard>
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/frequency-domain-analysis"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Frequency Domain Analysis
          </Link>
          <Link
            href="/filters"
            className="inline-flex justify-center rounded-xl bg-fuchsia-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-fuchsia-800"
          >
            Next Filters
          </Link>
        </div>
      </div>
    </Layout>
  );
}
