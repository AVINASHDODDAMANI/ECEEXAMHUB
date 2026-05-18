const angleModulation = {
  "slug": "angle-modulation",
  "title": "04 Angle Modulation",
  "shortTitle": "Angle Modulation",
  "summary": "Angle Modulation changes the carrier angle through frequency or phase variation, leading to FM and PM with strong noise-performance advantages.",
  "metaTitle": "Angle Modulation | FM and PM Notes for GATE ECE",
  "metaDescription": "Study Angle Modulation with FM and PM comparison, instantaneous frequency, deviation, bandwidth intuition, and animated Communication Systems notes for GATE ECE.",
  "keywords": "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, angle modulation, FM, PM, Carson rule",
  "coreQuestion": "What changes in the carrier during FM and PM if amplitude stays constant?",
  "examFocus": "FM and PM comparison, deviation, modulation index, NBFM vs WBFM, Carson rule, and demodulation intuition.",
  "engineeringUse": "FM broadcasting, telemetry, improved noise immunity links, and frequency-stable analog communication.",
  "intro": [
    "Angle modulation keeps carrier amplitude constant and instead changes its instantaneous angle. This immediately gives better resilience to amplitude noise.",
    "The two classic forms are FM and PM. In FM, the message controls frequency deviation. In PM, the message controls phase deviation."
  ],
  "intuition": "The wave does not grow taller; it bunches and stretches horizontally depending on the message.",
  "overview": [
    "FM is often explained as frequency movement around a center carrier value. When message amplitude increases, the carrier cycles become denser or more spread out.",
    "PM instead links the message directly to phase shift, although mathematically FM and PM are closely related through differentiation and integration.",
    "Compared with AM, angle modulation usually occupies more bandwidth but gives better noise performance in many practical cases."
  ],
  "learningGoals": [
    "Differentiate clearly between FM and PM action on a carrier.",
    "Explain instantaneous frequency and deviation in physical terms.",
    "Relate bandwidth expansion to message amplitude and frequency."
  ],
  "keyConcepts": [
    "FM changes instantaneous frequency while keeping amplitude fixed.",
    "PM changes instantaneous phase while keeping amplitude fixed.",
    "Wideband FM uses more spectrum but often gives stronger noise immunity.",
    "Angle modulation is less sensitive to amplitude noise than AM."
  ],
  "formulas": [
    {
      "label": "FM idea",
      "expression": "sFM(t) = Ac cos[2pifc t + beta sin(2pifm t)]",
      "note": "The angle now contains the message, creating frequency deviation."
    },
    {
      "label": "Carson rule",
      "expression": "BW approx 2(Delta f + fm)",
      "note": "A practical bandwidth estimate for FM."
    },
    {
      "label": "FM modulation index",
      "expression": "beta = Delta f / fm",
      "note": "FM index compares frequency deviation to message frequency."
    }
  ],
  "theoryCards": [
    {
      "title": "Instantaneous frequency",
      "detail": "In FM, the actual frequency at a given moment changes with the message. The carrier is no longer a fixed-frequency sinusoid."
    },
    {
      "title": "PM idea",
      "detail": "In PM, the phase displacement follows the message, which means a rapid message change creates stronger apparent frequency variation."
    },
    {
      "title": "Bandwidth tradeoff",
      "detail": "Angle modulation usually consumes more spectrum than conventional AM, especially in wideband FM."
    },
    {
      "title": "Noise advantage",
      "detail": "Because amplitude is constant, many amplitude fluctuations from noise can be limited before demodulation."
    }
  ],
  "examples": [
    {
      "title": "Compare AM and FM against amplitude noise",
      "prompt": "Why is FM usually more resistant to amplitude noise than AM?",
      "steps": [
        "FM carries information in frequency variation, not amplitude variation.",
        "Amplitude limiters can suppress many unwanted amplitude fluctuations before demodulation.",
        "AM cannot do this safely because the message itself sits in amplitude change."
      ],
      "answer": "FM keeps information away from amplitude, so amplitude noise can be reduced more easily."
    }
  ],
  "examPointers": [
    "If a question asks why FM resists noise better, mention constant amplitude and limiter action.",
    "Use Carson rule when a practical FM bandwidth estimate is needed.",
    "Do not mix FM index with AM index."
  ],
  "commonMistakes": [
    "Saying FM changes amplitude instead of frequency.",
    "Confusing phase deviation with frequency deviation.",
    "Forgetting that wider FM often means larger bandwidth."
  ],
  "quickRevision": [
    "AM changes height; FM and PM change angle.",
    "FM information is in frequency deviation.",
    "Carson rule gives a quick FM bandwidth estimate."
  ],
  "insightSummary": "Angle modulation is a classic example of an engineering tradeoff: more bandwidth in exchange for better performance against noise.",
  "formulaHighlights": [
    "BW approx 2(Delta f + fm)",
    "beta = Delta f / fm",
    "FM uses frequency variation; PM uses phase variation"
  ],
  "relatedTopics": [
    {
      "subjectSlug": "communications",
      "topicSlug": "amplitude-modulation"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "noise-in-communication-systems"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "communication-receivers"
    }
  ],
  "subjectSlug": "communications",
  "concepts": [
    "FM changes instantaneous frequency while keeping amplitude fixed.",
    "PM changes instantaneous phase while keeping amplitude fixed.",
    "Wideband FM uses more spectrum but often gives stronger noise immunity.",
    "Angle modulation is less sensitive to amplitude noise than AM."
  ],
  "subtopics": [],
  "editMeta": {
    "subject": "Communication Systems",
    "chapter": "04 Angle Modulation",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default angleModulation;
