const noiseInCommunicationSystems = {
  "slug": "noise-in-communication-systems",
  "title": "08 Noise in Communication Systems",
  "shortTitle": "Noise in Communication Systems",
  "summary": "Noise in Communication Systems explains how unwanted random disturbances degrade signal quality and why SNR, bandwidth, and modulation choice matter.",
  "metaTitle": "Noise in Communication Systems | SNR Notes for GATE ECE",
  "metaDescription": "Study Noise in Communication Systems with signal-plus-noise intuition, SNR, internal vs external noise, AM sensitivity, and FM immunity using GATE ECE Communication Systems notes.",
  "keywords": "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, communication noise, SNR, FM noise immunity, AM noise",
  "coreQuestion": "How does unwanted random disturbance change what the receiver can recover?",
  "examFocus": "Noise addition, SNR, internal and external noise, thermal noise intuition, AM sensitivity, and FM improvement idea.",
  "engineeringUse": "Receiver design, link budgets, modulation selection, low-noise amplifiers, and radio performance analysis.",
  "intro": [
    "Noise is unavoidable in practical communication systems. The real design question is not how to remove all noise, but how to manage it so the information remains recoverable.",
    "Some noise comes from external sources such as atmosphere and man-made interference. Some comes from internal device physics such as thermal agitation."
  ],
  "intuition": "The receiver is trying to hear a conversation while random whispers are mixed into the same room.",
  "overview": [
    "SNR measures how dominant the desired signal is compared with noise. Higher SNR generally means easier and more accurate detection.",
    "AM is vulnerable because noise often changes amplitude, which is exactly where AM stores information.",
    "FM performs better in many cases because amplitude limiting can reduce certain noise components before demodulation."
  ],
  "learningGoals": [
    "Explain noise as a random disturbance added to the desired signal.",
    "Interpret SNR physically and numerically.",
    "Compare AM and FM behavior under noisy conditions."
  ],
  "keyConcepts": [
    "Noise may enter from environment or from electronic components themselves.",
    "SNR is a central quality measure in communication links.",
    "AM is more sensitive to amplitude noise because its information is in amplitude.",
    "FM often handles amplitude noise better with limiter-based receiver stages."
  ],
  "formulas": [
    {
      "label": "Signal plus noise",
      "expression": "r(t) = s(t) + n(t)",
      "note": "A compact model for the received waveform in the presence of additive noise."
    },
    {
      "label": "SNR ratio",
      "expression": "SNR = Ps / Pn",
      "note": "Signal-to-noise ratio compares desired signal power to noise power."
    },
    {
      "label": "SNR in dB",
      "expression": "SNR(dB) = 10 log10(Ps/Pn)",
      "note": "Power ratios are commonly reported in decibels."
    }
  ],
  "theoryCards": [
    {
      "title": "External noise",
      "detail": "Atmospheric noise, cosmic noise, and man-made interference arrive from outside the receiver hardware."
    },
    {
      "title": "Internal noise",
      "detail": "Thermal noise and device-generated noise arise inside circuits and usually set performance limits in sensitive receivers."
    },
    {
      "title": "SNR meaning",
      "detail": "When SNR is high, the useful signal stands out clearly. When SNR is low, the receiver has difficulty distinguishing message from randomness."
    },
    {
      "title": "AM vs FM",
      "detail": "AM is more exposed to amplitude corruption, while FM can reject many amplitude variations before detection."
    }
  ],
  "examples": [
    {
      "title": "Interpret low SNR",
      "prompt": "What does a very low SNR suggest about message recovery?",
      "steps": [
        "Low SNR means the desired signal power is not much larger than the noise power.",
        "The receiver then struggles to distinguish correct waveform variations from random ones.",
        "So detection becomes more error-prone and the recovered message quality falls."
      ],
      "answer": "Low SNR means the message is harder to recover accurately."
    }
  ],
  "examPointers": [
    "If a question asks why FM is preferred in noise, mention amplitude limiting and constant-amplitude transmission.",
    "Use 10 log for power-ratio dB conversion.",
    "Separate internal noise from external noise in descriptive answers."
  ],
  "commonMistakes": [
    "Using 20 log10 for power ratio instead of 10 log10.",
    "Calling aliasing a form of noise.",
    "Forgetting that AM stores information in amplitude."
  ],
  "quickRevision": [
    "Noise is unwanted random disturbance added to the signal.",
    "SNR compares desired power with noise power.",
    "FM is generally more noise-resistant than AM."
  ],
  "insightSummary": "Noise topics become far less abstract once you keep asking one practical question: how much of the received waveform still belongs to the message?",
  "formulaHighlights": [
    "SNR = Ps / Pn",
    "SNR(dB) = 10 log10(Ps/Pn)",
    "r(t) = s(t) + n(t)"
  ],
  "relatedTopics": [
    {
      "subjectSlug": "communications",
      "topicSlug": "angle-modulation"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "digital-modulation-techniques"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "communication-receivers"
    }
  ],
  "subjectSlug": "communications",
  "concepts": [
    "Noise may enter from environment or from electronic components themselves.",
    "SNR is a central quality measure in communication links.",
    "AM is more sensitive to amplitude noise because its information is in amplitude.",
    "FM often handles amplitude noise better with limiter-based receiver stages."
  ],
  "subtopics": [],
  "editMeta": {
    "subject": "Communication Systems",
    "chapter": "08 Noise in Communication Systems",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default noiseInCommunicationSystems;
