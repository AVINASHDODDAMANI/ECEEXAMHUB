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

function AnimatedSystemExplanation() {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f8fbff)] p-3">
      <style jsx>{`
        @keyframes inputMove {
          0% { stroke-dashoffset: 360; opacity: .55; }
          55%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes processPulse {
          0%, 100% { opacity: .35; transform: scale(.96); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes outputMove {
          0%, 28% { stroke-dashoffset: 360; opacity: .25; }
          80%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes particleFlow {
          0% { transform: translateX(0); opacity: .2; }
          20%, 80% { opacity: 1; }
          100% { transform: translateX(620px); opacity: .2; }
        }
      `}</style>
      <svg viewBox="0 0 900 430" className="w-full" role="img" aria-label="Animated system working from input signal to output signal">
        <rect width="900" height="430" rx="28" fill="#ffffff" />
        <text x="44" y="54" fill="#0f172a" fontSize="20" fontWeight="900">Animated working: input signal enters a system and becomes output</text>

        <path d="M60 135 C86 92 112 92 138 135 S190 178 216 135 S268 92 294 135" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" strokeDasharray="360" style={{ animation: "inputMove 3.2s ease-in-out infinite" }} />
        <text x="176" y="92" textAnchor="middle" fill="#1d4ed8" fontSize="14" fontWeight="900">input x(t)</text>

        <path d="M310 135H376" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" markerEnd="url(#sysArrow)" />
        <rect x="388" y="82" width="180" height="112" rx="24" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2.5" style={{ animation: "processPulse 2.8s ease-in-out infinite", transformOrigin: "478px 138px" }} />
        <text x="478" y="122" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900">System</text>
        <text x="478" y="150" textAnchor="middle" fill="#1d4ed8" fontSize="14" fontWeight="800">H{`{ }`} : operation rule</text>
        <text x="478" y="174" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">filter, amplifier, delay</text>
        <path d="M568 135H634" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" markerEnd="url(#sysArrow)" />

        <path d="M650 135 C676 112 702 112 728 135 S780 158 806 135 S840 116 858 126" fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" strokeDasharray="360" style={{ animation: "outputMove 3.2s ease-in-out infinite" }} />
        <text x="756" y="92" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="900">output y(t)</text>

        <g style={{ animation: "particleFlow 3.2s linear infinite" }}>
          <circle cx="86" cy="238" r="8" fill="#f97316" />
        </g>
        <line x1="86" y1="238" x2="708" y2="238" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="8 8" />
        <text x="390" y="224" textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="800">same information path, modified behavior</text>

        <rect x="76" y="280" width="208" height="92" rx="18" fill="#ecfeff" stroke="#67e8f9" strokeWidth="2" />
        <text x="180" y="310" textAnchor="middle" fill="#155e75" fontSize="14" fontWeight="900">Linearity check</text>
        <text x="180" y="336" textAnchor="middle" fill="#155e75" fontSize="12" fontWeight="700">scaled input {">"} scaled output</text>
        <text x="180" y="356" textAnchor="middle" fill="#155e75" fontSize="12" fontWeight="700">sum input {">"} sum output</text>

        <rect x="346" y="280" width="208" height="92" rx="18" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
        <text x="450" y="310" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="900">Time invariance</text>
        <text x="450" y="336" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="700">delay input</text>
        <text x="450" y="356" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="700">output delays equally</text>

        <rect x="616" y="280" width="208" height="92" rx="18" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
        <text x="720" y="310" textAnchor="middle" fill="#c2410c" fontSize="14" fontWeight="900">Stability</text>
        <text x="720" y="336" textAnchor="middle" fill="#c2410c" fontSize="12" fontWeight="700">bounded input</text>
        <text x="720" y="356" textAnchor="middle" fill="#c2410c" fontSize="12" fontWeight="700">bounded output</text>

        <defs>
          <marker id="sysArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0 0L9 4.5L0 9Z" fill="#0f172a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export default function SystemsAndTheirPropertiesPage() {
  return (
    <Layout title="Systems and Their Properties GATE ECE Notes + Formulas + PYQs | Signals" description="Deep ECE theory notes on systems, linearity, time invariance, causality, stability, memory, invertibility, and system classification." pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1440px] pb-20">
        <nav aria-label="Breadcrumb" className="mb-4 pt-1">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/signals-and-systems" className="font-medium text-slate-600 transition hover:text-portal-700">Signals and Systems</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="font-semibold text-portal-700">Systems and Their Properties</span></li>
          </ol>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Signals and Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Systems and Their Properties</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            A system is any physical device, algorithm, circuit, or mathematical rule that accepts an input signal and produces an output signal. Its properties tell us how predictably, safely, and usefully it behaves.
          </p>
        </header>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              In Signals and Systems, a system is represented as a transformation from input to output. If the input is $$x(t)$$ and the output is $$y(t)$$, then the system describes the rule that converts $$x(t)$$ into $$y(t)$$.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This topic is important because before solving a circuit, filter, communication channel, control loop, or DSP algorithm, an engineer must know what kind of system it is.
            </p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Industry relevance">
                <BulletList items={["Audio systems must be stable and predictable.", "Communication channels must be modeled to remove distortion and noise.", "Control systems must avoid unstable output growth.", "DSP filters are designed using linear time-invariant system theory."]} />
              </MiniCard>
              <MiniCard title="Exam relevance">
                <BulletList items={["GATE asks direct property checks: linearity, time invariance, causality, and stability.", "University exams ask definitions with examples and counterexamples.", "Interviews often ask you to test a system using input-output logic instead of memorized statements."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <BulletList items={["Meaning of input and output signals.", "Basic function notation such as $$x(t)$$ and $$x[n]$$.", "Time shifting and scaling ideas.", "Basic algebra for testing superposition.", "Concept of bounded and unbounded signal behavior."]} />
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Think of a system as a machine with behavior. A microphone preamplifier increases signal strength. A filter removes unwanted frequency components. A delay unit shifts a waveform in time. A sensor converts a physical quantity into an electrical signal.
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              A signal tells us what is changing. A system tells us how that change is modified.
            </blockquote>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">System representation</h3>
            <FormulaBox>{"$$y(t)=T\\{x(t)\\}$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Here $$T$$ is the system operator. It may represent a circuit, a code algorithm, a mechanical device, a wireless channel, or a mathematical operation.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Major system properties</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-950">
                    <th className="border border-slate-200 px-3 py-2">Property</th>
                    <th className="border border-slate-200 px-3 py-2">Core idea</th>
                    <th className="border border-slate-200 px-3 py-2">Engineering meaning</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr><td className="border border-slate-200 px-3 py-2">Linearity</td><td className="border border-slate-200 px-3 py-2">Superposition holds</td><td className="border border-slate-200 px-3 py-2">Signals can be analyzed separately and added</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Time invariance</td><td className="border border-slate-200 px-3 py-2">Behavior does not change with time</td><td className="border border-slate-200 px-3 py-2">Same input today or later gives same shifted response</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Causality</td><td className="border border-slate-200 px-3 py-2">Output depends only on present and past inputs</td><td className="border border-slate-200 px-3 py-2">Real-time systems cannot know the future</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Stability</td><td className="border border-slate-200 px-3 py-2">Bounded input gives bounded output</td><td className="border border-slate-200 px-3 py-2">System does not blow up for normal signals</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Memory</td><td className="border border-slate-200 px-3 py-2">Output depends on values other than current input</td><td className="border border-slate-200 px-3 py-2">Capacitors, inductors, delays, and filters store past behavior</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="mt-4 text-lg font-bold text-slate-950">1. Linearity test</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">Assume two inputs produce two outputs:</p>
            <FormulaBox>{"$$x_1(t) \\to y_1(t), \\quad x_2(t) \\to y_2(t)$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">The system is linear if scaling and addition pass through the system:</p>
            <FormulaBox>{"$$T\\{a x_1(t)+b x_2(t)\\}=aT\\{x_1(t)\\}+bT\\{x_2(t)\\}$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Physically, this means the system does not create unexpected interaction between signals. If two tones enter a linear amplifier, the output is simply the sum of amplified tones.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">2. Time invariance test</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">If input $$x(t)$$ gives output $$y(t)$$, delay the input by $$t_0$$:</p>
            <FormulaBox>{"$$x(t-t_0) \\to y(t-t_0)$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              If the output is only delayed by the same amount and its shape is unchanged, the system is time invariant.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">3. BIBO stability test</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">A bounded input satisfies:</p>
            <FormulaBox>{"$$|x(t)| \\le M_x < \\infty$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">The system is stable if the output also remains bounded:</p>
            <FormulaBox>{"$$|y(t)| \\le M_y < \\infty$$"}</FormulaBox>
          </TopicSection>

          <TopicSection title="Working Principle">
            <BulletList items={["An input signal enters the system.", "The system applies an operation: amplification, attenuation, delay, differentiation, integration, filtering, or sampling.", "Internal elements decide whether the output depends on present, past, or future values.", "The output signal appears with changed amplitude, timing, frequency content, or shape.", "System properties tell us whether that behavior is predictable, realizable, and safe."]} />
            <AnimatedSystemExplanation />
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Input-System-Output Block Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Linearity Superposition Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">Time Invariance Timing Diagram Here</div>
              <div className="diagram-placeholder flex min-h-[140px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">BIBO Stability Waveform Here</div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="System operation"><FormulaBox>{"$$y(t)=T\\{x(t)\\}$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Shows output as the result of applying a system rule to input.</p></MiniCard>
              <MiniCard title="Linearity"><FormulaBox>{"$$T\\{a x_1+b x_2\\}=aT\\{x_1\\}+bT\\{x_2\\}$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Combines homogeneity and additivity.</p></MiniCard>
              <MiniCard title="Time invariance"><FormulaBox>{"$$x(t-t_0) \\to y(t-t_0)$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">A delay in input causes the same delay in output.</p></MiniCard>
              <MiniCard title="Stability"><FormulaBox>{"$$|x(t)|\\le M_x \\Rightarrow |y(t)|\\le M_y$$"}</FormulaBox><p className="mt-2 text-sm leading-6 text-slate-700">Bounded input must produce bounded output.</p></MiniCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <BulletList items={["Linear amplifiers in audio and RF circuits preserve waveform shape while increasing amplitude.", "Time-invariant filters keep the same frequency response over time.", "Causal systems are required for real-time control, audio processing, and communication receivers.", "Stable systems are essential in power electronics, biomedical devices, and aircraft control.", "Memory systems appear in digital filters, capacitive circuits, inductive circuits, and storage devices."]} />
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Beginner example: memoryless or with memory</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">For $$y(t)=3x(t)$$, output depends only on current input. Therefore the system is memoryless.</p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">Intermediate numerical: linearity</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">For $$y(t)=5x(t)$$:</p>
            <FormulaBox>{"$$T\\{a x_1+b x_2\\}=5(a x_1+b x_2)=a(5x_1)+b(5x_2)$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">So the system is linear.</p>
            <h3 className="mt-4 text-lg font-bold text-slate-950">Advanced problem: stability</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">For $$y(t)=tx(t)$$, even if $$x(t)=1$$ is bounded, output becomes $$y(t)=t$$, which grows without bound. Therefore the system is unstable.</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Testing linearity with only one input instead of using superposition.", "Assuming every circuit is time invariant; switched circuits may be time varying.", "Calling a system causal just because it looks physically simple.", "Confusing memoryless with causal. A memoryless system is causal, but a causal system can have memory.", "Checking stability using one input only instead of bounded-input bounded-output logic."]} />
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead><tr className="bg-slate-100 text-slate-950"><th className="border border-slate-200 px-3 py-2">System type</th><th className="border border-slate-200 px-3 py-2">Condition</th><th className="border border-slate-200 px-3 py-2">Example</th></tr></thead>
                <tbody className="text-slate-700">
                  <tr><td className="border border-slate-200 px-3 py-2">Linear</td><td className="border border-slate-200 px-3 py-2">Superposition holds</td><td className="border border-slate-200 px-3 py-2">$$y(t)=2x(t)$$</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Nonlinear</td><td className="border border-slate-200 px-3 py-2">Superposition fails</td><td className="border border-slate-200 px-3 py-2">$$y(t)=x^2(t)$$</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Causal</td><td className="border border-slate-200 px-3 py-2">No future input required</td><td className="border border-slate-200 px-3 py-2">$$y(t)=x(t-2)$$</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Non-causal</td><td className="border border-slate-200 px-3 py-2">Needs future input</td><td className="border border-slate-200 px-3 py-2">$$y(t)=x(t+2)$$</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <BulletList items={["What is a system in Signals and Systems?", "How do you test linearity?", "Is every memoryless system causal?", "Why are real-time systems usually causal?", "What does BIBO stability mean physically?", "Give one practical example of a time-varying system."]} />
          </TopicSection>

          <TopicSection title="Exam-Oriented Notes">
            <BulletList items={["For linearity, always test both additivity and homogeneity.", "For time invariance, delay the input first and compare with delayed output.", "For causality, check whether output uses future input like $$x(t+1)$$.", "For stability, try bounded inputs that may expose unbounded output.", "LTI systems are important because convolution and frequency response become powerful tools."]} />
          </TopicSection>

          <TopicSection title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["A system maps input signals to output signals.", "Linearity means superposition.", "Time invariance means system behavior does not change with time.", "Causality means no dependence on future input.", "BIBO stability means bounded input gives bounded output.", "Memory exists when output depends on past or future input values."]} />
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Conceptual</h3>
            <BulletList items={["Explain the difference between signal and system.", "Why is causality important in real-time engineering?", "Give one example of a system with memory."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Numerical</h3>
            <BulletList items={["Test whether $$y(t)=4x(t)-2$$ is linear.", "Check whether $$y(t)=x(t-3)$$ is causal.", "Check stability of $$y(t)=e^t x(t)$$ for bounded input."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">MCQs</h3>
            <BulletList items={["A system satisfying superposition is: linear / nonlinear / causal / unstable.", "A system depending on $$x(t+2)$$ is: causal / non-causal / memoryless / stable.", "BIBO stability means bounded input gives: zero output / bounded output / infinite output / delayed output."]} />
          </TopicSection>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/introduction-to-signals" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Introduction to Signals
          </Link>
          <Link href="/mathematical-representation-of-signals" className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            Next Mathematical Representation of Signals
          </Link>
        </div>
      </div>
    </Layout>
  );
}
