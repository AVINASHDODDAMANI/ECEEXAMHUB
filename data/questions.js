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
  {
    _id: "bel-dec-2023-q1",
    question:
      "Which of the following practices is considered a sustainable agricultural method to enhance soil fertility and reduce environmental impact?",
    options: [
      "Monoculture",
      "Excessive pesticide use",
      "Overgrazing",
      "Agroforestry",
    ],
    correctAnswer: "Agroforestry",
    explanation:
      "Agroforestry integrates trees with crops or livestock. It can improve soil fertility, reduce erosion, support biodiversity, and lower the environmental impact compared with intensive monoculture or overuse of chemicals.",
    subject: "General Awareness",
    topic: "Sustainable Agriculture",
    exam: ["BEL"],
    tags: ["official-paper"],
    year: 2023,
    questionId: "630680512568",
    optionIds: [
      "6306802003243",
      "6306802003245",
      "6306802003242",
      "6306802003244",
    ],
    status: "Answered",
    chosenOption: "4",
    diagram: "",
  },
  {
    _id: "bel-dec-2023-q2",
    question:
      "Which institution is responsible for the promotion and development of the Hindi language in India?",
    options: [
      "Kendriya Hindi Sansthan (KHS)",
      "Akhil Bharatiya Vidyarthi Parishad (ABVP)",
      "Sahitya Akademi",
      "Central Institute of Indian Languages (CIIL)",
    ],
    correctAnswer: "Kendriya Hindi Sansthan (KHS)",
    explanation:
      "Kendriya Hindi Sansthan works for the teaching, promotion, and development of Hindi. The other options are associated with student organization, literature, or broader language studies.",
    subject: "General Awareness",
    topic: "Hindi Language Institutions",
    exam: ["BEL"],
    tags: ["official-paper"],
    year: 2023,
    questionId: "630680512565",
    optionIds: [
      "6306802003233",
      "6306802003232",
      "6306802003230",
      "6306802003231",
    ],
    status: "Not Answered",
    chosenOption: "-",
    diagram: "",
  },
  {
    _id: "bel-dec-2023-q3",
    question: "Who was the first ruler of the Gupta dynasty?",
    options: [
      "Chandragupta I",
      "Chandragupta II",
      "Sri Gupta",
      "Kumaragupta",
    ],
    correctAnswer: "Sri Gupta",
    explanation:
      "Sri Gupta is regarded as the founder and earliest known ruler of the Gupta dynasty. Chandragupta I came later and expanded the dynasty's political importance.",
    subject: "General Awareness",
    topic: "Gupta Dynasty",
    exam: ["BEL"],
    tags: ["official-paper"],
    year: 2023,
    questionId: "630680512564",
    optionIds: [
      "6306802003227",
      "6306802003228",
      "6306802003226",
      "6306802003229",
    ],
    status: "Answered",
    chosenOption: "4",
    diagram: "",
  },
];

export default questions;
