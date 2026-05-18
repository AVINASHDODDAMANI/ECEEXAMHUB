const blockDiagramAndSignalFlowGraph = {
  "slug": "block-diagram-and-signal-flow-graph",
  "title": "Block Diagram and Signal Flow Graph",
  "summary": "Block diagrams and signal flow graphs represent complex control systems visually so their overall transfer function can be found systematically.",
  "coreQuestion": "How do we simplify interconnected control-system blocks into one equivalent transfer function?",
  "examFocus": "Block reduction, summing points, takeoff points, signal flow graph, Mason's gain formula.",
  "engineeringUse": "Feedback control architecture, servo systems, electronics control loops, automation diagrams.",
  "keywords": "block diagram reduction, signal flow graph, Mason gain formula, control systems GATE",
  "intro": [
    "Control systems often contain many connected blocks: controller, plant, sensor, feedback path, and disturbance paths.",
    "Block diagrams and signal flow graphs help us simplify this network without losing the input-output relationship."
  ],
  "why": [
    "They make feedback systems visually understandable.",
    "They reduce complex loops into equivalent transfer functions.",
    "They are fast scoring in GATE and PSU numerical problems."
  ],
  "prerequisites": [
    "Transfer function basics.",
    "Open-loop and closed-loop feedback.",
    "Basic algebra.",
    "Understanding of summing and branching signals."
  ],
  "intuition": "A block diagram is like a route map for signals. Each block changes the signal, and each loop shows how information returns for correction.",
  "coreTheory": [
    {
      "title": "Series blocks",
      "formula": "$$G_{eq}=G_1G_2$$",
      "detail": "When blocks are cascaded, their effects multiply."
    },
    {
      "title": "Parallel blocks",
      "formula": "$$G_{eq}=G_1+G_2$$",
      "detail": "Parallel paths add at the summing junction."
    },
    {
      "title": "Mason's gain formula",
      "formula": "$$T=\\frac{\\sum P_k\\Delta_k}{\\Delta}$$",
      "detail": "Signal flow graph gain is found from forward paths and loops."
    }
  ],
  "workingSteps": [
    "Identify series, parallel, and feedback structures.",
    "Reduce simple blocks first.",
    "Move summing or takeoff points only with correct gain adjustment.",
    "For signal flow graphs, list forward paths and loops, then apply Mason's formula."
  ],
  "formulas": [
    [
      "Negative feedback",
      "$$T(s)=\\frac{G(s)}{1+G(s)H(s)}$$",
      "Feedback appears in the denominator."
    ],
    [
      "Positive feedback",
      "$$T(s)=\\frac{G(s)}{1-G(s)H(s)}$$",
      "Positive feedback uses a minus sign in the denominator."
    ],
    [
      "Mason's formula",
      "$$T=\\frac{\\sum P_k\\Delta_k}{\\Delta}$$",
      "Useful when block reduction becomes messy."
    ]
  ],
  "diagram": "Block Diagram and Signal Flow Graph Diagram Here",
  "animation": "Animated Block Diagram Reduction Visualization",
  "applications": [
    "Servo control loops.",
    "AVR block diagrams.",
    "Industrial process control.",
    "Robotics signal chains.",
    "Communication control loops."
  ],
  "examples": [
    [
      "Unity feedback",
      "Find closed-loop transfer for forward path G(s).",
      "$$T(s)=\\frac{G(s)}{1+G(s)}$$"
    ],
    [
      "Series blocks",
      "Two cascaded blocks have gains 5 and 1/(s+2).",
      "$$G_{eq}=\\frac{5}{s+2}$$"
    ]
  ],
  "mistakes": [
    "Changing summing point location without changing gain.",
    "Using positive feedback formula for negative feedback.",
    "Missing non-touching loops in Mason's formula.",
    "Reducing blocks before checking signal direction."
  ],
  "interview": [
    "What is a block diagram?",
    "What is a signal flow graph?",
    "State Mason's gain formula.",
    "What are touching and non-touching loops?",
    "How do you reduce a feedback loop?"
  ],
  "examNotes": [
    "Feedback sign is the most common trap.",
    "List all loops before applying Mason's formula.",
    "For simple systems, block reduction is faster than SFG.",
    "For complex multi-loop systems, Mason's formula is often cleaner."
  ],
  "practice": [
    "Reduce a unity feedback system with G(s)=10/(s+1).",
    "Find equivalent gain of two parallel blocks.",
    "Apply Mason's formula to a two-loop SFG.",
    "Move a summing point before a block and write the corrected gain."
  ],
  "subjectSlug": "control-systems",
  "concepts": [],
  "subtopics": [],
  "editMeta": {
    "subject": "Control Systems",
    "chapter": "Block Diagram and Signal Flow Graph",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default blockDiagramAndSignalFlowGraph;
