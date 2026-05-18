import Link from "next/link";
import Layout from "../components/layout";
import { SITE_URL } from "../lib/seo";

const pageTitle = "ADC and DAC Converters | Digital Electronics Notes for ECE";
const pageDescription =
  "Learn Analog to Digital and Digital to Analog Converters with ADC/DAC working, resolution, quantization error, R-2R DAC, flash ADC, SAR ADC, dual-slope ADC, formulas, examples, and GATE notes.";
const canonicalUrl =
  `${SITE_URL}/analog-to-digital-and-digital-to-analog-converters`;
const seoKeywords =
  "ADC and DAC, analog to digital converter, digital to analog converter, ADC DAC notes, R-2R ladder DAC, flash ADC, SAR ADC, dual slope ADC, quantization error, ADC resolution, Digital Electronics ECE, GATE ECE";
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Analog to Digital and Digital to Analog Converters",
    headline: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    learningResourceType: "Study notes",
    educationalLevel: "Undergraduate engineering",
    teaches: [
      "ADC working principle",
      "DAC working principle",
      "Resolution and quantization error",
      "R-2R ladder DAC",
      "Flash ADC, SAR ADC, and dual-slope ADC",
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
      { "@type": "ListItem", position: 4, name: "ADC and DAC Converters", item: canonicalUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the difference between ADC and DAC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An ADC converts an analog voltage into a digital code, while a DAC converts a digital code into an analog voltage or current.",
        },
      },
      {
        "@type": "Question",
        name: "What decides ADC resolution?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ADC resolution is mainly decided by the number of bits. An n-bit converter has 2^n levels, so more bits give smaller voltage steps.",
        },
      },
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

function ConverterAnimation() {
  return (
    <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-4">
      <style jsx>{`
        .sample-dot { animation: sampleDot 4.4s linear infinite; }
        .hold-bar { animation: holdBar 4.4s ease-in-out infinite; }
        .code-bit { animation: codeBit 4.4s ease-in-out infinite; }
        .stair-wave { stroke-dasharray: 430; animation: drawStair 4.4s ease-in-out infinite; }
        .compare-flash { animation: compareFlash 4.4s ease-in-out infinite; }
        @keyframes sampleDot {
          0% { opacity: 0; transform: translateX(0) translateY(24px); }
          12%, 34% { opacity: 1; }
          52%, 100% { opacity: 0; transform: translateX(160px) translateY(-18px); }
        }
        @keyframes holdBar {
          0%, 20% { opacity: .2; transform: scaleX(.2); }
          32%, 62% { opacity: 1; transform: scaleX(1); }
          80%, 100% { opacity: .25; transform: scaleX(.35); }
        }
        @keyframes codeBit {
          0%, 38% { opacity: .25; transform: translateY(8px); }
          50%, 78% { opacity: 1; transform: translateY(0); }
          100% { opacity: .3; transform: translateY(8px); }
        }
        @keyframes drawStair {
          0%, 46% { stroke-dashoffset: 430; opacity: .35; }
          68%, 92% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: .55; }
        }
        @keyframes compareFlash {
          0%, 35% { opacity: .25; stroke-width: 3; }
          48%, 70% { opacity: 1; stroke-width: 7; }
          100% { opacity: .3; stroke-width: 3; }
        }
      `}</style>
      <svg viewBox="0 0 860 380" className="w-full" role="img" aria-label="Animated ADC and DAC conversion signal flow">
        <rect x="20" y="22" width="820" height="316" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
        <text x="44" y="58" fill="#0f172a" fontSize="18" fontWeight="900">Animated working: analog signal, ADC code, DAC reconstruction</text>
        <text x="44" y="82" fill="#64748b" fontSize="13" fontWeight="700">Sampling captures voltage; quantization assigns a code; DAC converts weighted bits back into a staircase voltage.</text>

        <path d="M68 188 C104 96, 138 96, 174 188 S244 280, 280 188" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
        <circle className="sample-dot" cx="88" cy="164" r="10" fill="#dc2626" />
        <text x="74" y="124" fill="#1d4ed8" fontSize="14" fontWeight="900">Analog input</text>

        <rect x="318" y="128" width="150" height="108" rx="20" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
        <text x="393" y="160" textAnchor="middle" fill="#1d4ed8" fontSize="16" fontWeight="900">ADC</text>
        <path className="compare-flash" d="M348 196 H438" fill="none" stroke="#16a34a" strokeLinecap="round" />
        <rect className="hold-bar" x="344" y="176" width="98" height="12" rx="6" fill="#f59e0b" style={{ transformOrigin: "344px 182px" }} />
        <text x="393" y="220" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">sample + quantize</text>

        <g className="code-bit">
          <rect x="514" y="122" width="130" height="118" rx="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <text x="579" y="150" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">Digital code</text>
          <text x="536" y="192" fill="#16a34a" fontSize="24" fontWeight="900">1</text>
          <text x="570" y="192" fill="#dc2626" fontSize="24" fontWeight="900">0</text>
          <text x="604" y="192" fill="#16a34a" fontSize="24" fontWeight="900">1</text>
        </g>

        <rect x="682" y="128" width="112" height="108" rx="20" fill="#fef2f2" stroke="#fecaca" strokeWidth="3" />
        <text x="738" y="160" textAnchor="middle" fill="#991b1b" fontSize="16" fontWeight="900">DAC</text>
        <path className="stair-wave" d="M700 212 H718 V196 H736 V178 H754 V164 H776" fill="none" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="738" y="252" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="800">staircase output</text>

        <path d="M284 182 H316" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <path d="M470 182 H512" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <path d="M646 182 H680" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function AdcDacPage() {
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
      <div className="mx-auto max-w-[1200px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/digital-electronics" className="font-medium text-slate-600 transition hover:text-portal-700">Digital Electronics</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">ADC and DAC</span></li>
          </ol>
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Digital Electronics / Converters</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Analog to Digital and Digital to Analog Converters</h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Learn how real-world analog signals enter digital systems through ADCs and how digital codes return to physical voltages or currents through DACs.
          </p>
        </section>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p>An ADC converts a continuous analog signal into a digital number. A DAC converts a digital number into an analog voltage or current.</p>
            <p>These converters are the bridge between the physical world and digital processing. Without them, microphones, sensors, medical instruments, motor drives, communication receivers, and embedded systems cannot interact meaningfully with real signals.</p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Industry relevance: converters are used in smartphones, oscilloscopes, audio systems, radar, IoT sensors, PLCs, and software-defined radios.</li>
              <li>Signal relevance: ADCs decide how accurately amplitude and time information are captured; DACs decide how cleanly digital data becomes an analog waveform.</li>
              <li>Exam relevance: GATE and university exams frequently ask resolution, step size, quantization error, conversion time, and ADC/DAC architecture comparison.</li>
              <li>Interview relevance: good answers explain sampling, quantization, reference voltage, and trade-offs between speed, accuracy, and complexity.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Binary numbers and weighted bits</li>
              <li>Operational amplifier basics</li>
              <li>Comparators and reference voltage</li>
              <li>Sampling theorem and aliasing idea</li>
              <li>RC charging and settling time</li>
              <li>Basic error and percentage calculation</li>
            </ul>
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p>Imagine measuring water level with a ruler. The actual water level is continuous, but the ruler gives the nearest mark. ADCs do the same with voltage: they divide the input range into small levels and report the nearest digital code.</p>
            <p>A DAC works in the reverse direction. It takes binary bits and uses them as weighted contributions. The most significant bit contributes the largest voltage or current; the least significant bit contributes the smallest step.</p>
            <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
              ADC: voltage to number. DAC: number to voltage. Resolution decides how fine the steps are.
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="text-base font-bold text-slate-950">1. Sampling</h3>
            <p>Sampling captures the value of an analog signal at discrete time instants. If the signal changes too fast compared with sampling frequency, different signals may appear identical after sampling. This is aliasing.</p>
            <h3 className="text-base font-bold text-slate-950">2. Quantization</h3>
            <p>Quantization maps a sampled voltage to one among a finite number of allowed levels. More bits mean more levels, smaller step size, and smaller quantization error.</p>
            <h3 className="text-base font-bold text-slate-950">3. Encoding</h3>
            <p>After quantization, the selected level is represented as a binary code. For an n-bit ADC, there are $$ 2^n $$ possible codes.</p>
            <h3 className="text-base font-bold text-slate-950">4. DAC Reconstruction</h3>
            <p>A DAC uses weighted resistors, current sources, or an R-2R ladder to generate an analog value proportional to the digital input code. The output is usually a staircase approximation and may be filtered for smoothness.</p>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="text-base font-bold text-slate-950">1. Number of Levels</h3>
            <p>{"An n-bit converter has n binary decisions. Therefore total available codes are:"}</p>
            <p>{"$$ L=2^n $$"}</p>
            <p>Each extra bit doubles the number of representable amplitude levels.</p>
            <h3 className="text-base font-bold text-slate-950">2. Resolution or Step Size</h3>
            <p>{"For an ideal unipolar converter from 0 to $$ V_{ref} $$:"}</p>
            <p>{"$$ \\Delta = \\frac{V_{ref}}{2^n} $$"}</p>
            <p>Here $$ \Delta $$ is the smallest output change of a DAC or the voltage width represented by one ADC code.</p>
            <h3 className="text-base font-bold text-slate-950">3. Quantization Error</h3>
            <p>{"Because ADC output must choose the nearest level, maximum ideal quantization error is:"}</p>
            <p>{"$$ e_q = \\pm \\frac{\\Delta}{2} $$"}</p>
            <p>This means the digital value can be off by at most half a step for ideal rounding.</p>
            <h3 className="text-base font-bold text-slate-950">4. DAC Output</h3>
            <p>{"For a unipolar n-bit DAC with decimal input code D:"}</p>
            <p>{"$$ V_o = \\frac{D}{2^n}V_{ref} $$"}</p>
            <p>The digital code behaves like a fraction of full-scale reference voltage.</p>
          </TopicSection>

          <TopicSection title="Working Principle">
            <ol className="grid gap-2">
              <li>ADC input signal is first sampled and held so the voltage stays stable during conversion.</li>
              <li>The converter compares the held voltage with internally generated reference levels.</li>
              <li>The closest level is selected and represented by an n-bit binary code.</li>
              <li>In a DAC, each input bit controls a weighted resistor, switch, or current source.</li>
              <li>The weighted contributions add together to produce an analog output proportional to the code.</li>
              <li>A reconstruction filter may smooth DAC staircase output when a continuous waveform is required.</li>
            </ol>
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <ConverterAnimation />
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">ADC Block Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">R-2R Ladder DAC Circuit Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Sampling and Quantization Waveform Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">SAR ADC Signal Flow Diagram Here</div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="grid gap-3 lg:grid-cols-2">
              <FormulaCard title="Number of levels" formula={"$$ L=2^n $$"}>An n-bit converter divides the input or output range into $$ 2^n $$ digital codes.</FormulaCard>
              <FormulaCard title="Resolution" formula={"$$ \\Delta=\\frac{V_{ref}}{2^n} $$"}>Smallest ideal voltage step for a unipolar converter. Higher n means finer voltage distinction.</FormulaCard>
              <FormulaCard title="Quantization error" formula={"$$ e_q=\\pm\\frac{\\Delta}{2} $$"}>Maximum rounding error for an ideal ADC using nearest-level quantization.</FormulaCard>
              <FormulaCard title="DAC output" formula={"$$ V_o=\\frac{D}{2^n}V_{ref} $$"}>D is the decimal value of the binary input. Output is proportional to D.</FormulaCard>
              <FormulaCard title="Sampling condition" formula={"$$ f_s\\ge 2f_m $$"}>Sampling frequency must be at least twice the highest signal frequency to avoid aliasing for bandlimited signals.</FormulaCard>
              <FormulaCard title="SAR conversion time" formula={"$$ T_c=nT_{clk} $$"}>A SAR ADC makes one binary decision per bit, so conversion time scales with number of bits.</FormulaCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Microcontroller sensor measurement</li>
              <li>Digital audio recording and playback</li>
              <li>Oscilloscopes and data acquisition systems</li>
              <li>Software-defined radio and communication receivers</li>
              <li>Motor control and industrial automation</li>
              <li>Medical instruments such as ECG and ultrasound systems</li>
              <li>Digital power supplies and feedback control</li>
              <li>Image sensors and instrumentation systems</li>
            </ul>
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
            <p>{"Find the number of levels for an 8-bit ADC."}</p>
            <p>{"$$ L=2^8=256 $$ levels."}</p>
            <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
            <p>{"A 10-bit ADC has $$ V_{ref}=5V $$. Find resolution."}</p>
            <p>{"$$ \\Delta=\\frac{5}{2^{10}}=\\frac{5}{1024}=4.88mV $$"}</p>
            <p>The ADC cannot distinguish ideal voltage changes smaller than one step.</p>
            <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
            <p>{"A 12-bit DAC has $$ V_{ref}=3.3V $$ and input code $$ D=2048 $$. Find ideal output."}</p>
            <p>{"$$ V_o=\\frac{2048}{4096}\\times3.3=1.65V $$"}</p>
            <p>Half-scale code gives half of the reference voltage in an ideal unipolar DAC.</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <ul className="grid gap-2">
              <li>Using $$ 2^n-1 $$ in every resolution formula without checking the convention used in the question.</li>
              <li>Confusing sampling with quantization. Sampling is time discretization; quantization is amplitude discretization.</li>
              <li>Ignoring anti-aliasing filters before ADC input.</li>
              <li>Thinking higher resolution automatically means faster conversion. Usually speed and accuracy trade off.</li>
              <li>Forgetting that DAC output needs settling time before it reaches final accuracy.</li>
              <li>Mixing LSB size with full-scale output voltage.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <table className="w-full border-collapse text-left text-sm">
              <thead><tr className="border-b border-slate-200 text-slate-950"><th className="py-2 pr-3">Converter</th><th className="py-2 pr-3">Speed</th><th className="py-2 pr-3">Accuracy</th><th className="py-2 pr-3">Typical Use</th></tr></thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Flash ADC</td><td className="py-2 pr-3">Very high</td><td className="py-2 pr-3">Low to medium</td><td className="py-2 pr-3">High-speed instruments</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">SAR ADC</td><td className="py-2 pr-3">Medium to high</td><td className="py-2 pr-3">Good</td><td className="py-2 pr-3">Microcontrollers and data acquisition</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Dual-slope ADC</td><td className="py-2 pr-3">Slow</td><td className="py-2 pr-3">Excellent noise rejection</td><td className="py-2 pr-3">Digital multimeters</td></tr>
                <tr><td className="py-2 pr-3">R-2R DAC</td><td className="py-2 pr-3">Fast</td><td className="py-2 pr-3">Depends on resistor matching</td><td className="py-2 pr-3">General-purpose analog output</td></tr>
              </tbody>
            </table>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <ul className="grid gap-2">
              <li>What is the difference between sampling and quantization?</li>
              <li>Why is a sample-and-hold circuit required in many ADCs?</li>
              <li>Why is flash ADC fastest but hardware-heavy?</li>
              <li>How does a SAR ADC search for the digital code?</li>
              <li>Why is R-2R ladder preferred over binary weighted resistor DAC for larger bit counts?</li>
              <li>What is quantization noise?</li>
              <li>What decides DAC settling time?</li>
            </ul>
          </TopicSection>

          <TopicSection title="Exam-Oriented Notes">
            <ul className="grid gap-2">
              <li>Flash ADC needs $$ 2^n-1 $$ comparators.</li>
              <li>SAR ADC conversion time is approximately proportional to number of bits.</li>
              <li>Dual-slope ADC is slow but has strong noise rejection, especially for power-line interference.</li>
              <li>Resolution improves by a factor of 2 for every extra bit.</li>
              <li>Always identify whether the problem uses full-scale divided by $$ 2^n $$ or $$ 2^n-1 $$ convention.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Revision Summary">
            <ul className="grid gap-2">
              <li>ADC converts analog voltage into digital code; DAC converts digital code into analog voltage or current.</li>
              <li>Sampling discretizes time; quantization discretizes amplitude.</li>
              <li>More bits mean more levels and smaller LSB size.</li>
              <li>SAR ADC balances speed, area, and accuracy; flash ADC is fastest; dual-slope ADC is precise but slow.</li>
              <li>{"Key formulas: $$ L=2^n $$, $$ \\Delta=V_{ref}/2^n $$, $$ e_q=\\pm\\Delta/2 $$."}</li>
            </ul>
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
            <ul className="grid gap-2">
              <li>Explain ADC operation using sampling, quantization, and encoding.</li>
              <li>Why does an R-2R ladder DAC use only two resistor values?</li>
              <li>Why is anti-aliasing filtering needed before ADC input?</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">Numerical</h3>
            <ul className="grid gap-2">
              <li>{"Find resolution of an 8-bit ADC with $$ V_{ref}=2.56V $$."}</li>
              <li>{"Find ideal DAC output for $$ D=128 $$, 8-bit DAC, and $$ V_{ref}=5V $$."}</li>
              <li>{"How many comparators are needed for a 6-bit flash ADC?"}</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">MCQs</h3>
            <ul className="grid gap-2">
              <li>Which ADC is fastest: flash, SAR, or dual-slope?</li>
              <li>Quantization error is approximately bounded by LSB, half LSB, or two LSB?</li>
              <li>Which converter changes binary code into analog voltage?</li>
            </ul>
          </TopicSection>

          <div className="flex justify-end">
            <Link href="/digital-ics-and-applications" className="inline-flex w-full justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto">
              Next Digital ICs and Applications
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
