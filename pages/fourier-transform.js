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
    question: "Why do we need Fourier Transform after Fourier Series?",
    answer:
      "Fourier Series works naturally for periodic signals. Fourier Transform extends the same frequency-analysis idea to aperiodic signals, pulses, transients, and finite-energy waveforms.",
  },
  {
    question: "What does X(omega) physically mean?",
    answer:
      "X(omega) tells how much of each angular frequency is present in the signal, along with phase information. It is the signal's frequency-domain description.",
  },
  {
    question: "Why is the Fourier Transform spectrum continuous?",
    answer:
      "An aperiodic signal does not repeat with a single fundamental period, so its frequency content is not limited to integer harmonics. Frequencies can appear over a continuous range.",
  },
  {
    question: "How is Fourier Transform used in filtering?",
    answer:
      "Filtering becomes multiplication in frequency domain. If input spectrum is X(omega) and system response is H(omega), output spectrum is Y(omega)=X(omega)H(omega).",
  },
  {
    question: "What is the most common exam mistake in Fourier Transform?",
    answer:
      "Students often memorize pairs but forget the conditions and properties: time shifting, frequency shifting, scaling, convolution, and symmetry decide most exam shortcuts.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Fourier Transform in Signals and Systems",
    description:
      "Conceptual ECE notes on Fourier Transform, spectra, CTFT, DTFT intuition, transform properties, convolution property, examples, FAQs, GATE quick notes, and interview preparation.",
    learningResourceType: "Theory Quick Notes",
    educationalLevel: "Undergraduate engineering",
    teaches: [
      "Fourier Transform",
      "Frequency spectrum",
      "CTFT",
      "Fourier Transform properties",
      "Convolution property",
      "Frequency-domain filtering",
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

function SpectrumVisualizer() {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f8fbff)] p-3">
      <svg
        viewBox="0 0 860 360"
        className="w-full"
        role="img"
        aria-label="Fourier transform diagram showing a time-domain pulse converted into a continuous frequency spectrum"
      >
        <rect width="860" height="360" rx="24" fill="#ffffff" />
        <text x="38" y="48" fill="#0f172a" fontSize="20" fontWeight="900">
          Time waveform to continuous spectrum
        </text>

        <line x1="54" y1="230" x2="380" y2="230" stroke="#94a3b8" strokeWidth="2" />
        <line x1="92" y1="80" x2="92" y2="258" stroke="#94a3b8" strokeWidth="2" />
        <path
          d="M74 230 C118 226 126 120 180 120 L246 120 C300 120 308 226 356 230"
          fill="rgba(37,99,235,.16)"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text x="158" y="104" fill="#1d4ed8" fontSize="14" fontWeight="900">
          aperiodic pulse x(t)
        </text>

        <path d="M410 182H478" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ftArrow)" />
        <text x="444" y="162" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="800">
          transform
        </text>

        <line x1="520" y1="230" x2="810" y2="230" stroke="#94a3b8" strokeWidth="2" />
        <line x1="665" y1="76" x2="665" y2="258" stroke="#94a3b8" strokeWidth="2" />
        <path
          d="M526 222 C548 205 564 246 586 230 C610 210 622 144 642 102 C654 78 676 78 688 102 C708 144 720 210 744 230 C766 246 782 205 804 222"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M526 222 C548 205 564 246 586 230 C610 210 622 144 642 102 C654 78 676 78 688 102 C708 144 720 210 744 230 C766 246 782 205 804 222 L804 230 L526 230 Z"
          fill="rgba(124,58,237,.12)"
        />
        <text x="610" y="68" fill="#6d28d9" fontSize="15" fontWeight="900">
          continuous spectrum X(omega)
        </text>
        <text x="800" y="252" fill="#475569" fontSize="12" fontWeight="800">
          omega
        </text>

        <defs>
          <marker id="ftArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0 0L9 4.5L0 9Z" fill="#0f172a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export default function FourierTransformPage() {
  return (
    <Layout
      title="Fourier Transform GATE ECE Quick Notes + Properties + PYQs | Signals"
      description="Learn Fourier Transform with conceptual intuition, CTFT formula, physical meaning, properties, convolution theorem, spectra, solved examples, FAQs, GATE quick notes, and interview questions."
      keywords="Fourier transform signals and systems, CTFT, frequency spectrum, Fourier transform properties, convolution theorem, GATE ECE"
      structuredData={structuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1440px] pb-20">
        <nav aria-label="Breadcrumb" className="mb-4 pt-1">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Notes</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/signals-and-systems" className="font-medium text-slate-600 transition hover:text-portal-700">Signals and Systems</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="font-semibold text-portal-700">Fourier Transform</span></li>
          </ol>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Signals and Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Fourier Transform</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Fourier Transform converts a time-domain signal into its frequency-domain description. It tells which frequencies are present, how strong they are, and how their phases combine to create the waveform.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Core question</p>
              <p className="mt-1 leading-6">What frequency ingredients make this signal?</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Exam focus</p>
              <p className="mt-1 leading-6">Pairs, properties, shifting, scaling, convolution, Parseval ideas.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Engineering use</p>
              <p className="mt-1 leading-6">Filters, communication bandwidth, DSP, spectrum analysis, imaging.</p>
            </div>
          </div>
        </header>

        <nav aria-label="Fourier Transform topic sections" className="sticky top-20 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
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
              In time domain, a signal is viewed as amplitude versus time. That view is natural, but it hides frequency information. Fourier Transform opens the signal and shows its internal frequency composition.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This is why it is central to ECE. Filters, communication channels, audio systems, antennas, image processing, and DSP systems are often easier to understand by looking at spectra rather than raw waveforms.
            </p>
          </TopicSection>

          <TopicSection id="why-it-matters" title="Why This Topic Matters">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Why engineers care">
                <BulletList items={["A filter is designed by deciding which frequencies should pass or stop.", "A communication signal must fit inside available bandwidth.", "Noise is often easier to identify in spectrum than in time waveform.", "DSP algorithms use frequency-domain views for fast analysis and implementation."]} />
              </MiniCard>
              <MiniCard title="Why exams care">
                <BulletList items={["GATE repeatedly tests transform pairs and properties.", "University exams ask CTFT derivations and physical interpretation.", "Interviews check whether you understand spectrum, bandwidth, and convolution theorem."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="prerequisites" title="Prerequisites">
            <BulletList items={["Fourier Series and harmonic idea.", "Complex exponentials and Euler's formula.", "Impulse signal and basic integration.", "Even and odd symmetry.", "Convolution and LTI system response."]} />
          </TopicSection>

          <TopicSection id="intuition" title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Think of Fourier Transform as a frequency scanner. It tests the signal against every possible sinusoidal frequency. If the signal contains a strong component near a frequency, the transform value there becomes large.
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              Fourier Transform is not a trick for changing formulas. It is a way to see a signal by its frequency ingredients.
            </blockquote>
            <SpectrumVisualizer />
          </TopicSection>

          <TopicSection id="theory" title="Core Theory Explanation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">From Fourier Series to Fourier Transform</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Fourier Series represents periodic signals using discrete harmonics. If the period becomes very large, the harmonic spacing becomes very small. In the limit, the discrete line spectrum becomes a continuous spectrum. That limiting idea leads to Fourier Transform.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Continuous-Time Fourier Transform</h3>
            <FormulaBox>{"$$X(\\omega)=\\int_{-\\infty}^{\\infty}x(t)e^{-j\\omega t}dt$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The exponential term acts like a frequency probe. The integral measures how much the signal resembles that frequency over all time.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Inverse transform</h3>
            <FormulaBox>{"$$x(t)=\\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty}X(\\omega)e^{j\\omega t}d\\omega$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The inverse transform rebuilds the original signal by adding all frequency components with their correct magnitudes and phases.
            </p>
          </TopicSection>

          <TopicSection id="derivation" title="Mathematical Derivation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">1. Start from periodic representation</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A periodic signal has Fourier Series coefficients at multiples of \(\omega_0\). Frequency lines are separated by \(\omega_0\).
            </p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">2. Increase the period</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              As \(T_0\) increases, \(\omega_0=2\pi/T_0\) decreases. The lines move closer together.
            </p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">3. Take the limiting case</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              When \(T_0\to\infty\), the periodic repetition disappears and the spectrum becomes continuous. The summation over harmonics becomes an integral over frequency.
            </p>
            <FormulaBox>{"$$x(t)\\;\\Longleftrightarrow\\;X(\\omega)$$"}</FormulaBox>
          </TopicSection>

          <TopicSection id="formulas" title="Important Formulas">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="CTFT">
                <FormulaBox>{"$$X(\\omega)=\\int_{-\\infty}^{\\infty}x(t)e^{-j\\omega t}dt$$"}</FormulaBox>
              </MiniCard>
              <MiniCard title="Inverse CTFT">
                <FormulaBox>{"$$x(t)=\\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty}X(\\omega)e^{j\\omega t}d\\omega$$"}</FormulaBox>
              </MiniCard>
              <MiniCard title="Time shift">
                <FormulaBox>{"$$x(t-t_0)\\Longleftrightarrow e^{-j\\omega t_0}X(\\omega)$$"}</FormulaBox>
              </MiniCard>
              <MiniCard title="Convolution theorem">
                <FormulaBox>{"$$x(t)*h(t)\\Longleftrightarrow X(\\omega)H(\\omega)$$"}</FormulaBox>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="applications" title="Real-World Applications">
            <BulletList items={["Spectrum analyzers show signal frequency content using Fourier ideas.", "Communication systems use Fourier Transform to estimate bandwidth.", "Filters multiply input spectrum by frequency response.", "Image processing uses 2D Fourier Transform for sharpening, denoising, and compression.", "Audio engineering uses spectra for equalization and noise removal.", "Radar and medical imaging use transform-domain analysis for reconstruction and detection."]} />
          </TopicSection>

          <TopicSection id="examples" title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 1: Impulse transform</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">Find the Fourier Transform of \(\delta(t)\).</p>
            <FormulaBox>{"$$X(\\omega)=\\int_{-\\infty}^{\\infty}\\delta(t)e^{-j\\omega t}dt=1$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">An impulse contains all frequencies equally.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 2: Time shift meaning</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">If \(x(t)\Longleftrightarrow X(\omega)\), then delaying the signal by \(t_0\) gives:</p>
            <FormulaBox>{"$$x(t-t_0)\\Longleftrightarrow e^{-j\\omega t_0}X(\\omega)$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">Delay changes phase, not magnitude spectrum.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 3: Filtering insight</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              If a low-pass filter has frequency response \(H(\omega)\), high-frequency parts of \(X(\omega)\) are reduced in \(Y(\omega)=X(\omega)H(\omega)\). In time domain, this appears as smoothing.
            </p>
          </TopicSection>

          <TopicSection id="common-mistakes" title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Confusing Fourier Series line spectrum with Fourier Transform continuous spectrum.", "Forgetting the \(1/2\\pi\) factor in inverse CTFT.", "Treating time delay as magnitude change instead of phase change.", "Ignoring convergence and signal conditions.", "Mixing angular frequency \(\omega\) with ordinary frequency \(f\)."]} />
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
                  <tr><td className="border border-slate-200 px-3 py-2">Best for</td><td className="border border-slate-200 px-3 py-2">Periodic signals</td><td className="border border-slate-200 px-3 py-2">Aperiodic signals</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Spectrum</td><td className="border border-slate-200 px-3 py-2">Discrete line spectrum</td><td className="border border-slate-200 px-3 py-2">Continuous spectrum</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Math output</td><td className="border border-slate-200 px-3 py-2">Coefficients</td><td className="border border-slate-200 px-3 py-2">Function of frequency</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Frequency variable</td><td className="border border-slate-200 px-3 py-2">\(n\omega_0\)</td><td className="border border-slate-200 px-3 py-2">All \(\omega\)</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection id="interview" title="Interview Questions">
            <BulletList items={["What is the physical meaning of Fourier Transform?", "Why does an aperiodic signal have continuous spectrum?", "What happens to spectrum when a signal is delayed?", "How does convolution become multiplication in frequency domain?", "Why are sinusoids important for LTI systems?", "What is bandwidth from Fourier Transform viewpoint?"]} />
          </TopicSection>

          <TopicSection id="exam-notes" title="Exam-Oriented Quick Notes">
            <BulletList items={["Memorize core transform pairs, but depend on properties for speed.", "Time delay changes phase only.", "Narrower pulse in time usually means wider spectrum.", "Convolution in time becomes multiplication in frequency.", "Multiplication in time becomes convolution in frequency."]} />
          </TopicSection>

          <TopicSection id="revision" title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["Fourier Transform converts a signal into frequency-domain form.", "It is especially useful for aperiodic and finite-energy signals.", "Magnitude spectrum shows strength of frequencies.", "Phase spectrum shows timing and alignment information.", "LTI system output is easiest in frequency domain: \(Y=XH\)."]} />
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
            <BulletList items={["Explain Fourier Transform as a frequency scanner.", "Why does delay affect phase but not magnitude?", "Why does filtering become multiplication in frequency domain?"]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Numerical</h3>
            <BulletList items={["Find the Fourier Transform of \(\delta(t-t_0)\).", "Use time-shifting property for a delayed rectangular pulse.", "Given \(X(\omega)\) and \(H(\omega)\), write \(Y(\omega)\) for an LTI system."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">MCQs</h3>
            <BulletList items={["Fourier Transform of impulse is: 0 / 1 / delta / ramp.", "Time delay mainly changes: magnitude / phase / energy unit / sampling rate.", "Convolution in time corresponds to: addition / subtraction / multiplication / division in frequency."]} />
          </TopicSection>
        </article>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/fourier-series" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Previous Fourier Series
          </Link>
          <Link href="/laplace-transform" className="next-topic-btn inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            Next Laplace Transform
          </Link>
        </div>
      </div>
    </Layout>
  );
}
