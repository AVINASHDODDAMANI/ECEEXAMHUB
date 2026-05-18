import introductionToVlsiDesign from "./chapters/01-introduction-to-vlsi-design";
import mosTransistorBasics from "./chapters/02-mos-transistor-basics";
import cmosLogicDesign from "./chapters/03-cmos-logic-design";
import cmosFabricationTechnology from "./chapters/04-cmos-fabrication-technology";
import vlsiDesignStyles from "./chapters/05-vlsi-design-styles";
import stickDiagramsAndLayoutDesign from "./chapters/06-stick-diagrams-and-layout-design";
import combinationalCircuitDesign from "./chapters/07-combinational-circuit-design";
import sequentialCircuitDesign from "./chapters/08-sequential-circuit-design";
import vlsiInterconnectsAndScaling from "./chapters/09-vlsi-interconnects-and-scaling";
import testingAndVerification from "./chapters/10-testing-and-verification";
import hdlAndVlsiAutomationBasics from "./chapters/11-hdl-and-vlsi-automation-basics";

export const vlsiDesignChapters = [
  introductionToVlsiDesign,
  mosTransistorBasics,
  cmosLogicDesign,
  cmosFabricationTechnology,
  vlsiDesignStyles,
  stickDiagramsAndLayoutDesign,
  combinationalCircuitDesign,
  sequentialCircuitDesign,
  vlsiInterconnectsAndScaling,
  testingAndVerification,
  hdlAndVlsiAutomationBasics,
];

export const vlsiDesignTopics = vlsiDesignChapters.flatMap((chapter) => chapter.topics);

export const vlsiDesignSubject = {
  number: "10",
  slug: "vlsi-design",
  title: "VLSI Design",
  name: "VLSI Design",
  weightage: "",
  description: "VLSI Design topic pages for GATE ECE.",
  summary: "VLSI Design topic pages for GATE ECE.",
  chapters: vlsiDesignChapters,
};

export const vlsiDesignTopicPageMap = vlsiDesignTopics.reduce((pages, topic) => {
  pages[topic.slug] = topic;
  return pages;
}, {});
