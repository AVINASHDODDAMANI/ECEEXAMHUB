import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "../../components/layout";
import { buildBreadcrumbList } from "../../lib/seo";

const circuitElementDetails = [
  {
    slug: "resistor",
    title: "Resistor",
    intro: "A resistor sets the overall current in a circuit and converts electrical energy into heat.",
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
      ["Step 1", "Electron Flow", "Blue dots show charge moving around the closed circuit. In this series loop, the same current passes before and after the resistor."],
      ["Step 2", "Voltage Drop / Field Energy", "The + and - marks across the resistor show voltage drop. Electrical energy is used in the resistor, not current."],
      ["Step 3", "Resistive Material", "The resistor material causes stronger scattering of charge motion than an ideal wire."],
      ["Step 4", "Heat Loss", "The voltage drop and current mean power is dissipated: p = vi. That electrical energy is converted mainly into heat."],
    ],
  },
  {
    slug: "capacitor",
    title: "Capacitor",
    intro: "A capacitor stores energy between two plates and does not like sudden voltage changes.",
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
      ["Step 1", "Charging Current Starts", "When the source is connected, electrons move in the external wire and charging current flows for a short time."],
      ["Step 2", "Charges Collect On Plates", "Opposite charges accumulate on the two capacitor plates. Charge does not cross the insulating gap."],
      ["Step 3", "Electric Field Builds", "As charge increases, the electric field between the plates becomes stronger and energy is stored."],
      ["Step 4", "DC Current Stops", "After charging, the capacitor behaves like an open circuit for DC, so current fades to zero."],
    ],
  },
  {
    slug: "inductor",
    title: "Inductor",
    intro: "An inductor stores energy in a magnetic field and does not like sudden current changes.",
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
    animation: "Show current moving through a coil while magnetic field rings grow around it.",
    visualSteps: [
      ["Step 1", "Current Starts Rising", "Current begins to flow through the coil, but it cannot jump instantly."],
      ["Step 2", "Magnetic Field Grows", "The coil stores energy by building a magnetic field around it."],
      ["Step 3", "Back EMF Opposes Change", "The inductor produces an opposing voltage whenever current tries to change quickly."],
      ["Step 4", "Current Becomes Steady", "After the transient period, current reaches a steady value and the stored magnetic energy remains."],
    ],
  },
  {
    slug: "independent-voltage-source",
    title: "Independent Voltage Source",
    intro: "A voltage source gives the circuit a fixed electrical push between two points.",
    breakdown: [
      "It sets the voltage level that drives charge through the circuit.",
      "It is used as a battery, supply rail, or input signal source.",
      "It tries to maintain its voltage even when the connected load changes.",
    ],
    formula: "V = constant",
    formulaMeaning: ["The source tries to keep the same voltage across its terminals."],
    keyIdea: "A voltage source maintains a set voltage and pushes charge through the path.",
    animation: "Show a battery creating a pressure-like push that sends current dots around the loop.",
    visualSteps: [
      ["Step 1", "Voltage Is Set", "The source fixes the potential difference between its terminals."],
      ["Step 2", "Electrical Push Appears", "The green push arrow shows the source driving charges through the circuit."],
      ["Step 3", "Load Current Changes", "When load resistance changes, the current changes according to the connected circuit."],
      ["Step 4", "Voltage Stays Fixed", "Even when current changes, the ideal source maintains the same terminal voltage."],
    ],
  },
  {
    slug: "independent-current-source",
    title: "Independent Current Source",
    intro: "A current source tries to keep the same amount of current flowing through a branch.",
    breakdown: [
      "It focuses on steady current instead of fixed voltage.",
      "It is used in biasing, transistor circuits, current mirrors, and circuit testing.",
      "The voltage may adjust, but the current tries to stay fixed within practical limits.",
    ],
    formula: "I = constant",
    formulaMeaning: ["The source tries to keep the branch current at a fixed value."],
    keyIdea: "A current source keeps current flow steady.",
    animation: "Show equally spaced current dots moving at a constant speed through one branch.",
    visualSteps: [
      ["Step 1", "Current Value Is Set", "The source fixes the amount of current that should flow through the branch."],
      ["Step 2", "Constant Flow Is Maintained", "Equally spaced moving dots show current remaining steady."],
      ["Step 3", "Load Changes", "The connected load may change, but the source still tries to maintain the same current."],
      ["Step 4", "Voltage Adjusts", "The voltage across the source adjusts as needed within practical limits."],
    ],
  },
  {
    slug: "dependent-source",
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
      ["Step 1", "Control Signal Defined", "A small voltage or current elsewhere in the circuit is identified as the controlling variable."],
      ["Step 2", "Control Relation Only", "The dashed line shows a mathematical control relation. It is not a physical path for output power."],
      ["Step 3", "Output Follows The Control", "The dependent source sets its output voltage or current based on the input control signal and gain factor."],
      ["Step 4", "External Supply Delivers Energy", "The source itself does not create energy. The extra output power comes from an external power supply."],
    ],
  },
  {
    slug: "source-transformation",
    title: "Source Transformation",
    intro: "Source transformation changes the shape of a source circuit without changing what the load sees.",
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
    animation: "Show a voltage source and series resistor morphing into a current source and parallel resistor.",
    visualSteps: [
      ["Step 1", "Original Source Form", "Start with a voltage source in series with a resistance."],
      ["Step 2", "Convert Source Value", "Use I = V / R to find the equivalent current source value."],
      ["Step 3", "Equivalent Source Form", "Draw the current source with the same resistance in parallel."],
      ["Step 4", "Same Terminal Behavior", "The outside load sees the same voltage-current behavior, even though the internal form is different."],
    ],
  },
];

function ElementSymbol() {
  return (
    <svg viewBox="0 0 620 260" className="h-auto w-full" role="img" aria-label="Circuit explanation diagram">
      <rect x="18" y="18" width="584" height="224" rx="28" fill="#fff" stroke="#d7e2ee" />
      <path d="M88 130H184M436 130H532" stroke="#154a96" strokeWidth="8" strokeLinecap="round" />
      <path d="M184 130l16-28 24 56 24-56 24 56 24-56 24 56 24-56 20 28" fill="none" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="310" cy="130" r="54" fill="#f8fbff" stroke="#137d46" strokeWidth="8" />
      <path d="M310 96v68M276 130h68" stroke="#137d46" strokeWidth="7" strokeLinecap="round" />
      <motion.circle cx="90" cy="130" r="9" fill="#2563eb" animate={{ x: [0, 440, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <text x="64" y="62" fill="#0f172a" fontSize="18" fontWeight="800">Circuit Element Model</text>
      <text x="64" y="214" fill="#475569" fontSize="15" fontWeight="700">Use the explanation below for this element only.</text>
    </svg>
  );
}

function ResistorComponentDiagram() {
  return (
    <figure className="mt-6 overflow-hidden rounded-2xl border border-amber-200 bg-[linear-gradient(135deg,#fffdf7,#fff8e8)] p-4 shadow-sm sm:p-5">
      <figcaption className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-amber-700">
            Real Component Diagram
          </p>
          <h3 className="mt-1 text-lg font-black text-slate-950">Axial Resistor</h3>
        </div>
        <span className="rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-bold text-amber-800">
          Through-hole component
        </span>
      </figcaption>

      <div className="mt-4 overflow-x-auto rounded-xl border border-amber-100 bg-white/80">
        <svg
          viewBox="0 0 900 300"
          className="mx-auto h-auto min-w-[620px] max-w-full"
          role="img"
          aria-label="Physical axial resistor showing metal leads, ceramic body, and color bands"
        >
          <defs>
            <linearGradient id="resistorBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f4d58d" />
              <stop offset="0.48" stopColor="#d8aa55" />
              <stop offset="1" stopColor="#b77a2a" />
            </linearGradient>
            <linearGradient id="metalLead" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e2e8f0" />
              <stop offset="0.5" stopColor="#64748b" />
              <stop offset="1" stopColor="#cbd5e1" />
            </linearGradient>
            <filter id="resistorShadow" x="-20%" y="-40%" width="140%" height="180%">
              <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#713f12" floodOpacity="0.2" />
            </filter>
          </defs>

          <text x="450" y="36" textAnchor="middle" fill="#0f172a" fontSize="18" fontWeight="900">
            Fixed Resistor (example: 1 kOhm +/-5%)
          </text>

          <g filter="url(#resistorShadow)">
            <path d="M72 151H292" stroke="url(#metalLead)" strokeWidth="10" strokeLinecap="round" />
            <path d="M608 151H828" stroke="url(#metalLead)" strokeWidth="10" strokeLinecap="round" />
            <path
              d="M292 112c18 0 25-25 48-25h220c23 0 30 25 48 25v78c-18 0-25 25-48 25H340c-23 0-30-25-48-25z"
              fill="url(#resistorBody)"
              stroke="#92400e"
              strokeWidth="4"
            />
            <rect x="360" y="88" width="25" height="126" rx="4" fill="#7c2d12" />
            <rect x="415" y="88" width="25" height="126" rx="4" fill="#111827" />
            <rect x="470" y="88" width="25" height="126" rx="4" fill="#dc2626" />
            <rect x="544" y="88" width="20" height="126" rx="4" fill="#d4a017" />
            <path d="M320 113c36-18 224-18 260 0" fill="none" stroke="#fff7d6" strokeWidth="7" strokeLinecap="round" opacity="0.55" />
          </g>

          <path d="M178 137V78H264" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <circle cx="178" cy="151" r="5" fill="#2563eb" />
          <text x="93" y="69" fill="#1e3a8a" fontSize="15" fontWeight="800">Metal lead</text>
          <text x="93" y="88" fill="#475569" fontSize="12" fontWeight="700">Connects to the circuit</text>

          <path d="M450 215v42" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <circle cx="450" cy="210" r="5" fill="#2563eb" />
          <text x="450" y="278" textAnchor="middle" fill="#1e3a8a" fontSize="15" fontWeight="800">
            Color bands show resistance and tolerance
          </text>

          <path d="M680 137V78H596" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <circle cx="680" cy="151" r="5" fill="#2563eb" />
          <text x="702" y="69" fill="#1e3a8a" fontSize="15" fontWeight="800">Resistive body</text>
          <text x="702" y="88" fill="#475569" fontSize="12" fontWeight="700">Dissipates energy as heat</text>
        </svg>
      </div>

      <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
        A resistor has no positive or negative terminal, so either lead can be connected in either
        direction. Its color bands identify the resistance value and tolerance.
      </p>
    </figure>
  );
}

function ResistorFullExplanation() {
  return (
    <article className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-panel">
      <div className="p-5 sm:p-6">
        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">What is a Resistor?</h2>
          <div className="mt-3 space-y-3 text-sm font-medium leading-7 text-slate-800 sm:text-base">
            <p>
              Imagine you connect a small LED directly to a battery. At first, the LED may glow
              very brightly, but after a few moments it can become damaged. Why does this happen?
            </p>
            <p>
              The battery tries to push a large amount of current through the LED. Electronic
              components are designed to work within certain limits, and excessive current can
              destroy them. To prevent this problem, we use a resistor.
            </p>
            <p>
              A resistor is an electronic component that restricts the flow of electric current
              in a circuit. In simple terms, it acts like a controller that prevents too much
              current from reaching sensitive components.
            </p>
            <p>
              It is a fundamental passive circuit element. The opposition offered by a resistor is
              called resistance, measured in ohms. Resistors appear in mobile phones, televisions,
              computers, medical equipment, communication systems, automobiles, industrial control
              systems, and power supplies.
            </p>
          </div>
        </section>

        <ResistorComponentDiagram />

        <section className="mt-6 border-t border-slate-200 pt-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Why Was a Resistor Needed?</h2>
          <div className="mt-3 space-y-3 text-sm font-medium leading-7 text-slate-800 sm:text-base">
            <p>
              As electrical systems became more complex, engineers realized that simply
              connecting wires and power sources was not enough. Different devices require
              different amounts of current and voltage to operate safely.
            </p>
            <p>For example:</p>
            <ul className="list-disc space-y-1 pl-7">
              <li>A small LED needs only a few milliamperes of current.</li>
              <li>A motor may require hundreds of milliamperes.</li>
              <li>Electronic chips often need precise current levels.</li>
            </ul>
            <p>
              Without a way to control current, many components would fail instantly. The
              resistor was developed to solve this problem by introducing opposition to current
              flow.
            </p>
          </div>
        </section>
      </div>

      <div className="border-t border-slate-200 p-5 sm:p-6">
        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">What Does a Resistor Actually Do?</h2>
          <p className="mt-3 text-sm font-medium leading-7 text-slate-800 sm:text-base">
            A resistor performs several important functions:
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-7 text-sm font-semibold leading-7 text-slate-800 sm:text-base">
            <li>Limits current flowing through a circuit.</li>
            <li>Protects electronic components from damage.</li>
            <li>Creates required voltage levels.</li>
            <li>Divides voltage into useful values.</li>
            <li>Sets operating conditions for transistors and integrated circuits.</li>
            <li>Helps control circuit behavior.</li>
            <li>Converts excess electrical energy into heat.</li>
          </ol>
          <p className="mt-3 text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Because of these functions, resistors are found in almost every electronic device,
            from mobile phones to satellites.
          </p>
        </section>

        <section className="mt-6 border-t border-slate-200 pt-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">What Happens Inside a Resistor?</h2>
          <div className="mt-3 space-y-3 text-sm font-medium leading-7 text-slate-800 sm:text-base">
            <p>
              Electric current consists of moving electrons. Inside a resistor, electrons do not
              travel as freely as they do in a copper wire.
            </p>
            <p>
              As electrons move through the resistive material, they collide with atoms. These
              collisions slow down the flow of electrons and convert part of the electrical
              energy into heat.
            </p>
            <p>This opposition offered by the material is called resistance.</p>
          </div>
        </section>

        <section className="mt-6 border-t border-slate-200 pt-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Understanding Resistance</h2>
          <div className="mt-3 space-y-3 text-sm font-medium leading-7 text-slate-800 sm:text-base">
            <p>Resistance is the property of a material that opposes electric current.</p>
            <p>Its unit is the ohm, named after <span className="font-semibold">Georg Simon Ohm</span>.</p>
            <p>
              Higher resistance allows less current to flow for the same applied voltage, while
              lower resistance allows more current to flow.
            </p>
          </div>
        </section>
      </div>

      <div className="border-t border-slate-200 bg-slate-50/70">
        <section className="p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Practical Example</h2>
          <div className="mt-3 space-y-3 text-sm font-medium leading-7 text-slate-800 sm:text-base">
            <p>Consider a 9 V battery and an LED.</p>
            <p>
              If the LED is connected directly to the battery, excessive current may flow and
              damage the LED.
            </p>
            <p>
              When a resistor is connected in series with the LED, it limits the current to a safe
              value. As a result, the LED operates normally without being damaged.
            </p>
            <p>This is one of the most common applications of a resistor in electronics.</p>
          </div>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Resistor Symbol</h2>
          <p className="mt-3 text-sm font-medium leading-7 text-slate-800 sm:text-base">
            In circuit diagrams, a resistor is represented by a symbol that indicates opposition
            to current flow and a voltage drop across its terminals.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-black text-slate-950">Zig-zag symbol</p>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 px-4 py-3 font-mono text-sm font-bold text-blue-50">----/\/\/\/\----</pre>
              <p className="mt-2 text-xs font-semibold text-slate-600">Common ANSI style.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-black text-slate-950">Rectangular symbol</p>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 px-4 py-3 font-mono text-sm font-bold text-blue-50">----[ R ]----</pre>
              <p className="mt-2 text-xs font-semibold text-slate-600">Common IEC style.</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Ohm's Law and Resistor Formula</h2>
          <p className="mt-3 text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Ohm's Law connects voltage, current, and resistance. For a linear resistor at constant
            temperature, current is directly proportional to applied voltage and inversely
            proportional to resistance.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Voltage", "V = IR", "Find voltage drop."],
              ["Current", "I = V / R", "Find current through the resistor."],
              ["Resistance", "R = V / I", "Find resistance value."],
            ].map(([label, formula, note]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-portal-700">{label}</p>
                <p className="mt-2 font-mono text-xl font-black text-slate-950">{formula}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{note}</p>
              </div>
            ))}
          </div>
          <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-slate-700 sm:grid-cols-3">
            <li>V = voltage in volts</li>
            <li>I = current in amperes</li>
            <li>R = resistance in ohms</li>
          </ul>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Types of Resistors</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {[
              ["Fixed Resistors", ["Carbon composition resistor", "Carbon film resistor", "Metal film resistor", "Wire-wound resistor"], "Used in electronic circuits, consumer electronics, and power supplies."],
              ["Variable Resistors", ["Potentiometer", "Rheostat", "Trimmer"], "Used in volume controls, light dimmers, and calibration circuits."],
              ["Special Resistors", ["Thermistor", "LDR", "Varistor"], "Resistance changes with temperature, light intensity, or applied voltage."],
            ].map(([title, items, note]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="text-lg font-black text-slate-950">{title}</h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm font-semibold leading-6 text-slate-700">
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Characteristics of Resistors</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Resistance Value", "Amount of opposition offered to current flow."],
              ["Tolerance", "Allowable variation from the marked resistance value, such as +/-1%, +/-5%, or +/-10%."],
              ["Power Rating", "Maximum power the resistor can safely dissipate, such as 0.25 W, 0.5 W, 1 W, or 5 W."],
              ["Temperature Coefficient", "How much resistance changes when temperature changes."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="text-base font-black text-slate-950">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Power Dissipation in Resistors</h2>
          <p className="mt-3 text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Whenever current flows through a resistor, electrical energy is converted into heat.
            Higher current causes greater heat generation, so the power rating must be chosen
            carefully.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {["P = VI", "P = I^2R", "P = V^2 / R"].map((formula) => (
              <div key={formula} className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-center font-mono text-xl font-black text-slate-950">
                {formula}
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Series and Parallel Resistors</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-lg font-black text-slate-950">Resistors in Series</h3>
              <p className="mt-2 font-mono text-lg font-black text-slate-950">Req = R1 + R2 + R3 + ...</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm font-semibold leading-6 text-slate-700">
                <li>Same current flows through all resistors.</li>
                <li>Total resistance increases.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-lg font-black text-slate-950">Resistors in Parallel</h3>
              <p className="mt-2 font-mono text-lg font-black text-slate-950">1 / Req = 1 / R1 + 1 / R2 + 1 / R3</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm font-semibold leading-6 text-slate-700">
                <li>Same voltage appears across each resistor.</li>
                <li>Total resistance decreases.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Solved Numerical Problems</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-base font-black text-slate-950">Problem 1</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">A 10 ohm resistor is connected across a 20 V supply. Calculate current.</p>
              <p className="mt-3 font-mono text-sm font-black text-slate-950">I = V / R = 20 / 10 = 2 A</p>
              <p className="mt-2 text-sm font-bold text-emerald-800">Answer: Current = 2 A</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="text-base font-black text-slate-950">Problem 2</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">A current of 5 A flows through a 4 ohm resistor. Calculate voltage.</p>
              <p className="mt-3 font-mono text-sm font-black text-slate-950">V = IR = 5 x 4 = 20 V</p>
              <p className="mt-2 text-sm font-bold text-emerald-800">Answer: Voltage = 20 V</p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Real-World Applications of Resistors</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Mobile Chargers", "Current regulation and voltage control."],
              ["LED Circuits", "Current limiting to prevent LED damage."],
              ["Television Circuits", "Signal conditioning and biasing."],
              ["Computers", "Voltage division and circuit protection."],
              ["Industrial Automation", "Control and sensing circuits."],
              ["Automotive Electronics", "Engine control units and lighting systems."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="text-base font-black text-slate-950">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Interview Questions</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {[
              ["What is a resistor?", "A passive component that opposes current flow."],
              ["What is the unit of resistance?", "Ohm."],
              ["State Ohm's Law.", "Voltage equals current multiplied by resistance: V = IR."],
              ["Why is a resistor connected in series with an LED?", "To limit current and protect the LED from damage."],
              ["What happens if resistance becomes zero?", "The circuit behaves like a short circuit and excessive current may flow."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-black text-slate-950">{q}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">GATE/BEL/DRDO Important Points</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              "Resistance is measured in ohms.",
              "Resistors are passive elements.",
              "Resistors do not store energy.",
              "Power is dissipated as heat.",
              "Ohm's Law is applicable to linear resistors.",
              "Series resistance increases total resistance.",
              "Parallel resistance decreases total resistance.",
              "Resistance depends on material, length, and cross-sectional area.",
            ].map((point) => (
              <p key={point} className="rounded-xl border border-portal-100 bg-portal-50 px-3 py-2 text-sm font-bold text-slate-800">{point}</p>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">MCQs with Answers</h2>
          <div className="mt-4 grid gap-3">
            {[
              ["What is the unit of resistance?", "Volt", "Ampere", "Ohm", "Watt", "C"],
              ["Which component opposes current flow?", "Capacitor", "Resistor", "Inductor", "Battery", "B"],
              ["Ohm's Law is represented as:", "V = IR", "V = I/R", "R = VI", "P = VI", "A"],
              ["A resistor is a:", "Active element", "Passive element", "Source element", "Energy generator", "B"],
              ["Resistance is measured in:", "Farad", "Henry", "Ohm", "Coulomb", "C"],
            ].map(([q, a, b, c, d, answer], index) => (
              <div key={q} className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-black text-slate-950">{index + 1}. {q}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">A) {a} &nbsp; B) {b} &nbsp; C) {c} &nbsp; D) {d}</p>
                <p className="mt-2 text-sm font-black text-emerald-800">Answer: {answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Previous Year Exam Questions</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm font-semibold leading-7 text-slate-700">
            <li>State Ohm's Law and explain its significance.</li>
            <li>Derive the expression for equivalent resistance in series circuits.</li>
            <li>Derive the expression for equivalent resistance in parallel circuits.</li>
            <li>Explain the working principle of a resistor.</li>
            <li>Compare fixed and variable resistors.</li>
            <li>Calculate power dissipated in a resistor using different formulas.</li>
          </ol>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Quick Revision Notes</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              "Resistor opposes current flow.",
              "Unit of resistance = Ohm.",
              "Ohm's Law: V = IR.",
              "Resistors are passive elements.",
              "Resistors do not store energy.",
              "Power dissipated: P = I^2R.",
              "Series connection increases resistance.",
              "Parallel connection decreases resistance.",
              "Used for current limiting and voltage division.",
              "Found in almost every electronic circuit.",
            ].map((note) => (
              <p key={note} className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-bold text-slate-800">✓ {note}</p>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Frequently Asked Questions</h2>
          <div className="mt-4 grid gap-3">
            {[
              ["What is a resistor used for?", "A resistor is used to control current, divide voltage, and protect circuit components."],
              ["What is the SI unit of resistance?", "The SI unit of resistance is ohm."],
              ["Does a resistor store energy?", "No. A resistor dissipates electrical energy as heat and does not store energy."],
              ["What is the difference between resistance and resistor?", "Resistance is the property that opposes current flow, while a resistor is the physical component designed to provide resistance."],
              ["Why are resistors important in electronic circuits?", "They make circuits safer by controlling current, regulating voltage, and protecting sensitive components from excessive current."],
            ].map(([q, a]) => (
              <details key={q} className="rounded-2xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer text-sm font-black text-slate-950">{q}</summary>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-emerald-200 bg-emerald-50/70 p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-emerald-950">Key Takeaway</h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-emerald-950 sm:text-base">
            A resistor does not stop electricity. Instead, it controls the current flowing
            through a circuit so electronic devices can operate safely and reliably.
          </p>
        </section>
      </div>
    </article>
  );
}

function DetailBox({ title, children, className = "" }) {
  return (
    <section className={`rounded-[24px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5 ${className}`}>
      <h2 className="text-xl font-black tracking-tight text-slate-950">{title}</h2>
      {children}
    </section>
  );
}

export async function getStaticPaths() {
  return {
    paths: circuitElementDetails.map((item) => ({
      params: { elementSlug: item.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const element = circuitElementDetails.find((item) => item.slug === params.elementSlug);

  return {
    props: { element },
  };
}

export default function CircuitElementDetailPage({ element }) {
  const pagePath = `/network-analysis/${element.slug}`;
  const structuredData = [
    buildBreadcrumbList([
      { name: "Home", item: "/" },
      { name: "Notes", item: "/subjects" },
      { name: "Network Analysis", item: "/subjects/network-analysis" },
      { name: "Circuit Elements", item: "/network-analysis/circuit-elements" },
      { name: element.title, item: pagePath },
    ]),
  ];

  return (
    <Layout
      title={`${element.title} in Network Analysis | ECEExamGuide`}
      description={`${element.title} explanation for Network Analysis: meaning, formula, key idea, and visual steps for ECE exam revision.`}
      canonicalUrl={pagePath}
      keywords={`${element.title} Network Analysis, Circuit Elements, ECE Circuit Elements, GATE ECE Network Analysis`}
      structuredData={structuredData}
      appendSiteName={false}
      pageClassName="py-3 sm:py-5"
    >
      <div className="mx-auto max-w-6xl pb-12">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link>
          <span className="text-slate-300">/</span>
          <Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Notes</Link>
          <span className="text-slate-300">/</span>
          <Link href="/subjects/network-analysis" className="font-medium text-slate-600 transition hover:text-portal-700">Network Analysis</Link>
          <span className="text-slate-300">/</span>
          <Link href="/network-analysis/circuit-elements" className="font-medium text-slate-600 transition hover:text-portal-700">Circuit Elements</Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-portal-700">{element.title}</span>
        </nav>

        <header className="grid gap-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-portal-700">Circuit Element Explanation</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {element.title}
            </h1>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{element.intro}</p>
            <Link
              href="/network-analysis/circuit-elements"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl border border-portal-200 bg-white px-5 py-3 text-sm font-black text-portal-700 transition hover:bg-portal-50"
            >
              Back to Circuit Elements
            </Link>
          </div>
          <ElementSymbol />
        </header>

        {element.slug === "resistor" ? (
          <ResistorFullExplanation />
        ) : (
          <>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.82fr]">
              <DetailBox title="Explanation">
                <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-700">
                  {element.breakdown.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </DetailBox>

              <DetailBox title="Formula">
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-mono text-2xl font-black text-slate-950">{element.formula}</p>
                  <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-slate-700">
                    {element.formulaMeaning.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </DetailBox>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[0.82fr_1fr]">
              <DetailBox title="Key Idea" className="border-amber-200 bg-amber-50">
                <p className="mt-3 text-sm font-bold leading-7 text-slate-900">{element.keyIdea}</p>
              </DetailBox>

              <DetailBox title="Visual Explanation Steps">
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{element.animation}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {element.visualSteps.map(([label, title, text]) => (
                    <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.12em] text-portal-700">{label}</p>
                      <h3 className="mt-1 text-base font-black text-slate-950">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
                    </article>
                  ))}
                </div>
              </DetailBox>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
