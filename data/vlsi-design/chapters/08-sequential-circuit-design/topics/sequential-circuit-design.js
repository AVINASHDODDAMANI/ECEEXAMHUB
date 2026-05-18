const sequentialCircuitDesign = {
  "slug": "sequential-circuit-design",
  "title": "Sequential Circuit Design",
  "summary": "Understand flip-flop timing, registers, counters, clock synchronization, and memory element behavior.",
  "concepts": [
    "Flip-flop",
    "Register",
    "Counter",
    "Clock"
  ],
  "subtopics": [
    "D flip-flop",
    "Setup and hold",
    "Register operation",
    "Counter state transitions"
  ],
  "formula": {
    "label": "Timing check",
    "expression": "Tclk >= tCQ + tlogic + tsetup",
    "note": "Synchronous circuits work only when timing constraints are satisfied."
  },
  "visualFocus": "clocked storage and state transitions",
  "visualType": "sequential",
  "subjectSlug": "vlsi-design",
  "editMeta": {
    "subject": "VLSI Design",
    "chapter": "Sequential Circuit Design",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default sequentialCircuitDesign;
