import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import EducationalTheoryLayout, {
  EducationalBulletList,
  EducationalExampleCard,
  EducationalFormulaGrid,
  EducationalInfoCard,
} from "../../components/EducationalTheoryLayout";
import Layout from "../../components/layout";
import NetworkTheoryDiagram from "../../components/NetworkTheoryDiagram";
import { subjectDirectory } from "../../data/subject-directory";
import {
  getSubjectSlug,
  subjectTheoryKnowledge,
  subjectTheoryRoadmaps,
} from "../../data/subject-theory-roadmaps";
import {
  getLearningMasteryState,
  getLearningSubject,
  getLearningXp,
} from "../../lib/learning-utils";
import { useLearningProgress } from "../../lib/use-learning-progress";
import { getSubjectTheoryProps } from "../../lib/subject-theory-props";
import {
  buildSubjectFaqs,
  generateCanonical,
  generateDescription,
  generateKeywords,
  generateStructuredData,
  generateTitle,
  getSubjectRelatedLinks,
  SITE_URL,
} from "../../lib/seo";

const SUBJECT_TO_LEARNING_SLUG = {
  "Network Analysis": "networks",
  "Analog Electronics": "analog",
  "Digital Electronics": "digital",
  "Signals and Systems": "signals",
  "Communication Systems": "communications",
  "Electromagnetic Theory": "electromagnetics",
  Microprocessors: "microprocessors",
  "Digital Signal Processing": "dsp",
  "Control Systems": "control-systems",
  "VLSI Design": "vlsi-design",
  "Antenna & Wave Propagation": "antenna-wave-propagation",
  "Embedded Systems": "embedded-systems",
};

const LEARNING_TOPIC_TO_SUBJECT_CONCEPT_SLUG = {
  networks: {
    "network-theorems-topic": "network-theorems",
    "nodal-and-mesh-analysis": "systematic-solving",
    resonance: "ac-analysis",
    "two-port-networks": "two-port-networks",
    "first-order-transients": "transient-response",
    "second-order-transients": "transient-response",
  },
};

const NETWORK_CONTEXTUAL_TOPIC_ROUTES = {
  "network-theorems-topic": "/network-theorems",
  "nodal-and-mesh-analysis": "/dc-circuit-analysis",
  resonance: "/ac-circuit-analysis",
  "two-port-networks": "/two-port-networks",
  "first-order-transients": "/transient-analysis",
  "second-order-transients": "/transient-analysis",
};

const SUBJECT_CONTEXTUAL_TOPIC_ROUTES = {
  analog: {
    "operational-amplifiers": "/operational-amplifiers",
    "active-filters": "/active-filters-waveform-generators",
  },
  digital: {
    "boolean-algebra-and-kmaps": "/logic-gates-and-boolean-algebra",
    "flip-flops": "/sequential-circuits",
    "logic-families": "/logic-families",
  },
  signals: {
    "laplace-transform": "/laplace-transform",
    "sampling-theorem": "/sampling-theorem",
    "z-transform": "/z-transform",
  },
  networks: NETWORK_CONTEXTUAL_TOPIC_ROUTES,
  "control-systems": {
    "time-response": "/time-response-analysis",
    "root-locus": "/root-locus-technique",
  },
};

function getSubjectContextTopicHref(subjectTitle, topic) {
  const learningSubjectSlug = SUBJECT_TO_LEARNING_SLUG[subjectTitle];
  const contextualRoute = SUBJECT_CONTEXTUAL_TOPIC_ROUTES[learningSubjectSlug]?.[topic.slug];

  if (contextualRoute) {
    return contextualRoute;
  }

  return learningSubjectSlug
    ? `/learn/${learningSubjectSlug}/${topic.slug}`
    : `/subjects/${getSubjectSlug(subjectTitle)}`;
}

function getConceptIndexForLearningTopic(subjectLearningSlug, topicSlug, concepts = []) {
  const targetConceptSlug =
    LEARNING_TOPIC_TO_SUBJECT_CONCEPT_SLUG[subjectLearningSlug]?.[topicSlug] ||
    topicSlug;
  const conceptIndex = concepts.findIndex((concept) => concept.slug === targetConceptSlug);

  return conceptIndex >= 0 ? conceptIndex + 1 : 0;
}

const SUBJECT_META = {
  "Network Analysis": {
    subtitle: "The chapter that teaches how electrical circuits are understood, simplified, and solved.",
    estimatedTime: "8-10 Hours",
    difficulty: "Medium",
    level: "Beginner to Advanced",
    keyConcepts: [
      "Circuit Variables",
      "KCL and KVL",
      "Nodal and Mesh Analysis",
      "Network Theorems",
      "Two-Port Networks",
      "AC and Transients",
    ],
    examFocus: [
      "Circuit variables and sign convention",
      "KCL, KVL, nodal, and mesh analysis",
      "Thevenin, Norton, and superposition",
      "Resonance and first-order transients",
    ],
    studyTip:
      "Start from circuit variables and laws, then move to solving methods, theorems, AC analysis, and transient response in that order.",
  },
  "Analog Electronics": {
    subtitle: "The chapter that explains how semiconductor devices process, amplify, and shape continuous-time signals.",
    estimatedTime: "8-10 Hours",
    difficulty: "Medium to High",
    level: "Beginner to GATE Level",
    keyConcepts: [
      "PN Junction and Diodes",
      "BJT and MOSFET Operation",
      "Biasing and Q-Point",
      "Small-Signal Amplifiers",
      "Op-Amps and Filters",
      "Frequency Response",
    ],
    examFocus: [
      "Diode operating states and applications",
      "BJT and MOSFET regions of operation",
      "Biasing, transconductance, and gain",
      "Ideal op-amp configurations",
      "First-order filters and cutoff behavior",
    ],
    studyTip:
      "Study analog electronics in this order: device operation, region identification, biasing, small-signal model, gain formulas, then frequency response and op-amp applications.",
  },
  "Digital Electronics": {
    subtitle: "The chapter that teaches how binary information is represented, simplified, stored, timed, and implemented using logic circuits.",
    estimatedTime: "7-9 Hours",
    difficulty: "Medium",
    level: "Beginner to GATE Level",
    keyConcepts: [
      "Number Systems",
      "Boolean Algebra",
      "K-Maps",
      "Combinational Circuits",
      "Flip-Flops and Counters",
      "Logic Families",
    ],
    examFocus: [
      "Boolean algebra and K-map simplification",
      "Combinational circuit design",
      "Flip-flops, counters, and registers",
      "Logic families, memories, ADC, and DAC",
    ],
    studyTip:
      "Study Digital Electronics in chapter order: number systems, Boolean algebra, K-maps, combinational circuits, sequential circuits, counters, registers, logic families, memories, and converters.",
  },
  "Signals and Systems": {
    subtitle: "The chapter that explains how signals are represented, transformed, sampled, filtered, and processed by systems.",
    estimatedTime: "8-10 Hours",
    difficulty: "Medium",
    level: "Beginner to GATE Level",
    keyConcepts: [
      "Signal Classification",
      "System Properties",
      "Convolution",
      "Fourier Analysis",
      "Laplace and Z-Transform",
      "Sampling and Filters",
    ],
    examFocus: [
      "Energy and power signals",
      "Linearity, time invariance, causality, and stability",
      "Convolution and LTI system response",
      "Fourier, Laplace, Z-transform, ROC, and sampling",
    ],
    studyTip:
      "Study Signals and Systems in chapter order: signal basics, system properties, signal operations, convolution, Fourier tools, Laplace transform, Z-transform, sampling theorem, and frequency response.",
  },
  "Communication Systems": {
    subtitle: "The chapter that explains how information is transmitted, modulated, received, and protected in practical communication links.",
    estimatedTime: "8-10 Hours",
    difficulty: "Medium",
    level: "Beginner to GATE Level",
    keyConcepts: [
      "Communication Basics",
      "Signals and Spectra",
      "AM, FM, and PM",
      "Sampling and PCM",
      "Digital Modulation",
      "Noise and Information Theory",
    ],
    examFocus: [
      "AM, FM, PM, and modulation index",
      "Sampling theorem, pulse modulation, PCM, and delta modulation",
      "ASK, FSK, PSK, QPSK, and QAM",
      "Noise, SNR, entropy, and channel capacity",
    ],
    studyTip:
      "Study Communication Systems in chapter order: system basics, signals and spectra, analog modulation, pulse and digital communication, noise analysis, information theory, receivers, and propagation.",
  },
  "Electromagnetic Theory": {
    subtitle: "The chapter that explains electric fields, magnetic fields, Maxwell equations, waves, transmission lines, waveguides, and antennas.",
    estimatedTime: "8-10 Hours",
    difficulty: "Medium to High",
    level: "Beginner to GATE Level",
    keyConcepts: [
      "Vector Calculus",
      "Electrostatics",
      "Magnetostatics",
      "Maxwell Equations",
      "EM Waves",
      "Transmission Lines",
    ],
    examFocus: [
      "Vector calculus and coordinate systems",
      "Gauss law, Coulomb law, and boundary conditions",
      "Maxwell equations in integral and differential forms",
      "Plane waves, Poynting vector, transmission lines, waveguides, and antennas",
    ],
    studyTip:
      "Study Electromagnetic Theory in chapter order: vector calculus, electrostatics, conductors and dielectrics, magnetostatics, induction, Maxwell equations, waves, transmission lines, waveguides, antennas, and applications.",
  },
  "VLSI Design": {
    subtitle: "The chapter that explains semiconductor fabrication, MOS transistors, CMOS logic, layout, timing, power, testing, and HDL-based IC implementation.",
    estimatedTime: "7-9 Hours",
    difficulty: "Medium to High",
    level: "Beginner to GATE Level",
    keyConcepts: [
      "MOS Transistors",
      "CMOS Inverter",
      "CMOS Logic",
      "Fabrication",
      "Layout Design",
      "Power and Delay",
    ],
    examFocus: [
      "MOSFET regions and current-voltage characteristics",
      "CMOS inverter, NAND, NOR, transmission gates, and pass transistor logic",
      "Fabrication steps, design rules, stick diagrams, and layout concepts",
      "Propagation delay, power dissipation, scaling effects, testing, and HDL basics",
    ],
    studyTip:
      "Study VLSI Design in chapter order: VLSI basics, MOS transistor operation, CMOS logic, fabrication, design styles, stick diagrams, combinational and sequential circuits, interconnects, scaling, testing, verification, and HDL automation basics.",
  },
  "Antenna & Wave Propagation": {
    subtitle: "The chapter that explains antenna radiation, antenna parameters, dipoles, arrays, propagation modes, ionospheric effects, space-wave links, and modern wireless antenna applications.",
    estimatedTime: "6-8 Hours",
    difficulty: "Medium",
    level: "Beginner to GATE Level",
    keyConcepts: [
      "Antenna Parameters",
      "Dipole Antennas",
      "Antenna Arrays",
      "Friis Equation",
      "Polarization",
      "Propagation Modes",
    ],
    examFocus: [
      "Radiation pattern, beamwidth, gain, directivity, and efficiency",
      "Hertzian dipole, half-wave dipole, monopole, and radiation resistance",
      "Array factor, broadside/end-fire arrays, and pattern multiplication",
      "Ground wave, sky wave, space wave, critical frequency, and MUF",
    ],
    studyTip:
      "Study Antenna and Wave Propagation in chapter order: antenna basics, parameters, dipoles, arrays, special antennas, propagation mechanisms, ground/sky wave, space wave, measurements, and modern antenna applications.",
  },
  Microprocessors: {
    subtitle: "The chapter that explains processor architecture, instruction execution, programming, timing, interrupts, interfacing, and 8086 fundamentals.",
    estimatedTime: "7-9 Hours",
    difficulty: "Medium",
    level: "Beginner to GATE Level",
    keyConcepts: [
      "8085 Architecture",
      "Instruction Set",
      "Addressing Modes",
      "Timing Diagrams",
      "Interrupts",
      "Interfacing",
    ],
    examFocus: [
      "8085 architecture and buses",
      "Instruction set, addressing modes, opcode, and operand",
      "Assembly programs, timing diagrams, machine cycles, and interrupts",
      "Memory interfacing, I/O interfacing, 8255 PPI, and 8086 architecture",
    ],
    studyTip:
      "Study Microprocessors in chapter order: basics, 8085 architecture, instruction set, assembly programming, timing diagrams, interrupts, memory interfacing, I/O interfacing, 8255, 8086, and advanced applications.",
  },
  "Digital Signal Processing": {
    subtitle: "The chapter that explains discrete-time signal analysis, transform methods, convolution, sampling, FFT, and digital filter design.",
    estimatedTime: "8-10 Hours",
    difficulty: "Medium to High",
    level: "Beginner to GATE Level",
    keyConcepts: [
      "Discrete-Time Signals",
      "Convolution",
      "Z-Transform",
      "DFT and FFT",
      "Digital Filters",
      "Sampling",
    ],
    examFocus: [
      "Convolution and correlation",
      "Z-transform, ROC, and system analysis",
      "DFT, FFT, and spectrum interpretation",
      "FIR/IIR filters, filter design, and sampling theorem",
    ],
    studyTip:
      "Study Digital Signal Processing in chapter order: DSP basics, discrete-time signals and systems, convolution, z-transform, DFT, FFT, digital filters, filter design, sampling, processors, and applications.",
  },
  "Control Systems": {
    subtitle: "The chapter that teaches how dynamic systems are modeled, analyzed, stabilized, and designed using feedback.",
    estimatedTime: "8-10 Hours",
    difficulty: "Medium to High",
    level: "Beginner to GATE Level",
    keyConcepts: [
      "Transfer Function",
      "Block Diagrams",
      "Time Response",
      "Stability",
      "Root Locus",
      "Frequency Response",
    ],
    examFocus: [
      "Transfer functions and system modeling",
      "Block diagram reduction and Mason's gain formula",
      "Time response and steady-state error",
      "Routh stability, root locus, Bode plot, Nyquist plot, PID, and state space",
    ],
    studyTip:
      "Study Control Systems in chapter order: basics, mathematical modeling, block diagrams, time response, stability, root locus, frequency response, controllers, state space, and design.",
  },
  "Embedded Systems": {
    subtitle: "The chapter that explains dedicated hardware-software systems built with microcontrollers, firmware, interfaces, communication protocols, RTOS concepts, memory, power, and design flow.",
    estimatedTime: "7-9 Hours",
    difficulty: "Medium",
    level: "Beginner to GATE/PSU Level",
    keyConcepts: [
      "Embedded Architecture",
      "Microcontrollers",
      "Embedded C",
      "Interfacing",
      "Protocols",
      "RTOS",
    ],
    examFocus: [
      "Microcontroller architecture and register organization",
      "Embedded C programming, bitwise operations, and interrupts",
      "UART, SPI, I2C, CAN, timers, counters, and PWM",
      "RTOS concepts, interfacing techniques, memory, power, and design flow",
    ],
    studyTip:
      "Study Embedded Systems in chapter order: basics, architecture, microcontrollers, Embedded C, interfacing, communication protocols, timers, interrupts, RTOS, memory, power, design process, and advanced applications.",
  },
};

const DIGITAL_ELECTRONICS_CHAPTERS = [
  {
    title: "Number Systems and Codes",
    topics: [
      {
        title: "Number Systems",
        subtopics: ["Decimal number system", "Binary number system", "Octal number system", "Hexadecimal number system"],
      },
      {
        title: "Number Conversions",
        subtopics: ["Decimal to binary", "Binary to decimal", "Binary to octal", "Hexadecimal conversions"],
      },
      {
        title: "Binary Arithmetic",
        subtopics: ["Binary addition", "Binary subtraction", "1's complement", "2's complement"],
      },
      {
        title: "Codes",
        subtopics: ["BCD code", "Gray code", "ASCII", "Excess-3 code"],
      },
    ],
  },
  {
    title: "Logic Gates and Boolean Algebra",
    topics: [
      { title: "Basic Logic Gates", subtopics: ["AND gate", "OR gate", "NOT gate"] },
      { title: "Universal Gates", subtopics: ["NAND gate", "NOR gate"] },
      { title: "Exclusive Gates", subtopics: ["XOR gate", "XNOR gate"] },
      { title: "Boolean Algebra", subtopics: ["Boolean laws", "De Morgan's theorem", "(A + B)' = A'B'"] },
      { title: "Logic Simplification", subtopics: ["SOP form", "POS form"] },
    ],
  },
  {
    title: "Karnaugh Map (K-Map)",
    topics: [
      { title: "K-Map Basics", subtopics: ["2-variable K-map", "3-variable K-map", "4-variable K-map"] },
      { title: "Simplification Techniques", subtopics: ["Grouping", "Prime implicants", "Essential prime implicants"] },
      { title: "Don't Care Conditions", subtopics: [] },
    ],
  },
  {
    title: "Combinational Circuits",
    topics: [
      { title: "Adders", subtopics: ["Half adder", "Full adder"] },
      { title: "Subtractors", subtopics: ["Half subtractor", "Full subtractor"] },
      { title: "Multiplexers (MUX)", subtopics: [] },
      { title: "Demultiplexers (DEMUX)", subtopics: [] },
      { title: "Encoders", subtopics: [] },
      { title: "Decoders", subtopics: [] },
      { title: "Comparators", subtopics: [] },
    ],
  },
  {
    title: "Sequential Circuits",
    topics: [
      { title: "Latches", subtopics: ["SR latch", "D latch"] },
      { title: "Flip-Flops", subtopics: ["SR flip-flop", "JK flip-flop", "D flip-flop", "T flip-flop"] },
      { title: "Flip-Flop Characteristics", subtopics: ["Truth table", "Excitation table", "Characteristic equation"] },
    ],
  },
  {
    title: "Counters",
    topics: [
      { title: "Asynchronous Counters", subtopics: [] },
      { title: "Synchronous Counters", subtopics: [] },
      { title: "Types of Counters", subtopics: ["Up counter", "Down counter", "Mod-N counter", "Ring counter", "Johnson counter"] },
    ],
  },
  {
    title: "Registers and Shift Registers",
    topics: [
      { title: "Registers", subtopics: [] },
      { title: "Shift Registers", subtopics: ["SISO", "SIPO", "PISO", "PIPO"] },
      { title: "Applications of Shift Registers", subtopics: [] },
    ],
  },
  {
    title: "Logic Families",
    topics: [
      { title: "TTL Logic", subtopics: [] },
      { title: "CMOS Logic", subtopics: [] },
      { title: "Comparison of Logic Families", subtopics: ["Fan-in", "Fan-out", "Noise margin", "Power dissipation", "Propagation delay"] },
    ],
  },
  {
    title: "Memories",
    topics: [
      { title: "Semiconductor Memories", subtopics: ["RAM", "ROM"] },
      { title: "Types of RAM", subtopics: ["SRAM", "DRAM"] },
      { title: "Types of ROM", subtopics: ["PROM", "EPROM", "EEPROM"] },
    ],
  },
  {
    title: "Analog to Digital and Digital to Analog Converters",
    topics: [
      { title: "DAC", subtopics: ["Binary weighted DAC", "R-2R ladder DAC"] },
      { title: "ADC", subtopics: ["Flash ADC", "Successive approximation ADC", "Dual slope ADC"] },
      { title: "Resolution and Accuracy", subtopics: [] },
    ],
  },
  {
    title: "Digital ICs and Applications",
    topics: [
      { title: "Timing Circuits", subtopics: [] },
      { title: "Clock Signals", subtopics: [] },
      { title: "Pulse Generation", subtopics: [] },
      { title: "Applications of Digital Electronics", subtopics: [] },
    ],
  },
];

const DIGITAL_HIGH_WEIGHTAGE_TOPICS = [
  "Boolean algebra",
  "K-map simplification",
  "Combinational circuits",
  "Flip-flops",
  "Counters",
  "Shift registers",
  "Logic families",
  "ADC and DAC",
];

const DIGITAL_CHAPTER_ROUTES = {
  "Number Systems and Codes": "/number-systems-and-codes",
  "Logic Gates and Boolean Algebra": "/logic-gates-and-boolean-algebra",
  "Karnaugh Map (K-Map)": "/karnaugh-map",
  "Combinational Circuits": "/combinational-circuits",
  "Sequential Circuits": "/sequential-circuits",
  Counters: "/counters",
  "Registers and Shift Registers": "/registers-and-shift-registers",
  "Logic Families": "/logic-families",
  Memories: "/memories",
  "Analog to Digital and Digital to Analog Converters": "/analog-to-digital-and-digital-to-analog-converters",
  "Digital ICs and Applications": "/digital-ics-and-applications",
};

const ELECTROMAGNETIC_THEORY_CHAPTERS = [
  {
    title: "Vector Calculus",
    topics: [
      { title: "Coordinate Systems", subtopics: ["Cartesian coordinates", "Cylindrical coordinates", "Spherical coordinates"] },
      { title: "Vector Operations", subtopics: ["Gradient", "Divergence", "Curl"] },
      { title: "Integral Theorems", subtopics: ["Gauss divergence theorem", "Stokes theorem"] },
    ],
  },
  {
    title: "Electrostatics",
    topics: [
      { title: "Coulomb's Law", formula: "$$F=\\frac{1}{4\\pi\\epsilon}\\frac{q_1q_2}{r^2}$$", subtopics: [] },
      { title: "Electric Field Intensity", subtopics: [] },
      { title: "Electric Flux Density", subtopics: [] },
      { title: "Gauss's Law", formula: "$$\\oint \\vec{D}\\cdot d\\vec{S}=Q_{enc}$$", subtopics: [] },
      { title: "Electric Potential", subtopics: [] },
      { title: "Potential Gradient", subtopics: [] },
      { title: "Energy Density in Electric Fields", subtopics: [] },
    ],
  },
  {
    title: "Conductors and Dielectrics",
    topics: [
      { title: "Properties of Conductors", subtopics: [] },
      { title: "Boundary Conditions", subtopics: [] },
      { title: "Capacitance", subtopics: ["Parallel plate capacitor", "Spherical capacitor", "Cylindrical capacitor"] },
      { title: "Dielectric Materials", subtopics: ["Polarization", "Permittivity"] },
    ],
  },
  {
    title: "Magnetostatics",
    topics: [
      { title: "Biot-Savart Law", formula: "$$d\\vec{B}=\\frac{\\mu_0}{4\\pi}\\frac{I\\,d\\vec{l}\\times\\hat{r}}{r^2}$$", subtopics: [] },
      { title: "Ampere's Circuital Law", formula: "$$\\oint \\vec{H}\\cdot d\\vec{l}=I_{enc}$$", subtopics: [] },
      { title: "Magnetic Flux Density", subtopics: [] },
      { title: "Magnetic Scalar and Vector Potential", subtopics: [] },
      { title: "Magnetic Forces and Torque", subtopics: [] },
    ],
  },
  {
    title: "Electromagnetic Induction",
    topics: [
      { title: "Faraday's Law", formula: "$$\\mathcal{E}=-\\frac{d\\Phi}{dt}$$", subtopics: [] },
      { title: "Lenz's Law", subtopics: [] },
      { title: "Self Inductance", subtopics: [] },
      { title: "Mutual Inductance", subtopics: [] },
      { title: "Energy Stored in Magnetic Fields", subtopics: [] },
    ],
  },
  {
    title: "Maxwell's Equations",
    topics: [
      { title: "Maxwell's First Equation", subtopics: [] },
      { title: "Maxwell's Second Equation", subtopics: [] },
      { title: "Maxwell's Third Equation", subtopics: [] },
      { title: "Maxwell's Fourth Equation", subtopics: [] },
      { title: "Differential and Integral Forms", subtopics: [] },
    ],
  },
  {
    title: "Electromagnetic Waves",
    topics: [
      { title: "Wave Equation", subtopics: [] },
      { title: "Plane Wave Propagation", subtopics: [] },
      { title: "Uniform Plane Waves", subtopics: [] },
      { title: "Wave Propagation in Different Media", subtopics: ["Free space", "Conductors", "Dielectrics"] },
      { title: "Poynting Vector", formula: "$$\\vec{S}=\\vec{E}\\times\\vec{H}$$", subtopics: [] },
    ],
  },
  {
    title: "Transmission Lines",
    topics: [
      { title: "Transmission Line Parameters", subtopics: ["Resistance", "Inductance", "Capacitance", "Conductance"] },
      { title: "Telegrapher's Equations", subtopics: [] },
      { title: "Reflection Coefficient", subtopics: [] },
      { title: "Standing Wave Ratio (SWR)", subtopics: [] },
      { title: "Impedance Matching", subtopics: [] },
    ],
  },
  {
    title: "Waveguides",
    topics: [
      { title: "Rectangular Waveguides", subtopics: [] },
      { title: "Modes of Propagation", subtopics: ["TE mode", "TM mode", "TEM mode"] },
      { title: "Cutoff Frequency", subtopics: [] },
      { title: "Phase and Group Velocity", subtopics: [] },
    ],
  },
  {
    title: "Antennas",
    topics: [
      { title: "Basic Antenna Parameters", subtopics: ["Radiation pattern", "Gain", "Directivity", "Efficiency"] },
      { title: "Dipole Antenna", subtopics: [] },
      { title: "Antenna Arrays", subtopics: [] },
      { title: "Radiation Mechanism", subtopics: [] },
    ],
  },
  {
    title: "Electromagnetic Compatibility and Applications",
    topics: [
      { title: "Shielding", subtopics: [] },
      { title: "Interference", subtopics: [] },
      { title: "Microwave Applications", subtopics: [] },
      { title: "Radar Basics", subtopics: [] },
    ],
  },
];

const ELECTROMAGNETIC_HIGH_WEIGHTAGE_TOPICS = [
  "Vector calculus",
  "Gauss law",
  "Maxwell equations",
  "Electromagnetic waves",
  "Transmission lines",
  "Waveguides",
  "Antennas",
  "Faraday's law",
];

const ELECTROMAGNETIC_CHAPTER_ROUTES = {
  "Vector Calculus": "/learn/electromagnetics/vector-calculus",
  Electrostatics: "/learn/electromagnetics/electrostatics",
  "Conductors and Dielectrics": "/learn/electromagnetics/conductors-and-dielectrics",
  Magnetostatics: "/learn/electromagnetics/magnetostatics",
  "Electromagnetic Induction": "/learn/electromagnetics/electromagnetic-induction",
  "Maxwell's Equations": "/learn/electromagnetics/maxwells-equations",
  "Electromagnetic Waves": "/learn/electromagnetics/electromagnetic-waves",
  "Transmission Lines": "/learn/electromagnetics/transmission-lines",
  Waveguides: "/learn/electromagnetics/waveguides",
  Antennas: "/learn/electromagnetics/antennas",
  "Electromagnetic Compatibility and Applications": "/learn/electromagnetics/electromagnetic-compatibility-and-applications",
};

const ANTENNA_WAVE_PROPAGATION_CHAPTERS = [
  {
    title: "Introduction to Antennas",
    topics: [
      { title: "Basics of Antennas", subtopics: ["Definition of antenna", "Functions of antenna", "Radiation mechanism"] },
      { title: "Types of Antennas", subtopics: ["Wire antennas", "Aperture antennas", "Array antennas", "Reflector antennas"] },
      { title: "Antenna Parameters", subtopics: ["Radiation pattern", "Beamwidth", "Directivity", "Gain", "Efficiency"] },
    ],
  },
  {
    title: "Antenna Fundamentals",
    topics: [
      { title: "Radiation Intensity", subtopics: [] },
      { title: "Power Density", subtopics: [] },
      { title: "Effective Aperture", subtopics: [] },
      { title: "Polarization", subtopics: ["Linear polarization", "Circular polarization", "Elliptical polarization"] },
      { title: "Friis Transmission Equation", formula: "$$P_r=P_tG_tG_r\\left(\\frac{\\lambda}{4\\pi R}\\right)^2$$", subtopics: [] },
    ],
  },
  {
    title: "Dipole and Monopole Antennas",
    topics: [
      { title: "Hertzian Dipole", subtopics: [] },
      { title: "Half-Wave Dipole", subtopics: [] },
      { title: "Quarter-Wave Monopole", subtopics: [] },
      { title: "Radiation Resistance", subtopics: [] },
      { title: "Current Distribution", subtopics: [] },
    ],
  },
  {
    title: "Antenna Arrays",
    topics: [
      { title: "Array Fundamentals", subtopics: [] },
      { title: "Types of Arrays", subtopics: ["Broadside array", "End-fire array"] },
      { title: "Array Factor", subtopics: [] },
      { title: "Pattern Multiplication", subtopics: [] },
      { title: "Phased Arrays", subtopics: [] },
    ],
  },
  {
    title: "Special Antennas",
    topics: [
      { title: "Loop Antenna", subtopics: [] },
      { title: "Helical Antenna", subtopics: [] },
      { title: "Horn Antenna", subtopics: [] },
      { title: "Parabolic Reflector Antenna", subtopics: [] },
      { title: "Microstrip Patch Antenna", subtopics: [] },
    ],
  },
  {
    title: "Wave Propagation Basics",
    topics: [
      { title: "Electromagnetic Wave Propagation", subtopics: [] },
      { title: "Wave Propagation Mechanisms", subtopics: ["Reflection", "Refraction", "Diffraction", "Scattering"] },
      { title: "Propagation Modes", subtopics: ["Ground wave", "Sky wave", "Space wave"] },
    ],
  },
  {
    title: "Ground Wave and Sky Wave Propagation",
    topics: [
      { title: "Ground Wave Propagation", subtopics: [] },
      { title: "Surface Wave Propagation", subtopics: [] },
      { title: "Ionosphere Basics", subtopics: [] },
      { title: "Sky Wave Propagation", subtopics: [] },
      { title: "Critical Frequency", subtopics: [] },
      { title: "MUF (Maximum Usable Frequency)", subtopics: [] },
    ],
  },
  {
    title: "Space Wave Propagation",
    topics: [
      { title: "Line-of-Sight Communication", subtopics: [] },
      { title: "Tropospheric Propagation", subtopics: [] },
      { title: "Duct Propagation", subtopics: [] },
      { title: "Microwave Propagation", subtopics: [] },
      { title: "Radar Communication Basics", subtopics: [] },
    ],
  },
  {
    title: "Antenna Measurements",
    topics: [
      { title: "Radiation Pattern Measurement", subtopics: [] },
      { title: "Gain Measurement", subtopics: [] },
      { title: "VSWR Measurement", subtopics: [] },
      { title: "Impedance Measurement", subtopics: [] },
    ],
  },
  {
    title: "Modern Antenna Applications",
    topics: [
      { title: "Satellite Communication Antennas", subtopics: [] },
      { title: "Mobile Communication Antennas", subtopics: [] },
      { title: "Radar Antennas", subtopics: [] },
      { title: "Smart Antennas", subtopics: [] },
      { title: "MIMO Antenna Basics", subtopics: [] },
    ],
  },
];

const ANTENNA_HIGH_WEIGHTAGE_TOPICS = [
  "Antenna parameters",
  "Dipole antennas",
  "Antenna arrays",
  "Friis equation",
  "Polarization",
  "Wave propagation modes",
  "Ionospheric propagation",
  "Space wave propagation",
];

const ANTENNA_TOPIC_ROUTES = [
  "/learn/antenna-wave-propagation/introduction-to-antennas",
  "/learn/antenna-wave-propagation/antenna-fundamentals",
  "/learn/antenna-wave-propagation/dipole-and-monopole-antennas",
  "/learn/antenna-wave-propagation/antenna-arrays",
  "/learn/antenna-wave-propagation/special-antennas",
  "/learn/antenna-wave-propagation/wave-propagation-basics",
  "/learn/antenna-wave-propagation/ground-wave-and-sky-wave-propagation",
  "/learn/antenna-wave-propagation/space-wave-propagation",
  "/learn/antenna-wave-propagation/antenna-measurements",
  "/learn/antenna-wave-propagation/modern-antenna-applications",
];

const ANTENNA_WAVE_PROPAGATION_KNOWLEDGE = {
  overviewCards: [
    {
      title: "Overview of Antenna & Wave Propagation",
      description:
        "For Graduate Aptitude Test in Engineering and PSU exams, Antenna and Wave Propagation should be studied in a structured hierarchy: Chapter -> Topics -> Subtopics. This helps in understanding radiation concepts, learning propagation mechanisms, solving numerical problems, and quick revision.",
      points: [
        "Start with antenna basics, radiation mechanism, and antenna parameters.",
        "Study dipoles, monopoles, arrays, and special antennas as separate blocks.",
        "Connect Friis equation, polarization, gain, directivity, and effective aperture to numericals.",
        "Finish with ground wave, sky wave, space wave, measurements, and modern antenna applications.",
      ],
    },
  ],
  concepts: ANTENNA_WAVE_PROPAGATION_CHAPTERS.map((chapter, index) => ({
    slug: `antenna-chapter-${index + 1}`,
    title: chapter.title,
    shortTitle: chapter.title,
    diagram: "basic-circuit",
    diagramNote:
      "Antenna and Wave Propagation questions are best handled by first identifying whether the problem is about antenna parameters, antenna type, array behavior, link equation, or propagation mode.",
    summary: chapter.topics
      .map((topic) => [topic.title, ...topic.subtopics].join(": "))
      .join(" | "),
    teaching: {
      intuition: [
        `${chapter.title} is Chapter ${index + 1} in the Antenna and Wave Propagation GATE/PSU flow.`,
        "Treat each chapter as either a radiation block, antenna-structure block, link-budget block, or propagation block before solving.",
      ],
      explanation: chapter.topics.map((topic) =>
        topic.subtopics.length ? `${topic.title}: ${topic.subtopics.join(", ")}` : topic.title
      ),
      interpretation: chapter.topics.map((topic) => topic.title),
      commonMistake:
        "Students often memorize antenna terms without separating pattern, gain, directivity, polarization, aperture, and propagation-mode assumptions.",
      realLifeInsight:
        "Antenna and propagation concepts appear in mobile networks, satellite links, radar, broadcasting, microwave communication, smart antennas, and MIMO systems.",
    },
    learnPoints: chapter.topics.map((topic) => topic.title),
    formulas: chapter.topics
      .filter((topic) => topic.formula)
      .map((topic) => ({
        label: topic.title,
        expression: topic.formula,
        note: "Use this relation with correct gain, wavelength, distance, and propagation assumptions.",
      })),
  })),
};

const VLSI_DESIGN_CHAPTERS = [
  {
    title: "Introduction to VLSI Design",
    topics: [
      { title: "Basics of VLSI", subtopics: ["SSI", "MSI", "LSI", "VLSI", "ULSI", "Moore's Law"] },
      { title: "VLSI Design Flow", subtopics: ["Specification", "Design", "Verification", "Fabrication", "Testing"] },
      { title: "Applications of VLSI", subtopics: [] },
    ],
  },
  {
    title: "MOS Transistor Basics",
    topics: [
      { title: "MOSFET Structure", subtopics: ["NMOS transistor", "PMOS transistor", "CMOS transistor"] },
      { title: "MOSFET Operation", subtopics: ["Cutoff region", "Linear region", "Saturation region"] },
      { title: "Threshold Voltage", subtopics: [] },
      { title: "Current-Voltage Characteristics", subtopics: [] },
    ],
  },
  {
    title: "CMOS Logic Design",
    topics: [
      { title: "CMOS Inverter", formula: "$$V_{out}=f(V_{in})$$", subtopics: [] },
      { title: "Static CMOS Logic", subtopics: ["NAND gate", "NOR gate"] },
      { title: "Dynamic CMOS Logic", subtopics: [] },
      { title: "Transmission Gates", subtopics: [] },
      { title: "Pass Transistor Logic", subtopics: [] },
    ],
  },
  {
    title: "CMOS Fabrication Technology",
    topics: [
      { title: "IC Fabrication Process", subtopics: ["Oxidation", "Diffusion", "Ion implantation", "Lithography"] },
      { title: "N-Well and P-Well Processes", subtopics: [] },
      { title: "CMOS Fabrication Steps", subtopics: [] },
      { title: "Design Rules", subtopics: [] },
    ],
  },
  {
    title: "VLSI Design Styles",
    topics: [
      { title: "Full Custom Design", subtopics: [] },
      { title: "Semi-Custom Design", subtopics: [] },
      { title: "Standard Cell Design", subtopics: [] },
      { title: "Gate Array Design", subtopics: [] },
      { title: "FPGA Basics", subtopics: [] },
    ],
  },
  {
    title: "Stick Diagrams and Layout Design",
    topics: [
      { title: "Stick Diagrams", subtopics: [] },
      { title: "Layout Design Rules", subtopics: [] },
      { title: "Lambda-Based Design Rules", subtopics: [] },
      { title: "CMOS Layout Techniques", subtopics: [] },
    ],
  },
  {
    title: "Combinational Circuit Design",
    topics: [
      { title: "CMOS Logic Circuits", subtopics: [] },
      { title: "Arithmetic Circuits", subtopics: ["Half adder", "Full adder"] },
      { title: "Multiplexers", subtopics: [] },
      { title: "Decoders", subtopics: [] },
    ],
  },
  {
    title: "Sequential Circuit Design",
    topics: [
      { title: "Latches and Flip-Flops", subtopics: [] },
      { title: "Registers", subtopics: [] },
      { title: "Counters", subtopics: [] },
      { title: "Memory Elements", subtopics: [] },
    ],
  },
  {
    title: "VLSI Interconnects and Scaling",
    topics: [
      { title: "Interconnect Effects", subtopics: [] },
      { title: "Propagation Delay", subtopics: [] },
      { title: "Power Dissipation", subtopics: [] },
      { title: "Scaling Effects", subtopics: [] },
      { title: "Short Channel Effects", subtopics: [] },
    ],
  },
  {
    title: "Testing and Verification",
    topics: [
      { title: "Fault Models", subtopics: [] },
      { title: "Design for Testability (DFT)", subtopics: [] },
      { title: "Built-In Self-Test (BIST)", subtopics: [] },
      { title: "Verification Techniques", subtopics: [] },
    ],
  },
  {
    title: "HDL and VLSI Automation Basics",
    topics: [
      { title: "Introduction to Verilog/VHDL", subtopics: [] },
      { title: "Behavioral Modeling", subtopics: [] },
      { title: "RTL Design Basics", subtopics: [] },
      { title: "Synthesis Flow", subtopics: [] },
      { title: "CAD Tools Overview", subtopics: [] },
    ],
  },
];

const VLSI_HIGH_WEIGHTAGE_TOPICS = [
  "CMOS inverter",
  "MOSFET characteristics",
  "CMOS logic design",
  "Fabrication process",
  "Stick diagrams and layout",
  "Sequential circuits",
  "Power and delay analysis",
  "Scaling effects",
];

const VLSI_TOPIC_ROUTES = [
  "/learn/vlsi-design/introduction-to-vlsi-design",
  "/learn/vlsi-design/mos-transistor-basics",
  "/learn/vlsi-design/cmos-logic-design",
  "/learn/vlsi-design/cmos-fabrication-technology",
  "/learn/vlsi-design/vlsi-design-styles",
  "/learn/vlsi-design/stick-diagrams-and-layout-design",
  "/learn/vlsi-design/combinational-circuit-design",
  "/learn/vlsi-design/sequential-circuit-design",
  "/learn/vlsi-design/vlsi-interconnects-and-scaling",
  "/learn/vlsi-design/testing-and-verification",
  "/learn/vlsi-design/hdl-and-vlsi-automation-basics",
];

const DIGITAL_SIGNAL_PROCESSING_CHAPTERS = [
  {
    title: "Introduction to DSP",
    topics: [
      { title: "Basics of DSP", subtopics: ["Analog signals", "Digital signals"] },
      { title: "Advantages of DSP", subtopics: [] },
      { title: "DSP Applications", subtopics: [] },
      { title: "Basic DSP System", subtopics: [] },
    ],
  },
  {
    title: "Discrete-Time Signals and Systems",
    topics: [
      { title: "Discrete-Time Signals", subtopics: ["Unit impulse sequence", "Unit step sequence", "Exponential sequence", "Sinusoidal sequence"] },
      { title: "Signal Operations", subtopics: ["Time shifting", "Time scaling", "Folding"] },
      { title: "System Properties", subtopics: ["Linearity", "Time invariance", "Causality", "Stability"] },
    ],
  },
  {
    title: "Convolution and Correlation",
    topics: [
      { title: "Linear Convolution", formula: "y[n] = x[n] * h[n] = sum x[k]h[n-k]", subtopics: [] },
      { title: "Circular Convolution", subtopics: [] },
      { title: "Auto-correlation", subtopics: [] },
      { title: "Cross-correlation", subtopics: [] },
    ],
  },
  {
    title: "Z-Transform",
    topics: [
      { title: "Definition of Z-Transform", formula: "X(z) = sum x[n]z^(-n)", subtopics: [] },
      { title: "ROC (Region of Convergence)", subtopics: [] },
      { title: "Properties of Z-Transform", subtopics: [] },
      { title: "Inverse Z-Transform", subtopics: [] },
      { title: "System Analysis Using Z-Transform", subtopics: [] },
    ],
  },
  {
    title: "Discrete Fourier Transform (DFT)",
    topics: [
      { title: "DFT Definition", formula: "X[k] = sum x[n]e^(-j2pi kn/N)", subtopics: [] },
      { title: "Properties of DFT", subtopics: [] },
      { title: "Circular Convolution Using DFT", subtopics: [] },
      { title: "Frequency Spectrum Analysis", subtopics: [] },
    ],
  },
  {
    title: "Fast Fourier Transform (FFT)",
    topics: [
      { title: "Need for FFT", subtopics: [] },
      { title: "Radix-2 FFT", subtopics: [] },
      { title: "Decimation in Time (DIT)", subtopics: [] },
      { title: "Decimation in Frequency (DIF)", subtopics: [] },
      { title: "Butterfly Computation", subtopics: [] },
    ],
  },
  {
    title: "Digital Filters",
    topics: [
      { title: "FIR Filters", subtopics: ["Characteristics", "Structure"] },
      { title: "IIR Filters", subtopics: ["Characteristics", "Structure"] },
      { title: "FIR vs IIR Comparison", subtopics: [] },
      { title: "Frequency Response of Filters", subtopics: [] },
    ],
  },
  {
    title: "Filter Design Techniques",
    topics: [
      { title: "FIR Filter Design", subtopics: ["Window method"] },
      { title: "IIR Filter Design", subtopics: ["Butterworth filter", "Chebyshev filter"] },
      { title: "Low-pass, High-pass, Band-pass Filters", subtopics: [] },
    ],
  },
  {
    title: "Sampling and Reconstruction",
    topics: [
      { title: "Sampling Theorem", formula: "fs >= 2fm", subtopics: [] },
      { title: "Aliasing", subtopics: [] },
      { title: "Reconstruction of Signals", subtopics: [] },
      { title: "Quantization Noise", subtopics: [] },
    ],
  },
  {
    title: "DSP Processors and Applications",
    topics: [
      { title: "DSP Processor Architecture", subtopics: [] },
      { title: "MAC Unit", subtopics: [] },
      { title: "Real-Time Processing", subtopics: [] },
      { title: "DSP Applications", subtopics: ["Audio processing", "Image processing", "Speech processing", "Communication systems"] },
    ],
  },
];

const DIGITAL_SIGNAL_PROCESSING_HIGH_WEIGHTAGE_TOPICS = [
  "Convolution",
  "Z-transform",
  "DFT and FFT",
  "FIR and IIR filters",
  "Sampling theorem",
  "Filter design",
  "System properties",
];

const DIGITAL_SIGNAL_PROCESSING_CHAPTER_ROUTES = {
  "Introduction to DSP": "/learn/dsp/introduction-to-dsp",
  "Discrete-Time Signals and Systems": "/learn/dsp/discrete-time-signals-and-systems",
  "Convolution and Correlation": "/learn/dsp/convolution-and-correlation",
  "Z-Transform": "/learn/dsp/z-transform",
  "Discrete Fourier Transform (DFT)": "/learn/dsp/discrete-fourier-transform-dft",
  "Fast Fourier Transform (FFT)": "/learn/dsp/fast-fourier-transform-fft",
  "Digital Filters": "/learn/dsp/digital-filters",
  "Filter Design Techniques": "/learn/dsp/filter-design-techniques",
  "Sampling and Reconstruction": "/learn/dsp/sampling-and-reconstruction",
  "DSP Processors and Applications": "/learn/dsp/dsp-processors-and-applications",
};

const MICROPROCESSORS_CHAPTERS = [
  {
    title: "Introduction to Microprocessors",
    topics: [
      { title: "Basics of Microprocessors", subtopics: ["Definition of microprocessor", "Microprocessor vs microcontroller"] },
      { title: "Evolution of Microprocessors", subtopics: ["4-bit processors", "8-bit processors", "16-bit processors", "32-bit processors"] },
      { title: "Applications of Microprocessors", subtopics: [] },
      { title: "Basic Computer Architecture", subtopics: ["CPU", "Memory", "Input/Output devices", "System bus"] },
    ],
  },
  {
    title: "8085 Microprocessor Architecture",
    topics: [
      { title: "Internal Architecture of 8085", subtopics: ["ALU", "Accumulator", "Flag register", "Program counter", "Stack pointer"] },
      { title: "Pin Diagram of 8085", subtopics: [] },
      { title: "Address Bus, Data Bus, Control Bus", subtopics: [] },
      { title: "Timing and Control Unit", subtopics: [] },
    ],
  },
  {
    title: "8085 Instruction Set",
    topics: [
      { title: "Types of Instructions", subtopics: ["Data transfer instructions", "Arithmetic instructions", "Logical instructions", "Branching instructions", "Machine control instructions"] },
      { title: "Addressing Modes", subtopics: ["Immediate addressing", "Direct addressing", "Register addressing", "Indirect addressing"] },
      { title: "Opcode and Operand", subtopics: [] },
    ],
  },
  {
    title: "Assembly Language Programming",
    topics: [
      { title: "Basics of Assembly Language", subtopics: [] },
      { title: "Simple Programs", subtopics: ["Addition", "Subtraction", "Multiplication", "Division"] },
      { title: "Looping and Branching", subtopics: [] },
      { title: "Sorting Programs", subtopics: [] },
      { title: "Delay Generation", subtopics: [] },
    ],
  },
  {
    title: "Timing Diagrams and Machine Cycles",
    topics: [
      { title: "Opcode Fetch Cycle", subtopics: [] },
      { title: "Memory Read Cycle", subtopics: [] },
      { title: "Memory Write Cycle", subtopics: [] },
      { title: "I/O Read and Write Cycles", subtopics: [] },
      { title: "Timing Diagram Analysis", subtopics: [] },
    ],
  },
  {
    title: "Interrupts in 8085",
    topics: [
      { title: "Interrupt Basics", subtopics: [] },
      { title: "Hardware Interrupts", subtopics: ["TRAP", "RST7.5", "RST6.5", "RST5.5", "INTR"] },
      { title: "Software Interrupts", subtopics: [] },
      { title: "Interrupt Priority", subtopics: [] },
      { title: "Interrupt Handling", subtopics: [] },
    ],
  },
  {
    title: "Memory Interfacing",
    topics: [
      { title: "Memory Organization", subtopics: [] },
      { title: "RAM and ROM Interfacing", subtopics: [] },
      { title: "Address Decoding", subtopics: [] },
      { title: "Memory Mapping", subtopics: [] },
    ],
  },
  {
    title: "I/O Interfacing",
    topics: [
      { title: "I/O Mapped I/O", subtopics: [] },
      { title: "Memory Mapped I/O", subtopics: [] },
      { title: "Peripheral Devices", subtopics: [] },
      { title: "Data Transfer Techniques", subtopics: ["Programmed I/O", "Interrupt-driven I/O", "DMA"] },
    ],
  },
  {
    title: "8255 Programmable Peripheral Interface",
    topics: [
      { title: "Architecture of 8255", subtopics: [] },
      { title: "Operating Modes", subtopics: ["Mode 0", "Mode 1", "Mode 2"] },
      { title: "Interfacing Applications", subtopics: [] },
    ],
  },
  {
    title: "8086 Microprocessor",
    topics: [
      { title: "Architecture of 8086", subtopics: [] },
      { title: "Memory Segmentation", subtopics: [] },
      { title: "Minimum and Maximum Modes", subtopics: [] },
      { title: "Register Organization", subtopics: [] },
      { title: "Addressing Modes of 8086", subtopics: [] },
    ],
  },
  {
    title: "Advanced Topics",
    topics: [
      { title: "DMA Controller", subtopics: [] },
      { title: "Serial Communication Basics", subtopics: [] },
      { title: "Microprocessor Applications", subtopics: [] },
      { title: "Embedded System Basics", subtopics: [] },
    ],
  },
];

const MICROPROCESSORS_HIGH_WEIGHTAGE_TOPICS = [
  "8085 architecture",
  "Instruction set",
  "Addressing modes",
  "Interrupts",
  "Timing diagrams",
  "Memory interfacing",
  "8255 interfacing",
  "8086 architecture",
];

const MICROPROCESSORS_CHAPTER_ROUTES = {
  "Introduction to Microprocessors": "/learn/microprocessors/introduction-to-microprocessors",
  "8085 Microprocessor Architecture": "/learn/microprocessors/8085-microprocessor-architecture",
  "8085 Instruction Set": "/learn/microprocessors/8085-instruction-set",
  "Assembly Language Programming": "/learn/microprocessors/assembly-language-programming",
  "Timing Diagrams and Machine Cycles": "/learn/microprocessors/timing-diagrams-and-machine-cycles",
  "Interrupts in 8085": "/learn/microprocessors/interrupts-in-8085",
  "Memory Interfacing": "/learn/microprocessors/memory-interfacing",
  "I/O Interfacing": "/learn/microprocessors/io-interfacing",
  "8255 Programmable Peripheral Interface": "/learn/microprocessors/8255-programmable-peripheral-interface",
  "8086 Microprocessor": "/8086-microprocessor",
  "Advanced Topics": "/learn/microprocessors/advanced-topics",
};

const EMBEDDED_SYSTEMS_CHAPTERS = [
  {
    title: "Introduction to Embedded Systems",
    topics: [
      { title: "Basics of Embedded Systems", subtopics: ["Definition of embedded systems", "Characteristics of embedded systems"] },
      { title: "Types of Embedded Systems", subtopics: ["Standalone systems", "Real-time systems", "Networked embedded systems", "Mobile embedded systems"] },
      { title: "Applications of Embedded Systems", subtopics: ["Consumer electronics", "Automotive systems", "Industrial automation", "Medical devices"] },
    ],
  },
  {
    title: "Embedded System Architecture",
    topics: [
      { title: "Basic Architecture", subtopics: ["Processor", "Memory", "Input/Output devices"] },
      { title: "Hardware Components", subtopics: ["Sensors", "Actuators", "ADC and DAC", "Timers and counters"] },
      { title: "Software Components", subtopics: ["Firmware", "Device drivers", "Middleware"] },
    ],
  },
  {
    title: "Microcontrollers",
    topics: [
      { title: "Introduction to Microcontrollers", subtopics: [] },
      { title: "8051 Microcontroller Architecture", subtopics: ["CPU", "RAM and ROM", "I/O ports", "Timers", "Serial communication"] },
      { title: "ARM Processor Basics", subtopics: [] },
      { title: "Register Organization", subtopics: [] },
    ],
  },
  {
    title: "Embedded C Programming",
    topics: [
      { title: "Basics of Embedded C", subtopics: [] },
      { title: "Data Types and Variables", subtopics: [] },
      { title: "Bitwise Operations", subtopics: [] },
      { title: "Functions and Pointers", subtopics: [] },
      { title: "Interrupt Programming", subtopics: [] },
    ],
  },
  {
    title: "Interfacing Techniques",
    topics: [
      { title: "LED Interfacing", subtopics: [] },
      { title: "LCD Interfacing", subtopics: [] },
      { title: "Keyboard Interfacing", subtopics: [] },
      { title: "Sensor Interfacing", subtopics: [] },
      { title: "Motor Interfacing", subtopics: [] },
    ],
  },
  {
    title: "Communication Protocols",
    topics: [
      { title: "UART Communication", subtopics: [] },
      { title: "SPI Protocol", subtopics: [] },
      { title: "I2C Protocol", subtopics: [] },
      { title: "CAN Protocol", subtopics: [] },
      { title: "USB Basics", subtopics: [] },
    ],
  },
  {
    title: "Timers, Counters, and Interrupts",
    topics: [
      { title: "Timers and Counters", subtopics: [] },
      { title: "Interrupt Basics", subtopics: [] },
      { title: "Interrupt Handling", subtopics: [] },
      { title: "Watchdog Timer", subtopics: [] },
      { title: "PWM Generation", subtopics: [] },
    ],
  },
  {
    title: "Real-Time Operating Systems (RTOS)",
    topics: [
      { title: "Basics of RTOS", subtopics: [] },
      { title: "Tasks and Threads", subtopics: [] },
      { title: "Scheduling Algorithms", subtopics: [] },
      { title: "Semaphores and Mutex", subtopics: [] },
      { title: "Interprocess Communication", subtopics: [] },
    ],
  },
  {
    title: "Memory and Power Management",
    topics: [
      { title: "Memory Organization", subtopics: [] },
      { title: "EEPROM and Flash Memory", subtopics: [] },
      { title: "Cache Memory Basics", subtopics: [] },
      { title: "Power Optimization Techniques", subtopics: [] },
      { title: "Low Power Modes", subtopics: [] },
    ],
  },
  {
    title: "Embedded System Design Process",
    topics: [
      { title: "Requirement Analysis", subtopics: [] },
      { title: "Hardware-Software Co-Design", subtopics: [] },
      { title: "Testing and Debugging", subtopics: [] },
      { title: "PCB Design Basics", subtopics: [] },
      { title: "Embedded System Validation", subtopics: [] },
    ],
  },
  {
    title: "Advanced Embedded Applications",
    topics: [
      { title: "IoT Basics", subtopics: [] },
      { title: "Wireless Embedded Systems", subtopics: [] },
      { title: "Automotive Embedded Systems", subtopics: [] },
      { title: "Robotics Applications", subtopics: [] },
      { title: "AI in Embedded Systems", subtopics: [] },
    ],
  },
];

const EMBEDDED_SYSTEMS_HIGH_WEIGHTAGE_TOPICS = [
  "Microcontroller architecture",
  "Embedded C programming",
  "Communication protocols",
  "Interrupts and timers",
  "RTOS concepts",
  "Interfacing techniques",
  "ARM processor basics",
  "Embedded system design flow",
];

const EMBEDDED_SYSTEMS_TOPIC_ROUTES = [
  "/learn/embedded-systems/introduction-to-embedded-systems",
  "/learn/embedded-systems/embedded-system-architecture",
  "/learn/embedded-systems/microcontrollers",
  "/learn/embedded-systems/embedded-c-programming",
  "/learn/embedded-systems/interfacing-techniques",
  "/learn/embedded-systems/communication-protocols",
  "/learn/embedded-systems/timers-counters-and-interrupts",
  "/learn/embedded-systems/real-time-operating-systems-rtos",
  "/learn/embedded-systems/memory-and-power-management",
  "/learn/embedded-systems/embedded-system-design-process",
  "/learn/embedded-systems/advanced-embedded-applications",
];

const CONTROL_SYSTEMS_CHAPTERS = [
  {
    title: "Introduction to Control Systems",
    topics: [
      {
        title: "Basic Concepts",
        subtopics: ["Definition of control system", "Open-loop control system", "Closed-loop control system"],
      },
      {
        title: "Examples of Control Systems",
        subtopics: ["Temperature control", "Speed control", "Automatic voltage regulator"],
      },
      { title: "Advantages of Closed-Loop Systems", subtopics: [] },
      {
        title: "Types of Control Systems",
        subtopics: ["Linear and nonlinear", "Time-invariant and time-varying", "Continuous and discrete systems"],
      },
    ],
  },
  {
    title: "Mathematical Modeling of Systems",
    topics: [
      { title: "Transfer Function", formula: "$$G(s)=\\frac{Output}{Input}$$", subtopics: [] },
      { title: "Differential Equation Representation", subtopics: [] },
      { title: "Mechanical Systems", subtopics: ["Translational systems", "Rotational systems"] },
      { title: "Electrical Systems", subtopics: ["RLC circuits modeling"] },
      { title: "Analogous Systems", subtopics: ["Force-voltage analogy", "Force-current analogy"] },
    ],
  },
  {
    title: "Block Diagram and Signal Flow Graph",
    topics: [
      { title: "Block Diagram Representation", subtopics: [] },
      { title: "Block Diagram Reduction Rules", subtopics: [] },
      { title: "Signal Flow Graph (SFG)", subtopics: [] },
      { title: "Mason's Gain Formula", formula: "$$T=\\frac{\\sum P_k\\Delta_k}{\\Delta}$$", subtopics: [] },
    ],
  },
  {
    title: "Time Response Analysis",
    topics: [
      { title: "Standard Test Signals", subtopics: ["Unit step", "Unit ramp", "Unit impulse", "Parabolic input"] },
      { title: "First-Order Systems", subtopics: [] },
      { title: "Second-Order Systems", subtopics: [] },
      { title: "Time Domain Specifications", subtopics: ["Rise time", "Peak time", "Settling time", "Maximum overshoot"] },
      { title: "Steady-State Error", subtopics: [] },
    ],
  },
  {
    title: "Stability Analysis",
    topics: [
      { title: "Concept of Stability", subtopics: [] },
      { title: "Routh-Hurwitz Criterion", subtopics: [] },
      { title: "Relative Stability", subtopics: [] },
      { title: "Root Locations", subtopics: [] },
    ],
  },
  {
    title: "Root Locus Technique",
    topics: [
      { title: "Introduction to Root Locus", subtopics: [] },
      { title: "Construction Rules", subtopics: [] },
      { title: "Root Locus Analysis", subtopics: [] },
      { title: "Effect of Pole-Zero Addition", subtopics: [] },
    ],
  },
  {
    title: "Frequency Response Analysis",
    topics: [
      { title: "Frequency Domain Concepts", subtopics: [] },
      { title: "Polar Plot", subtopics: [] },
      { title: "Bode Plot", subtopics: [] },
      { title: "Nyquist Plot", subtopics: [] },
      { title: "Gain Margin and Phase Margin", subtopics: [] },
    ],
  },
  {
    title: "Controllers and Compensators",
    topics: [
      {
        title: "Types of Controllers",
        formula: "$$u(t)=K_pe(t)+K_i\\int e(t)dt+K_d\\frac{de(t)}{dt}$$",
        subtopics: ["P controller", "PI controller", "PD controller", "PID controller"],
      },
      {
        title: "Compensation Techniques",
        subtopics: ["Lead compensator", "Lag compensator", "Lag-lead compensator"],
      },
    ],
  },
  {
    title: "State Space Analysis",
    topics: [
      { title: "State Variables", subtopics: [] },
      { title: "State Space Representation", formula: "$$\\dot{x}=Ax+Bu$$", subtopics: [] },
      { title: "State Transition Matrix", subtopics: [] },
      { title: "Controllability", subtopics: [] },
      { title: "Observability", subtopics: [] },
    ],
  },
  {
    title: "Control System Design",
    topics: [
      { title: "Design Specifications", subtopics: [] },
      { title: "Stability Improvement", subtopics: [] },
      { title: "Compensation Design", subtopics: [] },
      { title: "PID Tuning", subtopics: [] },
    ],
  },
];

const CONTROL_HIGH_WEIGHTAGE_TOPICS = [
  "Transfer functions",
  "Time response analysis",
  "Routh stability criterion",
  "Root locus",
  "Bode plot",
  "Nyquist plot",
  "PID controllers",
  "State space analysis",
];

const SIGNALS_SYSTEMS_CHAPTERS = [
  {
    title: "Introduction to Signals",
    topics: [
      { title: "Definition of Signals", subtopics: ["Continuous-time signals", "Discrete-time signals"] },
      {
        title: "Classification of Signals",
        subtopics: [
          "Periodic and aperiodic",
          "Even and odd signals",
          "Energy and power signals",
          "Deterministic and random signals",
        ],
      },
      {
        title: "Basic Signals",
        subtopics: ["Unit step signal", "Unit impulse signal", "Ramp signal", "Exponential signal", "Sinusoidal signal"],
      },
    ],
  },
  {
    title: "Systems and Their Properties",
    topics: [
      { title: "Definition of Systems", subtopics: [] },
      {
        title: "Types of Systems",
        subtopics: ["Linear and non-linear", "Time-invariant and time-varying", "Causal and non-causal", "Stable and unstable", "Static and dynamic systems"],
      },
      { title: "System Properties", subtopics: ["Linearity", "Time invariance", "Causality", "Stability"] },
    ],
  },
  {
    title: "Mathematical Representation of Signals",
    topics: [
      { title: "Signal Operations", subtopics: ["Time shifting", "Time scaling", "Time reversal"] },
      { title: "Signal Decomposition", subtopics: ["Even-odd decomposition"] },
      { title: "Orthogonal Signals", subtopics: [] },
    ],
  },
  {
    title: "Convolution",
    formula: "$$ y(t)=x(t)*h(t)=\\int_{-\\infty}^{\\infty}x(\\tau)h(t-\\tau)d\\tau $$",
    topics: [
      { title: "Continuous-Time Convolution", subtopics: [] },
      { title: "Discrete-Time Convolution", subtopics: ["$$ y[n]=\\sum_{k=-\\infty}^{\\infty}x[k]h[n-k] $$"] },
      { title: "Graphical Convolution", subtopics: [] },
      { title: "Properties of Convolution", subtopics: ["Commutative", "Associative", "Distributive"] },
    ],
  },
  {
    title: "Fourier Series",
    topics: [
      { title: "Trigonometric Fourier Series", subtopics: [] },
      { title: "Exponential Fourier Series", subtopics: [] },
      { title: "Properties of Fourier Series", subtopics: [] },
      { title: "Spectrum Analysis", subtopics: [] },
    ],
  },
  {
    title: "Fourier Transform",
    formula: "$$ X(\\omega)=\\int_{-\\infty}^{\\infty}x(t)e^{-j\\omega t}dt $$",
    topics: [
      { title: "Continuous-Time Fourier Transform (CTFT)", subtopics: [] },
      { title: "Discrete-Time Fourier Transform (DTFT)", subtopics: [] },
      { title: "Properties of Fourier Transform", subtopics: ["Linearity", "Time shifting", "Frequency shifting", "Convolution property"] },
      { title: "Parseval's Theorem", subtopics: [] },
    ],
  },
  {
    title: "Laplace Transform",
    formula: "$$ X(s)=\\int_{0}^{\\infty}x(t)e^{-st}dt $$",
    topics: [
      { title: "Definition of Laplace Transform", subtopics: [] },
      { title: "Region of Convergence (ROC)", subtopics: [] },
      { title: "Properties of Laplace Transform", subtopics: [] },
      { title: "Inverse Laplace Transform", subtopics: [] },
      { title: "System Analysis Using Laplace", subtopics: [] },
    ],
  },
  {
    title: "Z-Transform",
    formula: "$$ X(z)=\\sum_{n=-\\infty}^{\\infty}x[n]z^{-n} $$",
    topics: [
      { title: "Definition of Z-Transform", subtopics: [] },
      { title: "ROC of Z-Transform", subtopics: [] },
      { title: "Properties of Z-Transform", subtopics: [] },
      { title: "Inverse Z-Transform", subtopics: [] },
    ],
  },
  {
    title: "Sampling Theorem",
    formula: "$$ f_s\\geq2f_m $$",
    topics: [
      { title: "Sampling Process", subtopics: [] },
      { title: "Nyquist Sampling Theorem", subtopics: [] },
      { title: "Aliasing", subtopics: [] },
      { title: "Reconstruction of Signals", subtopics: [] },
    ],
  },
  {
    title: "Frequency Response and Filters",
    topics: [
      { title: "Frequency Response", subtopics: [] },
      { title: "Ideal Filters", subtopics: ["Low-pass filter", "High-pass filter", "Band-pass filter", "Band-stop filter"] },
      { title: "Distortionless Transmission", subtopics: [] },
    ],
  },
];

const SIGNALS_HIGH_WEIGHTAGE_TOPICS = [
  "Convolution",
  "Fourier Transform",
  "Laplace Transform",
  "Z-Transform",
  "System properties",
  "Sampling theorem",
  "Fourier series",
];

const SIGNALS_SYSTEMS_KNOWLEDGE = {
  overviewCards: [
    {
      title: "Overview of Signals and Systems",
      description:
        "For Graduate Aptitude Test in Engineering (GATE) and PSU exams, Signals and Systems should be prepared in a structured format: Chapter -> Topics -> Subtopics. This keeps convolution, transforms, ROC, sampling, and filters connected instead of memorized as isolated formulas.",
      points: [
        "Use the chapter flow for concept clarity.",
        "Revise signal properties and system properties before transforms.",
        "Connect every transform to LTI system response and stability.",
        "Practice GATE-style numericals after each chapter block.",
      ],
    },
  ],
  concepts: SIGNALS_SYSTEMS_CHAPTERS.map((chapter, index) => ({
    slug: `signals-chapter-${index + 1}`,
    title: chapter.title,
    shortTitle: chapter.title,
    diagram: "basic-circuit",
    diagramNote:
      "Signals and Systems questions are best handled by first identifying the chapter, then the exact topic and subtopic being tested.",
    summary: chapter.topics
      .map((topic) => [topic.title, ...topic.subtopics].join(": "))
      .join(" | "),
    teaching: {
      intuition: [
        `${chapter.title} is Chapter ${index + 1} in the Signals and Systems GATE/PSU flow.`,
        "Prepare it as a concept block, then connect it to waveform behavior, frequency behavior, and exam numericals.",
      ],
      explanation: chapter.topics.map((topic) =>
        topic.subtopics.length ? `${topic.title}: ${topic.subtopics.join(", ")}` : topic.title
      ),
      interpretation: chapter.topics.map((topic) => topic.title),
      commonMistake:
        "Students often memorize transform pairs and conditions separately instead of connecting signal type, ROC, stability, and frequency behavior.",
      realLifeInsight:
        "Communication receivers, DSP algorithms, control systems, filters, sensors, and audio systems all use Signals and Systems ideas to predict how information changes through a system.",
    },
    learnPoints: chapter.topics.map((topic) => topic.title),
    formulas: chapter.formula
      ? [
          {
            label: "Key relation",
            expression: chapter.formula,
            note: "Use this relation with its conditions and physical interpretation, not as a standalone memory item.",
          },
        ]
      : [],
  })),
};

const COMMUNICATION_SYSTEMS_CHAPTERS = [
  {
    title: "Introduction to Communication Systems",
    topics: [
      { title: "Basic Communication System", subtopics: ["Information source", "Transmitter", "Channel", "Receiver", "Destination"] },
      { title: "Types of Communication", subtopics: ["Analog communication", "Digital communication"] },
      { title: "Communication Channels", subtopics: ["Wired communication", "Wireless communication"] },
      { title: "Electromagnetic Spectrum", subtopics: [] },
    ],
  },
  {
    title: "Signals and Spectra",
    topics: [
      { title: "Types of Signals", subtopics: ["Analog signals", "Digital signals"] },
      { title: "Time Domain and Frequency Domain", subtopics: [] },
      { title: "Bandwidth of Signals", subtopics: [] },
      { title: "Power Spectral Density (PSD)", subtopics: [] },
    ],
  },
  {
    title: "Amplitude Modulation (AM)",
    formula: "$$ s(t)=A_c[1+m\\cos(\\omega_m t)]\\cos(\\omega_c t) $$",
    topics: [
      { title: "Need for Modulation", subtopics: [] },
      { title: "Amplitude Modulation Basics", subtopics: [] },
      { title: "Modulation Index", subtopics: [] },
      { title: "Frequency Spectrum of AM", subtopics: [] },
      { title: "Power Relations in AM", subtopics: [] },
      { title: "AM Generation Methods", subtopics: [] },
      { title: "AM Demodulation", subtopics: ["Envelope detector"] },
    ],
  },
  {
    title: "Angle Modulation",
    topics: [
      { title: "Frequency Modulation (FM)", subtopics: [] },
      { title: "Phase Modulation (PM)", subtopics: [] },
      { title: "Modulation Index", subtopics: [] },
      { title: "Bandwidth of FM", subtopics: [] },
      { title: "Narrowband and Wideband FM", subtopics: [] },
      { title: "FM Generation", subtopics: [] },
      { title: "FM Detection", subtopics: [] },
    ],
  },
  {
    title: "Pulse Modulation",
    formula: "$$ f_s\\geq2f_m $$",
    topics: [
      { title: "Sampling Theorem", subtopics: [] },
      { title: "PAM", subtopics: ["Pulse Amplitude Modulation"] },
      { title: "PWM", subtopics: ["Pulse Width Modulation"] },
      { title: "PPM", subtopics: ["Pulse Position Modulation"] },
    ],
  },
  {
    title: "Digital Communication",
    topics: [
      { title: "Pulse Code Modulation (PCM)", subtopics: [] },
      { title: "Quantization", subtopics: ["Uniform quantization", "Non-uniform quantization"] },
      { title: "Delta Modulation (DM)", subtopics: [] },
      { title: "Adaptive Delta Modulation (ADM)", subtopics: [] },
    ],
  },
  {
    title: "Digital Modulation Techniques",
    topics: [
      { title: "ASK", subtopics: ["Amplitude Shift Keying"] },
      { title: "FSK", subtopics: ["Frequency Shift Keying"] },
      { title: "PSK", subtopics: ["Phase Shift Keying"] },
      { title: "QPSK", subtopics: [] },
      { title: "QAM", subtopics: ["Quadrature Amplitude Modulation"] },
    ],
  },
  {
    title: "Noise in Communication Systems",
    topics: [
      { title: "Types of Noise", subtopics: ["Internal noise", "External noise"] },
      { title: "Signal-to-Noise Ratio (SNR)", subtopics: [] },
      { title: "Noise Figure", subtopics: [] },
      { title: "Noise in AM and FM Systems", subtopics: [] },
    ],
  },
  {
    title: "Information Theory",
    formula: "$$ C=B\\log_2(1+SNR) $$",
    topics: [
      { title: "Information and Entropy", subtopics: ["$$ H=-\\sum p_i\\log_2 p_i $$"] },
      { title: "Channel Capacity", subtopics: [] },
      { title: "Source Coding", subtopics: [] },
      { title: "Error Control Coding", subtopics: [] },
    ],
  },
  {
    title: "Communication Receivers",
    topics: [
      { title: "Superheterodyne Receiver", subtopics: [] },
      { title: "RF Amplifier", subtopics: [] },
      { title: "Mixer", subtopics: [] },
      { title: "Intermediate Frequency (IF)", subtopics: [] },
      { title: "Detection and Demodulation", subtopics: [] },
    ],
  },
  {
    title: "Antennas and Propagation Basics",
    topics: [
      { title: "Antenna Parameters", subtopics: ["Gain", "Directivity", "Radiation pattern"] },
      { title: "Wave Propagation", subtopics: ["Ground wave", "Sky wave", "Space wave"] },
    ],
  },
];

const COMMUNICATION_SYSTEMS_KNOWLEDGE = {
  overviewCards: [
    {
      title: "Overview of Communication Systems",
      description:
        "For Graduate Aptitude Test in Engineering and PSU exams, Communication Systems should be studied in a structured hierarchy: Chapter -> Topics -> Subtopics. This helps in concept clarity, numerical solving, revision, and interview preparation.",
      points: [
        "Start from the transmitter-channel-receiver flow before modulation details.",
        "Study AM, FM, PM, sampling, PCM, and digital modulation in sequence.",
        "Keep bandwidth, SNR, noise, and channel capacity connected to numericals.",
        "Revise receivers and propagation after the core modulation chapters.",
      ],
    },
  ],
  concepts: COMMUNICATION_SYSTEMS_CHAPTERS.map((chapter, index) => ({
    slug: `communication-chapter-${index + 1}`,
    title: chapter.title,
    shortTitle: chapter.title,
    diagram: "basic-circuit",
    diagramNote:
      "Communication Systems questions are best handled by first identifying the chapter, then the exact topic and subtopic being tested.",
    summary: chapter.topics
      .map((topic) => [topic.title, ...topic.subtopics].join(": "))
      .join(" | "),
    teaching: {
      intuition: [
        `${chapter.title} is Chapter ${index + 1} in the Communication Systems GATE/PSU flow.`,
        "Prepare it as a communication block, then connect the theory to modulation, bandwidth, noise, and exam numericals.",
      ],
      explanation: chapter.topics.map((topic) =>
        topic.subtopics.length ? `${topic.title}: ${topic.subtopics.join(", ")}` : topic.title
      ),
      interpretation: chapter.topics.map((topic) => topic.title),
      commonMistake:
        "Students often memorize separate formulas for AM, FM, PCM, and channel capacity without connecting them to bandwidth, noise, and receiver behavior.",
      realLifeInsight:
        "Wireless links, mobile communication, broadcasting, satellite systems, radar, and optical links all rely on Communication Systems ideas to transmit information efficiently and reliably.",
    },
    learnPoints: chapter.topics.map((topic) => topic.title),
    formulas: chapter.formula
      ? [
          {
            label: "Key relation",
            expression: chapter.formula,
            note: "Use this relation with its assumptions, bandwidth meaning, and physical interpretation, not as an isolated memory item.",
          },
        ]
      : [],
  })),
};

const CONTROL_SYSTEMS_KNOWLEDGE = {
  overviewCards: [
    {
      title: "Overview of Control Systems",
      description:
        "For Graduate Aptitude Test in Engineering (GATE) and PSU exams, Control Systems should be studied in a structured hierarchy: Chapter -> Topics -> Subtopics. This structure supports conceptual understanding, numerical problem solving, quick revision, and interview preparation.",
      points: [
        "Start with open-loop and closed-loop control ideas.",
        "Model systems using transfer functions, differential equations, and state space.",
        "Analyze time response, stability, root locus, and frequency response.",
        "Finish with controllers, compensators, and design specifications.",
      ],
    },
  ],
  concepts: CONTROL_SYSTEMS_CHAPTERS.map((chapter, index) => ({
    slug: `control-chapter-${index + 1}`,
    title: chapter.title,
    shortTitle: chapter.title,
    diagram: "basic-circuit",
    diagramNote:
      "Control Systems questions are best handled by first identifying the chapter, then the exact topic and subtopic being tested.",
    summary: chapter.topics
      .map((topic) => [topic.title, ...topic.subtopics].join(": "))
      .join(" | "),
    teaching: {
      intuition: [
        `${chapter.title} is Chapter ${index + 1} in the Control Systems GATE/PSU flow.`,
        "Prepare it as a modeling, analysis, or design block, then practice numerical problems from that block.",
      ],
      explanation: chapter.topics.map((topic) =>
        topic.subtopics.length ? `${topic.title}: ${topic.subtopics.join(", ")}` : topic.title
      ),
      interpretation: chapter.topics.map((topic) => topic.title),
      commonMistake:
        "Students often memorize isolated formulas without checking the system type, input type, stability condition, and required design specification.",
      realLifeInsight:
        "Control Systems ideas appear in speed control, temperature regulation, voltage regulators, robotics, aerospace systems, industrial automation, and feedback-based electronics.",
    },
    learnPoints: chapter.topics.map((topic) => topic.title),
    formulas: chapter.topics
      .filter((topic) => topic.formula)
      .map((topic) => ({
        label: topic.title,
        expression: topic.formula,
        note: "Use this relation with the correct block, signal, or state-variable interpretation.",
      })),
  })),
};

const DIGITAL_ELECTRONICS_KNOWLEDGE = {
  overviewCards: [
    {
      title: "Overview of Digital Electronics",
      description:
        "For Graduate Aptitude Test in Engineering (GATE) and PSU exams, Digital Electronics should be prepared in a structured format: Chapter -> Topics -> Subtopics. This keeps the subject easy to revise and makes objective questions faster to solve.",
      points: [
        "Use the chapter flow for concept clarity.",
        "Revise topics and subtopics quickly before exams.",
        "Prepare cleaner interview explanations.",
        "Solve Boolean, K-map, circuit, and timing questions faster.",
      ],
    },
  ],
  concepts: DIGITAL_ELECTRONICS_CHAPTERS.map((chapter, index) => ({
    slug: `digital-chapter-${index + 1}`,
    title: chapter.title,
    shortTitle: chapter.title,
    diagram: "basic-circuit",
    diagramNote: "Digital Electronics questions are best handled by first identifying the chapter, then the exact topic and subtopic being tested.",
    summary: chapter.topics
      .map((topic) => [topic.title, ...topic.subtopics].join(": "))
      .join(" | "),
    teaching: {
      intuition: [
        `${chapter.title} is Chapter ${index + 1} in the Digital Electronics GATE/PSU flow.`,
        "Prepare it as topic blocks, then practice objective questions from each block.",
      ],
      explanation: chapter.topics.map((topic) =>
        topic.subtopics.length ? `${topic.title}: ${topic.subtopics.join(", ")}` : topic.title
      ),
      interpretation: chapter.topics.map((topic) => topic.title),
      commonMistake:
        "Students often memorize isolated facts instead of learning the chapter, topic, and subtopic relationship.",
      realLifeInsight:
        "Digital systems are built by combining representation, logic simplification, combinational blocks, storage elements, timing, and IC constraints.",
    },
    learnPoints: chapter.topics.map((topic) => topic.title),
    formulas:
      chapter.title === "Logic Gates and Boolean Algebra"
        ? [
            {
              label: "De Morgan's theorem",
              expression: "(A + B)' = A'B'",
              note: "A common simplification identity used while reducing Boolean expressions.",
            },
          ]
        : [],
  })),
};

const ELECTROMAGNETIC_THEORY_KNOWLEDGE = {
  overviewCards: [
    {
      title: "Overview of Electromagnetic Theory",
      description:
        "For Graduate Aptitude Test in Engineering and PSU exams, Electromagnetic Theory should be studied in a structured hierarchy: Chapter -> Topics -> Subtopics. This supports conceptual understanding, formula-based preparation, numerical solving, and quick revision.",
      points: [
        "Start with vector calculus and coordinate systems before field laws.",
        "Study electrostatics, conductors, dielectrics, magnetostatics, and induction in sequence.",
        "Treat Maxwell equations as the bridge between fields and waves.",
        "Finish with transmission lines, waveguides, antennas, EMC, and applications.",
      ],
    },
  ],
  concepts: ELECTROMAGNETIC_THEORY_CHAPTERS.map((chapter, index) => ({
    slug: `electromagnetic-chapter-${index + 1}`,
    title: chapter.title,
    shortTitle: chapter.title,
    diagram: "basic-circuit",
    diagramNote:
      "Electromagnetic Theory questions are best handled by first identifying the chapter, then the exact topic and subtopic being tested.",
    summary: chapter.topics
      .map((topic) => [topic.title, ...topic.subtopics].join(": "))
      .join(" | "),
    teaching: {
      intuition: [
        `${chapter.title} is Chapter ${index + 1} in the Electromagnetic Theory GATE/PSU flow.`,
        "Prepare it as a field, wave, guided-wave, or radiation block, then practice formula-based numericals from that block.",
      ],
      explanation: chapter.topics.map((topic) =>
        topic.subtopics.length ? `${topic.title}: ${topic.subtopics.join(", ")}` : topic.title
      ),
      interpretation: chapter.topics.map((topic) => topic.title),
      commonMistake:
        "Students often memorize field formulas without checking coordinate system, symmetry, boundary condition, medium, and sign convention.",
      realLifeInsight:
        "Electromagnetic Theory explains capacitors, inductors, antennas, waveguides, transmission lines, shielding, microwave links, radar, and wireless propagation.",
    },
    learnPoints: chapter.topics.map((topic) => topic.title),
    formulas: chapter.topics
      .filter((topic) => topic.formula)
      .map((topic) => ({
        label: topic.title,
        expression: topic.formula,
        note: "Use this relation with the correct field direction, medium, boundary, and coordinate-system assumptions.",
      })),
  })),
};

const VLSI_DESIGN_KNOWLEDGE = {
  overviewCards: [
    {
      title: "Overview of VLSI Design",
      description:
        "For Graduate Aptitude Test in Engineering and PSU exams, VLSI Design should be studied in a structured hierarchy: Chapter -> Topics -> Subtopics. This helps in understanding semiconductor fabrication, CMOS logic design, digital IC implementation, and efficient exam preparation.",
      points: [
        "Start with VLSI basics, design flow, and MOS transistor fundamentals.",
        "Study CMOS inverter, static CMOS logic, dynamic logic, transmission gates, and pass transistor logic.",
        "Learn fabrication, design styles, stick diagrams, layout rules, and lambda-based design rules together.",
        "Finish with delay, power, interconnects, scaling, testing, verification, HDL, RTL, synthesis, and CAD flow.",
      ],
    },
  ],
  concepts: VLSI_DESIGN_CHAPTERS.map((chapter, index) => ({
    slug: `vlsi-chapter-${index + 1}`,
    title: chapter.title,
    shortTitle: chapter.title,
    diagram: "basic-circuit",
    diagramNote:
      "VLSI Design questions are best handled by first identifying the chapter, then the exact topic and subtopic being tested.",
    summary: chapter.topics
      .map((topic) => [topic.title, ...topic.subtopics].join(": "))
      .join(" | "),
    teaching: {
      intuition: [
        `${chapter.title} is Chapter ${index + 1} in the VLSI Design GATE/PSU flow.`,
        "Prepare it as a transistor, logic, fabrication, layout, timing, testing, or automation block, then practice conceptual and numerical questions from that block.",
      ],
      explanation: chapter.topics.map((topic) =>
        topic.subtopics.length ? `${topic.title}: ${topic.subtopics.join(", ")}` : topic.title
      ),
      interpretation: chapter.topics.map((topic) => topic.title),
      commonMistake:
        "Students often memorize VLSI terms without connecting MOS operation, CMOS logic, layout constraints, power, delay, and fabrication flow.",
      realLifeInsight:
        "VLSI Design is used to build microprocessors, memory chips, ASICs, SoCs, FPGAs, communication ICs, and low-power embedded hardware.",
    },
    learnPoints: chapter.topics.map((topic) => topic.title),
    formulas: chapter.topics
      .filter((topic) => topic.formula)
      .map((topic) => ({
        label: topic.title,
        expression: topic.formula,
        note: "Use this relation while checking CMOS transfer behavior, transistor state, load, and sizing assumptions.",
      })),
  })),
};

const DIGITAL_SIGNAL_PROCESSING_KNOWLEDGE = {
  overviewCards: [
    {
      title: "Overview of Digital Signal Processing",
      description:
        "For Graduate Aptitude Test in Engineering and PSU exams, Digital Signal Processing should be studied in a structured hierarchy: Chapter -> Topics -> Subtopics. This helps in mathematical understanding, transform analysis, numerical solving, and quick revision for competitive exams.",
      points: [
        "Start with discrete-time signals, operations, and system properties.",
        "Master convolution and correlation before moving into transforms.",
        "Study Z-transform, DFT, and FFT as the main exam problem-solving tools.",
        "Finish with FIR/IIR filters, filter design, sampling, reconstruction, and DSP applications.",
      ],
    },
  ],
  concepts: DIGITAL_SIGNAL_PROCESSING_CHAPTERS.map((chapter, index) => ({
    slug: `dsp-chapter-${index + 1}`,
    title: chapter.title,
    shortTitle: chapter.title,
    diagram: "basic-circuit",
    diagramNote:
      "Digital Signal Processing questions are best handled by first identifying the chapter, then the exact topic and subtopic being tested.",
    summary: chapter.topics
      .map((topic) => [topic.title, ...topic.subtopics].join(": "))
      .join(" | "),
    teaching: {
      intuition: [
        `${chapter.title} is Chapter ${index + 1} in the Digital Signal Processing GATE/PSU flow.`,
        "Prepare it as a signal, transform, convolution, sampling, or filter block, then practice numerical questions from that block.",
      ],
      explanation: chapter.topics.map((topic) =>
        topic.subtopics.length ? `${topic.title}: ${topic.subtopics.join(", ")}` : topic.title
      ),
      interpretation: chapter.topics.map((topic) => topic.title),
      commonMistake:
        "Students often memorize DSP formulas without checking sequence limits, transform region, circular versus linear operation, or filter type.",
      realLifeInsight:
        "Digital Signal Processing powers audio processing, image processing, speech processing, communication systems, instrumentation, and real-time embedded signal analysis.",
    },
    learnPoints: chapter.topics.map((topic) => topic.title),
    formulas: chapter.topics
      .filter((topic) => topic.formula)
      .map((topic) => ({
        label: topic.title,
        expression: topic.formula,
        note: "Use this relation with the correct sequence length, transform convention, sampling assumption, or filter structure.",
      })),
  })),
};

const MICROPROCESSORS_KNOWLEDGE = {
  overviewCards: [
    {
      title: "Overview of Microprocessors",
      description:
        "For Graduate Aptitude Test in Engineering and PSU exams, Microprocessors should be studied in a structured hierarchy: Chapter -> Topics -> Subtopics. This helps in understanding processor architecture, learning instruction execution, solving numerical and programming problems, and quick revision for PSU/GATE exams.",
      points: [
        "Start with basic processor architecture and system-bus concepts.",
        "Study 8085 architecture before memorizing instructions.",
        "Connect instruction set, addressing modes, machine cycles, and timing diagrams.",
        "Finish with interrupts, memory/I/O interfacing, 8255, 8086, DMA, serial communication, and applications.",
      ],
    },
  ],
  concepts: MICROPROCESSORS_CHAPTERS.map((chapter, index) => ({
    slug: `microprocessor-chapter-${index + 1}`,
    title: chapter.title,
    shortTitle: chapter.title,
    diagram: "basic-circuit",
    diagramNote:
      "Microprocessor questions are best handled by first identifying the chapter, then the exact topic and subtopic being tested.",
    summary: chapter.topics
      .map((topic) => [topic.title, ...topic.subtopics].join(": "))
      .join(" | "),
    teaching: {
      intuition: [
        `${chapter.title} is Chapter ${index + 1} in the Microprocessors GATE/PSU flow.`,
        "Prepare it as an architecture, instruction, timing, interrupt, or interfacing block, then practice short programs and numerical questions.",
      ],
      explanation: chapter.topics.map((topic) =>
        topic.subtopics.length ? `${topic.title}: ${topic.subtopics.join(", ")}` : topic.title
      ),
      interpretation: chapter.topics.map((topic) => topic.title),
      commonMistake:
        "Students often memorize instructions without connecting opcode, operand, addressing mode, machine cycle, and bus activity.",
      realLifeInsight:
        "Microprocessors explain how CPUs execute instructions, move data, respond to interrupts, interface memory and I/O, and control embedded systems.",
    },
    learnPoints: chapter.topics.map((topic) => topic.title),
    formulas: [],
  })),
};

const EMBEDDED_SYSTEMS_KNOWLEDGE = {
  overviewCards: [
    {
      title: "Overview of Embedded Systems",
      description:
        "For Graduate Aptitude Test in Engineering and PSU exams, Embedded Systems should be studied in a structured hierarchy: Chapter -> Topics -> Subtopics. This helps in understanding hardware-software integration, learning embedded architecture, solving interfacing problems, and preparing efficiently for GATE/PSU exams.",
      points: [
        "Start with embedded-system basics, characteristics, types, and applications.",
        "Study processor, memory, I/O, sensors, actuators, firmware, device drivers, and middleware as one architecture.",
        "Build strength in microcontrollers, Embedded C, interrupts, timers, and communication protocols.",
        "Finish with RTOS, memory, power management, design flow, validation, IoT, wireless, automotive, robotics, and AI applications.",
      ],
    },
  ],
  concepts: EMBEDDED_SYSTEMS_CHAPTERS.map((chapter, index) => ({
    slug: `embedded-systems-chapter-${index + 1}`,
    title: chapter.title,
    shortTitle: chapter.title,
    diagram: "basic-circuit",
    diagramNote:
      "Embedded Systems questions are best handled by first identifying the chapter, then the exact hardware, software, interface, protocol, or real-time concept being tested.",
    summary: chapter.topics
      .map((topic) => [topic.title, ...topic.subtopics].join(": "))
      .join(" | "),
    teaching: {
      intuition: [
        `${chapter.title} is Chapter ${index + 1} in the Embedded Systems GATE/PSU flow.`,
        "Prepare it as a hardware, firmware, interfacing, communication, timing, RTOS, memory, power, or design-flow block, then practice conceptual and application questions from that block.",
      ],
      explanation: chapter.topics.map((topic) =>
        topic.subtopics.length ? `${topic.title}: ${topic.subtopics.join(", ")}` : topic.title
      ),
      interpretation: chapter.topics.map((topic) => topic.title),
      commonMistake:
        "Students often study microcontrollers, Embedded C, interfacing, protocols, and RTOS as separate facts instead of connecting them through hardware-software interaction.",
      realLifeInsight:
        "Embedded Systems combine hardware and software to perform dedicated real-time tasks efficiently using microcontrollers, communication interfaces, sensors, and optimized embedded programming techniques.",
    },
    learnPoints: chapter.topics.map((topic) => topic.title),
    formulas: [],
  })),
};

const NETWORK_ANALYSIS_TOPIC_GROUPS = [
  {
    title: "Basic Concepts",
    topics: [
      "Electric charge, current, voltage",
      "Power and energy",
      "Passive vs active elements",
      "Linear and non-linear elements",
      "Bilateral and unilateral elements",
    ],
  },
  {
    title: "Circuit Elements",
    topics: [
      "Resistors, capacitors, inductors",
      "Independent and dependent sources",
      "Source transformation",
    ],
  },
  {
    title: "Circuit Laws",
    topics: ["Ohm's Law", "Kirchhoff's Current Law (KCL)", "Kirchhoff's Voltage Law (KVL)"],
  },
  {
    title: "Network Theorems",
    topics: [
      "Superposition Theorem",
      "Thevenin's Theorem",
      "Norton's Theorem",
      "Maximum Power Transfer Theorem",
      "Reciprocity Theorem",
      "Millman's Theorem",
      "Compensation Theorem",
    ],
  },
  {
    title: "DC Circuit Analysis",
    topics: [
      "Series and parallel circuits",
      "Mesh analysis",
      "Nodal analysis",
      "Star-Delta (Y-Delta) transformation",
    ],
  },
  {
    title: "AC Fundamentals",
    topics: ["Sinusoidal signals", "Phase and phasors", "RMS, average values", "Complex impedance"],
  },
  {
    title: "AC Circuit Analysis",
    topics: [
      "RL, RC, RLC circuits",
      "Series and parallel resonance",
      "Power in AC circuits: real, reactive, apparent",
      "Power factor",
    ],
  },
  {
    title: "Transient Analysis",
    topics: [
      "First-order circuits: RC, RL",
      "Second-order circuits: RLC",
      "Natural and forced response",
      "Time constants",
    ],
  },
  {
    title: "Network Topology",
    topics: ["Graph theory basics", "Trees, branches, nodes, loops", "Tie-set and cut-set matrices"],
  },
  {
    title: "Laplace Transform Methods",
    topics: [
      "Laplace transform basics",
      "Circuit analysis using Laplace",
      "Transfer function",
      "Initial and final value theorems",
    ],
  },
  {
    title: "Frequency Domain Analysis",
    topics: ["Frequency response", "Bode plots", "Resonance and bandwidth"],
  },
  {
    title: "Two-Port Networks",
    topics: ["Z, Y, h, ABCD parameters", "Interconnections of two-port networks"],
  },
  {
    title: "Filters",
    topics: [
      "Low-pass and high-pass filters",
      "Band-pass and band-stop filters",
      "Active and passive filters",
    ],
  },
  {
    title: "Network Functions",
    topics: ["Poles and zeros", "Stability", "Transfer function behavior"],
  },
  {
    title: "Advanced Topics",
    topics: ["Fourier series and transforms", "Network synthesis", "State-space analysis"],
  },
];

const NETWORK_TOPIC_TARGET_SLUGS = {
  "Circuit Elements": "circuit-variables",
  "Circuit Laws": "kirchhoff-laws",
  "Network Theorems": "network-theorems",
  "DC Circuit Analysis": "systematic-solving",
  "AC Fundamentals": "ac-analysis",
  "AC Circuit Analysis": "ac-analysis",
  "Transient Analysis": "transient-response",
  "Network Topology": "graph-theory",
  "Laplace Transform Methods": "transient-response",
  "Frequency Domain Analysis": "ac-analysis",
  "Two-Port Networks": "two-port-networks",
  Filters: "ac-analysis",
  "Network Functions": "ac-analysis",
  "Advanced Topics": "special-networks",
};

const NETWORK_TOPIC_TARGET_ANCHORS = {
  "Basic Concepts": "fundamental-electrical-concepts",
};

export const NETWORK_TOPIC_ROUTES = {
  "Basic Concepts": "/basic-concepts",
  "Circuit Elements": "/circuit-elements",
  "Circuit Laws": "/circuit-laws",
  "Network Theorems": "/network-theorems",
  "DC Circuit Analysis": "/dc-circuit-analysis",
  "AC Fundamentals": "/ac-fundamentals",
  "AC Circuit Analysis": "/ac-circuit-analysis",
  "Transient Analysis": "/transient-analysis",
  "Network Topology": "/network-topology",
  "Laplace Transform Methods": "/laplace-transform-methods",
  "Frequency Domain Analysis": "/frequency-domain-analysis",
  "Two-Port Networks": "/two-port-networks",
  Filters: "/filters",
  "Network Functions": "/network-functions",
};

export const NETWORK_ROUTE_ACTIVE_INDEX = {
  "/basic-concepts": 0,
  "/circuit-elements": 1,
  "/circuit-laws": 2,
  "/network-theorems": 3,
  "/dc-circuit-analysis": 4,
  "/ac-fundamentals": 5,
  "/ac-circuit-analysis": 6,
  "/transient-analysis": 7,
  "/network-topology": 8,
  "/laplace-transform-methods": 9,
  "/frequency-domain-analysis": 10,
  "/two-port-networks": 11,
  "/filters": 12,
  "/network-functions": 13,
};

const ANALOG_CHAPTERS = [
  {
    number: 1,
    title: "Semiconductor Fundamentals",
    slug: "semiconductor-fundamentals",
    route: "/semiconductor-fundamentals",
    summary:
      "Build the device-physics base: materials, doping, carrier movement, depletion region, barrier potential, and PN-junction biasing.",
    diagramMode: "pn",
    examFocus: "PN junction formation, depletion region, barrier potential, forward and reverse bias.",
    topics: [
      { title: "Atomic Structure", subtopics: ["Conductors", "Semiconductors", "Insulators"] },
      { title: "Semiconductor Materials", subtopics: ["Silicon", "Germanium"] },
      { title: "Types of Semiconductors", subtopics: ["Intrinsic semiconductor", "Extrinsic semiconductor"] },
      { title: "Doping", subtopics: ["P-type semiconductor", "N-type semiconductor"] },
      { title: "PN Junction", subtopics: ["Depletion region", "Barrier potential", "Forward bias", "Reverse bias"] },
    ],
    workingSteps: [
      "Pure silicon or germanium has limited free carriers at room temperature.",
      "Doping adds controlled impurity atoms and creates majority carriers.",
      "When P and N regions touch, electrons and holes diffuse and recombine near the junction.",
      "The uncovered ions form the depletion region and create an internal barrier potential.",
      "Forward bias lowers the barrier so current flows; reverse bias raises the barrier so current is blocked.",
    ],
  },
  {
    number: 2,
    title: "Diodes and Applications",
    slug: "diodes-and-applications",
    route: "/diodes-and-applications",
    legacyRoute: "/diodes",
    summary:
      "Learn diode V-I behavior, special diodes, rectifiers, filters, and Zener regulation as practical circuit blocks.",
    diagramMode: "diode",
    examFocus: "Diode ON/OFF state, rectifier output, ripple reduction, and Zener regulation.",
    topics: [
      { title: "PN Junction Diode Characteristics", subtopics: ["V-I characteristics", "Static resistance", "Dynamic resistance"] },
      { title: "Special Diodes", subtopics: ["Zener diode", "LED", "Photodiode", "Schottky diode", "Varactor diode"] },
      { title: "Rectifiers", subtopics: ["Half-wave rectifier", "Full-wave rectifier", "Bridge rectifier"] },
      { title: "Filters", subtopics: ["Capacitor filter", "Inductor filter", "LC filter"] },
      { title: "Voltage Regulators", subtopics: ["Zener regulator"] },
    ],
    workingSteps: [
      "Apply the input polarity and decide whether the diode is forward biased, reverse biased, or in breakdown.",
      "Replace the diode with the correct model: ideal switch, constant-voltage drop, or Zener clamp.",
      "Trace current through the load only during the conducting interval.",
      "For rectifiers, observe how one half-cycle or both half-cycles become unidirectional load current.",
      "Add filters or Zener action to reduce ripple and hold the output voltage nearly constant.",
    ],
  },
  {
    number: 3,
    title: "Bipolar Junction Transistor (BJT)",
    slug: "bipolar-junction-transistor",
    route: "/bipolar-junction-transistor",
    legacyRoute: "/bjt-and-mosfet",
    summary:
      "Study BJT construction, current control, CE/CB/CC configurations, characteristics, biasing, and small-signal models.",
    diagramMode: "bjt",
    examFocus: "Operating region, current relations, bias stability, h-parameter small-signal analysis.",
    topics: [
      { title: "BJT Basics", subtopics: ["Construction", "Working principle", "Current components"] },
      { title: "BJT Configurations", subtopics: ["CE configuration", "CB configuration", "CC configuration"] },
      { title: "BJT Characteristics", subtopics: ["Input characteristics", "Output characteristics"] },
      { title: "Biasing Circuits", subtopics: ["Fixed bias", "Voltage divider bias", "Stability factor"] },
      { title: "Small Signal Analysis", subtopics: ["Hybrid model", "h-parameters"] },
    ],
    workingSteps: [
      "Forward bias the emitter-base junction and reverse bias the collector-base junction for active operation.",
      "A small base current controls a much larger collector current.",
      "Choose CE, CB, or CC depending on gain, input resistance, and output resistance needs.",
      "Set a stable Q-point using a bias network before applying the AC signal.",
      "Replace the transistor by its small-signal model to calculate gain and resistance values.",
    ],
  },
  {
    number: 4,
    title: "BJT Amplifiers",
    slug: "bjt-amplifiers",
    route: "/bjt-amplifiers",
    legacyRoute: "/amplifiers",
    summary:
      "Connect BJT biasing to voltage gain, frequency response, multistage coupling, and power amplifier classes.",
    diagramMode: "amplifier",
    examFocus: "CE/CB/CC gain, bandwidth, coupling capacitors, and Class A/B/AB operation.",
    topics: [
      { title: "Single Stage Amplifiers", subtopics: ["CE amplifier", "CB amplifier", "CC amplifier"] },
      { title: "Frequency Response", subtopics: ["Low-frequency response", "High-frequency response", "Bandwidth"] },
      { title: "Multistage Amplifiers", subtopics: ["Cascaded gain", "Coupling methods", "Loading effect"] },
      { title: "Power Amplifiers", subtopics: ["Class A", "Class B", "Class AB", "Push-pull amplifier"] },
    ],
    workingSteps: [
      "Start with DC bias and fix the transistor in the active region.",
      "Superimpose a small AC input on the bias point.",
      "Collector current variation creates a larger voltage variation across the collector load.",
      "Coupling and bypass capacitors shape the low-frequency response.",
      "Device capacitances reduce high-frequency gain, creating a finite bandwidth.",
    ],
  },
  {
    number: 5,
    title: "Field Effect Transistors (FET)",
    slug: "field-effect-transistors",
    route: "/field-effect-transistors",
    summary:
      "Understand JFET and MOSFET voltage-controlled behavior, biasing methods, characteristics, and amplifier use.",
    diagramMode: "mosfet",
    examFocus: "JFET/MOSFET regions, threshold voltage, drain current equations, and FET amplifier action.",
    topics: [
      { title: "JFET", subtopics: ["Construction", "Working", "Characteristics"] },
      { title: "MOSFET", subtopics: ["Enhancement MOSFET", "Depletion MOSFET"] },
      { title: "FET Biasing", subtopics: ["Gate bias", "Self bias", "Voltage divider bias"] },
      { title: "FET Amplifiers", subtopics: ["Common source", "Common gate", "Common drain"] },
    ],
    workingSteps: [
      "The gate voltage controls the channel without significant gate current.",
      "In JFETs, reverse gate bias narrows the channel and controls drain current.",
      "In enhancement MOSFETs, gate voltage above threshold creates the conducting channel.",
      "Select cutoff, triode, or saturation equations from the operating condition.",
      "Use the small-signal transconductance to calculate amplifier gain.",
    ],
  },
  {
    number: 6,
    title: "Feedback Amplifiers",
    slug: "feedback-amplifiers",
    route: "/feedback-amplifiers",
    summary:
      "Learn how feedback samples output, returns a fraction to the input, stabilizes gain, and changes amplifier resistance.",
    diagramMode: "feedback",
    examFocus: "Negative feedback gain, bandwidth improvement, distortion reduction, and topology identification.",
    topics: [
      { title: "Concept of Feedback", subtopics: ["Open-loop gain", "Feedback factor", "Closed-loop gain"] },
      { title: "Types of Feedback", subtopics: ["Voltage series", "Voltage shunt", "Current series", "Current shunt"] },
      { title: "Advantages of Negative Feedback", subtopics: ["Gain stability", "Reduced distortion", "Increased bandwidth"] },
    ],
    workingSteps: [
      "Sample either output voltage or output current.",
      "Feed a fraction of the output signal back to the input.",
      "For negative feedback, the returned signal opposes the input error.",
      "The closed-loop gain becomes less sensitive to transistor parameter variation.",
      "Bandwidth, linearity, and distortion performance usually improve.",
    ],
  },
  {
    number: 7,
    title: "Oscillators",
    slug: "oscillators",
    route: "/oscillators",
    summary:
      "Study how positive feedback and frequency-selective networks create sustained sinusoidal oscillations.",
    diagramMode: "oscillator",
    examFocus: "Barkhausen criterion, RC phase shift, Wien bridge, Hartley, Colpitts, and crystal oscillators.",
    topics: [
      { title: "Barkhausen Criterion", subtopics: ["A beta = 1", "Loop gain", "Zero phase shift"] },
      { title: "RC Oscillators", subtopics: ["Phase shift oscillator", "Wien bridge oscillator"] },
      { title: "LC Oscillators", subtopics: ["Hartley oscillator", "Colpitts oscillator"] },
      { title: "Crystal Oscillator", subtopics: ["Piezoelectric effect", "High stability", "Equivalent circuit"] },
    ],
    workingSteps: [
      "Noise or a small disturbance starts a tiny signal in the circuit.",
      "The amplifier increases the signal amplitude.",
      "The feedback network returns a same-phase signal at only the selected frequency.",
      "When loop gain magnitude is one and phase shift is zero, oscillation sustains.",
      "Amplitude control prevents the waveform from growing without limit.",
    ],
  },
  {
    number: 8,
    title: "Operational Amplifiers (Op-Amp)",
    slug: "operational-amplifiers",
    route: "/operational-amplifiers",
    summary:
      "Master ideal assumptions, practical parameters, linear op-amp circuits, comparators, and Schmitt triggers.",
    diagramMode: "opamp",
    examFocus: "Virtual short, zero input current, resistor-ratio gain, slew rate, CMRR, and comparator action.",
    topics: [
      { title: "Ideal Op-Amp Characteristics", subtopics: ["Infinite gain", "Infinite input resistance", "Zero output resistance"] },
      { title: "Practical Op-Amp Parameters", subtopics: ["Slew rate", "CMRR", "Input offset voltage"] },
      { title: "Op-Amp Configurations", subtopics: ["Inverting amplifier", "Non-inverting amplifier", "Voltage follower", "Summing amplifier", "Differentiator", "Integrator"] },
      { title: "Comparator and Schmitt Trigger", subtopics: ["Open-loop comparison", "Hysteresis", "Threshold levels"] },
    ],
    workingSteps: [
      "Check whether the circuit uses negative feedback or open-loop operation.",
      "With negative feedback, assume virtual short and zero input current.",
      "Write KCL at the input node and solve using resistor ratios.",
      "For integrator and differentiator circuits, replace resistor/capacitor current with time-domain relation.",
      "For comparator and Schmitt trigger, compare input with threshold and switch output state.",
    ],
  },
  {
    number: 9,
    title: "Active Filters and Waveform Generators",
    slug: "active-filters-waveform-generators",
    route: "/active-filters-waveform-generators",
    summary:
      "Use op-amps with RC networks to select frequency bands and generate square or triangular waveforms.",
    diagramMode: "filter",
    examFocus: "Low-pass, high-pass, band-pass, band-stop response and op-amp waveform generation.",
    topics: [
      { title: "Active Filters", subtopics: ["Low-pass", "High-pass", "Band-pass", "Band-stop"] },
      { title: "Waveform Generators", subtopics: ["Square wave generator", "Triangular wave generator"] },
    ],
    workingSteps: [
      "RC networks make impedance depend on frequency.",
      "The op-amp buffers or amplifies the selected frequency range.",
      "Low-pass circuits pass slow changes; high-pass circuits pass fast changes.",
      "Band-pass and band-stop responses combine cutoff actions.",
      "Comparator plus integrator action can create square and triangular waveforms.",
    ],
  },
  {
    number: 10,
    title: "Power Supplies",
    slug: "power-supplies",
    route: "/power-supplies",
    summary:
      "Connect rectification, filtering, regulation, IC regulators, and SMPS basics into practical DC power supplies.",
    diagramMode: "supply",
    examFocus: "Rectifier-filter-regulator chain, 78xx/79xx regulators, ripple, and SMPS block flow.",
    topics: [
      { title: "Regulated Power Supply", subtopics: ["Transformer", "Rectifier", "Filter", "Regulator"] },
      { title: "IC Regulators", subtopics: ["78xx series", "79xx series"] },
      { title: "SMPS Basics", subtopics: ["High-frequency switching", "Inductor energy transfer", "Feedback control"] },
    ],
    workingSteps: [
      "Transformer changes AC level and provides isolation when needed.",
      "Rectifier converts AC into pulsating DC.",
      "Filter capacitor or LC network smooths the pulsating waveform.",
      "Regulator keeps output voltage nearly constant despite load or input variation.",
      "SMPS uses high-frequency switching and feedback for efficient regulated conversion.",
    ],
  },
];

const ANALOG_CHAPTER_ROUTES = ANALOG_CHAPTERS.reduce((routes, chapter) => {
  routes[chapter.slug] = chapter.route;
  return routes;
}, {});

const ANALOG_STANDALONE_PAGES = ANALOG_CHAPTERS.reduce((pages, chapter) => {
  pages[`analog-${chapter.slug}`] = chapter;
  return pages;
}, {});

const SEMICONDUCTOR_TOPIC_LESSONS = [
  {
    title: "Atomic Structure",
    idea:
      "Analog electronics begins inside the atom because every diode or transistor is controlled by how tightly electrons are held and how easily they can be moved.",
    subtopics: [
      {
        name: "Conductors",
        explanation:
          "In a conductor, the outer electrons are weakly held. A small electric field can make many electrons drift together, so current flows easily. Metals behave this way because their atoms provide a large population of mobile electrons.",
        steps: [
          "A voltage source creates an electric field inside the material.",
          "Free electrons feel force opposite to the electric field direction.",
          "Because many carriers are already available, current rises with little delay.",
          "The material mainly limits current through resistance, not through carrier shortage.",
        ],
        examLine:
          "Think of a conductor as a material where carriers are already waiting; the circuit only has to push them.",
      },
      {
        name: "Semiconductors",
        explanation:
          "A semiconductor sits between conductor and insulator. At low energy it has few free carriers, but heat, light, doping, or applied voltage can create enough carriers for controlled conduction.",
        steps: [
          "At room temperature, some covalent bonds break and create electron-hole pairs.",
          "Electrons act as negative mobile carriers; holes act as positive mobile carriers.",
          "Changing temperature or doping changes carrier concentration strongly.",
          "This controllability is what makes diodes, BJTs, MOSFETs, and ICs possible.",
        ],
        examLine:
          "A semiconductor is valuable not because it always conducts, but because its conduction can be controlled.",
      },
      {
        name: "Insulators",
        explanation:
          "In an insulator, electrons are tightly bound to atoms. Normal circuit voltages cannot create enough mobile carriers, so current is extremely small unless breakdown occurs.",
        steps: [
          "Electrons remain locked in bonds under ordinary electric fields.",
          "Very few free carriers are available for current.",
          "The material blocks conduction and stores electric field energy.",
          "At very high voltage, breakdown may create a sudden unwanted current path.",
        ],
        examLine:
          "In analog device questions, oxide layers and depletion regions often behave like controlled insulating barriers.",
      },
    ],
  },
  {
    title: "Semiconductor Materials",
    idea:
      "Silicon and germanium are useful because each atom forms four covalent bonds, creating a crystal where carrier movement can be predicted and controlled.",
    subtopics: [
      {
        name: "Silicon",
        explanation:
          "Silicon is the main practical semiconductor because it is thermally stable, abundant, and forms a strong native oxide. Its typical PN-junction forward drop is approximated as 0.7 V in many circuit problems.",
        steps: [
          "Each silicon atom shares four valence electrons with neighboring atoms.",
          "Thermal energy creates a small number of electron-hole pairs.",
          "Doping can raise electron or hole concentration by many orders of magnitude.",
          "Silicon dioxide helps make MOSFET gates and integrated circuits reliable.",
        ],
        examLine:
          "Use 0.7 V as the common silicon diode drop unless the problem states another model.",
      },
      {
        name: "Germanium",
        explanation:
          "Germanium also has four valence electrons, but it has a smaller energy gap than silicon. That means it conducts more easily but also has more leakage current and weaker temperature performance.",
        steps: [
          "Its covalent crystal is similar in idea to silicon.",
          "Lower band gap means carriers are generated more easily.",
          "Forward conduction starts at a smaller voltage, often approximated as 0.3 V.",
          "Higher leakage makes it less common in modern mainstream IC design.",
        ],
        examLine:
          "Use 0.3 V for a germanium diode in simple piecewise-linear circuit questions.",
      },
    ],
  },
  {
    title: "Types of Semiconductors",
    idea:
      "The word intrinsic means pure behavior. The word extrinsic means intentionally modified behavior. Most real analog devices use extrinsic semiconductor regions.",
    subtopics: [
      {
        name: "Intrinsic semiconductor",
        explanation:
          "An intrinsic semiconductor is ideally pure. Electrons and holes are generated in equal numbers, so neither type dominates. Its conductivity is limited because the carrier population is small.",
        steps: [
          "Thermal energy breaks a few covalent bonds.",
          "Every broken bond creates one free electron and one hole.",
          "Electron concentration equals hole concentration.",
          "Current is possible but weak compared with doped material.",
        ],
        examLine:
          "Intrinsic material has equal electron and hole concentrations.",
      },
      {
        name: "Extrinsic semiconductor",
        explanation:
          "An extrinsic semiconductor is doped with controlled impurity atoms. Doping deliberately makes one carrier type dominant, which gives circuit designers predictable P-type and N-type regions.",
        steps: [
          "A tiny amount of impurity is added to the pure crystal.",
          "Donor atoms create extra electrons; acceptor atoms create extra holes.",
          "Majority carriers dominate conduction.",
          "Minority carriers still exist and become important in junction behavior.",
        ],
        examLine:
          "Extrinsic material is where analog devices become engineerable rather than merely natural.",
      },
    ],
  },
  {
    title: "Doping",
    idea:
      "Doping is not random impurity contamination; it is a controlled way of choosing which carrier will dominate a region.",
    subtopics: [
      {
        name: "P-type semiconductor",
        explanation:
          "P-type material is made by adding trivalent acceptor atoms. These atoms create holes, so holes become majority carriers and electrons become minority carriers.",
        steps: [
          "A trivalent atom bonds with nearby silicon atoms but leaves one bond incomplete.",
          "That incomplete bond behaves like a hole.",
          "Neighboring electrons can move into the hole, making the hole appear to move.",
          "Current in P-type material is mainly carried by holes.",
        ],
        examLine:
          "P-type means positive majority carriers: holes.",
      },
      {
        name: "N-type semiconductor",
        explanation:
          "N-type material is made by adding pentavalent donor atoms. Four electrons bond with silicon, while the fifth is loosely available for conduction.",
        steps: [
          "A pentavalent atom enters the silicon crystal.",
          "Four valence electrons form normal covalent bonds.",
          "The extra electron becomes a mobile carrier with little required energy.",
          "Current in N-type material is mainly carried by electrons.",
        ],
        examLine:
          "N-type means negative majority carriers: electrons.",
      },
    ],
  },
  {
    title: "PN Junction",
    idea:
      "A PN junction is not just two materials touching. It creates an internal electric field, a depletion region, and a barrier that decides whether current can pass.",
    subtopics: [
      {
        name: "Depletion region",
        explanation:
          "When P-type and N-type regions meet, electrons diffuse into the P-side and holes diffuse into the N-side. They recombine near the junction, leaving fixed ions that contain almost no mobile carriers.",
        steps: [
          "Electrons move from high concentration on the N-side toward the P-side.",
          "Holes move from high concentration on the P-side toward the N-side.",
          "Near the junction, electrons and holes recombine.",
          "Fixed charged ions remain and form the depletion region.",
        ],
        examLine:
          "The depletion region is depleted of mobile carriers, not depleted of charge.",
      },
      {
        name: "Barrier potential",
        explanation:
          "The fixed ions create an internal electric field that opposes further diffusion. The voltage associated with this field is called barrier potential.",
        steps: [
          "Diffusion initially tries to keep moving carriers across the junction.",
          "Fixed ions build an electric field pointing from N-side ions to P-side ions.",
          "This field pushes carriers opposite to diffusion.",
          "Equilibrium occurs when diffusion tendency and electric-field tendency balance.",
        ],
        examLine:
          "Barrier potential is the junction's built-in opposition to free carrier crossing.",
      },
      {
        name: "Forward bias",
        explanation:
          "In forward bias, the P-side is connected to positive and the N-side to negative. The external voltage weakens the junction barrier, so majority carriers can cross.",
        steps: [
          "Positive terminal pushes holes toward the junction.",
          "Negative terminal pushes electrons toward the junction.",
          "The depletion region becomes thinner.",
          "After the practical turn-on voltage, current rises rapidly.",
        ],
        examLine:
          "Forward bias reduces the barrier and permits strong majority-carrier current.",
      },
      {
        name: "Reverse bias",
        explanation:
          "In reverse bias, the P-side is connected to negative and the N-side to positive. Majority carriers are pulled away from the junction, so the depletion region widens.",
        steps: [
          "Holes are pulled away from the P-side edge of the junction.",
          "Electrons are pulled away from the N-side edge of the junction.",
          "The depletion region becomes wider.",
          "Only a tiny minority-carrier leakage current flows until breakdown.",
        ],
        examLine:
          "Reverse bias widens the barrier and blocks normal majority-carrier current.",
      },
    ],
  },
];

const DIODE_APPLICATION_TOPIC_LESSONS = [
  {
    title: "PN Junction Diode Characteristics",
    idea:
      "A diode is best understood as a junction-controlled gate. It does not simply pass current because voltage exists; it passes current only when the applied polarity reduces the junction barrier enough.",
    subtopics: [
      {
        name: "V-I characteristics",
        explanation:
          "The V-I curve shows how diode current changes with diode voltage. In forward bias, current remains small until the junction barrier is overcome, then it rises sharply. In reverse bias, current remains nearly zero except for a small leakage current until breakdown.",
        steps: [
          "Apply a small forward voltage and notice that the depletion barrier is still strong.",
          "Increase forward voltage near the cut-in region and majority carriers begin crossing the junction.",
          "After practical turn-on, a small voltage increase produces a large current increase.",
          "Reverse the polarity and the depletion region widens, so only leakage current flows.",
          "If reverse voltage crosses breakdown rating, current rises suddenly and must be limited externally.",
        ],
        examLine:
          "Read the diode state first: forward conduction, reverse blocking, or breakdown.",
        visual: "vi",
      },
      {
        name: "Static resistance",
        explanation:
          "Static resistance is the large-signal ratio of diode voltage to diode current at a chosen operating point. It tells you the average opposition seen from the origin to that point on the V-I curve.",
        steps: [
          "Choose the operating point on the diode curve.",
          "Read the diode voltage at that point.",
          "Read the diode current at that same point.",
          "Compute the ratio V divided by I.",
          "Use it only for that large-signal operating condition, not for tiny signal changes around the point.",
        ],
        examLine:
          "Static resistance is point-to-origin resistance: Rdc = VD / ID.",
        visual: "resistance",
      },
      {
        name: "Dynamic resistance",
        explanation:
          "Dynamic resistance is the small-signal resistance around the operating point. It depends on the local slope of the V-I curve, so it becomes small when diode current is large.",
        steps: [
          "Set the diode DC operating point first.",
          "Apply a tiny signal variation around that point.",
          "Observe the small change in diode voltage.",
          "Observe the corresponding small change in diode current.",
          "Use the local ratio delta V divided by delta I for small-signal analysis.",
        ],
        examLine:
          "Dynamic resistance is slope resistance around Q-point, not the full V/I ratio.",
        visual: "resistance",
      },
    ],
  },
  {
    title: "Special Diodes",
    idea:
      "Special diodes are not separate magic devices. They are PN or metal-semiconductor junctions shaped for a specific job: regulation, light emission, light sensing, fast switching, or voltage-controlled capacitance.",
    subtopics: [
      {
        name: "Zener diode",
        explanation:
          "A Zener diode is designed to operate safely in reverse breakdown. When reverse voltage reaches the Zener value, it holds nearly constant voltage while current changes within a safe range.",
        steps: [
          "Connect the Zener in reverse bias across the load.",
          "Use a series resistor to limit current.",
          "As input voltage rises, Zener current increases instead of letting output rise much.",
          "As load current changes, Zener current adjusts to help keep voltage constant.",
          "Regulation fails if Zener current becomes too low or exceeds its rating.",
        ],
        examLine:
          "A Zener regulator works only with reverse bias, current limiting, and current inside the valid range.",
        visual: "zener",
      },
      {
        name: "LED",
        explanation:
          "An LED converts carrier recombination energy into light. It must be forward biased, and current must be limited because after turn-on the diode current can rise quickly.",
        steps: [
          "Forward bias injects electrons and holes into the junction.",
          "Carriers recombine inside the active region.",
          "Part of the released energy appears as photons.",
          "The semiconductor material decides the light color.",
          "A resistor or driver circuit limits LED current safely.",
        ],
        examLine:
          "LED brightness is mainly controlled by forward current, not by connecting it directly to a voltage source.",
        visual: "led",
      },
      {
        name: "Photodiode",
        explanation:
          "A photodiode converts light into current. It is commonly used in reverse bias so the depletion region is wide and light-generated carriers are swept quickly by the electric field.",
        steps: [
          "Reverse bias widens the depletion region.",
          "Incoming light creates electron-hole pairs.",
          "The junction electric field separates these carriers.",
          "Carrier separation creates photocurrent.",
          "More incident light produces more photocurrent within the linear range.",
        ],
        examLine:
          "Photodiode current increases with light intensity, usually under reverse bias.",
        visual: "photo",
      },
      {
        name: "Schottky diode",
        explanation:
          "A Schottky diode uses a metal-semiconductor junction. Because it mainly involves majority carriers, it switches fast and usually has a lower forward voltage drop than a normal silicon PN diode.",
        steps: [
          "Forward bias lowers the metal-semiconductor barrier.",
          "Majority carriers cross without the same stored-charge delay as a PN diode.",
          "The diode turns off quickly when polarity changes.",
          "Lower forward drop reduces conduction loss.",
          "Reverse leakage is usually higher than a standard PN diode.",
        ],
        examLine:
          "Schottky means fast switching and low forward drop, with leakage as a tradeoff.",
        visual: "schottky",
      },
      {
        name: "Varactor diode",
        explanation:
          "A varactor uses the depletion region as a voltage-controlled capacitor. Reverse bias changes depletion width, which changes capacitance.",
        steps: [
          "Operate the diode in reverse bias.",
          "Increase reverse voltage to widen the depletion region.",
          "A wider depletion region behaves like a larger plate separation.",
          "Capacitance decreases as reverse voltage increases.",
          "Tuned circuits use this changing capacitance to shift resonant frequency.",
        ],
        examLine:
          "Varactor capacitance is controlled by reverse voltage.",
        visual: "varactor",
      },
    ],
  },
  {
    title: "Rectifiers",
    idea:
      "A rectifier does not create DC perfectly; it first converts alternating polarity into one-direction load current. Filtering and regulation are separate steps after rectification.",
    subtopics: [
      {
        name: "Half-wave rectifier",
        explanation:
          "A half-wave rectifier uses one diode so only one half-cycle reaches the load. The other half-cycle is blocked, which makes the circuit simple but ripple-heavy.",
        steps: [
          "During the positive half-cycle, the diode is forward biased.",
          "Current flows through the load in one direction.",
          "During the negative half-cycle, the diode is reverse biased.",
          "Load current becomes nearly zero for the blocked half-cycle.",
          "The output is pulsating DC with large gaps.",
        ],
        examLine:
          "Half-wave rectifier conducts for only one half of the input cycle.",
        visual: "half",
      },
      {
        name: "Full-wave rectifier",
        explanation:
          "A full-wave rectifier uses both half-cycles of the AC input. The load current direction remains the same during positive and negative half-cycles, improving average output and reducing ripple compared with half-wave rectification.",
        steps: [
          "During one half-cycle, one current path conducts through the load.",
          "During the opposite half-cycle, another current path conducts.",
          "The load current direction is kept unchanged.",
          "Both halves of the input become useful output pulses.",
          "Ripple frequency becomes twice the input frequency.",
        ],
        examLine:
          "Full-wave rectification uses both half-cycles and doubles ripple frequency.",
        visual: "full",
      },
      {
        name: "Bridge rectifier",
        explanation:
          "A bridge rectifier uses four diodes to achieve full-wave rectification without needing a center-tapped transformer. In each half-cycle, two diodes conduct and two block.",
        steps: [
          "Positive half-cycle forward biases one diagonal pair of diodes.",
          "Current passes through the load in the chosen direction.",
          "Negative half-cycle forward biases the other diagonal pair.",
          "Current again passes through the load in the same direction.",
          "Two diode drops appear in the conducting path.",
        ],
        examLine:
          "Bridge rectifier gives full-wave output, but two conducting diode drops are in series with the load.",
        visual: "bridge",
      },
    ],
  },
  {
    title: "Filters",
    idea:
      "A rectifier output is still a train of pulses. A filter reduces the pulse variation by storing energy when voltage is high and returning energy when voltage tries to fall.",
    subtopics: [
      {
        name: "Capacitor filter",
        explanation:
          "A capacitor filter is connected across the load. It charges near the rectifier peak and discharges through the load between peaks, filling the gaps in the waveform.",
        steps: [
          "When rectifier output rises above capacitor voltage, the diode conducts.",
          "The capacitor charges quickly near the peak.",
          "When input falls, the diode turns off.",
          "The capacitor discharges slowly through the load.",
          "A larger capacitance or lighter load usually reduces ripple.",
        ],
        examLine:
          "Capacitor filters smooth voltage by charging fast and discharging slowly.",
        visual: "capacitor",
      },
      {
        name: "Inductor filter",
        explanation:
          "An inductor filter is placed in series with the load. It opposes sudden current changes, so it tries to keep load current smoother.",
        steps: [
          "Rising current stores energy in the inductor magnetic field.",
          "When current tries to fall, the inductor releases stored energy.",
          "This action reduces sharp current changes.",
          "The output current becomes smoother.",
          "Inductor filters are more useful at higher load currents.",
        ],
        examLine:
          "Inductor filters smooth current by resisting sudden current change.",
        visual: "inductor",
      },
      {
        name: "LC filter",
        explanation:
          "An LC filter combines current smoothing from the inductor and voltage smoothing from the capacitor. The pair attenuates ripple more strongly than either element alone.",
        steps: [
          "The inductor blocks rapid ripple current changes.",
          "The capacitor shunts ripple voltage components across the load.",
          "DC passes to the load more easily than AC ripple.",
          "The output becomes smoother than with a single element.",
          "Component values are chosen from load current, ripple target, and frequency.",
        ],
        examLine:
          "LC filtering attacks ripple through both series opposition and shunt storage.",
        visual: "lc",
      },
    ],
  },
  {
    title: "Voltage Regulators",
    idea:
      "A regulator is the stage that tries to keep output constant after rectification and filtering have already reduced the waveform variation.",
    subtopics: [
      {
        name: "Zener regulator",
        explanation:
          "A Zener regulator uses reverse breakdown as a voltage reference. The series resistor absorbs extra input voltage and limits current, while the Zener holds the load voltage close to its breakdown voltage.",
        steps: [
          "Filtered DC reaches the series resistor and Zener-load branch.",
          "When voltage reaches Zener breakdown, the Zener conducts in reverse.",
          "The load voltage becomes approximately equal to Zener voltage.",
          "If input voltage rises, extra current mainly goes through the Zener.",
          "If load current rises too much, Zener current may fall below regulation range.",
        ],
        examLine:
          "For Zener regulation, always check minimum and maximum Zener current.",
        visual: "zener",
      },
    ],
  },
];

const BJT_TOPIC_LESSONS = [
  {
    title: "BJT Basics",
    idea:
      "A BJT is a three-layer current-control device. Its power comes from a small base action controlling a much larger collector-emitter current path.",
    subtopics: [
      {
        name: "Construction",
        explanation:
          "A BJT is made as either NPN or PNP. The emitter is heavily doped to inject carriers, the base is very thin and lightly doped to let most carriers pass through, and the collector is moderately doped with a larger area so it can collect carriers and handle power.",
        steps: [
          "Emitter is designed as the carrier supplier.",
          "Base is made thin so injected carriers do not mostly recombine there.",
          "Collector is designed to collect carriers and withstand reverse voltage.",
          "In NPN, electrons are the main transported carriers; in PNP, holes are.",
          "The three regions create two junctions: emitter-base and collector-base.",
        ],
        examLine:
          "Emitter injects, base controls, collector collects.",
        visual: "construction",
      },
      {
        name: "Working principle",
        explanation:
          "In active-region NPN operation, the emitter-base junction is forward biased and the collector-base junction is reverse biased. Electrons injected from the emitter cross the thin base, and the collector field sweeps most of them into the collector.",
        steps: [
          "Forward bias at emitter-base junction injects electrons from emitter to base.",
          "Only a small fraction recombines inside the thin base.",
          "That recombination creates the small base current.",
          "Most electrons reach the collector-base depletion region.",
          "The collector electric field sweeps them into the collector, creating collector current.",
        ],
        examLine:
          "Small base current exists because a small part of injected carriers recombines in the base.",
        visual: "working",
      },
      {
        name: "Current components",
        explanation:
          "The emitter current splits into collector current and base current. In normal active operation, collector current is much larger than base current, so current gain becomes possible.",
        steps: [
          "Emitter current enters the transistor action as the supplied carrier stream.",
          "A small portion contributes to base recombination current.",
          "The larger portion becomes collector current.",
          "For NPN, conventional current relation is IE = IC + IB.",
          "Current gain is written as beta = IC / IB in common-emitter analysis.",
        ],
        examLine:
          "Always start BJT current questions from IE = IC + IB and beta = IC / IB.",
        visual: "currents",
      },
    ],
  },
  {
    title: "BJT Configurations",
    idea:
      "The same transistor behaves differently depending on which terminal is common to input and output. Configuration decides gain, phase, and impedance behavior.",
    subtopics: [
      {
        name: "CE configuration",
        explanation:
          "In common-emitter configuration, the emitter is common to input and output. It gives high voltage gain and current gain, but the output is phase inverted with respect to the input.",
        steps: [
          "Input is applied between base and emitter.",
          "Output is taken between collector and emitter.",
          "Small base signal controls collector current.",
          "Collector resistor converts current variation into voltage variation.",
          "When collector current increases, collector voltage falls, causing phase inversion.",
        ],
        examLine:
          "CE is the main voltage amplifier configuration and gives 180 degree phase shift.",
        visual: "ce",
      },
      {
        name: "CB configuration",
        explanation:
          "In common-base configuration, the base is common. It has low input resistance, high output resistance, current gain slightly less than one, and no phase inversion.",
        steps: [
          "Input is applied at the emitter side.",
          "Output is taken from the collector side.",
          "Most emitter-injected carriers are collected by the collector.",
          "Current gain is near but less than unity.",
          "Voltage gain can be high because output resistance is high.",
        ],
        examLine:
          "CB has current gain below one but useful high-frequency behavior.",
        visual: "cb",
      },
      {
        name: "CC configuration",
        explanation:
          "In common-collector configuration, the collector is common and output is taken from the emitter. It is also called emitter follower because output follows input with nearly unity voltage gain.",
        steps: [
          "Input is applied between base and collector reference.",
          "Output is taken at the emitter.",
          "Emitter voltage follows base voltage minus the base-emitter drop.",
          "Voltage gain is close to one.",
          "Low output resistance makes it useful as a buffer.",
        ],
        examLine:
          "CC is used for impedance matching and buffering, not large voltage gain.",
        visual: "cc",
      },
    ],
  },
  {
    title: "BJT Characteristics",
    idea:
      "BJT characteristic curves are maps of device behavior. They show how input junction current starts and how collector current responds to collector voltage for different base currents.",
    subtopics: [
      {
        name: "Input characteristics",
        explanation:
          "Input characteristics usually plot base current against base-emitter voltage for a CE transistor. The curve resembles a forward-biased diode because the base-emitter junction is forward biased in active operation.",
        steps: [
          "Increase base-emitter voltage gradually.",
          "Below the practical turn-on region, base current remains small.",
          "After the junction conducts, base current rises rapidly.",
          "The curve looks diode-like because the input junction is a PN junction.",
          "Input resistance is estimated from the local slope of this curve.",
        ],
        examLine:
          "BJT CE input curve behaves like a forward-biased diode curve.",
        visual: "input",
      },
      {
        name: "Output characteristics",
        explanation:
          "Output characteristics plot collector current against collector-emitter voltage for different base currents. They reveal cutoff, active, and saturation behavior.",
        steps: [
          "Set a fixed base current.",
          "Increase collector-emitter voltage and observe collector current.",
          "At low VCE, the transistor is in saturation and IC depends strongly on VCE.",
          "In active region, IC is mainly controlled by IB and only slightly by VCE.",
          "With IB near zero, the transistor is in cutoff except for leakage.",
        ],
        examLine:
          "Use output curves to identify cutoff, active region, and saturation before solving.",
        visual: "output",
      },
    ],
  },
  {
    title: "Biasing Circuits",
    idea:
      "Biasing is the art of placing the transistor at a useful DC operating point before any signal arrives. Without a stable Q-point, amplifier calculations are only decoration.",
    subtopics: [
      {
        name: "Fixed bias",
        explanation:
          "Fixed bias uses a resistor from supply to base. It is simple, but Q-point depends strongly on beta, so two transistors with different beta can produce very different collector currents.",
        steps: [
          "Base resistor sets base current approximately from supply voltage.",
          "Collector current is beta times base current.",
          "Collector resistor creates collector voltage from that current.",
          "If beta changes, collector current changes significantly.",
          "This makes fixed bias weak for stable amplifier design.",
        ],
        examLine:
          "Fixed bias is easy to calculate but poor in stability.",
        visual: "fixed",
      },
      {
        name: "Voltage divider bias",
        explanation:
          "Voltage divider bias uses two resistors to set base voltage and an emitter resistor to provide negative feedback. If collector current rises, emitter voltage rises, reducing effective base-emitter voltage and opposing the change.",
        steps: [
          "Divider resistors establish an approximate base voltage.",
          "Emitter voltage becomes base voltage minus VBE.",
          "Emitter resistor sets emitter current from emitter voltage.",
          "Collector current becomes less dependent on beta.",
          "The emitter resistor provides self-correction against temperature and beta changes.",
        ],
        examLine:
          "Voltage divider bias is preferred because emitter feedback stabilizes Q-point.",
        visual: "divider",
      },
      {
        name: "Stability factor",
        explanation:
          "Stability factor measures how sensitive collector current is to leakage current, beta, or temperature-related changes. A smaller stability factor means the bias point is less likely to drift.",
        steps: [
          "Temperature rise increases leakage current.",
          "Leakage can increase collector current.",
          "Increased collector current can heat the transistor further.",
          "Good biasing introduces feedback to oppose this drift.",
          "Stability factor numerically expresses how strongly IC changes.",
        ],
        examLine:
          "Lower stability factor means better thermal stability.",
        visual: "stability",
      },
    ],
  },
  {
    title: "Small Signal Analysis",
    idea:
      "Small-signal analysis separates the transistor into two lives: DC bias sets the operating point, and AC variations around that point are analyzed with a linear model.",
    subtopics: [
      {
        name: "Hybrid model",
        explanation:
          "The hybrid model represents the transistor by small-signal parameters around the Q-point. It lets us replace the nonlinear transistor with a local linear circuit for gain and impedance calculations.",
        steps: [
          "Find the DC Q-point first.",
          "Turn DC supplies into AC ground for small-signal analysis.",
          "Replace coupling capacitors by shorts in midband analysis.",
          "Replace the BJT by its small-signal hybrid model.",
          "Solve the resulting linear circuit for gain and resistances.",
        ],
        examLine:
          "Never start small-signal analysis before establishing the DC operating point.",
        visual: "hybrid",
      },
      {
        name: "h-parameters",
        explanation:
          "h-parameters describe input resistance, reverse voltage feedback, forward current gain, and output admittance. They are useful because BJT behavior can be represented as a two-port model for AC analysis.",
        steps: [
          "Treat the transistor as a two-port network.",
          "Use h11 as input resistance with output shorted.",
          "Use h21 as forward current gain.",
          "Use h12 for reverse feedback, often small in simplified analysis.",
          "Use h22 as output admittance for output resistance estimation.",
        ],
        examLine:
          "For CE h-parameter questions, hfe is the familiar small-signal current gain.",
        visual: "hparams",
      },
    ],
  },
];

const BJT_AMPLIFIER_TOPIC_LESSONS = [
  {
    title: "Single Stage Amplifiers",
    idea:
      "A single-stage BJT amplifier is a controlled energy converter: a small input signal changes transistor current, and the DC supply plus load resistor turn that current change into a larger output voltage.",
    subtopics: [
      {
        name: "CE amplifier",
        explanation:
          "The common-emitter amplifier is the main voltage-gain stage. The input is applied at the base, the output is taken at the collector, and the emitter is common to both. A small increase in base voltage increases collector current, which increases the drop across the collector resistor and pulls collector voltage downward.",
        steps: [
          "DC bias first places the transistor in active region.",
          "The AC input slightly changes base-emitter voltage.",
          "Collector current changes in step with the base-emitter variation.",
          "The collector resistor converts current variation into voltage variation.",
          "Output voltage is amplified and inverted because higher collector current lowers collector voltage.",
        ],
        examLine:
          "CE gives high voltage gain with 180 degree phase inversion.",
        visual: "ceamp",
      },
      {
        name: "CB amplifier",
        explanation:
          "The common-base amplifier accepts input at the emitter and takes output from the collector. It has low input resistance, high output resistance, no phase inversion, and useful high-frequency behavior because the base is held at AC ground.",
        steps: [
          "Base is kept common for input and output signal reference.",
          "Emitter input changes emitter current directly.",
          "Most emitter current reaches the collector.",
          "Collector load converts collector current change into output voltage.",
          "Output remains in phase with input for voltage variation.",
        ],
        examLine:
          "CB is not a current-gain stage; it is useful for voltage gain and high-frequency work.",
        visual: "cbamp",
      },
      {
        name: "CC amplifier",
        explanation:
          "The common-collector amplifier is also called an emitter follower. Output is taken from the emitter, so it follows the base signal with nearly unity voltage gain, high input resistance, and low output resistance.",
        steps: [
          "Input signal is applied at the base.",
          "Emitter voltage follows base voltage approximately one VBE below it.",
          "Voltage gain stays close to one.",
          "The stage can supply more load current than the signal source alone.",
          "It is used as a buffer between high-resistance source and low-resistance load.",
        ],
        examLine:
          "CC is a buffer: high input resistance, low output resistance, nearly unity voltage gain.",
        visual: "ccamp",
      },
    ],
  },
  {
    title: "Frequency Response",
    idea:
      "An amplifier does not amplify every frequency equally. Its gain is shaped by coupling capacitors, bypass capacitors, transistor capacitances, and wiring parasitics.",
    subtopics: [
      {
        name: "Low-frequency response",
        explanation:
          "At low frequency, coupling and bypass capacitors do not behave like perfect shorts. They create reactance that reduces signal transfer and lowers gain.",
        steps: [
          "Input coupling capacitor blocks part of the slow-changing signal.",
          "Output coupling capacitor also loses voltage across its reactance.",
          "Emitter bypass capacitor may fail to fully bypass emitter resistance.",
          "Extra emitter degeneration reduces gain.",
          "Gain rises as frequency increases and capacitive reactance decreases.",
        ],
        examLine:
          "Low-frequency gain drop is mainly caused by external coupling and bypass capacitors.",
        visual: "lowfreq",
      },
      {
        name: "High-frequency response",
        explanation:
          "At high frequency, internal transistor capacitances and stray capacitances become important. They provide unwanted signal paths and reduce effective gain.",
        steps: [
          "Base-emitter and base-collector capacitances begin to conduct AC current.",
          "Some input signal is shunted through capacitance instead of controlling transistor current.",
          "The Miller effect can make base-collector capacitance appear larger at the input.",
          "Gain begins to fall after the upper cutoff frequency.",
          "Phase shift increases as the amplifier approaches high-frequency limits.",
        ],
        examLine:
          "High-frequency gain drop is mainly caused by internal and stray capacitances.",
        visual: "highfreq",
      },
      {
        name: "Bandwidth",
        explanation:
          "Bandwidth is the useful frequency range between lower cutoff and upper cutoff. Inside this range, gain is approximately flat enough for normal signal amplification.",
        steps: [
          "Find midband gain where capacitors behave ideally for the intended range.",
          "Locate lower cutoff frequency where gain falls by 3 dB from midband.",
          "Locate upper cutoff frequency where gain again falls by 3 dB.",
          "Bandwidth is fH minus fL.",
          "A wider bandwidth means the amplifier can preserve faster signal variations.",
        ],
        examLine:
          "Bandwidth = fH - fL, measured between the two 3 dB cutoff frequencies.",
        visual: "bandwidth",
      },
    ],
  },
  {
    title: "Multistage Amplifiers",
    idea:
      "When one amplifier stage cannot give enough gain, stages are cascaded. The price is loading: each stage becomes the next stage's source.",
    subtopics: [
      {
        name: "Cascaded gain",
        explanation:
          "In a multistage amplifier, the output of one stage drives the input of the next. Overall voltage gain is the product of individual loaded gains, or the sum of gains when expressed in decibels.",
        steps: [
          "Bias each transistor stage separately.",
          "Pass the AC signal from one collector or emitter output into the next stage.",
          "Calculate each stage gain under loaded conditions.",
          "Multiply voltage gains to get total gain.",
          "In dB, add stage gains instead of multiplying ratios.",
        ],
        examLine:
          "Overall gain is product of stage gains, but use loaded gain for each stage.",
        visual: "cascade",
      },
      {
        name: "Coupling methods",
        explanation:
          "Coupling decides how signal moves between stages while DC bias points remain controlled. RC coupling is common for voltage amplifiers, transformer coupling is used in some power/RF cases, and direct coupling passes DC as well as AC.",
        steps: [
          "RC coupling passes AC and blocks DC between stages.",
          "Transformer coupling transfers AC energy magnetically and can match impedance.",
          "Direct coupling connects stages without a capacitor or transformer.",
          "Each method affects frequency response and bias interaction.",
          "Choose coupling from signal frequency, gain need, and bias requirement.",
        ],
        examLine:
          "RC coupling is common in small-signal voltage amplifiers because it isolates DC bias between stages.",
        visual: "coupling",
      },
      {
        name: "Loading effect",
        explanation:
          "Loading occurs when the next stage input resistance draws signal current from the previous stage. This reduces the actual output voltage of the previous stage and lowers total gain.",
        steps: [
          "Previous stage has an output resistance.",
          "Next stage presents a finite input resistance.",
          "Together they form a voltage divider.",
          "The signal delivered to the next stage is less than unloaded output.",
          "Buffer stages are used when loading must be reduced.",
        ],
        examLine:
          "Do not multiply unloaded gains when stages load each other.",
        visual: "loading",
      },
    ],
  },
  {
    title: "Power Amplifiers",
    idea:
      "A power amplifier is judged less by voltage gain and more by how efficiently it delivers large signal power to the load without unacceptable distortion.",
    subtopics: [
      {
        name: "Class A",
        explanation:
          "A Class A amplifier conducts for the full input cycle. It is very linear because the transistor never turns off during normal operation, but it wastes power because current flows even with no input signal.",
        steps: [
          "Bias the transistor near the middle of the active region.",
          "The device conducts for all 360 degrees of the signal cycle.",
          "Positive and negative signal swings remain within active operation.",
          "Distortion is low if swing limits are not crossed.",
          "Efficiency is low because DC power is continuously consumed.",
        ],
        examLine:
          "Class A: best linearity, poorest efficiency, 360 degree conduction.",
        visual: "classa",
      },
      {
        name: "Class B",
        explanation:
          "A Class B amplifier conducts for half of the signal cycle. Two complementary devices are usually used in push-pull form so one handles positive half and the other handles negative half.",
        steps: [
          "Each device is biased near cutoff.",
          "One device conducts during the positive half-cycle.",
          "The other device conducts during the negative half-cycle.",
          "Efficiency improves because each device rests for half the cycle.",
          "Crossover distortion can appear near zero crossing.",
        ],
        examLine:
          "Class B improves efficiency but suffers crossover distortion.",
        visual: "classb",
      },
      {
        name: "Class AB",
        explanation:
          "Class AB slightly biases both devices on near the zero crossing. This reduces crossover distortion while keeping efficiency better than Class A.",
        steps: [
          "Bias each device slightly above cutoff.",
          "Both devices conduct a little around zero crossing.",
          "Positive and negative halves transfer more smoothly.",
          "Crossover distortion is reduced.",
          "Efficiency sits between Class A and Class B.",
        ],
        examLine:
          "Class AB is the practical compromise between Class A linearity and Class B efficiency.",
        visual: "classab",
      },
      {
        name: "Push-pull amplifier",
        explanation:
          "A push-pull amplifier uses two active devices working on opposite halves of the waveform. Their outputs combine at the load to reconstruct the full waveform with greater power capability.",
        steps: [
          "Input waveform is split into opposite drive signals or applied to complementary devices.",
          "Upper device supplies current for one half-cycle.",
          "Lower device supplies current for the other half-cycle.",
          "Load receives both halves as one complete waveform.",
          "Balanced operation reduces even-order distortion and improves power delivery.",
        ],
        examLine:
          "Push-pull action lets two devices share the waveform and deliver higher output power.",
        visual: "pushpull",
      },
    ],
  },
];

const FET_TOPIC_LESSONS = [
  {
    title: "JFET",
    idea:
      "A JFET is a voltage-controlled channel device. The gate does not need normal forward current; instead, reverse gate bias changes the channel width and controls drain current.",
    subtopics: [
      {
        name: "Construction",
        explanation:
          "A JFET has a conducting channel between source and drain, with gate regions forming reverse-biased PN junctions around that channel. In an n-channel JFET, electrons move from source to drain, and the gate voltage controls how much of the channel remains open.",
        steps: [
          "Source supplies carriers into the channel.",
          "Drain collects carriers after they travel through the channel.",
          "Gate PN junction is normally reverse biased.",
          "Reverse bias creates depletion regions that enter the channel.",
          "The available channel width decides drain current.",
        ],
        examLine:
          "JFET gate controls current by changing channel width through depletion regions.",
        visual: "jfet-construction",
      },
      {
        name: "Working",
        explanation:
          "When drain-source voltage is applied, carriers flow through the channel. Making gate-source voltage more negative in an n-channel JFET widens the depletion region, narrows the channel, and reduces drain current.",
        steps: [
          "Apply VDS so carriers move from source to drain.",
          "Keep gate reverse biased so gate current is almost zero.",
          "Increase reverse gate bias to widen depletion regions.",
          "The channel becomes narrower and current reduces.",
          "At pinch-off or cutoff condition, current is strongly limited.",
        ],
        examLine:
          "More reverse gate bias in an n-channel JFET means less drain current.",
        visual: "jfet-working",
      },
      {
        name: "Characteristics",
        explanation:
          "JFET output characteristics show drain current versus drain-source voltage for different gate-source voltages. Transfer characteristics show how drain current changes with gate-source voltage.",
        steps: [
          "At small VDS, the JFET behaves like a voltage-controlled resistor.",
          "As VDS increases, the channel pinches near the drain side.",
          "After pinch-off, drain current becomes almost constant.",
          "Changing VGS shifts the current level.",
          "Transfer curve links ID to VGS and is central to bias analysis.",
        ],
        examLine:
          "JFET current is controlled by VGS; output curves reveal ohmic and saturation regions.",
        visual: "jfet-characteristics",
      },
    ],
  },
  {
    title: "MOSFET",
    idea:
      "A MOSFET uses an insulated gate. Since the gate is separated by oxide, gate current is ideally almost zero, and the electric field from gate voltage creates or modifies the channel.",
    subtopics: [
      {
        name: "Enhancement MOSFET",
        explanation:
          "An enhancement MOSFET is normally OFF at zero gate-source voltage. A sufficient gate voltage creates an inversion channel, allowing drain current to flow.",
        steps: [
          "With VGS below threshold, no strong channel exists.",
          "Increasing VGS attracts carriers near the oxide-semiconductor surface.",
          "At threshold voltage, a usable conducting channel forms.",
          "Applying VDS moves carriers from source to drain.",
          "Further VGS increase strengthens the channel and increases drain current.",
        ],
        examLine:
          "Enhancement MOSFET needs VGS above threshold to turn ON.",
        visual: "enhancement",
      },
      {
        name: "Depletion MOSFET",
        explanation:
          "A depletion MOSFET already has a channel at zero gate-source voltage. Gate voltage can deplete the channel and reduce current, or enhance it and increase current depending on polarity.",
        steps: [
          "At VGS = 0, the existing channel conducts.",
          "A depletion-polarity gate voltage pushes carriers out of the channel.",
          "Channel conductivity decreases and drain current falls.",
          "An enhancement-polarity gate voltage attracts more carriers.",
          "Channel conductivity increases and drain current rises.",
        ],
        examLine:
          "Depletion MOSFET can conduct at VGS = 0; enhancement MOSFET normally cannot.",
        visual: "depletion",
      },
    ],
  },
  {
    title: "FET Biasing",
    idea:
      "FET biasing fixes the DC operating point using voltage control rather than base current control. The goal is stable drain current and enough signal swing.",
    subtopics: [
      {
        name: "Gate bias",
        explanation:
          "Gate bias applies a fixed gate voltage to set the operating point. Because gate current is almost zero, the gate voltage can be established with high-value resistors, but device parameter variation may still move the drain current.",
        steps: [
          "Choose the desired drain current or operating region.",
          "Apply a gate voltage through a high-resistance path.",
          "Use the FET transfer relation to estimate drain current.",
          "Set drain resistor or load to place drain voltage in the useful range.",
          "Check that signal swing does not push the device into cutoff or triode unintentionally.",
        ],
        examLine:
          "Gate current is almost zero, but FET drain current still depends strongly on device parameters.",
        visual: "gate-bias",
      },
      {
        name: "Self bias",
        explanation:
          "Self bias uses a source resistor so the source voltage rises with drain current. This automatically makes gate-source voltage oppose current increase, giving negative feedback.",
        steps: [
          "Gate is commonly referenced to ground through a large resistor.",
          "Drain current flows through the source resistor.",
          "Source voltage rises as current increases.",
          "For n-channel devices, VGS becomes less positive or more negative.",
          "That change reduces current and stabilizes the operating point.",
        ],
        examLine:
          "Source resistor feedback is the stabilizing heart of self bias.",
        visual: "self-bias",
      },
      {
        name: "Voltage divider bias",
        explanation:
          "Voltage divider bias sets gate voltage using two resistors, while a source resistor adds feedback. It is widely used because it makes the Q-point less dependent on gate leakage and device spread.",
        steps: [
          "Divider resistors establish gate voltage.",
          "Source resistor establishes source voltage from drain current.",
          "The difference VG - VS sets gate-source voltage.",
          "Drain current follows the FET transfer relation.",
          "Source feedback corrects current drift and improves stability.",
        ],
        examLine:
          "For FET divider bias, solve VG first, then VS, then VGS.",
        visual: "divider-bias",
      },
    ],
  },
  {
    title: "FET Amplifiers",
    idea:
      "A FET amplifier converts gate-voltage variation into drain-current variation. The load then converts that current variation into an output voltage.",
    subtopics: [
      {
        name: "Common source",
        explanation:
          "The common-source amplifier is the FET counterpart of the BJT common-emitter amplifier. It provides voltage gain with phase inversion and high input resistance.",
        steps: [
          "Bias the FET in the saturation region.",
          "Apply the AC input at the gate.",
          "Gate-source voltage variation changes drain current.",
          "Drain resistor converts current variation into voltage variation.",
          "Output at the drain is amplified and inverted.",
        ],
        examLine:
          "Common source gives voltage gain and 180 degree phase inversion.",
        visual: "common-source",
      },
      {
        name: "Common gate",
        explanation:
          "The common-gate amplifier has gate as AC reference, input at source, and output at drain. It has low input resistance and no phase inversion.",
        steps: [
          "Hold gate at AC ground.",
          "Apply input at the source terminal.",
          "Source voltage changes VGS and therefore drain current.",
          "Drain load converts current variation into output voltage.",
          "Output is not phase inverted in the same way as common source.",
        ],
        examLine:
          "Common gate is useful for low input resistance and high-frequency applications.",
        visual: "common-gate",
      },
      {
        name: "Common drain",
        explanation:
          "The common-drain amplifier is also called a source follower. It has voltage gain close to one, high input resistance, and low output resistance, making it useful as a buffer.",
        steps: [
          "Apply input at the gate.",
          "Take output from the source.",
          "Source voltage follows gate voltage through the FET action.",
          "Voltage gain remains slightly less than one.",
          "The stage isolates a weak signal source from a heavier load.",
        ],
        examLine:
          "Common drain is a source follower used for buffering.",
        visual: "common-drain",
      },
    ],
  },
];

const FEEDBACK_TOPIC_LESSONS = [
  {
    title: "Concept of Feedback",
    idea:
      "Feedback means the amplifier listens to its own output. A sampled portion of the output is returned to the input so the circuit can correct gain, distortion, bandwidth, or impedance behavior.",
    subtopics: [
      {
        name: "Open-loop gain",
        explanation:
          "Open-loop gain is the gain of the amplifier before feedback is applied. It is usually high but sensitive to transistor parameters, temperature, supply variation, and frequency.",
        steps: [
          "Apply input directly to the amplifier.",
          "The amplifier produces output according to its internal gain.",
          "No output sample is returned to correct the input error.",
          "Gain can vary when device parameters or temperature changes.",
          "This high but uncontrolled gain becomes the raw material for feedback design.",
        ],
        examLine: "Open-loop gain is large, but it is not naturally stable.",
        visual: "open-loop",
      },
      {
        name: "Feedback factor",
        explanation:
          "Feedback factor is the fraction of output returned to the input. It is usually written as beta. The feedback network may be a resistor divider, RC network, transformer network, or another sampling path.",
        steps: [
          "Take a sample from the output side.",
          "Scale that sample using the feedback network.",
          "Return the scaled signal to the input comparison point.",
          "The returned signal is beta times the output.",
          "Changing beta changes closed-loop gain and stability behavior.",
        ],
        examLine: "Feedback factor beta tells how much output information returns to the input.",
        visual: "feedback-factor",
      },
      {
        name: "Closed-loop gain",
        explanation:
          "Closed-loop gain is the gain after feedback is applied. With negative feedback, it becomes more predictable and is often controlled mainly by the feedback network rather than the raw amplifier gain.",
        steps: [
          "Input signal and feedback signal meet at the summing point.",
          "Negative feedback subtracts from the input to form an error signal.",
          "The amplifier amplifies this smaller error signal.",
          "Output adjusts until the feedback sample nearly matches the required input relation.",
          "Closed-loop gain becomes stable when loop gain is high enough.",
        ],
        examLine: "For negative feedback, closed-loop gain is approximately set by the feedback network when A beta is large.",
        visual: "closed-loop",
      },
    ],
  },
  {
    title: "Types of Feedback",
    idea:
      "Feedback type is named by what is sampled at the output and how it is mixed at the input. Voltage or current can be sampled; series or shunt mixing can be used.",
    subtopics: [
      {
        name: "Voltage series",
        explanation:
          "Voltage-series feedback samples output voltage and returns it in series with the input. It usually increases input resistance and decreases output resistance, making it common in voltage amplifiers.",
        steps: [
          "Sense output voltage across the load.",
          "Feed a proportional voltage back to the input.",
          "Mix feedback in series with the source signal.",
          "Input resistance rises because the source sees series opposition.",
          "Output resistance falls because output voltage is corrected by feedback.",
        ],
        examLine: "Voltage-series feedback is common for stable voltage gain.",
        visual: "voltage-series",
      },
      {
        name: "Voltage shunt",
        explanation:
          "Voltage-shunt feedback samples output voltage and returns current at the input node in shunt. It tends to reduce both input and output resistance.",
        steps: [
          "Sense output voltage from the load side.",
          "Convert the sampled voltage into feedback current.",
          "Inject feedback current at the input node.",
          "Input node behaves as a low-resistance summing point.",
          "Output voltage is controlled by the sampled feedback signal.",
        ],
        examLine: "Voltage-shunt feedback lowers input resistance and output resistance.",
        visual: "voltage-shunt",
      },
      {
        name: "Current series",
        explanation:
          "Current-series feedback samples output current and returns a series voltage to the input. It tends to increase both input and output resistance.",
        steps: [
          "Sense load or output current using a series element.",
          "Convert current sample into a feedback voltage.",
          "Insert that feedback voltage in series with the input.",
          "Input resistance increases because of series mixing.",
          "Output resistance increases because current sampling opposes load-current change.",
        ],
        examLine: "Current-series feedback is useful when controlled output current is desired.",
        visual: "current-series",
      },
      {
        name: "Current shunt",
        explanation:
          "Current-shunt feedback samples output current and returns a shunt current to the input. It tends to reduce input resistance and increase output resistance.",
        steps: [
          "Sense output current through a series sampling path.",
          "Generate a proportional feedback current.",
          "Mix that feedback current at the input node.",
          "Input resistance falls due to shunt mixing.",
          "Output resistance rises because output current is regulated.",
        ],
        examLine: "Current-shunt feedback is a current-control topology with shunt input mixing.",
        visual: "current-shunt",
      },
    ],
  },
  {
    title: "Advantages of Negative Feedback",
    idea:
      "Negative feedback trades some gain for better behavior. It makes the amplifier less dependent on imperfect devices and more dependent on the designed feedback network.",
    subtopics: [
      {
        name: "Gain stability",
        explanation:
          "Negative feedback stabilizes gain because variations in amplifier gain are corrected by the feedback loop. If gain rises, feedback rises and reduces the error signal; if gain falls, feedback falls and allows more error drive.",
        steps: [
          "Amplifier gain tries to change due to temperature or device variation.",
          "Output changes because of that gain shift.",
          "Feedback sample changes in the same direction.",
          "The input error is adjusted opposite to the gain shift.",
          "Closed-loop gain remains much more stable than open-loop gain.",
        ],
        examLine: "Negative feedback desensitizes gain by the factor 1 + A beta.",
        visual: "gain-stability",
      },
      {
        name: "Reduced distortion",
        explanation:
          "Distortion means output is not a clean scaled copy of the input. Negative feedback compares output information with the input demand and forces the amplifier to correct nonlinear errors.",
        steps: [
          "Nonlinear amplifier action creates waveform error.",
          "The distorted output is sampled by the feedback network.",
          "Feedback returns an error-related signal to the input.",
          "The amplifier drives in a direction that cancels part of the distortion.",
          "Output waveform becomes closer to the intended shape.",
        ],
        examLine: "Negative feedback reduces distortion roughly by the same loop factor that stabilizes gain.",
        visual: "distortion",
      },
      {
        name: "Increased bandwidth",
        explanation:
          "Negative feedback lowers midband gain but extends the useful frequency range. The gain-bandwidth tradeoff means the amplifier gives less gain over a wider band.",
        steps: [
          "Without feedback, gain is high but falls sooner with frequency.",
          "Negative feedback reduces midband gain.",
          "The lower gain target remains accurate over a wider frequency range.",
          "Lower cutoff may move downward and upper cutoff may move upward.",
          "The usable bandwidth increases.",
        ],
        examLine: "Negative feedback reduces gain but increases bandwidth.",
        visual: "bandwidth-feedback",
      },
    ],
  },
];

const OSCILLATOR_QUICK_TOPICS = [
  {
    title: "Barkhausen Criterion",
    detail:
      "Oscillation is sustained when loop gain magnitude is unity and total phase shift around the loop is 0 degree or 360 degrees.",
    formula: "$$ |A\\beta| = 1, \\quad \\angle A\\beta = 0^\\circ \\text{ or } 360^\\circ $$",
  },
  {
    title: "RC Oscillators",
    detail:
      "RC oscillators use resistor-capacitor phase-shift or bridge networks to generate low and audio-frequency sine waves.",
    formula: "$$ f = \\frac{1}{2\\pi RC\\sqrt{6}} \\text{ for a basic three-section RC phase-shift oscillator} $$",
  },
  {
    title: "LC Oscillators",
    detail:
      "LC oscillators use energy exchange between an inductor magnetic field and capacitor electric field, making them useful at radio frequencies.",
    formula: "$$ f_0 = \\frac{1}{2\\pi\\sqrt{LC}} $$",
  },
  {
    title: "Crystal Oscillator",
    detail:
      "Crystal oscillators use the piezoelectric property of quartz to produce extremely stable frequency references.",
    formula: "$$ f_s \\approx \\frac{1}{2\\pi\\sqrt{L_m C_m}} $$",
  },
];

const OPAMP_QUICK_TOPICS = [
  {
    title: "Ideal Op-Amp Rule",
    detail:
      "With negative feedback, an ideal op-amp makes the input terminal voltages nearly equal while drawing zero input current.",
    formula: "$$ V_+ \\approx V_-, \\quad I_+ = I_- = 0 $$",
  },
  {
    title: "Inverting Amplifier",
    detail:
      "The input signal enters the inverting node through an input resistor, and feedback resistor controls closed-loop gain.",
    formula: "$$ A_v = \\frac{V_o}{V_i} = -\\frac{R_f}{R_1} $$",
  },
  {
    title: "Non-Inverting Amplifier",
    detail:
      "The input is applied to the non-inverting terminal, so output preserves phase and gain is set by the feedback divider.",
    formula: "$$ A_v = 1 + \\frac{R_f}{R_1} $$",
  },
  {
    title: "Slew Rate",
    detail:
      "Slew rate limits how fast the output voltage can change, so high-frequency large-amplitude signals may distort.",
    formula: "$$ SR = \\max\\left(\\frac{dV_o}{dt}\\right) $$",
  },
];

function toAnchorId(value = "") {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const BASIC_CONCEPT_GUIDE = [
  {
    title: "Electric Charge, Current, and Voltage",
    sections: [
      {
        heading: "Electric Charge (Q)",
        body:
          "Electric charge is the fundamental property of matter responsible for electrical phenomena. It is measured in coulombs (C). In metallic conductors, electrons are the main moving particles, and their movement is what makes electrical behavior possible inside a circuit.",
        points: [
          "Positive charge means deficiency of electrons.",
          "Negative charge means excess of electrons.",
          "Electrons carry negative charge and move through conductors when a circuit is complete.",
        ],
        keyIdea:
          "Electricity exists because charges can move from one place to another.",
      },
      {
        heading: "Charge Flow in a Circuit",
        body:
          "In a simple circuit, the battery creates an electric field. This field pushes electrons through the conductor. Electrons physically move from the negative terminal toward the positive terminal, but conventional current is taken in the opposite direction, from positive to negative.",
        points: [
          "The voltage source creates the electric field.",
          "The electric field pushes electrons through the closed path.",
          "Electron flow is from negative to positive.",
          "Conventional current is assumed from positive to negative.",
        ],
        animation:
          "Show moving glowing dots as charge motion, and label both electron flow and conventional current direction clearly.",
      },
      {
        heading: "Electric Current (I)",
        formula: "I = Q / t",
        body:
          "Electric current is the rate at which electric charge flows through a conductor. Its unit is ampere (A), where 1 ampere means 1 coulomb of charge passes a point every second.",
        points: [
          "More moving charge produces higher current.",
          "Faster charge movement also produces higher current.",
          "Current is measured through an element or branch.",
          "The marked current direction is a reference direction used for solving.",
        ],
        animation:
          "Use slow glowing dots moving in a continuous loop, with a smooth direction arrow showing conventional current.",
      },
      {
        heading: "Voltage (V)",
        body:
          "Voltage is the driving force that pushes electric charge through a circuit. It is also called potential difference and is measured in volts (V). Voltage represents energy available per unit charge.",
        points: [
          "A battery creates a potential difference between its terminals.",
          "This potential difference produces an electric field in the circuit.",
          "The electric field causes charge motion, which produces current.",
          "Without voltage, there is no electrical push, so current cannot flow in an ideal open circuit.",
        ],
        animation:
          "Show a brighter positive terminal, a dimmer negative terminal, and a subtle high-to-low gradient along the circuit path.",
      },
      {
        heading: "Putting It Together",
        body:
          "Charge is the quantity of electricity, current is how fast that charge flows, and voltage is what pushes the charge through the circuit. In analysis, voltage causes current, and current represents the movement of charge.",
        points: [
          "Charge (Q): the electrical quantity.",
          "Current (I): the rate of charge flow.",
          "Voltage (V): the push or potential difference that drives charge.",
        ],
        keyIdea:
          "In a simple circuit, voltage provides the cause and current shows the resulting flow of charge.",
      },
      {
        heading: "Real-Life Analogy",
        body:
          "A useful way to remember these ideas is the water-flow analogy. Charge is like water, current is like the flow rate of water, and voltage is like water pressure.",
        points: [
          "Charge is similar to water quantity.",
          "Current is similar to water flow.",
          "Voltage is similar to pressure that pushes the flow.",
        ],
      },
    ],
  },
  {
    title: "Power and Energy",
    sections: [
      {
        heading: "Electric Power (P)",
        formula: "P = V I",
        body:
          "Power is the rate at which electrical energy is used, absorbed, or transferred. Its unit is watt (W). A heater, for example, converts electrical power into heat.",
        points: [
          "Positive power usually means an element is absorbing energy.",
          "Negative power means an element is delivering energy.",
          "Power depends on both voltage and current.",
        ],
        animation:
          "Make the resistor or load glow softly every one to two seconds to show energy consumption.",
      },
      {
        heading: "Electrical Energy (E)",
        formula: "E = P x t",
        body:
          "Energy is the total electrical work done over time. Its unit is joule (J), and practical electricity usage is often measured in kilowatt-hour (kWh).",
        points: [
          "Power is the rate of energy use.",
          "Energy is the accumulated result over time.",
          "Electricity bills measure energy consumed over a period of time.",
        ],
        animation:
          "Use a simple time-progress bar or increasing meter to show energy accumulating gradually.",
      },
    ],
  },
  {
    title: "Passive and Active Elements",
    sections: [
      {
        heading: "Passive Elements",
        body:
          "Passive elements cannot generate energy on their own. They only absorb energy, dissipate it, or store it temporarily.",
        points: [
          "Resistor: converts electrical energy into heat.",
          "Capacitor: stores energy in an electric field.",
          "Inductor: stores energy in a magnetic field.",
        ],
        animation:
          "Show a resistor glowing for heat, a capacitor filling and emptying, or an inductor with a soft field ripple.",
      },
      {
        heading: "Active Elements",
        body:
          "Active elements can supply energy to a circuit. They are the sources that drive current through the network.",
        points: ["Battery", "Voltage source", "Current source", "Generator"],
        animation:
          "Show energy pulses beginning at the source and moving into the circuit.",
      },
    ],
  },
  {
    title: "Linear and Non-Linear Elements",
    sections: [
      {
        heading: "Linear Elements",
        formula: "V = I R",
        body:
          "A linear element has a proportional relationship between voltage and current. If voltage doubles, current also doubles, as long as resistance is constant.",
        points: [
          "The voltage-current graph is a straight line.",
          "The response is predictable.",
          "An ideal resistor is the most common example.",
        ],
        animation:
          "Show a straight-line graph building smoothly as voltage and current increase together.",
      },
      {
        heading: "Non-Linear Elements",
        body:
          "A non-linear element does not follow a straight-line voltage-current relation. Its behavior changes depending on the operating condition.",
        points: ["Diode", "Transistor", "Semiconductor junctions"],
        animation:
          "Show a curved graph where current stays low at first and then rises sharply after turn-on.",
      },
    ],
  },
  {
    title: "Bilateral and Unilateral Elements",
    sections: [
      {
        heading: "Bilateral Elements",
        body:
          "A bilateral element behaves the same when current direction is reversed. Its electrical behavior does not depend on the direction of current flow.",
        points: ["Resistor", "Inductor", "Capacitor"],
        animation:
          "Show current flowing in both directions without changing the component behavior.",
      },
      {
        heading: "Unilateral Elements",
        body:
          "A unilateral element allows current more easily in one direction than the other. Its behavior changes when direction is reversed.",
        points: ["Diode", "Transistor"],
        animation:
          "Show forward current flowing freely and reverse current being blocked.",
      },
    ],
  },
];

function SubjectTheoryIcon() {
  return (
    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl border border-blue-100 bg-white text-portal-700 shadow-[0_10px_24px_rgba(15,50,112,0.14)] sm:h-16 sm:w-16">
      <svg className="h-9 w-9 sm:h-12 sm:w-12" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M14 22a23 23 0 0 1 37 0" stroke="#1476d4" strokeWidth="4" strokeLinecap="round" />
        <path d="M12 42a23 23 0 0 0 38 5" stroke="#062b57" strokeWidth="4" strokeLinecap="round" />
        <path d="M19 25 31 18 44 25M18 28l4 15 16 7 16-18M24 43l14-11M38 50l-4-18M44 25l-10 7M50 36l-12-4" stroke="#062b57" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="27" r="4.3" fill="#062b57" />
        <circle cx="31" cy="17" r="4.3" fill="#062b57" />
        <circle cx="48" cy="27" r="4.3" fill="#1476d4" />
        <circle cx="24" cy="43" r="4.1" fill="#1476d4" />
        <circle cx="39" cy="50" r="4.1" fill="#062b57" />
        <circle cx="34" cy="32" r="6.2" fill="#1476d4" />
        <circle cx="34" cy="32" r="12" stroke="#062b57" strokeWidth="4" />
        <path d="M43 41 52 50" stroke="#062b57" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function HeroMetric({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm sm:rounded-xl sm:px-3 sm:py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 sm:text-[10px] sm:tracking-[0.14em]">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold leading-5 text-slate-900 sm:mt-1 sm:text-sm">{value}</p>
    </div>
  );
}

function SidebarCard({ title, children }) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-portal-700">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function ChargeCurrentVoltageInfographic() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h4 className="text-center text-xl font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        1. Electric Charge, Current, And Voltage
      </h4>

      <div className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-700 sm:text-base">
        Electricity exists because charges can move from one place to another.
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_290px]">
        <div className="min-w-0 overflow-x-auto">
          <svg viewBox="0 0 760 360" className="mx-auto h-auto w-full max-w-full md:w-[82%]" role="img" aria-label="Charge current and voltage circuit explanation">
            <defs>
              <linearGradient id="batteryBody" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#d7932b" />
                <stop offset="45%" stopColor="#f0b14b" />
                <stop offset="46%" stopColor="#111827" />
                <stop offset="100%" stopColor="#030712" />
              </linearGradient>
              <marker id="blueArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0 0 9 4.5 0 9Z" fill="#1d4ed8" />
              </marker>
              <marker id="redArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0 0 9 4.5 0 9Z" fill="#dc2626" />
              </marker>
              <filter id="electronGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path d="M90 96H292M408 96H620V290H90V205" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M90 150V96" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
            <path d="M292 96h18l10-16 20 32 20-32 20 32 20-32 10 16h18" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <text x="320" y="60" fill="#111827" fontSize="18" fontWeight="800">Resistor (R)</text>

            <rect x="58" y="150" width="64" height="140" rx="16" fill="url(#batteryBody)" stroke="#374151" strokeWidth="2" />
            <rect x="79" y="137" width="22" height="16" rx="4" fill="#6b7280" />
            <text x="82" y="198" fill="#ffffff" fontSize="28" fontWeight="900">+</text>
            <text x="82" y="270" fill="#ffffff" fontSize="28" fontWeight="900">−</text>
            <text x="20" y="220" fill="#111827" fontSize="16" fontWeight="800">Battery</text>
            <text x="10" y="244" fill="#111827" fontSize="13" fontWeight="600">(Voltage Source)</text>
            <text x="125" y="178" fill="#dc2626" fontSize="26" fontWeight="900">+</text>
            <text x="132" y="270" fill="#1d4ed8" fontSize="26" fontWeight="900">−</text>

            {[155, 220, 520, 585].map((x) => (
              <g key={`top-electron-${x}`}>
                <circle cx={x} cy="96" r="11" fill="#3b82f6" filter="url(#electronGlow)" />
                <text x={x - 4} y="101" fill="#ffffff" fontSize="17" fontWeight="900">−</text>
              </g>
            ))}
            {[620, 620, 620].map((x, index) => (
              <g key={`right-electron-${index}`}>
                <circle cx={x} cy={145 + index * 55} r="11" fill="#3b82f6" filter="url(#electronGlow)" />
                <text x={x - 4} y={150 + index * 55} fill="#ffffff" fontSize="17" fontWeight="900">−</text>
              </g>
            ))}
            {[150, 260, 370, 480, 590].map((x) => (
              <g key={`bottom-electron-${x}`}>
                <circle cx={x} cy="290" r="11" fill="#3b82f6" filter="url(#electronGlow)" />
                <text x={x - 4} y="295" fill="#ffffff" fontSize="17" fontWeight="900">−</text>
              </g>
            ))}
            {[90, 90].map((x, index) => (
              <g key={`left-electron-${index}`}>
                <circle cx={x} cy={130 + index * 60} r="11" fill="#3b82f6" filter="url(#electronGlow)" />
                <text x={x - 4} y={135 + index * 60} fill="#ffffff" fontSize="17" fontWeight="900">−</text>
              </g>
            ))}

            <path d="M250 172H390" stroke="#1d4ed8" strokeWidth="3" markerEnd="url(#blueArrow)" />
            <text x="285" y="160" fill="#1d4ed8" fontSize="17" fontWeight="900">Electron Flow</text>
            <text x="392" y="160" fill="#111827" fontSize="15" fontWeight="700">(actual)</text>
            <text x="258" y="194" fill="#111827" fontSize="14" fontWeight="600">Electrons move from negative terminal to positive terminal.</text>

            <path d="M245 242H415" stroke="#dc2626" strokeWidth="3" markerEnd="url(#redArrow)" />
            <text x="270" y="230" fill="#dc2626" fontSize="17" fontWeight="900">Conventional Current Flow</text>
            <text x="255" y="263" fill="#111827" fontSize="14" fontWeight="600">By convention, current is assumed to flow from positive to negative.</text>

            <path d="M140 112H115" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M210 112H185" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M535 112H510" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M600 112H575" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M620 155V180" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M620 215V240" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M170 278H195" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M300 278H325" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
            <path d="M430 278H455" stroke="#1d4ed8" strokeWidth="2.5" markerEnd="url(#blueArrow)" />
          </svg>

          <div className="mt-4 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-extrabold uppercase tracking-wide text-emerald-800">Key Idea</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Electricity exists because charges can move from one place to another.
              </p>
            </div>
            <div className="rounded-xl border border-dashed border-blue-300 bg-white p-4">
              <h5 className="text-center text-sm font-extrabold uppercase tracking-wide text-blue-700">
                Working Flow
              </h5>
              <ol className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                {[
                  "The battery creates a potential difference between its positive and negative terminals.",
                  "This voltage produces an electric field inside the conductor.",
                  "Electrons move from the negative terminal to the positive terminal.",
                  "This movement of charge is called electric current.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4">
            <h5 className="text-sm font-extrabold uppercase tracking-wide text-[#071b58]">
              Electric Charge (Q)
            </h5>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
              <p><span className="font-bold text-blue-700">− Negative charge:</span> excess of electrons.</p>
              <p><span className="font-bold text-red-600">+ Positive charge:</span> deficiency of electrons.</p>
              <p>Electrons carry <span className="font-bold text-blue-700">negative</span> charge.</p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
            <h5 className="text-center text-sm font-extrabold uppercase tracking-wide text-emerald-800">
              Voltage (V)
            </h5>
            <p className="mt-3 text-center text-sm leading-6 text-slate-700">
              Voltage is the driving force that pushes charges through a circuit.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-2xl font-black text-red-600">+</span>
              <div className="h-9 w-28 rounded-md bg-gradient-to-r from-red-500 via-slate-200 to-blue-600" />
              <span className="text-2xl font-black text-blue-700">−</span>
            </div>
            <div className="mt-2 flex justify-between text-xs font-semibold text-slate-700">
              <span>High Potential (+)</span>
              <span>Low Potential (−)</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h5 className="text-center text-sm font-extrabold uppercase tracking-wide text-slate-700">
              Legend
            </h5>
            <div className="mt-3 grid gap-2 text-sm text-slate-700">
              <p><span className="font-bold text-blue-700">Blue dot:</span> electron or negative charge</p>
              <p><span className="font-bold text-red-600">Red arrow:</span> conventional current (+ to −)</p>
              <p><span className="font-bold text-blue-700">Blue arrow:</span> electron flow (− to +)</p>
              <p><span className="font-bold text-slate-900">Black line:</span> conductor or wire</p>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm leading-6 text-amber-950">
        <span className="font-bold">Charge (Q)</span> → quantity of electricity
        <span className="mx-3 text-amber-700">|</span>
        <span className="font-bold">Current (I)</span> → rate of charge flow
        <span className="mx-3 text-amber-700">|</span>
        <span className="font-bold">Voltage (V)</span> → driving force
      </div>
    </section>
  );
}

function StepAnimatedCircuitGuide() {
  const steps = [
    ["Step 1", "Basic Circuit", "Wires and battery appear first. The battery terminals are labelled + and -."],
    ["Step 2", "Electric Charge", "Blue dots appear on the wire. They represent electrons, which carry negative charge."],
    ["Step 3", "Current", "The blue dots start moving from the negative terminal toward the positive terminal."],
    ["Step 4", "Voltage", "The battery terminals glow to show high potential and low potential."],
    ["Step 5", "Resistor", "The resistor is added. It glows softly because electrical energy is used there."],
    ["Step 6", "Combined View", "Charge motion, current direction, voltage, and resistor energy use are shown together."],
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <style>{`
        .stage-card {
          opacity: 0.38;
          animation: guideStage 36s linear infinite;
        }
        .stage-1 { animation-delay: 0s; }
        .stage-2 { animation-delay: -30s; }
        .stage-3 { animation-delay: -24s; }
        .stage-4 { animation-delay: -18s; }
        .stage-5 { animation-delay: -12s; }
        .stage-6 { animation-delay: -6s; }

        .guide-step-2,
        .guide-step-3,
        .guide-step-4,
        .guide-step-5,
        .guide-step-6 {
          opacity: 0;
        }
        .guide-step-2 { animation: guideReveal2 36s linear infinite; }
        .guide-step-3 { animation: guideReveal3 36s linear infinite; }
        .guide-step-4 { animation: guideReveal4 36s linear infinite; }
        .guide-step-5 { animation: guideReveal5 36s linear infinite; }
        .guide-step-6 { animation: guideReveal6 36s linear infinite; }

        .terminal-glow { animation: guidePulse 2.2s ease-in-out infinite; }
        .resistor-glow { animation: guideResistorPulse 2s ease-in-out infinite; }
        .charge-static { animation: guideChargeBreathe 2.4s ease-in-out infinite; }

        @keyframes guideStage {
          0%, 13% { opacity: 1; transform: translateY(-1px); }
          19%, 100% { opacity: 0.38; transform: translateY(0); }
        }
        @keyframes guideReveal2 {
          0%, 15% { opacity: 0; }
          18%, 32% { opacity: 1; }
          35%, 100% { opacity: 0; }
        }
        @keyframes guideReveal3 {
          0%, 32% { opacity: 0; }
          35%, 100% { opacity: 1; }
        }
        @keyframes guideReveal4 {
          0%, 49% { opacity: 0; }
          52%, 100% { opacity: 1; }
        }
        @keyframes guideReveal5 {
          0%, 65% { opacity: 0; }
          68%, 100% { opacity: 1; }
        }
        @keyframes guideReveal6 {
          0%, 82% { opacity: 0; }
          85%, 100% { opacity: 1; }
        }
        @keyframes guidePulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.95; }
        }
        @keyframes guideResistorPulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.72; }
        }
        @keyframes guideChargeBreathe {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
      `}</style>

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        1. Electric Charge, Current, And Voltage
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-700">
        Electricity exists because charges can move from one place to another.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div>
          <h5 className="text-base font-bold text-slate-900">Theory Explanation</h5>
          <div className="mt-2 grid gap-3 text-sm leading-7 text-slate-700">
            <p>
              Electric charge is the basic electrical quantity responsible for all electrical
              effects. In metal wires, electrons carry negative charge and can move when a
              complete circuit path is available.
            </p>
            <p>
              Current is the rate of flow of charge. When the battery is connected in a
              closed circuit, electrons move through the wire from the negative terminal
              toward the positive terminal. In circuit theory, conventional current is
              shown in the opposite direction, from positive to negative.
            </p>
            <p>
              Voltage is the potential difference created by the battery. It acts as the
              electrical push that makes charge move. When a resistor is added, electrical
              energy is used in the resistor, so it is shown with a soft glow in the
              animation.
            </p>
          </div>
        </div>

        <div className="min-w-0 overflow-x-auto overscroll-x-contain">
          <div className="max-w-full overflow-x-auto overscroll-x-contain">
          <svg viewBox="0 0 760 430" className="mx-auto h-auto w-full max-w-full md:w-[82%]" role="img" aria-label="Step by step animated circuit guide">
          <defs>
            <linearGradient id="guideBattery" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#d7932b" />
              <stop offset="45%" stopColor="#f0b14b" />
              <stop offset="46%" stopColor="#111827" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>
            <linearGradient id="guideVoltageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#93c5fd" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.45" />
            </linearGradient>
            <marker id="guideRedArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
              <path d="M0 0 9 4.5 0 9Z" fill="#dc2626" />
            </marker>
            <marker id="guideBlueArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
              <path d="M0 0 9 4.5 0 9Z" fill="#1d4ed8" />
            </marker>
            <filter id="guideElectronGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="guideResistorGlow" x="-60%" y="-120%" width="220%" height="340%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="24" y="28" width="712" height="372" rx="22" fill="#ffffff" stroke="#e2e8f0" />

          <g id="guide-step-1-basic-circuit">
            <path d="M118 130H650V316H118V240" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M118 178V130" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
            <rect x="82" y="178" width="72" height="126" rx="16" fill="url(#guideBattery)" stroke="#334155" strokeWidth="2" />
            <rect x="106" y="164" width="24" height="16" rx="4" fill="#64748b" />
            <text x="107" y="220" fill="#ffffff" fontSize="30" fontWeight="900">+</text>
            <text x="110" y="282" fill="#ffffff" fontSize="30" fontWeight="900">-</text>
            <text x="55" y="205" fill="#111827" fontSize="15" fontWeight="800">Battery</text>
            <text x="40" y="227" fill="#475569" fontSize="12" fontWeight="700">Voltage source</text>
            <text x="160" y="182" fill="#dc2626" fontSize="24" fontWeight="900">+</text>
            <text x="162" y="302" fill="#1d4ed8" fontSize="24" fontWeight="900">-</text>
          </g>

          <g id="guide-step-2-electric-charge" className="guide-step-2 charge-static">
            {[220, 330, 470, 600].map((x) => (
              <g key={`guide-top-charge-${x}`}>
                <circle cx={x} cy="130" r="10" fill="#3b82f6" filter="url(#guideElectronGlow)" />
                <text x={x - 4} y="135" fill="#ffffff" fontSize="15" fontWeight="900">-</text>
              </g>
            ))}
            {[250, 400, 550].map((x) => (
              <g key={`guide-bottom-charge-${x}`}>
                <circle cx={x} cy="316" r="10" fill="#3b82f6" filter="url(#guideElectronGlow)" />
                <text x={x - 4} y="321" fill="#ffffff" fontSize="15" fontWeight="900">-</text>
              </g>
            ))}
            <text x="238" y="84" fill="#1d4ed8" fontSize="15" fontWeight="900">Electric charge (Q)</text>
            <text x="238" y="106" fill="#475569" fontSize="13" fontWeight="700">Blue dots represent electrons.</text>
          </g>

          <g id="guide-step-3-current" className="guide-step-3">
            <circle r="6" fill="#1d4ed8" filter="url(#guideElectronGlow)">
              <animateMotion dur="9s" repeatCount="indefinite" path="M118 240V316H650V130H118V178" />
            </circle>
            <circle r="6" fill="#1d4ed8" filter="url(#guideElectronGlow)">
              <animateMotion dur="9s" begin="-3s" repeatCount="indefinite" path="M118 240V316H650V130H118V178" />
            </circle>
            <circle r="6" fill="#1d4ed8" filter="url(#guideElectronGlow)">
              <animateMotion dur="9s" begin="-6s" repeatCount="indefinite" path="M118 240V316H650V130H118V178" />
            </circle>
            <path d="M272 206H442" stroke="#dc2626" strokeWidth="3" markerEnd="url(#guideRedArrow)" />
            <text x="284" y="195" fill="#dc2626" fontSize="15" fontWeight="900">Conventional current (+ to -)</text>
            <path d="M442 246H272" stroke="#1d4ed8" strokeWidth="3" markerEnd="url(#guideBlueArrow)" />
            <text x="286" y="270" fill="#1d4ed8" fontSize="15" fontWeight="900">Electron flow (- to +)</text>
          </g>

          <g id="guide-step-4-voltage" className="guide-step-4">
            <path d="M118 130H650V316H118V240" fill="none" stroke="url(#guideVoltageGradient)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity="0.38" />
            <circle className="terminal-glow" cx="164" cy="178" r="19" fill="#ef4444" opacity="0.35" />
            <circle className="terminal-glow" cx="164" cy="302" r="19" fill="#2563eb" opacity="0.35" />
            <text x="178" y="172" fill="#dc2626" fontSize="13" fontWeight="900">High potential</text>
            <text x="178" y="309" fill="#1d4ed8" fontSize="13" fontWeight="900">Low potential</text>
            <text x="500" y="84" fill="#0f766e" fontSize="15" fontWeight="900">Voltage pushes charge</text>
          </g>

          <g id="guide-step-5-resistor" className="guide-step-5">
            <path className="resistor-glow" d="M342 130h18l10-18 20 36 20-36 20 36 20-36 10 18h18" fill="none" stroke="#f59e0b" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" filter="url(#guideResistorGlow)" />
            <path d="M342 130h18l10-18 20 36 20-36 20 36 20-36 10 18h18" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <text x="382" y="100" fill="#111827" fontSize="16" fontWeight="900">Resistor (R)</text>
            <text x="368" y="168" fill="#92400e" fontSize="13" fontWeight="800">energy is used here</text>
          </g>

          <g id="guide-step-6-final" className="guide-step-6">
            <rect x="208" y="342" width="365" height="36" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <text x="230" y="365" fill="#0f172a" fontSize="14" fontWeight="800">
              Charge moves {"->"} current flows {"->"} voltage provides the push.
            </text>
          </g>
          </svg>
          </div>
        </div>

        <aside className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step[0]}
              className={`stage-card stage-${index + 1} rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm`}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-portal-700">
                {step[0]}: {step[1]}
              </p>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{step[2]}</p>
            </div>
          ))}
        </aside>
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm leading-6 text-amber-950">
        <span className="font-bold">Charge (Q)</span> {"->"} quantity of electricity
        <span className="mx-3 text-amber-700">|</span>
        <span className="font-bold">Current (I)</span> {"->"} rate of charge flow
        <span className="mx-3 text-amber-700">|</span>
        <span className="font-bold">Voltage (V)</span> {"->"} driving force
      </div>
    </section>
  );
}

function ProfessionalChargeCircuitGuide() {
  const steps = [
    ["1", "Circuit Formation", "The circuit path is created first, connecting the battery and wire into a complete loop. The positive and negative terminals are clearly identified."],
    ["2", "Charge Appearance", "Blue particles represent electrons, the tiny moving charges that carry electricity through the wire."],
    ["3", "Voltage Effect", "The battery creates a voltage difference, which acts like a push that sets the charges in motion."],
    ["4", "Current Flow", "Electrons start moving from the negative terminal toward the positive terminal, creating a steady flow called current."],
    ["5", "Conventional Current", "A red arrow shows the assumed direction of current from positive to negative, used for circuit analysis."],
    ["6", "Energy Use", "As charges pass through the resistor, electrical energy is converted into heat, shown by a soft pulsing effect."],
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <style>{`
        .pro-wire {
          fill: none;
          stroke: #111827;
          stroke-width: 5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: proWireDraw 24s ease-in-out infinite;
        }

        .pro-resistor {
          opacity: 0;
          animation: proFadeIn 24s linear infinite;
        }

        .pro-static-charge {
          opacity: 0;
          animation: proStaticCharge 24s linear infinite;
        }

        .pro-moving-charge {
          opacity: 0;
          animation: proMovingCharge 24s linear infinite;
        }

        .pro-voltage-layer {
          opacity: 0;
          animation: proVoltage 24s linear infinite;
        }

        .pro-current-arrow {
          opacity: 0;
          animation: proConventionalCurrent 24s linear infinite;
        }

        .pro-label {
          opacity: 1;
        }

        .pro-terminal-hot {
          animation: proTerminalPulse 1.8s ease-in-out infinite;
        }

        .pro-resistor-glow {
          opacity: 0;
          animation: proResistorPulse 1.8s ease-in-out infinite, proResistorVisible 24s linear infinite;
        }

        .pro-stage-card {
          opacity: 0.42;
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        .pro-stage-1 { animation: proStageOne 24s linear infinite; }
        .pro-stage-2 { animation: proStageTwo 24s linear infinite; }
        .pro-stage-3 { animation: proStageThree 24s linear infinite; }
        .pro-stage-4 { animation: proStageFour 24s linear infinite; }
        .pro-stage-5 { animation: proStageFive 24s linear infinite; }
        .pro-stage-6 { animation: proStageSix 24s linear infinite; }

        @keyframes proWireDraw {
          0% { stroke-dashoffset: 1400; opacity: 1; }
          16%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes proFadeIn {
          0%, 80% { opacity: 0; }
          84%, 100% { opacity: 1; }
        }

        @keyframes proStaticCharge {
          0%, 16% { opacity: 0; }
          19%, 100% { opacity: 1; }
        }

        @keyframes proVoltage {
          0%, 32% { opacity: 0; }
          35%, 100% { opacity: 1; }
        }

        @keyframes proMovingCharge {
          0%, 48% { opacity: 0; }
          51%, 100% { opacity: 1; }
        }

        @keyframes proConventionalCurrent {
          0%, 64% { opacity: 0; transform: translateX(-14px); }
          67%, 100% { opacity: 0.72; transform: translateX(0); }
        }

        @keyframes proTerminalPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.85; }
        }

        @keyframes proResistorVisible {
          0%, 80% { opacity: 0; }
          84%, 100% { opacity: 1; }
        }

        @keyframes proResistorPulse {
          0%, 100% { stroke-opacity: 0.28; }
          50% { stroke-opacity: 0.85; }
        }

        @keyframes proStageOne {
          0%, 16% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          19%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes proStageTwo {
          0%, 16% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          19%, 32% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          35%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes proStageThree {
          0%, 32% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          35%, 48% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          51%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes proStageFour {
          0%, 48% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          51%, 64% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          67%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes proStageFive {
          0%, 64% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          67%, 80% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          83%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes proStageSix {
          0%, 80% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          84%, 100% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
        }
      `}</style>

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        1. Electric Charge, Current, And Voltage
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-700">
        Electric charge moves in a closed circuit, current describes that motion, and voltage provides the push.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div>
          <h5 className="text-base font-bold text-slate-900">
            Electric Charge, Current, and Voltage
          </h5>
          <div className="mt-2 grid gap-3 text-sm leading-7 text-slate-700">
            <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4">
              <h6 className="text-sm font-bold text-slate-950">Electric Charge (Q)</h6>
              <p className="mt-2">
                Electricity begins with charge, the basic property that allows particles
                to interact electrically. In conductors, electrons carry negative charge
                and are free to move when the circuit is closed.
              </p>
              <ul className="mt-3 grid gap-2 text-sm leading-6">
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  A negative charge means excess electrons.
                </li>
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  A positive charge means a lack of electrons.
                </li>
              </ul>
              <p className="mt-3 font-semibold text-slate-900">
                When a complete path is available, these electrons start moving, and
                this movement creates electricity.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h6 className="text-sm font-bold text-slate-950">Electric Current (I)</h6>
              <p className="mt-2">
                Electric current describes how fast charge moves through a circuit. It
                is not a separate substance; it is the organized motion of electrons
                through the wire.
              </p>
              <ul className="mt-3 grid gap-2 text-sm leading-6">
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  Electrons physically move from the negative terminal to the positive terminal.
                </li>
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  For analysis, conventional current is taken from positive to negative.
                </li>
              </ul>
              <p className="mt-3 font-semibold text-slate-900">
                Current is the motion of charge, not a material that gets used up.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
              <h6 className="text-sm font-bold text-slate-950">Voltage (V)</h6>
              <p className="mt-2">
                Voltage causes charge to move. It represents the energy difference
                between two points, created by a source such as a battery.
              </p>
              <ul className="mt-3 grid gap-2 text-sm leading-6">
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  The positive terminal has higher potential.
                </li>
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  The negative terminal has lower potential.
                </li>
              </ul>
              <p className="mt-3">
                This difference pushes electrons through the circuit, much like pressure
                pushes water through a pipe. When a component such as a resistor is
                added, part of this electrical energy is converted into heat.
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4">
              <h6 className="text-sm font-bold text-slate-950">Charge Relation</h6>
              <p className="mt-2">
                Electric charge represents the quantity of electricity transferred in a
                circuit.
              </p>
              <p className="mt-3 text-sm font-bold text-slate-900">Formula:</p>
              <p className="mt-1 font-mono text-base font-bold text-portal-700">Q = I x t</p>
              <p className="mt-3 text-sm font-bold text-slate-900">Where:</p>
              <ul className="mt-2 grid gap-2 text-sm leading-6">
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  Q = Charge, measured in coulombs (C)
                </li>
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  I = Current, measured in amperes (A)
                </li>
                <li className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 font-semibold text-emerald-800">
                  t = Time, measured in seconds (s)
                </li>
              </ul>
              <p className="mt-3">
                <span className="font-bold text-slate-900">Meaning: </span>
                If current flows for a certain time, a definite amount of charge is
                transferred through the circuit. More current or more time means more
                charge has moved.
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 overflow-x-auto overscroll-x-contain">
          <div className="max-w-full overflow-x-auto overscroll-x-contain">
          <svg viewBox="0 0 900 440" className="mx-auto h-auto w-full max-w-full md:w-[82%]" role="img" aria-label="Animated DC circuit explaining charge current and voltage">
            <defs>
              <linearGradient id="proVoltageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.42" />
                <stop offset="55%" stopColor="#bfdbfe" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.35" />
              </linearGradient>
              <marker id="proRedArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                <path d="M0 0 10 5 0 10Z" fill="#dc2626" />
              </marker>
              <marker id="proBlueArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                <path d="M0 0 10 5 0 10Z" fill="#1d4ed8" />
              </marker>
              <filter id="proElectronGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="proResistorGlowFilter" x="-80%" y="-150%" width="260%" height="400%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="20" y="25" width="860" height="385" rx="22" fill="#ffffff" stroke="#e2e8f0" />

            <g id="step-1-circuit-formation">
              <path className="pro-wire" d="M132 172V112H760V330H132V252" />
              <rect x="92" y="172" width="80" height="80" rx="12" fill="#ffffff" stroke="#111827" strokeWidth="4" />
              <path d="M116 194h32M132 178v32M118 232h28" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
              <text x="80" y="155" fill="#111827" fontSize="15" fontWeight="800">Battery</text>
              <text x="178" y="184" fill="#dc2626" fontSize="24" fontWeight="900">+</text>
              <text x="180" y="252" fill="#1d4ed8" fontSize="24" fontWeight="900">-</text>
            </g>

            <g id="step-6-energy-use" className="pro-resistor">
              <path
                className="pro-resistor-glow"
                d="M350 112h20l12-20 24 40 24-40 24 40 24-40 12 20h10"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#proResistorGlowFilter)"
              />
              <path d="M350 112h20l12-20 24 40 24-40 24 40 24-40 12 20h10" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="397" y="76" fill="#111827" fontSize="17" fontWeight="900">Resistor (R)</text>
              <text x="382" y="154" fill="#92400e" fontSize="13" fontWeight="800">energy is used here</text>
            </g>

            <g
              id="step-2-charge-appearance"
              className="pro-static-charge"
            >
              {[260, 610, 710].map((x) => (
                <g key={`pro-static-top-${x}`}>
                  <circle cx={x} cy="112" r="9" fill="#2563eb" filter="url(#proElectronGlow)" />
                  <text x={x - 3.5} y="117" fill="#ffffff" fontSize="14" fontWeight="900">-</text>
                </g>
              ))}
              {[260, 430, 610].map((x) => (
                <g key={`pro-static-bottom-${x}`}>
                  <circle cx={x} cy="330" r="9" fill="#2563eb" filter="url(#proElectronGlow)" />
                  <text x={x - 3.5} y="335" fill="#ffffff" fontSize="14" fontWeight="900">-</text>
                </g>
              ))}
              <text className="pro-label label-charge" x="230" y="65" fill="#1d4ed8" fontSize="15" fontWeight="900">
                Electric Charge (Q)
              </text>
            </g>

            <g
              id="step-4-current-flow"
              className="pro-moving-charge"
            >
              <circle r="6" fill="#1d4ed8" filter="url(#proElectronGlow)">
                <animateMotion dur="11s" repeatCount="indefinite" path="M132 252V330H760V112H500H350H132V172" />
              </circle>
              <circle r="6" fill="#1d4ed8" filter="url(#proElectronGlow)">
                <animateMotion dur="11s" begin="-3.66s" repeatCount="indefinite" path="M132 252V330H760V112H500H350H132V172" />
              </circle>
              <circle r="6" fill="#1d4ed8" filter="url(#proElectronGlow)">
                <animateMotion dur="11s" begin="-7.32s" repeatCount="indefinite" path="M132 252V330H760V112H500H350H132V172" />
              </circle>
              <path d="M580 185H390" stroke="#1d4ed8" strokeWidth="3" markerEnd="url(#proBlueArrow)" />
              <text className="pro-label label-electron" x="405" y="174" fill="#1d4ed8" fontSize="15" fontWeight="900">
                Electron flow (- to +)
              </text>
            </g>

            <g
              id="step-3-voltage-effect"
              className="pro-voltage-layer"
            >
              <path d="M132 172V112H760V330H132V252" fill="none" stroke="url(#proVoltageGradient)" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
              <circle className="pro-terminal-hot" cx="186" cy="176" r="20" fill="#ef4444" />
              <circle cx="186" cy="252" r="16" fill="#2563eb" opacity="0.28" />
              <text x="205" y="174" fill="#dc2626" fontSize="13" fontWeight="900">High potential</text>
              <text x="205" y="257" fill="#1d4ed8" fontSize="13" fontWeight="900">Low potential</text>
              <text className="pro-label label-voltage" x="590" y="68" fill="#0f766e" fontSize="15" fontWeight="900">
                Voltage pushes charge
              </text>
            </g>

            <g
              id="step-5-conventional-current"
              className="pro-current-arrow"
            >
              <path d="M300 245H555" stroke="#dc2626" strokeWidth="3" markerEnd="url(#proRedArrow)" />
              <text className="pro-label label-conventional" x="330" y="235" fill="#dc2626" fontSize="15" fontWeight="900">
                Conventional current (+ to -)
              </text>
            </g>

            <g id="final-note">
              <rect x="255" y="360" width="390" height="34" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
              <text x="280" y="382" fill="#0f172a" fontSize="14" fontWeight="800">
                Charge moves, current flows, and voltage provides the push.
              </text>
            </g>
          </svg>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {steps.map(([number, title, text]) => (
            <div
              key={number}
              className={`pro-stage-card pro-stage-${number} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-portal-700">
                Step {number}: {title}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PowerEnergyGuide() {
  const steps = [
    ["1", "Power Generation", "The source provides voltage and current, creating electrical power in the circuit."],
    ["2", "Power Flow", "Electrical power moves through the circuit along with current."],
    ["3", "Power Use", "When current passes through a component like a resistor, power is absorbed."],
    ["4", "Energy Conversion", "The absorbed power is converted into other forms such as heat or light."],
    ["5", "Energy Over Time", "As time passes, energy continues to accumulate based on power usage."],
    ["6", "Total Energy", "The total energy used depends on how long the circuit operates."],
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <style>{`
        .power-flow-dot {
          opacity: 0;
          filter: url(#powerFlowGlow);
          animation: powerFlowVisible 18s ease-in-out infinite;
        }

        .power-wire {
          stroke-dasharray: 1700;
          stroke-dashoffset: 1700;
          animation: powerWireDraw 18s ease-in-out infinite;
        }

        .power-flow-guide {
          opacity: 0;
          stroke-dasharray: 8 12;
          animation: powerFlowGuide 18s linear infinite;
        }

        .power-resistor-glow {
          opacity: 0;
          animation: powerGlowVisible 18s ease-in-out infinite, powerGlowPulse 2s ease-in-out infinite;
        }

        .energy-bar {
          transform-origin: 270px 344px;
          transform: scaleX(0);
          animation: energyFill 18s cubic-bezier(0.42, 0, 0.2, 1) infinite;
        }

        .power-stage-card {
          opacity: 0.42;
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        .power-stage-1 { animation: powerStageOne 18s linear infinite; }
        .power-stage-2 { animation: powerStageTwo 18s linear infinite; }
        .power-stage-3 { animation: powerStageThree 18s linear infinite; }
        .power-stage-4 { animation: powerStageFour 18s linear infinite; }
        .power-stage-5 { animation: powerStageFive 18s linear infinite; }
        .power-stage-6 { animation: powerStageSix 18s linear infinite; }

        @keyframes powerWireDraw {
          0% { stroke-dashoffset: 1700; opacity: 1; }
          22%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes powerFlowVisible {
          0%, 23% { opacity: 0; }
          30%, 100% { opacity: 1; }
        }

        @keyframes powerFlowGuide {
          0%, 23% { opacity: 0; stroke-dashoffset: 0; }
          30% { opacity: 0.45; stroke-dashoffset: 0; }
          100% { opacity: 0.45; stroke-dashoffset: -180; }
        }

        @keyframes powerGlowVisible {
          0%, 30% { opacity: 0; }
          36%, 100% { opacity: 0.9; }
        }

        @keyframes powerGlowPulse {
          0%, 100% { stroke-opacity: 0.24; }
          50% { stroke-opacity: 0.62; }
        }

        @keyframes energyFill {
          0%, 58% { transform: scaleX(0); }
          78% { transform: scaleX(0.58); }
          100% { transform: scaleX(1); }
        }

        @keyframes powerStageOne {
          0%, 16% { opacity: 1; transform: translateY(-1px); border-color: #059669; background-color: #ecfdf5; }
          19%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes powerStageTwo {
          0%, 16% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          19%, 32% { opacity: 1; transform: translateY(-1px); border-color: #059669; background-color: #ecfdf5; }
          35%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes powerStageThree {
          0%, 32% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          35%, 48% { opacity: 1; transform: translateY(-1px); border-color: #059669; background-color: #ecfdf5; }
          51%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes powerStageFour {
          0%, 48% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          51%, 64% { opacity: 1; transform: translateY(-1px); border-color: #059669; background-color: #ecfdf5; }
          67%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes powerStageFive {
          0%, 64% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          67%, 82% { opacity: 1; transform: translateY(-1px); border-color: #059669; background-color: #ecfdf5; }
          85%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes powerStageSix {
          0%, 82% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          85%, 100% { opacity: 1; transform: translateY(-1px); border-color: #059669; background-color: #ecfdf5; }
        }
      `}</style>

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        2. Power and Energy
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-center text-sm font-bold text-emerald-800">
        Power shows how fast electrical energy is used, while energy shows how much is used over time.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div>
          <h5 className="text-base font-bold text-slate-900">Power and Energy</h5>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
              Step 1
            </p>
            <h6 className="mt-1 text-sm font-bold text-slate-950">Electric Power (P)</h6>
            <p className="mt-1.5 text-sm leading-6 text-slate-700">
              Power tells how quickly electrical energy is converted or transferred in a
              circuit. It shows the rate at which a device uses energy.
            </p>
            <p className="mt-2 rounded-lg border border-white bg-white px-3 py-1.5 font-mono text-sm font-bold text-emerald-700">
              P = V I
            </p>
            <ul className="mt-2 grid gap-1.5 text-sm leading-6">
              {["P = Power, measured in watts (W)", "V = Voltage, measured in volts (V)", "I = Current, measured in amperes (A)"].map((item) => (
                <li key={item} className="rounded-md border border-emerald-200 bg-white px-3 py-1.5 font-semibold text-emerald-800">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              More voltage or more current means more power. A heater uses electrical
              power and converts it into heat.
            </p>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-amber-700">
              Step 2
            </p>
            <h6 className="mt-1 text-sm font-bold text-slate-950">Electrical Energy (E)</h6>
            <p className="mt-1.5 text-sm leading-6 text-slate-700">
              Energy is the total amount of electrical work done over time. It increases
              when power is used for a longer duration.
            </p>
            <p className="mt-2 rounded-lg border border-white bg-white px-3 py-1.5 font-mono text-sm font-bold text-amber-700">
              E = P x t
            </p>
            <ul className="mt-2 grid gap-1.5 text-sm leading-6">
              {["E = Energy, measured in joules (J)", "P = Power, measured in watts (W)", "t = Time, measured in seconds (s)"].map((item) => (
                <li key={item} className="rounded-md border border-amber-200 bg-white px-3 py-1.5 font-semibold text-amber-800">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Power is the rate of energy use. Energy is the total amount used, which is
              why electricity bills measure energy in kilowatt-hours.
            </p>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700">
              Step 3
            </p>
            <h6 className="mt-1 text-sm font-bold text-slate-950">Putting It Together</h6>
            <p className="mt-1.5 text-sm leading-6 text-slate-700">
              Voltage pushes charge and current moves charge. Power tells how fast
              energy is being used, and energy tells the total amount used over time.
            </p>
            <div className="mt-2 grid gap-1.5 text-sm leading-6">
              <p className="rounded-md border border-blue-200 bg-white px-3 py-1.5 font-semibold text-blue-800">
                Power = speed of energy use.
              </p>
              <p className="rounded-md border border-blue-200 bg-white px-3 py-1.5 font-semibold text-blue-800">
                Energy = total usage over time.
              </p>
              <p className="rounded-md border border-blue-200 bg-white px-3 py-1.5 font-semibold text-blue-800">
                Higher power or longer time means more energy consumed.
              </p>
            </div>
          </div>
          </div>
        </div>

        <div className="min-w-0 overflow-x-auto overscroll-x-contain">
          <div className="max-w-full overflow-x-auto overscroll-x-contain">
          <svg viewBox="0 0 900 460" className="mx-auto h-auto w-full max-w-full md:w-[82%]" role="img" aria-label="Animated circuit showing power flow and energy accumulation">
            <defs>
              <marker id="powerArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                <path d="M0 0 10 5 0 10Z" fill="#059669" />
              </marker>
              <filter id="powerGlowFilter" x="-80%" y="-150%" width="260%" height="400%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="powerFlowGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="energyMeterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#16a34a" />
                <stop offset="70%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#86efac" />
              </linearGradient>
            </defs>
            <rect x="20" y="25" width="860" height="405" rx="22" fill="#ffffff" stroke="#e2e8f0" />

            <rect x="65" y="58" width="185" height="52" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
            <text x="86" y="80" fill="#0f172a" fontSize="13" fontWeight="800">Source creates</text>
            <text x="86" y="99" fill="#047857" fontSize="15" fontWeight="900">P = V x I</text>

            <rect x="365" y="58" width="180" height="52" rx="14" fill="#fffbeb" stroke="#fde68a" />
            <text x="388" y="80" fill="#0f172a" fontSize="13" fontWeight="800">Load absorbs</text>
            <text x="388" y="99" fill="#b45309" fontSize="15" fontWeight="900">power as heat</text>

            <rect x="635" y="58" width="190" height="52" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
            <text x="656" y="80" fill="#0f172a" fontSize="13" fontWeight="800">Time accumulates</text>
            <text x="656" y="99" fill="#1d4ed8" fontSize="15" fontWeight="900">E = P x t</text>

            <path className="power-wire" d="M150 225V150H750V295H150V252" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="108" y="188" width="84" height="64" rx="12" fill="#ffffff" stroke="#111827" strokeWidth="4" />
            <path d="M132 206h34M150 194v30M132 235h34" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
            <text x="106" y="174" fill="#111827" fontSize="15" fontWeight="800">Battery source</text>
            <text x="200" y="202" fill="#dc2626" fontSize="20" fontWeight="900">V</text>
            <text x="201" y="238" fill="#059669" fontSize="16" fontWeight="900">I</text>

            <path className="power-resistor-glow" d="M378 150h20l12-20 24 40 24-40 24 40 24-40 12 20h24" fill="none" stroke="#f59e0b" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" filter="url(#powerGlowFilter)" />
            <path d="M378 150h20l12-20 24 40 24-40 24 40 24-40 12 20h24" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="407" y="203" fill="#111827" fontSize="16" fontWeight="900">Resistor / Load</text>
            <path d="M455 184v-24" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />

            <path className="power-flow-guide" d="M250 128H650" stroke="#059669" strokeWidth="4" strokeLinecap="round" markerEnd="url(#powerArrow)" />
            <text className="power-flow-dot" x="366" y="120" fill="#047857" fontSize="15" fontWeight="900">power travels with current</text>
            <circle className="power-flow-dot" r="6.5" fill="#10b981">
              <animateMotion dur="10.5s" repeatCount="indefinite" path="M150 252V295H750V150H542H378H150V225" />
            </circle>
            <circle className="power-flow-dot" r="6.5" fill="#34d399">
              <animateMotion dur="10.5s" begin="-3.5s" repeatCount="indefinite" path="M150 252V295H750V150H542H378H150V225" />
            </circle>
            <circle className="power-flow-dot" r="6.5" fill="#6ee7b7">
              <animateMotion dur="10.5s" begin="-7s" repeatCount="indefinite" path="M150 252V295H750V150H542H378H150V225" />
            </circle>

            <text x="155" y="348" fill="#0f172a" fontSize="14" fontWeight="900">Energy meter</text>
            <rect x="270" y="332" width="430" height="24" rx="12" fill="#f1f5f9" stroke="#cbd5e1" />
            <rect className="energy-bar" x="270" y="332" width="430" height="24" rx="12" fill="url(#energyMeterGradient)" />
            <text x="370" y="382" fill="#0f172a" fontSize="14" fontWeight="900">total energy used increases with time</text>
            <text x="716" y="350" fill="#047857" fontSize="13" fontWeight="900">time</text>
          </svg>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {steps.map(([number, title, text]) => (
            <div
              key={number}
              className={`power-stage-card power-stage-${number} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-700">
                Step {number}: {title}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
          Voltage pushes charge, current moves it, power shows how fast energy is used,
          and energy tells how much is consumed over time.
        </div>
      </div>
    </section>
  );
}

function PassiveActiveGuide() {
  const steps = [
    {
      id: 1,
      title: "Source Activation",
      label: "Active source supplies energy",
      text: "The battery starts the circuit by supplying electrical energy.",
      detail:
        "An active element can deliver energy to the network. In this circuit, the battery creates the electrical push that allows current and energy transfer to begin.",
      note: "Active source: supplies energy",
    },
    {
      id: 2,
      title: "Energy Flow",
      label: "Energy flows through the circuit",
      text: "Energy particles follow the wire path continuously.",
      detail:
        "After the circuit path is complete, energy is transferred through the conductors. The moving particles trace the same closed path as the wire, so the flow is easy to follow.",
      note: "Energy transfer follows the closed path",
    },
    {
      id: 3,
      title: "Resistor Response",
      label: "Electrical energy is converted into heat",
      text: "The resistor absorbs energy and dissipates it as heat.",
      detail:
        "A resistor is passive because it cannot create energy. It absorbs electrical energy from the circuit and converts that energy into heat.",
      note: "Resistor: energy is dissipated",
    },
    {
      id: 4,
      title: "Capacitor Response",
      label: "Energy is stored in an electric field",
      text: "Charge builds between the plates and releases smoothly.",
      detail:
        "A capacitor is passive because it stores energy temporarily. Charge separation between its plates creates an electric field, then the stored energy can be released back to the circuit.",
      note: "Capacitor: electric-field storage",
    },
    {
      id: 5,
      title: "Inductor Response",
      label: "Energy is stored in a magnetic field",
      text: "Current through the coil creates a magnetic field.",
      detail:
        "An inductor is passive because it stores energy only when current flows through it. The coil creates a magnetic field that grows and collapses with current changes.",
      note: "Inductor: magnetic-field storage",
    },
    {
      id: 6,
      title: "Energy Distribution",
      label: "Energy is distributed throughout the circuit",
      text: "The supplied energy reaches each passive element.",
      detail:
        "The active source supplies energy, and the passive elements decide what happens to it: the resistor uses it, the capacitor stores it electrically, and the inductor stores it magnetically.",
      note: "Source supplies; passive elements respond",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <style>{`
        .pa-component {
          opacity: 0;
          animation: paComponentFade 18s ease-in-out infinite;
        }

        .pa-source {
          animation-delay: 0.4s;
        }

        .pa-resistor {
          animation-delay: 1s;
        }

        .pa-capacitor {
          animation-delay: 1.25s;
        }

        .pa-inductor {
          animation-delay: 1.5s;
        }

        .pa-drawn-wire {
          stroke-dasharray: 1780;
          stroke-dashoffset: 1780;
          animation: paDrawCircuit 18s ease-in-out infinite;
        }

        .pa-source-pulse {
          animation: paSourcePulse 18s ease-in-out infinite;
        }

        .pa-energy-particle {
          filter: url(#paPulseGlow);
          opacity: 0;
          animation: paFlowVisible 18s ease-in-out infinite;
        }

        .pa-resistor-heat {
          opacity: 0;
          animation: paHeatVisible 18s ease-in-out infinite, paHeatPulse 1.8s ease-in-out infinite;
        }

        .pa-capacitor-fill {
          transform-origin: 518px 155px;
          transform: scaleY(0);
          opacity: 0;
          animation: paCapacitorFill 18s ease-in-out infinite;
        }

        .pa-capacitor-field {
          opacity: 0;
          animation: paCapacitorField 18s ease-in-out infinite;
        }

        .pa-inductor-wave-one {
          transform-origin: 654px 155px;
          opacity: 0;
          animation: paRippleOne 18s ease-in-out infinite;
        }

        .pa-inductor-wave-two {
          transform-origin: 654px 155px;
          opacity: 0;
          animation: paRippleTwo 18s ease-in-out infinite;
        }

        .pa-distribution {
          opacity: 0;
          animation: paDistributionVisible 18s ease-in-out infinite;
        }

        .pa-stage-card {
          opacity: 0.42;
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        .pa-stage-1 { animation: paStageOne 18s linear infinite; }
        .pa-stage-2 { animation: paStageTwo 18s linear infinite; }
        .pa-stage-3 { animation: paStageThree 18s linear infinite; }
        .pa-stage-4 { animation: paStageFour 18s linear infinite; }
        .pa-stage-5 { animation: paStageFive 18s linear infinite; }
        .pa-stage-6 { animation: paStageSix 18s linear infinite; }

        @keyframes paComponentFade {
          0%, 4% { opacity: 0; transform: translateY(4px); }
          10%, 100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes paDrawCircuit {
          0% { stroke-dashoffset: 1780; }
          18%, 100% { stroke-dashoffset: 0; }
        }

        @keyframes paSourcePulse {
          0%, 8% { filter: drop-shadow(0 0 0 rgba(37, 99, 235, 0)); }
          13%, 100% { filter: drop-shadow(0 0 10px rgba(37, 99, 235, 0.28)); }
        }

        @keyframes paFlowVisible {
          0%, 20% { opacity: 0; }
          27%, 100% { opacity: 0.95; }
        }

        @keyframes paHeatVisible {
          0%, 34% { opacity: 0; }
          41%, 100% { opacity: 0.9; }
        }

        @keyframes paHeatPulse {
          0%, 100% { stroke-opacity: 0.24; }
          50% { stroke-opacity: 0.78; }
        }

        @keyframes paCapacitorFill {
          0%, 49% { transform: scaleY(0); opacity: 0; }
          58% { transform: scaleY(1); opacity: 0.86; }
          72% { transform: scaleY(0.25); opacity: 0.46; }
          86%, 100% { transform: scaleY(0.9); opacity: 0.82; }
        }

        @keyframes paCapacitorField {
          0%, 49% { opacity: 0; }
          58% { opacity: 0.46; }
          72% { opacity: 0.18; }
          86%, 100% { opacity: 0.42; }
        }

        @keyframes paRippleOne {
          0%, 64% { opacity: 0; transform: scale(0.78); }
          72% { opacity: 0.48; transform: scale(0.9); }
          90%, 100% { opacity: 0; transform: scale(1.28); }
        }

        @keyframes paRippleTwo {
          0%, 68% { opacity: 0; transform: scale(0.82); }
          78% { opacity: 0.38; transform: scale(1); }
          96%, 100% { opacity: 0; transform: scale(1.38); }
        }

        @keyframes paDistributionVisible {
          0%, 82% { opacity: 0; stroke-dashoffset: 0; }
          88%, 100% { opacity: 1; stroke-dashoffset: -120; }
        }

        @keyframes paStageOne {
          0%, 16% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          19%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes paStageTwo {
          0%, 16% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          19%, 32% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          35%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes paStageThree {
          0%, 32% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          35%, 48% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          51%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes paStageFour {
          0%, 48% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          51%, 64% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          67%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes paStageFive {
          0%, 64% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          67%, 82% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          85%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes paStageSix {
          0%, 82% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          85%, 100% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pa-drawn-wire,
          .pa-source-pulse,
          .pa-resistor-heat,
          .pa-capacitor-fill,
          .pa-capacitor-field,
          .pa-inductor-wave-one,
          .pa-inductor-wave-two,
          .pa-distribution,
          .pa-stage-card {
            animation: none;
          }

          .pa-drawn-wire {
            stroke-dashoffset: 0;
          }

          .pa-component,
          .pa-energy-particle,
          .pa-resistor-heat,
          .pa-capacitor-fill,
          .pa-capacitor-field,
          .pa-distribution {
            opacity: 1;
          }
        }
      `}</style>

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        3. Passive and Active Elements
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-800">
        Active elements supply energy. Passive elements absorb, store, release, or dissipate that energy.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div>
          <h5 className="text-base font-bold text-slate-900">Passive and Active Elements</h5>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700">
            <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700">
                Active Type
              </p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Active Element Supplies</h6>
              <p className="mt-1.5">
                The battery is the active element. It provides the voltage and energy
                needed to make the circuit operate.
              </p>
              <p className="mt-2 rounded-md border border-blue-200 bg-white px-3 py-2 font-semibold text-blue-800">
                Active source supplies energy.
              </p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-orange-700">
                Passive Type
              </p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Passive Elements Respond</h6>
              <p className="mt-1.5">
                The resistor, capacitor, and inductor do not generate energy. They absorb,
                dissipate, store, or release the supplied energy.
              </p>
              <p className="mt-2 rounded-md border border-orange-200 bg-white px-3 py-2 font-semibold text-orange-800">
                Passive elements use or store energy.
              </p>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                Energy Behavior
              </p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Energy Is Distributed</h6>
              <p className="mt-1.5">
                Energy flows from the source through the complete circuit path and reaches
                each passive element in sequence.
              </p>
              <p className="mt-2 rounded-md border border-emerald-200 bg-white px-3 py-2 font-semibold text-emerald-800">
                Source to resistor, capacitor, and inductor.
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 overflow-x-auto overscroll-x-contain">
          <div className="max-w-full overflow-x-auto overscroll-x-contain">
          <svg viewBox="0 0 900 460" className="mx-auto h-auto w-full max-w-full md:w-[82%]" role="img" aria-label="Animated circuit showing passive and active elements">
            <defs>
              <filter id="paPulseGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="paHeatGlow" x="-80%" y="-150%" width="260%" height="400%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="20" y="24" width="860" height="405" rx="18" fill="#ffffff" stroke="#e2e8f0" />
            <path
              className="pa-drawn-wire"
              d="M145 230V155H760V305H145V260"
              fill="none"
              stroke="#111827"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g className="pa-component pa-source">
              <rect className="pa-source-pulse" x="103" y="190" width="84" height="70" rx="10" fill="#ffffff" stroke="#111827" strokeWidth="4" />
              <path d="M128 210h34M145 196v30M128 244h34" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
              <text x="102" y="176" fill="#111827" fontSize="15" fontWeight="800">Battery</text>
              <text x="196" y="214" fill="#2563eb" fontSize="14" fontWeight="900">Active source</text>
              <text x="196" y="234" fill="#2563eb" fontSize="13" fontWeight="700">supplies energy</text>
            </g>

            <g className="pa-component pa-resistor">
              <path className="pa-resistor-heat" d="M315 155h18l12-20 22 40 22-40 22 40 22-40 12 20h18" fill="none" stroke="#f97316" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" filter="url(#paHeatGlow)" />
              <path d="M315 155h18l12-20 22 40 22-40 22 40 22-40 12 20h18" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="352" y="205" fill="#9a3412" fontSize="14" fontWeight="900">Heat loss</text>
            </g>

            <g className="pa-component pa-capacitor">
              <rect className="pa-capacitor-field" x="504" y="137" width="24" height="36" rx="7" fill="#bfdbfe" />
              <rect className="pa-capacitor-fill" x="509" y="139" width="14" height="32" rx="5" fill="#2563eb" opacity="0.82" />
              <path d="M500 132v46M530 132v46" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
              <text x="482" y="205" fill="#1d4ed8" fontSize="14" fontWeight="900">Electric field</text>
            </g>

            <g className="pa-component pa-inductor">
              <circle className="pa-inductor-wave-one" cx="654" cy="155" r="34" fill="none" stroke="#10b981" strokeWidth="3" />
              <circle className="pa-inductor-wave-two" cx="654" cy="155" r="44" fill="none" stroke="#10b981" strokeWidth="2" />
              <path d="M610 155c8-20 20 20 28 0s20 20 28 0 20 20 28 0" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
              <text x="612" y="205" fill="#047857" fontSize="14" fontWeight="900">Magnetic field</text>
            </g>

            <g>
              <circle className="pa-energy-particle" r="6.5" fill="#2563eb">
                <animateMotion dur="8.5s" repeatCount="indefinite" path="M145 260V305H760V155H694H610H530H500H463H315H145V230" />
              </circle>
              <circle className="pa-energy-particle" r="6.5" fill="#22c55e">
                <animateMotion dur="8.5s" begin="-2.8s" repeatCount="indefinite" path="M145 260V305H760V155H694H610H530H500H463H315H145V230" />
              </circle>
              <circle className="pa-energy-particle" r="6.5" fill="#60a5fa">
                <animateMotion dur="8.5s" begin="-5.6s" repeatCount="indefinite" path="M145 260V305H760V155H694H610H530H500H463H315H145V230" />
              </circle>
            </g>

            <g className="pa-distribution">
              <path d="M183 296C250 355 345 370 450 352C562 332 646 346 721 297" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 12" />
              <text x="277" y="382" fill="#047857" fontSize="15" fontWeight="900">Energy is distributed throughout the circuit</text>
            </g>
          </svg>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`pa-stage-card pa-stage-${step.id} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-portal-700">
                Step {step.id}: {step.title}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">{step.detail}</p>
              <p className="mt-2 rounded-md bg-white px-2 py-1 text-xs font-bold text-slate-800">
                {step.note}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
          <h6 className="text-sm font-extrabold text-slate-950">Where the formulas come from</h6>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700 lg:grid-cols-3">
            <div className="rounded-lg border border-orange-200 bg-white p-3">
              <p className="font-bold text-orange-800">Resistor power</p>
              <p className="mt-2 font-mono text-sm font-bold text-orange-700">P = V I, V = I R</p>
              <p className="mt-1 font-mono text-sm font-bold text-orange-700">So, P = I^2 R</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                This is power dissipated as heat. P is power in watts, I is current in amperes,
                and R is resistance in ohms.
              </p>
            </div>

            <div className="rounded-lg border border-blue-200 bg-white p-3">
              <p className="font-bold text-blue-800">Capacitor stored energy</p>
              <p className="mt-2 font-mono text-sm font-bold text-blue-700">q = C V</p>
              <p className="mt-1 font-mono text-sm font-bold text-blue-700">E = 1/2 C V^2</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                While charging, voltage rises from 0 to V, so average voltage is V/2.
                Energy = charge x average voltage = CV x V/2.
              </p>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-white p-3">
              <p className="font-bold text-emerald-800">Inductor stored energy</p>
              <p className="mt-2 font-mono text-sm font-bold text-emerald-700">v = L di/dt</p>
              <p className="mt-1 font-mono text-sm font-bold text-emerald-700">E = 1/2 L I^2</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Energy builds as current rises from 0 to I. L is inductance in henrys,
                and I is current in amperes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LinearNonLinearGuide() {
  const stepPairs = [
    {
      number: "1",
      linearTitle: "Apply Voltage",
      linearText: "Voltage is applied across the linear element.",
      nonLinearTitle: "Apply Voltage",
      nonLinearText: "Voltage is applied across the non-linear element.",
    },
    {
      number: "2",
      linearTitle: "Steady Response",
      linearText: "Current increases steadily as voltage increases.",
      nonLinearTitle: "Low Current Start",
      nonLinearText: "Current remains very low at first, even as voltage increases.",
    },
    {
      number: "3",
      linearTitle: "Straight-Line Behavior",
      linearText: "The V-I relation stays proportional at every operating point.",
      nonLinearTitle: "Turn-On Region",
      nonLinearText: "After a certain voltage, current rises sharply and behavior changes.",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <style>{`
        .ln-axis {
          stroke-dasharray: 720;
          stroke-dashoffset: 720;
          animation: lnAxisDraw 18s ease-in-out infinite;
        }

        .ln-linear-line {
          stroke-dasharray: 410;
          stroke-dashoffset: 410;
          animation: lnLinearDraw 18s ease-in-out infinite;
        }

        .ln-curve {
          stroke-dasharray: 560;
          stroke-dashoffset: 560;
          animation: lnCurveDraw 18s ease-in-out infinite;
        }

        .ln-linear-point {
          opacity: 0;
          animation: lnLinearPoint 18s ease-in-out infinite;
        }

        .ln-turn-on {
          opacity: 0;
          animation: lnTurnOn 18s ease-in-out infinite, lnPulse 1.8s ease-in-out infinite;
        }

        .ln-low-region {
          opacity: 0;
          animation: lnLowRegion 18s ease-in-out infinite;
        }

        .ln-stage-card {
          opacity: 0.42;
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        .ln-stage-pair-1 { animation: lnStagePairOne 18s linear infinite; }
        .ln-stage-pair-2 { animation: lnStagePairTwo 18s linear infinite; }
        .ln-stage-pair-3 { animation: lnStagePairThree 18s linear infinite; }

        @keyframes lnAxisDraw {
          0% { stroke-dashoffset: 720; }
          16%, 100% { stroke-dashoffset: 0; }
        }

        @keyframes lnLinearDraw {
          0%, 18% { stroke-dashoffset: 410; opacity: 0; }
          28%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes lnCurveDraw {
          0%, 55% { stroke-dashoffset: 560; opacity: 0; }
          76%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes lnLinearPoint {
          0%, 25% { opacity: 0; transform: translate(0, 0); }
          36% { opacity: 1; transform: translate(55px, -42px); }
          47%, 100% { opacity: 1; transform: translate(110px, -84px); }
        }

        @keyframes lnLowRegion {
          0%, 50% { opacity: 0; }
          58%, 100% { opacity: 0.36; }
        }

        @keyframes lnTurnOn {
          0%, 66% { opacity: 0; }
          74%, 100% { opacity: 1; }
        }

        @keyframes lnPulse {
          0%, 100% { transform: scale(0.96); }
          50% { transform: scale(1.08); }
        }

        @keyframes lnStagePairOne {
          0%, 28% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          34%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes lnStagePairTwo {
          0%, 28% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          34%, 62% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          68%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes lnStagePairThree {
          0%, 62% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          68%, 100% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ln-axis,
          .ln-linear-line,
          .ln-curve,
          .ln-linear-point,
          .ln-turn-on,
          .ln-low-region,
          .ln-stage-card {
            animation: none;
          }

          .ln-axis,
          .ln-linear-line,
          .ln-curve {
            stroke-dashoffset: 0;
          }

          .ln-linear-point,
          .ln-turn-on,
          .ln-low-region {
            opacity: 1;
          }
        }
      `}</style>

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        4. Linear and Non-Linear Elements
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-800">
        Some elements respond in a simple proportional way. Others change behavior depending on operating conditions.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div>
          <h5 className="text-base font-bold text-slate-900">Linear and Non-Linear Elements</h5>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700">
            <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700">Linear Type</p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Linear Elements</h6>
              <p className="mt-1.5">
                A linear element behaves in a direct and proportional way. If voltage
                doubles, current also doubles, as long as resistance is constant.
              </p>
              <p className="mt-2 rounded-md border border-blue-200 bg-white px-3 py-2 font-mono text-sm font-bold text-blue-800">
                V = I R
              </p>
              <p className="mt-2 rounded-md border border-blue-200 bg-white px-3 py-2 font-semibold text-blue-800">
                The output follows the input in a straight and predictable manner.
              </p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-orange-700">Non-Linear Type</p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Non-Linear Elements</h6>
              <p className="mt-1.5">
                A non-linear element does not follow one fixed proportional relation.
                Small voltage may produce almost no current, but after turn-on the current
                can rise sharply.
              </p>
              <p className="mt-2 rounded-md border border-orange-200 bg-white px-3 py-2 font-semibold text-orange-800">
                The response depends on the operating condition.
              </p>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">Graph Comparison</p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Putting It Together</h6>
              <p className="mt-1.5">
                A straight V-I graph means proportional behavior. A curved V-I graph means
                the element behaves differently in different regions.
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <p className="rounded-md border border-emerald-200 bg-white px-3 py-2 font-semibold text-emerald-800">
                  Linear: straight line
                </p>
                <p className="rounded-md border border-emerald-200 bg-white px-3 py-2 font-semibold text-emerald-800">
                  Non-linear: curved response
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:hidden">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-blue-700">
              Linear element
            </p>
            <div className="mt-3 overflow-x-auto overscroll-x-contain">
              <svg viewBox="0 0 360 300" className="mx-auto h-auto w-full md:w-[82%]" role="img" aria-label="Linear element straight line graph">
                <defs>
                  <marker id="lnMobileLinearArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                    <path d="M0 0 10 5 0 10Z" fill="#111827" />
                  </marker>
                  <filter id="lnMobileLinearGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect x="12" y="14" width="336" height="266" rx="18" fill="#ffffff" stroke="#dbeafe" />
                <text x="34" y="46" fill="#0f172a" fontSize="16" fontWeight="900">Linear element</text>
                <text x="34" y="69" fill="#1d4ed8" fontSize="13" fontWeight="800">V and I rise together</text>
                <g transform="translate(56 240)">
                  <path d="M0 0H245M0 0V-160" fill="none" stroke="#111827" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lnMobileLinearArrow)" />
                  <text x="202" y="30" fill="#111827" fontSize="13" fontWeight="900">Voltage</text>
                  <text x="-28" y="-169" fill="#111827" fontSize="13" fontWeight="900">Current</text>
                  <path d="M22 -18L220 -142" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="142" cy="-93" r="8" fill="#2563eb" filter="url(#lnMobileLinearGlow)" />
                  <text x="82" y="-150" fill="#1d4ed8" fontSize="14" fontWeight="900">Straight-line V-I graph</text>
                  <text x="98" y="-58" fill="#1d4ed8" fontSize="13" fontWeight="800">proportional response</text>
                </g>
              </svg>
            </div>
            <div className="mt-3 grid gap-2.5">
              {stepPairs.map((step) => (
                <div
                  key={`mobile-linear-${step.number}`}
                  className={`ln-stage-card ln-stage-pair-${step.number} rounded-lg border border-blue-100 bg-white px-3 py-2.5 shadow-sm`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-portal-700">
                    Step {step.number}: {step.linearTitle}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{step.linearText}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-orange-700">
              Non-linear element
            </p>
            <div className="mt-3 overflow-x-auto overscroll-x-contain">
              <svg viewBox="0 0 360 300" className="mx-auto h-auto w-full md:w-[82%]" role="img" aria-label="Non-linear element curved graph">
                <defs>
                  <marker id="lnMobileNonLinearArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                    <path d="M0 0 10 5 0 10Z" fill="#111827" />
                  </marker>
                  <filter id="lnMobileNonLinearGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect x="12" y="14" width="336" height="266" rx="18" fill="#ffffff" stroke="#fed7aa" />
                <text x="34" y="46" fill="#0f172a" fontSize="16" fontWeight="900">Non-linear element</text>
                <text x="34" y="69" fill="#c2410c" fontSize="13" fontWeight="800">low first, sharp later</text>
                <g transform="translate(56 240)">
                  <path d="M0 0H245M0 0V-160" fill="none" stroke="#111827" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lnMobileNonLinearArrow)" />
                  <text x="202" y="30" fill="#111827" fontSize="13" fontWeight="900">Voltage</text>
                  <text x="-28" y="-169" fill="#111827" fontSize="13" fontWeight="900">Current</text>
                  <rect x="22" y="-22" width="112" height="17" rx="9" fill="#fed7aa" opacity="0.72" />
                  <path d="M20 -8C88 -8 124 -10 148 -26C176 -45 193 -86 222 -146" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
                  <g transform="translate(148 -26)">
                    <circle r="13" fill="#fb923c" filter="url(#lnMobileNonLinearGlow)" />
                    <circle r="5" fill="#ffffff" />
                  </g>
                  <path d="M148 -26v44" stroke="#c2410c" strokeWidth="2.5" strokeDasharray="5 6" />
                  <text x="96" y="35" fill="#c2410c" fontSize="13" fontWeight="900">turn-on point</text>
                  <text x="82" y="-150" fill="#c2410c" fontSize="14" fontWeight="900">Curved V-I graph</text>
                </g>
              </svg>
            </div>
            <div className="mt-3 grid gap-2.5">
              {stepPairs.map((step) => (
                <div
                  key={`mobile-non-linear-${step.number}`}
                  className={`ln-stage-card ln-stage-pair-${step.number} rounded-lg border border-orange-100 bg-white px-3 py-2.5 shadow-sm`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-orange-700">
                    Step {step.number}: {step.nonLinearTitle}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{step.nonLinearText}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden min-w-0 overflow-x-auto overscroll-x-contain md:block">
          <div className="max-w-full overflow-x-auto overscroll-x-contain">
          <svg viewBox="0 0 900 460" className="mx-auto h-auto w-full max-w-full md:w-[82%]" role="img" aria-label="Animated graph comparing linear and non-linear elements">
            <defs>
              <marker id="lnArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                <path d="M0 0 10 5 0 10Z" fill="#111827" />
              </marker>
              <filter id="lnPointGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="20" y="24" width="860" height="405" rx="18" fill="#ffffff" stroke="#e2e8f0" />

            <rect x="70" y="58" width="230" height="54" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
            <text x="92" y="81" fill="#0f172a" fontSize="14" fontWeight="800">Linear element</text>
            <text x="92" y="101" fill="#1d4ed8" fontSize="15" fontWeight="900">V and I rise together</text>

            <rect x="600" y="58" width="230" height="54" rx="14" fill="#fff7ed" stroke="#fed7aa" />
            <text x="622" y="81" fill="#0f172a" fontSize="14" fontWeight="800">Non-linear element</text>
            <text x="622" y="101" fill="#c2410c" fontSize="15" fontWeight="900">low first, sharp later</text>

            <g transform="translate(95 330)">
              <path className="ln-axis" d="M0 0H270M0 0V-220" fill="none" stroke="#111827" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lnArrow)" />
              <text x="250" y="32" fill="#111827" fontSize="14" fontWeight="900">Voltage</text>
              <text x="-22" y="-222" fill="#111827" fontSize="14" fontWeight="900">Current</text>
              <path className="ln-linear-line" d="M20 -18L238 -186" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
              <circle className="ln-linear-point" cx="42" cy="-34" r="8" fill="#2563eb" filter="url(#lnPointGlow)" />
              <text x="70" y="-198" fill="#1d4ed8" fontSize="15" fontWeight="900">Straight-line V-I graph</text>
              <text x="92" y="-76" fill="#1d4ed8" fontSize="13" fontWeight="800">proportional</text>
            </g>

            <g transform="translate(535 330)">
              <path className="ln-axis" d="M0 0H270M0 0V-220" fill="none" stroke="#111827" strokeWidth="4" strokeLinecap="round" markerEnd="url(#lnArrow)" />
              <text x="250" y="32" fill="#111827" fontSize="14" fontWeight="900">Voltage</text>
              <text x="-22" y="-222" fill="#111827" fontSize="14" fontWeight="900">Current</text>
              <rect className="ln-low-region" x="20" y="-22" width="128" height="18" rx="9" fill="#fed7aa" />
              <path className="ln-curve" d="M18 -8C88 -8 126 -10 154 -26C181 -42 199 -90 226 -184" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
              <g className="ln-turn-on" transform="translate(154 -26)">
                <circle r="13" fill="#fb923c" filter="url(#lnPointGlow)" />
                <circle r="5" fill="#ffffff" />
              </g>
              <path d="M154 -26v44" stroke="#c2410c" strokeWidth="2.5" strokeDasharray="5 6" />
              <text x="102" y="36" fill="#c2410c" fontSize="13" fontWeight="900">turn-on point</text>
              <text x="58" y="-198" fill="#c2410c" fontSize="15" fontWeight="900">Curved V-I graph</text>
            </g>
          </svg>
          </div>
        </div>

        <div className="hidden gap-3 md:grid lg:grid-cols-2">
          <div className="grid gap-2.5">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-blue-700">
              Linear element
            </p>
            {stepPairs.map((step) => (
              <div
                key={`linear-${step.number}`}
                className={`ln-stage-card ln-stage-pair-${step.number} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-portal-700">
                  Step {step.number}: {step.linearTitle}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{step.linearText}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-2.5">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-orange-700">
              Non-linear element
            </p>
            {stepPairs.map((step) => (
              <div
                key={`non-linear-${step.number}`}
                className={`ln-stage-card ln-stage-pair-${step.number} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-orange-700">
                  Step {step.number}: {step.nonLinearTitle}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{step.nonLinearText}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
          <h6 className="text-sm font-extrabold text-slate-950">Formula and examples</h6>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700 lg:grid-cols-3">
            <div className="rounded-lg border border-blue-200 bg-white p-3">
              <p className="font-bold text-blue-800">Ohm's law</p>
              <p className="mt-2 font-mono text-sm font-bold text-blue-700">V = I R</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                V is voltage, I is current, and R is resistance. If R stays constant,
                voltage and current remain proportional.
              </p>
            </div>
            <div className="rounded-lg border border-orange-200 bg-white p-3">
              <p className="font-bold text-orange-800">Non-linear examples</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                Diode, transistor, and semiconductor junctions.
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                These devices do not keep one constant V-I ratio across all operating regions.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-white p-3">
              <p className="font-bold text-emerald-800">Final concept</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Linear elements are predictable. Non-linear elements change their response
                depending on voltage, current, temperature, or bias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BilateralUnilateralGuide() {
  const stepPairs = [
    {
      number: "1",
      bilateralTitle: "Apply Current",
      bilateralText: "Current is applied to the bilateral element.",
      unilateralTitle: "Apply Current",
      unilateralText: "Current is applied to the unilateral element.",
    },
    {
      number: "2",
      bilateralTitle: "Same Flow Both Ways",
      bilateralText: "Current can flow normally from left to right and right to left.",
      unilateralTitle: "Forward Flow",
      unilateralText: "Current flows easily only in the allowed forward direction.",
    },
    {
      number: "3",
      bilateralTitle: "Symmetry",
      bilateralText: "Reversing current direction does not change the behavior.",
      unilateralTitle: "Reverse Blocking",
      unilateralText: "Reverse current is reduced or blocked because direction matters.",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <style>{`
        .bu-path {
          stroke-dasharray: 720;
          stroke-dashoffset: 720;
          animation: buPathDraw 18s ease-in-out infinite;
        }

        .bu-forward-dot {
          opacity: 0;
          filter: url(#buGlow);
          animation: buForwardVisible 18s ease-in-out infinite;
        }

        .bu-bilateral-reverse-dot {
          opacity: 0;
          filter: url(#buGlow);
          animation: buBilateralReverseVisible 18s ease-in-out infinite;
        }

        .bu-blocked-dot {
          opacity: 0;
          filter: url(#buGlow);
          animation: buBlockedDotVisible 18s ease-in-out infinite;
        }

        .bu-diode-block {
          opacity: 0;
          animation: buBlockVisible 18s ease-in-out infinite, buBlockPulse 1.8s ease-in-out infinite;
        }

        .bu-symmetry {
          opacity: 0;
          animation: buSymmetryVisible 18s ease-in-out infinite;
        }

        .bu-stage-card {
          opacity: 0.42;
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        .bu-stage-pair-1 { animation: buStagePairOne 18s linear infinite; }
        .bu-stage-pair-2 { animation: buStagePairTwo 18s linear infinite; }
        .bu-stage-pair-3 { animation: buStagePairThree 18s linear infinite; }

        @keyframes buPathDraw {
          0% { stroke-dashoffset: 720; }
          18%, 100% { stroke-dashoffset: 0; }
        }

        @keyframes buForwardVisible {
          0%, 18% { opacity: 0; }
          26%, 100% { opacity: 1; }
        }

        @keyframes buBilateralReverseVisible {
          0%, 36% { opacity: 0; }
          44%, 100% { opacity: 0.82; }
        }

        @keyframes buBlockedDotVisible {
          0%, 68% { opacity: 0; }
          76%, 86% { opacity: 0.82; }
          92%, 100% { opacity: 0.18; }
        }

        @keyframes buSymmetryVisible {
          0%, 66% { opacity: 0; }
          74%, 100% { opacity: 1; }
        }

        @keyframes buBlockVisible {
          0%, 66% { opacity: 0; }
          74%, 100% { opacity: 1; }
        }

        @keyframes buBlockPulse {
          0%, 100% { transform: scale(0.96); }
          50% { transform: scale(1.06); }
        }

        @keyframes buStagePairOne {
          0%, 28% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          34%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes buStagePairTwo {
          0%, 28% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          34%, 62% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
          68%, 100% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
        }

        @keyframes buStagePairThree {
          0%, 62% { opacity: 0.42; transform: translateY(0); border-color: #e2e8f0; background-color: #ffffff; }
          68%, 100% { opacity: 1; transform: translateY(-1px); border-color: #2563eb; background-color: #eff6ff; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bu-path,
          .bu-forward-dot,
          .bu-bilateral-reverse-dot,
          .bu-blocked-dot,
          .bu-diode-block,
          .bu-symmetry,
          .bu-stage-card {
            animation: none;
          }

          .bu-path {
            stroke-dashoffset: 0;
          }

          .bu-forward-dot,
          .bu-bilateral-reverse-dot,
          .bu-blocked-dot,
          .bu-diode-block,
          .bu-symmetry {
            opacity: 1;
          }
        }
      `}</style>

      <h4 className="text-center text-lg font-extrabold uppercase tracking-wide text-[#071b58] sm:text-2xl">
        5. Bilateral and Unilateral Elements
      </h4>
      <p className="mx-auto mt-3 max-w-3xl rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-center text-sm font-bold text-blue-800">
        Bilateral elements behave the same both ways. Unilateral elements depend on direction.
      </p>

      <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4">
        <div>
          <h5 className="text-base font-bold text-slate-900">Bilateral and Unilateral Elements</h5>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700">
            <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700">Bilateral Type</p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Bilateral Elements</h6>
              <p className="mt-1.5">
                A bilateral element works the same even when current direction is reversed.
                It does not care which way current flows through it.
              </p>
              <p className="mt-2 rounded-md border border-blue-200 bg-white px-3 py-2 font-semibold text-blue-800">
                Same response in both directions.
              </p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-orange-700">Unilateral Type</p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Unilateral Elements</h6>
              <p className="mt-1.5">
                A unilateral element behaves differently when direction is reversed.
                Current may flow easily one way and become restricted or blocked the other way.
              </p>
              <p className="mt-2 rounded-md border border-orange-200 bg-white px-3 py-2 font-semibold text-orange-800">
                Direction and polarity matter.
              </p>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">Direction Comparison</p>
              <h6 className="mt-1 text-sm font-bold text-slate-950">Putting It Together</h6>
              <p className="mt-1.5">
                Bilateral elements are symmetrical. Unilateral elements are asymmetrical
                and are useful for control, switching, and rectification.
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <p className="rounded-md border border-emerald-200 bg-white px-3 py-2 font-semibold text-emerald-800">
                  Bilateral: no direction effect
                </p>
                <p className="rounded-md border border-emerald-200 bg-white px-3 py-2 font-semibold text-emerald-800">
                  Unilateral: direction-dependent
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:hidden">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-blue-700">
              Bilateral element
            </p>
            <div className="mt-3 overflow-x-auto overscroll-x-contain">
              <svg viewBox="0 0 360 240" className="mx-auto h-auto w-full md:w-[82%]" role="img" aria-label="Bilateral element current flow in both directions">
                <defs>
                  <marker id="buMobileBlueArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                    <path d="M0 0 10 5 0 10Z" fill="#2563eb" />
                  </marker>
                  <filter id="buMobileBlueGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect x="12" y="14" width="336" height="206" rx="18" fill="#ffffff" stroke="#dbeafe" />
                <text x="32" y="47" fill="#0f172a" fontSize="16" fontWeight="900">Bilateral element</text>
                <text x="32" y="70" fill="#1d4ed8" fontSize="13" fontWeight="800">same behavior both ways</text>
                <g transform="translate(45 126)">
                  <path d="M0 0H270" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
                  <path d="M98 0h16l10-16 19 32 19-32 19 32 10-16h16" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="112" y="-38" fill="#111827" fontSize="14" fontWeight="900">Resistor</text>
                  <path d="M18 -34H92" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" markerEnd="url(#buMobileBlueArrow)" />
                  <path d="M252 34H178" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" markerEnd="url(#buMobileBlueArrow)" />
                  <text x="54" y="67" fill="#1d4ed8" fontSize="13" fontWeight="900">left to right = right to left</text>
                  <circle className="bu-forward-dot" r="7" fill="#2563eb" filter="url(#buMobileBlueGlow)">
                    <animateMotion dur="5.5s" repeatCount="indefinite" path="M0 0H270" />
                  </circle>
                  <circle className="bu-bilateral-reverse-dot" r="7" fill="#60a5fa" filter="url(#buMobileBlueGlow)">
                    <animateMotion dur="5.5s" begin="-2.75s" repeatCount="indefinite" path="M270 0H0" />
                  </circle>
                </g>
              </svg>
            </div>
            <div className="mt-3 grid gap-2.5">
              {stepPairs.map((step) => (
                <div
                  key={`mobile-bilateral-${step.number}`}
                  className={`bu-stage-card bu-stage-pair-${step.number} rounded-lg border border-blue-100 bg-white px-3 py-2.5 shadow-sm`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-portal-700">
                    Step {step.number}: {step.bilateralTitle}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{step.bilateralText}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-orange-700">
              Unilateral element
            </p>
            <div className="mt-3 overflow-x-auto overscroll-x-contain">
              <svg viewBox="0 0 360 240" className="mx-auto h-auto w-full md:w-[82%]" role="img" aria-label="Unilateral element forward flow and reverse blocking">
                <defs>
                  <marker id="buMobileGreenArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                    <path d="M0 0 10 5 0 10Z" fill="#059669" />
                  </marker>
                  <filter id="buMobileOrangeGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect x="12" y="14" width="336" height="206" rx="18" fill="#ffffff" stroke="#fed7aa" />
                <text x="32" y="47" fill="#0f172a" fontSize="16" fontWeight="900">Unilateral element</text>
                <text x="32" y="70" fill="#c2410c" fontSize="13" fontWeight="800">forward allowed, reverse blocked</text>
                <g transform="translate(45 126)">
                  <path d="M0 0H270" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
                  <path d="M112 -28L166 0L112 28Z" fill="#ffffff" stroke="#111827" strokeWidth="5" strokeLinejoin="round" />
                  <path d="M174 -30V30" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
                  <text x="108" y="-40" fill="#111827" fontSize="14" fontWeight="900">Diode</text>
                  <path d="M18 -34H102" stroke="#059669" strokeWidth="4" strokeLinecap="round" markerEnd="url(#buMobileGreenArrow)" />
                  <text x="24" y="-50" fill="#047857" fontSize="13" fontWeight="900">forward flow</text>
                  <g className="bu-diode-block" transform="translate(222 0)">
                    <circle r="23" fill="#fee2e2" stroke="#dc2626" strokeWidth="4" />
                    <path d="M-10 -10L10 10M10 -10L-10 10" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
                  </g>
                  <text className="bu-diode-block" x="142" y="67" fill="#dc2626" fontSize="13" fontWeight="900">reverse current blocked</text>
                  <circle className="bu-forward-dot" r="7" fill="#10b981" filter="url(#buMobileOrangeGlow)">
                    <animateMotion dur="5.5s" repeatCount="indefinite" path="M0 0H170" />
                  </circle>
                  <circle className="bu-blocked-dot" r="7" fill="#fb923c" filter="url(#buMobileOrangeGlow)">
                    <animateMotion dur="5.5s" begin="-2.75s" repeatCount="indefinite" path="M270 0H190" />
                  </circle>
                </g>
              </svg>
            </div>
            <div className="mt-3 grid gap-2.5">
              {stepPairs.map((step) => (
                <div
                  key={`mobile-unilateral-${step.number}`}
                  className={`bu-stage-card bu-stage-pair-${step.number} rounded-lg border border-orange-100 bg-white px-3 py-2.5 shadow-sm`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-orange-700">
                    Step {step.number}: {step.unilateralTitle}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{step.unilateralText}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden min-w-0 overflow-x-auto overscroll-x-contain md:block">
          <div className="max-w-full overflow-x-auto overscroll-x-contain">
          <svg viewBox="0 0 900 460" className="mx-auto h-auto w-full max-w-full md:w-[82%]" role="img" aria-label="Animated circuit comparing bilateral and unilateral elements">
            <defs>
              <marker id="buGreenArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                <path d="M0 0 10 5 0 10Z" fill="#059669" />
              </marker>
              <marker id="buBlueArrow" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
                <path d="M0 0 10 5 0 10Z" fill="#2563eb" />
              </marker>
              <filter id="buGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="20" y="24" width="860" height="405" rx="18" fill="#ffffff" stroke="#e2e8f0" />

            <rect x="70" y="58" width="255" height="54" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
            <text x="92" y="81" fill="#0f172a" fontSize="14" fontWeight="800">Bilateral element</text>
            <text x="92" y="101" fill="#1d4ed8" fontSize="15" fontWeight="900">same behavior both ways</text>

            <rect x="585" y="58" width="255" height="54" rx="14" fill="#fff7ed" stroke="#fed7aa" />
            <text x="607" y="81" fill="#0f172a" fontSize="14" fontWeight="800">Unilateral element</text>
            <text x="607" y="101" fill="#c2410c" fontSize="15" fontWeight="900">forward allowed, reverse blocked</text>

            <g transform="translate(90 230)">
              <path className="bu-path" d="M0 0H270" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
              <path d="M105 0h18l10-16 20 32 20-32 20 32 10-16h18" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="115" y="-45" fill="#111827" fontSize="15" fontWeight="900">Resistor</text>
              <path className="bu-symmetry" d="M35 -42H105" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" markerEnd="url(#buBlueArrow)" />
              <path className="bu-symmetry" d="M235 42H165" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" markerEnd="url(#buBlueArrow)" />
              <text className="bu-symmetry" x="48" y="68" fill="#1d4ed8" fontSize="14" fontWeight="900">same response after reversal</text>
              <circle className="bu-forward-dot" r="7" fill="#2563eb">
                <animateMotion dur="5.5s" repeatCount="indefinite" path="M0 0H270" />
              </circle>
              <circle className="bu-bilateral-reverse-dot" r="7" fill="#60a5fa">
                <animateMotion dur="5.5s" begin="-2.75s" repeatCount="indefinite" path="M270 0H0" />
              </circle>
            </g>

            <g transform="translate(545 230)">
              <path className="bu-path" d="M0 0H270" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
              <path d="M118 -28L172 0L118 28Z" fill="#ffffff" stroke="#111827" strokeWidth="5" strokeLinejoin="round" />
              <path d="M180 -30V30" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
              <text x="112" y="-50" fill="#111827" fontSize="15" fontWeight="900">Diode</text>
              <path d="M35 -42H116" stroke="#059669" strokeWidth="4" strokeLinecap="round" markerEnd="url(#buGreenArrow)" />
              <text x="36" y="-58" fill="#047857" fontSize="14" fontWeight="900">forward flow</text>
              <g className="bu-diode-block" transform="translate(222 0)">
                <circle r="24" fill="#fee2e2" stroke="#dc2626" strokeWidth="4" />
                <path d="M-10 -10L10 10M10 -10L-10 10" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
              </g>
              <text className="bu-diode-block" x="150" y="68" fill="#dc2626" fontSize="14" fontWeight="900">reverse blocked</text>
              <circle className="bu-forward-dot" r="7" fill="#10b981">
                <animateMotion dur="5.5s" repeatCount="indefinite" path="M0 0H175" />
              </circle>
              <circle className="bu-blocked-dot" r="7" fill="#fb923c">
                <animateMotion dur="5.5s" begin="-2.75s" repeatCount="indefinite" path="M270 0H190" />
              </circle>
            </g>

            <rect x="265" y="355" width="370" height="36" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <text x="286" y="378" fill="#0f172a" fontSize="14" fontWeight="900">
              Direction decides whether behavior stays same or changes.
            </text>
          </svg>
          </div>
        </div>

        <div className="hidden gap-3 md:grid lg:grid-cols-2">
          <div className="grid gap-2.5">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-blue-700">
              Bilateral element
            </p>
            {stepPairs.map((step) => (
              <div
                key={`bilateral-${step.number}`}
                className={`bu-stage-card bu-stage-pair-${step.number} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-portal-700">
                  Step {step.number}: {step.bilateralTitle}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{step.bilateralText}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-2.5">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-orange-700">
              Unilateral element
            </p>
            {stepPairs.map((step) => (
              <div
                key={`unilateral-${step.number}`}
                className={`bu-stage-card bu-stage-pair-${step.number} rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-orange-700">
                  Step {step.number}: {step.unilateralTitle}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{step.unilateralText}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
          <h6 className="text-sm font-extrabold text-slate-950">Examples and behavior</h6>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-700 lg:grid-cols-3">
            <div className="rounded-lg border border-blue-200 bg-white p-3">
              <p className="font-bold text-blue-800">Bilateral examples</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Resistor, inductor, and capacitor. Their resistance or impedance is the
                same for either current direction in ideal circuit analysis.
              </p>
            </div>
            <div className="rounded-lg border border-orange-200 bg-white p-3">
              <p className="font-bold text-orange-800">Unilateral examples</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Diode and transistor. Their behavior depends on polarity, biasing, and
                allowed current direction.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-white p-3">
              <p className="font-bold text-emerald-800">Final concept</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Bilateral elements treat current direction equally. Unilateral elements
                control or restrict current based on direction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BasicConceptCircuitDiagramGallery() {
  const diagrams = [
    {
      type: "basic-circuit",
      title: "Voltage, current, and resistance",
      note: "Mark the source polarity, current direction, and resistor voltage before writing equations.",
    },
    {
      type: "power-direction",
      title: "Power and energy direction",
      note: "The passive sign convention tells whether an element absorbs or delivers power.",
    },
    {
      type: "basic-elements",
      title: "Element behavior",
      note: "Passive storage and direction-dependent behavior are easier to compare with circuit symbols.",
    },
  ];

  return (
    <div className="grid gap-4">
      {diagrams.map((diagram) => (
        <article key={diagram.type} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <h4 className="text-sm font-black text-slate-950">{diagram.title}</h4>
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-100 bg-slate-50/70 p-2">
            <NetworkTheoryDiagram type={diagram.type} />
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{diagram.note}</p>
        </article>
      ))}
    </div>
  );
}

export function BasicConceptGuideContent({ withIntro = true }) {
  return (
    <div
      id="fundamental-electrical-concepts"
      className={`basic-concept-guide-content ${
        withIntro ? "mt-5 scroll-mt-40 border-t border-slate-200 pt-4" : "scroll-mt-40"
      }`}
    >
      {withIntro ? (
        <>
          <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
            Fundamental Electrical Concepts
          </h3>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-800">
            These ideas form the base of Network Analysis. Learn them first, then KCL,
            KVL, and circuit theorems become much easier to understand.
          </p>
        </>
      ) : null}
      <div className={withIntro ? "mt-4 divide-y divide-slate-200" : "divide-y divide-slate-200"}>
        {BASIC_CONCEPT_GUIDE.map((concept, conceptIndex) => (
          <section
            key={concept.title}
            id={`basic-concept-${toAnchorId(concept.title)}`}
            className="scroll-mt-40 py-5 first:pt-0 last:pb-0"
          >
            {conceptIndex === 0 ? (
              <ProfessionalChargeCircuitGuide />
            ) : conceptIndex === 1 ? (
              <PowerEnergyGuide />
            ) : conceptIndex === 2 ? (
              <PassiveActiveGuide />
            ) : conceptIndex === 3 ? (
              <LinearNonLinearGuide />
            ) : conceptIndex === 4 ? (
              <BilateralUnilateralGuide />
            ) : (
              <>
                <h4 className="text-base font-bold text-slate-900">
                  {conceptIndex + 1}. {concept.title}
                </h4>
                <div className="mt-3 grid gap-4">
                  {concept.sections.map((section) => (
                    <div key={section.heading}>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h5 className="text-sm font-bold text-slate-900">{section.heading}</h5>
                        {section.formula ? (
                          <code className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-portal-700">
                            {section.formula}
                          </code>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{section.body}</p>
                      {section.points?.length ? (
                        <ul className="mt-2 grid gap-1.5 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                          {section.points.map((point) => (
                            <li key={point} className="flex gap-2">
                              <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {section.keyIdea ? (
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                          Key idea: {section.keyIdea}
                        </p>
                      ) : null}
                      {section.animation ? (
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                          Animation idea:{" "}
                          <span className="font-medium normal-case tracking-normal text-slate-600">
                            {section.animation}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

function BasicConceptTopicSection({ id, title, children }) {
  return (
    <section
      id={id}
      className="min-w-0 scroll-mt-28 overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
      <div className="mt-3 grid min-w-0 gap-3 text-sm leading-7 text-slate-700 sm:text-base">
        {children}
      </div>
    </section>
  );
}

function NetworkOverviewPanel({ overviewCards = [] }) {
  return (
    <section className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {overviewCards.map((item) => (
          <article
            key={item.title}
            className={item.points?.length ? "lg:col-span-2" : ""}
          >
            <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
              {item.title}
            </h2>
            {item.description ? (
              <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
                {item.description}
              </p>
            ) : null}
            {item.points?.length ? (
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function DigitalOverviewPanel() {
  return (
    <section className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Is Digital Electronics?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            Digital Electronics is the study of circuits that represent information
            using discrete logic levels, mainly 0 and 1. It explains how numbers,
            codes, gates, Boolean expressions, combinational circuits, flip-flops,
            counters, registers, memories, and converters work together to build
            digital systems.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Why Do We Study It?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            We study this chapter because GATE, PSU exams, interviews, and practical
            electronics all depend on digital logic. A strong Digital Electronics base
            helps you simplify logic expressions, design circuit blocks, analyze
            sequential behavior, and answer objective questions quickly.
          </p>
        </article>

        <article className="lg:col-span-2">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Will You Learn?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            For Graduate Aptitude Test in Engineering and PSU exams, prepare Digital
            Electronics in a structured format: Chapter - Topics - Subtopics.
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            {[
              "Number systems, conversions, binary arithmetic, and codes.",
              "Logic gates, Boolean algebra, De Morgan's theorem, SOP, and POS forms.",
              "K-map simplification, grouping, prime implicants, and don't-care conditions.",
              "Combinational circuits such as adders, subtractors, MUX, DEMUX, encoders, decoders, and comparators.",
              "Sequential circuits including latches, flip-flops, counters, registers, and shift registers.",
              "Logic families, memories, ADC, DAC, timing circuits, clocks, and applications.",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

    </section>
  );
}

function ElectromagneticTheoryOverviewPanel() {
  return (
    <section className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Is Electromagnetic Theory?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            Electromagnetic Theory explains how electric fields, magnetic fields,
            charges, currents, waves, guided structures, and antennas behave. It
            connects electrostatics, magnetostatics, induction, Maxwell equations,
            transmission lines, waveguides, and radiation into one field-based
            subject.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Why Do We Study It?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            We study this chapter because GATE, PSU exams, microwave engineering,
            antenna systems, communication links, shielding, radar, and high-speed
            circuits all depend on electromagnetic field behavior. A structured
            chapter flow makes formulas easier to remember and numericals easier to
            attack.
          </p>
        </article>

        <article className="lg:col-span-2">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Will You Learn?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            For Graduate Aptitude Test in Engineering and PSU exams, prepare
            Electromagnetic Theory in a structured format: Chapter - Topics -
            Subtopics.
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            {[
              "Vector calculus, coordinate systems, gradient, divergence, curl, Gauss theorem, and Stokes theorem.",
              "Electrostatics including Coulomb's law, electric field, flux density, Gauss law, potential, and energy density.",
              "Conductors, dielectrics, boundary conditions, capacitance, polarization, and permittivity.",
              "Magnetostatics, Biot-Savart law, Ampere's law, magnetic flux density, potentials, forces, and torque.",
              "Electromagnetic induction, Faraday's law, Lenz's law, inductance, and magnetic-field energy.",
              "Maxwell equations, electromagnetic waves, transmission lines, waveguides, antennas, EMC, microwave applications, and radar basics.",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function VlsiDesignOverviewPanel() {
  return (
    <section className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Is VLSI Design?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            VLSI Design deals with the design and fabrication of highly integrated
            semiconductor circuits using CMOS technology for implementing digital
            systems with optimized speed, power, and area.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Why Do We Study It?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            We study this chapter because GATE, PSU exams, interviews, and chip
            design roles frequently test MOS transistor behavior, CMOS logic,
            fabrication, layout, delay, power, scaling, testing, and HDL-based
            implementation.
          </p>
        </article>

        <article className="lg:col-span-2">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Will You Learn?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            For Graduate Aptitude Test in Engineering and PSU exams, prepare VLSI
            Design in a structured format: Chapter - Topics - Subtopics. Use the
            hamburger menu to open the complete chapter and topic hierarchy.
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            {[
              "VLSI basics, SSI, MSI, LSI, VLSI, ULSI, Moore's Law, design flow, applications, fabrication, and testing.",
              "MOSFET structure, NMOS, PMOS, CMOS transistors, cutoff, linear, saturation, threshold voltage, and current-voltage characteristics.",
              "CMOS inverter, static CMOS NAND and NOR gates, dynamic CMOS logic, transmission gates, and pass transistor logic.",
              "IC fabrication including oxidation, diffusion, ion implantation, lithography, N-well and P-well processes, CMOS fabrication steps, and design rules.",
              "Full custom, semi-custom, standard cell, gate array, FPGA basics, stick diagrams, layout rules, lambda rules, and CMOS layout techniques.",
              "Combinational and sequential VLSI circuits, interconnect effects, delay, power, scaling, short-channel effects, testing, DFT, BIST, HDL, RTL, synthesis, and CAD tools.",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function AntennaWavePropagationOverviewPanel() {
  return (
    <section className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Is Antenna & Wave Propagation?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            Antenna and Wave Propagation explains how electromagnetic energy is
            radiated, received, directed, polarized, measured, and carried through
            ground wave, sky wave, and space wave paths.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Why Do We Study It?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            We study this subject because GATE, PSU exams, wireless links, radar,
            satellite systems, and mobile communication all depend on antenna
            parameters, dipole behavior, arrays, Friis equation, and propagation
            mechanisms.
          </p>
        </article>

        <article className="lg:col-span-2">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Will You Learn?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            For Graduate Aptitude Test in Engineering and PSU exams, prepare
            Antenna and Wave Propagation in a structured format: Chapter - Topics -
            Subtopics. Use the hamburger menu to open the complete hierarchy.
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            {[
              "Antenna basics, radiation mechanism, antenna types, radiation pattern, beamwidth, directivity, gain, and efficiency.",
              "Radiation intensity, power density, effective aperture, polarization, and Friis transmission equation.",
              "Hertzian dipole, half-wave dipole, quarter-wave monopole, radiation resistance, and current distribution.",
              "Antenna arrays including broadside arrays, end-fire arrays, array factor, pattern multiplication, and phased arrays.",
              "Special antennas such as loop, helical, horn, parabolic reflector, and microstrip patch antennas.",
              "Ground wave, sky wave, space wave, ionosphere, critical frequency, MUF, LOS links, measurements, smart antennas, and MIMO basics.",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function DigitalSignalProcessingOverviewPanel() {
  return (
    <section className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Is Digital Signal Processing?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            Digital Signal Processing deals with the analysis and processing of
            discrete-time signals using mathematical algorithms, transforms, and
            digital filters for efficient signal representation and system design.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Why Do We Study It?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            We study DSP because GATE and PSU exams frequently test convolution,
            Z-transform, DFT, FFT, sampling theorem, FIR/IIR filters, and filter
            design. A structured chapter flow makes transform analysis and
            numerical solving faster.
          </p>
        </article>

        <article className="lg:col-span-2">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Will You Learn?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            For Graduate Aptitude Test in Engineering and PSU exams, prepare
            Digital Signal Processing in a structured format: Chapter - Topics -
            Subtopics. Use the hamburger menu to open the complete chapter and
            topic hierarchy.
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            {[
              "DSP basics, analog signals, digital signals, applications, and basic DSP system flow.",
              "Discrete-time signals, signal operations, linearity, time invariance, causality, and stability.",
              "Linear convolution, circular convolution, auto-correlation, and cross-correlation.",
              "Z-transform, ROC, inverse Z-transform, and system analysis using Z-transform.",
              "DFT, FFT, circular convolution using DFT, spectrum analysis, DIT, DIF, and butterfly computation.",
              "FIR filters, IIR filters, filter design, sampling theorem, aliasing, reconstruction, quantization noise, DSP processors, and applications.",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function MicroprocessorsOverviewPanel() {
  return (
    <section className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Are Microprocessors?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            Microprocessors are programmable digital processors that fetch
            instructions from memory, decode them, execute operations, and control
            data movement through buses, registers, memory, and input/output
            devices. They form the processing core behind computers, controllers,
            instruments, and embedded systems.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Why Do We Study It?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            We study Microprocessors because GATE, PSU exams, interviews, and
            university exams frequently test architecture, instruction execution,
            addressing modes, timing diagrams, interrupts, memory interfacing, I/O
            interfacing, 8255, and 8086 fundamentals.
          </p>
        </article>

        <article className="lg:col-span-2">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Will You Learn?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            For Graduate Aptitude Test in Engineering and PSU exams, prepare
            Microprocessors in a structured format: Chapter - Topics - Subtopics.
            Use the hamburger menu to open the complete chapter hierarchy.
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            {[
              "Microprocessor basics, evolution, applications, CPU, memory, I/O devices, and system bus.",
              "8085 architecture including ALU, accumulator, flags, program counter, stack pointer, buses, pins, and timing control.",
              "Instruction set, addressing modes, opcode, operand, assembly programming, loops, branching, sorting, and delay generation.",
              "Timing diagrams, machine cycles, opcode fetch, memory read/write, and I/O read/write cycles.",
              "Interrupts, interrupt priority, interrupt handling, memory interfacing, address decoding, and memory mapping.",
              "I/O interfacing, programmed I/O, interrupt-driven I/O, DMA, 8255 PPI, 8086 architecture, segmentation, and embedded basics.",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function EmbeddedSystemsOverviewPanel() {
  return (
    <section className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Are Embedded Systems?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            Embedded Systems combine hardware and software to perform dedicated
            tasks inside products such as consumer electronics, automobiles,
            industrial controllers, medical devices, IoT nodes, robots, and
            real-time instruments.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Why Do We Study It?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            We study this subject because GATE, PSU exams, interviews, and
            practical engineering frequently test microcontrollers, Embedded C,
            interrupts, timers, interfacing, protocols, RTOS basics, memory,
            power optimization, and design validation.
          </p>
        </article>

        <article className="lg:col-span-2">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Will You Learn?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            For Graduate Aptitude Test in Engineering and PSU exams, prepare
            Embedded Systems in a structured format: Chapter - Topics - Subtopics.
            Use the hamburger menu to open the complete hierarchy.
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            {[
              "Embedded-system basics, characteristics, standalone systems, real-time systems, networked systems, mobile systems, and applications.",
              "Embedded architecture including processor, memory, I/O, sensors, actuators, ADC, DAC, timers, counters, firmware, drivers, and middleware.",
              "Microcontrollers including 8051 architecture, CPU, RAM, ROM, I/O ports, timers, serial communication, ARM basics, and registers.",
              "Embedded C programming including data types, variables, bitwise operations, functions, pointers, and interrupt programming.",
              "Interfacing and protocols including LED, LCD, keyboard, sensors, motors, UART, SPI, I2C, CAN, USB, timers, counters, watchdog, and PWM.",
              "RTOS, tasks, scheduling, semaphores, mutex, IPC, memory organization, EEPROM, Flash, cache, power optimization, low-power modes, design flow, validation, IoT, wireless, automotive, robotics, and AI applications.",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function SignalsOverviewPanel() {
  return (
    <section className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Is Signals and Systems?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            Signals and Systems explains how information varies with time and how
            physical or electronic systems modify that information. A signal may be
            voltage, current, sound, image intensity, sensor data, or a mathematical
            waveform. A system receives a signal, processes it, and produces another
            signal.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Why Do We Study It?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            This subject is the mathematical language behind communication systems,
            control systems, DSP, filters, modulation, sampling, and circuit response.
            In GATE and PSU exams, it is also one of the fastest scoring subjects when
            convolution, transforms, ROC, and sampling are understood clearly.
          </p>
        </article>

        <article className="lg:col-span-2">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Will You Learn?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            For Graduate Aptitude Test in Engineering and PSU exams, prepare Signals
            and Systems in a structured format: Chapter - Topics - Subtopics.
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            {[
              "Signal definitions, classifications, and standard signals.",
              "System properties such as linearity, time invariance, causality, and stability.",
              "Signal operations including shifting, scaling, reversal, and decomposition.",
              "Convolution and LTI system response from input and impulse response.",
              "Fourier series, Fourier transform, Laplace transform, and Z-transform.",
              "Sampling theorem, aliasing, frequency response, and filters.",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function CommunicationSystemsOverviewPanel() {
  return (
    <section className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Is Communication Systems?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            Communication Systems deals with the transmission, modulation,
            reception, and processing of information signals efficiently and
            reliably through wired and wireless channels.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Why Do We Study It?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            This subject builds the foundation for analog and digital
            communication, broadcasting, mobile links, receivers, noise
            analysis, and information theory. In GATE and PSU exams, it becomes
            much easier when studied in a structured chapter hierarchy.
          </p>
        </article>

        <article className="lg:col-span-2">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Will You Learn?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            For Graduate Aptitude Test in Engineering and PSU exams, prepare
            Communication Systems in a structured format: Chapter - Topics -
            Subtopics.
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            {[
              "Communication basics including source, transmitter, channel, receiver, and spectrum.",
              "Signal spectra, bandwidth, and power spectral density.",
              "Analog modulation topics such as AM, FM, PM, modulation index, and demodulation.",
              "Sampling theorem, pulse modulation, PCM, quantization, and delta modulation.",
              "Digital modulation techniques including ASK, FSK, PSK, QPSK, and QAM.",
              "Noise, SNR, information theory, channel capacity, receivers, and propagation basics.",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function ControlSystemsOverviewPanel() {
  return (
    <section className="mb-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Is Control Systems?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            Control Systems studies how a system output is regulated using input,
            feedback, modeling, stability analysis, and design. It explains how
            practical systems such as speed controllers, temperature controllers,
            voltage regulators, robotics, and automation loops behave.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Why Do We Study It?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            For Graduate Aptitude Test in Engineering and PSU exams, Control Systems
            should be studied in a structured hierarchy. This structure helps for
            conceptual understanding, numerical problem solving, quick revision, and
            interview preparation.
          </p>
        </article>

        <article className="lg:col-span-2">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            What Will You Learn?
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            For Graduate Aptitude Test in Engineering and PSU exams, prepare Control
            Systems in a structured format: Chapter - Topics - Subtopics.
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            {[
              "Introduction to open-loop, closed-loop, linear, nonlinear, continuous, and discrete systems.",
              "Mathematical modeling using transfer functions, differential equations, and analogous systems.",
              "Block diagram reduction, signal flow graph, and Mason's gain formula.",
              "Time response analysis, steady-state error, and stability using Routh-Hurwitz criterion.",
              "Root locus, Bode plot, Nyquist plot, gain margin, and phase margin.",
              "PID controllers, compensators, state space analysis, controllability, and observability.",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function ControlSystemsSyllabusSection() {
  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Control Systems Structure
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Chapter - Topics - Subtopics
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            For Graduate Aptitude Test in Engineering and PSU exams, study Control
            Systems in this order. Keep the chapter as the big unit, topics as the
            revision blocks, and subtopics as the exact checklist for notes,
            numericals, and interview preparation.
          </p>
        </div>
        <div className="rounded-2xl border border-portal-200 bg-portal-50 px-4 py-3">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
            Study Hierarchy
          </p>
          <p className="mt-1 text-sm font-black text-slate-950">
            Chapter - Topics - Subtopics
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {CONTROL_SYSTEMS_CHAPTERS.map((chapter, chapterIndex) => (
          <article
            key={chapter.title}
            id={`control-systems-chapter-${chapterIndex + 1}`}
            className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
              Chapter {chapterIndex + 1}
            </p>
            <h3 className="mt-1 text-lg font-bold leading-snug tracking-tight text-slate-950">
              {chapter.title}
            </h3>

            <div className="mt-3 grid gap-3">
              {chapter.topics.map((topic, topicIndex) => (
                <div
                  key={topic.title}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3"
                >
                  <div className="flex gap-3">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-portal-50 text-[11px] font-black text-portal-700">
                      {chapterIndex + 1}.{topicIndex + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-black leading-5 text-slate-950">
                        {topic.title}
                      </p>
                      {topic.formula ? (
                        <p className="mt-2 overflow-x-auto rounded-lg border border-portal-100 bg-[#f8fbff] px-3 py-2 font-mono text-xs font-bold text-slate-900">
                          {topic.formula.replaceAll("$$", "")}
                        </p>
                      ) : null}
                      {topic.subtopics.length ? (
                        <ul className="mt-2 grid gap-1.5 text-sm leading-5 text-slate-700">
                          {topic.subtopics.map((subtopic) => (
                            <li key={subtopic} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                              <span>{subtopic}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OverviewRow({ item }) {
  return (
    <article className="py-5 first:pt-0 last:pb-0">
      <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
        {item.title}
      </h2>

      {item.description ? (
        <p className="mt-2 text-base leading-8 text-slate-700">{item.description}</p>
      ) : null}
      {item.points?.length ? (
        <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-700 sm:grid-cols-2 sm:text-base">
          {item.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span className="mt-3 h-2 w-2 flex-none rounded-full bg-portal-600" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}
        {item.showBasicConceptGuide ? (
        <BasicConceptCircuitDiagramGallery />
      ) : null}
    </article>
  );
}

function ConceptRoadmapItem({ concept, index, isActive, status, onClick }) {
  const statusLabel =
    status === "current" ? "Current" : status === "review" ? "Review" : "Next";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
        isActive
          ? "border-portal-300 bg-portal-50 shadow-sm"
          : "border-transparent bg-slate-50 hover:border-slate-200 hover:bg-white"
      }`}
    >
      <div className="flex gap-3">
        <span
          className={`flex h-9 w-9 flex-none items-center justify-center rounded-full text-xs font-bold ${
            isActive ? "bg-portal-600 text-white" : "bg-white text-slate-700"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-5 text-slate-900">{concept.shortTitle}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            {statusLabel}
          </p>
        </div>
      </div>
    </button>
  );
}

function NetworkTopicList({ compact = false, concepts = [], activeIndex = 0, onNavigateTopic }) {
  const router = useRouter();

  function getTopicTargetIndex(title) {
    if (NETWORK_TOPIC_TARGET_ANCHORS[title]) {
      return 0;
    }

    const targetSlug = NETWORK_TOPIC_TARGET_SLUGS[title];
    const conceptIndex = concepts.findIndex((concept) => concept.slug === targetSlug);
    return conceptIndex >= 0 ? conceptIndex + 1 : 1;
  }

  function handleTopicNavigate() {
    if (!onNavigateTopic) {
      return;
    }

    onNavigateTopic();
  }

  return (
    <div className={compact ? "grid gap-2.5" : "grid gap-2.5"}>
      {NETWORK_ANALYSIS_TOPIC_GROUPS.filter((group) => NETWORK_TOPIC_ROUTES[group.title]).map((group, index) => {
        const targetIndex = getTopicTargetIndex(group.title);
        const routeHref = NETWORK_TOPIC_ROUTES[group.title];
        const isActive = activeIndex === targetIndex;
        const className = `flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
          isActive || router.pathname === routeHref
            ? "border-portal-300 bg-portal-50 shadow-sm"
            : "border-slate-200 bg-slate-50/80 hover:border-portal-200 hover:bg-white"
        }`;
        const content = (
          <>
            <span
              className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg text-[11px] font-black shadow-sm ${
                isActive || router.pathname === routeHref ? "bg-portal-600 text-white" : "bg-white text-portal-700"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-bold leading-5 text-slate-900">{group.title}</span>
          </>
        );

        return (
          <Link
            key={group.title}
            onClick={handleTopicNavigate}
            href={routeHref}
            className={className}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}

function MobileConceptRoadmap({ concepts, activeIndex }) {
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

  function closeRoadmap() {
    setIsRoadmapOpen(false);
  }

  return (
    <section id="subject-roadmap" className="mt-5 scroll-mt-40 xl:hidden">
      <div className="rounded-2xl border border-portal-200 bg-white shadow-[0_16px_34px_rgba(15,50,112,0.12)]">
        <button
          type="button"
          onClick={() => setIsRoadmapOpen((currentValue) => !currentValue)}
          className="flex w-full items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-portal-50 via-white to-blue-50 px-4 py-3 text-left"
          aria-expanded={isRoadmapOpen}
          aria-controls="mobile-concept-roadmap"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-portal-600 text-white shadow-[0_10px_20px_rgba(18,59,121,0.24)]">
              {isRoadmapOpen ? (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-black text-slate-950">Learning Roadmap</span>
              <span className="mt-0.5 block truncate text-xs font-semibold leading-5 text-portal-700">
                Main Network Analysis topics
              </span>
            </span>
          </span>
          <span className="flex flex-none items-center gap-2 rounded-full border border-portal-200 bg-white px-3 py-1.5 text-xs font-bold text-portal-700 shadow-sm">
            {isRoadmapOpen ? "Close" : "Open"}
          </span>
        </button>

        {isRoadmapOpen ? (
          <div id="mobile-concept-roadmap" className="border-t border-slate-200 px-3 py-3">
            <NetworkTopicList
              compact
              concepts={concepts}
              activeIndex={activeIndex}
              onNavigateTopic={closeRoadmap}
            />

          </div>
        ) : null}
      </div>
    </section>
  );
}

function NetworkTopicMenu({ concepts, activeIndex }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRootRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!menuRootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div ref={menuRootRef} className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Network Analysis topics"
        aria-expanded={isOpen}
        aria-controls="network-topic-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="network-topic-menu"
          className="absolute right-0 z-30 mt-2 max-h-[70vh] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <NetworkTopicList
            compact
            concepts={concepts}
            activeIndex={activeIndex}
            onNavigateTopic={closeMenu}
          />
        </div>
      ) : null}
    </div>
  );
}

function SubjectConceptMenu({ subjectTitle, concepts = [], activeIndex = 0, onSelectTopic }) {
  const [isOpen, setIsOpen] = useState(false);

  function selectTopic(index) {
    onSelectTopic(index);
    setIsOpen(false);
  }

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label={`Open ${subjectTitle} concepts`}
        aria-expanded={isOpen}
        aria-controls="subject-concept-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="subject-concept-menu"
          className="absolute right-0 z-30 mt-2 max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="grid gap-2.5">
            <button
              type="button"
              onClick={() => selectTopic(0)}
              className={`rounded-xl border p-3 text-left transition ${
                activeIndex === 0
                  ? "border-portal-300 bg-portal-50"
                  : "border-slate-200 bg-[#f8fbff] hover:border-portal-300 hover:bg-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white text-xs font-black text-portal-700 shadow-sm">
                  00
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black text-slate-950">
                    Overview
                  </span>
                </span>
              </span>
            </button>

            {concepts.map((concept, index) => {
              const href =
                subjectTitle === "Analog Electronics" &&
                concept.slug === "diodes-and-pn-junction"
                  ? "/diodes"
                  : subjectTitle === "Analog Electronics" &&
                    concept.slug === "transistor-basics"
                  ? "/bjt-and-mosfet"
                  : subjectTitle === "Analog Electronics" &&
                    concept.slug === "amplifier-fundamentals"
                  ? "/amplifiers"
                  : "";
              const className = `rounded-xl border p-3 text-left transition ${
                activeIndex === index + 1
                  ? "border-portal-300 bg-portal-50"
                  : "border-slate-200 bg-[#f8fbff] hover:border-portal-300 hover:bg-white"
              }`;
              const content = (
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white text-xs font-black text-portal-700 shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black text-slate-950">
                      {concept.shortTitle}
                    </span>
                  </span>
                </span>
              );

              if (href) {
                return (
                  <Link
                    key={concept.slug}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={className}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={concept.slug}
                  type="button"
                  onClick={() => selectTopic(index + 1)}
                  className={className}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DigitalChapterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Digital Electronics topics"
        aria-expanded={isOpen}
        aria-controls="digital-chapter-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="digital-chapter-menu"
          className="absolute right-0 z-30 mt-2 max-h-[72vh] w-[min(26rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="grid gap-2">
            {DIGITAL_ELECTRONICS_CHAPTERS.map((chapter, chapterIndex) => {
              const routeHref = DIGITAL_CHAPTER_ROUTES[chapter.title] || "/subjects/digital-electronics";

              return (
                <Link
                  key={chapter.title}
                  href={routeHref}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
                >
                  <span className="flex items-start gap-2.5">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                      {String(chapterIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-black leading-snug text-slate-950">
                        {chapter.title}
                      </span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ElectromagneticTheoryChapterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Electromagnetic Theory chapters"
        aria-expanded={isOpen}
        aria-controls="electromagnetic-theory-chapter-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="electromagnetic-theory-chapter-menu"
          className="absolute right-0 z-30 mt-2 max-h-[72vh] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="grid gap-2">
            {ELECTROMAGNETIC_THEORY_CHAPTERS.map((chapter, chapterIndex) => {
              const routeHref =
                ELECTROMAGNETIC_CHAPTER_ROUTES[chapter.title] ||
                "/subjects/electromagnetic-theory";

              return (
              <Link
                key={chapter.title}
                href={routeHref}
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
              >
                <span className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                    {String(chapterIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black leading-snug text-slate-950">
                      {chapter.title}
                    </span>
                  </span>
                </span>
              </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AntennaWavePropagationChapterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Antenna and Wave Propagation chapters"
        aria-expanded={isOpen}
        aria-controls="antenna-wave-propagation-chapter-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="antenna-wave-propagation-chapter-menu"
          className="absolute right-0 z-30 mt-2 max-h-[72vh] w-[min(30rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="grid gap-2">
            {ANTENNA_WAVE_PROPAGATION_CHAPTERS.map((chapter, chapterIndex) => (
              <Link
                key={chapter.title}
                href={ANTENNA_TOPIC_ROUTES[chapterIndex] || "/subjects/antenna-and-wave-propagation"}
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
              >
                <span className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                    {String(chapterIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black leading-snug text-slate-950">
                      {chapter.title}
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function VlsiDesignChapterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open VLSI Design chapters"
        aria-expanded={isOpen}
        aria-controls="vlsi-design-chapter-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="vlsi-design-chapter-menu"
          className="absolute right-0 z-30 mt-2 max-h-[72vh] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
              VLSI Design Structure
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-700">
              Chapter - Topics - Subtopics for GATE/PSU revision.
            </p>
          </div>

          <div className="mb-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-700">
              Most Important Topics
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {VLSI_HIGH_WEIGHTAGE_TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[11px] font-bold text-portal-700"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            {VLSI_DESIGN_CHAPTERS.map((chapter, chapterIndex) => (
              <Link
                key={chapter.title}
                href={VLSI_TOPIC_ROUTES[chapterIndex] || `#vlsi-chapter-${chapterIndex + 1}`}
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
              >
                <span className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                    {String(chapterIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black leading-snug text-slate-950">
                      {chapter.title}
                    </span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-slate-600">
                      {chapter.topics.map((topic) => topic.title).join(", ")}
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DigitalSignalProcessingChapterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Digital Signal Processing chapters"
        aria-expanded={isOpen}
        aria-controls="digital-signal-processing-chapter-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="digital-signal-processing-chapter-menu"
          className="absolute right-0 z-30 mt-2 max-h-[72vh] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
              Digital Signal Processing Structure
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-700">
              Chapter - Topics - Subtopics for GATE/PSU revision.
            </p>
          </div>

          <div className="mb-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-700">
              Most Important Topics
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {DIGITAL_SIGNAL_PROCESSING_HIGH_WEIGHTAGE_TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[11px] font-bold text-portal-700"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            {DIGITAL_SIGNAL_PROCESSING_CHAPTERS.map((chapter, chapterIndex) => {
              const routeHref =
                DIGITAL_SIGNAL_PROCESSING_CHAPTER_ROUTES[chapter.title] ||
                "/subjects/digital-signal-processing";

              return (
                <Link
                  key={chapter.title}
                  href={routeHref}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
                >
                  <span className="flex items-start gap-2.5">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                      {String(chapterIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-black leading-snug text-slate-950">
                        {chapter.title}
                      </span>
                      <span className="mt-1 block text-xs font-semibold leading-5 text-slate-600">
                        {chapter.topics.map((topic) => topic.title).join(", ")}
                      </span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MicroprocessorsChapterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Microprocessors chapters"
        aria-expanded={isOpen}
        aria-controls="microprocessors-chapter-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="microprocessors-chapter-menu"
          className="absolute right-0 z-30 mt-2 max-h-[72vh] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
              Microprocessors Structure
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-700">
              Chapter - Topics - Subtopics for GATE/PSU revision.
            </p>
          </div>

          <div className="mb-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-700">
              Most Important Topics
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {MICROPROCESSORS_HIGH_WEIGHTAGE_TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[11px] font-bold text-portal-700"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            {MICROPROCESSORS_CHAPTERS.map((chapter, chapterIndex) => {
              const routeHref =
                MICROPROCESSORS_CHAPTER_ROUTES[chapter.title] ||
                "/subjects/microprocessors";

              return (
              <Link
                key={chapter.title}
                href={routeHref}
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
              >
                <span className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                    {String(chapterIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black leading-snug text-slate-950">
                      {chapter.title}
                    </span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-slate-600">
                      {chapter.topics.map((topic) => topic.title).join(", ")}
                    </span>
                  </span>
                </span>
              </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function EmbeddedSystemsChapterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Embedded Systems chapters"
        aria-expanded={isOpen}
        aria-controls="embedded-systems-chapter-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="embedded-systems-chapter-menu"
          className="absolute right-0 z-30 mt-2 max-h-[72vh] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
              Embedded Systems Structure
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-700">
              Chapter - Topics - Subtopics for GATE/PSU revision.
            </p>
          </div>

          <div className="mb-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-700">
              Most Important Topics
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {EMBEDDED_SYSTEMS_HIGH_WEIGHTAGE_TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[11px] font-bold text-portal-700"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            {EMBEDDED_SYSTEMS_CHAPTERS.map((chapter, chapterIndex) => (
              <Link
                key={chapter.title}
                href={EMBEDDED_SYSTEMS_TOPIC_ROUTES[chapterIndex] || "/subjects/embedded-systems"}
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
              >
                <span className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                    {String(chapterIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black leading-snug text-slate-950">
                      {chapter.title}
                    </span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-slate-600">
                      {chapter.topics.map((topic) => topic.title).join(", ")}
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SignalsChapterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Signals and Systems chapters"
        aria-expanded={isOpen}
        aria-controls="signals-chapter-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="signals-chapter-menu"
          className="absolute right-0 z-30 mt-2 max-h-[72vh] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
              Signals and Systems Structure
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-700">
              Chapter - Topics - Subtopics for GATE/PSU revision.
            </p>
          </div>

          <div className="grid gap-2">
            {SIGNALS_SYSTEMS_CHAPTERS.map((chapter, chapterIndex) => {
              const routeHref =
                chapter.title === "Introduction to Signals"
                  ? "/introduction-to-signals"
                  : chapter.title === "Systems and Their Properties"
                  ? "/systems-and-their-properties"
                  : chapter.title === "Mathematical Representation of Signals"
                  ? "/mathematical-representation-of-signals"
                  : chapter.title === "Convolution"
                  ? "/convolution"
                  : chapter.title === "Fourier Series"
                  ? "/fourier-series"
                  : chapter.title === "Fourier Transform"
                  ? "/fourier-transform"
                  : chapter.title === "Laplace Transform"
                  ? "/laplace-transform"
                  : chapter.title === "Z-Transform"
                  ? "/z-transform"
                  : chapter.title === "Sampling Theorem"
                  ? "/sampling-theorem"
                  : chapter.title === "Frequency Response and Filters"
                  ? "/frequency-response-and-filters"
                  : "";
              const content = (
                <span className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                    {String(chapterIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black leading-snug text-slate-950">
                      {chapter.title}
                    </span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-slate-600">
                      {chapter.topics.map((topic) => topic.title).join(", ")}
                    </span>
                  </span>
                </span>
              );

              if (routeHref) {
                return (
                  <Link
                    key={chapter.title}
                    href={routeHref}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  type="button"
                  key={chapter.title}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CommunicationSystemsChapterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Communication Systems chapters"
        aria-expanded={isOpen}
        aria-controls="communication-systems-chapter-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="communication-systems-chapter-menu"
          className="absolute right-0 z-30 mt-2 max-h-[72vh] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
              Communication Systems Structure
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-700">
              Chapter - Topics - Subtopics for GATE/PSU revision.
            </p>
          </div>

          <div className="grid gap-2">
            {COMMUNICATION_SYSTEMS_CHAPTERS.map((chapter, chapterIndex) => {
              const routeHref =
                chapter.title === "Introduction to Communication Systems"
                  ? "/learn/communications/introduction-to-communication-systems"
                  : chapter.title === "Signals and Spectra"
                  ? "/learn/communications/signals-and-spectra"
                  : chapter.title === "Amplitude Modulation (AM)"
                  ? "/learn/communications/amplitude-modulation"
                  : chapter.title === "Angle Modulation"
                  ? "/learn/communications/angle-modulation"
                  : chapter.title === "Pulse Modulation"
                  ? "/learn/communications/pulse-modulation"
                  : chapter.title === "Digital Communication"
                  ? "/learn/communications/digital-communication"
                  : chapter.title === "Digital Modulation Techniques"
                  ? "/learn/communications/digital-modulation-techniques"
                  : chapter.title === "Noise in Communication Systems"
                  ? "/learn/communications/noise-in-communication-systems"
                  : chapter.title === "Information Theory"
                  ? "/learn/communications/information-theory"
                  : chapter.title === "Communication Receivers"
                  ? "/learn/communications/communication-receivers"
                  : chapter.title === "Antennas and Propagation Basics"
                  ? "/learn/communications/antennas-and-propagation-basics"
                  : "";
              const content = (
                <span className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                    {String(chapterIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black leading-snug text-slate-950">
                      {chapter.title}
                    </span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-slate-600">
                      {chapter.topics.map((topic) => topic.title).join(", ")}
                    </span>
                  </span>
                </span>
              );

              if (routeHref) {
                return (
                  <Link
                    key={chapter.title}
                    href={routeHref}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  type="button"
                  key={chapter.title}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ControlSystemsChapterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Control Systems topics"
        aria-expanded={isOpen}
        aria-controls="control-systems-chapter-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="control-systems-chapter-menu"
          className="absolute right-0 z-30 mt-2 max-h-[72vh] w-[min(28rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
              Control Systems Topics
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-slate-700">
              Jump directly to any Control Systems topic.
            </p>
          </div>

          <div className="grid gap-2">
            {CONTROL_SYSTEMS_CHAPTERS.map((chapter, chapterIndex) => {
              const routeHref =
                chapter.title === "Introduction to Control Systems"
                  ? "/introduction-to-control-systems"
                : chapter.title === "Mathematical Modeling of Systems"
                  ? "/mathematical-modeling-of-systems"
                : chapter.title === "Block Diagram and Signal Flow Graph"
                  ? "/block-diagram-and-signal-flow-graph"
                : chapter.title === "Time Response Analysis"
                  ? "/time-response-analysis"
                : chapter.title === "Stability Analysis"
                  ? "/stability-analysis"
                : chapter.title === "Root Locus Technique"
                  ? "/root-locus-technique"
                : chapter.title === "Frequency Response Analysis"
                  ? "/frequency-response-analysis"
                : chapter.title === "Controllers and Compensators"
                  ? "/controllers-and-compensators"
                : chapter.title === "State Space Analysis"
                  ? "/state-space-analysis"
                : chapter.title === "Control System Design"
                  ? "/control-system-design"
                  : "";
              const content = (
                <span className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                    {String(chapterIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black leading-snug text-slate-950">
                      {chapter.title}
                    </span>
                  </span>
                </span>
              );

              if (routeHref) {
                return (
                  <Link
                    key={chapter.title}
                    href={routeHref}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={chapter.title}
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AnalogChapterMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Analog Electronics chapters"
        aria-expanded={isOpen}
        aria-controls="analog-chapter-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="analog-chapter-menu"
          className="absolute right-0 z-30 mt-2 max-h-[70vh] w-[min(23rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="grid gap-1.5">
            {ANALOG_CHAPTERS.map((chapter) => (
              <Link
                key={chapter.slug}
                href={chapter.route}
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-2.5 text-left transition hover:border-portal-300 hover:bg-white"
              >
                <span className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[11px] font-black text-portal-700 shadow-sm">
                    {String(chapter.number).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black leading-snug text-slate-950">
                      {chapter.title}
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BasicConceptSubtopicMenu({ topics = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  function scrollToTopic(title) {
    const targetId = `basic-concept-${toAnchorId(title)}`;
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsOpen(false);
  }

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label="Open Basic Concepts subtopics"
        aria-expanded={isOpen}
        aria-controls="basic-concepts-subtopic-menu"
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id="basic-concepts-subtopic-menu"
          className="absolute right-0 z-30 mt-2 max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
              Basic Concepts
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">
              Jump to the main topic and view its subtopics.
            </p>
          </div>

          <div className="grid gap-2">
            {topics.map((topic, index) => (
              <button
                key={topic.title}
                type="button"
                onClick={() => scrollToTopic(topic.title)}
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
              >
                <span className="flex items-start gap-3">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white text-xs font-black text-portal-700 shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black text-slate-950">
                      {topic.title}
                    </span>
                    <span className="mt-2 grid gap-1">
                      {topic.sections.map((section) => (
                        <span
                          key={`${topic.title}-${section.heading}`}
                          className="block text-xs font-semibold leading-5 text-slate-700"
                        >
                          {section.heading}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FormulaPreview({ formulas = [] }) {
  if (!formulas.length) {
    return (
      <p className="text-sm leading-6 text-slate-600">
        Formula highlights for this concept will appear here.
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {formulas.map((formula) => (
        <div
          key={`${formula.label}-${formula.expression}`}
          className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {formula.label}
          </p>
          <p className="mt-2 text-base font-bold text-slate-900">{formula.expression}</p>
          {formula.note ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">{formula.note}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function StudyFlowCard({ step, index }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-white text-sm font-bold text-portal-700 shadow-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900">{step.title}</p>
          <div className="mt-3 grid gap-2">
            {step.points.map((point) => (
              <div
                key={`${step.title}-${point}`}
                className="rounded-xl border border-white/80 bg-white px-3 py-2 text-sm leading-6 text-slate-700"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function CircuitVisualizationMovedNotice({ title = "Circuit visualization moved" }) {
  return (
    <div className="grid h-full min-h-[180px] place-items-center rounded-2xl border border-dashed border-portal-200 bg-portal-50/60 p-4 text-center">
      <div className="max-w-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-portal-700">
          AI Diagrams
        </p>
        <h3 className="mt-2 text-base font-bold text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          This circuit visualization is kept in AI Diagrams. Continue here with the
          topic explanation, working steps, and exam notes.
        </p>
        <Link
          href="/diagram-lab"
          className="mt-3 inline-flex justify-center rounded-xl border border-portal-200 bg-white px-3 py-2 text-sm font-bold text-portal-700 transition hover:bg-portal-50"
        >
          Open AI Diagrams
        </Link>
      </div>
    </div>
  );
}

function AnalogChapterMotionDiagram({ mode = "pn", title = "Analog circuit flow" }) {
  return (
    <svg viewBox="0 0 680 330" className="mx-auto h-auto w-[680px] max-w-none md:w-full" role="img" aria-label={`${title} animated circuit flow`}>
      <defs>
        <marker id={`analog-arrow-${mode}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0 10 5 0 10Z" fill="#154a96" />
        </marker>
      </defs>
      <style>{`
        .analog-flow { stroke-dasharray: 12 10; animation: analogFlow 1.15s linear infinite; }
        .analog-pulse { animation: analogPulse 1.8s ease-in-out infinite; }
        .analog-wave { stroke-dasharray: 360; stroke-dashoffset: 360; animation: analogWave 2.6s ease-in-out infinite; }
        .analog-barrier { animation: analogBarrier 2.2s ease-in-out infinite; transform-origin: center; }
        .analog-channel { animation: analogChannel 2s ease-in-out infinite; transform-origin: center; }
        .analog-charge-a { animation: analogChargeA 2.6s linear infinite; }
        .analog-charge-b { animation: analogChargeB 2.6s linear infinite; }
        @keyframes analogFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -22; } }
        @keyframes analogPulse { 0%,100% { opacity: .32; } 50% { opacity: .95; } }
        @keyframes analogWave { 0% { stroke-dashoffset: 360; } 75%,100% { stroke-dashoffset: 0; } }
        @keyframes analogBarrier { 0%,100% { transform: scaleX(1.15); opacity: .75; } 50% { transform: scaleX(.72); opacity: .35; } }
        @keyframes analogChannel { 0%,100% { transform: scaleY(.28); opacity: .35; } 50% { transform: scaleY(1); opacity: .95; } }
        @keyframes analogChargeA { 0% { transform: translateX(0); opacity: .2; } 20%,80% { opacity: 1; } 100% { transform: translateX(210px); opacity: .2; } }
        @keyframes analogChargeB { 0% { transform: translateX(210px); opacity: .2; } 20%,80% { opacity: 1; } 100% { transform: translateX(0); opacity: .2; } }
      `}</style>

      <rect x="18" y="18" width="644" height="294" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="42" y="56" fill="#0f172a" fontSize="19" fontWeight="900">{title}</text>

      {mode === "pn" ? (
        <>
          <rect x="82" y="104" width="210" height="118" rx="18" fill="#fee2e2" stroke="#fecaca" strokeWidth="2" />
          <rect x="388" y="104" width="210" height="118" rx="18" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="2" />
          <rect className="analog-barrier" x="294" y="94" width="92" height="138" rx="18" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="172" y="92" fill="#991b1b" fontSize="16" fontWeight="900">P-type holes</text>
          <text x="452" y="92" fill="#154a96" fontSize="16" fontWeight="900">N-type electrons</text>
          <text x="294" y="252" fill="#b45309" fontSize="14" fontWeight="900">depletion barrier breathes with bias</text>
          {[0, 1, 2].map((item) => (
            <circle key={`h-${item}`} className="analog-charge-a" cx={118 + item * 46} cy={140 + item * 24} r="8" fill="#dc2626" />
          ))}
          {[0, 1, 2].map((item) => (
            <circle key={`e-${item}`} className="analog-charge-b" cx={420 + item * 46} cy={140 + item * 24} r="8" fill="#154a96" />
          ))}
        </>
      ) : null}

      {mode === "diode" ? (
        <>
          <circle cx="92" cy="166" r="28" fill="#eff6ff" stroke="#154a96" strokeWidth="4" />
          <path d="M82 166c8-18 14 18 22 0s14 18 22 0" fill="none" stroke="#154a96" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M120 166h112M232 126v80l70-40-70-40ZM312 126v80M312 166h116" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M428 136v60M448 136v60M448 166h98" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <path d="M546 166v76H92V194" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path className="analog-flow" d="M126 166h390" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#analog-arrow-${mode})`} />
          <path className="analog-wave" d="M104 260c20-34 40-34 60 0s40 34 60 0 40-34 60 0 40 34 60 0 40-34 60 0" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
          <text x="236" y="106" fill="#154a96" fontSize="14" fontWeight="900">diode conducts only in forward interval</text>
        </>
      ) : null}

      {["bjt", "amplifier"].includes(mode) ? (
        <>
          <path d="M164 156h86M250 98v128M250 122l92-56M250 196l92 56" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <path className="analog-pulse" d="M76 156h154" stroke="#154a96" strokeWidth="6" strokeLinecap="round" markerEnd={`url(#analog-arrow-${mode})`} />
          <path className="analog-flow" d="M346 72c-32 64-32 122 0 178" stroke="#154a96" strokeWidth="5" fill="none" strokeLinecap="round" markerEnd={`url(#analog-arrow-${mode})`} />
          <path className="analog-wave" d="M414 160c20-54 40-54 60 0s40 54 60 0 40-54 60 0" fill="none" stroke={mode === "amplifier" ? "#16a34a" : "#154a96"} strokeWidth="4" strokeLinecap="round" />
          <text x="78" y="132" fill="#154a96" fontSize="14" fontWeight="900">small base signal</text>
          <text x="410" y="238" fill="#154a96" fontSize="14" fontWeight="900">controlled collector output</text>
        </>
      ) : null}

      {mode === "mosfet" ? (
        <>
          <path d="M280 86v160M326 86v160M172 130h84M172 202h84M350 130h130M350 202h130" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <rect className="analog-channel" x="286" y="132" width="34" height="70" rx="9" fill="#16a34a" />
          <path className="analog-pulse" d="M82 166h174" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#analog-arrow-${mode})`} />
          <path className="analog-flow" d="M466 130v72" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#analog-arrow-${mode})`} />
          <path className="analog-wave" d="M500 166c18-42 36-42 54 0s36 42 54 0" fill="none" stroke="#154a96" strokeWidth="4" strokeLinecap="round" />
          <text x="92" y="142" fill="#154a96" fontSize="14" fontWeight="900">gate field controls channel</text>
        </>
      ) : null}

      {["feedback", "oscillator", "opamp", "filter", "supply"].includes(mode) ? (
        <>
          <path d="M88 166h108" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <path d="M196 116h130l64 50-64 50H196Z" fill="#eff6ff" stroke="#154a96" strokeWidth="4" strokeLinejoin="round" />
          <text x="236" y="172" fill="#154a96" fontSize="18" fontWeight="900">
            {mode === "opamp" ? "Op" : mode === "supply" ? "Reg" : mode === "filter" ? "H(s)" : mode === "oscillator" ? "A" : "A"}
          </text>
          <path className="analog-flow" d="M388 166h166" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#analog-arrow-${mode})`} />
          <path className="analog-wave" d="M78 222c16-26 32-26 48 0s32 26 48 0 32-26 48 0" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <path className="analog-wave" d="M438 222c18-42 36-42 54 0s36 42 54 0" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
          <path d="M512 166v70H264V216" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#analog-arrow-${mode})`} />
          <text x="286" y="264" fill="#f97316" fontSize="14" fontWeight="900">
            {mode === "oscillator" ? "positive feedback sustains output" : mode === "supply" ? "feedback holds DC output" : "feedback or RC path shapes function"}
          </text>
          {mode === "filter" ? <path d="M420 106c34 72 80 72 118 0" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" /> : null}
        </>
      ) : null}
    </svg>
  );
}

function AnalogChapterTopicCard({ topic, chapter, topicIndex }) {
  return (
    <article id={`analog-topic-${toAnchorId(topic.title)}`} className="scroll-mt-40 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
          {chapter.number}.{topicIndex + 1}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
            Topic
          </p>
          <h2 className="text-lg font-bold tracking-tight text-slate-950">{topic.title}</h2>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-3">
          {topic.subtopics.map((subtopic, subtopicIndex) => (
            <div key={subtopic} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
              <p className="text-sm font-bold text-slate-950">
                {chapter.number}.{topicIndex + 1}.{subtopicIndex + 1} {subtopic}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Study this subtopic by asking what the input condition is, what device
                region or circuit state is active, how current finds its path, and what
                output quantity is produced. This keeps theory, numerical solving, and
                interview explanation in one clean sequence.
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title={`${topic.title} circuit visualization`} />
        </div>
      </div>
    </article>
  );
}

function SemiconductorSubtopicCard({ lesson, topicIndex, subtopic, subtopicIndex }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
          1.{topicIndex + 1}.{subtopicIndex + 1}
        </span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
            {lesson.title}
          </p>
          <h3 className="text-base font-bold tracking-tight text-slate-950">
            {subtopic.name}
          </h3>
        </div>
      </div>

      <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
        {subtopic.explanation}
      </p>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <h4 className="text-sm font-bold text-slate-950">Step-by-step working</h4>
          <ol className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
            {subtopic.steps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-xl border border-white bg-white px-3 py-2">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-portal-50 text-xs font-black text-portal-700">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title={`${subtopic.name} visualization`} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3">
        <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
          Remember
        </p>
        <p className="mt-1.5 text-sm font-semibold leading-6 text-emerald-950">
          {subtopic.examLine}
        </p>
      </div>
    </article>
  );
}

function SemiconductorFundamentalsDeepDiveContent({ chapter }) {
  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            Chapter 1 / Original Concept Builder
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Semiconductor Fundamentals
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            This chapter explains the hidden control mechanism behind analog devices.
            Instead of memorizing terms, read it as a flow: atoms decide carrier
            availability, materials decide energy needed for conduction, doping chooses
            the majority carrier, and the PN junction converts that carrier control into
            diode action.
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
              GATE/PSU Lens
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-emerald-950">
              Master carrier type, depletion width, barrier potential, and bias direction.
              These four ideas unlock diode, BJT, MOSFET, rectifier, and regulator problems.
            </p>
          </div>
        </div>
        <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title="Semiconductor junction visualization" />
        </div>
      </div>

      <section className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-950">
          Working Steps: From Atom to Junction
        </h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-5">
          {chapter.workingSteps.map((step, index) => (
            <div key={step} className="rounded-2xl border border-white bg-white p-3 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-5">
        {SEMICONDUCTOR_TOPIC_LESSONS.map((lesson, topicIndex) => (
          <section
            key={lesson.title}
            id={`analog-topic-${toAnchorId(lesson.title)}`}
            className="scroll-mt-40 rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-wrap items-start gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
                1.{topicIndex + 1}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
                  Main Topic
                </p>
                <h2 className="text-xl font-bold tracking-tight text-slate-950">
                  {lesson.title}
                </h2>
                <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
                  {lesson.idea}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              {lesson.subtopics.map((subtopic, subtopicIndex) => (
                <SemiconductorSubtopicCard
                  key={subtopic.name}
                  lesson={lesson}
                  topicIndex={topicIndex}
                  subtopic={subtopic}
                  subtopicIndex={subtopicIndex}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function DiodeApplicationDiagram({ visual = "vi", title = "Diode application" }) {
  return (
    <svg viewBox="0 0 680 330" className="mx-auto h-auto w-[680px] max-w-none md:w-full" role="img" aria-label={`${title} animated diode diagram`}>
      <defs>
        <marker id={`diode-app-arrow-${visual}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0 10 5 0 10Z" fill="#154a96" />
        </marker>
      </defs>
      <style>{`
        .da-flow { stroke-dasharray: 12 10; animation: daFlow 1.1s linear infinite; }
        .da-wave { stroke-dasharray: 360; stroke-dashoffset: 360; animation: daWave 2.5s ease-in-out infinite; }
        .da-pulse { animation: daPulse 1.7s ease-in-out infinite; }
        .da-fill { animation: daFill 2.2s ease-in-out infinite; transform-origin: center; }
        .da-clamp { animation: daClamp 1.8s ease-in-out infinite; }
        @keyframes daFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -22; } }
        @keyframes daWave { 0% { stroke-dashoffset: 360; } 75%,100% { stroke-dashoffset: 0; } }
        @keyframes daPulse { 0%,100% { opacity: .28; } 50% { opacity: .95; } }
        @keyframes daFill { 0%,100% { transform: scaleY(.25); opacity: .35; } 50% { transform: scaleY(1); opacity: .95; } }
        @keyframes daClamp { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      `}</style>
      <rect x="18" y="18" width="644" height="294" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="42" y="56" fill="#0f172a" fontSize="18" fontWeight="900">{title}</text>

      {["vi", "resistance"].includes(visual) ? (
        <>
          <path d="M86 250h500M116 270V78" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <path className="da-wave" d="M118 238c140 0 210-8 272-28 54-18 80-66 118-132" fill="none" stroke="#154a96" strokeWidth="5" strokeLinecap="round" />
          <path d="M120 250c110-2 190-8 256-18" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <circle className="da-pulse" cx={visual === "resistance" ? 410 : 478} cy={visual === "resistance" ? 184 : 116} r="10" fill="#f97316" />
          <text x="455" y="270" fill="#475569" fontSize="13" fontWeight="800">VD</text>
          <text x="72" y="94" fill="#475569" fontSize="13" fontWeight="800">ID</text>
          <text x="220" y="104" fill="#154a96" fontSize="14" fontWeight="900">
            {visual === "resistance" ? "Q-point decides resistance model" : "forward current rises sharply after knee"}
          </text>
        </>
      ) : null}

      {["zener", "led", "photo", "schottky", "varactor"].includes(visual) ? (
        <>
          <circle cx="92" cy="166" r="26" fill="#eff6ff" stroke="#154a96" strokeWidth="4" />
          <path d="M82 166c8-16 14 16 22 0s14 16 22 0" fill="none" stroke="#154a96" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M120 166h104M224 126v80l70-40-70-40ZM306 126v80M306 166h118" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path className="da-flow" d="M128 166h286" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#diode-app-arrow-${visual})`} />
          {visual === "zener" ? <path className="da-clamp" d="M436 116v96M460 116v96M460 166h106" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" /> : null}
          {visual === "led" ? (
            <>
              <path className="da-pulse" d="M432 132l52-44M454 152l68-30M432 200l52 44" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" markerEnd={`url(#diode-app-arrow-${visual})`} />
              <text x="446" y="242" fill="#b45309" fontSize="14" fontWeight="900">light leaves junction</text>
            </>
          ) : null}
          {visual === "photo" ? (
            <>
              <path className="da-pulse" d="M560 96l-72 54M584 132l-88 36M560 214l-72-34" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" markerEnd={`url(#diode-app-arrow-${visual})`} />
              <text x="430" y="242" fill="#154a96" fontSize="14" fontWeight="900">light creates photocurrent</text>
            </>
          ) : null}
          {visual === "schottky" ? <text x="432" y="158" fill="#154a96" fontSize="16" fontWeight="900">fast, low Vf</text> : null}
          {visual === "varactor" ? (
            <>
              <path className="da-fill" d="M438 110v112M488 110v112" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />
              <text x="420" y="248" fill="#16a34a" fontSize="14" fontWeight="900">reverse voltage changes capacitance</text>
            </>
          ) : null}
        </>
      ) : null}

      {["half", "full", "bridge"].includes(visual) ? (
        <>
          <circle cx="86" cy="160" r="28" fill="#eff6ff" stroke="#154a96" strokeWidth="4" />
          <path className="da-wave" d="M56 160c10-22 20-22 30 0s20 22 30 0" fill="none" stroke="#154a96" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M116 160h88M204 122v76l66-38-66-38ZM282 122v76M282 160h92" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {visual === "bridge" ? (
            <path d="M378 118l52 42-52 42-52-42 52-42ZM430 160h82" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M374 132v58M394 132v58M394 160h118" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          )}
          <path className="da-flow" d="M122 160h388" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#diode-app-arrow-${visual})`} />
          <path className="da-wave" d={visual === "half" ? "M96 258c20-42 40-42 60 0 40 0 80 0 120 0 20-42 40-42 60 0" : "M96 258c18-42 36-42 54 0s36 42 54 0 36-42 54 0 36 42 54 0 36-42 54 0"} fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
          <text x="392" y="238" fill="#16a34a" fontSize="14" fontWeight="900">{visual === "half" ? "one half-cycle used" : "both half-cycles used"}</text>
        </>
      ) : null}

      {["capacitor", "inductor", "lc"].includes(visual) ? (
        <>
          <path d="M82 166h120M202 126v80l70-40-70-40ZM284 126v80M284 166h82" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {visual !== "capacitor" ? <path d="M368 166c10-22 22 22 32 0s22 22 32 0 22-22 32 0" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" /> : null}
          <path d="M492 120v92M516 120v92M516 166h72" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <rect className="da-fill" x="498" y="152" width="12" height="54" rx="5" fill="#16a34a" />
          <path className="da-flow" d="M86 166h490" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#diode-app-arrow-${visual})`} />
          <path className="da-wave" d="M100 258c22-18 44-18 66 0s44 18 66 0 44-18 66 0 44 18 66 0" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <path className="da-wave" d="M410 258c30-8 60-8 90 0s60 8 90 0" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
          <text x="392" y="104" fill="#154a96" fontSize="14" fontWeight="900">storage reduces ripple</text>
        </>
      ) : null}
    </svg>
  );
}

function DiodeApplicationSubtopicCard({ lesson, topicIndex, subtopic, subtopicIndex }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
          2.{topicIndex + 1}.{subtopicIndex + 1}
        </span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
            {lesson.title}
          </p>
          <h3 className="text-base font-bold tracking-tight text-slate-950">
            {subtopic.name}
          </h3>
        </div>
      </div>

      <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
        {subtopic.explanation}
      </p>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <h4 className="text-sm font-bold text-slate-950">Step-by-step working</h4>
          <ol className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
            {subtopic.steps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-xl border border-white bg-white px-3 py-2">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-portal-50 text-xs font-black text-portal-700">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title={`${subtopic.name} circuit visualization`} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3">
        <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
          Remember
        </p>
        <p className="mt-1.5 text-sm font-semibold leading-6 text-emerald-950">
          {subtopic.examLine}
        </p>
      </div>
    </article>
  );
}

function DiodesApplicationsDeepDiveContent({ chapter }) {
  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            Chapter 2 / Original Circuit Builder
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Diodes and Applications
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            This chapter treats the diode as a decision-making element. Every circuit
            is solved by asking: what polarity is applied, which diode path conducts,
            where energy is stored, and how the load sees the final waveform.
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
              GATE/PSU Lens
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-emerald-950">
              First decide diode state, then trace current path, then apply the proper
              model. This habit prevents most rectifier, regulator, and waveform mistakes.
            </p>
          </div>
        </div>
        <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title="Diode application visualization" />
        </div>
      </div>

      <section className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-950">
          Working Steps: From Junction to DC Supply
        </h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-5">
          {chapter.workingSteps.map((step, index) => (
            <div key={step} className="rounded-2xl border border-white bg-white p-3 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-5">
        {DIODE_APPLICATION_TOPIC_LESSONS.map((lesson, topicIndex) => (
          <section
            key={lesson.title}
            id={`analog-topic-${toAnchorId(lesson.title)}`}
            className="scroll-mt-40 rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-wrap items-start gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
                2.{topicIndex + 1}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
                  Main Topic
                </p>
                <h2 className="text-xl font-bold tracking-tight text-slate-950">
                  {lesson.title}
                </h2>
                <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
                  {lesson.idea}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              {lesson.subtopics.map((subtopic, subtopicIndex) => (
                <DiodeApplicationSubtopicCard
                  key={subtopic.name}
                  lesson={lesson}
                  topicIndex={topicIndex}
                  subtopic={subtopic}
                  subtopicIndex={subtopicIndex}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function BjtDiagram({ visual = "working", title = "BJT operation" }) {
  return (
    <svg viewBox="0 0 680 330" className="mx-auto h-auto w-[680px] max-w-none md:w-full" role="img" aria-label={`${title} animated BJT diagram`}>
      <defs>
        <marker id={`bjt-arrow-${visual}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0 10 5 0 10Z" fill="#154a96" />
        </marker>
      </defs>
      <style>{`
        .bjt-flow { stroke-dasharray: 12 10; animation: bjtFlow 1.1s linear infinite; }
        .bjt-wave { stroke-dasharray: 360; stroke-dashoffset: 360; animation: bjtWave 2.5s ease-in-out infinite; }
        .bjt-pulse { animation: bjtPulse 1.6s ease-in-out infinite; }
        .bjt-q { animation: bjtQ 2s ease-in-out infinite; }
        @keyframes bjtFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -22; } }
        @keyframes bjtWave { 0% { stroke-dashoffset: 360; } 75%,100% { stroke-dashoffset: 0; } }
        @keyframes bjtPulse { 0%,100% { opacity: .3; } 50% { opacity: .95; } }
        @keyframes bjtQ { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>
      <rect x="18" y="18" width="644" height="294" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="42" y="56" fill="#0f172a" fontSize="18" fontWeight="900">{title}</text>

      {["construction", "working", "currents", "ce", "cb", "cc"].includes(visual) ? (
        <>
          <path d="M186 160h92M278 94v132M278 118l96-58M278 202l96 58" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <text x="154" y="151" fill="#475569" fontSize="14" fontWeight="900">B</text>
          <text x="380" y="64" fill="#475569" fontSize="14" fontWeight="900">C</text>
          <text x="382" y="270" fill="#475569" fontSize="14" fontWeight="900">E</text>
          <path className="bjt-flow" d="M82 160h184" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#bjt-arrow-${visual})`} />
          <path className="bjt-flow" d="M372 64c-34 70-34 122 0 192" stroke="#154a96" strokeWidth="5" fill="none" strokeLinecap="round" markerEnd={`url(#bjt-arrow-${visual})`} />
          <path className="bjt-wave" d="M430 166c18-44 36-44 54 0s36 44 54 0 36-44 54 0" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
          <circle className="bjt-pulse" cx="278" cy="160" r="16" fill="#f97316" opacity=".4" />
          <text x="442" y="232" fill="#154a96" fontSize="14" fontWeight="900">
            {visual === "construction" ? "thin base controls carrier stream" : visual === "cc" ? "emitter follows base" : "small base action controls output"}
          </text>
        </>
      ) : null}

      {["input", "output", "stability"].includes(visual) ? (
        <>
          <path d="M86 250h500M116 270V82" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <path className="bjt-wave" d={visual === "input" ? "M118 242c120 0 200-16 270-52 44-22 72-58 110-108" : "M122 232h420M122 196h420M122 160h420M122 124h420"} fill="none" stroke="#154a96" strokeWidth="5" strokeLinecap="round" />
          {visual === "stability" ? <path className="bjt-q" d="M398 226v-92" stroke="#f97316" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#bjt-arrow-${visual})`} /> : <circle className="bjt-pulse" cx="392" cy="170" r="10" fill="#f97316" />}
          <text x="460" y="270" fill="#475569" fontSize="13" fontWeight="800">{visual === "input" ? "VBE" : "VCE"}</text>
          <text x="72" y="94" fill="#475569" fontSize="13" fontWeight="800">{visual === "input" ? "IB" : "IC"}</text>
          <text x="214" y="96" fill="#154a96" fontSize="14" fontWeight="900">
            {visual === "input" ? "input junction is diode-like" : visual === "stability" ? "feedback resists Q-point drift" : "families of curves for different IB"}
          </text>
        </>
      ) : null}

      {["fixed", "divider", "hybrid", "hparams"].includes(visual) ? (
        <>
          <path d="M86 90h460M546 90v176H86V90" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M178 90v62M160 152h36M164 164h28M168 176h20M178 176v34h92" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          <path d="M270 210h72M342 156v108M342 176l78-46M342 238l78 46" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <path className="bjt-flow" d="M118 90h380" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#bjt-arrow-${visual})`} />
          {visual === "divider" ? <path d="M132 90v70M132 190v76M112 160h40M112 190h40" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" /> : null}
          {["hybrid", "hparams"].includes(visual) ? (
            <>
              <rect x="436" y="128" width="132" height="92" rx="18" fill="#eff6ff" stroke="#154a96" strokeWidth="3" />
              <text x="466" y="162" fill="#154a96" fontSize="16" fontWeight="900">{visual === "hybrid" ? "small" : "h"}</text>
              <text x="456" y="184" fill="#154a96" fontSize="16" fontWeight="900">{visual === "hybrid" ? "signal" : "params"}</text>
            </>
          ) : null}
          <text x="252" y="64" fill="#154a96" fontSize="14" fontWeight="900">
            {visual === "fixed" ? "simple bias, beta sensitive" : visual === "divider" ? "emitter feedback stabilizes" : "replace nonlinear BJT near Q-point"}
          </text>
        </>
      ) : null}
    </svg>
  );
}

function BjtSubtopicCard({ lesson, topicIndex, subtopic, subtopicIndex }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
          3.{topicIndex + 1}.{subtopicIndex + 1}
        </span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
            {lesson.title}
          </p>
          <h3 className="text-base font-bold tracking-tight text-slate-950">
            {subtopic.name}
          </h3>
        </div>
      </div>

      <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
        {subtopic.explanation}
      </p>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <h4 className="text-sm font-bold text-slate-950">Step-by-step working</h4>
          <ol className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
            {subtopic.steps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-xl border border-white bg-white px-3 py-2">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-portal-50 text-xs font-black text-portal-700">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title={`${subtopic.name} visualization`} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3">
        <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
          Remember
        </p>
        <p className="mt-1.5 text-sm font-semibold leading-6 text-emerald-950">
          {subtopic.examLine}
        </p>
      </div>
    </article>
  );
}

function BjtDeepDiveContent({ chapter }) {
  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            Chapter 3 / Original Transistor Builder
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Bipolar Junction Transistor (BJT)
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            This chapter treats the BJT as a controllable carrier valve. The base does
            not carry the main output current; it decides how much of the emitter carrier
            stream reaches the collector. That one idea connects construction, biasing,
            characteristics, and small-signal gain.
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
              GATE/PSU Lens
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-emerald-950">
              Always identify region of operation, write current relations, fix the
              Q-point, then use the small-signal model.
            </p>
          </div>
        </div>
        <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title="BJT carrier-control visualization" />
        </div>
      </div>

      <section className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-950">
          Working Steps: From Base Signal to Collector Output
        </h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-5">
          {chapter.workingSteps.map((step, index) => (
            <div key={step} className="rounded-2xl border border-white bg-white p-3 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-5">
        {BJT_TOPIC_LESSONS.map((lesson, topicIndex) => (
          <section
            key={lesson.title}
            id={`analog-topic-${toAnchorId(lesson.title)}`}
            className="scroll-mt-40 rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-wrap items-start gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
                3.{topicIndex + 1}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
                  Main Topic
                </p>
                <h2 className="text-xl font-bold tracking-tight text-slate-950">
                  {lesson.title}
                </h2>
                <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
                  {lesson.idea}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              {lesson.subtopics.map((subtopic, subtopicIndex) => (
                <BjtSubtopicCard
                  key={subtopic.name}
                  lesson={lesson}
                  topicIndex={topicIndex}
                  subtopic={subtopic}
                  subtopicIndex={subtopicIndex}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function BjtAmplifierDiagram({ visual = "ceamp", title = "BJT amplifier" }) {
  const isClass = ["classa", "classb", "classab", "pushpull"].includes(visual);
  return (
    <svg viewBox="0 0 680 330" className="mx-auto h-auto w-[680px] max-w-none md:w-full" role="img" aria-label={`${title} animated amplifier diagram`}>
      <defs>
        <marker id={`bjt-amp-arrow-${visual}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0 10 5 0 10Z" fill="#154a96" />
        </marker>
      </defs>
      <style>{`
        .ba-flow { stroke-dasharray: 12 10; animation: baFlow 1.1s linear infinite; }
        .ba-small { stroke-dasharray: 260; stroke-dashoffset: 260; animation: baSmall 2.2s ease-in-out infinite; }
        .ba-large { stroke-dasharray: 360; stroke-dashoffset: 360; animation: baLarge 2.2s ease-in-out infinite; }
        .ba-pulse { animation: baPulse 1.6s ease-in-out infinite; }
        .ba-class { animation: baClass 2s ease-in-out infinite; transform-origin: center; }
        @keyframes baFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -22; } }
        @keyframes baSmall { 0% { stroke-dashoffset: 260; } 75%,100% { stroke-dashoffset: 0; } }
        @keyframes baLarge { 0% { stroke-dashoffset: 360; } 75%,100% { stroke-dashoffset: 0; } }
        @keyframes baPulse { 0%,100% { opacity: .3; } 50% { opacity: .95; } }
        @keyframes baClass { 0%,100% { transform: scaleY(.65); } 50% { transform: scaleY(1); } }
      `}</style>
      <rect x="18" y="18" width="644" height="294" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="42" y="56" fill="#0f172a" fontSize="18" fontWeight="900">{title}</text>

      {["ceamp", "cbamp", "ccamp"].includes(visual) ? (
        <>
          <path className="ba-small" d="M66 166c14-24 28-24 42 0s28 24 42 0 28-24 42 0" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <path d="M248 166h78M326 100v132M326 124l92-56M326 206l92 56" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path className="ba-flow" d="M194 166h118" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#bjt-amp-arrow-${visual})`} />
          <path className="ba-large" d={visual === "ccamp" ? "M452 166c16-28 32-28 48 0s32 28 48 0" : "M452 166c20-56 40-56 60 0s40 56 60 0"} fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
          <circle className="ba-pulse" cx="326" cy="166" r="16" fill="#f97316" />
          <text x="456" y="238" fill="#154a96" fontSize="14" fontWeight="900">
            {visual === "ceamp" ? "large inverted output" : visual === "cbamp" ? "high-frequency voltage gain" : "buffered follower output"}
          </text>
        </>
      ) : null}

      {["lowfreq", "highfreq", "bandwidth"].includes(visual) ? (
        <>
          <path d="M86 250h500M116 270V82" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <path className="ba-large" d="M118 226c48-116 84-118 132-118h174c48 0 78 24 120 118" fill="none" stroke="#154a96" strokeWidth="5" strokeLinecap="round" />
          <path d="M232 250V108M460 250V108" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8" />
          <text x="214" y="272" fill="#f97316" fontSize="13" fontWeight="900">fL</text>
          <text x="444" y="272" fill="#f97316" fontSize="13" fontWeight="900">fH</text>
          <text x="270" y="96" fill="#154a96" fontSize="14" fontWeight="900">
            {visual === "lowfreq" ? "capacitors weaken low-frequency gain" : visual === "highfreq" ? "parasitics reduce high-frequency gain" : "useful flat-gain band"}
          </text>
        </>
      ) : null}

      {["cascade", "coupling", "loading"].includes(visual) ? (
        <>
          {[82, 282, 482].map((x, index) => (
            <g key={x}>
              <path d={`M${x} 136h92l44 30-44 30H${x}Z`} fill="#eff6ff" stroke="#154a96" strokeWidth="3" strokeLinejoin="round" />
              <text x={x + 38} y="172" fill="#154a96" fontSize="15" fontWeight="900">A{index + 1}</text>
            </g>
          ))}
          <path className="ba-flow" d="M218 166h64M418 166h64" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#bjt-amp-arrow-${visual})`} />
          {visual === "loading" ? <path className="ba-pulse" d="M420 166c-28 34-54 34-82 0" fill="none" stroke="#f97316" strokeWidth="5" strokeLinecap="round" /> : null}
          {visual === "coupling" ? <path d="M246 138v56M264 138v56M446 138v56M464 138v56" stroke="#f97316" strokeWidth="4" strokeLinecap="round" /> : null}
          <path className="ba-small" d="M58 244c12-18 24-18 36 0s24 18 36 0" fill="none" stroke="#64748b" strokeWidth="3" />
          <path className="ba-large" d="M510 244c18-42 36-42 54 0s36 42 54 0" fill="none" stroke="#16a34a" strokeWidth="4" />
          <text x="234" y="104" fill="#154a96" fontSize="14" fontWeight="900">
            {visual === "cascade" ? "stage gains multiply" : visual === "coupling" ? "AC passes, DC bias stays separate" : "next stage reduces previous output"}
          </text>
        </>
      ) : null}

      {isClass ? (
        <>
          <path d="M86 246h500M116 264V86" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <path className="ba-small" d="M130 176c20-58 40-58 60 0s40 58 60 0 40-58 60 0" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <path className="ba-class" d={
            visual === "classa"
              ? "M390 176c20-58 40-58 60 0s40 58 60 0 40-58 60 0"
              : visual === "classb"
              ? "M390 176c20-58 40-58 60 0M510 176c20 58 40 58 60 0"
              : visual === "classab"
              ? "M390 176c20-58 40-58 60 0s40 58 60 0 40-58 60 0"
              : "M382 176c22-58 44-58 66 0M500 176c22 58 44 58 66 0"
          } fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
          <path className="ba-flow" d="M318 176h54" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#bjt-amp-arrow-${visual})`} />
          <text x="402" y="104" fill="#154a96" fontSize="14" fontWeight="900">
            {visual === "classa" ? "conducts full cycle" : visual === "classb" ? "each device handles half" : visual === "classab" ? "small overlap reduces crossover" : "two devices share load power"}
          </text>
        </>
      ) : null}
    </svg>
  );
}

function BjtAmplifierSubtopicCard({ lesson, topicIndex, subtopic, subtopicIndex }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
          4.{topicIndex + 1}.{subtopicIndex + 1}
        </span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
            {lesson.title}
          </p>
          <h3 className="text-base font-bold tracking-tight text-slate-950">{subtopic.name}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{subtopic.explanation}</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <h4 className="text-sm font-bold text-slate-950">Step-by-step working</h4>
          <ol className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
            {subtopic.steps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-xl border border-white bg-white px-3 py-2">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-portal-50 text-xs font-black text-portal-700">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title={`${subtopic.name} visualization`} />
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3">
        <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">Remember</p>
        <p className="mt-1.5 text-sm font-semibold leading-6 text-emerald-950">{subtopic.examLine}</p>
      </div>
    </article>
  );
}

function BjtAmplifiersDeepDiveContent({ chapter }) {
  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">Chapter 4 / Original Amplifier Builder</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">BJT Amplifiers</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            This chapter explains BJT amplifiers as signal-controlled power transfer.
            Biasing prepares the transistor, the input signal moves the Q-point slightly,
            and the collector or emitter network turns that motion into useful output.
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">GATE/PSU Lens</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-emerald-950">
              Separate DC bias, midband gain, cutoff frequencies, loading, and power-class conduction angle.
            </p>
          </div>
        </div>
        <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title="BJT amplifier visualization" />
        </div>
      </div>

      <section className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-950">Working Steps: From Small Signal to Useful Power</h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-5">
          {chapter.workingSteps.map((step, index) => (
            <div key={step} className="rounded-2xl border border-white bg-white p-3 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-5">
        {BJT_AMPLIFIER_TOPIC_LESSONS.map((lesson, topicIndex) => (
          <section key={lesson.title} id={`analog-topic-${toAnchorId(lesson.title)}`} className="scroll-mt-40 rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-start gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">4.{topicIndex + 1}</span>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">Main Topic</p>
                <h2 className="text-xl font-bold tracking-tight text-slate-950">{lesson.title}</h2>
                <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">{lesson.idea}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4">
              {lesson.subtopics.map((subtopic, subtopicIndex) => (
                <BjtAmplifierSubtopicCard
                  key={subtopic.name}
                  lesson={lesson}
                  topicIndex={topicIndex}
                  subtopic={subtopic}
                  subtopicIndex={subtopicIndex}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function FetDiagram({ visual = "jfet-working", title = "FET operation" }) {
  const isChart = visual.includes("characteristics");
  const isBias = visual.includes("bias");
  const isAmp = visual.includes("common");
  return (
    <svg viewBox="0 0 680 330" className="mx-auto h-auto w-[680px] max-w-none md:w-full" role="img" aria-label={`${title} animated FET diagram`}>
      <defs>
        <marker id={`fet-arrow-${visual}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0 10 5 0 10Z" fill="#154a96" />
        </marker>
      </defs>
      <style>{`
        .fet-flow { stroke-dasharray: 12 10; animation: fetFlow 1.1s linear infinite; }
        .fet-wave { stroke-dasharray: 340; stroke-dashoffset: 340; animation: fetWave 2.4s ease-in-out infinite; }
        .fet-pulse { animation: fetPulse 1.6s ease-in-out infinite; }
        .fet-channel { animation: fetChannel 2s ease-in-out infinite; transform-origin: center; }
        @keyframes fetFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -22; } }
        @keyframes fetWave { 0% { stroke-dashoffset: 340; } 75%,100% { stroke-dashoffset: 0; } }
        @keyframes fetPulse { 0%,100% { opacity: .28; } 50% { opacity: .95; } }
        @keyframes fetChannel { 0%,100% { transform: scaleY(.35); opacity: .45; } 50% { transform: scaleY(1); opacity: .95; } }
      `}</style>
      <rect x="18" y="18" width="644" height="294" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="42" y="56" fill="#0f172a" fontSize="18" fontWeight="900">{title}</text>

      {!isChart && !isBias && !isAmp ? (
        <>
          <path d="M278 88v154M330 88v154M182 126h72M182 204h72M354 126h132M354 204h132" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <rect className="fet-channel" x="286" y="126" width="36" height="78" rx="10" fill="#16a34a" />
          <path className="fet-flow" d="M474 126v78" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#fet-arrow-${visual})`} />
          <path className="fet-pulse" d="M88 166h160" stroke="#f97316" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#fet-arrow-${visual})`} />
          <text x="90" y="144" fill="#f97316" fontSize="14" fontWeight="900">gate field</text>
          <text x="382" y="246" fill="#154a96" fontSize="14" fontWeight="900">
            {visual.includes("depletion") ? "existing channel is reduced or enhanced" : visual.includes("enhancement") ? "channel forms after threshold" : "depletion controls channel width"}
          </text>
        </>
      ) : null}

      {isChart ? (
        <>
          <path d="M86 250h500M116 270V82" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <path className="fet-wave" d="M124 224c50-96 86-104 138-104h258" fill="none" stroke="#154a96" strokeWidth="5" strokeLinecap="round" />
          <path d="M124 204c48-64 84-72 138-72h258M124 184c48-38 84-46 138-46h258" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
          <circle className="fet-pulse" cx="318" cy="122" r="10" fill="#f97316" />
          <text x="454" y="270" fill="#475569" fontSize="13" fontWeight="800">VDS</text>
          <text x="72" y="94" fill="#475569" fontSize="13" fontWeight="800">ID</text>
          <text x="224" y="92" fill="#154a96" fontSize="14" fontWeight="900">VGS shifts drain current level</text>
        </>
      ) : null}

      {isBias ? (
        <>
          <path d="M92 90h490M582 90v176H92V90" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M328 126v96M370 126v96M228 174h76M394 174h112" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <rect className="fet-channel" x="336" y="148" width="26" height="52" rx="8" fill="#16a34a" />
          <path className="fet-flow" d="M500 132v84" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#fet-arrow-${visual})`} />
          {visual === "divider-bias" ? <path d="M150 90v72M150 194v72M130 162h40M130 194h40" stroke="#f97316" strokeWidth="4" strokeLinecap="round" /> : null}
          {visual === "self-bias" || visual === "divider-bias" ? <path d="M370 222v44M350 246h40M354 258h32M358 270h24" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" /> : null}
          <text x="224" y="70" fill="#154a96" fontSize="14" fontWeight="900">
            {visual === "gate-bias" ? "fixed gate voltage sets Q-point" : visual === "self-bias" ? "source resistor adds feedback" : "VG and VS set VGS"}
          </text>
        </>
      ) : null}

      {isAmp ? (
        <>
          <path className="fet-wave" d="M66 166c14-24 28-24 42 0s28 24 42 0 28-24 42 0" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <path d="M304 100v132M348 100v132M222 166h58M372 132h126M372 204h126" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <rect className="fet-channel" x="312" y="132" width="28" height="72" rx="8" fill="#16a34a" />
          <path className="fet-pulse" d="M194 166h86" stroke="#f97316" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#fet-arrow-${visual})`} />
          <path className="fet-flow" d="M486 132v72" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#fet-arrow-${visual})`} />
          <path className="fet-wave" d={visual === "common-drain" ? "M512 166c16-26 32-26 48 0s32 26 48 0" : "M512 166c20-52 40-52 60 0s40 52 60 0"} fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
          <text x="430" y="244" fill="#154a96" fontSize="14" fontWeight="900">
            {visual === "common-source" ? "inverted voltage gain" : visual === "common-gate" ? "low input resistance stage" : "source follower buffer"}
          </text>
        </>
      ) : null}
    </svg>
  );
}

function FetSubtopicCard({ lesson, topicIndex, subtopic, subtopicIndex }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
          5.{topicIndex + 1}.{subtopicIndex + 1}
        </span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">{lesson.title}</p>
          <h3 className="text-base font-bold tracking-tight text-slate-950">{subtopic.name}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{subtopic.explanation}</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <h4 className="text-sm font-bold text-slate-950">Step-by-step working</h4>
          <ol className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
            {subtopic.steps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-xl border border-white bg-white px-3 py-2">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-portal-50 text-xs font-black text-portal-700">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title={`${subtopic.name} visualization`} />
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3">
        <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">Remember</p>
        <p className="mt-1.5 text-sm font-semibold leading-6 text-emerald-950">{subtopic.examLine}</p>
      </div>
    </article>
  );
}

function FetDeepDiveContent({ chapter }) {
  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">Chapter 5 / Professional FET Builder</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Field Effect Transistors (FET)</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            This chapter explains FETs as electric-field controlled channel devices.
            Unlike BJTs, the controlling terminal ideally draws almost no current, so
            the main design question becomes: how does gate voltage shape the channel?
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">GATE/PSU Lens</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-emerald-950">
              Track VGS, threshold or pinch-off condition, drain-current region, bias stability, and amplifier configuration.
            </p>
          </div>
        </div>
        <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title="FET gate-field visualization" />
        </div>
      </div>

      <section className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-950">Working Steps: Gate Field to Drain Current</h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-5">
          {chapter.workingSteps.map((step, index) => (
            <div key={step} className="rounded-2xl border border-white bg-white p-3 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-5">
        <TopicSection title="Introduction">
          <p>
            A Field Effect Transistor, or FET, is a semiconductor device in which an
            electric field controls current through a conducting channel. Unlike a BJT,
            which needs base current for control, a FET is mainly controlled by voltage
            applied at the gate terminal.
          </p>
          <p>
            FETs are important because modern electronics needs devices that consume very
            little input current, switch fast, occupy small chip area, and can be packed
            in huge numbers inside integrated circuits.
          </p>
        </TopicSection>

        <TopicSection title="Why This Topic Matters">
          <ul className="grid gap-2">
            <li>Industry relevance: MOSFETs are the backbone of CMOS ICs, microprocessors, memory, power electronics, SMPS, motor drives, RF circuits, and analog switches.</li>
            <li>Analog relevance: FETs are used in common-source amplifiers, source followers, current sources, active loads, differential pairs, and high-input-impedance sensor circuits.</li>
            <li>Exam relevance: GATE and university exams test JFET pinch-off, MOSFET threshold voltage, operating regions, drain-current equations, transconductance, and FET amplifier gain.</li>
            <li>Interview relevance: strong answers explain channel formation and gate-field control instead of only quoting drain-current formulas.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Prerequisites">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>PN junction and depletion region</li>
            <li>Doping and majority carriers</li>
            <li>Electric field effect on charge carriers</li>
            <li>Voltage, current, and resistance concepts</li>
            <li>Basic amplifier gain and biasing</li>
            <li>Small-signal model and transconductance idea</li>
          </ul>
        </TopicSection>

        <TopicSection title="Basic Intuition">
          <p>
            Imagine a water pipe with a flexible wall. The water flow is drain current.
            The pipe opening is the channel. The gate voltage presses on the channel
            electrically and changes how wide the path is. A wider channel allows more
            current; a narrower channel allows less current.
          </p>
          <p>
            In a JFET, the channel already exists and gate reverse bias squeezes it. In
            an enhancement MOSFET, the channel does not exist at zero gate voltage; it
            forms only when gate voltage crosses threshold.
          </p>
          <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
            Simple memory: BJT uses input current for control; FET uses gate voltage and
            electric field for control.
          </blockquote>
        </TopicSection>

        <TopicSection title="Core Theory Explanation">
          <p>
            A FET has three main terminals: gate, drain, and source. Current flows mainly
            between drain and source through a channel. The gate controls that channel
            through an electric field.
          </p>
          <ul className="grid gap-2">
            <li>JFET: gate-channel junction is reverse biased; increasing reverse bias narrows the channel.</li>
            <li>Depletion MOSFET: channel exists initially and can be depleted or enhanced by gate voltage.</li>
            <li>Enhancement MOSFET: channel is induced only when gate-source voltage exceeds threshold voltage.</li>
            <li>FET amplifier action: a small change in gate voltage causes a larger change in drain current, which creates output voltage across a load.</li>
          </ul>
          <p>
            The key physical concept is channel control. The gate does not need to inject
            significant DC current. It creates an electric field, and that field controls
            the carrier density or channel width between drain and source.
          </p>
        </TopicSection>

        <TopicSection title="Step-by-Step Mathematical Derivation">
          <h3 className="text-base font-bold text-slate-950">1. JFET Drain Current</h3>
          <p>
            For a JFET, the channel is widest when gate-source voltage is zero. As
            reverse gate voltage increases, the depletion region expands and the channel
            becomes narrower. Shockley's equation models this behavior:
          </p>
          <p>{"$$ I_D = I_{DSS}\\left(1-\\frac{V_{GS}}{V_P}\\right)^2 $$"}</p>
          <ul className="grid gap-2">
            <li>{"$$ I_D $$ is drain current."}</li>
            <li>{"$$ I_{DSS} $$ is maximum drain current when gate-source voltage is zero."}</li>
            <li>{"$$ V_{GS} $$ is gate-source voltage."}</li>
            <li>{"$$ V_P $$ is pinch-off voltage, the gate voltage that almost closes the channel."}</li>
          </ul>
          <p>
            Physical meaning: the squared term tells us that channel current does not
            reduce linearly. As the channel is squeezed, current falls faster.
          </p>

          <h3 className="text-base font-bold text-slate-950">2. MOSFET Threshold Condition</h3>
          <p>
            In an enhancement MOSFET, drain current does not start properly until a
            conducting channel is formed. This happens when gate-source voltage crosses
            threshold voltage.
          </p>
          <p>{"Channel forms when $$ V_{GS} > V_T $$"}</p>
          <p>
            Below threshold, the gate field is not strong enough to create a useful
            inversion channel. Above threshold, carriers gather under the gate oxide and
            create a controllable path from drain to source.
          </p>

          <h3 className="text-base font-bold text-slate-950">3. MOSFET Drain Current in Saturation</h3>
          <p>
            In saturation region, a long-channel enhancement MOSFET behaves approximately
            as a voltage-controlled current source:
          </p>
          <p>{"$$ I_D = \\frac{1}{2}k(V_{GS}-V_T)^2 $$"}</p>
          <ul className="grid gap-2">
            <li>{"$$ k $$ depends on device geometry, mobility, oxide capacitance, and channel dimensions."}</li>
            <li>{"$$ V_{GS}-V_T $$ is called overdrive voltage."}</li>
            <li>The larger the overdrive voltage, the stronger the channel and the larger the drain current.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-950">4. Transconductance</h3>
          <p>
            Transconductance measures how effectively gate voltage controls drain
            current. It is the small-signal slope of the drain-current curve.
          </p>
          <p>{"$$ g_m = \\frac{\\Delta I_D}{\\Delta V_{GS}} $$"}</p>
          <p>
            Plain meaning: if a tiny change in gate voltage produces a large change in
            drain current, the device has high transconductance and can provide strong
            amplification.
          </p>

          <h3 className="text-base font-bold text-slate-950">5. Common-Source Voltage Gain</h3>
          <p>
            In a common-source amplifier, gate voltage changes drain current. Drain
            current variation creates voltage variation across the drain resistor.
          </p>
          <p>{"$$ A_v \\approx -g_m R_D $$"}</p>
          <p>
            The negative sign means phase inversion. When gate voltage increases, drain
            current increases, voltage drop across the drain resistor increases, and
            drain voltage falls.
          </p>
        </TopicSection>

        <TopicSection title="Working Principle">
          <ol className="grid gap-2">
            <li>Apply gate-source voltage to create or control the channel.</li>
            <li>Drain-source voltage pulls carriers through the channel.</li>
            <li>Gate electric field changes channel width or channel charge density.</li>
            <li>Drain current changes according to gate-source voltage.</li>
            <li>In amplifier use, drain-current change is converted into output voltage across a load.</li>
            <li>In switching use, the FET moves between cutoff and low-resistance ON state.</li>
          </ol>
        </TopicSection>

        <TopicSection title="Diagram Explanation">
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="diagram-placeholder flex min-h-[150px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
              FET Structure and Channel Control Diagram Here
            </div>
            <div className="diagram-placeholder flex min-h-[150px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
              Drain Characteristics Graph Here
            </div>
          </div>
          <p>
            The structure diagram should show gate, drain, source, oxide or PN junction,
            and channel. The characteristics graph should show how drain current changes
            with drain-source voltage for different gate-source voltages.
          </p>
        </TopicSection>

        <TopicSection title="Important Formulas">
          <div className="grid gap-3 lg:grid-cols-2">
            {[
              ["JFET drain current", "$$ I_D=I_{DSS}\\left(1-\\frac{V_{GS}}{V_P}\\right)^2 $$", "Gate reverse bias squeezes the channel and reduces current."],
              ["MOSFET threshold condition", "$$ V_{GS}>V_T $$", "Enhancement MOSFET channel forms only above threshold."],
              ["MOSFET saturation current", "$$ I_D=\\frac{1}{2}k(V_{GS}-V_T)^2 $$", "Drain current rises with square of overdrive voltage."],
              ["Overdrive voltage", "$$ V_{OV}=V_{GS}-V_T $$", "Extra gate voltage available after channel formation."],
              ["Transconductance", "$$ g_m=\\Delta I_D/\\Delta V_{GS} $$", "Measures gate-voltage control over drain current."],
              ["Common-source gain", "$$ A_v\\approx -g_mR_D $$", "Current variation through drain resistor creates inverted voltage gain."],
              ["Triode-region condition", "$$ V_{DS}<V_{GS}-V_T $$", "MOSFET behaves like a voltage-controlled resistor."],
              ["Saturation-region condition", "$$ V_{DS}\\ge V_{GS}-V_T $$", "MOSFET behaves approximately like a controlled current source."],
            ].map(([heading, formula, meaning]) => (
              <div key={heading} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-base font-bold text-slate-950">{heading}</h3>
                <p className="mt-2 font-bold text-portal-700">{formula}</p>
                <p className="mt-2 text-sm leading-6">{meaning}</p>
              </div>
            ))}
          </div>
        </TopicSection>

        <TopicSection title="Real-World Applications">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>CMOS logic gates and microprocessors</li>
            <li>Memory cells and digital ICs</li>
            <li>SMPS and DC-DC converters</li>
            <li>Motor drivers and power inverters</li>
            <li>Low-noise sensor input stages</li>
            <li>Analog switches and multiplexers</li>
            <li>RF amplifiers and mixers</li>
            <li>Source followers and impedance buffers</li>
          </ul>
        </TopicSection>

        <TopicSection title="Solved Examples">
          <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
          <p>{"An enhancement MOSFET has $$ V_T=2\\,V $$. If $$ V_{GS}=1.5\\,V $$, is a strong channel formed?"}</p>
          <p>
            Since gate-source voltage is less than threshold voltage, a strong inversion
            channel is not formed. The MOSFET remains OFF for basic circuit analysis.
          </p>

          <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
          <p>{"A MOSFET has $$ k=2\\,mA/V^2 $$, $$ V_T=1\\,V $$, and $$ V_{GS}=3\\,V $$. Find saturation drain current."}</p>
          <p>{"Overdrive voltage: $$ V_{OV}=V_{GS}-V_T=3-1=2\\,V $$"}</p>
          <p>{"$$ I_D=\\frac{1}{2}kV_{OV}^2=\\frac{1}{2}(2)(2)^2=4\\,mA $$"}</p>

          <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
          <p>{"A common-source amplifier has $$ g_m=4\\,mS $$ and $$ R_D=5\\,k\\Omega $$. Estimate voltage gain."}</p>
          <p>{"$$ A_v\\approx -g_mR_D=-(4\\times10^{-3})(5\\times10^3)=-20 $$"}</p>
          <p>
            The magnitude of gain is 20, and the negative sign means the output is 180
            degrees out of phase with the input.
          </p>
        </TopicSection>

        <TopicSection title="Common Mistakes">
          <ul className="grid gap-2">
            <li>Thinking MOSFET gate draws large DC current. Ideally, the insulated gate draws almost no DC current.</li>
            <li>Confusing JFET pinch-off voltage with MOSFET threshold voltage.</li>
            <li>Using saturation current equation when the MOSFET is actually in triode region.</li>
            <li>Forgetting that enhancement MOSFET needs gate voltage above threshold to form a strong channel.</li>
            <li>Ignoring the negative sign in common-source voltage gain.</li>
            <li>Assuming all FETs are normally OFF; depletion-mode devices can be normally ON.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Comparison Tables">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-950">
                <th className="py-2 pr-3">Device</th>
                <th className="py-2 pr-3">Control Method</th>
                <th className="py-2 pr-3">Normally</th>
                <th className="py-2 pr-3">Key Exam Point</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">JFET</td><td className="py-2 pr-3">Reverse gate bias controls channel width</td><td className="py-2 pr-3">ON at zero gate bias</td><td className="py-2 pr-3">Pinch-off and Shockley equation</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Depletion MOSFET</td><td className="py-2 pr-3">Gate voltage depletes or enhances existing channel</td><td className="py-2 pr-3">ON at zero gate bias</td><td className="py-2 pr-3">Can work with positive or negative gate control</td></tr>
              <tr><td className="py-2 pr-3">Enhancement MOSFET</td><td className="py-2 pr-3">Gate voltage induces channel</td><td className="py-2 pr-3">OFF at zero gate bias</td><td className="py-2 pr-3">Threshold voltage and regions</td></tr>
            </tbody>
          </table>
          <table className="mt-4 w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-950">
                <th className="py-2 pr-3">Amplifier</th>
                <th className="py-2 pr-3">Phase</th>
                <th className="py-2 pr-3">Input Resistance</th>
                <th className="py-2 pr-3">Main Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Common source</td><td className="py-2 pr-3">Inverted</td><td className="py-2 pr-3">High</td><td className="py-2 pr-3">Voltage gain</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Common drain</td><td className="py-2 pr-3">Same phase</td><td className="py-2 pr-3">Very high</td><td className="py-2 pr-3">Buffering</td></tr>
              <tr><td className="py-2 pr-3">Common gate</td><td className="py-2 pr-3">Same phase</td><td className="py-2 pr-3">Low</td><td className="py-2 pr-3">High-frequency matching</td></tr>
            </tbody>
          </table>
        </TopicSection>

        <TopicSection title="Interview Questions">
          <ul className="grid gap-2">
            <li>Why is a FET called a voltage-controlled device?</li>
            <li>Why is MOSFET input resistance very high?</li>
            <li>What is threshold voltage in an enhancement MOSFET?</li>
            <li>What is pinch-off in a JFET?</li>
            <li>What is transconductance, and why does it matter in amplifiers?</li>
            <li>Why does common-source amplifier invert phase?</li>
            <li>How is a MOSFET used as a switch?</li>
            <li>What is the difference between triode and saturation regions?</li>
          </ul>
        </TopicSection>

        <TopicSection title="Exam-Oriented Quick Notes">
          <ul className="grid gap-2">
            <li>For enhancement MOSFET, first check whether gate-source voltage is above threshold.</li>
            <li>{"Use triode condition $$ V_{DS}<V_{GS}-V_T $$ before applying triode-region equations."}</li>
            <li>{"Use saturation condition $$ V_{DS}\\ge V_{GS}-V_T $$ before applying saturation equation."}</li>
            <li>JFET is normally ON; enhancement MOSFET is normally OFF.</li>
            <li>Common-source amplifier gives voltage gain with phase inversion.</li>
            <li>Common-drain circuit is a source follower used for buffering.</li>
            <li>High input resistance is a major advantage of FETs in sensor and amplifier input stages.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Revision Summary">
          <ul className="grid gap-2">
            <li>FET current is controlled by gate electric field.</li>
            <li>Gate current is ideally very small, giving high input resistance.</li>
            <li>JFET channel exists initially and is squeezed by reverse gate bias.</li>
            <li>Enhancement MOSFET channel forms only after threshold voltage.</li>
            <li>Transconductance tells how strongly gate voltage controls drain current.</li>
            <li>Common-source gives voltage gain and phase inversion.</li>
            <li>{"Key formulas: $$ I_D=I_{DSS}(1-V_{GS}/V_P)^2 $$, $$ I_D=\\frac{1}{2}k(V_{GS}-V_T)^2 $$, and $$ A_v\\approx -g_mR_D $$."}</li>
          </ul>
        </TopicSection>

        <TopicSection title="Practice Questions">
          <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
          <ul className="grid gap-2">
            <li>Explain FET operation using channel-width control.</li>
            <li>Why is an enhancement MOSFET normally OFF?</li>
            <li>Why is common-drain amplifier called a source follower?</li>
          </ul>
          <h3 className="text-base font-bold text-slate-950">Numerical</h3>
          <ul className="grid gap-2">
            <li>{"For a MOSFET with $$ V_T=1.5\\,V $$ and $$ V_{GS}=4\\,V $$, find overdrive voltage."}</li>
            <li>{"If $$ k=1\\,mA/V^2 $$ and $$ V_{OV}=3\\,V $$, find saturation drain current."}</li>
            <li>{"Find common-source gain when $$ g_m=2.5\\,mS $$ and $$ R_D=8\\,k\\Omega $$."}</li>
          </ul>
          <h3 className="text-base font-bold text-slate-950">MCQs</h3>
          <ul className="grid gap-2">
            <li>Which device is normally OFF: JFET, depletion MOSFET, or enhancement MOSFET?</li>
            <li>Which FET amplifier gives phase inversion: common source, common drain, or common gate?</li>
            <li>What does transconductance relate: voltage to current, current to current, or voltage to voltage?</li>
          </ul>
        </TopicSection>
      </div>

      <div className="mt-6 grid gap-5">
        {FET_TOPIC_LESSONS.map((lesson, topicIndex) => (
          <section key={lesson.title} id={`analog-topic-${toAnchorId(lesson.title)}`} className="scroll-mt-40 rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-start gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">5.{topicIndex + 1}</span>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">Main Topic</p>
                <h2 className="text-xl font-bold tracking-tight text-slate-950">{lesson.title}</h2>
                <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">{lesson.idea}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4">
              {lesson.subtopics.map((subtopic, subtopicIndex) => (
                <FetSubtopicCard key={subtopic.name} lesson={lesson} topicIndex={topicIndex} subtopic={subtopic} subtopicIndex={subtopicIndex} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function FeedbackDiagram({ visual = "closed-loop", title = "Feedback amplifier" }) {
  const isType = ["voltage-series", "voltage-shunt", "current-series", "current-shunt"].includes(visual);
  return (
    <svg viewBox="0 0 680 330" className="mx-auto h-auto w-[680px] max-w-none md:w-full" role="img" aria-label={`${title} animated feedback diagram`}>
      <defs>
        <marker id={`fb-arrow-${visual}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0 10 5 0 10Z" fill="#154a96" />
        </marker>
      </defs>
      <style>{`
        .fb-flow { stroke-dasharray: 12 10; animation: fbFlow 1.1s linear infinite; }
        .fb-wave { stroke-dasharray: 340; stroke-dashoffset: 340; animation: fbWave 2.4s ease-in-out infinite; }
        .fb-pulse { animation: fbPulse 1.6s ease-in-out infinite; }
        .fb-correct { animation: fbCorrect 2s ease-in-out infinite; transform-origin: center; }
        @keyframes fbFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -22; } }
        @keyframes fbWave { 0% { stroke-dashoffset: 340; } 75%,100% { stroke-dashoffset: 0; } }
        @keyframes fbPulse { 0%,100% { opacity: .28; } 50% { opacity: .95; } }
        @keyframes fbCorrect { 0%,100% { transform: scaleY(.72); } 50% { transform: scaleY(1); } }
      `}</style>
      <rect x="18" y="18" width="644" height="294" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="42" y="56" fill="#0f172a" fontSize="18" fontWeight="900">{title}</text>

      <circle cx="126" cy="166" r="25" fill="#eff6ff" stroke="#154a96" strokeWidth="3" />
      <text x="119" y="172" fill="#154a96" fontSize="18" fontWeight="900">{visual === "open-loop" ? "+" : "-"}</text>
      <path d="M170 126h148l66 40-66 40H170Z" fill="#eff6ff" stroke="#154a96" strokeWidth="4" strokeLinejoin="round" />
      <text x="236" y="172" fill="#154a96" fontSize="18" fontWeight="900">A</text>
      <path className="fb-flow" d="M54 166h48M151 166h84M384 166h176" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#fb-arrow-${visual})`} />
      <path className="fb-wave" d="M472 112c18-36 36-36 54 0s36 36 54 0" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />

      {visual !== "open-loop" ? (
        <>
          <path d="M522 166v72H126v-46" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#fb-arrow-${visual})`} />
          <rect x="282" y="220" width="86" height="42" rx="14" fill="#fff7ed" stroke="#f97316" strokeWidth="3" />
          <text x="306" y="246" fill="#f97316" fontSize="15" fontWeight="900">beta</text>
        </>
      ) : null}

      {isType ? (
        <>
          <text x="410" y="244" fill="#154a96" fontSize="14" fontWeight="900">
            {visual.includes("voltage") ? "sample output voltage" : "sample output current"}
          </text>
          <text x="68" y="246" fill="#f97316" fontSize="14" fontWeight="900">
            {visual.includes("series") ? "series input mixing" : "shunt input mixing"}
          </text>
        </>
      ) : (
        <text x="402" y="244" fill="#154a96" fontSize="14" fontWeight="900">
          {visual === "gain-stability" ? "gain variation is corrected" : visual === "distortion" ? "distortion error is fed back" : visual === "bandwidth-feedback" ? "lower gain, wider band" : visual === "feedback-factor" ? "beta samples output" : visual === "open-loop" ? "no correction path" : "closed loop corrects error"}
        </text>
      )}

      {["distortion", "bandwidth-feedback", "gain-stability"].includes(visual) ? (
        <path className="fb-correct" d="M432 112c18-54 38-22 56 0s38 54 56 0" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
      ) : null}
    </svg>
  );
}

function FeedbackSubtopicCard({ lesson, topicIndex, subtopic, subtopicIndex }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
          6.{topicIndex + 1}.{subtopicIndex + 1}
        </span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">{lesson.title}</p>
          <h3 className="text-base font-bold tracking-tight text-slate-950">{subtopic.name}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{subtopic.explanation}</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <h4 className="text-sm font-bold text-slate-950">Step-by-step working</h4>
          <ol className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
            {subtopic.steps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-xl border border-white bg-white px-3 py-2">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-portal-50 text-xs font-black text-portal-700">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title={`${subtopic.name} visualization`} />
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3">
        <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">Remember</p>
        <p className="mt-1.5 text-sm font-semibold leading-6 text-emerald-950">{subtopic.examLine}</p>
      </div>
    </article>
  );
}

function FeedbackDeepDiveContent({ chapter }) {
  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">Chapter 6 / Professional Feedback Builder</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Feedback Amplifiers</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            This chapter explains feedback as controlled self-correction. The amplifier
            sacrifices some raw gain so the final circuit becomes more predictable,
            cleaner, wider-band, and better matched to its source or load.
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">GATE/PSU Lens</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-emerald-950">
              Identify sampled quantity, input mixing method, feedback sign, and the effect on gain, bandwidth, distortion, and impedances.
            </p>
          </div>
        </div>
        <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title="Negative feedback visualization" />
        </div>
      </div>

      <section className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-950">Working Steps: Output Sample to Input Correction</h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-5">
          {chapter.workingSteps.map((step, index) => (
            <div key={step} className="rounded-2xl border border-white bg-white p-3 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-5">
        <TopicSection title="Introduction">
          <p>
            A feedback amplifier is an amplifier in which a fraction of the output is
            returned to the input. If the returned signal opposes the input error, the
            system uses negative feedback. If it supports the input, the system uses
            positive feedback.
          </p>
          <p>
            In amplifier design, negative feedback is extremely important because it
            trades extra gain for better accuracy, stability, bandwidth, linearity, and
            predictable input-output resistance.
          </p>
        </TopicSection>

        <TopicSection title="Why This Topic Matters">
          <ul className="grid gap-2">
            <li>Industry relevance: feedback appears in audio amplifiers, op-amp circuits, RF gain blocks, sensor interfaces, voltage regulators, control systems, and data converters.</li>
            <li>Signal-quality relevance: negative feedback reduces distortion, gain drift, noise sensitivity, and device-parameter dependence.</li>
            <li>Exam relevance: GATE and university exams repeatedly ask closed-loop gain, desensitivity, bandwidth improvement, distortion reduction, and feedback topology identification.</li>
            <li>Interview relevance: a strong answer explains feedback as error correction, not just the formula $$ A_f=A/(1+A\beta) $$.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Prerequisites">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>Voltage gain and current gain</li>
            <li>Open-loop and closed-loop amplifier behavior</li>
            <li>Basic block diagrams and signal flow</li>
            <li>Input resistance and output resistance</li>
            <li>Frequency response and bandwidth</li>
            <li>Phase shift, distortion, and amplifier loading</li>
          </ul>
        </TopicSection>

        <TopicSection title="Basic Intuition">
          <p>
            Feedback is like a teacher checking the answer and correcting the next step.
            The amplifier produces an output. A small part of that output is measured
            and sent back. The input stage compares the original command with this
            returned information.
          </p>
          <p>
            If the output is too large, negative feedback reduces the effective input.
            If the output is too small, the error increases and the amplifier pushes
            harder. This self-correction makes the circuit more predictable.
          </p>
          <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
            Simple memory: an open-loop amplifier only amplifies; a negative-feedback
            amplifier amplifies and corrects itself.
          </blockquote>
        </TopicSection>

        <TopicSection title="Core Theory Explanation">
          <p>
            A feedback amplifier has three important quantities: open-loop gain, feedback
            factor, and closed-loop gain. The open-loop gain is the raw gain of the
            amplifier without correction. The feedback factor tells how much output is
            sampled and returned. The closed-loop gain is the final gain after correction.
          </p>
          <ul className="grid gap-2">
            <li>Sampling network: takes voltage or current information from the output.</li>
            <li>Feedback network: scales the sampled output by a factor $$ \beta $$.</li>
            <li>Mixing network: compares the input signal with feedback signal.</li>
            <li>Basic amplifier: amplifies the remaining error signal.</li>
          </ul>
          <p>
            Negative feedback reduces gain, but that reduction is not a weakness. It is
            the price paid for stability. Instead of depending strongly on transistor
            gain, temperature, aging, and supply variation, the amplifier behavior becomes
            controlled mainly by the external feedback network.
          </p>
        </TopicSection>

        <TopicSection title="Step-by-Step Mathematical Derivation">
          <h3 className="text-base font-bold text-slate-950">1. Start With the Error Signal</h3>
          <p>
            The amplifier does not amplify the source signal directly. In a negative
            feedback system, it amplifies the difference between input and feedback.
          </p>
          <p>{"$$ V_e = V_s - V_f $$"}</p>
          <p>
            Here, $$ V_e $$ is the error signal. If output becomes too large, feedback
            becomes larger, so error becomes smaller. That is correction.
          </p>

          <h3 className="text-base font-bold text-slate-950">2. Relate Feedback to Output</h3>
          <p>
            The feedback network returns only a fraction of the output:
          </p>
          <p>{"$$ V_f = \\beta V_o $$"}</p>
          <p>
            Plain meaning: if $$ \beta = 0.1 $$, then 10 percent of output information
            is returned to the input for correction.
          </p>

          <h3 className="text-base font-bold text-slate-950">3. Use Amplifier Gain</h3>
          <p>
            The basic amplifier multiplies the error signal by open-loop gain:
          </p>
          <p>{"$$ V_o = A V_e $$"}</p>
          <p>{"Substitute $$ V_e = V_s - \\beta V_o $$:"}</p>
          <p>{"$$ V_o = A(V_s - \\beta V_o) $$"}</p>
          <p>{"$$ V_o + A\\beta V_o = AV_s $$"}</p>
          <p>{"$$ V_o(1+A\\beta)=AV_s $$"}</p>
          <p>{"$$ A_f = \\frac{V_o}{V_s}=\\frac{A}{1+A\\beta} $$"}</p>
          <p>
            The denominator $$ 1+A\beta $$ is the correction strength. Larger loop gain
            means stronger feedback correction and more stable closed-loop behavior.
          </p>

          <h3 className="text-base font-bold text-slate-950">4. Gain Stability Meaning</h3>
          <p>
            When $$ A\beta $$ is very large, the formula becomes:
          </p>
          <p>{"$$ A_f \\approx \\frac{1}{\\beta} $$"}</p>
          <p>
            This is the most powerful idea in feedback. The final gain depends mainly on
            the feedback network, not on the uncertain raw amplifier gain.
          </p>
        </TopicSection>

        <TopicSection title="Working Principle">
          <ol className="grid gap-2">
            <li>Input signal enters the mixing point.</li>
            <li>A fraction of output is sampled by the feedback network.</li>
            <li>The sampled signal is returned to the input side.</li>
            <li>For negative feedback, the returned signal subtracts from the source signal.</li>
            <li>The amplifier boosts only the remaining error signal.</li>
            <li>The output settles to a stable value controlled by feedback.</li>
          </ol>
        </TopicSection>

        <TopicSection title="Diagram Explanation">
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="diagram-placeholder flex min-h-[150px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
              Negative Feedback Block Diagram Here
            </div>
            <div className="diagram-placeholder flex min-h-[150px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
              Feedback Topology Signal Flow Diagram Here
            </div>
          </div>
          <p>
            The block diagram should show source signal, summing node, amplifier gain
            block, output sampling, feedback factor $$ \beta $$, and the return path.
            For topology diagrams, observe whether voltage or current is sampled at the
            output and whether feedback is mixed in series or shunt at the input.
          </p>
        </TopicSection>

        <TopicSection title="Important Formulas">
          <div className="grid gap-3 lg:grid-cols-2">
            {[
              ["Feedback signal", "$$ V_f=\\beta V_o $$", "Feedback factor tells what fraction of output information returns to the input."],
              ["Closed-loop gain", "$$ A_f=\\frac{A}{1+A\\beta} $$", "Negative feedback gain is lower but more stable than open-loop gain."],
              ["Loop gain", "$$ A\\beta $$", "Measures strength of feedback correction around the loop."],
              ["Desensitivity", "$$ D=1+A\\beta $$", "Shows how much gain variation is reduced by feedback."],
              ["Bandwidth improvement", "$$ BW_f=BW(1+A\\beta) $$", "Gain reduces, but useful frequency range increases."],
              ["Distortion reduction", "$$ D_f=\\frac{D}{1+A\\beta} $$", "Nonlinear distortion is divided by the same feedback factor."],
              ["Noise reduction", "$$ N_f=\\frac{N}{1+A\\beta} $$", "Noise generated inside the amplifier is reduced by negative feedback."],
              ["High loop-gain approximation", "$$ A_f\\approx\\frac{1}{\\beta} $$", "With strong feedback, final gain is set mainly by the feedback network."],
            ].map(([heading, formula, meaning]) => (
              <div key={heading} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-base font-bold text-slate-950">{heading}</h3>
                <p className="mt-2 font-bold text-portal-700">{formula}</p>
                <p className="mt-2 text-sm leading-6">{meaning}</p>
              </div>
            ))}
          </div>
        </TopicSection>

        <TopicSection title="Real-World Applications">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>Op-amp inverting and non-inverting amplifiers</li>
            <li>Audio power amplifiers with low distortion</li>
            <li>Voltage regulators and power supplies</li>
            <li>Instrumentation amplifiers for sensor signals</li>
            <li>Automatic gain control circuits</li>
            <li>RF and communication gain stages</li>
            <li>Control systems and servo loops</li>
            <li>ADC drivers and precision analog front ends</li>
          </ul>
        </TopicSection>

        <TopicSection title="Solved Examples">
          <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
          <p>{"An amplifier has open-loop gain $$ A=1000 $$ and feedback factor $$ \\beta=0.01 $$. Find closed-loop gain."}</p>
          <p>{"Loop gain: $$ A\\beta=1000\\times0.01=10 $$"}</p>
          <p>{"$$ A_f=\\frac{A}{1+A\\beta}=\\frac{1000}{11}\\approx90.9 $$"}</p>
          <p>
            The gain dropped from 1000 to about 91, but the amplifier is now much more
            stable and predictable.
          </p>

          <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
          <p>{"An amplifier bandwidth is $$ 20\\,kHz $$ without feedback. If $$ A\\beta=9 $$, estimate feedback bandwidth."}</p>
          <p>{"$$ BW_f=BW(1+A\\beta)=20\\,kHz\\times10=200\\,kHz $$"}</p>
          <p>
            Negative feedback reduces gain but expands bandwidth by the same factor.
          </p>

          <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
          <p>{"An amplifier has 8 percent distortion without feedback. If loop gain is 19, find distortion with feedback."}</p>
          <p>{"$$ D_f=\\frac{D}{1+A\\beta}=\\frac{8\\%}{20}=0.4\\% $$"}</p>
          <p>
            Feedback reduces distortion because the output error is sampled and opposed
            at the input.
          </p>
        </TopicSection>

        <TopicSection title="Common Mistakes">
          <ul className="grid gap-2">
            <li>Thinking negative feedback always means smaller output. It reduces uncontrolled gain, not useful performance.</li>
            <li>Using $$ A_f=A/(1+A\beta) $$ for positive feedback. Positive feedback uses a different sign condition.</li>
            <li>Confusing feedback factor $$ \beta $$ with transistor current gain $$ \beta $$.</li>
            <li>Forgetting that feedback effects depend on loop gain $$ A\beta $$, not only amplifier gain.</li>
            <li>Mixing up sampling and mixing: output side decides voltage/current sampling; input side decides series/shunt mixing.</li>
            <li>Ignoring phase shift at high frequency, which can turn negative feedback into instability or oscillation.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Comparison Tables">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-950">
                <th className="py-2 pr-3">Feedback Type</th>
                <th className="py-2 pr-3">Input Mixing</th>
                <th className="py-2 pr-3">Output Sampling</th>
                <th className="py-2 pr-3">Main Effect</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Voltage series</td><td className="py-2 pr-3">Series</td><td className="py-2 pr-3">Voltage</td><td className="py-2 pr-3">Increases input resistance, decreases output resistance</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Voltage shunt</td><td className="py-2 pr-3">Shunt</td><td className="py-2 pr-3">Voltage</td><td className="py-2 pr-3">Decreases input resistance, decreases output resistance</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Current series</td><td className="py-2 pr-3">Series</td><td className="py-2 pr-3">Current</td><td className="py-2 pr-3">Increases input resistance, increases output resistance</td></tr>
              <tr><td className="py-2 pr-3">Current shunt</td><td className="py-2 pr-3">Shunt</td><td className="py-2 pr-3">Current</td><td className="py-2 pr-3">Decreases input resistance, increases output resistance</td></tr>
            </tbody>
          </table>
        </TopicSection>

        <TopicSection title="Interview Questions">
          <ul className="grid gap-2">
            <li>What is the physical meaning of negative feedback?</li>
            <li>Why does negative feedback reduce gain but improve stability?</li>
            <li>What is loop gain, and why is it important?</li>
            <li>Why does bandwidth increase when negative feedback is applied?</li>
            <li>How does negative feedback reduce distortion?</li>
            <li>How do you identify voltage sampling versus current sampling?</li>
            <li>What is the difference between series and shunt mixing?</li>
            <li>Can negative feedback cause oscillation? Under what condition?</li>
          </ul>
        </TopicSection>

        <TopicSection title="Exam-Oriented Quick Notes">
          <ul className="grid gap-2">
            <li>{"For negative feedback, use $$ A_f=A/(1+A\\beta) $$."}</li>
            <li>{"The factor $$ 1+A\\beta $$ appears in gain stability, bandwidth improvement, distortion reduction, and noise reduction."}</li>
            <li>Series mixing increases input resistance; shunt mixing decreases input resistance.</li>
            <li>Voltage sampling decreases output resistance; current sampling increases output resistance.</li>
            <li>If loop gain is very high, closed-loop gain becomes approximately reciprocal of feedback factor.</li>
            <li>At high frequency, always remember phase shift can reduce stability margin.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Revision Summary">
          <ul className="grid gap-2">
            <li>Feedback means returning a portion of output to the input.</li>
            <li>Negative feedback subtracts feedback from input and corrects error.</li>
            <li>Closed-loop gain is lower but more stable than open-loop gain.</li>
            <li>Loop gain controls the strength of feedback improvement.</li>
            <li>Negative feedback improves bandwidth, linearity, distortion, and parameter stability.</li>
            <li>Feedback topology is identified by output sampling and input mixing.</li>
            <li>{"Key relation: $$ A_f=A/(1+A\\beta) $$."}</li>
          </ul>
        </TopicSection>

        <TopicSection title="Practice Questions">
          <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
          <ul className="grid gap-2">
            <li>Explain negative feedback as error correction.</li>
            <li>Why does an amplifier become more stable after adding negative feedback?</li>
            <li>How do you identify whether output voltage or output current is sampled?</li>
          </ul>
          <h3 className="text-base font-bold text-slate-950">Numerical</h3>
          <ul className="grid gap-2">
            <li>{"Find closed-loop gain for $$ A=500 $$ and $$ \\beta=0.02 $$."}</li>
            <li>{"If bandwidth is $$ 50\\,kHz $$ and loop gain is 4, find feedback bandwidth."}</li>
            <li>{"If distortion is 5 percent and $$ A\\beta=24 $$, find distortion with feedback."}</li>
          </ul>
          <h3 className="text-base font-bold text-slate-950">MCQs</h3>
          <ul className="grid gap-2">
            <li>Negative feedback generally increases bandwidth: true or false?</li>
            <li>Series mixing increases or decreases input resistance?</li>
            <li>Voltage sampling increases or decreases output resistance?</li>
          </ul>
        </TopicSection>
      </div>

      <div className="mt-6 grid gap-5">
        {FEEDBACK_TOPIC_LESSONS.map((lesson, topicIndex) => (
          <section key={lesson.title} id={`analog-topic-${toAnchorId(lesson.title)}`} className="scroll-mt-40 rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-start gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">6.{topicIndex + 1}</span>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">Main Topic</p>
                <h2 className="text-xl font-bold tracking-tight text-slate-950">{lesson.title}</h2>
                <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">{lesson.idea}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4">
              {lesson.subtopics.map((subtopic, subtopicIndex) => (
                <FeedbackSubtopicCard key={subtopic.name} lesson={lesson} topicIndex={topicIndex} subtopic={subtopic} subtopicIndex={subtopicIndex} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function OscillatorDiagram({ mode = "loop", title = "Oscillator signal flow" }) {
  return (
    <svg viewBox="0 0 680 330" className="mx-auto h-auto w-[680px] max-w-none md:w-full" role="img" aria-label={`${title} animated oscillator diagram`}>
      <defs>
        <marker id={`osc-arrow-${mode}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0 10 5 0 10Z" fill="#154a96" />
        </marker>
      </defs>
      <style>{`
        .osc-flow { stroke-dasharray: 12 10; animation: oscFlow 1.1s linear infinite; }
        .osc-wave { stroke-dasharray: 360; stroke-dashoffset: 360; animation: oscWave 2.4s ease-in-out infinite; }
        .osc-pulse { animation: oscPulse 1.6s ease-in-out infinite; }
        .osc-energy { animation: oscEnergy 2s ease-in-out infinite; transform-origin: center; }
        @keyframes oscFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -22; } }
        @keyframes oscWave { 0% { stroke-dashoffset: 360; } 75%,100% { stroke-dashoffset: 0; } }
        @keyframes oscPulse { 0%,100% { opacity: .3; } 50% { opacity: .95; } }
        @keyframes oscEnergy { 0%,100% { transform: scale(.82); opacity: .42; } 50% { transform: scale(1.04); opacity: .95; } }
      `}</style>
      <rect x="18" y="18" width="644" height="294" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="42" y="56" fill="#0f172a" fontSize="18" fontWeight="900">{title}</text>

      {mode === "loop" ? (
        <>
          <path d="M100 128h150l58 38-58 38H100Z" fill="#eff6ff" stroke="#154a96" strokeWidth="4" strokeLinejoin="round" />
          <text x="158" y="172" fill="#154a96" fontSize="18" fontWeight="900">A</text>
          <rect x="382" y="126" width="142" height="78" rx="20" fill="#fff7ed" stroke="#f97316" strokeWidth="4" />
          <text x="426" y="172" fill="#f97316" fontSize="18" fontWeight="900">beta</text>
          <path className="osc-flow" d="M306 166h76M524 166h60v88H164v-48" stroke="#154a96" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#osc-arrow-${mode})`} />
          <path className="osc-wave" d="M86 252c18-38 36-38 54 0s36 38 54 0 36-38 54 0" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
          <text x="354" y="252" fill="#154a96" fontSize="14" fontWeight="900">output sample returns in phase</text>
        </>
      ) : null}

      {mode === "rc" ? (
        <>
          <path d="M76 166h92M168 136v60M188 136v60M188 166h78M266 136v60M286 136v60M286 166h78M364 136v60M384 136v60M384 166h82" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <path d="M168 196v46M266 196v46M364 196v46M144 242h250" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          <path d="M466 128h116l48 38-48 38H466Z" fill="#eff6ff" stroke="#154a96" strokeWidth="4" strokeLinejoin="round" />
          <text x="506" y="172" fill="#154a96" fontSize="17" fontWeight="900">Amp</text>
          <path className="osc-flow" d="M84 166h528" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#osc-arrow-${mode})`} />
          <path className="osc-wave" d="M112 92c16-28 32-28 48 0s32 28 48 0 32-28 48 0" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
          <text x="204" y="270" fill="#f97316" fontSize="14" fontWeight="900">RC network selects frequency and phase</text>
        </>
      ) : null}

      {mode === "lc" ? (
        <>
          <circle className="osc-energy" cx="210" cy="166" r="58" fill="#eff6ff" stroke="#154a96" strokeWidth="4" />
          <path d="M150 166c10-24 22 24 32 0s22-24 32 0 22 24 32 0 22-24 32 0" fill="none" stroke="#154a96" strokeWidth="4" strokeLinecap="round" />
          <path d="M342 112v108M370 112v108" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          <path d="M268 166h74M370 166h118M488 126h110l44 40-44 40H488Z" stroke="#1e293b" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="530" y="172" fill="#154a96" fontSize="17" fontWeight="900">Amp</text>
          <path className="osc-flow" d="M126 166h488" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#osc-arrow-${mode})`} />
          <text x="146" y="260" fill="#f97316" fontSize="14" fontWeight="900">energy swaps between magnetic field and electric field</text>
        </>
      ) : null}

      {mode === "crystal" ? (
        <>
          <path d="M92 166h144M236 116v100M260 116v100M260 166h88" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          <rect className="osc-energy" x="344" y="116" width="114" height="100" rx="18" fill="#eff6ff" stroke="#154a96" strokeWidth="4" />
          <path d="M372 144h58M372 166h58M372 188h58" stroke="#154a96" strokeWidth="4" strokeLinecap="round" />
          <path d="M458 166h112M570 126h70v80h-70Z" stroke="#1e293b" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path className="osc-wave" d="M126 254c14-24 28-24 42 0s28 24 42 0 28-24 42 0" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
          <text x="314" y="250" fill="#154a96" fontSize="14" fontWeight="900">quartz locks frequency sharply</text>
        </>
      ) : null}
    </svg>
  );
}

function TopicSection({ title, children }) {
  return (
    <section className="topic-section rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-xl font-bold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
        {children}
      </div>
    </section>
  );
}

function OscillatorsDeepDiveContent({ chapter }) {
  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            Chapter 7 / Professional Oscillator Builder
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Oscillators
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            An oscillator is an electronic circuit that creates a periodic waveform
            without needing a periodic input signal. It converts DC supply energy into
            a controlled AC signal by using amplification, feedback, and a frequency
            selective network.
          </p>
        </div>
        <div className="diagram-placeholder rounded-[24px] border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title="Oscillator feedback visualization" />
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        <TopicSection title="Introduction">
          <p>
            An oscillator is a signal generator. Unlike an amplifier, it does not wait
            for a continuous input waveform. A tiny disturbance, noise pulse, or switching
            transient starts the process, and the circuit keeps reinforcing the correct
            frequency.
          </p>
          <p>
            In ECE, oscillators matter because almost every timed electronic system needs
            a repeatable signal: radios need carriers, digital systems need clocks,
            microcontrollers need timing references, and instruments need test signals.
          </p>
        </TopicSection>

        <TopicSection title="Why This Topic Matters">
          <ul className="grid gap-2">
            <li>Industry relevance: RF transmitters, PLLs, microcontroller clocks, audio generators, sensor interfaces, and communication systems all use oscillators.</li>
            <li>Exam relevance: GATE and university exams frequently test Barkhausen criterion, RC phase-shift oscillator, Wien bridge oscillator, Hartley, Colpitts, and crystal oscillator frequency expressions.</li>
            <li>Interview relevance: A strong answer connects gain, feedback, phase shift, amplitude control, and frequency selection instead of only quoting formulas.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Prerequisites">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>Amplifier gain and phase shift</li>
            <li>Positive and negative feedback</li>
            <li>RC and LC frequency response</li>
            <li>Phasors and phase angle</li>
            <li>Resonance and quality factor</li>
            <li>Basic op-amp or transistor amplifier action</li>
          </ul>
        </TopicSection>

        <TopicSection title="Basic Intuition">
          <p>
            Think of a swing. One push at the right instant increases the swing motion.
            A push at the wrong instant slows it down. An oscillator works similarly:
            the feedback signal must return at the correct phase so it supports the
            existing waveform.
          </p>
          <p>
            The amplifier supplies energy. The feedback network decides timing. The
            frequency-selective circuit decides which frequency receives reinforcement.
            Amplitude control prevents the waveform from growing without limit.
          </p>
        </TopicSection>

        <TopicSection title="Core Theory Explanation">
          <p>
            A practical oscillator has three functional blocks: an amplifier, a feedback
            network, and a frequency-selective network. In many circuits, the feedback
            and frequency-selective network are the same physical network.
          </p>
          <ul className="grid gap-2">
            <li>The amplifier gives gain so losses in the feedback network are compensated.</li>
            <li>The feedback path returns part of the output to the input.</li>
            <li>The selected frequency returns with total phase shift equal to 0 degree or 360 degrees.</li>
            <li>At unwanted frequencies, phase or gain condition is not satisfied, so oscillation does not sustain.</li>
          </ul>
          <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
            The oscillator is not creating energy from nothing. It is converting DC supply
            energy into AC energy at a frequency chosen by the circuit.
          </blockquote>
        </TopicSection>

        <TopicSection title="Step-by-Step Mathematical Derivation">
          <p>
            {"Start with an amplifier of gain $$ A $$ and feedback factor $$ \\beta $$."}
            If the input error signal is $$ V_i $$, output is:
          </p>
          <p>$$ V_o = A V_i $$</p>
          <p>The feedback signal is:</p>
          <p>{"$$ V_f = \\beta V_o $$"}</p>
          <p>
            For self-sustained oscillation, the circuit should keep producing output
            even when the external input is removed. That means the feedback signal must
            replace the required input:
          </p>
          <p>{"$$ V_i = V_f = \\beta V_o $$"}</p>
          <p>{"Substitute $$ V_o = A V_i $$:"}</p>
          <p>{"$$ V_i = \\beta A V_i $$"}</p>
          <p>For non-zero oscillation:</p>
          <p>{"$$ A\\beta = 1 $$"}</p>
          <p>
            Physically, this means the returned signal has exactly the same magnitude
            and phase needed to continue the next cycle.
          </p>
        </TopicSection>

        <TopicSection title="Working Principle">
          <ol className="grid gap-2">
            {chapter.workingSteps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-portal-600 text-xs font-black text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </TopicSection>

        <TopicSection title="Diagram Explanation">
          <div className="diagram-placeholder rounded-2xl border border-portal-100 bg-[#f8fbff] p-3">
            <CircuitVisualizationMovedNotice title="Oscillator signal-flow visualization" />
          </div>
          <p>
            The block diagram shows output being sampled and returned through the feedback
            network. If the returned signal reaches the summing point in phase, it acts
            like a fresh input signal and keeps the waveform alive.
          </p>
        </TopicSection>

        <TopicSection title="Important Formulas">
          <div className="grid gap-3 lg:grid-cols-2">
            {OSCILLATOR_QUICK_TOPICS.map((topic) => (
              <div key={topic.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-base font-bold text-slate-950">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{topic.detail}</p>
                <p className="mt-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-portal-700">{topic.formula}</p>
              </div>
            ))}
          </div>
        </TopicSection>

        <TopicSection title="Oscillator Types">
          <div className="grid gap-4">
            <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-lg font-bold text-slate-950">Barkhausen Criterion</h3>
              <p className="mt-2">The Barkhausen criterion is the starting condition for sustained sinusoidal oscillation. It says the loop must return a signal that is neither weaker nor phase-opposed at the oscillation frequency.</p>
              <div className="diagram-placeholder mt-3 rounded-2xl border border-portal-100 bg-white p-3">
                <CircuitVisualizationMovedNotice title="Oscillator loop visualization" />
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-lg font-bold text-slate-950">RC Oscillators</h3>
              <p className="mt-2">RC oscillators are preferred for low-frequency and audio-frequency generation because resistors and capacitors are easier to implement than large inductors.</p>
              <div className="diagram-placeholder mt-3 rounded-2xl border border-portal-100 bg-white p-3">
                <CircuitVisualizationMovedNotice title="RC oscillator circuit visualization" />
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-lg font-bold text-slate-950">LC Oscillators</h3>
              <p className="mt-2">LC oscillators are useful at higher frequencies because the tank circuit naturally exchanges energy between magnetic and electric fields.</p>
              <div className="diagram-placeholder mt-3 rounded-2xl border border-portal-100 bg-white p-3">
                <CircuitVisualizationMovedNotice title="LC oscillator circuit visualization" />
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-lg font-bold text-slate-950">Crystal Oscillator</h3>
              <p className="mt-2">A crystal oscillator uses mechanical resonance of quartz. Its frequency stability is much higher than ordinary RC or LC oscillators.</p>
              <div className="diagram-placeholder mt-3 rounded-2xl border border-portal-100 bg-white p-3">
                <CircuitVisualizationMovedNotice title="Crystal oscillator circuit visualization" />
              </div>
            </section>
          </div>
        </TopicSection>

        <TopicSection title="Real-World Applications">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>Carrier generation in AM, FM, and RF transmitters</li>
            <li>Clock generation in microcontrollers and processors</li>
            <li>Local oscillators in superheterodyne receivers</li>
            <li>Function generators and laboratory instruments</li>
            <li>PLL frequency synthesis</li>
            <li>Timing references in communication and navigation systems</li>
          </ul>
        </TopicSection>

        <TopicSection title="Solved Examples">
          <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
          <p>{"If an oscillator has amplifier gain $$ A = 50 $$, what feedback factor is needed for sustained oscillation?"}</p>
          <p>{"Using $$ A\\beta = 1 $$:"}</p>
          <p>{"$$ \\beta = \\frac{1}{A} = \\frac{1}{50} = 0.02 $$"}</p>
          <p>The feedback network must return 2 percent of output with correct phase.</p>

          <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
          <p>{"Find LC oscillator frequency for $$ L = 10\\,\\mu H $$ and $$ C = 100\\,pF $$."}</p>
          <p>{"$$ f_0 = \\frac{1}{2\\pi\\sqrt{LC}} $$"}</p>
          <p>{"$$ f_0 \\approx \\frac{1}{2\\pi\\sqrt{10 \\times 10^{-6} \\times 100 \\times 10^{-12}}} \\approx 5.03\\,MHz $$"}</p>

          <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
          <p>{"A three-section RC phase-shift oscillator uses equal $$ R $$ and $$ C $$. If $$ R = 10\\,k\\Omega $$ and $$ C = 0.01\\,\\mu F $$, estimate frequency."}</p>
          <p>{"$$ f = \\frac{1}{2\\pi RC\\sqrt{6}} $$"}</p>
          <p>{"$$ f \\approx \\frac{1}{2\\pi(10^4)(10^{-8})\\sqrt{6}} \\approx 650\\,Hz $$"}</p>
        </TopicSection>

        <TopicSection title="Common Mistakes">
          <ul className="grid gap-2">
            <li>Thinking positive feedback alone is enough; correct phase and loop gain are both required.</li>
            <li>{"Using $$ A\\beta = 1 $$ without checking phase shift."}</li>
            <li>Confusing startup condition with steady-state condition. Startup often needs loop gain slightly greater than one.</li>
            <li>Forgetting amplitude stabilization in practical oscillators.</li>
            <li>Using LC formula for RC oscillators or ignoring the specific oscillator topology.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Comparison Tables">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-950">
                <th className="py-2 pr-3">Type</th>
                <th className="py-2 pr-3">Best Range</th>
                <th className="py-2 pr-3">Main Strength</th>
                <th className="py-2 pr-3">Limitation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">RC</td><td className="py-2 pr-3">Low/audio frequency</td><td className="py-2 pr-3">No inductor needed</td><td className="py-2 pr-3">Lower frequency stability</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">LC</td><td className="py-2 pr-3">RF range</td><td className="py-2 pr-3">Good sinusoidal RF generation</td><td className="py-2 pr-3">Inductor size/loss/parasitics</td></tr>
              <tr><td className="py-2 pr-3">Crystal</td><td className="py-2 pr-3">Fixed precise frequency</td><td className="py-2 pr-3">Excellent stability</td><td className="py-2 pr-3">Limited tuning range</td></tr>
            </tbody>
          </table>
        </TopicSection>

        <TopicSection title="Interview Questions">
          <ul className="grid gap-2">
            <li>Why does an oscillator need feedback?</li>
            <li>{"What is the physical meaning of $$ A\\beta = 1 $$?"}</li>
            <li>Why does startup usually require loop gain greater than one?</li>
            <li>Why are RC oscillators preferred at low frequencies?</li>
            <li>Why are crystal oscillators highly stable?</li>
            <li>What is the difference between an amplifier with feedback and an oscillator?</li>
          </ul>
        </TopicSection>

        <TopicSection title="Exam-Oriented Quick Notes">
          <ul className="grid gap-2">
            <li>Barkhausen criterion requires both magnitude and phase conditions.</li>
            <li>Three-section RC phase-shift oscillator needs total RC phase shift of 180 degrees plus amplifier phase shift of 180 degrees.</li>
            <li>{"Wien bridge oscillator frequency is commonly $$ f = 1/(2\\pi RC) $$ for equal R and C."}</li>
            <li>Hartley uses split inductance; Colpitts uses split capacitance.</li>
            <li>Crystal oscillator gives the best frequency stability among common analog oscillators.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Revision Summary">
          <ul className="grid gap-2">
            <li>Oscillator converts DC supply energy into AC signal.</li>
            <li>Amplifier compensates circuit loss.</li>
            <li>Feedback returns the output sample to input.</li>
            <li>Frequency-selective network chooses the oscillation frequency.</li>
            <li>Practical oscillators need amplitude stabilization.</li>
            <li>{"Main formula: $$ |A\\beta| = 1 $$ with zero net phase shift."}</li>
          </ul>
        </TopicSection>

        <TopicSection title="Practice Questions">
          <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
          <ul><li>Explain why an oscillator can produce output without an external AC input.</li><li>Why is amplitude control necessary in practical oscillators?</li></ul>
          <h3 className="text-base font-bold text-slate-950">Numerical</h3>
          <ul><li>{"Find $$ \\beta $$ required when $$ A = 80 $$."}</li><li>{"Calculate LC oscillator frequency for $$ L = 2\\,\\mu H $$ and $$ C = 50\\,pF $$."}</li></ul>
          <h3 className="text-base font-bold text-slate-950">MCQs</h3>
          <ul><li>Which oscillator gives highest frequency stability: RC, LC, or crystal?</li><li>In a feedback oscillator, which condition controls phase: amplifier only, feedback network only, or total loop?</li></ul>
        </TopicSection>
      </div>
    </section>
  );
}

function OpAmpDiagram({ mode = "inverting", title = "Op-amp circuit" }) {
  return (
    <svg viewBox="0 0 680 330" className="mx-auto h-auto w-[680px] max-w-none md:w-full" role="img" aria-label={`${title} animated op-amp diagram`}>
      <defs>
        <marker id={`op-arrow-${mode}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0 10 5 0 10Z" fill="#154a96" />
        </marker>
      </defs>
      <style>{`
        .op-flow { stroke-dasharray: 12 10; animation: opFlow 1.1s linear infinite; }
        .op-wave { stroke-dasharray: 360; stroke-dashoffset: 360; animation: opWave 2.4s ease-in-out infinite; }
        .op-pulse { animation: opPulse 1.6s ease-in-out infinite; }
        .op-switch { animation: opSwitch 2s ease-in-out infinite; transform-origin: center; }
        @keyframes opFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -22; } }
        @keyframes opWave { 0% { stroke-dashoffset: 360; } 75%,100% { stroke-dashoffset: 0; } }
        @keyframes opPulse { 0%,100% { opacity: .28; } 50% { opacity: .95; } }
        @keyframes opSwitch { 0%,100% { transform: translateY(22px); } 50% { transform: translateY(-22px); } }
      `}</style>
      <rect x="18" y="18" width="644" height="294" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="42" y="56" fill="#0f172a" fontSize="18" fontWeight="900">{title}</text>

      <path d="M284 104v124l128-62-128-62Z" fill="#eff6ff" stroke="#154a96" strokeWidth="4" strokeLinejoin="round" />
      <text x="300" y="142" fill="#154a96" fontSize="20" fontWeight="900">-</text>
      <text x="300" y="202" fill="#154a96" fontSize="20" fontWeight="900">+</text>
      <path d="M180 136h104M180 196h104M412 166h138" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
      <path className="op-flow" d="M92 136h178M410 166h128" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#op-arrow-${mode})`} />
      <path className="op-wave" d="M68 258c14-24 28-24 42 0s28 24 42 0 28-24 42 0" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
      <path className="op-wave" d={mode === "comparator" || mode === "schmitt" ? "M454 258h34v-48h54v48h54" : "M454 258c20-48 40-48 60 0s40 48 60 0"} fill="none" stroke={mode === "comparator" || mode === "schmitt" ? "#f97316" : "#16a34a"} strokeWidth="4" strokeLinecap="round" />

      {["inverting", "integrator", "differentiator", "summing"].includes(mode) ? (
        <>
          <path d="M182 136v-54h214v84" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#op-arrow-${mode})`} />
          <text x="244" y="74" fill="#f97316" fontSize="14" fontWeight="900">negative feedback</text>
        </>
      ) : null}

      {mode === "noninverting" || mode === "follower" ? (
        <>
          <path d="M550 166v78H238v-48" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#op-arrow-${mode})`} />
          <text x="332" y="270" fill="#f97316" fontSize="14" fontWeight="900">{mode === "follower" ? "output follows input" : "feedback divider sets gain"}</text>
        </>
      ) : null}

      {mode === "comparator" || mode === "schmitt" ? (
        <>
          <line className="op-switch" x1="586" y1="142" x2="586" y2="190" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
          <text x="430" y="96" fill="#154a96" fontSize="14" fontWeight="900">{mode === "schmitt" ? "hysteresis creates two thresholds" : "output saturates high or low"}</text>
        </>
      ) : null}

      <text x="424" y="238" fill="#154a96" fontSize="14" fontWeight="900">
        {mode === "inverting" ? "phase inversion" : mode === "noninverting" ? "same phase gain" : mode === "follower" ? "buffer action" : mode === "summing" ? "currents add at virtual ground" : mode === "integrator" ? "output accumulates input" : mode === "differentiator" ? "output follows rate of change" : "threshold decision"}
      </text>
    </svg>
  );
}

function OpAmpDeepDiveContent({ chapter }) {
  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            Chapter 8 / Professional Op-Amp Builder
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Operational Amplifiers (Op-Amp)
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            An op-amp is a high-gain differential amplifier that becomes predictable
            and useful when feedback is applied. It can amplify, compare, add, subtract,
            integrate, differentiate, filter, buffer, and shape signals.
          </p>
        </div>
        <div className="diagram-placeholder rounded-[24px] border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title="Op-amp feedback visualization" />
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        <TopicSection title="Introduction">
          <p>
            An operational amplifier is a building-block circuit with two inputs and
            one output. It amplifies the voltage difference between the non-inverting
            input and the inverting input.
          </p>
          <p>
            The important idea is not only high gain. The real power of an op-amp comes
            from feedback. Feedback forces the op-amp to behave according to external
            resistors, capacitors, and circuit connections.
          </p>
        </TopicSection>

        <TopicSection title="Why This Topic Matters">
          <ul className="grid gap-2">
            <li>Industry relevance: op-amps are used in sensors, audio systems, filters, data converters, power electronics, medical instruments, and control systems.</li>
            <li>Exam relevance: GATE repeatedly tests inverting, non-inverting, summing, integrator, differentiator, comparator, slew rate, CMRR, and virtual short concepts.</li>
            <li>Interview relevance: strong answers explain virtual short, feedback, saturation, and why ideal assumptions work only in linear negative-feedback operation.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Prerequisites">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>KCL and node-voltage analysis</li>
            <li>Voltage divider rule</li>
            <li>Feedback amplifier basics</li>
            <li>Capacitor current relation</li>
            <li>Time-domain and frequency-domain signal behavior</li>
            <li>Basic diode/transistor amplifier intuition</li>
          </ul>
        </TopicSection>

        <TopicSection title="Basic Intuition">
          <p>
            Imagine the op-amp as a very sensitive balance. If one input becomes slightly
            higher than the other, the output moves strongly. With negative feedback,
            the output moves in whatever direction is needed to make the two input
            terminals almost equal.
          </p>
          <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
            In linear negative feedback, the op-amp output continuously corrects itself
            until the input difference becomes almost zero.
          </blockquote>
        </TopicSection>

        <TopicSection title="Core Theory Explanation">
          <p>
            The open-loop relation is:
          </p>
          <p>{"$$ V_o = A_{OL}(V_+ - V_-) $$"}</p>
          <p>
            Since open-loop gain is extremely large, even a tiny difference between the
            inputs can drive the output into saturation. Negative feedback prevents this
            by returning output information to the inverting input.
          </p>
          <ul className="grid gap-2">
            <li>Ideal input current is zero, so no current enters either input terminal.</li>
            <li>With negative feedback and linear operation, input voltages become nearly equal.</li>
            <li>Closed-loop gain depends mainly on external components, not raw op-amp gain.</li>
            <li>Without negative feedback, the op-amp usually behaves as a comparator.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Step-by-Step Mathematical Derivation">
          <h3 className="text-base font-bold text-slate-950">Inverting Amplifier</h3>
          <p>
            In an ideal inverting amplifier, the non-inverting input is grounded. With
            negative feedback, the inverting input becomes a virtual ground.
          </p>
          <p>{"$$ V_- \\approx V_+ = 0 $$"}</p>
          <p>Because input current into the op-amp is zero, current through input resistor equals current through feedback resistor:</p>
          <p>{"$$ \\frac{V_i - 0}{R_1} = \\frac{0 - V_o}{R_f} $$"}</p>
          <p>{"$$ \\frac{V_o}{V_i} = -\\frac{R_f}{R_1} $$"}</p>
          <p>
            The negative sign means output is inverted by 180 degrees.
          </p>

          <h3 className="text-base font-bold text-slate-950">Non-Inverting Amplifier</h3>
          <p>The feedback divider sends a fraction of output to the inverting input:</p>
          <p>{"$$ V_- = V_o\\frac{R_1}{R_1 + R_f} $$"}</p>
          <p>Since virtual short gives $$ V_- = V_i $$:</p>
          <p>{"$$ V_i = V_o\\frac{R_1}{R_1 + R_f} $$"}</p>
          <p>{"$$ \\frac{V_o}{V_i} = 1 + \\frac{R_f}{R_1} $$"}</p>
        </TopicSection>

        <TopicSection title="Working Principle">
          <ol className="grid gap-2">
            {chapter.workingSteps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-portal-600 text-xs font-black text-white">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </TopicSection>

        <TopicSection title="Diagram Explanation">
          <div className="diagram-placeholder rounded-2xl border border-portal-100 bg-[#f8fbff] p-3">
            <CircuitVisualizationMovedNotice title="Inverting op-amp visualization" />
          </div>
          <p>
            The diagram shows the op-amp comparing its two input terminals. The feedback
            path returns output to the inverting input, making the output settle at the
            value required by the resistor network.
          </p>
        </TopicSection>

        <TopicSection title="Important Formulas">
          <div className="grid gap-3 lg:grid-cols-2">
            {OPAMP_QUICK_TOPICS.map((topic) => (
              <div key={topic.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-base font-bold text-slate-950">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{topic.detail}</p>
                <p className="mt-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-portal-700">{topic.formula}</p>
              </div>
            ))}
          </div>
        </TopicSection>

        <TopicSection title="Op-Amp Topics">
          <div className="grid gap-4">
            {[
              ["Ideal Op-Amp Characteristics", "Infinite open-loop gain, infinite input resistance, zero output resistance, infinite bandwidth, and zero offset are ideal assumptions used to simplify circuit analysis.", "follower"],
              ["Practical Parameters", "Real op-amps have finite slew rate, finite CMRR, input offset voltage, limited output swing, finite bandwidth, and bias currents.", "comparator"],
              ["Inverting Amplifier", "Input current flows through R1 and feedback current flows through Rf. The inverting node behaves as virtual ground.", "inverting"],
              ["Non-Inverting Amplifier", "The input signal enters the high-resistance non-inverting terminal, and feedback divider sets gain without phase inversion.", "noninverting"],
              ["Voltage Follower", "The entire output is fed back to the inverting input, producing unity gain and strong buffering.", "follower"],
              ["Summing Amplifier", "Multiple input currents meet at virtual ground and add through the feedback resistor.", "summing"],
              ["Differentiator and Integrator", "Capacitors in input or feedback path make output depend on rate of change or accumulated input.", "integrator"],
              ["Comparator and Schmitt Trigger", "Without linear negative feedback, the op-amp switches high or low. Schmitt trigger adds hysteresis for noise immunity.", "schmitt"],
            ].map(([heading, text, mode]) => (
              <section key={heading} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-lg font-bold text-slate-950">{heading}</h3>
                <p className="mt-2">{text}</p>
                <div className="diagram-placeholder mt-3 rounded-2xl border border-portal-100 bg-white p-3">
                  <CircuitVisualizationMovedNotice title={`${heading} op-amp visualization`} />
                </div>
              </section>
            ))}
          </div>
        </TopicSection>

        <TopicSection title="Real-World Applications">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>Sensor signal conditioning</li>
            <li>Audio preamplifiers and equalizers</li>
            <li>Active filters in communication systems</li>
            <li>ADC input buffers</li>
            <li>Instrumentation amplifiers</li>
            <li>Comparators and threshold detectors</li>
            <li>Waveform generators</li>
            <li>Control and feedback systems</li>
          </ul>
        </TopicSection>

        <TopicSection title="Solved Examples">
          <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
          <p>{"For an inverting amplifier, let $$ R_f = 20\\,k\\Omega $$ and $$ R_1 = 5\\,k\\Omega $$. Find gain."}</p>
          <p>{"$$ A_v = -\\frac{R_f}{R_1} = -\\frac{20}{5} = -4 $$"}</p>
          <p>The output is four times larger and inverted.</p>

          <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
          <p>{"For a non-inverting amplifier with $$ R_f = 30\\,k\\Omega $$ and $$ R_1 = 10\\,k\\Omega $$:"}</p>
          <p>{"$$ A_v = 1 + \\frac{R_f}{R_1} = 1 + 3 = 4 $$"}</p>
          <p>Output preserves phase and has four times input amplitude.</p>

          <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
          <p>{"If slew rate is $$ 0.5\\,V/\\mu s $$ and sine output peak is $$ 5\\,V $$, maximum undistorted frequency is:"}</p>
          <p>{"$$ SR = 2\\pi f V_m $$"}</p>
          <p>{"$$ f = \\frac{SR}{2\\pi V_m} = \\frac{0.5 \\times 10^6}{2\\pi \\times 5} \\approx 15.9\\,kHz $$"}</p>
        </TopicSection>

        <TopicSection title="Common Mistakes">
          <ul className="grid gap-2">
            <li>Using virtual short when there is no negative feedback.</li>
            <li>Thinking virtual ground means physically connected to ground.</li>
            <li>Forgetting the negative sign in inverting amplifier gain.</li>
            <li>Assuming output can exceed supply rails.</li>
            <li>Ignoring slew rate for large high-frequency signals.</li>
            <li>Confusing comparator operation with linear amplifier operation.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Comparison Tables">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-950">
                <th className="py-2 pr-3">Circuit</th>
                <th className="py-2 pr-3">Gain</th>
                <th className="py-2 pr-3">Phase</th>
                <th className="py-2 pr-3">Main Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Inverting</td><td className="py-2 pr-3">{"$$ -R_f/R_1 $$"}</td><td className="py-2 pr-3">180 degree shift</td><td className="py-2 pr-3">Scaled inversion</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Non-inverting</td><td className="py-2 pr-3">{"$$ 1 + R_f/R_1 $$"}</td><td className="py-2 pr-3">Same phase</td><td className="py-2 pr-3">High input resistance gain</td></tr>
              <tr><td className="py-2 pr-3">Follower</td><td className="py-2 pr-3">{"$$ 1 $$"}</td><td className="py-2 pr-3">Same phase</td><td className="py-2 pr-3">Buffering</td></tr>
            </tbody>
          </table>
        </TopicSection>

        <TopicSection title="Interview Questions">
          <ul className="grid gap-2">
            <li>What is virtual short, and when is it valid?</li>
            <li>Why is input current assumed zero in ideal op-amp analysis?</li>
            <li>Why does an inverting amplifier invert phase?</li>
            <li>What is the difference between an op-amp amplifier and comparator?</li>
            <li>Why does slew rate limit high-frequency signals?</li>
            <li>What does CMRR physically mean?</li>
          </ul>
        </TopicSection>

        <TopicSection title="Exam-Oriented Quick Notes">
          <ul className="grid gap-2">
            <li>Use virtual short only with negative feedback and unsaturated output.</li>
            <li>Input current into ideal op-amp terminals is zero.</li>
            <li>Inverting node may be virtual ground, but it is not physically grounded.</li>
            <li>Comparator output saturates high or low depending on input polarity.</li>
            <li>{"For sinusoidal output, slew-rate condition is $$ SR \\ge 2\\pi f V_m $$."}</li>
          </ul>
        </TopicSection>

        <TopicSection title="Revision Summary">
          <ul className="grid gap-2">
            <li>Op-amp amplifies differential input voltage.</li>
            <li>Negative feedback makes circuit behavior stable and resistor-controlled.</li>
            <li>Ideal assumptions: infinite gain, infinite input resistance, zero output resistance.</li>
            <li>{"Inverting gain: $$ -R_f/R_1 $$."}</li>
            <li>{"Non-inverting gain: $$ 1 + R_f/R_1 $$."}</li>
            <li>Comparator and Schmitt trigger are switching applications, not linear amplifiers.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Practice Questions">
          <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
          <ul><li>Explain why feedback makes op-amp gain predictable.</li><li>Why is voltage follower useful if its gain is only one?</li></ul>
          <h3 className="text-base font-bold text-slate-950">Numerical</h3>
          <ul><li>{"Find inverting gain when $$ R_f = 100\\,k\\Omega $$ and $$ R_1 = 20\\,k\\Omega $$."}</li><li>{"Find non-inverting gain when $$ R_f = 47\\,k\\Omega $$ and $$ R_1 = 10\\,k\\Omega $$."}</li></ul>
          <h3 className="text-base font-bold text-slate-950">MCQs</h3>
          <ul><li>Which terminal receives feedback in a standard inverting amplifier?</li><li>Which parameter limits output rate of change?</li></ul>
        </TopicSection>
      </div>
    </section>
  );
}

function ActiveFiltersWaveformDeepDiveContent({ chapter }) {
  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            Chapter 9 / Professional Signal Shaping
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Active Filters and Waveform Generators
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            Active filters use op-amps with resistors and capacitors to select useful
            frequency components from a signal. Waveform generators use op-amp switching
            and integration to create square, triangular, and related timing waveforms.
          </p>
        </div>
        <div className="diagram-placeholder flex min-h-[220px] items-center justify-center rounded-[24px] border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
          Signal Flow Diagram Here
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        <TopicSection title="Introduction">
          <p>
            In real electronics, signals rarely arrive clean. A sensor may contain useful
            low-frequency information plus high-frequency noise. A communication receiver
            may need one narrow frequency band while rejecting everything else. A timing
            circuit may need a stable square wave or triangular ramp without using a
            microcontroller.
          </p>
          <p>
            Active filters solve the frequency-selection problem. Waveform generators
            solve the signal-creation problem. Both topics are natural extensions of
            op-amp feedback, RC charging, saturation, and frequency response.
          </p>
        </TopicSection>

        <TopicSection title="Why This Topic Matters">
          <ul className="grid gap-2">
            <li>Industry relevance: active filters are used in audio equalizers, biomedical instruments, anti-aliasing filters, sensor conditioning, communication receivers, and control systems.</li>
            <li>Waveform-generator relevance: square and triangular waves are used in PWM circuits, function generators, clock sources, sweep generators, SMPS control, and testing instruments.</li>
            <li>Exam relevance: GATE and university exams often ask cutoff frequency, passband gain, roll-off, transfer-function behavior, Schmitt-trigger thresholds, and integrator output slope.</li>
            <li>Interview relevance: strong answers explain what the capacitor does at low and high frequency, instead of only writing the formula for cutoff frequency.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Prerequisites">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>Op-amp virtual short and negative feedback</li>
            <li>Comparator and saturation behavior</li>
            <li>Capacitive reactance and RC time constant</li>
            <li>Frequency response and Bode plot basics</li>
            <li>Integrator and differentiator circuits</li>
            <li>Voltage divider rule and KCL</li>
          </ul>
        </TopicSection>

        <TopicSection title="Basic Intuition">
          <p>
            A filter is like a frequency gate. It does not judge a signal by amplitude
            alone; it judges how fast the signal changes. Slow variation corresponds to
            low frequency, and rapid variation corresponds to high frequency.
          </p>
          <p>
            The capacitor is the key frequency-sensitive element. At low frequency, it
            has high reactance and behaves almost like an open circuit. At high frequency,
            it has low reactance and behaves almost like a short circuit. By placing this
            capacitor in the right part of an op-amp circuit, we decide which frequencies
            are passed, attenuated, amplified, or rejected.
          </p>
          <p>
            A waveform generator uses the same capacitor idea differently. Instead of
            filtering an existing signal, the circuit repeatedly charges and discharges
            a capacitor, producing ramps. A comparator then converts those ramps into
            sharp square-wave transitions.
          </p>
        </TopicSection>

        <TopicSection title="Active Filters and Waveform Generators - Simplified Concept Explanation">
          <h3 className="text-base font-bold text-slate-950">Capacitor Reactance: The Main Idea Behind Filters</h3>
          <p>
            A capacitor behaves differently at different frequencies. This is the main
            reason RC filters work. At low frequency, a capacitor offers high opposition
            to the signal. At high frequency, it offers very low opposition.
          </p>
          <p>
            This opposition is called capacitive reactance.
          </p>
          <p>{"$$ X_C = \\frac{1}{2\\pi f C} $$"}</p>
          <ul className="grid gap-2">
            <li>{"$$ X_C $$ is capacitive reactance, measured in ohms."}</li>
            <li>{"$$ f $$ is the signal frequency."}</li>
            <li>{"$$ C $$ is capacitance."}</li>
          </ul>
          <p>
            The most important observation is that frequency is in the denominator.
            Therefore, when frequency increases, capacitive reactance decreases. When
            frequency decreases, capacitive reactance increases.
          </p>
          <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
            Easy picture: a capacitor behaves like a frequency-controlled gate. Slow
            signals are blocked more. Fast signals pass more easily.
          </blockquote>

          <h3 className="text-base font-bold text-slate-950">Cutoff Frequency</h3>
          <p>
            Cutoff frequency is the transition point where the filter starts changing
            its response significantly. At this frequency, the resistor and capacitor
            have equal influence on the signal.
          </p>
          <p>{"$$ f_c = \\frac{1}{2\\pi RC} $$"}</p>
          <ul className="grid gap-2">
            <li>{"$$ f_c $$ is cutoff frequency."}</li>
            <li>{"$$ R $$ is resistance."}</li>
            <li>{"$$ C $$ is capacitance."}</li>
          </ul>
          <p>
            Larger resistance or capacitance makes the circuit slower, so cutoff
            frequency becomes lower. Smaller resistance or capacitance makes the circuit
            faster, so cutoff frequency becomes higher.
          </p>
          <ul className="grid gap-2">
            <li>{"Large $$ RC $$ gives lower cutoff frequency."}</li>
            <li>{"Small $$ RC $$ gives higher cutoff frequency."}</li>
          </ul>
          <p>
            Cutoff frequency is not the point where output becomes zero. At cutoff
            frequency, the output voltage becomes:
          </p>
          <p>{"$$ V_o = \\frac{1}{\\sqrt{2}}V_{passband} \\approx 0.707V_{passband} $$"}</p>
          <p>
            This means the output voltage is about 70.7 percent of the maximum passband
            voltage. Since power depends on voltage squared:
          </p>
          <p>{"$$ (0.707)^2 \\approx 0.5 $$"}</p>
          <p>
            So the output power becomes half of the passband power. That is why cutoff
            frequency is also called half-power frequency or -3 dB frequency.
          </p>

          <h3 className="text-base font-bold text-slate-950">Low-Pass Filter</h3>
          <p>
            A low-pass filter allows low-frequency signals to pass and reduces
            high-frequency signals.
          </p>
          <p>{"$$ H(s)=\\frac{1}{1+sRC} $$"}</p>
          <ul className="grid gap-2">
            <li>{"At low frequency, $$ sRC $$ is very small, so the denominator is almost 1 and output is almost equal to input."}</li>
            <li>{"At high frequency, $$ sRC $$ becomes large, so the denominator increases and output decreases."}</li>
          </ul>
          <blockquote className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm font-semibold leading-6 text-emerald-950">
            Memory tip: low-pass filter passes slow-changing signals.
          </blockquote>

          <h3 className="text-base font-bold text-slate-950">High-Pass Filter</h3>
          <p>
            A high-pass filter blocks low-frequency signals and allows high-frequency
            signals to pass.
          </p>
          <p>{"$$ H(s)=\\frac{sRC}{1+sRC} $$"}</p>
          <ul className="grid gap-2">
            <li>{"At low frequency, the numerator $$ sRC $$ is very small, so output becomes nearly zero."}</li>
            <li>{"At high frequency, numerator and denominator become nearly equal, so output approaches input."}</li>
          </ul>
          <blockquote className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm font-semibold leading-6 text-emerald-950">
            Memory tip: high-pass filter passes fast-changing signals.
          </blockquote>

          <h3 className="text-base font-bold text-slate-950">Integrator and Ramp Generation</h3>
          <p>
            An op-amp integrator converts a constant input voltage into a linearly
            changing output waveform. This linearly changing output is called a ramp.
          </p>
          <p>{"$$ \\frac{dV_o}{dt}=-\\frac{V_{in}}{RC} $$"}</p>
          <ul className="grid gap-2">
            <li>{"$$ V_{in} $$ is the input voltage."}</li>
            <li>{"$$ RC $$ is the time constant."}</li>
            <li>{"$$ dV_o/dt $$ is the rate of change, or slope, of the output voltage."}</li>
          </ul>
          <p>
            Larger input voltage produces a steeper ramp. Larger $$ RC $$ produces a
            slower ramp. The negative sign appears because the common op-amp integrator
            is inverting: positive input creates a downward ramp, and negative input
            creates an upward ramp.
          </p>

          <h3 className="text-base font-bold text-slate-950">How to Understand Filter Formulas Easily</h3>
          <ol className="grid gap-2">
            <li>First understand the capacitor: low frequency is blocked more, high frequency passes more.</li>
            <li>Then check where output is taken: across capacitor means low-pass behavior, across resistor means high-pass behavior.</li>
            <li>Finally understand the RC effect: large RC means slow response, small RC means fast response.</li>
          </ol>

          <h3 className="text-base font-bold text-slate-950">Quick Revision Table</h3>
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-950">
                <th className="py-2 pr-3">Concept</th>
                <th className="py-2 pr-3">Easy Understanding</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Capacitor reactance</td><td className="py-2 pr-3">Opposition decreases as frequency increases</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Low-pass filter</td><td className="py-2 pr-3">Passes low-frequency signals</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">High-pass filter</td><td className="py-2 pr-3">Passes high-frequency signals</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Cutoff frequency</td><td className="py-2 pr-3">Transition point of filter response</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Integrator</td><td className="py-2 pr-3">Converts constant input into ramp output</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Large RC</td><td className="py-2 pr-3">Slower circuit response</td></tr>
              <tr><td className="py-2 pr-3">Small RC</td><td className="py-2 pr-3">Faster circuit response</td></tr>
            </tbody>
          </table>

          <p>
            Final concept: active filters work because capacitors react differently at
            different frequencies. Low-pass filters pass slow-changing signals,
            high-pass filters pass fast-changing signals, cutoff frequency defines the
            transition region, and integrators convert constant voltage into ramp
            waveforms.
          </p>
        </TopicSection>

        <TopicSection title="Core Theory Explanation">
          <p>
            An active filter contains passive frequency-selective elements and an active
            device, usually an op-amp. The RC network decides frequency behavior, while
            the op-amp provides buffering, gain, and isolation between stages.
          </p>
          <ul className="grid gap-2">
            <li>Low-pass filter: passes slow changes and attenuates fast changes.</li>
            <li>High-pass filter: blocks DC or slow changes and passes fast changes.</li>
            <li>Band-pass filter: passes only a selected middle band of frequencies.</li>
            <li>Band-stop filter: rejects a selected band and passes frequencies below and above it.</li>
          </ul>
          <p>
            Waveform generators usually combine two op-amp actions. A Schmitt trigger
            acts as a decision-maker with two threshold levels. An integrator acts as a
            ramp-maker because a constant input voltage through a resistor produces an
            almost constant capacitor current.
          </p>
        </TopicSection>

        <TopicSection title="Step-by-Step Formula Understanding">
          <h3 className="text-base font-bold text-slate-950">Step 1: Understand the Capacitor First</h3>
          <p>
            Do not start by memorizing filter formulas. Start with the capacitor. A
            capacitor gives high opposition to slow-changing signals and low opposition
            to fast-changing signals.
          </p>
          <p className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 font-bold text-slate-950">
            Capacitor opposition = 1 / (2 x pi x frequency x capacitance)
          </p>
          <p>
            This formula is only saying one simple thing: frequency is in the bottom
            part of the expression. So frequency and capacitor opposition move in
            opposite directions.
          </p>
          <ul className="grid gap-2">
            <li>If frequency increases, capacitor opposition decreases. High-frequency signals pass more easily through the capacitor.</li>
            <li>If frequency decreases, capacitor opposition increases. Low-frequency signals are blocked more by the capacitor.</li>
            <li>If capacitance is larger, the capacitor also gives less opposition to AC signals.</li>
          </ul>
          <div className="diagram-placeholder flex min-h-[120px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
            Capacitor Reactance Versus Frequency Graph Here
          </div>

          <h3 className="text-base font-bold text-slate-950">Step 2: Understand Cutoff Frequency</h3>
          <p>
            Cutoff frequency is the transition point of the filter. It is not the point
            where output becomes zero. It is the point where the filter response starts
            changing clearly.
          </p>
          <p>{"$$ f_c = \\frac{1}{2\\pi RC} $$"}</p>
          <ul className="grid gap-2">
            <li>{"Large $$ R $$ or large $$ C $$ makes the circuit slower, so $$ f_c $$ becomes lower."}</li>
            <li>{"Small $$ R $$ or small $$ C $$ makes the circuit faster, so $$ f_c $$ becomes higher."}</li>
            <li>{"At cutoff, output voltage is about $$ 0.707 $$ times the passband voltage."}</li>
          </ul>
          <p>{"$$ V_o = \\frac{1}{\\sqrt{2}}V_{passband} \\approx 0.707V_{passband} $$"}</p>
          <p>
            Since power depends on voltage squared, 0.707 voltage gives about half
            power. That is why cutoff frequency is also called half-power frequency or
            -3 dB frequency.
          </p>

          <h3 className="text-base font-bold text-slate-950">Step 3: Understand Low-Pass Filter</h3>
          <p>
            A low-pass filter passes slow-changing signals and reduces fast-changing
            signals.
          </p>
          <p>{"$$ H(s)=\\frac{1}{1+sRC} $$"}</p>
          <ul className="grid gap-2">
            <li>{"At low frequency, $$ sRC $$ is very small. The denominator is almost 1, so output is almost equal to input."}</li>
            <li>{"At high frequency, $$ sRC $$ becomes large. The denominator increases, so output decreases."}</li>
          </ul>
          <blockquote className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm font-semibold leading-6 text-emerald-950">
            Simple memory: low-pass means low frequency passes.
          </blockquote>

          <h3 className="text-base font-bold text-slate-950">Step 4: Understand High-Pass Filter</h3>
          <p>
            A high-pass filter blocks slow-changing signals and passes fast-changing
            signals.
          </p>
          <p>{"$$ H(s)=\\frac{sRC}{1+sRC} $$"}</p>
          <ul className="grid gap-2">
            <li>{"At low frequency, numerator $$ sRC $$ is very small, so output is nearly zero."}</li>
            <li>{"At high frequency, numerator and denominator become almost equal, so output approaches input."}</li>
          </ul>
          <blockquote className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm font-semibold leading-6 text-emerald-950">
            Simple memory: high-pass means high frequency passes.
          </blockquote>

          <h3 className="text-base font-bold text-slate-950">Step 5: Understand Integrator Ramp Generation</h3>
          <p>
            An op-amp integrator converts a constant input voltage into a linearly
            changing output voltage. This linearly changing output is called a ramp.
          </p>
          <p>{"$$ \\frac{dV_o}{dt}=-\\frac{V_{in}}{RC} $$"}</p>
          <ul className="grid gap-2">
            <li>{"Larger $$ V_{in} $$ produces a steeper ramp."}</li>
            <li>{"Larger $$ RC $$ produces a slower ramp."}</li>
            <li>The negative sign appears because the common integrator is inverting.</li>
          </ul>
          <p>
            Therefore, a positive input creates a downward ramp, and a negative input
            creates an upward ramp.
          </p>
        </TopicSection>

        <TopicSection title="Working Principle">
          <ol className="grid gap-2">
            {chapter.workingSteps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-portal-600 text-xs font-black text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </TopicSection>

        <TopicSection title="Diagram Explanation">
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="diagram-placeholder flex min-h-[150px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
              Active Filter Circuit Diagram Here
            </div>
            <div className="diagram-placeholder flex min-h-[150px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
              Waveform Generator Timing Diagram Here
            </div>
          </div>
          <p>
            In the filter diagram, the RC path changes signal division with frequency
            and the op-amp controls gain or buffering. In the waveform-generator timing
            diagram, the square wave switches between saturation levels while the
            triangular wave rises and falls linearly between threshold voltages.
          </p>
        </TopicSection>

        <TopicSection title="Important Formulas">
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-base font-bold text-slate-950">Capacitive Reactance</h3>
              <p className="mt-2 font-bold text-portal-700">{"$$ X_C = \\frac{1}{2\\pi f C} $$"}</p>
              <p className="mt-2 text-sm leading-6">As frequency increases, the capacitor offers less opposition. This is the root idea behind RC filters.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-base font-bold text-slate-950">Cutoff Frequency</h3>
              <p className="mt-2 font-bold text-portal-700">{"$$ f_c = \\frac{1}{2\\pi RC} $$"}</p>
              <p className="mt-2 text-sm leading-6">This is the transition frequency where output becomes 0.707 of passband value for a first-order section.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-base font-bold text-slate-950">Low-Pass Transfer Function</h3>
              <p className="mt-2 font-bold text-portal-700">{"$$ H(s)=\\frac{1}{1+sRC} $$"}</p>
              <p className="mt-2 text-sm leading-6">Low frequencies see almost unity transfer; high frequencies are attenuated.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-base font-bold text-slate-950">High-Pass Transfer Function</h3>
              <p className="mt-2 font-bold text-portal-700">{"$$ H(s)=\\frac{sRC}{1+sRC} $$"}</p>
              <p className="mt-2 text-sm leading-6">Low frequencies are blocked; high frequencies are passed.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-base font-bold text-slate-950">Band-Pass Quality Factor</h3>
              <p className="mt-2 font-bold text-portal-700">{"$$ Q = \\frac{f_0}{BW} = \\frac{f_0}{f_H-f_L} $$"}</p>
              <p className="mt-2 text-sm leading-6">Higher Q means the filter is more selective around the center frequency.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-base font-bold text-slate-950">Integrator Output Slope</h3>
              <p className="mt-2 font-bold text-portal-700">{"$$ \\frac{dV_o}{dt}=-\\frac{V_{in}}{RC} $$"}</p>
              <p className="mt-2 text-sm leading-6">A constant input creates a straight-line output ramp.</p>
            </div>
          </div>
        </TopicSection>

        <TopicSection title="Real-World Applications">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>Anti-aliasing filters before ADCs</li>
            <li>Audio tone control and equalization</li>
            <li>ECG, EEG, and biomedical signal conditioning</li>
            <li>Noise removal in sensor interfaces</li>
            <li>Channel selection in communication receivers</li>
            <li>PWM and ramp generation in power electronics</li>
            <li>Function generators and lab instruments</li>
            <li>Clock and timing signal generation</li>
          </ul>
        </TopicSection>

        <TopicSection title="Solved Examples">
          <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
          <p>{"A low-pass filter has $$ R = 10\\,k\\Omega $$ and $$ C = 0.01\\,\\mu F $$. Find cutoff frequency."}</p>
          <p>{"$$ f_c = \\frac{1}{2\\pi RC} $$"}</p>
          <p>{"$$ f_c = \\frac{1}{2\\pi(10^4)(10^{-8})} \\approx 1591\\,Hz $$"}</p>
          <p>
            Frequencies much below 1.59 kHz pass almost unchanged. Frequencies much above
            1.59 kHz are increasingly attenuated.
          </p>

          <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
          <p>{"A band-pass filter has lower cutoff $$ f_L = 1\\,kHz $$ and upper cutoff $$ f_H = 10\\,kHz $$. Find bandwidth and center frequency."}</p>
          <p>{"$$ BW = f_H - f_L = 10\\,kHz - 1\\,kHz = 9\\,kHz $$"}</p>
          <p>{"$$ f_0 = \\sqrt{f_L f_H} = \\sqrt{1\\times10}\\,kHz \\approx 3.16\\,kHz $$"}</p>
          <p>
            The center frequency is geometric mean, not arithmetic mean, because frequency
            response is multiplicative on a logarithmic scale.
          </p>

          <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
          <p>{"An op-amp integrator has $$ R = 20\\,k\\Omega $$ and $$ C = 0.1\\,\\mu F $$. If a constant $$ +2\\,V $$ is applied, find output slope."}</p>
          <p>{"$$ \\frac{dV_o}{dt} = -\\frac{V_{in}}{RC} $$"}</p>
          <p>{"$$ RC = (20\\times10^3)(0.1\\times10^{-6}) = 2\\times10^{-3}\\,s $$"}</p>
          <p>{"$$ \\frac{dV_o}{dt} = -\\frac{2}{2\\times10^{-3}} = -1000\\,V/s $$"}</p>
          <p>
            The negative sign means the output ramps downward because the circuit is an
            inverting integrator.
          </p>
        </TopicSection>

        <TopicSection title="Common Mistakes">
          <ul className="grid gap-2">
            <li>Thinking cutoff frequency is where output becomes zero. It is actually the -3 dB transition point.</li>
            <li>{"Using $$ f_c = 1/(2\\pi RC) $$ without converting kilo-ohm, microfarad, and nanofarad units correctly."}</li>
            <li>Confusing low-pass and high-pass by memorizing circuits instead of checking where output is taken.</li>
            <li>Forgetting that active filters need op-amp bandwidth high enough for the required frequency range.</li>
            <li>Using virtual short in a comparator or Schmitt trigger; those circuits operate in saturation, not linear feedback.</li>
            <li>Assuming triangular-wave amplitude is set by integrator alone. It is mainly bounded by Schmitt-trigger thresholds.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Comparison Tables">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-950">
                <th className="py-2 pr-3">Circuit</th>
                <th className="py-2 pr-3">Passes</th>
                <th className="py-2 pr-3">Rejects</th>
                <th className="py-2 pr-3">Main Engineering Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Low-pass</td><td className="py-2 pr-3">Low frequencies</td><td className="py-2 pr-3">High-frequency noise</td><td className="py-2 pr-3">Sensor smoothing, anti-aliasing</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">High-pass</td><td className="py-2 pr-3">High frequencies</td><td className="py-2 pr-3">DC and slow drift</td><td className="py-2 pr-3">AC coupling, drift removal</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Band-pass</td><td className="py-2 pr-3">Selected band</td><td className="py-2 pr-3">Low and high extremes</td><td className="py-2 pr-3">Channel selection</td></tr>
              <tr><td className="py-2 pr-3">Band-stop</td><td className="py-2 pr-3">Outside selected band</td><td className="py-2 pr-3">One unwanted band</td><td className="py-2 pr-3">Hum or interference rejection</td></tr>
            </tbody>
          </table>
          <table className="mt-4 w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-950">
                <th className="py-2 pr-3">Waveform Circuit</th>
                <th className="py-2 pr-3">Main Block</th>
                <th className="py-2 pr-3">Output Nature</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Schmitt trigger</td><td className="py-2 pr-3">Comparator with positive feedback</td><td className="py-2 pr-3">Square wave or clean switching</td></tr>
              <tr><td className="py-2 pr-3">Integrator</td><td className="py-2 pr-3">Op-amp with feedback capacitor</td><td className="py-2 pr-3">Ramp or triangular wave</td></tr>
            </tbody>
          </table>
        </TopicSection>

        <TopicSection title="Interview Questions">
          <ul className="grid gap-2">
            <li>Why is an active filter called active?</li>
            <li>What physically happens to capacitor reactance as frequency increases?</li>
            <li>Why is cutoff frequency called the -3 dB frequency?</li>
            <li>How do you decide whether an RC circuit is low-pass or high-pass?</li>
            <li>Why are inductors avoided in many active filters?</li>
            <li>How does a Schmitt trigger improve noise immunity?</li>
            <li>Why does an integrator convert a square wave into a triangular wave?</li>
            <li>What limits the maximum frequency of a practical op-amp waveform generator?</li>
          </ul>
        </TopicSection>

        <TopicSection title="Exam-Oriented Quick Notes">
          <ul className="grid gap-2">
            <li>{"For first-order RC filters, remember $$ f_c = 1/(2\\pi RC) $$ and check unit conversion first."}</li>
            <li>At cutoff, output magnitude is 0.707 of passband output and phase shift is 45 degrees for a first-order RC section.</li>
            <li>A first-order filter has roll-off of 20 dB/decade; second-order has 40 dB/decade.</li>
            <li>{"Band-pass bandwidth is $$ f_H - f_L $$ and center frequency is usually $$ \\sqrt{f_L f_H} $$."}</li>
            <li>Schmitt trigger questions usually depend on upper and lower threshold voltages, not only op-amp saturation voltage.</li>
            <li>{"For integrator ramp problems, write slope first: $$ dV_o/dt = -V_{in}/RC $$."}</li>
          </ul>
        </TopicSection>

        <TopicSection title="Revision Summary">
          <ul className="grid gap-2">
            <li>Active filters combine op-amps with RC networks to control frequency response.</li>
            <li>Capacitor reactance decreases as frequency increases.</li>
            <li>Low-pass passes slow signals; high-pass passes rapidly changing signals.</li>
            <li>Band-pass accepts a frequency window; band-stop rejects a frequency window.</li>
            <li>Cutoff frequency is the -3 dB transition point, not a sudden stop.</li>
            <li>Schmitt trigger creates square switching using two thresholds.</li>
            <li>Integrator converts constant voltage into a linear ramp.</li>
            <li>{"Key formulas: $$ X_C = 1/(2\\pi fC) $$, $$ f_c = 1/(2\\pi RC) $$, and $$ dV_o/dt = -V_{in}/RC $$."}</li>
          </ul>
        </TopicSection>

        <TopicSection title="Practice Questions">
          <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
          <ul className="grid gap-2">
            <li>Explain low-pass filter action using capacitor reactance.</li>
            <li>Why does a high-pass filter block DC?</li>
            <li>Why does an integrator output become triangular when input is square?</li>
          </ul>
          <h3 className="text-base font-bold text-slate-950">Numerical</h3>
          <ul className="grid gap-2">
            <li>{"Find cutoff frequency for $$ R=4.7\\,k\\Omega $$ and $$ C=0.047\\,\\mu F $$."}</li>
            <li>{"A band-pass filter has $$ f_L=300\\,Hz $$ and $$ f_H=3\\,kHz $$. Find bandwidth and center frequency."}</li>
            <li>{"For an integrator with $$ R=10\\,k\\Omega $$, $$ C=0.01\\,\\mu F $$, and input $$ 1\\,V $$, find output slope."}</li>
          </ul>
          <h3 className="text-base font-bold text-slate-950">MCQs</h3>
          <ul className="grid gap-2">
            <li>At cutoff frequency of a first-order filter, voltage gain becomes: 1, 0.707, 0, or 2?</li>
            <li>Which filter rejects a narrow unwanted frequency band: low-pass, high-pass, band-pass, or band-stop?</li>
            <li>Which op-amp circuit is normally used to generate a triangular wave from a square wave?</li>
          </ul>
        </TopicSection>
      </div>
    </section>
  );
}

function PowerSuppliesDeepDiveContent({ chapter }) {
  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            Chapter 10 / Practical DC Energy System
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Power Supplies
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            A power supply converts available electrical energy into a stable DC voltage
            required by electronic circuits. It is the hidden foundation behind almost
            every analog, digital, communication, embedded, and instrumentation system.
          </p>
        </div>
        <div className="diagram-placeholder flex min-h-[220px] items-center justify-center rounded-[24px] border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
          Power Supply Block Diagram Here
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        <TopicSection title="Introduction">
          <p>
            Every electronic circuit needs energy, but it does not usually need raw AC
            from the mains. A microcontroller may need 5 V DC, an op-amp circuit may need
            dual 12 V supplies, and an RF module may need a very clean 3.3 V line. A
            power supply is the circuit that prepares this usable DC energy.
          </p>
          <p>
            In analog electronics, a power supply is not just a supporting topic. Noise,
            ripple, poor regulation, heating, and wrong grounding can make even a good
            amplifier, filter, or sensor circuit behave badly.
          </p>
        </TopicSection>

        <TopicSection title="Why This Topic Matters">
          <ul className="grid gap-2">
            <li>Industry relevance: power supplies are used in chargers, routers, TVs, medical devices, PLCs, lab instruments, telecom systems, and embedded boards.</li>
            <li>Analog relevance: amplifier hum, ADC error, op-amp offset problems, and sensor noise often come from poor supply design.</li>
            <li>Exam relevance: university and GATE-style questions often test rectifier output, ripple factor, PIV, capacitor filter behavior, Zener regulation, IC regulators, and SMPS block operation.</li>
            <li>Interview relevance: strong answers connect transformer, rectifier, filter, regulator, load current, heat, ripple, and efficiency as one energy path.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Prerequisites">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>AC voltage, RMS value, and peak value</li>
            <li>PN junction diode conduction</li>
            <li>Capacitor charging and discharging</li>
            <li>Zener diode breakdown operation</li>
            <li>Basic transistor and op-amp regulation idea</li>
            <li>Inductor energy storage for SMPS basics</li>
          </ul>
        </TopicSection>

        <TopicSection title="Basic Intuition">
          <p>
            Think of the power supply as a water preparation plant. The transformer
            changes the pressure level. The rectifier makes flow move in one direction.
            The filter tank smooths the pulses. The regulator keeps the final pressure
            nearly constant even when demand changes.
          </p>
          <p>
            Electrically, AC alternates polarity, but electronic circuits usually need
            one fixed polarity. Rectification makes current unidirectional. Filtering
            reduces the up-and-down variation. Regulation corrects the remaining changes.
          </p>
          <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
            Simple view: rectifier decides direction, filter reduces ripple, regulator
            holds voltage steady.
          </blockquote>
        </TopicSection>

        <TopicSection title="Core Theory Explanation">
          <p>
            A practical linear DC supply is commonly built in four stages:
          </p>
          <ul className="grid gap-2">
            <li>Transformer: steps AC voltage up or down and can provide isolation from mains.</li>
            <li>Rectifier: uses diodes to convert AC into pulsating DC.</li>
            <li>Filter: uses capacitor, inductor, or LC network to reduce ripple.</li>
            <li>Regulator: keeps output voltage nearly constant despite input or load changes.</li>
          </ul>
          <p>
            A switch-mode power supply uses a different method. It switches energy at
            high frequency and transfers it through inductors, transformers, capacitors,
            and feedback control. This gives high efficiency and smaller magnetic
            components compared with a low-frequency linear supply.
          </p>
        </TopicSection>

        <TopicSection title="Step-by-Step Mathematical Derivation">
          <h3 className="text-base font-bold text-slate-950">1. RMS Voltage to Peak Voltage</h3>
          <p>
            AC mains and transformer secondary voltages are usually given as RMS values.
            Rectifier capacitor charging depends mainly on the peak value, so first
            convert RMS to peak.
          </p>
          <p>{"$$ V_m = \\sqrt{2}V_{rms} $$"}</p>
          <ul className="grid gap-2">
            <li>{"$$ V_m $$ is the maximum peak of the sine wave."}</li>
            <li>{"$$ V_{rms} $$ is the effective AC value printed on the transformer rating."}</li>
          </ul>
          <p>
            Plain meaning: a 12 V RMS transformer does not peak at 12 V. Its sine wave
            reaches about 16.97 V before diode drops and load effects.
          </p>

          <h3 className="text-base font-bold text-slate-950">2. Average DC Output of Rectifiers</h3>
          <p>
            Rectification does not immediately produce perfectly flat DC. It produces a
            unidirectional waveform. The average value tells us the DC level of that
            pulsating waveform before filtering.
          </p>
          <p>{"Half-wave rectifier average output: $$ V_{DC} = \\frac{V_m}{\\pi} $$"}</p>
          <p>{"Full-wave or bridge rectifier average output: $$ V_{DC} = \\frac{2V_m}{\\pi} $$"}</p>
          <p>
            Physical meaning: full-wave rectification uses both half-cycles, so it gives
            a higher average DC value and lower ripple than half-wave rectification.
          </p>

          <h3 className="text-base font-bold text-slate-950">3. Ripple Frequency</h3>
          <p>
            Ripple is the leftover AC variation riding on the DC output. Its frequency
            depends on how often the capacitor is recharged.
          </p>
          <ul className="grid gap-2">
            <li>Half-wave rectifier recharges once per AC cycle, so ripple frequency equals supply frequency.</li>
            <li>Full-wave and bridge rectifiers recharge twice per AC cycle, so ripple frequency is double the supply frequency.</li>
          </ul>
          <p>{"Half-wave rectifier: $$ f_r = f $$"}</p>
          <p>{"Full-wave or bridge rectifier: $$ f_r = 2f $$"}</p>

          <h3 className="text-base font-bold text-slate-950">4. Capacitor Filter Ripple Approximation</h3>
          <p>
            A filter capacitor charges near the rectified peak and then discharges into
            the load between peaks. More load current discharges it faster. A larger
            capacitor discharges more slowly.
          </p>
          <p>{"$$ V_{r(pp)} \\approx \\frac{I_L}{f_r C} $$"}</p>
          <ul className="grid gap-2">
            <li>{"$$ V_{r(pp)} $$ is peak-to-peak ripple voltage."}</li>
            <li>{"$$ I_L $$ is load current. More load current means more ripple."}</li>
            <li>{"$$ f_r $$ is ripple frequency. Higher recharge frequency means less ripple."}</li>
            <li>{"$$ C $$ is filter capacitance. Larger capacitance means less ripple."}</li>
          </ul>
          <p>
            Plain meaning: ripple becomes smaller when the capacitor is larger, load
            current is smaller, or the capacitor is refreshed more often.
          </p>

          <h3 className="text-base font-bold text-slate-950">5. Zener Regulator Condition</h3>
          <p>
            A Zener regulator works only if the Zener stays in breakdown and current
            remains within a safe range.
          </p>
          <p>{"$$ I_S = \\frac{V_{in}-V_Z}{R_S} $$"}</p>
          <p>{"$$ I_Z = I_S - I_L $$"}</p>
          <p>
            The series resistor carries current from the input. Part of that current
            goes to the load, and the remaining current goes through the Zener. If load
            current becomes too high, Zener current may fall below the minimum required
            value and regulation is lost.
          </p>

          <h3 className="text-base font-bold text-slate-950">6. Linear Regulator Power Loss</h3>
          <p>
            A linear regulator behaves like a controlled voltage-dropping element. The
            voltage difference between input and output becomes heat.
          </p>
          <p>{"$$ P_{loss} = (V_{in}-V_o)I_L $$"}</p>
          <p>
            This formula is very important practically. A large input-output difference
            and high load current cause heating, so heat sink design may become necessary.
          </p>
        </TopicSection>

        <TopicSection title="Working Principle">
          <ol className="grid gap-2">
            {chapter.workingSteps.map((step, index) => (
              <li key={step} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-portal-600 text-xs font-black text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </TopicSection>

        <TopicSection title="Diagram Explanation">
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="diagram-placeholder flex min-h-[150px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
              Regulated Power Supply Block Diagram Here
            </div>
            <div className="diagram-placeholder flex min-h-[150px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
              Rectifier Output and Filtered Waveform Here
            </div>
          </div>
          <p>
            The block diagram should show AC input moving through transformer, rectifier,
            filter, and regulator. The waveform diagram should show AC sine wave,
            pulsating DC after rectification, reduced ripple after filtering, and nearly
            flat DC after regulation.
          </p>
        </TopicSection>

        <TopicSection title="Important Formulas">
          <div className="grid gap-3 lg:grid-cols-2">
            {[
              ["Peak from RMS", "$$ V_m = \\sqrt{2}V_{rms} $$", "Converts transformer RMS voltage into sine-wave peak voltage."],
              ["Half-wave DC value", "$$ V_{DC} = V_m/\\pi $$", "Average value when only one half-cycle is used."],
              ["Full-wave DC value", "$$ V_{DC} = 2V_m/\\pi $$", "Average value when both half-cycles are used."],
              ["Ripple factor", "$$ r = V_{r(rms)}/V_{DC} $$", "Measures AC ripple compared with useful DC output."],
              ["Capacitor ripple", "$$ V_{r(pp)} \\approx I_L/(f_r C) $$", "Ripple decreases with larger capacitor and higher ripple frequency."],
              ["Zener current", "$$ I_Z = I_S - I_L $$", "Remaining current through Zener after load current is supplied."],
              ["Linear regulator heat", "$$ P_{loss}=(V_{in}-V_o)I_L $$", "Voltage dropped by regulator becomes heat."],
              ["Efficiency", "$$ \\eta = (P_o/P_i)\\times100\\% $$", "Shows how much input power becomes useful output power."],
            ].map(([heading, formula, meaning]) => (
              <div key={heading} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-base font-bold text-slate-950">{heading}</h3>
                <p className="mt-2 font-bold text-portal-700">{formula}</p>
                <p className="mt-2 text-sm leading-6">{meaning}</p>
              </div>
            ))}
          </div>
        </TopicSection>

        <TopicSection title="Real-World Applications">
          <ul className="grid gap-2 sm:grid-cols-2">
            <li>Mobile chargers and laptop adapters</li>
            <li>Microcontroller and FPGA power rails</li>
            <li>Audio amplifier supplies</li>
            <li>Medical instrument low-noise supplies</li>
            <li>Communication base-station power systems</li>
            <li>Industrial PLC and control-panel supplies</li>
            <li>Battery chargers and solar charge controllers</li>
            <li>SMPS units in TVs, routers, and computers</li>
          </ul>
        </TopicSection>

        <TopicSection title="Solved Examples">
          <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
          <p>{"A transformer secondary is rated at $$ 12\\,V_{rms} $$. Find the approximate peak voltage before diode drops."}</p>
          <p>{"$$ V_m = \\sqrt{2}V_{rms} = 1.414\\times12 \\approx 16.97\\,V $$"}</p>
          <p>
            So the capacitor in a rectifier circuit can charge close to 17 V under light
            load, before subtracting diode drops and transformer regulation effects.
          </p>

          <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
          <p>{"A bridge rectifier uses a filter capacitor of $$ 1000\\,\\mu F $$ and supplies $$ 0.5\\,A $$. If mains frequency is $$ 50\\,Hz $$, estimate peak-to-peak ripple."}</p>
          <p>{"For bridge rectifier, $$ f_r = 2f = 100\\,Hz $$."}</p>
          <p>{"$$ V_{r(pp)} \\approx \\frac{I_L}{f_rC} = \\frac{0.5}{100\\times1000\\times10^{-6}} = 5\\,V $$"}</p>
          <p>
            The ripple is large because the load current is significant. Increasing the
            capacitor or using regulation after filtering would reduce output variation.
          </p>

          <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
          <p>{"A linear regulator converts $$ 15\\,V $$ input to $$ 5\\,V $$ output at $$ 0.4\\,A $$. Find power loss and comment on heating."}</p>
          <p>{"$$ P_{loss}=(V_{in}-V_o)I_L=(15-5)\\times0.4=4\\,W $$"}</p>
          <p>
            Four watts is not a small loss for a small regulator package. A heat sink or
            a switch-mode regulator may be required.
          </p>
        </TopicSection>

        <TopicSection title="Common Mistakes">
          <ul className="grid gap-2">
            <li>Thinking rectifier output is pure DC. It is pulsating DC until filtering and regulation are added.</li>
            <li>Forgetting to convert RMS voltage to peak voltage before estimating capacitor charging.</li>
            <li>Ignoring diode drops in bridge rectifiers, where two diodes conduct at a time.</li>
            <li>Using half-wave ripple frequency for a full-wave rectifier.</li>
            <li>Assuming a larger capacitor fixes every problem; inrush current, diode stress, size, and cost also matter.</li>
            <li>Forgetting heat dissipation in linear regulators.</li>
            <li>Assuming Zener regulation works even when Zener current falls below its minimum value.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Comparison Tables">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-950">
                <th className="py-2 pr-3">Stage</th>
                <th className="py-2 pr-3">Main Job</th>
                <th className="py-2 pr-3">Signal Change</th>
                <th className="py-2 pr-3">Practical Concern</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Transformer</td><td className="py-2 pr-3">Change AC level</td><td className="py-2 pr-3">AC to AC</td><td className="py-2 pr-3">Rating, isolation, losses</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Rectifier</td><td className="py-2 pr-3">Make current one-directional</td><td className="py-2 pr-3">AC to pulsating DC</td><td className="py-2 pr-3">PIV, diode drop, current rating</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Filter</td><td className="py-2 pr-3">Reduce ripple</td><td className="py-2 pr-3">Pulsating DC to smoother DC</td><td className="py-2 pr-3">Ripple, inrush, capacitor ESR</td></tr>
              <tr><td className="py-2 pr-3">Regulator</td><td className="py-2 pr-3">Hold voltage steady</td><td className="py-2 pr-3">Smooth DC to regulated DC</td><td className="py-2 pr-3">Dropout, heat, efficiency</td></tr>
            </tbody>
          </table>
          <table className="mt-4 w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-950">
                <th className="py-2 pr-3">Supply Type</th>
                <th className="py-2 pr-3">Strength</th>
                <th className="py-2 pr-3">Limitation</th>
                <th className="py-2 pr-3">Typical Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 pr-3">Linear regulated</td><td className="py-2 pr-3">Low noise, simple</td><td className="py-2 pr-3">Poor efficiency when voltage drop is large</td><td className="py-2 pr-3">Analog and sensor circuits</td></tr>
              <tr><td className="py-2 pr-3">SMPS</td><td className="py-2 pr-3">High efficiency, compact</td><td className="py-2 pr-3">Switching noise, EMI design needed</td><td className="py-2 pr-3">Chargers, computers, high-power systems</td></tr>
            </tbody>
          </table>
        </TopicSection>

        <TopicSection title="Interview Questions">
          <ul className="grid gap-2">
            <li>Why do electronic circuits need regulated DC instead of raw rectified output?</li>
            <li>What is the difference between RMS voltage and peak voltage?</li>
            <li>Why does a bridge rectifier have two diode drops in the conducting path?</li>
            <li>Why is ripple frequency doubled in a full-wave rectifier?</li>
            <li>How does a capacitor filter reduce ripple?</li>
            <li>Why can a linear regulator become hot?</li>
            <li>What is dropout voltage in an IC regulator?</li>
            <li>Why is SMPS more efficient than a linear regulator?</li>
          </ul>
        </TopicSection>

        <TopicSection title="Exam-Oriented Quick Notes">
          <ul className="grid gap-2">
            <li>{"Always convert transformer RMS voltage to peak using $$ V_m=\\sqrt{2}V_{rms} $$ before estimating capacitor voltage."}</li>
            <li>Bridge rectifier conduction path contains two diodes, so subtract approximately two diode drops for silicon diodes.</li>
            <li>Full-wave and bridge rectifiers have ripple frequency twice the AC supply frequency.</li>
            <li>{"Capacitor ripple is roughly proportional to load current: more $$ I_L $$ means more ripple."}</li>
            <li>{"Capacitor ripple is inversely proportional to capacitance: larger $$ C $$ means lower ripple."}</li>
            <li>For linear regulators, always check heat using input-output voltage difference multiplied by load current.</li>
            <li>For Zener regulators, regulation exists only while Zener current stays within safe minimum and maximum limits.</li>
          </ul>
        </TopicSection>

        <TopicSection title="Revision Summary">
          <ul className="grid gap-2">
            <li>Power supply converts available electrical energy into usable DC voltage.</li>
            <li>Transformer changes AC level and can provide isolation.</li>
            <li>Rectifier converts AC into pulsating DC.</li>
            <li>Filter reduces ripple using energy storage.</li>
            <li>Regulator keeps output voltage nearly constant.</li>
            <li>Linear regulators are simple and low-noise but waste extra voltage as heat.</li>
            <li>SMPS circuits are efficient but require switching-noise and EMI control.</li>
            <li>{"Key formulas: $$ V_m=\\sqrt{2}V_{rms} $$, $$ V_{r(pp)}\\approx I_L/(f_rC) $$, and $$ P_{loss}=(V_{in}-V_o)I_L $$."}</li>
          </ul>
        </TopicSection>

        <TopicSection title="Practice Questions">
          <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
          <ul className="grid gap-2">
            <li>Why is rectifier output called pulsating DC rather than pure DC?</li>
            <li>Explain capacitor filter action using charging and discharging.</li>
            <li>Why does a regulator need headroom voltage?</li>
          </ul>
          <h3 className="text-base font-bold text-slate-950">Numerical</h3>
          <ul className="grid gap-2">
            <li>{"Find peak voltage for a $$ 9\\,V_{rms} $$ transformer secondary."}</li>
            <li>{"Estimate ripple for $$ I_L=200\\,mA $$, $$ C=470\\,\\mu F $$, and bridge rectifier on $$ 50\\,Hz $$ mains."}</li>
            <li>{"Find regulator power loss when $$ V_{in}=12\\,V $$, $$ V_o=5\\,V $$, and $$ I_L=300\\,mA $$."}</li>
          </ul>
          <h3 className="text-base font-bold text-slate-950">MCQs</h3>
          <ul className="grid gap-2">
            <li>Which stage converts AC into pulsating DC: transformer, rectifier, filter, or regulator?</li>
            <li>In a bridge rectifier, how many diodes conduct during one half-cycle?</li>
            <li>Which supply type usually has higher efficiency: linear regulator or SMPS?</li>
          </ul>
        </TopicSection>
      </div>
    </section>
  );
}

function AnalogChapterDeepDiveContent({ chapter }) {
  if (chapter.slug === "semiconductor-fundamentals") {
    return <SemiconductorFundamentalsDeepDiveContent chapter={chapter} />;
  }

  if (chapter.slug === "diodes-and-applications") {
    return <DiodesApplicationsDeepDiveContent chapter={chapter} />;
  }

  if (chapter.slug === "bipolar-junction-transistor") {
    return <BjtDeepDiveContent chapter={chapter} />;
  }

  if (chapter.slug === "bjt-amplifiers") {
    return <BjtAmplifiersDeepDiveContent chapter={chapter} />;
  }

  if (chapter.slug === "field-effect-transistors") {
    return <FetDeepDiveContent chapter={chapter} />;
  }

  if (chapter.slug === "feedback-amplifiers") {
    return <FeedbackDeepDiveContent chapter={chapter} />;
  }

  if (chapter.slug === "oscillators") {
    return <OscillatorsDeepDiveContent chapter={chapter} />;
  }

  if (chapter.slug === "operational-amplifiers") {
    return <OpAmpDeepDiveContent chapter={chapter} />;
  }

  if (chapter.slug === "active-filters-waveform-generators") {
    return <ActiveFiltersWaveformDeepDiveContent chapter={chapter} />;
  }

  if (chapter.slug === "power-supplies") {
    return <PowerSuppliesDeepDiveContent chapter={chapter} />;
  }

  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            Chapter {chapter.number} / Complete Concept
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {chapter.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            {chapter.summary}
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
              GATE/PSU Focus
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-emerald-950">
              {chapter.examFocus}
            </p>
          </div>
        </div>
        <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title={`${chapter.title} circuit visualization`} />
        </div>
      </div>

      <section className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-950">
          Working Steps: Step-by-Step Function
        </h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-5">
          {chapter.workingSteps.map((step, index) => (
            <div key={step} className="rounded-2xl border border-white bg-white p-3 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-4">
        {chapter.topics.map((topic, topicIndex) => (
          <AnalogChapterTopicCard
            key={topic.title}
            topic={topic}
            chapter={chapter}
            topicIndex={topicIndex}
          />
        ))}
      </div>
    </section>
  );
}

function AnalogChapterPage({ chapter }) {
  const menuTopics = chapter.topics.map((topic) => ({
    title: topic.title,
    detail: topic.subtopics.join(", "),
  }));

  return (
    <Layout title={`${chapter.title} GATE ECE Quick Notes + Formulas + PYQs | Analog Electronics`} pageClassName="py-3 sm:py-4">
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
              <Link href="/subjects/analog-electronics" className="font-medium text-slate-600 transition hover:text-portal-700">
                Analog Electronics
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">
                {chapter.title}
              </span>
            </li>
          </ol>
          <TopicJumpMenu
            label={chapter.title}
            topics={menuTopics}
            idPrefix="analog-topic"
            controlId={`analog-${chapter.slug}-topic-menu`}
          />
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Analog Electronics / Chapter {chapter.number}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {chapter.title}: Topics, Subtopics, Study Flow, and Working Steps
          </h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Chapter-by-chapter GATE/PSU explanation with every topic and subtopic
            organized for concept building, revision, interviews, and numerical solving.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/mcqs/analog-electronics"
              className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
            >
              Try MCQs
            </Link>
            <Link
              href="/notes/analog-electronics"
              className="inline-flex justify-center rounded-xl border border-portal-200 bg-white px-5 py-3 text-sm font-bold text-portal-700 transition hover:bg-portal-50"
            >
              Download Quick Notes
            </Link>
            <Link
              href="/subjects/analog-electronics"
              className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Back to Analog Electronics
            </Link>
          </div>
        </section>

        <AnalogChapterDeepDiveContent chapter={chapter} />
      </div>
    </Layout>
  );
}

function AnalogTopicCard({ chapterNumber, title, intro, points, takeaway, href }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-portal-200 hover:shadow-panel sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
            Chapter {String(chapterNumber).padStart(2, "0")}
          </p>
          <h3 className="mt-1 text-lg font-bold leading-snug tracking-tight text-slate-950">
            {title}
          </h3>
        </div>
        {href ? (
          <Link
            href={href}
            className="inline-flex flex-none justify-center rounded-lg border border-portal-200 bg-portal-50 px-2.5 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-portal-700 transition group-hover:bg-white"
          >
            Open
          </Link>
        ) : null}
      </div>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-700">{intro}</p>
      <ul className="mt-3 grid gap-1.5 text-sm leading-5 text-slate-700">
        {points.map((point) => (
          <li key={`${title}-${point}`} className="flex gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
            <span className="min-w-0">{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-2">
        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">
          Exam Focus
        </p>
        <p className="mt-1 text-sm font-semibold leading-5 text-emerald-950">{takeaway}</p>
      </div>
    </article>
  );
}

function AnalogElectronicsSection() {
  return (
    <section className="mt-5 rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-panel sm:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Structured Syllabus
          </p>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Analog Electronics Chapter Flow
          </h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-700 sm:text-base">
            Analog Electronics studies continuous-time signals and the devices that shape,
            amplify, rectify, regulate, and filter them. Study the flow from device
            physics to practical signal and power circuits.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
            High-Yield Focus
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-900">
            Diodes, BJTs, FETs, amplifiers, feedback, oscillators, op-amps, filters, supplies
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
        {ANALOG_CHAPTERS.map((chapter) => (
          <AnalogTopicCard
            key={chapter.slug}
            chapterNumber={chapter.number}
            title={chapter.title}
            intro={chapter.summary}
            points={chapter.topics.map((topic) => `${topic.title}: ${topic.subtopics.join(", ")}`)}
            takeaway={chapter.examFocus}
            href={chapter.route}
          />
        ))}
      </div>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-lg font-bold tracking-tight text-slate-950">
          How These Concepts Connect
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-700 sm:text-base">
          Diodes teach junction behavior and non-linearity. Transistors extend that idea
          into controlled current or voltage devices. Amplifiers use properly biased
          transistors to create gain. Op-amps package very high gain with feedback so we
          can realize stable linear functions. Filters then use RC networks or op-amp based
          circuits to shape signals in frequency, while power supplies keep every stage
          energized with usable DC.
        </p>
        <ul className="mt-3 grid gap-2 text-sm leading-5 text-slate-700 sm:grid-cols-2">
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
            <span>Diode questions usually depend on piecewise region assumptions.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
            <span>Transistor questions usually begin with bias and operating point.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
            <span>Amplifier questions often split into midband gain and frequency response.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
            <span>Op-amp questions reward quick use of ideal assumptions under feedback.</span>
          </li>
        </ul>
      </section>
    </section>
  );
}

const DIODE_TOPIC_MENU = [
  { title: "What Is a Diode?", detail: "Core idea, anode, cathode" },
  { title: "PN Junction Formation", detail: "P-type, N-type, depletion region" },
  { title: "Forward Bias", detail: "Barrier reduces and current flows" },
  { title: "Reverse Bias", detail: "Barrier widens and current blocks" },
  { title: "V-I Characteristic", detail: "Knee voltage and leakage region" },
  { title: "Diode as a Rectifier", detail: "Half-wave and full-wave action" },
  { title: "Breakdown and Parameters", detail: "Zener, avalanche, ratings" },
  { title: "Important Diode Types", detail: "Rectifier, Zener, LED, and more" },
  { title: "Final Summary", detail: "Quick revision ending" },
];

const TRANSISTOR_TOPIC_MENU = [
  { title: "Introduction to Transistors", detail: "Amplification and switching" },
  { title: "BJT Structure", detail: "Emitter, base, collector" },
  { title: "BJT Working Principle", detail: "Base current controls collector current" },
  { title: "BJT Current Relations", detail: "IE, IB, IC, beta" },
  { title: "BJT Operating Regions", detail: "Cutoff, active, saturation" },
  { title: "BJT Characteristics", detail: "Input and output curves" },
  { title: "BJT as Amplifier and Switch", detail: "Signal gain and ON/OFF action" },
  { title: "MOSFET Structure", detail: "Gate, drain, source" },
  { title: "MOSFET Working Principle", detail: "Electric field and channel formation" },
  { title: "MOSFET Regions and Equations", detail: "Cutoff, linear, saturation" },
  { title: "MOSFET Characteristics", detail: "Output and transfer curves" },
  { title: "BJT vs MOSFET", detail: "Exam-ready comparison" },
  { title: "Final Summary", detail: "Quick revision ending" },
];

const AMPLIFIER_TOPIC_MENU = [
  { title: "What Is an Amplifier?", detail: "Signal scaling without distortion" },
  { title: "Why Amplifiers Are Important", detail: "Audio, sensors, communication" },
  { title: "Basic Amplifier Model", detail: "Input, output, supply, gain" },
  { title: "Types of Amplifiers", detail: "Voltage, current, power, RF" },
  { title: "BJT Amplifier", detail: "Base current to collector output" },
  { title: "MOSFET Amplifier", detail: "Gate voltage to drain output" },
  { title: "Frequency Response", detail: "Gain, cutoff, bandwidth" },
  { title: "Classes of Amplifiers", detail: "Class A, B, AB, C" },
  { title: "Amplifier Distortion", detail: "Harmonic, frequency, phase" },
  { title: "Practical Parameters", detail: "Gain, impedance, efficiency" },
  { title: "BJT vs MOSFET Amplifier", detail: "Exam comparison" },
  { title: "Final Summary", detail: "Quick revision ending" },
];

function TopicJumpMenu({ label, topics = [], idPrefix, controlId }) {
  const [isOpen, setIsOpen] = useState(false);

  function scrollToTopic(title) {
    const targetId = `${idPrefix}-${toAnchorId(title)}`;
    const target = document.getElementById(targetId);

    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "auto" });
    }

    setIsOpen(false);
  }

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-white text-portal-700 shadow-sm transition hover:bg-portal-50"
        aria-label={`Open ${label} topics`}
        aria-expanded={isOpen}
        aria-controls={controlId}
      >
        {isOpen ? (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen ? (
        <div
          id={controlId}
          className="absolute right-0 z-30 mt-2 max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_22px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="mb-2 rounded-xl border border-portal-200 bg-portal-50 px-3 py-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-portal-700">
              {label}
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">
              Jump to any topic in this explanation.
            </p>
          </div>

          <div className="grid gap-2">
            {topics.map((topic, index) => (
              <button
                key={topic.title}
                type="button"
                onClick={() => scrollToTopic(topic.title)}
                className="rounded-xl border border-slate-200 bg-[#f8fbff] p-3 text-left transition hover:border-portal-300 hover:bg-white"
              >
                <span className="flex items-start gap-3">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white text-xs font-black text-portal-700 shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black text-slate-950">
                      {topic.title}
                    </span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-slate-600">
                      {topic.detail}
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DiodeTopicMenu() {
  return (
    <TopicJumpMenu
      label="Diodes"
      topics={DIODE_TOPIC_MENU}
      idPrefix="diode-topic"
      controlId="diodes-topic-menu"
    />
  );
}

function DiodeDeepDiveContent() {
  const diodeSections = [
    {
      title: "What Is a Diode?",
      badge: "Core Idea",
      paragraphs: [
        "A diode is a two-terminal semiconductor device that allows current to flow easily in one direction and strongly opposes current in the opposite direction.",
        "The two terminals are the anode and the cathode. In normal forward conduction, conventional current enters through the anode, passes through the junction, and leaves from the cathode.",
      ],
      points: [
        "Anode is the positive-side terminal during normal forward bias.",
        "Cathode is marked by the vertical line in the circuit symbol.",
        "The diode behaves like a one-direction current controller, but only after the junction barrier is overcome.",
      ],
    },
    {
      title: "PN Junction Formation",
      badge: "Device Physics",
      paragraphs: [
        "A diode is formed by joining p-type material, which has holes as majority carriers, with n-type material, which has electrons as majority carriers.",
        "Immediately after joining, electrons diffuse from the n-side to the p-side and holes diffuse from the p-side to the n-side. Near the junction, this recombination leaves fixed ions behind, creating the depletion region.",
      ],
      points: [
        "The depletion region has almost no free carriers.",
        "It acts like an internal barrier against further diffusion.",
        "The internal electric field is what gives the diode its directional behavior.",
      ],
    },
    {
      title: "Forward Bias",
      badge: "Conduction Mode",
      paragraphs: [
        "In forward bias, the anode is connected to the positive terminal and the cathode to the negative terminal. The applied voltage weakens the internal barrier.",
        "As the depletion region shrinks, electrons and holes cross the junction more easily. Current then rises rapidly after the practical cut-in voltage.",
      ],
      points: [
        "Silicon diode forward drop is commonly approximated as 0.7 V.",
        "Germanium diode forward drop is commonly approximated as 0.3 V.",
        "Forward current must still be limited by a resistor or a circuit load.",
      ],
    },
    {
      title: "Reverse Bias",
      badge: "Blocking Mode",
      paragraphs: [
        "In reverse bias, the anode is connected to the negative terminal and the cathode to the positive terminal. The external voltage strengthens the internal field.",
        "The depletion region becomes wider, majority carriers are pulled away from the junction, and only a very small leakage current remains until breakdown.",
      ],
      points: [
        "Ideal reverse current is treated as zero.",
        "Practical reverse current is a tiny leakage current.",
        "If reverse voltage becomes too large, breakdown can occur.",
      ],
    },
    {
      title: "V-I Characteristic",
      badge: "Graph Reading",
      paragraphs: [
        "The diode current-voltage curve is almost flat in reverse bias, then rises sharply in forward bias after the knee voltage.",
        "The exponential equation explains the real device behavior, while exam circuits often use ideal or constant-voltage models to simplify analysis.",
      ],
      points: [
        "Forward region: current grows very fast after cut-in voltage.",
        "Reverse region: current remains close to leakage level before breakdown.",
        "Knee voltage is the practical point where conduction becomes significant.",
      ],
    },
  ];

  const diodeTypes = [
    ["Rectifier diode", "Converts AC to pulsating DC in power supplies."],
    ["Zener diode", "Operates in reverse breakdown for voltage regulation."],
    ["LED", "Emits light when forward biased."],
    ["Schottky diode", "Switches fast and has a lower forward drop."],
    ["Photodiode", "Converts light energy into electrical current."],
  ];

  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            Diodes / Complete Concept
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Step-by-Step Diode Explanation
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            Learn the diode from the inside out: PN junction formation, depletion
            barrier, forward bias, reverse bias, V-I graph, rectifier action, breakdown,
            and practical parameters.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
                Main Rule
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-emerald-950">
                Forward bias reduces the barrier and current flows. Reverse bias widens
                the barrier and current is blocked.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-700">
                Exam Habit
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-amber-950">
                First decide ON, OFF, or breakdown. Only then write KVL and calculate
                current.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title="Diode PN junction visualization" />
        </div>
      </div>

      <div className="mt-6 divide-y divide-slate-200">
        {diodeSections.map((section, index) => (
          <article
            key={section.title}
            id={`diode-topic-${toAnchorId(section.title)}`}
            className="scroll-mt-40 py-5 first:pt-0 last:pb-0"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
                  {section.badge}
                </p>
                <h4 className="text-lg font-bold tracking-tight text-slate-950">
                  {section.title}
                </h4>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-6 text-slate-700">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section
          id="diode-topic-diode-as-a-rectifier"
          className="scroll-mt-40 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
        >
          <h4 className="text-lg font-bold text-slate-950">Diode as a Rectifier</h4>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            In a half-wave rectifier, the diode conducts during the positive half cycle
            and blocks during the negative half cycle. In a full-wave rectifier, the
            diode arrangement redirects both half cycles so the load current remains in
            one direction.
          </p>
          <CircuitVisualizationMovedNotice title="Rectifier waveform visualization" />
        </section>

        <section
          id="diode-topic-breakdown-and-parameters"
          className="scroll-mt-40 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
        >
          <h4 className="text-lg font-bold text-slate-950">Breakdown and Parameters</h4>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Zener breakdown occurs at lower reverse voltages due to a strong electric
            field. Avalanche breakdown occurs at higher reverse voltages due to carrier
            multiplication. Practical diode selection depends on forward voltage,
            reverse breakdown voltage, current rating, and power rating.
          </p>
          <div className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
            {[
              ["Forward Voltage", "Minimum practical voltage needed for conduction."],
              ["Breakdown Voltage", "Reverse voltage where large reverse current begins."],
              ["Current Rating", "Maximum safe current through the diode."],
              ["Power Rating", "Maximum heat the diode can safely dissipate."],
            ].map(([label, detail]) => (
              <div key={label} className="rounded-xl border border-white bg-white px-3 py-2">
                <p className="font-bold text-slate-900">{label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section
        id="diode-topic-important-diode-types"
        className="mt-5 scroll-mt-40 rounded-[24px] border border-slate-200 bg-white p-4 sm:p-5"
      >
        <h4 className="text-lg font-bold text-slate-950">Important Diode Types</h4>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {diodeTypes.map(([title, detail]) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4"
            >
              <p className="text-sm font-bold text-slate-950">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="diode-topic-final-summary"
        className="mt-5 scroll-mt-40 rounded-[24px] border border-portal-200 bg-portal-50/70 p-4 sm:p-5"
      >
        <h4 className="text-lg font-bold text-slate-950">Final Summary</h4>
        <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
          A diode controls current direction because of the PN junction barrier. Forward
          bias shrinks the depletion region and allows conduction; reverse bias widens it
          and blocks current until breakdown. This single behavior creates rectifiers,
          regulators, clippers, clampers, LED indicators, photodetectors, and many
          protection circuits.
        </p>
      </section>
    </section>
  );
}

function DiodeMotionDiagram() {
  return (
    <svg viewBox="0 0 640 360" className="mx-auto h-auto w-[680px] max-w-none md:w-full" role="img" aria-label="Animated diode PN junction, biasing, and VI characteristic">
      <defs>
        <marker id="diode-motion-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0 10 5 0 10Z" fill="#154a96" />
        </marker>
        <filter id="diode-dot-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <style>{`
        .diode-flow-dot { fill: #1d4ed8; filter: url(#diode-dot-glow); }
        .diode-hole-dot { fill: #f97316; filter: url(#diode-dot-glow); }
        .diode-barrier { animation: diodeBarrierPulse 3.2s ease-in-out infinite; transform-origin: 246px 120px; }
        .diode-curve { stroke-dasharray: 360; stroke-dashoffset: 360; animation: diodeDrawCurve 3.6s ease-out infinite; }
        .diode-glow { animation: diodeCurrentGlow 1.7s ease-in-out infinite; }
        @keyframes diodeBarrierPulse {
          0%, 100% { transform: scaleX(1.18); opacity: 0.72; }
          48% { transform: scaleX(0.62); opacity: 0.38; }
        }
        @keyframes diodeDrawCurve {
          0% { stroke-dashoffset: 360; }
          65%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes diodeCurrentGlow {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.78; }
        }
      `}</style>

      <rect x="24" y="28" width="330" height="190" rx="22" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="46" y="60" fill="#0f172a" fontSize="18" fontWeight="800">PN junction animation</text>
      <rect x="58" y="88" width="150" height="82" rx="14" fill="#fee2e2" stroke="#fecaca" />
      <rect x="238" y="88" width="90" height="82" rx="14" fill="#dcfce7" stroke="#bbf7d0" />
      <rect x="204" y="88" width="48" height="82" rx="14" className="diode-barrier" fill="#dbeafe" stroke="#bfdbfe" />
      <text x="112" y="118" fill="#991b1b" fontSize="17" fontWeight="900">P</text>
      <text x="268" y="118" fill="#166534" fontSize="17" fontWeight="900">N</text>
      <text x="183" y="198" fill="#475569" fontSize="13" fontWeight="700">depletion barrier shrinks in forward bias</text>

      <path id="electron-motion-path" d="M292 128H236H190H118" fill="none" />
      <path id="hole-motion-path" d="M92 136H160H216H286" fill="none" />
      <circle className="diode-flow-dot" r="5">
        <animateMotion dur="3.1s" repeatCount="indefinite" path="M292 128H236H190H118" />
      </circle>
      <circle className="diode-flow-dot" r="5">
        <animateMotion dur="3.1s" begin="-1.55s" repeatCount="indefinite" path="M292 128H236H190H118" />
      </circle>
      <circle className="diode-hole-dot" r="5">
        <animateMotion dur="3.1s" begin="-0.8s" repeatCount="indefinite" path="M92 136H160H216H286" />
      </circle>
      <circle className="diode-hole-dot" r="5">
        <animateMotion dur="3.1s" begin="-2.1s" repeatCount="indefinite" path="M92 136H160H216H286" />
      </circle>

      <rect x="24" y="240" width="330" height="92" rx="22" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="46" y="270" fill="#0f172a" fontSize="17" fontWeight="800">Forward-bias circuit</text>
      <path d="M66 300h64M130 276v48M146 288v24M146 300h42" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M188 300l34-20v40l-34-20ZM222 280v40M222 300h62" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <path className="diode-glow" d="M70 300h208" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd="url(#diode-motion-arrow)" />
      <text x="78" y="288" fill="#154a96" fontSize="15" fontWeight="800">+</text>
      <text x="288" y="305" fill="#64748b" fontSize="15" fontWeight="800">current flows</text>

      <rect x="384" y="28" width="226" height="304" rx="22" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="408" y="60" fill="#0f172a" fontSize="18" fontWeight="800">V-I characteristic</text>
      <path d="M424 270H584M482 290V92" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
      <text x="570" y="292" fill="#64748b" fontSize="12" fontWeight="700">V</text>
      <text x="464" y="104" fill="#64748b" fontSize="12" fontWeight="700">I</text>
      <path className="diode-curve" d="M428 272c30-2 46-3 54-3 26 0 42-2 54-13 16-15 22-50 28-138" fill="none" stroke="#154a96" strokeWidth="4" strokeLinecap="round" />
      <path d="M482 270c-22 0-38-2-50-4" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
      <circle cx="540" cy="246" r="5" fill="#f97316" />
      <text x="492" y="238" fill="#f97316" fontSize="12" fontWeight="800">knee voltage</text>
      <text x="416" y="310" fill="#475569" fontSize="12.5" fontWeight="700">Reverse leakage is almost flat; forward current rises fast.</text>
    </svg>
  );
}

function RectifierMotionDiagram() {
  return (
    <svg viewBox="0 0 520 180" className="h-auto w-[560px] max-w-none md:w-full" role="img" aria-label="Animated half wave rectifier waveform">
      <style>{`
        .rectifier-wave { stroke-dasharray: 420; stroke-dashoffset: 420; animation: rectifierWave 3s ease-in-out infinite; }
        .rectifier-pulse { animation: rectifierPulse 1.4s ease-in-out infinite; }
        @keyframes rectifierWave {
          0% { stroke-dashoffset: 420; }
          70%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes rectifierPulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.9; }
        }
      `}</style>
      <rect x="12" y="18" width="496" height="144" rx="18" fill="#ffffff" stroke="#e2e8f0" />
      <path d="M42 91h92" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M134 91l30-18v36l-30-18ZM164 73v36M164 91h50" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M214 91h16l8-13 12 26 12-26 12 26 8-13h28" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="78" y="70" fill="#154a96" fontSize="14" fontWeight="800">AC in</text>
      <text x="236" y="70" fill="#154a96" fontSize="14" fontWeight="800">load</text>
      <path className="rectifier-pulse" d="M44 118c20-42 42-42 62 0" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
      <path className="rectifier-pulse" d="M106 118c20 42 42 42 62 0" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
      <path d="M342 122H486M352 122c18-48 38-48 56 0M408 122c18-48 38-48 56 0" className="rectifier-wave" fill="none" stroke="#154a96" strokeWidth="4" strokeLinecap="round" />
      <text x="350" y="54" fill="#0f172a" fontSize="15" fontWeight="800">Output</text>
      <text x="340" y="146" fill="#475569" fontSize="12.5" fontWeight="700">Only positive half cycles pass.</text>
    </svg>
  );
}

function BjtMosfetDeepDiveContent() {
  const sections = [
    {
      title: "Introduction to Transistors",
      badge: "Core Idea",
      paragraphs: [
        "A transistor is a three-terminal semiconductor device used for amplification and switching. It lets a small electrical control signal influence a larger output current or voltage.",
        "The two most important transistor families in Analog Electronics are BJTs and MOSFETs. A BJT is treated as a current-controlled device, while a MOSFET is treated as a voltage-controlled device.",
      ],
      points: [
        "Amplifier use: a small input signal controls a larger output signal.",
        "Switching use: the transistor moves between OFF and ON states.",
        "Exam questions usually begin by identifying device type, bias condition, and operating region.",
      ],
    },
    {
      title: "BJT Structure",
      badge: "Bipolar Device",
      paragraphs: [
        "A Bipolar Junction Transistor has three regions: emitter, base, and collector. The emitter is heavily doped so it can inject carriers, the base is very thin and lightly doped, and the collector is designed to collect carriers.",
        "BJTs are available as NPN and PNP devices. In most introductory analog circuits, NPN examples are used first because their current directions are easier to visualize with positive supply voltages.",
      ],
      points: [
        "Emitter injects majority carriers into the base.",
        "Base is thin, so only a small part of the injected carriers recombines.",
        "Collector gathers most carriers and forms the main output current path.",
      ],
    },
    {
      title: "BJT Working Principle",
      badge: "Current Control",
      paragraphs: [
        "For an NPN transistor in active region, the base-emitter junction is forward biased and the collector-base junction is reverse biased. This biasing condition lets carriers move from emitter to collector.",
        "A small base current controls a much larger collector current. This is the central idea behind BJT amplification.",
      ],
      points: [
        "Base-emitter junction forward bias starts carrier injection.",
        "Collector-base reverse bias pulls most carriers into the collector.",
        "Small IB controls large IC, so BJT gain is built around current control.",
      ],
    },
    {
      title: "BJT Current Relations",
      badge: "Key Formula",
      paragraphs: [
        "The emitter current is the sum of base current and collector current. Current gain beta tells how many times larger collector current is compared with base current.",
        "In hand analysis, IC = beta IB is useful only when the transistor is actually in active region. In saturation, this relation no longer decides the collector current directly.",
      ],
      points: [
        "IE = IB + IC",
        "IC = beta IB in active region",
        "Beta is useful for amplifier biasing but should not be blindly used in switching saturation.",
      ],
    },
    {
      title: "BJT Operating Regions",
      badge: "Exam Decision",
      paragraphs: [
        "A BJT can operate in cutoff, active, or saturation. Cutoff means the device is OFF, active means it can amplify, and saturation means it is fully ON like a closed switch.",
        "Most mistakes happen when students calculate gain before checking the region. Region identification should come before formula substitution.",
      ],
      points: [
        "Cutoff: both major current paths are practically OFF.",
        "Active: used for analog amplification.",
        "Saturation: used for switching ON state.",
      ],
    },
    {
      title: "BJT Characteristics",
      badge: "Graph Reading",
      paragraphs: [
        "BJT input characteristics relate base current to base-emitter voltage and look similar to a diode curve. Output characteristics relate collector current to collector-emitter voltage for different base currents.",
        "In the active region, output curves are nearly flat, meaning collector current is mainly controlled by base current instead of VCE.",
      ],
      points: [
        "Input curve: IB vs VBE resembles a forward-biased diode.",
        "Output curve: IC vs VCE shows cutoff, active, and saturation regions.",
        "Increasing base current shifts collector current upward.",
      ],
    },
    {
      title: "BJT as Amplifier and Switch",
      badge: "Applications",
      paragraphs: [
        "As an amplifier, a BJT is biased in active region so a small input variation produces a larger output variation. As a switch, it is driven between cutoff and saturation.",
        "This distinction matters because amplifier design needs linearity, while switching design needs clear OFF and ON states.",
      ],
      points: [
        "Amplifier: active region operation with a stable Q-point.",
        "Switch OFF: cutoff region.",
        "Switch ON: saturation region.",
      ],
    },
    {
      title: "MOSFET Structure",
      badge: "Field Effect Device",
      paragraphs: [
        "A MOSFET has three main terminals: gate, drain, and source. The gate is insulated from the channel by an oxide layer, which gives the MOSFET very high input impedance.",
        "In an n-channel enhancement MOSFET, applying enough positive gate-source voltage forms a conductive channel between drain and source.",
      ],
      points: [
        "Gate controls the channel using an electric field.",
        "Drain and source form the controlled current path.",
        "No significant DC gate current flows in the ideal model.",
      ],
    },
    {
      title: "MOSFET Working Principle",
      badge: "Voltage Control",
      paragraphs: [
        "With no sufficient gate voltage, the channel is absent or weak, so the MOSFET remains OFF. When VGS exceeds threshold voltage, carriers gather near the oxide interface and create a conducting channel.",
        "This is why MOSFETs are called voltage-controlled devices. The gate voltage controls channel strength and therefore drain current.",
      ],
      points: [
        "Below threshold: no strong channel.",
        "Above threshold: channel forms and current can flow.",
        "Larger overdrive voltage usually means larger drain current.",
      ],
    },
    {
      title: "MOSFET Regions and Equations",
      badge: "Formula Use",
      paragraphs: [
        "MOSFET operation is usually divided into cutoff, linear or ohmic region, and saturation. Cutoff is OFF, linear region behaves like a voltage-controlled resistor, and saturation is used for amplification.",
        "A common long-channel saturation approximation is ID = k(VGS - VT)^2. Here VT is threshold voltage and VGS - VT is called overdrive voltage.",
      ],
      points: [
        "Cutoff: VGS is below threshold.",
        "Linear region: channel exists and VDS is relatively small.",
        "Saturation: current is strongly controlled by VGS and useful for analog gain.",
      ],
    },
    {
      title: "MOSFET Characteristics",
      badge: "Graph Reading",
      paragraphs: [
        "MOSFET output characteristics plot ID against VDS for different VGS values. Transfer characteristics plot ID against VGS and show how threshold voltage starts conduction.",
        "The most important visual idea is channel formation: as gate voltage increases, the channel becomes stronger and drain current rises.",
      ],
      points: [
        "Output curve: ID vs VDS for different gate voltages.",
        "Transfer curve: ID vs VGS shows threshold behavior.",
        "Gate voltage slider animations help explain channel growth clearly.",
      ],
    },
    {
      title: "BJT vs MOSFET",
      badge: "Comparison",
      paragraphs: [
        "BJTs and MOSFETs both amplify and switch, but their control mechanisms are different. BJT behavior is tied to base current, while MOSFET behavior is tied to gate-source voltage.",
        "MOSFETs dominate digital ICs and power switching because of high input impedance and efficient voltage control. BJTs remain important in analog gain stages and current-controlled circuit examples.",
      ],
      points: [
        "BJT: current-controlled, lower input impedance, beta-based analysis.",
        "MOSFET: voltage-controlled, very high input impedance, threshold-based analysis.",
        "Both require region identification before solving exam questions.",
      ],
    },
  ];

  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            BJT and MOSFET / Complete Concept
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Step-by-Step Transistor Explanation
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            Learn how BJTs and MOSFETs work, how their terminals control current,
            how to identify operating regions, and how both devices are used as
            amplifiers and switches in analog and digital circuits.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-4">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-sky-700">
                BJT Rule
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                Small base current controls a larger collector current.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
                MOSFET Rule
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                Gate-source voltage forms a channel and controls drain current.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title="BJT and MOSFET visualization" />
        </div>
      </div>

      <div className="mt-6 divide-y divide-slate-200">
        {sections.map((section, index) => (
          <article
            key={section.title}
            id={`transistor-topic-${toAnchorId(section.title)}`}
            className="scroll-mt-40 py-5 first:pt-0 last:pb-0"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
                  {section.badge}
                </p>
                <h2 className="text-lg font-bold tracking-tight text-slate-950">
                  {section.title}
                </h2>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
              <div className="grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-6 text-slate-700">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <section
        id="transistor-topic-final-summary"
        className="mt-5 scroll-mt-40 rounded-[24px] border border-portal-200 bg-portal-50/70 p-4 sm:p-5"
      >
        <h2 className="text-lg font-bold text-slate-950">Final Summary</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
          A BJT is a current-controlled transistor where base current controls
          collector current. A MOSFET is a voltage-controlled transistor where gate
          voltage controls channel formation and drain current. Both devices are
          essential for amplification and switching, but every problem should begin
          with the same question: which region is the device operating in?
        </p>
      </section>
    </section>
  );
}

function TransistorMotionDiagram() {
  return (
    <svg viewBox="0 0 680 380" className="mx-auto h-auto w-[720px] max-w-none md:w-full" role="img" aria-label="Animated BJT and MOSFET operation showing current control and channel formation">
      <defs>
        <marker id="transistor-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0 10 5 0 10Z" fill="#154a96" />
        </marker>
        <filter id="transistor-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <style>{`
        .bjt-carrier { fill: #1d4ed8; filter: url(#transistor-glow); }
        .bjt-base-pulse { animation: bjtBasePulse 2.2s ease-in-out infinite; }
        .mos-channel { animation: mosChannelGrow 2.8s ease-in-out infinite; transform-origin: 504px 145px; }
        .mos-current { stroke-dasharray: 12 10; animation: mosCurrentMove 1.2s linear infinite; }
        .transistor-curve { stroke-dasharray: 280; stroke-dashoffset: 280; animation: transistorCurveDraw 3.2s ease-out infinite; }
        @keyframes bjtBasePulse {
          0%, 100% { opacity: 0.28; stroke-width: 3; }
          50% { opacity: 0.95; stroke-width: 7; }
        }
        @keyframes mosChannelGrow {
          0%, 100% { transform: scaleY(0.28); opacity: 0.35; }
          50% { transform: scaleY(1); opacity: 0.95; }
        }
        @keyframes mosCurrentMove {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -22; }
        }
        @keyframes transistorCurveDraw {
          0% { stroke-dashoffset: 280; }
          70%, 100% { stroke-dashoffset: 0; }
        }
      `}</style>

      <rect x="24" y="28" width="300" height="190" rx="22" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="46" y="60" fill="#0f172a" fontSize="18" fontWeight="800">BJT: current control</text>
      <path d="M118 104h80M198 78v108M198 96l70-42M198 166l70 42" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
      <path className="bjt-base-pulse" d="M68 104h118" stroke="#154a96" strokeLinecap="round" markerEnd="url(#transistor-arrow)" />
      <path d="M258 60c-22 42-24 94 0 136" fill="none" stroke="#154a96" strokeWidth="4" strokeLinecap="round" markerEnd="url(#transistor-arrow)" />
      <text x="62" y="92" fill="#154a96" fontSize="14" fontWeight="800">small IB</text>
      <text x="240" y="122" fill="#154a96" fontSize="14" fontWeight="800">large IC</text>
      <text x="92" y="200" fill="#475569" fontSize="13" fontWeight="700">base current controls collector current</text>
      <circle className="bjt-carrier" r="5">
        <animateMotion dur="2.6s" repeatCount="indefinite" path="M258 60c-22 42-24 94 0 136" />
      </circle>
      <circle className="bjt-carrier" r="5">
        <animateMotion dur="2.6s" begin="-1.3s" repeatCount="indefinite" path="M258 60c-22 42-24 94 0 136" />
      </circle>

      <rect x="356" y="28" width="300" height="190" rx="22" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="378" y="60" fill="#0f172a" fontSize="18" fontWeight="800">MOSFET: voltage control</text>
      <path d="M492 82v126M532 82v126" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
      <rect x="496" y="124" width="32" height="52" rx="8" className="mos-channel" fill="#16a34a" />
      <path d="M428 104h48M428 186h48M548 104h58M548 186h58" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
      <path d="M476 104v82M412 145h64" stroke="#154a96" strokeWidth="4" strokeLinecap="round" />
      <path className="mos-current" d="M594 104v82" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd="url(#transistor-arrow)" />
      <text x="384" y="132" fill="#154a96" fontSize="14" fontWeight="800">VGS</text>
      <text x="562" y="88" fill="#475569" fontSize="13" fontWeight="700">drain</text>
      <text x="558" y="210" fill="#475569" fontSize="13" fontWeight="700">source</text>
      <text x="418" y="210" fill="#475569" fontSize="13" fontWeight="700">gate voltage forms channel</text>

      <rect x="24" y="244" width="300" height="106" rx="22" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="48" y="274" fill="#0f172a" fontSize="16" fontWeight="800">BJT output characteristic</text>
      <path d="M66 324h220M82 334V286" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" />
      <path className="transistor-curve" d="M84 320c28-24 70-26 192-25M84 306c36-25 78-27 192-26M84 292c42-25 90-27 192-26" fill="none" stroke="#154a96" strokeWidth="3" strokeLinecap="round" />
      <text x="232" y="340" fill="#64748b" fontSize="12" fontWeight="700">VCE</text>
      <text x="50" y="294" fill="#64748b" fontSize="12" fontWeight="700">IC</text>

      <rect x="356" y="244" width="300" height="106" rx="22" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="380" y="274" fill="#0f172a" fontSize="16" fontWeight="800">MOSFET transfer curve</text>
      <path d="M398 324h220M414 334V286" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" />
      <path className="transistor-curve" d="M414 322h58c18 0 28-6 40-22 14-18 28-20 74-20" fill="none" stroke="#16a34a" strokeWidth="3.4" strokeLinecap="round" />
      <text x="552" y="340" fill="#64748b" fontSize="12" fontWeight="700">VGS</text>
      <text x="382" y="294" fill="#64748b" fontSize="12" fontWeight="700">ID</text>
      <text x="466" y="338" fill="#16a34a" fontSize="12" fontWeight="800">VT</text>
    </svg>
  );
}

function AmplifierDeepDiveContent() {
  const sections = [
    {
      title: "What Is an Amplifier?",
      badge: "Core Idea",
      paragraphs: [
        "An amplifier is an electronic circuit that increases the strength of a signal without changing its basic information or intended waveform shape.",
        "The simplest way to understand amplification is signal scaling: a small input waveform enters the circuit and a larger output waveform appears at the load.",
      ],
      points: [
        "Amplification should increase signal level, not create unwanted distortion.",
        "The amplifier uses DC supply power to make the output signal larger.",
        "Voltage gain is commonly written as Av = Vout / Vin.",
      ],
      visual: "gain",
    },
    {
      title: "Why Amplifiers Are Important",
      badge: "Need",
      paragraphs: [
        "Real-world signals from microphones, antennas, and sensors are often too weak to drive loads or processing circuits directly.",
        "Amplifiers make these small signals usable in audio systems, communication receivers, measurement instruments, wireless devices, and control systems.",
      ],
      points: [
        "Audio amplifiers drive speakers and headphones.",
        "RF and IF amplifiers strengthen communication signals.",
        "Instrumentation amplifiers help read small sensor outputs.",
      ],
      visual: "system",
    },
    {
      title: "Basic Amplifier Model",
      badge: "Model",
      paragraphs: [
        "Every amplifier can be viewed as an input port, an output port, and a DC power supply. The input signal controls how supply energy is converted into output signal energy.",
        "Gain tells how strongly the amplifier scales a signal. If Vin is 20 mV and Vout is 2 V, the voltage gain is 100.",
      ],
      points: [
        "Input port receives the small signal.",
        "Power supply provides energy for the larger output.",
        "Output port delivers amplified signal to the load.",
      ],
      visual: "block",
    },
    {
      title: "Types of Amplifiers",
      badge: "Classification",
      paragraphs: [
        "Amplifiers are classified by the quantity they amplify, the frequency range they work in, and the transistor configuration used.",
        "For exam preparation, the most common categories are voltage amplifiers, current amplifiers, power amplifiers, audio amplifiers, RF amplifiers, common-emitter stages, and common-source stages.",
      ],
      points: [
        "By signal quantity: voltage, current, and power amplifiers.",
        "By frequency: audio, IF, and RF amplifiers.",
        "By configuration: CE, CS, CB, CG, emitter follower, and source follower.",
      ],
      visual: "types",
    },
    {
      title: "BJT Amplifier",
      badge: "Current Control",
      paragraphs: [
        "In a BJT amplifier, the input signal is applied at the base. A small change in base current causes a larger change in collector current, and the collector resistor converts that current change into output voltage.",
        "A common-emitter amplifier gives significant voltage gain and usually produces a 180 degree phase shift between input and output.",
      ],
      points: [
        "Input signal changes base current.",
        "Collector current changes more strongly.",
        "Output voltage develops across the collector load resistor.",
      ],
      visual: "bjt",
    },
    {
      title: "MOSFET Amplifier",
      badge: "Voltage Control",
      paragraphs: [
        "In a MOSFET amplifier, the input signal is applied at the gate. Gate-source voltage controls channel strength, which changes drain current and output voltage.",
        "A common-source MOSFET amplifier is the MOS counterpart of the common-emitter BJT amplifier. It can provide voltage gain and phase inversion with very high input impedance.",
      ],
      points: [
        "Input voltage controls channel formation.",
        "Drain current changes with gate-source voltage.",
        "High input impedance makes MOSFET amplifiers useful in ICs and sensor interfaces.",
      ],
      visual: "mosfet",
    },
    {
      title: "Frequency Response",
      badge: "Bandwidth",
      paragraphs: [
        "Amplifier gain is not constant at every frequency. It usually falls at low frequencies due to coupling and bypass capacitors, remains nearly constant in the midband, and falls again at high frequencies due to internal capacitances.",
        "The useful operating range is called bandwidth. It is commonly written as BW = fH - fL, where fL and fH are the lower and upper cutoff frequencies.",
      ],
      points: [
        "Low frequency region: gain drops.",
        "Midband region: gain remains almost constant.",
        "High frequency region: gain drops due to capacitance and device limits.",
      ],
      visual: "frequency",
    },
    {
      title: "Classes of Amplifiers",
      badge: "Power Stages",
      paragraphs: [
        "Amplifier classes describe how much of the input cycle the active device conducts. This affects efficiency, distortion, and application area.",
        "Class A gives high linearity but low efficiency. Class B improves efficiency but can create crossover distortion. Class AB is a practical compromise, while Class C is used mainly in tuned RF circuits.",
      ],
      points: [
        "Class A: conducts for the full cycle.",
        "Class B: conducts for half cycle.",
        "Class AB: conducts slightly more than half cycle.",
        "Class C: conducts less than half cycle, useful in RF tuned circuits.",
      ],
      visual: "classes",
    },
    {
      title: "Amplifier Distortion",
      badge: "Output Quality",
      paragraphs: [
        "Distortion occurs when the output is not a faithful scaled version of the input. It can change waveform shape, frequency balance, or phase relation.",
        "Common distortion types include harmonic distortion, frequency distortion, and phase distortion. Good amplifier design tries to keep signal scaling clean over the required bandwidth.",
      ],
      points: [
        "Harmonic distortion changes waveform shape.",
        "Frequency distortion amplifies some frequencies more than others.",
        "Phase distortion shifts frequency components unevenly.",
      ],
      visual: "distortion",
    },
    {
      title: "Practical Parameters",
      badge: "Exam Checklist",
      paragraphs: [
        "Practical amplifier questions often test gain, input impedance, output impedance, bandwidth, efficiency, and maximum undistorted output swing.",
        "A good amplifier has the right gain for the job, enough bandwidth, acceptable distortion, suitable impedance levels, and safe power dissipation.",
      ],
      points: [
        "Gain decides signal scaling.",
        "Input impedance decides loading on the source.",
        "Output impedance decides how well the amplifier drives the load.",
        "Efficiency matters strongly in power amplifiers.",
      ],
      visual: "parameters",
    },
    {
      title: "BJT vs MOSFET Amplifier",
      badge: "Comparison",
      paragraphs: [
        "BJT amplifiers are current-controlled and often provide strong transconductance for analog gain. MOSFET amplifiers are voltage-controlled and offer very high input impedance.",
        "Both are important. BJT amplifiers are common in discrete analog learning, while MOSFET amplifiers dominate integrated circuits and many modern mixed-signal designs.",
      ],
      points: [
        "BJT: current control, lower input impedance, strong analog gain examples.",
        "MOSFET: voltage control, high input impedance, common in IC design.",
        "Both require correct biasing before small-signal gain analysis.",
      ],
      visual: "compare",
    },
  ];

  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            Amplifiers / Complete Concept
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Step-by-Step Amplifier Explanation
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            Learn amplifier gain, signal scaling, BJT and MOSFET amplifier action,
            phase shift, frequency response, bandwidth, amplifier classes, distortion,
            and practical exam parameters with step-by-step circuit reading.
          </p>
        </div>
        <div className="rounded-[24px] border border-portal-100 bg-[#f8fbff] p-3">
          <CircuitVisualizationMovedNotice title="Amplifier visualization" />
        </div>
      </div>

      <div className="mt-6 divide-y divide-slate-200">
        {sections.map((section, index) => (
          <article
            key={section.title}
            id={`amplifier-topic-${toAnchorId(section.title)}`}
            className="scroll-mt-40 py-5 first:pt-0 last:pb-0"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-portal-600 text-xs font-black text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-portal-700">
                  {section.badge}
                </p>
                <h2 className="text-lg font-bold tracking-tight text-slate-950">
                  {section.title}
                </h2>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
              <div className="grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <ul className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-6 text-slate-700">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-3">
                <CircuitVisualizationMovedNotice title={`${section.title} visualization`} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <section
        id="amplifier-topic-final-summary"
        className="mt-5 scroll-mt-40 rounded-[24px] border border-portal-200 bg-portal-50/70 p-4 sm:p-5"
      >
        <h2 className="text-lg font-bold text-slate-950">Final Summary</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
          An amplifier increases signal strength while preserving the useful shape
          of the input. BJT and MOSFET amplifiers are foundation blocks for audio,
          communication, instrumentation, and integrated circuits. For exam solving,
          always identify biasing, configuration, gain, phase relation, bandwidth,
          and distortion limits.
        </p>
      </section>
    </section>
  );
}

function AmplifierMotionDiagram({ mode = "gain" }) {
  const titleMap = {
    gain: "Signal amplification",
    system: "Amplifier as a system",
    block: "Basic amplifier model",
    types: "Amplifier classifications",
    bjt: "BJT amplifier motion",
    mosfet: "MOSFET amplifier motion",
    frequency: "Frequency response",
    classes: "Amplifier classes",
    distortion: "Distortion visualization",
    parameters: "Practical parameters",
    compare: "BJT vs MOSFET amplifier",
  };

  return (
    <svg viewBox="0 0 620 300" className="mx-auto h-auto w-[640px] max-w-none md:w-full" role="img" aria-label={`${titleMap[mode] || "Amplifier animated explanation"} diagram`}>
      <defs>
        <marker id={`amp-arrow-${mode}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0 10 5 0 10Z" fill="#154a96" />
        </marker>
      </defs>
      <style>{`
        .amp-wave-small { stroke-dasharray: 260; stroke-dashoffset: 260; animation: ampDrawSmall 2.4s ease-in-out infinite; }
        .amp-wave-large { stroke-dasharray: 360; stroke-dashoffset: 360; animation: ampDrawLarge 2.4s ease-in-out infinite; }
        .amp-flow { stroke-dasharray: 12 10; animation: ampFlow 1.1s linear infinite; }
        .amp-pulse { animation: ampPulse 1.7s ease-in-out infinite; }
        .amp-channel { animation: ampChannel 2.4s ease-in-out infinite; transform-origin: 336px 136px; }
        .amp-response { stroke-dasharray: 380; stroke-dashoffset: 380; animation: ampResponse 3.2s ease-in-out infinite; }
        .amp-distort { animation: ampDistort 2.2s ease-in-out infinite; transform-origin: center; }
        @keyframes ampDrawSmall { 0% { stroke-dashoffset: 260; } 65%,100% { stroke-dashoffset: 0; } }
        @keyframes ampDrawLarge { 0% { stroke-dashoffset: 360; } 65%,100% { stroke-dashoffset: 0; } }
        @keyframes ampFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -22; } }
        @keyframes ampPulse { 0%,100% { opacity: .28; } 50% { opacity: .95; } }
        @keyframes ampChannel { 0%,100% { transform: scaleY(.25); opacity: .35; } 50% { transform: scaleY(1); opacity: .95; } }
        @keyframes ampResponse { 0% { stroke-dashoffset: 380; } 75%,100% { stroke-dashoffset: 0; } }
        @keyframes ampDistort { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(.72); } }
      `}</style>

      <rect x="18" y="20" width="584" height="260" rx="22" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
      <text x="42" y="54" fill="#0f172a" fontSize="18" fontWeight="800">{titleMap[mode] || "Amplifier"}</text>

      {["gain", "system", "block"].includes(mode) ? (
        <>
          <path className="amp-wave-small" d="M54 148c16-26 32-26 48 0s32 26 48 0 32-26 48 0" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <path d="M218 118h116l54 30-54 30H218Z" fill="#eff6ff" stroke="#154a96" strokeWidth="3" strokeLinejoin="round" />
          <text x="252" y="153" fill="#154a96" fontSize="17" fontWeight="900">Av</text>
          <path className="amp-flow" d="M188 148h50M370 148h44" stroke="#154a96" strokeWidth="4" strokeLinecap="round" markerEnd={`url(#amp-arrow-${mode})`} />
          <path className="amp-wave-large" d="M428 148c20-50 40-50 60 0s40 50 60 0" fill="none" stroke="#154a96" strokeWidth="4" strokeLinecap="round" />
          <text x="64" y="206" fill="#475569" fontSize="13" fontWeight="700">small input</text>
          <text x="454" y="222" fill="#154a96" fontSize="13" fontWeight="800">larger output, same shape</text>
          <path d="M276 92v-28" stroke="#f97316" strokeWidth="4" strokeLinecap="round" markerEnd={`url(#amp-arrow-${mode})`} />
          <text x="220" y="82" fill="#f97316" fontSize="13" fontWeight="800">DC supply energy</text>
        </>
      ) : null}

      {mode === "types" ? (
        <>
          {[
            ["Voltage", 68, 118],
            ["Current", 230, 118],
            ["Power", 392, 118],
            ["Audio", 68, 190],
            ["RF / IF", 230, 190],
            ["CE / CS", 392, 190],
          ].map(([label, x, y], index) => (
            <g key={label} className={index % 2 ? "" : "amp-pulse"}>
              <rect x={x} y={y} width="128" height="44" rx="14" fill="#f8fbff" stroke="#bfdbfe" strokeWidth="2" />
              <text x={x + 22} y={y + 28} fill="#154a96" fontSize="14" fontWeight="900">{label}</text>
            </g>
          ))}
        </>
      ) : null}

      {mode === "bjt" ? (
        <>
          <path d="M156 126h82M238 88v112M238 108l82-48M238 178l82 48" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <path className="amp-pulse" d="M74 126h150" stroke="#154a96" strokeWidth="6" strokeLinecap="round" markerEnd={`url(#amp-arrow-${mode})`} />
          <path className="amp-flow" d="M310 66c-24 48-24 104 0 152" stroke="#154a96" strokeWidth="5" fill="none" strokeLinecap="round" markerEnd={`url(#amp-arrow-${mode})`} />
          <path className="amp-wave-small" d="M70 224c12-18 24-18 36 0s24 18 36 0 24-18 36 0" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <path className="amp-wave-large" d="M394 180c18 42 36 42 54 0s36-42 54 0 36 42 54 0" fill="none" stroke="#154a96" strokeWidth="4" strokeLinecap="round" />
          <text x="80" y="108" fill="#154a96" fontSize="14" fontWeight="800">base input</text>
          <text x="392" y="236" fill="#154a96" fontSize="14" fontWeight="800">inverted amplified output</text>
        </>
      ) : null}

      {mode === "mosfet" ? (
        <>
          <path d="M250 80v140M294 80v140M174 112h58M174 188h58M314 112h100M314 188h100" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <rect x="256" y="120" width="32" height="58" rx="8" className="amp-channel" fill="#16a34a" />
          <path className="amp-pulse" d="M96 150h134" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#amp-arrow-${mode})`} />
          <path className="amp-flow" d="M396 112v76" stroke="#154a96" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#amp-arrow-${mode})`} />
          <path className="amp-wave-large" d="M440 150c18-42 36-42 54 0s36 42 54 0" fill="none" stroke="#154a96" strokeWidth="4" strokeLinecap="round" />
          <text x="100" y="132" fill="#154a96" fontSize="14" fontWeight="800">gate signal</text>
          <text x="250" y="238" fill="#16a34a" fontSize="14" fontWeight="800">channel grows</text>
        </>
      ) : null}

      {mode === "frequency" ? (
        <>
          <path d="M74 226h466M96 238V84" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <path className="amp-response" d="M98 212c48-120 82-118 128-118h152c48 0 78 22 124 116" fill="none" stroke="#154a96" strokeWidth="5" strokeLinecap="round" />
          <path d="M206 228V94M422 228V94" stroke="#f97316" strokeWidth="2.8" strokeDasharray="7 8" />
          <text x="188" y="248" fill="#f97316" fontSize="13" fontWeight="800">fL</text>
          <text x="408" y="248" fill="#f97316" fontSize="13" fontWeight="800">fH</text>
          <text x="260" y="82" fill="#154a96" fontSize="14" fontWeight="800">midband gain</text>
        </>
      ) : null}

      {mode === "classes" ? (
        <>
          {[
            ["Class A", "360 deg", 62, 110],
            ["Class B", "180 deg", 218, 110],
            ["Class AB", ">180 deg", 374, 110],
            ["Class C", "<180 deg", 218, 190],
          ].map(([name, detail, x, y]) => (
            <g key={name}>
              <rect x={x} y={y} width="130" height="58" rx="16" fill="#f8fbff" stroke="#bfdbfe" strokeWidth="2" />
              <path className="amp-wave-small" d={`M${x + 18} ${y + 40}c12-22 24-22 36 0s24 22 36 0`} fill="none" stroke="#154a96" strokeWidth="3" strokeLinecap="round" />
              <text x={x + 18} y={y + 22} fill="#0f172a" fontSize="13" fontWeight="900">{name}</text>
              <text x={x + 78} y={y + 22} fill="#64748b" fontSize="12" fontWeight="800">{detail}</text>
            </g>
          ))}
        </>
      ) : null}

      {mode === "distortion" ? (
        <>
          <path className="amp-wave-small" d="M70 150c22-42 44-42 66 0s44 42 66 0 44-42 66 0" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <path d="M300 150h52" stroke="#154a96" strokeWidth="4" strokeLinecap="round" markerEnd={`url(#amp-arrow-${mode})`} />
          <path className="amp-distort" d="M386 150c18-54 42-24 60 0s36 46 60 0 42-56 62 0" fill="none" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
          <text x="82" y="218" fill="#64748b" fontSize="13" fontWeight="800">clean input</text>
          <text x="420" y="218" fill="#dc2626" fontSize="13" fontWeight="800">distorted output</text>
        </>
      ) : null}

      {["parameters", "compare"].includes(mode) ? (
        <>
          {[
            mode === "compare" ? ["BJT", "current control", 74, 110] : ["Gain", "Vout / Vin", 74, 110],
            mode === "compare" ? ["MOSFET", "voltage control", 344, 110] : ["Input Z", "source loading", 344, 110],
            mode === "compare" ? ["Biasing", "sets Q-point", 74, 190] : ["Output Z", "load drive", 74, 190],
            mode === "compare" ? ["Region", "must identify first", 344, 190] : ["Efficiency", "power use", 344, 190],
          ].map(([name, detail, x, y]) => (
            <g key={name} className="amp-pulse">
              <rect x={x} y={y} width="196" height="52" rx="16" fill="#f8fbff" stroke="#bfdbfe" strokeWidth="2" />
              <text x={x + 18} y={y + 22} fill="#0f172a" fontSize="14" fontWeight="900">{name}</text>
              <text x={x + 18} y={y + 40} fill="#64748b" fontSize="12" fontWeight="800">{detail}</text>
            </g>
          ))}
        </>
      ) : null}
    </svg>
  );
}

function FallbackSubjectPage({ subject, steps, totalConcepts, subjectSummary }) {
  return (
    <>
      <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <SubjectTheoryIcon />
          <div className="min-w-0 flex-1">
            <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-portal-700">
              Subject Overview
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {subject.title}
            </h1>
            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
              {subjectSummary}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <HeroMetric label="Roadmap Modules" value={String(steps.length).padStart(2, "0")} />
              <HeroMetric label="Core Topics" value={String(totalConcepts).padStart(2, "0")} />
              <HeroMetric label="Learning View" value="Guided Subject" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              How To Study This Subject
            </h2>
            <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">
              Follow this order so the subject builds from basics to problem solving.
            </p>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
            {steps.length} modules
          </span>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {steps.map((step, index) => (
            <StudyFlowCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </section>

      {subject.title === "Signals and Systems" ? (
        <div className="mt-5">
          <SignalsOverviewPanel />
        </div>
      ) : subject.title === "Communication Systems" ? (
        <div className="mt-5">
          <CommunicationSystemsOverviewPanel />
        </div>
      ) : subject.title === "Control Systems" ? (
        <div className="mt-5">
          <ControlSystemsOverviewPanel />
          <ControlSystemsSyllabusSection />
        </div>
      ) : null}

      {subject.title === "Analog Electronics" ? <AnalogElectronicsSection /> : null}
    </>
  );
}

function SubjectSeoDepthSection({
  subject,
  chapterMeta,
  concepts = [],
  learningTopics = [],
  notesHref,
}) {
  const chapterTitles = concepts
    .map((concept) => concept.shortTitle || concept.title)
    .filter(Boolean)
    .slice(0, 10);
  const formulaItems = concepts
    .flatMap((concept) =>
      (concept.formulas || []).map((formula) => ({
        ...formula,
        conceptTitle: concept.shortTitle || concept.title,
      }))
    )
    .slice(0, 6);
  const readyTopicLinks = learningTopics.slice(0, 6);
  const studyRouteItems = [
    "Use the hamburger menu to move chapter by chapter instead of reading everything on the first page.",
    "Open notes when you want the full explanation, then return here to continue navigation.",
    "After finishing one chapter, solve questions before jumping to the next.",
  ];

  return (
    <section className="mt-5 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Subject Guide
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {subject.title} Notes
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            This page is the entry point for {subject.title}. Use it to open notes,
            jump through chapters, and move into practice without repeating long
            theory on the first page.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-base font-bold text-slate-950">
                Chapter-Wise Coverage
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {chapterTitles.map((title) => (
                  <li key={title} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                    <span>{title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h3 className="text-base font-bold text-slate-950">How To Use This Hub</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {studyRouteItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-portal-100 bg-portal-50/60 p-4">
          <h3 className="text-base font-bold text-slate-950">
            Contextual Study Links
          </h3>
          <div className="mt-3 grid gap-2">
            <Link
              href={notesHref}
              className="rounded-xl border border-white bg-white px-3 py-2.5 text-sm font-bold text-portal-700 transition hover:border-portal-200"
            >
              {subject.title} notes
            </Link>
            <Link
              href={`/practice?search=${encodeURIComponent(subject.search)}`}
              className="rounded-xl border border-white bg-white px-3 py-2.5 text-sm font-bold text-portal-700 transition hover:border-portal-200"
            >
              Practice {subject.title} questions
            </Link>
            <Link
              href="/previous-year"
              className="rounded-xl border border-white bg-white px-3 py-2.5 text-sm font-bold text-portal-700 transition hover:border-portal-200"
            >
              Previous year papers
            </Link>
            {readyTopicLinks.map((topic) => (
              <Link
                key={topic.slug || topic.title}
                href={topic.href}
                className="rounded-xl border border-white bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-portal-200 hover:text-portal-700"
              >
                {topic.title}
              </Link>
            ))}
          </div>

          <div className="mt-5 border-t border-portal-100 pt-4">
            <h3 className="text-base font-bold text-slate-950">
              Study Strategy
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {chapterMeta?.studyTip ||
                `Study ${subject.title} in chapter order, revise formulas after each topic, and solve previous year questions before switching subjects.`}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

const NETWORK_CORE_IDEAS = [
  {
    title: "Voltage",
    formula: "V = W / Q",
    description:
      "Voltage is the electrical pressure or potential difference that pushes charge through a circuit.",
  },
  {
    title: "Current",
    formula: "I = Q / t",
    description:
      "Current is the rate of flow of electric charge through a conductor or branch.",
  },
  {
    title: "Resistance",
    formula: "R = V / I",
    description:
      "Resistance opposes current flow and converts electrical energy into heat or useful load power.",
  },
  {
    title: "Power",
    formula: "P = VI",
    description:
      "Electrical power tells how fast energy is delivered by a source or consumed by an element.",
  },
  {
    title: "Energy",
    formula: "E = Pt",
    description:
      "Energy is the total electrical work transferred or stored over a time interval.",
  },
];

const NETWORK_GUIDE_MODULES = [
  {
    title: "Basic concepts",
    description:
      "Start with voltage, current, resistance, power, energy, circuit reading, source behavior, and sign conventions.",
  },
  {
    title: "Circuit laws",
    description:
      "Use Ohm's law, KCL, and KVL to describe current and voltage behavior in real circuit connections.",
  },
  {
    title: "Solving methods",
    description:
      "Apply nodal analysis, mesh analysis, source transformation, and star-delta conversion when simple reduction is not enough.",
  },
  {
    title: "Network theorems",
    description:
      "Simplify circuits using Superposition, Thevenin, Norton, Maximum Power Transfer, and related theorem ideas.",
  },
  {
    title: "AC analysis",
    description:
      "Move from sinusoids to phasors, impedance, power factor, resonance, and frequency-dependent circuit behavior.",
  },
  {
    title: "Transients",
    description:
      "Study switching behavior in RL, RC, and RLC circuits using initial conditions, final values, and time constants.",
  },
  {
    title: "Laplace and two-port methods",
    description:
      "Use s-domain analysis, network functions, poles and zeros, filters, and two-port parameters for larger circuit models.",
  },
];

const NETWORK_GUIDE_FORMULAS = [
  ["Ohm's law", "V = IR", "Connects voltage, current, and resistance. It is the first check in most resistor circuits."],
  ["KCL", "sum I = 0", "Current is conserved at a node. This is the base of nodal analysis."],
  ["KVL", "sum V = 0", "Voltage rises and drops balance around a closed loop. This is the base of mesh analysis."],
  ["Series resistors", "Req = R1 + R2 + ...", "Use when the same current passes through every resistor in the chain."],
  ["Parallel resistors", "1 / Req = 1 / R1 + 1 / R2 + ...", "Use when every branch has the same voltage across it."],
  ["AC power", "P = VI cos(phi)", "Shows why phase angle and power factor matter in AC circuits."],
];

const NETWORK_LEARNING_OUTCOMES = [
  "Circuit laws",
  "Network theorems",
  "AC analysis",
  "Transient response",
  "Laplace transform",
  "Two-port networks",
  "Resonance",
  "Problem solving",
];

const NETWORK_ENGINEER_STEPS = [
  "Read the circuit carefully and mark nodes, branches, polarities, and assumed current directions.",
  "Identify known values, unknown quantities, source types, and the element where the answer is required.",
  "Choose the best method: direct reduction, nodal, mesh, source transformation, or a theorem.",
  "Write equations using KCL, KVL, element relations, and consistent sign convention.",
  "Solve the equations, then check whether the sign, unit, and magnitude are physically reasonable.",
];

const NETWORK_STRUGGLES = [
  {
    title: "Wrong current direction",
    description:
      "Current direction can be assumed at the start. A negative answer simply means the actual current flows opposite to the assumed arrow.",
  },
  {
    title: "Polarity mistakes",
    description:
      "Use passive sign convention consistently so voltage drops, current entry points, and absorbed power do not get mixed.",
  },
  {
    title: "KVL loop errors",
    description:
      "Keep one loop direction while adding voltage rises and drops. Most loop mistakes come from changing sign rules mid-equation.",
  },
  {
    title: "Choosing the wrong method",
    description:
      "Some circuits are faster with nodal analysis, some with mesh analysis, and some with Thevenin or Norton reduction.",
  },
  {
    title: "AC phase confusion",
    description:
      "Leading and lagging relationships must be clear before using impedance, power factor, resonance, or phasor diagrams.",
  },
];

function NetworkAnalysisSubjectGuide({ notesHref }) {
  const studySteps = [
    "Understand each idea visually before memorizing formulas.",
    "Learn laws and formulas with the condition where each one applies.",
    "Solve simple DC circuits first, then increase circuit complexity gradually.",
    "Practice method selection: reduction, nodal, mesh, or theorem-based solving.",
    "Solve previous year questions and revise short notes regularly.",
  ];
  const applicationAreas = [
    "Power supplies, adapters, and regulated DC stages",
    "Audio amplifiers, filters, and resonant networks",
    "RF, communication, and signal-processing front ends",
    "PCB circuits, embedded hardware, and sensor interfaces",
    "Electric vehicles, robotics, automation, and load checks",
  ];
  const examPointers = [
    "KCL, KVL, nodal, and mesh analysis reward clean equations more than memorized shortcuts.",
    "Theorems become fast only when you identify the load terminals correctly.",
    "AC questions often turn on impedance, phase, power factor, or resonance conditions.",
    "Transient questions are easier after checking initial and final values before writing the response.",
  ];
  const questionTypes = [
    {
      title: "Direct concept questions",
      description:
        "Definitions, element types, source behavior, passive sign convention, and the meaning of voltage, current, power, and energy.",
    },
    {
      title: "Equation-writing questions",
      description:
        "KCL, KVL, nodal analysis, mesh analysis, source transformation, and star-delta conversion.",
    },
    {
      title: "Theorem-based questions",
      description:
        "Superposition, Thevenin, Norton, maximum power transfer, reciprocity, Millman, and compensation theorem problems.",
    },
    {
      title: "AC and transient numericals",
      description:
        "Impedance, phasors, resonance, power factor, RC/RL/RLC response, time constant, and initial/final value reasoning.",
    },
  ];
  const theoryDeepDive = [
    {
      title: "1. What a network really means",
      paragraphs: [
        "An electrical network is a group of connected electrical elements. These elements may be resistors, capacitors, inductors, voltage sources, current sources, dependent sources, switches, or loads. Once they are connected together, the behavior of one part affects the behavior of another part.",
        "Network Analysis means finding unknown voltages, currents, powers, energy storage, equivalent resistance, impedance, transfer function, or response of that connected circuit. The goal is not only to get a numerical answer, but to understand why the circuit behaves that way.",
      ],
      points: [
        "A node is a point where two or more elements meet.",
        "A branch is a path containing one element or one group of elements.",
        "A loop is any closed path in a circuit.",
        "A mesh is a loop that does not contain another loop inside it.",
      ],
    },
    {
      title: "2. Basic electrical quantities",
      paragraphs: [
        "Voltage is the potential difference between two points. It tells how much energy is available per unit charge. Current is the rate at which charge flows through a branch. Resistance opposes current flow. Power tells whether an element is absorbing energy or delivering energy.",
        "These quantities must always be read with direction and polarity. A current arrow and a voltage polarity are not decoration; they decide the sign of the answer. If the final current is negative, it usually means the real current flows opposite to the assumed direction.",
      ],
      points: [
        "Voltage is measured across two points.",
        "Current is measured through a branch.",
        "Power is positive when an element absorbs energy.",
        "Power is negative when an element delivers energy.",
      ],
    },
    {
      title: "3. Circuit laws are conservation laws",
      paragraphs: [
        "Kirchhoff's Current Law is based on conservation of charge. At any node, the total current entering must equal the total current leaving. This is why KCL is the natural law for nodal analysis.",
        "Kirchhoff's Voltage Law is based on conservation of energy. Around a closed loop, the algebraic sum of all voltage rises and drops is zero. This is why KVL is the natural law for mesh analysis.",
      ],
      points: [
        "Use KCL when the circuit has many current branches and fewer important nodes.",
        "Use KVL when the circuit is planar and loop currents are easy to define.",
        "Always choose one sign convention and follow it throughout the problem.",
      ],
    },
    {
      title: "4. How solving methods are chosen",
      paragraphs: [
        "A good circuit solver first studies the shape of the network. If resistors are clearly in series or parallel, reduce them directly. If many branches meet at nodes, nodal analysis is usually faster. If the circuit has clear loops and no crossing branches, mesh analysis is often convenient.",
        "Network theorems are used when the circuit can be simplified around a load. Thevenin and Norton are especially useful when only one load branch is important, or when the load value changes.",
      ],
      points: [
        "Use reduction for simple series-parallel circuits.",
        "Use nodal analysis for node-voltage questions.",
        "Use mesh analysis for loop-current questions.",
        "Use Thevenin or Norton when a load terminal is the focus.",
      ],
    },
    {
      title: "5. DC, AC, and transient behavior",
      paragraphs: [
        "In DC steady state, resistors dominate the calculation. Capacitors behave like open circuits after a long time, and inductors behave like short circuits after a long time, assuming ideal elements.",
        "In AC analysis, voltage and current change sinusoidally. Resistors, capacitors, and inductors are handled using impedance. This introduces phase, so the answer has both magnitude and angle. That is why phasors, complex numbers, power factor, and resonance become important.",
        "In transient analysis, the circuit is observed immediately after switching and as time passes. Capacitor voltage cannot change instantly, and inductor current cannot change instantly. These two continuity rules are the key to RC, RL, and RLC transient problems.",
      ],
      points: [
        "DC analysis asks: what is the final steady value?",
        "AC analysis asks: what are magnitude and phase?",
        "Transient analysis asks: how does the circuit move from initial value to final value?",
      ],
    },
    {
      title: "6. What exam questions actually test",
      paragraphs: [
        "Most Network Analysis questions are not testing a new formula. They test whether you can identify the correct circuit condition. For example, a voltage-divider formula works only when elements are in true series. A current-divider formula works only when branches are in true parallel.",
        "The best preparation is to connect every formula with its condition, every theorem with its use case, and every answer with a unit and physical meaning.",
      ],
      points: [
        "Before solving, identify the required quantity.",
        "Before using a formula, check its condition.",
        "After solving, check sign, unit, and practical meaning.",
      ],
    },
  ];
  return (
    <section className="mt-5 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-panel">
      <div className="grid gap-5 border-b border-slate-200 px-4 py-5 sm:px-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Network Analysis Guide
          </p>
          <h2 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight text-slate-950">
            A beginner-friendly introduction to circuit problem solving
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Network Analysis is the foundation subject that explains how voltage,
            current, power, and energy behave inside electrical circuits. It turns a
            circuit diagram into equations, then into answers that describe the real
            behavior of sources, resistors, capacitors, inductors, and loads.
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
            This is why it matters in ECE and EE: the same reasoning appears in
            analog electronics, control systems, communication circuits, embedded
            hardware, PCB design, GATE preparation, interviews, and real debugging.
          </p>
        </div>

        <aside className="rounded-[24px] border border-portal-100 bg-portal-50/70 p-4">
          <h3 className="text-base font-bold text-slate-950">Why students should care</h3>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
            {[
              "Builds strong circuit-solving skills.",
              "Required for Analog Electronics and Control Systems.",
              "Used in Communication Engineering and hardware design.",
              "Essential for GATE ECE, GATE EE, placements, and interviews.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="border-b border-slate-200 px-4 py-5 sm:px-5">
        <h3 className="text-lg font-bold tracking-tight text-slate-950">
          Core circuit ideas
        </h3>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600">
          These quantities are more than symbols. Understanding their physical
          meaning makes KCL, KVL, power calculations, AC analysis, and transients
          much easier to read.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {NETWORK_CORE_IDEAS.map((idea) => (
            <article
              key={idea.title}
              className="rounded-[20px] border border-slate-200 bg-slate-50/80 p-4"
            >
              <h4 className="text-base font-bold text-slate-950">{idea.title}</h4>
              <p className="mt-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-portal-800">
                {idea.formula}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{idea.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-5 sm:px-5">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-slate-950">
              Overview of Network Analysis
            </h3>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
              Network Analysis teaches why a circuit behaves in a particular way,
              what quantities must be calculated, where each method should be used,
              and how to convert a circuit diagram into correct mathematical steps.
              It is the bridge between seeing a circuit and understanding its actual
              voltage, current, power, frequency, and time-domain behavior.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                ["Why", "To understand and solve electrical circuits logically instead of guessing formulas."],
                ["What", "Sources, resistors, capacitors, inductors, nodes, loops, branches, impedance, and network response."],
                ["Where", "Analog circuits, filters, power supplies, communication circuits, control systems, PCB debugging, and measurements."],
                ["How", "Read the network, choose a method, write KCL/KVL or theorem equations, solve, and verify units and signs."],
                ["Importance", "It is the base for almost every circuit subject in ECE and EE, including GATE/PSU problem solving."],
                ["Meaning", "A network is an interconnection of electrical elements; analysis means finding how electrical quantities behave inside it."],
              ].map(([title, description]) => (
                <article
                  key={title}
                  className="rounded-[20px] border border-slate-200 bg-slate-50/80 p-4"
                >
                  <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-portal-700">
                    {title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
            <h3 className="text-base font-bold text-slate-950">Question types to expect</h3>
            <div className="mt-3 grid gap-3">
              {questionTypes.map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-3">
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white px-4 py-5 sm:px-5">
        <div className="max-w-5xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Theory Deep Dive
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            In-depth explanation of Network Analysis
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            Read this section like class notes. It explains the theory behind the
            subject before you jump into formulas, MCQs, or previous year problems.
          </p>
        </div>
        <div className="mt-5 grid gap-4">
          {theoryDeepDive.map((section) => (
            <article
              key={section.title}
              className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
            >
              <h4 className="text-lg font-bold tracking-tight text-slate-950">
                {section.title}
              </h4>
              <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-4 grid gap-2 md:grid-cols-3">
                {section.points.map((point) => (
                  <p
                    key={point}
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-700"
                  >
                    {point}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-5 px-4 py-5 sm:px-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-slate-950">
            Learning roadmap
          </h3>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600">
            Network Analysis must be learned step by step because each topic builds
            the next one. Circuit laws come before solving methods; solving methods
            make theorems useful; AC, transients, and Laplace methods become easier
            only after that base is stable.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {NETWORK_GUIDE_MODULES.map((module, index) => (
              <article
                key={module.title}
                className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-4"
              >
                <p className="text-xs font-bold text-portal-700">Module {index + 1}</p>
                <h4 className="mt-1 text-base font-bold text-slate-950">{module.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
            <h3 className="text-base font-bold text-slate-950">What you will learn</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {NETWORK_LEARNING_OUTCOMES.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-4">
            <h3 className="text-base font-bold text-slate-950">Where you use it</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
              {applicationAreas.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="grid gap-5 border-t border-slate-200 bg-slate-50/50 px-4 py-5 sm:px-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-slate-950">
            Formula quick view
          </h3>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600">
            These formulas are the basic tools used to solve almost every electrical
            network problem. Learn not only the equation, but also when and why it
            is valid.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {NETWORK_GUIDE_FORMULAS.map(([label, formula, note]) => (
              <article key={label} className="rounded-[20px] border border-slate-200 bg-white p-3.5">
                <p className="text-xs font-bold text-slate-500">{label}</p>
                <p className="mt-2 rounded-xl bg-portal-50 px-3 py-2 text-sm font-bold text-portal-800">
                  {formula}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-600">{note}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[24px] border border-slate-200 bg-white p-4">
          <h3 className="text-base font-bold text-slate-950">Smart study strategy</h3>
          <ol className="mt-3 grid gap-3 text-sm leading-6 text-slate-700">
            {studySteps.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-3 text-sm leading-6 text-amber-950">
            Best habit: solve enough examples that method selection becomes natural,
            not a last-minute guess.
          </p>
        </aside>
      </div>

      <div className="grid gap-5 border-t border-slate-200 px-4 py-5 sm:px-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-slate-950">
            How engineers think while solving circuits
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700">
            Circuit solving is not memorization. It is a repeatable process: read
            the network, choose the method, write correct equations, solve carefully,
            and check whether the answer makes physical sense.
          </p>
          <ol className="mt-4 grid gap-3 md:grid-cols-2">
            {NETWORK_ENGINEER_STEPS.map((step, index) => (
              <li
                key={step}
                className="flex gap-3 rounded-[20px] border border-slate-200 bg-slate-50/70 p-4 text-sm leading-6 text-slate-700"
              >
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
          <h3 className="text-base font-bold text-slate-950">Why students struggle</h3>
          <div className="mt-3 grid gap-3">
            {NETWORK_STRUGGLES.map((item) => (
              <div key={item.title} className="border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="border-t border-slate-200 px-4 py-5 sm:px-5">
        <h3 className="text-lg font-bold tracking-tight text-slate-950">Exam focus</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {examPointers.map((item) => (
            <p
              key={item}
              className="rounded-[20px] border border-slate-200 bg-slate-50/80 p-4 text-sm leading-6 text-slate-700"
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-950 px-4 py-5 text-white sm:px-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              Master electrical circuits step by step
            </h3>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-200 sm:text-base">
              Build the analytical skills needed for advanced electronics
              engineering, GATE preparation, technical interviews, and real-world
              circuit design.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:flex">
            <Link
              href="/basic-concepts"
              className="inline-flex justify-center rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
            >
              Start Learning
            </Link>
            <Link
              href="/subjects/network-analysis"
              className="inline-flex justify-center rounded-xl border border-white/20 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Explore Topics
            </Link>
            <Link
              href="/practice?search=Network%20Analysis"
              className="inline-flex justify-center rounded-xl border border-white/20 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Solve Practice
            </Link>
            <Link
              href="/previous-year"
              className="inline-flex justify-center rounded-xl border border-white/20 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              PYQs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MovedSubjectVisualizationCard({ title, children }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fbff] p-3 shadow-sm sm:p-4">
      <h3 className="text-sm font-black text-slate-950">{title}</h3>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-white bg-white p-2">
        {children}
      </div>
    </article>
  );
}

const AMPLIFIER_VISUALIZATION_MODES = [
  ["gain", "Signal amplification"],
  ["system", "Amplifier as a system"],
  ["block", "Basic amplifier model"],
  ["types", "Amplifier classifications"],
  ["bjt", "BJT amplifier motion"],
  ["mosfet", "MOSFET amplifier motion"],
  ["frequency", "Frequency response"],
  ["classes", "Amplifier classes"],
  ["distortion", "Amplifier distortion"],
  ["parameters", "Practical amplifier parameters"],
  ["compare", "BJT and MOSFET amplifier comparison"],
];

const OSCILLATOR_VISUALIZATION_MODES = [
  ["loop", "Oscillator feedback loop"],
  ["rc", "RC oscillator circuit"],
  ["lc", "LC oscillator circuit"],
  ["crystal", "Crystal oscillator equivalent circuit"],
];

const OPAMP_VISUALIZATION_MODES = [
  ["inverting", "Inverting op-amp feedback"],
  ["noninverting", "Non-inverting op-amp"],
  ["follower", "Voltage follower"],
  ["summing", "Summing amplifier"],
  ["integrator", "Integrator"],
  ["differentiator", "Differentiator"],
  ["comparator", "Comparator"],
  ["schmitt", "Schmitt trigger"],
];

export function SubjectCircuitVisualizationGallery() {
  const semiconductorVisuals = SEMICONDUCTOR_TOPIC_LESSONS.flatMap((lesson) =>
    lesson.subtopics.map((subtopic) => ({
      title: subtopic.name,
      mode: "pn",
    }))
  );
  const diodeApplicationVisuals = DIODE_APPLICATION_TOPIC_LESSONS.flatMap((lesson) =>
    lesson.subtopics.map((subtopic) => ({
      title: subtopic.name,
      visual: subtopic.visual,
    }))
  );
  const bjtVisuals = BJT_TOPIC_LESSONS.flatMap((lesson) =>
    lesson.subtopics.map((subtopic) => ({
      title: subtopic.name,
      visual: subtopic.visual,
    }))
  );
  const bjtAmplifierVisuals = BJT_AMPLIFIER_TOPIC_LESSONS.flatMap((lesson) =>
    lesson.subtopics.map((subtopic) => ({
      title: subtopic.name,
      visual: subtopic.visual,
    }))
  );
  const fetVisuals = FET_TOPIC_LESSONS.flatMap((lesson) =>
    lesson.subtopics.map((subtopic) => ({
      title: subtopic.name,
      visual: subtopic.visual,
    }))
  );
  const feedbackVisuals = FEEDBACK_TOPIC_LESSONS.flatMap((lesson) =>
    lesson.subtopics.map((subtopic) => ({
      title: subtopic.name,
      visual: subtopic.visual,
    }))
  );

  return (
    <div className="grid gap-5">
      <section className="grid gap-3">
        <h3 className="text-base font-black text-slate-950">
          Analog Electronics chapter circuit flows
        </h3>
        <div className="grid gap-3 xl:grid-cols-2">
          {ANALOG_CHAPTERS.flatMap((chapter) => [
            <MovedSubjectVisualizationCard
              key={`${chapter.slug}-chapter`}
              title={`${chapter.title} chapter flow`}
            >
              <AnalogChapterMotionDiagram
                mode={chapter.diagramMode}
                title={`${chapter.title} flow`}
              />
            </MovedSubjectVisualizationCard>,
            ...chapter.topics.map((topic) => (
              <MovedSubjectVisualizationCard
                key={`${chapter.slug}-${topic.title}`}
                title={topic.title}
              >
                <AnalogChapterMotionDiagram
                  mode={chapter.diagramMode}
                  title={topic.title}
                />
              </MovedSubjectVisualizationCard>
            )),
          ])}
        </div>
      </section>

      <section className="grid gap-3">
        <h3 className="text-base font-black text-slate-950">
          Semiconductor and diode circuit visualizations
        </h3>
        <div className="grid gap-3 xl:grid-cols-2">
          <MovedSubjectVisualizationCard title="Atomic control to PN junction flow">
            <AnalogChapterMotionDiagram mode="pn" title="Atomic control to PN junction flow" />
          </MovedSubjectVisualizationCard>
          {semiconductorVisuals.map((item) => (
            <MovedSubjectVisualizationCard key={item.title} title={item.title}>
              <AnalogChapterMotionDiagram mode={item.mode} title={item.title} />
            </MovedSubjectVisualizationCard>
          ))}
          <MovedSubjectVisualizationCard title="Diode PN junction and forward bias">
            <DiodeMotionDiagram />
          </MovedSubjectVisualizationCard>
          <MovedSubjectVisualizationCard title="Rectifier waveform">
            <RectifierMotionDiagram />
          </MovedSubjectVisualizationCard>
          <MovedSubjectVisualizationCard title="Diode application flow">
            <DiodeApplicationDiagram visual="bridge" title="Diode application flow" />
          </MovedSubjectVisualizationCard>
          {diodeApplicationVisuals.map((item) => (
            <MovedSubjectVisualizationCard key={`${item.visual}-${item.title}`} title={item.title}>
              <DiodeApplicationDiagram visual={item.visual} title={item.title} />
            </MovedSubjectVisualizationCard>
          ))}
        </div>
      </section>

      <section className="grid gap-3">
        <h3 className="text-base font-black text-slate-950">
          Transistor and amplifier visualizations
        </h3>
        <div className="grid gap-3 xl:grid-cols-2">
          <MovedSubjectVisualizationCard title="BJT and MOSFET operation">
            <TransistorMotionDiagram />
          </MovedSubjectVisualizationCard>
          {AMPLIFIER_VISUALIZATION_MODES.map(([mode, title]) => (
            <MovedSubjectVisualizationCard key={mode} title={title}>
              <AmplifierMotionDiagram mode={mode} />
            </MovedSubjectVisualizationCard>
          ))}
          <MovedSubjectVisualizationCard title="BJT carrier-control flow">
            <BjtDiagram visual="working" title="BJT carrier-control flow" />
          </MovedSubjectVisualizationCard>
          {bjtVisuals.map((item) => (
            <MovedSubjectVisualizationCard key={`bjt-${item.visual}-${item.title}`} title={item.title}>
              <BjtDiagram visual={item.visual} title={item.title} />
            </MovedSubjectVisualizationCard>
          ))}
          <MovedSubjectVisualizationCard title="BJT amplifier signal flow">
            <BjtAmplifierDiagram visual="ceamp" title="BJT amplifier signal flow" />
          </MovedSubjectVisualizationCard>
          {bjtAmplifierVisuals.map((item) => (
            <MovedSubjectVisualizationCard key={`bjt-amp-${item.visual}-${item.title}`} title={item.title}>
              <BjtAmplifierDiagram visual={item.visual} title={item.title} />
            </MovedSubjectVisualizationCard>
          ))}
          <MovedSubjectVisualizationCard title="FET gate-field channel control">
            <FetDiagram visual="enhancement" title="FET gate-field channel control" />
          </MovedSubjectVisualizationCard>
          {fetVisuals.map((item) => (
            <MovedSubjectVisualizationCard key={`fet-${item.visual}-${item.title}`} title={item.title}>
              <FetDiagram visual={item.visual} title={item.title} />
            </MovedSubjectVisualizationCard>
          ))}
          <MovedSubjectVisualizationCard title="Negative feedback loop">
            <FeedbackDiagram visual="closed-loop" title="Negative feedback loop" />
          </MovedSubjectVisualizationCard>
          {feedbackVisuals.map((item) => (
            <MovedSubjectVisualizationCard key={`feedback-${item.visual}-${item.title}`} title={item.title}>
              <FeedbackDiagram visual={item.visual} title={item.title} />
            </MovedSubjectVisualizationCard>
          ))}
        </div>
      </section>

      <section className="grid gap-3">
        <h3 className="text-base font-black text-slate-950">
          Oscillator and op-amp visualizations
        </h3>
        <div className="grid gap-3 xl:grid-cols-2">
          {OSCILLATOR_VISUALIZATION_MODES.map(([mode, title]) => (
            <MovedSubjectVisualizationCard key={`oscillator-${mode}`} title={title}>
              <OscillatorDiagram mode={mode} title={title} />
            </MovedSubjectVisualizationCard>
          ))}
          {OPAMP_VISUALIZATION_MODES.map(([mode, title]) => (
            <MovedSubjectVisualizationCard key={`opamp-${mode}`} title={title}>
              <OpAmpDiagram mode={mode} title={title} />
            </MovedSubjectVisualizationCard>
          ))}
        </div>
      </section>
    </div>
  );
}

function buildSubjectSeo(subject, theoryKnowledge, learningTopics = []) {
  const relatedLinks = getSubjectRelatedLinks(subject.title);
  const chapterNames = subjectTheoryRoadmaps[subject.title]?.map((step) => step.title) || [];
  const topicNames =
    theoryKnowledge?.concepts?.map((concept) => concept.shortTitle || concept.title) ||
    learningTopics.map((topic) => topic.title) ||
    relatedLinks.map((item) => item.title);
  const faqItems = buildSubjectFaqs(subject.title, topicNames);
  const title = generateTitle({ type: "subject", subjectName: subject.title });
  const description = generateDescription({
    type: "subject",
    subjectName: subject.title,
    chapters: chapterNames,
    topics: topicNames,
    summary: subject.description,
  });
  const keywords = generateKeywords({
    subjectName: subject.title,
    chapterNames,
    topicNames,
    extraKeywords: ["subject notes", "gate preparation", "engineering theory"],
  });
  const canonicalUrl = generateCanonical(`/subjects/${getSubjectSlug(subject.title)}`);
  const structuredData = generateStructuredData({
    type: "subject",
    title: `${subject.title} Notes`,
    description,
    path: `/subjects/${getSubjectSlug(subject.title)}`,
    subjectName: subject.title,
    keywords,
    about: [...chapterNames, ...topicNames],
    breadcrumbItems: [
      { name: "Home", item: "/" },
      { name: "Notes", item: "/subjects" },
      { name: subject.title, item: `/subjects/${getSubjectSlug(subject.title)}` },
    ],
    faqItems,
  });
  const introParagraph = `Study ${subject.title} notes for ECE with chapter-wise explanations, high-value concepts, and GATE-focused revision. This page connects roadmap topics like ${topicNames
    .slice(0, 5)
    .join(", ")} so students can move from fundamentals to exam-ready problem solving.`;
  const searchIntents = [
    `${subject.title} notes`,
    `${subject.title} quick notes`,
    `${subject.title} notes pdf`,
    `${subject.title} gate ece`,
    `${subject.title} handwritten notes`,
    `${subject.title} important questions`,
    `${subject.title} formulas`,
    `${subject.title} pyq`,
    "Network Analysis Digital Electronics Analog Electronics",
  ];

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    structuredData,
    faqItems,
    relatedLinks,
    introParagraph,
    searchIntents,
  };
}

const NETWORK_LANDING_CARDS = [
  {
    title: "What is Network Analysis?",
    icon: "question",
    color: "blue",
    text:
      "Network Analysis is the study of electrical circuits and the techniques used to determine voltages, currents, resistances and power in electrical networks.",
  },
  {
    title: "Why Learn Network Analysis?",
    icon: "target",
    color: "green",
    items: [
      "Foundation of Electrical Engineering",
      "Used in electronics and power systems",
      "Helps solve real-world circuits",
      "Important for exams and interviews",
    ],
  },
  {
    title: "Where is it Used?",
    icon: "pin",
    color: "orange",
    items: [
      "Electrical Engineering",
      "Electronics",
      "Communication Systems",
      "Embedded Systems",
      "Power Systems",
      "Control Systems",
    ],
  },
  {
    title: "What Will You Learn?",
    icon: "book",
    color: "purple",
    items: [
      "Ohm's Law",
      "Kirchhoff's Laws",
      "Mesh Analysis",
      "Nodal Analysis",
      "Network Theorems",
      "AC / DC Circuits",
      "Transients",
    ],
  },
  {
    title: "Types of Questions",
    icon: "clipboard",
    color: "cyan",
    items: [
      "Numerical Problems",
      "Conceptual Questions",
      "Circuit Solving Questions",
      "Theorem Based Questions",
      "Application Based Questions",
    ],
  },
  {
    title: "How to Understand This Subject?",
    icon: "bulb",
    color: "yellow",
    numbered: true,
    items: [
      "Learn concepts first",
      "Understand circuit diagrams",
      "Learn formulas and theorems",
      "Practice numerical problems daily",
      "Analyze and verify results",
      "Revise and make notes",
    ],
  },
  {
    title: "Importance of Network Analysis",
    icon: "star",
    color: "pink",
    items: [
      "Core subject for engineers",
      "Helps design electrical systems",
      "Improves analytical thinking",
      "Basis for advanced subjects",
      "Essential for competitive exams",
    ],
  },
  {
    title: "What You Will Gain?",
    icon: "growth",
    color: "blue",
    items: [
      "Strong fundamentals",
      "Problem solving skills",
      "Confidence in circuit analysis",
      "Better performance in exams",
      "Real world application knowledge",
    ],
  },
];

const NETWORK_COLOR_STYLES = {
  blue: {
    iconBg: "bg-blue-100 text-blue-700",
    underline: "bg-blue-600",
    bullet: "bg-blue-600",
    number: "text-blue-700",
  },
  green: {
    iconBg: "bg-green-100 text-green-700",
    underline: "bg-green-600",
    bullet: "bg-green-600",
    number: "text-green-700",
  },
  orange: {
    iconBg: "bg-orange-100 text-orange-700",
    underline: "bg-orange-500",
    bullet: "bg-orange-500",
    number: "text-orange-600",
  },
  purple: {
    iconBg: "bg-violet-100 text-violet-700",
    underline: "bg-violet-600",
    bullet: "bg-violet-600",
    number: "text-violet-700",
  },
  cyan: {
    iconBg: "bg-cyan-100 text-cyan-700",
    underline: "bg-cyan-600",
    bullet: "bg-cyan-600",
    number: "text-cyan-700",
  },
  yellow: {
    iconBg: "bg-amber-100 text-amber-600",
    underline: "bg-amber-500",
    bullet: "bg-amber-500",
    number: "text-amber-600",
  },
  pink: {
    iconBg: "bg-rose-100 text-rose-600",
    underline: "bg-rose-500",
    bullet: "bg-rose-500",
    number: "text-rose-600",
  },
};

const SUBJECT_LANDING_CONTENT = {
  "Network Analysis": {
    description:
      "Learn the fundamentals of electrical circuits and the methods used to calculate voltage, current, resistance and power in electrical networks. Build strong concepts and problem-solving skills step by step.",
    what: [
      "Network Analysis is the study of how electrical circuits behave when different electrical components are connected together. It helps us understand how current flows, how voltage is distributed, and how electrical energy moves through a circuit.",
      "In electrical engineering, a network simply means a combination of electrical components connected by wires. These components can include resistors, capacitors, inductors, voltage sources, current sources, switches, and many other devices. When these components are connected together, they form an electrical network or circuit.",
      "The main purpose of Network Analysis is to calculate and understand important electrical quantities such as current flowing through the circuit, voltage across components, resistance offered by elements, and power consumed or supplied.",
      "For example, when you use a mobile charger, laptop, fan, or any electronic device, there is an electrical circuit working inside it. Engineers use Network Analysis to study those circuits and ensure they work properly, safely, and efficiently.",
    ],
    why: [
      "Many students ask the same question when they start this subject: \"Why do we need to study Network Analysis?\"",
      "The answer is simple: Network Analysis is the foundation of almost every electrical and electronic system we use in daily life. Before an engineer can design, build, or troubleshoot any circuit, they must first understand how electricity behaves inside that circuit. That understanding comes from Network Analysis.",
      "This subject teaches us how to analyze electrical circuits by finding the current flowing through them, the voltage across different components, and the power consumed or delivered in the system. Without these basics, it becomes very difficult to understand advanced electrical or electronic subjects.",
      "Network Analysis is considered one of the core notes areas in electrical and electronics engineering because many advanced topics directly depend on it. Notes areas like power systems, analog electronics, digital electronics, communication systems, control systems, and embedded systems all use the concepts learned in Network Analysis.",
      "For example, in power systems, engineers use Network Analysis to study how electrical power flows from generating stations to homes and industries. It helps in understanding transmission lines, fault conditions, and power distribution.",
      "In electronics, every device, whether it is a mobile phone, laptop, television, or charger, contains electronic circuits. Network Analysis helps engineers design these circuits correctly and ensure they work efficiently.",
      "In communication systems, signals travel through different electronic networks. Understanding how circuits respond to signals is important for designing reliable communication devices such as radios, antennas, routers, and wireless systems.",
      "In embedded systems, microcontrollers and processors interact with sensors, motors, displays, and other hardware components through electrical circuits. Network Analysis helps engineers understand how these interconnected systems behave.",
      "Another important reason for studying Network Analysis is that it improves problem-solving ability. The subject teaches students how to think logically, break complex circuits into simpler parts, and solve problems step by step. This analytical thinking is very important for every engineer.",
      "Most importantly, Network Analysis is not just a theoretical subject. The concepts learned here are applied in real-world systems everywhere around us, from household appliances to industrial machines, electric vehicles, renewable energy systems, and modern electronic devices.",
      "That is why Network Analysis is considered one of the most important building blocks for anyone pursuing electrical or electronics engineering.",
    ],
    where: [
      "Electrical Engineering",
      "Electronics",
      "Communication Systems",
      "Embedded Systems",
      "Power Systems",
      "Control Systems",
    ],
    learn: [
      "Ohm's Law",
      "Kirchhoff's Laws",
      "Mesh Analysis",
      "Nodal Analysis",
      "Network Theorems",
      "AC / DC Circuits",
      "Transients",
    ],
    journey:
      "Network Analysis is the key to understanding how electrical circuits work. Let's build a strong foundation together and solve any network with confidence!",
  },
  "Analog Electronics": {
    description:
      "Learn how diodes, BJTs, MOSFETs, amplifiers, op-amps, oscillators and filters process real electrical signals. Build device-level understanding step by step.",
    what:
      "Analog Electronics is the study of semiconductor devices and circuits that work with continuously varying voltage and current signals.",
    why: [
      "Foundation for practical circuit design",
      "Used in amplifiers and signal conditioning",
      "Important for power supplies and filters",
      "High-value topic for exams and interviews",
    ],
    where: [
      "Amplifier Design",
      "Power Supplies",
      "Audio Electronics",
      "Sensor Interfaces",
      "Communication Circuits",
      "Instrumentation",
    ],
    learn: [
      "Diodes",
      "BJT and MOSFET",
      "Biasing",
      "Amplifiers",
      "Op-Amps",
      "Oscillators",
      "Filters",
    ],
    journey:
      "Analog Electronics helps you understand how real circuits amplify, shape, switch, and condition signals with confidence.",
  },
  "Digital Electronics": {
    description:
      "Learn binary systems, Boolean algebra, logic gates, K-maps, combinational circuits, flip-flops, counters and registers in a clear exam-focused order.",
    what:
      "Digital Electronics is the study of circuits that represent and process information using binary logic levels.",
    why: [
      "Foundation for modern digital systems",
      "Used in processors and controllers",
      "Builds logic design skills",
      "Important for GATE, PSU and interviews",
    ],
    where: [
      "Microprocessors",
      "Embedded Systems",
      "VLSI Design",
      "Control Hardware",
      "Digital Communication",
      "Computer Architecture",
    ],
    learn: [
      "Number Systems",
      "Boolean Algebra",
      "Logic Gates",
      "K-Maps",
      "Combinational Circuits",
      "Flip-Flops",
      "Counters",
    ],
    journey:
      "Digital Electronics turns binary ideas into working logic circuits, giving you a strong base for processors, embedded systems and VLSI.",
  },
  "Signals and Systems": {
    description:
      "Learn signal representation, system properties, convolution, Fourier tools, Laplace transform, sampling and frequency-domain analysis step by step.",
    what:
      "Signals and Systems explains how signals are represented, transformed and processed by systems in time and frequency domains.",
    why: [
      "Foundation for DSP and communication",
      "Improves transform-based problem solving",
      "Connects math with engineering systems",
      "Essential for exams and advanced subjects",
    ],
    where: [
      "Digital Signal Processing",
      "Communication Systems",
      "Control Systems",
      "Image Processing",
      "Audio Processing",
      "Biomedical Signals",
    ],
    learn: [
      "Signal Types",
      "System Properties",
      "Convolution",
      "Fourier Series",
      "Fourier Transform",
      "Laplace Transform",
      "Sampling",
    ],
    journey:
      "Signals and Systems gives you the language to understand how real-world waveforms move through engineering systems.",
  },
  "Communication Systems": {
    description:
      "Learn modulation, sampling, analog communication, digital communication, noise, information theory and receiver concepts in a structured way.",
    what:
      "Communication Systems is the study of how information is transmitted, received and protected over wired or wireless channels.",
    why: [
      "Foundation for telecom and wireless systems",
      "Connects signals with real transmission",
      "Important for bandwidth and noise analysis",
      "High-yield subject for ECE exams",
    ],
    where: [
      "Wireless Communication",
      "Mobile Networks",
      "Satellite Links",
      "Broadcast Systems",
      "Data Communication",
      "IoT Connectivity",
    ],
    learn: [
      "AM, FM and PM",
      "Sampling",
      "PCM",
      "Digital Modulation",
      "Noise",
      "SNR",
      "Information Theory",
    ],
    journey:
      "Communication Systems helps you understand how information travels reliably through noise, bandwidth limits and real channels.",
  },
};

const NETWORK_STUDY_FORMULAS = [
  {
    title: "Ohm's Law",
    formula: "V = I R",
    meaning: "V is voltage in volts, I is current in amperes, and R is resistance in ohms.",
    explanation:
      "Use Ohm's Law for a resistor when any two quantities are known. It tells how much voltage is needed to push a current through a resistance.",
  },
  {
    title: "Electrical Power",
    formula: "P = V I",
    variants: ["P = I^2 R", "P = V^2 / R"],
    meaning: "P is power in watts. Positive power means the element absorbs energy.",
    explanation:
      "Use the first formula when voltage and current are known. Use the other two resistor power formulas after applying Ohm's Law.",
  },
  {
    title: "Kirchhoff's Current Law (KCL)",
    formula: "I1 + I2 + ... = 0",
    meaning: "The algebraic sum of currents meeting at a node is zero.",
    explanation:
      "Use KCL at junctions. Current entering a node must equal current leaving the node, so it is the main law behind nodal analysis.",
  },
  {
    title: "Kirchhoff's Voltage Law (KVL)",
    formula: "V1 + V2 + ... = 0",
    meaning: "The algebraic sum of voltage rises and drops around a closed loop is zero.",
    explanation:
      "Use KVL around loops. It is the main law behind mesh analysis and helps write equations for closed circuit paths.",
  },
  {
    title: "Series Resistance",
    formula: "Req = R1 + R2 + R3 + ...",
    meaning: "Req is the equivalent resistance of resistors connected in series.",
    explanation:
      "Use this only when the same current flows through every resistor. Series resistors add directly.",
  },
  {
    title: "Parallel Resistance",
    formula: "1 / Req = 1 / R1 + 1 / R2 + 1 / R3 + ...",
    meaning: "Req is the single resistance that can replace all parallel branches.",
    explanation:
      "Use this only when every branch has the same voltage across it. For two resistors, Req = R1R2 / (R1 + R2).",
  },
];

const NETWORK_IMPORTANT_QUESTIONS = [
  "What is Network Analysis and why is it important for ECE students?",
  "State and explain Ohm's Law, KCL, and KVL with circuit examples.",
  "When should nodal analysis be used instead of mesh analysis?",
  "Explain Thevenin's theorem and Norton's theorem with applications.",
  "How do capacitors and inductors behave in DC steady state?",
  "What is the difference between DC analysis, AC analysis, and transient analysis?",
];

const NETWORK_INTERNAL_LINKS = [
  {
    title: "Circuit Laws",
    href: "/circuit-laws",
    description: "Start here for Ohm's Law, Kirchhoff's Current Law, and Kirchhoff's Voltage Law.",
  },
  {
    title: "DC Circuit Analysis",
    href: "/dc-circuit-analysis",
    description: "Use KCL and KVL in nodal analysis, mesh analysis, and resistor-network problems.",
  },
  {
    title: "Network Theorems",
    href: "/network-theorems",
    description: "Learn Thevenin, Norton, superposition, and maximum power transfer methods.",
  },
  {
    title: "AC Circuit Analysis",
    href: "/ac-circuit-analysis",
    description: "Move from DC circuits to phasors, impedance, resonance, and AC power.",
  },
  {
    title: "Transient Analysis",
    href: "/transient-analysis",
    description: "Study RC, RL, and RLC switching response with initial and final conditions.",
  },
  {
    title: "Two-Port Networks",
    href: "/two-port-networks",
    description: "Connect network analysis with Z, Y, h, and ABCD parameters.",
  },
];

function NetworkEducationalContent() {
  return (
    <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0b58b4]">
          Network Analysis Explained
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-normal text-[#061642]">
          Network Analysis for Beginners
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700">
          These Network Analysis quick notes for ECE students are written for beginners
          who want the subject explained in a simple order. The goal is to understand
          what a circuit is doing before memorizing formulas. Once voltage, current,
          resistance, source polarity, node voltage, and loop current become clear,
          most Network Analysis problems become a matter of choosing the right method.
        </p>
        <p className="mt-3 text-base leading-8 text-slate-700">
          Students often search for network analysis explained, network analysis
          formulas, network analysis important questions, and network analysis ECE
          notes because this subject connects basic electrical quantities with
          real circuit solving. A good preparation page should therefore include
          definitions, formulas, examples, and solved problems in one place.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4">
          <article className="rounded-lg border border-slate-200 bg-[#f8fbff] p-5">
            <h2 className="text-2xl font-black text-[#061642]">
              Network Analysis Definitions
            </h2>
            <div className="mt-4 grid gap-3 text-base leading-7 text-slate-700 md:grid-cols-2">
              <p>
                <strong className="text-slate-950">Node:</strong> a junction where two
                or more circuit elements are connected.
              </p>
              <p>
                <strong className="text-slate-950">Branch:</strong> a path that contains
                one circuit element or a connected group of elements.
              </p>
              <p>
                <strong className="text-slate-950">Loop:</strong> any closed path in an
                electrical network.
              </p>
              <p>
                <strong className="text-slate-950">Mesh:</strong> a loop that does not
                contain another loop inside it.
              </p>
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-2xl font-black text-[#061642]">
              Network Analysis Formulas
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {NETWORK_STUDY_FORMULAS.map((item) => (
                <div key={item.title} className="rounded-lg border border-slate-200 bg-[#f8fbff] p-4">
                  <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                  <div className="mt-3 rounded-md bg-white px-4 py-3">
                    <p className="text-xl font-black tracking-normal text-[#0b58b4]">
                      {item.formula}
                    </p>
                    {item.variants?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.variants.map((variant) => (
                          <span
                            key={variant}
                            className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-sm font-black text-[#0b58b4]"
                          >
                            {variant}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                    {item.meaning}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="rounded-lg border border-blue-200 bg-[#f0f8ff] p-5">
          <h2 className="text-2xl font-black text-[#061642]">
            Network Analysis Important Questions
          </h2>
          <ul className="mt-4 grid gap-3 text-base leading-7 text-slate-700">
            {NETWORK_IMPORTANT_QUESTIONS.map((question) => (
              <li key={question} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[#0b58b4]" />
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-2xl font-black text-[#061642]">
            Example: How to Read a Circuit
          </h2>
          <p className="mt-3 text-base leading-8 text-slate-700">
            Suppose a 10 V source is connected to two series resistors, R1 = 2 ohm
            and R2 = 3 ohm. Because the resistors are in series, the same current
            flows through both. The equivalent resistance is 5 ohm, so the circuit
            current is I = V/R = 10/5 = 2 A. The voltage across R2 is V2 = IR2 =
            2 x 3 = 6 V.
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-[#f8fbff] p-5">
          <h2 className="text-2xl font-black text-[#061642]">
            Solved Problem Method
          </h2>
          <ol className="mt-3 grid gap-3 text-base leading-7 text-slate-700">
            <li>1. Identify whether elements are in series, parallel, or a mixed network.</li>
            <li>2. Mark the required quantity: voltage, current, resistance, or power.</li>
            <li>3. Choose the method: direct reduction, KCL, KVL, nodal, mesh, or theorem.</li>
            <li>4. Substitute values carefully and keep units in the final answer.</li>
            <li>5. Check whether the answer is physically reasonable for the circuit.</li>
          </ol>
        </article>
      </div>

      <section className="mt-5 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-2xl font-black text-[#061642]">
          Network Analysis Topic-Wise Notes
        </h2>
        <p className="mt-3 text-base leading-8 text-slate-700">
          Study Network Analysis in this order so each page supports the next one:
          begin with circuit laws, then move to DC circuit analysis where mesh
          analysis and nodal analysis are used, then continue to network theorems,
          AC circuit analysis, transient analysis, and two-port networks.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {NETWORK_INTERNAL_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-slate-200 bg-[#f8fbff] p-4 transition hover:border-portal-300 hover:bg-white"
            >
              <h3 className="text-lg font-black text-[#061642]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}

function buildSubjectLandingCards(subjectTitle) {
  const content = SUBJECT_LANDING_CONTENT[subjectTitle] || SUBJECT_LANDING_CONTENT["Network Analysis"];

  return [
    {
      title: `What is ${subjectTitle}?`,
      icon: "question",
      color: "blue",
      text: content.what,
    },
    {
      title: `Why Learn ${subjectTitle}?`,
      icon: "target",
      color: "green",
      prose: subjectTitle === "Network Analysis",
      items: content.why,
    },
    {
      title: "Where is it Used?",
      icon: "pin",
      color: "orange",
      items: content.where,
    },
    {
      title: "What Will You Learn?",
      icon: "book",
      color: "purple",
      items: content.learn,
    },
    ...NETWORK_LANDING_CARDS.slice(4),
  ];
}

function SubjectLandingMenu({ subjectTitle, concepts, activeConceptIndex }) {
  if (subjectTitle === "Network Analysis") {
    return <NetworkTopicMenu concepts={concepts} activeIndex={activeConceptIndex} />;
  }

  if (subjectTitle === "Analog Electronics") {
    return <AnalogChapterMenu />;
  }

  if (subjectTitle === "Digital Electronics") {
    return <DigitalChapterMenu />;
  }

  if (subjectTitle === "Signals and Systems") {
    return <SignalsChapterMenu />;
  }

  if (subjectTitle === "Communication Systems") {
    return <CommunicationSystemsChapterMenu />;
  }

  if (subjectTitle === "Control Systems") {
    return <ControlSystemsChapterMenu />;
  }

  return null;
}

function NetworkLandingIcon({ name, className = "h-8 w-8" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (name === "target") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M15 9l5-5M17 4h3v3" />
      </svg>
    );
  }

  if (name === "pin") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.2" />
      </svg>
    );
  }

  if (name === "book") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v18H7.5A3.5 3.5 0 0 0 4 23V5.5Z" />
        <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20" />
      </svg>
    );
  }

  if (name === "clipboard") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M9 4h6l1 3H8l1-3Z" />
        <path d="M7 6H5v15h14V6h-2" />
        <path d="M9 12h6M9 16h6" />
      </svg>
    );
  }

  if (name === "bulb") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M9 18h6M10 22h4" />
        <path d="M8.5 14.5A6 6 0 1 1 15.5 14c-.9.7-1.5 1.7-1.5 3h-4c0-1.1-.5-2-1.5-2.5Z" />
      </svg>
    );
  }

  if (name === "star") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M12 3.5l2.6 5.2 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.5Z" />
      </svg>
    );
  }

  if (name === "growth") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
        <path d="M4 13l5-5 4 4 7-7M20 5h-4M20 5v4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.4 9a2.8 2.8 0 0 1 5.3 1.2c0 2.2-2.7 2.4-2.7 4.3" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function NetworkHeroCircuit() {
  return (
    <svg viewBox="0 0 500 250" className="h-auto w-full max-w-[340px]" role="img" aria-label="Network analysis circuit diagram">
      <path d="M70 165V72h58" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M325 72h58v93H252" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M70 165h182V72h36" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="70" cy="118" r="24" fill="#f8fbff" stroke="#334155" strokeWidth="3" />
      <path d="M70 102v12M70 123v12M58 114h24" stroke="#334155" strokeWidth="2.6" strokeLinecap="round" />
      <text x="36" y="122" fill="#334155" fontSize="18" fontWeight="700">V<tspan baselineShift="sub" fontSize="12">s</tspan></text>
      <path d="M128 72h14l8-14 16 28 16-28 16 28 16-28 8 14h31" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="165" y="44" fill="#334155" fontSize="18" fontWeight="700">R<tspan baselineShift="sub" fontSize="12">1</tspan></text>
      <path d="M288 72h14l8-14 16 28 16-28 16 28 16-28 8 14h1" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="333" y="44" fill="#334155" fontSize="18" fontWeight="700">R<tspan baselineShift="sub" fontSize="12">2</tspan></text>
      <path d="M252 72v35M252 142v23" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      <path d="M252 107l-14 8 28 16-28 16 28 16-14 8" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 -7)" />
      <text x="272" y="123" fill="#334155" fontSize="18" fontWeight="700">R<tspan baselineShift="sub" fontSize="12">3</tspan></text>
      <circle cx="252" cy="72" r="5" fill="#334155" />
      <circle cx="252" cy="165" r="5" fill="#334155" />
      <path d="M207 54h62" stroke="#315f9f" strokeWidth="3" strokeLinecap="round" />
      <path d="M269 54l-10-7m10 7l-10 7" stroke="#315f9f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="225" y="39" fill="#334155" fontSize="18" fontWeight="700">I</text>
    </svg>
  );
}

function NetworkLandingCard({ card, index }) {
  const styles = NETWORK_COLOR_STYLES[card.color] || NETWORK_COLOR_STYLES.blue;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
        <span className={`flex h-14 w-14 flex-none items-center justify-center rounded-full ${styles.iconBg}`}>
          <NetworkLandingIcon name={card.icon} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0b58b4]">
            Step {index + 1}
          </p>
          <h2 className="mt-1 text-2xl font-black leading-snug text-[#061642]">
            {card.title}
          </h2>
          <span className={`mt-3 block h-0.5 w-14 ${styles.underline}`} />

          {card.text ? (
            <div className="mt-5 grid gap-3 text-base leading-8 text-slate-950">
              {(Array.isArray(card.text) ? card.text : [card.text]).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : card.prose ? (
            <div className="mt-5 grid gap-3 text-base leading-8 text-slate-950">
              {card.items.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <ol className="mt-5 grid gap-3 text-base leading-7 text-slate-950">
              {card.items.map((item, itemIndex) => (
                <li key={item} className="flex gap-3">
                  {card.numbered ? (
                    <span className={`w-5 flex-none font-black ${styles.number}`}>{itemIndex + 1}.</span>
                  ) : (
                    <span className={`mt-3 h-1.5 w-1.5 flex-none rounded-full ${styles.bullet}`} />
                  )}
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </article>
  );
}

const NETWORK_BEGINNER_TOC = [
  "What is Network Analysis?",
  "Basic Terminologies",
  "Types of Electrical Networks",
  "Circuit Elements",
  "Ohm's Law, KCL and KVL",
  "Mesh Analysis",
  "Nodal Analysis",
  "Network Theorems",
  "AC Circuit Analysis",
  "Solved Examples",
  "Previous Year Questions (PYQs)",
  "Frequently Asked Questions (FAQs)",
];

const NETWORK_CHAPTER_STATS = [
  { label: "Estimated Time", value: "8-10 Hours", icon: "clock" },
  { label: "Difficulty", value: "Medium to High", icon: "bars" },
  { label: "Topics", value: "12 Detailed Topics", icon: "layers" },
  { label: "Level", value: "Beginner to GATE", icon: "target" },
];

const NETWORK_FEATURES = [
  { title: "Detailed Notes", text: "Easy to understand", icon: "book", color: "bg-blue-500" },
  { title: "Important Formulas", text: "Quick revision", icon: "clipboard", color: "bg-emerald-600" },
  { title: "MCQs & PYQs", text: "Exam oriented", icon: "question", color: "bg-violet-600" },
  { title: "Solved Examples", text: "Step-by-step", icon: "edit", color: "bg-orange-600" },
  { title: "Downloadable PDFs", text: "Save & study offline", icon: "download", color: "bg-blue-700" },
  { title: "Updated Regularly", text: "Latest syllabus", icon: "check", color: "bg-green-600" },
];

const SUBJECT_CHAPTER_HOME = {
  "Analog Electronics": {
    title: "Analog Electronics",
    diagram: "analog",
    intro: [
      "Analog Electronics deals with the analysis, design, and application of circuits that process continuous signals. It is the foundation of many real-world electronic systems.",
      "It includes semiconductor devices, amplifiers, oscillators, filters, and power supplies.",
    ],
    toc: [
      "Semiconductor Devices",
      "Diode Circuits",
      "BJT Fundamentals",
      "BJT Amplifiers",
      "FET & MOSFET",
      "Operational Amplifier (Op-Amp)",
      "Oscillators",
      "Filters",
      "Power Amplifiers",
      "Voltage Regulators & Power Supplies",
      "Analog IC Applications",
      "Solved Examples & Numericals",
    ],
    overview:
      "Analog Electronics is essential for understanding and designing real-world electronic circuits used in communication, instrumentation, control systems, and signal processing.",
    difficulty: "Medium",
    links: [
      { title: "Op-Amp Notes", href: "/operational-amplifiers" },
      { title: "BJT Amplifier Notes", href: "/bjt-amplifiers" },
      { title: "Oscillator Notes", href: "/oscillators" },
      { title: "Filter Notes", href: "/filters" },
      { title: "Voltage Regulator Notes", href: "/power-supplies" },
    ],
  },
  "Digital Electronics": {
    title: "Digital Electronics",
    diagram: "digital",
    intro: [
      "Digital Electronics focuses on digital circuits that operate with discrete values, usually 0 and 1. It forms the backbone of modern computing, control, and communication systems.",
      "It includes logic gates, combinational circuits, sequential circuits, and digital ICs.",
    ],
    toc: [
      "Number Systems & Codes",
      "Logic Gates",
      "Boolean Algebra",
      "Combinational Circuits",
      "Karnaugh Map",
      "Adders & Subtractors",
      "Multiplexers & Demultiplexers",
      "Flip-Flops",
      "Counters",
      "Registers & Shift Registers",
      "Digital ICs & Applications",
      "Solved Examples & Numericals",
    ],
    overview:
      "Digital Electronics is the foundation of digital systems, microprocessors, embedded systems, and modern electronic devices.",
    difficulty: "Medium",
    links: [
      { title: "Logic Gates Notes", href: "/logic-gates-and-boolean-algebra" },
      { title: "Flip-Flop Notes", href: "/sequential-circuits" },
      { title: "Counters Notes", href: "/counters" },
      { title: "Number Systems Notes", href: "/number-systems-and-codes" },
      { title: "Digital ICs Notes", href: "/digital-ics-and-applications" },
    ],
  },
  "Signals and Systems": {
    title: "Signals and Systems",
    diagram: "signals",
    intro: [
      "Signals and Systems is the study of signals and their behavior through systems. It is widely used in communication, control, and signal processing applications.",
      "It includes time-domain and frequency-domain analysis of continuous and discrete signals.",
    ],
    toc: [
      "Introduction to Signals",
      "Continuous-Time Signals",
      "Discrete-Time Signals",
      "Basic Operations on Signals",
      "Systems",
      "LTI Systems",
      "Convolution",
      "Fourier Transforms",
      "Laplace Transform",
      "Z-Transform",
      "Frequency Response",
      "Solved Examples & Problems",
    ],
    overview:
      "Signals and Systems is essential for communication, signal processing, control systems, and many advanced engineering applications.",
    difficulty: "Medium to High",
    links: [
      { title: "Continuous-Time Signals Notes", href: "/introduction-to-signals" },
      { title: "LTI Systems Notes", href: "/systems-and-their-properties" },
      { title: "Convolution Notes", href: "/convolution" },
      { title: "Fourier Series Notes", href: "/fourier-series" },
      { title: "Laplace Transform Notes", href: "/laplace-transform" },
    ],
  },
  "Network Analysis": {
    title: "Network Analysis",
    diagram: "network",
    intro: [
      "Network Analysis, also called Network Theory, is the foundation of Electrical and Electronics Engineering. It helps in determining voltage, current, and power in electrical networks.",
      "It includes network laws, theorems, and various analysis techniques.",
    ],
    toc: [
      "Basic Concepts",
      "Circuit Elements",
      "Ohm's Law, KCL & KVL",
      "Mesh Analysis",
      "Nodal Analysis",
      "Nodes & Subcircuits",
      "Superposition Theorem",
      "Thevenin's Theorem",
      "Dependent Sources",
      "Norton's Theorem",
      "Maximum Power Transfer",
      "Solved Examples & Numericals",
    ],
    overview:
      "Network Analysis builds the base for advanced subjects like Control Systems, Power Systems, and Communication Engineering.",
    difficulty: "Medium to High",
    links: [
      { title: "KCL and KVL Notes", href: "/circuit-laws" },
      { title: "Mesh Analysis Notes", href: "/dc-circuit-analysis" },
      { title: "Nodal Analysis Notes", href: "/dc-circuit-analysis" },
      { title: "Thevenin Theorem Notes", href: "/network-theorems" },
      { title: "AC Circuit Analysis Notes", href: "/ac-circuit-analysis" },
    ],
  },
  "Control Systems": {
    title: "Control Systems",
    diagram: "control",
    intro: [
      "Control Systems deals with the modeling, analysis, design, and performance evaluation of dynamic systems to achieve desired behavior.",
      "It uses concepts from mathematics, electronics, and engineering to regulate the output of a system using feedback.",
    ],
    toc: [
      "Introduction to Control Systems",
      "Mathematical Modeling",
      "Transfer Function",
      "Block Diagram Algebra",
      "Signal Flow Graphs",
      "Time Response Analysis",
      "Stability Analysis",
      "Root Locus Technique",
      "Frequency Response",
      "Compensation Techniques",
      "State Variable Analysis",
      "Solved Examples & Numericals",
    ],
    overview:
      "Control Systems is essential in automation, robotics, aerospace, process control, communication, and many real-world engineering applications.",
    difficulty: "Medium to High",
    time: "10-12 Hours",
    links: [
      { title: "Laplace Transform Notes", href: "/laplace-transform" },
      { title: "Block Diagram Reduction Notes", href: "/block-diagram-and-signal-flow-graph" },
      { title: "Root Locus Notes", href: "/root-locus-technique" },
      { title: "Bode Plot Notes", href: "/frequency-response-analysis" },
      { title: "Stability Notes", href: "/stability-analysis" },
    ],
  },
  "Communication Systems": {
    title: "Communication Systems",
    diagram: "communication",
    intro: [
      "Communication Systems deals with the transmission, reception, and protection of information over wired and wireless channels.",
      "It covers modulation, demodulation, noise, bandwidth, digital communication, and reliable signal transfer through real channels.",
    ],
    toc: [
      "Introduction to Communication Systems",
      "Signals and Spectra",
      "Amplitude Modulation",
      "Angle Modulation",
      "Pulse Modulation",
      "Digital Modulation",
      "Baseband Transmission",
      "Noise in Communication Systems",
      "Information Theory",
      "Receivers",
      "Channel Coding",
      "Solved Examples & Numericals",
    ],
    overview:
      "Communication Systems is essential for understanding broadcasting, mobile networks, satellite links, radar, optical links, and modern digital communication.",
    difficulty: "Medium",
    links: [
      { title: "Signals and Spectra Notes", href: "/learn/communications/signals-and-spectra" },
      { title: "Amplitude Modulation Notes", href: "/learn/communications/amplitude-modulation-am" },
      { title: "Angle Modulation Notes", href: "/learn/communications/angle-modulation-fm-and-pm" },
      { title: "Digital Modulation Notes", href: "/learn/communications/digital-modulation-techniques" },
      { title: "Noise Notes", href: "/learn/communications/noise-in-communication-systems" },
    ],
  },
  Microprocessors: {
    title: "Microprocessors",
    diagram: "microprocessors",
    intro: [
      "Microprocessors explains processor architecture, instruction execution, programming, timing, interrupts, and interfacing.",
      "It helps students understand how a CPU communicates with memory, I/O devices, buses, and peripheral circuits.",
    ],
    toc: [
      "Introduction to Microprocessors",
      "8085 Microprocessor Architecture",
      "8085 Instruction Set",
      "Assembly Language Programming",
      "Timing Diagrams and Machine Cycles",
      "Interrupts in 8085",
      "Memory Interfacing",
      "I/O Interfacing",
      "8255 Programmable Peripheral Interface",
      "8086 Microprocessor",
      "Advanced Topics",
      "Solved Examples & Numericals",
    ],
    overview:
      "Microprocessors is important for understanding CPU architecture, instruction flow, interfacing, embedded controllers, and low-level system design.",
    difficulty: "Medium",
    time: "7-9 Hours",
    links: [
      { title: "8085 Architecture Notes", href: MICROPROCESSORS_CHAPTER_ROUTES["8085 Microprocessor Architecture"] },
      { title: "Instruction Set Notes", href: MICROPROCESSORS_CHAPTER_ROUTES["8085 Instruction Set"] },
      { title: "Timing Diagrams Notes", href: MICROPROCESSORS_CHAPTER_ROUTES["Timing Diagrams and Machine Cycles"] },
      { title: "Interrupts Notes", href: MICROPROCESSORS_CHAPTER_ROUTES["Interrupts in 8085"] },
      { title: "8086 Notes", href: MICROPROCESSORS_CHAPTER_ROUTES["8086 Microprocessor"] },
    ],
  },
  "Antenna & Wave Propagation": {
    title: "Antenna & Wave Propagation",
    diagram: "antenna",
    intro: [
      "Antenna and Wave Propagation explains how antennas radiate, receive, and direct electromagnetic energy.",
      "It covers antenna parameters, radiation patterns, arrays, propagation modes, and practical wireless link behavior.",
    ],
    toc: [
      "Introduction to Antennas",
      "Antenna Fundamentals",
      "Dipole and Monopole Antennas",
      "Antenna Arrays",
      "Aperture Antennas",
      "Reflector Antennas",
      "Microstrip Antennas",
      "Wave Propagation",
      "Ground Wave Propagation",
      "Sky Wave Propagation",
      "Space Wave Propagation",
      "Solved Examples & Numericals",
    ],
    overview:
      "Antenna and Wave Propagation is essential for wireless communication, satellite links, radar, broadcasting, mobile networks, and microwave systems.",
    difficulty: "Medium",
    time: "6-8 Hours",
    links: [
      { title: "Antenna Basics Notes", href: "/subjects/antenna-wave-propagation" },
      { title: "Antenna Parameters Notes", href: "/subjects/antenna-wave-propagation" },
      { title: "Antenna Arrays Notes", href: "/subjects/antenna-wave-propagation" },
      { title: "Wave Propagation Notes", href: "/subjects/antenna-wave-propagation" },
      { title: "Space Wave Notes", href: "/subjects/antenna-wave-propagation" },
    ],
  },
  "Electromagnetic Theory": {
    title: "Electromagnetic Theory",
    diagram: "electromagnetic",
    intro: [
      "Electromagnetic Theory explains the behavior of electric and magnetic fields and their interaction with matter. It forms the foundation for many advanced ECE subjects and real-world applications.",
      "It helps in analyzing field distributions, wave propagation, transmission lines, and electromagnetic devices and systems.",
    ],
    toc: [
      "Vector Analysis",
      "Electrostatics",
      "Magnetostatics",
      "Time-Varying Fields",
      "Maxwell's Equations",
      "Plane Electromagnetic Waves",
      "Wave Propagation",
      "Poynting Theorem",
      "Boundary Conditions",
      "Transmission Lines",
      "Reflection & Refraction",
      "Solved Examples & Numericals",
    ],
    overview:
      "Electromagnetic Theory is essential for understanding antennas, waveguides, transmission lines, microwave engineering, wireless communication, and field-based devices.",
    difficulty: "Medium to High",
    links: [
      { title: "Vector Analysis Notes", href: "/learn/electromagnetics/vector-calculus" },
      { title: "Maxwell Equations Notes", href: "/learn/electromagnetics/maxwell-equations" },
      { title: "Plane Waves Notes", href: "/learn/electromagnetics/electromagnetic-waves" },
      { title: "Transmission Lines Notes", href: "/learn/electromagnetics/transmission-lines" },
      { title: "Boundary Conditions Notes", href: "/learn/electromagnetics/boundary-conditions" },
    ],
  },
  "Digital Signal Processing": {
    title: "Digital Signal Processing",
    diagram: "dsp",
    intro: [
      "Digital Signal Processing focuses on analyzing, modifying, and synthesizing signals using digital techniques and algorithms.",
      "It is widely used in communication, audio, image processing, control systems, and many real-time applications.",
    ],
    toc: [
      "Discrete-Time Signals",
      "Systems & LTI Systems",
      "Convolution",
      "Z-Transform",
      "Fourier Series & Transform",
      "Sampling Theorem",
      "DFT & FFT",
      "Filter Design",
      "IIR Filter Design",
      "Windowing Techniques",
      "Applications of DSP",
      "Solved Examples & Numericals",
    ],
    overview:
      "Digital Signal Processing builds the base for digital communication, speech processing, image processing, embedded signal analysis, and real-time filtering.",
    difficulty: "Medium to High",
    links: [
      { title: "Discrete-Time Signals Notes", href: "/learn/dsp/discrete-time-signals" },
      { title: "Convolution Notes", href: "/convolution" },
      { title: "Z-Transform Notes", href: "/z-transform" },
      { title: "DFT and FFT Notes", href: "/learn/dsp/dft-and-fft" },
      { title: "Digital Filters Notes", href: "/learn/dsp/digital-filters" },
    ],
  },
  "VLSI Design": {
    title: "VLSI Design",
    diagram: "vlsi",
    intro: [
      "VLSI Design is the process of designing and implementing integrated circuits by combining thousands to millions of transistors on a single chip.",
      "It involves multiple stages from specification and architecture to physical implementation and verification.",
    ],
    toc: [
      "Introduction to VLSI",
      "MOS Transistors",
      "Logic Gates & Circuits",
      "Combinational Logic Design",
      "Sequential Logic Design",
      "CMOS Logic Design",
      "Memory Design",
      "Programmable Logic Devices",
      "ASIC Design Flow",
      "Physical Design",
      "Testing & Verification",
      "Solved Examples & Numericals",
    ],
    overview:
      "VLSI Design is important for understanding CMOS circuits, chip design flow, digital IC implementation, low-power design, and modern semiconductor systems.",
    difficulty: "Medium to High",
    time: "7-9 Hours",
    links: [
      { title: "MOS Transistor Notes", href: "/learn/vlsi-design/mos-transistor-basics" },
      { title: "CMOS Logic Notes", href: "/learn/vlsi-design/cmos-logic-design" },
      { title: "VLSI Design Flow Notes", href: "/learn/vlsi-design/introduction-to-vlsi-design" },
      { title: "Physical Design Notes", href: "/learn/vlsi-design/physical-design" },
      { title: "Testing Notes", href: "/learn/vlsi-design/testing-and-verification" },
    ],
  },
  "Embedded Systems": {
    title: "Embedded Systems",
    diagram: "embedded",
    intro: [
      "Embedded Systems are specialized computing systems designed to perform specific tasks within larger systems.",
      "They combine hardware and software to deliver efficient, reliable, and real-time solutions for various applications.",
    ],
    toc: [
      "Introduction to Embedded Systems",
      "Microprocessors vs Microcontrollers",
      "Embedded System Architecture",
      "Memory & I/O Organization",
      "Embedded C Programming",
      "Timers & Counters",
      "Interrupts",
      "Serial Communication",
      "Real-Time Systems",
      "Applications",
      "Debugging & Testing",
      "Solved Examples & Numericals",
    ],
    overview:
      "Embedded Systems is essential for microcontroller-based design, interfacing, firmware development, real-time control, and hardware-software integration.",
    difficulty: "Medium",
    time: "7-9 Hours",
    links: [
      { title: "Embedded Basics Notes", href: "/learn/embedded-systems/introduction-to-embedded-systems" },
      { title: "Microcontrollers Notes", href: "/learn/embedded-systems/microprocessors-vs-microcontrollers" },
      { title: "Embedded C Notes", href: "/learn/embedded-systems/embedded-c-programming" },
      { title: "Interrupts Notes", href: "/learn/embedded-systems/interrupts" },
      { title: "Real-Time Systems Notes", href: "/learn/embedded-systems/real-time-systems" },
    ],
  },
};

function NetworkSmallIcon({ name, className = "h-6 w-6" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (name === "clock") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === "bars") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M5 19V13M12 19V8M19 19V4" />
      </svg>
    );
  }

  if (name === "layers") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M12 3 21 8l-9 5-9-5 9-5Z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 16l9 5 9-5" />
      </svg>
    );
  }

  if (name === "target") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M15 9l5-5M17 4h3v3" />
      </svg>
    );
  }

  if (name === "edit") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
      </svg>
    );
  }

  if (name === "download") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  return <NetworkLandingIcon name={name} className={className} />;
}

function BeginnerSeriesCircuitDiagram() {
  return (
    <svg viewBox="0 0 420 220" className="h-auto w-full max-w-[420px]" role="img" aria-label="Simple network with source and three resistors">
      <path d="M96 48h104M246 48h84v130H246M198 178H96V48" fill="none" stroke="#111827" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="96" cy="112" r="20" fill="#fffaf0" stroke="#f59e0b" strokeWidth="3" />
      <path d="M96 56v36M96 132v46" stroke="#111827" strokeWidth="3.2" strokeLinecap="round" />
      <text x="55" y="117" fill="#0f172a" fontSize="22" fontWeight="700">V</text>
      <text x="71" y="85" fill="#0f172a" fontSize="18" fontWeight="700">+</text>
      <text x="73" y="151" fill="#0f172a" fontSize="22" fontWeight="700">-</text>
      <path d="M200 48h10l8-14 15 28 15-28 15 28 8-14h10" fill="none" stroke="#111827" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M330 88v10l14 8-28 15 28 15-28 15 14 8v10" fill="none" stroke="#111827" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M198 178h10l8-14 15 28 15-28 15 28 8-14h10" fill="none" stroke="#111827" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="220" y="27" fill="#0f172a" fontSize="20" fontWeight="800">R<tspan baselineShift="sub" fontSize="13">1</tspan></text>
      <text x="351" y="119" fill="#0f172a" fontSize="20" fontWeight="800">R<tspan baselineShift="sub" fontSize="13">2</tspan></text>
      <text x="220" y="211" fill="#0f172a" fontSize="20" fontWeight="800">R<tspan baselineShift="sub" fontSize="13">3</tspan></text>
      <path d="M196 96h48" stroke="#dc2626" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M244 96l-10-6m10 6l-10 6" stroke="#dc2626" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="213" y="86" fill="#dc2626" fontSize="19" fontWeight="800">I</text>
    </svg>
  );
}

function BeginnerMeshCircuitDiagram() {
  return (
    <svg viewBox="0 0 520 230" className="h-auto w-full max-w-[520px]" role="img" aria-label="Two mesh network with nodes and loop currents">
      <rect x="22" y="18" width="476" height="194" rx="10" fill="#ffffff" stroke="#d7e2ee" strokeWidth="2" />
      <path d="M90 44h122M278 44h120v136H90V44" fill="none" stroke="#0f3f78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M250 44v136" stroke="#0f3f78" strokeWidth="3" strokeLinecap="round" />
      <circle cx="90" cy="112" r="18" fill="#fffaf0" stroke="#f59e0b" strokeWidth="3" />
      <path d="M90 62v32M90 130v50" stroke="#0f3f78" strokeWidth="3" strokeLinecap="round" />
      <path d="M212 44h10l8-14 15 28 15-28 15 28 8-14h10" fill="none" stroke="#0f3f78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M398 44h10l8-14 15 28 15-28 15 28 8-14h10" fill="none" stroke="#0f3f78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" transform="translate(-116 0)" />
      <path d="M250 78v9l14 8-28 15 28 15-28 15 14 8v10" fill="none" stroke="#0f3f78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M398 78v9l14 8-28 15 28 15-28 15 14 8v10" fill="none" stroke="#0f3f78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="90" cy="44" r="5" fill="#137d46" />
      <circle cx="250" cy="44" r="5" fill="#137d46" />
      <circle cx="250" cy="180" r="5" fill="#137d46" />
      <text x="84" y="29" fill="#137d46" fontSize="18" fontWeight="900">1</text>
      <text x="244" y="29" fill="#137d46" fontSize="18" fontWeight="900">2</text>
      <text x="244" y="205" fill="#137d46" fontSize="18" fontWeight="900">3</text>
      <text x="156" y="29" fill="#0b58b4" fontSize="18" fontWeight="900">R<tspan baselineShift="sub" fontSize="12">1</tspan></text>
      <text x="338" y="29" fill="#0f766e" fontSize="18" fontWeight="900">R<tspan baselineShift="sub" fontSize="12">3</tspan></text>
      <text x="265" y="112" fill="#0f766e" fontSize="18" fontWeight="900">R<tspan baselineShift="sub" fontSize="12">3</tspan></text>
      <text x="416" y="112" fill="#0f766e" fontSize="18" fontWeight="900">R<tspan baselineShift="sub" fontSize="12">3</tspan></text>
      <text x="56" y="122" fill="#0b58b4" fontSize="19" fontWeight="900">V</text>
      <path d="M140 122c0-36 54-40 72-8" fill="none" stroke="#ef4444" strokeWidth="2" />
      <path d="M198 138c-10 10-26 14-42 7" fill="none" stroke="#ef4444" strokeWidth="2" />
      <path d="M320 122c0-36 54-40 72-8" fill="none" stroke="#ef4444" strokeWidth="2" />
      <path d="M378 138c-10 10-26 14-42 7" fill="none" stroke="#ef4444" strokeWidth="2" />
      <text x="169" y="128" fill="#dc2626" fontSize="20" fontWeight="900">I<tspan baselineShift="sub" fontSize="12">1</tspan></text>
      <text x="349" y="128" fill="#dc2626" fontSize="20" fontWeight="900">I<tspan baselineShift="sub" fontSize="12">2</tspan></text>
    </svg>
  );
}

function AnalogHeroDiagram() {
  return (
    <svg viewBox="0 0 420 220" className="h-auto w-full max-w-[420px]" role="img" aria-label="Operational amplifier analog electronics diagram">
      <path d="M74 92h70" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
      <path d="M144 92h10l8-14 15 28 15-28 15 28 8-14h20" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M235 72v92l98-46-98-46Z" fill="#f8fbff" stroke="#111827" strokeWidth="3" strokeLinejoin="round" />
      <path d="M185 145h50M333 118h52" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
      <path d="M280 77v-38h56v79" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M296 39h10l8-14 15 28 15-28 15 28 8-14h10" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" transform="translate(-12 0)" />
      <path d="M235 62V32M235 174v28" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
      <text x="45" y="99" fill="#061642" fontSize="16" fontWeight="800">Vin</text>
      <text x="389" y="125" fill="#061642" fontSize="16" fontWeight="800">Vout</text>
      <text x="159" y="72" fill="#061642" fontSize="16" fontWeight="800">R<tspan baselineShift="sub" fontSize="11">1</tspan></text>
      <text x="311" y="24" fill="#061642" fontSize="16" fontWeight="800">R<tspan baselineShift="sub" fontSize="11">f</tspan></text>
      <text x="223" y="29" fill="#061642" fontSize="15" fontWeight="800">+VCC</text>
      <text x="223" y="216" fill="#061642" fontSize="15" fontWeight="800">-VEE</text>
      <text x="252" y="106" fill="#64748b" fontSize="20" fontWeight="900">-</text>
      <text x="252" y="143" fill="#64748b" fontSize="20" fontWeight="900">+</text>
    </svg>
  );
}

function DigitalHeroDiagram() {
  return (
    <svg viewBox="0 0 420 220" className="h-auto w-full max-w-[420px]" role="img" aria-label="Digital logic gates diagram">
      <path d="M55 62h54M55 102h54M55 154h54M55 194h54" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
      <path d="M109 42h54c39 0 58 19 58 40s-19 40-58 40h-54Z" fill="#ffffff" stroke="#111827" strokeWidth="3" />
      <path d="M109 134h54c39 0 58 19 58 40s-19 40-58 40h-54Z" fill="#ffffff" stroke="#111827" strokeWidth="3" />
      <path d="M221 82h48v46M221 174h48v-46" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M269 98h50c39 0 58 20 58 40s-19 40-58 40h-50Z" fill="#ffffff" stroke="#111827" strokeWidth="3" />
      <path d="M377 138h32" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
      <text x="32" y="68" fill="#061642" fontSize="17" fontWeight="900">A</text>
      <text x="32" y="108" fill="#061642" fontSize="17" fontWeight="900">B</text>
      <text x="32" y="160" fill="#061642" fontSize="17" fontWeight="900">C</text>
      <text x="398" y="130" fill="#061642" fontSize="17" fontWeight="900">Y</text>
    </svg>
  );
}

function SignalsHeroDiagram() {
  return (
    <svg viewBox="0 0 420 220" className="h-auto w-full max-w-[420px]" role="img" aria-label="Continuous and discrete signals diagram">
      <path d="M56 88h300M76 42v84" stroke="#111827" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M356 88l-10-6m10 6l-10 6" stroke="#111827" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M86 88c24-76 56-76 80 0s56 76 80 0 56-76 80 0" fill="none" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" />
      <text x="45" y="40" fill="#061642" fontSize="16" fontWeight="900">x(t)</text>
      <text x="368" y="94" fill="#061642" fontSize="16" fontWeight="900">t</text>
      <path d="M56 188h300M76 130v78" stroke="#111827" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M356 188l-10-6m10 6l-10 6" stroke="#111827" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      {[102, 130, 158, 186, 214, 242, 270, 298, 326].map((x, index) => {
        const heights = [18, 32, 52, 68, 58, 38, 24, 14, 8];
        return (
          <g key={x}>
            <path d={`M${x} 188V${188 - heights[index]}`} stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" />
            <circle cx={x} cy={188 - heights[index]} r="4" fill="#1d4ed8" />
          </g>
        );
      })}
      <text x="43" y="132" fill="#061642" fontSize="16" fontWeight="900">x[n]</text>
      <text x="368" y="194" fill="#061642" fontSize="16" fontWeight="900">n</text>
    </svg>
  );
}

function ControlHeroDiagram() {
  return (
    <svg viewBox="0 0 500 250" className="h-auto w-full max-w-[500px]" role="img" aria-label="Closed loop control system block diagram">
      <defs>
        <marker id="controlArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0 8 4 0 8Z" fill="#061642" />
        </marker>
      </defs>
      <path d="M42 88h90" stroke="#061642" strokeWidth="3" markerEnd="url(#controlArrow)" />
      <circle cx="160" cy="88" r="28" fill="#ffffff" stroke="#061642" strokeWidth="3" />
      <path d="M140 68l40 40M180 68l-40 40" stroke="#061642" strokeWidth="2" />
      <path d="M188 88h126" stroke="#061642" strokeWidth="3" markerEnd="url(#controlArrow)" />
      <rect x="314" y="56" width="86" height="64" rx="8" fill="#ffffff" stroke="#079455" strokeWidth="3" />
      <path d="M400 88h96" stroke="#061642" strokeWidth="3" markerEnd="url(#controlArrow)" />
      <path d="M440 88v94H275" stroke="#061642" strokeWidth="3" markerEnd="url(#controlArrow)" fill="none" />
      <rect x="190" y="150" width="86" height="64" rx="8" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
      <path d="M190 182h-30V116" stroke="#061642" strokeWidth="3" markerEnd="url(#controlArrow)" fill="none" />
      <text x="35" y="80" fill="#061642" fontSize="18" fontWeight="900">R(s)</text>
      <text x="214" y="78" fill="#061642" fontSize="18" fontWeight="900">E(s)</text>
      <text x="342" y="94" fill="#061642" fontSize="24" fontWeight="900">G(s)</text>
      <text x="468" y="78" fill="#061642" fontSize="18" fontWeight="900">C(s)</text>
      <text x="217" y="190" fill="#061642" fontSize="24" fontWeight="900">H(s)</text>
      <text x="340" y="34" fill="#061642" fontSize="17" fontWeight="800">Forward</text>
      <text x="350" y="53" fill="#061642" fontSize="17" fontWeight="800">Path</text>
      <text x="202" y="232" fill="#061642" fontSize="17" fontWeight="800">Feedback</text>
      <text x="222" y="248" fill="#061642" fontSize="17" fontWeight="800">Path</text>
      <text x="126" y="127" fill="#061642" fontSize="18" fontWeight="900">-</text>
      <text x="124" y="77" fill="#061642" fontSize="18" fontWeight="900">+</text>
    </svg>
  );
}

function ElectromagneticHeroDiagram() {
  return (
    <svg viewBox="0 0 420 240" className="h-auto w-full max-w-[420px]" role="img" aria-label="Electromagnetic field axes diagram">
      <defs>
        <marker id="emArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0 8 4 0 8Z" fill="#061642" />
        </marker>
      </defs>
      <path d="M210 196V38" stroke="#061642" strokeWidth="3" markerEnd="url(#emArrow)" />
      <path d="M98 164l210-84" stroke="#061642" strokeWidth="3" markerEnd="url(#emArrow)" />
      <path d="M122 72l172 112" stroke="#061642" strokeWidth="3" markerEnd="url(#emArrow)" />
      <path d="M154 138c18-48 96-48 114 0" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
      <path d="M138 154c30-72 124-72 154 0" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M172 122c20-26 56-26 76 0" fill="none" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
      <path d="M254 118c38 6 62 24 72 54" fill="none" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
      <path d="M210 140v-66" stroke="#ef4444" strokeWidth="4" markerEnd="url(#emArrow)" />
      <text x="222" y="75" fill="#ef4444" fontSize="20" fontWeight="900">E</text>
      <text x="329" y="168" fill="#0ea5e9" fontSize="20" fontWeight="900">B</text>
      <text x="210" y="30" fill="#061642" fontSize="17" fontWeight="900">Z</text>
      <text x="311" y="78" fill="#061642" fontSize="17" fontWeight="900">Y</text>
      <text x="296" y="202" fill="#061642" fontSize="17" fontWeight="900">X</text>
    </svg>
  );
}

function DspHeroDiagram() {
  const samples = [
    { x: 86, y: 176, label: "-2" },
    { x: 128, y: 142, label: "-1" },
    { x: 170, y: 94, label: "0" },
    { x: 212, y: 116, label: "1" },
    { x: 254, y: 154, label: "2" },
    { x: 296, y: 184, label: "3" },
    { x: 338, y: 194, label: "4" },
  ];

  return (
    <svg viewBox="0 0 420 240" className="h-auto w-full max-w-[420px]" role="img" aria-label="Digital signal processing discrete signal diagram">
      <defs>
        <marker id="dspArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0 8 4 0 8Z" fill="#061642" />
        </marker>
      </defs>
      <path d="M58 192h310" stroke="#061642" strokeWidth="3" markerEnd="url(#dspArrow)" />
      <path d="M88 206V44" stroke="#061642" strokeWidth="3" markerEnd="url(#dspArrow)" />
      {samples.map((sample) => (
        <g key={sample.label}>
          <path d={`M${sample.x} 192V${sample.y}`} stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
          <circle cx={sample.x} cy={sample.y} r="6" fill="#1d4ed8" />
          <text x={sample.x - 7} y="222" fill="#061642" fontSize="16" fontWeight="900">{sample.label}</text>
        </g>
      ))}
      <text x="72" y="38" fill="#061642" fontSize="18" fontWeight="900">x[n]</text>
      <text x="374" y="198" fill="#061642" fontSize="18" fontWeight="900">n</text>
    </svg>
  );
}

function VlsiHeroDiagram() {
  const pins = [32, 56, 80, 104, 128, 152, 176, 200];

  return (
    <svg viewBox="0 0 420 240" className="h-auto w-full max-w-[420px]" role="img" aria-label="VLSI integrated circuit diagram">
      <rect x="142" y="58" width="136" height="124" rx="14" fill="#1f2937" stroke="#061642" strokeWidth="4" />
      <text x="178" y="128" fill="#ffffff" fontSize="34" fontWeight="900">VLSI</text>
      {pins.map((y, index) => (
        <g key={`left-${y}`}>
          <path d={`M142 ${y + 28}h-42l-18 ${index % 2 ? 18 : -18}`} stroke="#111827" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx={82} cy={y + 28 + (index % 2 ? 18 : -18)} r="4" fill="#ffffff" stroke="#111827" strokeWidth="2" />
        </g>
      ))}
      {pins.map((y, index) => (
        <g key={`right-${y}`}>
          <path d={`M278 ${y + 28}h42l18 ${index % 2 ? -18 : 18}`} stroke="#111827" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx={338} cy={y + 28 + (index % 2 ? -18 : 18)} r="4" fill="#ffffff" stroke="#111827" strokeWidth="2" />
        </g>
      ))}
      {[-46, -22, 2, 26, 50].map((x) => (
        <path key={`top-${x}`} d={`M${210 + x} 58V24`} stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {[-46, -22, 2, 26, 50].map((x) => (
        <path key={`bottom-${x}`} d={`M${210 + x} 182v34`} stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function EmbeddedHeroDiagram() {
  return (
    <svg viewBox="0 0 420 240" className="h-auto w-full max-w-[420px]" role="img" aria-label="Embedded systems circuit board diagram">
      <g transform="translate(42 46) skewY(-12)">
        <rect x="18" y="28" width="292" height="136" rx="16" fill="#16a34a" stroke="#047857" strokeWidth="4" />
        <rect x="120" y="70" width="82" height="58" rx="8" fill="#1f2937" stroke="#111827" strokeWidth="3" />
        <rect x="36" y="48" width="46" height="28" rx="5" fill="#dbeafe" stroke="#075985" strokeWidth="3" />
        <rect x="228" y="48" width="56" height="26" rx="5" fill="#e0f2fe" stroke="#075985" strokeWidth="3" />
        <path d="M82 62h38M202 96h62M74 128h46M202 118h44" stroke="#d9f99d" strokeWidth="4" strokeLinecap="round" />
        {[50, 94, 218, 274].map((x) => (
          <circle key={x} cx={x} cy="144" r="8" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
        ))}
        {[130, 146, 162, 178, 194].map((x) => (
          <path key={x} d={`M${x} 62v-18`} stroke="#fef3c7" strokeWidth="3" strokeLinecap="round" />
        ))}
        {[130, 146, 162, 178, 194].map((x) => (
          <path key={`b-${x}`} d={`M${x} 136v18`} stroke="#fef3c7" strokeWidth="3" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

function CommunicationHeroDiagram() {
  return (
    <svg viewBox="0 0 500 250" className="h-auto w-full max-w-[500px]" role="img" aria-label="Communication system transmitter channel receiver diagram">
      <defs>
        <marker id="commArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0 8 4 0 8Z" fill="#061642" />
        </marker>
      </defs>
      <rect x="28" y="84" width="98" height="64" rx="10" fill="#ffffff" stroke="#0b58b4" strokeWidth="3" />
      <rect x="202" y="84" width="96" height="64" rx="10" fill="#ffffff" stroke="#079455" strokeWidth="3" />
      <rect x="374" y="84" width="98" height="64" rx="10" fill="#ffffff" stroke="#0b58b4" strokeWidth="3" />
      <path d="M126 116h76M298 116h76" stroke="#061642" strokeWidth="3" markerEnd="url(#commArrow)" />
      <path d="M55 58c16-22 28-22 44 0s28 22 44 0" fill="none" stroke="#ff7417" strokeWidth="3" strokeLinecap="round" />
      <path d="M226 52c10-12 20-12 30 0s20 12 30 0" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
      <path d="M400 58c16-22 28-22 44 0s28 22 44 0" fill="none" stroke="#ff7417" strokeWidth="3" strokeLinecap="round" />
      <path d="M246 156l-18 42M260 156l18 42" stroke="#061642" strokeWidth="3" strokeLinecap="round" />
      <path d="M216 198h74" stroke="#061642" strokeWidth="3" strokeLinecap="round" />
      <text x="48" y="122" fill="#061642" fontSize="18" fontWeight="900">TX</text>
      <text x="220" y="122" fill="#061642" fontSize="18" fontWeight="900">Channel</text>
      <text x="397" y="122" fill="#061642" fontSize="18" fontWeight="900">RX</text>
      <text x="51" y="170" fill="#061642" fontSize="15" fontWeight="800">Transmitter</text>
      <text x="390" y="170" fill="#061642" fontSize="15" fontWeight="800">Receiver</text>
    </svg>
  );
}

function MicroprocessorsHeroDiagram() {
  return (
    <svg viewBox="0 0 500 250" className="h-auto w-full max-w-[500px]" role="img" aria-label="Microprocessor CPU memory input output block diagram">
      <defs>
        <marker id="microArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0 8 4 0 8Z" fill="#061642" />
        </marker>
      </defs>
      <rect x="178" y="58" width="144" height="98" rx="14" fill="#1f2937" stroke="#061642" strokeWidth="4" />
      <text x="214" y="102" fill="#ffffff" fontSize="22" fontWeight="900">8085</text>
      <text x="202" y="130" fill="#ffffff" fontSize="18" fontWeight="900">CPU</text>
      <rect x="28" y="42" width="104" height="54" rx="10" fill="#ffffff" stroke="#0b58b4" strokeWidth="3" />
      <rect x="368" y="42" width="104" height="54" rx="10" fill="#ffffff" stroke="#0b58b4" strokeWidth="3" />
      <rect x="28" y="162" width="104" height="54" rx="10" fill="#ffffff" stroke="#079455" strokeWidth="3" />
      <rect x="368" y="162" width="104" height="54" rx="10" fill="#ffffff" stroke="#079455" strokeWidth="3" />
      <path d="M132 70h46M322 70h46M132 190h46M322 190h46" stroke="#061642" strokeWidth="3" markerEnd="url(#microArrow)" />
      <path d="M250 156v64" stroke="#ff7417" strokeWidth="4" strokeLinecap="round" />
      <path d="M124 220h252" stroke="#ff7417" strokeWidth="4" strokeLinecap="round" />
      <text x="58" y="75" fill="#061642" fontSize="16" fontWeight="900">ROM</text>
      <text x="398" y="75" fill="#061642" fontSize="16" fontWeight="900">RAM</text>
      <text x="62" y="195" fill="#061642" fontSize="16" fontWeight="900">I/O</text>
      <text x="388" y="195" fill="#061642" fontSize="16" fontWeight="900">8255</text>
      <text x="210" y="238" fill="#061642" fontSize="16" fontWeight="900">System Bus</text>
    </svg>
  );
}

function AntennaHeroDiagram() {
  return (
    <svg viewBox="0 0 500 250" className="h-auto w-full max-w-[500px]" role="img" aria-label="Antenna wave propagation radiation pattern diagram">
      <defs>
        <marker id="antennaArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0 8 4 0 8Z" fill="#061642" />
        </marker>
      </defs>
      <path d="M250 190V80" stroke="#061642" strokeWidth="5" strokeLinecap="round" />
      <path d="M218 190h64M250 190l-36 38M250 190l36 38" stroke="#061642" strokeWidth="4" strokeLinecap="round" />
      <path d="M250 70c-42 14-70 42-86 86" fill="none" stroke="#0b58b4" strokeWidth="3" strokeLinecap="round" />
      <path d="M250 70c42 14 70 42 86 86" fill="none" stroke="#0b58b4" strokeWidth="3" strokeLinecap="round" />
      <path d="M250 48c-78 22-126 72-148 148" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
      <path d="M250 48c78 22 126 72 148 148" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
      <path d="M250 110h146" stroke="#ff7417" strokeWidth="4" markerEnd="url(#antennaArrow)" />
      <path d="M250 138h110" stroke="#ff7417" strokeWidth="3" markerEnd="url(#antennaArrow)" opacity="0.75" />
      <path d="M250 166h78" stroke="#ff7417" strokeWidth="3" markerEnd="url(#antennaArrow)" opacity="0.55" />
      <text x="306" y="96" fill="#061642" fontSize="18" fontWeight="900">Radiation</text>
      <text x="214" y="70" fill="#061642" fontSize="18" fontWeight="900">Antenna</text>
    </svg>
  );
}

function ChapterHeroDiagram({ type }) {
  if (type === "analog") {
    return <AnalogHeroDiagram />;
  }

  if (type === "digital") {
    return <DigitalHeroDiagram />;
  }

  if (type === "signals") {
    return <SignalsHeroDiagram />;
  }

  if (type === "control") {
    return <ControlHeroDiagram />;
  }

  if (type === "electromagnetic") {
    return <ElectromagneticHeroDiagram />;
  }

  if (type === "dsp") {
    return <DspHeroDiagram />;
  }

  if (type === "vlsi") {
    return <VlsiHeroDiagram />;
  }

  if (type === "embedded") {
    return <EmbeddedHeroDiagram />;
  }

  if (type === "communication") {
    return <CommunicationHeroDiagram />;
  }

  if (type === "microprocessors") {
    return <MicroprocessorsHeroDiagram />;
  }

  if (type === "antenna") {
    return <AntennaHeroDiagram />;
  }

  return <BeginnerSeriesCircuitDiagram />;
}

function NetworkBeginnerGuide({ chapter }) {
  const stats = NETWORK_CHAPTER_STATS.map((item) =>
    item.label === "Difficulty"
      ? { ...item, value: chapter.difficulty }
      : item.label === "Estimated Time"
      ? { ...item, value: chapter.time || item.value }
      : item
  );

  return (
    <section id="network-beginner-guide" className="grid gap-5">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-6 shadow-[0_10px_32px_rgba(15,23,42,0.06)] sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
          <div className="min-w-0">
            <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-normal text-[#0754c9]">
              ECE Core Chapter
            </span>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-normal text-[#061642] sm:text-5xl">
              {chapter.title}
            </h1>
            <div className="mt-4 grid gap-3 text-base leading-8 text-slate-950">
              {chapter.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="hidden justify-center xl:flex">
            <ChapterHeroDiagram type={chapter.diagram} />
          </div>
        </div>

        <div className="mt-7 rounded-lg border border-green-200 bg-[#f5fbf4] p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <NetworkLandingIcon name="clipboard" className="h-8 w-8 text-[#137d46]" />
            <h2 className="text-2xl font-black text-[#137d46]">Table of Contents</h2>
          </div>
          <div className="mt-5 grid gap-x-7 gap-y-0 md:grid-cols-2 xl:grid-cols-3">
            {chapter.toc.map((item, index) => (
              <a
                key={item}
                href="#network-beginner-guide"
                className="flex items-center gap-3 border-b border-slate-200 py-3 text-sm font-black text-[#0754c9] transition hover:text-[#061642] sm:text-base"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-[#2f9f45] text-sm font-black text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.82fr)]">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
          <div className="flex items-center gap-3">
            <NetworkLandingIcon name="clipboard" className="h-7 w-7 text-[#0754c9]" />
            <h2 className="text-2xl font-black text-[#0754c9]">Chapter Overview</h2>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {stats.map((item) => (
              <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#2563eb]">
                    <NetworkSmallIcon name={item.icon} />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-600">{item.label}</p>
                    <p className="text-sm font-black text-[#061642]">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-base leading-7 text-slate-950">
            {chapter.overview}
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
          <div className="flex items-center gap-3">
            <span className="text-[#0754c9]">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
                <path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1" />
              </svg>
            </span>
            <h2 className="text-2xl font-black text-[#0754c9]">Contextual Study Links</h2>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            {chapter.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 text-sm font-black text-[#061642] last:border-b-0 hover:bg-[#f8fbff]"
              >
                <span>{item.title}</span>
                <span aria-hidden="true">&gt;</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:grid-cols-2 xl:grid-cols-6">
        {NETWORK_FEATURES.map((item) => (
          <div key={item.title} className="flex items-center gap-3 border-slate-200 xl:border-r xl:last:border-r-0">
            <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-lg text-white ${item.color}`}>
              <NetworkSmallIcon name={item.icon} />
            </span>
            <span>
              <span className="block text-sm font-black text-[#061642]">{item.title}</span>
              <span className="block text-xs font-semibold text-slate-600">{item.text}</span>
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}

function NetworkAnalysisLandingPage({ subject, seo, concepts, activeConceptIndex }) {
  const chapter = SUBJECT_CHAPTER_HOME[subject.title] || SUBJECT_CHAPTER_HOME["Network Analysis"];

  return (
    <Layout
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      canonicalUrl={seo.canonicalUrl}
      structuredData={seo.structuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1360px] pb-8">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-start justify-between gap-3">
          <ol className="flex min-w-0 flex-1 flex-wrap items-center gap-3 px-0 py-2 text-base text-[#0b58b4]">
            <li className="shrink-0">
              <Link href="/" className="font-medium transition hover:text-[#061642]">
                Home
              </Link>
            </li>
            <li className="shrink-0 text-[#0b58b4]">/</li>
            <li className="shrink-0">
              <Link href="/subjects" className="font-medium transition hover:text-[#061642]">Notes</Link>
            </li>
            <li className="shrink-0 text-[#0b58b4]">/</li>
            <li className="min-w-0">
              <span className="font-black text-[#061642]">{subject.title}</span>
            </li>
          </ol>
          <SubjectLandingMenu
            subjectTitle={subject.title}
            concepts={concepts}
            activeConceptIndex={activeConceptIndex}
          />
        </nav>

        <NetworkBeginnerGuide chapter={chapter} />

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <h2 className="text-2xl font-black text-[#061642]">{subject.title} FAQ</h2>
          <div className="mt-5 grid gap-3">
            {seo.faqItems.map((item) => (
              <details
                key={item.question}
                className="rounded-lg border border-slate-200 bg-[#f8fbff] p-4"
              >
                <summary className="cursor-pointer text-base font-black text-[#061642]">
                  {item.question}
                </summary>
                <p className="mt-3 text-base leading-7 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default function SubjectTheoryPage({
  subject,
  steps,
  learningMeta,
  initialActiveConceptIndex = 0,
  standaloneTopicPage = "",
}) {
  const router = useRouter();
  const theoryKnowledge =
    subject.title === "Digital Electronics"
      ? DIGITAL_ELECTRONICS_KNOWLEDGE
      : subject.title === "Electromagnetic Theory"
      ? ELECTROMAGNETIC_THEORY_KNOWLEDGE
      : subject.title === "Antenna & Wave Propagation"
      ? ANTENNA_WAVE_PROPAGATION_KNOWLEDGE
      : subject.title === "VLSI Design"
      ? VLSI_DESIGN_KNOWLEDGE
      : subject.title === "Microprocessors"
      ? MICROPROCESSORS_KNOWLEDGE
      : subject.title === "Embedded Systems"
      ? EMBEDDED_SYSTEMS_KNOWLEDGE
      : subject.title === "Digital Signal Processing"
      ? DIGITAL_SIGNAL_PROCESSING_KNOWLEDGE
      : subject.title === "Signals and Systems"
      ? SIGNALS_SYSTEMS_KNOWLEDGE
      : subject.title === "Communication Systems"
      ? COMMUNICATION_SYSTEMS_KNOWLEDGE
      : subject.title === "Control Systems"
      ? CONTROL_SYSTEMS_KNOWLEDGE
      : subjectTheoryKnowledge[subject.title] || null;
  const chapterMeta = SUBJECT_META[subject.title] || null;
  const totalConcepts = steps.reduce((count, step) => count + step.points.length, 0);
  const subjectSummary =
    subject.description ||
    "A structured roadmap that moves from fundamentals to exam-level analysis and problem solving.";
  const notesHref = `/notes/${getSubjectSlug(subject.title)}`;
  const seo = buildSubjectSeo(subject, theoryKnowledge, learningMeta.learningTopics || []);
  const [activeConceptIndex, setActiveConceptIndex] = useState(initialActiveConceptIndex);
  const [quizSelections, setQuizSelections] = useState({});
  const { progressStats, revisionCount, isReady } = useLearningProgress();
  const selectedLearningTopicSlug =
    typeof router.query.topic === "string" ? router.query.topic : "";
  const selectedLearningTopic = selectedLearningTopicSlug
    ? learningMeta.learningTopics?.find((topic) => topic.slug === selectedLearningTopicSlug)
    : null;

  useEffect(() => {
    setActiveConceptIndex(initialActiveConceptIndex);
    setQuizSelections({});
  }, [initialActiveConceptIndex, subject.title]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [initialActiveConceptIndex]);

  if (!theoryKnowledge || !chapterMeta) {
    return (
      <Layout
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonicalUrl}
        structuredData={seo.structuredData}
        pageClassName="py-3 sm:py-4"
      >
        <div className="mx-auto max-w-[1440px]">
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-col gap-3 pt-1 sm:flex-row sm:items-start sm:justify-between">
            <ol className="flex min-w-0 w-full flex-wrap items-center gap-2 rounded-2xl border border-white/80 bg-white/80 px-3 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur sm:w-auto sm:rounded-full sm:px-4">
              <li className="shrink-0">
                <Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">
                  Home
                </Link>
              </li>
              <li className="shrink-0 text-slate-300">/</li>
              <li className="shrink-0">
                <Link
                  href="/subjects"
                  className="font-medium text-slate-600 transition hover:text-portal-700"
                >Notes</Link>
              </li>
              <li className="shrink-0 text-slate-300">/</li>
              <li className="min-w-0 basis-full sm:basis-auto">
                <span className="inline-flex max-w-full rounded-2xl bg-portal-50 px-3 py-1 text-left font-semibold leading-snug text-portal-700 whitespace-normal break-words sm:rounded-full">
                  {subject.title}
                </span>
              </li>
            </ol>
            <div className="flex items-center gap-2">
              {subject.title === "Electromagnetic Theory" ? (
                <ElectromagneticTheoryChapterMenu />
              ) : subject.title === "VLSI Design" ? (
                <VlsiDesignChapterMenu />
              ) : subject.title === "Microprocessors" ? (
                <MicroprocessorsChapterMenu />
              ) : subject.title === "Embedded Systems" ? (
                <EmbeddedSystemsChapterMenu />
              ) : subject.title === "Digital Signal Processing" ? (
                <DigitalSignalProcessingChapterMenu />
              ) : subject.title === "Signals and Systems" ? (
                <SignalsChapterMenu />
              ) : subject.title === "Communication Systems" ? (
                <CommunicationSystemsChapterMenu />
              ) : subject.title === "Control Systems" ? (
                <ControlSystemsChapterMenu />
              ) : null}
            </div>
          </nav>

          <FallbackSubjectPage
            subject={subject}
            steps={steps}
            totalConcepts={totalConcepts}
            subjectSummary={subjectSummary}
          />
        </div>
      </Layout>
    );
  }

  const concepts = theoryKnowledge.concepts || [];
  const selectedTopicConceptIndex = selectedLearningTopicSlug
    ? getConceptIndexForLearningTopic(
        learningMeta.learningSubjectSlug,
        selectedLearningTopicSlug,
        concepts
      )
    : 0;
  const isConceptIntroPage = activeConceptIndex === 0;
  const activeConceptDataIndex = isConceptIntroPage ? 0 : activeConceptIndex - 1;
  const activeConcept = concepts[activeConceptDataIndex] || concepts[0];
  const isExternalDiodeConcept =
    subject.title === "Analog Electronics" &&
    ["diodes-and-pn-junction", "transistor-basics", "amplifier-fundamentals"].includes(activeConcept?.slug) &&
    !["diodes", "bjt-mosfet", "amplifiers"].includes(standaloneTopicPage);
  const shouldShowInlineConcept =
    subject.title !== "Digital Electronics" &&
    subject.title !== "Electromagnetic Theory" &&
    subject.title !== "VLSI Design" &&
    subject.title !== "Microprocessors" &&
    subject.title !== "Embedded Systems" &&
    subject.title !== "Digital Signal Processing" &&
    !isConceptIntroPage &&
    !isExternalDiodeConcept;

  useEffect(() => {
    if (!selectedLearningTopicSlug) {
      return;
    }

    setActiveConceptIndex(selectedTopicConceptIndex);
  }, [selectedLearningTopicSlug, selectedTopicConceptIndex]);

  useEffect(() => {
    if (
      !selectedLearningTopicSlug ||
      !shouldShowInlineConcept ||
      activeConceptIndex !== selectedTopicConceptIndex
    ) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      document.getElementById("subject-concept")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 60);

    return () => window.clearTimeout(timeoutId);
  }, [
    activeConceptIndex,
    selectedLearningTopicSlug,
    selectedTopicConceptIndex,
    shouldShowInlineConcept,
  ]);

  if (SUBJECT_CHAPTER_HOME[subject.title] && isConceptIntroPage) {
    return (
      <NetworkAnalysisLandingPage
        subject={subject}
        seo={seo}
        concepts={concepts}
        activeConceptIndex={activeConceptIndex}
      />
    );
  }

  const activeTeaching = activeConcept?.teaching || {};
  const subjectProgress = progressStats.subjects.find(
    (item) => item.slug === learningMeta.learningSubjectSlug
  );
  const completionPercent = subjectProgress?.completionPercent || 0;
  const completedTopics = subjectProgress?.completedTopics || 0;
  const readyTopics = subjectProgress?.totalTopics || learningMeta.readyTopics || 0;
  const masteryState = getLearningMasteryState(completionPercent, completedTopics);
  const subjectXp = getLearningXp(completedTopics);
  const activeFormulaPreview =
    activeConcept?.formulas?.length > 0
      ? activeConcept.formulas.slice(0, 3)
      : concepts.flatMap((concept) => concept.formulas || []).slice(0, 3);
  const activeIntuition =
    activeTeaching.intuition?.length ? activeTeaching.intuition : [activeConcept.summary];
  const activeExplanation =
    activeTeaching.explanation?.length ? activeTeaching.explanation : activeConcept.paragraphs || [];
  const activeInterpretation =
    activeTeaching.interpretation?.length ? activeTeaching.interpretation : activeConcept.learnPoints || [];
  const activeWorkedExample = activeTeaching.workedExample || null;
  const activeQuiz = activeTeaching.quiz || null;
  const activeCommonMistake =
    activeTeaching.commonMistake ||
    theoryKnowledge.commonMistakes?.[activeConceptDataIndex] ||
    theoryKnowledge.commonMistakes?.[0] ||
    "";
  const activeRealLifeInsight =
    activeTeaching.realLifeInsight || chapterMeta.studyTip;
  const selectedQuizIndex = quizSelections[activeConcept?.slug];
  const isQuizAnswered = typeof selectedQuizIndex === "number";
  const isQuizCorrect = isQuizAnswered && selectedQuizIndex === activeQuiz?.correctIndex;
  const analogStandaloneChapter = ANALOG_STANDALONE_PAGES[standaloneTopicPage];

  if (analogStandaloneChapter) {
    return <AnalogChapterPage chapter={analogStandaloneChapter} />;
  }

  if (standaloneTopicPage === "basic-concepts") {
    const basicFormulaItems = [
      { label: "Current", expression: "I = dQ/dt", note: "Current is the time rate of flow of charge." },
      { label: "Power", expression: "P = VI", note: "Positive power means absorption under passive sign convention." },
      { label: "Energy", expression: "W = integral P dt", note: "Energy is accumulated power over time." },
      { label: "Ohm's Law Preview", expression: "V = IR", note: "This becomes useful after identifying voltage and current direction." },
    ];
    const basicLearningGoals = [
      "Understand charge, current, voltage, power, and energy.",
      "Identify active, passive, linear, non-linear, bilateral, and unilateral elements.",
      "Use sign convention correctly before applying KCL, KVL, or Ohm's law.",
    ];
    const basicExamPointers = [
      "Check whether the element is absorbing or delivering power.",
      "Keep conventional current direction separate from electron flow.",
      "Identify whether an element is active/passive, linear/non-linear, or bilateral/unilateral.",
      "Do not apply circuit laws before marking voltage polarity and current direction.",
    ];
    const basicWorkedExample = {
      title: "Power direction check",
      prompt: "A circuit element has marked voltage and current direction. Decide whether it absorbs or delivers energy before solving deeper network equations.",
      steps: [
        "Mark the voltage polarity and current reference direction first.",
        "Use P = VI with the passive sign convention.",
        "If power is positive, the element absorbs energy; if negative, it delivers energy.",
      ],
      answer: "Power sign tells whether the element is absorbing or delivering energy.",
    };
    const standardBasicSections = [
      {
        id: "introduction",
        title: "Topic Introduction",
        navLabel: "Introduction",
        children: (
          <div className="grid gap-3">
            <p>
              Every electrical circuit contains voltage, current, power, and energy exchange.
              Network Analysis helps us understand how these quantities behave and interact inside the circuit.
            </p>
            <p>
              In this chapter, charge is the basic quantity, when electric charge starts moving through a conductor, electrical current is produced.
              The amount of charge flowing every second determines how large the current is. Voltage is the potential difference between two points,
              power is the rate of energy transfer, and energy is the total work done
              by or on the circuit.
            </p>
          </div>
        ),
      },
      {
        id: "intuition",
        title: "Key Idea / Intuition",
        navLabel: "Intuition",
        children: (
          <>
            <p>
              Think of a circuit as a closed path with terminals, elements, and energy
              exchange. A source creates voltage, charges move as current, and elements
              either absorb, store, deliver, control, or restrict electrical energy.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">
                  Learning Goals
                </h3>
                <EducationalBulletList items={basicLearningGoals} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">
                  Key Concepts
                </h3>
                <EducationalBulletList items={BASIC_CONCEPT_GUIDE.map((concept) => concept.title)} />
              </div>
            </div>
          </>
        ),
      },
      {
        id: "mathematical-definition",
        title: "Mathematical Definition",
        navLabel: "Definition",
        children: (
          <>
            <p>
              Keep the basic quantities close to their meaning. These formulas are
              useful only after voltage polarity and current direction are marked.
            </p>
            <EducationalFormulaGrid formulas={basicFormulaItems} />
          </>
        ),
      },
      {
        id: "visual-understanding",
        title: "Visual Understanding",
        navLabel: "Visual",
        children: (
          <>
            <p>
              These normal circuit diagrams show how charge, current, voltage, power,
              and element behavior are marked before solving Network Analysis problems.
            </p>
            <div className="mt-4">
              <BasicConceptCircuitDiagramGallery />
            </div>
          </>
        ),
      },
      {
        id: "worked-example",
        title: "Worked Example",
        navLabel: "Example",
        children: <EducationalExampleCard example={basicWorkedExample} />,
      },
      {
        id: "important-notes",
        title: "Important Notes",
        navLabel: "Notes",
        children: (
          <div className="grid gap-3 md:grid-cols-2">
            <EducationalInfoCard title="Exam Pointers">
              <EducationalBulletList items={basicExamPointers} />
            </EducationalInfoCard>
            <EducationalInfoCard title="Exam-Oriented Tip" tone="amber">
              <p className="font-semibold text-slate-800">
                Most mistakes in Network Analysis begin before calculation: wrong
                polarity, wrong current direction, or wrong assumption about whether
                power is absorbed or delivered.
              </p>
            </EducationalInfoCard>
          </div>
        ),
      },
      {
        id: "quick-summary",
        title: "Quick Summary",
        navLabel: "Summary",
        children: (
          <>
            <EducationalInfoCard title="Quick Revision Takeaway" tone="emerald">
              <EducationalBulletList
                bulletClassName="bg-emerald-500"
                items={[
                  "Voltage, current, power, and energy describe circuit behavior.",
                  "Element type decides whether energy is absorbed, stored, delivered, controlled, or restricted.",
                  "Mark polarity and current direction before applying laws or theorems.",
                ]}
              />
            </EducationalInfoCard>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {NETWORK_ANALYSIS_TOPIC_GROUPS.slice(1, 7).map((group) => (
                <Link
                  key={group.title}
                  href={NETWORK_TOPIC_ROUTES[group.title]}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-portal-200 hover:bg-portal-50"
                >
                  <h3 className="text-sm font-black text-slate-900">{group.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {group.topics.slice(0, 3).join(", ")}
                  </p>
                </Link>
              ))}
            </div>
          </>
        ),
      },
    ];

    const basicFooter = (
      <div className="grid gap-3 sm:grid-cols-3">
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
          href="/circuit-elements"
          className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
        >
          Next Topic
        </Link>
      </div>
    );

    return (
      <Layout title="Basic Concepts GATE ECE Quick Notes + Formulas + PYQs | Network Analysis" pageClassName="py-3 sm:py-4">
        <EducationalTheoryLayout
          eyebrow="Network Analysis"
          title="Basic Concepts"
          summary="Basic Concepts is the starting chapter of Network Analysis. It explains charge, current, voltage, power, energy, active and passive elements, linear and non-linear behavior, and bilateral and unilateral elements before you move into KCL, KVL, theorems, and circuit solving."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Notes", href: "/subjects" },
            { label: "Network Analysis", href: "/subjects/network-analysis" },
            { label: "Basic Concepts" },
          ]}
          menu={<BasicConceptSubtopicMenu topics={BASIC_CONCEPT_GUIDE} />}
          metrics={[
            { label: "Core question", value: "How do voltage, current, charge, power, and energy describe a circuit?" },
            { label: "Exam focus", value: "Definitions, sign convention, passive sign convention, element type, and power absorbed or delivered." },
            { label: "Engineering use", value: "Every circuit calculation begins by identifying variables, terminals, element behavior, and energy flow." },
          ]}
          sections={standardBasicSections}
          footer={basicFooter}
          navLabel="Basic Concepts topic sections"
        />
      </Layout>
    );
  }

  if (standaloneTopicPage === "diodes") {
    return (
      <Layout title="Diodes GATE ECE Quick Notes + PN Junction Formulas + PYQs" pageClassName="py-3 sm:py-4">
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
                  href="/subjects/analog-electronics"
                  className="font-medium text-slate-600 transition hover:text-portal-700"
                >
                  Analog Electronics
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">
                  Diodes
                </span>
              </li>
            </ol>
            <DiodeTopicMenu />
          </nav>

          <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
            <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
              Analog Electronics / Diodes
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Diodes: PN Junction, Biasing, V-I Curve, and Rectifier Action
            </h1>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
              A complete visual explanation of how a diode conducts, blocks current,
              enters breakdown, and works inside common analog circuits.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/mcqs/analog-electronics"
                className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
              >
                Try MCQs
              </Link>
              <Link
                href="/notes/analog-electronics"
                className="inline-flex justify-center rounded-xl border border-portal-200 bg-white px-5 py-3 text-sm font-bold text-portal-700 transition hover:bg-portal-50"
              >
                Download Quick Notes
              </Link>
              <Link
                href="/subjects/analog-electronics"
                className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
              >
                Back to Analog Electronics
              </Link>
            </div>
          </section>

          <DiodeDeepDiveContent />
        </div>
      </Layout>
    );
  }

  if (standaloneTopicPage === "bjt-mosfet") {
    const pageTitle =
      "BJT and MOSFET GATE ECE Quick Notes + Regions + PYQs | Analog Electronics";
    const pageDescription =
      "Learn BJT and MOSFET working step by step with structure, current relations, operating regions, characteristics, amplifier and switch applications, and comparison.";
    const canonicalUrl = `${SITE_URL}/bjt-and-mosfet`;
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: pageTitle,
      description: pageDescription,
      author: { "@type": "Organization", name: "ECE Exam Guide" },
      publisher: { "@type": "Organization", name: "ECE Exam Guide" },
      mainEntityOfPage: canonicalUrl,
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Notes", item: `${SITE_URL}/subjects` },
        { "@type": "ListItem", position: 3, name: "Analog Electronics", item: `${SITE_URL}/subjects/analog-electronics` },
        { "@type": "ListItem", position: 4, name: "BJT and MOSFET", item: canonicalUrl },
      ],
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the main difference between BJT and MOSFET?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A BJT is mainly current-controlled because base current controls collector current. A MOSFET is voltage-controlled because gate-source voltage controls channel formation and drain current.",
          },
        },
        {
          "@type": "Question",
          name: "Which BJT region is used for amplification?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The active region is used for BJT amplification because collector current is controlled by base current while the transistor remains in a linear operating condition.",
          },
        },
        {
          "@type": "Question",
          name: "Why is MOSFET input impedance high?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The MOSFET gate is insulated from the channel by an oxide layer, so ideally almost no DC current enters the gate.",
          },
        },
      ],
    };

    return (
      <Layout
        title={pageTitle}
        description={pageDescription}
        pageClassName="py-3 sm:py-4"
      >
        <Head>
          <link rel="canonical" href={canonicalUrl} />
          <meta name="keywords" content="BJT and MOSFET, BJT working, MOSFET working, transistor operating regions, BJT characteristics, MOSFET characteristics, BJT vs MOSFET, Analog Electronics" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        </Head>
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
                  href="/subjects/analog-electronics"
                  className="font-medium text-slate-600 transition hover:text-portal-700"
                >
                  Analog Electronics
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">
                  BJT and MOSFET
                </span>
              </li>
            </ol>
            <TopicJumpMenu
              label="BJT and MOSFET"
              topics={TRANSISTOR_TOPIC_MENU}
              idPrefix="transistor-topic"
              controlId="transistor-topic-menu"
            />
          </nav>

          <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
            <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
              Analog Electronics / BJT and MOSFET
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              BJT and MOSFET Explained: Structure, Working, Regions, and Characteristics
            </h1>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
              A complete visual guide to transistor operation, BJT current control,
              MOSFET voltage control, characteristics, switching, amplification, and
              exam-focused comparison.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/mcqs/analog-electronics"
                className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
              >
                Try MCQs
              </Link>
              <Link
                href="/notes/analog-electronics"
                className="inline-flex justify-center rounded-xl border border-portal-200 bg-white px-5 py-3 text-sm font-bold text-portal-700 transition hover:bg-portal-50"
              >
                Download Quick Notes
              </Link>
              <Link
                href="/subjects/analog-electronics"
                className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
              >
                Back to Analog Electronics
              </Link>
            </div>
          </section>

          <BjtMosfetDeepDiveContent />
        </div>
      </Layout>
    );
  }

  if (standaloneTopicPage === "amplifiers") {
    const pageTitle =
      "Amplifiers GATE ECE Quick Notes + Gain Formulas + PYQs | Analog Electronics";
    const pageDescription =
      "Learn amplifiers step by step with gain, BJT amplifier, MOSFET amplifier, phase shift, frequency response, bandwidth, classes, distortion and practical parameters.";
    const canonicalUrl = `${SITE_URL}/amplifiers`;
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: pageTitle,
      description: pageDescription,
      author: { "@type": "Organization", name: "ECE Exam Guide" },
      publisher: { "@type": "Organization", name: "ECE Exam Guide" },
      mainEntityOfPage: canonicalUrl,
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Notes", item: `${SITE_URL}/subjects` },
        { "@type": "ListItem", position: 3, name: "Analog Electronics", item: `${SITE_URL}/subjects/analog-electronics` },
        { "@type": "ListItem", position: 4, name: "Amplifiers", item: canonicalUrl },
      ],
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is an amplifier?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An amplifier is an electronic circuit that increases the strength of a signal while preserving its useful waveform shape.",
          },
        },
        {
          "@type": "Question",
          name: "What is voltage gain?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Voltage gain is the ratio of output voltage to input voltage and is commonly written as Av = Vout / Vin.",
          },
        },
        {
          "@type": "Question",
          name: "Why does a common-emitter amplifier invert phase?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In a common-emitter amplifier, an increase in collector current increases the voltage drop across the collector resistor, reducing collector voltage and producing a 180 degree phase inversion.",
          },
        },
      ],
    };

    return (
      <Layout
        title={pageTitle}
        description={pageDescription}
        pageClassName="py-3 sm:py-4"
      >
        <Head>
          <link rel="canonical" href={canonicalUrl} />
          <meta name="keywords" content="amplifier, amplifiers explained, voltage gain, BJT amplifier, MOSFET amplifier, frequency response, amplifier bandwidth, amplifier classes, amplifier distortion, Analog Electronics" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        </Head>
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
                  href="/subjects/analog-electronics"
                  className="font-medium text-slate-600 transition hover:text-portal-700"
                >
                  Analog Electronics
                </Link>
              </li>
              <li className="text-slate-300">/</li>
              <li>
                <span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">
                  Amplifiers
                </span>
              </li>
            </ol>
            <TopicJumpMenu
              label="Amplifiers"
              topics={AMPLIFIER_TOPIC_MENU}
              idPrefix="amplifier-topic"
              controlId="amplifier-topic-menu"
            />
          </nav>

          <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
            <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
              Analog Electronics / Amplifiers
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Amplifiers Explained: Gain, BJT, MOSFET, Frequency Response, and Classes
            </h1>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
              A complete visual guide to amplifier gain, phase shift, BJT and MOSFET
              amplifier action, frequency response, bandwidth, classes, distortion,
              and practical design parameters.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/mcqs/analog-electronics"
                className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
              >
                Try MCQs
              </Link>
              <Link
                href="/notes/analog-electronics"
                className="inline-flex justify-center rounded-xl border border-portal-200 bg-white px-5 py-3 text-sm font-bold text-portal-700 transition hover:bg-portal-50"
              >
                Download Quick Notes
              </Link>
              <Link
                href="/subjects/analog-electronics"
                className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
              >
                Back to Analog Electronics
              </Link>
            </div>
          </section>

          <AmplifierDeepDiveContent />
        </div>
      </Layout>
    );
  }

  function getConceptStatus(index) {
    if (index < activeConceptIndex) {
      return "review";
    }

    if (index === activeConceptIndex) {
      return "current";
    }

    return "next";
  }

  function selectRoadmapTopic(index, anchorId = "subject-concept") {
    setActiveConceptIndex(index);

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        document.getElementById(anchorId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }

  return (
    <Layout
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      canonicalUrl={seo.canonicalUrl}
      structuredData={seo.structuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div id="subject-roadmap-top" className="mx-auto max-w-[1440px] scroll-mt-40 pb-24 xl:pb-0">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-start justify-between gap-2 pt-1"
        >
          <ol className="flex min-w-0 flex-1 flex-wrap items-center gap-2 rounded-2xl border border-white/80 bg-white/80 px-3 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur sm:w-auto sm:rounded-full sm:px-4">
            <li className="shrink-0">
              <Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">
                Home
              </Link>
            </li>
            <li className="shrink-0 text-slate-300">/</li>
            <li className="shrink-0">
              <Link
                href="/subjects"
                className="font-medium text-slate-600 transition hover:text-portal-700"
              >Notes</Link>
            </li>
            <li className="shrink-0 text-slate-300">/</li>
            <li className="min-w-0 basis-full sm:basis-auto">
              {selectedLearningTopic ? (
                <Link
                  href={`/subjects/${getSubjectSlug(subject.title)}`}
                  className="inline-flex max-w-full text-left font-medium leading-snug text-slate-600 transition hover:text-portal-700 whitespace-normal break-words"
                >
                  {subject.title}
                </Link>
              ) : (
                <span className="inline-flex max-w-full text-left font-semibold leading-snug text-portal-700 whitespace-normal break-words">
                  {subject.title}
                </span>
              )}
            </li>
            {selectedLearningTopic ? (
              <>
                <li className="shrink-0 text-slate-300">/</li>
                <li className="min-w-0 basis-full sm:basis-auto">
                  <span className="inline-flex max-w-full text-left font-semibold leading-snug text-portal-700 whitespace-normal break-words">
                    {selectedLearningTopic.title}
                  </span>
                </li>
              </>
            ) : null}
          </ol>
          <div className="flex items-center gap-2">
            {subject.title === "Network Analysis" ? (
              <NetworkTopicMenu
                concepts={concepts}
                activeIndex={activeConceptIndex}
              />
            ) : subject.title === "Analog Electronics" ? (
              <AnalogChapterMenu />
            ) : subject.title === "Digital Electronics" ? (
              <DigitalChapterMenu />
            ) : subject.title === "Electromagnetic Theory" ? (
              <ElectromagneticTheoryChapterMenu />
            ) : subject.title === "Antenna & Wave Propagation" ? (
              <AntennaWavePropagationChapterMenu />
            ) : subject.title === "VLSI Design" ? (
              <VlsiDesignChapterMenu />
            ) : subject.title === "Microprocessors" ? (
              <MicroprocessorsChapterMenu />
            ) : subject.title === "Embedded Systems" ? (
              <EmbeddedSystemsChapterMenu />
            ) : subject.title === "Digital Signal Processing" ? (
              <DigitalSignalProcessingChapterMenu />
            ) : subject.title === "Signals and Systems" ? (
              <SignalsChapterMenu />
            ) : subject.title === "Communication Systems" ? (
              <CommunicationSystemsChapterMenu />
            ) : subject.title === "Control Systems" ? (
              <ControlSystemsChapterMenu />
            ) : concepts.length ? (
              <SubjectConceptMenu
                subjectTitle={subject.title}
                concepts={concepts}
                activeIndex={activeConceptIndex}
                onSelectTopic={selectRoadmapTopic}
              />
            ) : null}
          </div>
        </nav>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
          <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
            <div className="min-w-0">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
                  ECE Core Chapter
                </p>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  {subject.title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
                  {chapterMeta.subtitle}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <HeroMetric label="Estimated Time" value={chapterMeta.estimatedTime} />
                  <HeroMetric label="Difficulty" value={chapterMeta.difficulty} />
                  <HeroMetric label="Concepts" value={`${concepts.length} Detailed Topics`} />
                  <HeroMetric label="Level" value={chapterMeta.level} />
                </div>
              </div>
            </div>

            <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-950">Study Momentum</h2>
                    <p className="mt-1 text-xl font-black tracking-tight text-slate-950">
                      {isReady ? masteryState.label : "Loading..."}
                    </p>
                  </div>
                  <span className="rounded-full border border-white bg-white px-3 py-1 text-sm font-black text-portal-700 shadow-sm">
                    {completionPercent}%
                  </span>
                </div>
                <div className="mt-3 h-4 overflow-hidden rounded-full border border-white bg-white">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-portal-600 transition-all"
                    style={{ width: `${Math.max(completionPercent, completionPercent ? 8 : 0)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                  {masteryState.note}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-white bg-white px-2.5 py-2">
                  <p className="text-base font-black text-slate-950">{subjectXp}</p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    XP
                  </p>
                </div>
                <div className="rounded-xl border border-white bg-white px-2.5 py-2">
                  <p className="text-base font-black text-slate-950">{completedTopics}/{readyTopics}</p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    Topics
                  </p>
                </div>
                <div className="rounded-xl border border-white bg-white px-2.5 py-2">
                  <p className="text-base font-black text-slate-950">{revisionCount}</p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    Revise
                  </p>
                </div>
              </div>

              <p className="rounded-xl border border-portal-100 bg-white px-3 py-2 text-xs font-semibold leading-5 text-slate-600">
                Daily target: finish one topic, then save the concepts that need revision.
              </p>

              <Link
                href={learningMeta.continueHref || subject.href}
                className="inline-flex w-full justify-center rounded-xl bg-portal-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-portal-700"
              >
                {completionPercent > 0 ? "Continue Learning" : "Start Learning"}
              </Link>

              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <Link
                  href={notesHref}
                  className="inline-flex w-full justify-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Notes
                </Link>
                <Link
                  href={`/practice?search=${encodeURIComponent(subject.search)}`}
                  className="inline-flex w-full justify-center rounded-xl border border-portal-200 bg-white px-3 py-2.5 text-xs font-bold text-portal-700 transition hover:bg-portal-50"
                >
                  Practice
                </Link>
              </div>
            </div>
          </div>
        </section>

        {subject.title === "Network Analysis" && isConceptIntroPage ? (
          <NetworkAnalysisSubjectGuide notesHref={notesHref} />
        ) : null}

        {subject.title === "Network Analysis" && isConceptIntroPage ? null : (
          <SubjectSeoDepthSection
            subject={subject}
            chapterMeta={chapterMeta}
            concepts={concepts}
            learningTopics={learningMeta.learningTopics || []}
            notesHref={notesHref}
          />
        )}

        <section className="mt-5">
          <main className="min-w-0">
            {shouldShowInlineConcept && !isConceptIntroPage ? (
              <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
                <div className="divide-y divide-slate-200">
                {theoryKnowledge.overviewCards.map((item, index) => (
                  <OverviewRow
                    key={item.title}
                    item={item}
                  />
                ))}
                </div>
              </section>
            ) : null}

            {isConceptIntroPage ? (
              <div className="mt-5 flex flex-col justify-end gap-3 sm:flex-row">
                {subject.title === "Network Analysis" ? (
                  <Link
                    href="/basic-concepts"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-portal-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto sm:px-5"
                  >
                    Next Basic Concepts
                  </Link>
                ) : subject.title === "Digital Electronics" ? (
                  <a
                    href="#digital-chapter-1"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-portal-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto sm:px-5"
                  >
                    Start Number Systems
                  </a>
                ) : subject.title === "Electromagnetic Theory" ? (
                  <a
                    href="#electromagnetic-chapter-1"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-portal-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto sm:px-5"
                  >
                    Start Vector Calculus
                  </a>
                ) : subject.title === "VLSI Design" ? (
                  <Link
                    href="/learn/vlsi-design/introduction-to-vlsi-design"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-portal-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto sm:px-5"
                  >
                    Start Introduction to VLSI Design
                  </Link>
                ) : subject.title === "Microprocessors" ? (
                  <button
                    type="button"
                    onClick={() => selectRoadmapTopic(0, "subject-roadmap-top")}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-portal-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto sm:px-5"
                  >
                    Use Chapter Menu
                  </button>
                ) : subject.title === "Embedded Systems" ? (
                  <Link
                    href="/learn/embedded-systems/introduction-to-embedded-systems"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-portal-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto sm:px-5"
                  >
                    Start Introduction to Embedded Systems
                  </Link>
                ) : subject.title === "Digital Signal Processing" ? (
                  <Link
                    href="/learn/dsp/introduction-to-dsp"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-portal-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto sm:px-5"
                  >
                    Start Introduction to DSP
                  </Link>
                ) : subject.title === "Signals and Systems" ? (
                  <Link
                    href="/introduction-to-signals"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-portal-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto sm:px-5"
                  >
                    Start Introduction to Signals
                  </Link>
                ) : subject.title === "Communication Systems" ? (
                  <Link
                    href="/learn/communications/introduction-to-communication-systems"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-portal-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto sm:px-5"
                  >
                    Start Introduction to Communication Systems
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => selectRoadmapTopic(1)}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-portal-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto sm:px-5"
                  >
                    Start First Concept
                  </button>
                )}
              </div>
            ) : null}

            {shouldShowInlineConcept ? (
            <section
              id="subject-concept"
              className="mt-5 rounded-[24px] border border-slate-200 bg-white scroll-mt-40 shadow-panel"
            >
              <div className="px-4 pb-4 pt-4 sm:px-5 lg:px-6">
                {isConceptIntroPage ? (
                  null
                ) : (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-portal-700">
                      Concept {String(activeConceptIndex).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 max-w-3xl text-base font-semibold leading-snug text-slate-950 sm:text-lg">
                      {activeConcept.title}
                    </h2>
                    <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
                      {activeConcept.summary}
                    </p>
                  </>
                )}
              </div>

              {isConceptIntroPage ? null : (
              <>
              <div className="grid gap-5 border-t border-slate-200 px-4 pt-4 sm:px-5 lg:px-6">
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      Core Idea
                    </h3>
                    <div className="mt-2 space-y-2.5">
                      {activeIntuition.map((line, index) => (
                        <p
                          key={`${activeConcept.slug}-intuition-${index}`}
                          className="text-sm leading-6 text-slate-700"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      Step-by-Step Theory
                    </h3>
                    <div className="mt-2 space-y-2.5 text-sm leading-6 text-slate-700">
                      {activeExplanation.map((line, index) => (
                        <p
                          key={`${activeConcept.slug}-explanation-${index}`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      How To Read It In Circuits
                    </h3>
                    <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
                      {activeInterpretation.map((point) => (
                        <li
                          key={`${activeConcept.slug}-interpretation-${point}`}
                          className="flex gap-2"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      Circuit Diagram
                    </h3>
                    <div className="mt-2 max-w-2xl overflow-x-auto rounded-xl border border-slate-100 bg-slate-50/60 p-2">
                      <NetworkTheoryDiagram type={activeConcept.diagram} />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      {activeConcept.diagramNote}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">
                      Key Relation
                    </h3>
                    <div className="mt-2 divide-y divide-slate-200">
                      {activeConcept.formulas.map((formula) => (
                        <div
                          key={`${formula.label}-${formula.expression}`}
                          className="py-2.5 first:pt-0 last:pb-0"
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                            {formula.label}
                          </p>
                          <p className="mt-1.5 text-sm font-bold text-slate-900 sm:text-base">
                            {formula.expression}
                          </p>
                          <p className="mt-1.5 text-xs leading-5 text-slate-600">{formula.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {activeWorkedExample ? (
                <div className="mt-6 border-t border-slate-200 px-4 pt-4 sm:px-5 lg:px-6">
                  <h3 className="text-base font-bold text-slate-900">Worked Example</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                    {activeWorkedExample.prompt}
                  </p>
                  <div className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    {activeWorkedExample.steps?.map((step, index) => (
                      <p
                        key={`${activeConcept.slug}-worked-step-${index}`}
                      >
                        {step}
                      </p>
                    ))}
                  </div>
                  <div className="mt-3 border-l-2 border-portal-400 pl-3">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-portal-700">
                      Final Answer
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-900">
                      {activeWorkedExample.result}
                    </p>
                  </div>
                </div>
              ) : null}

              {activeQuiz ? (
                <div className="mt-6 border-t border-slate-200 px-4 pt-4 sm:px-5 lg:px-6">
                  <h3 className="text-base font-bold text-slate-900">Quick Quiz</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {activeQuiz.question}
                  </p>
                  <div className="mt-3 grid gap-2">
                    {activeQuiz.options.map((option, optionIndex) => {
                      const optionLetter = String.fromCharCode(65 + optionIndex);
                      const isSelected = selectedQuizIndex === optionIndex;
                      const isCorrectOption = optionIndex === activeQuiz.correctIndex;
                      const optionClassName = isSelected
                        ? isCorrectOption
                          ? "text-emerald-800"
                          : "text-amber-800"
                        : "text-slate-700 hover:text-portal-700";

                      return (
                        <button
                          key={`${activeConcept.slug}-quiz-${option}`}
                          type="button"
                          onClick={() =>
                            setQuizSelections((currentValue) => ({
                              ...currentValue,
                              [activeConcept.slug]: optionIndex,
                            }))
                          }
                          className={`flex w-full items-center gap-3 border-b border-slate-200 py-2 text-left text-sm font-medium transition last:border-b-0 ${optionClassName}`}
                        >
                          <span className="w-5 flex-none text-xs font-bold">
                            {optionLetter}
                          </span>
                          <span className="flex-1">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3 border-l-2 border-slate-300 pl-3">
                    <p className="text-sm font-bold text-slate-900">
                      {isQuizAnswered ? (isQuizCorrect ? "Correct" : "Try Again") : "Answer Guide"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {isQuizAnswered
                        ? activeQuiz.explanation
                        : "Choose one option to check your understanding of this concept."}
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 grid gap-4 border-t border-slate-200 px-4 pt-4 lg:grid-cols-2 sm:px-5 lg:px-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Common Mistake</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {activeCommonMistake}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">Real-Life Insight</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {activeRealLifeInsight}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-200 px-4 pt-4 sm:px-5 lg:px-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-portal-700">
                  Next Step
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {activeConceptIndex === concepts.length
                    ? "Finish this chapter, then move to practice questions to reinforce the theory."
                    : `Next Concept -> ${concepts[activeConceptIndex]?.shortTitle}`}
                </p>
              </div>
              </>
              )}

              <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-6">
                <button
                  type="button"
                  onClick={() => setActiveConceptIndex((currentValue) => Math.max(currentValue - 1, 0))}
                  disabled={activeConceptIndex === 0}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  Previous Concept
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveConceptIndex((currentValue) =>
                      Math.min(currentValue + 1, concepts.length)
                    )
                  }
                  disabled={activeConceptIndex === concepts.length}
                  className="w-full rounded-xl bg-portal-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-portal-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {activeConceptIndex === concepts.length
                    ? "Last Concept"
                    : `Next: ${concepts[activeConceptIndex]?.shortTitle}`}
                </button>
              </div>
            </section>
            ) : null}

          </main>

        </section>

        {subject.title === "Network Analysis" && isConceptIntroPage ? null : (
          <>
            <section className="mt-6 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Why Students Search {subject.title} Notes
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                {seo.introParagraph}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {seo.relatedLinks.map((item) => (
                  <Link
                    key={`${item.href}-${item.title}`}
                    href={item.href}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition hover:border-portal-200 hover:bg-portal-50"
                  >
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    {item.summary ? (
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                    ) : null}
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-6 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Important {subject.title} Pages
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                These are the core pages that help students move through the full {subject.title.toLowerCase()}
                preparation journey, from subject overview to notes and topic-wise learning.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <Link
                  href={`/notes/${getSubjectSlug(subject.title)}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition hover:-translate-y-0.5 hover:border-portal-300 hover:bg-white hover:shadow-sm"
                >
                  <span className="rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[11px] font-bold text-portal-700">
                    Notes
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-900">{subject.title} Notes</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Open chapter-wise notes, formula revision, and structured concept summaries.
                  </p>
                </Link>

                <Link
                  href={learningMeta.continueHref || subject.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition hover:-translate-y-0.5 hover:border-portal-300 hover:bg-white hover:shadow-sm"
                >
                  <span className="rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[11px] font-bold text-portal-700">
                    Learn
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-900">{subject.title} Learning Topics</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Go deeper with exam-focused topic pages, explanations, and guided learning flow.
                  </p>
                </Link>

                <Link
                  href={`/search?q=${encodeURIComponent(subject.title)}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition hover:-translate-y-0.5 hover:border-portal-300 hover:bg-white hover:shadow-sm"
                >
                  <span className="rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[11px] font-bold text-portal-700">
                    Search
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-900">Search {subject.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Find formulas, concepts, theory pages, and related content across the site.
                  </p>
                </Link>
              </div>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-portal-700">
                  Popular Searches
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {seo.searchIntents.map((item) => (
                    <Link
                      key={item}
                      href={`/search?q=${encodeURIComponent(item)}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-portal-300 hover:bg-white hover:text-portal-700"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <section className="mt-6 rounded-[30px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {subject.title} FAQ
          </h2>
          <div className="mt-5 grid gap-3">
            {seo.faqItems.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
              >
                <summary className="cursor-pointer text-sm font-bold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-3 left-3 right-3 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur xl:hidden">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <button
            type="button"
            onClick={() => selectRoadmapTopic(0, "subject-roadmap-top")}
            className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Roadmap
          </button>
          {subject.title === "Network Analysis" ? (
            <Link
              href="/circuit-elements"
              className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Theory
            </Link>
          ) : subject.title === "Analog Electronics" ? (
            <Link
              href="/semiconductor-fundamentals"
              className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Theory
            </Link>
          ) : subject.title === "Digital Electronics" ? (
            <a
              href="#digital-chapter-1"
              className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Theory
            </a>
          ) : subject.title === "Electromagnetic Theory" ? (
            <a
              href="#electromagnetic-chapter-1"
              className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Theory
            </a>
          ) : subject.title === "VLSI Design" ? (
            <a
              href="#vlsi-chapter-1"
              className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Theory
            </a>
          ) : subject.title === "Microprocessors" ? (
            <button
              type="button"
              onClick={() => selectRoadmapTopic(0, "subject-roadmap-top")}
              className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Theory
            </button>
          ) : subject.title === "Embedded Systems" ? (
            <button
              type="button"
              onClick={() => selectRoadmapTopic(0, "subject-roadmap-top")}
              className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Theory
            </button>
          ) : subject.title === "Digital Signal Processing" ? (
            <Link
              href="/learn/dsp/introduction-to-dsp"
              className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Theory
            </Link>
          ) : subject.title === "Signals and Systems" ? (
            <Link
              href="/subjects/signals-and-systems"
              className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Theory
            </Link>
          ) : subject.title === "Communication Systems" ? (
            <Link
              href="/subjects/communication-systems"
              className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Theory
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => selectRoadmapTopic(Math.max(activeConceptIndex, 1))}
              className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Theory
            </button>
          )}
          <Link
            href={notesHref}
            className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Notes
          </Link>
          <Link
            href={subject.href}
            className="rounded-2xl px-2 py-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Learn
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: subjectDirectory.map((subject) => ({
      params: { slug: getSubjectSlug(subject.title) },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return getSubjectTheoryProps(params.slug);
}
