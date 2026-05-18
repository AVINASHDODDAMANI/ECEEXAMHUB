const pulseModulation = {
  "slug": "pulse-modulation",
  "title": "05 Pulse Modulation",
  "shortTitle": "Pulse Modulation",
  "summary": "Pulse Modulation turns information into sampled pulses and compares how pulse amplitude, width, or position can represent a message.",
  "metaTitle": "Pulse Modulation | PAM PWM PPM Notes for GATE ECE",
  "metaDescription": "Learn Pulse Modulation with sampling, PAM, PWM, PPM, aliasing, and Nyquist explanation using animated Communication Systems notes for GATE ECE and university exams.",
  "keywords": "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, pulse modulation, PAM, PWM, PPM, sampling theorem",
  "coreQuestion": "How can a continuous message be represented using discrete pulses?",
  "examFocus": "Sampling process, PAM, PWM, PPM, Nyquist rate, aliasing, and reconstruction intuition.",
  "engineeringUse": "Digital interfacing, control pulses, data links, switching systems, and sampled communication blocks.",
  "intro": [
    "Pulse modulation sits between analog thinking and digital thinking. It keeps the message idea but represents it using repeated pulses.",
    "The sampling process is the entry point. Once the signal is sampled, different pulse parameters can be changed to carry information."
  ],
  "intuition": "Imagine regularly taking snapshots of the message and then storing each snapshot in the height, width, or time position of a pulse.",
  "overview": [
    "PAM changes pulse amplitude, PWM changes pulse width, and PPM changes pulse position. Each scheme chooses a different pulse feature to carry the message.",
    "Sampling is the base concept behind these schemes, so Nyquist rate and aliasing appear naturally here.",
    "If the sampling frequency is too low, different spectral replicas overlap and information is lost through aliasing."
  ],
  "learningGoals": [
    "Connect the sampling process to pulse-based communication schemes.",
    "Differentiate PAM, PWM, and PPM by the pulse parameter that changes.",
    "Explain aliasing and Nyquist condition in simple language."
  ],
  "keyConcepts": [
    "Sampling converts a continuous-time message into a discrete-time sequence.",
    "PAM changes amplitude, PWM changes width, and PPM changes pulse timing.",
    "Nyquist criterion avoids overlap between spectral replicas.",
    "Aliasing is not noise; it is a sampling-rate problem."
  ],
  "formulas": [
    {
      "label": "Nyquist condition",
      "expression": "fs >= 2fm",
      "note": "The sampling frequency should be at least twice the highest message frequency."
    },
    {
      "label": "Sampling period",
      "expression": "Ts = 1 / fs",
      "note": "Useful when problems give time spacing instead of frequency."
    },
    {
      "label": "Pulse categories",
      "expression": "PAM / PWM / PPM",
      "note": "These names remind you which pulse property carries information."
    }
  ],
  "theoryCards": [
    {
      "title": "Sampling",
      "detail": "Sampling takes values of the message at periodic instants. This produces a sequence that can later be processed or encoded."
    },
    {
      "title": "PAM",
      "detail": "In PAM, pulse height follows the message amplitude, so the pulse train directly resembles sampled amplitudes."
    },
    {
      "title": "PWM and PPM",
      "detail": "In PWM the pulse width changes, while in PPM the pulse timing shifts around a reference position."
    },
    {
      "title": "Aliasing",
      "detail": "Aliasing happens when spectral copies overlap due to insufficient sampling frequency. Once overlap occurs, the original spectrum cannot be separated ideally."
    }
  ],
  "examples": [
    {
      "title": "Detect the risky sampling rate",
      "prompt": "A message has highest frequency 6 kHz. Why is 8 kHz sampling unsafe?",
      "steps": [
        "Nyquist requires at least twice the highest message frequency.",
        "Twice 6 kHz is 12 kHz, so 8 kHz is below the safe ideal limit.",
        "That low rate can cause spectral overlap and aliasing."
      ],
      "answer": "8 kHz is below the 12 kHz Nyquist rate, so aliasing can occur."
    }
  ],
  "examPointers": [
    "State the highest message frequency before applying Nyquist.",
    "When the question mentions distorted sampled reconstruction, think aliasing first.",
    "PAM, PWM, and PPM are often tested by the changing pulse parameter."
  ],
  "commonMistakes": [
    "Mixing aliasing with additive noise.",
    "Forgetting that PWM changes width, not amplitude.",
    "Using sampling frequency lower than twice the highest message frequency."
  ],
  "quickRevision": [
    "Sampling is the entry point for pulse modulation.",
    "PAM changes amplitude, PWM changes width, PPM changes position.",
    "Aliasing happens when fs is too low."
  ],
  "insightSummary": "Pulse modulation is the bridge topic that makes the move from analog communication to digital communication feel natural instead of abrupt.",
  "formulaHighlights": [
    "fs >= 2fm",
    "Ts = 1 / fs",
    "PAM / PWM / PPM"
  ],
  "relatedTopics": [
    {
      "subjectSlug": "communications",
      "topicSlug": "digital-communication"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "signals-and-spectra"
    },
    {
      "subjectSlug": "signals",
      "topicSlug": "sampling-theorem"
    }
  ],
  "subjectSlug": "communications",
  "concepts": [
    "Sampling converts a continuous-time message into a discrete-time sequence.",
    "PAM changes amplitude, PWM changes width, and PPM changes pulse timing.",
    "Nyquist criterion avoids overlap between spectral replicas.",
    "Aliasing is not noise; it is a sampling-rate problem."
  ],
  "subtopics": [],
  "editMeta": {
    "subject": "Communication Systems",
    "chapter": "05 Pulse Modulation",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default pulseModulation;
