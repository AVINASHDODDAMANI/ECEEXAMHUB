import SubjectTheoryPage, { getSubjectTheoryProps } from "./subjects/[slug]";

export default SubjectTheoryPage;

export function getStaticProps() {
  return getSubjectTheoryProps("analog-electronics", {
    initialActiveConceptIndex: 1,
    standaloneTopicPage: "diodes",
  });
}
