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
            slug: "operational-amplifiers",
            title: "Operational Amplifiers",
            summary:
              "Ideal assumptions, negative feedback intuition, and classic op-amp applications such as differentiators and integrators.",
            estimatedTime: "40 min",
            status: "ready",
            concepts: [
              "Virtual short and virtual ground",
              "Closed-loop gain with feedback",
              "Differentiator and integrator behavior",
            ],
            subtopics: [
              "Ideal op-amp assumptions",
              "Inverting and non-inverting amplifiers",
              "Summing and subtractor circuits",
              "Integrator and differentiator",
            ],
          },
          {
            slug: "active-filters",
            title: "Active Filters",
            summary:
              "See how op-amps shape frequency response in low-pass, high-pass, and band-pass filters.",
            estimatedTime: "35 min",
            status: "roadmap",
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
            status: "roadmap",
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
            slug: "logic-families",
            title: "Logic Families",
            summary:
              "Compare TTL, CMOS, and ECL using speed, noise margin, fan-out, and power dissipation.",
            estimatedTime: "30 min",
            status: "ready",
            concepts: ["Noise margin", "Power-delay product", "CMOS switching"],
            subtopics: [
              "TTL features",
              "CMOS characteristics",
              "ECL speed comparison",
              "Noise margin and fan-out",
            ],
          },
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
            status: "roadmap",
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
            status: "roadmap",
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
            status: "roadmap",
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
            status: "roadmap",
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
            status: "roadmap",
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
            status: "roadmap",
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
            status: "roadmap",
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
    slug: "electromagnetics",
    name: "Electromagnetics",
    weightage: "6-8 marks",
    description:
      "Cover electrostatics, Maxwell equations, transmission lines, and wave propagation topics commonly seen in ECE exams.",
    chapters: [
      {
        slug: "electrostatics",
        title: "Electrostatics and Fields",
        topics: [
          {
            slug: "coulomb-and-gauss-law",
            title: "Coulomb and Gauss Law",
            summary:
              "Use symmetry and field relations to solve standard electric field problems quickly.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["Electric field", "Flux", "Gauss law"],
            subtopics: [
              "Coulomb law",
              "Electric flux density",
              "Gauss law applications",
              "Symmetry arguments",
            ],
          },
          {
            slug: "electric-potential",
            title: "Electric Potential",
            summary:
              "Relate field, potential, capacitance, and stored energy in electrostatic systems.",
            estimatedTime: "30 min",
            status: "roadmap",
            concepts: ["Potential", "Capacitance", "Energy density"],
            subtopics: [
              "Potential difference",
              "Potential gradient",
              "Capacitance",
              "Stored electrostatic energy",
            ],
          },
        ],
      },
      {
        slug: "transmission-lines-and-waves",
        title: "Transmission Lines and Waves",
        topics: [
          {
            slug: "transmission-lines",
            title: "Transmission Lines",
            summary:
              "Revise reflection coefficient, VSWR, impedance matching, and line equations.",
            estimatedTime: "45 min",
            status: "roadmap",
            concepts: ["Reflection coefficient", "VSWR", "Impedance matching"],
            subtopics: [
              "Characteristic impedance",
              "Reflection coefficient",
              "VSWR",
              "Quarter-wave transformer",
            ],
          },
          {
            slug: "wave-propagation",
            title: "Wave Propagation",
            summary:
              "Understand plane waves, polarization, phase velocity, and group velocity.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["Plane wave", "Polarization", "Phase velocity"],
            subtopics: [
              "Uniform plane wave",
              "Polarization",
              "Phase and group velocity",
              "Skin depth",
            ],
          },
        ],
      },
      {
        slug: "waveguides-and-antennas",
        title: "Waveguides and Antennas",
        topics: [
          {
            slug: "waveguides",
            title: "Waveguides",
            summary:
              "Study TE and TM modes, cutoff frequency, and dominant mode selection.",
            estimatedTime: "35 min",
            status: "roadmap",
            concepts: ["TE mode", "TM mode", "Cutoff frequency"],
            subtopics: [
              "Rectangular waveguide",
              "TE and TM modes",
              "Cutoff frequency",
              "Dominant mode",
            ],
          },
          {
            slug: "antennas",
            title: "Antennas",
            summary:
              "Cover radiation pattern, gain, directivity, and common antenna properties.",
            estimatedTime: "30 min",
            status: "roadmap",
            concepts: ["Directivity", "Gain", "Radiation resistance"],
            subtopics: [
              "Radiation pattern",
              "Gain and directivity",
              "Radiation resistance",
              "Aperture and bandwidth",
            ],
          },
        ],
      },
    ],
  },
];

const topicLibrary = {
  "analog/operational-amplifiers": {
    learningGoals: [
      "Use ideal op-amp assumptions to simplify circuits quickly.",
      "Relate feedback topology to gain and stability behavior.",
      "Identify differentiator and integrator responses in standard circuits.",
    ],
    overview: [
      "An operational amplifier is a very high-gain differential amplifier. In exam problems, the ideal model lets you assume infinite input impedance, zero output impedance, and very large open-loop gain.",
      "Negative feedback makes op-amp circuits predictable. Once feedback is active and the amplifier operates in its linear region, the input terminals sit at nearly the same voltage, which leads to the virtual short idea.",
      "Most questions test whether you can identify the configuration, write the right gain expression, and connect the circuit behavior to frequency response.",
    ],
    formulas: [
      {
        label: "Inverting amplifier",
        expression: "Vout = -(Rf / Rin) Vin",
        note: "Output is 180 degrees out of phase with the input.",
      },
      {
        label: "Non-inverting amplifier",
        expression: "Vout = (1 + Rf / R1) Vin",
        note: "High input impedance makes this common in sensor conditioning.",
      },
      {
        label: "Ideal differentiator",
        expression: "Vout = -Rf C (dVin / dt)",
        note: "Magnitude increases with frequency, so noise sensitivity matters.",
      },
    ],
    keyConcepts: [
      "Virtual ground applies only when negative feedback keeps the op-amp in linear operation.",
      "Bandwidth and slew-rate limits make the practical response differ from the ideal formulas.",
      "Differentiators emphasize high-frequency content while integrators emphasize low-frequency content.",
    ],
    examples: [
      {
        title: "Identify the differentiator output",
        prompt:
          "A circuit has a capacitor at the input and a resistor in the feedback path. What output relation should you expect?",
        steps: [
          "Recognize the component placement as the standard differentiator topology.",
          "Use the ideal differentiator relation between input derivative and output voltage.",
          "Remember the negative sign comes from the inverting configuration.",
        ],
        answer:
          "The output is proportional to the time derivative of the input: Vout = -Rf C (dVin / dt).",
      },
    ],
    examPointers: [
      "Differentiate between ideal assumptions and practical limitations in one line.",
      "Look for capacitor and resistor placement to classify integrator vs differentiator instantly.",
    ],
    insightSummary:
      "Analog questions often reward fast pattern recognition. If you can classify the feedback network in the first few seconds, the math becomes straightforward.",
    relatedTopics: [
      { subjectSlug: "analog", topicSlug: "active-filters" },
      { subjectSlug: "signals", topicSlug: "laplace-transform" },
    ],
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
    insightSummary:
      "Flip-flops show up not only as direct theory questions but also inside counters, registers, and FSM design. Strong fundamentals here unlock many later digital questions.",
    relatedTopics: [
      { subjectSlug: "digital", topicSlug: "logic-families" },
      { subjectSlug: "digital", topicSlug: "counters" },
    ],
  },
  "digital/logic-families": {
    learningGoals: [
      "Compare CMOS, TTL, and ECL using core performance metrics.",
      "Choose the right logic family from power and speed constraints.",
    ],
    overview: [
      "Logic families define the electrical behavior of digital ICs. Exam questions often compare speed, power dissipation, fan-out, and noise margin.",
      "CMOS is typically favored for low static power dissipation, while ECL is known for very high speed and TTL remains a classic comparison benchmark.",
    ],
    formulas: [
      {
        label: "Power-delay focus",
        expression: "Lower power-delay product is generally preferred",
        note: "It balances speed with energy efficiency.",
      },
    ],
    keyConcepts: [
      "CMOS has near-zero static power dissipation in the ideal steady state.",
      "ECL trades higher power for faster switching.",
      "Fan-out and noise margin often appear in short conceptual questions.",
    ],
    examples: [
      {
        title: "Pick the low-power family",
        prompt: "Which family is usually chosen when low power dissipation is the main goal?",
        steps: [
          "Compare the standard behavior of TTL, ECL, and CMOS.",
          "Recall that CMOS only draws significant current during switching.",
        ],
        answer: "CMOS is the typical low-power choice.",
      },
    ],
    examPointers: [
      "If the question asks for lowest static power, CMOS is a strong first check.",
      "If it asks for very high speed, compare ECL immediately.",
    ],
    insightSummary:
      "Logic-family questions are usually short, direct, and scoring. A compact comparison table is enough to convert them into quick marks.",
    relatedTopics: [
      { subjectSlug: "digital", topicSlug: "flip-flops" },
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
    insightSummary:
      "Laplace transform links directly into control systems, so it is one of the best topics for cross-subject payoff.",
    relatedTopics: [
      { subjectSlug: "control-systems", topicSlug: "time-response" },
      { subjectSlug: "analog", topicSlug: "operational-amplifiers" },
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
    insightSummary:
      "Resonance questions are compact and formula-friendly, which makes them high-confidence marks once the physical picture is clear.",
    relatedTopics: [
      { subjectSlug: "networks", topicSlug: "two-port-networks" },
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
    insightSummary:
      "Time-response theory is foundational for root locus and frequency response, so this topic pays back across the full control-systems syllabus.",
    relatedTopics: [
      { subjectSlug: "signals", topicSlug: "laplace-transform" },
      { subjectSlug: "control-systems", topicSlug: "root-locus" },
    ],
  },
};

export { learningSubjects, topicLibrary };
