import assemblyLanguageProgramming from "./topics/assembly-language-programming";

export const assemblyLanguageProgrammingTopics = [
  assemblyLanguageProgramming,
];

const assemblyLanguageProgrammingChapter = {
  ...{
  "slug": "assembly-language-programming",
  "title": "Assembly Language Programming",
  "number": "04",
  "summary": "Assembly Language Programming chapter for Microprocessors."
},
  concepts: assemblyLanguageProgrammingTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: assemblyLanguageProgrammingTopics.map((topic) => topic.title),
  topics: assemblyLanguageProgrammingTopics,
};

export default assemblyLanguageProgrammingChapter;
