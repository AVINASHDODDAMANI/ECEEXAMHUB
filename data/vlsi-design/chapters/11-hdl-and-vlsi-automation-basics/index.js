import hdlAndVlsiAutomationBasics from "./topics/hdl-and-vlsi-automation-basics";

export const hdlAndVlsiAutomationBasicsTopics = [
  hdlAndVlsiAutomationBasics,
];

const hdlAndVlsiAutomationBasicsChapter = {
  ...{
  "number": "11",
  "slug": "hdl-and-vlsi-automation-basics",
  "title": "HDL and VLSI Automation Basics",
  "summary": "Connect Verilog/VHDL, RTL modeling, simulation, synthesis, gate-level netlists, and CAD automation."
},
  concepts: hdlAndVlsiAutomationBasicsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: hdlAndVlsiAutomationBasicsTopics.map((topic) => topic.title),
  topics: hdlAndVlsiAutomationBasicsTopics,
};

export default hdlAndVlsiAutomationBasicsChapter;
