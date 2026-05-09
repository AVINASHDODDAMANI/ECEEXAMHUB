import ControlSystemTopicPage from "../components/ControlSystemTopicPage";
import { controlSystemTopicPageMap } from "../data/control-system-topic-pages";

export default function StabilityAnalysisPage() {
  return <ControlSystemTopicPage topic={controlSystemTopicPageMap["stability-analysis"]} />;
}
