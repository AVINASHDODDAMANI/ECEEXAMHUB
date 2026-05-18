import vectorCalculus from "./chapters/01-vector-calculus";
import electrostatics from "./chapters/02-electrostatics";
import conductorsAndDielectrics from "./chapters/03-conductors-and-dielectrics";
import magnetostatics from "./chapters/04-magnetostatics";
import electromagneticInduction from "./chapters/05-electromagnetic-induction";
import maxwellsEquations from "./chapters/06-maxwells-equations";
import electromagneticWaves from "./chapters/07-electromagnetic-waves";
import transmissionLines from "./chapters/08-transmission-lines";
import waveguides from "./chapters/09-waveguides";
import antennas from "./chapters/10-antennas";
import electromagneticCompatibilityAndApplications from "./chapters/11-electromagnetic-compatibility-and-applications";

export const electromagneticTheoryChapters = [
  vectorCalculus,
  electrostatics,
  conductorsAndDielectrics,
  magnetostatics,
  electromagneticInduction,
  maxwellsEquations,
  electromagneticWaves,
  transmissionLines,
  waveguides,
  antennas,
  electromagneticCompatibilityAndApplications,
];

export const electromagneticTheoryTopics = electromagneticTheoryChapters.flatMap((chapter) => chapter.topics);

export const electromagneticTheorySubject = {
  number: "06",
  slug: "electromagnetic-theory",
  title: "Electromagnetic Theory",
  name: "Electromagnetic Theory",
  weightage: "6-8 marks",
  description: "Cover vector calculus, electrostatics, Maxwell equations, waves, transmission lines, waveguides, antennas, and EMC topics commonly seen in ECE exams.",
  summary: "Cover vector calculus, electrostatics, Maxwell equations, waves, transmission lines, waveguides, antennas, and EMC topics commonly seen in ECE exams.",
  chapters: electromagneticTheoryChapters,
};

export const electromagneticTheoryTopicPageMap = electromagneticTheoryTopics.reduce((pages, topic) => {
  pages[topic.slug] = topic;
  return pages;
}, {});
