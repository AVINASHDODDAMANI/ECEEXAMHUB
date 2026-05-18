const signalsAndSpectra = {
  "slug": "signals-and-spectra",
  "title": "02 Signals and Spectra",
  "shortTitle": "Signals and Spectra",
  "summary": "Signals and spectra explain how the same communication waveform can be viewed in time and frequency, which is essential for bandwidth, filtering, and modulation understanding.",
  "metaTitle": "Signals and Spectra | Communication Systems Notes for GATE ECE",
  "metaDescription": "Study Signals and Spectra with time-domain to frequency-domain intuition, bandwidth and PSD explanation, step-by-step visuals, and exam-oriented Communication Systems notes for GATE ECE.",
  "keywords": "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, signals and spectra, bandwidth, PSD",
  "coreQuestion": "Why do communication engineers care so much about the frequency-domain view of a signal?",
  "examFocus": "Time and frequency domain relation, bandwidth, spectral movement, orthogonality, and PSD basics.",
  "engineeringUse": "Filter design, channel allocation, receiver tuning, spectral efficiency, and interference control.",
  "intro": [
    "A signal can look simple in time but reveal much more in frequency. Communication engineers need both views because channels and filters are usually frequency selective.",
    "Spectral thinking answers questions such as: how much bandwidth is needed, where sidebands appear, and whether two signals can share a channel."
  ],
  "intuition": "Time-domain tells the story of how a waveform changes; frequency-domain tells which sinusoidal ingredients build that waveform.",
  "overview": [
    "Any practical communication signal can be represented as a combination of frequency components. This makes Fourier-based thinking central to understanding bandwidth and modulation.",
    "Bandwidth is not just a formula word. It directly limits how many channels can coexist and how fast information can be sent through a medium.",
    "Power spectral density becomes important when the signal or noise has random behavior, because it shows how power spreads across frequency."
  ],
  "learningGoals": [
    "Relate waveform shape in time to occupied content in frequency.",
    "Explain bandwidth in a communication meaning, not only mathematically.",
    "Interpret PSD as power distribution across frequency."
  ],
  "keyConcepts": [
    "Narrow time pulses usually spread across wider frequency ranges.",
    "Bandwidth is the span of significant frequency content.",
    "Frequency-domain plots make filtering and channel allocation easier to visualize.",
    "PSD is especially useful for random signals and noise analysis."
  ],
  "formulas": [
    {
      "label": "Fourier transform idea",
      "expression": "X(f) = integral x(t)e^(-j2pift) dt",
      "note": "The exact form is less important initially than the interpretation: it maps time behavior into frequency content."
    },
    {
      "label": "Bandwidth intuition",
      "expression": "BW = fH - fL",
      "note": "Bandwidth is the occupied frequency span between lower and upper significant frequencies."
    },
    {
      "label": "PSD notation",
      "expression": "Sx(f)",
      "note": "PSD indicates how signal or noise power is distributed with frequency."
    }
  ],
  "theoryCards": [
    {
      "title": "Time view",
      "detail": "Time-domain representation shows amplitude variation with time and is useful for waveform shape, delay, and transient intuition."
    },
    {
      "title": "Frequency view",
      "detail": "Frequency-domain representation shows where spectral energy exists, which matters for channels, filters, and carrier allocation."
    },
    {
      "title": "Bandwidth meaning",
      "detail": "A broader bandwidth usually means more frequency resources are consumed. In communication design that often means less efficient use of spectrum."
    },
    {
      "title": "PSD meaning",
      "detail": "For random signals and noise, PSD is more informative than a single waveform because it describes average power spread."
    }
  ],
  "examples": [
    {
      "title": "Why sharp pulses need more spectrum",
      "prompt": "Why does making a pulse narrower in time usually widen its spectrum?",
      "steps": [
        "A rapid time change requires more high-frequency content to reproduce the shape.",
        "That means more sinusoidal components are needed in the Fourier representation.",
        "So narrowing a pulse in time generally spreads the signal further in frequency."
      ],
      "answer": "Shorter time localization usually demands broader frequency occupancy."
    }
  ],
  "examPointers": [
    "When asked about filter action, switch to the frequency-domain view immediately.",
    "Bandwidth answers are often conceptual before they become numerical.",
    "PSD is the safe keyword when the signal or noise is random."
  ],
  "commonMistakes": [
    "Thinking time-domain and frequency-domain are two unrelated signals.",
    "Using bandwidth without stating which frequencies define it.",
    "Confusing PSD with amplitude spectrum."
  ],
  "quickRevision": [
    "Time view shows variation with time; spectrum shows variation with frequency.",
    "Bandwidth measures occupied frequency span.",
    "PSD shows power distribution across frequency."
  ],
  "insightSummary": "Communication Systems becomes much easier once you naturally switch between waveform intuition and spectral intuition.",
  "formulaHighlights": [
    "X(f) = Fourier view of x(t)",
    "BW = fH - fL",
    "Sx(f) gives power spread"
  ],
  "relatedTopics": [
    {
      "subjectSlug": "communications",
      "topicSlug": "amplitude-modulation"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "pulse-modulation"
    },
    {
      "subjectSlug": "signals",
      "topicSlug": "fourier-transform"
    }
  ],
  "subjectSlug": "communications",
  "concepts": [
    "Narrow time pulses usually spread across wider frequency ranges.",
    "Bandwidth is the span of significant frequency content.",
    "Frequency-domain plots make filtering and channel allocation easier to visualize.",
    "PSD is especially useful for random signals and noise analysis."
  ],
  "subtopics": [],
  "editMeta": {
    "subject": "Communication Systems",
    "chapter": "02 Signals and Spectra",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default signalsAndSpectra;
