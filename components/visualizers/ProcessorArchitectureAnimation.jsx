import { memo } from "react";
import { motion } from "framer-motion";
import { processorBlocks, processorMotion } from "../../lib/microprocessor-visualization-utils";

function ProcessorArchitectureAnimationComponent({ variant, activeStep = 0 }) {
  const blocks =
    variant === "8255"
      ? [
          { id: "port-a", label: "Port A", x: 25, y: 35, w: 75, h: 38 },
          { id: "control", label: "Control", x: 135, y: 28, w: 90, h: 52 },
          { id: "port-b", label: "Port B", x: 260, y: 35, w: 75, h: 38 },
          { id: "port-c", label: "Port C", x: 135, y: 102, w: 90, h: 34 },
        ]
      : variant === "8086"
      ? [
          { id: "biu", label: "BIU", x: 48, y: 42, w: 95, h: 54 },
          { id: "queue", label: "Queue", x: 150, y: 30, w: 65, h: 32 },
          { id: "eu", label: "EU", x: 222, y: 42, w: 95, h: 54 },
          { id: "addr", label: "20-bit Address", x: 122, y: 112, w: 116, h: 28 },
        ]
      : processorBlocks;

  return (
    <svg
      viewBox="0 0 360 160"
      role="img"
      aria-label={`${variant} processor architecture animation`}
      className="h-64 w-full rounded-2xl border border-slate-200 bg-slate-50"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id={`processor-arrow-${variant}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
        </marker>
      </defs>
      <rect x="0" y="0" width="360" height="160" rx="18" fill="#f8fbff" />
      {blocks.map((block, index) => (
        <motion.g
          key={block.id}
          animate={{ scale: index === activeStep ? 1.06 : 1 }}
          transition={processorMotion.pulse}
          style={{ transformOrigin: `${block.x + block.w / 2}px ${block.y + block.h / 2}px` }}
        >
          <rect x={block.x} y={block.y} width={block.w} height={block.h} rx="10" fill="#ffffff" stroke="#bfdbfe" strokeWidth="2" />
          <text x={block.x + block.w / 2} y={block.y + block.h / 2 + 4} textAnchor="middle" className="fill-slate-900 text-[12px] font-black">
            {block.label}
          </text>
        </motion.g>
      ))}
      <motion.path d="M102 63 H135 M225 63 H258 M180 89 V105" fill="none" stroke="#2563eb" strokeWidth="3" markerEnd={`url(#processor-arrow-${variant})`} strokeDasharray="8 6" animate={{ strokeDashoffset: [20, 0] }} transition={processorMotion.bus} />
      <text x="180" y="150" textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">
        Registers, buses, and control logic cooperate during execution
      </text>
    </svg>
  );
}

const ProcessorArchitectureAnimation = memo(ProcessorArchitectureAnimationComponent);

export default ProcessorArchitectureAnimation;
