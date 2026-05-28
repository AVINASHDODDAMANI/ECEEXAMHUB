import { useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import NetworkTopicMenu from "../components/NetworkTopicMenu";

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

function PoleZeroAnimator() {
  const [mode, setMode] = useState("pz");

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#fff8f1,#f8fbff)] p-4">
      <div className="flex flex-wrap gap-2">
        {[
          ["pz", "Pole-Zero Plot"],
          ["time", "Time Response"],
          ["freq", "Frequency View"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              mode === key
                ? "bg-violet-700 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <svg viewBox="0 0 500 300" role="img" aria-label="Animated network functions explanation" className="h-auto w-full">
            <rect width="500" height="300" fill="#ffffff" />
            {mode === "pz" ? (
              <>
                <line x1="56" y1="150" x2="444" y2="150" stroke="#475569" strokeWidth="2.5" />
                <line x1="250" y1="40" x2="250" y2="260" stroke="#475569" strokeWidth="2.5" />
                <text x="438" y="142" className="fill-slate-500 text-[12px] font-bold">sigma</text>
                <text x="258" y="52" className="fill-slate-500 text-[12px] font-bold">j omega</text>
                <circle cx="176" cy="110" r="8" fill="none" stroke="#0ea5e9" strokeWidth="4" />
                <circle cx="176" cy="190" r="8" fill="none" stroke="#0ea5e9" strokeWidth="4" />
                <path d="M308 102l22 22M330 102l-22 22" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" />
                <path d="M308 182l22 22M330 182l-22 22" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" />
                <text x="165" y="92" className="fill-sky-700 text-[12px] font-black">zeros</text>
                <text x="300" y="92" className="fill-rose-700 text-[12px] font-black">poles</text>
                <circle r="5" fill="#8b5cf6">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M250,150 L176,110 L176,190 L250,150 L319,113 L319,193 L250,150" />
                </circle>
              </>
            ) : null}

            {mode === "time" ? (
              <>
                <line x1="52" y1="222" x2="440" y2="222" stroke="#475569" strokeWidth="2.5" />
                <line x1="52" y1="222" x2="52" y2="60" stroke="#475569" strokeWidth="2.5" />
                <path d="M52 208 C106 162 146 126 188 98 C228 74 264 66 294 64 C324 64 356 82 390 118 C412 140 428 166 440 190" fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
                <text x="350" y="78" className="fill-violet-700 text-[14px] font-black">step response</text>
                <circle r="6" fill="#f59e0b">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M52,208 C106,162 146,126 188,98 C228,74 264,66 294,64 C324,64 356,82 390,118 C412,140 428,166 440,190" />
                </circle>
              </>
            ) : null}

            {mode === "freq" ? (
              <>
                <line x1="52" y1="222" x2="440" y2="222" stroke="#475569" strokeWidth="2.5" />
                <line x1="52" y1="222" x2="52" y2="58" stroke="#475569" strokeWidth="2.5" />
                <path d="M52 92 C116 92 156 98 210 118 C264 138 318 164 384 194 C406 204 424 212 440 216" fill="none" stroke="#0891b2" strokeWidth="5" strokeLinecap="round" />
                <text x="318" y="82" className="fill-cyan-700 text-[14px] font-black">magnitude after s = j omega</text>
                <circle r="6" fill="#06b6d4">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M52,92 C116,92 156,98 210,118 C264,138 318,164 384,194 C406,204 424,212 440,216" />
                </circle>
              </>
            ) : null}
          </svg>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">Animated explanation</p>
          <h3 className="mt-2 text-xl font-bold text-slate-950">What H(s) really tells us</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            A network function compresses the whole input-output behavior of a circuit into one s-domain expression.
            From that one function we can read poles, zeros, stability, time response, and frequency shaping.
          </p>
          <BulletList
            bulletClassName="bg-violet-600"
            items={[
              "Poles tell us about stability and speed of response.",
              "Zeros tell us which parts of the signal are suppressed.",
              "Substituting s = j omega reveals frequency behavior.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function RcTransferPanel() {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#eff6ff,#ffffff)] p-4">
          <h3 className="text-lg font-bold text-slate-950">RC transfer function example</h3>
          <BulletList
            items={[
              "Replace the capacitor by 1 / sC.",
              "Use the voltage divider relation.",
              "Write output over input directly as H(s).",
            ]}
          />
          <FormulaBox tone="blue">Vo = Vi x ZC / (R + ZC)</FormulaBox>
          <FormulaBox tone="teal">Vo = Vi x 1 / (1 + sRC)</FormulaBox>
          <FormulaBox tone="amber">H(s) = 1 / (1 + sRC)</FormulaBox>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#fff7ed,#ffffff)]">
          <svg viewBox="0 0 440 250" role="img" aria-label="RC network function visualization" className="h-auto w-full">
            <rect width="440" height="250" fill="transparent" />
            <line x1="46" y1="88" x2="116" y2="88" stroke="#0f172a" strokeWidth="4" />
            <line x1="46" y1="182" x2="394" y2="182" stroke="#0f172a" strokeWidth="4" />
            <path d="M116 88h14l10-14 18 28 18-28 18 28 10-14h18" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="222" y1="88" x2="294" y2="88" stroke="#0f172a" strokeWidth="4" />
            <line x1="294" y1="64" x2="294" y2="112" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
            <line x1="324" y1="64" x2="324" y2="112" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
            <line x1="324" y1="112" x2="324" y2="182" stroke="#0f172a" strokeWidth="4" />
            <text x="162" y="58" className="fill-slate-900 text-[13px] font-black">R</text>
            <text x="300" y="52" className="fill-slate-900 text-[13px] font-black">1 / sC</text>
            <text x="30" y="94" className="fill-sky-700 text-[13px] font-black">Vi</text>
            <text x="336" y="94" className="fill-emerald-700 text-[13px] font-black">Vo</text>
            <circle r="6" fill="#0ea5e9">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M46,88 L294,88" />
            </circle>
            <circle r="6" fill="#10b981">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M294,88 L324,88 L324,182" />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function NetworkFunctionsPage() {
  return (
    <Layout title="Network Functions GATE ECE Quick Notes + Poles Zeros + PYQs" pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1440px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-violet-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-violet-700">Notes</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/network-analysis" className="font-medium text-slate-600 transition hover:text-violet-700">Network Analysis</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-violet-50 px-3 py-1 font-semibold text-violet-700">Network Functions</span></li>
          </ol>
          <NetworkTopicMenu currentPath="/network-functions" />
        </nav>

        <section className="rounded-[30px] border border-violet-200 bg-[linear-gradient(135deg,rgba(245,243,255,0.98),rgba(239,246,255,0.96))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-violet-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-violet-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Network Functions - Complete Step-by-Step Guide
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            A network function gives a complete s-domain description of how a circuit transforms its input into output.
            It is one of the most powerful ways to study poles, zeros, stability, time response, and frequency response in one framework.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          <ConceptCard title="1. What is a Network Function?" accent="border-violet-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A network function is the ratio of the Laplace transform of the output to the Laplace transform of the input,
              assuming zero initial conditions. It treats the whole circuit as one mathematical object instead of solving the circuit from scratch every time.
            </p>
            <FormulaBox tone="blue">H(s) = Output(s) / Input(s)</FormulaBox>
            <p className="mt-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-bold leading-7 text-violet-950 sm:text-base">
              Key idea: the entire network is represented by a single function that tells how signals are shaped.
            </p>
          </ConceptCard>

          <ConceptCard title="2. Types of Network Functions" accent="border-sky-200 bg-white">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Driving point function" accent="border-sky-200 bg-sky-50/75">
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Input and output are observed at the same port. Common examples are impedance and admittance.
                </p>
                <FormulaBox tone="blue">Z(s) = V(s) / I(s)</FormulaBox>
              </MiniCard>
              <MiniCard title="Transfer function" accent="border-emerald-200 bg-emerald-50/75">
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Input and output are measured at different ports, such as voltage gain or current gain.
                </p>
                <FormulaBox tone="teal">Vo(s) / Vi(s), Io(s) / Ii(s)</FormulaBox>
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="3. General Form, Poles, and Zeros" accent="border-amber-200 bg-white">
            <FormulaBox tone="amber">H(s) = (bm s^m + ... + b0) / (an s^n + ... + a0)</FormulaBox>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Poles" accent="border-rose-200 bg-rose-50/75">
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Poles are values of s that make the denominator zero. They dominate stability and response speed.
                </p>
              </MiniCard>
              <MiniCard title="Zeros" accent="border-sky-200 bg-sky-50/75">
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Zeros are values of s that make the numerator zero. They shape attenuation and transmission.
                </p>
              </MiniCard>
            </div>
            <PoleZeroAnimator />
          </ConceptCard>

          <ConceptCard title="4. RC Circuit Transfer Function Example" accent="border-sky-200 bg-white">
            <RcTransferPanel />
          </ConceptCard>

          <ConceptCard title="5. Frequency Response from H(s)" accent="border-cyan-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              To obtain frequency response, replace s with j omega. This converts the network function into a frequency-dependent expression.
            </p>
            <FormulaBox tone="blue">s = j omega</FormulaBox>
            <FormulaBox tone="teal">Magnitude = |H(j omega)|</FormulaBox>
            <FormulaBox tone="amber">Phase = angle H(j omega)</FormulaBox>
          </ConceptCard>

          <ConceptCard title="6. Properties of Network Functions" accent="border-slate-200 bg-white">
            <BulletList
              items={[
                "Linearity: the network follows superposition if the circuit is linear.",
                "Stability: a stable network has poles in the left half of the s-plane.",
                "Causality: output depends on present and past input, not future input.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="7. Initial and Final Value Ideas" accent="border-amber-200 bg-white">
            <FormulaBox tone="amber">Initial value: f(0) = limit s to infinity of sF(s)</FormulaBox>
            <FormulaBox tone="teal">Final value: f(infinity) = limit s to 0 of sF(s)</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              These checks are very useful when validating whether a derived response starts and ends where physics says it should.
            </p>
          </ConceptCard>

          <ConceptCard title="8. Relationship with Time Domain" accent="border-emerald-200 bg-white">
            <FormulaBox tone="teal">{"Impulse response: h(t) = L^-1 {H(s)}"}</FormulaBox>
            <FormulaBox tone="blue">Step response: Output(s) = H(s) x 1 / s</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Once H(s) is known, impulse response and step response follow directly through inverse Laplace methods.
            </p>
          </ConceptCard>

          <ConceptCard title="9. Example Calculation" accent="border-rose-200 bg-white">
            <FormulaBox tone="rose">H(s) = 1 / (s + 2)</FormulaBox>
            <FormulaBox tone="amber">For a unit step, Y(s) = 1 / (s(s + 2))</FormulaBox>
            <FormulaBox tone="teal">y(t) = 1 - e^(-2t)</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This result immediately shows a stable response that rises smoothly toward a final value.
            </p>
          </ConceptCard>

          <ConceptCard title="10. Physical Meaning" accent="border-violet-200 bg-white">
            <BulletList
              bulletClassName="bg-violet-600"
              items={[
                "The network function shows how fast the system reacts.",
                "It reveals whether the system is stable or unstable.",
                "It explains how different frequencies are amplified, passed, or suppressed.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="11. Applications" accent="border-slate-200 bg-white">
            <BulletList items={["Filters", "Amplifiers", "Control systems", "Signal processing"]} />
          </ConceptCard>

          <ConceptCard title="12. Common Mistakes" accent="border-rose-200 bg-white">
            <BulletList
              bulletClassName="bg-rose-500"
              items={[
                "Ignoring pole locations while discussing stability.",
                "Using the substitution s = j omega at the wrong stage.",
                "Confusing a driving-point function with a transfer function.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="13. Final Summary" accent="border-violet-200 bg-white">
            <p className="mt-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-bold leading-7 text-violet-950 sm:text-base">
              A network function is the s-domain language of a circuit. It tells how input signals are transformed,
              how poles and zeros shape behavior, and how time response and frequency response emerge from one compact expression.
            </p>
          </ConceptCard>
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/filters"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Filters
          </Link>
          <Link
            href="/subjects/network-analysis"
            className="inline-flex justify-center rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-800"
          >
            Finish Network Analysis
          </Link>
        </div>
      </div>
    </Layout>
  );
}
