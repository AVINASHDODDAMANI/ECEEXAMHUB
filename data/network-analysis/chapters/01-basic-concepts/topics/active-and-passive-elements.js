const activeAndPassiveElements = {
  slug: "active-and-passive-elements",
  title: "Active and Passive Elements",
  summary: "Active elements can deliver energy to a network, while passive elements absorb or store energy.",
  concepts: [
  "Active element",
  "Passive element",
  "Source",
  "Load"
],
  subtopics: [
  "Voltage source",
  "Current source",
  "Resistor",
  "Capacitor",
  "Inductor"
],
  formula: {
    label: "Active and Passive Elements",
    expression: "Energy delivered or absorbed",
    note: "Active elements supply or control energy. Passive elements absorb, dissipate, store, or release supplied energy.",
  },
  examFocus: "GATE focus: Voltage source, Current source, Resistor.",
  theory: {
    definition:
      "Circuit elements are classified by their energy role. An active element can supply energy to the circuit or control energy using another circuit variable. A passive element cannot generate net energy on its own; it only absorbs, dissipates, stores, or returns energy that was supplied by an active source.",
    intuition:
      "Think of a circuit as an energy path. The source starts the energy movement. The resistor consumes energy as heat, the capacitor stores energy in an electric field, and the inductor stores energy in a magnetic field.",
    activeElements: {
      idea: "Active elements supply energy or provide controlled energy transfer.",
      examples: [
        "Ideal voltage source",
        "Ideal current source",
        "Battery",
        "Generator",
        "Dependent source",
        "Transistor or op-amp when powered by an external supply",
      ],
      keyPoint:
        "A source is active because it can maintain voltage or current and deliver power to the rest of the network.",
    },
    passiveElements: {
      idea: "Passive elements do not generate net energy. They consume, store, or release energy already present in the circuit.",
      examples: [
        "Resistor",
        "Capacitor",
        "Inductor",
        "Transformer when treated as an ideal passive energy-transfer element",
      ],
      keyPoint:
        "Resistors dissipate energy. Capacitors and inductors store energy temporarily and can return it later, but they do not create net energy.",
    },
    energyBehavior: [
      {
        element: "Resistor",
        behavior: "Dissipates electrical energy as heat.",
        relation: "P = VI = I^2R = V^2/R",
      },
      {
        element: "Capacitor",
        behavior: "Stores energy in an electric field.",
        relation: "E = 1/2 C V^2",
      },
      {
        element: "Inductor",
        behavior: "Stores energy in a magnetic field.",
        relation: "E = 1/2 L I^2",
      },
      {
        element: "Source",
        behavior: "Supplies energy to the circuit, or absorbs energy depending on operating condition.",
        relation: "P = VI with sign convention",
      },
    ],
  },
  formulas: [
    {
      label: "Resistor power",
      expression: "P = VI, V = IR, so P = I^2R",
      note: "A resistor is passive because this power is dissipated as heat.",
    },
    {
      label: "Capacitor stored energy",
      expression: "E = 1/2 C V^2",
      note: "A capacitor stores supplied energy in its electric field.",
    },
    {
      label: "Inductor stored energy",
      expression: "E = 1/2 L I^2",
      note: "An inductor stores supplied energy in its magnetic field.",
    },
  ],
  gatePointers: [
    "Voltage and current sources are active elements.",
    "R, L, and C are passive elements in ideal network analysis.",
    "A passive element may return stored energy, but it cannot generate net energy.",
    "Use passive sign convention before deciding whether an element absorbs or delivers power at a particular instant.",
  ],
  commonMistakes: [
    "Calling capacitor and inductor active because they can release stored energy.",
    "Forgetting that dependent sources are active elements in circuit modeling.",
    "Classifying an element only by current direction instead of checking energy behavior.",
    "Assuming every source always delivers power; a source can absorb power depending on terminal current direction.",
  ],
  workedExample: {
    title: "Classify elements in a simple circuit",
    prompt:
      "A battery is connected to a resistor, capacitor, and inductor. Which element is active and which are passive?",
    steps: [
      "The battery provides voltage and energy to the circuit, so it is active.",
      "The resistor dissipates energy as heat, so it is passive.",
      "The capacitor stores energy in an electric field, so it is passive.",
      "The inductor stores energy in a magnetic field, so it is passive.",
    ],
    answer:
      "Battery: active. Resistor, capacitor, and inductor: passive.",
  },
  visualization: {
    type: "active-passive-circuit-flow",
    description:
      "Show a battery supplying energy particles through a loop. The resistor glows as heat loss, the capacitor fills as electric-field storage, and the inductor shows magnetic-field rings.",
    stages: [
      {
        title: "Active source supplies",
        detail: "The battery creates voltage and pushes energy into the circuit.",
      },
      {
        title: "Resistor dissipates",
        detail: "The resistor converts electrical energy into heat.",
      },
      {
        title: "Capacitor stores",
        detail: "The capacitor stores energy in its electric field.",
      },
      {
        title: "Inductor stores",
        detail: "The inductor stores energy in its magnetic field.",
      },
      {
        title: "Energy is distributed",
        detail: "Energy flows from the active source and is used or stored by passive elements.",
      },
    ],
  },
};

export default activeAndPassiveElements;
