import controllersAndCompensators from "./topics/controllers-and-compensators";

export const controllersAndCompensatorsTopics = [
  controllersAndCompensators,
];

const controllersAndCompensatorsChapter = {
  ...{
  "number": "07",
  "slug": "controllers-and-compensators",
  "title": "Controllers and Compensators",
  "summary": "Controllers and compensators modify system behavior so the output becomes faster, more accurate, more stable, or better damped."
},
  concepts: controllersAndCompensatorsTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: controllersAndCompensatorsTopics.map((topic) => topic.title),
  topics: controllersAndCompensatorsTopics,
};

export default controllersAndCompensatorsChapter;
