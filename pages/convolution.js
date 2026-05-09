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
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="topic-section scroll-mt-32 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <h2 id={headingId} className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
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

const SITE_URL = "https://eceexamguide.vercel.app";

const sectionLinks = [
  { id: "introduction", label: "Introduction" },
  { id: "intuition", label: "Intuition" },
  { id: "mathematical-definition", label: "Mathematical Definition" },
  { id: "continuous-time", label: "Continuous-Time Convolution" },
  { id: "discrete-time", label: "Discrete-Time Convolution" },
  { id: "graphical-interpretation", label: "Graphical Interpretation" },
  { id: "lti-systems", label: "LTI Systems" },
  { id: "fourier-transform-relation", label: "Fourier Transform Relation" },
  { id: "applications", label: "Applications" },
  { id: "examples", label: "Solved Examples" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "faq", label: "FAQ" },
  { id: "summary", label: "Summary" },
];

const faqItems = [
  {
    question: "What is convolution in signals and systems?",
    answer:
      "Convolution is the operation used to find how one signal combines with another through shifting, multiplication, and accumulation. In Signals and Systems, it most often gives the output of an LTI system from the input and impulse response.",
  },
  {
    question: "Why is convolution important?",
    answer:
      "It connects input signals, impulse response, filtering, memory, and system output in one framework. Once convolution is clear, LTI systems, Fourier Transform properties, communication channels, and DSP filters become much easier to understand.",
  },
  {
    question: "What is the difference between convolution and correlation?",
    answer:
      "Convolution predicts system response by flipping, shifting, multiplying, and accumulating. Correlation measures similarity between signals as one is shifted, and is widely used for detection, synchronization, and pattern matching.",
  },
  {
    question: "Why is one signal reversed in convolution?",
    answer:
      "The reversal appears because the impulse response term is h(t - tau) or h[n-k]. For a fixed output time, the integration or summation variable moves opposite inside that expression. The flip is the geometry of the formula, not an arbitrary rule.",
  },
  {
    question: "What is the convolution theorem?",
    answer:
      "The convolution theorem says convolution in time domain becomes multiplication in frequency domain. For an LTI system, y(t)=x(t)*h(t) becomes Y(omega)=X(omega)H(omega).",
  },
  {
    question: "How is convolution related to Fourier Transform?",
    answer:
      "Fourier Transform turns convolution into multiplication, so filtering and LTI system analysis become simpler in frequency domain. The impulse response h(t) becomes frequency response H(omega).",
  },
  {
    question: "What is the use of convolution in engineering?",
    answer:
      "Convolution is used in FIR filters, communication channel modeling, audio reverberation, image processing kernels, radar echo analysis, control-system response, and probability distribution calculations.",
  },
];

const convolutionStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Convolution in Signals and Systems",
    description:
      "A professor-style ECE tutorial on convolution in signals and systems, covering intuition, continuous-time convolution, discrete-time convolution, LTI system response, graphical convolution, the convolution theorem, solved examples, FAQs, and exam preparation.",
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
    "@type": "Article",
    headline: "Convolution in Signals and Systems",
    description:
      "A concept-first Signals and Systems tutorial explaining convolution of signals, graphical convolution, continuous-time and discrete-time forms, LTI system response, and the convolution theorem.",
    author: {
      "@type": "Organization",
      name: "ECE Exam Guide",
    },
    publisher: {
      "@type": "Organization",
      name: "ECE Exam Guide",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/ece-exam-guide-mark-v2.svg`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/convolution`,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Subjects", item: `${SITE_URL}/subjects` },
      { "@type": "ListItem", position: 3, name: "Signals and Systems", item: `${SITE_URL}/subjects/signals-and-systems` },
      { "@type": "ListItem", position: 4, name: "Convolution", item: `${SITE_URL}/convolution` },
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
      title="Convolution Explained | Signals and Systems ECE Tutorial"
      description="Convolution in Signals and Systems explained with intuition, graphical convolution, continuous-time and discrete-time formulas, LTI system response, convolution theorem, solved examples, FAQs, and GATE exam notes."
      keywords="convolution in signals and systems, convolution explained, continuous time convolution, discrete time convolution, convolution of signals, LTI systems convolution, convolution theorem, engineering mathematics convolution, signals and systems tutorial"
      ogType="article"
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
          <h1 id="convolution-page-title" className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Convolution</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Convolution is the time-domain language of system memory. It explains how every small part of an input signal excites an LTI system, and how those delayed responses add up to the waveform we finally observe at the output.
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
              <p className="mt-1 leading-6">Break input into impulses, delay responses, accumulate the result.</p>
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

        <article className="mt-5 grid gap-5" aria-labelledby="convolution-page-title">
          <TopicSection title="Introduction" id="introduction">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Most students first meet convolution as a formula with a reversed signal, a dummy variable, and uncomfortable limits. That first impression is unfair to the concept. Convolution is really the answer to a practical engineering question: when a system has memory, how do earlier input values continue to shape the present output?
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The impulse response is the system's fingerprint. Once that fingerprint is known, convolution uses it to predict the response to any input, from a short pulse to a complicated communication waveform. This is why the topic sits quietly underneath DSP, communication channels, image processing, control systems, and filter design.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              So do not begin by memorizing the integral. Begin with the story: the input arrives piece by piece, the system reacts to each piece, and the output is the accumulated effect of all those reactions.
            </p>
          </TopicSection>

          <TopicSection id="why-it-matters" title="Why This Topic Matters">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Convolution is a high-leverage topic. Once it is clear, several later ideas stop feeling like separate chapters and start looking like the same story told in different domains.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Industry relevance">
                <BulletList items={["Digital filters use convolution to smooth, sharpen, or remove unwanted components.", "Communication receivers model channel distortion as a transmitted signal convolved with a channel impulse response.", "Image processing uses 2D convolution for blur, sharpening, edge detection, and feature extraction.", "Audio systems use convolution to model echo, reverberation, and room response."]} />
              </MiniCard>
              <MiniCard title="Exam relevance">
                <BulletList items={["GATE frequently tests graphical convolution, overlap limits, and LTI output.", "University exams ask derivations of continuous and discrete convolution.", "Interviews often check whether impulse response feels physical to you, not just symbolic."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="prerequisites" title="Prerequisites">
            <BulletList items={["Input-output idea of a system.", "Impulse response $$h(t)$$ or $$h[n]$$.", "Time shifting and reversal.", "Integration and summation basics.", "Linearity and time invariance."]} />
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              If any of these feel weak, revise <Link href="/introduction-to-signals" className="font-bold text-portal-700 transition hover:text-portal-800">Signals Basics</Link> and <Link href="/systems-and-their-properties" className="font-bold text-portal-700 transition hover:text-portal-800">LTI Systems</Link> first. Convolution becomes much easier when shifting, impulse response, and linearity are already familiar.
            </p>
          </TopicSection>

          <TopicSection id="intuition" title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Imagine the input signal as a long row of tiny impulses. Each impulse taps the system at a particular instant. The system answers each tap with a copy of its impulse response, shifted to the tap time and scaled by the tap strength.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The output is what remains after all those small answers are added. Graphically, this becomes an overlap story: as one signal slides across another, only the overlapping portions interact. More useful overlap gives a stronger contribution; no overlap gives nothing.
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              A good mental line: convolution is the sum of all delayed system replies caused by the input.
            </blockquote>
            <ConvolutionVisualizer />
          </TopicSection>

          <TopicSection id="mathematical-definition" title="Mathematical Definition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Mathematically, convolution is a weighted accumulation. One signal supplies the weights, the other supplies the shifted response shape, and the integral or summation collects the total contribution at one output time.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Continuous-time definition">
                <FormulaBox>{"$$y(t)=x(t)*h(t)=\\int_{-\\infty}^{\\infty}x(\\tau)h(t-\\tau)d\\tau$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">Here \(x(\tau)\) selects the input strength at an earlier time, and \(h(t-\tau)\) tells how that earlier event affects the present time \(t\).</p>
              </MiniCard>
              <MiniCard title="Discrete-time definition">
                <FormulaBox>{"$$y[n]=x[n]*h[n]=\\sum_{k=-\\infty}^{\\infty}x[k]h[n-k]$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">Each sample \(x[k]\) contributes a shifted copy of \(h[n]\), and the summation adds the aligned products.</p>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="lti-systems" title="Convolution in LTI Systems">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Impulse response as system identity</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              The impulse response \(h(t)\) tells how the system reacts to the smallest ideal input event: a unit impulse. For an LTI system, this single response is enough to predict the output for any input.
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              That is a remarkable shortcut. Instead of testing the system with every possible waveform, we study its impulse response once and use convolution to assemble the response to everything else.
            </p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">Superposition of shifted responses</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              {"Each small input piece at time $$\\tau$$ produces a response shaped like $$h(t-\\tau)$$. Multiplying by input strength $$x(\\tau)$$ and adding all pieces gives output."}
            </p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">System memory hidden inside the formula</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              If \(h(t)\) lasts for a long time, one input event keeps influencing the output for a long time. If \(h(t)\) dies quickly, the system forgets quickly. The width and shape of the impulse response are therefore a picture of system memory.
            </p>
            <aside aria-label="LTI convolution insight" className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
              <h3 className="text-base font-bold text-slate-950">Why LTI systems rely on convolution</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                Linearity allows responses to be added. Time invariance allows the same impulse-response shape to be shifted in time. Together, those two properties make the convolution model valid.
              </p>
            </aside>
          </TopicSection>

          <TopicSection id="continuous-time" title="Continuous-Time Convolution">
            <h3 className="mt-4 text-lg font-bold text-slate-950">1. Represent input using impulses</h3>
            <FormulaBox>{"$$x(t)=\\int_{-\\infty}^{\\infty}x(\\tau)\\delta(t-\\tau)d\\tau$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">This identity says a signal can be rebuilt from infinitely many shifted impulses, each weighted by the signal value at that time.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">2. System response to one shifted impulse</h3>
            <FormulaBox>{"$$\\delta(t-\\tau) \\to h(t-\\tau)$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">Because the system is time invariant, delaying the impulse simply delays the impulse response; it does not change the response shape.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">3. Add every scaled response</h3>
            <FormulaBox>{"$$y(t)=\\int_{-\\infty}^{\\infty}x(\\tau)h(t-\\tau)d\\tau$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{"The integral adds all tiny response contributions. The variable $$\\tau$$ is only a bookkeeping variable that lets us scan through the input history."}</p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Physically, the integral measures accumulated influence. Same-sign overlap increases the output; opposite-sign overlap can cancel. That is why convolution is sensitive not only to signal size, but also to alignment and shape.
            </p>
          </TopicSection>

          <TopicSection id="discrete-time" title="Discrete-Time Convolution">
            <FormulaBox>{"$$y[n]=\\sum_{k=-\\infty}^{\\infty}x[k]h[n-k]$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">For sampled systems, integration becomes summation over sample index \(k\). This is the form implemented directly in FIR filters, DSP processors, and many software signal-processing routines.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Finite sequence length">
                <p className="mt-2 text-sm leading-6 text-slate-700">If \(x[n]\) has length \(M\) and \(h[n]\) has length \(N\), then the convolution output length is \(M+N-1\).</p>
              </MiniCard>
              <MiniCard title="Implementation view">
                <p className="mt-2 text-sm leading-6 text-slate-700">Each output sample is a multiply-accumulate operation: multiply aligned samples, add them, shift, and repeat.</p>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="graphical-interpretation" title="Graphical Convolution and Step-by-Step Procedure">
            <BulletList items={["Flip one signal in time.", "Shift it across the other signal.", "Multiply the overlapping portions.", "Integrate or sum the overlap area.", "Repeat for every shift to form the full output waveform."]} />
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The reversal step often feels unnatural at first. It comes from the term \(h(t-\tau)\). Once the signal is reversed, shifting lets us ask a precise question: at this output time, which past input values are still being remembered by the system?
            </p>
            <AnimatedConvolutionExplanation />
          </TopicSection>

          <TopicSection id="fourier-transform-relation" title="Convolution Theorem and Fourier Transform Relation">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Time-domain convolution has a very useful frequency-domain interpretation. When two signals are convolved in time, their Fourier transforms multiply in frequency:
            </p>
            <FormulaBox>{"$$x(t)*h(t) \\;\\Longleftrightarrow\\; X(j\\omega)H(j\\omega)$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              {"This is the reason filters are so easy to understand in the frequency domain. The input spectrum $$X(j\\omega)$$ contains all frequency components present in the signal. The system frequency response $$H(j\\omega)$$ decides which components are passed, weakened, delayed, or phase shifted."}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              In time domain, a filter is an impulse response convolved with the input. In frequency domain, that same filter multiplies the input spectrum. This is one of the most useful bridges between convolution and <Link href="/fourier-transform" className="font-bold text-portal-700 transition hover:text-portal-800">Fourier Transform</Link>.
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

          <aside aria-label="Related Signals and Systems topics" className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Related Learning Path</h2>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Convolution becomes easier to retain when you connect it with the surrounding Signals and Systems ideas.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                ["Signals Basics", "/introduction-to-signals"],
                ["LTI Systems", "/systems-and-their-properties"],
                ["Fourier Series", "/fourier-series"],
                ["Fourier Transform", "/fourier-transform"],
                ["Laplace Transform", "/laplace-transform"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-portal-200 hover:bg-portal-50 hover:text-portal-700"
                >
                  {label}
                </Link>
              ))}
            </div>
          </aside>

          <TopicSection id="diagram-explanation" title="How to Read a Convolution Diagram">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              A convolution diagram is not decoration; it is a problem-solving tool. Read it from left to right: fix one signal, flip the other, slide it, identify overlap, and then calculate the product area or product sum.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Before overlap">
                <p className="mt-2 text-sm leading-6 text-slate-700">The shifted signal has not reached the fixed signal. The product is zero, so the output is zero.</p>
              </MiniCard>
              <MiniCard title="Growing overlap">
                <p className="mt-2 text-sm leading-6 text-slate-700">The overlap region increases. For positive signals, the output usually rises.</p>
              </MiniCard>
              <MiniCard title="Maximum overlap">
                <p className="mt-2 text-sm leading-6 text-slate-700">The aligned portions are largest. This often gives the peak output value.</p>
              </MiniCard>
              <MiniCard title="Leaving overlap">
                <p className="mt-2 text-sm leading-6 text-slate-700">The overlap shrinks, so the accumulated product decreases until the output returns to zero.</p>
              </MiniCard>
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
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              In practice, convolution appears whenever a system spreads, delays, smooths, or remembers an input.
            </p>
            <BulletList items={["FIR digital filtering in DSP processors.", "Wireless channel modeling where the received signal is the transmitted signal convolved with the channel response.", "Image kernels for blur, sharpening, and edge detection.", "Audio reverb using measured room impulse response.", "Control-system response from input and impulse response.", "Probability, where sums of independent random variables use convolution of distributions."]} />
          </TopicSection>

          <TopicSection id="examples" title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Beginner example: impulse input</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"If input is $$x(t)=\\delta(t)$$, output is:"}</p>
            <FormulaBox>{"$$y(t)=\\delta(t)*h(t)=h(t)$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">This is why impulse response is so important: the impulse directly reveals the system's natural reply.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Intermediate numerical: discrete convolution</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">Let $$x[n]=[1,2]$$ and $$h[n]=[1,1]$$.</p>
            <FormulaBox>{"$$y[0]=1,\\quad y[1]=1+2=3,\\quad y[2]=2$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">So $$y[n]=[1,3,2]$$.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Advanced problem: rectangular pulses</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">Convolving two equal rectangular pulses produces a triangular waveform because overlap area first increases linearly, then decreases linearly.</p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">Exam method: choose the easiest domain</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              If signals are short sequences, use direct summation. If signals are simple rectangles or triangles, use graphical overlap. If the question gives transforms or system frequency response, use the convolution theorem and work in the transform domain.
            </p>
          </TopicSection>

          <TopicSection id="common-mistakes" title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Forgetting to flip one signal before shifting.", "Using $$h(t+\\tau)$$ instead of $$h(t-\\tau)$$ without tracking variables.", "Confusing multiplication with convolution.", "Ignoring overlap limits in graphical convolution.", "Forgetting that convolution length in discrete finite sequences is $$L_x+L_h-1$$."]} />
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              In exams, the most reliable habit is to mark the overlap interval first, then write limits. Most wrong convolution answers are not caused by difficult integration; they are caused by incorrect overlap limits.
            </p>
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
            <BulletList items={["What is convolution physically?", "Why does LTI system output use convolution?", "What is impulse response?", "Why do we flip one signal in graphical convolution?", "How is convolution used in filtering?", "What is the difference between convolution and multiplication?", "How would you explain convolution to someone who knows only impulse response?"]} />
          </TopicSection>

          <TopicSection id="exam-notes" title="Exam-Oriented Notes">
            <BulletList items={["For finite discrete sequences, output length is $$L_x+L_h-1$$.", "Impulse convolved with any signal gives the same signal.", "A shifted impulse shifts the signal: $$x(t)*\\delta(t-t_0)=x(t-t_0)$$.", "Convolution is commutative, associative, and distributive.", "Graphical convolution requires careful overlap limits.", "For LTI systems, output equals input convolved with impulse response."]} />
          </TopicSection>

          <TopicSection id="faq" title="Frequently Asked Questions">
            <div className="mt-4 grid gap-3">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <h3 className="text-base font-bold text-slate-950">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
                </article>
              ))}
            </div>
          </TopicSection>

          <TopicSection id="summary" title="Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["Convolution gives the output of an LTI system when input and impulse response are known.", "Continuous-time convolution uses integration over overlap.", "Discrete-time convolution uses summation and appears directly in FIR filters.", "Graphical convolution is mainly about flip, shift, multiply, and accumulate.", "The Fourier Transform relation turns convolution into multiplication, which is why transform methods are powerful."]} />
            <blockquote className="mt-4 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              If you remember only one line, remember this: convolution is how a system combines the present input with the remembered effects of past input.
            </blockquote>
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

        <footer className="mt-5 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Now that you understand how systems respond in the time domain using convolution, the next step is learning how Laplace Transform simplifies system analysis in the complex frequency domain.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/mathematical-representation-of-signals" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
              Mathematical Representation of Signals
            </Link>
            <Link href="/laplace-transform" className="next-topic-btn inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
              Next Topic - Laplace Transform
            </Link>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
