import introductionToCommunicationSystems from "./chapters/01-introduction-to-communication-systems";
import signalsAndSpectra from "./chapters/02-signals-and-spectra";
import amplitudeModulation from "./chapters/03-amplitude-modulation";
import angleModulation from "./chapters/04-angle-modulation";
import pulseModulation from "./chapters/05-pulse-modulation";
import digitalCommunication from "./chapters/06-digital-communication";
import digitalModulationTechniques from "./chapters/07-digital-modulation-techniques";
import noiseInCommunicationSystems from "./chapters/08-noise-in-communication-systems";
import informationTheory from "./chapters/09-information-theory";
import communicationReceivers from "./chapters/10-communication-receivers";
import antennasAndPropagationBasics from "./chapters/11-antennas-and-propagation-basics";

export const communicationSystemsChapters = [
  introductionToCommunicationSystems,
  signalsAndSpectra,
  amplitudeModulation,
  angleModulation,
  pulseModulation,
  digitalCommunication,
  digitalModulationTechniques,
  noiseInCommunicationSystems,
  informationTheory,
  communicationReceivers,
  antennasAndPropagationBasics,
];

export const communicationSystemsTopics = communicationSystemsChapters.flatMap((chapter) => chapter.topics);

export const communicationSystemsSubject = {
  number: "05",
  slug: "communication-systems",
  title: "Communication Systems",
  name: "Communication Systems",
  weightage: "",
  description: "Communication Systems topic pages for GATE ECE.",
  summary: "Communication Systems topic pages for GATE ECE.",
  chapters: communicationSystemsChapters,
};

export const communicationSystemsTopicPageMap = communicationSystemsTopics.reduce((pages, topic) => {
  pages[topic.slug] = topic;
  return pages;
}, {});
