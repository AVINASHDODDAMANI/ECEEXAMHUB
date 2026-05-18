import modernAntennaApplications from "./topics/modern-antenna-applications";

export const modernAntennaApplicationsTopics = [
  modernAntennaApplications,
];

const modernAntennaApplicationsChapter = {
  ...{
  "number": "10",
  "slug": "modern-antenna-applications",
  "title": "Modern Antenna Applications",
  "summary": "Connect satellite links, mobile towers, radar scanning, smart antennas, beamforming, and MIMO communication basics."
},
  concepts: modernAntennaApplicationsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: modernAntennaApplicationsTopics.map((topic) => topic.title),
  topics: modernAntennaApplicationsTopics,
};

export default modernAntennaApplicationsChapter;
