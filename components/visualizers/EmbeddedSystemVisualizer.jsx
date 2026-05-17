import { memo } from "react";
import { embeddedVisualizationData } from "../../data/embedded-visualization-data";
import useVisualizationSteps from "../../hooks/useVisualizationSteps";
import VisualizationCard from "./VisualizationCard";
import StepExplanation from "./StepExplanation";
import HardwareFlowVisualizer from "./HardwareFlowVisualizer";
import ProtocolAnimation from "./ProtocolAnimation";

function renderVisual(visual, activeStep) {
  if (["protocol", "timing", "rtos", "memory-power"].includes(visual.visualType)) {
    return (
      <ProtocolAnimation
        type={visual.visualType}
        activeStep={activeStep}
        ariaLabel={visual.ariaLabel}
      />
    );
  }

  return (
    <HardwareFlowVisualizer
      blocks={visual.blocks}
      activeStep={activeStep}
      ariaLabel={visual.ariaLabel}
    />
  );
}

function EmbeddedSystemVisualizerComponent({ slug }) {
  const visual = embeddedVisualizationData[slug];
  const { activeStep, setActiveStep } = useVisualizationSteps(visual?.steps || [], 2800);

  if (!visual) {
    return null;
  }

  return (
    <VisualizationCard title={visual.title} subtitle={visual.subtitle} ariaLabel={visual.ariaLabel}>
      <div className="grid gap-4">
        {renderVisual(visual, activeStep)}

        <div className="grid gap-3 md:grid-cols-[1fr_0.72fr]">
          <StepExplanation steps={visual.steps} activeStep={activeStep} onStepSelect={setActiveStep} />
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">Labels and Blocks</h4>
            <dl className="mt-3 grid gap-2">
              {visual.variables.map(([symbol, meaning]) => (
                <div key={symbol} className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <dt className="text-sm font-black text-slate-950">{symbol}</dt>
                  <dd className="mt-1 text-xs leading-5 text-slate-600">{meaning}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-800">Exam Takeaway</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">{visual.takeaway}</p>
            </div>
          </aside>
        </div>
      </div>
    </VisualizationCard>
  );
}

const EmbeddedSystemVisualizer = memo(EmbeddedSystemVisualizerComponent);

export default EmbeddedSystemVisualizer;
