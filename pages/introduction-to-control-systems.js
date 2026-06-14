import Link from "next/link";
import Layout from "../components/layout";
import ControlSystemSubtopicMenu from "../components/ControlSystemSubtopicMenu";
import { controlSystemTopicPages } from "../data/control-system-topic-pages";
import { generateCanonical } from "../lib/seo";

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

function FlowArrow() {
  return (
    <div className="flex items-center justify-center sm:w-[7%]" aria-hidden="true">
      <div className="h-6 w-1 bg-slate-900 sm:h-1 sm:w-full" />
      <div className="hidden h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-slate-900 sm:block" />
    </div>
  );
}

function OpenLoopControlSystemDiagram() {
  const blocks = [
    {
      title: "Controller",
      subtitle: "Amplifier / command unit",
      className: "border-emerald-700 bg-emerald-50 text-emerald-900",
    },
    {
      title: "Actuator / Driver",
      subtitle: "Converts control signal into action",
      className: "border-amber-500 bg-amber-50 text-amber-900",
    },
    {
      title: "Plant / Process",
      subtitle: "Actual system being controlled",
      className: "border-sky-600 bg-sky-50 text-sky-950",
    },
  ];

  return (
    <figure className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h4 className="text-center text-xl font-black tracking-tight text-[#0b2d67] sm:text-2xl">
        Open-Loop Control System Circuit Diagram
      </h4>
      <p className="mx-auto mt-2 max-w-3xl text-center text-sm leading-6 text-slate-700 sm:text-base">
        In an open-loop control system, the signal travels only in the forward direction from
        reference input to output. Since the output is not measured and returned, there is no
        feedback path for automatic correction.
      </p>

      <div className="mt-5 rounded-2xl border-2 border-dashed border-blue-300 px-3 py-5">
        <div className="overflow-x-auto pb-2">
          <svg
            viewBox="0 0 1180 360"
            role="img"
            aria-label="Closed-loop control system block diagram with feedback path"
            className="min-w-[980px]"
          >
            <defs>
              <marker id="closed-loop-arrow" markerHeight="10" markerWidth="10" orient="auto" refX="9" refY="3">
                <path d="M0,0 L9,3 L0,6 Z" fill="#111827" />
              </marker>
              <filter id="closed-loop-shadow" x="-8%" y="-12%" width="116%" height="124%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.12" />
              </filter>
            </defs>

            <text x="48" y="70" textAnchor="middle" fontSize="21" fontWeight="700" fill="#111827">
              <tspan x="48" dy="0">Reference</tspan>
              <tspan x="48" dy="26">Input</tspan>
              <tspan x="48" dy="31" fontFamily="monospace">r(t)</tspan>
            </text>
            <line x1="95" y1="101" x2="150" y2="101" stroke="#111827" strokeWidth="3" markerEnd="url(#closed-loop-arrow)" />

            <circle cx="182" cy="101" r="31" fill="#fff1f2" stroke="#111827" strokeWidth="3" filter="url(#closed-loop-shadow)" />
            <text x="182" y="112" textAnchor="middle" fontSize="36" fontWeight="800" fill="#111827">{"\u03A3"}</text>
            <text x="145" y="64" textAnchor="middle" fontSize="24" fontWeight="800" fill="#111827">+</text>
            <text x="160" y="149" textAnchor="middle" fontSize="26" fontWeight="800" fill="#111827">-</text>

            <line x1="213" y1="101" x2="277" y2="101" stroke="#111827" strokeWidth="3" markerEnd="url(#closed-loop-arrow)" />
            <text x="247" y="62" textAnchor="middle" fontSize="18" fontWeight="700" fill="#111827">
              <tspan x="247" dy="0">Error</tspan>
              <tspan x="247" dy="25" fontFamily="monospace">e(t)</tspan>
            </text>

            <rect x="288" y="61" width="165" height="80" rx="3" fill="#e8f7e2" stroke="#111827" strokeWidth="2.5" />
            <text x="370.5" y="95" textAnchor="middle" fontSize="21" fontWeight="800" fill="#111827">Controller</text>
            <text x="370.5" y="122" textAnchor="middle" fontSize="18" fill="#111827">(Compensator)</text>

            <line x1="453" y1="101" x2="537" y2="101" stroke="#111827" strokeWidth="3" markerEnd="url(#closed-loop-arrow)" />

            <rect x="548" y="61" width="170" height="80" rx="3" fill="#fff2bf" stroke="#111827" strokeWidth="2.5" />
            <text x="633" y="95" textAnchor="middle" fontSize="21" fontWeight="800" fill="#111827">Actuator /</text>
            <text x="633" y="122" textAnchor="middle" fontSize="21" fontWeight="800" fill="#111827">Driver</text>

            <line x1="718" y1="101" x2="797" y2="101" stroke="#111827" strokeWidth="3" markerEnd="url(#closed-loop-arrow)" />

            <rect x="808" y="61" width="170" height="80" rx="3" fill="#dff3fb" stroke="#111827" strokeWidth="2.5" />
            <text x="893" y="95" textAnchor="middle" fontSize="21" fontWeight="800" fill="#111827">Plant / Process</text>
            <text x="893" y="122" textAnchor="middle" fontSize="18" fill="#111827">(System)</text>

            <line x1="978" y1="101" x2="1093" y2="101" stroke="#111827" strokeWidth="3" markerEnd="url(#closed-loop-arrow)" />
            <text x="1140" y="88" textAnchor="middle" fontSize="21" fontWeight="700" fill="#111827">
              <tspan x="1140" dy="0">Output</tspan>
              <tspan x="1140" dy="31" fontFamily="monospace">c(t)</tspan>
            </text>

            <path d="M1035 101 V220 H708" fill="none" stroke="#111827" strokeWidth="3" markerEnd="url(#closed-loop-arrow)" />

            <rect x="468" y="188" width="240" height="66" rx="3" fill="#f1edff" stroke="#111827" strokeWidth="2.5" />
            <text x="588" y="214" textAnchor="middle" fontSize="18" fontWeight="800" fill="#111827">Sensor / Measuring</text>
            <text x="588" y="239" textAnchor="middle" fontSize="18" fontWeight="800" fill="#111827">Element (Feedback)</text>

            <path d="M468 220 H182 V134" fill="none" stroke="#111827" strokeWidth="3" markerEnd="url(#closed-loop-arrow)" />

            <rect x="245" y="285" width="700" height="50" rx="8" fill="#f8fbff" stroke="#93c5fd" strokeWidth="2" strokeDasharray="7 5" />
            <text x="595" y="305" textAnchor="middle" fontSize="17" fill="#334155">
              <tspan x="595" dy="0">The output is measured by the sensor and fed back. It is compared with the reference input.</tspan>
              <tspan x="595" dy="23">The error e(t) = r(t) - c</tspan>
              <tspan baselineShift="sub" fontSize="12">m</tspan>
              <tspan>(t) is used by the controller to reduce the error.</tspan>
            </text>
          </svg>
        </div>

        <div className="hidden flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-0">
          <div className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-center shadow-sm sm:w-[14%]">
            <p className="text-sm font-black text-slate-950">Reference Input</p>
            <p className="mt-1 font-mono text-sm font-bold text-slate-700">r(t)</p>
          </div>

          <FlowArrow />

          {blocks.map((block, index) => (
            <div key={block.title} className="contents">
              <div className={`rounded-xl border-2 px-3 py-4 text-center shadow-sm sm:w-[20%] ${block.className}`}>
                <p className="text-base font-black sm:text-lg">{block.title}</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-700 sm:text-sm">
                  {block.subtitle}
                </p>
              </div>
              {index < blocks.length - 1 ? <FlowArrow /> : null}
            </div>
          ))}

          <FlowArrow />

          <div className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-center shadow-sm sm:w-[12%]">
            <p className="text-sm font-black text-slate-950">Output</p>
            <p className="mt-1 font-mono text-sm font-bold text-slate-700">c(t)</p>
          </div>
        </div>

        <div className="mx-auto mt-5 max-w-xs rounded-xl border-2 border-dashed border-rose-300 bg-rose-50 px-4 py-2 text-center">
          <p className="text-sm font-black text-rose-700">No feedback path</p>
        </div>
      </div>

      <figcaption className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
        <strong>Diagram explanation:</strong> The reference input <strong>r(t)</strong> is sent to
        the controller. The controller generates a control signal, the actuator or driver converts
        it into physical action, and the plant or process produces the output <strong>c(t)</strong>.
        Because the output is not compared with the input, the system cannot automatically detect or
        correct errors caused by disturbances.
      </figcaption>
    </figure>
  );
}

function ClosedLoopControlSystemDiagram() {
  const blocks = [
    {
      title: "Controller",
      subtitle: "Compensator",
      className: "border-emerald-700 bg-emerald-50 text-emerald-900",
    },
    {
      title: "Actuator / Driver",
      subtitle: "Converts signal into action",
      className: "border-amber-500 bg-amber-50 text-amber-900",
    },
    {
      title: "Plant / Process",
      subtitle: "System being controlled",
      className: "border-sky-600 bg-sky-50 text-sky-950",
    },
  ];

  return (
    <figure className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h4 className="text-center text-xl font-black tracking-tight text-[#0b2d67] sm:text-2xl">
        Closed-Loop Control System Circuit / Block Diagram
      </h4>
      <p className="mx-auto mt-2 max-w-3xl text-center text-sm leading-6 text-slate-700 sm:text-base">
        In a closed-loop control system, the output is measured and sent back through a feedback
        path. The measured output is compared with the reference input to generate an error signal,
        and the controller acts to reduce that error.
      </p>

      <div className="mt-5 rounded-2xl border-2 border-dashed border-blue-300 px-3 py-5">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-0">
          <div className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-center shadow-sm sm:w-[13%]">
            <p className="text-sm font-black text-slate-950">Reference Input</p>
            <p className="mt-1 font-mono text-sm font-bold text-slate-700">r(t)</p>
          </div>

          <FlowArrow />

          <div className="flex flex-col items-center justify-center rounded-full border-2 border-slate-800 bg-white px-4 py-3 text-center shadow-sm sm:h-20 sm:w-20">
            <p className="text-xl font-black text-slate-950">Σ</p>
            <p className="text-xs font-bold text-emerald-700">+ input</p>
            <p className="text-xs font-bold text-rose-700">- feedback</p>
          </div>

          <FlowArrow />

          <div className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-center shadow-sm sm:w-[12%]">
            <p className="text-sm font-black text-slate-950">Error</p>
            <p className="mt-1 font-mono text-sm font-bold text-slate-700">e(t)</p>
          </div>

          <FlowArrow />

          {blocks.map((block, index) => (
            <div key={block.title} className="contents">
              <div className={`rounded-xl border-2 px-3 py-4 text-center shadow-sm sm:w-[18%] ${block.className}`}>
                <p className="text-base font-black sm:text-lg">{block.title}</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-700 sm:text-sm">
                  {block.subtitle}
                </p>
              </div>
              {index < blocks.length - 1 ? <FlowArrow /> : null}
            </div>
          ))}

          <FlowArrow />

          <div className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-center shadow-sm sm:w-[11%]">
            <p className="text-sm font-black text-slate-950">Output</p>
            <p className="mt-1 font-mono text-sm font-bold text-slate-700">c(t)</p>
          </div>
        </div>

        <div className="hidden">
          <div className="hidden h-1 rounded-full bg-slate-800 sm:block" aria-hidden="true" />
          <div className="rounded-xl border-2 border-violet-300 bg-violet-50 px-4 py-3 text-center shadow-sm">
            <p className="text-sm font-black text-violet-900">Sensor / Measuring Element</p>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">Feedback path H(s)</p>
          </div>
          <div className="hidden h-1 rounded-full bg-slate-800 sm:block" aria-hidden="true" />
        </div>

        <p className="hidden">
          The output is measured by the sensor and fed back. It is subtracted from the reference
          input at the summing junction, so the controller receives the error signal.
        </p>
      </div>

      <figcaption className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
        <strong>Diagram explanation:</strong> The reference input <strong>r(t)</strong> enters the
        summing junction with a positive sign. The feedback signal from the sensor enters with a
        negative sign. Their difference forms the error signal <strong>e(t)</strong>, which is
        processed by the controller, actuator, and plant to produce the output <strong>c(t)</strong>.
        Because the output is fed back, the system can automatically correct deviations.
      </figcaption>
    </figure>
  );
}

function CorrectOpenLoopControlSystemDiagram() {
  return (
    <figure
      id="open-loop-control-system-diagram"
      className="mt-5 scroll-mt-32 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h4 className="text-center text-xl font-black tracking-tight text-[#0b2d67] sm:text-2xl">
        Open-Loop Control System Circuit Diagram
      </h4>
      <p className="mx-auto mt-2 max-w-3xl text-center text-sm leading-6 text-slate-700 sm:text-base">
        In an open-loop control system, the signal moves only in the forward direction. The output
        is not measured and there is no feedback path for automatic correction.
      </p>
      <div className="mt-5 overflow-x-auto rounded-2xl border-2 border-dashed border-blue-300 px-3 py-5">
        <svg viewBox="0 0 1060 250" role="img" aria-label="Open-loop control system block diagram" className="min-w-[880px]">
          <defs>
            <marker id="open-loop-arrow" markerHeight="10" markerWidth="10" orient="auto" refX="9" refY="3">
              <path d="M0,0 L9,3 L0,6 Z" fill="#111827" />
            </marker>
          </defs>
          <text x="45" y="92" textAnchor="middle" fontSize="20" fontWeight="700" fill="#111827">
            <tspan x="45" dy="0">Reference</tspan>
            <tspan x="45" dy="25">Input</tspan>
            <tspan x="45" dy="30" fontFamily="monospace">r(t)</tspan>
          </text>
          <line x1="90" y1="110" x2="165" y2="110" stroke="#111827" strokeWidth="3" markerEnd="url(#open-loop-arrow)" />
          <rect x="175" y="65" width="180" height="90" rx="3" fill="#e8f7e2" stroke="#111827" strokeWidth="2.5" />
          <text x="265" y="100" textAnchor="middle" fontSize="21" fontWeight="800" fill="#111827">Controller</text>
          <text x="265" y="126" textAnchor="middle" fontSize="18" fill="#111827">(Amplifier / Command)</text>
          <line x1="355" y1="110" x2="430" y2="110" stroke="#111827" strokeWidth="3" markerEnd="url(#open-loop-arrow)" />
          <rect x="440" y="70" width="180" height="80" rx="3" fill="#fff2bf" stroke="#111827" strokeWidth="2.5" />
          <text x="530" y="104" textAnchor="middle" fontSize="21" fontWeight="800" fill="#111827">Actuator /</text>
          <text x="530" y="130" textAnchor="middle" fontSize="21" fontWeight="800" fill="#111827">Driver</text>
          <line x1="620" y1="110" x2="695" y2="110" stroke="#111827" strokeWidth="3" markerEnd="url(#open-loop-arrow)" />
          <rect x="705" y="70" width="180" height="80" rx="3" fill="#dff3fb" stroke="#111827" strokeWidth="2.5" />
          <text x="795" y="104" textAnchor="middle" fontSize="21" fontWeight="800" fill="#111827">Plant / Process</text>
          <text x="795" y="130" textAnchor="middle" fontSize="18" fill="#111827">(System)</text>
          <line x1="885" y1="110" x2="965" y2="110" stroke="#111827" strokeWidth="3" markerEnd="url(#open-loop-arrow)" />
          <text x="1015" y="98" textAnchor="middle" fontSize="20" fontWeight="700" fill="#111827">
            <tspan x="1015" dy="0">Output</tspan>
            <tspan x="1015" dy="30" fontFamily="monospace">c(t)</tspan>
          </text>
          <rect x="420" y="188" width="220" height="42" rx="6" fill="#fff1f2" stroke="#fb7185" strokeWidth="2" strokeDasharray="8 6" />
          <text x="530" y="215" textAnchor="middle" fontSize="18" fontWeight="800" fill="#be123c">No feedback path</text>
        </svg>
      </div>
      <figcaption className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
        <strong>Diagram explanation:</strong> The reference input passes through the controller,
        actuator, and plant to produce the output. Since output is not fed back, an open-loop
        system cannot automatically correct error.
      </figcaption>
    </figure>
  );
}

function CorrectClosedLoopControlSystemDiagram() {
  return (
    <figure
      id="closed-loop-control-system-diagram"
      className="mt-5 scroll-mt-32 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h4 className="text-center text-xl font-black tracking-tight text-[#0b2d67] sm:text-2xl">
        Closed-Loop Control System Circuit / Block Diagram
      </h4>
      <p className="mx-auto mt-2 max-w-3xl text-center text-sm leading-6 text-slate-700 sm:text-base">
        In a closed-loop control system, output is measured, fed back, and compared with the
        reference input. The controller uses the error signal to reduce the deviation.
      </p>
      <div className="mt-5 overflow-x-auto rounded-2xl border-2 border-dashed border-blue-300 px-3 py-5">
        <svg viewBox="0 0 1180 360" role="img" aria-label="Closed-loop control system block diagram with feedback path" className="min-w-[980px]">
          <defs>
            <marker id="correct-closed-loop-arrow" markerHeight="10" markerWidth="10" orient="auto" refX="9" refY="3">
              <path d="M0,0 L9,3 L0,6 Z" fill="#111827" />
            </marker>
          </defs>
          <text x="48" y="70" textAnchor="middle" fontSize="21" fontWeight="700" fill="#111827">
            <tspan x="48" dy="0">Reference</tspan>
            <tspan x="48" dy="26">Input</tspan>
            <tspan x="48" dy="31" fontFamily="monospace">r(t)</tspan>
          </text>
          <line x1="95" y1="101" x2="150" y2="101" stroke="#111827" strokeWidth="3" markerEnd="url(#correct-closed-loop-arrow)" />
          <circle cx="182" cy="101" r="31" fill="#fff1f2" stroke="#111827" strokeWidth="3" />
          <text x="182" y="112" textAnchor="middle" fontSize="36" fontWeight="800" fill="#111827">{"\u03A3"}</text>
          <text x="145" y="64" textAnchor="middle" fontSize="24" fontWeight="800" fill="#111827">+</text>
          <text x="160" y="149" textAnchor="middle" fontSize="26" fontWeight="800" fill="#111827">-</text>
          <line x1="213" y1="101" x2="277" y2="101" stroke="#111827" strokeWidth="3" markerEnd="url(#correct-closed-loop-arrow)" />
          <text x="247" y="62" textAnchor="middle" fontSize="18" fontWeight="700" fill="#111827">
            <tspan x="247" dy="0">Error</tspan>
            <tspan x="247" dy="25" fontFamily="monospace">e(t)</tspan>
          </text>
          <rect x="288" y="61" width="165" height="80" rx="3" fill="#e8f7e2" stroke="#111827" strokeWidth="2.5" />
          <text x="370.5" y="95" textAnchor="middle" fontSize="21" fontWeight="800" fill="#111827">Controller</text>
          <text x="370.5" y="122" textAnchor="middle" fontSize="18" fill="#111827">(Compensator)</text>
          <line x1="453" y1="101" x2="537" y2="101" stroke="#111827" strokeWidth="3" markerEnd="url(#correct-closed-loop-arrow)" />
          <rect x="548" y="61" width="170" height="80" rx="3" fill="#fff2bf" stroke="#111827" strokeWidth="2.5" />
          <text x="633" y="95" textAnchor="middle" fontSize="21" fontWeight="800" fill="#111827">Actuator /</text>
          <text x="633" y="122" textAnchor="middle" fontSize="21" fontWeight="800" fill="#111827">Driver</text>
          <line x1="718" y1="101" x2="797" y2="101" stroke="#111827" strokeWidth="3" markerEnd="url(#correct-closed-loop-arrow)" />
          <rect x="808" y="61" width="170" height="80" rx="3" fill="#dff3fb" stroke="#111827" strokeWidth="2.5" />
          <text x="893" y="95" textAnchor="middle" fontSize="21" fontWeight="800" fill="#111827">Plant / Process</text>
          <text x="893" y="122" textAnchor="middle" fontSize="18" fill="#111827">(System)</text>
          <line x1="978" y1="101" x2="1093" y2="101" stroke="#111827" strokeWidth="3" markerEnd="url(#correct-closed-loop-arrow)" />
          <text x="1140" y="88" textAnchor="middle" fontSize="21" fontWeight="700" fill="#111827">
            <tspan x="1140" dy="0">Output</tspan>
            <tspan x="1140" dy="31" fontFamily="monospace">c(t)</tspan>
          </text>
          <path d="M1035 101 V220 H708" fill="none" stroke="#111827" strokeWidth="3" markerEnd="url(#correct-closed-loop-arrow)" />
          <rect x="468" y="188" width="240" height="66" rx="3" fill="#f1edff" stroke="#111827" strokeWidth="2.5" />
          <text x="588" y="214" textAnchor="middle" fontSize="18" fontWeight="800" fill="#111827">Sensor / Measuring</text>
          <text x="588" y="239" textAnchor="middle" fontSize="18" fontWeight="800" fill="#111827">Element (Feedback)</text>
          <path d="M468 220 H182 V134" fill="none" stroke="#111827" strokeWidth="3" markerEnd="url(#correct-closed-loop-arrow)" />
          <rect x="245" y="285" width="700" height="50" rx="8" fill="#f8fbff" stroke="#93c5fd" strokeWidth="2" strokeDasharray="7 5" />
          <text x="595" y="305" textAnchor="middle" fontSize="17" fill="#334155">
            <tspan x="595" dy="0">The output is measured by the sensor and fed back. It is compared with the reference input.</tspan>
            <tspan x="595" dy="23">The error e(t) = r(t) - c</tspan>
            <tspan baselineShift="sub" fontSize="12">m</tspan>
            <tspan>(t) is used by the controller to reduce the error.</tspan>
          </text>
        </svg>
      </div>
      <figcaption className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
        <strong>Diagram explanation:</strong> The reference input enters the summing junction with
        a positive sign. The measured feedback signal returns through the sensor with a negative
        sign. Their difference is the error signal, which drives the controller to correct the
        output.
      </figcaption>
    </figure>
  );
}

function BasicControlSystemRepresentation() {
  const explanationItems = [
    {
      label: "Input (Command Signal):",
      text: "The desired value or command provided to the system.",
      swatchClassName: "border-emerald-700 bg-emerald-50",
      labelClassName: "text-emerald-700",
    },
    {
      label: "Control System (Processing Unit):",
      text: "The combination of components and logic that processes the input and determines the appropriate action.",
      swatchClassName: "border-blue-800 bg-blue-50",
      labelClassName: "text-blue-800",
    },
    {
      label: "Output (System Response):",
      text: "The resulting response or controlled variable produced by the system.",
      swatchClassName: "border-amber-600 bg-amber-50",
      labelClassName: "text-amber-800",
    },
  ];

  return (
    <figure className="mx-auto my-6 w-full max-w-[900px] px-0 py-6">
      <h3 className="text-center text-2xl font-black tracking-tight text-[#0b2d67] sm:text-3xl">
        Basic Block Diagram of a Control System
      </h3>
      <p className="mx-auto mt-2 max-w-[620px] text-center text-sm font-medium leading-6 text-slate-950 sm:text-base">
        A control system operates on an input and produces the desired output according to the
        system objective.
      </p>

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-0">
        <div className="rounded-xl border-2 border-emerald-800 bg-emerald-50 px-4 py-4 text-center shadow-sm sm:w-[24%]">
          <p className="text-lg font-black text-emerald-800 sm:text-xl">INPUT</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-950">
            (Command Signal)
          </p>
        </div>

        <div className="flex items-center justify-center sm:w-[13%]" aria-hidden="true">
          <div className="h-6 w-1 bg-slate-950 sm:h-1 sm:w-full" />
          <div className="hidden h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-slate-950 sm:block" />
        </div>

        <div className="rounded-xl border-2 border-blue-800 bg-blue-50 px-4 py-4 text-center shadow-sm sm:w-[28%]">
          <p className="text-lg font-black text-blue-900 sm:text-xl">CONTROL SYSTEM</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-950">
            (Processing Unit)
          </p>
        </div>

        <div className="flex items-center justify-center sm:w-[13%]" aria-hidden="true">
          <div className="h-6 w-1 bg-slate-950 sm:h-1 sm:w-full" />
          <div className="hidden h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-slate-950 sm:block" />
        </div>

        <div className="rounded-xl border-2 border-amber-600 bg-amber-50 px-4 py-4 text-center shadow-sm sm:w-[24%]">
          <p className="text-lg font-black text-amber-800 sm:text-xl">OUTPUT</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-950">
            (System Response)
          </p>
        </div>
      </div>

      <figcaption className="mt-4 text-center text-sm italic leading-6 text-slate-950 sm:text-base">
        Figure 1: Basic Block Diagram of a Control System
      </figcaption>

      <h4 className="mt-5 text-lg font-black text-[#0b2d67] sm:text-xl">
        Elements of a Control System
      </h4>
      <div className="mt-3 grid gap-3">
        {explanationItems.map((item) => (
          <div key={item.label} className="grid gap-3 sm:grid-cols-[48px_1fr] sm:items-start">
            <span
              aria-hidden="true"
              className={`mx-auto mt-0.5 h-6 w-6 rounded border-2 sm:mx-0 ${item.swatchClassName}`}
            />
            <p className="text-sm leading-6 text-slate-950 sm:text-base">
              <span className={`font-black ${item.labelClassName}`}>{item.label}</span>{" "}
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-slate-300 pt-3">
        <h4 className="text-lg font-black text-[#0b2d67] sm:text-xl">
          Real-Life Examples of Control Systems
        </h4>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-950 sm:text-base">
          <li>
            <strong>Air conditioner:</strong> Desired temperature (24&deg;C) &rarr; air conditioner
            control system &rarr; room temperature.
          </li>
          <li>
            <strong>Room heater:</strong> Set temperature &rarr; heater control action &rarr;
            maintained room warmth.
          </li>
          <li>
            <strong>Vehicle cruise control:</strong> Set speed &rarr; speed controller &rarr;
            constant vehicle speed.
          </li>
        </ul>

        <h4 className="mt-5 text-lg font-black text-[#0b2d67] sm:text-xl">
          Applications of Control Systems
        </h4>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-950 sm:text-base">
          <li>Industrial automation and process control.</li>
          <li>Robotics, CNC machines, and servo positioning systems.</li>
          <li>Automobiles, power systems, communication systems, and consumer electronics.</li>
        </ul>
      </div>
    </figure>
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
  { id: "introduction", label: "Definition" },
  { id: "prerequisites", label: "Prerequisites" },
  { id: "intuition", label: "Intuition" },
  { id: "theory", label: "Core Theory" },
  { id: "working", label: "Working" },
  { id: "formulas", label: "Formulas" },
  { id: "diagram", label: "Diagrams" },
  { id: "applications", label: "Applications" },
  { id: "examples", label: "Examples" },
  { id: "common-mistakes", label: "Mistakes" },
  { id: "interview", label: "Interview" },
  { id: "exam-notes", label: "Quick Notes" },
  { id: "revision", label: "Revision" },
  { id: "faq", label: "FAQ" },
  { id: "related-topics", label: "Related" },
  { id: "practice", label: "Practice" },
];

const conceptLinks = [
  {
    id: "introduction",
    label: "Control System Definition",
    keywords: "control system definition, what is control system, automatic control system",
    description:
      "Meaning of a control system with examples, need for control systems, disturbances, accuracy, automation, and reliability.",
  },
  {
    id: "prerequisites",
    label: "Control Systems Prerequisites",
    keywords: "control systems prerequisites, Laplace transform for control systems, input output basics",
    description:
      "Basic input-output idea, Laplace Transform, circuit variables, mechanical variables, algebra, and block diagrams required before studying Control Systems.",
  },
  {
    id: "intuition",
    label: "Feedback Control Intuition",
    keywords: "feedback control intuition, open loop vs closed loop example, error correction",
    description:
      "Simple driving example that explains open-loop control, closed-loop control, feedback, and error correction.",
  },
  {
    id: "theory",
    label: "Open-Loop and Closed-Loop Control Systems",
    keywords: "open loop control system, closed loop control system, feedback control system, error signal",
    description:
      "Core theory of open-loop and closed-loop systems, characteristics, advantages, disadvantages, working principle, and examples.",
  },
  {
    id: "open-loop-control-system",
    label: "Open-Loop Control System",
    keywords: "open loop control system, open-loop control system definition, open loop control examples",
    description:
      "Definition, working, mathematical representation, characteristics, advantages, disadvantages, and examples of open-loop control systems.",
  },
  {
    id: "open-loop-control-system-diagram",
    label: "Open-Loop Control System Diagram",
    keywords: "open loop control system diagram, open loop block diagram, no feedback path diagram",
    description:
      "Open-loop control system circuit and block diagram showing reference input, controller, actuator, plant, output, and no feedback path.",
  },
  {
    id: "closed-loop-control-system",
    label: "Closed-Loop Control System",
    keywords: "closed loop control system, feedback control system, closed-loop control system definition",
    description:
      "Definition, working principle, error signal, characteristics, advantages, disadvantages, and examples of closed-loop control systems.",
  },
  {
    id: "closed-loop-control-system-diagram",
    label: "Closed-Loop Control System Diagram",
    keywords: "closed loop control system diagram, feedback control block diagram, closed loop block diagram",
    description:
      "Closed-loop control system circuit and block diagram showing summing junction, error signal, controller, actuator, plant, output, sensor, and feedback path.",
  },
  {
    id: "working",
    label: "Working Principle of Feedback Control",
    keywords: "working principle of control system, reference input, sensor feedback, controller error correction",
    description:
      "Step-by-step working principle: set reference, measure output, compare output, generate error, and correct the plant input.",
  },
  {
    id: "formulas",
    label: "Control System Formulas",
    keywords: "control system formulas, error signal formula, closed loop transfer function, loop gain",
    description:
      "Important formulas including error signal, closed-loop transfer function, open-loop transfer function, and loop gain.",
  },
  {
    id: "diagram",
    label: "Control System Block Diagram",
    keywords: "control system block diagram, closed loop block diagram, feedback path diagram",
    description:
      "Diagram explanation for reference input, summing junction, error signal, controller, plant, output, sensor, and feedback path.",
  },
  {
    id: "applications",
    label: "Applications of Control Systems",
    keywords: "applications of control systems, automatic voltage regulator, motor speed control, cruise control",
    description:
      "Real-world control system applications in temperature control, motor drives, AVR, cruise control, servo systems, process control, and aerospace.",
  },
  {
    id: "examples",
    label: "Solved Examples in Control Systems",
    keywords: "control systems solved examples, error signal example, open loop example, closed loop transfer function example",
    description:
      "Solved examples for identifying control type, calculating error signal, and finding closed-loop transfer function.",
  },
  {
    id: "common-mistakes",
    label: "Common Mistakes in Control Systems",
    keywords: "control systems common mistakes, feedback control mistakes, closed loop stability mistakes",
    description:
      "Mistakes such as assuming every automatic system is closed-loop, ignoring sensor block H(s), and misusing feedback formulas.",
  },
  {
    id: "interview",
    label: "Control Systems Interview Questions",
    keywords: "control systems interview questions, open loop closed loop questions, feedback control interview",
    description:
      "Interview questions on control system definition, feedback, open-loop vs closed-loop control, error signal, and system classification.",
  },
  {
    id: "exam-notes",
    label: "Control Systems Exam Quick Notes",
    keywords: "control systems quick notes, GATE ECE control systems notes, PSU control systems revision",
    description:
      "Fast revision notes for GATE ECE, PSU, and university exams covering open-loop, closed-loop, feedback, and transfer function.",
  },
  {
    id: "revision",
    label: "Control Systems Revision Summary",
    keywords: "control systems revision, control systems summary, feedback control revision",
    description:
      "Final summary of control systems, open-loop systems, closed-loop systems, feedback, and examples.",
  },
  {
    id: "faq",
    label: "Introduction to Control Systems FAQ",
    keywords: "introduction to control systems FAQ, GATE ECE control systems questions",
    description:
      "Frequently asked questions about control system basics, GATE ECE preparation, open-loop control, and closed-loop control.",
  },
  {
    id: "practice",
    label: "Control Systems Practice Questions",
    keywords: "control systems practice questions, control systems MCQ, GATE ECE control systems practice",
    description:
      "Conceptual questions, numerical practice, and MCQs for Introduction to Control Systems.",
  },
];

const introSubtopics = [
  { label: "Control system definition", targetId: "introduction" },
  { label: "Open-loop control system", targetId: "open-loop-control-system" },
  { label: "Open-loop diagram", targetId: "open-loop-control-system-diagram" },
  { label: "Closed-loop control system", targetId: "closed-loop-control-system" },
  { label: "Closed-loop diagram", targetId: "closed-loop-control-system-diagram" },
  { label: "Feedback and error signal", targetId: "working" },
  { label: "Closed-loop transfer function", targetId: "formulas" },
  { label: "Real-world applications", targetId: "applications" },
];

const faqItems = [
  {
    question: "Why is Introduction to Control Systems important for GATE ECE and PSU exams?",
    answer:
      "Introduction to Control Systems builds the base for control system definition, feedback, error signal, open-loop control, closed-loop control, transfer function, and stability questions asked in GATE ECE, PSU exams, and university papers.",
  },
  {
    question: "What is the difference between open-loop and closed-loop control systems?",
    answer:
      "An open-loop control system does not measure output for correction, while a closed-loop control system uses feedback to compare the actual output with the reference input and reduce the error signal.",
  },
  {
    question: "How should I revise control system basics for exams?",
    answer:
      "Revise the control system definition, input-output idea, feedback control system, error signal, open-loop and closed-loop examples, automatic voltage regulator, and the negative-feedback transfer function.",
  },
];

const pageTitle = "Introduction to Control Systems";
const pagePath = "/introduction-to-control-systems";
const pageUrl = generateCanonical(pagePath);
const pageDescription =
  "Learn Introduction to Control Systems for ECE with control system definition, feedback control, open-loop and closed-loop systems, examples, applications, and GATE ECE revision notes.";
const pageDate = "2026-06-09";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: pageTitle,
    description: pageDescription,
    datePublished: pageDate,
    dateModified: pageDate,
    educationalLevel: "Undergraduate engineering",
    mainEntityOfPage: pageUrl,
    about: [
      "Control Systems",
      "Control system definition",
      "Open-loop control system",
      "Closed-loop control system",
      "Feedback control",
      "GATE ECE Control Systems",
      "Automatic control system",
    ],
    hasPart: conceptLinks.map((concept) => ({
      "@type": "CreativeWork",
      name: concept.label,
      url: `${pageUrl}#${concept.id}`,
      description: concept.description,
      keywords: concept.keywords,
    })),
    keywords:
      conceptLinks.map((concept) => concept.keywords).join(", "),
  },
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: pageTitle,
    description: pageDescription,
    learningResourceType: "Theory Quick Notes",
    educationalLevel: "Undergraduate engineering",
    teaches: [
      "Introduction to Control Systems",
      "Control system definition",
      "Open-loop control",
      "Closed-loop control",
      "Feedback control system",
      "Error signal",
      "System types",
      "Automatic voltage regulator",
      "GATE ECE revision",
      ...conceptLinks.map((concept) => concept.label),
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Introduction to Control Systems concept links",
    itemListElement: conceptLinks.map((concept, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: concept.label,
      description: concept.description,
      url: `${pageUrl}#${concept.id}`,
    })),
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

export default function IntroductionToControlSystemsPage() {
  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
      keywords={`Introduction to Control Systems, control system notes, automatic control system, ECE control systems notes, PSU ECE control systems, ${conceptLinks.map((concept) => concept.keywords).join(", ")}`}
      canonicalUrl={pagePath}
      structuredData={structuredData}
      appendSiteName={false}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1440px] pb-20">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-col gap-3 pt-1 sm:flex-row sm:items-start sm:justify-between"
        >
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Notes</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/control-systems" className="font-medium text-slate-600 transition hover:text-portal-700">Control Systems</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="font-semibold text-portal-700">Introduction to Control Systems</span></li>
          </ol>
          <ControlSystemSubtopicMenu
            title="Introduction"
            subtopics={introSubtopics}
          />
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Control Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{pageTitle}</h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Updated <time dateTime={pageDate}>9 Jun 2026</time>
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Study the control system definition, need for control systems, feedback control, open-loop and closed-loop control systems, real-world examples, and GATE ECE revision points in one exam-focused note.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Core concept</p>
              <p className="mt-1 leading-6">Control system definition, input, output, error signal, and feedback.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Exam focus</p>
              <p className="mt-1 leading-6">Open-loop, closed-loop, feedback control, examples, and classification.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Engineering use</p>
              <p className="mt-1 leading-6">AVR, motor speed control, robotics, process control, and automation.</p>
            </div>
          </div>
        </header>

        <nav aria-label="Introduction to Control Systems topic sections" className="sticky top-20 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
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

        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-xl font-black tracking-tight text-slate-950">
            Control Systems Concept Index
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            Use these concept links to jump directly to searchable subtopics inside this Introduction to Control Systems note.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {conceptLinks.map((concept) => (
              <a
                key={concept.id}
                href={`#${concept.id}`}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-portal-200 hover:bg-portal-50"
              >
                <h3 className="text-sm font-black text-slate-950">{concept.label}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">{concept.description}</p>
              </a>
            ))}
          </div>
        </section>

        <article className="mt-5 grid gap-5">
          <TopicSection id="introduction" title="What is a Control System?">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              A <strong>control system</strong> is an arrangement of components that monitors, regulates, and directs a device or process so that the output follows the desired value. In simple terms, it compares what we want with what the system is doing and applies corrective action whenever required.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Imagine an air conditioner maintaining a room at 24&deg;C, a car automatically maintaining a set speed on a highway, or an autopilot guiding an aircraft along a predefined path. In all these examples, the system continuously observes the output, responds to disturbances, and tries to achieve the desired result. This is the basic idea behind an automatic control system.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Control Systems is a core ECE subject for GATE, PSU, university exams, and interviews because it explains open-loop control systems, closed-loop control systems, feedback, error signal, stability, transfer function, and controller design. The same ideas are used in industrial automation, robotics, aerospace systems, power systems, communication networks, automotive electronics, and consumer appliances.
            </p>

            <hr className="my-6 border-slate-200" />

            <h3 className="text-lg font-bold text-slate-950">
              Why Do We Need Control Systems?
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Engineering systems are constantly affected by disturbances, uncertainties, load changes, noise, and changing operating conditions. Without proper control, a system may become inaccurate, inefficient, unstable, or unsafe.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Control systems help engineers to:
            </p>
            <ul className="mt-3 list-disc pl-6 text-sm leading-7 text-slate-700 sm:text-base">
              <li>Maintain desired performance.</li>
              <li>Improve accuracy and precision.</li>
              <li>Reduce the effect of disturbances.</li>
              <li>Enhance system stability.</li>
              <li>Enable automation.</li>
              <li>Increase reliability and efficiency.</li>
            </ul>
          </TopicSection>

          <TopicSection id="prerequisites" title="Prerequisites">
            <BulletList items={["Basic idea of input and output.", "Laplace Transform basics.", "Electrical circuit variables such as voltage and current.", "Mechanical variables such as force, velocity, displacement, and torque.", "Comfort with simple algebra and block diagrams."]} />
          </TopicSection>

          <TopicSection id="intuition" title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Think of driving a vehicle. If you press the accelerator for a fixed time without checking speed, that is like open-loop control. If you continuously watch the speedometer and adjust the accelerator, that is closed-loop control.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Feedback is the act of looking at the result and using that result to correct future action. This one idea makes automatic control possible.
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              A control system is not just a circuit or machine. It is a decision loop that tries to reduce error.
            </blockquote>
            <div className="diagram-placeholder mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              Open-Loop and Closed-Loop Control Diagram Here
            </div>
            <div className="animation-placeholder mt-3 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Feedback Error Correction Visualization
            </div>
          </TopicSection>

          <TopicSection id="theory" title="Core Theory">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Standard control-system model</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              In control-system analysis, the desired value is represented as the <strong>reference input</strong> r(t), the actual response is the <strong>output</strong> c(t), and the physical system being controlled is called the <strong>plant</strong> or <strong>process</strong>. The controller decides the control action so that c(t) follows r(t) as closely as possible.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              If the output is not measured, the system is called open-loop. If the output is measured and compared with the reference input, the system is called closed-loop or feedback control.
            </p>

            <h3 id="open-loop-control-system" className="scroll-mt-32 mt-4 text-lg font-bold text-slate-950">
              Open-loop control system
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              An <strong>open-loop control system</strong> is a system in which the control action is independent of the output. The controller does not monitor whether the desired output has actually been achieved.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The system acts only on the basis of the input command. It does not automatically correct errors caused by disturbances, load changes, parameter variations, or changes in operating conditions.
            </p>
            <CorrectOpenLoopControlSystemDiagram />
            <h4 className="mt-4 text-base font-bold text-slate-950">Block explanation</h4>
            <ul className="mt-3 list-disc pl-6 text-sm leading-7 text-slate-700 sm:text-base">
              <li>
                <strong>Reference input r(t):</strong> The desired command given to the system,
                such as required temperature, speed, position, or voltage.
              </li>
              <li>
                <strong>Controller:</strong> Processes the input command and decides the control
                action. In simple open-loop systems, it may be a timer, amplifier, preset logic,
                or command circuit.
              </li>
              <li>
                <strong>Actuator or driver:</strong> Converts the controller signal into physical
                action, such as motor rotation, heating, valve movement, or switching.
              </li>
              <li>
                <strong>Plant or process:</strong> The actual system being controlled, for example
                a motor, heater, conveyor, traffic signal, or washing machine.
              </li>
              <li>
                <strong>Output c(t):</strong> The final response of the system. In open-loop
                control, this output is not sent back for comparison with the input.
              </li>
            </ul>
            <h4 className="mt-4 text-base font-bold text-slate-950">Mathematical representation</h4>
            <FormulaBox>{"Output = Plant response to applied input"}</FormulaBox>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Characteristics">
                <BulletList items={["No feedback path.", "Simple design and easy implementation.", "Lower cost.", "Less accurate than closed-loop control.", "Cannot automatically correct errors."]} />
              </MiniCard>
              <MiniCard title="Advantages">
                <BulletList items={["Simple construction.", "Economical for low-accuracy tasks.", "Fast response because no feedback comparison is required.", "Easy maintenance."]} />
              </MiniCard>
              <MiniCard title="Disadvantages">
                <BulletList bulletClassName="bg-rose-500" items={["Low accuracy.", "Sensitive to disturbances.", "Cannot compensate for parameter variations.", "Requires manual correction when output changes."]} />
              </MiniCard>
            </div>
            <h4 className="mt-4 text-base font-bold text-slate-950">Real-life examples of open-loop systems</h4>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <MiniCard title="Electric toaster">
                <p className="mt-2 text-sm leading-6 text-slate-700">Heats bread for a preset duration without checking the actual toast condition.</p>
              </MiniCard>
              <MiniCard title="Washing machine timer">
                <p className="mt-2 text-sm leading-6 text-slate-700">Runs for a fixed period without measuring cleanliness during the cycle.</p>
              </MiniCard>
              <MiniCard title="Traffic signal controller">
                <p className="mt-2 text-sm leading-6 text-slate-700">Traditional timer-based signals operate according to fixed timing schedules.</p>
              </MiniCard>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Engineering view: open-loop systems are suitable when disturbances are minimal, accuracy is not critical, and low cost or simplicity is more important than automatic correction.
            </p>

            <h3 id="closed-loop-control-system" className="scroll-mt-32 mt-4 text-lg font-bold text-slate-950">
              Closed-loop control system
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              A <strong>closed-loop control system</strong> continuously measures the output and compares it with the desired reference input. The difference between them is called the <strong>error signal</strong>.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The controller uses this error signal to modify the control action and reduce the deviation from the desired output. This feedback action makes closed-loop systems more accurate and better at handling disturbances.
            </p>
            <CorrectClosedLoopControlSystemDiagram />
            <h4 className="mt-4 text-base font-bold text-slate-950">Closed-loop block explanation</h4>
            <ul className="mt-3 list-disc pl-6 text-sm leading-7 text-slate-700 sm:text-base">
              <li>
                <strong>Reference input r(t):</strong> The desired output value, such as required
                speed, temperature, position, or voltage.
              </li>
              <li>
                <strong>Summing junction:</strong> Compares the reference input with the feedback
                signal and produces the error signal.
              </li>
              <li>
                <strong>Error signal e(t):</strong> The difference between desired output and
                measured output. This tells the controller how much correction is needed.
              </li>
              <li>
                <strong>Controller or compensator:</strong> Processes the error signal and decides
                the corrective control action.
              </li>
              <li>
                <strong>Actuator or driver:</strong> Converts the controller output into physical
                action for the plant.
              </li>
              <li>
                <strong>Plant or process:</strong> The system whose output is being controlled.
              </li>
              <li>
                <strong>Sensor or measuring element:</strong> Measures the output and sends the
                feedback signal back to the summing junction.
              </li>
            </ul>
            <h4 className="mt-4 text-base font-bold text-slate-950">Error signal</h4>
            <FormulaBox>{"e(t) = r(t) - c(t)"}</FormulaBox>
            <ul className="mt-3 list-disc pl-6 text-sm leading-7 text-slate-700 sm:text-base">
              <li><strong>r(t):</strong> Reference input or desired value.</li>
              <li><strong>c(t):</strong> Actual output or controlled output.</li>
              <li><strong>e(t):</strong> Error signal used for correction.</li>
            </ul>
            <h4 className="mt-4 text-base font-bold text-slate-950">Working principle</h4>
            <ol className="mt-3 list-decimal pl-6 text-sm leading-7 text-slate-700 sm:text-base">
              <li>Desired input is applied.</li>
              <li>Output is measured using a sensor or feedback element.</li>
              <li>Actual output is compared with the reference input.</li>
              <li>Error signal is generated.</li>
              <li>Controller acts to reduce the error.</li>
              <li>Output approaches the desired value.</li>
            </ol>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Characteristics">
                <BulletList items={["Uses feedback.", "Higher accuracy.", "Automatic error correction.", "Better disturbance rejection.", "More complex design."]} />
              </MiniCard>
              <MiniCard title="Advantages">
                <BulletList items={["High accuracy.", "Reduced steady-state error.", "Better stability control when properly designed.", "Improved disturbance handling.", "Self-correcting operation."]} />
              </MiniCard>
              <MiniCard title="Disadvantages">
                <BulletList bulletClassName="bg-rose-500" items={["Higher cost.", "Increased complexity.", "Requires sensors or feedback elements.", "May become unstable if improperly designed."]} />
              </MiniCard>
            </div>
            <h4 className="mt-4 text-base font-bold text-slate-950">Real-life examples of closed-loop systems</h4>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <MiniCard title="Air conditioner">
                <p className="mt-2 text-sm leading-6 text-slate-700">The thermostat continuously measures room temperature and adjusts cooling.</p>
              </MiniCard>
              <MiniCard title="Automatic voltage regulator (AVR)">
                <p className="mt-2 text-sm leading-6 text-slate-700">The output voltage is continuously monitored and corrected.</p>
              </MiniCard>
              <MiniCard title="Cruise control system">
                <p className="mt-2 text-sm leading-6 text-slate-700">Vehicle speed is measured and maintained automatically.</p>
              </MiniCard>
              <MiniCard title="Aircraft autopilot">
                <p className="mt-2 text-sm leading-6 text-slate-700">Flight parameters are continuously monitored and corrected.</p>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="working" title="Working Principle">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The working principle of feedback control is comparison and correction. The reference says what we want. The sensor reports what we have. The controller acts on the error.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Step 1: Set reference">
                <p className="mt-2 text-sm leading-6 text-slate-700">The desired value is selected, such as target speed, voltage, position, or temperature.</p>
              </MiniCard>
              <MiniCard title="Step 2: Measure output">
                <p className="mt-2 text-sm leading-6 text-slate-700">A sensor measures the actual output and sends it back for comparison.</p>
              </MiniCard>
              <MiniCard title="Step 3: Correct error">
                <p className="mt-2 text-sm leading-6 text-slate-700">The controller changes the input to the plant so the output moves closer to the reference.</p>
              </MiniCard>
            </div>
            <div className="animation-placeholder mt-4 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Reference, Error, Controller, Plant, and Feedback Loop
            </div>
          </TopicSection>

          <TopicSection id="formulas" title="Formula Explanation">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Error signal">
                <FormulaBox>{"$$e(t)=r(t)-c(t)$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">Error is the gap between desired output and actual output.</p>
              </MiniCard>
              <MiniCard title="Closed-loop transfer function">
                <FormulaBox>{"$$T(s)=\\frac{G(s)}{1+G(s)H(s)}$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">For negative feedback, loop gain appears in the denominator and shapes accuracy and stability.</p>
              </MiniCard>
              <MiniCard title="Open-loop transfer function">
                <FormulaBox>{"$$G(s)=\\frac{C(s)}{R(s)}$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">This describes output-input relation when feedback is not used.</p>
              </MiniCard>
              <MiniCard title="Loop gain">
                <FormulaBox>{"$$L(s)=G(s)H(s)$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">Loop gain tells how strongly the feedback path influences the correction process.</p>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="diagram" title="Control System Block Diagram Explanation">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The diagram should show reference input, summing junction, error signal, controller, plant, output, sensor, and feedback path. The most important visual idea is that output information returns to the input side.
            </p>
            <div className="diagram-placeholder mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              Closed-Loop Feedback Block Diagram Here
            </div>
            <div className="animation-placeholder mt-3 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Closed-Loop Signal Flow Visualization
            </div>
          </TopicSection>

          <TopicSection id="applications" title="Real-World Applications">
            <BulletList items={["Temperature control in ovens, rooms, and industrial furnaces.", "Motor speed control in electric drives and robotics.", "Automatic voltage regulator in power systems.", "Cruise control in vehicles.", "Position control in antennas, CNC machines, and servo systems.", "Process control in chemical plants and manufacturing lines.", "Flight control and stabilization in aerospace systems."]} />
          </TopicSection>

          <TopicSection id="examples" title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 1: Identify control type</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">A toaster heats bread for a fixed time without sensing bread color.</p>
            <FormulaBox>{"$$No\\ output\\ measurement\\quad \\Rightarrow\\quad Open\\ loop$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">The control action is independent of the final output.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 2: Error signal</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">A motor speed reference is 1500 rpm and actual speed is 1450 rpm.</p>
            <FormulaBox>{"$$e=1500-1450=50\\ rpm$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">The controller should act to reduce the 50 rpm error.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 3: Closed-loop transfer function</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">For unity feedback with forward path $$G(s)=10/(s+2)$$:</p>
            <FormulaBox>{"$$T(s)=\\frac{G(s)}{1+G(s)}=\\frac{10}{s+12}$$"}</FormulaBox>
          </TopicSection>

          <TopicSection id="common-mistakes" title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Assuming every automatic system is closed-loop.", "Forgetting that feedback requires output measurement.", "Confusing disturbance rejection with input tracking.", "Using positive feedback formula for negative feedback problems.", "Ignoring sensor block H(s) in non-unity feedback.", "Thinking closed-loop systems are always stable; feedback can improve or ruin stability depending on design."]} />
          </TopicSection>

          <TopicSection id="interview" title="Interview Questions">
            <BulletList items={["What is a control system?", "What is the difference between open-loop and closed-loop control?", "Why is feedback used?", "Give examples of temperature control, speed control, and AVR.", "What are the advantages and disadvantages of closed-loop systems?", "What is error signal in a feedback system?", "Classify control systems as linear/nonlinear and continuous/discrete with examples."]} />
          </TopicSection>

          <TopicSection id="exam-notes" title="Exam Quick Notes">
            <BulletList items={["Open-loop systems are simple but cannot automatically correct error.", "Closed-loop systems use feedback and can reject disturbances better.", "Negative feedback generally improves accuracy and robustness.", "Closed-loop transfer function for negative feedback is $$G(s)/(1+G(s)H(s))$$.", "Always check whether feedback is unity or non-unity.", "System classification questions are usually quick scoring in GATE/PSU exams."]} />
          </TopicSection>

          <TopicSection id="revision" title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["Control Systems regulate output behavior.", "Open-loop systems do not measure output.", "Closed-loop systems compare output with reference input.", "Feedback creates an error signal and enables correction.", "Closed-loop systems improve accuracy but require careful stability design.", "Examples include temperature control, motor speed control, and automatic voltage regulator."]} />
          </TopicSection>

          <TopicSection id="faq" title="Introduction to Control Systems FAQ">
            <div className="mt-4 grid gap-3">
              {faqItems.map((item) => (
                <MiniCard key={item.question} title={item.question}>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
                </MiniCard>
              ))}
            </div>
          </TopicSection>

          <TopicSection id="related-topics" title="Related Control Systems Topics">
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {controlSystemTopicPages.slice(0, 4).map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/${topic.slug}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-portal-200 hover:bg-portal-50 hover:text-portal-700"
                >
                  {topic.title}
                </Link>
              ))}
            </div>
          </TopicSection>

          <TopicSection id="practice" title="Practice Questions">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Conceptual</h3>
            <BulletList items={["Explain feedback using a daily-life example.", "Why is a washing machine often treated as open-loop in basic control examples?", "Why can feedback improve disturbance rejection?", "Give one example each of linear, nonlinear, continuous, and discrete control systems."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Numerical</h3>
            <BulletList items={["Find error if reference is 10 V and actual output is 8.5 V.", "For $$G(s)=5/(s+1)$$ and unity feedback, find $$T(s)$$.", "For $$G(s)=4$$ and $$H(s)=0.5$$, find the closed-loop gain.", "If actual motor speed exceeds reference speed, determine the sign of error using $$e=r-c$$."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">MCQs</h3>
            <BulletList items={["A system using output measurement is generally: closed-loop / open-loop / uncontrolled / memoryless.", "The error signal is: reference minus output / output plus input / only disturbance / only noise.", "An automatic voltage regulator is an example of: feedback control / pure open-loop control / no-control system / random system."]} />
          </TopicSection>
        </article>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/subjects/control-systems" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Back to Control Systems
          </Link>
          <Link href="/mathematical-modeling-of-systems" className="next-topic-btn inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            Next Mathematical Modeling of Systems
          </Link>
        </div>
      </div>
    </Layout>
  );
}
