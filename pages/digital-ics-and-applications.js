import Link from "next/link";
import Layout from "../components/layout";
import { SITE_URL } from "../lib/seo";

const pageTitle = "Digital ICs and Applications | Digital Electronics Notes for ECE";
const pageDescription =
  "Learn Digital ICs and Applications with timing circuits, clock signals, pulse generation, 555 timer modes, propagation delay, duty cycle, formulas, examples, interview questions, and GATE notes.";
const canonicalUrl = `${SITE_URL}/digital-ics-and-applications`;
const seoKeywords =
  "Digital ICs and Applications, digital IC notes, timing circuits, clock signals, pulse generation, 555 timer monostable, 555 timer astable, propagation delay, duty cycle, Digital Electronics ECE, GATE ECE";
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Digital ICs and Applications",
    headline: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    learningResourceType: "Study notes",
    educationalLevel: "Undergraduate engineering",
    teaches: [
      "Digital IC timing behavior",
      "Clock signals and duty cycle",
      "Pulse generation",
      "555 timer monostable and astable operation",
      "Propagation delay and practical IC constraints",
    ],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "ECE student",
    },
    about: {
      "@type": "Thing",
      name: "Digital Electronics",
    },
    provider: {
      "@type": "Organization",
      name: "ECE Exam Guide",
      url: SITE_URL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Subjects", item: `${SITE_URL}/subjects` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Digital Electronics",
        item: `${SITE_URL}/subjects/digital-electronics`,
      },
      { "@type": "ListItem", position: 4, name: "Digital ICs and Applications", item: canonicalUrl },
    ],
  },
];

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

function DigitalIcAnimation() {
  return (
    <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-4">
      <style jsx>{`
        .clk { animation: clkPulse 3.6s ease-in-out infinite; }
        .trigger { animation: triggerPulse 3.6s ease-in-out infinite; }
        .ff { animation: ffToggle 3.6s ease-in-out infinite; }
        .counter-bit-a { animation: bitA 3.6s ease-in-out infinite; }
        .counter-bit-b { animation: bitB 3.6s ease-in-out infinite; }
        .output { animation: outputDelay 3.6s ease-in-out infinite; }
        @keyframes clkPulse {
          0%, 18%, 40%, 62%, 84%, 100% { opacity: .28; stroke-width: 4; }
          28%, 50%, 72% { opacity: 1; stroke-width: 8; }
        }
        @keyframes triggerPulse {
          0%, 24% { opacity: .2; transform: translateX(0); }
          36%, 58% { opacity: 1; transform: translateX(126px); }
          80%, 100% { opacity: .25; transform: translateX(200px); }
        }
        @keyframes ffToggle {
          0%, 36% { fill: #eff6ff; }
          48%, 100% { fill: #dcfce7; }
        }
        @keyframes bitA { 0%, 42% { opacity: .25; } 48%, 100% { opacity: 1; } }
        @keyframes bitB { 0%, 64% { opacity: .25; } 72%, 100% { opacity: 1; } }
        @keyframes outputDelay {
          0%, 58% { opacity: .3; transform: translateY(22px); }
          72%, 100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <svg viewBox="0 0 860 370" className="w-full" role="img" aria-label="Animated digital IC timing circuit operation">
        <rect x="20" y="22" width="820" height="304" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
        <text x="44" y="58" fill="#0f172a" fontSize="18" fontWeight="900">Animated working: clock, timing IC, flip-flop, and output pulse</text>
        <text x="44" y="82" fill="#64748b" fontSize="13" fontWeight="700">A digital IC receives clock/trigger signals, switches internal gates, stores state, and produces a timed logic output.</text>

        <path className="clk" d="M70 245 H106 V214 H142 V245 H178 V214 H214 V245 H250" fill="none" stroke="#2563eb" strokeLinecap="round" strokeLinejoin="round" />
        <text x="76" y="276" fill="#1d4ed8" fontSize="14" fontWeight="900">Clock signal</text>
        <circle className="trigger" cx="76" cy="156" r="10" fill="#dc2626" />
        <line x1="70" y1="156" x2="288" y2="156" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <text x="76" y="132" fill="#991b1b" fontSize="14" fontWeight="900">Trigger pulse</text>

        <rect x="304" y="112" width="170" height="116" rx="22" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
        <text x="389" y="146" textAnchor="middle" fill="#1d4ed8" fontSize="16" fontWeight="900">Timing IC</text>
        <text x="389" y="172" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">threshold + latch</text>
        <rect className="ff" x="360" y="188" width="58" height="24" rx="8" stroke="#16a34a" strokeWidth="2" />

        <rect x="528" y="112" width="150" height="116" rx="22" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
        <text x="603" y="146" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="900">Counter / FF</text>
        <circle className="counter-bit-a" cx="580" cy="188" r="12" fill="#16a34a" />
        <circle className="counter-bit-b" cx="626" cy="188" r="12" fill="#f59e0b" />
        <text x="603" y="216" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">state changes on edge</text>

        <rect x="722" y="128" width="78" height="84" rx="18" fill="#fef2f2" stroke="#fecaca" strokeWidth="3" />
        <path className="output" d="M736 186 H752 V158 H784" fill="none" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="761" y="236" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="900">Timed output</text>

        <path d="M288 156 H304" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <path d="M474 170 H528" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <path d="M678 170 H722" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function DigitalIcsPage() {
  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
      canonicalUrl={canonicalUrl}
      keywords={seoKeywords}
      ogType="article"
      structuredData={structuredData}
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
            <li><span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">Digital ICs and Applications</span></li>
          </ol>
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Digital Electronics / IC Applications</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Digital ICs and Applications</h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Understand how practical digital ICs create timing, store state, count pulses, shape waveforms, and build reliable electronic systems.
          </p>
        </section>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p>Digital ICs are integrated circuits that implement logic gates, flip-flops, counters, timers, registers, decoders, multiplexers, and control blocks on a chip.</p>
            <p>This topic focuses on how digital ICs are used in real circuits: clock generation, pulse shaping, timing control, counting, sequencing, display driving, and embedded system interfacing.</p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Industry relevance: almost every product uses digital ICs for timing, control, communication, display, sensing, or power management.</li>
              <li>Design relevance: practical circuits depend on propagation delay, setup time, hold time, fan-out, noise margin, and clock quality.</li>
              <li>Exam relevance: questions test timer modes, clock waveforms, pulse width, frequency, counters, and IC application blocks.</li>
              <li>Interview relevance: engineers are expected to explain how a clock edge moves data and why timing violations cause wrong outputs.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Logic gates and Boolean algebra</li>
              <li>Flip-flops, counters, and registers</li>
              <li>RC charging and discharging</li>
              <li>Clock signal parameters</li>
              <li>Propagation delay and timing diagrams</li>
              <li>Basic IC logic-family characteristics</li>
            </ul>
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p>A digital IC is not just a package of gates. It is a tiny synchronized decision system. Inputs are interpreted as LOW or HIGH, internal gates respond after delay, storage elements update on clock edges, and outputs drive the next circuit.</p>
            <p>Timing ICs such as the 555 timer add an analog RC charging process to digital switching. When capacitor voltage crosses internal thresholds, comparators flip a latch and create a clean pulse or square wave.</p>
            <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
              Digital IC applications are mostly about controlled switching: when to switch, how long to stay switched, and which state comes next.
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="text-base font-bold text-slate-950">1. Clock Signals</h3>
            <p>A clock is a periodic digital waveform that tells sequential circuits when to update. The active edge acts like a command: capture input now.</p>
            <h3 className="text-base font-bold text-slate-950">2. Timing Circuits</h3>
            <p>Timing circuits generate delays, pulses, or oscillations. A 555 timer in monostable mode produces one pulse after a trigger. In astable mode, it repeatedly charges and discharges a capacitor to generate a clock-like waveform.</p>
            <h3 className="text-base font-bold text-slate-950">3. Pulse Generation</h3>
            <p>A pulse has amplitude, width, rise time, fall time, and repetition frequency. Digital ICs use pulses for reset, enable, triggering, counting, sampling, and communication.</p>
            <h3 className="text-base font-bold text-slate-950">4. Practical IC Behavior</h3>
            <p>Real ICs have propagation delay, finite drive current, input thresholds, power dissipation, and noise margins. These decide whether a circuit works reliably at a chosen clock speed.</p>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="text-base font-bold text-slate-950">1. Clock Period and Frequency</h3>
            <p>{"One complete clock cycle takes time period $$ T $$."}</p>
            <p>{"$$ f=\\frac{1}{T} $$"}</p>
            <p>Higher frequency means less time for internal gates and flip-flops to settle.</p>
            <h3 className="text-base font-bold text-slate-950">2. Duty Cycle</h3>
            <p>{"If a clock stays HIGH for $$ T_{ON} $$ during period $$ T $$:"}</p>
            <p>{"$$ \\text{Duty cycle}=\\frac{T_{ON}}{T}\\times100\\% $$"}</p>
            <p>Duty cycle matters in PWM control, timer outputs, counters, and clocking circuits.</p>
            <h3 className="text-base font-bold text-slate-950">3. 555 Monostable Pulse Width</h3>
            <p>{"In monostable mode, capacitor charges toward supply through R and C. The output pulse ends near the threshold crossing."}</p>
            <p>{"$$ T_p\\approx1.1RC $$"}</p>
            <p>Larger R or C means slower charging, so the pulse lasts longer.</p>
            <h3 className="text-base font-bold text-slate-950">4. 555 Astable Frequency</h3>
            <p>{"For a common 555 astable connection:"}</p>
            <p>{"$$ f\\approx\\frac{1.44}{(R_A+2R_B)C} $$"}</p>
            <p>Here the capacitor charges through $$ R_A+R_B $$ and discharges through $$ R_B $$, so charging and discharging times are not equal unless extra shaping is used.</p>
          </TopicSection>

          <TopicSection title="Working Principle">
            <ol className="grid gap-2">
              <li>A clock, trigger, or input logic signal arrives at the IC pins.</li>
              <li>Input buffers convert the external voltage into internal logic levels.</li>
              <li>Combinational gates process the input according to the circuit function.</li>
              <li>Flip-flops or latches store state when the required clock condition occurs.</li>
              <li>Output drivers provide enough current to drive following gates or loads.</li>
              <li>Timing limits must be satisfied so the output is correct and stable.</li>
            </ol>
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <DigitalIcAnimation />
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Digital IC Internal Architecture Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">555 Timer Monostable Circuit Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Clock and Output Timing Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Counter Application Signal Flow Diagram Here</div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="grid gap-3 lg:grid-cols-2">
              <FormulaCard title="Clock frequency" formula={"$$ f=\\frac{1}{T} $$"}>Frequency is reciprocal of period. Faster clocks reduce available settling time.</FormulaCard>
              <FormulaCard title="Duty cycle" formula={"$$ D=\\frac{T_{ON}}{T}\\times100\\% $$"}>Duty cycle tells what percentage of one cycle remains HIGH.</FormulaCard>
              <FormulaCard title="Monostable pulse width" formula={"$$ T_p\\approx1.1RC $$"}>In a 555 monostable, R and C set the one-shot pulse duration.</FormulaCard>
              <FormulaCard title="Astable frequency" formula={"$$ f\\approx\\frac{1.44}{(R_A+2R_B)C} $$"}>In a 555 astable, the capacitor repeatedly charges and discharges to create oscillation.</FormulaCard>
              <FormulaCard title="Maximum clock estimate" formula={"$$ f_{max}\\approx\\frac{1}{t_{pd}+t_{setup}} $$"}>A simplified timing estimate: data must propagate and become stable before the next capture edge.</FormulaCard>
              <FormulaCard title="Propagation delay" formula={"$$ t_{pd}=t_{out}-t_{in} $$"}>Delay between input transition and valid output transition.</FormulaCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Clock generation and frequency division</li>
              <li>Pulse-width modulation for motor and LED control</li>
              <li>Debouncing switches in embedded systems</li>
              <li>Digital counters in instruments and event counting</li>
              <li>Timers and watchdog circuits</li>
              <li>Display drivers and multiplexed seven-segment displays</li>
              <li>Communication timing and bit synchronization</li>
              <li>Sequencers in control panels and automation systems</li>
            </ul>
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
            <p>{"A clock has period $$ 2\\,ms $$. Find frequency."}</p>
            <p>{"$$ f=1/T=1/(2\\times10^{-3})=500\\,Hz $$"}</p>
            <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
            <p>{"Find 555 monostable pulse width for $$ R=100k\\Omega $$ and $$ C=10\\mu F $$."}</p>
            <p>{"$$ T_p=1.1RC=1.1\\times100000\\times10\\times10^{-6}=1.1s $$"}</p>
            <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
            <p>{"A 555 astable uses $$ R_A=10k\\Omega $$, $$ R_B=20k\\Omega $$, and $$ C=0.01\\mu F $$. Find frequency."}</p>
            <p>{"$$ f=\\frac{1.44}{(10k+2\\times20k)(0.01\\mu F)}=\\frac{1.44}{50k\\times10^{-8}}\\approx2.88kHz $$"}</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <ul className="grid gap-2">
              <li>Assuming IC outputs change instantly; every real IC has propagation delay.</li>
              <li>Ignoring setup and hold time in flip-flop based circuits.</li>
              <li>Confusing monostable one-shot operation with astable free-running oscillation.</li>
              <li>Using duty cycle as a fraction but forgetting to multiply by 100 when percentage is asked.</li>
              <li>Driving too many inputs from one output and exceeding fan-out limits.</li>
              <li>Ignoring decoupling capacitors near IC supply pins in practical circuits.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <table className="w-full border-collapse text-left text-sm">
              <thead><tr className="border-b border-slate-200 text-slate-950"><th className="py-2 pr-3">Mode / IC Use</th><th className="py-2 pr-3">Main Function</th><th className="py-2 pr-3">Output Behavior</th><th className="py-2 pr-3">Typical Application</th></tr></thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Monostable timer</td><td className="py-2 pr-3">One-shot pulse</td><td className="py-2 pr-3">One pulse after trigger</td><td className="py-2 pr-3">Delay and pulse stretching</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Astable timer</td><td className="py-2 pr-3">Oscillator</td><td className="py-2 pr-3">Continuous square wave</td><td className="py-2 pr-3">Clock generation</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Flip-flop IC</td><td className="py-2 pr-3">State storage</td><td className="py-2 pr-3">Changes on clock condition</td><td className="py-2 pr-3">Registers and counters</td></tr>
                <tr><td className="py-2 pr-3">Counter IC</td><td className="py-2 pr-3">Pulse counting</td><td className="py-2 pr-3">Binary or decoded sequence</td><td className="py-2 pr-3">Frequency division and event counting</td></tr>
              </tbody>
            </table>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <ul className="grid gap-2">
              <li>What is propagation delay, and why does it limit clock frequency?</li>
              <li>What is the difference between monostable and astable operation?</li>
              <li>Why do flip-flops require setup and hold time?</li>
              <li>How does a 555 timer generate pulses?</li>
              <li>Why is clock duty cycle important?</li>
              <li>What is fan-out in practical IC design?</li>
              <li>Why are decoupling capacitors placed near digital ICs?</li>
            </ul>
          </TopicSection>

          <TopicSection title="Exam-Oriented Notes">
            <ul className="grid gap-2">
              <li>{"For clock questions, start with $$ f=1/T $$."}</li>
              <li>{"For 555 monostable questions, remember $$ T_p\\approx1.1RC $$."}</li>
              <li>{"For 555 astable questions, remember $$ f\\approx1.44/((R_A+2R_B)C) $$."}</li>
              <li>Monostable needs a trigger; astable runs continuously.</li>
              <li>Timing diagrams should be read from left to right using clock edges first.</li>
              <li>Practical IC limits include fan-out, noise margin, propagation delay, and power dissipation.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Revision Summary">
            <ul className="grid gap-2">
              <li>Digital ICs implement logic, storage, timing, counting, and control functions.</li>
              <li>Clock edges coordinate state changes in sequential circuits.</li>
              <li>555 timer monostable mode produces one pulse; astable mode produces continuous pulses.</li>
              <li>Propagation delay, setup time, hold time, fan-out, and noise margin determine reliable operation.</li>
              <li>{"Key formulas: $$ f=1/T $$, $$ D=T_{ON}/T\\times100\\% $$, $$ T_p\\approx1.1RC $$."}</li>
            </ul>
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
            <ul className="grid gap-2">
              <li>Explain how a clock controls a flip-flop.</li>
              <li>Compare monostable and astable timer operation.</li>
              <li>Why does high-speed digital design require timing analysis?</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">Numerical</h3>
            <ul className="grid gap-2">
              <li>{"Find frequency for a clock period of $$ 20\\mu s $$."}</li>
              <li>{"Find duty cycle if $$ T_{ON}=3ms $$ and $$ T=10ms $$."}</li>
              <li>{"Find 555 monostable pulse width for $$ R=47k\\Omega $$ and $$ C=1\\mu F $$."}</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">MCQs</h3>
            <ul className="grid gap-2">
              <li>Which 555 mode generates continuous square waves?</li>
              <li>Which timing parameter is delay from input transition to output transition?</li>
              <li>Which circuit counts incoming pulses?</li>
            </ul>
          </TopicSection>

          <div className="flex justify-end">
            <Link href="/subjects/digital-electronics" className="inline-flex w-full justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto">
              Next
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
