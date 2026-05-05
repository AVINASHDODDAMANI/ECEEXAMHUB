import { useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import NetworkTopicMenu from "../components/NetworkTopicMenu";

const filterTypes = [
  {
    key: "low",
    title: "Low Pass Filter",
    color: "sky",
    summary: "Passes low frequencies and attenuates high frequencies.",
  },
  {
    key: "high",
    title: "High Pass Filter",
    color: "emerald",
    summary: "Passes high frequencies and suppresses low frequencies.",
  },
  {
    key: "band",
    title: "Band Pass Filter",
    color: "amber",
    summary: "Passes only a band around a chosen center frequency.",
  },
  {
    key: "stop",
    title: "Band Stop Filter",
    color: "rose",
    summary: "Rejects a band while passing lower and higher frequencies.",
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

function FilterAnimator() {
  const [mode, setMode] = useState("low");

  const curveMap = {
    low: {
      label: "Low-pass",
      stroke: "#0284c7",
      path: "M52 92 C106 92 134 98 176 110 C238 128 292 158 352 184 C388 198 420 208 440 214",
      marker: "M52,92 C106,92 134,98 176,110 C238,128 292,158 352,184 C388,198 420,208 440,214",
      note: "Output is almost equal to input at low frequency, then it rolls off after cutoff.",
    },
    high: {
      label: "High-pass",
      stroke: "#059669",
      path: "M52 214 C98 204 136 184 182 154 C234 122 296 98 352 88 C388 82 418 82 440 82",
      marker: "M52,214 C98,204 136,184 182,154 C234,122 296,98 352,88 C388,82 418,82 440,82",
      note: "Low frequency components are weak, while higher frequency components appear at the output.",
    },
    band: {
      label: "Band-pass",
      stroke: "#d97706",
      path: "M52 214 C116 210 146 178 194 126 C224 94 256 74 288 74 C320 74 352 96 382 130 C404 154 422 186 440 208",
      marker: "M52,214 C116,210 146,178 194,126 C224,94 256,74 288,74 C320,74 352,96 382,130 C404,154 422,186 440,208",
      note: "Only a frequency band near resonance gets through efficiently.",
    },
    stop: {
      label: "Band-stop",
      stroke: "#e11d48",
      path: "M52 92 C124 92 168 98 214 122 C242 138 262 154 286 210 C304 154 324 138 352 122 C392 100 420 92 440 92",
      marker: "M52,92 C124,92 168,98 214,122 C242,138 262,154 286,210 C304,154 324,138 352,122 C392,100 420,92 440,92",
      note: "Most frequencies pass except a rejected band around the notch.",
    },
  };

  const active = curveMap[mode];

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#fffdf5,#f8fbff)] p-4">
      <div className="flex flex-wrap gap-2">
        {filterTypes.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => setMode(filter.key)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              mode === filter.key
                ? "bg-emerald-700 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {filter.title}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <svg viewBox="0 0 480 290" role="img" aria-label="Animated filter response explanation" className="h-auto w-full">
            <rect width="480" height="290" fill="#ffffff" />
            <line x1="52" y1="224" x2="440" y2="224" stroke="#475569" strokeWidth="2.5" />
            <line x1="52" y1="224" x2="52" y2="52" stroke="#475569" strokeWidth="2.5" />
            <text x="444" y="244" className="fill-slate-500 text-[12px] font-bold">frequency</text>
            <text x="20" y="64" className="fill-slate-500 text-[12px] font-bold">gain</text>
            <path d={active.path} fill="none" stroke={active.stroke} strokeWidth="5" strokeLinecap="round" />
            <line x1="188" y1="224" x2="188" y2="118" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8 7" />
            <text x="176" y="244" className="fill-slate-600 text-[12px] font-black">fc</text>
            <text x="338" y="74" className="fill-slate-900 text-[15px] font-black">{active.label}</text>
            <circle r="6" fill={active.stroke}>
              <animateMotion dur="2.4s" repeatCount="indefinite" path={active.marker} />
            </circle>
          </svg>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Animated explanation</p>
          <h3 className="mt-2 text-xl font-bold text-slate-950">{active.label}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">{active.note}</p>
          <div className="mt-4 grid gap-3">
            {filterTypes.map((filter) => (
              <MiniCard
                key={filter.key}
                title={filter.title}
                accent={mode === filter.key ? "border-emerald-200 bg-emerald-50/75" : "border-slate-200 bg-slate-50/75"}
              >
                <p className="mt-2 text-sm leading-6 text-slate-700">{filter.summary}</p>
              </MiniCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LowPassDerivationPanel() {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#eff6ff,#ffffff)] p-4">
          <h3 className="text-lg font-bold text-slate-950">RC low-pass derivation</h3>
          <BulletList
            items={[
              "Use ZR = R and ZC = 1 / j omega C.",
              "Treat the output as the capacitor voltage.",
              "Apply the voltage divider rule in the frequency domain.",
            ]}
          />
          <FormulaBox tone="blue">Vo = Vi x ZC / (R + ZC)</FormulaBox>
          <FormulaBox tone="teal">Vo = Vi x 1 / (1 + j omega RC)</FormulaBox>
          <FormulaBox tone="amber">H(omega) = 1 / (1 + j omega RC)</FormulaBox>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#fff7ed,#ffffff)]">
          <svg viewBox="0 0 440 250" role="img" aria-label="RC low-pass circuit and signal flow" className="h-auto w-full">
            <rect width="440" height="250" fill="transparent" />
            <line x1="46" y1="88" x2="116" y2="88" stroke="#0f172a" strokeWidth="4" />
            <line x1="46" y1="182" x2="394" y2="182" stroke="#0f172a" strokeWidth="4" />
            <path d="M116 88h14l10-14 18 28 18-28 18 28 10-14h18" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="222" y1="88" x2="294" y2="88" stroke="#0f172a" strokeWidth="4" />
            <line x1="294" y1="64" x2="294" y2="112" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
            <line x1="324" y1="64" x2="324" y2="112" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
            <line x1="324" y1="112" x2="324" y2="182" stroke="#0f172a" strokeWidth="4" />
            <text x="162" y="58" className="fill-slate-900 text-[13px] font-black">R</text>
            <text x="300" y="52" className="fill-slate-900 text-[13px] font-black">C</text>
            <text x="34" y="94" className="fill-sky-700 text-[13px] font-black">Vi</text>
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

export default function FiltersPage() {
  return (
    <Layout title="ECE Exam Guide | Filters" pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1200px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-emerald-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-emerald-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/network-analysis" className="font-medium text-slate-600 transition hover:text-emerald-700">Network Analysis</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">Filters</span></li>
          </ol>
          <NetworkTopicMenu currentPath="/filters" />
        </nav>

        <section className="rounded-[30px] border border-emerald-200 bg-[linear-gradient(135deg,rgba(236,253,245,0.98),rgba(239,246,255,0.96))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Filters - Complete Step-by-Step Guide
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Filters are frequency-selective circuits. They pass desired frequency components,
            suppress unwanted ones, and shape both amplitude and phase using the impedance
            behavior of resistors, capacitors, and inductors.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          <ConceptCard title="1. What is a Filter?" accent="border-emerald-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A filter is an electrical network that allows certain frequency components to pass
              while attenuating others. It does this because reactive elements do not behave the
              same way at every frequency.
            </p>
            <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-7 text-emerald-950 sm:text-base">
              Key idea: filters exploit the fact that circuit impedance changes with frequency.
            </p>
          </ConceptCard>

          <ConceptCard title="2. Why Filters Are Needed" accent="border-sky-200 bg-white">
            <BulletList
              items={[
                "Communication systems",
                "Audio processing",
                "Power supplies",
                "Signal conditioning",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="3. Filter Types with Animated Response" accent="border-amber-200 bg-white">
            <FilterAnimator />
          </ConceptCard>

          <ConceptCard title="4. Low Pass Filter (RC)" accent="border-sky-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A low-pass filter passes low frequencies and reduces high-frequency content. In a simple RC low-pass network,
              the output is taken across the capacitor.
            </p>
            <LowPassDerivationPanel />
            <p className="mt-4 text-sm font-semibold text-slate-900">Key points:</p>
            <BulletList
              items={[
                "Low frequency means output is close to input.",
                "High frequency means output moves toward zero.",
              ]}
            />
            <FormulaBox tone="blue">fc = 1 / (2 pi RC)</FormulaBox>
          </ConceptCard>

          <ConceptCard title="5. High Pass Filter (RC)" accent="border-emerald-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A high-pass filter does the opposite: it blocks low-frequency content and allows higher-frequency content to appear at the output.
            </p>
            <FormulaBox tone="teal">Vo = Vi x R / (R + 1 / j omega C)</FormulaBox>
            <FormulaBox tone="amber">Vo = Vi x j omega RC / (1 + j omega RC)</FormulaBox>
            <FormulaBox tone="teal">H(omega) = j omega RC / (1 + j omega RC)</FormulaBox>
            <BulletList
              bulletClassName="bg-emerald-500"
              items={[
                "Low frequency gives very small output.",
                "High frequency makes the output approach the input.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="6. Band Pass Filter" accent="border-amber-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A band-pass filter transmits a band around a center frequency and suppresses frequencies below and above that range.
            </p>
            <BulletList
              bulletClassName="bg-amber-500"
              items={[
                "Strongest response occurs near resonance.",
                "Useful when only a selected frequency range is important.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="7. Band Stop Filter" accent="border-rose-200 bg-white">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A band-stop filter removes a narrow or broad frequency band while passing signals below and above that rejected region.
            </p>
            <BulletList
              bulletClassName="bg-rose-500"
              items={[
                "It creates a notch around the rejected band.",
                "Common in noise suppression and interference removal.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="8. Important Parameters" accent="border-slate-200 bg-white">
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Cutoff frequency" accent="border-sky-200 bg-sky-50/75">
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  The frequency where output magnitude falls to about 70.7 percent of the passband value.
                </p>
              </MiniCard>
              <MiniCard title="Bandwidth" accent="border-emerald-200 bg-emerald-50/75">
                <FormulaBox tone="teal">BW = f2 - f1</FormulaBox>
              </MiniCard>
              <MiniCard title="Quality factor" accent="border-amber-200 bg-amber-50/75">
                <FormulaBox tone="amber">Q = f0 / BW</FormulaBox>
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="9. Physical Understanding" accent="border-sky-200 bg-white">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Capacitor behavior" accent="border-sky-200 bg-sky-50/75">
                <BulletList items={["Low frequency: closer to open circuit.", "High frequency: closer to short circuit."]} />
              </MiniCard>
              <MiniCard title="Inductor behavior" accent="border-amber-200 bg-amber-50/75">
                <BulletList
                  bulletClassName="bg-amber-500"
                  items={["Low frequency: closer to short circuit.", "High frequency: closer to open circuit."]}
                />
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="10. Example" accent="border-emerald-200 bg-white">
            <BulletList items={["R = 1 kohm", "C = 1 uF"]} />
            <FormulaBox tone="teal">fc = 1 / (2 pi RC) = 159 Hz approximately</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              For the RC low-pass case, frequencies well below 159 Hz pass with small attenuation,
              while frequencies above that point begin to fall off strongly.
            </p>
          </ConceptCard>

          <ConceptCard title="11. Common Mistakes" accent="border-rose-200 bg-white">
            <BulletList
              bulletClassName="bg-rose-500"
              items={[
                "Using the wrong cutoff-frequency formula.",
                "Ignoring phase shift while discussing filter response.",
                "Confusing low-pass, high-pass, band-pass, and band-stop behavior.",
              ]}
            />
          </ConceptCard>

          <ConceptCard title="12. Final Summary" accent="border-emerald-200 bg-white">
            <p className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-7 text-emerald-950 sm:text-base">
              Filters are frequency-selective circuits that shape signals by using the frequency-dependent behavior
              of reactive elements, making them essential in signal control, communication, and analog design.
            </p>
          </ConceptCard>
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/two-port-networks"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Two-Port Networks
          </Link>
          <Link
            href="/network-functions"
            className="inline-flex justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
          >
            Next Network Functions
          </Link>
        </div>
      </div>
    </Layout>
  );
}
