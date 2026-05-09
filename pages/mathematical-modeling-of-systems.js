import ControlSystemTopicPage from "../components/ControlSystemTopicPage";
import { controlSystemTopicPageMap } from "../data/control-system-topic-pages";

export default function MathematicalModelingOfSystemsPage() {
  return <ControlSystemTopicPage topic={controlSystemTopicPageMap["mathematical-modeling-of-systems"]} />;
}
