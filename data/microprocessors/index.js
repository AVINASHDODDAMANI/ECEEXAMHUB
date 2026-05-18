import introductionToMicroprocessors from "./chapters/01-introduction-to-microprocessors";
import topicMicroprocessorArchitecture from "./chapters/02-8085-microprocessor-architecture";
import topicInstructionSet from "./chapters/03-8085-instruction-set";
import assemblyLanguageProgramming from "./chapters/04-assembly-language-programming";
import timingDiagramsAndMachineCycles from "./chapters/05-timing-diagrams-and-machine-cycles";
import interruptsIn8085 from "./chapters/06-interrupts-in-8085";
import memoryInterfacing from "./chapters/07-memory-interfacing";
import ioInterfacing from "./chapters/08-io-interfacing";
import topicProgrammablePeripheralInterface from "./chapters/09-8255-programmable-peripheral-interface";
import topicMicroprocessor from "./chapters/10-8086-microprocessor";
import advancedTopics from "./chapters/11-advanced-topics";

export const microprocessorsChapters = [
  introductionToMicroprocessors,
  topicMicroprocessorArchitecture,
  topicInstructionSet,
  assemblyLanguageProgramming,
  timingDiagramsAndMachineCycles,
  interruptsIn8085,
  memoryInterfacing,
  ioInterfacing,
  topicProgrammablePeripheralInterface,
  topicMicroprocessor,
  advancedTopics,
];

export const microprocessorsTopics = microprocessorsChapters.flatMap((chapter) => chapter.topics);

export const microprocessorsSubject = {
  number: "07",
  slug: "microprocessors",
  title: "Microprocessors",
  name: "Microprocessors",
  weightage: "6-8 marks",
  description: "Study 8085 architecture, instruction execution, assembly programming, timing diagrams, interrupts, interfacing, 8255, 8086, and advanced processor applications.",
  summary: "Study 8085 architecture, instruction execution, assembly programming, timing diagrams, interrupts, interfacing, 8255, 8086, and advanced processor applications.",
  chapters: microprocessorsChapters,
};

export const microprocessorsTopicPageMap = microprocessorsTopics.reduce((pages, topic) => {
  pages[topic.slug] = topic;
  return pages;
}, {});
