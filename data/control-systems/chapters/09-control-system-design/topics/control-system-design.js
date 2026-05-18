const controlSystemDesign = {
  "slug": "control-system-design",
  "title": "Control System Design",
  "summary": "Control system design selects controllers and compensators so a system meets stability, accuracy, speed, overshoot, and robustness specifications.",
  "coreQuestion": "How do we make the system satisfy performance specifications in practice?",
  "examFocus": "Design specifications, stability improvement, compensation design, PID tuning.",
  "engineeringUse": "Industrial automation, robotics, motor drives, aerospace, power systems, embedded control.",
  "keywords": "control system design, compensation design, PID tuning, stability improvement, GATE control systems",
  "intro": [
    "Control design is where analysis becomes engineering action. Instead of only calculating response, we decide how to improve it.",
    "A good design balances speed, accuracy, overshoot, stability margin, actuator limits, and noise sensitivity."
  ],
  "why": [
    "It converts theory into working engineering systems.",
    "It ensures performance under real disturbances.",
    "It connects time response, root locus, frequency response, and controller tuning."
  ],
  "prerequisites": [
    "Time response specifications.",
    "Stability analysis.",
    "Root locus.",
    "Bode plot.",
    "PID and compensation basics."
  ],
  "intuition": "Design is a tradeoff. Making a system faster may increase overshoot; improving accuracy may reduce stability margin. Good design balances these effects.",
  "coreTheory": [
    {
      "title": "Design specifications",
      "formula": "$$T_r,\\ T_p,\\ T_s,\\ M_p,\\ e_{ss}$$",
      "detail": "Specifications describe desired speed, overshoot, settling, and accuracy."
    },
    {
      "title": "Dominant pole idea",
      "formula": "$$s=-\\zeta\\omega_n\\pm j\\omega_n\\sqrt{1-\\zeta^2}$$",
      "detail": "Desired poles connect time-domain behavior to pole location."
    },
    {
      "title": "PID tuning objective",
      "formula": "$$u(t)=K_pe(t)+K_i\\int e(t)dt+K_d\\frac{de(t)}{dt}$$",
      "detail": "PID parameters are chosen to meet practical performance goals."
    }
  ],
  "workingSteps": [
    "Translate requirements into specifications.",
    "Analyze uncompensated system.",
    "Choose controller or compensator.",
    "Tune parameters.",
    "Verify stability, transient response, steady-state error, and robustness."
  ],
  "formulas": [
    [
      "Settling time target",
      "$$T_s\\approx\\frac{4}{\\zeta\\omega_n}$$",
      "Used to estimate desired pole location."
    ],
    [
      "Overshoot relation",
      "$$M_p=e^{-\\frac{\\pi\\zeta}{\\sqrt{1-\\zeta^2}}}\\times100\\%$$",
      "Used to select damping ratio."
    ],
    [
      "Steady-state error",
      "$$e_{ss}=\\lim_{s\\to0}sE(s)$$",
      "Used to verify tracking accuracy."
    ]
  ],
  "diagram": "Control Design Workflow Diagram Here",
  "animation": "Animated Design Specification to Controller Tuning Visualization",
  "applications": [
    "Servo mechanism design.",
    "Motor speed controller tuning.",
    "Drone stabilization.",
    "AVR design.",
    "Industrial temperature control.",
    "Power electronics loop compensation."
  ],
  "examples": [
    [
      "Overshoot target",
      "If overshoot must be small, choose higher damping ratio.",
      "$$Higher\\ \\zeta\\ \\Rightarrow\\ lower\\ M_p$$"
    ],
    [
      "Accuracy target",
      "If step steady-state error is too large.",
      "$$Add\\ integral\\ action\\ or\\ increase\\ low-frequency\\ gain$$"
    ]
  ],
  "mistakes": [
    "Designing only for speed and ignoring stability margin.",
    "Using high integral gain without checking oscillation.",
    "Ignoring actuator saturation.",
    "Treating ideal compensator design as final hardware design."
  ],
  "interview": [
    "What is control system design?",
    "How do you choose between lead and lag compensation?",
    "What are design specifications?",
    "How does PID tuning work conceptually?",
    "Why is robustness important?"
  ],
  "examNotes": [
    "Translate time-domain specs into pole requirements.",
    "Lead compensation improves transient response.",
    "Lag compensation improves steady-state accuracy.",
    "PID tuning is practical and widely used.",
    "Always verify stability after compensation."
  ],
  "practice": [
    "Choose a controller for high steady-state error.",
    "Explain design tradeoff between speed and overshoot.",
    "Find desired damping ratio for overshoot requirement conceptually.",
    "List steps in control system design."
  ],
  "subjectSlug": "control-systems",
  "concepts": [],
  "subtopics": [],
  "editMeta": {
    "subject": "Control Systems",
    "chapter": "Control System Design",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default controlSystemDesign;
