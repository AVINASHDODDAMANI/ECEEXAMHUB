import { memo } from "react";

function StepExplanationComponent({ steps, activeStep, onStepSelect }) {
  return (
    <ol className="grid gap-3 md:grid-cols-2" aria-label="Visualization steps">
      {steps.map(([title, text], index) => {
        const isActive = index === activeStep;

        return (
          <li key={title}>
            <button
              type="button"
              onClick={() => onStepSelect(index)}
              aria-current={isActive ? "step" : undefined}
              className={`h-full w-full rounded-2xl border p-3 text-left transition ${
                isActive
                  ? "border-portal-300 bg-portal-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-portal-200 hover:bg-slate-50"
              }`}
              aria-pressed={isActive}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-black ${
                    isActive ? "bg-portal-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-black text-slate-950">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{text}</p>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

const StepExplanation = memo(StepExplanationComponent);

export default StepExplanation;
