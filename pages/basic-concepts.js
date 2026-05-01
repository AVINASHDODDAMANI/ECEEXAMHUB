import SubjectTheoryPage, {
  getSubjectTheoryProps,
  NETWORK_ROUTE_ACTIVE_INDEX,
} from "./subjects/[slug]";

export default SubjectTheoryPage;

export function getStaticProps() {
  return getSubjectTheoryProps("network-analysis", {
    initialActiveConceptIndex: NETWORK_ROUTE_ACTIVE_INDEX["/basic-concepts"],
  });
}
