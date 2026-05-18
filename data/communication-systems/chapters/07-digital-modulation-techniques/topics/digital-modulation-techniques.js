const digitalModulationTechniques = {
  "slug": "digital-modulation-techniques",
  "title": "07 Digital Modulation Techniques",
  "shortTitle": "Digital Modulation Techniques",
  "summary": "Digital Modulation maps bits and symbols onto carrier changes, leading to ASK, FSK, PSK, QPSK, and QAM families with different bandwidth and noise tradeoffs.",
  "metaTitle": "Digital Modulation Techniques | ASK FSK PSK QAM Notes for GATE ECE",
  "metaDescription": "Learn Digital Modulation Techniques with ASK, FSK, PSK, QPSK constellation, QAM mapping, and symbol flow using animated Communication Systems notes for GATE ECE.",
  "keywords": "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, ASK, FSK, PSK, QPSK, QAM",
  "coreQuestion": "How are bits translated into controlled carrier changes for transmission?",
  "examFocus": "ASK, FSK, PSK, QPSK, QAM, constellation interpretation, coherent detection, and symbol-rate intuition.",
  "engineeringUse": "Wireless links, modems, optical communication, cellular systems, and satellite transmission.",
  "intro": [
    "Digital modulation uses a carrier but lets discrete symbol values decide how the carrier behaves.",
    "Depending on the scheme, amplitude, frequency, phase, or a combination is changed to represent data."
  ],
  "intuition": "Bits choose from a menu of allowed signal states, and each chosen state occupies one symbol interval on the channel.",
  "overview": [
    "ASK varies carrier amplitude between allowed values, FSK switches between frequencies, and PSK changes phase states.",
    "QPSK increases data efficiency by using four phase states, while QAM combines amplitude and phase changes to create larger constellations.",
    "Constellation diagrams are visual maps of symbol choices. Once they are understood, many digital modulation questions become easier."
  ],
  "learningGoals": [
    "Identify which carrier property changes in common digital modulation schemes.",
    "Explain symbols and constellation points in beginner-friendly language.",
    "Relate higher-order modulation to efficiency and noise sensitivity tradeoffs."
  ],
  "keyConcepts": [
    "Digital modulation maps bits to a finite set of signal states.",
    "A symbol can carry multiple bits when more states are available.",
    "Constellation diagrams visualize valid signal states in I-Q space.",
    "Higher-order schemes often improve bit efficiency but demand cleaner channels."
  ],
  "formulas": [
    {
      "label": "Bits per symbol",
      "expression": "bits/symbol = log2(M)",
      "note": "If there are M symbol states, each symbol can represent log2(M) bits."
    },
    {
      "label": "QPSK mapping idea",
      "expression": "M = 4 -> 2 bits/symbol",
      "note": "QPSK uses four phase states, so each symbol carries two bits."
    },
    {
      "label": "General state count",
      "expression": "M-ary modulation",
      "note": "The number of allowed states is often represented by M."
    }
  ],
  "theoryCards": [
    {
      "title": "ASK and FSK",
      "detail": "ASK is easy to visualize because amplitude switches. FSK is often more robust to amplitude uncertainty because information is in frequency selection."
    },
    {
      "title": "PSK family",
      "detail": "PSK keeps amplitude fixed and rotates phase between valid states. This often gives strong energy efficiency."
    },
    {
      "title": "QPSK",
      "detail": "QPSK uses four phases and therefore sends two bits per symbol, improving spectral efficiency over binary PSK."
    },
    {
      "title": "QAM",
      "detail": "QAM uses both phase and amplitude variation, allowing dense constellations and high bit rates when channel quality is good."
    }
  ],
  "examples": [
    {
      "title": "Read QPSK efficiency",
      "prompt": "Why does QPSK carry more bits per symbol than BPSK?",
      "steps": [
        "BPSK has two valid states, so it carries one bit per symbol.",
        "QPSK has four valid phase states, so it carries log2(4) bits per symbol.",
        "That gives two bits per symbol, doubling symbol efficiency compared with BPSK."
      ],
      "answer": "QPSK uses four phase states, so each symbol represents two bits."
    }
  ],
  "examPointers": [
    "First identify whether amplitude, frequency, phase, or both are being changed.",
    "Use bits per symbol = log2(M) whenever an M-ary question appears.",
    "Constellation diagrams are usually easier to reason from than long equations."
  ],
  "commonMistakes": [
    "Mixing symbol count with bit count.",
    "Saying QPSK changes frequency instead of phase.",
    "Ignoring that higher-order schemes usually need better SNR."
  ],
  "quickRevision": [
    "ASK changes amplitude, FSK changes frequency, PSK changes phase.",
    "QPSK carries two bits per symbol.",
    "QAM uses both amplitude and phase."
  ],
  "insightSummary": "Digital modulation is easier to remember when you classify schemes by what they let the carrier change.",
  "formulaHighlights": [
    "bits/symbol = log2(M)",
    "QPSK: 4 states -> 2 bits/symbol",
    "QAM combines amplitude and phase"
  ],
  "relatedTopics": [
    {
      "subjectSlug": "communications",
      "topicSlug": "digital-communication"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "noise-in-communication-systems"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "signals-and-spectra"
    }
  ],
  "subjectSlug": "communications",
  "concepts": [
    "Digital modulation maps bits to a finite set of signal states.",
    "A symbol can carry multiple bits when more states are available.",
    "Constellation diagrams visualize valid signal states in I-Q space.",
    "Higher-order schemes often improve bit efficiency but demand cleaner channels."
  ],
  "subtopics": [],
  "editMeta": {
    "subject": "Communication Systems",
    "chapter": "07 Digital Modulation Techniques",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default digitalModulationTechniques;
