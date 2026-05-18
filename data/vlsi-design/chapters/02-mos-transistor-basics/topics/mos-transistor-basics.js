const mosTransistorBasics = {
  "slug": "mos-transistor-basics",
  "title": "MOS Transistor Basics",
  "summary": "Build intuition for NMOS and PMOS structure, gate-source voltage, channel formation, current flow, and operating regions.",
  "concepts": [
    "NMOS",
    "PMOS",
    "VGS",
    "Cutoff, linear, saturation"
  ],
  "subtopics": [
    "MOS structure",
    "Threshold voltage",
    "Channel formation",
    "Operating regions"
  ],
  "formula": {
    "label": "Region check",
    "expression": "cutoff: VGS < VT, saturation: VDS >= VGS - VT",
    "note": "Region identification is the first step in MOS current questions."
  },
  "visualFocus": "gate voltage creating a channel and controlling drain current",
  "visualType": "transistor",
  "subjectSlug": "vlsi-design",
  "editMeta": {
    "subject": "VLSI Design",
    "chapter": "MOS Transistor Basics",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default mosTransistorBasics;
