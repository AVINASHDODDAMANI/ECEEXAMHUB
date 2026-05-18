import signalsAndSpectra from "./topics/signals-and-spectra";

export const signalsAndSpectraTopics = [
  signalsAndSpectra,
];

const signalsAndSpectraChapter = {
  ...{
  "number": "02",
  "slug": "signals-and-spectra",
  "title": "02 Signals and Spectra",
  "summary": "Signals and spectra explain how the same communication waveform can be viewed in time and frequency, which is essential for bandwidth, filtering, and modulation understanding."
},
  concepts: signalsAndSpectraTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: signalsAndSpectraTopics.map((topic) => topic.title),
  topics: signalsAndSpectraTopics,
};

export default signalsAndSpectraChapter;
