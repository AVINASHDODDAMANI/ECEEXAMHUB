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
  { id: "roc", label: "ROC" },
  { id: "formulas", label: "Formulas" },
  { id: "examples", label: "Examples" },
  { id: "faq", label: "FAQ" },
  { id: "practice", label: "Practice" },
];

const faqItems = [
  {
    question: "Why do we study Laplace Transform after Fourier Transform?",
    answer:
      "Fourier Transform focuses on steady frequency content. Laplace Transform adds the real part sigma, so it can handle growth, decay, transients, and system stability more naturally.",
  },
  {
    question: "What is the physical meaning of s?",
    answer:
      "The variable s equals sigma plus j omega. The j omega part represents oscillation, while sigma represents exponential growth or decay.",
  },
  {
    question: "Why is ROC important?",
    answer:
      "The same algebraic expression can correspond to different time signals depending on the region of convergence. ROC also tells causality and stability for many LTI systems.",
  },
  {
    question: "How is Laplace Transform used for LTI systems?",
    answer:
      "It converts convolution in time into multiplication in the s-domain. If input is X(s) and system response is H(s), output is Y(s)=X(s)H(s).",
  },
  {
    question: "What is the difference between unilateral and bilateral Laplace Transform?",
    answer:
      "Bilateral Laplace integrates over all time and is useful for signals and systems theory. Unilateral Laplace starts at zero and is common for solving initial-condition problems.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Laplace Transform in Signals and Systems",
    description:
      "Conceptual ECE notes on Laplace Transform, s-domain intuition, region of convergence, poles and zeros, system response, examples, FAQs, GATE notes, and interview preparation.",
    learningResourceType: "Theory Notes",
    educationalLevel: "Undergraduate engineering",
    teaches: [
      "Laplace Transform",
      "s-domain",
      "Region of convergence",
      "Poles and zeros",
      "LTI system response",
      "Stability and causality",
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

function SPlaneSketch() {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f8fbff)] p-3">
      <svg
        viewBox="0 0 860 360"
        className="w-full"
        role="img"
        aria-label="Laplace transform s-plane diagram showing sigma axis, j omega axis, poles, zeros, and region of convergence"
      >
        <rect width="860" height="360" rx="24" fill="#ffffff" />
        <text x="38" y="48" fill="#0f172a" fontSize="20" fontWeight="900">
          Time behavior to s-plane view
        </text>

        <line x1="60" y1="230" x2="360" y2="230" stroke="#94a3b8" strokeWidth="2" />
        <line x1="86" y1="86" x2="86" y2="258" stroke="#94a3b8" strokeWidth="2" />
        <path
          d="M88 112 C122 130 160 166 198 196 C238 226 288 232 342 232"
          fill="none"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text x="126" y="96" fill="#1d4ed8" fontSize="14" fontWeight="900">
          decaying signal x(t)
        </text>

        <path d="M404 182H478" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lapArrow)" />
        <text x="441" y="162" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="800">
          transform
        </text>

        <rect x="525" y="70" width="285" height="230" rx="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="548" y1="185" x2="785" y2="185" stroke="#64748b" strokeWidth="2.5" />
        <line x1="650" y1="90" x2="650" y2="278" stroke="#64748b" strokeWidth="2.5" />
        <text x="780" y="207" fill="#475569" fontSize="13" fontWeight="900">sigma</text>
        <text x="660" y="102" fill="#475569" fontSize="13" fontWeight="900">j omega</text>

        <rect x="592" y="92" width="192" height="186" rx="16" fill="rgba(34,197,94,.12)" />
        <text x="706" y="116" fill="#15803d" fontSize="14" fontWeight="900">ROC</text>
        <g stroke="#dc2626" strokeWidth="4" strokeLinecap="round">
          <line x1="590" y1="164" x2="610" y2="184" />
          <line x1="610" y1="164" x2="590" y2="184" />
          <line x1="590" y1="214" x2="610" y2="234" />
          <line x1="610" y1="214" x2="590" y2="234" />
        </g>
        <circle cx="714" cy="150" r="10" fill="none" stroke="#7c3aed" strokeWidth="4" />
        <circle cx="714" cy="220" r="10" fill="none" stroke="#7c3aed" strokeWidth="4" />
        <text x="574" y="252" fill="#dc2626" fontSize="13" fontWeight="900">poles</text>
        <text x="730" y="252" fill="#6d28d9" fontSize="13" fontWeight="900">zeros</text>

        <defs>
          <marker id="lapArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0 0L9 4.5L0 9Z" fill="#0f172a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export default function LaplaceTransformPage() {
  return (
    <Layout
      title="Laplace Transform in Signals and Systems | ECE Theory Notes"
      description="Learn Laplace Transform with s-domain intuition, ROC, poles and zeros, formulas, system response, solved examples, FAQs, GATE notes, and interview questions."
      keywords="Laplace transform signals and systems, s-domain, region of convergence, ROC, poles and zeros, LTI system response, GATE ECE"
      structuredData={structuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1440px] pb-20">
        <nav aria-label="Breadcrumb" className="mb-4 pt-1">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/signals-and-systems" className="font-medium text-slate-600 transition hover:text-portal-700">Signals and Systems</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="font-semibold text-portal-700">Laplace Transform</span></li>
          </ol>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Signals and Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Laplace Transform</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Laplace Transform extends frequency-domain thinking by allowing signals to grow or decay exponentially. It is the bridge between time-domain transients, system stability, and transfer-function analysis.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Core question</p>
              <p className="mt-1 leading-6">How does a signal or system behave in the complex-frequency plane?</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Exam focus</p>
              <p className="mt-1 leading-6">ROC, poles, zeros, stability, causality, inverse transforms.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Engineering use</p>
              <p className="mt-1 leading-6">Control systems, filters, transient response, transfer functions.</p>
            </div>
          </div>
        </header>

        <nav aria-label="Laplace Transform topic sections" className="sticky top-20 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
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
              Fourier Transform is excellent for steady frequency analysis, but many engineering signals are not merely oscillatory. They start, die out, grow, decay, or switch. Laplace Transform handles those behaviors by using complex frequency.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              In Signals and Systems, Laplace Transform is used to understand system response, causality, stability, transfer functions, and the effect of poles and zeros on waveform behavior.
            </p>
          </TopicSection>

          <TopicSection id="why-it-matters" title="Why This Topic Matters">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Why engineers care">
                <BulletList items={["Transfer functions describe filters, control plants, and communication blocks.", "Poles predict decay, growth, oscillation, and stability.", "ROC tells whether a system is causal, anti-causal, or stable.", "Transient and steady-state behavior can be read from the s-domain."]} />
              </MiniCard>
              <MiniCard title="Why exams care">
                <BulletList items={["GATE frequently tests ROC, pole-zero plots, and stability.", "University exams ask unilateral and bilateral transform basics.", "Interviews often ask how pole location affects time response."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="prerequisites" title="Prerequisites">
            <BulletList items={["Fourier Transform and complex exponentials.", "Exponential signals.", "Impulse response and convolution.", "Basic complex numbers.", "Causality and BIBO stability."]} />
          </TopicSection>

          <TopicSection id="intuition" title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Fourier Transform uses \(j\omega\), which represents pure oscillation. Laplace Transform uses \(s=\sigma+j\omega\). The extra \(\sigma\) part lets us describe exponential decay or growth along with oscillation.
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              Laplace Transform is a stability microscope: it shows whether natural responses die out, persist, or grow.
            </blockquote>
            <SPlaneSketch />
          </TopicSection>

          <TopicSection id="theory" title="Core Theory Explanation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Bilateral Laplace Transform</h3>
            <FormulaBox>{"$$X(s)=\\int_{-\\infty}^{\\infty}x(t)e^{-st}dt$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This form studies the full signal over all time and is especially useful in Signals and Systems theory.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Unilateral Laplace Transform</h3>
            <FormulaBox>{"$$X(s)=\\int_{0^-}^{\\infty}x(t)e^{-st}dt$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This one-sided form is common when initial conditions matter, especially in circuits and control systems.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Transfer function</h3>
            <FormulaBox>{"$$H(s)=\\frac{Y(s)}{X(s)}$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              For an LTI system, the transfer function is the Laplace Transform of the impulse response when initial conditions are zero.
            </p>
          </TopicSection>

          <TopicSection id="roc" title="Region of Convergence">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The Region of Convergence is the set of \(s\)-values for which the Laplace integral converges. It is not a small detail; it changes the meaning of the transform.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Right-sided signal">
                <p className="mt-2 text-sm leading-6 text-slate-700">ROC is usually to the right of the rightmost pole. This is typical for causal systems.</p>
              </MiniCard>
              <MiniCard title="Left-sided signal">
                <p className="mt-2 text-sm leading-6 text-slate-700">ROC is usually to the left of the leftmost pole. This corresponds to anti-causal behavior.</p>
              </MiniCard>
              <MiniCard title="Two-sided signal">
                <p className="mt-2 text-sm leading-6 text-slate-700">ROC lies between poles. Stability depends on whether the \(j\omega\)-axis is included.</p>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="derivation" title="Mathematical Derivation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">{"Example derivation for \\(e^{-at}u(t)\\)"}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"For \\(x(t)=e^{-at}u(t)\\):"}</p>
            <FormulaBox>{"$$X(s)=\\int_{0}^{\\infty}e^{-at}e^{-st}dt$$"}</FormulaBox>
            <FormulaBox>{"$$X(s)=\\int_{0}^{\\infty}e^{-(s+a)t}dt=\\frac{1}{s+a}$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              {"The integral converges only when \\(\\text{Re}(s+a)>0\\), so the ROC is \\(\\text{Re}(s)>-a\\)."}
            </p>
          </TopicSection>

          <TopicSection id="formulas" title="Important Formulas">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Bilateral transform">
                <FormulaBox>{"$$X(s)=\\int_{-\\infty}^{\\infty}x(t)e^{-st}dt$$"}</FormulaBox>
              </MiniCard>
              <MiniCard title="Inverse transform">
                <FormulaBox>{"$$x(t)=\\frac{1}{2\\pi j}\\int_{\\gamma-j\\infty}^{\\gamma+j\\infty}X(s)e^{st}ds$$"}</FormulaBox>
              </MiniCard>
              <MiniCard title="Convolution">
                <FormulaBox>{"$$x(t)*h(t)\\Longleftrightarrow X(s)H(s)$$"}</FormulaBox>
              </MiniCard>
              <MiniCard title="Differentiation">
                <FormulaBox>{"$$\\frac{dx(t)}{dt}\\Longleftrightarrow sX(s)$$"}</FormulaBox>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="applications" title="Real-World Applications">
            <BulletList items={["Transfer-function modeling in control systems.", "Stability analysis from pole locations.", "Analog filter design using poles and zeros.", "Transient response of systems after switching or sudden input.", "Communication channel modeling with exponential modes.", "Signal reconstruction and system identification."]} />
          </TopicSection>

          <TopicSection id="examples" title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 1: Transform of unit step</h3>
            <FormulaBox>{"$$u(t)\\Longleftrightarrow \\frac{1}{s},\\quad ROC:\\;Re(s)>0$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"A unit step does not decay, so convergence requires the exponential weighting \\(e^{-st}\\) to decay."}</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 2: Stability from poles</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">If a causal system has all poles in the left half-plane, its natural response decays with time.</p>
            <FormulaBox>{"$$poles:\\;-2,\\;-5\\quad \\Rightarrow\\quad stable\\;causal\\;system$$"}</FormulaBox>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 3: Output of LTI system</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">If \(X(s)=1/s\) and \(H(s)=1/(s+2)\), then:</p>
            <FormulaBox>{"$$Y(s)=X(s)H(s)=\\frac{1}{s(s+2)}$$"}</FormulaBox>
          </TopicSection>

          <TopicSection id="common-mistakes" title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Writing only \(X(s)\) and ignoring ROC.", "Assuming the same algebraic expression always means the same signal.", "Confusing Fourier axis \(j\\omega\) with the full s-plane.", "Forgetting that causal stability requires poles in the left half-plane.", "Mixing unilateral and bilateral formulas without checking the problem context."]} />
          </TopicSection>

          <TopicSection id="comparison" title="Comparison Tables">
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-950">
                    <th className="border border-slate-200 px-3 py-2">Feature</th>
                    <th className="border border-slate-200 px-3 py-2">Fourier Transform</th>
                    <th className="border border-slate-200 px-3 py-2">Laplace Transform</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr><td className="border border-slate-200 px-3 py-2">Variable</td><td className="border border-slate-200 px-3 py-2">\(j\omega\)</td><td className="border border-slate-200 px-3 py-2">\(s=\sigma+j\omega\)</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Focus</td><td className="border border-slate-200 px-3 py-2">Frequency content</td><td className="border border-slate-200 px-3 py-2">Growth, decay, stability, frequency</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Convergence</td><td className="border border-slate-200 px-3 py-2">Often stricter</td><td className="border border-slate-200 px-3 py-2">Handled by ROC</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Best use</td><td className="border border-slate-200 px-3 py-2">Spectrum and filtering</td><td className="border border-slate-200 px-3 py-2">System analysis and transients</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection id="interview" title="Interview Questions">
            <BulletList items={["What does the real part of \(s\) represent?", "Why is ROC necessary in Laplace Transform?", "How do poles affect time response?", "When is a causal LTI system stable?", "How is Fourier Transform related to Laplace Transform?", "Why does convolution become multiplication in the s-domain?"]} />
          </TopicSection>

          <TopicSection id="exam-notes" title="Exam-Oriented Notes">
            <BulletList items={["Always write ROC along with \(X(s)\).", "For causal right-sided signals, ROC lies to the right of the rightmost pole.", "A stable system must have ROC including the \(j\omega\)-axis.", "For causal stable systems, all poles must lie in the left half-plane.", "Use pole-zero plots to infer response before doing algebra."]} />
          </TopicSection>

          <TopicSection id="revision" title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["Laplace Transform generalizes Fourier Transform using \(s=\\sigma+j\\omega\).", "ROC determines convergence and signal interpretation.", "Poles shape natural response and stability.", "Transfer function is \(H(s)=Y(s)/X(s)\).", "Convolution in time becomes multiplication in s-domain."]} />
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
            <BulletList items={["Explain why Laplace Transform is more general than Fourier Transform.", "Why can the same \(X(s)\) represent different signals?", "How does ROC reveal causality?"]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Numerical</h3>
            <BulletList items={["Find the Laplace Transform and ROC of \(e^{-3t}u(t)\).", "Given poles at \(-1\) and \(-4\), decide whether a causal system is stable.", "Find \(Y(s)\) for an LTI system with \(X(s)=1/s\) and \(H(s)=1/(s+5)\)."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">MCQs</h3>
            <BulletList items={["The variable \(s\) equals: \(\\sigma+j\\omega\) / only \(j\\omega\) / only time / only frequency index.", "For causal stable continuous-time systems, poles lie in: left half-plane / right half-plane / only origin / anywhere.", "ROC of a right-sided signal is usually: right of rightmost pole / left of leftmost pole / exactly at pole / empty."]} />
          </TopicSection>
        </article>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/fourier-transform" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Previous Fourier Transform
          </Link>
          <Link href="/z-transform" className="next-topic-btn inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            Next Z-Transform
          </Link>
        </div>
      </div>
    </Layout>
  );
}
