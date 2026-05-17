import { memo } from "react";
import { motion } from "framer-motion";
import {
  embeddedBlockPalette,
  embeddedFlowMotion,
  isBlockActive,
} from "../../lib/embedded-visualization-utils";
import EmbeddedAnimationWrapper from "./EmbeddedAnimationWrapper";

function HardwareBlock({ label, index, activeStep }) {
  const palette = embeddedBlockPalette[index % embeddedBlockPalette.length];
  const x = 54 + index * 104;
  const active = isBlockActive(index, activeStep);

  return (
    <g>
      <motion.rect
        x={x}
        y={active ? 78 : 84}
        width="88"
        height="58"
        rx="14"
        fill={active ? palette.fill : "#ffffff"}
        stroke={active ? palette.stroke : "#cbd5e1"}
        strokeWidth="2"
        animate={{ y: active ? [78, 72, 78] : 84 }}
        transition={{ ...embeddedFlowMotion.pulse, delay: index * 0.08 }}
      />
      <text x={x + 44} y="111" textAnchor="middle" fill={active ? palette.text : "#334155"} fontSize="11.5" fontWeight="900">
        {label}
      </text>
      {index < 4 ? (
        <motion.path
          d={`M${x + 90} 107 H${x + 104}`}
          stroke={active ? "#154a96" : "#94a3b8"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="8 8"
          animate={{ strokeDashoffset: [24, 0], opacity: active ? [0.45, 1, 0.45] : 0.35 }}
          transition={{ ...embeddedFlowMotion.flow, delay: index * 0.1 }}
        />
      ) : null}
    </g>
  );
}

function HardwareFlowVisualizerComponent({ blocks = [], activeStep = 0, ariaLabel }) {
  const visibleBlocks = blocks.length ? blocks.slice(0, 5) : ["Input", "MCU", "Memory", "Driver", "Output"];

  return (
    <EmbeddedAnimationWrapper ariaLabel={ariaLabel}>
      <svg viewBox="0 0 620 230" className="h-64 w-full" preserveAspectRatio="xMidYMid meet">
        <rect x="28" y="26" width="564" height="178" rx="24" fill="#f8fbff" />
        <text x="310" y="56" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">
          Embedded hardware-software signal path
        </text>
        {visibleBlocks.map((label, index) => (
          <HardwareBlock key={`${label}-${index}`} label={label} index={index} activeStep={activeStep} />
        ))}
        <motion.path
          d="M104 160 C190 194 430 194 516 160"
          fill="none"
          stroke="#16a34a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="7 8"
          animate={{ strokeDashoffset: [30, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={embeddedFlowMotion.flow}
        />
        <text x="310" y="193" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
          feedback keeps the system controlled and exam diagrams readable
        </text>
      </svg>
    </EmbeddedAnimationWrapper>
  );
}

const HardwareFlowVisualizer = memo(HardwareFlowVisualizerComponent);

export default HardwareFlowVisualizer;
