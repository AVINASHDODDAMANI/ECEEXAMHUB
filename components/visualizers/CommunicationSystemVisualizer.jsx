import { memo } from "react";
import { communicationVisualizationData } from "../../data/communication-visualization-data";
import { useVisualizationSteps } from "../../hooks/useVisualizationSteps";
import SignalFlowAnimation from "./SignalFlowAnimation";
import StepExplanation from "./StepExplanation";
import VisualizationCard from "./VisualizationCard";
import WaveformAnimator from "./WaveformAnimator";

function VariableLabels({ variables = [] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {variables.map(([symbol, meaning]) => (
        <div
          key={symbol}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/85 px-3 py-2"
        >
          <span className="rounded-lg bg-slate-950 px-2 py-1 font-mono text-xs font-black text-white">
            {symbol}
          </span>
          <span className="text-sm leading-5 text-slate-700">{meaning}</span>
        </div>
      ))}
    </div>
  );
}

function CommunicationSystemVisualizerComponent({ slug }) {
  const visualization = communicationVisualizationData[slug];
  const { activeStep, setActiveStep } = useVisualizationSteps(visualization?.steps || []);

  if (!visualization) {
    return null;
  }

  const Animation =
    visualization.visualType === "signal-flow" ? SignalFlowAnimation : WaveformAnimator;

  return (
    <VisualizationCard
      title={visualization.title}
      subtitle={visualization.subtitle}
      ariaLabel={visualization.ariaLabel}
    >
      <div className="grid gap-5">
        <Animation
          variant={visualization.variant}
          visual={visualization.visual}
          activeStep={activeStep}
        />
        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <StepExplanation
            steps={visualization.steps}
            activeStep={activeStep}
            onStepSelect={setActiveStep}
          />
          <div className="grid gap-3">
            <VariableLabels variables={visualization.variables} />
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-slate-800">
              Exam takeaway: {visualization.takeaway}
            </div>
          </div>
        </div>
      </div>
    </VisualizationCard>
  );
}

const CommunicationSystemVisualizer = memo(CommunicationSystemVisualizerComponent);

export default CommunicationSystemVisualizer;
