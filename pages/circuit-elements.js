import Link from "next/link";
import Layout from "../components/layout";

const circuitElementSections = [
  {
    title: "Resistor",
    intro:
      "A resistor opposes current flow and converts part of the electrical energy into heat.",
    breakdown: [
      "It controls how much current can pass through a branch.",
      "It is used for current limiting, voltage division, biasing, and protection.",
      "A larger resistance makes the current flow weaker for the same voltage.",
    ],
    formula: "V = IR",
    formulaMeaning: [
      "V is the voltage across the resistor.",
      "I is the current through it.",
      "R is the resistance value.",
    ],
    keyIdea: "A resistor controls current by using up energy as heat.",
    animation:
      "Show current flowing through the resistor while a voltage drop appears across it and a soft heat glow shows power dissipation.",
  },
  {
    title: "Capacitor",
    intro:
      "A capacitor stores energy between two plates and does not like sudden voltage changes.",
    breakdown: [
      "It stores charge when voltage is applied.",
      "It is used in filters, timing circuits, coupling, and power supply smoothing.",
      "In DC, it charges first and then behaves almost like an open path.",
    ],
    formula: "Q = CV",
    formulaMeaning: [
      "Q is the charge stored on the plates.",
      "C is the capacitance.",
      "V is the voltage across the capacitor.",
    ],
    keyIdea: "A capacitor stores voltage energy and resists sudden voltage changes.",
    animation:
      "Show charge accumulating on opposite plates while current fades after charging and the electric field glow builds between the plates.",
  },
  {
    title: "Inductor",
    intro:
      "An inductor stores energy in a magnetic field and does not like sudden current changes.",
    breakdown: [
      "It reacts when current tries to change quickly.",
      "It is used in filters, converters, motors, relays, and energy storage circuits.",
      "When current rises, it pushes back. When current falls, it releases stored energy.",
    ],
    formula: "V = L(di/dt)",
    formulaMeaning: [
      "V is the voltage across the inductor.",
      "L is the inductance.",
      "di/dt tells how quickly current is changing.",
    ],
    keyIdea: "An inductor stores current energy and resists sudden current changes.",
    animation:
      "Show current moving through a coil while magnetic field rings grow around it.",
  },
  {
    title: "Independent Voltage Source",
    intro:
      "A voltage source gives the circuit a fixed electrical push between two points.",
    breakdown: [
      "It sets the voltage level that drives charge through the circuit.",
      "It is used as a battery, supply rail, or input signal source.",
      "It tries to maintain its voltage even when the connected load changes.",
    ],
    formula: "V = constant",
    formulaMeaning: ["The source tries to keep the same voltage across its terminals."],
    keyIdea: "A voltage source maintains a set voltage and pushes charge through the path.",
    animation:
      "Show a battery creating a pressure-like push that sends current dots around the loop.",
  },
  {
    title: "Independent Current Source",
    intro:
      "A current source tries to keep the same amount of current flowing through a branch.",
    breakdown: [
      "It focuses on steady current instead of fixed voltage.",
      "It is used in biasing, transistor circuits, current mirrors, and circuit testing.",
      "The voltage may adjust, but the current tries to stay fixed within practical limits.",
    ],
    formula: "I = constant",
    formulaMeaning: ["The source tries to keep the branch current at a fixed value."],
    keyIdea: "A current source keeps current flow steady.",
    animation:
      "Show equally spaced current dots moving at a constant speed through one branch.",
  },
  {
    title: "Dependent Source",
    intro:
      "A dependent source is controlled by another voltage or current somewhere in the circuit.",
    breakdown: [
      "It connects one part of the circuit to another part.",
      "It is useful for modeling transistors, amplifiers, and controlled devices.",
      "A small input can control a larger output, which is the basic idea behind amplification.",
    ],
    formula: "Vout = A Vin",
    formulaMeaning: [
      "Vout is the output voltage.",
      "Vin is the controlling input voltage.",
      "A is the gain.",
    ],
    keyIdea: "A dependent source lets one circuit quantity control another.",
    animation:
      "Show a small input signal controlling a brighter and larger output path.",
  },
  {
    title: "Source Transformation",
    intro:
      "Source transformation changes the shape of a source circuit without changing what the load sees.",
    breakdown: [
      "A voltage source with series resistance can become a current source with parallel resistance.",
      "It is used to simplify circuits before solving.",
      "The outside terminals behave the same, even though the inside drawing looks different.",
    ],
    formula: "I = V / R",
    formulaMeaning: [
      "I is the equivalent current source value.",
      "V is the original voltage source value.",
      "R is the same resistance used in the transformation.",
    ],
    keyIdea: "Source transformation changes circuit form while keeping terminal behavior the same.",
    animation:
      "Show a voltage source and series resistor morphing into a current source and parallel resistor.",
  },
];

function ElementCard({ section, index }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-portal-600 text-sm font-black text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">{section.title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            {section.intro}
          </p>

          <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.88fr)]">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Professional Explanation
              </h3>
              <ul className="mt-2 grid gap-2 text-sm leading-6 text-slate-700">
                {section.breakdown.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-xl border border-portal-100 bg-portal-50/60 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-portal-700">
                  Formula
                </p>
                <p className="mt-2 rounded-lg bg-white px-3 py-2 font-mono text-base font-bold text-slate-950">
                  {section.formula}
                </p>
                <ul className="mt-3 grid gap-1.5 text-xs font-medium leading-5 text-slate-700">
                  {section.formulaMeaning.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>

            <CircuitElementMotionDiagram title={section.title} />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                Key Idea
              </p>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-emerald-950">
                {section.keyIdea}
              </p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
                How To Visualize
              </p>
              <p className="mt-1.5 text-sm font-medium leading-6 text-slate-700">{section.animation}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CircuitElementMotionDiagram({ title }) {
  const isResistor = title === "Resistor";
  const isCapacitor = title === "Capacitor";
  const isInductor = title === "Inductor";
  const isVoltageSource = title === "Independent Voltage Source";
  const isCurrentSource = title === "Independent Current Source";
  const isDependentSource = title === "Dependent Source";
  const isTransformation = title === "Source Transformation";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
      <style>{`
        .ce-wire {
          fill: none;
          stroke: #111827;
          stroke-width: 5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ce-charge {
          filter: url(#ceGlow);
        }

        .ce-resistor-glow {
          animation: cePulse 1.6s ease-in-out infinite;
        }

        .ce-cap-plate {
          animation: cePlateCharge 2.6s ease-in-out infinite;
        }

        .ce-field {
          animation: ceField 2.6s ease-in-out infinite;
        }

        .ce-magnetic-ring-one {
          animation: ceRingOne 2.6s ease-in-out infinite;
        }

        .ce-magnetic-ring-two {
          animation: ceRingTwo 2.6s ease-in-out infinite;
        }

        .ce-source-push {
          animation: cePush 2s ease-in-out infinite;
        }

        .ce-control-signal {
          stroke-dasharray: 9 9;
          animation: ceDash 1.2s linear infinite;
        }

        .ce-transform-left {
          animation: ceTransformLeft 5s ease-in-out infinite;
        }

        .ce-transform-right {
          animation: ceTransformRight 5s ease-in-out infinite;
        }

        .ce-voltage-drop {
          animation: ceVoltageDrop 2.2s ease-in-out infinite;
        }

        .ce-heat-line {
          animation: ceHeatRise 1.8s ease-in-out infinite;
        }

        .ce-cap-current {
          animation: ceCapCurrent 4s ease-in-out infinite;
        }

        .ce-cap-charge-meter {
          transform-origin: 150px 270px;
          animation: ceCapMeter 4s ease-in-out infinite;
        }

        .ce-inductor-current-meter {
          transform-origin: 150px 270px;
          animation: ceInductorMeter 4s ease-in-out infinite;
        }

        .ce-back-emf {
          animation: ceBackEmf 4s ease-in-out infinite;
        }

        .ce-variable-load {
          animation: ceVariableLoad 3s ease-in-out infinite;
        }

        .ce-vout-meter {
          transform-origin: 430px 270px;
          animation: ceVariableMeter 3s ease-in-out infinite;
        }

        .ce-fixed-meter {
          transform-origin: 150px 270px;
          animation: ceFixedMeter 3s ease-in-out infinite;
        }

        @keyframes cePulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.92; }
        }

        @keyframes cePlateCharge {
          0%, 100% { opacity: 0.35; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-1px); }
        }

        @keyframes ceField {
          0%, 100% { opacity: 0.2; stroke-width: 2; }
          50% { opacity: 0.9; stroke-width: 4; }
        }

        @keyframes ceRingOne {
          0% { opacity: 0.12; transform: scale(0.86); }
          50% { opacity: 0.75; transform: scale(1); }
          100% { opacity: 0.12; transform: scale(0.86); }
        }

        @keyframes ceRingTwo {
          0% { opacity: 0.08; transform: scale(0.76); }
          50% { opacity: 0.55; transform: scale(1.08); }
          100% { opacity: 0.08; transform: scale(0.76); }
        }

        @keyframes cePush {
          0%, 100% { opacity: 0.28; transform: translateX(-10px); }
          50% { opacity: 0.9; transform: translateX(10px); }
        }

        @keyframes ceDash {
          to { stroke-dashoffset: -36; }
        }

        @keyframes ceTransformLeft {
          0%, 42% { opacity: 1; transform: translateX(0); }
          55%, 100% { opacity: 0.22; transform: translateX(-8px); }
        }

        @keyframes ceTransformRight {
          0%, 42% { opacity: 0.22; transform: translateX(8px); }
          55%, 100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes ceVoltageDrop {
          0%, 100% { opacity: 0.28; }
          50% { opacity: 0.88; }
        }

        @keyframes ceHeatRise {
          0% { opacity: 0; transform: translateY(12px); }
          45% { opacity: 0.85; }
          100% { opacity: 0; transform: translateY(-16px); }
        }

        @keyframes ceCapCurrent {
          0%, 16% { opacity: 1; }
          62%, 100% { opacity: 0; }
        }

        @keyframes ceCapMeter {
          0% { transform: scaleX(0.08); }
          58%, 100% { transform: scaleX(1); }
        }

        @keyframes ceInductorMeter {
          0% { transform: scaleX(0.12); }
          68%, 100% { transform: scaleX(1); }
        }

        @keyframes ceBackEmf {
          0%, 18% { opacity: 0.85; transform: translateX(8px); }
          55%, 100% { opacity: 0.22; transform: translateX(0); }
        }

        @keyframes ceVariableLoad {
          0%, 100% { stroke-width: 5; opacity: 0.65; }
          50% { stroke-width: 8; opacity: 1; }
        }

        @keyframes ceVariableMeter {
          0%, 100% { transform: scaleX(0.38); }
          50% { transform: scaleX(0.9); }
        }

        @keyframes ceFixedMeter {
          0%, 100% { transform: scaleX(0.76); }
          50% { transform: scaleX(0.78); }
        }
      `}</style>

      <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
        Animated circuit view
      </p>
      <svg
        viewBox="0 0 640 330"
        className="mt-3 h-auto w-full"
        role="img"
        aria-label={`${title} animated circuit diagram`}
      >
        <defs>
          <filter id="ceGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="ceArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
            <path d="M0 0 10 5 0 10Z" fill="#dc2626" />
          </marker>
          <marker id="ceGreenArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
            <path d="M0 0 10 5 0 10Z" fill="#059669" />
          </marker>
        </defs>

        <rect x="18" y="18" width="604" height="294" rx="22" fill="#ffffff" stroke="#dbeafe" />

        {isTransformation ? (
          <SourceTransformationScene />
        ) : isDependentSource ? (
          <DependentSourceScene />
        ) : (
          <StandardElementScene
            isResistor={isResistor}
            isCapacitor={isCapacitor}
            isInductor={isInductor}
            isVoltageSource={isVoltageSource}
            isCurrentSource={isCurrentSource}
          />
        )}
      </svg>
    </div>
  );
}

function MovingCharges({ path, count = 3, color = "#2563eb", duration = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <circle key={`charge-${index}`} className="ce-charge" r="6" fill={color}>
          <animateMotion
            dur={`${duration}s`}
            begin={`-${(duration / count) * index}s`}
            repeatCount="indefinite"
            path={path}
          />
        </circle>
      ))}
    </>
  );
}

function StandardElementScene({
  isResistor,
  isCapacitor,
  isInductor,
  isVoltageSource,
  isCurrentSource,
}) {
  if (isResistor) {
    return <ResistorWorkingScene />;
  }

  if (isCapacitor) {
    return <CapacitorWorkingScene />;
  }

  if (isInductor) {
    return <InductorWorkingScene />;
  }

  if (isVoltageSource) {
    return <VoltageSourceWorkingScene />;
  }

  if (isCurrentSource) {
    return <CurrentSourceWorkingScene />;
  }

  return (
    <ResistorWorkingScene />
  );
}

function BatterySymbol({ x = 80, y = 155 }) {
  return (
    <g>
      <rect x={x} y={y} width="76" height="70" rx="13" fill="#ffffff" stroke="#111827" strokeWidth="4" />
      <path d={`M${x + 22} ${y + 21}h34M${x + 38} ${y + 6}v30M${x + 24} ${y + 51}h28`} stroke="#111827" strokeWidth="4" strokeLinecap="round" />
      <text x={x - 4} y={y - 13} fill="#0f172a" fontSize="14" fontWeight="900">DC source</text>
    </g>
  );
}

function MeterBar({ x, y, width = 140, label, fill = "#2563eb", className = "" }) {
  return (
    <g>
      <text x={x} y={y - 10} fill="#0f172a" fontSize="13" fontWeight="900">{label}</text>
      <rect x={x} y={y} width={width} height="16" rx="8" fill="#e2e8f0" />
      <rect className={className} x={x} y={y} width={width} height="16" rx="8" fill={fill} />
    </g>
  );
}

function ResistorWorkingScene() {
  return (
    <g>
      <BatterySymbol />
      <path className="ce-wire" d="M118 155V92H525V238H118V225" />
      <path className="ce-wire" d="M156 190H118" />
      <path className="ce-voltage-drop" d="M262 92H430" stroke="#ef4444" strokeWidth="15" strokeLinecap="round" opacity="0.35" />
      <path
        className="ce-resistor-glow"
        d="M275 92h18l10-18 20 36 20-36 20 36 20-36 10 18h18"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#ceGlow)"
      />
      <path d="M275 92h18l10-18 20 36 20-36 20 36 20-36 10 18h18" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <MovingCharges path="M118 225V238H525V92H430H275H118V155" count={4} duration={7} />
      <path className="ce-heat-line" d="M315 58C306 43 322 38 313 24" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
      <path className="ce-heat-line" d="M350 58C341 43 357 38 348 24" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
      <path className="ce-heat-line" d="M385 58C376 43 392 38 383 24" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
      <text x="300" y="140" fill="#92400e" fontSize="13" fontWeight="900">voltage drop becomes heat</text>
      <MeterBar x={245} y={268} label="Current limited by R" fill="#f59e0b" className="ce-fixed-meter" />
    </g>
  );
}

function CapacitorWorkingScene() {
  return (
    <g>
      <BatterySymbol />
      <path className="ce-wire" d="M118 155V92H300" />
      <path className="ce-wire" d="M390 92H525V238H118V225" />
      <path className="ce-wire" d="M156 190H118" />
      <path d="M318 52V132M374 52V132" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
      <path className="ce-field" d="M330 64H362M330 82H362M330 100H362M330 118H362" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <text className="ce-cap-plate" x="292" y="48" fill="#dc2626" fontSize="22" fontWeight="900">+</text>
      <text className="ce-cap-plate" x="385" y="48" fill="#2563eb" fontSize="22" fontWeight="900">-</text>
      <MovingCharges path="M118 225V238H525V92H390" count={3} duration={4} color="#2563eb" />
      <g className="ce-cap-current">
        <path d="M250 142H322" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceArrow)" />
        <text x="210" y="165" fill="#dc2626" fontSize="13" fontWeight="900">charging current only at first</text>
      </g>
      <text x="252" y="198" fill="#0f172a" fontSize="13" fontWeight="900">DC steady state: open circuit</text>
      <MeterBar x={230} y={268} label="Capacitor voltage rises" fill="#2563eb" className="ce-cap-charge-meter" />
    </g>
  );
}

function InductorWorkingScene() {
  return (
    <g>
      <BatterySymbol />
      <path className="ce-wire" d="M118 155V92H288" />
      <path className="ce-wire" d="M405 92H525V238H118V225" />
      <path className="ce-wire" d="M156 190H118" />
      <path d="M288 92c8-28 24 28 34 0s24 28 34 0 24 28 34 0" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
      <g transform="translate(350 93)">
        <circle className="ce-magnetic-ring-one" cx="0" cy="0" r="42" fill="none" stroke="#10b981" strokeWidth="3" />
        <circle className="ce-magnetic-ring-two" cx="0" cy="0" r="58" fill="none" stroke="#10b981" strokeWidth="2" />
      </g>
      <MovingCharges path="M118 225V238H525V92H405H288H118V155" count={4} duration={6} color="#059669" />
      <g className="ce-back-emf">
        <path d="M430 145H284" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceArrow)" />
        <text x="276" y="170" fill="#dc2626" fontSize="13" fontWeight="900">back EMF opposes change</text>
      </g>
      <text x="268" y="205" fill="#047857" fontSize="13" fontWeight="900">magnetic field grows as current rises</text>
      <MeterBar x={230} y={268} label="Inductor current ramps up" fill="#10b981" className="ce-inductor-current-meter" />
    </g>
  );
}

function VoltageSourceWorkingScene() {
  return (
    <g>
      <circle cx="120" cy="165" r="38" fill="#eff6ff" stroke="#111827" strokeWidth="4" />
      <text x="106" y="158" fill="#dc2626" fontSize="23" fontWeight="900">+</text>
      <text x="110" y="187" fill="#2563eb" fontSize="23" fontWeight="900">-</text>
      <text x="75" y="110" fill="#0f172a" fontSize="14" fontWeight="900">ideal voltage source</text>
      <path className="ce-wire" d="M158 165H285V92H510V238H285V165" />
      <path className="ce-variable-load" d="M510 92v18l-18 10 36 20-36 20 36 20-36 20 18 10v28" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <MovingCharges path="M158 165H285V92H510V238H285V165" count={4} duration={6} color="#2563eb" />
      <path className="ce-source-push" d="M185 68H472" stroke="#059669" strokeWidth="5" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
      <text x="255" y="52" fill="#047857" fontSize="13" fontWeight="900">terminal voltage stays fixed</text>
      <MeterBar x={230} y={268} label="V remains 12 V" fill="#2563eb" className="ce-fixed-meter" />
      <MeterBar x={405} y={268} width={120} label="I changes with load" fill="#f59e0b" className="ce-vout-meter" />
    </g>
  );
}

function CurrentSourceWorkingScene() {
  return (
    <g>
      <circle cx="120" cy="165" r="38" fill="#ecfdf5" stroke="#111827" strokeWidth="4" />
      <path d="M120 190V138" stroke="#059669" strokeWidth="6" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
      <text x="75" y="110" fill="#0f172a" fontSize="14" fontWeight="900">ideal current source</text>
      <path className="ce-wire" d="M158 165H285V92H510V238H285V165" />
      <path className="ce-variable-load" d="M510 92v18l-18 10 36 20-36 20 36 20-36 20 18 10v28" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <MovingCharges path="M158 165H285V92H510V238H285V165" count={6} duration={5.5} color="#059669" />
      <text x="245" y="62" fill="#047857" fontSize="13" fontWeight="900">equal dot spacing = constant current</text>
      <MeterBar x={230} y={268} label="I remains fixed" fill="#059669" className="ce-fixed-meter" />
      <MeterBar x={405} y={268} width={120} label="V adjusts" fill="#f59e0b" className="ce-vout-meter" />
    </g>
  );
}

function ResistorElement() {
  return (
    <g>
      <path
        className="ce-resistor-glow"
        d="M275 95h18l10-18 20 36 20-36 20 36 20-36 10 18h18"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#ceGlow)"
      />
      <path d="M275 95h18l10-18 20 36 20-36 20 36 20-36 10 18h18" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="310" y="58" fill="#111827" fontSize="15" fontWeight="900">R</text>
      <text x="260" y="137" fill="#92400e" fontSize="13" fontWeight="900">heat energy glow</text>
    </g>
  );
}

function CapacitorElement() {
  return (
    <g>
      <path d="M260 95H310M380 95H430" className="ce-wire" />
      <path d="M318 60V130M372 60V130" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
      <path className="ce-field" d="M328 75H362M328 95H362M328 115H362" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <text className="ce-cap-plate" x="292" y="55" fill="#dc2626" fontSize="20" fontWeight="900">+</text>
      <text className="ce-cap-plate" x="384" y="55" fill="#2563eb" fontSize="20" fontWeight="900">-</text>
      <text x="320" y="154" fill="#1d4ed8" fontSize="13" fontWeight="900">charge builds on plates</text>
    </g>
  );
}

function InductorElement() {
  return (
    <g>
      <path d="M260 95H292" className="ce-wire" />
      <path d="M398 95H430" className="ce-wire" />
      <path d="M292 95c8-26 22 26 32 0s22 26 32 0 22 26 32 0" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
      <g transform="translate(346 96)">
        <circle className="ce-magnetic-ring-one" cx="0" cy="0" r="42" fill="none" stroke="#10b981" strokeWidth="3" />
        <circle className="ce-magnetic-ring-two" cx="0" cy="0" r="58" fill="none" stroke="#10b981" strokeWidth="2" />
      </g>
      <text x="285" y="165" fill="#047857" fontSize="13" fontWeight="900">magnetic field stores energy</text>
    </g>
  );
}

function VoltageSourceElement() {
  return (
    <g>
      <circle cx="345" cy="95" r="36" fill="#eff6ff" stroke="#111827" strokeWidth="4" />
      <path d="M315 95H260M375 95H430" className="ce-wire" />
      <text x="334" y="88" fill="#dc2626" fontSize="22" fontWeight="900">+</text>
      <text x="338" y="115" fill="#2563eb" fontSize="22" fontWeight="900">-</text>
      <path className="ce-source-push" d="M220 52H470" stroke="#059669" strokeWidth="5" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
      <text x="258" y="35" fill="#047857" fontSize="13" fontWeight="900">fixed voltage push</text>
    </g>
  );
}

function CurrentSourceElement() {
  return (
    <g>
      <circle cx="345" cy="95" r="36" fill="#ecfdf5" stroke="#111827" strokeWidth="4" />
      <path d="M315 95H260M375 95H430" className="ce-wire" />
      <path d="M345 118V75" stroke="#059669" strokeWidth="5" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
      <text x="274" y="154" fill="#047857" fontSize="13" fontWeight="900">equal spacing means steady current</text>
    </g>
  );
}

function DependentSourceScene() {
  return (
    <g>
      <text x="78" y="62" fill="#0f172a" fontSize="14" fontWeight="900">controlling input</text>
      <circle cx="130" cy="145" r="30" fill="#eff6ff" stroke="#111827" strokeWidth="4" />
      <text x="112" y="151" fill="#2563eb" fontSize="16" fontWeight="900">Vin</text>
      <MeterBar x={70} y={210} width={125} label="small Vin" fill="#2563eb" className="ce-vout-meter" />

      <path className="ce-control-signal" d="M176 145C232 88 282 90 328 132" fill="none" stroke="#7c3aed" strokeWidth="4" />
      <text x="220" y="104" fill="#7c3aed" fontSize="13" fontWeight="900">control signal</text>

      <polygon points="350,96 415,132 350,168 285,132" fill="#f5f3ff" stroke="#111827" strokeWidth="4" />
      <text x="325" y="128" fill="#7c3aed" fontSize="13" fontWeight="900">Vout</text>
      <text x="329" y="147" fill="#7c3aed" fontSize="13" fontWeight="900">= A Vin</text>

      <path className="ce-wire" d="M415 132H535V238H280V132H285" />
      <path className="ce-variable-load" d="M535 132v18l-18 10 36 20-36 20 18 10v28" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <MovingCharges path="M415 132H535V238H280V132H285" count={5} color="#7c3aed" duration={5.5} />
      <MeterBar x={405} y={270} width={140} label="larger controlled output" fill="#7c3aed" className="ce-vout-meter" />
    </g>
  );
}

function SourceTransformationScene() {
  return (
    <g>
      <g className="ce-transform-left">
        <text x="70" y="62" fill="#0f172a" fontSize="14" fontWeight="900">Voltage source + series R</text>
        <circle cx="130" cy="145" r="30" fill="#eff6ff" stroke="#111827" strokeWidth="4" />
        <text x="119" y="139" fill="#dc2626" fontSize="18" fontWeight="900">+</text>
        <text x="122" y="164" fill="#2563eb" fontSize="18" fontWeight="900">-</text>
        <path className="ce-wire" d="M160 145H205" />
        <path d="M205 145h12l8-14 16 28 16-28 16 28 8-14h12" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path className="ce-wire" d="M100 145H70V235H315V145H293" />
        <MovingCharges path="M100 145H70V235H315V145H293" count={2} duration={5.5} />
      </g>

      <path d="M300 155H365" stroke="#059669" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
      <text x="288" y="128" fill="#047857" fontSize="13" fontWeight="900">I = V / R</text>

      <g className="ce-transform-right">
        <text x="400" y="62" fill="#0f172a" fontSize="14" fontWeight="900">Current source + parallel R</text>
        <circle cx="445" cy="145" r="30" fill="#ecfdf5" stroke="#111827" strokeWidth="4" />
        <path d="M445 165V126" stroke="#059669" strokeWidth="5" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <path className="ce-wire" d="M475 145H535V235H385V145H415" />
        <path d="M535 112v12l14 8-28 16 28 16-28 16 14 8v12" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <MovingCharges path="M475 145H535V235H385V145H415" count={3} color="#059669" duration={5} />
      </g>

      <rect x="155" y="268" width="350" height="34" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="178" y="289" fill="#0f172a" fontSize="13" fontWeight="900">load terminals see the same V-I behavior</text>
    </g>
  );
}

export default function CircuitElementsPage() {
  return (
    <Layout title="ECE Exam Guide | Circuit Elements" pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1200px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li>
              <Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">
                Home
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">
                Subjects
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <Link
                href="/subjects/network-analysis"
                className="font-medium text-slate-600 transition hover:text-portal-700"
              >
                Network Analysis
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">
                Circuit Elements
              </span>
            </li>
          </ol>
        </nav>

        <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Circuit Elements
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Circuit elements are the parts that shape how voltage, current, and energy move
            through a circuit. Some elements oppose current, some store energy, some push
            charges, and some control other parts of the circuit.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          {circuitElementSections.map((section, index) => (
            <ElementCard key={section.title} section={section} index={index} />
          ))}
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/basic-concepts"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Basic Concepts
          </Link>
          <Link
            href="/circuit-laws"
            className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
          >
            Next Circuit Laws
          </Link>
        </div>
      </div>
    </Layout>
  );
}
