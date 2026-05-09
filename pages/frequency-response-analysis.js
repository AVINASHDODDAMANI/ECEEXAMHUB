import ControlSystemTopicPage from "../components/ControlSystemTopicPage";
import { controlSystemTopicPageMap } from "../data/control-system-topic-pages";

export default function FrequencyResponseAnalysisPage() {
  return <ControlSystemTopicPage topic={controlSystemTopicPageMap["frequency-response-analysis"]} />;
}
