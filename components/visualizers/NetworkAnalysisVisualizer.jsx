import { memo, useMemo } from "react";
import useVisualizationSteps from "../../hooks/useVisualizationSteps";
import VisualizationCard from "./VisualizationCard";
import TheoremVisualizer from "./TheoremVisualizer";

function NetworkAnalysisVisualizerComponent({ visualizations = [], title = "Network Analysis Visualizations" }) {
  const visibleItems = useMemo(() => visualizations.filter(Boolean), [visualizations]);

  if (!visibleItems.length) {
    return null;
  }

  return (
    <section className="grid gap-4" aria-label={title}>
      {visibleItems.map((visual) => (
        <NetworkAnalysisVisualizationItem key={visual.slug} visual={visual} />
      ))}
    </section>
  );
}

function NetworkAnalysisVisualizationItem({ visual }) {
  const { activeStep, setActiveStep } = useVisualizationSteps(visual.steps, 3200);

  return (
    <VisualizationCard
      title={`${visual.topicNumber}. ${visual.title}`}
      subtitle={visual.subtitle}
      ariaLabel={visual.ariaLabel}
    >
      <TheoremVisualizer visual={visual} activeStep={activeStep} setActiveStep={setActiveStep} />
    </VisualizationCard>
  );
}

const NetworkAnalysisVisualizer = memo(NetworkAnalysisVisualizerComponent);

export default NetworkAnalysisVisualizer;
