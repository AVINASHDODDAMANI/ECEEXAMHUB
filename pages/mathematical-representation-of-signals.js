import Link from "next/link";
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

function TopicSection({ title, children }) {
  return (
    <section className="topic-section rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
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

function AnimatedRepresentationExplanation() {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f8fbff)] p-3">
      <style jsx>{`
        @keyframes waveDraw {
          0% { stroke-dashoffset: 520; opacity: .45; }
          70%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes sampleBlink {
          0%, 100% { opacity: .28; transform: scale(.82); }
          45%, 60% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes shiftMove {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(54px); }
        }
        @keyframes scaleMove {
          0%, 100% { transform: scaleY(.72); }
          50% { transform: scaleY(1.12); }
        }
      `}</style>
      <svg viewBox="0 0 900 430" className="w-full" role="img" aria-label="Animated mathematical representation of continuous discrete shifted and scaled signals">
        <rect width="900" height="430" rx="28" fill="#ffffff" />
        <text x="44" y="54" fill="#0f172a" fontSize="20" fontWeight="900">Animated working: one physical waveform becomes mathematical signal forms</text>

        <line x1="64" y1="168" x2="392" y2="168" stroke="#94a3b8" strokeWidth="2" />
        <line x1="64" y1="76" x2="64" y2="248" stroke="#94a3b8" strokeWidth="2" />
        <path d="M68 168 C90 106 112 106 134 168 S178 230 200 168 S244 106 266 168 S310 230 332 168 S374 110 390 142"
          fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" strokeDasharray="520" style={{ animation: "waveDraw 3.6s ease-in-out infinite" }} />
        <text x="220" y="88" textAnchor="middle" fill="#1d4ed8" fontSize="15" fontWeight="900">continuous-time x(t)</text>

        {[84, 134, 184, 234, 284, 334, 384].map((x, index) => (
          <g key={x} style={{ animation: "sampleBlink 2.4s ease-in-out infinite", animationDelay: `${index * 0.13}s`, transformOrigin: `${x}px 168px` }}>
            <line x1={x} y1="168" x2={x} y2={index % 2 === 0 ? 112 : 224} stroke="#f97316" strokeWidth="2.5" />
            <circle cx={x} cy={index % 2 === 0 ? 112 : 224} r="7" fill="#f97316" />
          </g>
        ))}
        <text x="220" y="268" textAnchor="middle" fill="#c2410c" fontSize="15" fontWeight="900">discrete-time x[n]</text>

        <g style={{ animation: "shiftMove 3.2s ease-in-out infinite" }}>
          <path d="M512 168 C532 130 552 130 572 168 S612 206 632 168 S672 130 692 168" fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
        </g>
        <line x1="500" y1="168" x2="716" y2="168" stroke="#94a3b8" strokeWidth="2" />
        <text x="608" y="112" textAnchor="middle" fill="#15803d" fontSize="15" fontWeight="900">time shift x(t - t0)</text>

        <g style={{ animation: "scaleMove 3.2s ease-in-out infinite", transformOrigin: "710px 318px" }}>
          <path d="M608 318 C626 270 644 270 662 318 S698 366 716 318 S752 270 770 318" fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
        </g>
        <line x1="592" y1="318" x2="786" y2="318" stroke="#94a3b8" strokeWidth="2" />
        <text x="690" y="386" textAnchor="middle" fill="#6d28d9" fontSize="15" fontWeight="900">amplitude scaling A x(t)</text>

        <path d="M416 168H478" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" markerEnd="url(#reprArrow)" />
        <text x="446" y="146" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="800">represent</text>

        <defs>
          <marker id="reprArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0 0L9 4.5L0 9Z" fill="#0f172a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export default function MathematicalRepresentationOfSignalsPage() {
  return (
    <Layout title="Mathematical Representation of Signals GATE ECE Quick Notes + Formulas + PYQs" description="Deep ECE theory notes on mathematical signal representation, continuous-time and discrete-time forms, standard signals, transformations, and engineering meaning." pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1440px] pb-20">
        <nav aria-label="Breadcrumb" className="mb-4 pt-1">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Notes</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/signals-and-systems" className="font-medium text-slate-600 transition hover:text-portal-700">Signals and Systems</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="font-semibold text-portal-700">Mathematical Representation of Signals</span></li>
          </ol>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Signals and Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Mathematical Representation of Signals</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Mathematical representation is the skill of converting a real waveform into a precise function, sequence, graph, or operation so that engineers can analyze, process, transmit, and reconstruct information.
          </p>
        </header>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              {"A signal becomes useful in engineering when we can describe it mathematically. Instead of saying \"the voltage rises, falls, and repeats,\" we write a function such as $$x(t)=A\\cos(\\omega t+\\phi)$$ or a sequence such as $$x[n]$$."}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This representation allows us to calculate energy, power, delay, frequency, sampling behavior, and system response. It is the bridge between physical waveforms and engineering design.
            </p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Industry relevance">
                <BulletList items={["DSP algorithms require signals as arrays, sequences, or mathematical functions.", "Communication engineers represent carrier waves, modulated signals, and noise mathematically.", "Control and circuit engineers use signal models to predict transient and steady-state behavior.", "Machine learning and sensing systems convert physical measurements into discrete data sequences."]} />
              </MiniCard>
              <MiniCard title="Exam relevance">
                <BulletList items={["GATE asks direct questions on signal shifting, scaling, reversal, periodicity, and standard signals.", "University exams test sketches and transformations of $$x(t)$$ and $$x[n]$$.", "Interviews check whether you can connect a graph, equation, and physical waveform."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <BulletList items={["Understanding of signal as a time-varying quantity.", "Basic function notation and graph reading.", "Trigonometry for sinusoidal signals.", "Elementary algebra for shifting and scaling.", "Basic discrete indexing such as $$n=0,1,2,...$$."]} />
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              A waveform on an oscilloscope is visual. A formula is precise. A table of samples is digital-friendly. A block diagram shows how it moves through a system. These are not separate ideas; they are different languages for the same signal.
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              Mathematical representation lets us stop guessing from the shape and start calculating exactly what the signal will do.
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">1. Continuous-time representation</h3>
            <FormulaBox>{"$$x(t)$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Here time $$t$$ is continuous, so the signal has a value at every instant. Analog voltage, current, speech pressure, and RF carrier signals are commonly modeled this way.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">2. Discrete-time representation</h3>
            <FormulaBox>{"$$x[n]$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Here $$n$$ is an integer index. The signal is known only at sample instants. This is the natural language of DSP, digital audio, digital communication receivers, and sampled sensor data.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">3. Standard signal building blocks</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-950">
                    <th className="border border-slate-200 px-3 py-2">Signal</th>
                    <th className="border border-slate-200 px-3 py-2">Mathematical form</th>
                    <th className="border border-slate-200 px-3 py-2">Physical meaning</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr><td className="border border-slate-200 px-3 py-2">Unit impulse</td><td className="border border-slate-200 px-3 py-2">{"$$\\delta(t)$$ or $$\\delta[n]$$"}</td><td className="border border-slate-200 px-3 py-2">Ideal sudden event or sampling marker</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Unit step</td><td className="border border-slate-200 px-3 py-2">{"$$u(t)$$ or $$u[n]$$"}</td><td className="border border-slate-200 px-3 py-2">Switch turns on at a reference instant</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Ramp</td><td className="border border-slate-200 px-3 py-2">{"$$r(t)=t u(t)$$"}</td><td className="border border-slate-200 px-3 py-2">Linearly increasing quantity</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Exponential</td><td className="border border-slate-200 px-3 py-2">{"$$Ae^{at}$$"}</td><td className="border border-slate-200 px-3 py-2">Growth, decay, or transient response</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Sinusoid</td><td className="border border-slate-200 px-3 py-2">{"$$A\\cos(\\omega t+\\phi)$$"}</td><td className="border border-slate-200 px-3 py-2">Oscillation, AC, carrier wave, tone</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">1. Start from a physical waveform</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">{"Suppose an AC voltage has peak value $$A$$, frequency $$f$$, and phase $$\\phi$$. A complete cycle corresponds to $$2\\pi$$ radians."}</p>
            <FormulaBox>{"$$\\omega=2\\pi f$$"}</FormulaBox>

            <h3 className="mt-4 text-lg font-bold text-slate-950">2. Write the time-domain function</h3>
            <FormulaBox>{"$$x(t)=A\\cos(\\omega t+\\phi)$$"}</FormulaBox>
            <BulletList items={["$$A$$ tells maximum signal strength.", "$$\\omega$$ tells how fast the waveform cycles.", "$$\\phi$$ tells horizontal alignment.", "$$t$$ lets us compute the signal value at any instant."]} />

            <h3 className="mt-4 text-lg font-bold text-slate-950">3. Sample the same signal</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">If samples are taken every $$T_s$$ seconds, the sample time is $$t=nT_s$$.</p>
            <FormulaBox>{"$$x[n]=x(nT_s)=A\\cos(\\omega nT_s+\\phi)$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This is the mathematical step from an analog waveform to a discrete-time sequence. The signal is no longer observed at every instant, only at sample instants.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">4. Describe transformations</h3>
            <FormulaBox>{"$$x(t-t_0):\\; delay\\; by\\; t_0$$"}</FormulaBox>
            <FormulaBox>{"$$x(at):\\; time\\; scaling$$"}</FormulaBox>
            <FormulaBox>{"$$A x(t):\\; amplitude\\; scaling$$"}</FormulaBox>
          </TopicSection>

          <TopicSection title="Working Principle">
            <BulletList items={["Observe the real signal behavior on a graph or instrument.", "Choose the independent variable: continuous time $$t$$ or discrete index $$n$$.", "Identify amplitude, time location, period, frequency, and phase.", "Represent the waveform using standard signals and operations.", "Use the representation to compute energy, power, system output, or frequency behavior."]} />
            <AnimatedRepresentationExplanation />
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Continuous-Time Signal Graph Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Discrete-Time Stem Plot Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Signal Transformation Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Sampling Timing Diagram Here</div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Continuous-time signal"><FormulaBox>{"$$x(t)$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Signal value is defined for every real time instant.</p></MiniCard>
              <MiniCard title="Discrete-time signal"><FormulaBox>{"$$x[n]=x(nT_s)$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Samples are taken at separated instants.</p></MiniCard>
              <MiniCard title="Sinusoid"><FormulaBox>{"$$x(t)=A\\cos(\\omega t+\\phi)$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Represents oscillatory voltage, current, sound, and carrier signals.</p></MiniCard>
              <MiniCard title="Frequency relation"><FormulaBox>{"$$\\omega=2\\pi f,\\quad T={1\\over f}$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Links cycles per second, radians per second, and period.</p></MiniCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <BulletList items={["Digital audio stores sound as discrete-time samples.", "Wireless systems represent carrier waves as sinusoids with amplitude, frequency, and phase.", "ECG and EEG signals are modeled for filtering and diagnosis.", "Image processing represents brightness as a two-dimensional signal.", "Radar and sonar use delayed and shifted signals to estimate distance and velocity."]} />
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Beginner example: identify representation</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">An oscilloscope waveform of voltage versus time is naturally represented as $$v(t)$$ because time is continuous.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Intermediate numerical: sinusoid parameters</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"Given $$x(t)=4\\cos(200\\pi t+\\pi/6)$$:"}</p>
            <BulletList items={["Amplitude $$A=4$$.", "Angular frequency $$\\omega=200\\pi$$ rad/s.", "Frequency $$f=\\omega/(2\\pi)=100$$ Hz.", "Phase $$\\phi=\\pi/6$$ rad."]} />

            <h3 className="mt-4 text-lg font-bold text-slate-950">Advanced problem: sampled sinusoid</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"If $$x(t)=3\\cos(100\\pi t)$$ is sampled at $$T_s=0.001s$$:"}</p>
            <FormulaBox>{"$$x[n]=3\\cos(100\\pi nT_s)=3\\cos(0.1\\pi n)$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">The discrete sequence now describes the same waveform only at sample instants.</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Treating $$x(t)$$ and $$x[n]$$ as the same representation.", "Forgetting that $$n$$ is an integer index, not continuous time.", "Confusing time shifting with amplitude scaling.", "Writing $$x(t+t_0)$$ as a delay; it is actually an advance.", "Forgetting to substitute $$t=nT_s$$ while sampling."]} />
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead><tr className="bg-slate-100 text-slate-950"><th className="border border-slate-200 px-3 py-2">Representation</th><th className="border border-slate-200 px-3 py-2">Best used for</th><th className="border border-slate-200 px-3 py-2">Example</th></tr></thead>
                <tbody className="text-slate-700">
                  <tr><td className="border border-slate-200 px-3 py-2">Graph</td><td className="border border-slate-200 px-3 py-2">Visual waveform behavior</td><td className="border border-slate-200 px-3 py-2">Oscilloscope waveform</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Formula</td><td className="border border-slate-200 px-3 py-2">Exact analysis and derivation</td><td className="border border-slate-200 px-3 py-2">{"$$A\\cos(\\omega t+\\phi)$$"}</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Sequence</td><td className="border border-slate-200 px-3 py-2">DSP and sampled data</td><td className="border border-slate-200 px-3 py-2">$$x[0],x[1],x[2]$$</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Standard blocks</td><td className="border border-slate-200 px-3 py-2">Building complex signals</td><td className="border border-slate-200 px-3 py-2">Impulse, step, ramp</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <BulletList items={["What is the difference between $$x(t)$$ and $$x[n]$$?", "Why do we use standard signals like impulse and step?", "How does time shifting affect a waveform?", "What is the physical meaning of phase?", "How do you convert a continuous-time signal into a discrete-time sequence?", "Why are sinusoids important in ECE?"]} />
          </TopicSection>

          <TopicSection title="Exam-Oriented Quick Notes">
            <BulletList items={["For delay, use $$x(t-t_0)$$.", "For advance, use $$x(t+t_0)$$.", "For sampling, substitute $$t=nT_s$$.", "For time reversal, use $$x(-t)$$.", "Always identify whether the independent variable is $$t$$ or $$n$$ before solving."]} />
          </TopicSection>

          <TopicSection title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["Mathematical representation converts waveform behavior into exact analysis.", "$$x(t)$$ is continuous-time representation.", "$$x[n]$$ is discrete-time representation.", "Standard signals include impulse, step, ramp, exponential, and sinusoid.", "Signal operations include shifting, scaling, reversal, and sampling."]} />
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Conceptual</h3>
            <BulletList items={["Explain why a formula is more precise than only a graph.", "Differentiate continuous-time and discrete-time signals.", "Explain the physical meaning of a time delay."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Numerical</h3>
            <BulletList items={["For $$x(t)=6\\cos(50\\pi t)$$, find amplitude and frequency.", "If $$x(t)$$ is sampled at $$T_s=0.01s$$, write $$x[n]$$.", "Sketch the effect of $$x(t-2)$$ and $$x(-t)$$."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">MCQs</h3>
            <BulletList items={["The notation for discrete-time signal is: $$x(t)$$ / $$x[n]$$ / $$X(s)$$ / $$H(j\\omega)$$.", "$$x(t-t_0)$$ represents: advance / delay / amplitude scaling / inversion.", "A ramp signal represents: constant value / sudden impulse / linear increase / oscillation."]} />
          </TopicSection>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/systems-and-their-properties" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Systems and Their Properties
          </Link>
          <Link href="/convolution" className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            Next Convolution
          </Link>
        </div>
      </div>
    </Layout>
  );
}
