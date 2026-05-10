import { memo } from "react";
import { motion } from "framer-motion";
import { getBusPath, processorBlocks, processorMotion } from "../../lib/microprocessor-visualization-utils";

function BusFlowAnimationComponent({ variant, activeStep = 0 }) {
  const path =
    activeStep === 0
      ? getBusPath("memory", "cpu")
      : activeStep === 1
      ? getBusPath("cpu", "alu")
      : getBusPath("cpu", "io");

  return (
    <svg
      viewBox="0 0 360 160"
      role="img"
      aria-label={`${variant} bus flow animation`}
      className="h-64 w-full rounded-2xl border border-slate-200 bg-slate-50"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id={`bus-arrow-${variant}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f766e" />
        </marker>
      </defs>
      <rect x="0" y="0" width="360" height="160" rx="18" fill="#f8fbff" />
      {processorBlocks.map((block) => (
        <g key={block.id}>
          <rect x={block.x} y={block.y} width={block.w} height={block.h} rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <text x={block.x + block.w / 2} y={block.y + block.h / 2 + 4} textAnchor="middle" className="fill-slate-900 text-[12px] font-black">
            {block.label}
          </text>
        </g>
      ))}
      <line x1="30" y1="128" x2="330" y2="128" stroke="#f97316" strokeWidth="3" />
      <text x="180" y="146" textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">System bus: address, data, and control</text>
      <motion.path d={path} fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" markerEnd={`url(#bus-arrow-${variant})`} strokeDasharray="10 8" animate={{ strokeDashoffset: [24, 0] }} transition={processorMotion.bus} />
      <motion.circle cx={activeStep === 2 ? 242 : activeStep === 1 ? 180 : 118} cy={activeStep === 1 ? 102 : 64} r="6" fill="#2563eb" animate={{ scale: [0.8, 1.25, 0.8] }} transition={processorMotion.pulse} />
    </svg>
  );
}

const BusFlowAnimation = memo(BusFlowAnimationComponent);

export default BusFlowAnimation;
