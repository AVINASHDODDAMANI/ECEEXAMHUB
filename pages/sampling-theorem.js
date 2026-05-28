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

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Sampling Theorem in Signals and Systems",
    description:
      "Conceptual ECE notes on Sampling Theorem, Nyquist rate, aliasing, reconstruction, anti-aliasing filters, solved examples, GATE quick notes, and interview preparation.",
    learningResourceType: "Theory Quick Notes",
    educationalLevel: "Undergraduate engineering",
    teaches: [
      "Sampling Theorem",
      "Nyquist rate",
      "Aliasing",
      "Signal reconstruction",
      "Anti-aliasing filter",
      "Sampled-data systems",
    ],
  },
];

export default function SamplingTheoremPage() {
  return (
    <Layout
      title="Sampling Theorem GATE ECE Quick Notes + Nyquist Formula + PYQs"
      description="Learn Sampling Theorem with Nyquist rate intuition, aliasing, reconstruction, frequency-domain behavior, solved examples, GATE quick notes, and interview questions."
      keywords="Sampling Theorem signals and systems, Nyquist rate, aliasing, reconstruction, anti-aliasing filter, sampled signals, GATE ECE"
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
            <li><span className="font-semibold text-portal-700">Sampling Theorem</span></li>
          </ol>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Signals and Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Sampling Theorem</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Sampling Theorem explains how a continuous-time signal can be converted into discrete samples without losing information, provided the sampling rate is high enough.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Core question</p>
              <p className="mt-1 leading-6">How fast must we sample a signal to reconstruct it correctly?</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Exam focus</p>
              <p className="mt-1 leading-6">Nyquist rate, aliasing, sampling frequency, reconstruction.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Engineering use</p>
              <p className="mt-1 leading-6">ADC systems, DSP, audio, telecom, instrumentation, data acquisition.</p>
            </div>
          </div>
        </header>

        <nav aria-label="Sampling Theorem topic sections" className="sticky top-20 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
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
              Most natural signals are continuous: speech pressure varies smoothly, temperature changes gradually, and voltage from a sensor exists at every instant. Digital processors, however, cannot store every instant. They store samples.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Sampling Theorem tells us the exact condition under which those samples still carry the full information of the original band-limited signal. It is the foundation of analog-to-digital conversion, digital signal processing, communication systems, and modern measurement instruments.
            </p>
          </TopicSection>

          <TopicSection id="why-it-matters" title="Why It Matters">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Engineering problem solved">
                <BulletList items={["It tells ADC designers the minimum sampling frequency needed for faithful digital capture.", "It explains why aliasing creates false low-frequency components.", "It connects time-domain sampling with frequency-domain spectrum replication.", "It guides anti-aliasing filter design before digital processing."]} />
              </MiniCard>
              <MiniCard title="Exam and interview value">
                <BulletList items={["GATE ECE regularly tests Nyquist rate, Nyquist interval, and aliasing.", "University exams ask the statement and frequency-domain proof of Sampling Theorem.", "DSP and communication interviews often ask why sampling below Nyquist is dangerous."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="prerequisites" title="Prerequisites">
            <BulletList items={["Continuous-time and discrete-time signal notation.", "Fourier Transform and bandwidth.", "Frequency spectrum of a signal.", "Impulse train or periodic sampling idea.", "Low-pass filtering and reconstruction basics."]} />
          </TopicSection>

          <TopicSection id="intuition" title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Imagine taking photographs of a rotating fan. If the camera captures frames slowly, the fan may appear to rotate backward or move at the wrong speed. The real motion has not changed; the sampling was too slow.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Signal sampling has the same issue. If samples are too far apart, different analog waveforms can pass through the same sample points. The digital system then cannot know which original waveform was real.
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              Sampling is not about taking many points blindly. It is about taking enough points so the fastest meaningful variation cannot hide between samples.
            </blockquote>
            <div className="diagram-placeholder mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              Continuous Signal and Sample Points Diagram Here
            </div>
            <div className="animation-placeholder mt-3 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Sampling and Aliasing Visualization
            </div>
          </TopicSection>

          <TopicSection id="theory" title="Core Theory">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Statement of Sampling Theorem</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              A continuous-time band-limited signal with highest frequency component $$f_m$$ Hz can be reconstructed exactly from its samples if the sampling frequency $$f_s$$ is at least twice the highest signal frequency.
            </p>
            <FormulaBox>{"$$f_s \\geq 2f_m$$"}</FormulaBox>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Nyquist rate and Nyquist interval</h3>
            <FormulaBox>{"$$f_N=2f_m$$"}</FormulaBox>
            <FormulaBox>{"$$T_s \\leq \\frac{1}{2f_m}$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The Nyquist rate is the minimum safe sampling frequency. The Nyquist interval is the maximum allowed time gap between consecutive samples.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Band-limited condition</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The theorem assumes the signal has no frequency components above $$f_m$$. In practical systems, an anti-aliasing filter is placed before the ADC to remove unwanted high-frequency content.
            </p>
          </TopicSection>

          <TopicSection id="working" title="Working Principle">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Sampling can be understood as multiplying the original signal by a train of impulses. This creates equally spaced samples in time. In the frequency domain, that multiplication produces repeated copies of the signal spectrum.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Step 1: Sample the waveform">
                <p className="mt-2 text-sm leading-6 text-slate-700">The sampler records values at intervals $$T_s$$, producing $$x[n]=x(nT_s)$$.</p>
              </MiniCard>
              <MiniCard title="Step 2: Spectrum repeats">
                <p className="mt-2 text-sm leading-6 text-slate-700">The original spectrum repeats around multiples of the sampling frequency $$f_s$$.</p>
              </MiniCard>
              <MiniCard title="Step 3: Reconstruct">
                <p className="mt-2 text-sm leading-6 text-slate-700">If repeated spectra do not overlap, an ideal low-pass reconstruction filter can recover the original signal.</p>
              </MiniCard>
            </div>
            <div className="animation-placeholder mt-4 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Spectrum Replication and Reconstruction Visualization
            </div>
          </TopicSection>

          <TopicSection id="formulas" title="Formula Explanation">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Sampling frequency">
                <FormulaBox>{"$$f_s=\\frac{1}{T_s}$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">Sampling frequency tells how many samples are taken per second.</p>
              </MiniCard>
              <MiniCard title="Nyquist condition">
                <FormulaBox>{"$$f_s \\geq 2f_m$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">The sampler must be at least twice as fast as the highest signal frequency.</p>
              </MiniCard>
              <MiniCard title="Nyquist interval">
                <FormulaBox>{"$$T_s \\leq \\frac{1}{2f_m}$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">Samples must be close enough in time to capture the fastest variation.</p>
              </MiniCard>
              <MiniCard title="Aliased frequency">
                <FormulaBox>{"$$f_a=|f-kf_s|$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">When sampling is too slow, a high frequency may appear as a false lower frequency.</p>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="diagram" title="Diagram Explanation Placeholder">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              A useful diagram should show a continuous signal, sampled points, and the reconstructed curve. A second diagram should show spectrum replicas centered at $$0$$, $$\\pm f_s$$, $$\\pm 2f_s$$ and highlight whether the copies overlap.
            </p>
            <div className="diagram-placeholder mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              Time-Domain Sampling Diagram Here
            </div>
            <div className="diagram-placeholder mt-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              Frequency-Domain Spectrum Replication Diagram Here
            </div>
            <div className="animation-placeholder mt-3 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Nyquist Rate Slider Visualization
            </div>
          </TopicSection>

          <TopicSection id="frequency-behavior" title="Frequency Behavior">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Sampling does not simply convert time into numbers. It reshapes the frequency picture by creating copies of the original spectrum. If the copies are separated, reconstruction is possible. If they overlap, aliasing permanently mixes frequencies.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-950">
                    <th className="border border-slate-200 px-3 py-2">Sampling condition</th>
                    <th className="border border-slate-200 px-3 py-2">Frequency-domain result</th>
                    <th className="border border-slate-200 px-3 py-2">Engineering meaning</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr><td className="border border-slate-200 px-3 py-2">$$f_s &gt; 2f_m$$</td><td className="border border-slate-200 px-3 py-2">Spectral copies are separated</td><td className="border border-slate-200 px-3 py-2">Clean reconstruction is possible</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">$$f_s = 2f_m$$</td><td className="border border-slate-200 px-3 py-2">Copies just touch ideally</td><td className="border border-slate-200 px-3 py-2">Theoretical minimum, not comfortable in hardware</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">$$f_s &lt; 2f_m$$</td><td className="border border-slate-200 px-3 py-2">Spectral copies overlap</td><td className="border border-slate-200 px-3 py-2">Aliasing distortion occurs</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection id="applications" title="Real-World Applications">
            <BulletList items={["Analog-to-digital converters in microcontrollers and DSP boards.", "Audio recording, speech processing, and noise cancellation systems.", "Digital communication receivers and software-defined radio.", "Medical instruments such as ECG, EEG, and ultrasound systems.", "Oscilloscopes, data acquisition systems, and spectrum analyzers.", "Image sensors and video capture pipelines.", "Industrial sensor monitoring and embedded control systems."]} />
          </TopicSection>

          <TopicSection id="examples" title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 1: Nyquist rate</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">A signal has highest frequency $$f_m=5\\,kHz$$. Find the minimum sampling frequency.</p>
            <FormulaBox>{"$$f_s \\geq 2f_m=2(5\\,kHz)=10\\,kHz$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">The signal must be sampled at least at $$10\\,kHz$$ to avoid aliasing.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 2: Nyquist interval</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">For $$f_m=4\\,kHz$$, the maximum sampling interval is:</p>
            <FormulaBox>{"$$T_s \\leq \\frac{1}{2f_m}=\\frac{1}{8000}=125\\,\\mu s$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">Samples must be separated by no more than $$125\\,\\mu s$$.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 3: Aliasing check</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">A $$7\\,kHz$$ sinusoid is sampled at $$10\\,kHz$$. Since the Nyquist limit is $$5\\,kHz$$, aliasing occurs.</p>
            <FormulaBox>{"$$f_a=|7-10|=3\\,kHz$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">The sampled system may falsely show a $$3\\,kHz$$ component.</p>
          </TopicSection>

          <TopicSection id="common-mistakes" title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Using average frequency instead of highest frequency for Nyquist rate.", "Forgetting that the signal must be band-limited.", "Writing $$f_s=2f_m$$ as always practical, even though real systems need guard band.", "Confusing sampling frequency with signal frequency.", "Ignoring anti-aliasing filters before the ADC.", "Assuming aliased data can always be corrected later."]} />
          </TopicSection>

          <TopicSection id="interview" title="Interview Questions">
            <BulletList items={["State Sampling Theorem in simple engineering language.", "Why must sampling frequency be at least twice the highest signal frequency?", "What is aliasing and why is it dangerous?", "Why is an anti-aliasing filter used before an ADC?", "What happens in the frequency domain after sampling?", "Why do practical systems sample above the exact Nyquist rate?", "How is Sampling Theorem used in audio or communication receivers?"]} />
          </TopicSection>

          <TopicSection id="exam-notes" title="Exam Quick Notes">
            <BulletList items={["Always identify the maximum frequency component $$f_m$$ first.", "Nyquist rate is $$2f_m$$, while Nyquist interval is $$1/(2f_m)$$.", "If $$f_s<2f_m$$, aliasing occurs.", "Spectrum replicas are spaced by $$f_s$$.", "Ideal reconstruction requires a low-pass filter after sampling.", "In numerical problems, convert units carefully: Hz, kHz, seconds, milliseconds, microseconds."]} />
          </TopicSection>

          <TopicSection id="revision" title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["Sampling converts a continuous-time signal into discrete-time samples.", "Sampling Theorem applies to band-limited signals.", "Minimum sampling frequency is $$f_s\\geq2f_m$$.", "Sampling below Nyquist causes aliasing.", "Frequency-domain sampling creates repeated spectra.", "Anti-aliasing and reconstruction filters make the theory usable in real hardware."]} />
          </TopicSection>

          <TopicSection id="practice" title="Practice Questions">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Conceptual</h3>
            <BulletList items={["Explain Sampling Theorem using a visual analogy.", "Why does aliasing happen in the frequency domain?", "Why is exact Nyquist-rate sampling difficult in practical circuits?", "What is the role of an anti-aliasing filter?"]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Numerical</h3>
            <BulletList items={["Find the Nyquist rate for a signal band-limited to $$3.5\\,kHz$$.", "Find the Nyquist interval for $$f_m=12\\,kHz$$.", "A $$9\\,kHz$$ tone is sampled at $$14\\,kHz$$. Determine whether aliasing occurs and find the apparent frequency.", "A signal contains $$1\\,kHz$$, $$2\\,kHz$$, and $$6\\,kHz$$ components. Find the minimum sampling rate."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">MCQs</h3>
            <BulletList items={["Nyquist rate for highest frequency $$f_m$$ is: $$2f_m$$ / $$f_m/2$$ / $$f_m$$ / $$4f_m$$.", "Aliasing occurs when: $$f_s<2f_m$$ / $$f_s>2f_m$$ / signal is DC / filter is ideal.", "Before ADC, practical systems usually use: anti-aliasing filter / power amplifier only / rectifier only / counter."]} />
          </TopicSection>
        </article>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/z-transform" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Previous Z-Transform
          </Link>
          <Link href="/frequency-response-and-filters" className="next-topic-btn inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            Next Frequency Response and Filters
          </Link>
        </div>
      </div>
    </Layout>
  );
}
