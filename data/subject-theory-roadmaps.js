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
          "Circuit variables are the basic language used to describe an electrical network. Voltage tells how much electrical potential difference exists between two points, current tells how charge is moving through a branch, and power tells whether an element is absorbing or delivering energy. Sign convention connects these quantities to a chosen current direction and voltage polarity, so every equation has a clear physical meaning.",
        teaching: {
          intuition: [
            "Voltage, current, power, and energy are not just formulas; they describe what is happening inside each branch of a circuit.",
            "A circuit cannot be solved reliably until current direction, voltage polarity, and element behavior are defined consistently.",
          ],
          explanation: [
            "Start by marking a reference direction for current in each important branch. The reference direction is your assumed direction for analysis; it does not have to be the actual direction.",
            "Next, mark voltage polarity across each element. The selected polarity tells you which terminal is treated as positive while writing equations.",
            "Use the passive sign convention to connect voltage, current, and power. If current enters the positive terminal of an element, p = vi represents absorbed power.",
            "If a calculated current, voltage, or power comes out negative, it does not mean the solution is wrong. It means the actual direction or energy flow is opposite to the reference you selected.",
          ],
          interpretation: [
            "For the same resistor, more voltage means more current.",
            "If your answer comes negative, the actual current flows opposite to your chosen direction.",
            "Positive p = vi under passive sign convention means the element absorbs energy.",
          ],
          workedExample: {
            title: "Small resistor check",
            prompt: "A 12 V source is connected across a 4 ohm resistor.",
            steps: [
              "Current: I = V / R = 12 / 4 = 3 A",
              "Power absorbed by the resistor: p = vi = 12 x 3 = 36 W",
            ],
            result: "The resistor carries 3 A and absorbs 36 W.",
          },
          quiz: {
            question: "A 10 V source is applied across a 5 ohm resistor. What is the current?",
            options: ["0.5 A", "2 A", "5 A", "50 A"],
            correctIndex: 1,
            explanation: "Use Ohm's law: I = V / R = 10 / 5 = 2 A.",
          },
          commonMistake:
            "Students often calculate current first but forget to mark polarity, so the sign of power becomes confusing.",
          realLifeInsight:
            "Engineers use these basics while checking resistor current, battery power delivery, and safe wattage in power-supply circuits.",
        },
        paragraphs: [
          "Voltage is the potential difference between two points. Current is the rate of flow of charge through a branch. Power tells you how fast energy is being absorbed or delivered. Energy is the total amount stored or transferred over time. These four quantities appear in almost every Network Analysis problem.",
          "The passive sign convention is the first rule that keeps the chapter consistent. If current enters the terminal marked positive, the element is absorbing power and the relation p = vi is positive. If current leaves the positive terminal, the element is delivering power and the computed power becomes negative. This is why sign discipline matters from the very first circuit.",
          "Resistors dissipate energy, capacitors store energy in the electric field, and inductors store energy in the magnetic field. Once you understand the physical role of each element, the equations stop looking like disconnected formulas and start looking like descriptions of real circuit behavior.",
        ],
        stepByStep: [
          {
            title: "Choose a reference first",
            detail:
              "Before calculating anything, mark a current direction and voltage polarity for each branch. The chosen direction can be arbitrary, but it must stay consistent throughout the solution.",
          },
          {
            title: "Name the basic electrical quantities",
            detail:
              "Identify which quantity the question is asking about: voltage, current, power, or energy. Each one describes a different aspect of circuit behavior, so mixing them up causes confusion early.",
          },
          {
            title: "Apply the passive sign convention",
            detail:
              "If current enters the terminal marked positive, the element absorbs power and p = vi is positive. If current leaves that terminal, the calculated power becomes negative and the element is delivering power.",
          },
          {
            title: "Connect the idea to element behavior",
            detail:
              "Use V = IR for resistors, remember capacitors and inductors store energy, and interpret the sign of power physically. This turns formulas into a picture of what the circuit is doing.",
          },
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
        teaching: {
          intuition: [
            "A node cannot keep storing charge forever.",
            "A loop cannot create extra voltage from nowhere.",
          ],
          explanation: [
            "KCL balances current at a node.",
            "KVL balances voltage around a closed loop.",
            "Together they turn a circuit picture into equations you can solve.",
          ],
          interpretation: [
            "If more current enters a node, the same total must leave it.",
            "If you walk around a loop, every rise and drop must cancel algebraically.",
            "Wrong signs usually mean the travel direction or current reference changed midway.",
          ],
          workedExample: {
            title: "Node balance",
            prompt: "Two currents of 2 A and 3 A enter a node. One branch carries 1 A away. Find the remaining outgoing current.",
            steps: [
              "Total current entering the node = 2 + 3 = 5 A",
              "One outgoing branch already carries 1 A",
              "Remaining outgoing current = 5 - 1 = 4 A",
            ],
            result: "The second outgoing branch must carry 4 A.",
          },
          quiz: {
            question: "If 2 A and 3 A enter a node, what current must leave the node?",
            options: ["1 A", "3 A", "5 A", "6 A"],
            correctIndex: 2,
            explanation: "By KCL, the total entering current must equal the total leaving current, so 5 A must leave.",
          },
          commonMistake:
            "Students mix entering and leaving currents in the same sign convention and then wonder why KCL gives impossible values.",
          realLifeInsight:
            "These laws are the starting point for analyzing multi-branch networks in amplifiers, filters, and power-distribution circuits.",
        },
        paragraphs: [
          "Kirchhoff's Current Law is based on conservation of charge. It says that the total current entering a node must equal the total current leaving the node. In practice, this means every essential node gives you one balance equation that connects branch currents.",
          "Kirchhoff's Voltage Law is based on energy consistency around a closed path. It says the algebraic sum of all voltage rises and drops around any closed loop is zero. In practice, this gives you loop equations that connect element voltages and source voltages.",
          "These laws become powerful when they are combined with element relations such as V = IR or impedance relations in AC circuits. Network Analysis is essentially the art of writing the right KCL and KVL equations with the right sign convention and then solving them systematically.",
        ],
        stepByStep: [
          {
            title: "Mark the important nodes and loops",
            detail:
              "Begin by finding essential nodes where multiple branches meet and loops where voltages add around a closed path. These are the natural places where KCL and KVL will be written.",
          },
          {
            title: "Write KCL at the chosen node",
            detail:
              "Add currents entering and leaving the node with one consistent sign rule. This step converts the circuit picture into a current-balance equation.",
          },
          {
            title: "Write KVL around the chosen loop",
            detail:
              "Travel around the loop in one direction and add all voltage rises and drops algebraically. When done correctly, the total sum must be zero.",
          },
          {
            title: "Add element relations and solve",
            detail:
              "Replace branch voltages or currents using V = IR or impedance relations, then solve the resulting equations. KCL and KVL become useful only after they are tied to element behavior.",
          },
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
        teaching: {
          intuition: [
            "When inspection fails, do not guess the answer.",
            "Choose the method that gives you the fewest clean equations.",
          ],
          explanation: [
            "Simple networks may collapse by series-parallel reduction.",
            "If the circuit stays messy, shift to nodal or mesh analysis.",
            "The best method is the one that makes the unknowns easiest to manage.",
          ],
          interpretation: [
            "Nodal analysis is usually friendlier when node voltages are natural and current sources are present.",
            "Mesh analysis is usually friendlier when loop currents and voltage sources dominate.",
            "A quick structural check can save a lot of algebra.",
          ],
          workedExample: {
            title: "Nodal current relation",
            prompt: "One branch connects a 10 V node to a 4 V node through a 3 ohm resistor.",
            steps: [
              "Voltage difference across the branch = 10 - 4 = 6 V",
              "Branch current from the 10 V node to the 4 V node = 6 / 3 = 2 A",
            ],
            result: "The branch carries 2 A from the higher-potential node to the lower-potential node.",
          },
          quiz: {
            question: "Which method is usually better when a circuit has several current sources and fewer essential nodes?",
            options: ["Mesh analysis", "Nodal analysis", "Star-delta conversion only", "Graph theory"],
            correctIndex: 1,
            explanation: "Nodal analysis is often more efficient when current sources and node voltages make the equations simpler.",
          },
          commonMistake:
            "Students force mesh on every problem or force nodal on every problem instead of first checking which method is shorter.",
          realLifeInsight:
            "Circuit simulators and hand analysis both rely on systematic equation-building when direct reduction is not practical.",
        },
        paragraphs: [
          "The easiest networks can sometimes be reduced by combining resistors in series and parallel or by using source transformation. This works well when the interconnection is simple and the structure is obvious. However, many real exam circuits are not neat enough for repeated reduction alone.",
          "Nodal analysis treats node voltages as the unknowns and applies KCL at essential nodes. This method is usually efficient when the circuit has current sources or when the number of essential nodes is small. Each branch current is written in terms of node-voltage differences, which converts the full circuit into a linear equation set.",
          "Mesh analysis treats loop currents as the unknowns and applies KVL around independent meshes. This method is often convenient for planar circuits with voltage sources. Supernodes and supermeshes are introduced when a source prevents you from writing a basic node or loop equation directly.",
        ],
        stepByStep: [
          {
            title: "Look for an easy reduction first",
            detail:
              "Check whether the circuit can be simplified using series-parallel combinations or source transformation. If a quick reduction is possible, it saves time before setting up full equations.",
          },
          {
            title: "Compare nodes and meshes",
            detail:
              "Count the essential nodes and independent loops to see which method is smaller. Fewer unknowns usually means less algebra and fewer mistakes.",
          },
          {
            title: "Choose nodal or mesh deliberately",
            detail:
              "Pick nodal analysis when node voltages and current sources dominate, and pick mesh analysis when loop currents and voltage sources make the loop equations cleaner.",
          },
          {
            title: "Write equations in a repeatable order",
            detail:
              "Define the unknowns clearly, write one equation per node or mesh, and solve only after all equations are complete. This is what makes systematic solving reliable under exam pressure.",
          },
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
        teaching: {
          intuition: [
            "A complicated network can wear a simpler face at its terminals.",
            "If the load sees the same behavior, the replacement is valid.",
          ],
          explanation: [
            "Thevenin converts a network into one voltage source and one series resistance.",
            "Norton converts the same network into one current source and one parallel resistance.",
            "These forms save time because you solve the load using a smaller equivalent circuit.",
          ],
          interpretation: [
            "Open-circuit voltage gives Vth.",
            "Short-circuit current gives In.",
            "The equivalent resistance tells you how strongly the source network resists the load current.",
          ],
          workedExample: {
            title: "Thevenin load current",
            prompt: "A source network is replaced by Vth = 12 V and Rth = 3 ohm. The load is RL = 3 ohm.",
            steps: [
              "Total series resistance seen by the source = 3 + 3 = 6 ohm",
              "Load current = 12 / 6 = 2 A",
              "Load voltage = IL x RL = 2 x 3 = 6 V",
            ],
            result: "The load current is 2 A and the load voltage is 6 V.",
          },
          quiz: {
            question: "What does open-circuit terminal voltage represent in Thevenin analysis?",
            options: ["Load voltage only", "Thevenin voltage", "Norton current", "Equivalent power"],
            correctIndex: 1,
            explanation: "The open-circuit terminal voltage is the Thevenin voltage seen by the load.",
          },
          commonMistake:
            "Students find Thevenin resistance by switching off dependent sources, which is not valid unless a proper test-source method is used.",
          realLifeInsight:
            "Equivalent circuits help engineers simplify a large source network before studying how one load or sensor will behave.",
        },
        paragraphs: [
          "Thevenin's theorem says a linear two-terminal network can be replaced by a single voltage source in series with an equivalent resistance. Norton's theorem says the same network can be replaced by a current source in parallel with the same equivalent resistance. These two forms describe the same terminal behavior in different ways.",
          "Superposition explains how each independent source contributes separately in a linear circuit. You analyze one source at a time, suppress the others appropriately, and add the resulting voltages or currents. This works for linear responses, not directly for power.",
          "Maximum power transfer tells you how to choose the load for the greatest power delivery from the source network. Source transformation helps you move between source models quickly when it simplifies the circuit equations.",
        ],
        stepByStep: [
          {
            title: "Separate the load from the source network",
            detail:
              "Start by identifying the terminals across which the load is connected. Most theorem problems become simple only after you focus on what the load actually sees at those terminals.",
          },
          {
            title: "Find the equivalent source quantity",
            detail:
              "For Thevenin, find the open-circuit voltage. For Norton, find the short-circuit current. These values capture the external effect of the original network.",
          },
          {
            title: "Determine the equivalent resistance carefully",
            detail:
              "Suppress independent sources in the correct way and compute the resistance seen from the load side. If dependent sources are present, use a test source rather than switching them off blindly.",
          },
          {
            title: "Replace the network and solve the load quickly",
            detail:
              "Once the equivalent circuit is ready, reconnect the load and solve with ordinary circuit laws. The theorem saves effort by shrinking a large network into a simpler one.",
          },
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
        teaching: {
          intuition: [
            "You do not need to open every black box to use it.",
            "Sometimes it is enough to know how input and output talk to each other.",
          ],
          explanation: [
            "A two-port network has one input pair and one output pair.",
            "Parameter sets like Z, Y, h, and ABCD summarize the internal network behavior.",
            "Once the relations are known, the same block can be reused inside larger circuits.",
          ],
          interpretation: [
            "Z parameters are convenient when currents are the chosen independent variables.",
            "ABCD parameters are especially convenient when stages are cascaded.",
            "Matching transfer terms often reveal properties like reciprocity.",
          ],
          workedExample: {
            title: "Reciprocity check",
            prompt: "Suppose a network has V1 = 5I1 + 1I2 and V2 = 2I1 + 4I2.",
            steps: [
              "From the equations, z12 = 1 and z21 = 2",
              "For a reciprocal network in Z form, z12 must equal z21",
            ],
            result: "Because 1 is not equal to 2, this network is not reciprocal.",
          },
          quiz: {
            question: "Which parameter set is especially convenient for cascaded networks?",
            options: ["Z parameters", "Y parameters", "ABCD parameters", "Only h parameters"],
            correctIndex: 2,
            explanation: "ABCD parameters are widely used for cascaded sections because the blocks combine neatly.",
          },
          commonMistake:
            "Students memorize parameter names but forget what is being held fixed, so they use the wrong test condition while deriving entries.",
          realLifeInsight:
            "Amplifier stages, filter sections, and communication links are often modeled as two-port blocks to simplify larger designs.",
        },
        paragraphs: [
          "A two-port network has one input port and one output port. Instead of tracking every internal branch again and again, you summarize the network using relations between port voltages and currents. This is extremely useful in cascaded circuits, amplifier models, filters, and transmission-related problems.",
          "Different parameter sets are chosen depending on what is easier to measure or constrain. Z parameters relate voltages to currents, Y parameters relate currents to voltages, h parameters are common in transistor-style descriptions, and ABCD parameters are especially convenient for cascaded blocks.",
          "The conceptual benefit of this topic is that it trains you to think of a complicated network as a reusable module. Once the module behavior is captured, larger systems can be analyzed more quickly.",
        ],
        stepByStep: [
          {
            title: "Identify the two ports clearly",
            detail:
              "Mark the input port variables V1 and I1 and the output port variables V2 and I2. This creates a clean boundary between the internal network and the external connections.",
          },
          {
            title: "Choose the most useful parameter set",
            detail:
              "Select Z, Y, h, or ABCD parameters based on what quantities are easy to hold at zero or easy to measure. The right parameter form makes the algebra much shorter.",
          },
          {
            title: "Write the port equations",
            detail:
              "Express the port voltages and currents using the chosen parameter relations. This replaces many internal branch equations with a compact input-output model.",
          },
          {
            title: "Use the block as a reusable model",
            detail:
              "After the parameter set is known, the same network can be inserted into larger cascades or amplifier problems without resolving every internal element again.",
          },
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
        teaching: {
          intuition: [
            "Some circuits look hard only because they are drawn in an awkward shape.",
            "The trick is to notice balance, symmetry, or a transformation opportunity early.",
          ],
          explanation: [
            "Bridge and ladder networks often hide simple behavior inside a complex drawing.",
            "Star-delta and delta-star transformations help when direct series-parallel reduction fails.",
            "A structural shortcut can remove most of the algebra before it even starts.",
          ],
          interpretation: [
            "A balanced bridge can make the bridge branch current zero.",
            "Symmetry can reveal equal potentials and simplify multiple branches at once.",
            "Transformation is not magic; it preserves the same terminal behavior in a friendlier form.",
          ],
          workedExample: {
            title: "Balanced bridge test",
            prompt: "In a bridge, the arm ratios are 2/4 and 3/6.",
            steps: [
              "Compare the ratios: 2/4 = 0.5 and 3/6 = 0.5",
              "Because the ratios match, the bridge is balanced",
            ],
            result: "The bridge branch current becomes zero.",
          },
          quiz: {
            question: "In a balanced bridge, what often happens to the bridge branch current?",
            options: ["It becomes maximum", "It becomes zero", "It doubles", "It equals the source current"],
            correctIndex: 1,
            explanation: "When a bridge is balanced, the potential difference across the bridge branch becomes zero, so its current becomes zero.",
          },
          commonMistake:
            "Students start writing KCL and KVL immediately and miss that the bridge was already balanced or symmetric.",
          realLifeInsight:
            "Bridge-style sensor circuits and resistor networks are often simplified by structure recognition rather than raw equation solving.",
        },
        paragraphs: [
          "In many exam circuits, the interconnection is neither purely series nor purely parallel. Bridge networks, ladder sections, and unbalanced interconnections force you to think beyond direct collapse rules. This is where special transformation techniques become valuable.",
          "Star-delta and delta-star transformations help convert awkward resistor connections into simpler equivalent forms. Bridge recognition also helps you decide whether a branch carries current or whether symmetry can simplify the problem drastically.",
          "This concept matters because it teaches flexibility. Network Analysis is not only about memorizing one method but also about recognizing when the circuit structure itself can be reshaped into something easier.",
        ],
        stepByStep: [
          {
            title: "Inspect the structure before writing equations",
            detail:
              "Do not rush into KCL or KVL immediately. First check whether the circuit is a bridge, ladder, or another special arrangement that may simplify structurally.",
          },
          {
            title: "Test for balance or symmetry",
            detail:
              "Ask whether certain ratios match or whether mirror symmetry makes a branch current zero. A quick balance check can remove a difficult branch entirely.",
          },
          {
            title: "Apply the right transformation",
            detail:
              "When direct series-parallel reduction fails, use star-delta, delta-star, or a related conversion to turn the awkward section into a friendlier equivalent network.",
          },
          {
            title: "Redraw and solve the simpler circuit",
            detail:
              "After transformation, sketch the circuit again so the new structure is visually clear. Most of the difficulty disappears once the network is redrawn in an easier form.",
          },
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
        teaching: {
          intuition: [
            "Sometimes the value of each element is not the first issue.",
            "The connection pattern itself already tells you a lot about the network.",
          ],
          explanation: [
            "Graph theory redraws a circuit as nodes and branches.",
            "That view helps you study trees, links, loops, and cut-sets without getting distracted by component values.",
            "It is especially useful when the network becomes large or algorithmic methods are used.",
          ],
          interpretation: [
            "A tree connects all nodes without creating a closed loop.",
            "Any extra branch added to the tree becomes a link and creates a loop.",
            "Topology helps organize equations before numbers are even substituted.",
          ],
          workedExample: {
            title: "Count twigs and links",
            prompt: "A connected graph has 6 nodes and 8 branches.",
            steps: [
              "Twigs in a tree = nodes - 1 = 6 - 1 = 5",
              "Links = branches - twigs = 8 - 5 = 3",
            ],
            result: "The graph has 5 twigs and 3 links.",
          },
          quiz: {
            question: "How many twigs does a tree have in a connected graph with n nodes?",
            options: ["n", "n - 1", "n + 1", "branches - 1"],
            correctIndex: 1,
            explanation: "A tree that spans all nodes always contains n - 1 twigs.",
          },
          commonMistake:
            "Students remember definitions but forget the counting relations, so they lose easy marks in direct graph questions.",
          realLifeInsight:
            "Graph-based representations are useful in computer-aided circuit analysis, where topology must be processed before numerical solving.",
        },
        paragraphs: [
          "In graph representation, every element branch becomes an edge and every junction becomes a node. This lets you study the structure of a network independently of the actual numerical values of components.",
          "Concepts such as tree, twig, link, tie-set, and cut-set are useful in systematic network formulation and in advanced methods of circuit analysis. Even when the exam weightage is not large, the topic improves structural understanding of how a network is built.",
          "Graph theory is important because it shows that circuits can be understood not only electrically but also topologically. This viewpoint becomes powerful in large networks, algorithmic circuit methods, and computer-aided analysis.",
        ],
        stepByStep: [
          {
            title: "Convert the circuit into a graph",
            detail:
              "Replace each element with a branch and each junction with a node. This removes numerical detail temporarily and lets you focus on pure interconnection.",
          },
          {
            title: "Select a tree",
            detail:
              "Choose branches that connect all nodes without creating a closed loop. This tree becomes the structural backbone of the network graph.",
          },
          {
            title: "Mark twigs, links, and loops",
            detail:
              "Branches in the tree are twigs, and branches outside the tree are links. Every added link creates a fundamental loop that can be studied systematically.",
          },
          {
            title: "Use topology to support circuit equations",
            detail:
              "Tie-sets and cut-sets help organize how loops and node separations are related. The graph view is especially useful when the network is large or highly interconnected.",
          },
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
        teaching: {
          intuition: [
            "AC adds timing to the problem, so resistance grows into impedance.",
            "Now magnitude and phase both matter.",
          ],
          explanation: [
            "Inductors and capacitors oppose current differently from resistors in AC.",
            "Phasors convert sinusoidal waveforms into algebra-friendly magnitude-angle form.",
            "Once you use impedance, the same KCL and KVL logic works again in complex form.",
          ],
          interpretation: [
            "Larger inductive reactance means the inductor opposes AC more strongly at that frequency.",
            "Larger capacitive reactance means the capacitor opposes AC more strongly when frequency is low.",
            "At resonance in a series RLC circuit, XL and XC cancel and the circuit behaves like a pure resistor.",
          ],
          workedExample: {
            title: "Resonance check",
            prompt: "At a given frequency, an RLC circuit has XL = 20 ohm and XC = 20 ohm.",
            steps: [
              "Compare the reactances: XL = XC",
              "Net reactance becomes zero in a series RLC circuit",
            ],
            result: "The circuit is at resonance and its impedance becomes purely resistive.",
          },
          quiz: {
            question: "What is the resonance condition in an ideal series RLC circuit?",
            options: ["R = 0", "XL = XC", "V = IR", "Current becomes zero"],
            correctIndex: 1,
            explanation: "At resonance, inductive reactance equals capacitive reactance, so they cancel each other.",
          },
          commonMistake:
            "Students memorize the resonance condition but forget whether the circuit is series or parallel, so they interpret current and impedance incorrectly.",
          realLifeInsight:
            "AC analysis is used in filters, tuning circuits, and communication hardware where amplitude and phase both matter.",
        },
        paragraphs: [
          "In DC circuits, resistor equations are often enough. In AC circuits, inductors and capacitors also contribute reactance, so the circuit is described by impedance. This allows you to treat sinusoidal steady-state circuits with algebraic methods instead of solving differential equations every time.",
          "Phasors convert time-varying sinusoids into rotating complex quantities whose magnitudes and angles capture amplitude and phase. Once every element is written in impedance form, KCL, KVL, nodal analysis, and mesh analysis work again almost exactly as they do in DC circuits.",
          "Resonance is a special condition in RLC circuits where inductive and capacitive reactances cancel each other. In a series RLC circuit, the net reactance becomes zero, the circuit becomes purely resistive, and the current reaches its maximum for a given source voltage.",
        ],
        stepByStep: [
          {
            title: "Move from resistance to impedance",
            detail:
              "Rewrite each element using its AC impedance form so sinusoidal behavior can be handled algebraically. This is the key shift from DC thinking to AC circuit analysis.",
          },
          {
            title: "Represent sinusoids with phasors",
            detail:
              "Convert the time-domain sine waves into magnitude-angle form. Phasors let amplitude and phase be tracked together without solving differential equations directly.",
          },
          {
            title: "Apply familiar circuit laws in complex form",
            detail:
              "Use KCL, KVL, nodal analysis, or mesh analysis exactly as before, but with impedances and phasor voltages or currents. The method stays familiar even though the quantities are complex.",
          },
          {
            title: "Check the resonance condition",
            detail:
              "In a series RLC circuit, resonance occurs when XL equals XC. At that point the reactances cancel, the circuit behaves resistively, and the current becomes maximum for the source.",
          },
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
        teaching: {
          intuition: [
            "Stored energy prevents an instant jump after switching.",
            "The circuit has to move from old behavior to new behavior over time.",
          ],
          explanation: [
            "Capacitor voltage cannot change abruptly, and inductor current cannot change abruptly.",
            "That continuity creates an exponential transition instead of an immediate jump.",
            "To describe the motion, you need the initial value, the final value, and the time constant.",
          ],
          interpretation: [
            "A larger time constant means the circuit changes more slowly.",
            "The initial value tells you where the response starts.",
            "The final value tells you where the response settles after a long time.",
          ],
          workedExample: {
            title: "Time constant estimate",
            prompt: "An RC circuit has R = 2 kohm and C = 100 uF.",
            steps: [
              "Time constant tau = RC = 2000 x 100 x 10^-6 = 0.2 s",
              "Practical settling takes about 5 tau",
              "5 tau = 5 x 0.2 = 1 s",
            ],
            result: "The response settles practically in about 1 second.",
          },
          quiz: {
            question: "About how long does it take a first-order response to settle practically?",
            options: ["One time constant", "Two time constants", "About five time constants", "Ten time constants exactly"],
            correctIndex: 2,
            explanation: "A first-order response is usually treated as settled after about five time constants.",
          },
          commonMistake:
            "Students jump straight to the exponential formula before finding the initial and final values, so even a correct-looking equation gives the wrong curve.",
          realLifeInsight:
            "Transient analysis is essential when studying switching circuits, charging behavior, and how systems respond right after a change.",
        },
        paragraphs: [
          "When a switch changes a network, the circuit does not always jump directly to its final state. Capacitors and inductors store energy, so they force continuity conditions. Capacitor voltage cannot change abruptly, and inductor current cannot change abruptly, unless unrealistic impulsive conditions are present.",
          "This leads to the idea of natural response, forced response, initial condition, final condition, and time constant. In first-order RC and RL circuits, the state variable moves exponentially from its initial value toward its final value.",
          "This chapter is important because transient reasoning teaches you how circuits remember past behavior. That same idea later becomes essential in control, signals, communication filters, and dynamic-system modeling.",
        ],
        stepByStep: [
          {
            title: "Find the initial condition at the switching instant",
            detail:
              "Determine the capacitor voltage or inductor current just before and just after switching. Continuity of stored-energy variables is the first rule in transient analysis.",
          },
          {
            title: "Find the final steady-state value",
            detail:
              "Ask what the circuit will look like after a long time. This gives the destination toward which the transient response is moving.",
          },
          {
            title: "Compute the time constant",
            detail:
              "Find the equivalent resistance seen by the storage element and use tau = RC or tau = L / R. The time constant controls how quickly the transition happens.",
          },
          {
            title: "Write the exponential response",
            detail:
              "Combine the initial value, final value, and time constant in the first-order response form. Then check whether the result respects continuity and approaches the correct final state.",
          },
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
