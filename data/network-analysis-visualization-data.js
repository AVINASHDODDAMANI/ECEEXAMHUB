export const networkAnalysisVisualizations = [
  {
    slug: "basics-electrical-networks",
    topicNumber: "01",
    title: "Basics of Electrical Networks",
    subtitle: "See current, voltage, resistance, and power as one connected circuit story.",
    ariaLabel: "Animated visualization for basics of electrical networks",
    mode: "flow",
    labels: ["Current I", "Voltage V", "Resistance R", "Power P"],
    intuition:
      "A source creates a potential difference, current moves through the closed path, and elements either absorb, store, or deliver energy.",
    steps: [
      { title: "Source creates voltage", detail: "The voltage source sets the electrical push across the circuit terminals." },
      { title: "Current flows", detail: "Charge moves only when a closed conducting path exists." },
      { title: "Element responds", detail: "Resistance creates voltage drop and power dissipation." },
      { title: "Laws organize it", detail: "KCL balances current at nodes and KVL balances voltage around loops." },
    ],
    takeaway: "For GATE/PSU, mark current direction and voltage polarity before writing any equation.",
  },
  {
    slug: "circuit-analysis-techniques",
    topicNumber: "02",
    title: "Circuit Analysis Techniques",
    subtitle: "Compare node voltage, mesh current, source transformation, and star-delta simplification.",
    ariaLabel: "Animated visualization for circuit analysis techniques",
    mode: "mesh",
    labels: ["Node V", "Mesh I", "Source transform", "Y-Delta"],
    intuition:
      "Choose the method that reduces unknowns fastest: node voltage for node potentials, mesh current for loop currents, and transformations for circuit shape.",
    steps: [
      { title: "Pick variables", detail: "Use node voltages or mesh currents based on circuit structure." },
      { title: "Write equations", detail: "Apply KCL for nodes or KVL for meshes with consistent signs." },
      { title: "Transform sources", detail: "Convert source forms when it makes series-parallel reduction easier." },
      { title: "Simplify geometry", detail: "Use star-delta when no direct series or parallel path is visible." },
    ],
    takeaway: "Most exam circuits become short when you choose the right analysis form first.",
  },
  {
    slug: "superposition-theorem",
    topicNumber: "03",
    title: "Superposition Theorem",
    subtitle: "Activate one independent source at a time and add the individual responses.",
    ariaLabel: "Animated visualization for superposition theorem",
    mode: "sources",
    labels: ["Source 1", "Source 2", "Partial current", "Total response"],
    intuition:
      "In a linear circuit, each independent source contributes part of the final voltage or current.",
    steps: [
      { title: "Keep one source active", detail: "Analyze the circuit with only one independent source operating." },
      { title: "Deactivate others", detail: "Short ideal voltage sources and open ideal current sources." },
      { title: "Find contribution", detail: "Calculate the chosen branch voltage or current for that source." },
      { title: "Add algebraically", detail: "Combine all contributions with sign and direction." },
    ],
    takeaway: "Use superposition for voltage/current, not direct power addition.",
  },
  {
    slug: "thevenin-theorem",
    topicNumber: "04",
    title: "Thevenin's Theorem",
    subtitle: "Collapse a complex two-terminal network into one voltage source and one series resistance.",
    ariaLabel: "Animated visualization for Thevenin theorem",
    mode: "transform",
    labels: ["Vth", "Rth", "Load", "Equivalent circuit"],
    intuition:
      "A load does not need to know the full internal circuit; it only sees terminal voltage and resistance.",
    steps: [
      { title: "Remove the load", detail: "Open the load terminals and identify the output pair." },
      { title: "Find Vth", detail: "Measure or calculate the open-circuit voltage." },
      { title: "Find Rth", detail: "Look back into the network after handling sources correctly." },
      { title: "Reconnect load", detail: "Solve the simplified source-resistor-load circuit." },
    ],
    takeaway: "Thevenin is high-yield when load value changes or load current is asked.",
  },
  {
    slug: "norton-theorem",
    topicNumber: "05",
    title: "Norton's Theorem",
    subtitle: "Represent the same terminal behavior as a current source with parallel resistance.",
    ariaLabel: "Animated visualization for Norton theorem",
    mode: "norton",
    labels: ["In", "Rn", "Short-circuit current", "Parallel network"],
    intuition:
      "Norton is the current-source form of the same two-terminal equivalent used by Thevenin.",
    steps: [
      { title: "Remove the load", detail: "Keep the same output terminals as the reference." },
      { title: "Short the terminals", detail: "Calculate the current through the short circuit." },
      { title: "Find Rn", detail: "Use the same equivalent resistance as Thevenin for the same network." },
      { title: "Use current division", detail: "Reconnect the load and solve the parallel form." },
    ],
    takeaway: "Thevenin and Norton are interchangeable: Vth = In x Rth.",
  },
  {
    slug: "maximum-power-transfer",
    topicNumber: "06",
    title: "Maximum Power Transfer Theorem",
    subtitle: "Watch load power rise, peak, and fall as load resistance changes.",
    ariaLabel: "Animated visualization for maximum power transfer theorem",
    mode: "power",
    labels: ["R_L", "R_th", "P_load", "Peak power"],
    intuition:
      "The load receives maximum power when its resistance matches the source-side Thevenin resistance.",
    steps: [
      { title: "Find Thevenin network", detail: "Reduce the source side to Vth and Rth." },
      { title: "Vary load", detail: "Observe how load voltage and current trade off." },
      { title: "Match resistance", detail: "Power peaks when R_L equals R_th in DC resistive circuits." },
      { title: "Check efficiency", detail: "Maximum power transfer is not maximum efficiency." },
    ],
    takeaway: "For AC, maximum power occurs with conjugate impedance matching.",
  },
  {
    slug: "reciprocity-theorem",
    topicNumber: "07",
    title: "Reciprocity Theorem",
    subtitle: "Swap source and response positions in a linear bilateral network.",
    ariaLabel: "Animated visualization for reciprocity theorem",
    mode: "swap",
    labels: ["Source branch", "Response branch", "Bilateral path", "Same response"],
    intuition:
      "Some passive linear networks behave symmetrically when excitation and measurement points are interchanged.",
    steps: [
      { title: "Apply a source", detail: "Place a source in one branch of a linear bilateral network." },
      { title: "Measure response", detail: "Record current or voltage in another branch." },
      { title: "Swap positions", detail: "Move the same source to the response branch." },
      { title: "Compare response", detail: "The corresponding response remains equal under valid conditions." },
    ],
    takeaway: "Do not apply reciprocity blindly to unilateral or non-linear circuits.",
  },
  {
    slug: "millman-theorem",
    topicNumber: "08",
    title: "Millman's Theorem",
    subtitle: "Combine parallel source branches into one equivalent node voltage.",
    ariaLabel: "Animated visualization for Millman's theorem",
    mode: "parallel",
    labels: ["Branch sources", "Conductance", "Node voltage", "Equivalent source"],
    intuition:
      "Each parallel source branch pulls the common node toward its own voltage according to branch conductance.",
    steps: [
      { title: "Identify branches", detail: "Find voltage sources with series resistances connected in parallel." },
      { title: "Weight by conductance", detail: "Lower resistance means stronger influence on node voltage." },
      { title: "Calculate equivalent", detail: "Use the weighted voltage over total conductance." },
      { title: "Replace network", detail: "Use one equivalent source for faster solving." },
    ],
    takeaway: "Millman is a node-voltage shortcut for parallel source networks.",
  },
  {
    slug: "compensation-substitution",
    topicNumber: "09",
    title: "Compensation and Substitution Theorems",
    subtitle: "See how a changed element can be represented by an equivalent correction.",
    ariaLabel: "Animated visualization for compensation and substitution theorems",
    mode: "correction",
    labels: ["Changed R", "Delta I", "Correction source", "Equivalent replacement"],
    intuition:
      "When part of a circuit changes, compensation helps track the resulting current redistribution without resolving everything from scratch.",
    steps: [
      { title: "Start from original current", detail: "Know the branch current before the element changes." },
      { title: "Change resistance", detail: "A resistance change disturbs branch current and voltages." },
      { title: "Add compensation", detail: "Represent the change with a correction source." },
      { title: "Substitute equivalent", detail: "Replace a branch by another element with the same voltage-current behavior." },
    ],
    takeaway: "These theorems are useful for sensitivity, correction, and equivalent replacement reasoning.",
  },
  {
    slug: "tellegen-duality",
    topicNumber: "10",
    title: "Tellegen's Theorem and Duality",
    subtitle: "Connect power balance with voltage-current dual network thinking.",
    ariaLabel: "Animated visualization for Tellegen theorem and duality",
    mode: "balance",
    labels: ["Power supplied", "Power absorbed", "Dual voltage", "Dual current"],
    intuition:
      "Tellegen expresses conservation of energy in network form: total instantaneous power balance must hold.",
    steps: [
      { title: "Assign branch variables", detail: "Use branch voltages and currents with consistent reference directions." },
      { title: "Compute power", detail: "Each branch has instantaneous power v times i." },
      { title: "Balance network", detail: "Total supplied power equals total absorbed power." },
      { title: "Read duality", detail: "Voltage-current and series-parallel pairs can map into dual networks." },
    ],
    takeaway: "Tellegen is a powerful check on signs, reference directions, and energy conservation.",
  },
  {
    slug: "applications-network-theorems",
    topicNumber: "11",
    title: "Applications of Network Theorems",
    subtitle: "Use theorem selection as a practical engineering workflow.",
    ariaLabel: "Animated visualization for applications of network theorems",
    mode: "applications",
    labels: ["DC analysis", "AC analysis", "Power systems", "Electronics"],
    intuition:
      "Network theorems are not isolated formulas; they are tools for simplifying real circuits before solving or troubleshooting.",
    steps: [
      { title: "Simplify DC networks", detail: "Use equivalents to reduce resistor-source networks quickly." },
      { title: "Handle AC circuits", detail: "Use impedance and phasor equivalents for sinusoidal steady state." },
      { title: "Model power systems", detail: "Equivalent networks help study load behavior and fault conditions." },
      { title: "Debug electronics", detail: "Thevenin, Norton, and superposition help isolate circuit sections." },
    ],
    takeaway: "In exams and interviews, first identify what the load sees, then choose the theorem.",
  },
];

export const networkAnalysisVisualizationFaqs = [
  {
    question: "How should I use these Network Theorems visualizations for GATE?",
    answer:
      "Use the animation to understand what changes physically, then revise the formula and solve one numerical problem immediately. This connects intuition with exam speed.",
  },
  {
    question: "Are Thevenin and Norton theorem different topics?",
    answer:
      "They are two equivalent forms of the same two-terminal behavior. Thevenin uses a voltage source in series with resistance, while Norton uses a current source in parallel with resistance.",
  },
  {
    question: "Which Network Analysis theorem is most important for PSU exams?",
    answer:
      "Thevenin, Norton, Superposition, Maximum Power Transfer, source transformation, and node-mesh analysis are the highest-yield areas for most PSU and GATE-style electrical circuit analysis.",
  },
];

export function getNetworkAnalysisVisualization(slug) {
  return networkAnalysisVisualizations.find((visual) => visual.slug === slug);
}
