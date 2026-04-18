const questions = [
  {
    _id: "q1",
    question:
      "For an ideal op-amp differentiator, the output voltage is proportional to:",
    options: [
      "The integral of input voltage",
      "The derivative of input voltage",
      "The square of input voltage",
      "The average of input voltage",
    ],
    correctAnswer: "The derivative of input voltage",
    explanation:
      "In an ideal differentiator, the capacitor is at the input and the resistor is in feedback, so the output is proportional to the time derivative of the input signal.",
    subject: "Analog",
    topic: "Operational Amplifiers",
    exam: ["GATE", "ISRO"],
    tags: ["important", "repeated"],
    year: 2023,
    diagram:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "q2",
    question: "The output of a JK flip-flop toggles when:",
    options: ["J=0, K=0", "J=0, K=1", "J=1, K=0", "J=1, K=1"],
    correctAnswer: "J=1, K=1",
    explanation:
      "A JK flip-flop resolves the invalid state of the SR flip-flop. When both J and K are high, the output toggles on the triggering edge.",
    subject: "Digital",
    topic: "Flip-Flops",
    exam: ["GATE", "BEL"],
    tags: ["repeated"],
    year: 2022,
    diagram: "",
  },
  {
    _id: "q3",
    question:
      "The Laplace transform of a unit step function u(t) is given by:",
    options: ["1/s", "s", "1/(s+1)", "s/(s+1)"],
    correctAnswer: "1/s",
    explanation:
      "The unilateral Laplace transform of the unit step function u(t) is 1/s for Re(s) > 0.",
    subject: "Signals",
    topic: "Laplace Transform",
    exam: ["GATE", "BARC"],
    tags: ["important"],
    year: 2021,
    diagram: "",
  },
  {
    _id: "q4",
    question:
      "In a series RLC circuit at resonance, the impedance seen by the source is:",
    options: ["Purely resistive", "Purely inductive", "Purely capacitive", "Infinite"],
    correctAnswer: "Purely resistive",
    explanation:
      "At resonance, inductive and capacitive reactances cancel each other. The circuit impedance is then only the resistance.",
    subject: "Networks",
    topic: "Resonance",
    exam: ["ISRO", "BARC"],
    tags: ["important", "repeated"],
    year: 2020,
    diagram:
      "https://images.unsplash.com/photo-1563770660941-10a636076916?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "q5",
    question:
      "A control system with damping ratio greater than 1 is classified as:",
    options: ["Underdamped", "Critically damped", "Overdamped", "Unstable"],
    correctAnswer: "Overdamped",
    explanation:
      "For zeta greater than 1, the characteristic roots are real and distinct, producing an overdamped response without oscillation.",
    subject: "Control Systems",
    topic: "Time Response",
    exam: ["GATE", "BEL", "BARC"],
    tags: ["important"],
    year: 2024,
    diagram: "",
  },
  {
    _id: "q6",
    question:
      "Which logic family generally offers the lowest power dissipation among common digital IC families?",
    options: ["TTL", "ECL", "CMOS", "DTL"],
    correctAnswer: "CMOS",
    explanation:
      "CMOS has very low static power dissipation because current ideally flows only during switching transitions.",
    subject: "Digital",
    topic: "Logic Families",
    exam: ["ISRO", "BEL"],
    tags: ["repeated"],
    year: 2021,
    diagram: "",
  },
  {
    _id: "q7",
    question:
      "For a D flip-flop, the next state is equal to:",
    options: ["Present state", "Clock input", "D input", "Complement of D input"],
    correctAnswer: "D input",
    explanation:
      "A D flip-flop directly transfers the input D to the next state on the active clock edge, so its characteristic equation is Q(n+1) = D.",
    subject: "Digital",
    topic: "Flip-Flops",
    exam: ["GATE"],
    tags: ["important"],
    year: 2023,
    diagram: "",
  },
  {
    _id: "q8",
    question:
      "The race-around condition is associated with which flip-flop configuration?",
    options: [
      "Level-triggered JK flip-flop with J = K = 1",
      "D flip-flop with D = 0",
      "T flip-flop with T = 0",
      "SR flip-flop with S = 0 and R = 0",
    ],
    correctAnswer: "Level-triggered JK flip-flop with J = K = 1",
    explanation:
      "When a JK flip-flop is level-triggered and J = K = 1, the output can toggle repeatedly during the active clock pulse, producing the race-around problem.",
    subject: "Digital",
    topic: "Flip-Flops",
    exam: ["ISRO", "BARC"],
    tags: ["important", "repeated"],
    year: 2021,
    diagram: "",
  },
  {
    _id: "q9",
    question:
      "A T flip-flop behaves as a hold circuit when:",
    options: ["T = 0", "T = 1", "Clock = 1", "Q = 0"],
    correctAnswer: "T = 0",
    explanation:
      "The characteristic equation of a T flip-flop is Q(n+1) = T xor Q(n). When T = 0, the next state remains equal to the present state.",
    subject: "Digital",
    topic: "Flip-Flops",
    exam: ["BEL"],
    tags: ["important"],
    year: 2020,
    diagram: "",
  },
  {
    _id: "q10",
    question:
      "Which flip-flop is most convenient when designing a divide-by-2 toggle circuit?",
    options: ["SR flip-flop", "JK flip-flop", "T flip-flop", "D flip-flop"],
    correctAnswer: "T flip-flop",
    explanation:
      "A T flip-flop toggles whenever T = 1, so it naturally alternates its output on every active clock edge and acts as a divide-by-2 stage.",
    subject: "Digital",
    topic: "Flip-Flops",
    exam: ["GATE", "BEL"],
    tags: ["repeated"],
    year: 2024,
    diagram: "",
  },
];

export default questions;
