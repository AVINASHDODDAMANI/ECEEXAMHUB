const testingAndVerification = {
  "slug": "testing-and-verification",
  "title": "Testing and Verification",
  "summary": "Study fault detection, scan chains, BIST, functional verification, physical verification, and error detection flow.",
  "concepts": [
    "Fault model",
    "Scan chain",
    "BIST",
    "Verification"
  ],
  "subtopics": [
    "Stuck-at faults",
    "Scan testing",
    "Built-In Self-Test",
    "Functional vs physical verification"
  ],
  "formula": {
    "label": "Test flow",
    "expression": "apply pattern -> capture response -> compare expected output",
    "note": "Testing checks manufactured silicon; verification checks design correctness before fabrication."
  },
  "visualFocus": "fault detection through scan chain and response comparison",
  "visualType": "test-flow",
  "subjectSlug": "vlsi-design",
  "editMeta": {
    "subject": "VLSI Design",
    "chapter": "Testing and Verification",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default testingAndVerification;
