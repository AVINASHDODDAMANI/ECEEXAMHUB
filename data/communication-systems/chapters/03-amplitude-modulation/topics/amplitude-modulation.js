const amplitudeModulation = {
  "slug": "amplitude-modulation",
  "title": "03 Amplitude Modulation (AM)",
  "shortTitle": "Amplitude Modulation (AM)",
  "summary": "Amplitude Modulation varies the carrier amplitude according to the message and introduces carrier, upper sideband, and lower sideband components in the spectrum.",
  "metaTitle": "Amplitude Modulation (AM) | Communication Systems Notes for GATE ECE",
  "metaDescription": "Learn AM waveform formation, modulation index, envelope detection, sidebands, and AM spectrum with animated Communication Systems notes for GATE ECE and PSU preparation.",
  "keywords": "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, amplitude modulation, modulation index, envelope detector",
  "coreQuestion": "How does a low-frequency message control a high-frequency carrier in AM?",
  "examFocus": "AM equation, modulation index, sidebands, bandwidth, power relations, and envelope detection.",
  "engineeringUse": "Broadcast radio, low-complexity modulation teaching, and basic analog front-end understanding.",
  "intro": [
    "AM is the first modulation scheme many students meet because it clearly shows how a message rides on a carrier.",
    "The carrier frequency shifts the message to a high-frequency band suitable for radiation or long-distance transmission."
  ],
  "intuition": "The message acts like a slow envelope that stretches and squeezes the height of a much faster carrier wave.",
  "overview": [
    "In conventional AM, the carrier amplitude changes in step with the message, while carrier frequency remains fixed.",
    "The frequency-domain view is important because AM creates sidebands around the carrier. Those sidebands actually carry the message information.",
    "Envelope detection works well only when modulation is not overdone, which is why modulation index matters conceptually and numerically."
  ],
  "learningGoals": [
    "Write the standard AM expression and identify message and carrier parts.",
    "Explain modulation index and its effect on waveform shape.",
    "Interpret AM sidebands and bandwidth in frequency domain."
  ],
  "keyConcepts": [
    "Carrier provides a high-frequency vehicle for the message.",
    "Sidebands appear at carrier plus-minus message frequency.",
    "Envelope follows the message when modulation index is at most one.",
    "Overmodulation distorts envelope detection."
  ],
  "formulas": [
    {
      "label": "AM signal",
      "expression": "s(t) = Ac[1 + ma cos(2pifm t)] cos(2pifc t)",
      "note": "This standard form shows the carrier amplitude changing with the message."
    },
    {
      "label": "Modulation index",
      "expression": "ma = Am / Ac",
      "note": "For simple sinusoidal AM, modulation index compares message amplitude to carrier scaling."
    },
    {
      "label": "AM bandwidth",
      "expression": "BW = 2fm",
      "note": "Conventional AM needs two sidebands, each spanning the message bandwidth."
    }
  ],
  "theoryCards": [
    {
      "title": "Carrier and message",
      "detail": "The carrier is high frequency and easy to transmit. The message is usually low frequency and contains the useful information."
    },
    {
      "title": "Envelope meaning",
      "detail": "The outer shape of the AM waveform follows the message. That is why a diode-based envelope detector can recover the message under proper conditions."
    },
    {
      "title": "Sidebands",
      "detail": "The upper and lower sidebands are mirror-shifted copies of the message spectrum around the carrier."
    },
    {
      "title": "Power tradeoff",
      "detail": "A large part of conventional AM power sits in the carrier, even though the sidebands carry the actual message information."
    }
  ],
  "examples": [
    {
      "title": "Check modulation safety",
      "prompt": "Why is ma > 1 a problem for simple envelope detection?",
      "steps": [
        "When modulation index exceeds one, the envelope no longer reproduces the message cleanly.",
        "Envelope crossings and distortion appear in the waveform.",
        "A simple detector then recovers a distorted output instead of the original message."
      ],
      "answer": "Overmodulation breaks the clean envelope shape required by envelope detection."
    }
  ],
  "examPointers": [
    "In conventional AM, bandwidth is twice the highest message frequency.",
    "If the question mentions envelope distortion, check modulation index first.",
    "Sidebands carry information; the carrier mainly assists transmission and detection."
  ],
  "commonMistakes": [
    "Forgetting that AM produces two sidebands around the carrier.",
    "Confusing modulation index with message frequency.",
    "Saying the carrier alone carries the information."
  ],
  "quickRevision": [
    "AM varies carrier amplitude, not frequency or phase.",
    "Upper and lower sidebands appear at fc plus-minus fm.",
    "Envelope detection works best when ma is not greater than one."
  ],
  "insightSummary": "AM is the cleanest topic for connecting waveform intuition, spectrum intuition, and receiver intuition in one place.",
  "formulaHighlights": [
    "s(t) = Ac[1 + ma cos(2pifm t)] cos(2pifc t)",
    "ma = Am / Ac",
    "BW = 2fm"
  ],
  "relatedTopics": [
    {
      "subjectSlug": "communications",
      "topicSlug": "signals-and-spectra"
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
    "Carrier provides a high-frequency vehicle for the message.",
    "Sidebands appear at carrier plus-minus message frequency.",
    "Envelope follows the message when modulation index is at most one.",
    "Overmodulation distorts envelope detection."
  ],
  "subtopics": [],
  "editMeta": {
    "subject": "Communication Systems",
    "chapter": "03 Amplitude Modulation (AM)",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default amplitudeModulation;
