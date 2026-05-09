import ControlSystemTopicPage from "../components/ControlSystemTopicPage";
import { controlSystemTopicPageMap } from "../data/control-system-topic-pages";

export default function StateSpaceAnalysisPage() {
  return <ControlSystemTopicPage topic={controlSystemTopicPageMap["state-space-analysis"]} />;
}
