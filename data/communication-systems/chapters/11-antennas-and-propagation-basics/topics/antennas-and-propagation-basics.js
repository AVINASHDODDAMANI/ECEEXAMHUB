const antennasAndPropagationBasics = {
  "slug": "antennas-and-propagation-basics",
  "title": "11 Antennas and Propagation Basics",
  "shortTitle": "Antennas and Propagation Basics",
  "summary": "Antennas and Propagation Basics explain how electromagnetic energy is radiated, directed, and carried through ground, sky, and space-wave paths.",
  "metaTitle": "Antennas and Propagation Basics | Communication Systems Notes for GATE ECE",
  "metaDescription": "Learn Antennas and Propagation Basics with radiation, directivity, propagation modes, and signal path visualization using Communication Systems notes for GATE ECE and PSU.",
  "keywords": "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, antennas and propagation basics, radiation pattern, ground wave, sky wave, space wave",
  "coreQuestion": "How does electrical energy leave an antenna and travel to a distant receiver?",
  "examFocus": "Radiation idea, antenna pattern, gain, directivity, and ground-wave, sky-wave, and space-wave propagation.",
  "engineeringUse": "Broadcasting, radar, mobile communication, satellite links, RF planning, and wireless coverage design.",
  "intro": [
    "An antenna converts guided electrical energy into electromagnetic radiation and also performs the reverse process at the receiver.",
    "Propagation basics matter because even a perfect transmitter and receiver cannot help if the wave path itself is poorly understood."
  ],
  "intuition": "The antenna launches energy into space, but the environment decides how that energy bends, reflects, spreads, and finally reaches the receiver.",
  "overview": [
    "Radiation pattern shows how strongly an antenna sends energy in different directions. This leads naturally to ideas of gain and directivity.",
    "Propagation depends on frequency and environment. Some waves follow the Earth's surface, some reflect from upper atmospheric layers, and some travel through line-of-sight paths.",
    "This chapter ties Communication Systems back to the real world because it explains what happens after transmission leaves the hardware."
  ],
  "learningGoals": [
    "Explain the basic role of an antenna in transmission and reception.",
    "Interpret gain and directivity in directional terms.",
    "Differentiate ground wave, sky wave, and space wave propagation."
  ],
  "keyConcepts": [
    "Antenna pattern describes directional strength of radiation.",
    "Directivity tells how focused the radiation is.",
    "Gain includes directional concentration and efficiency effects.",
    "Propagation path depends strongly on frequency and geometry."
  ],
  "formulas": [
    {
      "label": "Wavelength relation",
      "expression": "lambda = c / f",
      "note": "A basic relation connecting frequency to wavelength in free space."
    },
    {
      "label": "Propagation modes",
      "expression": "Ground wave / Sky wave / Space wave",
      "note": "These three labels organize the basic communication path categories."
    }
  ],
  "theoryCards": [
    {
      "title": "Radiation and reception",
      "detail": "At the transmitter, antenna current variations radiate electromagnetic waves. At the receiver, incident waves induce electrical response that the receiver can process."
    },
    {
      "title": "Pattern and directivity",
      "detail": "An antenna does not usually radiate equally in all directions. The pattern shows preferred directions, and directivity quantifies that concentration."
    },
    {
      "title": "Gain",
      "detail": "Gain indicates how effectively the antenna concentrates energy in a direction compared with a reference radiator."
    },
    {
      "title": "Propagation paths",
      "detail": "Ground waves hug the Earth, sky waves use ionospheric reflection or refraction, and space waves travel mainly by line of sight."
    }
  ],
  "examples": [
    {
      "title": "Choose the path intuition",
      "prompt": "Which propagation mode best matches direct line-of-sight transmission between towers?",
      "steps": [
        "Look for the mode associated with mostly straight-space travel.",
        "Ground wave stays near the surface, while sky wave uses upper-atmosphere reflection effects.",
        "Line-of-sight tower links are best described by space-wave propagation."
      ],
      "answer": "Space-wave propagation matches direct line-of-sight links."
    }
  ],
  "examPointers": [
    "Ground, sky, and space wave are usually asked conceptually before numerically.",
    "Directivity is about direction concentration, not simply transmitted power.",
    "Use wavelength relation quickly when moving between size and frequency intuition."
  ],
  "commonMistakes": [
    "Treating gain and directivity as identical in every context.",
    "Confusing sky-wave propagation with line-of-sight space-wave links.",
    "Ignoring frequency dependence in propagation behavior."
  ],
  "quickRevision": [
    "Antenna converts guided energy to radiated energy and back.",
    "Pattern, gain, and directivity describe direction behavior.",
    "Ground wave, sky wave, and space wave are the three basic propagation paths."
  ],
  "insightSummary": "Propagation topics become much less intimidating once you visualize the actual path the signal takes through the environment.",
  "formulaHighlights": [
    "lambda = c / f",
    "Ground wave / Sky wave / Space wave"
  ],
  "relatedTopics": [
    {
      "subjectSlug": "communications",
      "topicSlug": "introduction-to-communication-systems"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "communication-receivers"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "signals-and-spectra"
    }
  ],
  "subjectSlug": "communications",
  "concepts": [
    "Antenna pattern describes directional strength of radiation.",
    "Directivity tells how focused the radiation is.",
    "Gain includes directional concentration and efficiency effects.",
    "Propagation path depends strongly on frequency and geometry."
  ],
  "subtopics": [],
  "editMeta": {
    "subject": "Communication Systems",
    "chapter": "11 Antennas and Propagation Basics",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default antennasAndPropagationBasics;
