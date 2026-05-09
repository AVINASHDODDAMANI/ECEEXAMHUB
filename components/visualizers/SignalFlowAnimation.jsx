import { memo } from "react";
import { motion } from "framer-motion";
import { visualizationTransition } from "../../lib/communication-visualization-utils";

function FlowBlock({ label, sublabel, isActive }) {
  return (
    <div
      className={`min-w-[92px] rounded-2xl border px-3 py-3 text-center shadow-sm transition ${
        isActive ? "border-portal-300 bg-portal-50" : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-sm font-black text-slate-950">{label}</p>
      {sublabel ? <p className="mt-1 text-[11px] font-semibold text-slate-500">{sublabel}</p> : null}
    </div>
  );
}

function Arrow() {
  return <span className="h-0.5 min-w-8 flex-1 bg-portal-300" aria-hidden="true" />;
}

function SignalFlowAnimationComponent({ variant, visual, activeStep }) {
  if (variant === "receiver") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="relative flex items-center gap-2 overflow-x-auto pb-4 pt-6">
          {visual.blocks.map((block, index) => (
            <div key={block.label} className="flex items-center gap-2">
              <FlowBlock label={block.label} sublabel={block.sublabel} isActive={activeStep === Math.min(index, 3)} />
              {index < visual.blocks.length - 1 ? <Arrow /> : null}
            </div>
          ))}
          <motion.span
            className="absolute left-3 top-4 h-3 w-3 rounded-full bg-accent-500 shadow-[0_0_0_6px_rgba(245,158,11,0.18)]"
            animate={{ x: [0, 120, 255, 392, 520], opacity: [0.2, 1, 1, 1, 0.2] }}
            transition={visualizationTransition}
          />
          <div className="absolute left-[242px] top-[78px] flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">
            <span>{visual.sideNode.label}</span>
            <span className="rounded-full bg-portal-100 px-2 py-1 text-[10px] text-portal-700">{visual.sideNode.sublabel}</span>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
            Fixed IF makes sharp filtering and stable amplification easier.
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm leading-6 text-slate-700">
            Detection happens after the signal is cleaned and strengthened.
          </div>
        </div>
      </div>
    );
  }

  if (variant === "propagation") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <svg viewBox="0 0 560 260" className="w-full" role="img" aria-label="Antenna radiation and propagation paths">
          <rect x="0" y="190" width="560" height="70" fill="#e2e8f0" />
          <line x1="120" y1="188" x2="120" y2="86" stroke="#154a96" strokeWidth="8" />
          <line x1="98" y1="188" x2="142" y2="188" stroke="#154a96" strokeWidth="6" />
          <motion.circle
            cx="120"
            cy="86"
            r="44"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="3"
            animate={{ scale: [0.88, 1.18, 0.88], opacity: [0.5, 1, 0.5] }}
            transition={visualizationTransition}
          />
          <motion.path
            d="M120 186 C180 170 235 174 300 188"
            fill="none"
            stroke="#16a34a"
            strokeWidth="4"
            animate={{ pathLength: [0.2, 1, 0.2] }}
            transition={visualizationTransition}
          />
          <motion.path
            d="M120 88 C220 10 330 10 438 88"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4"
            strokeDasharray="10 8"
            animate={{ pathLength: [0.2, 1, 0.2] }}
            transition={{ ...visualizationTransition, delay: 0.35 }}
          />
          <motion.path
            d="M120 88 L456 104"
            fill="none"
            stroke="#154a96"
            strokeWidth="4"
            animate={{ pathLength: [0.2, 1, 0.2] }}
            transition={{ ...visualizationTransition, delay: 0.7 }}
          />
          <text x="290" y="181" fill="#166534" fontWeight="700">Ground wave</text>
          <text x="288" y="32" fill="#b45309" fontWeight="700">Sky wave</text>
          <text x="338" y="92" fill="#154a96" fontWeight="700">Space wave</text>
          <text x="88" y="72" fill="#0f172a" fontWeight="700">Antenna</text>
          <text x="420" y="122" fill="#0f172a" fontWeight="700">Receiver</text>
        </svg>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {visual.labels.map((label) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm font-bold text-slate-700">
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="relative flex items-center gap-2 overflow-x-auto pb-3 pt-6">
        {visual.blocks.map((block, index) => (
          <div key={block.label} className="flex items-center gap-2">
            <FlowBlock label={block.label} sublabel={block.sublabel} isActive={activeStep === Math.min(index, 3)} />
            {index < visual.blocks.length - 1 ? <Arrow /> : null}
          </div>
        ))}
        <motion.span
          className="absolute left-3 top-3 h-3 w-3 rounded-full bg-accent-500 shadow-[0_0_0_6px_rgba(245,158,11,0.18)]"
          animate={{ x: [0, 118, 250, 386, 518], opacity: [0.2, 1, 1, 1, 0.2] }}
          transition={visualizationTransition}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-slate-800">
          {visual.noiseLabel}
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
          {visual.helperText}
        </div>
      </div>
    </div>
  );
}

const SignalFlowAnimation = memo(SignalFlowAnimationComponent);

export default SignalFlowAnimation;
