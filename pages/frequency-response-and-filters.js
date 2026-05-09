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
    name: "Frequency Response and Filters in Signals and Systems",
    description:
      "Conceptual ECE notes on frequency response, LTI filters, magnitude response, phase response, cutoff frequency, bandwidth, ideal filters, solved examples, GATE notes, and interview preparation.",
    learningResourceType: "Theory Notes",
    educationalLevel: "Undergraduate engineering",
    teaches: [
      "Frequency response",
      "LTI filters",
      "Magnitude response",
      "Phase response",
      "Cutoff frequency",
      "Bandwidth",
      "Distortionless transmission",
    ],
  },
];

export default function FrequencyResponseAndFiltersPage() {
  return (
    <Layout
      title="Frequency Response and Filters | Signals and Systems ECE Notes"
      description="Learn frequency response and filters with LTI system intuition, magnitude and phase response, cutoff frequency, bandwidth, ideal filters, solved examples, GATE notes, and interview questions."
      keywords="frequency response and filters signals and systems, LTI frequency response, magnitude response, phase response, cutoff frequency, bandwidth, ideal filters, GATE ECE"
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
            <li><span className="font-semibold text-portal-700">Frequency Response and Filters</span></li>
          </ol>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Signals and Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Frequency Response and Filters</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Frequency response tells how an LTI system treats each frequency component of an input signal. Filters use this behavior deliberately: they pass useful frequencies, reduce unwanted frequencies, and shape signals for communication, control, audio, and instrumentation.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Core question</p>
              <p className="mt-1 leading-6">What does the system do to each frequency in the signal?</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Exam focus</p>
              <p className="mt-1 leading-6">Magnitude, phase, cutoff, bandwidth, filter type, distortionless transmission.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Engineering use</p>
              <p className="mt-1 leading-6">DSP filters, audio equalizers, receivers, sensors, noise removal, anti-aliasing.</p>
            </div>
          </div>
        </header>

        <nav aria-label="Frequency Response and Filters topic sections" className="sticky top-20 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
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
              A real signal is rarely made of one pure frequency. Speech contains many tones, ECG contains slow biological variations plus noise, and a communication signal occupies a band of frequencies. Frequency response helps us understand how a system affects each part of that mixture.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              In Signals and Systems, this topic connects Fourier analysis with practical system design. Once you know the frequency response, you can predict whether a system amplifies, attenuates, delays, distorts, or cleans a signal.
            </p>
          </TopicSection>

          <TopicSection id="why-it-matters" title="Why It Matters">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Engineering problem solved">
                <BulletList items={["Filters remove noise without destroying the useful signal band.", "Receivers separate one communication channel from nearby channels.", "Audio systems shape bass, midrange, and treble using frequency-selective behavior.", "Sensors use filtering to suppress power-line hum, vibration noise, and high-frequency interference."]} />
              </MiniCard>
              <MiniCard title="Exam and interview value">
                <BulletList items={["GATE ECE problems often ask filter type from magnitude response.", "University exams test cutoff frequency, bandwidth, phase response, and ideal filters.", "Interviews check whether you can explain why convolution in time becomes multiplication in frequency."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="prerequisites" title="Prerequisites">
            <BulletList items={["LTI systems and impulse response.", "Convolution of signals.", "Fourier Transform and sinusoidal steady-state idea.", "Magnitude and phase of complex numbers.", "Basic low-pass, high-pass, band-pass, and band-stop filter vocabulary."]} />
          </TopicSection>

          <TopicSection id="intuition" title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Imagine a security gate that allows some people to enter and blocks others. A filter is similar, but its decision is based on frequency. Low-frequency components may pass, high-frequency components may be reduced, or only a middle band may be selected.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Frequency response is the rulebook of that gate. It tells how much each frequency is scaled and how much its phase is shifted.
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              A filter does not understand the signal name. It only responds to frequency content.
            </blockquote>
            <div className="diagram-placeholder mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              Input Spectrum, Filter Response, and Output Spectrum Diagram Here
            </div>
            <div className="animation-placeholder mt-3 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Frequency Selection Visualization
            </div>
          </TopicSection>

          <TopicSection id="theory" title="Core Theory">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Frequency response of an LTI system</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              {"For an LTI system with impulse response $$h(t)$$, the frequency response is the Fourier Transform of $$h(t)$$."}
            </p>
            <FormulaBox>{"$$H(j\\omega)=\\int_{-\\infty}^{\\infty}h(t)e^{-j\\omega t}dt$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              {"For discrete-time systems, the frequency response is evaluated as $$H(e^{j\\omega})$$."}
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Input-output relation</h3>
            <FormulaBox>{"$$Y(j\\omega)=X(j\\omega)H(j\\omega)$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This is the central reason frequency response is powerful. Time-domain convolution becomes frequency-domain multiplication, so system action becomes easier to visualize.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Magnitude and phase</h3>
            <FormulaBox>{"$$H(j\\omega)=|H(j\\omega)|e^{j\\angle H(j\\omega)}$$"}</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Magnitude response tells gain or attenuation. Phase response tells delay or phase shift. A system can preserve amplitude but still distort waveform shape if phase is not handled properly.
            </p>
          </TopicSection>

          <TopicSection id="working" title="Working Principle">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              A filter works by giving different gains to different frequency components. The output spectrum is formed by multiplying the input spectrum with the filter response.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Step 1: Break into frequencies">
                <p className="mt-2 text-sm leading-6 text-slate-700">Fourier analysis views the input as a combination of sinusoids.</p>
              </MiniCard>
              <MiniCard title="Step 2: Apply system response">
                <p className="mt-2 text-sm leading-6 text-slate-700">Each frequency is scaled by magnitude response and shifted by phase response.</p>
              </MiniCard>
              <MiniCard title="Step 3: Recombine output">
                <p className="mt-2 text-sm leading-6 text-slate-700">The modified frequency components combine to create the output signal.</p>
              </MiniCard>
            </div>
            <div className="animation-placeholder mt-4 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Filter Magnitude and Phase Response Visualization
            </div>
          </TopicSection>

          <TopicSection id="formulas" title="Formula Explanation">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Continuous-time frequency response">
                <FormulaBox>{"$$H(j\\omega)=\\mathcal{F}\\{h(t)\\}$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">The impulse response contains the full time-domain identity of an LTI system.</p>
              </MiniCard>
              <MiniCard title="Discrete-time frequency response">
                <FormulaBox>{"$$H(e^{j\\omega})=\\sum_{n=-\\infty}^{\\infty}h[n]e^{-j\\omega n}$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">This is the DTFT of the discrete-time impulse response.</p>
              </MiniCard>
              <MiniCard title="Output spectrum">
                <FormulaBox>{"$$Y(\\omega)=X(\\omega)H(\\omega)$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">The filter shapes the input spectrum by multiplication.</p>
              </MiniCard>
              <MiniCard title="Bandwidth">
                <FormulaBox>{"$$BW=f_H-f_L$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">Bandwidth is the useful range of frequencies passed by a filter or channel.</p>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="diagram" title="Diagram Explanation Placeholder">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The best visual for this topic shows three aligned graphs: input spectrum, filter magnitude response, and output spectrum. Frequencies inside the passband remain strong, while stopband frequencies shrink.
            </p>
            <div className="diagram-placeholder mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              Magnitude Response and Passband-Stopband Diagram Here
            </div>
            <div className="diagram-placeholder mt-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              Phase Response and Group Delay Diagram Here
            </div>
            <div className="animation-placeholder mt-3 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Input Spectrum Through Filter Visualization
            </div>
          </TopicSection>

          <TopicSection id="frequency-behavior" title="Frequency Behavior">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Filter names describe which part of the spectrum is allowed to pass. Ideal filters have sharp boundaries, but practical filters transition gradually and introduce phase effects.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-950">
                    <th className="border border-slate-200 px-3 py-2">Filter type</th>
                    <th className="border border-slate-200 px-3 py-2">Passes</th>
                    <th className="border border-slate-200 px-3 py-2">Rejects</th>
                    <th className="border border-slate-200 px-3 py-2">Typical use</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr><td className="border border-slate-200 px-3 py-2">Low-pass</td><td className="border border-slate-200 px-3 py-2">Low frequencies</td><td className="border border-slate-200 px-3 py-2">High-frequency noise</td><td className="border border-slate-200 px-3 py-2">Anti-aliasing, smoothing</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">High-pass</td><td className="border border-slate-200 px-3 py-2">High frequencies</td><td className="border border-slate-200 px-3 py-2">DC and slow drift</td><td className="border border-slate-200 px-3 py-2">Audio coupling, edge emphasis</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Band-pass</td><td className="border border-slate-200 px-3 py-2">A selected band</td><td className="border border-slate-200 px-3 py-2">Below and above the band</td><td className="border border-slate-200 px-3 py-2">Communication channel selection</td></tr>
                  <tr><td className="border border-slate-200 px-3 py-2">Band-stop</td><td className="border border-slate-200 px-3 py-2">Outside a selected band</td><td className="border border-slate-200 px-3 py-2">One unwanted band</td><td className="border border-slate-200 px-3 py-2">50/60 Hz hum removal</td></tr>
                </tbody>
              </table>
            </div>
          </TopicSection>

          <TopicSection id="implementation" title="Real Engineering Implementation">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              In hardware, filters are built using resistors, capacitors, inductors, op-amps, or switched-capacitor circuits. In DSP, filters are implemented as algorithms that calculate each output sample from input samples and stored past values.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Analog implementation">
                <BulletList items={["RC filters for simple low-pass and high-pass behavior.", "RLC filters for resonance and band selection.", "Active filters using op-amps for gain and sharper response."]} />
              </MiniCard>
              <MiniCard title="Digital implementation">
                <BulletList items={["FIR filters for stable linear-phase designs.", "IIR filters for efficient sharp responses.", "Real-time DSP in audio, telecom, radar, and embedded systems."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="applications" title="Real-World Applications">
            <BulletList items={["Anti-aliasing filters before analog-to-digital converters.", "Audio equalizers and noise reduction systems.", "Channel selection in radio and communication receivers.", "ECG and EEG signal conditioning in biomedical instruments.", "Image processing filters for sharpening and smoothing.", "Vibration analysis and fault detection in industrial machines.", "Control-system noise rejection and sensor signal conditioning."]} />
          </TopicSection>

          <TopicSection id="examples" title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 1: Output spectrum</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"A signal has frequency components at $$100\\,Hz$$ and $$5\\,kHz$$. It passes through an ideal low-pass filter with cutoff $$1\\,kHz$$."}</p>
            <FormulaBox>{"$$100\\,Hz\\ \\text{passes},\\qquad 5\\,kHz\\ \\text{is rejected}$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">The output keeps the slow component and removes the high-frequency component.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 2: Bandwidth</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"A band-pass filter passes frequencies from $$2\\,kHz$$ to $$8\\,kHz$$."}</p>
            <FormulaBox>{"$$BW=f_H-f_L=8\\,kHz-2\\,kHz=6\\,kHz$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"The useful frequency range is $$6\\,kHz$$ wide."}</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 3: Frequency response from impulse response</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"For $$h(t)=e^{-at}u(t)$$ where $$a>0$$:"}</p>
            <FormulaBox>{"$$H(j\\omega)=\\int_0^\\infty e^{-at}e^{-j\\omega t}dt=\\frac{1}{a+j\\omega}$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">{"Magnitude decreases as $$\\omega$$ increases, so the system behaves like a low-pass response."}</p>
          </TopicSection>

          <TopicSection id="common-mistakes" title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Looking only at magnitude response and ignoring phase distortion.", "Confusing cutoff frequency with bandwidth.", "Assuming ideal brick-wall filters exist exactly in practical circuits.", "Calling every frequency-selective system a low-pass filter without checking the passband.", "Forgetting that output spectrum is input spectrum multiplied by system response.", "Mixing Hz and rad/s without the conversion $$\\omega=2\\pi f$$."]} />
          </TopicSection>

          <TopicSection id="interview" title="Interview Questions">
            <BulletList items={["What is frequency response in an LTI system?", "Why is the impulse response enough to determine frequency response?", "What is the difference between magnitude response and phase response?", "How does a low-pass filter remove high-frequency noise?", "What is bandwidth and why does it matter in communication systems?", "Why are ideal filters impossible to realize exactly?", "How are FIR and IIR filters different in practical DSP?"]} />
          </TopicSection>

          <TopicSection id="exam-notes" title="Exam Notes">
            <BulletList items={["For LTI systems, remember $$Y(\\omega)=X(\\omega)H(\\omega)$$.", "Magnitude response decides passband and stopband behavior.", "Phase response decides delay and waveform distortion.", "Low-pass filters are common before ADC sampling.", "Bandwidth of a band-pass filter is $$f_H-f_L$$.", "For distortionless transmission, magnitude should be constant and phase should be linear over the signal band."]} />
          </TopicSection>

          <TopicSection id="revision" title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["Frequency response is the Fourier Transform of impulse response.", "Filters shape signals by passing some frequencies and attenuating others.", "Magnitude response controls gain; phase response controls timing shift.", "Convolution in time becomes multiplication in frequency.", "Cutoff frequency separates passband and stopband behavior.", "Practical filters have transition bands and non-ideal phase behavior."]} />
          </TopicSection>

          <TopicSection id="practice" title="Practice Questions">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Conceptual</h3>
            <BulletList items={["Explain frequency response using the idea of a frequency gate.", "Why does phase response matter even if magnitude response looks correct?", "Why is an anti-aliasing filter usually low-pass?", "What makes a system distortionless over a signal band?"]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Numerical</h3>
            <BulletList items={["A band-pass filter has $$f_L=300\\,Hz$$ and $$f_H=3.4\\,kHz$$. Find bandwidth.", "For $$H(j\\omega)=1/(2+j\\omega)$$, describe whether the response is low-pass or high-pass.", "An input has components at $$50\\,Hz$$, $$1\\,kHz$$, and $$20\\,kHz$$. Which components pass through an ideal low-pass filter of cutoff $$2\\,kHz$$?", "Convert cutoff frequency $$f_c=1\\,kHz$$ into angular frequency $$\\omega_c$$."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">MCQs</h3>
            <BulletList items={["For an LTI system, frequency response is Fourier Transform of: impulse response / input only / output only / noise.", "A band-stop filter rejects: one band / all low frequencies only / all high frequencies only / no frequency.", "Distortionless transmission requires: constant magnitude and linear phase / zero magnitude / random phase / infinite bandwidth."]} />
          </TopicSection>
        </article>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/sampling-theorem" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Previous Sampling Theorem
          </Link>
          <Link href="/subjects/signals-and-systems" className="next-topic-btn inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            Back to Signals and Systems
          </Link>
        </div>
      </div>
    </Layout>
  );
}
