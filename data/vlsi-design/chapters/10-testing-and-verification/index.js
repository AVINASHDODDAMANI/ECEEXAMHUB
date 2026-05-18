import testingAndVerification from "./topics/testing-and-verification";

export const testingAndVerificationTopics = [
  testingAndVerification,
];

const testingAndVerificationChapter = {
  ...{
  "number": "10",
  "slug": "testing-and-verification",
  "title": "Testing and Verification",
  "summary": "Study fault detection, scan chains, BIST, functional verification, physical verification, and error detection flow."
},
  concepts: testingAndVerificationTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: testingAndVerificationTopics.map((topic) => topic.title),
  topics: testingAndVerificationTopics,
};

export default testingAndVerificationChapter;
