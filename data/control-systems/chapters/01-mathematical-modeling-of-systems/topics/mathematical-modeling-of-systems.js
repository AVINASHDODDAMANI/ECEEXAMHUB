const mathematicalModelingOfSystems = {
  "slug": "mathematical-modeling-of-systems",
  "title": "Mathematical Modeling of Systems",
  "summary": "Mathematical modeling converts physical systems into equations and transfer functions so engineers can predict, analyze, and design control behavior.",
  "coreQuestion": "How do we convert a real physical system into a control-system model?",
  "examFocus": "Transfer function, differential equations, mechanical systems, RLC modeling, analogous systems.",
  "engineeringUse": "Motor drives, RLC networks, mass-spring-damper systems, process plants, robotics.",
  "keywords": "mathematical modeling of systems, transfer function, differential equation model, RLC circuit modeling, GATE control systems",
  "intro": [
    "A controller cannot be designed from guesswork. Before we tune gains or check stability, we first need a mathematical description of the plant.",
    "Mathematical modeling is the bridge between a real system and control theory. It converts physical laws into equations, and then into transfer functions or state equations."
  ],
  "why": [
    "It lets engineers predict output before building hardware.",
    "It turns mechanical, electrical, thermal, and fluid systems into a common analysis language.",
    "It is the starting point for time response, stability, root locus, Bode plot, and controller design."
  ],
  "prerequisites": [
    "Laplace Transform basics.",
    "Newton's laws and basic force relations.",
    "KVL, KCL, RLC circuit behavior.",
    "Input-output idea.",
    "Basic differential equations."
  ],
  "intuition": "A model is like a map. It is not the physical machine itself, but it captures the important behavior well enough to guide design decisions.",
  "coreTheory": [
    {
      "title": "Transfer function",
      "formula": "$$G(s)=\\frac{C(s)}{R(s)}$$",
      "detail": "The transfer function is the ratio of output to input in the Laplace domain under zero initial conditions."
    },
    {
      "title": "Differential equation model",
      "formula": "$$a_n\\frac{d^ny}{dt^n}+...+a_0y=b_m\\frac{d^mx}{dt^m}+...+b_0x$$",
      "detail": "Differential equations describe how present behavior depends on rates of change and stored energy."
    },
    {
      "title": "Electrical system modeling",
      "formula": "$$V_R=Ri,\\quad V_L=L\\frac{di}{dt},\\quad i_C=C\\frac{dv}{dt}$$",
      "detail": "RLC circuits become dynamic system models using element laws and KVL or KCL."
    }
  ],
  "workingSteps": [
    "Identify input and output variables.",
    "Write physical equations using laws such as Newton's law or KVL/KCL.",
    "Take Laplace Transform assuming zero initial conditions.",
    "Arrange the result as output divided by input."
  ],
  "formulas": [
    [
      "Transfer function",
      "$$G(s)=\\frac{Output}{Input}$$",
      "Shows how input is transformed into output."
    ],
    [
      "Mechanical translation",
      "$$F=M\\frac{d^2x}{dt^2}+B\\frac{dx}{dt}+Kx$$",
      "Mass stores kinetic energy, damper dissipates energy, spring stores potential energy."
    ],
    [
      "Impedance model",
      "$$Z_R=R,\\quad Z_L=sL,\\quad Z_C=\\frac{1}{sC}$$",
      "Laplace-domain impedance makes circuit modeling algebraic."
    ]
  ],
  "diagram": "Mechanical-Electrical Modeling Flow Diagram Here",
  "animation": "Animated Physical System to Transfer Function Visualization",
  "applications": [
    "DC motor modeling.",
    "RLC circuit control.",
    "Robotic arm dynamics.",
    "Suspension systems.",
    "Thermal process plants.",
    "Power converter control loops."
  ],
  "examples": [
    [
      "RLC transfer function idea",
      "For a series RLC circuit with capacitor voltage as output, write KVL and convert impedances to the s-domain.",
      "$$G(s)=\\frac{V_C(s)}{V_{in}(s)}=\\frac{1/(sC)}{R+sL+1/(sC)}$$"
    ],
    [
      "Mass-spring-damper model",
      "For force input and displacement output, apply Newton's law.",
      "$$G(s)=\\frac{X(s)}{F(s)}=\\frac{1}{Ms^2+Bs+K}$$"
    ]
  ],
  "mistakes": [
    "Skipping the choice of input and output.",
    "Using nonzero initial conditions while forming basic transfer functions.",
    "Mixing force-voltage and force-current analogies.",
    "Forgetting units while modeling mechanical systems."
  ],
  "interview": [
    "What is mathematical modeling?",
    "Why do we assume zero initial conditions for transfer functions?",
    "How is an RLC circuit modeled in control systems?",
    "What is force-voltage analogy?",
    "Why is modeling needed before controller design?"
  ],
  "examNotes": [
    "Always define input and output first.",
    "Use Laplace Transform to convert differential equations into algebra.",
    "Transfer function is valid for LTI systems with zero initial conditions.",
    "RLC and mass-spring-damper models are common GATE patterns."
  ],
  "practice": [
    "Find the transfer function of an RC low-pass circuit.",
    "Model a mass-spring system without damping.",
    "Write the force-voltage analogy for mass, damper, and spring.",
    "Derive output/input relation from a first-order differential equation."
  ],
  "subjectSlug": "control-systems",
  "concepts": [],
  "subtopics": [],
  "editMeta": {
    "subject": "Control Systems",
    "chapter": "Mathematical Modeling of Systems",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default mathematicalModelingOfSystems;
