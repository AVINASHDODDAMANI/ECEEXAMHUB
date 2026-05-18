const zTransform = {
  "slug": "z-transform",
  "title": "Z-Transform",
  "summary": "Connect discrete-time sequences with Z-transform, ROC, inverse transform, pole-zero plots, and system stability.",
  "concepts": [
    "Z-transform",
    "ROC",
    "Poles and zeros",
    "Stability"
  ],
  "subtopics": [
    "Definition of Z-transform",
    "ROC",
    "Properties",
    "Inverse Z-transform",
    "System analysis"
  ],
  "formula": {
    "label": "Z-transform",
    "expression": "X(z) = sum x[n]z^(-n)",
    "note": "ROC and pole locations decide stability and causality."
  },
  "visualFocus": "z-plane mapping, poles, zeros, ROC, and unit-circle stability",
  "subjectSlug": "dsp",
  "editMeta": {
    "subject": "Digital Signal Processing",
    "chapter": "Z-Transform",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default zTransform;
