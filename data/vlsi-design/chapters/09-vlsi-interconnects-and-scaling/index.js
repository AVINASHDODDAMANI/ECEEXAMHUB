import vlsiInterconnectsAndScaling from "./topics/vlsi-interconnects-and-scaling";

export const vlsiInterconnectsAndScalingTopics = [
  vlsiInterconnectsAndScaling,
];

const vlsiInterconnectsAndScalingChapter = {
  ...{
  "number": "09",
  "slug": "vlsi-interconnects-and-scaling",
  "title": "VLSI Interconnects and Scaling",
  "summary": "See how wire resistance, capacitance, propagation delay, short-channel effects, and scaling affect speed and power."
},
  concepts: vlsiInterconnectsAndScalingTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: vlsiInterconnectsAndScalingTopics.map((topic) => topic.title),
  topics: vlsiInterconnectsAndScalingTopics,
};

export default vlsiInterconnectsAndScalingChapter;
