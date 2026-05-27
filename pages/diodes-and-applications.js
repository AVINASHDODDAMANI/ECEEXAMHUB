import SubjectTheoryPage from "./subjects/[slug]";
import { getSubjectTheoryProps } from "../lib/subject-theory-props";

export default SubjectTheoryPage;

export function getStaticProps() {
  return getSubjectTheoryProps("analog-electronics", {
    initialActiveConceptIndex: 1,
    standaloneTopicPage: "analog-diodes-and-applications",
  });
}
