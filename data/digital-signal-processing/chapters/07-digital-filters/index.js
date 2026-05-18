import digitalFilters from "./topics/digital-filters";

export const digitalFiltersTopics = [
  digitalFilters,
];

const digitalFiltersChapter = {
  ...{
  "number": "07",
  "slug": "digital-filters",
  "title": "Digital Filters",
  "summary": "Compare FIR and IIR filters, structures, frequency response, filtering action, and input-output waveform behavior."
},
  concepts: digitalFiltersTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: digitalFiltersTopics.map((topic) => topic.title),
  topics: digitalFiltersTopics,
};

export default digitalFiltersChapter;
