import { memo } from "react";

function VisualizationInsightPanelComponent({
  stepTitle,
  stepText,
  subtitle,
  takeaway,
}) {
  return (
    <div className="grid gap-3" aria-label="Visualization teaching notes">
      <article className="rounded-2xl border border-portal-200 bg-portal-50 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-portal-700">
          Current step
        </p>
        <h4 className="mt-2 text-base font-black text-slate-950">{stepTitle}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-700">{stepText}</p>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
          Beginner intuition
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{subtitle}</p>
      </article>

      <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-emerald-800">
          Exam lens
        </p>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-800">{takeaway}</p>
      </article>
    </div>
  );
}

const VisualizationInsightPanel = memo(VisualizationInsightPanelComponent);

export default VisualizationInsightPanel;
