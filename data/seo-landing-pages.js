export const seoLandingPages = {
  "gate-ece-pyq": {
    path: "/gate-ece-pyq",
    title: "GATE ECE PYQ PDF + Previous Year Questions + Solutions",
    description:
      "Practice GATE ECE previous year questions with subject-wise links, solved paper paths, formulas, and revision resources for electronics engineering preparation.",
    eyebrow: "GATE ECE PYQ",
    heading: "GATE ECE Previous Year Questions",
    summary:
      "Use this page as the exam-focused entry point for GATE ECE PYQs, solved questions, subject revision, and paper practice.",
    primaryAction: { label: "Open Previous Papers", href: "/previous-year" },
    secondaryAction: { label: "Practice GATE MCQs", href: "/practice/gate" },
    metrics: [
      { label: "Intent", value: "PYQ Practice" },
      { label: "Exam", value: "GATE ECE" },
      { label: "Mode", value: "Subject Wise" },
    ],
    sections: [
      {
        title: "Start With High-Weightage Subjects",
        text: "Begin with Network Analysis, Signals and Systems, Communication Systems, Control Systems, Digital Electronics, and Analog Electronics before moving to the remaining subjects.",
      },
      {
        title: "Use PYQs After Formula Revision",
        text: "Revise formulas first, then solve previous year questions topic by topic. This makes mistakes easier to diagnose.",
      },
      {
        title: "Connect Papers With Notes",
        text: "After each paper session, return to the notes page for the subject where mistakes are repeated.",
      },
    ],
    links: [
      { label: "GATE Practice", href: "/practice/gate" },
      { label: "Previous Year Papers", href: "/previous-year" },
      { label: "Network Analysis Notes", href: "/notes/network-analysis" },
      { label: "Communication Systems Notes", href: "/notes/communication-systems" },
    ],
    keywords:
      "GATE ECE PYQ, GATE ECE previous year questions, GATE ECE question paper, GATE ECE solved questions, electronics PYQ",
  },
  "ece-handwritten-notes": {
    path: "/ece-handwritten-notes",
    title: "ECE Handwritten Notes PDF for GATE ECE + Formulas + PYQs",
    description:
      "Find subject-wise ECE handwritten notes style revision pages with formulas, theory flow, important questions, and previous year question support.",
    eyebrow: "ECE Notes",
    heading: "ECE Handwritten Notes",
    summary:
      "A search-focused notes hub for students looking for handwritten-style ECE notes, concise formulas, and chapter-wise revision.",
    primaryAction: { label: "Browse Notes", href: "/notes" },
    secondaryAction: { label: "Open Formula Pages", href: "/gate-ece-formulas" },
    metrics: [
      { label: "Subjects", value: "12" },
      { label: "Format", value: "Revision" },
      { label: "Focus", value: "GATE ECE" },
    ],
    sections: [
      {
        title: "Subject-Wise Notes",
        text: "Open notes for Network Analysis, Analog Electronics, Digital Electronics, Signals, Communication, EMFT, Control Systems, DSP, VLSI, Microprocessors, Antenna, and Embedded Systems.",
      },
      {
        title: "Formula-First Revision",
        text: "Use each notes page to move from theory to formulas and then into solved examples or PYQ practice.",
      },
      {
        title: "Quick Exam Reading",
        text: "These pages are structured for revision, not long textbook reading, so students can prepare before tests and interviews.",
      },
    ],
    links: [
      { label: "All ECE Notes", href: "/notes" },
      { label: "Network Analysis Notes", href: "/notes/network-analysis" },
      { label: "Digital Electronics Notes", href: "/notes/digital-electronics" },
      { label: "Important Questions", href: "/ece-important-questions" },
    ],
    keywords:
      "ECE handwritten notes, ECE notes PDF, GATE ECE notes, electronics handwritten notes, ECE revision notes",
  },
  "gate-ece-formulas": {
    path: "/gate-ece-formulas",
    title: "GATE ECE Formulas PDF + Subject Wise Formula Revision",
    description:
      "Revise GATE ECE formulas subject wise with links to Network Analysis, Signals, Control Systems, Communication Systems, DSP, Digital Electronics, and more.",
    eyebrow: "Formula Revision",
    heading: "GATE ECE Formulas",
    summary:
      "A formula-first landing page for students who want fast GATE ECE revision before solving questions.",
    primaryAction: { label: "Browse Notes", href: "/notes" },
    secondaryAction: { label: "Solve PYQs", href: "/gate-ece-pyq" },
    metrics: [
      { label: "Intent", value: "Formulas" },
      { label: "Use", value: "Revision" },
      { label: "Exam", value: "GATE ECE" },
    ],
    sections: [
      {
        title: "Circuit and Network Formulas",
        text: "Revise KCL, KVL, Thevenin, Norton, AC circuits, resonance, transient response, and two-port parameters.",
      },
      {
        title: "Signals, Control, and Communication",
        text: "Move through Fourier, Laplace, Z-transform, time response, stability, modulation, noise, and information theory formulas.",
      },
      {
        title: "Device and Digital Formulas",
        text: "Keep diode, BJT, MOSFET, op-amp, Boolean algebra, counters, ADC, DAC, and logic-family formulas close to PYQ practice.",
      },
    ],
    links: [
      { label: "Network Analysis", href: "/notes/network-analysis" },
      { label: "Signals and Systems", href: "/notes/signals-and-systems" },
      { label: "Control Systems", href: "/notes/control-systems" },
      { label: "Communication Systems", href: "/notes/communication-systems" },
    ],
    keywords:
      "GATE ECE formulas, ECE formula sheet, electronics formulas PDF, GATE ECE formula revision, network analysis formulas",
  },
  "network-analysis-pyq": {
    path: "/network-analysis-pyq",
    title: "Network Analysis PYQ for GATE ECE + Formulas + Solutions",
    description:
      "Practice Network Analysis PYQs for GATE ECE with links to circuit laws, network theorems, AC analysis, transients, two-port networks, notes, and formulas.",
    eyebrow: "Network Analysis PYQ",
    heading: "Network Analysis PYQs",
    summary:
      "A dedicated entry point for students searching Network Analysis previous year questions, formulas, and solved circuit practice.",
    primaryAction: { label: "Open Network Notes", href: "/notes/network-analysis" },
    secondaryAction: { label: "Practice Questions", href: "/mcqs/network-analysis" },
    metrics: [
      { label: "Subject", value: "Networks" },
      { label: "Intent", value: "PYQ" },
      { label: "Exam", value: "GATE ECE" },
    ],
    sections: [
      {
        title: "Most Important PYQ Areas",
        text: "Focus on KCL, KVL, nodal analysis, mesh analysis, Thevenin, Norton, superposition, maximum power transfer, resonance, transient response, and two-port networks.",
      },
      {
        title: "Formula Revision Before Solving",
        text: "Network Analysis questions become faster when impedance, source transformation, time constants, and two-port parameter relations are revised first.",
      },
      {
        title: "Move From Topic to Practice",
        text: "Use topic pages for weak areas, then return to MCQs and previous year papers to test speed and accuracy.",
      },
    ],
    links: [
      { label: "Network Analysis Notes", href: "/notes/network-analysis" },
      { label: "Network Theorems", href: "/network-theorems" },
      { label: "Two-Port Networks", href: "/two-port-networks" },
      { label: "Network MCQs", href: "/mcqs/network-analysis" },
    ],
    keywords:
      "Network Analysis PYQ, Network Theory previous year questions, GATE ECE Network Analysis, circuit theory PYQ, network analysis formulas",
  },
  "communication-systems-notes": {
    path: "/communication-systems-notes",
    title: "Communication Systems Notes for GATE ECE PDF + PYQs + Formulas",
    description:
      "Study Communication Systems notes for GATE ECE with AM, FM, PM, sampling, PCM, digital modulation, noise, information theory, receivers, formulas, and PYQ links.",
    eyebrow: "Communication Notes",
    heading: "Communication Systems Notes",
    summary:
      "A high-intent landing page for Communication Systems notes, formulas, PYQs, and topic-wise GATE ECE revision.",
    primaryAction: { label: "Open Full Notes", href: "/notes/communication-systems" },
    secondaryAction: { label: "Open Subject Hub", href: "/subjects/communication-systems" },
    metrics: [
      { label: "Subject", value: "Communication" },
      { label: "Mode", value: "Notes + PYQs" },
      { label: "Exam", value: "GATE ECE" },
    ],
    sections: [
      {
        title: "Analog Communication",
        text: "Revise AM, FM, PM, modulation index, sidebands, bandwidth, demodulation, and receiver basics.",
      },
      {
        title: "Digital Communication",
        text: "Study sampling, quantization, PCM, delta modulation, ASK, FSK, PSK, QPSK, QAM, and constellation ideas.",
      },
      {
        title: "Noise and Information Theory",
        text: "Prepare SNR, noise figure, entropy, information rate, channel capacity, and coding intuition for exam questions.",
      },
    ],
    links: [
      { label: "Communication Notes", href: "/notes/communication-systems" },
      { label: "Communication Subject Hub", href: "/subjects/communication-systems" },
      { label: "Information Theory", href: "/learn/communications/information-theory" },
      { label: "Digital Modulation", href: "/learn/communications/digital-modulation-techniques" },
    ],
    keywords:
      "Communication Systems notes, GATE ECE Communication Systems, communication formulas, AM FM notes, digital communication PYQ",
  },
  "ece-important-questions": {
    path: "/ece-important-questions",
    title: "ECE Important Questions for GATE + PSU + University Exams",
    description:
      "Find ECE important questions by subject with links to MCQs, PYQs, notes, formulas, and practice paths for GATE, PSU, and university exams.",
    eyebrow: "Important Questions",
    heading: "ECE Important Questions",
    summary:
      "Use this page to move quickly into the subjects and question types that matter most for ECE exam preparation.",
    primaryAction: { label: "Practice MCQs", href: "/mcqs" },
    secondaryAction: { label: "Solve Previous Papers", href: "/previous-year" },
    metrics: [
      { label: "Subjects", value: "12" },
      { label: "Practice", value: "MCQ + PYQ" },
      { label: "Exams", value: "GATE + PSU" },
    ],
    sections: [
      {
        title: "Core ECE Question Areas",
        text: "Prioritize Network Analysis, Analog, Digital, Signals, Control, Communication, EMFT, DSP, Microprocessors, VLSI, Antenna, and Embedded Systems.",
      },
      {
        title: "Question Practice Order",
        text: "Start with notes, revise formulas, solve topic-wise MCQs, and then move to previous year papers under timed conditions.",
      },
      {
        title: "Use Mistakes as Revision Signals",
        text: "Repeated mistakes usually point to one missing formula, one weak concept, or one rushed reading habit.",
      },
    ],
    links: [
      { label: "All MCQs", href: "/mcqs" },
      { label: "Previous Year Papers", href: "/previous-year" },
      { label: "GATE ECE PYQ", href: "/gate-ece-pyq" },
      { label: "Formula Revision", href: "/gate-ece-formulas" },
    ],
    keywords:
      "ECE important questions, GATE ECE important questions, ECE MCQ, ECE previous year questions, electronics important questions",
  },
};

export const seoLandingPageRoutes = Object.values(seoLandingPages).map((page) => page.path);
