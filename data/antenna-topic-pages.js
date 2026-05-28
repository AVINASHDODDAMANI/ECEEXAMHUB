const antennaTopics = [
  {
    slug: "introduction-to-antennas",
    title: "Introduction to Antennas",
    summary: "Understand what antennas do, how radiation begins, how transmission and reception work, and how antenna categories differ.",
    concepts: ["Radiation mechanism", "Transmitting antenna", "Receiving antenna", "Antenna categories"],
    subtopics: ["Definition of antenna", "Functions of antenna", "Radiation mechanism", "Wire, aperture, array, and reflector antennas"],
    formula: { label: "Communication flow", expression: "transmitter -> antenna -> EM wave -> receiving antenna -> receiver", note: "An antenna is the transition between guided electrical signals and radiated electromagnetic waves." },
    visualType: "tx-rx-flow",
    visualFocus: "transmitter to antenna to radiated wave to receiver flow",
  },
  {
    slug: "antenna-fundamentals",
    title: "Antenna Fundamentals",
    summary: "Study radiation pattern, gain, directivity, beamwidth, polarization, effective aperture, and Friis transmission intuition.",
    concepts: ["Radiation pattern", "Gain", "Directivity", "Polarization", "Friis equation"],
    subtopics: ["Radiation intensity", "Power density", "Effective aperture", "Polarization", "Friis transmission equation"],
    formula: { label: "Friis transmission equation", expression: "Pr = Pt Gt Gr (lambda / 4 pi R)^2", note: "Friis links received power with antenna gains, wavelength, and separation distance." },
    visualType: "radiation-pattern",
    visualFocus: "beamwidth, gain, directivity, polarization, and link-power relation",
  },
  {
    slug: "dipole-and-monopole-antennas",
    title: "Dipole and Monopole Antennas",
    summary: "Build intuition for Hertzian dipoles, half-wave dipoles, quarter-wave monopoles, current distribution, and radiation resistance.",
    concepts: ["Hertzian dipole", "Half-wave dipole", "Quarter-wave monopole", "Radiation resistance"],
    subtopics: ["Hertzian dipole", "Half-wave dipole", "Quarter-wave monopole", "Current distribution", "Radiation resistance"],
    formula: { label: "Half-wave dipole idea", expression: "l approx lambda / 2", note: "A resonant half-wave dipole has sinusoidal current distribution with current maximum near the center." },
    visualType: "dipole",
    visualFocus: "dipole current distribution and monopole ground reflection intuition",
  },
  {
    slug: "antenna-arrays",
    title: "Antenna Arrays",
    summary: "Understand how multiple antenna elements combine fields, create array factor, and steer beams in broadside or end-fire directions.",
    concepts: ["Array factor", "Broadside array", "End-fire array", "Beam steering", "Pattern multiplication"],
    subtopics: ["Array fundamentals", "Broadside array", "End-fire array", "Array factor", "Phased arrays"],
    formula: { label: "Pattern multiplication", expression: "total pattern = element pattern x array factor", note: "Array behavior comes from element radiation multiplied by spacing and phase effects." },
    visualType: "array",
    visualFocus: "multi-element phase interaction and beam steering",
  },
  {
    slug: "special-antennas",
    title: "Special Antennas",
    summary: "Compare loop, helical, horn, parabolic reflector, and microstrip patch antennas through structure and radiation behavior.",
    concepts: ["Loop antenna", "Helical antenna", "Horn antenna", "Parabolic reflector", "Patch antenna"],
    subtopics: ["Loop antenna", "Helical antenna", "Horn antenna", "Parabolic reflector antenna", "Microstrip patch antenna"],
    formula: { label: "Reflector intuition", expression: "feed energy -> reflector focus -> narrow beam", note: "Special antennas are often chosen for size, bandwidth, polarization, or directivity requirements." },
    visualType: "special",
    visualFocus: "special antenna structures and their radiation intuition",
  },
  {
    slug: "wave-propagation-basics",
    title: "Wave Propagation Basics",
    summary: "Visualize reflection, refraction, diffraction, scattering, and the difference between ground wave, sky wave, and space wave paths.",
    concepts: ["Reflection", "Refraction", "Diffraction", "Scattering", "Propagation modes"],
    subtopics: ["Electromagnetic wave propagation", "Reflection", "Refraction", "Diffraction", "Scattering", "Ground, sky, and space wave"],
    formula: { label: "Propagation modes", expression: "ground wave | sky wave | space wave", note: "The useful path depends strongly on frequency, terrain, atmosphere, and antenna height." },
    visualType: "propagation-modes",
    visualFocus: "wave paths and atmospheric interaction",
  },
  {
    slug: "ground-wave-and-sky-wave-propagation",
    title: "Ground Wave and Sky Wave Propagation",
    summary: "Study surface-wave travel, ionospheric reflection, critical frequency, MUF, and long-distance radio communication.",
    concepts: ["Ground wave", "Sky wave", "Ionosphere", "Critical frequency", "MUF"],
    subtopics: ["Ground wave propagation", "Surface wave propagation", "Ionosphere basics", "Sky wave propagation", "Critical frequency", "MUF"],
    formula: { label: "MUF intuition", expression: "MUF = fc sec theta", note: "MUF rises when the wave enters the ionosphere obliquely instead of vertically." },
    visualType: "ionosphere",
    visualFocus: "surface wave and ionosphere-reflected sky wave flow",
  },
  {
    slug: "space-wave-propagation",
    title: "Space Wave Propagation",
    summary: "Understand line-of-sight links, tropospheric propagation, duct propagation, microwave propagation, and radar signal paths.",
    concepts: ["Line of sight", "Troposphere", "Duct propagation", "Microwave propagation", "Radar"],
    subtopics: ["Line-of-sight communication", "Tropospheric propagation", "Duct propagation", "Microwave propagation", "Radar basics"],
    formula: { label: "LOS intuition", expression: "range increases with antenna height", note: "Space-wave communication depends on direct and reflected paths near the Earth's surface." },
    visualType: "space-wave",
    visualFocus: "line-of-sight, microwave, duct, and radar propagation paths",
  },
  {
    slug: "antenna-measurements",
    title: "Antenna Measurements",
    summary: "Learn radiation pattern testing, gain measurement, VSWR, impedance measurement, matching, and reflection coefficient intuition.",
    concepts: ["Radiation pattern test", "Gain measurement", "VSWR", "Impedance matching", "Reflection coefficient"],
    subtopics: ["Radiation pattern measurement", "Gain measurement", "VSWR measurement", "Impedance measurement"],
    formula: { label: "VSWR relation", expression: "VSWR = (1 + |Gamma|) / (1 - |Gamma|)", note: "Lower reflection coefficient means better matching and lower VSWR." },
    visualType: "measurement",
    visualFocus: "test setup, reflected wave, VSWR, and impedance matching",
  },
  {
    slug: "modern-antenna-applications",
    title: "Modern Antenna Applications",
    summary: "Connect satellite links, mobile towers, radar scanning, smart antennas, beamforming, and MIMO communication basics.",
    concepts: ["Satellite antenna", "Mobile tower", "Radar scanning", "Smart antenna", "MIMO"],
    subtopics: ["Satellite communication antennas", "Mobile communication antennas", "Radar antennas", "Smart antennas", "MIMO antenna basics"],
    formula: { label: "MIMO idea", expression: "multiple antennas -> multiple spatial paths -> higher capacity", note: "Modern systems use antenna diversity and beamforming to improve reliability and throughput." },
    visualType: "modern",
    visualFocus: "satellite, mobile, radar, smart antenna, and MIMO application flow",
  },
];

function topicDetail(topic, index) {
  const previous = antennaTopics[index - 1];
  const next = antennaTopics[index + 1];

  return {
    shortTitle: topic.title,
    metaTitle: `${topic.title} GATE ECE Antenna Quick Notes + Formulas + PYQs`,
    metaDescription: `Learn ${topic.title} for GATE ECE, PSU exams, university microwave and antenna quick notes, and antenna interview questions with formulas, intuition, examples, and animated visualization.`,
    keywords:
      "GATE Antenna and Wave Propagation notes, Wave propagation for PSU, Antenna engineering tutorial, Antenna interview questions, Microwave and antenna notes",
    coreQuestion: `What is the engineering intuition behind ${topic.title}?`,
    examFocus: topic.concepts.slice(0, 3).join(", "),
    engineeringUse:
      "Used in wireless communication, satellite links, radar systems, broadcasting, microwave links, mobile networks, smart antennas, and MIMO systems.",
    intro: [
      `${topic.title} is an important Antenna and Wave Propagation topic because it connects field theory with practical wireless and microwave systems.`,
      "For GATE ECE, PSU exams, university semester learning, and interview preparation, study this topic through diagrams, parameters, formulas, and propagation assumptions.",
    ],
    intuition:
      `Think of ${topic.title} as a signal-path problem: energy leaves a source, interacts with an antenna or medium, and reaches a receiver with changed strength, direction, phase, or polarization.`,
    learningGoals: [
      `Build beginner-friendly intuition for ${topic.title}.`,
      "Recognize important labels, parameters, and assumptions in diagram-based questions.",
      "Connect the visual flow with exam formulas, revision takeaways, and antenna interview questions.",
    ],
    keyConcepts: topic.concepts,
    theoryCards: [
      { title: "Core idea", detail: topic.summary },
      {
        title: "How to read exam questions",
        detail:
          "Identify whether the question is asking about antenna parameters, antenna type, array behavior, propagation path, link equation, measurement, or application.",
      },
      {
        title: "Visualization focus",
        detail: `The animation highlights ${topic.visualFocus}, so the concept is easier to remember as a physical signal story.`,
      },
      {
        title: "Revision mindset",
        detail:
          "Keep one diagram, one parameter meaning, and one exam takeaway for every antenna or propagation chapter.",
      },
    ],
    formulas: [topic.formula],
    examples: [
      {
        title: `${topic.title} exam check`,
        prompt: `A question asks about ${topic.title}. What is the safest first step?`,
        steps: [
          "Identify the antenna, wave path, parameter, or measurement setup in the diagram.",
          `Recall the anchor relation: ${topic.formula.expression}.`,
          "Check frequency range, distance, polarization, gain, matching, or propagation mode before substituting values.",
        ],
        answer:
          "Start with the physical path and assumptions, then apply the formula. This avoids most antenna and propagation mistakes.",
      },
    ],
    examPointers: [
      "Draw or mentally trace the signal path before solving.",
      "Separate antenna parameters from propagation-medium effects.",
      "For numericals, check units for wavelength, frequency, distance, gain, and power.",
    ],
    commonMistakes: [
      "Confusing gain with directivity or treating efficiency as always equal to one.",
      "Using Friis equation without checking far-field and line-of-sight assumptions.",
      "Mixing ground wave, sky wave, and space wave behavior across frequency ranges.",
    ],
    quickRevision: [
      topic.formula.note,
      `High-yield terms: ${topic.concepts.join(", ")}.`,
      "Practice one diagram question and one formula-based question after revision.",
    ],
    insightSummary:
      `${topic.title} becomes easier when you connect the diagram to energy direction, field behavior, and exam assumptions.`,
    relatedTopics: [previous, next]
      .filter(Boolean)
      .map((item) => ({ subjectSlug: "antenna-wave-propagation", topicSlug: item.slug })),
  };
}

export const antennaLearningSubject = {
  slug: "antenna-wave-propagation",
  name: "Antenna & Wave Propagation",
  weightage: "4-6 marks",
  description:
    "Study antenna parameters, dipoles, arrays, special antennas, propagation modes, ionospheric propagation, space wave links, measurements, and modern applications for GATE and PSU exams.",
  chapters: antennaTopics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    topics: [
      {
        slug: topic.slug,
        title: topic.title,
        summary: topic.summary,
        estimatedTime: "35 min",
        status: "ready",
        concepts: topic.concepts,
        subtopics: topic.subtopics,
      },
    ],
  })),
};

export const antennaTopicPageMap = antennaTopics.reduce((pages, topic, index) => {
  pages[topic.slug] = topicDetail(topic, index);
  return pages;
}, {});

export { antennaTopics };
