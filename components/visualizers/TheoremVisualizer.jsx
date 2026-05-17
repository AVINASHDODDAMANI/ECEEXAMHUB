import { memo } from "react";
import { motion } from "framer-motion";
import CircuitFlowAnimation from "./CircuitFlowAnimation";

const activeStepClass = "border-portal-300 bg-portal-50 text-slate-950 shadow-sm";
const idleStepClass = "border-slate-200 bg-white text-slate-700";

function TheoremVisualizerComponent({ visual, activeStep, setActiveStep }) {
  if (!visual) {
    return null;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <CircuitFlowAnimation mode={visual.mode} activeStep={activeStep} labels={visual.labels} />

      <div className="grid gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-portal-700">
            Beginner Intuition
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
            {visual.intuition}
          </p>
        </div>

        <div className="grid gap-2" role="list" aria-label={`${visual.title} step-by-step explanation`}>
          {visual.steps.map((step, index) => {
            const isActive = index === activeStep;

            return (
              <button
                key={step.title}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`rounded-2xl border p-3 text-left transition ${isActive ? activeStepClass : idleStepClass}`}
              >
                <span className="flex items-start gap-3">
                  <motion.span
                    animate={{ scale: isActive ? 1.08 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-portal-600 text-xs font-black text-white"
                  >
                    {index + 1}
                  </motion.span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black">{step.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-700">{step.detail}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            Exam Takeaway
          </p>
          <p className="mt-2 text-sm font-bold leading-6 text-emerald-950">{visual.takeaway}</p>
        </div>
      </div>
    </div>
  );
}

const TheoremVisualizer = memo(TheoremVisualizerComponent);

export default TheoremVisualizer;
