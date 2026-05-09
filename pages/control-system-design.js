import ControlSystemTopicPage from "../components/ControlSystemTopicPage";
import { controlSystemTopicPageMap } from "../data/control-system-topic-pages";

export default function ControlSystemDesignPage() {
  return <ControlSystemTopicPage topic={controlSystemTopicPageMap["control-system-design"]} />;
}
