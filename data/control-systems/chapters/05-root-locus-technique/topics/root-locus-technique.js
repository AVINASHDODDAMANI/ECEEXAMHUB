const rootLocusTechnique = {
  "slug": "root-locus-technique",
  "title": "Root Locus Technique",
  "summary": "Root locus shows how closed-loop poles move as system gain changes, making it a visual method for stability and transient-response design.",
  "coreQuestion": "How do closed-loop poles move when gain varies?",
  "examFocus": "Root locus rules, asymptotes, breakaway points, angle condition, pole-zero addition.",
  "engineeringUse": "Controller tuning, transient-response shaping, stability margin improvement.",
  "keywords": "root locus technique, root locus rules, breakaway point, pole zero addition, GATE control systems",
  "intro": [
    "Changing gain changes system behavior. Root locus shows that change as a path of closed-loop pole locations.",
    "It is one of the most visual tools in Control Systems because it links gain, pole movement, stability, and time response."
  ],
  "why": [
    "It helps select gain for desired damping and speed.",
    "It shows stability range graphically.",
    "It explains how adding poles and zeros changes response."
  ],
  "prerequisites": [
    "Closed-loop characteristic equation.",
    "Poles and zeros.",
    "Complex plane.",
    "Basic stability conditions."
  ],
  "intuition": "Root locus is a map of possible closed-loop behaviors. As gain increases, poles travel along paths, and the system response changes with them.",
  "coreTheory": [
    {
      "title": "Characteristic equation",
      "formula": "$$1+KG(s)H(s)=0$$",
      "detail": "Root locus is drawn for changing gain K."
    },
    {
      "title": "Angle condition",
      "formula": "$$\\angle G(s)H(s)=(2q+1)180^\\circ$$",
      "detail": "A point lies on root locus if it satisfies the angle condition."
    },
    {
      "title": "Magnitude condition",
      "formula": "$$K|G(s)H(s)|=1$$",
      "detail": "After selecting a point, magnitude condition gives gain."
    }
  ],
  "workingSteps": [
    "Plot open-loop poles and zeros.",
    "Find real-axis segments.",
    "Draw asymptotes and centroid.",
    "Locate breakaway or break-in points.",
    "Use angle and magnitude conditions for design points."
  ],
  "formulas": [
    [
      "Number of branches",
      "$$N=Number\\ of\\ open-loop\\ poles$$",
      "Each branch starts from an open-loop pole."
    ],
    [
      "Asymptote angle",
      "$$\\theta=\\frac{(2q+1)180^\\circ}{P-Z}$$",
      "Angles for branches going to infinity."
    ],
    [
      "Centroid",
      "$$\\sigma_a=\\frac{\\sum poles-\\sum zeros}{P-Z}$$",
      "Intersection point of asymptotes."
    ]
  ],
  "diagram": "Root Locus Pole-Zero Plot Diagram Here",
  "animation": "Animated Root Locus Gain Slider Visualization",
  "applications": [
    "Gain tuning.",
    "Lead compensator design.",
    "Servo response shaping.",
    "Motor control loops.",
    "Stability range estimation."
  ],
  "examples": [
    [
      "Branches",
      "Open-loop transfer has three poles and one zero.",
      "$$Branches=3,\\quad Asymptotes=3-1=2$$"
    ],
    [
      "Asymptote angles",
      "If P-Z=2.",
      "$$\\theta=90^\\circ,270^\\circ$$"
    ]
  ],
  "mistakes": [
    "Forgetting branches start at poles and end at zeros.",
    "Drawing root locus on wrong real-axis segments.",
    "Ignoring asymptotes.",
    "Using closed-loop poles as starting points."
  ],
  "interview": [
    "What is root locus?",
    "Why is root locus useful?",
    "State angle and magnitude conditions.",
    "What is breakaway point?",
    "How does adding a zero affect root locus?"
  ],
  "examNotes": [
    "Number of branches equals number of open-loop poles.",
    "Real-axis rule is checked to the right of a test point.",
    "Asymptotes appear when poles exceed zeros.",
    "Root locus helps infer transient response from pole location."
  ],
  "practice": [
    "Draw real-axis segments for G(s)H(s)=K/[s(s+2)(s+4)].",
    "Find centroid for poles 0,-2,-4 and no zeros.",
    "Find asymptote angles for P-Z=3.",
    "Explain effect of adding a left-half-plane zero."
  ],
  "subjectSlug": "control-systems",
  "concepts": [],
  "subtopics": [],
  "editMeta": {
    "subject": "Control Systems",
    "chapter": "Root Locus Technique",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default rootLocusTechnique;
