import ControlSystemTopicPage from "../components/ControlSystemTopicPage";
import { controlSystemTopicPageMap } from "../data/control-system-topic-pages";

export default function TimeResponseAnalysisPage() {
  return <ControlSystemTopicPage topic={controlSystemTopicPageMap["time-response-analysis"]} />;
}
