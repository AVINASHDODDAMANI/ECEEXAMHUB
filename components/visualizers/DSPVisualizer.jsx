import { memo } from "react";
import { motion } from "framer-motion";
import { dspVisualizationData } from "../../data/dsp-visualization-data";
import useVisualizationSteps from "../../hooks/useVisualizationSteps";
import VisualizationCard from "./VisualizationCard";
import StepExplanation from "./StepExplanation";
import SignalAnimation from "./SignalAnimation";
import FrequencyDomainVisualizer from "./FrequencyDomainVisualizer";
import FilterResponseVisualizer from "./FilterResponseVisualizer";

function FlowBlocks({ activeStep = 0, type = "flow" }) {
  const labels =
    type === "processor"
      ? ["Samples", "Memory", "MAC Unit", "Output"]
      : type === "convolution"
      ? ["x[n]", "slide h[n]", "multiply", "sum y[n]"]
      : ["Input", "Sample", "Process", "Output"];

  return (
    <svg viewBox="0 0 620 180" className="w-full rounded-2xl border border-slate-200 bg-white" role="img" aria-label={`${type} flow animation`}>
      {labels.map((label, index) => {
        const x = 26 + index * 148;
        const isActive = index <= activeStep + 1;
        return (
          <g key={label}>
            <motion.rect
              x={x}
              y="62"
              width="118"
              height="58"
              rx="16"
              fill={isActive ? "#eff6ff" : "#f8fafc"}
              stroke={isActive ? "#154a96" : "#cbd5e1"}
              strokeWidth="2"
              animate={{ y: isActive ? [62, 56, 62] : 62 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: index * 0.08 }}
            />
            <text x={x + 59} y="96" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">{label}</text>
            {index < labels.length - 1 ? (
              <motion.path
                d={`M${x + 122} 91 H${x + 144}`}
                stroke="#f59e0b"
                strokeWidth="4"
                strokeLinecap="round"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.18 }}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

function renderVisual(visualType, activeStep) {
  if (visualType === "sequence") {
    return <SignalAnimation type="sequence" activeStep={activeStep} />;
  }
  if (visualType === "sampling") {
    return <SignalAnimation type="sampling" activeStep={activeStep} />;
  }
  if (visualType === "frequency") {
    return <FrequencyDomainVisualizer type="frequency" activeStep={activeStep} />;
  }
  if (visualType === "fft") {
    return <FrequencyDomainVisualizer type="fft" activeStep={activeStep} />;
  }
  if (visualType === "zplane") {
    return <FrequencyDomainVisualizer type="zplane" activeStep={activeStep} />;
  }
  if (visualType === "filter" || visualType === "filter-design") {
    return <FilterResponseVisualizer type={visualType} activeStep={activeStep} />;
  }
  if (visualType === "convolution" || visualType === "processor") {
    return <FlowBlocks type={visualType} activeStep={activeStep} />;
  }
  return <SignalAnimation type="flow" activeStep={activeStep} />;
}

function DSPVisualizerComponent({ slug }) {
  const visual = dspVisualizationData[slug];
  const { activeStep, setActiveStep } = useVisualizationSteps(visual?.steps || []);

  if (!visual) {
    return null;
  }

  return (
    <VisualizationCard title={visual.title} subtitle={visual.subtitle} ariaLabel={visual.ariaLabel}>
      <div className="grid gap-4">
        {renderVisual(visual.visualType, activeStep)}

        <div className="grid gap-3 md:grid-cols-[1fr_0.72fr]">
          <StepExplanation steps={visual.steps} activeStep={activeStep} onStepSelect={setActiveStep} />
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">Variables</h4>
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

const DSPVisualizer = memo(DSPVisualizerComponent);

export default DSPVisualizer;
