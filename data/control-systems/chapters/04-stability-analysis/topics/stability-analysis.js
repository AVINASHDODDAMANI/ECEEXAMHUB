const stabilityAnalysis = {
  "slug": "stability-analysis",
  "title": "Stability Analysis",
  "summary": "Stability analysis checks whether a control system output remains bounded and eventually settles instead of growing uncontrollably.",
  "coreQuestion": "Will the system remain under control for bounded inputs and disturbances?",
  "examFocus": "Concept of stability, Routh-Hurwitz criterion, relative stability, root locations.",
  "engineeringUse": "Aerospace, power systems, motor drives, industrial loops, safety-critical automation.",
  "keywords": "stability analysis, Routh Hurwitz criterion, relative stability, root locations, GATE control systems",
  "intro": [
    "A control system that is accurate but unstable is unusable. Stability is the first safety requirement.",
    "Stability analysis tells whether natural response dies out, stays sustained, or grows."
  ],
  "why": [
    "It prevents unsafe oscillations and runaway output.",
    "It determines whether controller design is acceptable.",
    "It is one of the highest-weightage GATE Control Systems topics."
  ],
  "prerequisites": [
    "Characteristic equation.",
    "Poles of transfer function.",
    "Laplace Transform.",
    "Basic determinant/algebra skills."
  ],
  "intuition": "A stable system is like a disturbed pendulum that eventually calms down. An unstable system keeps growing away from the desired condition.",
  "coreTheory": [
    {
      "title": "Characteristic equation",
      "formula": "$$1+G(s)H(s)=0$$",
      "detail": "Closed-loop pole locations come from the characteristic equation."
    },
    {
      "title": "Stability condition",
      "formula": "$$Re(p_i)<0$$",
      "detail": "For continuous-time systems, all poles must lie in the left half-plane."
    },
    {
      "title": "Routh-Hurwitz criterion",
      "formula": "$$No.\\ of\\ sign\\ changes = No.\\ of\\ RHP\\ poles$$",
      "detail": "Routh array finds right-half-plane poles without solving roots."
    }
  ],
  "workingSteps": [
    "Write characteristic equation.",
    "Form Routh array.",
    "Check first-column sign changes.",
    "Use pole-location interpretation for stability and relative stability."
  ],
  "formulas": [
    [
      "Closed-loop characteristic equation",
      "$$1+G(s)H(s)=0$$",
      "Determines closed-loop poles."
    ],
    [
      "Stable CT condition",
      "$$All\\ poles\\ in\\ LHP$$",
      "Natural response decays."
    ],
    [
      "Marginal stability",
      "$$Poles\\ on\\ j\\omega\\ axis\\ with\\ no\\ repetition$$",
      "Sustained oscillation may occur."
    ]
  ],
  "diagram": "S-Plane Stability Region Diagram Here",
  "animation": "Animated Pole Movement and Stability Visualization",
  "applications": [
    "Aircraft control.",
    "Power grid stabilizers.",
    "Industrial process loops.",
    "Robot balance systems.",
    "High-gain amplifier feedback."
  ],
  "examples": [
    [
      "Pole check",
      "Poles at -2 and -5.",
      "$$Stable\\ because\\ all\\ poles\\ are\\ in\\ LHP$$"
    ],
    [
      "Unstable pole",
      "One pole at +1.",
      "$$Unstable\\ because\\ RHP\\ pole\\ exists$$"
    ]
  ],
  "mistakes": [
    "Checking open-loop poles instead of closed-loop poles.",
    "Forgetting special Routh cases.",
    "Calling marginally stable systems asymptotically stable.",
    "Ignoring repeated imaginary-axis roots."
  ],
  "interview": [
    "Define stability.",
    "State Routh-Hurwitz criterion.",
    "What is relative stability?",
    "Why are right-half-plane poles dangerous?",
    "What is marginal stability?"
  ],
  "examNotes": [
    "First-column sign changes give RHP poles.",
    "All coefficients positive is necessary but not sufficient.",
    "Repeated imaginary-axis poles imply instability.",
    "Relative stability measures how far poles are from the imaginary axis."
  ],
  "practice": [
    "Test stability of s^3+2s^2+3s+4.",
    "Find RHP poles using Routh array.",
    "Explain relative stability using pole distance.",
    "Classify a system with poles at -1 and ±j2."
  ],
  "subjectSlug": "control-systems",
  "concepts": [],
  "subtopics": [],
  "editMeta": {
    "subject": "Control Systems",
    "chapter": "Stability Analysis",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default stabilityAnalysis;
