import introductionToEmbeddedSystems from "./chapters/01-introduction-to-embedded-systems";
import embeddedSystemArchitecture from "./chapters/02-embedded-system-architecture";
import microcontrollers from "./chapters/03-microcontrollers";
import embeddedCProgramming from "./chapters/04-embedded-c-programming";
import interfacingTechniques from "./chapters/05-interfacing-techniques";
import communicationProtocols from "./chapters/06-communication-protocols";
import timersCountersAndInterrupts from "./chapters/07-timers-counters-and-interrupts";
import realTimeOperatingSystemsRtos from "./chapters/08-real-time-operating-systems-rtos";
import memoryAndPowerManagement from "./chapters/09-memory-and-power-management";
import embeddedSystemDesignProcess from "./chapters/10-embedded-system-design-process";
import advancedEmbeddedApplications from "./chapters/11-advanced-embedded-applications";

export const embeddedSystemsChapters = [
  introductionToEmbeddedSystems,
  embeddedSystemArchitecture,
  microcontrollers,
  embeddedCProgramming,
  interfacingTechniques,
  communicationProtocols,
  timersCountersAndInterrupts,
  realTimeOperatingSystemsRtos,
  memoryAndPowerManagement,
  embeddedSystemDesignProcess,
  advancedEmbeddedApplications,
];

export const embeddedSystemsTopics = embeddedSystemsChapters.flatMap((chapter) => chapter.topics);

export const embeddedSystemsSubject = {
  number: "12",
  slug: "embedded-systems",
  title: "Embedded Systems",
  name: "Embedded Systems",
  weightage: "",
  description: "Embedded Systems topic pages for GATE ECE.",
  summary: "Embedded Systems topic pages for GATE ECE.",
  chapters: embeddedSystemsChapters,
};

export const embeddedSystemsTopicPageMap = embeddedSystemsTopics.reduce((pages, topic) => {
  pages[topic.slug] = topic;
  return pages;
}, {});
