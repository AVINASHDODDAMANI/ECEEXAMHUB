import MicroprocessorTopicPage from "../components/MicroprocessorTopicPage";
import { getLearningTopic } from "../lib/learning-utils";

export default function EightyEightySixMicroprocessorPage({ topic }) {
  return <MicroprocessorTopicPage topic={topic} />;
}

export async function getStaticProps() {
  const topic = getLearningTopic("microprocessors", "8086-microprocessor");

  if (!topic) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      topic: {
        ...topic,
        canonicalPath: "/8086-microprocessor",
      },
    },
    revalidate: 86400,
  };
}
