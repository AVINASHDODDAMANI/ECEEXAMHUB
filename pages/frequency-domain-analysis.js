import { useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import NetworkTopicMenu from "../components/NetworkTopicMenu";

const filterCards = [
  {
    title: "Low-pass filter",
    note: "Passes low frequencies and attenuates high frequencies.",
    tone: "border-sky-200 bg-sky-50/70",
  },
  {
    title: "High-pass filter",
    note: "Blocks low frequencies and passes high frequencies.",
    tone: "border-emerald-200 bg-emerald-50/70",
  },
  {
    title: "Band-pass filter",
    note: "Passes a band around a chosen center frequency.",
    tone: "border-amber-200 bg-amber-50/70",
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

function PhasorAnimator() {
  const [mode, setMode] = useState("signal");
  const isSignal = mode === "signal";

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#fffdf5,#f8fbff)] p-4">
      <div className="flex flex-wrap gap-2">
        {[
          ["signal", "Signal View"],
          ["phasor", "Phasor View"],
          ["impedance", "Impedance View"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              mode === key
                ? "bg-cyan-700 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <svg viewBox="0 0 540 300" role="img" aria-label="Frequency domain animated explanation" className="h-auto w-full">
            <rect width="540" height="300" fill="#ffffff" />
            {isSignal ? (
              <>
                <line x1="42" y1="220" x2="250" y2="220" stroke="#475569" strokeWidth="2.5" />
                <line x1="42" y1="220" x2="42" y2="68" stroke="#475569" strokeWidth="2.5" />
                <path d="M42 164 C60 112 78 112 96 164 C114 216 132 216 150 164 C168 112 186 112 204 164 C222 216 240 216 250 188" fill="none" stroke="#0891b2" strokeWidth="5" strokeLinecap="round" />
                <text x="120" y="40" textAnchor="middle" className="fill-slate-900 text-[18px] font-black">Time signal</text>
                <circle r="6" fill="#f97316">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M42,164 C60,112 78,112 96,164 C114,216 132,216 150,164 C168,112 186,112 204,164 C222,216 240,216 250,188" />
                </circle>
              </>
            ) : null}

            {mode === "phasor" ? (
              <>
                <circle cx="152" cy="156" r="72" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
                <line x1="152" y1="156" x2="220" y2="110" stroke="#0f766e" strokeWidth="5" strokeLinecap="round" />
                <circle cx="220" cy="110" r="6" fill="#0f766e" />
                <path d="M152 156 A34 34 0 0 1 183 128" fill="none" stroke="#f59e0b" strokeWidth="3" />
                <text x="193" y="125" className="fill-amber-700 text-[12px] font-black">theta</text>
                <text x="152" y="40" textAnchor="middle" className="fill-slate-900 text-[18px] font-black">Phasor</text>
                <text x="210" y="100" className="fill-teal-700 text-[12px] font-black">V = Vm angle theta</text>
                <circle r="5" fill="#14b8a6">
                  <animateTransform attributeName="transform" type="rotate" from="0 152 156" to="360 152 156" dur="5s" repeatCount="indefinite" />
                  <animateMotion dur="5s" repeatCount="indefinite" path="M220,110 A72,72 0 1,1 219.9,110" />
                </circle>
              </>
            ) : null}

            {mode === "impedance" ? (
              <>
                <rect x="56" y="92" width="192" height="120" rx="20" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2.5" />
                <text x="152" y="122" textAnchor="middle" className="fill-slate-900 text-[18px] font-black">Impedance</text>
                <text x="152" y="154" textAnchor="middle" className="fill-sky-700 text-[16px] font-black">ZR = R</text>
                <text x="152" y="178" textAnchor="middle" className="fill-emerald-700 text-[16px] font-black">ZL = j omega L</text>
                <text x="152" y="202" textAnchor="middle" className="fill-rose-700 text-[16px] font-black">ZC = 1 / j omega C</text>
              </>
            ) : null}

            <path d="M268 150H330" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" markerEnd="url(#fdArrow)" />
            <text x="300" y="136" textAnchor="middle" className="fill-slate-700 text-[12px] font-black">frequency domain</text>

            <rect x="350" y="58" width="150" height="184" rx="22" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2.5" />
            <text x="425" y="88" textAnchor="middle" className="fill-slate-950 text-[18px] font-black">What changes?</text>
            <text x="425" y="122" textAnchor="middle" className="fill-cyan-700 text-[13px] font-black">magnitude</text>
            <text x="425" y="146" textAnchor="middle" className="fill-amber-700 text-[13px] font-black">phase</text>
            <text x="425" y="170" textAnchor="middle" className="fill-emerald-700 text-[13px] font-black">impedance</text>
            <text x="425" y="194" textAnchor="middle" className="fill-rose-700 text-[13px] font-black">resonance</text>
            <text x="425" y="218" textAnchor="middle" className="fill-violet-700 text-[13px] font-black">filter response</text>
            <defs>
              <marker id="fdArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0 0L8 4L0 8Z" fill="#0f172a" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">Animated explanation</p>
          <h3 className="mt-2 text-xl font-bold text-slate-950">How the viewpoint changes</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            In time domain we follow waveform shape directly. In frequency domain we ask
            how strongly the circuit responds at each frequency and how much phase shift appears.
          </p>
          <BulletList
            bulletClassName="bg-cyan-600"
            items={[
              "Sinusoids are the foundation of the method.",
              "Phasors replace calculus with algebra.",
              "Impedance tells how each element reacts to frequency.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function ResonancePanel() {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#eff6ff,#ffffff)] p-4">
          <h3 className="text-lg font-bold text-slate-950">Series RLC in frequency domain</h3>
          <FormulaBox tone="blue">Z = R + j omega L + 1 / j omega C</FormulaBox>
          <FormulaBox tone="teal">I = V / Z</FormulaBox>
          <FormulaBox tone="amber">|Z| = sqrt(R^2 + (XL - XC)^2)</FormulaBox>
          <BulletList
            items={[
              "XL = omega L increases with frequency.",
              "XC = 1 / omega C decreases with frequency.",
              "Resonance happens when XL and XC become equal.",
            ]}
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#fff7ed,#ffffff)]">
          <svg viewBox="0 0 460 280" role="img" aria-label="Resonance curve animation" className="h-auto w-full">
            <rect width="460" height="280" fill="transparent" />
            <line x1="54" y1="220" x2="418" y2="220" stroke="#475569" strokeWidth="2.5" />
            <line x1="54" y1="220" x2="54" y2="48" stroke="#475569" strokeWidth="2.5" />
            <text x="424" y="240" className="fill-slate-500 text-[12px] font-bold">frequency</text>
            <text x="18" y="60" className="fill-slate-500 text-[12px] font-bold">current</text>
            <path d="M54 214 C110 210 138 186 178 126 C206 84 230 64 250 58 C270 64 294 84 322 126 C362 186 390 210 418 214" fill="none" stroke="#ea580c" strokeWidth="5" strokeLinecap="round" />
            <line x1="250" y1="220" x2="250" y2="58" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="8 8" />
            <text x="257" y="80" className="fill-sky-700 text-[12px] font-black">resonance peak</text>
            <text x="258" y="238" className="fill-sky-700 text-[12px] font-black">omega0</text>
            <circle r="6" fill="#f97316">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M54,214 C110,210 138,186 178,126 C206,84 230,64 250,58 C270,64 294,84 322,126 C362,186 390,210 418,214" />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
}

function FilterResponsePanel() {
  const [mode, setMode] = useState("low");

  const modeMap = {
    low: {
      color: "#0284c7",
      path: "M48 92 C110 92 130 96 164 106 C216 121 252 138 310 164 C346 180 388 197 430 210",
      label: "Low-pass",
    },
    high: {
      color: "#059669",
      path: "M48 210 C96 200 128 184 174 160 C226 132 280 108 338 96 C372 90 402 88 430 88",
      label: "High-pass",
    },
    band: {
      color: "#d97706",
      path: "M48 212 C112 210 144 172 188 124 C216 94 250 78 276 78 C302 78 336 94 364 124 C392 154 412 182 430 204",
      label: "Band-pass",
    },
  };

  const active = modeMap[mode];

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap gap-2">
        {[
          ["low", "Low-pass"],
          ["high", "High-pass"],
          ["band", "Band-pass"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              mode === key
                ? "bg-slate-900 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#f8fafc,#ffffff)]">
          <svg viewBox="0 0 460 270" role="img" aria-label="Frequency response animation" className="h-auto w-full">
            <rect width="460" height="270" fill="transparent" />
            <line x1="48" y1="220" x2="430" y2="220" stroke="#475569" strokeWidth="2.5" />
            <line x1="48" y1="220" x2="48" y2="48" stroke="#475569" strokeWidth="2.5" />
            <text x="434" y="240" className="fill-slate-500 text-[12px] font-bold">frequency</text>
            <text x="16" y="60" className="fill-slate-500 text-[12px] font-bold">gain</text>
            <path d={active.path} fill="none" stroke={active.color} strokeWidth="5" strokeLinecap="round" />
            <text x="326" y="74" className="fill-slate-900 text-[14px] font-black">{active.label}</text>
            <circle r="6" fill={active.color}>
              <animateMotion dur="2.2s" repeatCount="indefinite" path={active.path} />
            </circle>
          </svg>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-lg font-bold text-slate-950">Frequency response</h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            Frequency response tells us how the output magnitude changes as input frequency changes.
          </p>
          <div className="mt-4 grid gap-3">
            {filterCards.map((card) => (
              <MiniCard key={card.title} title={card.title} accent={card.tone}>
                <p className="mt-2 text-sm leading-6 text-slate-700">{card.note}</p>
              </MiniCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FrequencyDomainAnalysisPage() {
  return (
    <Layout title="ECE Exam Guide | Frequency Domain Analysis" pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1440px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-cyan-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-cyan-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/network-analysis" className="font-medium text-slate-600 transition hover:text-cyan-700">Network Analysis</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-cyan-50 px-3 py-1 font-semibold text-cyan-700">Frequency Domain Analysis</span></li>
          </ol>
          <NetworkTopicMenu currentPath="/frequency-domain-analysis" />
        </nav>

        <section className="rounded-[30px] border border-cyan-200 bg-[linear-gradient(135deg,rgba(236,254,255,0.98),rgba(255,247,237,0.96))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-cyan-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Frequency Domain Analysis - Complete Step-by-Step Guide
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Frequency domain analysis studies how a circuit responds when frequency changes.
            Instead of watching voltage and current only in time, we study magnitude, phase,
            impedance, resonance, and filter behavior across frequency.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          <ConceptCard title="1. What is Frequency Domain Analysis?" accent="border-cyan-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Frequency domain analysis examines a circuit using sinusoidal excitation and asks
              how the circuit behaves at each frequency. The response is described with magnitude,
              phase, and impedance instead of only raw time variation.
            </p>
            <p className="mt-3 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-bold leading-7 text-cyan-950 sm:text-base">
              Key idea: any time-varying signal can be built from sinusoids, and a circuit reacts differently to each sinusoidal frequency.
            </p>
          </ConceptCard>

          <ConceptCard title="2. Why Frequency Domain?" accent="border-amber-200 bg-white">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Time domain" accent="border-rose-200 bg-rose-50/70">
                <BulletList
                  bulletClassName="bg-rose-500"
                  items={[
                    "Differential equations become lengthy.",
                    "Phase relationships are harder to see directly.",
                    "Frequency-selective behavior is not obvious.",
                  ]}
                />
              </MiniCard>
              <MiniCard title="Frequency domain" accent="border-emerald-200 bg-emerald-50/70">
                <BulletList
                  bulletClassName="bg-emerald-500"
                  items={[
                    "Differential equations become algebraic.",
                    "Phase and magnitude are visible immediately.",
                    "Filters and resonance are much easier to understand.",
                  ]}
                />
              </MiniCard>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-900">Used in:</p>
            <BulletList items={["AC circuit analysis", "Filters", "Communication systems", "Signal processing"]} />
          </ConceptCard>

          <ConceptCard title="3. Sinusoidal Signals and Phasors" accent="border-sky-200 bg-white">
            <FormulaBox tone="blue">v(t) = Vm sin(omega t + theta)</FormulaBox>
            <BulletList
              items={[
                "Vm is the amplitude.",
                "omega = 2 pi f is the angular frequency.",
                "theta is the phase angle.",
              ]}
            />
            <PhasorAnimator />
          </ConceptCard>

          <ConceptCard title="4. Impedance: The Core Concept" accent="border-slate-200 bg-white">
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Resistor" accent="border-sky-200 bg-sky-50/70">
                <FormulaBox tone="blue">ZR = R</FormulaBox>
              </MiniCard>
              <MiniCard title="Inductor" accent="border-emerald-200 bg-emerald-50/70">
                <FormulaBox tone="teal">ZL = j omega L</FormulaBox>
              </MiniCard>
              <MiniCard title="Capacitor" accent="border-rose-200 bg-rose-50/70">
                <FormulaBox tone="rose">ZC = 1 / j omega C</FormulaBox>
              </MiniCard>
            </div>
            <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold leading-7 text-slate-900 sm:text-base">
              Insight: inductive impedance grows with frequency, while capacitive impedance falls with frequency.
            </p>
          </ConceptCard>

          <ConceptCard title="5. Circuit in Frequency Domain" accent="border-cyan-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              In frequency domain, reactive elements are replaced by their impedances. That lets us
              solve the circuit using the same familiar laws, but with complex quantities.
            </p>
            <BulletList items={["Replace L by j omega L.", "Replace C by 1 / j omega C.", "Keep R unchanged."]} />
          </ConceptCard>

          <ConceptCard title="6. Ohm's Law and Kirchhoff's Laws" accent="border-amber-200 bg-white">
            <FormulaBox tone="amber">V = IZ</FormulaBox>
            <BulletList
              bulletClassName="bg-amber-500"
              items={[
                "Ohm's law keeps the same form.",
                "KCL still applies at every node.",
                "KVL still applies around every loop.",
                "The difference is that the quantities are complex numbers or phasors.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="7. RLC Series Circuit Analysis" accent="border-sky-200 bg-white">
            <ResonancePanel />
          </ConceptCard>

          <ConceptCard title="8. Resonance" accent="border-orange-200 bg-white">
            <FormulaBox tone="amber">XL = XC</FormulaBox>
            <FormulaBox tone="teal">omega0 = 1 / sqrt(LC)</FormulaBox>
            <BulletList
              bulletClassName="bg-orange-500"
              items={[
                "At resonance, impedance becomes purely resistive.",
                "The current reaches its maximum value in a series RLC circuit.",
                "The power factor becomes 1.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="9. Power in AC Circuits" accent="border-slate-200 bg-white">
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Instantaneous power" accent="border-slate-200 bg-slate-50/80">
                <FormulaBox tone="blue">p(t) = v(t)i(t)</FormulaBox>
              </MiniCard>
              <MiniCard title="Average power" accent="border-emerald-200 bg-emerald-50/70">
                <FormulaBox tone="teal">P = VI cos theta</FormulaBox>
              </MiniCard>
              <MiniCard title="Power factor" accent="border-amber-200 bg-amber-50/70">
                <FormulaBox tone="amber">cos theta = R / Z</FormulaBox>
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="10. Frequency Response" accent="border-cyan-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Frequency response tells how output changes as frequency changes. This is the language
              of filters, bandwidth, resonance, and many signal-processing systems.
            </p>
            <FilterResponsePanel />
          </ConceptCard>

          <ConceptCard title="11. Physical Interpretation" accent="border-slate-200 bg-white">
            <BulletList
              items={[
                "At low frequency, a capacitor behaves closer to an open circuit.",
                "At low frequency, an inductor behaves closer to a short circuit.",
                "At high frequency, a capacitor behaves closer to a short circuit.",
                "At high frequency, an inductor behaves closer to an open circuit.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="12. Example Problem" accent="border-amber-200 bg-white">
            <BulletList items={["R = 10 ohm", "L = 0.1 H", "f = 50 Hz"]} />
            <FormulaBox tone="amber">omega = 2 pi f = 314 rad/s approximately</FormulaBox>
            <FormulaBox tone="teal">XL = omega L = 31.4 ohm</FormulaBox>
            <FormulaBox tone="blue">Z = 10 + j31.4</FormulaBox>
            <FormulaBox tone="rose">|Z| = sqrt(10^2 + 31.4^2)</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Once impedance magnitude is known, the current can be found directly from I = V / Z.
            </p>
          </ConceptCard>

          <ConceptCard title="13. Common Mistakes" accent="border-rose-200 bg-white">
            <BulletList
              bulletClassName="bg-rose-500"
              items={[
                "Ignoring phase while comparing voltage and current.",
                "Using the wrong sign for inductive or capacitive impedance.",
                "Mixing time-domain equations with frequency-domain equations in the same step.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="14. Final Summary" accent="border-cyan-200 bg-white">
            <p className="mt-2 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-bold leading-7 text-cyan-950 sm:text-base">
              Frequency domain analysis converts time-varying circuit behavior into an algebraic form
              using phasors and impedance, making AC analysis, resonance, and filter behavior far easier to study.
            </p>
          </ConceptCard>
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/laplace-transform-methods"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Laplace Transform Methods
          </Link>
          <Link
            href="/two-port-networks"
            className="inline-flex justify-center rounded-xl bg-cyan-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-800"
          >
            Next Two-Port Networks
          </Link>
        </div>
      </div>
    </Layout>
  );
}
