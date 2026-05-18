import frequencyResponse from "./topics/frequency-response";
import feedbackAmplifiers from "./topics/feedback-amplifiers";

export const frequencyResponseAndFeedbackTopics = [
  frequencyResponse,
  feedbackAmplifiers,
];

const frequencyResponseAndFeedbackChapter = {
  ...{
  "slug": "frequency-response-and-feedback",
  "title": "Frequency Response and Feedback",
  "number": "03",
  "summary": "Frequency Response and Feedback chapter for Analog."
},
  concepts: frequencyResponseAndFeedbackTopics.flatMap((topic) => topic.concepts || []).filter((concept, index, concepts) => concepts.indexOf(concept) === index),
  subtopics: frequencyResponseAndFeedbackTopics.map((topic) => topic.title),
  topics: frequencyResponseAndFeedbackTopics,
};

export default frequencyResponseAndFeedbackChapter;
