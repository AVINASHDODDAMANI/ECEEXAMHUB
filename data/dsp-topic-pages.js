const dspTopics = [
  {
    slug: "introduction-to-dsp",
    title: "Introduction to DSP",
    summary: "Understand analog signals, digital signals, basic DSP systems, advantages, and real-world processing flow.",
    concepts: ["Analog signals", "Digital signals", "DSP system", "Applications"],
    subtopics: ["Basics of DSP", "Advantages of DSP", "DSP applications", "Basic DSP system"],
    formula: { label: "DSP flow", expression: "input signal -> sampling -> algorithm -> output signal", note: "This is the basic path behind most DSP systems." },
    visualFocus: "analog signal vs digital signal and input-processing-output flow",
  },
  {
    slug: "discrete-time-signals-and-systems",
    title: "Discrete-Time Signals and Systems",
    summary: "Study sequences, unit impulse, unit step, exponential and sinusoidal sequences, operations, and system properties.",
    concepts: ["Unit impulse", "Unit step", "Time shifting", "Causality", "Stability"],
    subtopics: ["Discrete-time signals", "Signal operations", "Linearity", "Time invariance", "Causality", "Stability"],
    formula: { label: "Impulse sequence", expression: "delta[n] = 1 at n = 0, otherwise 0", note: "Impulse response is the starting point for LTI system analysis." },
    visualFocus: "unit impulse, unit step, shifting, folding, and stability behavior",
  },
  {
    slug: "convolution-and-correlation",
    title: "Convolution and Correlation",
    summary: "Learn linear convolution, circular convolution, auto-correlation, cross-correlation, overlap, and matching intuition.",
    concepts: ["Linear convolution", "Circular convolution", "Auto-correlation", "Cross-correlation"],
    subtopics: ["Linear convolution", "Circular convolution", "Auto-correlation", "Cross-correlation"],
    formula: { label: "Linear convolution", expression: "y[n] = sum x[k]h[n-k]", note: "Flip, shift, multiply overlapping samples, and sum." },
    visualFocus: "sliding overlap, multiplication, summation, and correlation matching",
  },
  {
    slug: "z-transform",
    title: "Z-Transform",
    summary: "Connect discrete-time sequences with Z-transform, ROC, inverse transform, pole-zero plots, and system stability.",
    concepts: ["Z-transform", "ROC", "Poles and zeros", "Stability"],
    subtopics: ["Definition of Z-transform", "ROC", "Properties", "Inverse Z-transform", "System analysis"],
    formula: { label: "Z-transform", expression: "X(z) = sum x[n]z^(-n)", note: "ROC and pole locations decide stability and causality." },
    visualFocus: "z-plane mapping, poles, zeros, ROC, and unit-circle stability",
  },
  {
    slug: "discrete-fourier-transform-dft",
    title: "Discrete Fourier Transform (DFT)",
    summary: "Convert finite time-domain samples into frequency-domain bins and interpret magnitude spectrum and circular periodicity.",
    concepts: ["DFT bins", "Magnitude spectrum", "Circular periodicity", "Frequency analysis"],
    subtopics: ["DFT definition", "Properties of DFT", "Circular convolution using DFT", "Frequency spectrum analysis"],
    formula: { label: "DFT", expression: "X[k] = sum x[n]e^(-j2pi kn/N)", note: "Each bin measures the presence of one discrete frequency basis." },
    visualFocus: "time-domain samples transforming into frequency bins",
  },
  {
    slug: "fast-fourier-transform-fft",
    title: "Fast Fourier Transform (FFT)",
    summary: "Understand why FFT is used, Radix-2 FFT, DIT, DIF, butterfly computation, and complexity reduction.",
    concepts: ["Radix-2 FFT", "DIT", "DIF", "Butterfly", "N log N"],
    subtopics: ["Need for FFT", "Radix-2 FFT", "Decimation in Time", "Decimation in Frequency", "Butterfly computation"],
    formula: { label: "Complexity reduction", expression: "DFT: O(N^2), FFT: O(N log N)", note: "FFT keeps the same DFT result with far fewer operations." },
    visualFocus: "divide-and-conquer FFT butterfly stages",
  },
  {
    slug: "digital-filters",
    title: "Digital Filters",
    summary: "Compare FIR and IIR filters, structures, frequency response, filtering action, and input-output waveform behavior.",
    concepts: ["FIR filters", "IIR filters", "Frequency response", "Noise removal"],
    subtopics: ["FIR characteristics", "IIR characteristics", "FIR vs IIR", "Frequency response"],
    formula: { label: "Filter relation", expression: "y[n] = filtered version of x[n]", note: "The exact difference equation depends on FIR or IIR structure." },
    visualFocus: "FIR versus IIR behavior and noise removal",
  },
  {
    slug: "filter-design-techniques",
    title: "Filter Design Techniques",
    summary: "Study FIR window method, Butterworth and Chebyshev IIR filters, and low-pass, high-pass, and band-pass design behavior.",
    concepts: ["Window method", "Butterworth", "Chebyshev", "Cutoff frequency"],
    subtopics: ["FIR filter design", "IIR filter design", "Low-pass filters", "High-pass filters", "Band-pass filters"],
    formula: { label: "Cutoff idea", expression: "passband -> transition band -> stopband", note: "Filter design is about meeting these frequency specifications." },
    visualFocus: "cutoff frequency, passband, stopband, and design comparison",
  },
  {
    slug: "sampling-and-reconstruction",
    title: "Sampling and Reconstruction",
    summary: "Learn sampling theorem, aliasing, reconstruction, under-sampling, proper sampling, and quantization noise.",
    concepts: ["Sampling theorem", "Aliasing", "Reconstruction", "Quantization noise"],
    subtopics: ["Sampling theorem", "Aliasing", "Reconstruction of signals", "Quantization noise"],
    formula: { label: "Sampling theorem", expression: "fs >= 2fm", note: "The sampling rate must be at least twice the highest signal frequency." },
    visualFocus: "proper sampling versus aliasing and reconstruction",
  },
  {
    slug: "dsp-processors-and-applications",
    title: "DSP Processors and Applications",
    summary: "Connect DSP processor architecture, MAC unit, real-time processing, and audio, image, speech, and communication applications.",
    concepts: ["DSP architecture", "MAC unit", "Real-time processing", "Applications"],
    subtopics: ["DSP processor architecture", "MAC unit", "Real-time processing", "Audio", "Image", "Speech", "Communication systems"],
    formula: { label: "MAC operation", expression: "accumulator = accumulator + a x b", note: "Fast multiply-accumulate is central to filtering and transforms." },
    visualFocus: "processor data path, MAC operation, and real-time application flow",
  },
];

function topicDetail(topic, index) {
  const previous = dspTopics[index - 1];
  const next = dspTopics[index + 1];

  return {
    shortTitle: topic.title,
    metaTitle: `${topic.title} | GATE DSP Notes and PSU Tutorial`,
    metaDescription: `Learn ${topic.title} for GATE ECE, PSU exams, university DSP notes, and DSP interview questions with intuition, formulas, examples, and animated visualization.`,
    keywords:
      "GATE DSP notes, Digital Signal Processing for PSU, DSP tutorial, university DSP notes, DSP interview questions",
    coreQuestion: `What should I understand first in ${topic.title}?`,
    examFocus: topic.concepts.slice(0, 3).join(", "),
    engineeringUse:
      "Used in communication systems, audio processing, instrumentation, embedded systems, and real-time signal analysis.",
    intro: [
      `${topic.title} is an important Digital Signal Processing chapter because it connects mathematical signal analysis with exam-level numerical problem solving.`,
      `For GATE ECE, PSU exams, and university semester exams, study this chapter through the idea, the main relation, and the type of question it usually creates.`,
    ],
    intuition:
      `Think of ${topic.title} as a practical DSP tool: it helps convert a signal problem into a cleaner representation so that analysis, filtering, transformation, or reconstruction becomes easier.`,
    learningGoals: [
      `Build beginner-friendly intuition for ${topic.title}.`,
      `Recognize the variables and operations used in common DSP questions.`,
      "Connect the visual flow with numerical solving and quick revision.",
    ],
    keyConcepts: topic.concepts,
    theoryCards: [
      {
        title: "Core idea",
        detail: topic.summary,
      },
      {
        title: "How to read exam questions",
        detail:
          "Identify the signal type, operation, transform, or filter requirement first. Then apply the relevant property or formula instead of starting with long algebra.",
      },
      {
        title: "Visualization focus",
        detail: `The animation highlights ${topic.visualFocus}, so the chapter feels like a process rather than a list of definitions.`,
      },
      {
        title: "Revision mindset",
        detail:
          "Keep one clean takeaway for each chapter and practice previous-year questions chapter-wise after the concept is stable.",
      },
    ],
    formulas: [topic.formula],
    examples: [
      {
        title: `${topic.title} exam check`,
        prompt: `A question asks about ${topic.title}. What is the safest first step?`,
        steps: [
          "Identify whether the problem is asking for a signal operation, transform, filter behavior, or sampling condition.",
          `Write the key relation: ${topic.formula.expression}.`,
          "Check assumptions such as sequence length, ROC, frequency range, or sampling rate before substituting values.",
        ],
        answer:
          "Start with classification and assumptions, then apply the formula. This avoids most DSP mistakes in objective and numerical questions.",
      },
    ],
    examPointers: [
      "Write the known signal, system, or transform information before solving.",
      "Check limits, index shifts, frequency bins, ROC, or sampling rate carefully.",
      "Use the visualization as a quick memory cue during revision.",
    ],
    commonMistakes: [
      "Using a formula without checking its assumptions.",
      "Mixing continuous-time notation with discrete-time notation.",
      "Forgetting whether the operation is linear, circular, transform-based, or sampling-based.",
    ],
    quickRevision: [
      topic.formula.note,
      `High-yield terms: ${topic.concepts.join(", ")}.`,
      "Practice one numerical and one conceptual question after revision.",
    ],
    insightSummary:
      `${topic.title} becomes easier when you connect the equation to the signal picture and then to the exam question pattern.`,
    relatedTopics: [previous, next]
      .filter(Boolean)
      .map((item) => ({ subjectSlug: "dsp", topicSlug: item.slug })),
  };
}

export const dspLearningSubject = {
  slug: "dsp",
  name: "Digital Signal Processing",
  weightage: "6-8 marks",
  description:
    "Study DSP basics, discrete-time signals, convolution, Z-transform, DFT, FFT, digital filters, sampling, processors, and applications for GATE and PSU exams.",
  chapters: dspTopics.map((topic) => ({
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

export const dspTopicPageMap = dspTopics.reduce((pages, topic, index) => {
  pages[topic.slug] = topicDetail(topic, index);
  return pages;
}, {});
