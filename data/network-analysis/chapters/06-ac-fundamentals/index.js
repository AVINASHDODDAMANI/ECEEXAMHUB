import sinusoidalWaveforms from "./topics/sinusoidal-waveforms";
import phaseAndPhasors from "./topics/phase-and-phasors";
import rmsAndAverageValues from "./topics/rms-and-average-values";
import complexImpedanceBasics from "./topics/complex-impedance-basics";

export const acFundamentalsTopics = [
  sinusoidalWaveforms,
  phaseAndPhasors,
  rmsAndAverageValues,
  complexImpedanceBasics,
];

const acFundamentals = {
  number: "06",
  slug: "ac-fundamentals",
  title: "AC Fundamentals",
  route: "/ac-fundamentals",
  summary: "Learn sinusoidal signals, phase, phasors, RMS value, average value, complex impedance, and AC reference notation.",
  concepts: acFundamentalsTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: acFundamentalsTopics.map((topic) => topic.title),
  formula: {
    label: "Sinusoidal signal",
    expression: "v(t) = Vm sin(omega t + phi)",
    note: "Amplitude, angular frequency, and phase define the AC waveform.",
  },
  visualType: "phasor-wave",
  visualFocus: "waveform and rotating phasor connection",
  examFocus: "RMS values, phase relation, phasor conversion, impedance signs.",
  engineeringUse: "Used to analyze steady-state power, filters, resonance, communication circuits, and AC machines.",
  topics: acFundamentalsTopics,
};

export default acFundamentals;
