const vlsiInterconnectsAndScaling = {
  "slug": "vlsi-interconnects-and-scaling",
  "title": "VLSI Interconnects and Scaling",
  "summary": "See how wire resistance, capacitance, propagation delay, short-channel effects, and scaling affect speed and power.",
  "concepts": [
    "RC delay",
    "Capacitance",
    "Scaling",
    "Short-channel effects"
  ],
  "subtopics": [
    "Interconnect delay",
    "Resistance and capacitance",
    "Technology scaling",
    "Power-delay tradeoff"
  ],
  "formula": {
    "label": "Delay intuition",
    "expression": "delay roughly follows R x C",
    "note": "In deep submicron VLSI, wires can dominate delay as much as gates."
  },
  "visualFocus": "signal delay through distributed interconnect capacitance and resistance",
  "visualType": "interconnect",
  "subjectSlug": "vlsi-design",
  "editMeta": {
    "subject": "VLSI Design",
    "chapter": "VLSI Interconnects and Scaling",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default vlsiInterconnectsAndScaling;
