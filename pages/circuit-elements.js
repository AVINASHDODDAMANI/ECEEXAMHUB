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
      "Show electrons moving normally in the wire, then slower with zig-zag collision motion inside the resistor. Heat waves grow as electrical energy is dissipated.",
    visualSteps: [
      {
        label: "Step 1",
        title: "Electron Flow",
        color: "blue",
        text:
          "Blue particles represent electrons, the tiny moving charges that travel through the wire when the circuit is complete.",
      },
      {
        label: "Step 2",
        title: "Power Flow / Energy Transfer",
        color: "amber",
        text:
          "The continuous yellow pulse represents current flow and energy transfer through the resistor region. It is shown as a glowing flow, not as a particle.",
      },
      {
        label: "Step 3",
        title: "Collision Effect",
        color: "slate",
        text:
          "Inside the resistor, electrons interact with atoms of the material. The zig-zag motion and small flashes show these collisions.",
      },
      {
        label: "Step 4",
        title: "Heat Loss",
        color: "orange",
        text:
          "Because of these collisions, electrical energy is converted into heat. The orange heat waves show power dissipated in the resistor.",
      },
    ],
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
    visualSteps: [
      {
        label: "Step 1",
        title: "Charging Current Starts",
        color: "blue",
        text:
          "When the source is connected, electrons move in the external wire and charging current flows for a short time.",
      },
      {
        label: "Step 2",
        title: "Charges Collect On Plates",
        color: "amber",
        text:
          "Opposite charges accumulate on the two capacitor plates. Charge does not cross the insulating gap.",
      },
      {
        label: "Step 3",
        title: "Electric Field Builds",
        color: "blue",
        text:
          "As charge increases, the electric field between the plates becomes stronger and energy is stored.",
      },
      {
        label: "Step 4",
        title: "DC Current Stops",
        color: "slate",
        text:
          "After charging, the capacitor behaves like an open circuit for DC, so current fades to zero.",
      },
    ],
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
    visualSteps: [
      {
        label: "Step 1",
        title: "Current Starts Rising",
        color: "blue",
        text:
          "Current begins to flow through the coil, but it cannot jump instantly.",
      },
      {
        label: "Step 2",
        title: "Magnetic Field Grows",
        color: "amber",
        text:
          "The coil stores energy by building a magnetic field around it.",
      },
      {
        label: "Step 3",
        title: "Back EMF Opposes Change",
        color: "orange",
        text:
          "The inductor produces an opposing voltage whenever current tries to change quickly.",
      },
      {
        label: "Step 4",
        title: "Current Becomes Steady",
        color: "slate",
        text:
          "After the transient period, current reaches a steady value and the stored magnetic energy remains.",
      },
    ],
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
    visualSteps: [
      {
        label: "Step 1",
        title: "Voltage Is Set",
        color: "blue",
        text:
          "The source fixes the potential difference between its terminals.",
      },
      {
        label: "Step 2",
        title: "Electrical Push Appears",
        color: "amber",
        text:
          "The green push arrow shows the source driving charges through the circuit.",
      },
      {
        label: "Step 3",
        title: "Load Current Changes",
        color: "orange",
        text:
          "When load resistance changes, the current changes according to the connected circuit.",
      },
      {
        label: "Step 4",
        title: "Voltage Stays Fixed",
        color: "slate",
        text:
          "Even when current changes, the ideal source maintains the same terminal voltage.",
      },
    ],
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
    visualSteps: [
      {
        label: "Step 1",
        title: "Current Value Is Set",
        color: "blue",
        text:
          "The source fixes the amount of current that should flow through the branch.",
      },
      {
        label: "Step 2",
        title: "Constant Flow Is Maintained",
        color: "amber",
        text:
          "Equally spaced moving dots show current remaining steady.",
      },
      {
        label: "Step 3",
        title: "Load Changes",
        color: "orange",
        text:
          "The connected load may change, but the source still tries to maintain the same current.",
      },
      {
        label: "Step 4",
        title: "Voltage Adjusts",
        color: "slate",
        text:
          "The voltage across the source adjusts as needed within practical limits.",
      },
    ],
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
    visualSteps: [
      {
        label: "Step 1",
        title: "Input Signal Appears",
        color: "blue",
        text:
          "A small controlling voltage or current is applied at the input.",
      },
      {
        label: "Step 2",
        title: "Control Signal Links The Circuit",
        color: "amber",
        text:
          "The dashed control path shows that one circuit quantity controls another source.",
      },
      {
        label: "Step 3",
        title: "Output Source Responds",
        color: "orange",
        text:
          "The dependent source produces an output based on the input and gain.",
      },
      {
        label: "Step 4",
        title: "Larger Output Is Delivered",
        color: "slate",
        text:
          "The output path shows controlled energy delivery, which is the basic idea behind amplification.",
      },
    ],
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
    visualSteps: [
      {
        label: "Step 1",
        title: "Original Source Form",
        color: "blue",
        text:
          "Start with a voltage source in series with a resistance.",
      },
      {
        label: "Step 2",
        title: "Convert Source Value",
        color: "amber",
        text:
          "Use I = V / R to find the equivalent current source value.",
      },
      {
        label: "Step 3",
        title: "Equivalent Source Form",
        color: "orange",
        text:
          "Draw the current source with the same resistance in parallel.",
      },
      {
        label: "Step 4",
        title: "Same Terminal Behavior",
        color: "slate",
        text:
          "The outside load sees the same voltage-current behavior, even though the internal form is different.",
      },
    ],
  },
];

function ElementCard({ section, index }) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-[0_14px_34px_rgba(15,23,42,0.06)] sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-portal-600 text-sm font-black text-white shadow-[0_10px_24px_rgba(20,118,212,0.22)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">{section.title}</h2>
          <p className="mt-1.5 text-sm font-medium leading-6 text-slate-800 sm:text-base">
            {section.intro}
          </p>

          <div className="mt-3 grid gap-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Professional Explanation
              </h3>
              <ul className="mt-2 grid gap-1.5 text-sm font-medium leading-6 text-slate-800">
                {section.breakdown.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 rounded-xl border border-portal-100 bg-portal-50/60 p-3 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-portal-700">
                  Formula
                </p>
                <p className="mt-2 rounded-lg bg-white px-3 py-2 font-mono text-base font-bold text-slate-950">
                  {section.formula}
                </p>
                <ul className="mt-2 grid gap-1 text-xs font-semibold leading-5 text-slate-800">
                  {section.formulaMeaning.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>

            <CircuitElementMotionDiagram title={section.title} steps={section.visualSteps} />
          </div>

          <div className="mt-3 grid gap-2 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                Key Idea
              </p>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-emerald-950">
                {section.keyIdea}
              </p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
                How To Visualize
              </p>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-slate-800">{section.animation}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CircuitElementMotionDiagram({ title, steps = [] }) {
  const isResistor = title === "Resistor";
  const isCapacitor = title === "Capacitor";
  const isInductor = title === "Inductor";
  const isVoltageSource = title === "Independent Voltage Source";
  const isCurrentSource = title === "Independent Current Source";
  const isDependentSource = title === "Dependent Source";
  const isTransformation = title === "Source Transformation";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
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
          animation: cePulse 2.8s ease-in-out infinite;
        }

        .ce-cap-plate {
          animation: cePlateCharge 4.2s ease-in-out infinite;
        }

        .ce-field {
          animation: ceField 4.2s ease-in-out infinite;
        }

        .ce-magnetic-ring-one {
          animation: ceRingOne 4.6s ease-in-out infinite;
        }

        .ce-magnetic-ring-two {
          animation: ceRingTwo 4.6s ease-in-out infinite;
        }

        .ce-source-push {
          animation: cePush 3.8s ease-in-out infinite;
        }

        .ce-control-signal {
          stroke-dasharray: 9 9;
          animation: ceDash 2.2s linear infinite;
        }

        .ce-transform-left {
          animation: ceTransformLeft 8s ease-in-out infinite;
        }

        .ce-transform-right {
          animation: ceTransformRight 8s ease-in-out infinite;
        }

        .ce-voltage-drop {
          animation: ceVoltageDrop 4s ease-in-out infinite;
        }

        .ce-heat-line {
          animation: ceHeatRise 3.2s ease-in-out infinite;
        }

        .ce-resistor-atom {
          animation: ceAtomVibrate 1s ease-in-out infinite;
        }

        .ce-collision-flash {
          animation: ceCollisionFlash 3.8s ease-in-out infinite;
        }

        .ce-energy-pulse {
          stroke-dasharray: 26 18;
          animation: ceEnergyPulse 3s linear infinite;
        }

        .ce-badge-step {
          opacity: 0;
          animation-duration: 28s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        .ce-badge-step-1 { animation-name: ceBadgeStepOne; }
        .ce-badge-step-2 { animation-name: ceBadgeStepTwo; }
        .ce-badge-step-3 { animation-name: ceBadgeStepThree; }
        .ce-badge-step-4 { animation-name: ceBadgeStepFour; }

        .ce-guide-card {
          opacity: 0.86;
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        .ce-guide-card-1 { animation: ceGuideCardOne 28s linear infinite; }
        .ce-guide-card-2 { animation: ceGuideCardTwo 28s linear infinite; }
        .ce-guide-card-3 { animation: ceGuideCardThree 28s linear infinite; }
        .ce-guide-card-4 { animation: ceGuideCardFour 28s linear infinite; }

        .ce-stage-1,
        .ce-stage-2,
        .ce-stage-3,
        .ce-stage-4 {
          opacity: 0;
        }

        .ce-stage-1 { animation: ceStageOne 28s linear infinite; }
        .ce-stage-2 { animation: ceStageTwo 28s linear infinite; }
        .ce-stage-3 { animation: ceStageThree 28s linear infinite; }
        .ce-stage-4 { animation: ceStageFour 28s linear infinite; }

        .ce-cap-current {
          animation: ceCapCurrent 7s ease-in-out infinite;
        }

        .ce-cap-charge-meter {
          transform-origin: 150px 270px;
          animation: ceCapMeter 7s ease-in-out infinite;
        }

        .ce-inductor-current-meter {
          transform-origin: 150px 270px;
          animation: ceInductorMeter 7s ease-in-out infinite;
        }

        .ce-back-emf {
          animation: ceBackEmf 7s ease-in-out infinite;
        }

        .ce-variable-load {
          animation: ceVariableLoad 5.5s ease-in-out infinite;
        }

        .ce-vout-meter {
          transform-origin: 430px 270px;
          animation: ceVariableMeter 5.5s ease-in-out infinite;
        }

        .ce-fixed-meter {
          transform-origin: 150px 270px;
          animation: ceFixedMeter 5.5s ease-in-out infinite;
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

        @keyframes ceAtomVibrate {
          0%, 100% { transform: translate(0, 0); }
          35% { transform: translate(1px, -1px); }
          70% { transform: translate(-1px, 1px); }
        }

        @keyframes ceCollisionFlash {
          0%, 18%, 100% { opacity: 0; transform: scale(0.7); }
          28%, 42% { opacity: 0.95; transform: scale(1.12); }
          56% { opacity: 0; transform: scale(0.8); }
        }

        @keyframes ceEnergyPulse {
          to { stroke-dashoffset: -88; }
        }

        @keyframes ceBadgeStepOne {
          0%, 22% { opacity: 1; transform: translateY(0); }
          26%, 100% { opacity: 0; transform: translateY(3px); }
        }

        @keyframes ceBadgeStepTwo {
          0%, 24% { opacity: 0; transform: translateY(3px); }
          28%, 48% { opacity: 1; transform: translateY(0); }
          52%, 100% { opacity: 0; transform: translateY(3px); }
        }

        @keyframes ceBadgeStepThree {
          0%, 50% { opacity: 0; transform: translateY(3px); }
          54%, 74% { opacity: 1; transform: translateY(0); }
          78%, 100% { opacity: 0; transform: translateY(3px); }
        }

        @keyframes ceBadgeStepFour {
          0%, 76% { opacity: 0; transform: translateY(3px); }
          80%, 100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes ceGuideCardOne {
          0%, 23% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          27%, 100% { opacity: 0.86; transform: translateY(0); border-color: #cbd5e1; background-color: #ffffff; }
        }

        @keyframes ceGuideCardTwo {
          0%, 25% { opacity: 0.86; transform: translateY(0); border-color: #cbd5e1; background-color: #ffffff; }
          29%, 48% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          52%, 100% { opacity: 0.86; transform: translateY(0); border-color: #cbd5e1; background-color: #ffffff; }
        }

        @keyframes ceGuideCardThree {
          0%, 51% { opacity: 0.86; transform: translateY(0); border-color: #cbd5e1; background-color: #ffffff; }
          55%, 73% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          77%, 100% { opacity: 0.86; transform: translateY(0); border-color: #cbd5e1; background-color: #ffffff; }
        }

        @keyframes ceGuideCardFour {
          0%, 76% { opacity: 0.86; transform: translateY(0); border-color: #cbd5e1; background-color: #ffffff; }
          80%, 94% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          98%, 100% { opacity: 0.86; transform: translateY(0); border-color: #cbd5e1; background-color: #ffffff; }
        }

        @keyframes ceStageOne {
          0%, 5% { opacity: 0; }
          8%, 94% { opacity: 1; }
          98%, 100% { opacity: 0; }
        }

        @keyframes ceStageTwo {
          0%, 25% { opacity: 0; }
          29%, 94% { opacity: 1; }
          98%, 100% { opacity: 0; }
        }

        @keyframes ceStageThree {
          0%, 51% { opacity: 0; }
          55%, 94% { opacity: 1; }
          98%, 100% { opacity: 0; }
        }

        @keyframes ceStageFour {
          0%, 76% { opacity: 0; }
          80%, 94% { opacity: 1; }
          98%, 100% { opacity: 0; }
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

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        Animated Circuit View: {title}
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-700">
        Watch one circuit action at a time, then match it with the highlighted step below.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div className="min-w-0 overflow-x-auto overscroll-x-contain">
          <svg
            viewBox="0 0 640 330"
            className="mx-auto h-auto w-full max-w-full md:w-[68%]"
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

            <rect x="18" y="18" width="604" height="294" rx="22" fill="#ffffff" stroke="#e2e8f0" />

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

        <CircuitAnimationStepCards steps={steps} />
      </div>
    </div>
  );
}

function getStepNumber(label = "", index = 0) {
  const match = label.match(/\d+/);
  return match ? match[0] : String(index + 1);
}

function getCompactStepTitle(title = "") {
  return title
    .replace("Power Flow / Energy Transfer", "Energy Transfer")
    .replace("Constant Flow Is Maintained", "Constant Flow")
    .replace("Current Becomes Steady", "Steady Current")
    .replace("Original Source Form", "Original Form")
    .replace("Equivalent Source Form", "Equivalent Form");
}

function CircuitAnimationStepCards({ steps = [] }) {
  const displaySteps = steps.slice(0, 4);

  if (!displaySteps.length) {
    return null;
  }

  return (
    <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
      {displaySteps.map((step, index) => (
        <div
          key={`${step.label}-${step.title}`}
          className={`ce-guide-card ce-guide-card-${index + 1} rounded-lg border border-slate-300 bg-white px-3 py-2.5 shadow-sm`}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.08em] text-portal-800">
            Step {getStepNumber(step.label, index)}: {getCompactStepTitle(step.title)}
          </p>
          <p className="mt-1 text-xs font-bold leading-5 text-slate-950">
            {step.text}
          </p>
        </div>
      ))}
    </div>
  );
}

function MovingCharges({ path, count = 3, color = "#2563eb", duration = 6 }) {
  const slowedDuration = duration * 1.8;

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <circle key={`charge-${index}`} className="ce-charge" r="6" fill={color}>
          <animateMotion
            dur={`${slowedDuration}s`}
            begin={`-${(slowedDuration / count) * index}s`}
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
  const electronPath = "M118 225V238H525V92H430H275H118V155";
  const resistorPath = "M275 92H292L302 76L322 110L342 76L362 110L382 76L402 110L412 92H430";

  return (
    <g>
      <BatterySymbol />
      <path className="ce-wire" d="M118 155V92H525V238H118V225" />
      <path className="ce-wire" d="M156 190H118" />
      <text x="178" y="160" fill="#dc2626" fontSize="20" fontWeight="900">+</text>
      <text x="178" y="228" fill="#2563eb" fontSize="20" fontWeight="900">-</text>
      <path className="ce-stage-2 ce-voltage-drop" d="M255 92H438" stroke="#fbbf24" strokeWidth="16" strokeLinecap="round" opacity="0.36" />
      <path
        className="ce-stage-2 ce-energy-pulse"
        d="M245 126H455"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="8"
        strokeLinecap="round"
        markerEnd="url(#ceGreenArrow)"
      />
      <path
        className="ce-stage-4 ce-resistor-glow"
        d="M275 92h18l10-18 20 36 20-36 20 36 20-36 10 18h18"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#ceGlow)"
      />
      <path d="M275 92h18l10-18 20 36 20-36 20 36 20-36 10 18h18" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="312" y="61" fill="#111827" fontSize="14" fontWeight="900">Resistor (R)</text>
      <path className="ce-stage-1" d="M492 108H430" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
      {[302, 324, 348, 371, 395].map((x, index) => (
        <circle
          key={`resistor-atom-${x}`}
          className="ce-stage-3 ce-resistor-atom"
          cx={x}
          cy={index % 2 ? 104 : 82}
          r="4.5"
          fill="#94a3b8"
        />
      ))}
      <g className="ce-stage-1">
        <MovingCharges path={electronPath} count={5} duration={5.8} />
      </g>
      {[0, 1, 2].map((index) => (
        <circle key={`slow-resistor-electron-${index}`} className="ce-stage-3 ce-charge" r="6" fill="#2563eb">
          <animateMotion
            dur="13s"
            begin={`-${index * 4.3}s`}
            repeatCount="indefinite"
            path={resistorPath}
          />
        </circle>
      ))}
      {[310, 354, 397].map((x, index) => (
        <circle
          key={`collision-${x}`}
          className="ce-stage-3 ce-collision-flash"
          cx={x}
          cy={index === 1 ? 75 : 108}
          r="9"
          fill="#f97316"
          filter="url(#ceGlow)"
          style={{ animationDelay: `${index * 0.55}s` }}
        />
      ))}
      <path className="ce-stage-4 ce-heat-line" d="M315 58C306 43 322 38 313 24" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
      <path className="ce-stage-4 ce-heat-line" d="M350 58C341 43 357 38 348 24" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" style={{ animationDelay: "0.25s" }} />
      <path className="ce-stage-4 ce-heat-line" d="M385 58C376 43 392 38 383 24" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" style={{ animationDelay: "0.5s" }} />
      <circle cx="450" cy="268" r="5" fill="#2563eb" filter="url(#ceGlow)" />
      <path d="M470 288C465 282 476 281 471 275" fill="none" stroke="#f97316" strokeWidth="2.4" strokeLinecap="round" />
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
      <path className="ce-stage-3 ce-field" d="M330 64H362M330 82H362M330 100H362M330 118H362" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <text className="ce-stage-2 ce-cap-plate" x="292" y="48" fill="#dc2626" fontSize="22" fontWeight="900">+</text>
      <text className="ce-stage-2 ce-cap-plate" x="385" y="48" fill="#2563eb" fontSize="22" fontWeight="900">-</text>
      <g className="ce-stage-1">
        <MovingCharges path="M118 225V238H525V92H390" count={3} duration={4} color="#2563eb" />
      </g>
      <g className="ce-stage-1 ce-cap-current">
        <path d="M250 142H322" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceArrow)" />
      </g>
      <g className="ce-stage-3">
        <MeterBar x={230} y={268} label="Capacitor voltage rises" fill="#2563eb" className="ce-cap-charge-meter" />
      </g>
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
      <g className="ce-stage-2" transform="translate(350 93)">
        <circle className="ce-magnetic-ring-one" cx="0" cy="0" r="42" fill="none" stroke="#10b981" strokeWidth="3" />
        <circle className="ce-magnetic-ring-two" cx="0" cy="0" r="58" fill="none" stroke="#10b981" strokeWidth="2" />
      </g>
      <g className="ce-stage-1">
        <MovingCharges path="M118 225V238H525V92H405H288H118V155" count={4} duration={6} color="#059669" />
      </g>
      <g className="ce-stage-3 ce-back-emf">
        <path d="M430 145H284" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceArrow)" />
        <text x="316" y="170" fill="#dc2626" fontSize="12" fontWeight="900">back EMF</text>
      </g>
      <g className="ce-stage-4">
        <MeterBar x={230} y={268} label="Inductor current ramps up" fill="#10b981" className="ce-inductor-current-meter" />
      </g>
    </g>
  );
}

function VoltageSourceWorkingScene() {
  return (
    <g>
      <circle cx="120" cy="165" r="38" fill="#eff6ff" stroke="#111827" strokeWidth="4" />
      <text x="106" y="158" fill="#dc2626" fontSize="23" fontWeight="900">+</text>
      <text x="110" y="187" fill="#2563eb" fontSize="23" fontWeight="900">-</text>
      <text className="ce-stage-1" x="84" y="110" fill="#0f172a" fontSize="14" fontWeight="900">V source</text>
      <path className="ce-wire" d="M158 165H285V92H510V238H285V165" />
      <path className="ce-stage-3 ce-variable-load" d="M510 92v18l-18 10 36 20-36 20 36 20-36 20 18 10v28" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <g className="ce-stage-2">
        <MovingCharges path="M158 165H285V92H510V238H285V165" count={4} duration={6} color="#2563eb" />
        <path className="ce-source-push" d="M185 68H472" stroke="#059669" strokeWidth="5" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
      </g>
      <g className="ce-stage-4">
        <MeterBar x={230} y={268} label="V remains 12 V" fill="#2563eb" className="ce-fixed-meter" />
      </g>
      <g className="ce-stage-3">
        <MeterBar x={405} y={268} width={120} label="I changes with load" fill="#f59e0b" className="ce-vout-meter" />
      </g>
    </g>
  );
}

function CurrentSourceWorkingScene() {
  return (
    <g>
      <circle cx="120" cy="165" r="38" fill="#ecfdf5" stroke="#111827" strokeWidth="4" />
      <path d="M120 190V138" stroke="#059669" strokeWidth="6" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
      <text className="ce-stage-1" x="84" y="110" fill="#0f172a" fontSize="14" fontWeight="900">I source</text>
      <path className="ce-wire" d="M158 165H285V92H510V238H285V165" />
      <path className="ce-stage-3 ce-variable-load" d="M510 92v18l-18 10 36 20-36 20 36 20-36 20 18 10v28" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <g className="ce-stage-2">
        <MovingCharges path="M158 165H285V92H510V238H285V165" count={6} duration={5.5} color="#059669" />
      </g>
      <g className="ce-stage-2">
        <MeterBar x={230} y={268} label="I remains fixed" fill="#059669" className="ce-fixed-meter" />
      </g>
      <g className="ce-stage-4">
        <MeterBar x={405} y={268} width={120} label="V adjusts" fill="#f59e0b" className="ce-vout-meter" />
      </g>
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
      <g className="ce-stage-1">
        <text x="82" y="62" fill="#0f172a" fontSize="14" fontWeight="900">input</text>
        <circle cx="130" cy="145" r="30" fill="#eff6ff" stroke="#111827" strokeWidth="4" />
        <text x="112" y="151" fill="#2563eb" fontSize="16" fontWeight="900">Vin</text>
        <MeterBar x={70} y={210} width={125} label="small Vin" fill="#2563eb" className="ce-vout-meter" />
      </g>

      <g className="ce-stage-2">
        <path className="ce-control-signal" d="M176 145C232 88 282 90 328 132" fill="none" stroke="#7c3aed" strokeWidth="4" />
        <text x="228" y="104" fill="#7c3aed" fontSize="13" fontWeight="900">control</text>
      </g>

      <g className="ce-stage-3">
        <polygon points="350,96 415,132 350,168 285,132" fill="#f5f3ff" stroke="#111827" strokeWidth="4" />
        <text x="325" y="128" fill="#7c3aed" fontSize="13" fontWeight="900">Vout</text>
        <text x="329" y="147" fill="#7c3aed" fontSize="13" fontWeight="900">= A Vin</text>
      </g>

      <g className="ce-stage-4">
        <path className="ce-wire" d="M415 132H535V238H280V132H285" />
        <path className="ce-variable-load" d="M535 132v18l-18 10 36 20-36 20 18 10v28" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <MovingCharges path="M415 132H535V238H280V132H285" count={5} color="#7c3aed" duration={5.5} />
        <MeterBar x={405} y={270} width={140} label="controlled output" fill="#7c3aed" className="ce-vout-meter" />
      </g>
    </g>
  );
}

function SourceTransformationScene() {
  return (
    <g>
      <g className="ce-stage-1 ce-transform-left">
        <text x="76" y="62" fill="#0f172a" fontSize="14" fontWeight="900">Voltage source</text>
        <circle cx="130" cy="145" r="30" fill="#eff6ff" stroke="#111827" strokeWidth="4" />
        <text x="119" y="139" fill="#dc2626" fontSize="18" fontWeight="900">+</text>
        <text x="122" y="164" fill="#2563eb" fontSize="18" fontWeight="900">-</text>
        <path className="ce-wire" d="M160 145H205" />
        <path d="M205 145h12l8-14 16 28 16-28 16 28 8-14h12" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path className="ce-wire" d="M100 145H70V235H315V145H293" />
        <MovingCharges path="M100 145H70V235H315V145H293" count={2} duration={5.5} />
      </g>

      <path className="ce-stage-2" d="M300 155H365" stroke="#059669" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
      <text className="ce-stage-2" x="288" y="128" fill="#047857" fontSize="13" fontWeight="900">I = V / R</text>

      <g className="ce-stage-3 ce-transform-right">
        <text x="405" y="62" fill="#0f172a" fontSize="14" fontWeight="900">Current source</text>
        <circle cx="445" cy="145" r="30" fill="#ecfdf5" stroke="#111827" strokeWidth="4" />
        <path d="M445 165V126" stroke="#059669" strokeWidth="5" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <path className="ce-wire" d="M475 145H535V235H385V145H415" />
        <path d="M535 112v12l14 8-28 16 28 16-28 16 14 8v12" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <MovingCharges path="M475 145H535V235H385V145H415" count={3} color="#059669" duration={5} />
      </g>

      <rect className="ce-stage-4" x="155" y="268" width="350" height="34" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <text className="ce-stage-4" x="218" y="289" fill="#0f172a" fontSize="12" fontWeight="900">same terminal V-I behavior</text>
    </g>
  );
}

function LearningHookPanel() {
  return (
    <section className="mt-5 rounded-2xl border border-blue-200 bg-blue-50/80 p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-portal-700">
            Visual learning path
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Understand circuit elements in 2 minutes with step-by-step animation.
          </h2>
          <p className="mt-2 max-w-3xl text-sm font-semibold leading-7 text-slate-800">
            See how resistors, capacitors, inductors, and sources affect current,
            voltage, power, and stored energy before solving exam problems.
          </p>
        </div>
        <div className="grid gap-2 text-sm font-bold text-slate-800">
          {["Watch the circuit motion", "Read the active step card", "Remember the formula", "Try exam MCQs"].map((item, index) => (
            <div key={item} className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2 shadow-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-portal-600 text-xs font-black text-white">
                {index + 1}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CircuitElementsQuickSummary() {
  return (
    <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-portal-700">
        Quick Summary
      </p>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-portal-100 bg-portal-50/70 p-3">
          <p className="text-sm font-black text-slate-950">Core formulas</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
            R: V = IR, C: Q = CV, L: V = L(di/dt), Source transformation: I = V/R.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
          <p className="text-sm font-black text-slate-950">Exam key points</p>
          <ul className="mt-1 grid gap-1 text-sm font-semibold leading-6 text-slate-800">
            <li>Resistor dissipates power.</li>
            <li>Capacitor stores electric-field energy.</li>
            <li>Inductor stores magnetic-field energy.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50/80 p-3">
          <p className="text-sm font-black text-slate-950">Memory rule</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
            Resistor opposes current, capacitor opposes sudden voltage change,
            and inductor opposes sudden current change.
          </p>
        </div>
      </div>
    </section>
  );
}

function ExamRetentionSection() {
  const questions = [
    "Why does a resistor convert electrical energy into heat?",
    "What happens to a capacitor in DC steady state?",
    "Why does an inductor oppose sudden current change?",
    "When is source transformation useful in network solving?",
  ];

  return (
    <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-portal-700">
            Exam Focus
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-950">
            Important 2-mark questions from circuit elements
          </h2>
        </div>
        <Link
          href="/mcqs/network-analysis"
          className="inline-flex justify-center rounded-xl bg-portal-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-portal-700"
        >
          Try MCQs
        </Link>
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {questions.map((question) => (
          <div key={question} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold leading-6 text-slate-800">
            {question}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CircuitElementsPage() {
  return (
    <Layout title="ECE Exam Guide | Circuit Elements" pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1200px] pb-24">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-start justify-between gap-3 pt-1"
        >
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

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Network Analysis / Circuit Elements
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Understand Circuit Elements in 2 minutes with visual explanation
          </h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            You will learn how resistors, capacitors, inductors, and sources shape
            voltage, current, power flow, energy storage, and circuit behavior.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/mcqs/network-analysis"
              className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
            >
              Try MCQs
            </Link>
            <Link
              href="/notes/network-analysis"
              className="inline-flex justify-center rounded-xl border border-portal-200 bg-white px-5 py-3 text-sm font-bold text-portal-700 transition hover:bg-portal-50"
            >
              Download Notes
            </Link>
            <Link
              href="/circuit-laws"
              className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Next Topic
            </Link>
          </div>
        </section>

        <section id="circuit-elements-list" className="mt-5 grid gap-3">
          {circuitElementSections.map((section, index) => (
            <ElementCard key={section.title} section={section} index={index} />
          ))}
        </section>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Link
            href="/mcqs/network-analysis"
            className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
          >
            Try MCQs
          </Link>
          <Link
            href="/notes/network-analysis"
            className="inline-flex justify-center rounded-xl border border-portal-200 bg-white px-5 py-3 text-sm font-bold text-portal-700 transition hover:bg-portal-50"
          >
            Download Notes
          </Link>
          <Link
            href="/circuit-laws"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            Next Topic
          </Link>
        </div>
      </div>
    </Layout>
  );
}
