import dspProcessorsAndApplications from "./topics/dsp-processors-and-applications";

export const dspProcessorsAndApplicationsTopics = [
  dspProcessorsAndApplications,
];

const dspProcessorsAndApplicationsChapter = {
  ...{
  "number": "10",
  "slug": "dsp-processors-and-applications",
  "title": "DSP Processors and Applications",
  "summary": "Connect DSP processor architecture, MAC unit, real-time processing, and audio, image, speech, and communication applications."
},
  concepts: dspProcessorsAndApplicationsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: dspProcessorsAndApplicationsTopics.map((topic) => topic.title),
  topics: dspProcessorsAndApplicationsTopics,
};

export default dspProcessorsAndApplicationsChapter;
