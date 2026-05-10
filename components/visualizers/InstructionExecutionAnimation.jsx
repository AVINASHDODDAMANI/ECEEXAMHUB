import { memo } from "react";
import { motion } from "framer-motion";
import { getExecutionSteps, processorMotion } from "../../lib/microprocessor-visualization-utils";

function InstructionExecutionAnimationComponent({ variant, activeStep = 0 }) {
  const steps = getExecutionSteps();

  return (
    <svg
      viewBox="0 0 360 160"
      role="img"
      aria-label={`${variant} instruction execution animation`}
      className="h-64 w-full rounded-2xl border border-slate-200 bg-slate-50"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id={`instruction-arrow-${variant}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c3aed" />
        </marker>
      </defs>
      <rect x="0" y="0" width="360" height="160" rx="18" fill="#f8fbff" />
      {steps.map((step, index) => {
        const x = 28 + index * 83;
        const isActive = index === activeStep || (activeStep > 2 && index === 3);

        return (
          <motion.g key={step.id} animate={{ scale: isActive ? 1.08 : 1 }} transition={processorMotion.pulse} style={{ transformOrigin: `${x + 60}px 70px` }}>
            <rect x={x} y="50" width="68" height="42" rx="10" fill={isActive ? "#f3e8ff" : "#ffffff"} stroke={isActive ? "#7c3aed" : "#cbd5e1"} strokeWidth="2" />
            <text x={x + 34} y="75" textAnchor="middle" className="fill-slate-900 text-[11px] font-black">
              {step.label}
            </text>
          </motion.g>
        );
      })}
      <motion.path d="M96 71 H111 M179 71 H194 M262 71 H277" fill="none" stroke="#7c3aed" strokeWidth="3" markerEnd={`url(#instruction-arrow-${variant})`} strokeDasharray="7 6" animate={{ strokeDashoffset: [18, 0] }} transition={processorMotion.bus} />
      <rect x="78" y="112" width="204" height="28" rx="8" fill="#ffffff" stroke="#bfdbfe" />
      <text x="180" y="130" textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">
        Opcode, operand, addressing mode, flags
      </text>
    </svg>
  );
}

const InstructionExecutionAnimation = memo(InstructionExecutionAnimationComponent);

export default InstructionExecutionAnimation;
