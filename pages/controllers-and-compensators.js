import ControlSystemTopicPage from "../components/ControlSystemTopicPage";
import { controlSystemTopicPageMap } from "../data/control-system-topic-pages";

export default function ControllersAndCompensatorsPage() {
  return <ControlSystemTopicPage topic={controlSystemTopicPageMap["controllers-and-compensators"]} />;
}
