import SubjectTheoryPage from "./subjects/[slug]";
import { getSubjectTheoryProps } from "../lib/subject-theory-props";

export default SubjectTheoryPage;

export function getStaticProps() {
  return getSubjectTheoryProps("analog-electronics", {
    initialActiveConceptIndex: 2,
    standaloneTopicPage: "bjt-mosfet",
  });
}
