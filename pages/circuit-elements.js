import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import NetworkTopicMenu from "../components/NetworkTopicMenu";

const circuitElementSections = [
  {
    title: "Resistor",
    intro:
      "A resistor sets the overall current in a circuit and converts electrical energy into heat.",
    breakdown: [
      "In a series branch, the same current flows through every element.",
      "It is used for current limiting, voltage division, biasing, and protection.",
      "A larger resistance gives a smaller circuit current for the same applied voltage.",
    ],
    formula: "V = IR",
    formulaMeaning: [
      "V is the reference voltage across the resistor.",
      "I is the reference current through it.",
      "R is the resistance value.",
    ],
    keyIdea: "A resistor does not consume current locally; it causes voltage drop and heat loss while setting the branch current.",
    animation:
      "Show the same branch current through the whole loop, a voltage drop across the resistor, stronger scattering in the resistive material, and heat produced by energy dissipation.",
    visualSteps: [
      {
        label: "Step 1",
        title: "Electron Flow",
        color: "blue",
        text:
          "Blue dots show charge moving around the closed circuit. In this series loop, the same current passes before and after the resistor.",
      },
      {
        label: "Step 2",
        title: "Voltage Drop / Field Energy",
        color: "amber",
        text:
          "The + and - marks across the resistor show voltage drop. Electrical energy is used in the resistor, not current.",
      },
      {
        label: "Step 3",
        title: "Resistive Material",
        color: "slate",
        text:
          "The resistor material causes stronger scattering of charge motion than an ideal wire.",
      },
      {
        label: "Step 4",
        title: "Heat Loss",
        color: "orange",
        text:
          "The voltage drop and current mean power is dissipated: p = vi. That electrical energy is converted mainly into heat.",
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
      "A dependent source is an ideal controlled source whose output voltage or current depends on another voltage or current elsewhere in the circuit.",
    breakdown: [
      "It is a circuit element whose value is controlled by a separate circuit variable, not by its own terminals alone.",
      "Dependent sources model transistors, op-amps, amplifiers, and other active devices.",
      "The control signal sets the output relation, while the actual output power comes from an external supply.",
    ],
    formula: "VCVS: Vout = A Vin",
    formulaMeaning: [
      "This is one ideal example: a voltage-controlled voltage source.",
      "Vout is the output voltage produced by the dependent source.",
      "Vin is the controlling input voltage measured in a different part of the circuit.",
      "A is the gain factor; it defines the relationship, not the energy source.",
      "There are four dependent source types: VCVS, VCCS, CCVS, and CCCS.",
    ],
    keyIdea: "A dependent source is controlled by another circuit variable and relies on external power to deliver output energy.",
    animation:
      "Show a VCVS model where Vin controls the output voltage relation and the amplifier power rails supply the actual energy.",
    visualSteps: [
      {
        label: "Step 1",
        title: "Control Signal Defined",
        color: "blue",
        text:
          "A small voltage or current elsewhere in the circuit is identified as the controlling variable.",
      },
      {
        label: "Step 2",
        title: "Control Relation Only",
        color: "amber",
        text:
          "The dashed line shows a mathematical control relation. It is not a physical path for output power.",
      },
      {
        label: "Step 3",
        title: "Output Follows The Control",
        color: "orange",
        text:
          "The dependent source sets its output voltage or current based on the input control signal and gain factor.",
      },
      {
        label: "Step 4",
        title: "External Supply Delivers Energy",
        color: "slate",
        text:
          "The source itself does not create energy. The extra output power comes from an external power supply.",
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
    <article
      id={toSectionId(section.title)}
      className="scroll-mt-32 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_10px_26px_rgba(15,23,42,0.05)] sm:p-3"
    >
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start">
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-portal-600 text-xs font-black text-white shadow-[0_8px_18px_rgba(20,118,212,0.2)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-black tracking-tight text-slate-950 sm:text-lg">{section.title}</h2>
          <p className="mt-1 text-sm font-semibold leading-5 text-slate-800">
            {section.intro}
          </p>

          <div className="mt-2.5 grid gap-2 lg:grid-cols-[minmax(0,1fr)_240px]">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
                Professional Explanation
              </h3>
              <ul className="mt-1.5 grid gap-1 text-[13px] font-semibold leading-5 text-slate-800 sm:grid-cols-3 lg:grid-cols-1">
                {section.breakdown.map((point) => (
                  <li key={point} className="flex gap-1.5">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-portal-100 bg-portal-50/70 p-2.5 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.1em] text-portal-700">
                Formula
              </p>
              <p className="mt-1.5 rounded-lg bg-white px-2.5 py-1.5 font-mono text-sm font-black text-slate-950">
                {section.formula}
              </p>
              <ul className="mt-1.5 grid gap-0.5 text-[12px] font-semibold leading-4 text-slate-800">
                {section.formulaMeaning.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-2.5">
            <CircuitElementDiagram title={section.title} />
          </div>

          <div className="mt-2.5 grid gap-2 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-2.5 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.1em] text-emerald-700">
                Key Idea
              </p>
              <p className="mt-1 text-[13px] font-bold leading-5 text-emerald-950">
                {section.keyIdea}
              </p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-2.5 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.1em] text-blue-700">
                Diagram Reading
              </p>
              <p className="mt-1 text-[13px] font-bold leading-5 text-slate-800">
                Read the element symbol, marked current direction, terminal polarity,
                and connected source before applying {section.formula}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CircuitElementDiagram({ title }) {
  const label = `${title} circuit diagram`;

  return (
    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
      <figcaption className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-portal-700">
          Normal Circuit Diagram
        </span>
        <span className="text-xs font-bold text-slate-500">{title}</span>
      </figcaption>
      <div className="overflow-x-auto rounded-lg border border-slate-100 bg-slate-50/80">
        <svg
          viewBox="0 0 720 250"
          className="mx-auto h-auto min-w-[560px] max-w-full"
          role="img"
          aria-label={label}
        >
          <defs>
            <marker id="ceStaticArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
              <path d="M0 0l9 4.5L0 9z" fill="#154a96" />
            </marker>
          </defs>
          <rect x="1" y="1" width="718" height="248" rx="18" fill="#f8fbff" stroke="#dbeafe" />
          {title === "Resistor" ? (
            <ResistorStaticDiagram />
          ) : title === "Capacitor" ? (
            <CapacitorStaticDiagram />
          ) : title === "Inductor" ? (
            <InductorStaticDiagram />
          ) : title === "Independent Voltage Source" ? (
            <VoltageSourceStaticDiagram />
          ) : title === "Independent Current Source" ? (
            <CurrentSourceStaticDiagram />
          ) : title === "Dependent Source" ? (
            <DependentSourceStaticDiagram />
          ) : (
            <SourceTransformationStaticDiagram />
          )}
        </svg>
      </div>
    </figure>
  );
}

function StaticWire({ d }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="#111827"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function StaticResistor({ x = 320, y = 75 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0 0h22l12-18 22 36 22-36 22 36 22-36 12 18h22"
        fill="none"
        stroke="#111827"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="63" y="-30" fill="#0f172a" fontSize="15" fontWeight="900">R</text>
    </g>
  );
}

function StaticBattery({ x = 176, y = 87 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0v76" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
      <path d="M24 -13v102" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
      <text x="42" y="13" fill="#dc2626" fontSize="18" fontWeight="900">+</text>
      <text x="42" y="77" fill="#2563eb" fontSize="18" fontWeight="900">-</text>
    </g>
  );
}

function StaticCurrentArrow({ d, label, x, y }) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="#154a96"
        strokeWidth="3.5"
        strokeLinecap="round"
        markerEnd="url(#ceStaticArrow)"
      />
      <text x={x} y={y} fill="#154a96" fontSize="13" fontWeight="900">{label}</text>
    </g>
  );
}

function StaticElementLoop({ children }) {
  return (
    <g>
      <StaticWire d="M200 75H320M476 75H560V190H200V163" />
      <StaticBattery />
      <StaticWire d="M200 75V87M200 163V190" />
      <StaticCurrentArrow d="M252 48H424" label="i" x={334} y={38} />
      {children}
    </g>
  );
}

function ResistorStaticDiagram() {
  return (
    <g>
      <StaticElementLoop>
        <StaticResistor />
      </StaticElementLoop>
      <text x="300" y="120" fill="#dc2626" fontSize="17" fontWeight="900">+</text>
      <text x="468" y="120" fill="#2563eb" fontSize="17" fontWeight="900">-</text>
      <text x="357" y="145" fill="#475569" fontSize="13" fontWeight="800">vR</text>
      <text x="278" y="222" fill="#475569" fontSize="13" fontWeight="800">Closed loop with resistor voltage drop</text>
    </g>
  );
}

function CapacitorStaticDiagram() {
  return (
    <g>
      <StaticElementLoop>
        <StaticWire d="M320 75H370M430 75H476" />
        <path d="M382 40v70M418 40v70" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
        <text x="393" y="32" fill="#0f172a" fontSize="15" fontWeight="900">C</text>
      </StaticElementLoop>
      <text x="360" y="135" fill="#dc2626" fontSize="17" fontWeight="900">+</text>
      <text x="430" y="135" fill="#2563eb" fontSize="17" fontWeight="900">-</text>
      <text x="385" y="156" fill="#475569" fontSize="13" fontWeight="800">vC</text>
      <text x="269" y="222" fill="#475569" fontSize="13" fontWeight="800">Capacitor plates in a source-driven branch</text>
    </g>
  );
}

function InductorStaticDiagram() {
  return (
    <g>
      <StaticElementLoop>
        <StaticWire d="M320 75H350M456 75H476" />
        <path
          d="M350 75c8-30 23 30 36 0s23 30 36 0 23 30 34 0"
          fill="none"
          stroke="#111827"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text x="399" y="34" fill="#0f172a" fontSize="15" fontWeight="900">L</text>
      </StaticElementLoop>
      <text x="337" y="131" fill="#dc2626" fontSize="17" fontWeight="900">+</text>
      <text x="456" y="131" fill="#2563eb" fontSize="17" fontWeight="900">-</text>
      <text x="386" y="151" fill="#475569" fontSize="13" fontWeight="800">vL</text>
      <text x="287" y="222" fill="#475569" fontSize="13" fontWeight="800">Inductor coil with current reference</text>
    </g>
  );
}

function VoltageSourceStaticDiagram() {
  return (
    <g>
      <StaticWire d="M224 65H350M506 65H558V194H224V145" />
      <circle cx="224" cy="105" r="40" fill="#fff" stroke="#111827" strokeWidth="5" />
      <StaticWire d="M224 145V194" />
      <text x="214" y="99" fill="#dc2626" fontSize="23" fontWeight="900">+</text>
      <text x="218" y="127" fill="#2563eb" fontSize="23" fontWeight="900">-</text>
      <text x="192" y="164" fill="#0f172a" fontSize="14" fontWeight="900">Vs</text>
      <StaticResistor x={350} y={65} />
      <StaticCurrentArrow d="M286 38H466" label="load current" x={331} y={29} />
      <text x="305" y="222" fill="#475569" fontSize="13" fontWeight="800">Ideal voltage source feeding a load</text>
    </g>
  );
}

function CurrentSourceStaticDiagram() {
  return (
    <g>
      <StaticWire d="M224 65H350M506 65H558V194H224V145" />
      <circle cx="224" cy="105" r="40" fill="#fff" stroke="#111827" strokeWidth="5" />
      <path d="M224 127V82" stroke="#059669" strokeWidth="5" strokeLinecap="round" markerEnd="url(#ceStaticArrow)" />
      <StaticWire d="M224 145V194" />
      <text x="190" y="164" fill="#0f172a" fontSize="14" fontWeight="900">Is</text>
      <StaticResistor x={350} y={65} />
      <text x="319" y="222" fill="#475569" fontSize="13" fontWeight="800">Current source setting branch current</text>
    </g>
  );
}

function DependentSourceStaticDiagram() {
  return (
    <g>
      <circle cx="166" cy="121" r="33" fill="#fff" stroke="#111827" strokeWidth="4" />
      <text x="143" y="126" fill="#154a96" fontSize="15" fontWeight="900">Vin</text>
      <path d="M201 121H310" fill="none" stroke="#7c3aed" strokeWidth="3.5" strokeDasharray="8 7" />
      <text x="212" y="100" fill="#7c3aed" fontSize="13" fontWeight="900">control</text>
      <polygon points="416,57 500,121 416,185 332,121" fill="#fff" stroke="#111827" strokeWidth="5" />
      <text x="386" y="116" fill="#7c3aed" fontSize="14" fontWeight="900">A Vin</text>
      <text x="385" y="138" fill="#475569" fontSize="12" fontWeight="800">VCVS</text>
      <StaticWire d="M500 93H560M500 149H560" />
      <text x="570" y="99" fill="#dc2626" fontSize="19" fontWeight="900">+</text>
      <text x="570" y="156" fill="#2563eb" fontSize="19" fontWeight="900">-</text>
      <text x="356" y="222" fill="#475569" fontSize="13" fontWeight="800">Diamond symbol marks a dependent source</text>
    </g>
  );
}

function SourceTransformationStaticDiagram() {
  return (
    <g>
      <text x="112" y="35" fill="#0f172a" fontSize="14" fontWeight="900">Voltage form</text>
      <circle cx="118" cy="110" r="31" fill="#fff" stroke="#111827" strokeWidth="4" />
      <text x="108" y="105" fill="#dc2626" fontSize="18" fontWeight="900">+</text>
      <text x="111" y="129" fill="#2563eb" fontSize="18" fontWeight="900">-</text>
      <StaticWire d="M149 110H184M340 110H366V190H118V141" />
      <StaticResistor x={184} y={110} />
      <circle cx="366" cy="110" r="5" fill="#154a96" />
      <circle cx="366" cy="190" r="5" fill="#154a96" />
      <text x="300" y="217" fill="#475569" fontSize="12" fontWeight="800">load terminals</text>
      <path d="M386 120H446" stroke="#059669" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceStaticArrow)" />
      <text x="392" y="104" fill="#047857" fontSize="13" fontWeight="900">I = V / R</text>
      <text x="502" y="35" fill="#0f172a" fontSize="14" fontWeight="900">Current form</text>
      <circle cx="514" cy="133" r="31" fill="#fff" stroke="#111827" strokeWidth="4" />
      <path d="M514 153V111" stroke="#059669" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceStaticArrow)" />
      <StaticWire d="M545 133H626V190H482V133H483" />
      <StaticWire d="M545 78H626V133" />
      <StaticResistor x={548} y={78} />
      <circle cx="626" cy="133" r="5" fill="#154a96" />
      <circle cx="626" cy="190" r="5" fill="#154a96" />
    </g>
  );
}

function CircuitElementMotionDiagram({ title, steps = [] }) {
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = Math.min(steps.length || 4, 4);
  const isResistor = title === "Resistor";
  const isCapacitor = title === "Capacitor";
  const isInductor = title === "Inductor";
  const isVoltageSource = title === "Independent Voltage Source";
  const isCurrentSource = title === "Independent Current Source";
  const isDependentSource = title === "Dependent Source";
  const isTransformation = title === "Source Transformation";

  useEffect(() => {
    if (totalSteps <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveStep((currentStep) =>
        currentStep >= totalSteps ? 1 : currentStep + 1
      );
    }, 6200);

    return () => window.clearInterval(timer);
  }, [totalSteps]);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
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
          animation: cePulse 4.2s ease-in-out infinite;
        }

        .ce-cap-plate {
          animation: cePlateCharge 6.4s ease-in-out infinite;
        }

        .ce-field {
          animation: ceField 6.4s ease-in-out infinite;
        }

        .ce-magnetic-ring-one {
          animation: ceRingOne 7s ease-in-out infinite;
        }

        .ce-magnetic-ring-two {
          animation: ceRingTwo 7s ease-in-out infinite;
        }

        .ce-source-push {
          animation: cePush 6s ease-in-out infinite;
        }

        .ce-control-signal {
          stroke-dasharray: 9 9;
          animation: ceDash 3.6s linear infinite;
        }

        .ce-transform-left {
          animation: none;
        }

        .ce-transform-right {
          animation: none;
        }

        .ce-voltage-drop {
          animation: ceVoltageDrop 6.2s ease-in-out infinite;
        }

        .ce-heat-line {
          animation: ceHeatRise 5.2s ease-in-out infinite;
        }

        .ce-resistor-atom {
          animation: ceAtomVibrate 1.8s ease-in-out infinite;
        }

        .ce-collision-flash {
          animation: ceCollisionFlash 6s ease-in-out infinite;
        }

        .ce-energy-pulse {
          animation: none;
        }

        .ce-field-transfer {
          opacity: 0.72;
        }

        .ce-guide-card {
          transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .ce-guide-card-active {
          box-shadow: 0 8px 20px rgba(21, 74, 150, 0.14);
          transform: translateY(-1px);
        }

        .ce-stage-1,
        .ce-stage-2,
        .ce-stage-3,
        .ce-stage-4 {
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .ce-step-1 .ce-stage-1,
        .ce-step-2 .ce-stage-1,
        .ce-step-2 .ce-stage-2,
        .ce-step-3 .ce-stage-1,
        .ce-step-3 .ce-stage-2,
        .ce-step-3 .ce-stage-3,
        .ce-step-4 .ce-stage-1,
        .ce-step-4 .ce-stage-2,
        .ce-step-4 .ce-stage-3,
        .ce-step-4 .ce-stage-4 {
          opacity: 1;
        }

        .ce-cap-current {
          animation: ceCapCurrent 10.5s ease-in-out infinite;
        }

        .ce-cap-charge-meter {
          transform-origin: 150px 270px;
          animation: ceCapMeter 10.5s ease-in-out infinite;
        }

        .ce-inductor-current-meter {
          transform-origin: 150px 270px;
          animation: ceInductorMeter 10.5s ease-in-out infinite;
        }

        .ce-back-emf {
          animation: ceBackEmf 10.5s ease-in-out infinite;
        }

        .ce-variable-load {
          animation: ceVariableLoad 8.5s ease-in-out infinite;
        }

        .ce-vout-meter {
          transform-origin: 430px 270px;
          animation: ceVariableMeter 8.5s ease-in-out infinite;
        }

        .ce-fixed-meter {
          transform-origin: 150px 270px;
          animation: ceFixedMeter 8.5s ease-in-out infinite;
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

      <h4 className="text-center text-sm font-black uppercase tracking-wide text-[#071b58] sm:text-base">
        Animated Circuit View: {title}
      </h4>
      <p className="mx-auto mt-2 max-w-3xl rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-center text-xs font-bold leading-5 text-blue-700">
        Follow the moving charge, the marked voltage polarity, and the energy effect shown for each element.
      </p>

      <div className="mt-3 grid gap-2.5 border-t border-slate-200 pt-3">
        <div className="min-w-0 overflow-x-auto overscroll-x-contain">
          <svg
            viewBox="0 0 640 330"
            className="mx-auto h-auto w-full max-w-full md:w-[62%]"
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
              <marker id="ceGreenArrow" markerWidth="6" markerHeight="6" refX="5.5" refY="3" orient="auto">
                <path d="M0 0 6 3 0 6Z" fill="#059669" />
              </marker>
              <marker id="cePurpleArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0 0 8 4 0 8Z" fill="#7c3aed" />
              </marker>
            </defs>

            <rect x="18" y="18" width="604" height="294" rx="22" fill="#ffffff" stroke="#e2e8f0" />

            <g className={`ce-step-${activeStep}`}>
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
            </g>
          </svg>
        </div>

        <CircuitAnimationStepCards
          steps={steps}
          activeStep={activeStep}
          onSelectStep={setActiveStep}
        />
      </div>
    </div>
  );
}

export function CircuitElementVisualizationGallery() {
  return (
    <div className="grid gap-3">
      {circuitElementSections.map((section) => (
        <CircuitElementMotionDiagram
          key={section.title}
          title={section.title}
          steps={section.visualSteps}
        />
      ))}
    </div>
  );
}

function getStepNumber(label = "", index = 0) {
  const match = label.match(/\d+/);
  return match ? match[0] : String(index + 1);
}

function toSectionId(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCompactStepTitle(title = "") {
  return title
    .replace("Power Flow / Energy Transfer", "Energy Transfer")
    .replace("Constant Flow Is Maintained", "Constant Flow")
    .replace("Current Becomes Steady", "Steady Current")
    .replace("Original Source Form", "Original Form")
    .replace("Equivalent Source Form", "Equivalent Form");
}

function CircuitAnimationStepCards({ steps = [], activeStep = 1, onSelectStep }) {
  const displaySteps = steps.slice(0, 4);

  if (!displaySteps.length) {
    return null;
  }

  return (
    <div className="grid gap-1.5 sm:grid-cols-2 xl:grid-cols-4">
      {displaySteps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = activeStep === stepNumber;

        return (
          <button
            type="button"
            key={`${step.label}-${step.title}`}
            onClick={() => onSelectStep?.(stepNumber)}
            aria-pressed={isActive}
            className={`ce-guide-card rounded-md border px-2.5 py-2 text-left shadow-sm ${
              isActive
                ? "ce-guide-card-active border-portal-600 bg-blue-50"
                : "border-slate-300 bg-white"
            }`}
          >
            <p className="text-[9px] font-black uppercase tracking-[0.06em] text-portal-800">
              Step {getStepNumber(step.label, index)}: {getCompactStepTitle(step.title)}
            </p>
            <p className="mt-0.5 text-[11px] font-bold leading-4 text-slate-950">
              {step.text}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function MovingCharges({ path, count = 3, color = "#2563eb", duration = 9 }) {
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

function ResistorCurrentDots({ path, count = 4, duration = 18 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <circle key={`resistor-current-dot-${index}`} className="ce-charge" r="6" fill="#2563eb">
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
  const loopPath = "M118 225V248H530V92H430H275H118V155";
  const resistorPath = "M430 92H411L401 112L381 72L361 112L341 72L321 112L301 72L291 92H275";

  return (
    <g>
      <g className="ce-stage-1">
        <BatterySymbol x={82} y={156} />
        <path className="ce-wire" d="M118 156V92H275" />
        <path className="ce-wire" d="M430 92H530V248H118V226" />
        <path className="ce-wire" d="M158 191H118" />
        <path
          d="M275 92h18l10-20 20 40 20-40 20 40 20-40 10 20h18"
          fill="none"
          stroke="#111827"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="321" y="132" fill="#111827" fontSize="14" fontWeight="900">R</text>
        <path d="M238 45H322" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" markerEnd="url(#ceArrow)" />
        <rect x="58" y="32" width="134" height="26" rx="8" fill="#fff1f2" stroke="#fecdd3" />
        <text x="70" y="50" fill="#dc2626" fontSize="11" fontWeight="900">current direction</text>
        <path d="M456 111H430" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <path d="M272 111H246" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <rect x="438" y="128" width="106" height="25" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="451" y="145" fill="#1d4ed8" fontSize="11" fontWeight="900">same current</text>
        <ResistorCurrentDots path={loopPath} count={6} duration={15} />
      </g>

      <g className="ce-stage-2">
        <path className="ce-voltage-drop" d="M276 144H430" stroke="#fbbf24" strokeWidth="17" strokeLinecap="round" opacity="0.34" />
        <path d="M282 143C316 165 390 165 424 143" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <text x="268" y="78" fill="#dc2626" fontSize="20" fontWeight="900">+</text>
        <text x="430" y="78" fill="#2563eb" fontSize="20" fontWeight="900">-</text>
        <rect x="58" y="270" width="166" height="38" rx="10" fill="#fffbeb" stroke="#fde68a" />
        <text x="72" y="287" fill="#b45309" fontSize="11" fontWeight="900">voltage drop across R</text>
        <text x="72" y="302" fill="#b45309" fontSize="10" fontWeight="800">field energy converts here</text>
      </g>

      <g className="ce-stage-3">
        <rect x="286" y="62" width="132" height="60" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" opacity="0.82" />
        {[304, 328, 352, 376, 400].map((x, index) => (
          <circle
            key={`resistor-lattice-${x}`}
            className="ce-resistor-atom"
            cx={x}
            cy={index % 2 ? 102 : 82}
            r="5"
            fill="#64748b"
          />
        ))}
        {[0, 1, 2].map((index) => (
          <circle key={`resistor-scatter-${index}`} className="ce-charge" r="5" fill="#2563eb">
            <animateMotion
              dur="7s"
              begin={`-${index * 2.25}s`}
              repeatCount="indefinite"
              path={resistorPath}
            />
          </circle>
        ))}
        {[310, 354, 397].map((x, index) => (
          <circle
            key={`collision-${x}`}
            className="ce-collision-flash"
            cx={x}
            cy={index === 1 ? 76 : 108}
            r="9"
            fill="#f97316"
            filter="url(#ceGlow)"
            style={{ animationDelay: `${index * 0.55}s` }}
          />
        ))}
        <rect x="238" y="270" width="172" height="38" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="252" y="287" fill="#475569" fontSize="11" fontWeight="900">resistive material</text>
        <text x="252" y="302" fill="#475569" fontSize="10" fontWeight="800">scatters moving charge</text>
      </g>

      <g className="ce-stage-4">
        <path
          className="ce-resistor-glow"
          d="M275 92h18l10-20 20 40 20-40 20 40 20-40 10 20h18"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ceGlow)"
        />
        <path className="ce-heat-line" d="M306 56C296 39 315 34 305 18" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        <path className="ce-heat-line" d="M342 56C332 39 351 34 341 18" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" style={{ animationDelay: "0.22s" }} />
        <path className="ce-heat-line" d="M378 56C368 39 387 34 377 18" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" style={{ animationDelay: "0.44s" }} />
        <path className="ce-heat-line" d="M414 56C404 39 423 34 413 18" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" style={{ animationDelay: "0.66s" }} />
        <rect x="424" y="270" width="156" height="38" rx="10" fill="#fff7ed" stroke="#fdba74" />
        <text x="438" y="287" fill="#9a3412" fontSize="11" fontWeight="900">heat loss: p = vi</text>
        <text x="438" y="302" fill="#9a3412" fontSize="10" fontWeight="800">thermal energy</text>
      </g>
    </g>
  );
}

function CapacitorWorkingScene() {
  return (
    <g>
      <g className="ce-stage-1">
        <BatterySymbol x={82} y={156} />
        <path className="ce-wire" d="M118 156V92H304" />
        <path className="ce-wire" d="M386 92H530V248H118V226" />
        <path className="ce-wire" d="M158 191H118" />
        <path d="M320 48V136M370 48V136" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
        <text x="314" y="154" fill="#111827" fontSize="14" fontWeight="900">capacitor plates</text>
        <path className="ce-cap-current" d="M238 44H310" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" markerEnd="url(#ceArrow)" />
        <text x="68" y="50" fill="#dc2626" fontSize="11" fontWeight="900">temporary charging current</text>
        <MovingCharges path="M118 226V248H530V92H386" count={4} duration={8} color="#2563eb" />
        <MovingCharges path="M118 156V92H304" count={3} duration={7} color="#2563eb" />
      </g>

      <g className="ce-stage-2">
        {[60, 78, 96, 114].map((y) => (
          <text key={`positive-plate-${y}`} className="ce-cap-plate" x="292" y={y} fill="#dc2626" fontSize="18" fontWeight="900">+</text>
        ))}
        {[60, 78, 96, 114].map((y) => (
          <text key={`negative-plate-${y}`} className="ce-cap-plate" x="382" y={y} fill="#2563eb" fontSize="20" fontWeight="900">-</text>
        ))}
        <rect x="304" y="270" width="178" height="38" rx="10" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="318" y="287" fill="#1d4ed8" fontSize="11" fontWeight="900">charge collects on plates</text>
        <text x="318" y="302" fill="#1d4ed8" fontSize="10" fontWeight="800">no charge crosses the gap</text>
      </g>

      <g className="ce-stage-3">
        <rect x="326" y="54" width="38" height="76" rx="12" fill="#dbeafe" opacity="0.45" />
        <path className="ce-field" d="M332 62H358M332 78H358M332 94H358M332 110H358M332 126H358" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <rect x="486" y="270" width="120" height="38" rx="10" fill="#ecfeff" stroke="#a5f3fc" />
        <text x="500" y="287" fill="#0e7490" fontSize="11" fontWeight="900">electric field</text>
        <text x="500" y="302" fill="#0e7490" fontSize="10" fontWeight="800">stored energy</text>
        <MeterBar x={238} y={224} width={148} label="Vc rises" fill="#2563eb" className="ce-cap-charge-meter" />
      </g>

      <g className="ce-stage-4">
        <path d="M286 176H404" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        <path d="M330 162l30 30M360 162l-30 30" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        <rect x="58" y="270" width="222" height="38" rx="10" fill="#fff7ed" stroke="#fdba74" />
        <text x="72" y="287" fill="#9a3412" fontSize="11" fontWeight="900">DC steady state: open circuit</text>
        <text x="72" y="302" fill="#9a3412" fontSize="10" fontWeight="800">charging current fades to zero</text>
      </g>
    </g>
  );
}

function InductorWorkingScene() {
  return (
    <g>
      <g className="ce-stage-1">
        <BatterySymbol x={82} y={156} />
        <path className="ce-wire" d="M118 156V92H286" />
        <path className="ce-wire" d="M410 92H530V248H118V226" />
        <path className="ce-wire" d="M158 191H118" />
        <path d="M286 92c8-30 26 30 38 0s26 30 38 0 26 30 38 0" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
        <text x="328" y="135" fill="#111827" fontSize="14" fontWeight="900">L</text>
        <path d="M238 45H322" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <rect x="58" y="32" width="150" height="26" rx="8" fill="#ecfdf5" stroke="#bbf7d0" />
        <text x="72" y="50" fill="#047857" fontSize="11" fontWeight="900">current starts rising</text>
        <MovingCharges path="M118 226V248H530V92H410H286H118V156" count={4} duration={10.5} color="#059669" />
        <MeterBar x={238} y={224} width={148} label="current ramps up" fill="#10b981" className="ce-inductor-current-meter" />
      </g>

      <g className="ce-stage-2">
        <g transform="translate(348 92)">
          <circle className="ce-magnetic-ring-one" cx="0" cy="0" r="43" fill="none" stroke="#10b981" strokeWidth="3" />
          <circle className="ce-magnetic-ring-two" cx="0" cy="0" r="62" fill="none" stroke="#10b981" strokeWidth="2.4" />
          <circle cx="0" cy="0" r="78" fill="none" stroke="#10b981" strokeWidth="1.8" opacity="0.2" />
        </g>
        <rect x="58" y="270" width="180" height="38" rx="10" fill="#ecfdf5" stroke="#bbf7d0" />
        <text x="72" y="287" fill="#047857" fontSize="11" fontWeight="900">magnetic field grows</text>
        <text x="72" y="302" fill="#047857" fontSize="10" fontWeight="800">energy stores around coil</text>
      </g>

      <g className="ce-stage-3">
        <path className="ce-back-emf" d="M432 156H284" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceArrow)" />
        <text x="424" y="142" fill="#dc2626" fontSize="16" fontWeight="900">+</text>
        <text x="276" y="142" fill="#2563eb" fontSize="16" fontWeight="900">-</text>
        <rect x="254" y="270" width="164" height="38" rx="10" fill="#fff1f2" stroke="#fecdd3" />
        <text x="268" y="287" fill="#be123c" fontSize="11" fontWeight="900">back EMF opposes</text>
        <text x="268" y="302" fill="#be123c" fontSize="10" fontWeight="800">rapid current change</text>
      </g>

      <g className="ce-stage-4">
        <path d="M238 176H462" stroke="#10b981" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <text x="470" y="181" fill="#047857" fontSize="12" fontWeight="900">steady I</text>
        <rect x="432" y="270" width="150" height="38" rx="10" fill="#f0fdf4" stroke="#86efac" />
        <text x="446" y="287" fill="#166534" fontSize="11" fontWeight="900">steady current</text>
        <text x="446" y="302" fill="#166534" fontSize="10" fontWeight="800">stored field remains</text>
      </g>
    </g>
  );
}

function VoltageSourceWorkingScene() {
  return (
    <g>
      <g className="ce-stage-1">
        <circle cx="120" cy="165" r="38" fill="#eff6ff" stroke="#111827" strokeWidth="4" />
        <text x="106" y="158" fill="#dc2626" fontSize="23" fontWeight="900">+</text>
        <text x="110" y="187" fill="#2563eb" fontSize="23" fontWeight="900">-</text>
        <path className="ce-wire" d="M158 165H285V92H510V238H285V165" />
        <text x="82" y="110" fill="#0f172a" fontSize="14" fontWeight="900">ideal V source</text>
        <rect x="58" y="270" width="154" height="38" rx="10" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="72" y="287" fill="#1d4ed8" fontSize="11" fontWeight="900">terminal voltage set</text>
        <text x="72" y="302" fill="#1d4ed8" fontSize="10" fontWeight="800">V = constant</text>
      </g>

      <g className="ce-stage-2">
        <MovingCharges path="M158 165H285V92H510V238H285V165" count={4} duration={9.5} color="#2563eb" />
        <path className="ce-source-push" d="M204 58H472" stroke="#059669" strokeWidth="5" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <rect x="226" y="270" width="154" height="38" rx="10" fill="#ecfdf5" stroke="#bbf7d0" />
        <text x="240" y="287" fill="#047857" fontSize="11" fontWeight="900">electrical push</text>
        <text x="240" y="302" fill="#047857" fontSize="10" fontWeight="800">charges move in loop</text>
      </g>

      <g className="ce-stage-3">
        <path className="ce-variable-load" d="M510 92v18l-18 10 36 20-36 20 36 20-36 20 18 10v28" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M468 132H528" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <MeterBar x={392} y={270} width={126} label="I changes with load" fill="#f59e0b" className="ce-vout-meter" />
      </g>

      <g className="ce-stage-4">
        <MeterBar x={238} y={222} width={148} label="V stays fixed" fill="#2563eb" className="ce-fixed-meter" />
        <rect x="532" y="270" width="74" height="38" rx="10" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="544" y="287" fill="#1d4ed8" fontSize="11" fontWeight="900">fixed V</text>
        <text x="544" y="302" fill="#1d4ed8" fontSize="10" fontWeight="800">12 V</text>
      </g>
    </g>
  );
}

function CurrentSourceWorkingScene() {
  return (
    <g>
      <g className="ce-stage-1">
        <circle cx="120" cy="165" r="38" fill="#ecfdf5" stroke="#111827" strokeWidth="4" />
        <path d="M120 190V138" stroke="#059669" strokeWidth="6" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <path className="ce-wire" d="M158 165H285V92H510V238H285V165" />
        <text x="82" y="110" fill="#0f172a" fontSize="14" fontWeight="900">ideal I source</text>
        <rect x="58" y="270" width="154" height="38" rx="10" fill="#ecfdf5" stroke="#bbf7d0" />
        <text x="72" y="287" fill="#047857" fontSize="11" fontWeight="900">current value set</text>
        <text x="72" y="302" fill="#047857" fontSize="10" fontWeight="800">I = constant</text>
      </g>

      <g className="ce-stage-2">
        <MovingCharges path="M158 165H285V92H510V238H285V165" count={6} duration={9} color="#059669" />
        <path d="M206 58H472" stroke="#059669" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <rect x="226" y="270" width="154" height="38" rx="10" fill="#f0fdf4" stroke="#86efac" />
        <text x="240" y="287" fill="#166534" fontSize="11" fontWeight="900">constant flow</text>
        <text x="240" y="302" fill="#166534" fontSize="10" fontWeight="800">equal dot spacing</text>
      </g>

      <g className="ce-stage-3">
        <path className="ce-variable-load" d="M510 92v18l-18 10 36 20-36 20 36 20-36 20 18 10v28" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M538 104h34M538 238h34" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        <text x="548" y="91" fill="#b45309" fontSize="11" fontWeight="900">load changes</text>
        <MeterBar x={392} y={270} width={126} label="I stays fixed" fill="#059669" className="ce-fixed-meter" />
      </g>

      <g className="ce-stage-4">
        <path d="M82 120h76M82 210h76" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
        <text x="64" y="125" fill="#dc2626" fontSize="16" fontWeight="900">+</text>
        <text x="64" y="215" fill="#2563eb" fontSize="16" fontWeight="900">-</text>
        <MeterBar x={238} y={222} width={148} label="source V adjusts" fill="#f59e0b" className="ce-vout-meter" />
        <rect x="532" y="270" width="74" height="38" rx="10" fill="#fff7ed" stroke="#fdba74" />
        <text x="544" y="287" fill="#b45309" fontSize="11" fontWeight="900">V adjusts</text>
        <text x="544" y="302" fill="#b45309" fontSize="10" fontWeight="800">limits</text>
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
        <rect x="56" y="72" width="170" height="142" rx="18" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
        <text x="82" y="98" fill="#0f172a" fontSize="13" fontWeight="900">input reference</text>
        <circle cx="142" cy="145" r="31" fill="#ffffff" stroke="#111827" strokeWidth="4" />
        <text x="124" y="151" fill="#2563eb" fontSize="16" fontWeight="900">Vin</text>
        <path d="M172 126h24" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        <path d="M184 114v24" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        <path d="M88 166h24" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
        <text x="74" y="202" fill="#2563eb" fontSize="12" fontWeight="900">small control voltage</text>
      </g>

      <g className="ce-stage-2">
        <path className="ce-control-signal" d="M214 145C264 86 320 86 370 132" fill="none" stroke="#7c3aed" strokeWidth="4" />
        <rect x="238" y="64" width="140" height="34" rx="10" fill="#f5f3ff" stroke="#ddd6fe" />
        <text x="252" y="85" fill="#7c3aed" fontSize="12" fontWeight="900">control relation only</text>
        <text x="252" y="118" fill="#64748b" fontSize="11" fontWeight="800">no output power flows here</text>
      </g>

      <g className="ce-stage-3">
        <polygon points="426,90 498,132 426,174 354,132" fill="#f5f3ff" stroke="#111827" strokeWidth="4" />
        <text x="402" y="124" fill="#7c3aed" fontSize="14" fontWeight="900">VCVS</text>
        <text x="384" y="145" fill="#7c3aed" fontSize="13" fontWeight="900">Vout = A Vin</text>
        <path d="M498 112h35M498 152h35" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
        <text x="536" y="116" fill="#dc2626" fontSize="18" fontWeight="900">+</text>
        <text x="536" y="158" fill="#2563eb" fontSize="18" fontWeight="900">-</text>
        <rect x="338" y="198" width="224" height="34" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="354" y="220" fill="#475569" fontSize="12" fontWeight="900">output polarity defines Vout</text>
      </g>

      <g className="ce-stage-4">
        <path d="M426 68V44H520" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M426 196V220H520" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="526" y="49" fill="#dc2626" fontSize="13" fontWeight="900">+V supply</text>
        <text x="526" y="225" fill="#2563eb" fontSize="13" fontWeight="900">-V supply</text>
        <path className="ce-wire" d="M533 112H580V236H360V152H354" />
        <path className="ce-variable-load" d="M580 112v16l-17 10 34 18-34 18 34 18-34 18 17 10v16" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M424 236H550" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" markerEnd="url(#cePurpleArrow)" />
        <rect x="266" y="264" width="270" height="42" rx="12" fill="#f5f3ff" stroke="#ddd6fe" />
        <text x="284" y="282" fill="#7c3aed" fontSize="12" fontWeight="900">supply rails provide real output power</text>
        <text x="284" y="299" fill="#7c3aed" fontSize="11" fontWeight="800">Vin controls Vout; it does not power the load</text>
      </g>
    </g>
  );
}

function SourceTransformationScene() {
  return (
    <g>
      <g className="ce-stage-1">
        <rect x="54" y="56" width="230" height="170" rx="18" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
        <text x="76" y="82" fill="#0f172a" fontSize="13" fontWeight="900">original form</text>
        <circle cx="116" cy="140" r="29" fill="#ffffff" stroke="#111827" strokeWidth="4" />
        <text x="104" y="134" fill="#dc2626" fontSize="18" fontWeight="900">+</text>
        <text x="107" y="159" fill="#2563eb" fontSize="18" fontWeight="900">-</text>
        <text x="93" y="184" fill="#1d4ed8" fontSize="12" fontWeight="900">V</text>
        <path className="ce-wire" d="M145 140H184" />
        <path d="M184 140h12l8-14 16 28 16-28 16 28 8-14h16" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="222" y="116" fill="#0f172a" fontSize="13" fontWeight="900">R</text>
        <path className="ce-wire" d="M86 140H70V210H272V140H260" />
        <circle cx="272" cy="140" r="5" fill="#154a96" />
        <circle cx="272" cy="210" r="5" fill="#154a96" />
        <text x="246" y="242" fill="#154a96" fontSize="11" fontWeight="900">load terminals</text>
      </g>

      <g className="ce-stage-2">
        <path d="M300 142H346" stroke="#059669" strokeWidth="4" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <rect x="282" y="170" width="92" height="42" rx="12" fill="#ecfdf5" stroke="#bbf7d0" />
        <text x="296" y="187" fill="#047857" fontSize="12" fontWeight="900">convert</text>
        <text x="296" y="204" fill="#047857" fontSize="12" fontWeight="900">I = V / R</text>
      </g>

      <g className="ce-stage-3">
        <rect x="378" y="56" width="208" height="170" rx="18" fill="#ecfdf5" stroke="#bbf7d0" strokeWidth="2" />
        <text x="402" y="82" fill="#0f172a" fontSize="13" fontWeight="900">equivalent form</text>
        <circle cx="438" cy="158" r="28" fill="#ffffff" stroke="#111827" strokeWidth="4" />
        <path d="M438 177V139" stroke="#059669" strokeWidth="5" strokeLinecap="round" markerEnd="url(#ceGreenArrow)" />
        <text x="426" y="204" fill="#047857" fontSize="12" fontWeight="900">I</text>
        <path className="ce-wire" d="M466 158H552V210H394V158H410" />
        <path className="ce-wire" d="M466 108H552V158" />
        <path d="M552 108v12l14 8-28 16 28 16-28 16 14 8v12" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="520" y="96" fill="#0f172a" fontSize="13" fontWeight="900">R</text>
        <circle cx="552" cy="158" r="5" fill="#154a96" />
        <circle cx="552" cy="210" r="5" fill="#154a96" />
      </g>

      <g className="ce-stage-4">
        <path d="M272 140C344 244 480 244 552 158" fill="none" stroke="#154a96" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8" />
        <path d="M272 210H552" fill="none" stroke="#154a96" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8" />
        <rect x="174" y="270" width="292" height="38" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="196" y="287" fill="#0f172a" fontSize="12" fontWeight="900">same external terminal V-I behavior</text>
        <text x="196" y="302" fill="#475569" fontSize="10" fontWeight="800">the load cannot tell which internal form is used</text>
      </g>
    </g>
  );
}

function LearningHookPanel() {
  return (
    <section className="mt-5 rounded-2xl border border-blue-200 bg-blue-50/80 p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-portal-700">
            Circuit reading path
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Understand circuit elements from normal circuit diagrams.
          </h2>
          <p className="mt-2 max-w-3xl text-sm font-semibold leading-7 text-slate-800">
            See how resistors, capacitors, inductors, and sources affect current,
            voltage, power, and stored energy before solving exam problems.
          </p>
        </div>
        <div className="grid gap-2 text-sm font-bold text-slate-800">
          {["Read the source symbol", "Check current and polarity", "Remember the formula", "Try exam MCQs"].map((item, index) => (
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
    <Layout
      title="Circuit Elements GATE ECE Quick Notes + Formulas + PYQs | Network Analysis"
      description="Network Analysis circuit elements notes for GATE ECE: resistor, capacitor, inductor, independent voltage source, independent current source, dependent source, controlled sources, and source transformation."
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1440px] pb-24">
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
              <Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Notes</Link>
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
          <NetworkTopicMenu currentPath="/circuit-elements" />
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Network Analysis / Circuit Elements
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Understand Circuit Elements with normal circuit diagrams
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
              Download Quick Notes
            </Link>
            <Link
              href="/circuit-laws"
              className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Next Topic
            </Link>
          </div>
        </section>

        <LearningHookPanel />

        <section id="circuit-elements-list" className="mt-5 grid gap-3">
          {circuitElementSections.map((section, index) => (
            <ElementCard key={section.title} section={section} index={index} />
          ))}
        </section>

        <CircuitElementsQuickSummary />
        <ExamRetentionSection />

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
            Download Quick Notes
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
