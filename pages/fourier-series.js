import Link from "next/link";
import Layout from "../components/layout";

function TopicSection({ id, title, children }) {
  return (
    <section
      id={id}
      className="topic-section scroll-mt-32 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function MiniCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <h3 className="text-base font-bold text-slate-950">{title}</h3>
      {children}
    </div>
  );
}

function FormulaBox({ children }) {
  return (
    <div className="mt-3 rounded-xl border border-portal-100 bg-[#f8fbff] px-4 py-3 font-mono text-sm font-bold leading-7 text-slate-950 sm:text-base">
      {children}
    </div>
  );
}

function BulletList({ items, bulletClassName = "bg-portal-600" }) {
  return (
    <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-700 sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className={`mt-2.5 h-1.5 w-1.5 flex-none rounded-full ${bulletClassName}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const sectionLinks = [
  { id: "introduction", label: "Introduction" },
  { id: "intuition", label: "Intuition" },
  { id: "theory", label: "Core Theory" },
  { id: "derivation", label: "Derivation" },
  { id: "formulas", label: "Formulas" },
  { id: "examples", label: "Examples" },
  { id: "faq", label: "FAQ" },
  { id: "practice", label: "Practice" },
];

const faqItems = [
  {
    question: "Why do we use Fourier series only for periodic signals?",
    answer:
      "Fourier series represents a signal as repeated sinusoidal components at integer multiples of a fundamental frequency. That harmonic structure exists naturally when the signal repeats with a fixed period.",
  },
  {
    question: "What is the physical meaning of Fourier coefficients?",
    answer:
      "A Fourier coefficient tells how much of a particular sinusoidal frequency is present in the signal. Large coefficient means that frequency strongly contributes to the waveform shape.",
  },
  {
    question: "Why are sine and cosine used as building blocks?",
    answer:
      "Sinusoids are eigenfunctions of LTI systems and are orthogonal over a period. Orthogonality lets us separate one frequency component from another cleanly.",
  },
  {
    question: "What is the difference between Fourier series and Fourier transform?",
    answer:
      "Fourier series is used mainly for periodic signals and gives a discrete line spectrum. Fourier transform is used for aperiodic signals and gives a continuous spectrum.",
  },
  {
    question: "Which form is better for exams: trigonometric or exponential?",
    answer:
      "Use trigonometric form when the question emphasizes even and odd symmetry. Use exponential form when algebra, complex spectra, or system response is involved.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Fourier Series in Signals and Systems",
    description:
      "Conceptual ECE theory notes on Fourier series, harmonic representation, trigonometric and exponential forms, coefficients, spectra, examples, FAQs, and GATE preparation.",
    learningResourceType: "Theory Notes",
    educationalLevel: "Undergraduate engineering",
    teaches: [
      "Periodic signal representation",
      "Trigonometric Fourier series",
      "Exponential Fourier series",
      "Fourier coefficients",
      "Line spectrum",
      "Symmetry in Fourier series",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

function SpectrumSketch() {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f8fbff)] p-3">
      <svg
        viewBox="0 0 860 360"
        className="w-full"
        role="img"
        aria-label="Fourier series visualization showing a periodic waveform decomposed into harmonic line spectrum"
      >
        <rect width="860" height="360" rx="24" fill="#ffffff" />
        <text x="38" y="48" fill="#0f172a" fontSize="20" fontWeight="900">
          Periodic waveform to harmonic spectrum
        </text>

        <line x1="50" y1="190" x2="390" y2="190" stroke="#94a3b8" strokeWidth="2" />
        <line x1="70" y1="82" x2="70" y2="260" stroke="#94a3b8" strokeWidth="2" />
        <path
          d="M70 150 C92 92 122 92 144 150 C166 208 196 208 218 150 C240 92 270 92 292 150 C314 208 344 208 366 150"
          fill="none"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M70 128 L70 190 L144 190 L144 128 L218 128 L218 190 L292 190 L292 128 L366 128 L366 190"
          fill="rgba(37,99,235,.08)"
          stroke="#0f766e"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <text x="142" y="288" fill="#1d4ed8" fontSize="14" fontWeight="900">
          time-domain periodic signal x(t)
        </text>

        <path d="M420 182H478" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" markerEnd="url(#fsArrow)" />
        <text x="449" y="162" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="800">
          analyze
        </text>

        <line x1="520" y1="250" x2="810" y2="250" stroke="#94a3b8" strokeWidth="2" />
        <line x1="548" y1="78" x2="548" y2="270" stroke="#94a3b8" strokeWidth="2" />
        {[
          [568, 94, "f0"],
          [616, 132, "2f0"],
          [664, 164, "3f0"],
          [712, 196, "4f0"],
          [760, 220, "5f0"],
        ].map(([x, y, label]) => (
          <g key={label}>
            <line x1={x} y1="250" x2={x} y2={y} stroke="#7c3aed" strokeWidth="8" strokeLinecap="round" />
            <circle cx={x} cy={y} r="6" fill="#7c3aed" />
            <text x={x} y="275" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
              {label}
            </text>
          </g>
        ))}
        <text x="640" y="58" fill="#6d28d9" fontSize="15" fontWeight="900">
          discrete harmonic line spectrum
        </text>

        <defs>
          <marker id="fsArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0 0L9 4.5L0 9Z" fill="#0f172a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export default function FourierSeriesPage() {
  return (
    <Layout
      title="Fourier Series in Signals and Systems | ECE Theory Notes"
      description="Learn Fourier Series with deep intuition, trigonometric and exponential forms, coefficient derivation, harmonic spectrum, solved examples, FAQs, GATE notes, and interview questions."
      keywords="Fourier series signals and systems, trigonometric Fourier series, exponential Fourier series, Fourier coefficients, harmonic spectrum, GATE ECE"
      structuredData={structuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1200px] pb-20">
        <nav aria-label="Breadcrumb" className="mb-4 pt-1">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/signals-and-systems" className="font-medium text-slate-600 transition hover:text-portal-700">Signals and Systems</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="font-semibold text-portal-700">Fourier Series</span></li>
          </ol>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Signals and Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Fourier Series</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Fourier series says that a periodic signal, even if it looks sharp or complicated, can be built by adding sinusoids whose frequencies are integer multiples of one fundamental frequency.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Core question</p>
              <p className="mt-1 leading-6">Which frequencies are hiding inside this periodic waveform?</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Exam focus</p>
              <p className="mt-1 leading-6">Coefficients, symmetry shortcuts, spectra, Parseval-type energy ideas.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Engineering use</p>
              <p className="mt-1 leading-6">Signal analysis, communication, power electronics, audio, vibration, filters.</p>
            </div>
          </div>
        </header>

        <nav aria-label="Fourier Series topic sections" className="sticky top-20 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {sectionLinks.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-portal-200 hover:bg-portal-50 hover:text-portal-700"
              >
                {section.label}
              </a>
            ))}
          </div>
        </nav>

        <article className="mt-5 grid gap-5">
          <TopicSection id="introduction" title="Introduction">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Many real signals repeat: AC mains voltage, clock pulses, carrier waveforms, PWM signals, rotating-machine vibration, and periodic sensor patterns. Their shapes may not be pure sinusoids, but Fourier series teaches us that they can still be understood as a sum of pure sinusoidal ingredients.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This changes the way we see a signal. Instead of asking only how the waveform changes with time, we ask which frequencies are present, how strong they are, and how their phases combine to create the observed shape.
            </p>
          </TopicSection>

          <TopicSection id="why-it-matters" title="Why This Topic Matters">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Why engineers care">
                <BulletList items={["Filters are designed by knowing which harmonic components should pass or stop.", "Communication systems use frequency content to allocate bandwidth.", "Power electronics uses harmonic analysis to measure waveform distortion.", "Audio and vibration systems use spectra to identify tone, noise, and resonance."]} />
              </MiniCard>
              <MiniCard title="Why exams care">
                <BulletList items={["GATE often tests coefficient formulas and symmetry shortcuts.", "University exams ask derivations of trigonometric and exponential forms.", "Interviews test whether you can explain harmonics physically, not just write formulas."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="prerequisites" title="Prerequisites">
            <BulletList items={["Periodic signals and fundamental period.", "Sinusoidal signals, amplitude, phase, and angular frequency.", "Orthogonality of sine and cosine functions.", "Basic integration over one period.", "Even and odd symmetry of signals."]} />
          </TopicSection>

          <TopicSection id="intuition" title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Think of a periodic waveform as a musical chord. A chord sounds rich because several pure notes are present together. Similarly, a square wave or triangular wave has a fundamental sinusoid plus higher harmonics. The waveform shape is the result of all those harmonic components adding with the right amplitudes and phases.
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              Fourier series is not just a formula for expansion. It is a frequency microscope for periodic signals.
            </blockquote>
            <SpectrumSketch />
          </TopicSection>

          <TopicSection id="theory" title="Core Theory Explanation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Fundamental frequency</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              If a signal repeats every \(T_0\) seconds, its fundamental angular frequency is:
            </p>
            <FormulaBox>{"$$\\omega_0=\\frac{2\\pi}{T_0}$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Fourier series uses sinusoids at \(\omega_0, 2\omega_0, 3\omega_0\), and so on. These are harmonics. The first harmonic is the fundamental; higher harmonics refine the shape.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Why orthogonality matters</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Different harmonics are orthogonal over one period. In practical terms, one harmonic does not contaminate the measurement of another harmonic. This is why coefficient formulas can isolate each frequency component cleanly.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Spectrum view</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A periodic signal has a discrete spectrum. That means frequency components appear as lines at integer multiples of the fundamental frequency, not as a continuous spread.
            </p>
          </TopicSection>

          <TopicSection id="derivation" title="Mathematical Derivation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">1. Start with trigonometric expansion</h3>
            <FormulaBox>{"$$x(t)=a_0+\\sum_{n=1}^{\\infty}\\left[a_n\\cos(n\\omega_0t)+b_n\\sin(n\\omega_0t)\\right]$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The constant term \(a_0\) represents DC value. The cosine and sine coefficients decide the strength of each harmonic.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">2. Use orthogonality to isolate coefficients</h3>
            <FormulaBox>{"$$a_n=\\frac{2}{T_0}\\int_{t_0}^{t_0+T_0}x(t)\\cos(n\\omega_0t)dt$$"}</FormulaBox>
            <FormulaBox>{"$$b_n=\\frac{2}{T_0}\\int_{t_0}^{t_0+T_0}x(t)\\sin(n\\omega_0t)dt$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Multiplying by a matching sinusoid and integrating over one period extracts that component. Non-matching harmonics average to zero.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">3. Move to exponential form</h3>
            <FormulaBox>{"$$x(t)=\\sum_{n=-\\infty}^{\\infty}C_ne^{jn\\omega_0t}$$"}</FormulaBox>
            <FormulaBox>{"$$C_n=\\frac{1}{T_0}\\int_{t_0}^{t_0+T_0}x(t)e^{-jn\\omega_0t}dt$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The exponential form is compact and powerful because it handles magnitude and phase together through complex coefficients.
            </p>
          </TopicSection>

          <TopicSection id="formulas" title="Important Formulas">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Fundamental frequency">
                <FormulaBox>{"$$f_0=\\frac{1}{T_0},\\quad \\omega_0=\\frac{2\\pi}{T_0}$$"}</FormulaBox>
              </MiniCard>
              <MiniCard title="DC component">
                <FormulaBox>{"$$a_0=\\frac{1}{T_0}\\int_{t_0}^{t_0+T_0}x(t)dt$$"}</FormulaBox>
              </MiniCard>
              <MiniCard title="Trigonometric series">
                <FormulaBox>{"$$x(t)=a_0+\\sum_{n=1}^{\\infty}[a_n\\cos(n\\omega_0t)+b_n\\sin(n\\omega_0t)]$$"}</FormulaBox>
              </MiniCard>
              <MiniCard title="Exponential series">
                <FormulaBox>{"$$x(t)=\\sum_{n=-\\infty}^{\\infty}C_ne^{jn\\omega_0t}$$"}</FormulaBox>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="applications" title="Real-World Applications">
            <BulletList items={["Harmonic distortion analysis in power systems and inverters.", "Bandwidth estimation in communication channels.", "Audio equalization and tone analysis.", "Vibration diagnosis in motors and rotating machinery.", "Filter design for periodic noise removal.", "PWM waveform analysis in embedded and power electronics."]} />
          </TopicSection>

          <TopicSection id="examples" title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 1: Fundamental frequency</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">A periodic signal has period \(T_0=2 ms\). Find \(f_0\) and \(\omega_0\).</p>
            <FormulaBox>{"$$f_0=\\frac{1}{2\\times10^{-3}}=500\\;Hz$$"}</FormulaBox>
            <FormulaBox>{"$$\\omega_0=2\\pi f_0=1000\\pi\\;rad/s$$"}</FormulaBox>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 2: Symmetry shortcut</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              If \(x(t)\) is even, then all sine coefficients become zero because sine is odd and the product of even and odd is odd.
            </p>
            <FormulaBox>{"$$b_n=0\\quad \\text{for even }x(t)$$"}</FormulaBox>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 3: Square wave insight</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              A symmetric square wave contains strong odd harmonics. Higher harmonics sharpen the edges. If high harmonics are removed by a low-pass filter, the square wave becomes rounded.
            </p>
          </TopicSection>

          <TopicSection id="common-mistakes" title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Using Fourier series for non-periodic signals without periodic extension.", "Forgetting the DC term.", "Using wrong integration limits that do not cover exactly one period.", "Missing symmetry shortcuts and doing unnecessary integration.", "Confusing line spectrum of Fourier series with continuous spectrum of Fourier transform."]} />
          </TopicSection>

          <TopicSection id="comparison" title="Comparison Tables">
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-950">
                    <th className="border border-slate-200 px-3 py-2">Feature</th>
                    <th className="border border-slate-200 px-3 py-2">Fourier Series</th>
                    <th className="border border-slate-200 px-3 py-2">Fourier Transform</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr><td className="border border-slate-200 px-3 py-2">Signal type</td><td className="border border-slate-200 px-3 py-2">Periodic</td><td className="border border-slate-200 px-3 py-2">Aperiodic or finite-energy</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Spectrum</td><td className="border border-slate-200 px-3 py-2">Discrete lines</td><td className="border border-slate-200 px-3 py-2">Continuous curve</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Frequencies</td><td className="border border-slate-200 px-3 py-2">Integer multiples of \(f_0\)</td><td className="border border-slate-200 px-3 py-2">All real frequencies</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Output</td><td className="border border-slate-200 px-3 py-2">Coefficients</td><td className="border border-slate-200 px-3 py-2">Transform function</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection id="interview" title="Interview Questions">
            <BulletList items={["What is the physical meaning of Fourier series?", "Why does a periodic signal have a discrete spectrum?", "What are harmonics?", "How does symmetry simplify Fourier series?", "Why are sinusoids useful for LTI system analysis?", "What is the difference between trigonometric and exponential Fourier series?"]} />
          </TopicSection>

          <TopicSection id="exam-notes" title="Exam-Oriented Notes">
            <BulletList items={["Check periodicity and period before writing formulas.", "Use even symmetry to set sine coefficients to zero.", "Use odd symmetry to set cosine and DC coefficients to zero.", "Half-wave symmetry removes even harmonics in many standard waveforms.", "Line spacing in spectrum is equal to fundamental frequency \(f_0\)."]} />
          </TopicSection>

          <TopicSection id="revision" title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["Fourier series decomposes periodic signals into harmonics.", "Coefficients measure strength and phase of frequency components.", "Orthogonality is the reason coefficients can be extracted independently.", "Trigonometric form is intuitive; exponential form is compact.", "Periodic signals produce discrete line spectra."]} />
          </TopicSection>

          <TopicSection id="faq" title="Frequently Asked Questions">
            <div className="mt-4 grid gap-3">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <h3 className="text-base font-bold text-slate-950">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </TopicSection>

          <TopicSection id="practice" title="Practice Questions">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Conceptual</h3>
            <BulletList items={["Explain Fourier series using the idea of harmonics.", "Why does a square wave need many harmonics?", "Why do different harmonics not interfere while calculating coefficients?"]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Numerical</h3>
            <BulletList items={["Find \(f_0\) and \(\omega_0\) for a signal with \(T_0=4 ms\).", "For an even periodic signal, identify which Fourier coefficients are zero.", "Write the exponential Fourier series coefficient formula for a periodic signal."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">MCQs</h3>
            <BulletList items={["Fourier series is mainly used for periodic / aperiodic / random-only / DC-only signals.", "A periodic signal spectrum is discrete / continuous / zero / always flat.", "For an odd signal, cosine coefficients are usually zero / maximum / infinite / unchanged."]} />
          </TopicSection>
        </article>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/convolution" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Previous Convolution
          </Link>
          <Link href="/fourier-transform" className="next-topic-btn inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            Next Fourier Transform
          </Link>
        </div>
      </div>
    </Layout>
  );
}
