const controllersAndCompensators = {
  "slug": "controllers-and-compensators",
  "title": "Controllers and Compensators",
  "summary": "Controllers and compensators modify system behavior so the output becomes faster, more accurate, more stable, or better damped.",
  "coreQuestion": "How do we intentionally reshape system response to meet design requirements?",
  "examFocus": "P, PI, PD, PID controllers, lead compensator, lag compensator, lag-lead compensator.",
  "engineeringUse": "Industrial PID loops, motor control, process control, robotics, power electronics.",
  "keywords": "PID controller, lead compensator, lag compensator, control system design, GATE control systems",
  "intro": [
    "Analysis tells what a system does. Design asks what we should add so it behaves better.",
    "Controllers and compensators are the engineering tools used to improve accuracy, speed, damping, and stability margin."
  ],
  "why": [
    "They reduce steady-state error.",
    "They improve transient response.",
    "They increase stability margins.",
    "They make practical control systems meet specifications."
  ],
  "prerequisites": [
    "Error signal.",
    "Time response specifications.",
    "Stability and root locus.",
    "Frequency response basics."
  ],
  "intuition": "A controller is like a trained driver. It decides how strongly and how quickly to react when the system drifts away from the target.",
  "coreTheory": [
    {
      "title": "PID controller",
      "formula": "$$u(t)=K_pe(t)+K_i\\int e(t)dt+K_d\\frac{de(t)}{dt}$$",
      "detail": "P reacts to present error, I reacts to accumulated error, D reacts to rate of change."
    },
    {
      "title": "Lead compensator",
      "formula": "$$G_c(s)=K\\frac{s+z}{s+p},\\quad |p|>|z|$$",
      "detail": "Lead compensation improves transient response and phase margin."
    },
    {
      "title": "Lag compensator",
      "formula": "$$G_c(s)=K\\frac{s+z}{s+p},\\quad |z|>|p|$$",
      "detail": "Lag compensation improves steady-state accuracy."
    }
  ],
  "workingSteps": [
    "Identify performance problem.",
    "Choose controller or compensator type.",
    "Place poles and zeros to reshape response.",
    "Verify stability, transient response, and steady-state error."
  ],
  "formulas": [
    [
      "P control",
      "$$u(t)=K_pe(t)$$",
      "Simple proportional correction."
    ],
    [
      "PI control",
      "$$u(t)=K_pe(t)+K_i\\int e(t)dt$$",
      "Improves steady-state error."
    ],
    [
      "PD control",
      "$$u(t)=K_pe(t)+K_d\\frac{de(t)}{dt}$$",
      "Improves damping and prediction."
    ]
  ],
  "diagram": "PID Controller and Compensator Block Diagram Here",
  "animation": "Animated PID Effect on Step Response Visualization",
  "applications": [
    "Temperature controllers.",
    "Motor speed drives.",
    "Robotic joints.",
    "Power converter control.",
    "Aircraft autopilot.",
    "Industrial process control."
  ],
  "examples": [
    [
      "PI benefit",
      "A system has steady-state error for step input.",
      "$$PI\\ control\\ can\\ reduce\\ or\\ eliminate\\ step\\ error$$"
    ],
    [
      "Lead benefit",
      "A system has poor damping and low phase margin.",
      "$$Lead\\ compensator\\ improves\\ transient\\ response$$"
    ]
  ],
  "mistakes": [
    "Increasing gain blindly without checking stability.",
    "Using integral action without considering overshoot.",
    "Ignoring derivative noise sensitivity.",
    "Confusing lead and lag compensators."
  ],
  "interview": [
    "What is PID controller?",
    "What does integral action do?",
    "Why is derivative action noise-sensitive?",
    "Difference between lead and lag compensator?",
    "Where are PID controllers used?"
  ],
  "examNotes": [
    "PI improves steady-state accuracy.",
    "PD improves transient response.",
    "Lead improves phase margin.",
    "Lag improves low-frequency gain.",
    "PID combines all three actions."
  ],
  "practice": [
    "Identify controller type from u(t)=Kp e(t).",
    "Explain why PI reduces steady-state error.",
    "Choose lead or lag for phase margin improvement.",
    "Write PID control law."
  ],
  "subjectSlug": "control-systems",
  "concepts": [],
  "subtopics": [],
  "editMeta": {
    "subject": "Control Systems",
    "chapter": "Controllers and Compensators",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default controllersAndCompensators;
