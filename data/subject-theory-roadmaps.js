export function getSubjectSlug(title = "") {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const subjectTheoryRoadmaps = {
  "Network Analysis": [
    {
      title: "Start with circuit variables",
      points: ["Voltage, current, power, energy", "Passive sign convention", "Independent and dependent sources"],
    },
    {
      title: "Apply basic circuit laws",
      points: ["Ohm's law", "KCL and KVL", "Series and parallel reduction"],
    },
    {
      title: "Solve using systematic methods",
      points: ["Nodal analysis", "Mesh analysis", "Source transformation"],
    },
    {
      title: "Use network theorems",
      points: ["Thevenin and Norton", "Superposition", "Maximum power transfer"],
    },
    {
      title: "Move to AC and transient circuits",
      points: ["Phasors and impedance", "First-order RC/RL response", "Resonance and filters"],
    },
  ],
  "Analog Electronics": [
    {
      title: "Understand semiconductor basics",
      points: ["PN junction", "Diode equation", "Rectifier and regulator behavior"],
    },
    {
      title: "Study transistor operation",
      points: ["BJT regions", "MOSFET regions", "Biasing and operating point"],
    },
    {
      title: "Build amplifier understanding",
      points: ["Small-signal model", "Voltage gain", "Input and output resistance"],
    },
    {
      title: "Learn feedback and frequency response",
      points: ["Negative feedback", "Bandwidth", "Bode plot interpretation"],
    },
    {
      title: "Master op-amp applications",
      points: ["Inverting and non-inverting amplifiers", "Integrator and differentiator", "Active filters"],
    },
  ],
  "Digital Electronics": [
    {
      title: "Begin with number systems",
      points: ["Binary, octal, decimal, hexadecimal", "Complements", "Code conversions"],
    },
    {
      title: "Simplify logic expressions",
      points: ["Boolean algebra", "K-map grouping", "Don't-care conditions"],
    },
    {
      title: "Design combinational circuits",
      points: ["Adders and subtractors", "MUX and DEMUX", "Encoders and decoders"],
    },
    {
      title: "Study sequential logic",
      points: ["Latches and flip-flops", "Registers", "Counters"],
    },
    {
      title: "Finish with timing and logic families",
      points: ["Setup and hold time", "Propagation delay", "TTL and CMOS basics"],
    },
  ],
  "Signals and Systems": [
    {
      title: "Classify signals and systems",
      points: ["Continuous and discrete signals", "Energy and power signals", "Linearity, causality, stability"],
    },
    {
      title: "Learn time-domain operations",
      points: ["Shifting and scaling", "Convolution", "Impulse response"],
    },
    {
      title: "Study LTI systems",
      points: ["System response", "Eigenfunction property", "Frequency response"],
    },
    {
      title: "Move to transform methods",
      points: ["Fourier series", "Fourier transform", "Laplace transform"],
    },
    {
      title: "Connect theory to problem solving",
      points: ["ROC interpretation", "Pole-zero view", "Stability from transforms"],
    },
  ],
  "Communication Systems": [
    {
      title: "Start with signal transmission basics",
      points: ["Bandwidth", "Power", "Noise and SNR"],
    },
    {
      title: "Learn analog modulation",
      points: ["AM", "FM", "PM"],
    },
    {
      title: "Study sampling and pulse modulation",
      points: ["Sampling theorem", "PAM", "PCM"],
    },
    {
      title: "Move to digital modulation",
      points: ["ASK, FSK, PSK", "QAM", "Bit error probability basics"],
    },
    {
      title: "Understand system performance",
      points: ["Channel noise", "Bandwidth efficiency", "Link budget basics"],
    },
  ],
  "Electromagnetic Theory": [
    {
      title: "Begin with vector calculus",
      points: ["Gradient", "Divergence", "Curl"],
    },
    {
      title: "Study electrostatics and magnetostatics",
      points: ["Coulomb's law", "Gauss law", "Ampere's law"],
    },
    {
      title: "Learn Maxwell equations",
      points: ["Integral form", "Differential form", "Physical meaning"],
    },
    {
      title: "Analyze wave propagation",
      points: ["Wave equation", "Plane waves", "Boundary conditions"],
    },
    {
      title: "Apply transmission-line concepts",
      points: ["Characteristic impedance", "Reflection coefficient", "Standing waves"],
    },
  ],
  Microprocessors: [
    {
      title: "Understand processor architecture",
      points: ["Registers", "ALU", "Control unit"],
    },
    {
      title: "Learn instruction execution",
      points: ["Fetch-decode-execute cycle", "Flags", "Addressing modes"],
    },
    {
      title: "Study instruction sets",
      points: ["Data transfer", "Arithmetic and logic", "Branching"],
    },
    {
      title: "Move to memory and I/O",
      points: ["Memory mapping", "I/O mapping", "Interrupts"],
    },
    {
      title: "Practice interfacing",
      points: ["Timers", "Serial communication", "Peripheral devices"],
    },
  ],
  "Digital Signal Processing": [
    {
      title: "Start with discrete-time signals",
      points: ["Sequences", "Sampling", "Basic operations"],
    },
    {
      title: "Study z-transform",
      points: ["Definition", "ROC", "System stability"],
    },
    {
      title: "Learn frequency-domain tools",
      points: ["DTFT", "DFT", "FFT"],
    },
    {
      title: "Understand digital filters",
      points: ["FIR filters", "IIR filters", "Frequency response"],
    },
    {
      title: "Apply DSP in exam problems",
      points: ["Sampling effects", "Filter design basics", "Spectral interpretation"],
    },
  ],
  "Control Systems": [
    {
      title: "Model dynamic systems",
      points: ["Transfer function", "Block diagram", "Signal-flow graph"],
    },
    {
      title: "Analyze time response",
      points: ["First-order systems", "Second-order systems", "Steady-state error"],
    },
    {
      title: "Study stability",
      points: ["Routh-Hurwitz", "Relative stability", "Root locations"],
    },
    {
      title: "Use root locus",
      points: ["Rules of construction", "Gain effect", "Dominant poles"],
    },
    {
      title: "Finish with frequency response",
      points: ["Bode plot", "Nyquist plot", "Gain and phase margin"],
    },
  ],
  "VLSI Design": [
    {
      title: "Begin with MOS fundamentals",
      points: ["MOS capacitor", "NMOS and PMOS", "Threshold voltage"],
    },
    {
      title: "Learn CMOS logic",
      points: ["Inverter", "NAND and NOR", "Static CMOS design"],
    },
    {
      title: "Study timing and power",
      points: ["Delay", "Dynamic power", "Leakage power"],
    },
    {
      title: "Move to layout concepts",
      points: ["Design rules", "Stick diagrams", "Parasitics"],
    },
    {
      title: "Understand design flow",
      points: ["HDL basics", "Synthesis", "ASIC and FPGA flow"],
    },
  ],
  "Antenna & Wave Propagation": [
    {
      title: "Start with antenna fundamentals",
      points: ["Radiation mechanism", "Near and far field", "Radiation pattern"],
    },
    {
      title: "Learn antenna parameters",
      points: ["Gain", "Directivity", "Efficiency"],
    },
    {
      title: "Study common antennas",
      points: ["Dipole", "Monopole", "Array antenna"],
    },
    {
      title: "Understand propagation modes",
      points: ["Ground wave", "Sky wave", "Space wave"],
    },
    {
      title: "Apply link concepts",
      points: ["Friis equation", "Path loss", "Fading basics"],
    },
  ],
  "Embedded Systems": [
    {
      title: "Begin with embedded architecture",
      points: ["Microcontroller blocks", "Memory", "I/O ports"],
    },
    {
      title: "Learn firmware basics",
      points: ["GPIO", "Polling", "Interrupts"],
    },
    {
      title: "Study timers and communication",
      points: ["Timers", "UART", "SPI and I2C"],
    },
    {
      title: "Work with sensors and peripherals",
      points: ["ADC", "PWM", "Display and actuator interfaces"],
    },
    {
      title: "Understand real-time design",
      points: ["Task scheduling", "RTOS basics", "Reliability"],
    },
  ],
};

export const subjectTheoryKnowledge = {
  "Network Analysis": {
    overviewCards: [
      {
        title: "What Is Network Analysis?",
        description:
          "Network Analysis is the study of electrical circuits made of sources, resistors, inductors, capacitors, and interconnected branches. Its job is to tell us how voltage, current, power, impedance, and energy behave in a complete circuit instead of in an isolated element.",
      },
      {
        title: "Why Do We Study It?",
        description:
          "We study this chapter because nearly every core ECE subject depends on circuit reasoning. If you understand how to write equations for a network, reduce it, replace it by an equivalent form, and predict its time or frequency response, many later chapters become easier.",
      },
      {
        title: "What Will You Learn?",
        points: [
          "How voltage, current, power, and energy are defined inside a circuit.",
          "How to apply KCL, KVL, and Ohm's law with correct signs.",
          "How to solve circuits using reduction, nodal analysis, and mesh analysis.",
          "How to use Thevenin, Norton, superposition, and maximum power transfer.",
          "How AC circuits use impedance, phasors, and resonance ideas.",
          "How RC and RL circuits behave when a switch changes the network.",
          "How two-port parameters summarize a circuit as an input-output block.",
        ],
      },
    ],
    concepts: [
      {
        slug: "circuit-variables",
        title: "Circuit Variables, Signs, and Element Behavior",
        shortTitle: "Variables and Signs",
        diagram: "basic-circuit",
        diagramNote:
          "A source drives current through a resistor. This is the simplest picture from which voltage drop, current direction, and power absorption are explained.",
        summary:
          "This is the starting point of the chapter. Before solving any circuit, you must know what the basic electrical quantities mean and how their signs are chosen.",
        paragraphs: [
          "Voltage is the potential difference between two points. Current is the rate of flow of charge through a branch. Power tells you how fast energy is being absorbed or delivered. Energy is the total amount stored or transferred over time. These four quantities appear in almost every Network Analysis problem.",
          "The passive sign convention is the first rule that keeps the chapter consistent. If current enters the terminal marked positive, the element is absorbing power and the relation p = vi is positive. If current leaves the positive terminal, the element is delivering power and the computed power becomes negative. This is why sign discipline matters from the very first circuit.",
          "Resistors dissipate energy, capacitors store energy in the electric field, and inductors store energy in the magnetic field. Once you understand the physical role of each element, the equations stop looking like disconnected formulas and start looking like descriptions of real circuit behavior.",
        ],
        learnPoints: [
          "A branch quantity must always be tied to a reference direction or polarity.",
          "The sign of power depends on how current is referenced with respect to voltage.",
          "Stored-energy elements are the reason circuits can have memory and transient behavior.",
        ],
        formulas: [
          {
            label: "Ohmic voltage relation",
            expression: "V = IR",
            note: "Across a resistor, voltage and current are proportional in the chosen reference direction.",
          },
          {
            label: "Instantaneous power",
            expression: "p = vi",
            note: "Positive power means absorption under passive sign convention.",
          },
        ],
      },
      {
        slug: "kirchhoff-laws",
        title: "Kirchhoff's Laws and Basic Circuit Equations",
        shortTitle: "KCL and KVL",
        diagram: "kirchhoff",
        diagramNote:
          "The left side shows currents meeting at a node for KCL. The right side shows a closed loop for KVL.",
        summary:
          "KCL and KVL are the backbone of the chapter because every advanced method is built on them.",
        paragraphs: [
          "Kirchhoff's Current Law is based on conservation of charge. It says that the total current entering a node must equal the total current leaving the node. In practice, this means every essential node gives you one balance equation that connects branch currents.",
          "Kirchhoff's Voltage Law is based on energy consistency around a closed path. It says the algebraic sum of all voltage rises and drops around any closed loop is zero. In practice, this gives you loop equations that connect element voltages and source voltages.",
          "These laws become powerful when they are combined with element relations such as V = IR or impedance relations in AC circuits. Network Analysis is essentially the art of writing the right KCL and KVL equations with the right sign convention and then solving them systematically.",
        ],
        learnPoints: [
          "KCL is most natural when you focus on a node and write current balance.",
          "KVL is most natural when you choose a loop direction and stay consistent with signs.",
          "A large fraction of circuit mistakes come from inconsistent current or voltage references.",
        ],
        formulas: [
          {
            label: "Kirchhoff's Current Law",
            expression: "Sum of currents at a node = 0",
            note: "Currents entering can be taken positive and leaving negative, or the reverse, as long as you stay consistent.",
          },
          {
            label: "Kirchhoff's Voltage Law",
            expression: "Sum of voltages around a closed loop = 0",
            note: "Track rises and drops around the loop in one chosen direction.",
          },
        ],
      },
      {
        slug: "systematic-solving",
        title: "Series Parallel Reduction, Nodal Analysis, and Mesh Analysis",
        shortTitle: "Solving Methods",
        diagram: "nodal-mesh",
        diagramNote:
          "The same circuit can be described either by node voltages V1 and V2 or by loop currents I1 and I2.",
        summary:
          "Once circuits stop being simple enough for direct inspection, you need structured methods that produce equations quickly and correctly.",
        paragraphs: [
          "The easiest networks can sometimes be reduced by combining resistors in series and parallel or by using source transformation. This works well when the interconnection is simple and the structure is obvious. However, many real exam circuits are not neat enough for repeated reduction alone.",
          "Nodal analysis treats node voltages as the unknowns and applies KCL at essential nodes. This method is usually efficient when the circuit has current sources or when the number of essential nodes is small. Each branch current is written in terms of node-voltage differences, which converts the full circuit into a linear equation set.",
          "Mesh analysis treats loop currents as the unknowns and applies KVL around independent meshes. This method is often convenient for planar circuits with voltage sources. Supernodes and supermeshes are introduced when a source prevents you from writing a basic node or loop equation directly.",
        ],
        learnPoints: [
          "Reduction is fast when the network has a simple visible structure.",
          "Nodal analysis usually wins when current sources dominate the circuit.",
          "Mesh analysis is attractive when loop equations are cleaner than node equations.",
          "The best solver in an exam is the method that creates the smallest clean equation set.",
        ],
        formulas: [
          {
            label: "Branch current in nodal form",
            expression: "I = (Va - Vb) / R",
            note: "This is the basic building block for turning KCL into algebraic equations.",
          },
          {
            label: "Mesh relation",
            expression: "Sum of voltage drops in a mesh = source voltage in that mesh",
            note: "Shared branches are written using the difference of mesh currents.",
          },
        ],
      },
      {
        slug: "network-theorems",
        title: "Equivalent Circuits and Network Theorems",
        shortTitle: "Theorems",
        diagram: "thevenin",
        diagramNote:
          "A complicated network can be replaced by a Thevenin source and series resistance as seen from the load terminals.",
        summary:
          "Theorems allow you to replace a difficult circuit by an easier but externally equivalent circuit.",
        paragraphs: [
          "Thevenin's theorem says a linear two-terminal network can be replaced by a single voltage source in series with an equivalent resistance. Norton's theorem says the same network can be replaced by a current source in parallel with the same equivalent resistance. These two forms describe the same terminal behavior in different ways.",
          "Superposition explains how each independent source contributes separately in a linear circuit. You analyze one source at a time, suppress the others appropriately, and add the resulting voltages or currents. This works for linear responses, not directly for power.",
          "Maximum power transfer tells you how to choose the load for the greatest power delivery from the source network. Source transformation helps you move between source models quickly when it simplifies the circuit equations.",
        ],
        learnPoints: [
          "The terminal viewpoint is the key idea behind Thevenin and Norton forms.",
          "Open-circuit voltage gives Thevenin voltage and short-circuit current gives Norton current.",
          "Dependent sources require special care while finding equivalent resistance.",
        ],
        formulas: [
          {
            label: "Thevenin voltage",
            expression: "Vth = open-circuit voltage",
            note: "Remove the load and measure the terminal voltage.",
          },
          {
            label: "Norton current",
            expression: "In = short-circuit current",
            note: "Short the output terminals and measure the current.",
          },
          {
            label: "Maximum power transfer",
            expression: "RL = Rth for a resistive DC network",
            note: "At this condition, the load receives maximum power from the source network.",
          },
        ],
      },
      {
        slug: "two-port-networks",
        title: "Two-Port Networks and Parameter Representation",
        shortTitle: "Two-Port Networks",
        diagram: "two-port",
        diagramNote:
          "The internal circuit is treated like a block with input and output port variables that can be related by parameters.",
        summary:
          "Two-port theory helps you describe a network as an input-output block without repeatedly solving every internal branch.",
        paragraphs: [
          "A two-port network has one input port and one output port. Instead of tracking every internal branch again and again, you summarize the network using relations between port voltages and currents. This is extremely useful in cascaded circuits, amplifier models, filters, and transmission-related problems.",
          "Different parameter sets are chosen depending on what is easier to measure or constrain. Z parameters relate voltages to currents, Y parameters relate currents to voltages, h parameters are common in transistor-style descriptions, and ABCD parameters are especially convenient for cascaded blocks.",
          "The conceptual benefit of this topic is that it trains you to think of a complicated network as a reusable module. Once the module behavior is captured, larger systems can be analyzed more quickly.",
        ],
        learnPoints: [
          "Open-circuit and short-circuit conditions define many parameter entries.",
          "Reciprocity and symmetry are quick property checks in two-port questions.",
          "ABCD parameters are often the natural choice for cascaded sections.",
        ],
        formulas: [
          {
            label: "Z-parameter form",
            expression: "V1 = z11 I1 + z12 I2 and V2 = z21 I1 + z22 I2",
            note: "This form treats currents as the independent variables.",
          },
          {
            label: "Reciprocity check",
            expression: "z12 = z21",
            note: "For a reciprocal network, the transfer terms match in the Z representation.",
          },
        ],
      },
      {
        slug: "special-networks",
        title: "Special Networks, Transformations, and Bridge Circuits",
        shortTitle: "Special Networks",
        diagram: "bridge",
        diagramNote:
          "Bridge-type circuits and star-delta style transformations appear when direct series-parallel reduction is not obvious.",
        summary:
          "Some networks do not collapse neatly by ordinary reduction, so special transformations and bridge understanding become important.",
        paragraphs: [
          "In many exam circuits, the interconnection is neither purely series nor purely parallel. Bridge networks, ladder sections, and unbalanced interconnections force you to think beyond direct collapse rules. This is where special transformation techniques become valuable.",
          "Star-delta and delta-star transformations help convert awkward resistor connections into simpler equivalent forms. Bridge recognition also helps you decide whether a branch carries current or whether symmetry can simplify the problem drastically.",
          "This concept matters because it teaches flexibility. Network Analysis is not only about memorizing one method but also about recognizing when the circuit structure itself can be reshaped into something easier.",
        ],
        learnPoints: [
          "Check first whether symmetry or balance makes a bridge branch inactive.",
          "Use star-delta style transformations when ordinary reduction fails.",
          "Special networks often become easy once the hidden structure is recognized.",
        ],
        formulas: [
          {
            label: "Balanced bridge idea",
            expression: "If ratio arms are equal, bridge branch current may become zero",
            note: "Balance lets you simplify the network before solving in full.",
          },
          {
            label: "Transformation goal",
            expression: "Replace awkward connection by an equivalent form with same terminal behavior",
            note: "The idea is more important than memorizing every variant blindly.",
          },
        ],
      },
      {
        slug: "graph-theory",
        title: "Graph Theory and Network Topology",
        shortTitle: "Graph Theory",
        diagram: "graph",
        diagramNote:
          "A network can be represented as nodes and branches so that trees, links, loops, and cut-sets can be studied systematically.",
        summary:
          "Graph theory gives a topological view of a circuit, where the focus shifts from element values to how branches and nodes are connected.",
        paragraphs: [
          "In graph representation, every element branch becomes an edge and every junction becomes a node. This lets you study the structure of a network independently of the actual numerical values of components.",
          "Concepts such as tree, twig, link, tie-set, and cut-set are useful in systematic network formulation and in advanced methods of circuit analysis. Even when the exam weightage is not large, the topic improves structural understanding of how a network is built.",
          "Graph theory is important because it shows that circuits can be understood not only electrically but also topologically. This viewpoint becomes powerful in large networks, algorithmic circuit methods, and computer-aided analysis.",
        ],
        learnPoints: [
          "A tree connects all nodes without forming a closed path.",
          "A link is a branch that creates a loop when added to a tree.",
          "Tie-sets and cut-sets provide systematic structural relations in a network graph.",
        ],
        formulas: [
          {
            label: "Branches in a tree",
            expression: "Twigs = nodes - 1",
            note: "A tree spans all nodes without any closed loop.",
          },
          {
            label: "Links in a connected graph",
            expression: "Links = branches - twigs",
            note: "These branches create fundamental loops when added to the tree.",
          },
        ],
      },
      {
        slug: "ac-analysis",
        title: "AC Analysis, Impedance, Phasors, and Resonance",
        shortTitle: "AC and Resonance",
        diagram: "resonance",
        diagramNote:
          "A series RLC circuit is a standard picture for impedance addition, phasor thinking, and resonance.",
        summary:
          "AC analysis turns differential relations into algebraic impedance relations, which makes sinusoidal circuits easier to solve.",
        paragraphs: [
          "In DC circuits, resistor equations are often enough. In AC circuits, inductors and capacitors also contribute reactance, so the circuit is described by impedance. This allows you to treat sinusoidal steady-state circuits with algebraic methods instead of solving differential equations every time.",
          "Phasors convert time-varying sinusoids into rotating complex quantities whose magnitudes and angles capture amplitude and phase. Once every element is written in impedance form, KCL, KVL, nodal analysis, and mesh analysis work again almost exactly as they do in DC circuits.",
          "Resonance is a special condition in RLC circuits where inductive and capacitive reactances cancel each other. In a series RLC circuit, the net reactance becomes zero, the circuit becomes purely resistive, and the current reaches its maximum for a given source voltage.",
        ],
        learnPoints: [
          "Impedance is the AC counterpart of resistance in sinusoidal steady state.",
          "Phasor angles explain which voltage or current leads or lags another.",
          "Resonance is one of the highest-yield conceptual topics in Network Analysis exams.",
        ],
        formulas: [
          {
            label: "Impedance of basic elements",
            expression: "ZR = R, ZL = jwL, ZC = 1 / (jwC)",
            note: "These relations let AC networks be solved with algebraic circuit methods.",
          },
          {
            label: "Resonant frequency",
            expression: "w0 = 1 / sqrt(LC)",
            note: "At resonance in an ideal series RLC circuit, XL equals XC.",
          },
        ],
      },
      {
        slug: "transient-response",
        title: "First-Order Transients and Time Constant",
        shortTitle: "Transients",
        diagram: "transient",
        diagramNote:
          "An RC charging circuit shows why capacitor voltage cannot jump instantly and why the response follows an exponential curve.",
        summary:
          "Transient analysis explains what happens immediately after switching and how a circuit moves from one steady state to another.",
        paragraphs: [
          "When a switch changes a network, the circuit does not always jump directly to its final state. Capacitors and inductors store energy, so they force continuity conditions. Capacitor voltage cannot change abruptly, and inductor current cannot change abruptly, unless unrealistic impulsive conditions are present.",
          "This leads to the idea of natural response, forced response, initial condition, final condition, and time constant. In first-order RC and RL circuits, the state variable moves exponentially from its initial value toward its final value.",
          "This chapter is important because transient reasoning teaches you how circuits remember past behavior. That same idea later becomes essential in control, signals, communication filters, and dynamic-system modeling.",
        ],
        learnPoints: [
          "Always find the initial value, final value, and time constant before writing the final response.",
          "The equivalent resistance seen by the storage element determines the time constant.",
          "After roughly five time constants, the first-order response is effectively settled.",
        ],
        formulas: [
          {
            label: "General first-order response",
            expression: "x(t) = xf + (x0 - xf)e^(-t / tau)",
            note: "This form works for capacitor voltage, inductor current, and similar first-order state variables.",
          },
          {
            label: "Time constants",
            expression: "tau = RC for RC circuits, tau = L / R for RL circuits",
            note: "Use the resistance seen by the storage element in the switched network.",
          },
        ],
      },
    ],
    studyTips: [
      "Start each problem by deciding whether it is a reduction problem, a KCL/KVL problem, a theorem problem, an AC impedance problem, or a transient problem.",
      "Draw your own current directions and voltage polarities once, then keep them unchanged throughout the solution.",
      "When a circuit looks complicated, reduce its viewpoint first: node-based, loop-based, or terminal-based.",
      "For AC problems, translate every element into impedance before writing equations.",
      "For transients, never skip the initial and final conditions.",
    ],
    commonMistakes: [
      "Writing KCL or KVL with inconsistent sign convention and then correcting numbers randomly at the end.",
      "Using superposition on power directly instead of on voltage or current responses.",
      "Finding Thevenin resistance incorrectly when dependent sources are present.",
      "Memorizing resonance formulas without understanding whether the circuit is series or parallel.",
      "Jumping into an exponential transient formula before finding the initial value and final value.",
    ],
  },
};
