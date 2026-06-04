import { subjectDirectory } from "../data/subject-directory";
import {
  getSubjectSlug,
  subjectTheoryRoadmaps,
} from "../data/subject-theory-roadmaps";
import { getLearningSubject } from "./learning-utils";

const SUBJECT_TO_LEARNING_SLUG = {
  "Network Analysis": "networks",
  "Analog Electronics": "analog",
  "Digital Electronics": "digital",
  "Signals and Systems": "signals",
  "Communication Systems": "communications",
  "Electromagnetic Theory": "electromagnetics",
  Microprocessors: "microprocessors",
  "Digital Signal Processing": "dsp",
  "Control Systems": "control-systems",
  "VLSI Design": "vlsi-design",
  "Antenna & Wave Propagation": "antenna-wave-propagation",
  "Embedded Systems": "embedded-systems",
};

const NETWORK_CONTEXTUAL_TOPIC_ROUTES = {
  "network-theorems-topic": "/network-theorems",
  "nodal-and-mesh-analysis": "/dc-circuit-analysis",
  resonance: "/ac-circuit-analysis",
  "two-port-networks": "/two-port-networks",
  "first-order-transients": "/transient-analysis",
  "second-order-transients": "/transient-analysis",
};

const SUBJECT_CONTEXTUAL_TOPIC_ROUTES = {
  analog: {
    "operational-amplifiers": "/operational-amplifiers",
    "active-filters": "/active-filters-waveform-generators",
  },
  digital: {
    "boolean-algebra-and-kmaps": "/logic-gates-and-boolean-algebra",
    "flip-flops": "/sequential-circuits",
    "logic-families": "/logic-families",
  },
  signals: {
    "laplace-transform": "/laplace-transform",
    "sampling-theorem": "/sampling-theorem",
    "z-transform": "/z-transform",
  },
  networks: NETWORK_CONTEXTUAL_TOPIC_ROUTES,
  "control-systems": {
    "time-response": "/time-response-analysis",
    "root-locus": "/root-locus-technique",
  },
};

function getSubjectContextTopicHref(subjectTitle, topic) {
  const learningSubjectSlug = SUBJECT_TO_LEARNING_SLUG[subjectTitle];
  const contextualRoute = SUBJECT_CONTEXTUAL_TOPIC_ROUTES[learningSubjectSlug]?.[topic.slug];

  if (contextualRoute) {
    return contextualRoute;
  }

  return learningSubjectSlug
    ? `/learn/${learningSubjectSlug}/${topic.slug}`
    : `/subjects/${getSubjectSlug(subjectTitle)}`;
}

export function getSubjectTheoryProps(subjectSlug, extraProps = {}) {
  const subject = subjectDirectory.find(
    (item) => getSubjectSlug(item.title) === subjectSlug
  );

  if (!subject) {
    return {
      notFound: true,
      revalidate: 86400,
    };
  }

  const learningSubjectSlug = SUBJECT_TO_LEARNING_SLUG[subject.title] || "";
  const learningSubject = learningSubjectSlug ? getLearningSubject(learningSubjectSlug) : null;
  const learningTopics = learningSubject
    ? learningSubject.chapters.flatMap((chapter) =>
        chapter.topics.map((topic) => ({
          ...topic,
          href: getSubjectContextTopicHref(subject.title, topic),
        }))
      )
    : [];
  const readyTopics = learningTopics.filter((topic) => topic.status === "ready");

  return {
    props: {
      subject,
      steps: subjectTheoryRoadmaps[subject.title] || [],
      learningMeta: {
        learningSubjectSlug,
        totalTopics: learningTopics.length,
        readyTopics: readyTopics.length,
        continueHref: readyTopics[0]?.href || subject.href,
        learningTopics: readyTopics,
      },
      ...extraProps,
    },
    revalidate: 86400,
  };
}
