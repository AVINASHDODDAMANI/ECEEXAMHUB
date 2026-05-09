export const communicationLearningSubject = {
  slug: "communications",
  name: "Communication Systems",
  weightage: "10-12 marks",
  description:
    "Cover analog and digital communication concepts, noise, receivers, and information theory with exam-focused intuition and visual learning.",
  chapters: [
    {
      slug: "communication-fundamentals",
      title: "Communication Fundamentals",
      topics: [
        {
          slug: "introduction-to-communication-systems",
          title: "01 Introduction to Communication Systems",
          summary:
            "Understand the communication chain, message flow, wired and wireless links, and where noise enters the system.",
          estimatedTime: "35 min",
          status: "ready",
          concepts: ["Source to destination", "Transmitter and receiver", "Channel noise"],
          subtopics: [
            "Communication blocks",
            "Wired and wireless links",
            "Signal transmission idea",
            "Noise in the channel",
          ],
        },
        {
          slug: "signals-and-spectra",
          title: "02 Signals and Spectra",
          summary:
            "Move between time-domain and frequency-domain thinking, bandwidth intuition, and PSD basics for Communication Systems notes.",
          estimatedTime: "40 min",
          status: "ready",
          concepts: ["Bandwidth", "Spectrum", "PSD intuition"],
          subtopics: [
            "Time-domain signals",
            "Frequency-domain spectra",
            "Bandwidth idea",
            "Power spectral density",
          ],
        },
      ],
    },
    {
      slug: "analog-modulation",
      title: "Analog Modulation",
      topics: [
        {
          slug: "amplitude-modulation",
          title: "03 Amplitude Modulation (AM)",
          summary:
            "Study message and carrier combination, modulation index, sidebands, envelope detection, and AM power relations.",
          estimatedTime: "45 min",
          status: "ready",
          concepts: ["Carrier and message", "Envelope", "Sidebands"],
          subtopics: [
            "AM waveform",
            "Modulation index",
            "Envelope detector",
            "AM spectrum",
          ],
        },
        {
          slug: "angle-modulation",
          title: "04 Angle Modulation",
          summary:
            "Compare FM and PM, instantaneous frequency, deviation, bandwidth, and why angle modulation improves noise performance.",
          estimatedTime: "45 min",
          status: "ready",
          concepts: ["FM", "PM", "Deviation and bandwidth"],
          subtopics: [
            "FM waveform",
            "PM waveform",
            "NBFM and WBFM",
            "FM demodulation intuition",
          ],
        },
        {
          slug: "pulse-modulation",
          title: "05 Pulse Modulation",
          summary:
            "Understand sampling, PAM, PWM, PPM, aliasing, and Nyquist intuition for pulse-based communication.",
          estimatedTime: "40 min",
          status: "ready",
          concepts: ["Sampling", "Pulse parameters", "Aliasing"],
          subtopics: [
            "PAM",
            "PWM",
            "PPM",
            "Nyquist rate",
          ],
        },
      ],
    },
    {
      slug: "digital-communication-basics",
      title: "Digital Communication Basics",
      topics: [
        {
          slug: "digital-communication",
          title: "06 Digital Communication",
          summary:
            "Follow PCM, quantization, binary encoding, delta modulation, and quantization error from analog input to digital output.",
          estimatedTime: "45 min",
          status: "ready",
          concepts: ["PCM", "Quantization", "Delta modulation"],
          subtopics: [
            "Sampling to coding",
            "Quantization staircase",
            "PCM blocks",
            "Delta modulation",
          ],
        },
        {
          slug: "digital-modulation-techniques",
          title: "07 Digital Modulation Techniques",
          summary:
            "Compare ASK, FSK, PSK, QPSK, and QAM using symbol mapping, constellation intuition, and transmission tradeoffs.",
          estimatedTime: "50 min",
          status: "ready",
          concepts: ["ASK/FSK/PSK", "Constellation", "Symbol mapping"],
          subtopics: [
            "ASK",
            "FSK",
            "PSK and QPSK",
            "QAM mapping",
          ],
        },
      ],
    },
    {
      slug: "noise-and-information",
      title: "Noise and Information Theory",
      topics: [
        {
          slug: "noise-in-communication-systems",
          title: "08 Noise in Communication Systems",
          summary:
            "See how noise corrupts signals, how SNR is interpreted, and why FM is usually more noise-resistant than AM.",
          estimatedTime: "40 min",
          status: "ready",
          concepts: ["Noise addition", "SNR", "Noise immunity"],
          subtopics: [
            "Internal and external noise",
            "SNR",
            "AM noise sensitivity",
            "FM noise immunity",
          ],
        },
        {
          slug: "information-theory",
          title: "09 Information Theory",
          summary:
            "Revise self information, entropy, channel capacity, and coding intuition for GATE ECE Communication Systems.",
          estimatedTime: "35 min",
          status: "ready",
          concepts: ["Entropy", "Redundancy", "Channel capacity"],
          subtopics: [
            "Self information",
            "Entropy",
            "Capacity",
            "Coding intuition",
          ],
        },
      ],
    },
    {
      slug: "receivers-and-propagation",
      title: "Receivers and Propagation",
      topics: [
        {
          slug: "communication-receivers",
          title: "10 Communication Receivers",
          summary:
            "Learn the superheterodyne receiver path, mixing, IF stage, detection, and why frequency conversion is useful.",
          estimatedTime: "45 min",
          status: "ready",
          concepts: ["RF to IF", "Mixer", "Detection"],
          subtopics: [
            "RF stage",
            "Mixer and LO",
            "IF amplifier",
            "Demodulation",
          ],
        },
        {
          slug: "antennas-and-propagation-basics",
          title: "11 Antennas and Propagation Basics",
          summary:
            "Build intuition for radiation, directivity, propagation modes, and how signals travel from antenna to receiver.",
          estimatedTime: "40 min",
          status: "ready",
          concepts: ["Radiation", "Gain", "Propagation paths"],
          subtopics: [
            "Radiation pattern",
            "Ground wave",
            "Sky wave",
            "Space wave",
          ],
        },
      ],
    },
  ],
};

const communicationTopicPages = [
  {
    slug: "introduction-to-communication-systems",
    title: "01 Introduction to Communication Systems",
    shortTitle: "Introduction to Communication Systems",
    summary:
      "Communication Systems starts with one central story: information must travel from source to destination through hardware and a channel that may add noise or distortion.",
    metaTitle:
      "Introduction to Communication Systems | GATE ECE Communication Systems Notes",
    metaDescription:
      "Learn Introduction to Communication Systems with source-transmitter-channel-receiver flow, beginner intuition, animated explanation, exam tips, and Communication Systems notes for GATE ECE and university exam preparation.",
    keywords:
      "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, introduction to communication systems, source transmitter receiver channel",
    coreQuestion:
      "How does information travel from source to destination in a practical communication link?",
    examFocus:
      "Communication blocks, wired vs wireless links, channel noise, signal representation, and basic system classification.",
    engineeringUse:
      "Mobile communication, broadcasting, fiber links, satellite communication, and sensor telemetry.",
    intro: [
      "Communication engineering is about moving information reliably, not merely sending electrical power. The message can be voice, video, data, control commands, or measured sensor values.",
      "A practical link always has stages: the source creates information, the transmitter prepares it, the channel carries it, the receiver recovers it, and the destination interprets it.",
    ],
    intuition:
      "Think of the transmitter as a smart packer, the channel as the journey, and the receiver as the careful unpacker trying to reconstruct the original message.",
    overview: [
      "The simplest way to understand Communication Systems is to follow the message itself. First it exists in a source such as a microphone, keyboard, or sensor. Then the transmitter modifies it into a form that can travel efficiently.",
      "The channel may be a copper wire, optical fiber, free space, or any medium that carries the signal. During travel, noise and distortion may enter, so the receiver must separate the useful information from corruption.",
      "This chapter is the foundation for every later topic including AM, FM, digital modulation, receivers, and information theory.",
    ],
    learningGoals: [
      "Identify each basic block of a communication system and its purpose.",
      "Distinguish between source information and transmitted signal form.",
      "Explain why noise and distortion make receiver design necessary.",
    ],
    keyConcepts: [
      "Source generates information, while the transmitter formats it for transmission.",
      "The channel is never perfectly ideal, so impairment is expected.",
      "Receiver design tries to recover the message with minimum error.",
      "Wired and wireless systems differ mainly in their transmission medium and impairment profile.",
    ],
    formulas: [
      {
        label: "Received signal idea",
        expression: "r(t) = s(t) + n(t)",
        note: "A basic intuition model: the received waveform equals the transmitted signal plus channel noise.",
      },
      {
        label: "Information flow",
        expression: "Source -> Transmitter -> Channel -> Receiver -> Destination",
        note: "This is the most important chain to remember before studying modulation or receivers.",
      },
    ],
    theoryCards: [
      {
        title: "Source and message",
        detail:
          "The source creates information. It may produce analog signals like speech or digital symbols like bits from a computer.",
      },
      {
        title: "Transmitter role",
        detail:
          "The transmitter shapes the message into a travel-ready signal. This may include amplification, modulation, coding, and frequency translation.",
      },
      {
        title: "Channel impairments",
        detail:
          "The channel adds attenuation, delay, interference, and noise. In wireless links it may also add fading and multipath effects.",
      },
      {
        title: "Receiver task",
        detail:
          "The receiver strengthens weak signals, filters unwanted content, and demodulates or decodes the message to recover the original information.",
      },
    ],
    examples: [
      {
        title: "Trace the message path",
        prompt: "How does speech from a microphone reach a listener over radio?",
        steps: [
          "The microphone converts sound into an electrical message signal.",
          "The transmitter modulates that message on a carrier for efficient radiation.",
          "The wireless channel carries the signal and may add noise or fading.",
          "The receiver selects, amplifies, and demodulates the signal before audio reproduction.",
        ],
        answer: "The message travels through the standard source-transmitter-channel-receiver-destination chain.",
      },
    ],
    examPointers: [
      "Start every answer with the communication chain before naming special circuits.",
      "If a question asks where corruption happens, the channel is the first place to mention.",
      "Source signal and carrier signal are not the same thing.",
    ],
    commonMistakes: [
      "Treating the communication channel as ideal and forgetting noise.",
      "Confusing the original message with the modulated transmitted waveform.",
      "Explaining only transmitter blocks and ignoring the receiver.",
    ],
    quickRevision: [
      "Communication means reliable transfer of information, not just energy.",
      "Source, transmitter, channel, receiver, destination is the backbone chain.",
      "Noise enters mainly through the channel and receiver front end.",
    ],
    insightSummary:
      "Once the communication chain is clear, every later topic becomes easier because you always know which block a concept belongs to.",
    formulaHighlights: [
      "r(t) = s(t) + n(t)",
      "Source -> Transmitter -> Channel -> Receiver -> Destination",
    ],
    relatedTopics: [
      { subjectSlug: "communications", topicSlug: "signals-and-spectra" },
      { subjectSlug: "communications", topicSlug: "noise-in-communication-systems" },
      { subjectSlug: "communications", topicSlug: "communication-receivers" },
    ],
  },
  {
    slug: "signals-and-spectra",
    title: "02 Signals and Spectra",
    shortTitle: "Signals and Spectra",
    summary:
      "Signals and spectra explain how the same communication waveform can be viewed in time and frequency, which is essential for bandwidth, filtering, and modulation understanding.",
    metaTitle:
      "Signals and Spectra | Communication Systems Notes for GATE ECE",
    metaDescription:
      "Study Signals and Spectra with time-domain to frequency-domain intuition, bandwidth and PSD explanation, step-by-step visuals, and exam-oriented Communication Systems notes for GATE ECE.",
    keywords:
      "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, signals and spectra, bandwidth, PSD",
    coreQuestion:
      "Why do communication engineers care so much about the frequency-domain view of a signal?",
    examFocus:
      "Time and frequency domain relation, bandwidth, spectral movement, orthogonality, and PSD basics.",
    engineeringUse:
      "Filter design, channel allocation, receiver tuning, spectral efficiency, and interference control.",
    intro: [
      "A signal can look simple in time but reveal much more in frequency. Communication engineers need both views because channels and filters are usually frequency selective.",
      "Spectral thinking answers questions such as: how much bandwidth is needed, where sidebands appear, and whether two signals can share a channel.",
    ],
    intuition:
      "Time-domain tells the story of how a waveform changes; frequency-domain tells which sinusoidal ingredients build that waveform.",
    overview: [
      "Any practical communication signal can be represented as a combination of frequency components. This makes Fourier-based thinking central to understanding bandwidth and modulation.",
      "Bandwidth is not just a formula word. It directly limits how many channels can coexist and how fast information can be sent through a medium.",
      "Power spectral density becomes important when the signal or noise has random behavior, because it shows how power spreads across frequency.",
    ],
    learningGoals: [
      "Relate waveform shape in time to occupied content in frequency.",
      "Explain bandwidth in a communication meaning, not only mathematically.",
      "Interpret PSD as power distribution across frequency.",
    ],
    keyConcepts: [
      "Narrow time pulses usually spread across wider frequency ranges.",
      "Bandwidth is the span of significant frequency content.",
      "Frequency-domain plots make filtering and channel allocation easier to visualize.",
      "PSD is especially useful for random signals and noise analysis.",
    ],
    formulas: [
      {
        label: "Fourier transform idea",
        expression: "X(f) = integral x(t)e^(-j2pift) dt",
        note: "The exact form is less important initially than the interpretation: it maps time behavior into frequency content.",
      },
      {
        label: "Bandwidth intuition",
        expression: "BW = fH - fL",
        note: "Bandwidth is the occupied frequency span between lower and upper significant frequencies.",
      },
      {
        label: "PSD notation",
        expression: "Sx(f)",
        note: "PSD indicates how signal or noise power is distributed with frequency.",
      },
    ],
    theoryCards: [
      {
        title: "Time view",
        detail:
          "Time-domain representation shows amplitude variation with time and is useful for waveform shape, delay, and transient intuition.",
      },
      {
        title: "Frequency view",
        detail:
          "Frequency-domain representation shows where spectral energy exists, which matters for channels, filters, and carrier allocation.",
      },
      {
        title: "Bandwidth meaning",
        detail:
          "A broader bandwidth usually means more frequency resources are consumed. In communication design that often means less efficient use of spectrum.",
      },
      {
        title: "PSD meaning",
        detail:
          "For random signals and noise, PSD is more informative than a single waveform because it describes average power spread.",
      },
    ],
    examples: [
      {
        title: "Why sharp pulses need more spectrum",
        prompt: "Why does making a pulse narrower in time usually widen its spectrum?",
        steps: [
          "A rapid time change requires more high-frequency content to reproduce the shape.",
          "That means more sinusoidal components are needed in the Fourier representation.",
          "So narrowing a pulse in time generally spreads the signal further in frequency.",
        ],
        answer: "Shorter time localization usually demands broader frequency occupancy.",
      },
    ],
    examPointers: [
      "When asked about filter action, switch to the frequency-domain view immediately.",
      "Bandwidth answers are often conceptual before they become numerical.",
      "PSD is the safe keyword when the signal or noise is random.",
    ],
    commonMistakes: [
      "Thinking time-domain and frequency-domain are two unrelated signals.",
      "Using bandwidth without stating which frequencies define it.",
      "Confusing PSD with amplitude spectrum.",
    ],
    quickRevision: [
      "Time view shows variation with time; spectrum shows variation with frequency.",
      "Bandwidth measures occupied frequency span.",
      "PSD shows power distribution across frequency.",
    ],
    insightSummary:
      "Communication Systems becomes much easier once you naturally switch between waveform intuition and spectral intuition.",
    formulaHighlights: ["X(f) = Fourier view of x(t)", "BW = fH - fL", "Sx(f) gives power spread"],
    relatedTopics: [
      { subjectSlug: "communications", topicSlug: "amplitude-modulation" },
      { subjectSlug: "communications", topicSlug: "pulse-modulation" },
      { subjectSlug: "signals", topicSlug: "fourier-transform" },
    ],
  },
  {
    slug: "amplitude-modulation",
    title: "03 Amplitude Modulation (AM)",
    shortTitle: "Amplitude Modulation (AM)",
    summary:
      "Amplitude Modulation varies the carrier amplitude according to the message and introduces carrier, upper sideband, and lower sideband components in the spectrum.",
    metaTitle:
      "Amplitude Modulation (AM) | Communication Systems Notes for GATE ECE",
    metaDescription:
      "Learn AM waveform formation, modulation index, envelope detection, sidebands, and AM spectrum with animated Communication Systems notes for GATE ECE and PSU preparation.",
    keywords:
      "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, amplitude modulation, modulation index, envelope detector",
    coreQuestion:
      "How does a low-frequency message control a high-frequency carrier in AM?",
    examFocus:
      "AM equation, modulation index, sidebands, bandwidth, power relations, and envelope detection.",
    engineeringUse:
      "Broadcast radio, low-complexity modulation teaching, and basic analog front-end understanding.",
    intro: [
      "AM is the first modulation scheme many students meet because it clearly shows how a message rides on a carrier.",
      "The carrier frequency shifts the message to a high-frequency band suitable for radiation or long-distance transmission.",
    ],
    intuition:
      "The message acts like a slow envelope that stretches and squeezes the height of a much faster carrier wave.",
    overview: [
      "In conventional AM, the carrier amplitude changes in step with the message, while carrier frequency remains fixed.",
      "The frequency-domain view is important because AM creates sidebands around the carrier. Those sidebands actually carry the message information.",
      "Envelope detection works well only when modulation is not overdone, which is why modulation index matters conceptually and numerically.",
    ],
    learningGoals: [
      "Write the standard AM expression and identify message and carrier parts.",
      "Explain modulation index and its effect on waveform shape.",
      "Interpret AM sidebands and bandwidth in frequency domain.",
    ],
    keyConcepts: [
      "Carrier provides a high-frequency vehicle for the message.",
      "Sidebands appear at carrier plus-minus message frequency.",
      "Envelope follows the message when modulation index is at most one.",
      "Overmodulation distorts envelope detection.",
    ],
    formulas: [
      {
        label: "AM signal",
        expression: "s(t) = Ac[1 + ma cos(2pifm t)] cos(2pifc t)",
        note: "This standard form shows the carrier amplitude changing with the message.",
      },
      {
        label: "Modulation index",
        expression: "ma = Am / Ac",
        note: "For simple sinusoidal AM, modulation index compares message amplitude to carrier scaling.",
      },
      {
        label: "AM bandwidth",
        expression: "BW = 2fm",
        note: "Conventional AM needs two sidebands, each spanning the message bandwidth.",
      },
    ],
    theoryCards: [
      {
        title: "Carrier and message",
        detail:
          "The carrier is high frequency and easy to transmit. The message is usually low frequency and contains the useful information.",
      },
      {
        title: "Envelope meaning",
        detail:
          "The outer shape of the AM waveform follows the message. That is why a diode-based envelope detector can recover the message under proper conditions.",
      },
      {
        title: "Sidebands",
        detail:
          "The upper and lower sidebands are mirror-shifted copies of the message spectrum around the carrier.",
      },
      {
        title: "Power tradeoff",
        detail:
          "A large part of conventional AM power sits in the carrier, even though the sidebands carry the actual message information.",
      },
    ],
    examples: [
      {
        title: "Check modulation safety",
        prompt: "Why is ma > 1 a problem for simple envelope detection?",
        steps: [
          "When modulation index exceeds one, the envelope no longer reproduces the message cleanly.",
          "Envelope crossings and distortion appear in the waveform.",
          "A simple detector then recovers a distorted output instead of the original message.",
        ],
        answer: "Overmodulation breaks the clean envelope shape required by envelope detection.",
      },
    ],
    examPointers: [
      "In conventional AM, bandwidth is twice the highest message frequency.",
      "If the question mentions envelope distortion, check modulation index first.",
      "Sidebands carry information; the carrier mainly assists transmission and detection.",
    ],
    commonMistakes: [
      "Forgetting that AM produces two sidebands around the carrier.",
      "Confusing modulation index with message frequency.",
      "Saying the carrier alone carries the information.",
    ],
    quickRevision: [
      "AM varies carrier amplitude, not frequency or phase.",
      "Upper and lower sidebands appear at fc plus-minus fm.",
      "Envelope detection works best when ma is not greater than one.",
    ],
    insightSummary:
      "AM is the cleanest topic for connecting waveform intuition, spectrum intuition, and receiver intuition in one place.",
    formulaHighlights: [
      "s(t) = Ac[1 + ma cos(2pifm t)] cos(2pifc t)",
      "ma = Am / Ac",
      "BW = 2fm",
    ],
    relatedTopics: [
      { subjectSlug: "communications", topicSlug: "signals-and-spectra" },
      { subjectSlug: "communications", topicSlug: "noise-in-communication-systems" },
      { subjectSlug: "communications", topicSlug: "communication-receivers" },
    ],
  },
  {
    slug: "angle-modulation",
    title: "04 Angle Modulation",
    shortTitle: "Angle Modulation",
    summary:
      "Angle Modulation changes the carrier angle through frequency or phase variation, leading to FM and PM with strong noise-performance advantages.",
    metaTitle:
      "Angle Modulation | FM and PM Notes for GATE ECE",
    metaDescription:
      "Study Angle Modulation with FM and PM comparison, instantaneous frequency, deviation, bandwidth intuition, and animated Communication Systems notes for GATE ECE.",
    keywords:
      "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, angle modulation, FM, PM, Carson rule",
    coreQuestion:
      "What changes in the carrier during FM and PM if amplitude stays constant?",
    examFocus:
      "FM and PM comparison, deviation, modulation index, NBFM vs WBFM, Carson rule, and demodulation intuition.",
    engineeringUse:
      "FM broadcasting, telemetry, improved noise immunity links, and frequency-stable analog communication.",
    intro: [
      "Angle modulation keeps carrier amplitude constant and instead changes its instantaneous angle. This immediately gives better resilience to amplitude noise.",
      "The two classic forms are FM and PM. In FM, the message controls frequency deviation. In PM, the message controls phase deviation.",
    ],
    intuition:
      "The wave does not grow taller; it bunches and stretches horizontally depending on the message.",
    overview: [
      "FM is often explained as frequency movement around a center carrier value. When message amplitude increases, the carrier cycles become denser or more spread out.",
      "PM instead links the message directly to phase shift, although mathematically FM and PM are closely related through differentiation and integration.",
      "Compared with AM, angle modulation usually occupies more bandwidth but gives better noise performance in many practical cases.",
    ],
    learningGoals: [
      "Differentiate clearly between FM and PM action on a carrier.",
      "Explain instantaneous frequency and deviation in physical terms.",
      "Relate bandwidth expansion to message amplitude and frequency.",
    ],
    keyConcepts: [
      "FM changes instantaneous frequency while keeping amplitude fixed.",
      "PM changes instantaneous phase while keeping amplitude fixed.",
      "Wideband FM uses more spectrum but often gives stronger noise immunity.",
      "Angle modulation is less sensitive to amplitude noise than AM.",
    ],
    formulas: [
      {
        label: "FM idea",
        expression: "sFM(t) = Ac cos[2pifc t + beta sin(2pifm t)]",
        note: "The angle now contains the message, creating frequency deviation.",
      },
      {
        label: "Carson rule",
        expression: "BW approx 2(Delta f + fm)",
        note: "A practical bandwidth estimate for FM.",
      },
      {
        label: "FM modulation index",
        expression: "beta = Delta f / fm",
        note: "FM index compares frequency deviation to message frequency.",
      },
    ],
    theoryCards: [
      {
        title: "Instantaneous frequency",
        detail:
          "In FM, the actual frequency at a given moment changes with the message. The carrier is no longer a fixed-frequency sinusoid.",
      },
      {
        title: "PM idea",
        detail:
          "In PM, the phase displacement follows the message, which means a rapid message change creates stronger apparent frequency variation.",
      },
      {
        title: "Bandwidth tradeoff",
        detail:
          "Angle modulation usually consumes more spectrum than conventional AM, especially in wideband FM.",
      },
      {
        title: "Noise advantage",
        detail:
          "Because amplitude is constant, many amplitude fluctuations from noise can be limited before demodulation.",
      },
    ],
    examples: [
      {
        title: "Compare AM and FM against amplitude noise",
        prompt: "Why is FM usually more resistant to amplitude noise than AM?",
        steps: [
          "FM carries information in frequency variation, not amplitude variation.",
          "Amplitude limiters can suppress many unwanted amplitude fluctuations before demodulation.",
          "AM cannot do this safely because the message itself sits in amplitude change.",
        ],
        answer: "FM keeps information away from amplitude, so amplitude noise can be reduced more easily.",
      },
    ],
    examPointers: [
      "If a question asks why FM resists noise better, mention constant amplitude and limiter action.",
      "Use Carson rule when a practical FM bandwidth estimate is needed.",
      "Do not mix FM index with AM index.",
    ],
    commonMistakes: [
      "Saying FM changes amplitude instead of frequency.",
      "Confusing phase deviation with frequency deviation.",
      "Forgetting that wider FM often means larger bandwidth.",
    ],
    quickRevision: [
      "AM changes height; FM and PM change angle.",
      "FM information is in frequency deviation.",
      "Carson rule gives a quick FM bandwidth estimate.",
    ],
    insightSummary:
      "Angle modulation is a classic example of an engineering tradeoff: more bandwidth in exchange for better performance against noise.",
    formulaHighlights: [
      "BW approx 2(Delta f + fm)",
      "beta = Delta f / fm",
      "FM uses frequency variation; PM uses phase variation",
    ],
    relatedTopics: [
      { subjectSlug: "communications", topicSlug: "amplitude-modulation" },
      { subjectSlug: "communications", topicSlug: "noise-in-communication-systems" },
      { subjectSlug: "communications", topicSlug: "communication-receivers" },
    ],
  },
  {
    slug: "pulse-modulation",
    title: "05 Pulse Modulation",
    shortTitle: "Pulse Modulation",
    summary:
      "Pulse Modulation turns information into sampled pulses and compares how pulse amplitude, width, or position can represent a message.",
    metaTitle:
      "Pulse Modulation | PAM PWM PPM Notes for GATE ECE",
    metaDescription:
      "Learn Pulse Modulation with sampling, PAM, PWM, PPM, aliasing, and Nyquist explanation using animated Communication Systems notes for GATE ECE and university exams.",
    keywords:
      "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, pulse modulation, PAM, PWM, PPM, sampling theorem",
    coreQuestion:
      "How can a continuous message be represented using discrete pulses?",
    examFocus:
      "Sampling process, PAM, PWM, PPM, Nyquist rate, aliasing, and reconstruction intuition.",
    engineeringUse:
      "Digital interfacing, control pulses, data links, switching systems, and sampled communication blocks.",
    intro: [
      "Pulse modulation sits between analog thinking and digital thinking. It keeps the message idea but represents it using repeated pulses.",
      "The sampling process is the entry point. Once the signal is sampled, different pulse parameters can be changed to carry information.",
    ],
    intuition:
      "Imagine regularly taking snapshots of the message and then storing each snapshot in the height, width, or time position of a pulse.",
    overview: [
      "PAM changes pulse amplitude, PWM changes pulse width, and PPM changes pulse position. Each scheme chooses a different pulse feature to carry the message.",
      "Sampling is the base concept behind these schemes, so Nyquist rate and aliasing appear naturally here.",
      "If the sampling frequency is too low, different spectral replicas overlap and information is lost through aliasing.",
    ],
    learningGoals: [
      "Connect the sampling process to pulse-based communication schemes.",
      "Differentiate PAM, PWM, and PPM by the pulse parameter that changes.",
      "Explain aliasing and Nyquist condition in simple language.",
    ],
    keyConcepts: [
      "Sampling converts a continuous-time message into a discrete-time sequence.",
      "PAM changes amplitude, PWM changes width, and PPM changes pulse timing.",
      "Nyquist criterion avoids overlap between spectral replicas.",
      "Aliasing is not noise; it is a sampling-rate problem.",
    ],
    formulas: [
      {
        label: "Nyquist condition",
        expression: "fs >= 2fm",
        note: "The sampling frequency should be at least twice the highest message frequency.",
      },
      {
        label: "Sampling period",
        expression: "Ts = 1 / fs",
        note: "Useful when problems give time spacing instead of frequency.",
      },
      {
        label: "Pulse categories",
        expression: "PAM / PWM / PPM",
        note: "These names remind you which pulse property carries information.",
      },
    ],
    theoryCards: [
      {
        title: "Sampling",
        detail:
          "Sampling takes values of the message at periodic instants. This produces a sequence that can later be processed or encoded.",
      },
      {
        title: "PAM",
        detail:
          "In PAM, pulse height follows the message amplitude, so the pulse train directly resembles sampled amplitudes.",
      },
      {
        title: "PWM and PPM",
        detail:
          "In PWM the pulse width changes, while in PPM the pulse timing shifts around a reference position.",
      },
      {
        title: "Aliasing",
        detail:
          "Aliasing happens when spectral copies overlap due to insufficient sampling frequency. Once overlap occurs, the original spectrum cannot be separated ideally.",
      },
    ],
    examples: [
      {
        title: "Detect the risky sampling rate",
        prompt: "A message has highest frequency 6 kHz. Why is 8 kHz sampling unsafe?",
        steps: [
          "Nyquist requires at least twice the highest message frequency.",
          "Twice 6 kHz is 12 kHz, so 8 kHz is below the safe ideal limit.",
          "That low rate can cause spectral overlap and aliasing.",
        ],
        answer: "8 kHz is below the 12 kHz Nyquist rate, so aliasing can occur.",
      },
    ],
    examPointers: [
      "State the highest message frequency before applying Nyquist.",
      "When the question mentions distorted sampled reconstruction, think aliasing first.",
      "PAM, PWM, and PPM are often tested by the changing pulse parameter.",
    ],
    commonMistakes: [
      "Mixing aliasing with additive noise.",
      "Forgetting that PWM changes width, not amplitude.",
      "Using sampling frequency lower than twice the highest message frequency.",
    ],
    quickRevision: [
      "Sampling is the entry point for pulse modulation.",
      "PAM changes amplitude, PWM changes width, PPM changes position.",
      "Aliasing happens when fs is too low.",
    ],
    insightSummary:
      "Pulse modulation is the bridge topic that makes the move from analog communication to digital communication feel natural instead of abrupt.",
    formulaHighlights: ["fs >= 2fm", "Ts = 1 / fs", "PAM / PWM / PPM"],
    relatedTopics: [
      { subjectSlug: "communications", topicSlug: "digital-communication" },
      { subjectSlug: "communications", topicSlug: "signals-and-spectra" },
      { subjectSlug: "signals", topicSlug: "sampling-theorem" },
    ],
  },
  {
    slug: "digital-communication",
    title: "06 Digital Communication",
    shortTitle: "Digital Communication",
    summary:
      "Digital Communication converts analog or discrete information into binary-friendly forms using sampling, quantization, encoding, and tracking methods such as PCM and delta modulation.",
    metaTitle:
      "Digital Communication | PCM and Quantization Notes for GATE ECE",
    metaDescription:
      "Study Digital Communication with PCM encoding, quantization, binary flow, delta modulation, and quantization error intuition using Communication Systems notes for GATE ECE.",
    keywords:
      "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, digital communication, PCM, quantization, delta modulation",
    coreQuestion:
      "How does an analog message become a stream of binary-friendly symbols?",
    examFocus:
      "PCM blocks, quantization, encoding, companding intuition, delta modulation, and quantization error.",
    engineeringUse:
      "Telephony, storage systems, digital voice links, telemetry, and computer-network interfaces.",
    intro: [
      "Digital communication converts signals into forms that are easier to regenerate, store, process, and protect against many channel impairments.",
      "PCM is the classic chain: sample, quantize, and encode. Delta modulation simplifies the idea by tracking change instead of sending full amplitude levels every time.",
    ],
    intuition:
      "The system first measures the signal, then rounds it to allowed levels, then writes those levels in binary language.",
    overview: [
      "Quantization is the key step where continuous amplitude becomes one of a finite set of levels. That makes binary encoding possible, but it also introduces quantization error.",
      "PCM is strong because repeaters can reconstruct clean digital levels more easily than noisy analog waveforms.",
      "Delta modulation is a more tracking-style approach in which the system sends only whether the signal should step up or down.",
    ],
    learningGoals: [
      "Explain the PCM chain from sampling to binary output.",
      "Interpret quantization as approximation to discrete levels.",
      "Understand why quantization error and slope overload appear in digital communication questions.",
    ],
    keyConcepts: [
      "Quantization replaces exact analog values with nearest allowed levels.",
      "Binary encoding labels each quantized level with a bit pattern.",
      "Quantization error is the price paid for discrete representation.",
      "Delta modulation sends direction of change rather than full sample value.",
    ],
    formulas: [
      {
        label: "Quantization step idea",
        expression: "e_q = x - x_q",
        note: "Quantization error is the difference between original sample value and chosen quantized level.",
      },
      {
        label: "Bit requirement",
        expression: "L = 2^n",
        note: "If n bits are used, then 2^n quantization levels can be represented.",
      },
      {
        label: "PCM chain",
        expression: "Sample -> Quantize -> Encode",
        note: "This sequence is the high-yield memory line for PCM.",
      },
    ],
    theoryCards: [
      {
        title: "Sampling before coding",
        detail:
          "The analog signal must first be represented by discrete-time samples before digital encoding can begin.",
      },
      {
        title: "Quantization staircase",
        detail:
          "Quantization maps every sample to the nearest allowed level, creating the classic staircase approximation.",
      },
      {
        title: "Binary encoding",
        detail:
          "Each quantized level is assigned a binary codeword so that the sample sequence can be sent over a digital link.",
      },
      {
        title: "Delta modulation",
        detail:
          "Delta modulation is a tracking approach. It is simple but can suffer from slope overload or granular noise if parameters are poorly chosen.",
      },
    ],
    examples: [
      {
        title: "Relate bit count to levels",
        prompt: "How many quantization levels are available when 3 bits are used?",
        steps: [
          "Use the relationship between number of bits and levels.",
          "For n bits, number of levels equals 2^n.",
          "With n = 3, the total number of levels is 8.",
        ],
        answer: "Three bits provide 8 quantization levels.",
      },
    ],
    examPointers: [
      "In PCM, always preserve the sequence sample then quantize then encode.",
      "Quantization error is approximation error, not channel noise.",
      "If delta modulation cannot follow a fast-changing signal, think slope overload.",
    ],
    commonMistakes: [
      "Confusing quantization noise with transmission noise.",
      "Encoding before quantization in explanation order.",
      "Forgetting that more bits mean more available levels.",
    ],
    quickRevision: [
      "PCM = sample, quantize, encode.",
      "Quantization makes amplitudes discrete.",
      "More bits usually reduce quantization error.",
    ],
    insightSummary:
      "Digital communication topics become much simpler when you see them as structured approximation steps rather than abstract blocks.",
    formulaHighlights: ["L = 2^n", "e_q = x - x_q", "Sample -> Quantize -> Encode"],
    relatedTopics: [
      { subjectSlug: "communications", topicSlug: "pulse-modulation" },
      { subjectSlug: "communications", topicSlug: "digital-modulation-techniques" },
      { subjectSlug: "signals", topicSlug: "sampling-theorem" },
    ],
  },
  {
    slug: "digital-modulation-techniques",
    title: "07 Digital Modulation Techniques",
    shortTitle: "Digital Modulation Techniques",
    summary:
      "Digital Modulation maps bits and symbols onto carrier changes, leading to ASK, FSK, PSK, QPSK, and QAM families with different bandwidth and noise tradeoffs.",
    metaTitle:
      "Digital Modulation Techniques | ASK FSK PSK QAM Notes for GATE ECE",
    metaDescription:
      "Learn Digital Modulation Techniques with ASK, FSK, PSK, QPSK constellation, QAM mapping, and symbol flow using animated Communication Systems notes for GATE ECE.",
    keywords:
      "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, ASK, FSK, PSK, QPSK, QAM",
    coreQuestion:
      "How are bits translated into controlled carrier changes for transmission?",
    examFocus:
      "ASK, FSK, PSK, QPSK, QAM, constellation interpretation, coherent detection, and symbol-rate intuition.",
    engineeringUse:
      "Wireless links, modems, optical communication, cellular systems, and satellite transmission.",
    intro: [
      "Digital modulation uses a carrier but lets discrete symbol values decide how the carrier behaves.",
      "Depending on the scheme, amplitude, frequency, phase, or a combination is changed to represent data.",
    ],
    intuition:
      "Bits choose from a menu of allowed signal states, and each chosen state occupies one symbol interval on the channel.",
    overview: [
      "ASK varies carrier amplitude between allowed values, FSK switches between frequencies, and PSK changes phase states.",
      "QPSK increases data efficiency by using four phase states, while QAM combines amplitude and phase changes to create larger constellations.",
      "Constellation diagrams are visual maps of symbol choices. Once they are understood, many digital modulation questions become easier.",
    ],
    learningGoals: [
      "Identify which carrier property changes in common digital modulation schemes.",
      "Explain symbols and constellation points in beginner-friendly language.",
      "Relate higher-order modulation to efficiency and noise sensitivity tradeoffs.",
    ],
    keyConcepts: [
      "Digital modulation maps bits to a finite set of signal states.",
      "A symbol can carry multiple bits when more states are available.",
      "Constellation diagrams visualize valid signal states in I-Q space.",
      "Higher-order schemes often improve bit efficiency but demand cleaner channels.",
    ],
    formulas: [
      {
        label: "Bits per symbol",
        expression: "bits/symbol = log2(M)",
        note: "If there are M symbol states, each symbol can represent log2(M) bits.",
      },
      {
        label: "QPSK mapping idea",
        expression: "M = 4 -> 2 bits/symbol",
        note: "QPSK uses four phase states, so each symbol carries two bits.",
      },
      {
        label: "General state count",
        expression: "M-ary modulation",
        note: "The number of allowed states is often represented by M.",
      },
    ],
    theoryCards: [
      {
        title: "ASK and FSK",
        detail:
          "ASK is easy to visualize because amplitude switches. FSK is often more robust to amplitude uncertainty because information is in frequency selection.",
      },
      {
        title: "PSK family",
        detail:
          "PSK keeps amplitude fixed and rotates phase between valid states. This often gives strong energy efficiency.",
      },
      {
        title: "QPSK",
        detail:
          "QPSK uses four phases and therefore sends two bits per symbol, improving spectral efficiency over binary PSK.",
      },
      {
        title: "QAM",
        detail:
          "QAM uses both phase and amplitude variation, allowing dense constellations and high bit rates when channel quality is good.",
      },
    ],
    examples: [
      {
        title: "Read QPSK efficiency",
        prompt: "Why does QPSK carry more bits per symbol than BPSK?",
        steps: [
          "BPSK has two valid states, so it carries one bit per symbol.",
          "QPSK has four valid phase states, so it carries log2(4) bits per symbol.",
          "That gives two bits per symbol, doubling symbol efficiency compared with BPSK.",
        ],
        answer: "QPSK uses four phase states, so each symbol represents two bits.",
      },
    ],
    examPointers: [
      "First identify whether amplitude, frequency, phase, or both are being changed.",
      "Use bits per symbol = log2(M) whenever an M-ary question appears.",
      "Constellation diagrams are usually easier to reason from than long equations.",
    ],
    commonMistakes: [
      "Mixing symbol count with bit count.",
      "Saying QPSK changes frequency instead of phase.",
      "Ignoring that higher-order schemes usually need better SNR.",
    ],
    quickRevision: [
      "ASK changes amplitude, FSK changes frequency, PSK changes phase.",
      "QPSK carries two bits per symbol.",
      "QAM uses both amplitude and phase.",
    ],
    insightSummary:
      "Digital modulation is easier to remember when you classify schemes by what they let the carrier change.",
    formulaHighlights: ["bits/symbol = log2(M)", "QPSK: 4 states -> 2 bits/symbol", "QAM combines amplitude and phase"],
    relatedTopics: [
      { subjectSlug: "communications", topicSlug: "digital-communication" },
      { subjectSlug: "communications", topicSlug: "noise-in-communication-systems" },
      { subjectSlug: "communications", topicSlug: "signals-and-spectra" },
    ],
  },
  {
    slug: "noise-in-communication-systems",
    title: "08 Noise in Communication Systems",
    shortTitle: "Noise in Communication Systems",
    summary:
      "Noise in Communication Systems explains how unwanted random disturbances degrade signal quality and why SNR, bandwidth, and modulation choice matter.",
    metaTitle:
      "Noise in Communication Systems | SNR Notes for GATE ECE",
    metaDescription:
      "Study Noise in Communication Systems with signal-plus-noise intuition, SNR, internal vs external noise, AM sensitivity, and FM immunity using GATE ECE Communication Systems notes.",
    keywords:
      "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, communication noise, SNR, FM noise immunity, AM noise",
    coreQuestion:
      "How does unwanted random disturbance change what the receiver can recover?",
    examFocus:
      "Noise addition, SNR, internal and external noise, thermal noise intuition, AM sensitivity, and FM improvement idea.",
    engineeringUse:
      "Receiver design, link budgets, modulation selection, low-noise amplifiers, and radio performance analysis.",
    intro: [
      "Noise is unavoidable in practical communication systems. The real design question is not how to remove all noise, but how to manage it so the information remains recoverable.",
      "Some noise comes from external sources such as atmosphere and man-made interference. Some comes from internal device physics such as thermal agitation.",
    ],
    intuition:
      "The receiver is trying to hear a conversation while random whispers are mixed into the same room.",
    overview: [
      "SNR measures how dominant the desired signal is compared with noise. Higher SNR generally means easier and more accurate detection.",
      "AM is vulnerable because noise often changes amplitude, which is exactly where AM stores information.",
      "FM performs better in many cases because amplitude limiting can reduce certain noise components before demodulation.",
    ],
    learningGoals: [
      "Explain noise as a random disturbance added to the desired signal.",
      "Interpret SNR physically and numerically.",
      "Compare AM and FM behavior under noisy conditions.",
    ],
    keyConcepts: [
      "Noise may enter from environment or from electronic components themselves.",
      "SNR is a central quality measure in communication links.",
      "AM is more sensitive to amplitude noise because its information is in amplitude.",
      "FM often handles amplitude noise better with limiter-based receiver stages.",
    ],
    formulas: [
      {
        label: "Signal plus noise",
        expression: "r(t) = s(t) + n(t)",
        note: "A compact model for the received waveform in the presence of additive noise.",
      },
      {
        label: "SNR ratio",
        expression: "SNR = Ps / Pn",
        note: "Signal-to-noise ratio compares desired signal power to noise power.",
      },
      {
        label: "SNR in dB",
        expression: "SNR(dB) = 10 log10(Ps/Pn)",
        note: "Power ratios are commonly reported in decibels.",
      },
    ],
    theoryCards: [
      {
        title: "External noise",
        detail:
          "Atmospheric noise, cosmic noise, and man-made interference arrive from outside the receiver hardware.",
      },
      {
        title: "Internal noise",
        detail:
          "Thermal noise and device-generated noise arise inside circuits and usually set performance limits in sensitive receivers.",
      },
      {
        title: "SNR meaning",
        detail:
          "When SNR is high, the useful signal stands out clearly. When SNR is low, the receiver has difficulty distinguishing message from randomness.",
      },
      {
        title: "AM vs FM",
        detail:
          "AM is more exposed to amplitude corruption, while FM can reject many amplitude variations before detection.",
      },
    ],
    examples: [
      {
        title: "Interpret low SNR",
        prompt: "What does a very low SNR suggest about message recovery?",
        steps: [
          "Low SNR means the desired signal power is not much larger than the noise power.",
          "The receiver then struggles to distinguish correct waveform variations from random ones.",
          "So detection becomes more error-prone and the recovered message quality falls.",
        ],
        answer: "Low SNR means the message is harder to recover accurately.",
      },
    ],
    examPointers: [
      "If a question asks why FM is preferred in noise, mention amplitude limiting and constant-amplitude transmission.",
      "Use 10 log for power-ratio dB conversion.",
      "Separate internal noise from external noise in descriptive answers.",
    ],
    commonMistakes: [
      "Using 20 log10 for power ratio instead of 10 log10.",
      "Calling aliasing a form of noise.",
      "Forgetting that AM stores information in amplitude.",
    ],
    quickRevision: [
      "Noise is unwanted random disturbance added to the signal.",
      "SNR compares desired power with noise power.",
      "FM is generally more noise-resistant than AM.",
    ],
    insightSummary:
      "Noise topics become far less abstract once you keep asking one practical question: how much of the received waveform still belongs to the message?",
    formulaHighlights: ["SNR = Ps / Pn", "SNR(dB) = 10 log10(Ps/Pn)", "r(t) = s(t) + n(t)"],
    relatedTopics: [
      { subjectSlug: "communications", topicSlug: "angle-modulation" },
      { subjectSlug: "communications", topicSlug: "digital-modulation-techniques" },
      { subjectSlug: "communications", topicSlug: "communication-receivers" },
    ],
  },
  {
    slug: "information-theory",
    title: "09 Information Theory",
    shortTitle: "Information Theory",
    summary:
      "Information Theory measures uncertainty, information content, and the ultimate rate limits of reliable communication through entropy and channel capacity.",
    metaTitle:
      "Information Theory | Entropy and Channel Capacity Notes for GATE ECE",
    metaDescription:
      "Learn Information Theory with entropy, information content, channel capacity, coding intuition, and exam-focused Communication Systems notes for GATE ECE and PSU.",
    keywords:
      "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, information theory, entropy, channel capacity",
    coreQuestion:
      "How do we measure information and the maximum reliable rate of communication?",
    examFocus:
      "Self information, entropy, redundancy, source coding intuition, error control idea, and Shannon channel capacity.",
    engineeringUse:
      "Compression, coding design, storage efficiency, wireless system limits, and data-network planning.",
    intro: [
      "Information Theory is about quantifying uncertainty and asking how efficiently information can be represented and transmitted.",
      "This chapter is important because it links probability with communication limits. It explains why some sources are more compressible and why every noisy channel has a practical rate boundary.",
    ],
    intuition:
      "A highly predictable message tells you little when it arrives; a surprising message carries more information.",
    overview: [
      "Self information measures the information in a single event. Rare events carry more information because they reduce more uncertainty.",
      "Entropy is the average information per source symbol and acts like a measure of source uncertainty.",
      "Channel capacity gives the maximum reliable communication rate under channel constraints, which is why it is central in modern digital systems.",
    ],
    learningGoals: [
      "Explain why rare events carry more information than expected events.",
      "Interpret entropy as average uncertainty of a source.",
      "Understand channel capacity as a fundamental communication limit.",
    ],
    keyConcepts: [
      "Information is tied to uncertainty reduction.",
      "Entropy is larger when symbols are more unpredictable.",
      "Coding reduces redundancy to use resources more efficiently.",
      "Capacity sets an upper bound on reliable transmission rate.",
    ],
    formulas: [
      {
        label: "Self information",
        expression: "I(x) = log2(1/p(x))",
        note: "Less probable events carry more information.",
      },
      {
        label: "Entropy",
        expression: "H = -sum p(x) log2 p(x)",
        note: "Entropy is the average information content of a source.",
      },
      {
        label: "Shannon capacity",
        expression: "C = B log2(1 + S/N)",
        note: "Capacity connects bandwidth and SNR to the theoretical rate limit.",
      },
    ],
    theoryCards: [
      {
        title: "Surprise and information",
        detail:
          "If an event was almost certain, receiving it adds little new knowledge. If it was rare, it gives more information.",
      },
      {
        title: "Entropy meaning",
        detail:
          "Entropy is high when source outcomes are uncertain and more evenly distributed. It is low when one outcome dominates strongly.",
      },
      {
        title: "Source coding",
        detail:
          "Source coding removes redundancy so the message can be represented more efficiently.",
      },
      {
        title: "Capacity meaning",
        detail:
          "Capacity is not the currently used rate. It is the highest theoretically reliable rate for the channel model and conditions.",
      },
    ],
    examples: [
      {
        title: "Identify the higher-information event",
        prompt: "Which carries more information: an event with probability 0.9 or 0.1?",
        steps: [
          "Lower probability means greater surprise.",
          "Greater surprise means more information.",
          "So the event with probability 0.1 carries more information.",
        ],
        answer: "The event with probability 0.1 carries more information.",
      },
    ],
    examPointers: [
      "Rare event means more information, not less.",
      "Entropy is an average quantity over all source events.",
      "Capacity is a rate limit, not a code design itself.",
    ],
    commonMistakes: [
      "Thinking common events carry more information because they happen more often.",
      "Confusing entropy with channel capacity.",
      "Treating capacity as the actual data rate used in every system.",
    ],
    quickRevision: [
      "More surprise means more information.",
      "Entropy measures average uncertainty.",
      "Capacity gives the maximum reliable rate.",
    ],
    insightSummary:
      "Information Theory feels abstract at first, but it becomes intuitive once you connect it to uncertainty, surprise, and efficiency.",
    formulaHighlights: ["I(x) = log2(1/p(x))", "H = -sum p(x) log2 p(x)", "C = B log2(1 + S/N)"],
    relatedTopics: [
      { subjectSlug: "communications", topicSlug: "noise-in-communication-systems" },
      { subjectSlug: "communications", topicSlug: "digital-communication" },
      { subjectSlug: "communications", topicSlug: "digital-modulation-techniques" },
    ],
  },
  {
    slug: "communication-receivers",
    title: "10 Communication Receivers",
    shortTitle: "Communication Receivers",
    summary:
      "Communication Receivers recover useful information from weak, noisy RF signals using tuned amplification, frequency conversion, IF filtering, and detection.",
    metaTitle:
      "Communication Receivers | Superheterodyne Notes for GATE ECE",
    metaDescription:
      "Study Communication Receivers with superheterodyne receiver path, mixer and IF stage, detection, and frequency conversion intuition using GATE ECE Communication Systems notes.",
    keywords:
      "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, communication receivers, superheterodyne receiver, IF stage",
    coreQuestion:
      "How does a receiver isolate one weak signal and recover its original message?",
    examFocus:
      "Superheterodyne architecture, RF amplifier, mixer, local oscillator, IF amplifier, detector, and selectivity intuition.",
    engineeringUse:
      "Radio receivers, wireless devices, TV tuners, instrumentation receivers, and RF front-end design.",
    intro: [
      "A communication receiver must do more than simply amplify. It must select the desired signal, reject others, manage noise, and finally recover the message.",
      "The superheterodyne receiver is famous because it translates many different RF signals to one convenient intermediate frequency for strong filtering and amplification.",
    ],
    intuition:
      "The receiver first chooses the right station, then translates it to a friendlier frequency, then carefully extracts the message.",
    overview: [
      "The RF stage provides initial selection and amplification. The mixer combines the incoming signal with a local oscillator to shift frequency content to an intermediate frequency.",
      "Using a fixed IF lets the system build high-quality filters and amplifiers around one known operating band instead of redesigning the whole chain for every station.",
      "After IF processing, the detector or demodulator recovers the original audio, data, or message waveform.",
    ],
    learningGoals: [
      "Trace the signal path of a superheterodyne receiver.",
      "Explain why frequency conversion to IF is useful.",
      "Connect selectivity, sensitivity, and detection to receiver blocks.",
    ],
    keyConcepts: [
      "RF stage selects and strengthens the desired incoming signal.",
      "Mixer plus local oscillator creates sum and difference frequencies.",
      "Intermediate frequency simplifies sharp filtering and stable gain design.",
      "Detector or demodulator finally extracts the message.",
    ],
    formulas: [
      {
        label: "IF relation",
        expression: "fIF = |fRF - fLO|",
        note: "The difference frequency is commonly chosen as the intermediate frequency.",
      },
      {
        label: "Receiver chain",
        expression: "RF amp -> Mixer -> IF amp -> Detector -> Audio/Data output",
        note: "This block path is a high-yield memory aid.",
      },
    ],
    theoryCards: [
      {
        title: "RF amplifier",
        detail:
          "The RF stage improves sensitivity and begins selectivity so that out-of-band signals are reduced before mixing.",
      },
      {
        title: "Mixer and LO",
        detail:
          "The mixer combines incoming RF with local oscillator frequency, creating shifted frequency components. One desired component becomes the IF.",
      },
      {
        title: "IF stage",
        detail:
          "IF amplification and filtering give most of the receiver's selectivity and gain because the operating frequency is fixed and easier to optimize.",
      },
      {
        title: "Detection",
        detail:
          "The final stage demodulates the processed signal to recover the original message, whether analog or digital.",
      },
    ],
    examples: [
      {
        title: "Why not detect directly at RF?",
        prompt: "Why is converting every station to a fixed IF so useful?",
        steps: [
          "A fixed IF lets designers build one strong filter/amplifier section with known characteristics.",
          "That section can then be reused for many tuned stations after mixing.",
          "This improves selectivity and simplifies practical receiver design.",
        ],
        answer: "Frequency conversion allows high selectivity and gain around one convenient intermediate frequency.",
      },
    ],
    examPointers: [
      "If a question asks the advantage of superheterodyne, mention fixed IF and improved selectivity.",
      "Mixer output contains new frequency components; IF is usually selected from the difference term.",
      "Sensitivity and selectivity belong naturally in receiver answers.",
    ],
    commonMistakes: [
      "Saying the mixer only amplifies instead of translating frequency.",
      "Ignoring the role of the local oscillator.",
      "Skipping the IF stage when explaining superheterodyne operation.",
    ],
    quickRevision: [
      "Superheterodyne receivers convert RF to a fixed IF.",
      "Mixer and local oscillator create the IF component.",
      "Detection happens after selection and IF processing.",
    ],
    insightSummary:
      "Receiver architecture becomes memorable once you stop seeing it as many blocks and instead read it as one disciplined signal-cleaning path.",
    formulaHighlights: ["fIF = |fRF - fLO|", "RF amp -> Mixer -> IF amp -> Detector"],
    relatedTopics: [
      { subjectSlug: "communications", topicSlug: "amplitude-modulation" },
      { subjectSlug: "communications", topicSlug: "angle-modulation" },
      { subjectSlug: "communications", topicSlug: "noise-in-communication-systems" },
    ],
  },
  {
    slug: "antennas-and-propagation-basics",
    title: "11 Antennas and Propagation Basics",
    shortTitle: "Antennas and Propagation Basics",
    summary:
      "Antennas and Propagation Basics explain how electromagnetic energy is radiated, directed, and carried through ground, sky, and space-wave paths.",
    metaTitle:
      "Antennas and Propagation Basics | Communication Systems Notes for GATE ECE",
    metaDescription:
      "Learn Antennas and Propagation Basics with radiation, directivity, propagation modes, and signal path visualization using Communication Systems notes for GATE ECE and PSU.",
    keywords:
      "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, antennas and propagation basics, radiation pattern, ground wave, sky wave, space wave",
    coreQuestion:
      "How does electrical energy leave an antenna and travel to a distant receiver?",
    examFocus:
      "Radiation idea, antenna pattern, gain, directivity, and ground-wave, sky-wave, and space-wave propagation.",
    engineeringUse:
      "Broadcasting, radar, mobile communication, satellite links, RF planning, and wireless coverage design.",
    intro: [
      "An antenna converts guided electrical energy into electromagnetic radiation and also performs the reverse process at the receiver.",
      "Propagation basics matter because even a perfect transmitter and receiver cannot help if the wave path itself is poorly understood.",
    ],
    intuition:
      "The antenna launches energy into space, but the environment decides how that energy bends, reflects, spreads, and finally reaches the receiver.",
    overview: [
      "Radiation pattern shows how strongly an antenna sends energy in different directions. This leads naturally to ideas of gain and directivity.",
      "Propagation depends on frequency and environment. Some waves follow the Earth's surface, some reflect from upper atmospheric layers, and some travel through line-of-sight paths.",
      "This chapter ties Communication Systems back to the real world because it explains what happens after transmission leaves the hardware.",
    ],
    learningGoals: [
      "Explain the basic role of an antenna in transmission and reception.",
      "Interpret gain and directivity in directional terms.",
      "Differentiate ground wave, sky wave, and space wave propagation.",
    ],
    keyConcepts: [
      "Antenna pattern describes directional strength of radiation.",
      "Directivity tells how focused the radiation is.",
      "Gain includes directional concentration and efficiency effects.",
      "Propagation path depends strongly on frequency and geometry.",
    ],
    formulas: [
      {
        label: "Wavelength relation",
        expression: "lambda = c / f",
        note: "A basic relation connecting frequency to wavelength in free space.",
      },
      {
        label: "Propagation modes",
        expression: "Ground wave / Sky wave / Space wave",
        note: "These three labels organize the basic communication path categories.",
      },
    ],
    theoryCards: [
      {
        title: "Radiation and reception",
        detail:
          "At the transmitter, antenna current variations radiate electromagnetic waves. At the receiver, incident waves induce electrical response that the receiver can process.",
      },
      {
        title: "Pattern and directivity",
        detail:
          "An antenna does not usually radiate equally in all directions. The pattern shows preferred directions, and directivity quantifies that concentration.",
      },
      {
        title: "Gain",
        detail:
          "Gain indicates how effectively the antenna concentrates energy in a direction compared with a reference radiator.",
      },
      {
        title: "Propagation paths",
        detail:
          "Ground waves hug the Earth, sky waves use ionospheric reflection or refraction, and space waves travel mainly by line of sight.",
      },
    ],
    examples: [
      {
        title: "Choose the path intuition",
        prompt: "Which propagation mode best matches direct line-of-sight transmission between towers?",
        steps: [
          "Look for the mode associated with mostly straight-space travel.",
          "Ground wave stays near the surface, while sky wave uses upper-atmosphere reflection effects.",
          "Line-of-sight tower links are best described by space-wave propagation.",
        ],
        answer: "Space-wave propagation matches direct line-of-sight links.",
      },
    ],
    examPointers: [
      "Ground, sky, and space wave are usually asked conceptually before numerically.",
      "Directivity is about direction concentration, not simply transmitted power.",
      "Use wavelength relation quickly when moving between size and frequency intuition.",
    ],
    commonMistakes: [
      "Treating gain and directivity as identical in every context.",
      "Confusing sky-wave propagation with line-of-sight space-wave links.",
      "Ignoring frequency dependence in propagation behavior.",
    ],
    quickRevision: [
      "Antenna converts guided energy to radiated energy and back.",
      "Pattern, gain, and directivity describe direction behavior.",
      "Ground wave, sky wave, and space wave are the three basic propagation paths.",
    ],
    insightSummary:
      "Propagation topics become much less intimidating once you visualize the actual path the signal takes through the environment.",
    formulaHighlights: ["lambda = c / f", "Ground wave / Sky wave / Space wave"],
    relatedTopics: [
      { subjectSlug: "communications", topicSlug: "introduction-to-communication-systems" },
      { subjectSlug: "communications", topicSlug: "communication-receivers" },
      { subjectSlug: "communications", topicSlug: "signals-and-spectra" },
    ],
  },
];

export const communicationTopicPageMap = Object.fromEntries(
  communicationTopicPages.map((topic, index) => [
    topic.slug,
    {
      ...topic,
      previous: communicationTopicPages[index - 1] || null,
      next: communicationTopicPages[index + 1] || null,
    },
  ])
);
