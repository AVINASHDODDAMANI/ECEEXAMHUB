const learningSubjects = [
  {
    slug: "analog",
    name: "Analog",
    weightage: "10-12 marks",
    description:
      "Build strong command over op-amps, feedback, and analog building blocks that appear repeatedly in GATE and PSU exams.",
    chapters: [
      {
        slug: "op-amp-fundamentals",
        title: "Op-Amp Fundamentals",
        topics: [
          {
            slug: "active-filters",
            title: "Active Filters",
            summary:
              "See how op-amps shape frequency response in low-pass, high-pass, and band-pass filters.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["Cutoff frequency", "Passband gain", "Filter order"],
            subtopics: [
              "Low-pass filter",
              "High-pass filter",
              "Band-pass filter",
              "First and second order response",
            ],
          },
        ],
      },
      {
        slug: "diodes-and-transistors",
        title: "Diodes and Transistor Circuits",
        topics: [
          {
            slug: "diodes",
            title: "Diodes",
            summary:
              "Build intuition for rectifiers, clipping, clamping, and small-signal diode models.",
            estimatedTime: "45 min",
            status: "roadmap",
            concepts: ["PN junction", "Barrier potential", "Rectifier efficiency"],
            subtopics: [
              "PN junction basics",
              "Rectifiers",
              "Clippers and clampers",
              "Small-signal diode model",
            ],
          },
          {
            slug: "transistor-biasing",
            title: "Transistor Biasing",
            summary:
              "Understand operating point stability for BJT and MOSFET amplifier stages.",
            estimatedTime: "40 min",
            status: "roadmap",
            concepts: ["Q-point", "DC load line", "Bias stability"],
            subtopics: [
              "Fixed bias",
              "Voltage-divider bias",
              "Load line analysis",
              "Thermal stability",
            ],
          },
        ],
      },
      {
        slug: "frequency-response-and-feedback",
        title: "Frequency Response and Feedback",
        topics: [
          {
            slug: "frequency-response",
            title: "Frequency Response",
            summary:
              "Study low-frequency and high-frequency cutoff behavior in amplifier circuits.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["Lower cutoff", "Upper cutoff", "Bandwidth"],
            subtopics: [
              "Miller effect",
              "Frequency poles",
              "Bandwidth estimation",
              "Gain-bandwidth relation",
            ],
          },
          {
            slug: "feedback-amplifiers",
            title: "Feedback Amplifiers",
            summary:
              "Compare voltage, current, series, and shunt feedback with gain and bandwidth impact.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["Loop gain", "Desensitivity", "Stability"],
            subtopics: [
              "Series-shunt feedback",
              "Shunt-shunt feedback",
              "Gain with feedback",
              "Bandwidth improvement",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "digital",
    name: "Digital",
    weightage: "10-12 marks",
    description:
      "Cover combinational and sequential logic with emphasis on state machines, flip-flops, minimization, and logic families.",
    chapters: [
      {
        slug: "combinational-logic",
        title: "Combinational Logic",
        topics: [
          {
            slug: "boolean-algebra-and-kmaps",
            title: "Boolean Algebra and K-Maps",
            summary:
              "Reduce logic expressions quickly using algebraic laws and Karnaugh map grouping rules.",
            estimatedTime: "45 min",
            status: "ready",
            concepts: ["Boolean identities", "Canonical forms", "K-map simplification"],
            subtopics: [
              "SOP and POS forms",
              "Minterms and maxterms",
              "2-variable to 4-variable K-map",
              "Don't-care conditions",
            ],
          },
          {
            slug: "combinational-circuits",
            title: "Combinational Circuits",
            summary:
              "Revise encoders, decoders, multiplexers, adders, comparators, and code converters.",
            estimatedTime: "40 min",
            status: "roadmap",
            concepts: ["MUX", "Decoder", "Adder-subtractor"],
            subtopics: [
              "Half adder and full adder",
              "Multiplexer and demultiplexer",
              "Encoder and decoder",
              "Comparator and parity circuit",
            ],
          },
        ],
      },
      {
        slug: "sequential-circuits",
        title: "Sequential Circuits",
        topics: [
          {
            slug: "flip-flops",
            title: "Flip-Flops",
            summary:
              "Master SR, JK, D, and T flip-flops, characteristic equations, race conditions, and exam shortcuts.",
            estimatedTime: "55 min",
            status: "ready",
            concepts: [
              "Characteristic and excitation tables",
              "Edge-triggered storage",
              "Conversions and race-around condition",
            ],
            subtopics: [
              "SR, JK, D, and T types",
              "Characteristic equation",
              "Excitation table",
              "Race-around condition",
            ],
          },
          {
            slug: "counters",
            title: "Counters",
            summary:
              "Understand ripple and synchronous counters, modulus design, and timing behavior.",
            estimatedTime: "45 min",
            status: "roadmap",
            concepts: ["Modulus", "Propagation delay", "State transition"],
            subtopics: [
              "Asynchronous counters",
              "Synchronous counters",
              "Mod-n counter design",
              "Ring and Johnson counters",
            ],
          },
        ],
      },
      {
        slug: "logic-implementation",
        title: "Logic Implementation",
        topics: [
          {
            slug: "memories",
            title: "Memories",
            summary:
              "Understand RAM, ROM, cache basics, and memory organization for digital systems.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["RAM", "ROM", "Addressing"],
            subtopics: [
              "SRAM and DRAM",
              "ROM, PROM, EPROM",
              "Memory organization",
              "Address and data bus",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "signals",
    name: "Signals",
    weightage: "8-10 marks",
    description:
      "Focus on transforms, system properties, and spectral analysis that form the base for communication and control subjects.",
    chapters: [
      {
        slug: "signal-basics",
        title: "Signal Basics and Systems",
        topics: [
          {
            slug: "signal-classification",
            title: "Signal Classification",
            summary:
              "Classify signals as energy, power, periodic, even, odd, continuous-time, or discrete-time.",
            estimatedTime: "30 min",
            status: "roadmap",
            concepts: ["Energy signal", "Power signal", "Symmetry"],
            subtopics: [
              "Even and odd signals",
              "Periodic and aperiodic signals",
              "Energy and power signals",
              "Continuous and discrete time",
            ],
          },
          {
            slug: "system-properties",
            title: "System Properties",
            summary:
              "Check linearity, time invariance, causality, stability, and memory for standard systems.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["Linearity", "Time invariance", "BIBO stability"],
            subtopics: [
              "Causality test",
              "Memoryless and dynamic systems",
              "BIBO stability",
              "Invertibility",
            ],
          },
        ],
      },
      {
        slug: "transform-techniques",
        title: "Transform Techniques",
        topics: [
          {
            slug: "laplace-transform",
            title: "Laplace Transform",
            summary:
              "Use unilateral and bilateral Laplace transforms to solve LTI systems and stability questions quickly.",
            estimatedTime: "45 min",
            status: "ready",
            concepts: ["ROC", "Initial and final value theorems", "Transform pairs"],
            subtopics: [
              "Unilateral Laplace transform",
              "Bilateral Laplace transform",
              "ROC and poles",
              "Initial and final value theorems",
            ],
          },
          {
            slug: "fourier-transform",
            title: "Fourier Transform",
            summary:
              "Relate time-domain behavior to frequency-domain interpretation for continuous and discrete signals.",
            estimatedTime: "50 min",
            status: "roadmap",
            concepts: ["Duality", "Convolution", "Bandwidth"],
            subtopics: [
              "CTFT basics",
              "DTFT basics",
              "Fourier series relation",
              "Convolution property",
            ],
          },
        ],
      },
      {
        slug: "sampling-and-z-transform",
        title: "Sampling and Z-Transform",
        topics: [
          {
            slug: "sampling-theorem",
            title: "Sampling Theorem",
            summary:
              "Understand Nyquist rate, aliasing, and reconstruction in sampled signals.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["Nyquist rate", "Aliasing", "Reconstruction"],
            subtopics: [
              "Nyquist sampling theorem",
              "Aliasing effect",
              "Ideal reconstruction",
              "Bandpass sampling",
            ],
          },
          {
            slug: "z-transform",
            title: "Z-Transform",
            summary:
              "Work with transform pairs, ROC, and difference equations in discrete-time analysis.",
            estimatedTime: "40 min",
            status: "ready",
            concepts: ["ROC", "Difference equation", "Stability"],
            subtopics: [
              "One-sided and two-sided Z-transform",
              "ROC and poles",
              "Difference equation solution",
              "Inverse Z-transform",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "networks",
    name: "Networks",
    weightage: "8-10 marks",
    description:
      "Prepare resonance, network theorems, two-port networks, and transient analysis with formula-driven revision.",
    chapters: [
      {
        slug: "network-theorems",
        title: "Network Theorems",
        topics: [
          {
            slug: "network-theorems-topic",
            title: "Network Theorems",
            summary:
              "Revise superposition, Thevenin, Norton, maximum power transfer, and source transformation.",
            estimatedTime: "45 min",
            status: "ready",
            concepts: ["Thevenin equivalent", "Norton equivalent", "Maximum power transfer"],
            subtopics: [
              "Superposition theorem",
              "Thevenin theorem",
              "Norton theorem",
              "Maximum power transfer",
            ],
          },
          {
            slug: "nodal-and-mesh-analysis",
            title: "Nodal and Mesh Analysis",
            summary:
              "Build strong equation-solving habits for DC and AC network problems.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["Node voltage", "Mesh current", "Dependent source"],
            subtopics: [
              "Node voltage method",
              "Mesh current method",
              "Supernode and supermesh",
              "Dependent sources",
            ],
          },
        ],
      },
      {
        slug: "ac-analysis",
        title: "AC Analysis",
        topics: [
          {
            slug: "resonance",
            title: "Resonance",
            summary:
              "Study resonance conditions, quality factor, bandwidth, and impedance behavior in RLC circuits.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["Series vs parallel resonance", "Quality factor", "Bandwidth"],
            subtopics: [
              "Series resonance",
              "Parallel resonance",
              "Quality factor",
              "Bandwidth relation",
            ],
          },
          {
            slug: "two-port-networks",
            title: "Two-Port Networks",
            summary:
              "Learn Z, Y, h, and ABCD parameter conversions for quick numerical problem solving.",
            estimatedTime: "40 min",
            status: "ready",
            concepts: ["Parameter conversion", "Reciprocity", "Symmetry"],
            subtopics: [
              "Z and Y parameters",
              "h parameters",
              "ABCD parameters",
              "Reciprocity and symmetry",
            ],
          },
        ],
      },
      {
        slug: "transient-analysis",
        title: "Transient Analysis",
        topics: [
          {
            slug: "first-order-transients",
            title: "First-Order Transients",
            summary:
              "Solve RC and RL switching problems using initial and final conditions.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["Time constant", "Natural response", "Forced response"],
            subtopics: [
              "RC transient",
              "RL transient",
              "Initial and final value",
              "Time constant",
            ],
          },
          {
            slug: "second-order-transients",
            title: "Second-Order Transients",
            summary:
              "Study underdamped, critically damped, and overdamped RLC responses.",
            estimatedTime: "40 min",
            status: "roadmap",
            concepts: ["Damping", "Characteristic roots", "Oscillatory response"],
            subtopics: [
              "Series RLC transient",
              "Parallel RLC transient",
              "Damping cases",
              "Initial condition solving",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "control-systems",
    name: "Control Systems",
    weightage: "8-10 marks",
    description:
      "Revise time response, root locus, stability, and frequency response with an exam-first mindset.",
    chapters: [
      {
        slug: "control-system-modeling",
        title: "Control System Modeling",
        topics: [
          {
            slug: "transfer-functions",
            title: "Transfer Functions",
            summary:
              "Move between differential equations, transfer functions, and block representations quickly.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["Transfer function", "Poles and zeros", "Block model"],
            subtopics: [
              "Differential equation to transfer function",
              "Poles and zeros",
              "Open-loop and closed-loop form",
              "Mechanical and electrical analogies",
            ],
          },
          {
            slug: "block-diagrams-and-sfg",
            title: "Block Diagrams and Signal Flow Graphs",
            summary:
              "Reduce multi-block systems and use Mason's gain formula efficiently.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["Block reduction", "Signal flow graph", "Mason's gain formula"],
            subtopics: [
              "Series and parallel reduction",
              "Feedback reduction",
              "Signal flow graph terms",
              "Mason's gain formula",
            ],
          },
        ],
      },
      {
        slug: "time-domain-analysis",
        title: "Time-Domain Analysis",
        topics: [
          {
            slug: "time-response",
            title: "Time Response",
            summary:
              "Connect damping ratio, natural frequency, and steady-state error to standard second-order responses.",
            estimatedTime: "40 min",
            status: "ready",
            concepts: ["Damping ratio", "Settling time", "Overshoot"],
            subtopics: [
              "First-order response",
              "Second-order response",
              "Steady-state error",
              "Time-domain specifications",
            ],
          },
          {
            slug: "root-locus",
            title: "Root Locus",
            summary:
              "Trace closed-loop pole movement and predict stability with simple construction rules.",
            estimatedTime: "45 min",
            status: "ready",
            concepts: ["Asymptotes", "Breakaway", "Angle criterion"],
            subtopics: [
              "Basic rules",
              "Asymptotes",
              "Breakaway and break-in",
              "Imaginary-axis crossing",
            ],
          },
        ],
      },
      {
        slug: "frequency-domain-analysis",
        title: "Frequency Domain Analysis",
        topics: [
          {
            slug: "bode-and-nyquist",
            title: "Bode and Nyquist Plots",
            summary:
              "Study gain margin, phase margin, and frequency-response based stability checks.",
            estimatedTime: "45 min",
            status: "roadmap",
            concepts: ["Bode plot", "Gain margin", "Phase margin"],
            subtopics: [
              "Bode magnitude plot",
              "Bode phase plot",
              "Gain and phase margin",
              "Nyquist criterion",
            ],
          },
          {
            slug: "stability-criteria",
            title: "Stability Criteria",
            summary:
              "Use Routh-Hurwitz and relative stability ideas to classify system behavior quickly.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["Routh array", "Absolute stability", "Relative stability"],
            subtopics: [
              "Routh-Hurwitz criterion",
              "Special cases in Routh",
              "Absolute stability",
              "Relative stability",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "communications",
    name: "Communications",
    weightage: "10-12 marks",
    description:
      "Cover analog and digital communication concepts, noise, modulation, and information theory for high-yield ECE exams.",
    chapters: [
      {
        slug: "analog-communication",
        title: "Analog Communication",
        topics: [
          {
            slug: "am-dsbsc-and-ssb",
            title: "AM, DSBSC, and SSB",
            summary:
              "Understand generation, detection, power relations, and bandwidth for analog modulation schemes.",
            estimatedTime: "45 min",
            status: "roadmap",
            concepts: ["Modulation index", "Bandwidth", "Power efficiency"],
            subtopics: [
              "Conventional AM",
              "DSBSC modulation",
              "SSB generation",
              "Envelope detection",
            ],
          },
          {
            slug: "fm-and-pm",
            title: "FM and PM",
            summary:
              "Compare angle modulation, bandwidth estimation, and noise immunity in FM and PM.",
            estimatedTime: "40 min",
            status: "roadmap",
            concepts: ["Frequency deviation", "Carson's rule", "Angle modulation"],
            subtopics: [
              "FM waveform",
              "PM waveform",
              "Carson's rule",
              "Pre-emphasis and de-emphasis",
            ],
          },
        ],
      },
      {
        slug: "digital-communication",
        title: "Digital Communication",
        topics: [
          {
            slug: "sampling-and-pcm",
            title: "Sampling and PCM",
            summary:
              "Move from sampled analog signals into pulse code modulation and quantization concepts.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["Quantization", "PCM", "Sampling"],
            subtopics: [
              "Sampling review",
              "Quantization noise",
              "PCM blocks",
              "Companding",
            ],
          },
          {
            slug: "digital-modulation",
            title: "Digital Modulation",
            summary:
              "Compare ASK, FSK, PSK, QPSK, and BER trends in noisy communication channels.",
            estimatedTime: "45 min",
            status: "roadmap",
            concepts: ["Constellation", "BER", "Coherent detection"],
            subtopics: [
              "ASK and FSK",
              "BPSK and QPSK",
              "Signal constellation",
              "Bit error probability",
            ],
          },
        ],
      },
      {
        slug: "information-theory",
        title: "Information Theory and Probability",
        topics: [
          {
            slug: "probability-and-random-process",
            title: "Probability and Random Process",
            summary:
              "Revise random variables, expectation, autocorrelation, and PSD for communication analysis.",
            estimatedTime: "40 min",
            status: "roadmap",
            concepts: ["Expectation", "Correlation", "PSD"],
            subtopics: [
              "Random variables",
              "Expectation and variance",
              "Autocorrelation",
              "Power spectral density",
            ],
          },
          {
            slug: "information-measures",
            title: "Information Measures",
            summary:
              "Understand entropy, mutual information, and channel capacity in compact exam form.",
            estimatedTime: "30 min",
            status: "roadmap",
            concepts: ["Entropy", "Mutual information", "Channel capacity"],
            subtopics: [
              "Self information",
              "Entropy",
              "Mutual information",
              "Shannon capacity",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "electronic-devices",
    name: "Electronic Devices",
    weightage: "8-10 marks",
    description:
      "Revise semiconductor fundamentals, transistor behavior, and standard device applications that support analog and digital electronics.",
    chapters: [
      {
        slug: "semiconductor-basics",
        title: "Semiconductor Basics",
        topics: [
          {
            slug: "pn-junction",
            title: "PN Junction",
            summary:
              "Understand depletion region, drift, diffusion, and diode current-voltage behavior.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["Drift", "Diffusion", "Depletion region"],
            subtopics: [
              "Intrinsic and extrinsic semiconductors",
              "Carrier concentration",
              "Drift and diffusion current",
              "PN junction behavior",
            ],
          },
          {
            slug: "carrier-transport",
            title: "Carrier Transport",
            summary:
              "Connect mobility, conductivity, recombination, and Hall effect ideas.",
            estimatedTime: "30 min",
            status: "roadmap",
            concepts: ["Mobility", "Conductivity", "Hall coefficient"],
            subtopics: [
              "Carrier mobility",
              "Conductivity relation",
              "Recombination and lifetime",
              "Hall effect",
            ],
          },
        ],
      },
      {
        slug: "transistor-devices",
        title: "Transistor Devices",
        topics: [
          {
            slug: "bjt-characteristics",
            title: "BJT Characteristics",
            summary:
              "Study current relations, operating regions, and small-signal ideas for BJTs.",
            estimatedTime: "40 min",
            status: "roadmap",
            concepts: ["Alpha and beta", "Active region", "Hybrid-pi model"],
            subtopics: [
              "BJT regions of operation",
              "Current gain",
              "Input and output characteristics",
              "Small-signal model",
            ],
          },
          {
            slug: "mosfet-characteristics",
            title: "MOSFET Characteristics",
            summary:
              "Understand cutoff, triode, saturation, threshold voltage, and transconductance.",
            estimatedTime: "40 min",
            status: "roadmap",
            concepts: ["Threshold voltage", "Transconductance", "Channel modulation"],
            subtopics: [
              "Enhancement MOSFET",
              "Depletion MOSFET",
              "Drain characteristics",
              "Small-signal transconductance",
            ],
          },
        ],
      },
      {
        slug: "device-applications",
        title: "Device Applications",
        topics: [
          {
            slug: "rectifiers-and-regulators",
            title: "Rectifiers and Regulators",
            summary:
              "Review rectifier output relations, ripple, and simple regulator concepts.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["Ripple factor", "Rectifier efficiency", "Regulation"],
            subtopics: [
              "Half-wave rectifier",
              "Full-wave rectifier",
              "Ripple and filter basics",
              "Zener regulator",
            ],
          },
          {
            slug: "biasing-circuits",
            title: "Biasing Circuits",
            summary:
              "Strengthen transistor bias networks used in amplifier design questions.",
            estimatedTime: "30 min",
            status: "roadmap",
            concepts: ["Bias stability", "Operating point", "Emitter stabilization"],
            subtopics: [
              "BJT bias circuits",
              "MOSFET bias circuits",
              "Emitter stabilization",
              "Operating point shift",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "microprocessors",
    name: "Microprocessors",
    weightage: "6-8 marks",
    description:
      "Study 8085 architecture, instruction execution, assembly programming, timing diagrams, interrupts, interfacing, 8255, 8086, and advanced processor applications.",
    chapters: [
      {
        slug: "introduction-to-microprocessors",
        title: "Introduction to Microprocessors",
        topics: [
          {
            slug: "introduction-to-microprocessors",
            title: "Introduction to Microprocessors",
            summary:
              "Understand CPU, memory, I/O, system bus, microprocessor basics, microprocessor vs microcontroller, and input-process-output flow.",
            estimatedTime: "30 min",
            status: "ready",
            concepts: ["CPU", "Memory", "I/O", "System bus"],
            subtopics: ["Basics of microprocessors", "Evolution", "Applications", "Basic computer architecture"],
          },
        ],
      },
      {
        slug: "8085-microprocessor-architecture",
        title: "8085 Microprocessor Architecture",
        topics: [
          {
            slug: "8085-microprocessor-architecture",
            title: "8085 Microprocessor Architecture",
            summary:
              "Learn the 8085 internal architecture, ALU, accumulator, flags, program counter, stack pointer, buses, pin diagram, and timing-control unit.",
            estimatedTime: "40 min",
            status: "ready",
            concepts: ["ALU", "Accumulator", "Flag register", "Program counter"],
            subtopics: ["Internal architecture", "Pin diagram", "Address/data/control bus", "Timing and control unit"],
          },
        ],
      },
      {
        slug: "8085-instruction-set",
        title: "8085 Instruction Set",
        topics: [
          {
            slug: "8085-instruction-set",
            title: "8085 Instruction Set",
            summary:
              "Classify 8085 instructions, addressing modes, opcode, operand, data transfer, arithmetic, logical, branching, and machine-control operations.",
            estimatedTime: "40 min",
            status: "ready",
            concepts: ["Opcode", "Operand", "Addressing modes", "Instruction types"],
            subtopics: ["Data transfer", "Arithmetic", "Logical", "Branching", "Machine control"],
          },
        ],
      },
      {
        slug: "assembly-language-programming",
        title: "Assembly Language Programming",
        topics: [
          {
            slug: "assembly-language-programming",
            title: "Assembly Language Programming",
            summary:
              "Practice assembly execution, register updates, arithmetic programs, loops, branching, sorting, memory interaction, and delay generation.",
            estimatedTime: "45 min",
            status: "ready",
            concepts: ["Registers", "Looping", "Branching", "Memory locations"],
            subtopics: ["Addition", "Subtraction", "Multiplication", "Division", "Sorting", "Delay generation"],
          },
        ],
      },
      {
        slug: "timing-diagrams-and-machine-cycles",
        title: "Timing Diagrams and Machine Cycles",
        topics: [
          {
            slug: "timing-diagrams-and-machine-cycles",
            title: "Timing Diagrams and Machine Cycles",
            summary:
              "Understand T-states, machine cycles, opcode fetch, memory read/write, I/O read/write, bus activity, and clock synchronization.",
            estimatedTime: "40 min",
            status: "ready",
            concepts: ["T-state", "Machine cycle", "Opcode fetch", "Bus activity"],
            subtopics: ["Opcode fetch", "Memory read", "Memory write", "I/O read/write", "Timing analysis"],
          },
        ],
      },
      {
        slug: "interrupts-in-8085",
        title: "Interrupts in 8085",
        topics: [
          {
            slug: "interrupts-in-8085",
            title: "Interrupts in 8085",
            summary:
              "Study interrupt request flow, interrupt priority, TRAP, RST7.5, RST6.5, RST5.5, INTR, software interrupts, and servicing process.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["TRAP", "RST7.5", "RST6.5", "RST5.5", "INTR"],
            subtopics: ["Interrupt basics", "Hardware interrupts", "Software interrupts", "Priority", "Handling"],
          },
        ],
      },
      {
        slug: "memory-interfacing",
        title: "Memory Interfacing",
        topics: [
          {
            slug: "memory-interfacing",
            title: "Memory Interfacing",
            summary:
              "Connect RAM and ROM to the processor using address decoding, chip select logic, memory mapping, and read/write operation flow.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["RAM", "ROM", "Address decoding", "Chip select"],
            subtopics: ["Memory organization", "RAM/ROM interfacing", "Address decoding", "Memory mapping"],
          },
        ],
      },
      {
        slug: "io-interfacing",
        title: "I/O Interfacing",
        topics: [
          {
            slug: "io-interfacing",
            title: "I/O Interfacing",
            summary:
              "Compare I/O mapped and memory mapped I/O, peripheral communication, programmed I/O, interrupt-driven I/O, DMA, and synchronization.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["I/O mapped I/O", "Memory mapped I/O", "DMA", "Peripheral devices"],
            subtopics: ["Peripheral communication", "Programmed I/O", "Interrupt-driven I/O", "DMA"],
          },
        ],
      },
      {
        slug: "8255-programmable-peripheral-interface",
        title: "8255 Programmable Peripheral Interface",
        topics: [
          {
            slug: "8255-programmable-peripheral-interface",
            title: "8255 Programmable Peripheral Interface",
            summary:
              "Learn 8255 architecture, Port A, Port B, Port C, Mode 0, Mode 1, Mode 2, control word, and peripheral interfacing.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["Port A", "Port B", "Port C", "Control word"],
            subtopics: ["Architecture", "Mode 0", "Mode 1", "Mode 2", "Interfacing applications"],
          },
        ],
      },
      {
        slug: "8086-microprocessor",
        title: "8086 Microprocessor",
        topics: [
          {
            slug: "8086-microprocessor",
            title: "8086 Microprocessor",
            summary:
              "Understand 8086 architecture, BIU, EU, memory segmentation, minimum and maximum modes, register organization, addressing modes, and 20-bit address generation.",
            estimatedTime: "45 min",
            status: "ready",
            concepts: ["BIU", "EU", "Segmentation", "20-bit address"],
            subtopics: ["Architecture", "Memory segmentation", "Minimum/maximum modes", "Registers", "Addressing modes"],
          },
        ],
      },
      {
        slug: "advanced-topics",
        title: "Advanced Topics",
        topics: [
          {
            slug: "advanced-topics",
            title: "Advanced Topics",
            summary:
              "Revise DMA controller operation, serial communication, embedded system basics, peripheral interfacing overview, and real-world microprocessor applications.",
            estimatedTime: "30 min",
            status: "ready",
            concepts: ["DMA", "Serial communication", "Embedded systems", "Applications"],
            subtopics: ["DMA controller", "Serial communication", "Microprocessor applications", "Embedded system basics"],
          },
        ],
      },
    ],
  },
  {
    slug: "electromagnetics",
    name: "Electromagnetic Theory",
    weightage: "6-8 marks",
    description:
      "Cover vector calculus, electrostatics, Maxwell equations, waves, transmission lines, waveguides, antennas, and EMC topics commonly seen in ECE exams.",
    chapters: [
      {
        slug: "vector-calculus",
        title: "Vector Calculus",
        topics: [
          {
            slug: "vector-calculus",
            title: "Vector Calculus",
            summary:
              "Build field intuition with coordinate systems, gradient, divergence, curl, Gauss theorem, and Stokes theorem.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["Gradient", "Divergence", "Curl"],
            subtopics: ["Coordinate systems", "Vector operations", "Integral theorems"],
          },
        ],
      },
      {
        slug: "electrostatics",
        title: "Electrostatics",
        topics: [
          {
            slug: "electrostatics",
            title: "Electrostatics",
            summary:
              "Use Coulomb law, electric field, flux density, Gauss law, electric potential, and energy density to solve field problems.",
            estimatedTime: "40 min",
            status: "ready",
            concepts: ["Coulomb law", "Electric field", "Gauss law"],
            subtopics: ["Electric field intensity", "Electric flux density", "Electric potential"],
          },
        ],
      },
      {
        slug: "conductors-and-dielectrics",
        title: "Conductors and Dielectrics",
        topics: [
          {
            slug: "conductors-and-dielectrics",
            title: "Conductors and Dielectrics",
            summary:
              "Understand conductor charge distribution, dielectric polarization, boundary conditions, and capacitance.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["Boundary conditions", "Capacitance", "Polarization"],
            subtopics: ["Conductors", "Dielectrics", "Parallel plate capacitor"],
          },
        ],
      },
      {
        slug: "magnetostatics",
        title: "Magnetostatics",
        topics: [
          {
            slug: "magnetostatics",
            title: "Magnetostatics",
            summary:
              "Study magnetic field due to steady currents using Biot-Savart law, Ampere's circuital law, flux density, force, and torque.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["Biot-Savart law", "Ampere's law", "Magnetic flux density"],
            subtopics: ["Current-carrying conductor", "Ampere loop", "Magnetic force"],
          },
        ],
      },
      {
        slug: "electromagnetic-induction",
        title: "Electromagnetic Induction",
        topics: [
          {
            slug: "electromagnetic-induction",
            title: "Electromagnetic Induction",
            summary:
              "Connect changing magnetic flux to induced EMF, Lenz's law, self inductance, mutual inductance, and magnetic energy.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["Faraday's law", "Lenz's law", "Inductance"],
            subtopics: ["Changing flux", "Induced EMF", "Mutual inductance"],
          },
        ],
      },
      {
        slug: "maxwells-equations",
        title: "Maxwell's Equations",
        topics: [
          {
            slug: "maxwells-equations",
            title: "Maxwell's Equations",
            summary:
              "Interpret Maxwell's equations in integral and differential forms and understand displacement current and field coupling.",
            estimatedTime: "45 min",
            status: "ready",
            concepts: ["Gauss law", "Faraday law", "Displacement current"],
            subtopics: ["Integral form", "Differential form", "Field coupling"],
          },
        ],
      },
      {
        slug: "electromagnetic-waves",
        title: "Electromagnetic Waves",
        topics: [
          {
            slug: "electromagnetic-waves",
            title: "Electromagnetic Waves",
            summary:
              "Understand wave equation, plane waves, E-H-field orientation, Poynting vector, and propagation in different media.",
            estimatedTime: "40 min",
            status: "ready",
            concepts: ["Plane wave", "Poynting vector", "Attenuation"],
            subtopics: ["Uniform plane waves", "Free space", "Conductors and dielectrics"],
          },
        ],
      },
      {
        slug: "transmission-lines",
        title: "Transmission Lines",
        topics: [
          {
            slug: "transmission-lines",
            title: "Transmission Lines",
            summary:
              "Revise line parameters, telegrapher equations, reflection coefficient, standing wave ratio, and impedance matching.",
            estimatedTime: "45 min",
            status: "ready",
            concepts: ["Characteristic impedance", "Reflection coefficient", "SWR"],
            subtopics: ["Line parameters", "Reflections", "Impedance matching"],
          },
        ],
      },
      {
        slug: "waveguides",
        title: "Waveguides",
        topics: [
          {
            slug: "waveguides",
            title: "Waveguides",
            summary:
              "Study rectangular waveguides, TE/TM/TEM modes, cutoff frequency, phase velocity, and group velocity.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["TE mode", "TM mode", "Cutoff frequency"],
            subtopics: ["Rectangular waveguides", "Modes", "Phase and group velocity"],
          },
        ],
      },
      {
        slug: "antennas",
        title: "Antennas",
        topics: [
          {
            slug: "antennas",
            title: "Antennas",
            summary:
              "Cover radiation pattern, gain, directivity, efficiency, dipole antenna, arrays, and radiation mechanism.",
            estimatedTime: "35 min",
            status: "ready",
            concepts: ["Radiation pattern", "Gain", "Directivity"],
            subtopics: ["Dipole antenna", "Antenna arrays", "Radiation mechanism"],
          },
        ],
      },
      {
        slug: "electromagnetic-compatibility-and-applications",
        title: "Electromagnetic Compatibility and Applications",
        topics: [
          {
            slug: "electromagnetic-compatibility-and-applications",
            title: "Electromagnetic Compatibility and Applications",
            summary:
              "Understand shielding, interference, microwave applications, radar basics, and noise suppression from an EMFT perspective.",
            estimatedTime: "30 min",
            status: "ready",
            concepts: ["Shielding", "Interference", "Radar"],
            subtopics: ["EMI", "Microwave communication", "Noise suppression"],
          },
        ],
      },
    ],
  },
];

const microprocessorTopicSeed = [
  ["introduction-to-microprocessors", "Introduction to Microprocessors", "CPU, memory, and I/O communicate over system buses to complete input-process-output work.", "CPU fetches instructions from memory, processes data, and exchanges signals with I/O devices.", "Input-process-output"],
  ["8085-microprocessor-architecture", "8085 Microprocessor Architecture", "The 8085 is organized around ALU, accumulator, registers, buses, flags, PC, SP, and timing-control logic.", "Program counter selects the next instruction, registers hold data, and the ALU performs operations.", "PC -> memory -> instruction register -> ALU"],
  ["8085-instruction-set", "8085 Instruction Set", "Instructions tell the processor what operation to perform and where operands are located.", "Opcode defines the operation, while addressing mode tells how to find data.", "Opcode + operand + addressing mode"],
  ["assembly-language-programming", "Assembly Language Programming", "Assembly programs are step-by-step instructions that update registers, flags, and memory locations.", "Trace register values after every instruction to avoid programming mistakes.", "Trace registers and flags"],
  ["timing-diagrams-and-machine-cycles", "Timing Diagrams and Machine Cycles", "Machine cycles split instruction execution into clocked bus operations such as opcode fetch, memory read, and memory write.", "Timing diagrams show when address, data, and control signals become active.", "Instruction cycle = machine cycles = T-states"],
  ["interrupts-in-8085", "Interrupts in 8085", "Interrupts let external or software events pause the main program and jump to a service routine.", "Priority decides which request is serviced first when multiple interrupts arrive.", "TRAP > RST7.5 > RST6.5 > RST5.5 > INTR"],
  ["memory-interfacing", "Memory Interfacing", "Memory interfacing connects processor address, data, and control buses to RAM or ROM using address decoding.", "Chip select logic activates only the required memory device for a given address range.", "Address decoding creates chip select"],
  ["io-interfacing", "I/O Interfacing", "I/O interfacing connects external peripherals using I/O mapped or memory mapped techniques.", "Data transfer can be programmed, interrupt-driven, or handled by DMA.", "Programmed I/O, interrupt I/O, DMA"],
  ["8255-programmable-peripheral-interface", "8255 Programmable Peripheral Interface", "8255 expands processor I/O through Port A, Port B, Port C, operating modes, and a control word.", "The control word configures port direction and operating mode.", "Ports A/B/C + control word"],
  ["8086-microprocessor", "8086 Microprocessor", "8086 uses BIU and EU with segmented memory to generate 20-bit physical addresses.", "Segment and offset combine to access a larger memory space.", "Physical address = segment x 10H + offset"],
  ["advanced-topics", "Advanced Topics", "Advanced microprocessor systems use DMA, serial communication, peripheral controllers, and embedded-system style interaction.", "DMA moves data without continuous CPU involvement, improving throughput.", "CPU, DMA, peripheral, memory"],
];

const microprocessorTopicDetails = Object.fromEntries(
  microprocessorTopicSeed.map(([slug, shortTitle, introLine, intuition, formula]) => [
    `microprocessors/${slug}`,
    {
      metaTitle:
        slug === "8086-microprocessor"
          ? "8086 Microprocessor - ECE Exam Guide"
          : `${shortTitle} GATE ECE Microprocessors Quick Notes + PYQs + Revision`,
      ...(slug === "8086-microprocessor"
        ? { canonicalPath: "/8086-microprocessor" }
        : {}),
      metaDescription:
        slug === "8086-microprocessor"
          ? "Understand 8086 microprocessor architecture, BIU, EU, memory segmentation, register organization, addressing modes, and 20-bit physical address generation for ECE exams."
          : `Learn ${shortTitle} with animated step-by-step visualization, microprocessor notes, PSU Microprocessors tips, and university exam preparation.`,
      keywords:
        slug === "8086-microprocessor"
          ? "8086 microprocessor, 8086 architecture, BIU, EU, memory segmentation, 8086 addressing modes, ECE exam guide, GATE ECE Microprocessors"
          : "GATE ECE Microprocessors, PSU Microprocessors, microprocessor notes, 8085 notes, 8086 architecture, university exam preparation",
      shortTitle,
      coreQuestion: `How does ${shortTitle} help explain processor operation?`,
      examFocus:
        "Processor architecture, instruction execution, bus activity, timing, interrupts, interfacing, 8085 quick notes, and 8086 architecture.",
      engineeringUse:
        "Used in embedded systems, instrumentation, control hardware, peripheral interfacing, industrial automation, and processor-based products.",
      intro: [
        introLine,
        `${shortTitle} should be revised as part of GATE ECE Microprocessors, PSU Microprocessors, 8085 notes, 8086 architecture, and university exam preparation.`,
      ],
      intuition,
      learningGoals: [
        "Read the processor block diagram as a data movement story.",
        "Connect registers, buses, memory, and control signals.",
        "Use the visualization to remember the exam sequence.",
      ],
      keyConcepts: [
        "Processor blocks",
        "Data bus and address bus",
        "Control signals",
        "Instruction execution flow",
      ],
      theoryCards: [
        {
          title: "Hardware intuition",
          detail:
            "Microprocessor questions become easier when every topic is treated as movement of address, data, and control information.",
        },
        {
          title: "Execution flow",
          detail:
            "Most concepts can be read as fetch, decode, execute, transfer, or service sequences.",
        },
        {
          title: "Exam pattern",
          detail:
            "GATE and PSU questions often ask for bus role, instruction behavior, timing order, interrupt priority, or interfacing logic.",
        },
      ],
      formulas: [
        {
          label: "Core relation",
          expression: formula,
          note: "Use this as the compact revision hook for this chapter.",
        },
      ],
      examples: [
        {
          title: `Trace ${shortTitle}`,
          prompt: `A question asks the sequence of events in ${shortTitle}.`,
          steps: [
            "Identify the active processor block or bus.",
            "Follow address, data, and control movement in order.",
            "Check the register, flag, memory, or peripheral effect at the end.",
          ],
          answer: "The correct answer follows the ordered hardware flow, not isolated memorization.",
        },
      ],
      commonMistakes: [
        "Memorizing names without tracing data flow.",
        "Confusing address bus direction with data bus direction.",
        "Ignoring control signals or timing order.",
      ],
      examPointers: [
        "Draw the block flow before solving timing or interfacing questions.",
        "For instructions, always identify opcode, operand, addressing mode, and affected flags.",
      ],
      quickRevision: [formula],
      insightSummary:
        "Microprocessor questions reward ordered tracing: address first, data next, control decides timing.",
      relatedTopics: [
        {
          subjectSlug: "microprocessors",
          topicSlug:
            slug === "advanced-topics"
              ? "introduction-to-microprocessors"
              : microprocessorTopicSeed[
                  microprocessorTopicSeed.findIndex((item) => item[0] === slug) + 1
                ]?.[0] || "introduction-to-microprocessors",
        },
      ],
    },
  ])
);

const topicLibrary = {
  ...microprocessorTopicDetails,
  "electromagnetics/vector-calculus": {
    metaTitle: "Vector Calculus GATE ECE EMFT Quick Notes + Formulas + PYQs",
    metaDescription:
      "Learn vector calculus for GATE ECE Electromagnetic Theory with gradient, divergence, curl, coordinate systems, field visualization, EMFT quick notes, and PSU exam tips.",
    keywords:
      "GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, vector calculus, university exam preparation",
    shortTitle: "Vector Calculus",
    coreQuestion: "How do gradient, divergence, and curl describe the behavior of a field?",
    examFocus: "Coordinate systems, gradient direction, divergence source strength, curl rotation, Gauss theorem, and Stokes theorem.",
    engineeringUse: "Used to describe electric fields, magnetic fields, flux flow, circulation, and wave behavior.",
    intro: [
      "Vector Calculus is the language of Electromagnetic Theory. It converts field pictures into equations that can be used in GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, and university exam preparation.",
      "Instead of treating gradient, divergence, and curl as isolated formulas, read them as three questions: where does the field increase, where does it spread out, and where does it rotate?",
    ],
    intuition:
      "Gradient points toward fastest increase, divergence tells whether a point behaves like a source or sink, and curl tells whether the field has local rotation.",
    learningGoals: ["Choose the right coordinate system.", "Interpret gradient, divergence, and curl physically.", "Connect integral theorems to field-flow questions."],
    keyConcepts: ["Cartesian, cylindrical, and spherical coordinates", "Gradient as direction of maximum increase", "Divergence as field expansion", "Curl as circulation"],
    theoryCards: [
      { title: "Coordinate Systems", detail: "Pick the coordinate system that matches symmetry: rectangular objects use Cartesian, long wires use cylindrical, and point charges use spherical." },
      { title: "Vector Operations", detail: "Gradient acts on scalar fields, while divergence and curl act on vector fields." },
      { title: "Integral Theorems", detail: "Gauss theorem converts volume behavior to surface flux, and Stokes theorem converts surface curl to boundary circulation." },
    ],
    formulas: [
      { label: "Gradient", expression: "grad V", note: "Direction of maximum increase of scalar potential." },
      { label: "Divergence", expression: "div A", note: "Net outward field flow per unit volume." },
      { label: "Curl", expression: "curl A", note: "Local rotational tendency of a vector field." },
    ],
    examples: [{ title: "Identify the right operator", prompt: "A question asks whether field lines spread out from a point.", steps: ["Spreading from a point indicates source behavior.", "Source behavior is measured by divergence."], answer: "Use divergence." }],
    commonMistakes: ["Using Cartesian coordinates even when cylindrical or spherical symmetry makes the problem short.", "Memorizing formulas without understanding direction and physical meaning."],
    examPointers: ["Always check symmetry before choosing coordinates.", "Divergence links naturally to Gauss law; curl links naturally to Stokes theorem and Faraday/Ampere laws."],
    quickRevision: ["Gradient climbs, divergence spreads, curl rotates."],
    insightSummary: "Many EMFT numericals become shorter when the coordinate system and vector operator are chosen from symmetry first.",
    relatedTopics: [{ subjectSlug: "electromagnetics", topicSlug: "electrostatics" }],
  },
  "electromagnetics/electrostatics": {
    metaTitle: "Electrostatics GATE ECE EMFT Quick Notes + Formulas + PYQs",
    metaDescription:
      "Study electrostatics for GATE ECE Electromagnetic Theory with Coulomb force, electric field lines, Gauss surface, potential gradient, EMFT quick notes, and PSU tips.",
    keywords:
      "GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, electrostatics, university exam preparation",
    shortTitle: "Electrostatics",
    coreQuestion: "How do stationary charges create electric field, flux, potential, and force?",
    examFocus: "Coulomb law, electric field intensity, flux density, Gauss law, potential, potential gradient, and energy density.",
    engineeringUse: "Used in capacitors, insulation design, sensors, high-voltage systems, and semiconductor field regions.",
    intro: ["Electrostatics studies charges at rest and the fields they create.", "For exams, the fastest method is to identify symmetry, choose Gauss law when possible, and then connect field to potential."],
    intuition: "Positive charge sends electric field outward, negative charge pulls field inward, and potential decreases in the direction of the electric field.",
    learningGoals: ["Relate charge to field and flux.", "Use Gauss surfaces for symmetric charge distributions.", "Connect electric potential to field direction."],
    keyConcepts: ["Coulomb force", "Electric field lines", "Gauss surface", "Potential gradient"],
    theoryCards: [
      { title: "Coulomb Interaction", detail: "Charges exert force along the line joining them, with direction decided by attraction or repulsion." },
      { title: "Flux View", detail: "Flux counts how much electric field passes through a surface." },
      { title: "Potential View", detail: "Potential gives energy per unit charge, and field points from higher potential to lower potential." },
    ],
    formulas: [
      { label: "Coulomb law", expression: "F = (1 / 4 pi epsilon) q1 q2 / r^2", note: "Use direction carefully for attraction and repulsion." },
      { label: "Gauss law", expression: "closed integral D . dS = Q enclosed", note: "Best used when symmetry makes D constant over the surface." },
    ],
    examples: [{ title: "Choose Gauss law", prompt: "A uniformly charged sphere asks for field outside the sphere.", steps: ["Spherical symmetry exists.", "Choose a spherical Gaussian surface.", "Use enclosed charge over surface area."], answer: "Gauss law is the shortest method." }],
    commonMistakes: ["Using Gauss law without checking symmetry.", "Confusing electric field intensity E with flux density D."],
    examPointers: ["If the charge distribution is line, sheet, sphere, or cylinder-like, test Gauss law first."],
    quickRevision: ["Field lines show direction; flux counts crossing; potential gives energy per charge."],
    insightSummary: "Electrostatics questions are usually symmetry questions wearing formula clothing.",
    relatedTopics: [{ subjectSlug: "electromagnetics", topicSlug: "conductors-and-dielectrics" }],
  },
  "electromagnetics/conductors-and-dielectrics": {
    metaTitle: "Conductors and Dielectrics GATE ECE EMFT Quick Notes + Formulas + PYQs",
    metaDescription:
      "Learn conductors and dielectrics with charge distribution, polarization, capacitance, boundary conditions, EMFT quick notes, GATE ECE and PSU preparation.",
    keywords:
      "GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, conductors and dielectrics, university exam preparation",
    shortTitle: "Conductors and Dielectrics",
    coreQuestion: "How do materials reshape electric fields and boundary behavior?",
    examFocus: "Conductor properties, boundary conditions, capacitance, dielectric polarization, and permittivity.",
    engineeringUse: "Used in capacitors, cables, insulation, PCB spacing, and high-voltage dielectric design.",
    intro: ["Conductors allow free charge movement, while dielectrics polarize under electric fields.", "This chapter turns ideal field laws into material-aware EMFT problem solving."],
    intuition: "A conductor rearranges charge until the internal electric field becomes zero; a dielectric reduces effective field by polarization.",
    learningGoals: ["Explain charge distribution in conductors.", "Understand dielectric polarization.", "Apply capacitance and boundary-condition intuition."],
    keyConcepts: ["Surface charge", "Polarization", "Permittivity", "Capacitance"],
    theoryCards: [
      { title: "Conductors", detail: "Free charges move to the surface in electrostatic equilibrium, making the field inside the conductor zero." },
      { title: "Dielectrics", detail: "Bound charges shift slightly and create polarization that changes field strength." },
      { title: "Boundary Conditions", detail: "Tangential and normal field components obey different continuity rules at material boundaries." },
    ],
    formulas: [{ label: "Capacitance idea", expression: "C = Q / V", note: "Capacitance increases when geometry stores more charge for the same voltage." }],
    examples: [{ title: "Parallel plate with dielectric", prompt: "A dielectric is inserted into a capacitor.", steps: ["Permittivity increases.", "Capacitance increases.", "Field for a fixed free charge reduces."], answer: "The dielectric supports more charge storage." }],
    commonMistakes: ["Assuming field inside a conductor is nonzero in electrostatic equilibrium.", "Ignoring boundary normal/tangential directions."],
    examPointers: ["Capacitance and boundary conditions are common GATE ECE Electromagnetic Theory scoring areas."],
    quickRevision: ["Conductor cancels internal field; dielectric polarizes and changes capacitance."],
    insightSummary: "Material behavior explains why the same electric field law looks different in air, conductor, and dielectric regions.",
    relatedTopics: [{ subjectSlug: "electromagnetics", topicSlug: "magnetostatics" }],
  },
  "electromagnetics/magnetostatics": {
    metaTitle: "Magnetostatics GATE ECE EMFT Quick Notes + Formulas + PYQs",
    metaDescription:
      "Study magnetostatics with magnetic field around current, right-hand rule, Biot-Savart law, Ampere loop, EMFT quick notes, and PSU preparation.",
    keywords:
      "GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, magnetostatics, university exam preparation",
    shortTitle: "Magnetostatics",
    coreQuestion: "How do steady currents create magnetic fields and magnetic force?",
    examFocus: "Biot-Savart law, Ampere circuital law, magnetic flux density, vector potential, magnetic forces, and torque.",
    engineeringUse: "Used in motors, transformers, inductors, relays, transmission lines, and magnetic sensors.",
    intro: ["Magnetostatics studies magnetic fields produced by steady currents.", "The right-hand rule gives direction, while Biot-Savart and Ampere laws give magnitude."],
    intuition: "Current creates circular magnetic field lines around a conductor; stronger current means denser magnetic field.",
    learningGoals: ["Use right-hand rule direction.", "Choose Biot-Savart or Ampere law correctly.", "Relate magnetic field to force and torque."],
    keyConcepts: ["Current-carrying conductor", "Ampere loop", "Magnetic flux density", "Magnetic force"],
    theoryCards: [
      { title: "Biot-Savart View", detail: "Small current elements contribute small magnetic field vectors." },
      { title: "Ampere Loop View", detail: "For high symmetry, integrate H around a closed path to find enclosed current." },
      { title: "Force View", detail: "Magnetic fields exert force on moving charges and current-carrying conductors." },
    ],
    formulas: [
      { label: "Ampere law", expression: "closed integral H . dl = I enclosed", note: "Works cleanly for symmetric current distributions." },
      { label: "Force idea", expression: "F = q v x B", note: "Direction comes from cross product." },
    ],
    examples: [{ title: "Long straight conductor", prompt: "Find the magnetic field trend around a long wire.", steps: ["Symmetry is circular.", "Use an Amperian circle.", "Field decreases with distance from wire."], answer: "Magnetic field circles the wire and weakens with radius." }],
    commonMistakes: ["Forgetting that magnetic field direction wraps around current.", "Using Ampere law where symmetry is not enough."],
    examPointers: ["For long wire, solenoid, and toroid problems, test Ampere law first."],
    quickRevision: ["Current creates curling magnetic field; Ampere law loves symmetry."],
    insightSummary: "Magnetostatics is mostly direction plus symmetry: right-hand rule first, law selection second.",
    relatedTopics: [{ subjectSlug: "electromagnetics", topicSlug: "electromagnetic-induction" }],
  },
  "electromagnetics/electromagnetic-induction": {
    metaTitle: "Electromagnetic Induction GATE ECE EMFT Quick Notes + Formulas + PYQs",
    metaDescription:
      "Learn Faraday law, Lenz law, changing magnetic flux, induced EMF, self and mutual inductance with EMFT quick notes for GATE ECE and PSU exams.",
    keywords:
      "GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, electromagnetic induction, university exam preparation",
    shortTitle: "Electromagnetic Induction",
    coreQuestion: "How does changing magnetic flux create induced EMF?",
    examFocus: "Faraday law, Lenz law, self inductance, mutual inductance, and magnetic energy.",
    engineeringUse: "Used in transformers, generators, inductors, wireless charging, motors, and electromagnetic sensors.",
    intro: ["Electromagnetic Induction links changing magnetic fields to electric effects.", "This is the bridge from static fields to time-varying electromagnetic systems."],
    intuition: "A changing magnetic flux forces the circuit to respond with an induced EMF that opposes the change causing it.",
    learningGoals: ["Visualize changing flux.", "Apply Faraday law sign intuition.", "Separate self and mutual inductance."],
    keyConcepts: ["Changing flux", "Induced EMF", "Lenz opposition", "Mutual coupling"],
    theoryCards: [
      { title: "Faraday Law", detail: "The magnitude of induced EMF depends on the rate of change of magnetic flux." },
      { title: "Lenz Law", detail: "The induced effect opposes the change that produced it." },
      { title: "Mutual Inductance", detail: "Changing current in one coil induces voltage in a nearby coupled coil." },
    ],
    formulas: [{ label: "Faraday law", expression: "emf = - dPhi / dt", note: "The negative sign represents Lenz law opposition." }],
    examples: [{ title: "Moving magnet near coil", prompt: "A magnet moves toward a coil.", steps: ["Flux through coil changes.", "EMF is induced.", "Induced current opposes the flux change."], answer: "The coil produces a field opposing the magnet motion." }],
    commonMistakes: ["Ignoring the negative sign meaning in Faraday law.", "Confusing flux value with rate of change of flux."],
    examPointers: ["Look for words like changing, moving, time-varying, or induced."],
    quickRevision: ["No changing flux, no induction."],
    insightSummary: "Induction problems become clear when you first identify what change the circuit is trying to oppose.",
    relatedTopics: [{ subjectSlug: "electromagnetics", topicSlug: "maxwells-equations" }],
  },
  "electromagnetics/maxwells-equations": {
    metaTitle: "Maxwell's Equations GATE ECE EMFT Quick Notes + Formulas + PYQs",
    metaDescription:
      "Understand Maxwell's equations, integral and differential forms, displacement current, field coupling, EMFT quick notes, GATE ECE and PSU preparation.",
    keywords:
      "GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, Maxwell equations, university exam preparation",
    shortTitle: "Maxwell's Equations",
    coreQuestion: "How do electric and magnetic fields couple in space and time?",
    examFocus: "Four Maxwell equations, integral vs differential forms, displacement current, and physical interpretation.",
    engineeringUse: "Foundation of antennas, waves, transmission lines, waveguides, radar, and high-frequency electronics.",
    intro: ["Maxwell's equations summarize electromagnetic field behavior.", "They connect charge, current, electric field, magnetic field, and time variation."],
    intuition: "Changing electric fields create magnetic fields, and changing magnetic fields create electric fields, allowing waves to propagate.",
    learningGoals: ["Read each equation physically.", "Connect integral and differential forms.", "Understand displacement current."],
    keyConcepts: ["Gauss law for electric field", "Gauss law for magnetism", "Faraday law", "Ampere-Maxwell law"],
    theoryCards: [
      { title: "Electric Sources", detail: "Charges are sources or sinks of electric flux." },
      { title: "No Magnetic Monopoles", detail: "Magnetic field lines form closed loops." },
      { title: "Field Coupling", detail: "Time-varying electric and magnetic fields sustain each other." },
    ],
    formulas: [{ label: "Ampere-Maxwell idea", expression: "curl H = J + dD/dt", note: "Displacement current completes the law for time-varying fields." }],
    examples: [{ title: "Capacitor gap", prompt: "Current appears to flow in wires but not through dielectric gap.", steps: ["Electric field in gap changes.", "Changing D creates displacement current.", "Ampere-Maxwell law remains continuous."], answer: "Displacement current explains the magnetic field in the gap." }],
    commonMistakes: ["Memorizing equations without knowing what each term means.", "Forgetting displacement current in time-varying fields."],
    examPointers: ["Map each equation to its physical sentence before writing formulas."],
    quickRevision: ["Charges create E flux; changing B creates E; currents and changing E create H."],
    insightSummary: "Maxwell's equations are the reason static-field chapters become wave and antenna chapters.",
    relatedTopics: [{ subjectSlug: "electromagnetics", topicSlug: "electromagnetic-waves" }],
  },
  "electromagnetics/electromagnetic-waves": {
    metaTitle: "Electromagnetic Waves GATE ECE EMFT Quick Notes + Formulas + PYQs",
    metaDescription:
      "Learn plane wave propagation, E and H fields, Poynting vector, attenuation in conductors, EMFT quick notes, GATE ECE and PSU exam preparation.",
    keywords:
      "GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, electromagnetic waves, university exam preparation",
    shortTitle: "Electromagnetic Waves",
    coreQuestion: "How do electric and magnetic fields carry energy through space?",
    examFocus: "Wave equation, plane waves, uniform plane waves, propagation media, Poynting vector, and attenuation.",
    engineeringUse: "Used in wireless communication, antennas, radar, optics, microwave systems, and EMC analysis.",
    intro: ["Electromagnetic waves are coupled electric and magnetic fields that propagate energy.", "For exams, focus on field orientation, propagation direction, impedance, velocity, and attenuation."],
    intuition: "E field, H field, and propagation direction are mutually perpendicular in a uniform plane wave.",
    learningGoals: ["Visualize E-H-field orientation.", "Interpret Poynting vector direction.", "Understand attenuation in conductors."],
    keyConcepts: ["Plane wave", "Wave impedance", "Poynting vector", "Skin depth"],
    theoryCards: [
      { title: "Plane Wave", detail: "Fields vary with propagation direction while staying uniform over transverse planes." },
      { title: "Energy Flow", detail: "The Poynting vector gives direction and density of power flow." },
      { title: "Media Effect", detail: "Free space, dielectrics, and conductors change speed, attenuation, and impedance." },
    ],
    formulas: [{ label: "Poynting vector", expression: "S = E x H", note: "Direction is the direction of electromagnetic power flow." }],
    examples: [{ title: "Field orientation", prompt: "If E is along x and H is along y.", steps: ["Use cross product E x H.", "x cross y gives z."], answer: "The wave propagates along +z." }],
    commonMistakes: ["Making E and H parallel in a plane wave.", "Forgetting that conductors attenuate waves."],
    examPointers: ["Use right-hand cross product for propagation direction questions."],
    quickRevision: ["E perpendicular H perpendicular propagation; S = E x H."],
    insightSummary: "Wave questions are often vector-direction questions plus medium-property questions.",
    relatedTopics: [{ subjectSlug: "electromagnetics", topicSlug: "transmission-lines" }],
  },
  "electromagnetics/transmission-lines": {
    metaTitle: "Transmission Lines GATE ECE EMFT Quick Notes + Formulas + PYQs",
    metaDescription:
      "Study transmission lines with signal propagation, reflection coefficient, SWR, impedance matching, EMFT quick notes, GATE ECE and PSU preparation.",
    keywords:
      "GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, transmission lines, university exam preparation",
    shortTitle: "Transmission Lines",
    coreQuestion: "How does a high-frequency signal travel and reflect along a line?",
    examFocus: "Line parameters, telegrapher equations, reflection coefficient, SWR, and impedance matching.",
    engineeringUse: "Used in RF links, PCB traces, coaxial cables, antennas, microwave systems, and high-speed digital design.",
    intro: ["Transmission lines matter when signal wavelength becomes comparable to conductor length.", "At that point, propagation, reflection, and matching decide what reaches the load."],
    intuition: "A signal travels like a wave on the line; mismatch at the load sends part of it back as reflection.",
    learningGoals: ["Understand forward and reflected waves.", "Interpret reflection coefficient and SWR.", "Recognize impedance matching."],
    keyConcepts: ["Characteristic impedance", "Reflection coefficient", "Standing wave", "Matching"],
    theoryCards: [
      { title: "Distributed Parameters", detail: "R, L, C, and G are distributed along the line instead of lumped at one point." },
      { title: "Reflections", detail: "Load mismatch causes reflected wave components." },
      { title: "Matching", detail: "When load equals characteristic impedance, reflection ideally disappears." },
    ],
    formulas: [{ label: "Reflection coefficient", expression: "Gamma = (ZL - Z0) / (ZL + Z0)", note: "Gamma becomes zero for a matched load." }],
    examples: [{ title: "Matched load", prompt: "A line has Z0 = 50 ohm and load is 50 ohm.", steps: ["Substitute ZL = Z0.", "Numerator becomes zero."], answer: "Reflection coefficient is zero." }],
    commonMistakes: ["Treating a long high-frequency line as a short lumped wire.", "Confusing SWR with reflection coefficient."],
    examPointers: ["Check load matching before doing long calculations."],
    quickRevision: ["Mismatch reflects; matching absorbs."],
    insightSummary: "Transmission-line questions often reduce to whether energy is delivered, reflected, or standing on the line.",
    relatedTopics: [{ subjectSlug: "electromagnetics", topicSlug: "waveguides" }],
  },
  "electromagnetics/waveguides": {
    metaTitle: "Waveguides GATE ECE EMFT Quick Notes + Formulas + PYQs",
    metaDescription:
      "Learn rectangular waveguides, TE TM TEM modes, cutoff frequency, phase and group velocity with EMFT quick notes for GATE ECE and PSU exams.",
    keywords:
      "GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, waveguides, university exam preparation",
    shortTitle: "Waveguides",
    coreQuestion: "How do hollow conducting structures guide electromagnetic waves?",
    examFocus: "Rectangular waveguides, TE/TM/TEM modes, cutoff frequency, phase velocity, and group velocity.",
    engineeringUse: "Used in microwave links, radar, satellite systems, RF test setups, and high-power microwave transmission.",
    intro: ["Waveguides guide EM waves through conducting boundaries.", "Unlike ordinary two-conductor lines, rectangular waveguides support TE and TM modes with cutoff behavior."],
    intuition: "A waveguide passes waves only when frequency is above cutoff; below cutoff, energy does not propagate effectively.",
    learningGoals: ["Differentiate TE, TM, and TEM modes.", "Understand cutoff frequency.", "Compare phase and group velocity."],
    keyConcepts: ["Rectangular waveguide", "Cutoff", "TE mode", "TM mode"],
    theoryCards: [
      { title: "Mode Pattern", detail: "Field patterns must satisfy conducting-wall boundary conditions." },
      { title: "Cutoff", detail: "Every mode has a minimum frequency needed for propagation." },
      { title: "Velocity", detail: "Phase velocity and group velocity describe different parts of wave motion." },
    ],
    formulas: [{ label: "Cutoff idea", expression: "f must be greater than fc", note: "Below cutoff, the mode is evanescent." }],
    examples: [{ title: "Below cutoff", prompt: "A signal frequency is below cutoff for a mode.", steps: ["Check f < fc.", "Mode cannot propagate normally."], answer: "The wave decays instead of carrying power forward." }],
    commonMistakes: ["Assuming TEM mode exists in a hollow rectangular waveguide.", "Ignoring cutoff condition."],
    examPointers: ["Dominant mode and cutoff relations are high-yield topics."],
    quickRevision: ["Waveguides are mode-based and cutoff-limited."],
    insightSummary: "Waveguide questions become simpler when you identify the mode first and the cutoff condition second.",
    relatedTopics: [{ subjectSlug: "electromagnetics", topicSlug: "antennas" }],
  },
  "electromagnetics/antennas": {
    metaTitle: "Antennas GATE ECE EMFT Quick Notes + Formulas + PYQs",
    metaDescription:
      "Study antennas with dipole radiation, radiation pattern, gain, directivity, antenna arrays, EMFT quick notes, GATE ECE and PSU preparation.",
    keywords:
      "GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, antennas, university exam preparation",
    shortTitle: "Antennas",
    coreQuestion: "How does guided electrical energy become radiated electromagnetic energy?",
    examFocus: "Radiation pattern, gain, directivity, efficiency, dipole antenna, arrays, and radiation mechanism.",
    engineeringUse: "Used in mobile communication, broadcasting, radar, satellites, IoT, Wi-Fi, and microwave links.",
    intro: ["An antenna converts guided energy into radiated electromagnetic waves and also receives waves in reverse.", "For exams, focus on radiation pattern, gain, directivity, efficiency, and dipole intuition."],
    intuition: "Time-varying current on an antenna creates changing fields that detach and radiate outward.",
    learningGoals: ["Visualize dipole radiation.", "Interpret gain and directivity.", "Understand array direction control."],
    keyConcepts: ["Dipole antenna", "Radiation pattern", "Gain", "Antenna array"],
    theoryCards: [
      { title: "Dipole Radiation", detail: "Alternating current creates time-varying fields around the conductor." },
      { title: "Pattern", detail: "Radiation pattern shows how strongly energy is radiated in each direction." },
      { title: "Array", detail: "Multiple antennas combine fields to shape direction and beam strength." },
    ],
    formulas: [{ label: "Gain idea", expression: "Gain = efficiency x directivity", note: "Gain includes both focusing and losses." }],
    examples: [{ title: "Directivity vs gain", prompt: "An antenna focuses energy strongly but has loss.", steps: ["Directivity describes focusing.", "Gain includes efficiency loss."], answer: "Gain is less than ideal directivity if efficiency is below one." }],
    commonMistakes: ["Treating gain and directivity as always identical.", "Thinking antennas create energy instead of redirecting/radiating supplied energy."],
    examPointers: ["Radiation pattern and gain/directivity comparisons are common conceptual questions."],
    quickRevision: ["Antenna current radiates; pattern shows direction; gain includes efficiency."],
    insightSummary: "Antenna problems are field-shape problems, not only formula problems.",
    relatedTopics: [{ subjectSlug: "electromagnetics", topicSlug: "electromagnetic-compatibility-and-applications" }],
  },
  "electromagnetics/electromagnetic-compatibility-and-applications": {
    metaTitle: "Electromagnetic Compatibility GATE ECE EMFT Quick Notes + PYQs",
    metaDescription:
      "Learn EMC, shielding, electromagnetic interference, radar basics, microwave applications, noise suppression, EMFT quick notes, GATE ECE and PSU preparation.",
    keywords:
      "GATE ECE Electromagnetic Theory, PSU Electromagnetic Theory, EMFT quick notes, electromagnetic compatibility, university exam preparation",
    shortTitle: "EMC and Applications",
    coreQuestion: "How do we control unwanted electromagnetic interaction in real systems?",
    examFocus: "Shielding, interference, microwave applications, radar basics, and noise suppression.",
    engineeringUse: "Used in product compliance, PCB design, communication systems, radar, microwave links, and instrumentation.",
    intro: ["Electromagnetic Compatibility studies how systems operate without causing or suffering unacceptable interference.", "It connects field theory to practical shielding, grounding, radar, microwave, and noise-control decisions."],
    intuition: "EMI is unwanted field coupling; shielding and filtering reduce the path through which interference enters a system.",
    learningGoals: ["Visualize interference coupling.", "Understand shielding effectiveness.", "Connect radar and microwave applications to wave propagation."],
    keyConcepts: ["EMI", "Shielding", "Radar pulse", "Noise suppression"],
    theoryCards: [
      { title: "Interference", detail: "Unwanted electromagnetic energy couples into circuits through radiation or conduction." },
      { title: "Shielding", detail: "Conductive barriers reflect and absorb incident fields." },
      { title: "Radar", detail: "Radar sends waves and interprets reflected energy from targets." },
    ],
    formulas: [{ label: "Radar time idea", expression: "Range proportional to round-trip delay", note: "Distance is estimated from travel time of reflected signal." }],
    examples: [{ title: "Shielded enclosure", prompt: "A noisy field hits a conductive enclosure.", steps: ["Incident wave reaches shield.", "Part reflects and part attenuates.", "Internal field reduces."], answer: "Shielding reduces coupled interference." }],
    commonMistakes: ["Thinking shielding only blocks electric fields and never considering apertures or grounding.", "Ignoring coupling path in EMI problems."],
    examPointers: ["For EMC questions, identify source, coupling path, and victim."],
    quickRevision: ["EMC = source control + path control + victim protection."],
    insightSummary: "Applications questions become easier when you track how electromagnetic energy travels, reflects, couples, and is suppressed.",
    relatedTopics: [{ subjectSlug: "electromagnetics", topicSlug: "vector-calculus" }],
  },
  "digital/flip-flops": {
    learningGoals: [
      "Differentiate SR, JK, D, and T flip-flops using characteristic behavior.",
      "Solve conversion and excitation-table questions without memorizing too many cases.",
      "Spot where race-around, toggling, and edge-triggering appear in exam problems.",
    ],
    overview: [
      "Flip-flops are one-bit memory elements used in sequential circuits. Unlike combinational logic, their output depends on both the present input and the previous state.",
      "In exams, questions usually revolve around three things: the characteristic equation, the valid input combinations, and practical implications like toggling or race-around. The more fluently you move between truth table, excitation table, and next-state equation, the faster these questions become.",
      "A simple way to organize the topic is to think of D as store, T as toggle-on-demand, JK as the improved SR flip-flop, and SR as the basic memory element with a forbidden state in the clocked version.",
    ],
    formulas: [
      {
        label: "D flip-flop",
        expression: "Q(n+1) = D",
        note: "The next state directly follows the input on the active clock edge.",
      },
      {
        label: "T flip-flop",
        expression: "Q(n+1) = T xor Q(n)",
        note: "T = 1 toggles, T = 0 holds.",
      },
      {
        label: "JK flip-flop",
        expression: "Q(n+1) = JQ'(n) + K'Q(n)",
        note: "The JK form removes the invalid SR state and supports toggling.",
      },
      {
        label: "Characteristic timing idea",
        expression: "Next state changes only at the triggering clock edge",
        note: "This is why edge-triggered flip-flops avoid many level-sensitive timing issues.",
      },
    ],
    keyConcepts: [
      "The excitation table answers the reverse question: what input is required to move from the current state to the desired next state.",
      "Race-around is associated with level-triggered JK flip-flops when J = K = 1 and the clock pulse stays active long enough for repeated toggling.",
      "Master-slave and edge-triggered implementations are used to control repeated state changes inside the same clock interval.",
      "In counter and register questions, D and T flip-flops often reduce the state-equation work because their characteristic equations are compact.",
    ],
    examples: [
      {
        title: "Why does JK toggle for J = K = 1?",
        prompt:
          "A JK flip-flop receives J = 1 and K = 1 at the active edge. What happens to the output and why is this useful?",
        steps: [
          "Use the JK characteristic behavior instead of the SR forbidden-state intuition.",
          "When both inputs are high, the next state becomes the complement of the present state.",
          "This makes the JK flip-flop a natural building block for counters and divide-by-2 circuits.",
        ],
        answer:
          "The output toggles. If the present state is 0 it becomes 1, and if it is 1 it becomes 0.",
      },
      {
        title: "Convert a desired transition into excitation inputs",
        prompt:
          "If a T flip-flop must move from Q(n) = 0 to Q(n+1) = 1, what input should be applied?",
        steps: [
          "A T flip-flop toggles only when T = 1.",
          "The required state changes from 0 to 1, so a toggle is necessary.",
        ],
        answer: "Set T = 1.",
      },
    ],
    examPointers: [
      "Memorize the behavior labels rather than separate tables first: hold, set, reset, toggle.",
      "For conversion problems, write the present and next state first, then infer excitation inputs.",
      "If a question mentions repeated toggling during a long active clock pulse, think race-around in JK.",
    ],
    commonMistakes: [
      "Confusing the characteristic table with the excitation table.",
      "Assuming JK has the same invalid condition as SR when J = K = 1.",
      "Forgetting that race-around is tied to level-triggered JK operation, not edge-triggered behavior in general.",
    ],
    quickRevision: [
      "D stores, T toggles, JK improves SR, and SR is the basic latch-style memory idea.",
      "T = 0 holds and T = 1 toggles.",
      "Race-around appears for level-triggered JK with J = K = 1.",
    ],
    insightSummary:
      "Flip-flops show up not only as direct theory questions but also inside counters, registers, and FSM design. Strong fundamentals here unlock many later digital questions.",
    relatedTopics: [
      { subjectSlug: "digital", topicSlug: "counters" },
    ],
  },
  "signals/laplace-transform": {
    learningGoals: [
      "Recall standard transform pairs and region-of-convergence logic.",
      "Apply initial and final value theorems safely in quick questions.",
    ],
    overview: [
      "Laplace transform converts time-domain problems into algebraic s-domain forms. It is central to signal analysis and control-system modeling.",
      "Most exam questions stay close to standard pairs, step and impulse functions, poles, and ROC-based reasoning.",
    ],
    formulas: [
      {
        label: "Unit step",
        expression: "L{u(t)} = 1 / s",
        note: "Valid for Re(s) > 0 in the unilateral form.",
      },
      {
        label: "Derivative property",
        expression: "L{dx/dt} = sX(s) - x(0-)",
        note: "Useful for differential-equation problems.",
      },
    ],
    keyConcepts: [
      "ROC tells you about causality and stability.",
      "Pole-zero plots help interpret the transform quickly.",
      "Initial and final value theorems save time when conditions are satisfied.",
    ],
    examples: [
      {
        title: "Transform of a step input",
        prompt: "What is the unilateral Laplace transform of u(t)?",
        steps: [
          "Recall the standard transform pair.",
          "Associate the unit step with a simple pole at the origin.",
        ],
        answer: "The transform is 1 / s.",
      },
    ],
    examPointers: [
      "Always sanity-check ROC before using value theorems.",
      "Treat transform-pair questions as quick revision marks.",
    ],
    commonMistakes: [
      "Using the final value theorem without checking whether the conditions are satisfied.",
      "Ignoring ROC while deciding causality or stability.",
      "Memorizing transform pairs without connecting them to poles and system behavior.",
    ],
    quickRevision: [
      "Unit step maps to 1/s in the unilateral Laplace transform.",
      "ROC is central for causality and stability logic.",
      "Initial and final value theorems are shortcuts, but only when their conditions hold.",
    ],
    insightSummary:
      "Laplace transform links directly into control systems, so it is one of the best topics for cross-subject payoff.",
    relatedTopics: [
      { subjectSlug: "control-systems", topicSlug: "time-response" },
    ],
  },
  "networks/resonance": {
    learningGoals: [
      "Recognize resonance conditions in series and parallel RLC circuits.",
      "Relate quality factor and bandwidth to circuit sharpness.",
    ],
    overview: [
      "Resonance occurs when inductive and capacitive reactances cancel. At that frequency, the circuit exhibits a special impedance condition that is frequently tested in MCQs.",
      "Series resonance is especially important because the source sees a purely resistive impedance at resonance.",
    ],
    formulas: [
      {
        label: "Resonant frequency",
        expression: "w0 = 1 / sqrt(LC)",
        note: "Applies to the ideal RLC resonance condition.",
      },
      {
        label: "Bandwidth relation",
        expression: "Q = w0 / BW",
        note: "Higher Q means sharper resonance.",
      },
    ],
    keyConcepts: [
      "At series resonance, current becomes maximum for a fixed source voltage.",
      "Parallel resonance emphasizes impedance maximum rather than current maximum.",
      "Quality factor measures selectivity.",
    ],
    examples: [
      {
        title: "Source impedance at series resonance",
        prompt: "What impedance does the source see in a series RLC circuit at resonance?",
        steps: [
          "Cancel XL and XC under the resonance condition.",
          "Only resistance remains in the net impedance.",
        ],
        answer: "The source sees a purely resistive impedance.",
      },
    ],
    examPointers: [
      "If reactances cancel, rewrite the circuit mentally before evaluating options.",
      "Remember the difference between current peak and impedance peak in series vs parallel cases.",
    ],
    commonMistakes: [
      "Mixing up series resonance with parallel resonance conclusions.",
      "Remembering the resonant-frequency formula but forgetting what happens to impedance.",
      "Treating quality factor as a generic formula without linking it to sharpness and bandwidth.",
    ],
    quickRevision: [
      "At series resonance, impedance becomes purely resistive.",
      "Higher Q means sharper resonance and narrower bandwidth.",
      "Series resonance emphasizes current maximum, while parallel resonance emphasizes impedance maximum.",
    ],
    insightSummary:
      "Resonance questions are compact and formula-friendly, which makes them high-confidence marks once the physical picture is clear.",
    relatedTopics: [
      { subjectSlug: "networks", topicSlug: "two-port-networks" },
    ],
  },
  "networks/network-theorems-topic": {
    learningGoals: [
      "Understand why linear network theorems simplify complex circuits without changing terminal behavior.",
      "Move confidently between original circuits and equivalent two-terminal representations.",
      "Use theorem selection as a speed tool in exam problem solving.",
    ],
    overview: [
      "Network theorems are powerful because they let you replace a complicated linear circuit by a simpler form while preserving the same external response at selected terminals. This is why the subject feels elegant once the theory is clear.",
      "Thevenin and Norton theorems describe the same network in voltage-source and current-source language. Superposition explains how each independent source contributes separately in a linear circuit, while maximum power transfer shows how load selection affects delivered power.",
      "These results are not separate tricks. They all come from the same foundations: linearity, source behavior, and equivalent terminal characteristics.",
    ],
    formulas: [
      {
        label: "Thevenin voltage",
        expression: "Vth = open-circuit voltage at the terminals",
        note: "Find the terminal voltage with the load removed.",
      },
      {
        label: "Norton current",
        expression: "In = short-circuit current at the terminals",
        note: "Find the current when the output terminals are shorted.",
      },
      {
        label: "Maximum power transfer",
        expression: "Pmax = Vth^2 / (4Rth)",
        note: "For DC resistive networks, maximum power occurs when RL = Rth.",
      },
    ],
    keyConcepts: [
      "Thevenin and Norton equivalents are interchangeable views of the same linear two-terminal network.",
      "Superposition is applied to voltage and current responses, not directly to power.",
      "Equivalent resistance is easy with independent sources suppressed, but dependent sources require extra care.",
      "Source transformation is a fast bridge between voltage-source and current-source forms.",
    ],
    examples: [
      {
        title: "Finding the correct Norton relation",
        prompt: "A circuit has Thevenin equivalent Vth and Rth. How do you write the Norton current?",
        steps: [
          "Recall that Thevenin and Norton forms must produce the same terminal behavior.",
          "Use the relation between equivalent voltage source and current source.",
          "Divide the Thevenin voltage by the equivalent resistance.",
        ],
        answer: "The Norton current is In = Vth / Rth.",
      },
    ],
    examPointers: [
      "If the question asks for a load-side view, think immediately in terms of terminal equivalence.",
      "Use source suppression only when the network has independent sources alone.",
      "For maximum power transfer, separate the condition from the power formula so you do not mix the two steps.",
    ],
    commonMistakes: [
      "Adding powers under superposition instead of recomputing power from the final voltage or current.",
      "Turning off dependent sources while finding equivalent resistance.",
      "Forgetting that open-circuit voltage and short-circuit current are terminal quantities, not random branch quantities.",
    ],
    quickRevision: [
      "Vth is the open-circuit voltage and In is the short-circuit current.",
      "Thevenin and Norton are equivalent if Rth = Rn and Vth = In Rth.",
      "For resistive DC networks, maximum power transfer occurs when RL equals Rth.",
    ],
    insightSummary:
      "Network theorems reward conceptual clarity. Once the terminal viewpoint becomes natural, many long circuits shrink into one- or two-step problems.",
    relatedTopics: [
      { subjectSlug: "networks", topicSlug: "nodal-and-mesh-analysis" },
      { subjectSlug: "networks", topicSlug: "two-port-networks" },
    ],
  },
  "networks/nodal-and-mesh-analysis": {
    learningGoals: [
      "Convert circuits into systematic equations using node voltages or mesh currents.",
      "Choose the faster method based on source placement and circuit structure.",
      "Handle supernodes, supermeshes, and dependent sources without losing equation consistency.",
    ],
    overview: [
      "Nodal and mesh analysis are core analytical methods in Network Analysis. They replace intuition-based guessing with a repeatable equation-writing process that works even when direct circuit reduction is inconvenient.",
      "Nodal analysis is built around unknown node voltages and current balance at each essential node. Mesh analysis is built around unknown loop currents and voltage balance around each mesh in a planar circuit.",
      "Once the method is chosen properly, the circuit becomes a set of simultaneous equations. This is why strong theory here gives direct power in both DC and AC circuit questions.",
    ],
    formulas: [
      {
        label: "KCL foundation",
        expression: "Sum of currents leaving or entering a node = 0",
        note: "Write all branch currents using node-voltage differences over impedance or resistance.",
      },
      {
        label: "KVL foundation",
        expression: "Algebraic sum of voltages around a mesh = 0",
        note: "Choose one loop direction and stay consistent with signs.",
      },
      {
        label: "Resistive branch current",
        expression: "I = (Va - Vb) / R",
        note: "This simple relation drives most nodal equations in resistive circuits.",
      },
    ],
    keyConcepts: [
      "Nodal analysis usually becomes efficient when current sources are present.",
      "Mesh analysis is often neat when voltage sources define clear planar loops.",
      "A supernode is formed when a voltage source connects two non-reference nodes.",
      "A supermesh is formed when a current source lies between adjacent meshes.",
    ],
    examples: [
      {
        title: "Choosing the faster method",
        prompt: "A planar circuit contains several current sources connected to essential nodes. Which method is usually the better first choice?",
        steps: [
          "Check whether the sources align naturally with current-balance equations.",
          "Notice that current sources fit directly into nodal equations.",
          "Prefer the method with fewer unknowns and fewer source conversions.",
        ],
        answer: "Nodal analysis is usually the better first choice.",
      },
    ],
    examPointers: [
      "Count unknowns before starting. The better method is often the one with fewer equations.",
      "In AC circuits, write impedances first and then apply the same nodal or mesh framework.",
      "When signs become confusing, rewrite one equation carefully instead of adjusting all equations blindly.",
    ],
    commonMistakes: [
      "Changing current directions or voltage polarities midway through the solution.",
      "Forgetting the extra constraint equation that comes with a supernode or a supermesh.",
      "Writing resistor current in the wrong order as (Vb - Va) / R after already assuming the opposite direction.",
    ],
    quickRevision: [
      "Nodal uses node voltages and KCL; mesh uses loop currents and KVL.",
      "Supernode comes with a voltage relation; supermesh comes with a current relation.",
      "The best method is the one that makes equation writing shortest and cleanest.",
    ],
    insightSummary:
      "This topic is where Network Analysis becomes algorithmic. Good equation discipline here improves speed across transients, AC analysis, and theorem verification.",
    relatedTopics: [
      { subjectSlug: "networks", topicSlug: "network-theorems-topic" },
      { subjectSlug: "networks", topicSlug: "first-order-transients" },
    ],
  },
  "networks/two-port-networks": {
    learningGoals: [
      "Understand how two-port parameters describe input-output behavior of a network compactly.",
      "Recognize when Z, Y, h, or ABCD parameters are the natural choice.",
      "Use reciprocity and symmetry conditions as quick theory checks in exam questions.",
    ],
    overview: [
      "A two-port network is a model for circuits that interact through an input port and an output port. Instead of solving the internal network every time, you summarize its behavior with parameter sets.",
      "This is especially useful in cascaded systems, amplifier models, filters, and transmission-related networks. The theory matters because it gives a compact language for interconnection.",
      "Different parameter sets are chosen based on which variables are easier to measure or constrain. Once you see the physical meaning of open-circuit and short-circuit conditions, the formulas become far easier to remember.",
    ],
    formulas: [
      {
        label: "Z-parameter idea",
        expression: "V1 = z11 I1 + z12 I2 and V2 = z21 I1 + z22 I2",
        note: "Useful when port currents are natural independent variables.",
      },
      {
        label: "Y-parameter idea",
        expression: "I1 = y11 V1 + y12 V2 and I2 = y21 V1 + y22 V2",
        note: "Useful when port voltages are natural independent variables.",
      },
      {
        label: "Reciprocity condition for Z parameters",
        expression: "z12 = z21",
        note: "A quick theory check for reciprocal networks.",
      },
    ],
    keyConcepts: [
      "Open-circuit and short-circuit test conditions define many parameter entries.",
      "Reciprocity expresses mutual interchange behavior between ports.",
      "Symmetry means the network looks electrically balanced from both sides under the given parameter set.",
      "ABCD parameters are especially convenient for cascaded two-port networks.",
    ],
    examples: [
      {
        title: "Checking reciprocity quickly",
        prompt: "A two-port network has z12 not equal to z21. What can you conclude immediately?",
        steps: [
          "Recall the reciprocity condition in the Z-parameter set.",
          "Compare the transfer terms from one port to the other.",
          "Use the mismatch to classify the network property.",
        ],
        answer: "The network is not reciprocal under the given description.",
      },
    ],
    examPointers: [
      "Link each parameter family to the test condition used to find it, not just the symbol.",
      "For short conceptual questions, reciprocity and symmetry conditions often solve the problem before any matrix conversion.",
      "In cascade networks, ABCD thinking is often cleaner than repeatedly using Z or Y forms.",
    ],
    commonMistakes: [
      "Memorizing parameter tables without connecting them to open-circuit or short-circuit conditions.",
      "Mixing reciprocity and symmetry as if they mean the same property.",
      "Using the wrong independent variables when writing a chosen parameter form.",
    ],
    quickRevision: [
      "Z parameters relate voltages to currents, while Y parameters relate currents to voltages.",
      "Reciprocity for Z parameters means z12 equals z21.",
      "Two-port theory is a compact description of input-output behavior, not just a formula table.",
    ],
    insightSummary:
      "Two-port networks may seem abstract at first, but they become much easier when treated as a language for describing interconnected blocks rather than as isolated matrix formulas.",
    relatedTopics: [
      { subjectSlug: "networks", topicSlug: "resonance" },
      { subjectSlug: "networks", topicSlug: "network-theorems-topic" },
    ],
  },
  "networks/first-order-transients": {
    learningGoals: [
      "Understand how capacitors and inductors create time-dependent responses after switching.",
      "Use initial value, final value, and time constant ideas to sketch or solve first-order behavior quickly.",
      "Distinguish natural response from forced response in RC and RL circuits.",
    ],
    overview: [
      "First-order transients describe how a circuit changes from one steady state to another after a switching action. Because energy storage elements cannot change their key variables instantaneously, the response unfolds over time instead of jumping immediately.",
      "In an RC circuit, capacitor voltage is continuous. In an RL circuit, inductor current is continuous. This single physical statement explains a large fraction of transient-theory questions.",
      "The topic becomes easy when you organize each problem into initial condition, final condition, and the exponential transition between them.",
    ],
    formulas: [
      {
        label: "General first-order form",
        expression: "x(t) = xf + (x0 - xf) e^(-t / tau)",
        note: "Use it for capacitor voltage, inductor current, or any first-order state variable.",
      },
      {
        label: "RC time constant",
        expression: "tau = RC",
        note: "Applies when the capacitor sees an equivalent resistance R.",
      },
      {
        label: "RL time constant",
        expression: "tau = L / R",
        note: "Applies when the inductor sees an equivalent resistance R.",
      },
    ],
    keyConcepts: [
      "Capacitor voltage cannot change abruptly unless the current becomes impulsive.",
      "Inductor current cannot change abruptly unless the voltage becomes impulsive.",
      "Natural response comes from stored energy, while forced response depends on external excitation.",
      "After about five time constants, the circuit is effectively at its new steady state.",
    ],
    examples: [
      {
        title: "Identify the continuous variable",
        prompt: "Immediately after switching in an RC circuit, which quantity must remain continuous?",
        steps: [
          "Recall the physical storage variable of the capacitor.",
          "Connect capacitor charge continuity to the measured electrical variable.",
          "Use that continuity rule before writing the transient expression.",
        ],
        answer: "Capacitor voltage must remain continuous.",
      },
    ],
    examPointers: [
      "Find the initial and final values before writing the exponential response.",
      "Replace the rest of the circuit by the equivalent resistance seen by the storage element when computing the time constant.",
      "When the question is conceptual, continuity rules often give the answer before any algebra is needed.",
    ],
    commonMistakes: [
      "Starting directly with the exponential equation without finding the final steady-state value.",
      "Using the full circuit resistance instead of the equivalent resistance seen by the capacitor or inductor.",
      "Confusing capacitor-current continuity with capacitor-voltage continuity, or the corresponding RL rule.",
    ],
    quickRevision: [
      "RC: capacitor voltage is continuous and tau equals RC.",
      "RL: inductor current is continuous and tau equals L over R.",
      "Most first-order responses are initial-to-final exponential transitions.",
    ],
    insightSummary:
      "Transient theory becomes much less intimidating once you trust the continuity rules and the initial-final-time-constant framework.",
    relatedTopics: [
      { subjectSlug: "networks", topicSlug: "nodal-and-mesh-analysis" },
      { subjectSlug: "networks", topicSlug: "resonance" },
    ],
  },
  "control-systems/time-response": {
    learningGoals: [
      "Classify second-order responses using damping ratio.",
      "Relate overshoot, settling time, and natural frequency to response shape.",
    ],
    overview: [
      "Time-response analysis studies how a control system reacts to inputs over time. A large share of exam questions focus on the standard second-order form because it connects directly to intuitive behavior.",
      "Once you know the damping ratio and natural frequency, you can often identify whether the system is underdamped, critically damped, or overdamped without lengthy derivation.",
    ],
    formulas: [
      {
        label: "Standard denominator",
        expression: "s^2 + 2zeta wn s + wn^2",
        note: "This is the reference form for many textbook results.",
      },
      {
        label: "Settling time approximation",
        expression: "Ts approx 4 / (zeta wn)",
        note: "Common 2 percent criterion shortcut.",
      },
    ],
    keyConcepts: [
      "zeta > 1 gives an overdamped response.",
      "0 < zeta < 1 gives oscillatory underdamped behavior.",
      "Higher damping reduces overshoot but can slow response.",
    ],
    examples: [
      {
        title: "Classify the system from zeta",
        prompt: "How is a second-order system classified when damping ratio is greater than 1?",
        steps: [
          "Map the value of zeta to the standard response categories.",
          "Recognize that real, distinct poles imply non-oscillatory behavior.",
        ],
        answer: "The system is overdamped.",
      },
    ],
    examPointers: [
      "Translate zeta into response shape before touching any formula.",
      "Keep one line of memory for underdamped, critically damped, and overdamped cases.",
    ],
    commonMistakes: [
      "Starting with formulas before classifying the response from the damping ratio.",
      "Forgetting that zeta greater than one means non-oscillatory overdamped behavior.",
      "Mixing settling-time intuition with overshoot intuition without checking how damping changes both.",
    ],
    quickRevision: [
      "zeta greater than one means overdamped.",
      "0 less than zeta less than 1 means underdamped and oscillatory.",
      "The standard second-order denominator is s^2 + 2 zeta wn s + wn^2.",
    ],
    insightSummary:
      "Time-response theory is foundational for root locus and frequency response, so this topic pays back across the full control-systems syllabus.",
    relatedTopics: [
      { subjectSlug: "signals", topicSlug: "laplace-transform" },
      { subjectSlug: "control-systems", topicSlug: "root-locus" },
    ],
  },
  "analog/active-filters": {
    learningGoals: [
      "Classify low-pass, high-pass, and band-pass active filters from the circuit structure.",
      "Relate cutoff frequency and order to the shape of the magnitude response.",
      "Use op-amp based intuition to answer quick exam questions without full derivations.",
    ],
    overview: [
      "Active filters use amplifying devices like op-amps together with resistors and capacitors to shape the frequency response of a circuit. Unlike passive RC filters, they can provide gain and buffering in addition to filtering.",
      "In exam questions, active filters are usually tested through identification, cutoff-frequency relations, and the difference between first-order and higher-order behavior. The fastest approach is to read the topology, identify the passband, and then connect that to the expected Bode-style response.",
      "When an op-amp is used in a filter, the gain stage and frequency-selective network work together. This is why active filters are common in signal conditioning and measurement systems.",
    ],
    formulas: [
      {
        label: "First-order cutoff frequency",
        expression: "fc = 1 / (2 pi RC)",
        note: "This is the standard starting relation for simple RC-based active filter sections.",
      },
      {
        label: "Passband gain",
        expression: "Av = 1 + Rf / R1",
        note: "A common non-inverting op-amp form used in active low-pass and high-pass realizations.",
      },
      {
        label: "Slope idea",
        expression: "20 dB/decade per pole",
        note: "Each additional pole increases the rate of attenuation beyond the cutoff region.",
      },
    ],
    keyConcepts: [
      "A low-pass filter passes low frequencies and attenuates high frequencies.",
      "A high-pass filter does the opposite and is often recognized by the capacitor placement in the input network.",
      "Filter order decides how sharply the response changes around cutoff.",
      "Active filters avoid loading problems because the op-amp can buffer the next stage.",
    ],
    examples: [
      {
        title: "Recognize a low-pass active filter",
        prompt:
          "A circuit uses an op-amp with an RC network that strongly attenuates high-frequency components while maintaining low-frequency gain. What class of filter is it?",
        steps: [
          "Focus on which frequency region is preserved.",
          "If low frequencies pass with gain and higher ones are reduced, the filter is low-pass.",
          "Then connect the answer to the cutoff-frequency relation and pole count if needed.",
        ],
        answer:
          "It is an active low-pass filter.",
      },
    ],
    examPointers: [
      "First identify the passband, then think about the formula.",
      "If the question asks about roll-off, count poles and remember 20 dB/decade per pole.",
      "Use cutoff-frequency intuition before diving into op-amp algebra.",
    ],
    commonMistakes: [
      "Memorizing the cutoff formula but not knowing whether the circuit is low-pass or high-pass.",
      "Confusing gain-setting resistors with the frequency-selective RC network.",
      "Forgetting that active filters can provide gain and isolation, not just attenuation.",
    ],
    quickRevision: [
      "Low-pass keeps low frequencies, high-pass keeps high frequencies.",
      "First-order cutoff starts with fc = 1 / (2 pi RC).",
      "Each pole adds roughly 20 dB/decade to the roll-off rate.",
    ],
    insightSummary:
      "Active-filter questions often become easy once the passband is identified. Structure first, formula second is the fastest route.",
    relatedTopics: [
      { subjectSlug: "signals", topicSlug: "sampling-theorem" },
    ],
  },
  "digital/boolean-algebra-and-kmaps": {
    learningGoals: [
      "Reduce Boolean expressions using standard identities and K-map grouping rules.",
      "Move between minterms, maxterms, SOP, and POS forms comfortably.",
      "Use don't-care conditions to simplify logic further in exam-style problems.",
    ],
    overview: [
      "Boolean algebra gives you the symbolic rules for simplifying digital logic, while Karnaugh maps give you a visual shortcut for minimization. Together, they form one of the fastest-scoring theory blocks in digital electronics.",
      "In exams, the real skill is not memorizing too many identities in isolation, but recognizing when terms can be absorbed, combined, or grouped. K-maps help convert abstract expressions into patterns that can be simplified almost mechanically.",
      "Once you understand adjacency, grouping powers of two, and the role of don't-care terms, many logic-minimization questions become short routine steps instead of long derivations.",
    ],
    formulas: [
      {
        label: "Idempotent law",
        expression: "A + A = A, A.A = A",
        note: "Repeating the same literal does not change the expression.",
      },
      {
        label: "Complement law",
        expression: "A + A' = 1, A.A' = 0",
        note: "A variable combined with its complement gives a constant result.",
      },
      {
        label: "Absorption law",
        expression: "A + AB = A, A(A + B) = A",
        note: "A common shortcut in manual algebraic simplification.",
      },
    ],
    keyConcepts: [
      "Minterms correspond to canonical SOP representation, while maxterms correspond to canonical POS representation.",
      "K-map group sizes must be powers of two such as 1, 2, 4, or 8.",
      "Larger valid groups generally produce simpler expressions.",
      "Don't-care terms are optional helpers that can be included only when they simplify the final form.",
    ],
    examples: [
      {
        title: "Use a K-map grouping shortcut",
        prompt:
          "A 4-variable K-map has four adjacent 1s in a rectangular group. What should you expect in the simplified term?",
        steps: [
          "Find which variables stay constant across the whole group.",
          "Drop the variables that change inside the group.",
          "Write only the literals that remain fixed.",
        ],
        answer:
          "The simplified term keeps only the variables constant across that 4-cell group.",
      },
    ],
    examPointers: [
      "Before using a K-map, decide whether the answer should end in SOP or POS form.",
      "Always try to make the largest valid groups first.",
      "Use don't-care entries only when they reduce the number of literals.",
    ],
    commonMistakes: [
      "Making groups that are not powers of two.",
      "Forgetting that K-map edges wrap around and are still adjacent.",
      "Treating don't-care cells as mandatory 1s instead of optional simplification aids.",
    ],
    quickRevision: [
      "Minterms map to SOP and maxterms map to POS.",
      "Groups must be 1, 2, 4, 8, and so on.",
      "Bigger valid groups usually mean fewer literals in the answer.",
    ],
    insightSummary:
      "Boolean simplification is one of the best places to save exam time because the rules are stable and highly repeatable.",
    relatedTopics: [
      { subjectSlug: "digital", topicSlug: "combinational-circuits" },
      { subjectSlug: "digital", topicSlug: "flip-flops" },
    ],
  },
  "signals/sampling-theorem": {
    learningGoals: [
      "State the Nyquist sampling condition and use it in direct exam questions.",
      "Explain aliasing in a simple physical way and recognize when it occurs.",
      "Connect sampling rate, signal bandwidth, and reconstruction quality.",
    ],
    overview: [
      "Sampling theorem tells you how fast a continuous-time signal must be sampled so that it can be reconstructed from its samples without losing information. This is one of the most repeated conceptual topics in signals and communications.",
      "The core idea is simple: if the sampling frequency is at least twice the highest frequency present in the signal, ideal reconstruction is possible. If the sampling rate is too low, spectral overlap occurs and the original information becomes ambiguous.",
      "In exam settings, this topic is usually tested through direct numerical conditions, aliasing interpretation, or reconstruction logic rather than heavy derivation.",
    ],
    formulas: [
      {
        label: "Nyquist condition",
        expression: "fs >= 2 fm",
        note: "The sampling frequency must be at least twice the highest message frequency.",
      },
      {
        label: "Nyquist rate",
        expression: "2 fm",
        note: "This is the minimum ideal sampling rate for a baseband signal with highest frequency fm.",
      },
      {
        label: "Sampling period relation",
        expression: "Ts = 1 / fs",
        note: "Useful when the question gives period instead of frequency.",
      },
    ],
    keyConcepts: [
      "Aliasing happens when spectral replicas overlap because the sampling frequency is too low.",
      "Higher sampling rates create more spacing between spectral copies and make reconstruction easier.",
      "An anti-aliasing low-pass filter is used before sampling to limit the input bandwidth.",
      "Sampling theorem is about preserving information, not merely taking many samples.",
    ],
    examples: [
      {
        title: "Check a safe sampling rate",
        prompt:
          "A signal contains frequency components up to 5 kHz. What is the minimum sampling frequency according to the sampling theorem?",
        steps: [
          "Identify the highest frequency component as fm = 5 kHz.",
          "Apply the Nyquist condition fs >= 2 fm.",
          "Double the highest frequency to get the minimum ideal value.",
        ],
        answer:
          "The minimum ideal sampling frequency is 10 kHz.",
      },
    ],
    examPointers: [
      "Find the highest frequency first; everything else follows from that.",
      "If the question asks what goes wrong below Nyquist, the keyword is aliasing.",
      "Watch units carefully when the problem mixes kHz, Hz, and sampling period.",
    ],
    commonMistakes: [
      "Using twice the signal bandwidth incorrectly when the question already gives the highest frequency.",
      "Forgetting that aliasing is caused by overlap of spectral replicas, not by noise.",
      "Confusing Nyquist rate with the actual chosen sampling frequency in a design problem.",
    ],
    quickRevision: [
      "Sample at least twice the highest frequency component.",
      "Below Nyquist, aliasing occurs.",
      "Anti-aliasing filters are used before the sampler.",
    ],
    insightSummary:
      "Sampling-theorem questions are usually direct marks once the ideas of highest frequency and aliasing are clear.",
    relatedTopics: [
      { subjectSlug: "signals", topicSlug: "fourier-transform" },
      { subjectSlug: "signals", topicSlug: "z-transform" },
    ],
  },
  "control-systems/root-locus": {
    learningGoals: [
      "Interpret root locus as the path of closed-loop poles as gain varies.",
      "Use the basic rules for real-axis segments, asymptotes, and breakaway points.",
      "Connect pole movement to stability and transient-response behavior.",
    ],
    overview: [
      "Root locus is a graphical method for seeing how the closed-loop poles of a feedback system move as the loop gain changes. It turns abstract characteristic-equation behavior into a visual stability tool.",
      "Most exam questions focus on the standard construction rules: where the locus begins and ends, which parts of the real axis belong to it, how asymptotes behave, and how gain affects stability.",
      "The most important intuition is this: as the pole locations move, the system response changes. So root locus is not just a plotting topic; it is directly tied to damping, oscillation, and settling behavior.",
    ],
    formulas: [
      {
        label: "Characteristic condition",
        expression: "1 + K G(s)H(s) = 0",
        note: "Closed-loop poles are the roots of the characteristic equation.",
      },
      {
        label: "Angle condition",
        expression: "angle G(s)H(s) = (2q + 1)180 deg",
        note: "A point lies on the root locus when the phase condition is satisfied.",
      },
      {
        label: "Asymptote centroid",
        expression: "sigma = (sum of poles - sum of zeros) / (n - m)",
        note: "Used when the number of poles exceeds the number of zeros.",
      },
    ],
    keyConcepts: [
      "The locus starts at open-loop poles and ends at open-loop zeros or infinity.",
      "A real-axis point belongs to the root locus if the number of poles and zeros to its right is odd.",
      "Asymptotes show where branches go when there are more poles than zeros.",
      "Pole movement toward the right half-plane indicates reduced stability.",
    ],
    examples: [
      {
        title: "Interpret gain increase",
        prompt:
          "If a root-locus branch crosses into the right half-plane as gain increases, what does that suggest about the closed-loop system?",
        steps: [
          "Remember that closed-loop poles determine stability.",
          "A pole in the right half-plane means the response grows instead of decays.",
          "So crossing the imaginary axis marks a stability boundary.",
        ],
        answer:
          "It indicates the system becomes unstable beyond that gain range.",
      },
    ],
    examPointers: [
      "Start every root-locus question by counting poles and zeros.",
      "Check the real-axis rule before trying to sketch asymptotes or breakaway points.",
      "Link pole locations back to damping and stability to interpret the result quickly.",
    ],
    commonMistakes: [
      "Trying to memorize the whole sketch without first counting poles and zeros.",
      "Forgetting that branches begin at poles and end at zeros or infinity.",
      "Treating the root locus as pure geometry and not relating it to system stability.",
    ],
    quickRevision: [
      "Root locus shows closed-loop pole paths as gain varies.",
      "Real-axis segments are chosen using the odd-number-to-the-right rule.",
      "Crossing into the right half-plane means instability.",
    ],
    insightSummary:
      "Root locus becomes much easier once you stop treating it like a drawing exercise and start reading it as a stability story.",
    relatedTopics: [
      { subjectSlug: "control-systems", topicSlug: "time-response" },
      { subjectSlug: "signals", topicSlug: "laplace-transform" },
    ],
  },
};

export { learningSubjects, topicLibrary };
