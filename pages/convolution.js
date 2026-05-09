import Link from "next/link";
import ConvolutionVisualizer from "../components/ConvolutionVisualizer";
import Layout from "../components/layout";

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

function FormulaBox({ children }) {
  return (
    <div className="mt-3 rounded-xl border border-portal-100 bg-[#f8fbff] px-4 py-3 font-mono text-sm font-bold leading-7 text-slate-950 sm:text-base">
      {children}
    </div>
  );
}

function TopicSection({ id, title, children }) {
  return (
    <section id={id} className="topic-section scroll-mt-32 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
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

const sectionLinks = [
  { id: "introduction", label: "Introduction" },
  { id: "intuition", label: "Intuition" },
  { id: "theory", label: "Core Theory" },
  { id: "derivation", label: "Derivation" },
  { id: "frequency-behavior", label: "Frequency View" },
  { id: "examples", label: "Examples" },
  { id: "faq", label: "FAQ" },
  { id: "practice", label: "Practice" },
];

const faqItems = [
  {
    question: "Why is convolution used only so often with LTI systems?",
    answer:
      "Linearity lets us add the responses due to small input pieces, and time invariance lets us shift the impulse response without changing its shape. Without these two properties, the neat convolution formula does not generally describe the system output.",
  },
  {
    question: "Why do we flip one signal during graphical convolution?",
    answer:
      "The flipped term comes from h(t - tau). For a fixed output time t, tau moves in the opposite direction inside the impulse-response argument. The flip is not a trick; it is the geometry of the expression.",
  },
  {
    question: "Is convolution the same as multiplication?",
    answer:
      "No. Multiplication combines two signal values at the same instant. Convolution combines one signal with many delayed values of another signal, so it represents memory and accumulation.",
  },
  {
    question: "How does convolution relate to filtering?",
    answer:
      "A filter output is the input signal convolved with the filter impulse response. In the frequency domain, this same operation becomes multiplication by the frequency response.",
  },
  {
    question: "What is the fastest exam method for convolution problems?",
    answer:
      "For short discrete sequences, use the tabular or polynomial method. For simple continuous shapes, use overlap area. For complicated signals, move to Laplace or Fourier domain if allowed.",
  },
];

const convolutionStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Convolution in Signals and Systems",
    description:
      "Conceptual ECE notes on convolution, impulse response, LTI system output, graphical convolution, frequency behavior, formulas, examples, FAQs, and exam preparation.",
    learningResourceType: "Theory Notes",
    educationalLevel: "Undergraduate engineering",
    teaches: [
      "Convolution integral",
      "Convolution sum",
      "Impulse response",
      "LTI system response",
      "Graphical convolution",
      "Frequency-domain interpretation",
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

function AnimatedConvolutionExplanation() {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f8fbff)] p-3">
      <style jsx>{`
        @keyframes flipSlide {
          0% { transform: translateX(-170px) scaleX(-1); opacity: .45; }
          45% { opacity: 1; }
          100% { transform: translateX(190px) scaleX(-1); opacity: .45; }
        }
        @keyframes overlapPulse {
          0%, 100% { opacity: .25; transform: scaleY(.5); }
          50% { opacity: .9; transform: scaleY(1); }
        }
        @keyframes resultDraw {
          0% { stroke-dashoffset: 420; }
          75%, 100% { stroke-dashoffset: 0; }
        }
      `}</style>
      <svg viewBox="0 0 900 430" className="w-full" role="img" aria-label="Animated convolution flip shift multiply integrate operation">
        <rect width="900" height="430" rx="28" fill="#ffffff" />
        <text x="44" y="54" fill="#0f172a" fontSize="20" fontWeight="900">Animated working: flip, shift, multiply overlap, integrate area</text>

        <line x1="70" y1="175" x2="430" y2="175" stroke="#94a3b8" strokeWidth="2" />
        <line x1="250" y1="90" x2="250" y2="245" stroke="#94a3b8" strokeWidth="2" />
        <path d="M120 175 L172 122 L226 122 L278 175" fill="rgba(37,99,235,.16)" stroke="#2563eb" strokeWidth="4" strokeLinejoin="round" />
        <text x="174" y="105" fill="#1d4ed8" fontSize="14" fontWeight="900">input x(tau)</text>

        <g style={{ animation: "flipSlide 4s ease-in-out infinite", transformOrigin: "250px 175px" }}>
          <path d="M278 175 L330 126 L382 175" fill="rgba(249,115,22,.18)" stroke="#f97316" strokeWidth="4" strokeLinejoin="round" />
          <text x="342" y="112" fill="#c2410c" fontSize="14" fontWeight="900">h(t - tau)</text>
        </g>

        <rect x="205" y="123" width="105" height="52" rx="10" fill="#22c55e" opacity=".35" style={{ animation: "overlapPulse 2.2s ease-in-out infinite", transformOrigin: "257px 175px" }} />
        <text x="250" y="268" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="900">overlap area becomes one output value y(t)</text>

        <path d="M470 175H540" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" markerEnd="url(#convArrow)" />
        <text x="505" y="154" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="800">integrate</text>

        <line x1="575" y1="305" x2="840" y2="305" stroke="#94a3b8" strokeWidth="2" />
        <line x1="575" y1="200" x2="575" y2="330" stroke="#94a3b8" strokeWidth="2" />
        <path d="M580 302 C620 296 642 252 680 232 C716 214 760 238 800 282 C818 300 830 305 840 305" fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" strokeDasharray="420" style={{ animation: "resultDraw 4s ease-in-out infinite" }} />
        <text x="708" y="214" textAnchor="middle" fill="#6d28d9" fontSize="15" fontWeight="900">output y(t)=x(t)*h(t)</text>

        <defs>
          <marker id="convArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0 0L9 4.5L0 9Z" fill="#0f172a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export default function ConvolutionPage() {
  return (
    <Layout
      title="Convolution in Signals and Systems | ECE Theory Notes"
      description="Learn convolution for Signals and Systems with intuition, LTI system theory, derivation, formulas, graphical method, solved examples, FAQs, GATE notes, and interview questions."
      keywords="convolution signals and systems, convolution integral, convolution sum, LTI system response, impulse response, graphical convolution, GATE ECE signals"
      structuredData={convolutionStructuredData}
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
            <li><span className="font-semibold text-portal-700">Convolution</span></li>
          </ol>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Signals and Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Convolution</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Convolution is the time-domain language of system memory. It tells how every small piece of an input signal excites an LTI system and how all those delayed responses combine to form the output.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Exam focus</p>
              <p className="mt-1 leading-6">Graphical convolution, impulse response, finite-sequence output length.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Engineering use</p>
              <p className="mt-1 leading-6">Filtering, channel modeling, echo, image kernels, control response.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Core idea</p>
              <p className="mt-1 leading-6">Break input into impulses, shift responses, add contributions.</p>
            </div>
          </div>
        </header>

        <nav aria-label="Convolution topic sections" className="sticky top-20 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
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
          <TopicSection title="Introduction" id="introduction">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              A beginner often sees convolution as a strange integral with a flipped signal. That is understandable. The notation looks heavier than the idea. In reality, convolution is the answer to a very practical question: if a signal enters a system that has memory, how do the past values of the input keep influencing the present output?
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The impulse response captures the personality of the system. Convolution uses that personality to predict the output for any input. This is why the topic sits at the center of Signals and Systems, DSP, communication systems, image processing, and control theory.
            </p>
          </TopicSection>

          <TopicSection id="why-it-matters" title="Why This Topic Matters">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Industry relevance">
                <BulletList items={["Digital filters use convolution to smooth, sharpen, or remove noise.", "Communication receivers model channel distortion using convolution.", "Image processing uses 2D convolution for blur, edge detection, and enhancement.", "Audio systems use convolution for echo, reverberation, and equalization."]} />
              </MiniCard>
              <MiniCard title="Exam relevance">
                <BulletList items={["GATE frequently tests graphical convolution and LTI output.", "University exams ask continuous and discrete convolution derivations.", "Interviews test whether you understand impulse response physically."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="prerequisites" title="Prerequisites">
            <BulletList items={["Input-output idea of a system.", "Impulse response $$h(t)$$ or $$h[n]$$.", "Time shifting and reversal.", "Integration and summation basics.", "Linearity and time invariance."]} />
          </TopicSection>

          <TopicSection id="intuition" title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Imagine the input signal is a sequence of tiny impulses. An LTI system responds to each tiny impulse with a shifted and scaled copy of its impulse response. The final output is the sum of all those small responses.
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              Convolution is not just a formula. It is the accumulation of all delayed system responses caused by all parts of the input.
            </blockquote>
            <ConvolutionVisualizer />
          </TopicSection>

          <TopicSection id="theory" title="Core Theory Explanation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Impulse response as system identity</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              The impulse response $$h(t)$$ tells how the system reacts to a unit impulse. For an LTI system, this single response is enough to predict the output for any input.
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              This is a powerful engineering simplification. Instead of testing a system with every possible input, we test it with one ideal input, the impulse, and use convolution to build all other responses from it.
            </p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">Superposition of shifted responses</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              {"Each small input piece at time $$\\tau$$ produces a response shaped like $$h(t-\\tau)$$. Multiplying by input strength $$x(\\tau)$$ and adding all pieces gives output."}
            </p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">System memory hidden inside the formula</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              If $$h(t)$$ lasts for a long time, one input event keeps affecting the output for a long time. If $$h(t)$$ dies quickly, the system forgets quickly. So the width and shape of the impulse response tell us how much memory the system has.
            </p>
          </TopicSection>

          <TopicSection id="derivation" title="Step-by-Step Mathematical Derivation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">1. Represent input using impulses</h3>
            <FormulaBox>{"$$x(t)=\\int_{-\\infty}^{\\infty}x(\\tau)\\delta(t-\\tau)d\\tau$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">This says the signal can be viewed as a continuous collection of shifted impulses.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">2. System response to one shifted impulse</h3>
            <FormulaBox>{"$$\\delta(t-\\tau) \\to h(t-\\tau)$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">Because the system is time invariant, delaying the impulse delays the impulse response.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">3. Add every scaled response</h3>
            <FormulaBox>{"$$y(t)=\\int_{-\\infty}^{\\infty}x(\\tau)h(t-\\tau)d\\tau$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{"The integral adds all tiny response contributions. The variable $$\\tau$$ is only a sliding integration variable."}</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">4. Discrete-time form</h3>
            <FormulaBox>{"$$y[n]=\\sum_{k=-\\infty}^{\\infty}x[k]h[n-k]$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">For sampled systems, integration becomes summation over sample index $$k$$.</p>
          </TopicSection>

          <TopicSection id="working-principle" title="Working Principle">
            <BulletList items={["Flip one signal in time.", "Shift it across the other signal.", "Multiply the overlapping portions.", "Integrate or sum the overlap area.", "Repeat for every shift to form the full output waveform."]} />
            <AnimatedConvolutionExplanation />
          </TopicSection>

          <TopicSection id="frequency-behavior" title="Frequency Behavior and Engineering Meaning">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Time-domain convolution has a beautiful frequency-domain interpretation. When two signals are convolved in time, their Fourier transforms multiply in frequency:
            </p>
            <FormulaBox>{"$$x(t)*h(t) \\;\\Longleftrightarrow\\; X(j\\omega)H(j\\omega)$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              {"This is the reason filters are so easy to understand in the frequency domain. The input spectrum $$X(j\\omega)$$ contains all frequency components present in the signal. The system frequency response $$H(j\\omega)$$ decides which components are passed, weakened, delayed, or phase shifted."}
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Low-pass behavior">
                <p className="mt-2 text-sm leading-6 text-slate-700">A smooth impulse response often suppresses rapid changes, so high-frequency components reduce at the output.</p>
              </MiniCard>
              <MiniCard title="Channel behavior">
                <p className="mt-2 text-sm leading-6 text-slate-700">A communication channel spreads pulses in time. Convolution explains intersymbol interference and multipath delay.</p>
              </MiniCard>
              <MiniCard title="Implementation view">
                <p className="mt-2 text-sm leading-6 text-slate-700">DSP hardware computes convolution using multiply-accumulate operations, especially in FIR filters.</p>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="diagram-explanation" title="Diagram Explanation">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Graphical Convolution Flip-Shift Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">LTI System Block Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Impulse Response Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Discrete Convolution Table Here</div>
            </div>
          </TopicSection>

          <TopicSection id="formulas" title="Important Formulas">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Continuous convolution"><FormulaBox>{"$$y(t)=x(t)*h(t)=\\int_{-\\infty}^{\\infty}x(\\tau)h(t-\\tau)d\\tau$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Adds all delayed impulse-response contributions.</p></MiniCard>
              <MiniCard title="Discrete convolution"><FormulaBox>{"$$y[n]=x[n]*h[n]=\\sum_{k=-\\infty}^{\\infty}x[k]h[n-k]$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Used directly in FIR filters and DSP.</p></MiniCard>
              <MiniCard title="Commutative property"><FormulaBox>{"$$x*h=h*x$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Either signal can be flipped and shifted.</p></MiniCard>
              <MiniCard title="Impulse property"><FormulaBox>{"$$x(t)*\\delta(t)=x(t)$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Impulse acts like the identity element of convolution.</p></MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="applications" title="Real-World Applications">
            <BulletList items={["FIR digital filtering in DSP processors.", "Wireless channel modeling where received signal is transmitted signal convolved with channel response.", "Image kernels for blur, sharpen, and edge detection.", "Audio reverb using room impulse response.", "Control system response from input and impulse response."]} />
          </TopicSection>

          <TopicSection id="examples" title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Beginner example: impulse input</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"If input is $$x(t)=\\delta(t)$$, output is:"}</p>
            <FormulaBox>{"$$y(t)=\\delta(t)*h(t)=h(t)$$"}</FormulaBox>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Intermediate numerical: discrete convolution</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">Let $$x[n]=[1,2]$$ and $$h[n]=[1,1]$$.</p>
            <FormulaBox>{"$$y[0]=1,\\quad y[1]=1+2=3,\\quad y[2]=2$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">So $$y[n]=[1,3,2]$$.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Advanced problem: rectangular pulses</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">Convolving two equal rectangular pulses produces a triangular waveform because overlap area first increases linearly, then decreases linearly.</p>
          </TopicSection>

          <TopicSection id="common-mistakes" title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Forgetting to flip one signal before shifting.", "Using $$h(t+\\tau)$$ instead of $$h(t-\\tau)$$ without tracking variables.", "Confusing multiplication with convolution.", "Ignoring overlap limits in graphical convolution.", "Forgetting that convolution length in discrete finite sequences is $$L_x+L_h-1$$."]} />
          </TopicSection>

          <TopicSection id="comparison" title="Comparison Tables">
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead><tr className="bg-slate-100 text-slate-950"><th className="border border-slate-200 px-3 py-2">Operation</th><th className="border border-slate-200 px-3 py-2">Meaning</th><th className="border border-slate-200 px-3 py-2">Result</th></tr></thead>
                <tbody className="text-slate-700">
                  <tr><td className="border border-slate-200 px-3 py-2">Multiplication</td><td className="border border-slate-200 px-3 py-2">Point-by-point product</td><td className="border border-slate-200 px-3 py-2">Instant interaction only</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Convolution</td><td className="border border-slate-200 px-3 py-2">Flip, shift, overlap, add</td><td className="border border-slate-200 px-3 py-2">Full system response</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Correlation</td><td className="border border-slate-200 px-3 py-2">Similarity versus shift</td><td className="border border-slate-200 px-3 py-2">Detection and matching</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection id="interview" title="Interview Questions">
            <BulletList items={["What is convolution physically?", "Why does LTI system output use convolution?", "What is impulse response?", "Why do we flip one signal in graphical convolution?", "How is convolution used in filtering?", "What is the difference between convolution and multiplication?"]} />
          </TopicSection>

          <TopicSection id="exam-notes" title="Exam-Oriented Notes">
            <BulletList items={["For finite discrete sequences, output length is $$L_x+L_h-1$$.", "Impulse convolved with any signal gives the same signal.", "Convolution is commutative, associative, and distributive.", "Graphical convolution requires careful overlap limits.", "For LTI systems, output equals input convolved with impulse response."]} />
          </TopicSection>

          <TopicSection id="revision" title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["Convolution gives output of an LTI system.", "Continuous convolution uses integration.", "Discrete convolution uses summation.", "Graphical method: flip, shift, multiply, integrate.", "Impulse response completely characterizes an LTI system."]} />
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
            <BulletList items={["Explain convolution using impulse response.", "Why does convolution involve shifting?", "What happens when a signal is convolved with impulse?"]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Numerical</h3>
            <BulletList items={["Find convolution of $$[1,1,1]$$ and $$[1,2]$$.", "Find output if $$x(t)=\\delta(t-2)$$ enters an LTI system with impulse response $$h(t)$$.", "Sketch convolution of two unit rectangular pulses."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">MCQs</h3>
            <BulletList items={["Convolution of a signal with impulse gives: zero / same signal / derivative / integral.", "Discrete convolution of lengths 3 and 4 has length: 4 / 5 / 6 / 7.", "For LTI systems, output is: $$x+h$$ / $$xh$$ / $$x*h$$ / $$x-h$$."]} />
          </TopicSection>
        </article>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/mathematical-representation-of-signals" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Mathematical Representation of Signals
          </Link>
          <Link href="/fourier-series" className="next-topic-btn inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            Next Fourier Series
          </Link>
        </div>
      </div>
    </Layout>
  );
}
