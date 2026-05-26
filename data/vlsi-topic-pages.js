const vlsiTopics = [
  {
    slug: "introduction-to-vlsi-design",
    title: "Introduction to VLSI Design",
    summary: "Understand SSI to VLSI evolution, chip scaling, IC design flow, Moore's Law, and the path from specification to silicon.",
    concepts: ["SSI to VLSI", "Moore's Law", "IC design flow", "Frontend to fabrication"],
    subtopics: ["SSI, MSI, LSI, VLSI, ULSI", "Moore's Law", "Design specification", "Frontend, backend, fabrication, testing"],
    formula: { label: "Design flow", expression: "specification -> RTL -> verification -> layout -> fabrication -> testing", note: "Most VLSI projects move from behavior to physical silicon through this chain." },
    visualFocus: "chip integration growth and frontend-to-fabrication flow",
    visualType: "chip-scaling",
  },
  {
    slug: "mos-transistor-basics",
    title: "MOS Transistor Basics",
    summary: "Build intuition for NMOS and PMOS structure, gate-source voltage, channel formation, current flow, and operating regions.",
    concepts: ["NMOS", "PMOS", "VGS", "Cutoff, linear, saturation"],
    subtopics: ["MOS structure", "Threshold voltage", "Channel formation", "Operating regions"],
    formula: { label: "Region check", expression: "cutoff: VGS < VT, saturation: VDS >= VGS - VT", note: "Region identification is the first step in MOS current questions." },
    visualFocus: "gate voltage creating a channel and controlling drain current",
    visualType: "transistor",
  },
  {
    slug: "cmos-logic-design",
    title: "CMOS Logic Design",
    summary: "Study CMOS inverter action, pull-up and pull-down networks, NAND/NOR logic, and static CMOS switching intuition.",
    concepts: ["CMOS inverter", "Pull-up network", "Pull-down network", "NAND and NOR"],
    subtopics: ["Inverter switching", "PUN and PDN", "Static CMOS", "NAND/NOR operation"],
    formula: { label: "CMOS idea", expression: "PUN ON when output should be 1, PDN ON when output should be 0", note: "Complementary networks explain most static CMOS gates." },
    visualFocus: "input transition through pull-up and pull-down networks",
    visualType: "cmos-logic",
  },
  {
    slug: "cmos-fabrication-technology",
    title: "CMOS Fabrication Technology",
    summary: "Follow wafer processing through oxidation, lithography, diffusion/implantation, deposition, etching, and well formation.",
    concepts: ["Wafer", "Oxidation", "Lithography", "N-well and P-well"],
    subtopics: ["Wafer cleaning", "Oxide growth", "Photoresist patterning", "Diffusion and implantation"],
    formula: { label: "Process flow", expression: "wafer -> oxide -> lithography -> doping -> layers -> contacts", note: "Fabrication is repeated patterning plus material modification." },
    visualFocus: "layer-by-layer CMOS fabrication on a wafer",
    visualType: "fabrication",
  },
  {
    slug: "vlsi-design-styles",
    title: "VLSI Design Styles",
    summary: "Compare full-custom, semi-custom, standard-cell, gate-array, FPGA, and ASIC design tradeoffs.",
    concepts: ["Full custom", "Standard cell", "FPGA", "Area vs flexibility"],
    subtopics: ["Full custom design", "Semi-custom design", "Standard cells", "FPGA architecture"],
    formula: { label: "Tradeoff", expression: "customization up -> area efficiency up, design time up", note: "Higher customization usually improves silicon efficiency but costs more effort." },
    visualFocus: "design abstraction and area-flexibility tradeoff",
    visualType: "style-comparison",
  },
  {
    slug: "stick-diagrams-and-layout-design",
    title: "Stick Diagrams and Layout Design",
    summary: "Connect stick diagrams, lambda rules, metal/polysilicon/diffusion layers, contacts, and layout-to-circuit reasoning.",
    concepts: ["Stick diagram", "Lambda rule", "Polysilicon", "Metal routing"],
    subtopics: ["Layer colors", "Layout rules", "Contacts", "Circuit-to-layout relation"],
    formula: { label: "Lambda rule", expression: "layout dimensions are expressed as multiples of lambda", note: "Lambda rules make scalable layout constraints easier to remember." },
    visualFocus: "stick diagram layers turning into a physical layout",
    visualType: "layout",
  },
  {
    slug: "combinational-circuit-design",
    title: "Combinational Circuit Design",
    summary: "Revise CMOS gate construction, adders, multiplexers, decoders, and input-output signal flow in combinational logic.",
    concepts: ["CMOS gates", "Adder", "MUX", "Decoder"],
    subtopics: ["CMOS logic gates", "Half adder and full adder", "Multiplexer", "Decoder"],
    formula: { label: "Half adder", expression: "sum = A xor B, carry = AB", note: "Adder logic is a useful anchor for combinational VLSI design." },
    visualFocus: "input selection and output formation through logic blocks",
    visualType: "signal-flow",
  },
  {
    slug: "sequential-circuit-design",
    title: "Sequential Circuit Design",
    summary: "Understand flip-flop timing, registers, counters, clock synchronization, and memory element behavior.",
    concepts: ["Flip-flop", "Register", "Counter", "Clock"],
    subtopics: ["D flip-flop", "Setup and hold", "Register operation", "Counter state transitions"],
    formula: { label: "Timing check", expression: "Tclk >= tCQ + tlogic + tsetup", note: "Synchronous circuits work only when timing constraints are satisfied." },
    visualFocus: "clocked storage and state transitions",
    visualType: "sequential",
  },
  {
    slug: "vlsi-interconnects-and-scaling",
    title: "VLSI Interconnects and Scaling",
    summary: "See how wire resistance, capacitance, propagation delay, short-channel effects, and scaling affect speed and power.",
    concepts: ["RC delay", "Capacitance", "Scaling", "Short-channel effects"],
    subtopics: ["Interconnect delay", "Resistance and capacitance", "Technology scaling", "Power-delay tradeoff"],
    formula: { label: "Delay intuition", expression: "delay roughly follows R x C", note: "In deep submicron VLSI, wires can dominate delay as much as gates." },
    visualFocus: "signal delay through distributed interconnect capacitance and resistance",
    visualType: "interconnect",
  },
  {
    slug: "testing-and-verification",
    title: "Testing and Verification",
    summary: "Study fault detection, scan chains, BIST, functional verification, physical verification, and error detection flow.",
    concepts: ["Fault model", "Scan chain", "BIST", "Verification"],
    subtopics: ["Stuck-at faults", "Scan testing", "Built-In Self-Test", "Functional vs physical verification"],
    formula: { label: "Test flow", expression: "apply pattern -> capture response -> compare expected output", note: "Testing checks manufactured silicon; verification checks design correctness before fabrication." },
    visualFocus: "fault detection through scan chain and response comparison",
    visualType: "test-flow",
  },
  {
    slug: "hdl-and-vlsi-automation-basics",
    title: "HDL and VLSI Automation Basics",
    summary: "Connect Verilog/VHDL, RTL modeling, simulation, synthesis, gate-level netlists, and CAD automation.",
    concepts: ["Verilog/VHDL", "RTL", "Synthesis", "CAD flow"],
    subtopics: ["HDL workflow", "RTL design", "Simulation", "Synthesis and automation"],
    formula: { label: "Automation flow", expression: "HDL -> simulation -> synthesis -> netlist -> place and route", note: "EDA tools translate design intent into a manufacturable implementation." },
    visualFocus: "RTL-to-gate-level transformation through automation tools",
    visualType: "hdl-flow",
  },
];

function topicDetail(topic, index) {
  const previous = vlsiTopics[index - 1];
  const next = vlsiTopics[index + 1];

  return {
    shortTitle: topic.title,
    metaTitle: `${topic.title} GATE ECE VLSI Notes + CMOS Formulas + PYQs`,
    metaDescription: `Learn ${topic.title} for GATE ECE, PSU exams, university semiconductor design notes, and VLSI interview questions with intuition, formulas, examples, and animated visualization.`,
    keywords:
      "GATE VLSI notes, CMOS design tutorial, VLSI interview questions, VLSI design for PSU, semiconductor design notes",
    coreQuestion: `What is the practical VLSI intuition behind ${topic.title}?`,
    examFocus: topic.concepts.slice(0, 3).join(", "),
    engineeringUse:
      "Used in CMOS digital ICs, ASICs, SoCs, microprocessors, memories, FPGA prototypes, and low-power semiconductor design.",
    intro: [
      `${topic.title} is a core VLSI Design topic because it links device behavior, circuit logic, physical layout, and manufacturable silicon.`,
      "For GATE ECE, PSU exams, university semester learning, and interview revision, study the concept as a flow: what controls what, what changes physically, and what the examiner is likely to test.",
    ],
    intuition:
      `Think of ${topic.title} as one part of the silicon story. A good VLSI answer usually connects the electrical idea with layout, timing, power, fabrication, or verification consequences.`,
    learningGoals: [
      `Build beginner-friendly intuition for ${topic.title}.`,
      "Connect the visual flow with GATE-style objective and numerical questions.",
      "Remember the labels, signals, and constraints that commonly appear in VLSI interviews.",
    ],
    keyConcepts: topic.concepts,
    theoryCards: [
      { title: "Core idea", detail: topic.summary },
      {
        title: "How to read exam questions",
        detail:
          "Identify whether the question is about device operation, logic behavior, layout rules, delay, power, testing, or design flow before applying a formula.",
      },
      {
        title: "Visualization focus",
        detail: `The animation highlights ${topic.visualFocus}, so the chapter feels like an engineering process rather than isolated definitions.`,
      },
      {
        title: "Revision mindset",
        detail:
          "Keep one circuit-level intuition and one physical-design consequence for every VLSI chapter.",
      },
    ],
    formulas: [topic.formula],
    examples: [
      {
        title: `${topic.title} exam check`,
        prompt: `A VLSI question asks about ${topic.title}. What is the safest first step?`,
        steps: [
          "Classify the question as device, logic, layout, fabrication, timing, testing, or automation.",
          `Recall the anchor relation: ${topic.formula.expression}.`,
          "Map every label in the diagram to a signal, layer, device terminal, or design stage before solving.",
        ],
        answer:
          "Start from the physical or signal-flow interpretation, then use the relevant formula or rule. This prevents blind memorization errors.",
      },
    ],
    examPointers: [
      "Draw the smallest useful diagram before solving a VLSI concept question.",
      "Track whether the topic is operating at device, gate, layout, chip, or tool-flow level.",
      "Use the visualization as a quick revision cue before attempting previous-year questions.",
    ],
    commonMistakes: [
      "Memorizing terms without connecting them to current flow, switching, layout, delay, or fabrication.",
      "Mixing transistor-level CMOS logic with abstract Boolean-gate symbols.",
      "Ignoring physical effects such as capacitance, layout rules, or process steps in design-flow questions.",
    ],
    quickRevision: [
      topic.formula.note,
      `High-yield terms: ${topic.concepts.join(", ")}.`,
      "Practice one diagram-based question and one conceptual MCQ after revision.",
    ],
    insightSummary:
      `${topic.title} becomes easier when you read the diagram as a sequence of signal, device, layer, or tool-flow changes.`,
    relatedTopics: [previous, next]
      .filter(Boolean)
      .map((item) => ({ subjectSlug: "vlsi-design", topicSlug: item.slug })),
  };
}

export const vlsiLearningSubject = {
  slug: "vlsi-design",
  name: "VLSI Design",
  weightage: "6-8 marks",
  description:
    "Study MOS devices, CMOS logic, fabrication, layout, design styles, interconnects, testing, verification, HDL, and CAD automation for GATE and PSU exams.",
  chapters: vlsiTopics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    topics: [
      {
        slug: topic.slug,
        title: topic.title,
        summary: topic.summary,
        estimatedTime: "35 min",
        status: "ready",
        concepts: topic.concepts,
        subtopics: topic.subtopics,
      },
    ],
  })),
};

export const vlsiTopicPageMap = vlsiTopics.reduce((pages, topic, index) => {
  pages[topic.slug] = topicDetail(topic, index);
  return pages;
}, {});

export { vlsiTopics };
