import { useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import NetworkTopicMenu from "../components/NetworkTopicMenu";

const transformPairs = [
  ["1", "1 / s"],
  ["t", "1 / s^2"],
  ["e^(at)", "1 / (s - a)"],
  ["sin(omega t)", "omega / (s^2 + omega^2)"],
  ["cos(omega t)", "s / (s^2 + omega^2)"],
];

const solutionSteps = [
  "Convert the input and circuit quantities into the s-domain.",
  "Replace R, L, and C with their s-domain models.",
  "Apply KVL, KCL, nodal analysis, or mesh analysis as algebraic equations.",
  "Solve for the required voltage or current in F(s).",
  "Take the inverse Laplace transform to return to time domain.",
];

function FormulaBox({ children, tone = "blue" }) {
  const tones = {
    blue: "border-sky-200 bg-sky-50/90 text-slate-950",
    amber: "border-amber-200 bg-amber-50/90 text-amber-950",
    teal: "border-teal-200 bg-teal-50/90 text-slate-950",
    rose: "border-rose-200 bg-rose-50/90 text-slate-950",
  };

  return (
    <p
      className={`mt-3 rounded-xl border px-4 py-3 font-mono text-sm font-bold leading-6 sm:text-base ${tones[tone]}`}
    >
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

function TransformAnimator() {
  const [mode, setMode] = useState("step");

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#fffdf8,rgba(255,255,255,0.96))] p-4">
      <div className="flex flex-wrap gap-2">
        {[
          ["step", "Step Input"],
          ["exp", "Exponential"],
          ["sin", "Sinusoid"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              mode === key
                ? "bg-orange-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <svg viewBox="0 0 520 290" role="img" aria-label="Laplace transform animation" className="h-auto w-full">
            <defs>
              <linearGradient id="timeBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="100%" stopColor="#fef3c7" />
              </linearGradient>
              <linearGradient id="sdBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ecfeff" />
                <stop offset="100%" stopColor="#dbeafe" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="250" height="290" fill="url(#timeBg)" />
            <rect x="270" y="0" width="250" height="290" fill="url(#sdBg)" />
            <text x="125" y="38" textAnchor="middle" className="fill-slate-900 text-[18px] font-black">
              Time Domain
            </text>
            <text x="395" y="38" textAnchor="middle" className="fill-slate-900 text-[18px] font-black">
              s-Domain
            </text>
            <line x1="36" y1="210" x2="220" y2="210" stroke="#475569" strokeWidth="2" />
            <line x1="36" y1="210" x2="36" y2="72" stroke="#475569" strokeWidth="2" />
            <line x1="306" y1="210" x2="490" y2="210" stroke="#475569" strokeWidth="2" />
            <line x1="306" y1="210" x2="306" y2="72" stroke="#475569" strokeWidth="2" />
            <text x="218" y="228" className="fill-slate-500 text-[12px] font-bold">t</text>
            <text x="18" y="82" className="fill-slate-500 text-[12px] font-bold">f(t)</text>
            <text x="488" y="228" className="fill-slate-500 text-[12px] font-bold">s</text>
            <text x="288" y="82" className="fill-slate-500 text-[12px] font-bold">F(s)</text>

            {mode === "step" ? (
              <>
                <path d="M36 210 L90 210 L90 118 L210 118" fill="none" stroke="#ea580c" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
                <rect x="334" y="90" width="112" height="92" rx="16" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2.5" />
                <text x="390" y="127" textAnchor="middle" className="fill-slate-950 text-[20px] font-black">1 / s</text>
                <text x="390" y="151" textAnchor="middle" className="fill-slate-500 text-[12px] font-bold">step becomes algebraic</text>
              </>
            ) : null}

            {mode === "exp" ? (
              <>
                <path d="M40 116 C80 132 120 158 165 196 C186 214 202 210 218 210" fill="none" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
                <rect x="326" y="90" width="130" height="92" rx="16" fill="#ffffff" stroke="#14b8a6" strokeWidth="2.5" />
                <text x="391" y="127" textAnchor="middle" className="fill-slate-950 text-[20px] font-black">1 / (s - a)</text>
                <text x="391" y="151" textAnchor="middle" className="fill-slate-500 text-[12px] font-bold">pole shifts by a</text>
              </>
            ) : null}

            {mode === "sin" ? (
              <>
                <path d="M40 165 C55 110 70 110 85 165 C100 220 115 220 130 165 C145 110 160 110 175 165 C190 220 205 220 220 165" fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
                <rect x="318" y="82" width="146" height="108" rx="16" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
                <text x="391" y="121" textAnchor="middle" className="fill-slate-950 text-[18px] font-black">omega /</text>
                <text x="391" y="147" textAnchor="middle" className="fill-slate-950 text-[18px] font-black">s^2 + omega^2</text>
                <text x="391" y="171" textAnchor="middle" className="fill-slate-500 text-[12px] font-bold">oscillation becomes rational form</text>
              </>
            ) : null}

            <g>
              <rect x="232" y="100" width="56" height="72" rx="18" fill="#0f172a" />
              <text x="260" y="132" textAnchor="middle" className="fill-white text-[14px] font-black">L</text>
              <text x="260" y="152" textAnchor="middle" className="fill-white text-[14px] font-black">T</text>
              <text x="260" y="172" textAnchor="middle" className="fill-white text-[14px] font-black">{"{}"}</text>
            </g>
            <circle r="5" fill="#f59e0b">
              <animateMotion dur="2s" repeatCount="indefinite" path="M90,118 L170,118 L215,118 L300,118 L390,118" />
            </circle>
          </svg>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-700">Animated view</p>
          <h3 className="mt-2 text-xl font-bold text-slate-950">Time to algebra</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Laplace transform replaces differentiation with multiplication by <span className="font-bold text-slate-950">s</span>,
            which is why switching circuits become much easier to solve.
          </p>
          <BulletList
            bulletClassName="bg-orange-500"
            items={[
              "Step inputs become simple 1/s terms.",
              "Exponentials become shifted poles.",
              "Sinusoids become rational functions in s.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function SDomainCircuitCard() {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#eff6ff,#f8fafc)]">
          <svg viewBox="0 0 560 270" role="img" aria-label="s-domain circuit representation" className="h-auto w-full">
            <rect width="560" height="270" fill="transparent" />
            <text x="100" y="38" textAnchor="middle" className="fill-slate-900 text-[18px] font-black">Time-Domain Circuit</text>
            <text x="438" y="38" textAnchor="middle" className="fill-slate-900 text-[18px] font-black">s-Domain Circuit</text>
            <line x1="40" y1="160" x2="180" y2="160" stroke="#334155" strokeWidth="4" />
            <line x1="180" y1="160" x2="220" y2="160" stroke="#334155" strokeWidth="4" />
            <line x1="220" y1="160" x2="260" y2="160" stroke="#334155" strokeWidth="4" />
            <line x1="260" y1="160" x2="260" y2="210" stroke="#334155" strokeWidth="4" />
            <line x1="260" y1="210" x2="40" y2="210" stroke="#334155" strokeWidth="4" />
            <line x1="40" y1="210" x2="40" y2="160" stroke="#334155" strokeWidth="4" />
            <rect x="82" y="142" width="58" height="36" rx="9" fill="#fff" stroke="#0ea5e9" strokeWidth="2.5" />
            <text x="111" y="165" textAnchor="middle" className="fill-slate-950 text-[16px] font-black">R</text>
            <path d="M180 160 C188 130 196 130 204 160 C212 190 220 190 228 160 C236 130 244 130 252 160" fill="none" stroke="#16a34a" strokeWidth="4" />
            <line x1="260" y1="112" x2="260" y2="160" stroke="#ef4444" strokeWidth="4" />
            <line x1="280" y1="112" x2="280" y2="160" stroke="#ef4444" strokeWidth="4" />
            <line x1="260" y1="112" x2="280" y2="112" stroke="#334155" strokeWidth="4" />
            <line x1="280" y1="160" x2="300" y2="160" stroke="#334155" strokeWidth="4" />
            <text x="208" y="125" textAnchor="middle" className="fill-green-700 text-[13px] font-black">L</text>
            <text x="286" y="104" textAnchor="middle" className="fill-red-600 text-[13px] font-black">C</text>

            <path d="M330 160 L470 160" stroke="#334155" strokeWidth="4" fill="none" />
            <line x1="470" y1="160" x2="510" y2="160" stroke="#334155" strokeWidth="4" />
            <line x1="510" y1="160" x2="510" y2="210" stroke="#334155" strokeWidth="4" />
            <line x1="510" y1="210" x2="330" y2="210" stroke="#334155" strokeWidth="4" />
            <line x1="330" y1="210" x2="330" y2="160" stroke="#334155" strokeWidth="4" />
            <rect x="360" y="142" width="58" height="36" rx="9" fill="#fff" stroke="#0ea5e9" strokeWidth="2.5" />
            <text x="389" y="165" textAnchor="middle" className="fill-slate-950 text-[16px] font-black">R</text>
            <rect x="430" y="142" width="58" height="36" rx="9" fill="#fff" stroke="#16a34a" strokeWidth="2.5" />
            <text x="459" y="165" textAnchor="middle" className="fill-slate-950 text-[16px] font-black">sL</text>
            <rect x="472" y="94" width="56" height="46" rx="9" fill="#fff" stroke="#ef4444" strokeWidth="2.5" />
            <text x="500" y="122" textAnchor="middle" className="fill-slate-950 text-[13px] font-black">1 / sC</text>
            <path d="M280 185 C310 185 310 98 470 98" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="9 7" />
            <text x="319" y="176" className="fill-orange-700 text-[13px] font-black">transform</text>
          </svg>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#fff7ed,#ffffff)] p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-700">s-domain models</p>
          <div className="mt-3 grid gap-3">
            <MiniCard title="Resistor" accent="border-sky-200 bg-sky-50/80">
              <FormulaBox tone="blue">V(s) = RI(s)</FormulaBox>
            </MiniCard>
            <MiniCard title="Inductor" accent="border-emerald-200 bg-emerald-50/80">
              <FormulaBox tone="teal">V(s) = L[sI(s) - i(0)]</FormulaBox>
            </MiniCard>
            <MiniCard title="Capacitor" accent="border-rose-200 bg-rose-50/80">
              <FormulaBox tone="rose">I(s) = C[sV(s) - v(0)]</FormulaBox>
            </MiniCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function RcResponsePanel() {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#eff6ff,#ffffff)] p-4">
          <h3 className="text-lg font-bold text-slate-950">Worked RC Example</h3>
          <BulletList
            items={[
              "Input is a step source V, so V(s) = V / s.",
              "The series impedance becomes R + 1 / sC.",
              "Solve for current in algebraic form and invert.",
            ]}
          />
          <FormulaBox tone="blue">V / s = I(s)[R + 1 / sC]</FormulaBox>
          <FormulaBox tone="teal">I(s) = V / (sR + 1 / C)</FormulaBox>
          <FormulaBox tone="amber">i(t) = (V / R)e^(-t / RC)</FormulaBox>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#fffbeb,#fff)]">
          <svg viewBox="0 0 480 280" role="img" aria-label="RC current decay graph" className="h-auto w-full">
            <rect width="480" height="280" fill="transparent" />
            <line x1="56" y1="220" x2="430" y2="220" stroke="#475569" strokeWidth="2.5" />
            <line x1="56" y1="220" x2="56" y2="48" stroke="#475569" strokeWidth="2.5" />
            <text x="438" y="238" className="fill-slate-500 text-[12px] font-bold">t</text>
            <text x="34" y="60" className="fill-slate-500 text-[12px] font-bold">i(t)</text>
            <path d="M56 88 C140 118 220 170 300 199 C340 212 380 218 430 220" fill="none" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
            <line x1="56" y1="88" x2="430" y2="88" stroke="#fdba74" strokeWidth="2" strokeDasharray="8 8" />
            <line x1="176" y1="220" x2="176" y2="129" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="8 8" />
            <circle cx="176" cy="129" r="5" fill="#0ea5e9" />
            <text x="178" y="244" className="fill-sky-700 text-[12px] font-black">tau = RC</text>
            <text x="188" y="120" className="fill-sky-700 text-[12px] font-black">36.8% current left</text>
            <circle r="6" fill="#ea580c">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M56,88 C140,118 220,170 300,199 C340,212 380,218 430,220" />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function LaplaceTransformMethodsPage() {
  return (
    <Layout title="ECE Exam Guide | Laplace Transform Methods" pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1200px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li>
              <Link href="/" className="font-medium text-slate-600 transition hover:text-orange-700">
                Home
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <Link href="/subjects" className="font-medium text-slate-600 transition hover:text-orange-700">
                Subjects
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <Link href="/subjects/network-analysis" className="font-medium text-slate-600 transition hover:text-orange-700">
                Network Analysis
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <span className="rounded-full bg-orange-50 px-3 py-1 font-semibold text-orange-700">
                Laplace Transform Methods
              </span>
            </li>
          </ol>
          <NetworkTopicMenu currentPath="/laplace-transform-methods" />
        </nav>

        <section className="rounded-[30px] border border-orange-200 bg-[linear-gradient(135deg,rgba(255,247,237,0.98),rgba(240,249,255,0.96))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-orange-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Laplace Transform Methods - Complete Step-by-Step Guide
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Laplace transform methods convert time-domain circuit behavior into algebraic
            equations in the s-domain. That makes switching circuits, transient response,
            and differential-equation based analysis much easier to solve cleanly.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          <ConceptCard title="1. What is Laplace Transform?" accent="border-orange-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              The Laplace transform is a mathematical tool that converts a time-domain
              function into a complex-frequency expression. Instead of following every
              derivative step in time, we move to a domain where calculus becomes algebra.
            </p>
            <FormulaBox tone="amber">F(s) = integral from 0 to infinity of f(t)e^(-st) dt</FormulaBox>
            <BulletList
              bulletClassName="bg-orange-500"
              items={[
                "f(t) is the original time-domain function.",
                "F(s) is the transformed s-domain function.",
                "s = sigma + j omega is the complex frequency variable.",
              ]}
            />
            <p className="mt-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-bold leading-7 text-orange-950 sm:text-base">
              Key idea: Laplace transform turns time-based behavior into algebraic form so circuit equations become easier to handle.
            </p>
          </ConceptCard>

          <ConceptCard title="2. Why Laplace is Used in Circuits?" accent="border-sky-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              In circuit analysis, derivatives come from capacitors and inductors. Solving
              those equations directly can be messy, especially when switches change state
              or initial energy is present.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Without Laplace" accent="border-rose-200 bg-rose-50/70">
                <BulletList
                  bulletClassName="bg-rose-500"
                  items={[
                    "Differential equations must be solved directly.",
                    "Initial conditions must be inserted by hand.",
                    "Transient work becomes long and error-prone.",
                  ]}
                />
              </MiniCard>
              <MiniCard title="With Laplace" accent="border-emerald-200 bg-emerald-50/70">
                <BulletList
                  bulletClassName="bg-emerald-500"
                  items={[
                    "Differentiation becomes multiplication by s.",
                    "Initial conditions appear naturally in the equations.",
                    "The whole circuit becomes an algebra problem.",
                  ]}
                />
              </MiniCard>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-900">Applications:</p>
            <BulletList
              bulletClassName="bg-sky-600"
              items={[
                "Transient analysis",
                "RC, RL, and RLC circuit solving",
                "Control systems",
                "Signal processing",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="3. Animated Transform View" accent="border-amber-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              This panel shows how common waveforms move from the time domain to the
              s-domain. The point is not memorizing shapes alone, but seeing how the
              transform captures a waveform in a compact algebraic form.
            </p>
            <TransformAnimator />
          </ConceptCard>

          <ConceptCard title="4. Basic Transform Pairs" accent="border-slate-200 bg-white">
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-950">
                  <tr>
                    <th className="px-4 py-3 font-bold">Time Function f(t)</th>
                    <th className="px-4 py-3 font-bold">Laplace F(s)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                  {transformPairs.map(([timeFn, laplace]) => (
                    <tr key={timeFn}>
                      <td className="px-4 py-3 font-semibold text-slate-950">{timeFn}</td>
                      <td className="px-4 py-3">{laplace}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ConceptCard>

          <ConceptCard title="5. Important Properties" accent="border-sky-200 bg-white">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Linearity" accent="border-sky-200 bg-sky-50/70">
                <FormulaBox tone="blue">{"L{af(t) + bg(t)} = aF(s) + bG(s)"}</FormulaBox>
              </MiniCard>
              <MiniCard title="Time Differentiation" accent="border-orange-200 bg-orange-50/70">
                <FormulaBox tone="amber">{"L{df / dt} = sF(s) - f(0)"}</FormulaBox>
                <p className="mt-3 text-sm leading-6 text-slate-700">This is the most useful property in circuit analysis.</p>
              </MiniCard>
              <MiniCard title="Integration" accent="border-teal-200 bg-teal-50/70">
                <FormulaBox tone="teal">{"L{integral f(t) dt} = F(s) / s"}</FormulaBox>
              </MiniCard>
              <MiniCard title="Time Shift" accent="border-rose-200 bg-rose-50/70">
                <FormulaBox tone="rose">{"L{f(t - a)} = e^(-as)F(s)"}</FormulaBox>
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="6. Laplace Transform in Circuit Elements" accent="border-slate-200 bg-white">
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Resistor" accent="border-sky-200 bg-sky-50/70">
                <FormulaBox tone="blue">V(s) = RI(s)</FormulaBox>
                <p className="mt-3 text-sm leading-6 text-slate-700">The resistor keeps the same simple voltage-current relation.</p>
              </MiniCard>
              <MiniCard title="Inductor" accent="border-emerald-200 bg-emerald-50/70">
                <FormulaBox tone="teal">V(s) = L[sI(s) - i(0)]</FormulaBox>
                <p className="mt-3 text-sm leading-6 text-slate-700">Initial current appears directly, which captures stored magnetic energy.</p>
              </MiniCard>
              <MiniCard title="Capacitor" accent="border-rose-200 bg-rose-50/70">
                <FormulaBox tone="rose">I(s) = C[sV(s) - v(0)]</FormulaBox>
                <p className="mt-3 text-sm leading-6 text-slate-700">Initial voltage shows up explicitly, so stored electric energy is preserved in the equation.</p>
              </MiniCard>
            </div>
            <p className="mt-4 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-bold leading-7 text-sky-950 sm:text-base">
              Important insight: initial conditions are built into the transformed equations. That is one of the biggest reasons Laplace methods are so powerful.
            </p>
          </ConceptCard>

          <ConceptCard title="7. Circuit Representation in s-Domain" accent="border-orange-200 bg-white">
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-950">
                  <tr>
                    <th className="px-4 py-3 font-bold">Element</th>
                    <th className="px-4 py-3 font-bold">s-Domain Model</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-950">R</td>
                    <td className="px-4 py-3">R</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-950">L</td>
                    <td className="px-4 py-3">sL</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-950">C</td>
                    <td className="px-4 py-3">1 / sC</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <SDomainCircuitCard />
          </ConceptCard>

          <ConceptCard title="8. Solving a Circuit Using Laplace" accent="border-sky-200 bg-white">
            <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {solutionSteps.map((step, index) => (
                <li key={step} className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4">
                  <span className="inline-flex rounded-lg bg-sky-600 px-2.5 py-1 text-xs font-black text-white">
                    Step {index + 1}
                  </span>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-800">{step}</p>
                </li>
              ))}
            </ol>
          </ConceptCard>

          <ConceptCard title="9. Inverse Laplace Transform" accent="border-teal-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              After solving for a voltage or current in the s-domain, we must return to the
              time domain to get the actual physical waveform.
            </p>
            <FormulaBox tone="teal">{"f(t) = L^(-1){F(s)}"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Partial fraction expansion is the most common method because it breaks a
              complicated rational function into standard terms whose inverse transforms
              are already known.
            </p>
          </ConceptCard>

          <ConceptCard title="10. Example: RC Circuit Using Laplace" accent="border-orange-200 bg-white">
            <RcResponsePanel />
          </ConceptCard>

          <ConceptCard title="11. Initial and Final Value Theorems" accent="border-slate-200 bg-white">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Initial Value Theorem" accent="border-sky-200 bg-sky-50/70">
                <FormulaBox tone="blue">f(0) = limit as s goes to infinity of sF(s)</FormulaBox>
              </MiniCard>
              <MiniCard title="Final Value Theorem" accent="border-amber-200 bg-amber-50/70">
                <FormulaBox tone="amber">f(infinity) = limit as s goes to 0 of sF(s)</FormulaBox>
              </MiniCard>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
              These theorems are excellent for checking whether your transformed solution
              matches the expected starting and ending behavior of the circuit.
            </p>
          </ConceptCard>

          <ConceptCard title="12. Physical Meaning" accent="border-sky-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Laplace transform gives a very practical split between how a circuit begins
              and how it settles.
            </p>
            <BulletList
              bulletClassName="bg-sky-600"
              items={[
                "Large values of s emphasize early-time or initial behavior.",
                "Small values of s emphasize long-time or steady-state behavior.",
                "That is why the s-domain feels natural for transient analysis.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="13. Advantages" accent="border-emerald-200 bg-white">
            <BulletList
              bulletClassName="bg-emerald-500"
              items={[
                "Handles initial conditions directly.",
                "Simplifies differential equations.",
                "Works neatly for switching circuits.",
                "Connects naturally with control systems and transfer functions.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="14. Common Mistakes" accent="border-rose-200 bg-white">
            <BulletList
              bulletClassName="bg-rose-500"
              items={[
                "Forgetting to include initial current or initial voltage.",
                "Making an error in partial fraction expansion.",
                "Mixing time-domain and s-domain equations in the same step.",
                "Using the final value theorem when the poles do not satisfy its conditions.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="15. Final Summary" accent="border-orange-200 bg-white">
            <p className="mt-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-bold leading-7 text-orange-950 sm:text-base">
              Laplace transform converts time-domain circuit problems into algebraic
              equations in the s-domain, making transient analysis more systematic,
              easier to solve, and easier to verify.
            </p>
          </ConceptCard>
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/network-topology"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Network Topology
          </Link>
          <Link
            href="/frequency-domain-analysis"
            className="inline-flex justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700"
          >
            Next Frequency Domain Analysis
          </Link>
        </div>
      </div>
    </Layout>
  );
}
