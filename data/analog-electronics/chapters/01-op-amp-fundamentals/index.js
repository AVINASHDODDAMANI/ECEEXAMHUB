import operationalAmplifiers from "./topics/operational-amplifiers";
import activeFilters from "./topics/active-filters";

export const opAmpFundamentalsTopics = [
  operationalAmplifiers,
  activeFilters,
];

const opAmpFundamentalsChapter = {
  ...{
  "slug": "op-amp-fundamentals",
  "title": "Op-Amp Fundamentals",
  "number": "01",
  "summary": "Op-Amp Fundamentals chapter for Analog."
},
  concepts: opAmpFundamentalsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: opAmpFundamentalsTopics.map((topic) => topic.title),
  topics: opAmpFundamentalsTopics,
};

export default opAmpFundamentalsChapter;
