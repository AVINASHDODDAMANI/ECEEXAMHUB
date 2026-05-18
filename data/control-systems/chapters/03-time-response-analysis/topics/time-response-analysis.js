const timeResponseAnalysis = {
  "slug": "time-response-analysis",
  "title": "Time Response Analysis",
  "summary": "Time response analysis studies how control systems behave with time when standard inputs such as step, ramp, and impulse are applied.",
  "coreQuestion": "How fast and accurately does a system respond in time?",
  "examFocus": "First-order response, second-order response, rise time, peak time, settling time, overshoot, steady-state error.",
  "engineeringUse": "Servo design, motor drives, automation, robotics, regulator design.",
  "keywords": "time response analysis, second order system, steady state error, settling time, GATE control systems",
  "intro": [
    "A stable system is not automatically a good system. It may be too slow, too oscillatory, or inaccurate.",
    "Time response analysis tells how the output moves from initial condition to final behavior."
  ],
  "why": [
    "It measures speed of response.",
    "It reveals overshoot and oscillation.",
    "It connects mathematical poles to real output behavior."
  ],
  "prerequisites": [
    "Laplace Transform.",
    "Transfer functions.",
    "Poles of a system.",
    "Standard test signals."
  ],
  "intuition": "If stability asks whether the system settles, time response asks how gracefully it settles.",
  "coreTheory": [
    {
      "title": "First-order system",
      "formula": "$$G(s)=\\frac{1}{\\tau s+1}$$",
      "detail": "The time constant tau decides how quickly the response approaches final value."
    },
    {
      "title": "Standard second-order system",
      "formula": "$$G(s)=\\frac{\\omega_n^2}{s^2+2\\zeta\\omega_ns+\\omega_n^2}$$",
      "detail": "Natural frequency controls speed; damping ratio controls oscillation."
    },
    {
      "title": "Maximum overshoot",
      "formula": "$$M_p=e^{-\\frac{\\pi\\zeta}{\\sqrt{1-\\zeta^2}}}\\times100\\%$$",
      "detail": "Overshoot decreases as damping ratio increases."
    }
  ],
  "workingSteps": [
    "Identify system order.",
    "Compare denominator with standard form.",
    "Find parameters such as tau, zeta, and omega_n.",
    "Use time-domain specifications to judge performance."
  ],
  "formulas": [
    [
      "Peak time",
      "$$T_p=\\frac{\\pi}{\\omega_n\\sqrt{1-\\zeta^2}}$$",
      "Time at which first peak occurs."
    ],
    [
      "Settling time",
      "$$T_s\\approx\\frac{4}{\\zeta\\omega_n}$$",
      "Approximate 2 percent settling time."
    ],
    [
      "Steady-state error",
      "$$e_{ss}=\\lim_{s\\to0}sE(s)$$",
      "Use final value theorem when valid."
    ]
  ],
  "diagram": "Step Response with Rise Time Peak Time Settling Time Diagram Here",
  "animation": "Animated Damping Ratio and Step Response Visualization",
  "applications": [
    "Motor speed response.",
    "Position servo response.",
    "Voltage regulator settling.",
    "Temperature control response.",
    "Robotics actuator tuning."
  ],
  "examples": [
    [
      "First-order time constant",
      "For G(s)=1/(2s+1), find tau.",
      "$$\\tau=2\\ seconds$$"
    ],
    [
      "Second-order parameters",
      "Compare s^2+4s+25 with standard form.",
      "$$\\omega_n=5,\\quad 2\\zeta\\omega_n=4\\Rightarrow\\zeta=0.4$$"
    ]
  ],
  "mistakes": [
    "Confusing peak time with rise time.",
    "Using second-order formulas for non-standard systems.",
    "Applying final value theorem to unstable systems.",
    "Ignoring damping ratio while discussing overshoot."
  ],
  "interview": [
    "What is rise time?",
    "What is settling time?",
    "What does damping ratio mean physically?",
    "Why do we use standard test inputs?",
    "What is steady-state error?"
  ],
  "examNotes": [
    "Memorize standard second-order denominator.",
    "Check stability before final value theorem.",
    "Higher damping generally means less overshoot.",
    "Type number affects steady-state error."
  ],
  "practice": [
    "Find tau for G(s)=5/(3s+1).",
    "Find zeta and omega_n for s^2+6s+25.",
    "Compute settling time for zeta=0.5 and omega_n=10.",
    "Explain why ramp input tests tracking ability."
  ],
  "subjectSlug": "control-systems",
  "concepts": [],
  "subtopics": [],
  "editMeta": {
    "subject": "Control Systems",
    "chapter": "Time Response Analysis",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default timeResponseAnalysis;
