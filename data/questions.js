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
    year: 2021,
    diagram: "",
  },
];

export default questions;
