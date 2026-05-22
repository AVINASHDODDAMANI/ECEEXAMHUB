import Link from "next/link";
import Layout from "../components/layout";

function BulletList({ items, bulletClassName = "bg-portal-600" }) {
  return (
    <ul className="mt-3 grid min-w-0 gap-2 text-sm leading-7 text-slate-700 sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex min-w-0 gap-2.5">
          <span className={`mt-2.5 h-1.5 w-1.5 flex-none rounded-full ${bulletClassName}`} />
          <span className="min-w-0 break-words">{item}</span>
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
    <section className="topic-section min-w-0 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function MiniCard({ title, children }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <h3 className="text-base font-bold text-slate-950">{title}</h3>
      {children}
    </div>
  );
}

function AnimatedSignalExplanation() {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f8fbff)] p-3">
      <style jsx>{`
        @keyframes sigDraw {
          0% { stroke-dashoffset: 520; }
          70%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes samplePulse {
          0%, 100% { opacity: 0.28; transform: scale(0.82); }
          45%, 60% { opacity: 1; transform: scale(1.12); }
        }
        @keyframes blockGlow {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
      `}</style>
      <svg viewBox="0 0 900 420" className="w-full" role="img" aria-label="Animated explanation of signal generation, transmission, processing, and output">
        <rect width="900" height="420" rx="28" fill="#ffffff" />
        <text x="44" y="54" fill="#0f172a" fontSize="20" fontWeight="900">Animated working: information becomes a signal, travels, and gets processed</text>

        <rect x="52" y="92" width="150" height="76" rx="18" fill="#ecfeff" stroke="#67e8f9" strokeWidth="2" />
        <text x="127" y="122" textAnchor="middle" fill="#155e75" fontSize="14" fontWeight="900">Physical event</text>
        <text x="127" y="146" textAnchor="middle" fill="#155e75" fontSize="12" fontWeight="700">voice, sensor, image</text>

        <rect x="260" y="92" width="150" height="76" rx="18" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
        <text x="335" y="122" textAnchor="middle" fill="#1d4ed8" fontSize="14" fontWeight="900">Transducer</text>
        <text x="335" y="146" textAnchor="middle" fill="#1d4ed8" fontSize="12" fontWeight="700">converts to voltage</text>

        <rect x="468" y="92" width="150" height="76" rx="18" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
        <text x="543" y="122" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="900">System</text>
        <text x="543" y="146" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="700">filters or amplifies</text>

        <rect x="676" y="92" width="150" height="76" rx="18" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
        <text x="751" y="122" textAnchor="middle" fill="#c2410c" fontSize="14" fontWeight="900">Output signal</text>
        <text x="751" y="146" textAnchor="middle" fill="#c2410c" fontSize="12" fontWeight="700">useful information</text>

        <path d="M202 130H260" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrow)" />
        <path d="M410 130H468" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrow)" />
        <path d="M618 130H676" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrow)" />

        <path d="M70 300 C96 230 122 230 148 300 S200 370 226 300 S278 230 304 300 S356 370 382 300 S434 230 460 300 S512 370 538 300 S590 230 616 300 S668 370 694 300 S746 230 772 300 S824 370 850 300"
          fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" strokeDasharray="520" style={{ animation: "sigDraw 4s ease-in-out infinite" }} />
        <line x1="58" y1="300" x2="858" y2="300" stroke="#94a3b8" strokeWidth="2" />
        <line x1="58" y1="220" x2="58" y2="372" stroke="#94a3b8" strokeWidth="2" />
        <text x="70" y="214" fill="#64748b" fontSize="13" fontWeight="800">amplitude</text>
        <text x="810" y="326" fill="#64748b" fontSize="13" fontWeight="800">time</text>

        {[148, 304, 460, 616, 772].map((x, index) => (
          <g key={x} style={{ animation: "samplePulse 2.6s ease-in-out infinite", animationDelay: `${index * 0.18}s`, transformOrigin: `${x}px 300px` }}>
            <line x1={x} y1="300" x2={x} y2={index % 2 === 0 ? 230 : 370} stroke="#f97316" strokeWidth="2.5" strokeDasharray="6 6" />
            <circle cx={x} cy={index % 2 === 0 ? 230 : 370} r="8" fill="#f97316" />
          </g>
        ))}

        <rect x="360" y="246" width="184" height="108" rx="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" style={{ animation: "blockGlow 2.8s ease-in-out infinite" }} />
        <text x="452" y="276" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">What changes?</text>
        <text x="452" y="302" textAnchor="middle" fill="#2563eb" fontSize="13" fontWeight="800">amplitude</text>
        <text x="452" y="324" textAnchor="middle" fill="#16a34a" fontSize="13" fontWeight="800">frequency</text>
        <text x="452" y="346" textAnchor="middle" fill="#f97316" fontSize="13" fontWeight="800">phase</text>

        <defs>
          <marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0 0L9 4.5L0 9Z" fill="#0f172a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export default function IntroductionToSignalsPage() {
  return (
    <Layout title="Introduction to Signals | Signals and Systems" description="Deep ECE theory notes on signals, classifications, mathematical representation, signal behavior, and applications." pageClassName="py-3 sm:py-4">
      <div className="mx-auto min-w-0 max-w-[1440px] pb-20">
        <nav aria-label="Breadcrumb" className="mb-4 pt-1">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/signals-and-systems" className="font-medium text-slate-600 transition hover:text-portal-700">Signals and Systems</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="font-semibold text-portal-700">Introduction to Signals</span></li>
          </ol>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Signals and Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Introduction to Signals</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            A signal is the language through which information travels in engineering systems. In ECE, almost every practical system begins with a signal, modifies that signal, and extracts useful meaning from it.
          </p>
        </header>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              A signal is any quantity that varies with one or more independent variables and carries information. In most ECE problems, the independent variable is time, and the signal may be voltage, current, speech pressure, image brightness, antenna field strength, or sensor output.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              We study signals because communication, control, filters, DSP, circuits, instrumentation, and embedded systems all depend on understanding how information changes, how it is represented, and how a system affects it.
            </p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Industry relevance">
                <BulletList items={["Telecom engineers analyze speech, data, and RF waveforms.", "DSP engineers clean noisy signals from microphones, radars, cameras, and biomedical sensors.", "Circuit designers predict how amplifiers and filters respond to changing inputs."]} />
              </MiniCard>
              <MiniCard title="Exam relevance">
                <BulletList items={["GATE frequently tests signal classification, transformations, energy, power, and periodicity.", "University exams ask definitions, graphs, mathematical representation, and basic properties.", "Interviews use signals to test whether you understand physical meaning, not just formulas."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <BulletList items={["Basic algebra and functions.", "Trigonometry, especially sine and cosine.", "Elementary calculus for area, slope, and rate of change.", "Complex numbers for advanced sinusoidal and frequency-domain interpretation.", "Basic electrical quantities such as voltage, current, power, and frequency."]} />
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Think of a signal as a moving story. A flat line says nothing is changing. A rising line says the quantity is increasing. A sinusoid says the quantity is oscillating repeatedly. A sudden pulse says an event occurred for a short duration.
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              The shape of a signal is not decoration. The shape tells us what information is present, how fast it changes, and how a circuit or system may respond to it.
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">1. Signal as a mathematical function</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              In Signals and Systems, a signal is represented as a function. A continuous-time signal is written as $$x(t)$$, where the value exists for every instant of time. A discrete-time signal is written as $$x[n]$$, where values exist only at separated sample indices.
            </p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">2. Signal as physical behavior</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              If $$x(t)$$ is microphone voltage, its amplitude represents air pressure variation. If $$x(t)$$ is ECG voltage, its peaks represent heart activity. If $$x[n]$$ is a digital audio sequence, each sample is a stored measurement of the original sound at a specific instant.
            </p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">3. Important classifications</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-950">
                    <th className="border border-slate-200 px-3 py-2">Classification</th>
                    <th className="border border-slate-200 px-3 py-2">Meaning</th>
                    <th className="border border-slate-200 px-3 py-2">Engineering example</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr><td className="border border-slate-200 px-3 py-2">Continuous-time</td><td className="border border-slate-200 px-3 py-2">Defined for every time instant</td><td className="border border-slate-200 px-3 py-2">Analog microphone voltage</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Discrete-time</td><td className="border border-slate-200 px-3 py-2">Defined only at sample indices</td><td className="border border-slate-200 px-3 py-2">Sampled audio in DSP</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Periodic</td><td className="border border-slate-200 px-3 py-2">Repeats after a fixed interval</td><td className="border border-slate-200 px-3 py-2">AC mains sine wave</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Energy signal</td><td className="border border-slate-200 px-3 py-2">Finite total energy, zero average power</td><td className="border border-slate-200 px-3 py-2">Short pulse</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Power signal</td><td className="border border-slate-200 px-3 py-2">Finite average power, infinite total energy</td><td className="border border-slate-200 px-3 py-2">Continuous sinusoid</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Continuous-time signal</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">Let a voltage signal vary with time. We write it as:</p>
            <FormulaBox>{"$$x(t) = A\\cos(\\omega t + \\phi)$$"}</FormulaBox>
            <BulletList items={["$$A$$ is amplitude: maximum strength of the signal.", "$$\\omega$$ is angular frequency in rad/s: how fast the signal oscillates.", "$$\\phi$$ is phase: where the waveform starts relative to the reference.", "$$t$$ is time: the independent variable."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Relation between frequency and angular frequency</h3>
            <FormulaBox>{"$$\\omega = 2\\pi f$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              {"One full cycle corresponds to $$2\\pi$$ radians. If a signal completes $$f$$ cycles per second, then it covers $$2\\pi f$$ radians per second. This is why angular frequency is measured in rad/s."}
            </p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">Energy of a signal</h3>
            <FormulaBox>{"$$E = \\int_{-\\infty}^{\\infty} |x(t)|^2 dt$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Squaring measures signal strength independent of sign. Integrating collects that strength over all time. A short pulse usually has finite energy because it exists only for a limited duration.
            </p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">Average power of a signal</h3>
            <FormulaBox>{"$$P = \\lim_{T\\to\\infty} {1 \\over 2T}\\int_{-T}^{T}|x(t)|^2dt$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Power asks: on average, how much signal strength remains per unit time? Periodic signals normally have finite average power because they continue forever.
            </p>
          </TopicSection>

          <TopicSection title="Working Principle">
            <BulletList items={["A physical event changes with time: sound pressure, temperature, light, voltage, or current.", "A transducer converts that physical variation into an electrical signal.", "The signal is transmitted, stored, amplified, filtered, sampled, or transformed.", "A system extracts useful information such as message, measurement, command, or decision.", "The output may be displayed, transmitted, used for control, or converted back into a physical action."]} />
            <AnimatedSignalExplanation />
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Signal Flow Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Continuous-Time Waveform Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Discrete-Time Sample Plot Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Frequency Spectrum Here</div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Sinusoidal signal"><FormulaBox>{"$$x(t)=A\\cos(\\omega t+\\phi)$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Describes oscillatory signals such as AC voltage and carrier waves.</p></MiniCard>
              <MiniCard title="Period and frequency"><FormulaBox>{"$$T={1\\over f},\\quad \\omega=2\\pi f$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Higher frequency means shorter period and faster variation.</p></MiniCard>
              <MiniCard title="Energy"><FormulaBox>{"$$E=\\int_{-\\infty}^{\\infty}|x(t)|^2dt$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Total signal strength accumulated over time.</p></MiniCard>
              <MiniCard title="Average power"><FormulaBox>{"$$P=\\lim_{T\\to\\infty}{1\\over2T}\\int_{-T}^{T}|x(t)|^2dt$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Long-term average signal strength.</p></MiniCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <BulletList items={["Mobile communication converts voice and data into electrical and electromagnetic signals.", "Radar systems transmit signals and analyze reflected signals to detect objects.", "Medical electronics uses ECG, EEG, and pulse signals for diagnosis.", "Audio engineering records, filters, compresses, and reconstructs sound signals.", "IoT sensors measure temperature, pressure, motion, and light as signals for digital processing."]} />
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Beginner example: identify signal type</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">A microphone voltage exists for every instant of time. Therefore it is a continuous-time signal.</p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">Intermediate numerical: find frequency</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">If a sinusoid has period $$T=0.02s$$, then:</p>
            <FormulaBox>{"$$f={1\\over T}={1\\over0.02}=50Hz$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">The signal completes 50 cycles every second.</p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">Advanced problem: classify energy or power</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"For $$x(t)=A\\cos(\\omega t)$$, the signal exists forever and has finite average power."}</p>
            <FormulaBox>{"$$P={A^2\\over2}$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">Its total energy is infinite because the sinusoid never dies out, but its average power is finite.</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Calling every finite-amplitude signal an energy signal without checking duration.", "Confusing frequency $$f$$ with angular frequency $$\\omega$$.", "Assuming discrete-time means digital; discrete-time samples may still have continuous amplitude.", "Ignoring phase even though phase affects alignment, delay, and interference.", "Memorizing classifications without connecting them to waveform behavior."]} />
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead><tr className="bg-slate-100 text-slate-950"><th className="border border-slate-200 px-3 py-2">Pair</th><th className="border border-slate-200 px-3 py-2">First</th><th className="border border-slate-200 px-3 py-2">Second</th></tr></thead>
                <tbody className="text-slate-700">
                  <tr><td className="border border-slate-200 px-3 py-2">Continuous vs Discrete</td><td className="border border-slate-200 px-3 py-2">Value at every time instant</td><td className="border border-slate-200 px-3 py-2">Value only at sample indices</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Analog vs Digital</td><td className="border border-slate-200 px-3 py-2">Continuous amplitude</td><td className="border border-slate-200 px-3 py-2">Quantized amplitude levels</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Energy vs Power</td><td className="border border-slate-200 px-3 py-2">Finite total energy</td><td className="border border-slate-200 px-3 py-2">Finite average power</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <BulletList items={["What is a signal in engineering terms?", "Is every discrete-time signal digital? Explain.", "Why is a sinusoid called a power signal?", "What physical information is carried by amplitude, frequency, and phase?", "Why do communication systems often use sinusoidal carriers?", "How is a sensor output related to a signal?"]} />
          </TopicSection>

          <TopicSection title="Exam-Oriented Notes">
            <BulletList items={["A nonzero periodic signal is generally a power signal, not an energy signal.", "For periodic signals, calculate average power over one period instead of infinite limits.", "Always check whether time is continuous $$t$$ or discrete $$n$$.", "For sinusoidal signals, remember $$T=1/f$$ and $$\\omega=2\\pi f$$.", "Phase shift changes waveform position but not amplitude or frequency."]} />
          </TopicSection>

          <TopicSection title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["A signal is a varying quantity that carries information.", "Continuous-time signals use $$x(t)$$; discrete-time signals use $$x[n]$$.", "Amplitude shows strength, frequency shows speed of oscillation, phase shows alignment.", "Energy signals have finite energy; power signals have finite average power.", "Signal classification is the first step before system analysis."]} />
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Conceptual</h3>
            <BulletList items={["Explain why ECG is a signal.", "Give two examples each of continuous-time and discrete-time signals.", "Why is phase important in communication?"]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Numerical</h3>
            <BulletList items={["Find the period of a 2 kHz sinusoid.", "For $$x(t)=5\\cos(100\\pi t)$$, identify amplitude, angular frequency, and frequency.", "Classify a rectangular pulse of finite duration as energy or power signal."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">MCQs</h3>
            <BulletList items={["A nonzero periodic signal is usually: energy / power / neither / both.", "If $$T=0.01s$$, frequency is: 10 Hz / 100 Hz / 1000 Hz / 1 Hz.", "A sampled signal is represented as: $$x(t)$$ / $$x[n]$$ / $$X(s)$$ / $$H(j\\omega)$$."]} />
          </TopicSection>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/subjects/signals-and-systems" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Back to Signals and Systems
          </Link>
          <Link href="/systems-and-their-properties" className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            Next Systems and Their Properties
          </Link>
        </div>
      </div>
    </Layout>
  );
}
