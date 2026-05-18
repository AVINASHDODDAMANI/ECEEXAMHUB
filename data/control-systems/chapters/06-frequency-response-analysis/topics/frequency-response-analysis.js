const frequencyResponseAnalysis = {
  "slug": "frequency-response-analysis",
  "title": "Frequency Response Analysis",
  "summary": "Frequency response analysis studies system behavior under sinusoidal inputs and uses plots such as Bode, polar, and Nyquist to judge stability and performance.",
  "coreQuestion": "How does the system respond to different input frequencies?",
  "examFocus": "Bode plot, polar plot, Nyquist plot, gain margin, phase margin.",
  "engineeringUse": "Robust controller design, amplifier stability, servo loops, filter-like control behavior.",
  "keywords": "frequency response analysis, Bode plot, Nyquist plot, gain margin, phase margin, GATE control systems",
  "intro": [
    "Time response shows what happens after a test input. Frequency response shows how the system reacts to sinusoidal inputs over a range of frequencies.",
    "This view is powerful because real disturbances and commands often contain many frequency components."
  ],
  "why": [
    "It reveals bandwidth and speed.",
    "It measures relative stability using margins.",
    "It supports robust controller design."
  ],
  "prerequisites": [
    "Transfer functions.",
    "Complex numbers.",
    "Sinusoidal steady-state response.",
    "Logarithms and decibels."
  ],
  "intuition": "Frequency response is like testing a suspension with slow bumps, medium vibrations, and fast vibrations to see which ones pass through strongly.",
  "coreTheory": [
    {
      "title": "Frequency response",
      "formula": "$$G(j\\omega)=G(s)|_{s=j\\omega}$$",
      "detail": "Evaluate transfer function on the imaginary axis."
    },
    {
      "title": "Magnitude in dB",
      "formula": "$$20\\log_{10}|G(j\\omega)|$$",
      "detail": "Bode magnitude uses decibels for easier multiplication and scaling."
    },
    {
      "title": "Phase margin",
      "formula": "$$PM=180^\\circ+\\angle G(j\\omega_{gc})$$",
      "detail": "Phase margin indicates how far the system is from instability at gain crossover."
    }
  ],
  "workingSteps": [
    "Substitute s=j omega.",
    "Find magnitude and phase.",
    "Draw or read Bode, polar, or Nyquist plot.",
    "Determine gain margin and phase margin."
  ],
  "formulas": [
    [
      "Gain crossover",
      "$$|G(j\\omega_{gc})|=1$$",
      "Frequency where magnitude is 0 dB."
    ],
    [
      "Phase crossover",
      "$$\\angle G(j\\omega_{pc})=-180^\\circ$$",
      "Frequency where phase reaches -180 degrees."
    ],
    [
      "Gain margin",
      "$$GM=\\frac{1}{|G(j\\omega_{pc})|}$$",
      "Gain increase possible before instability."
    ]
  ],
  "diagram": "Bode Plot Nyquist Plot Gain Margin Phase Margin Diagram Here",
  "animation": "Animated Bode Plot Frequency Sweep Visualization",
  "applications": [
    "Controller robustness.",
    "Servo bandwidth design.",
    "Amplifier feedback stability.",
    "Power electronics compensation.",
    "Mechanical vibration control."
  ],
  "examples": [
    [
      "dB conversion",
      "If magnitude is 10.",
      "$$20\\log_{10}(10)=20\\ dB$$"
    ],
    [
      "Phase margin",
      "If phase at gain crossover is -135 degrees.",
      "$$PM=180-135=45^\\circ$$"
    ]
  ],
  "mistakes": [
    "Confusing gain crossover with phase crossover.",
    "Using 10 log instead of 20 log for voltage or transfer magnitude.",
    "Ignoring phase margin while checking bandwidth.",
    "Reading Bode slopes without corner frequencies."
  ],
  "interview": [
    "What is frequency response?",
    "What is Bode plot?",
    "Define gain margin and phase margin.",
    "Why is Nyquist plot important?",
    "What does bandwidth mean in control systems?"
  ],
  "examNotes": [
    "Magnitude crossover is 0 dB.",
    "Phase crossover is -180 degrees.",
    "Positive margins usually indicate relative stability.",
    "Bode plots are high-yield in GATE."
  ],
  "practice": [
    "Convert magnitude 0.1 to dB.",
    "Find phase margin from phase -150 degrees at gain crossover.",
    "Identify low-frequency and high-frequency asymptotes.",
    "Explain Nyquist stability idea qualitatively."
  ],
  "subjectSlug": "control-systems",
  "concepts": [],
  "subtopics": [],
  "editMeta": {
    "subject": "Control Systems",
    "chapter": "Frequency Response Analysis",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default frequencyResponseAnalysis;
