import introductionToAntennas from "./chapters/01-introduction-to-antennas";
import antennaFundamentals from "./chapters/02-antenna-fundamentals";
import dipoleAndMonopoleAntennas from "./chapters/03-dipole-and-monopole-antennas";
import antennaArrays from "./chapters/04-antenna-arrays";
import specialAntennas from "./chapters/05-special-antennas";
import wavePropagationBasics from "./chapters/06-wave-propagation-basics";
import groundWaveAndSkyWavePropagation from "./chapters/07-ground-wave-and-sky-wave-propagation";
import spaceWavePropagation from "./chapters/08-space-wave-propagation";
import antennaMeasurements from "./chapters/09-antenna-measurements";
import modernAntennaApplications from "./chapters/10-modern-antenna-applications";

export const antennaWavePropagationChapters = [
  introductionToAntennas,
  antennaFundamentals,
  dipoleAndMonopoleAntennas,
  antennaArrays,
  specialAntennas,
  wavePropagationBasics,
  groundWaveAndSkyWavePropagation,
  spaceWavePropagation,
  antennaMeasurements,
  modernAntennaApplications,
];

export const antennaWavePropagationTopics = antennaWavePropagationChapters.flatMap((chapter) => chapter.topics);

export const antennaWavePropagationSubject = {
  number: "11",
  slug: "antenna-wave-propagation",
  title: "Antenna & Wave Propagation",
  name: "Antenna & Wave Propagation",
  weightage: "",
  description: "Antenna and Wave Propagation topic pages for GATE ECE.",
  summary: "Antenna and Wave Propagation topic pages for GATE ECE.",
  chapters: antennaWavePropagationChapters,
};

export const antennaWavePropagationTopicPageMap = antennaWavePropagationTopics.reduce((pages, topic) => {
  pages[topic.slug] = topic;
  return pages;
}, {});
