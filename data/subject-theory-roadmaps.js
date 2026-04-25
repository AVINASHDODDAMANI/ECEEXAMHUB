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
