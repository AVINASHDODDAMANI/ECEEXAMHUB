import lowPassFilter from "./topics/low-pass-filter";
import highPassFilter from "./topics/high-pass-filter";
import bandPassFilter from "./topics/band-pass-filter";
import bandStopFilter from "./topics/band-stop-filter";
import activeAndPassiveFilters from "./topics/active-and-passive-filters";

export const filtersTopics = [
  lowPassFilter,
  highPassFilter,
  bandPassFilter,
  bandStopFilter,
  activeAndPassiveFilters,
];

const filters = {
  number: "13",
  slug: "filters",
  title: "Filters",
  route: "/filters",
  summary: "Understand low-pass, high-pass, band-pass, and band-stop behavior using passive and active filter circuits.",
  concepts: filtersTopics.flatMap((topic) => topic.concepts).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: filtersTopics.map((topic) => topic.title),
  formula: {
    label: "RC cutoff frequency",
    expression: "fc = 1/(2 pi RC)",
    note: "Cutoff frequency marks the transition between passband and attenuated region for first-order RC filters.",
  },
  visualType: "filter-response",
  visualFocus: "frequency response curves and cutoff movement",
  examFocus: "Filter type recognition, cutoff frequency, passband, stopband, and response shape.",
  engineeringUse: "Used in signal conditioning, communication receivers, audio systems, sensor processing, and noise reduction.",
  topics: filtersTopics,
};

export default filters;
