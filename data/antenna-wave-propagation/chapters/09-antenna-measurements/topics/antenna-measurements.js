const antennaMeasurements = {
  "slug": "antenna-measurements",
  "title": "Antenna Measurements",
  "summary": "Learn radiation pattern testing, gain measurement, VSWR, impedance measurement, matching, and reflection coefficient intuition.",
  "concepts": [
    "Radiation pattern test",
    "Gain measurement",
    "VSWR",
    "Impedance matching",
    "Reflection coefficient"
  ],
  "subtopics": [
    "Radiation pattern measurement",
    "Gain measurement",
    "VSWR measurement",
    "Impedance measurement"
  ],
  "formula": {
    "label": "VSWR relation",
    "expression": "VSWR = (1 + |Gamma|) / (1 - |Gamma|)",
    "note": "Lower reflection coefficient means better matching and lower VSWR."
  },
  "visualType": "measurement",
  "visualFocus": "test setup, reflected wave, VSWR, and impedance matching",
  "subjectSlug": "antenna-wave-propagation",
  "editMeta": {
    "subject": "Antenna & Wave Propagation",
    "chapter": "Antenna Measurements",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default antennaMeasurements;
