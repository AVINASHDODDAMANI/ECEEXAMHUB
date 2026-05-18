import filterDesignTechniques from "./topics/filter-design-techniques";

export const filterDesignTechniquesTopics = [
  filterDesignTechniques,
];

const filterDesignTechniquesChapter = {
  ...{
  "number": "08",
  "slug": "filter-design-techniques",
  "title": "Filter Design Techniques",
  "summary": "Study FIR window method, Butterworth and Chebyshev IIR filters, and low-pass, high-pass, and band-pass design behavior."
},
  concepts: filterDesignTechniquesTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: filterDesignTechniquesTopics.map((topic) => topic.title),
  topics: filterDesignTechniquesTopics,
};

export default filterDesignTechniquesChapter;
