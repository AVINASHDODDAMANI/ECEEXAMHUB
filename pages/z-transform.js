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
  { id: "why-it-matters", label: "Why It Matters" },
  { id: "intuition", label: "Intuition" },
  { id: "theory", label: "Core Theory" },
  { id: "working", label: "Working" },
  { id: "formulas", label: "Formulas" },
  { id: "examples", label: "Examples" },
  { id: "practice", label: "Practice" },
];

const interviewQuestions = [
  "Why is Z-Transform called the discrete-time counterpart of Laplace Transform?",
  "What information does ROC add beyond the algebraic expression X(z)?",
  "How do you decide stability of a discrete-time LTI system from H(z)?",
  "What is the relation between the unit circle and frequency response?",
  "How does a pole near the unit circle affect the discrete-time response?",
  "Why are difference equations easier to solve in the z-domain?",
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Z-Transform in Signals and Systems",
    description:
      "Conceptual ECE notes on Z-Transform, ROC, poles and zeros, unit circle, inverse Z-transform, difference equations, stability, solved examples, GATE notes, and interview preparation.",
    learningResourceType: "Theory Notes",
    educationalLevel: "Undergraduate engineering",
    teaches: [
      "Z-Transform",
      "Region of convergence",
      "Discrete-time LTI systems",
      "Poles and zeros",
      "Unit circle",
      "Difference equations",
      "Digital signal processing",
    ],
  },
];

export default function ZTransformPage() {
  return (
    <Layout
      title="Z-Transform in Signals and Systems | ECE Theory Notes"
      description="Learn Z-Transform with discrete-time intuition, ROC, poles and zeros, unit circle, inverse Z-transform, difference equations, solved examples, GATE notes, and interview questions."
      keywords="Z-Transform signals and systems, ROC of Z-transform, unit circle, poles and zeros, discrete-time LTI systems, DSP, GATE ECE"
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
            <li><span className="font-semibold text-portal-700">Z-Transform</span></li>
          </ol>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Signals and Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Z-Transform</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Z-Transform is the main transform tool for discrete-time signals and digital systems. It converts sequences, recurrence relations, and convolution operations into algebraic expressions in the z-domain.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Core question</p>
              <p className="mt-1 leading-6">How does a sequence behave when viewed through poles, zeros, and ROC?</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Exam focus</p>
              <p className="mt-1 leading-6">ROC, inverse Z-transform, stability, causality, difference equations.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Engineering use</p>
              <p className="mt-1 leading-6">DSP filters, sampled-data systems, digital control, embedded signal processing.</p>
            </div>
          </div>
        </header>

        <nav aria-label="Z-Transform topic sections" className="sticky top-20 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
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
              In real digital electronics, signals are often not available at every instant of time. A microphone signal is sampled, a sensor is read periodically, and a DSP processor works on indexed values such as $$x[n]$$.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Z-Transform gives a clean mathematical language for such discrete-time signals. It plays for sequences what Laplace Transform plays for continuous-time systems: it reveals stability, causality, frequency behavior, and system response.
            </p>
          </TopicSection>

          <TopicSection id="why-it-matters" title="Why It Matters">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Engineering problem solved">
                <BulletList items={["Digital filters are described by difference equations, which become simpler algebra in the z-domain.", "Discrete convolution becomes multiplication, so LTI system output becomes easier to compute.", "Pole locations immediately show whether a digital system response decays, grows, or oscillates.", "The unit circle connects Z-Transform with DTFT and digital frequency response."]} />
              </MiniCard>
              <MiniCard title="Exam and interview value">
                <BulletList items={["GATE ECE questions often combine ROC, causality, stability, and inverse Z-transform.", "University exams test one-sided and two-sided Z-transform definitions.", "Technical interviews use Z-Transform to check DSP fundamentals and filter intuition."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="prerequisites" title="Prerequisites">
            <BulletList items={["Discrete-time signals such as $$x[n]$$ and $$u[n]$$.", "Geometric series and convergence.", "Complex numbers and polar form.", "Convolution of sequences.", "LTI system response and impulse response.", "Basic idea of Laplace Transform and Fourier Transform."]} />
          </TopicSection>

          <TopicSection id="intuition" title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Think of Z-Transform as a special lens for sequences. A sequence may look like a list of numbers in time, but in the z-plane it becomes a pattern of poles, zeros, and convergence regions.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              {"The variable $$z$$ is complex and is commonly written as $$z=re^{j\\omega}$$. The angle $$\\omega$$ represents discrete-time frequency, while the radius $$r$$ controls growth or decay. This is why the unit circle $$|z|=1$$ is so important for frequency response."}
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              Z-Transform is not just a formula. It is a map that turns sequence behavior into geometry.
            </blockquote>
            <div className="diagram-placeholder mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              Z-Plane Pole-Zero Diagram Here
            </div>
            <div className="animation-placeholder mt-3 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Unit Circle and ROC Visualization
            </div>
          </TopicSection>

          <TopicSection id="theory" title="Core Theory">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Two-sided Z-Transform</h3>
            <FormulaBox>{"$$X(z)=\\sum_{n=-\\infty}^{\\infty}x[n]z^{-n}$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This definition looks at the entire sequence from negative infinity to positive infinity. It is used heavily in Signals and Systems because it clearly separates right-sided, left-sided, and two-sided sequences using ROC.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">One-sided Z-Transform</h3>
            <FormulaBox>{"$$X^{+}(z)=\\sum_{n=0}^{\\infty}x[n]z^{-n}$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The one-sided form begins at $$n=0$$ and is useful for solving difference equations with initial conditions in DSP, digital control, and embedded systems.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Region of Convergence</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              {"ROC is the set of $$z$$ values for which the summation converges. Without ROC, an expression like $$X(z)=1/(1-az^{-1})$$ is incomplete because it may represent different time sequences."}
            </p>
          </TopicSection>

          <TopicSection id="working" title="Working Principle">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              {"Z-Transform works by multiplying each sample $$x[n]$$ with $$z^{-n}$$ and adding all weighted samples. This weighting tests how the sequence behaves against complex exponential patterns."}
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Step 1: Weight samples">
                <p className="mt-2 text-sm leading-6 text-slate-700">{"Each sample is scaled by $$z^{-n}$$, so earlier and later samples are treated according to their index."}</p>
              </MiniCard>
              <MiniCard title="Step 2: Sum the sequence">
                <p className="mt-2 text-sm leading-6 text-slate-700">{"The weighted samples are accumulated. If the sum stays finite, that value of $$z$$ belongs to the ROC."}</p>
              </MiniCard>
              <MiniCard title="Step 3: Read system behavior">
                <p className="mt-2 text-sm leading-6 text-slate-700">Poles, zeros, and ROC reveal causality, stability, transient behavior, and frequency response.</p>
              </MiniCard>
            </div>
            <div className="animation-placeholder mt-4 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Sequence Weighting and Z-Transform Summation
            </div>
          </TopicSection>

          <TopicSection id="formulas" title="Formula Explanation">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Definition">
                <FormulaBox>{"$$X(z)=\\sum_{n=-\\infty}^{\\infty}x[n]z^{-n}$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">The signal is converted from a time-indexed sequence into a complex-variable function.</p>
              </MiniCard>
              <MiniCard title="Inverse Z-Transform">
                <FormulaBox>{"$$x[n]=\\frac{1}{2\\pi j}\\oint_C X(z)z^{n-1}dz$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">This recovers the original sequence from its z-domain representation.</p>
              </MiniCard>
              <MiniCard title="Convolution property">
                <FormulaBox>{"$$x[n]*h[n]\\Longleftrightarrow X(z)H(z)$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">A difficult time-domain summation becomes multiplication in the z-domain.</p>
              </MiniCard>
              <MiniCard title="Frequency response">
                <FormulaBox>{"$$H(e^{j\\omega})=H(z)\\big|_{z=e^{j\\omega}}$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">{"If the unit circle lies in the ROC, the DTFT exists and the frequency response can be evaluated on $$|z|=1$$."}</p>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="diagram" title="Diagram Explanation Placeholder">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              A complete visual explanation should show the z-plane with the real axis, imaginary axis, unit circle, poles, zeros, and shaded ROC. For causal systems, the ROC extends outward from the outermost pole. For stable systems, the ROC must include the unit circle.
            </p>
            <div className="diagram-placeholder mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              Unit Circle, Poles, Zeros, and ROC Diagram Here
            </div>
            <div className="animation-placeholder mt-3 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated ROC Expansion Across the Z-Plane
            </div>
          </TopicSection>

          <TopicSection id="frequency-behavior" title="Frequency Behavior">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              In digital signal processing, frequency behavior is read on the unit circle. If a pole is close to the unit circle near a particular angle, the system tends to emphasize that frequency. If a zero is near the unit circle, it tends to suppress that frequency.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-950">
                    <th className="border border-slate-200 px-3 py-2">Z-plane feature</th>
                    <th className="border border-slate-200 px-3 py-2">Time-domain meaning</th>
                    <th className="border border-slate-200 px-3 py-2">Frequency effect</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr><td className="border border-slate-200 px-3 py-2">Pole inside unit circle</td><td className="border border-slate-200 px-3 py-2">Decaying response</td><td className="border border-slate-200 px-3 py-2">May create a peak near its angle</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Pole outside unit circle</td><td className="border border-slate-200 px-3 py-2">Growing response</td><td className="border border-slate-200 px-3 py-2">Usually unstable for causal systems</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Zero on unit circle</td><td className="border border-slate-200 px-3 py-2">Cancellation at a frequency</td><td className="border border-slate-200 px-3 py-2">Creates a notch</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Unit circle in ROC</td><td className="border border-slate-200 px-3 py-2">Absolutely summable impulse response</td><td className="border border-slate-200 px-3 py-2">Frequency response exists</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection id="applications" title="Real-World Applications">
            <BulletList items={["Design and analysis of FIR and IIR digital filters.", "Solving digital filter difference equations in DSP processors.", "Stability checking in digital control systems.", "Audio equalizers, noise reduction, and speech processing.", "Image processing filters used in cameras and medical imaging.", "Embedded sensor processing in IoT and communication receivers.", "Modeling sampled-data systems after analog-to-digital conversion."]} />
          </TopicSection>

          <TopicSection id="examples" title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">{"Example 1: Z-Transform of $$a^n u[n]$$"}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"For $$x[n]=a^n u[n]$$:"}</p>
            <FormulaBox>{"$$X(z)=\\sum_{n=0}^{\\infty}a^n z^{-n}=\\sum_{n=0}^{\\infty}(az^{-1})^n$$"}</FormulaBox>
            <FormulaBox>{"$$X(z)=\\frac{1}{1-az^{-1}},\\quad ROC:\\ |z|>|a|$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"The ROC is outside the pole because the sequence is right-sided and convergence needs $$|az^{-1}|<1$$."}</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 2: Stability from ROC</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"A system has $$H(z)=1/(1-0.5z^{-1})$$ with ROC $$|z|>0.5$$."}</p>
            <FormulaBox>{"$$|z|=1\\ \\text{lies in ROC}\\quad \\Rightarrow\\quad stable$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">Because the unit circle is included in the ROC, the impulse response is absolutely summable.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 3: Difference equation</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"For the system $$y[n]-0.4y[n-1]=x[n]$$ with zero initial conditions:"}</p>
            <FormulaBox>{"$$Y(z)-0.4z^{-1}Y(z)=X(z)$$"}</FormulaBox>
            <FormulaBox>{"$$H(z)=\\frac{Y(z)}{X(z)}=\\frac{1}{1-0.4z^{-1}}$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"The pole at $$z=0.4$$ lies inside the unit circle, so the causal system is stable."}</p>
          </TopicSection>

          <TopicSection id="common-mistakes" title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Writing the Z-Transform without mentioning ROC.", "Assuming every rational expression represents a causal sequence.", "Confusing the z-plane unit circle with the whole ROC.", "Forgetting that stability requires the unit circle to be inside the ROC.", "Using continuous-time Laplace pole rules directly without adjusting to discrete-time unit-circle rules.", "Mixing one-sided and two-sided Z-transform while solving difference equations."]} />
          </TopicSection>

          <TopicSection id="interview" title="Interview Questions">
            <BulletList items={interviewQuestions} />
          </TopicSection>

          <TopicSection id="exam-notes" title="Exam Notes">
            <BulletList items={["For right-sided sequences, ROC is outside the outermost pole.", "For left-sided sequences, ROC is inside the innermost pole.", "For two-sided sequences, ROC lies between poles.", "A causal discrete-time LTI system is stable only if all poles are inside the unit circle.", "A stable system has ROC including $$|z|=1$$.", "Check whether the problem asks for one-sided or two-sided Z-transform before using initial conditions."]} />
          </TopicSection>

          <TopicSection id="revision" title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["Z-Transform converts discrete-time sequences into z-domain functions.", "$$z=re^{j\\omega}$$ combines growth or decay with discrete-time frequency.", "ROC is essential for identifying the actual sequence.", "Unit circle in ROC means the frequency response exists.", "Poles and zeros explain stability, transient behavior, and filtering action.", "Difference equations become algebraic equations in the z-domain."]} />
          </TopicSection>

          <TopicSection id="practice" title="Practice Questions">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Conceptual</h3>
            <BulletList items={["Explain why ROC is required along with $$X(z)$$.", "What is the physical meaning of the unit circle in Z-Transform?", "How do poles and zeros affect digital filter behavior?", "Why does convolution become multiplication in the z-domain?"]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Numerical</h3>
            <BulletList items={["Find the Z-Transform and ROC of $$(0.8)^n u[n]$$.", "Determine whether a causal system with poles at $$0.2$$ and $$1.1$$ is stable.", "Find $$H(z)$$ for $$y[n]-0.7y[n-1]=x[n]+x[n-1]$$.", "Use partial fractions to find the inverse Z-Transform of $$X(z)=z/(z-0.5)$$ for a causal ROC."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">MCQs</h3>
            <BulletList items={["For a stable discrete-time LTI system, ROC must include: unit circle / origin only / infinity only / every pole.", "For a causal rational system, ROC lies: outside outermost pole / inside innermost pole / exactly on poles / only on unit circle.", "A zero on the unit circle generally causes: frequency notch / instability / infinite gain at all frequencies / no effect."]} />
          </TopicSection>
        </article>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/laplace-transform" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Previous Laplace Transform
          </Link>
          <Link href="/sampling-theorem" className="next-topic-btn inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            Next Sampling Theorem
          </Link>
        </div>
      </div>
    </Layout>
  );
}
