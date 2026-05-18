const stateSpaceAnalysis = {
  "slug": "state-space-analysis",
  "title": "State Space Analysis",
  "summary": "State space analysis describes systems using internal variables, making it powerful for multi-input, multi-output, modern control design.",
  "coreQuestion": "How do we model internal system behavior, not just input-output transfer?",
  "examFocus": "State variables, state equations, state transition matrix, controllability, observability.",
  "engineeringUse": "Modern control, robotics, aerospace, MIMO systems, digital control.",
  "keywords": "state space analysis, state variables, controllability, observability, state transition matrix, GATE control systems",
  "intro": [
    "Transfer functions describe input-output behavior, but they hide internal variables.",
    "State space analysis opens the system and tracks the minimum set of variables needed to describe future behavior."
  ],
  "why": [
    "It handles multiple inputs and outputs naturally.",
    "It includes initial conditions directly.",
    "It is the foundation of modern control design."
  ],
  "prerequisites": [
    "Matrix algebra.",
    "Differential equations.",
    "System order.",
    "Basic transfer function concepts."
  ],
  "intuition": "State variables are like the memory of a system. If you know the current state and future input, you can predict the future output.",
  "coreTheory": [
    {
      "title": "State equation",
      "formula": "$$\\dot{x}=Ax+Bu$$",
      "detail": "Describes how internal state changes with current state and input."
    },
    {
      "title": "Output equation",
      "formula": "$$y=Cx+Du$$",
      "detail": "Describes how output is produced from state and input."
    },
    {
      "title": "State transition",
      "formula": "$$x(t)=e^{At}x(0)+\\int_0^t e^{A(t-\\tau)}Bu(\\tau)d\\tau$$",
      "detail": "Shows how state evolves over time."
    }
  ],
  "workingSteps": [
    "Choose state variables.",
    "Write first-order state equations.",
    "Arrange equations in matrix form.",
    "Check controllability and observability when needed."
  ],
  "formulas": [
    [
      "State model",
      "$$\\dot{x}=Ax+Bu$$",
      "A is system matrix, B is input matrix."
    ],
    [
      "Output model",
      "$$y=Cx+Du$$",
      "C maps states to output; D is direct feedthrough."
    ],
    [
      "Controllability matrix",
      "$$\\mathcal{C}=[B\\ AB\\ A^2B\\ ...\\ A^{n-1}B]$$",
      "Full rank means all states can be controlled."
    ]
  ],
  "diagram": "State Space Block Diagram Here",
  "animation": "Animated State Vector Evolution Visualization",
  "applications": [
    "Aircraft control.",
    "Robotic arm control.",
    "Multivariable process plants.",
    "Observer design.",
    "Digital control implementation.",
    "Kalman filtering foundation."
  ],
  "examples": [
    [
      "Second-order states",
      "For displacement x and velocity v.",
      "$$x_1=x,\\quad x_2=\\dot{x}$$"
    ],
    [
      "Rank condition",
      "For a 2-state system, controllability requires rank 2.",
      "$$rank(\\mathcal{C})=2$$"
    ]
  ],
  "mistakes": [
    "Choosing too many or too few state variables.",
    "Mixing state equation and output equation.",
    "Ignoring matrix dimensions.",
    "Confusing controllability with observability."
  ],
  "interview": [
    "What is a state variable?",
    "Write standard state space equations.",
    "What is controllability?",
    "What is observability?",
    "Why is state space useful for MIMO systems?"
  ],
  "examNotes": [
    "Number of states usually equals system order.",
    "Full-rank controllability matrix means controllable system.",
    "Full-rank observability matrix means observable system.",
    "State space can include initial conditions naturally."
  ],
  "practice": [
    "Choose states for a mass-spring-damper system.",
    "Write state equations from a second-order differential equation.",
    "Find dimensions of A, B, C, D matrices.",
    "Check controllability for a 2x2 system."
  ],
  "subjectSlug": "control-systems",
  "concepts": [],
  "subtopics": [],
  "editMeta": {
    "subject": "Control Systems",
    "chapter": "State Space Analysis",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default stateSpaceAnalysis;
