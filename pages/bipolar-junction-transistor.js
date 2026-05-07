import SubjectTheoryPage, { getSubjectTheoryProps } from "./subjects/[slug]";

export default SubjectTheoryPage;

export function getStaticProps() {
  return getSubjectTheoryProps("analog-electronics", {
    initialActiveConceptIndex: 2,
    standaloneTopicPage: "analog-bipolar-junction-transistor",
  });
}
