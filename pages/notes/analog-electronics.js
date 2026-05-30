import NoteTopicPage from "./[slug]";
import { subjectDirectory } from "../../data/subject-directory";
import seedQuestions from "../../data/questions";
import {
  subjectTheoryKnowledge,
  subjectTheoryRoadmaps,
} from "../../data/subject-theory-roadmaps";
import { getLearningSubject } from "../../lib/learning-utils";

const SUBJECT_TITLE = "Analog Electronics";
const LEARNING_SUBJECT_SLUG = "analog";
const QUESTION_SUBJECT = "Analog";
const SEO_OVERRIDE = {
  title: "Analog Electronics Quick Notes for GATE ECE PDF + Formulas + PYQs",
  description:
    "Download Analog Electronics quick notes for ECE with diodes, BJT, MOSFET, amplifiers, op-amps, filters, oscillators, formulas, and previous year questions.",
};

export default function AnalogElectronicsNotesPage(props) {
  return <NoteTopicPage {...props} />;
}

export function getStaticProps() {
  const subject = subjectDirectory.find((item) => item.title === SUBJECT_TITLE);
  const theoryKnowledge = subjectTheoryKnowledge[SUBJECT_TITLE] || null;
  const learningSubject = getLearningSubject(LEARNING_SUBJECT_SLUG);
  const learningTopics = learningSubject
    ? learningSubject.chapters.flatMap((chapter) =>
        chapter.topics.map((topic) => ({
          ...topic,
          href: `/learn/${LEARNING_SUBJECT_SLUG}/${topic.slug}`,
        }))
      )
    : [];
  const readyTopics = learningTopics.filter((topic) => topic.status === "ready");

  return {
    props: {
      subject,
      steps: subjectTheoryRoadmaps[SUBJECT_TITLE] || [],
      theoryKnowledge,
      seoOverride: SEO_OVERRIDE,
      learningMeta: {
        learningSubjectSlug: LEARNING_SUBJECT_SLUG,
        totalTopics: learningTopics.length,
        readyTopics: readyTopics.length,
        continueHref: readyTopics[0]?.href || subject?.href || "/notes",
        learningTopics: readyTopics,
        questionCount: seedQuestions.filter(
          (question) => question.subject === QUESTION_SUBJECT
        ).length,
      },
    },
    revalidate: 86400,
  };
}
