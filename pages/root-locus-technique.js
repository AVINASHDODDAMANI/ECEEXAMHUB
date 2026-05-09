import ControlSystemTopicPage from "../components/ControlSystemTopicPage";
import { controlSystemTopicPageMap } from "../data/control-system-topic-pages";

export default function RootLocusTechniquePage() {
  return <ControlSystemTopicPage topic={controlSystemTopicPageMap["root-locus-technique"]} />;
}
