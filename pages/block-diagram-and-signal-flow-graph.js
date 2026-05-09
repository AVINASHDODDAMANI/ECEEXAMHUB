import ControlSystemTopicPage from "../components/ControlSystemTopicPage";
import { controlSystemTopicPageMap } from "../data/control-system-topic-pages";

export default function BlockDiagramAndSignalFlowGraphPage() {
  return <ControlSystemTopicPage topic={controlSystemTopicPageMap["block-diagram-and-signal-flow-graph"]} />;
}
