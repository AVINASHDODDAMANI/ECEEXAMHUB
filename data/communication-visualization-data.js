export const communicationVisualizationData = {
  "introduction-to-communication-systems": {
    visualType: "signal-flow",
    variant: "chain",
    title: "Open Communication Chain",
    subtitle:
      "Watch the message move from source to destination while noise enters the channel in between.",
    ariaLabel:
      "Animated communication system chain showing source transmitter channel receiver destination and added noise",
    variables: [
      ["s(t)", "transmitted signal"],
      ["n(t)", "channel noise"],
      ["r(t)", "received signal"],
      ["Channel", "medium carrying the signal"],
    ],
    steps: [
      ["Create message", "The source generates information such as voice, data, or sensor output."],
      ["Prepare transmission", "The transmitter amplifies, modulates, or encodes the message into a travel-ready waveform."],
      ["Cross the channel", "The channel carries the signal and may add noise or attenuation."],
      ["Recover information", "The receiver filters, demodulates, and reconstructs the message for the destination."],
    ],
    takeaway:
      "For exams, always tell the communication story as source, transmitter, channel, receiver, destination and then mention where noise enters.",
    visual: {
      blocks: [
        { label: "Source", sublabel: "message" },
        { label: "Transmitter", sublabel: "modulate" },
        { label: "Channel", sublabel: "wired / wireless" },
        { label: "Receiver", sublabel: "recover" },
        { label: "Destination", sublabel: "user" },
      ],
      noiseLabel: "n(t) enters here",
      helperText: "Wired links guide the signal; wireless links radiate it through space.",
    },
  },
  "signals-and-spectra": {
    visualType: "waveform",
    variant: "spectrum",
    title: "Time-Domain to Frequency-Domain Intuition",
    subtitle:
      "See one waveform in time, then watch its energy spread across frequencies and define bandwidth.",
    ariaLabel:
      "Animated signal and spectrum view showing time domain waveform frequency domain bars and bandwidth",
    variables: [
      ["x(t)", "time-domain signal"],
      ["X(f)", "frequency-domain representation"],
      ["BW", "occupied bandwidth"],
      ["PSD", "power spread with frequency"],
    ],
    steps: [
      ["Start in time", "A waveform changes with time and may look simple or complicated."],
      ["Decompose into frequencies", "The same waveform can be read as a combination of sinusoidal ingredients."],
      ["Measure spread", "The frequency span containing useful content becomes the bandwidth."],
      ["Read power distribution", "PSD tells how signal or noise power is shared across frequency."],
    ],
    takeaway:
      "Switch to frequency thinking whenever the question mentions filters, channels, bandwidth, or spectrum.",
    visual: {
      lowLabel: "fL",
      highLabel: "fH",
      spectrumBars: [0.18, 0.36, 0.62, 0.9, 0.62, 0.36, 0.18],
    },
  },
  "amplitude-modulation": {
    visualType: "waveform",
    variant: "am",
    title: "Carrier, Message, and AM Envelope Formation",
    subtitle:
      "The message acts as a slow envelope that changes the height of the fast carrier wave.",
    ariaLabel:
      "Animated amplitude modulation waveform with message carrier envelope and sideband labels",
    variables: [
      ["Ac", "carrier amplitude"],
      ["Am", "message amplitude"],
      ["ma", "modulation index"],
      ["fc ± fm", "AM sidebands"],
    ],
    steps: [
      ["Draw the message", "A slow low-frequency signal contains the useful information."],
      ["Add the carrier", "A high-frequency carrier is chosen for efficient transmission."],
      ["Form the AM wave", "Carrier amplitude expands and contracts with the message envelope."],
      ["Read the spectrum", "Carrier and two sidebands appear in frequency domain around the carrier."],
    ],
    takeaway:
      "Remember that sidebands carry the message while the envelope stays clean only when modulation index does not exceed one.",
    visual: {
      spectrumBars: [0.3, 0.75, 0.3],
      labels: ["LSB", "Carrier", "USB"],
    },
  },
  "angle-modulation": {
    visualType: "waveform",
    variant: "angle",
    title: "FM and PM Angle Variation",
    subtitle:
      "The wave keeps nearly constant height but its spacing or phase shifts according to the message.",
    ariaLabel:
      "Animated angle modulation comparison showing frequency variation phase shift and narrowband versus wideband FM intuition",
    variables: [
      ["Delta f", "frequency deviation"],
      ["beta", "FM modulation index"],
      ["NBFM", "small deviation FM"],
      ["WBFM", "large deviation FM"],
    ],
    steps: [
      ["Keep amplitude fixed", "Angle modulation does not mainly store information in amplitude."],
      ["Shift spacing", "FM compresses and stretches cycle spacing according to the message."],
      ["Shift phase", "PM changes phase directly and creates a related but different carrier behavior."],
      ["Compare bandwidth", "Wide deviation spreads the signal more in frequency but often improves noise performance."],
    ],
    takeaway:
      "AM changes height, but angle modulation changes timing inside the wave; that is the fastest memory shortcut.",
    visual: {
      labels: ["NBFM", "WBFM"],
    },
  },
  "pulse-modulation": {
    visualType: "waveform",
    variant: "pulse",
    title: "Sampling, PAM, PWM, and PPM",
    subtitle:
      "Watch one message create samples and then change pulse amplitude, width, or position.",
    ariaLabel:
      "Animated pulse modulation example showing sampling PAM PWM PPM and aliasing intuition",
    variables: [
      ["fs", "sampling frequency"],
      ["Ts", "sampling period"],
      ["PAM", "pulse amplitude modulation"],
      ["PWM/PPM", "width or position variation"],
    ],
    steps: [
      ["Sample the message", "Periodic instants capture the message value."],
      ["Store amplitude", "PAM keeps the sample as pulse height."],
      ["Store width or timing", "PWM and PPM move information into pulse width or pulse position."],
      ["Respect Nyquist", "Too-low sampling causes aliasing because spectral copies overlap."],
    ],
    takeaway:
      "If the question mentions distorted reconstruction after sampling, check Nyquist and aliasing before anything else.",
    visual: {
      sampleHeights: [0.2, 0.45, 0.78, 0.55, 0.28, 0.62],
      pulseWidths: [18, 28, 40, 32, 20],
      pulseOffsets: [0, 8, -10, 12, -6],
    },
  },
  "digital-communication": {
    visualType: "waveform",
    variant: "digital",
    title: "PCM and Delta Modulation Flow",
    subtitle:
      "Follow the signal from analog samples to quantized steps, binary codes, and simple tracking logic.",
    ariaLabel:
      "Animated digital communication flow showing PCM quantization binary encoding and delta modulation tracking",
    variables: [
      ["L", "quantization levels"],
      ["eq", "quantization error"],
      ["PCM", "pulse code modulation"],
      ["DM", "delta modulation"],
    ],
    steps: [
      ["Sample the signal", "The analog waveform is measured at regular time instants."],
      ["Quantize to levels", "Each sample is rounded to the nearest allowed staircase level."],
      ["Encode in binary", "Each chosen level becomes a binary codeword for transmission."],
      ["Track changes", "Delta modulation uses up/down steps to follow the signal instead of sending full level values every time."],
    ],
    takeaway:
      "PCM is sample, quantize, encode; keep that order fixed in theory answers.",
    visual: {
      staircase: [0.14, 0.14, 0.38, 0.38, 0.62, 0.62, 0.78, 0.78, 0.52, 0.52],
      bits: ["000", "001", "011", "101", "111"],
    },
  },
  "digital-modulation-techniques": {
    visualType: "waveform",
    variant: "digital-mod",
    title: "ASK, FSK, PSK, QPSK, and QAM Mapping",
    subtitle:
      "Compare how digital symbols choose amplitude, frequency, phase, or combined I-Q states.",
    ariaLabel:
      "Animated digital modulation view showing ASK FSK PSK QPSK constellation and QAM mapping",
    variables: [
      ["M", "number of states"],
      ["I", "in-phase axis"],
      ["Q", "quadrature axis"],
      ["Symbol", "one selected signal state"],
    ],
    steps: [
      ["Choose a state family", "The system decides whether bits will control amplitude, frequency, phase, or a combined I-Q point."],
      ["Map bits to symbols", "Each bit group selects one valid symbol state."],
      ["Send one interval", "That chosen state occupies one symbol time on the channel."],
      ["Interpret the constellation", "Receiver decisions are made by locating which valid state is closest to the received point."],
    ],
    takeaway:
      "Classify the scheme first by what the carrier changes, then use bits-per-symbol logic.",
    visual: {
      constellationPoints: [
        [-42, -42],
        [-42, 42],
        [42, -42],
        [42, 42],
        [-70, 0],
        [70, 0],
      ],
    },
  },
  "noise-in-communication-systems": {
    visualType: "waveform",
    variant: "noise",
    title: "Signal Plus Noise and SNR Intuition",
    subtitle:
      "See a clean waveform, then watch random disturbance bury it and compare AM and FM behavior conceptually.",
    ariaLabel:
      "Animated communication noise view showing clean signal noisy signal and SNR improvement concept",
    variables: [
      ["Ps", "signal power"],
      ["Pn", "noise power"],
      ["SNR", "signal-to-noise ratio"],
      ["Limiter", "FM amplitude noise reducer"],
    ],
    steps: [
      ["Start clean", "The original waveform is easy to identify and detect."],
      ["Add disturbance", "Random noise rides on top of the desired signal and hides details."],
      ["Compare strength", "SNR tells whether the useful waveform still dominates the disturbance."],
      ["Relate to modulation", "AM suffers when amplitude is corrupted, while FM can reject many amplitude changes before demodulation."],
    ],
    takeaway:
      "Use SNR as the language of quality and remember why amplitude-noise corruption hurts AM first.",
    visual: {
      snrBars: [0.84, 0.56, 0.26],
      labels: ["High SNR", "Medium SNR", "Low SNR"],
    },
  },
  "information-theory": {
    visualType: "waveform",
    variant: "information",
    title: "Entropy and Channel Capacity Flow",
    subtitle:
      "More surprise means more information, and channel resources place a hard limit on reliable transmission rate.",
    ariaLabel:
      "Animated information theory view showing probability entropy coding and channel capacity concepts",
    variables: [
      ["p(x)", "event probability"],
      ["I(x)", "self information"],
      ["H", "entropy"],
      ["C", "channel capacity"],
    ],
    steps: [
      ["Compare probabilities", "Rare events are more surprising than common events."],
      ["Measure information", "The more surprise an event brings, the more information it carries."],
      ["Average uncertainty", "Entropy summarizes average surprise across all source outcomes."],
      ["Respect capacity", "Bandwidth and SNR together limit the highest reliable communication rate."],
    ],
    takeaway:
      "For exam memory: rare event -> more information, average surprise -> entropy, rate limit -> capacity.",
    visual: {
      probabilities: [0.5, 0.25, 0.15, 0.1],
    },
  },
  "communication-receivers": {
    visualType: "signal-flow",
    variant: "receiver",
    title: "Superheterodyne Receiver Signal Path",
    subtitle:
      "Follow the weak RF signal as it is selected, mixed to IF, amplified, and finally detected.",
    ariaLabel:
      "Animated superheterodyne communication receiver showing RF amplifier mixer local oscillator IF stage and detector",
    variables: [
      ["fRF", "received radio frequency"],
      ["fLO", "local oscillator frequency"],
      ["fIF", "intermediate frequency"],
      ["Detector", "message recovery stage"],
    ],
    steps: [
      ["Select RF", "The front end picks the wanted incoming signal and strengthens it."],
      ["Mix with LO", "The mixer combines RF and local oscillator to create shifted frequency components."],
      ["Choose IF", "A fixed intermediate frequency is filtered and amplified strongly."],
      ["Detect message", "The demodulator recovers the original information from the processed signal."],
    ],
    takeaway:
      "The great advantage of superheterodyne design is fixed-IF selectivity and gain, not just amplification.",
    visual: {
      blocks: [
        { label: "Antenna", sublabel: "RF in" },
        { label: "RF Amp", sublabel: "select" },
        { label: "Mixer", sublabel: "RF + LO" },
        { label: "IF Amp", sublabel: "fixed IF" },
        { label: "Detector", sublabel: "recover" },
      ],
      sideNode: { label: "LO", sublabel: "tuned oscillator" },
    },
  },
  "antennas-and-propagation-basics": {
    visualType: "signal-flow",
    variant: "propagation",
    title: "Radiation Pattern and Propagation Paths",
    subtitle:
      "Watch energy leave the antenna and split conceptually into ground-wave, sky-wave, and space-wave paths.",
    ariaLabel:
      "Animated antenna radiation and propagation view showing directivity ground wave sky wave and space wave paths",
    variables: [
      ["lambda", "wavelength"],
      ["G", "antenna gain"],
      ["D", "directivity"],
      ["Space wave", "line-of-sight path"],
    ],
    steps: [
      ["Radiate energy", "The antenna launches electromagnetic energy away from guided conductors into space."],
      ["Shape direction", "Radiation is stronger in some directions than others, which creates the pattern and directivity idea."],
      ["Follow the path", "Signals may travel as ground wave, reflect or refract through upper layers as sky wave, or move by line of sight as space wave."],
      ["Reach the receiver", "The propagation environment decides how much useful energy finally arrives and from which direction."],
    ],
    takeaway:
      "When propagation is the topic, picture the actual path first and then classify it as ground, sky, or space wave.",
    visual: {
      labels: ["Ground wave", "Sky wave", "Space wave"],
    },
  },
};
