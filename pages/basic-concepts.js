import SubjectTheoryPage from "./subjects/[slug]";
import { getSubjectTheoryProps } from "../lib/subject-theory-props";

export default SubjectTheoryPage;

export function getStaticProps() {
  return getSubjectTheoryProps("network-analysis", {
    initialActiveConceptIndex: 1,
    standaloneTopicPage: "basic-concepts",
  });
}
