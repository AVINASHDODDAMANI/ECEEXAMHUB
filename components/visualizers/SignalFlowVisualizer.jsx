import { memo } from "react";
import { motion } from "framer-motion";
import VLSIAnimationWrapper from "./VLSIAnimationWrapper";

const flowLabels = {
  "chip-scaling": ["SSI", "MSI", "LSI", "VLSI"],
  "cmos-logic": ["Vin", "PUN/PDN", "Vout", "Load"],
  "style-comparison": ["Full custom", "Std cell", "Gate array", "FPGA"],
  "signal-flow": ["Inputs", "Logic", "Select", "Output"],
  sequential: ["D input", "Clock edge", "Flip-flop", "Q state"],
  interconnect: ["Driver", "R wire", "C load", "Receiver"],
  "test-flow": ["Pattern", "Scan chain", "Capture", "Compare"],
  "hdl-flow": ["HDL", "Simulate", "Synthesize", "Netlist"],
};

function CmosSwitch({ activeStep }) {
  const outputHigh = activeStep === 0;

  return (
    <g>
      <rect x="66" y="50" width="488" height="158" rx="20" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      <text x="124" y="96" fill="#0f172a" fontSize="13" fontWeight="900">Vin</text>
      <text x="500" y="96" fill="#0f172a" fontSize="13" fontWeight="900">Vout</text>
      <circle cx="144" cy="126" r="18" fill={outputHigh ? "#dbeafe" : "#fee2e2"} stroke={outputHigh ? "#2563eb" : "#ef4444"} strokeWidth="3" />
      <text x="144" y="131" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="900">{outputHigh ? "0" : "1"}</text>
      <motion.rect x="248" y="76" width="124" height="44" rx="12" fill="#fce7f3" stroke="#f472b6" animate={{ opacity: outputHigh ? 1 : 0.35 }} />
      <motion.rect x="248" y="140" width="124" height="44" rx="12" fill="#dcfce7" stroke="#22c55e" animate={{ opacity: outputHigh ? 0.35 : 1 }} />
      <text x="310" y="103" textAnchor="middle" fill="#831843" fontSize="12" fontWeight="900">PMOS pull-up</text>
      <text x="310" y="167" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="900">NMOS pull-down</text>
      <motion.path d={outputHigh ? "M372 98 H464 V126" : "M372 162 H464 V126"} stroke="#154a96" strokeWidth="5" strokeLinecap="round" fill="none" strokeDasharray="10 8" animate={{ strokeDashoffset: [28, 0] }} transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }} />
      <circle cx="496" cy="126" r="18" fill={outputHigh ? "#dcfce7" : "#fee2e2"} stroke={outputHigh ? "#16a34a" : "#ef4444"} strokeWidth="3" />
      <text x="496" y="131" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="900">{outputHigh ? "1" : "0"}</text>
    </g>
  );
}

function FlowBlocks({ type, activeStep }) {
  const labels = flowLabels[type] || flowLabels["signal-flow"];

  return labels.map((label, index) => {
    const x = 52 + index * 136;
    const isActive = index <= activeStep + 1;

    return (
      <g key={label}>
        <motion.rect
          x={x}
          y="92"
          width="112"
          height="58"
          rx="15"
          fill={isActive ? "#eff6ff" : "#ffffff"}
          stroke={isActive ? "#154a96" : "#cbd5e1"}
          strokeWidth="2"
          animate={{ y: isActive ? [92, 86, 92] : 92 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: index * 0.08 }}
        />
        <text x={x + 56} y="126" textAnchor="middle" fill="#0f172a" fontSize="12.5" fontWeight="900">{label}</text>
        {index < labels.length - 1 ? (
          <motion.path
            d={`M${x + 114} 121 H${x + 134}`}
            stroke="#f59e0b"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="8 8"
            animate={{ strokeDashoffset: [24, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.3, repeat: Infinity, delay: index * 0.12 }}
          />
        ) : null}
      </g>
    );
  });
}

function SignalFlowVisualizerComponent({ type = "signal-flow", activeStep = 0 }) {
  return (
    <VLSIAnimationWrapper ariaLabel={`${type} VLSI signal flow visualization`}>
      <svg viewBox="0 0 620 260" className="h-72 w-full" preserveAspectRatio="xMidYMid meet">
        <rect x="30" y="24" width="560" height="214" rx="22" fill="#f8fbff" />
        {type === "cmos-logic" ? <CmosSwitch activeStep={activeStep} /> : <FlowBlocks type={type} activeStep={activeStep} />}
        <text x="310" y="214" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
          {type === "interconnect" ? "edge delay grows as wire RC increases" : "follow the active concept path from left to right"}
        </text>
      </svg>
    </VLSIAnimationWrapper>
  );
}

const SignalFlowVisualizer = memo(SignalFlowVisualizerComponent);

export default SignalFlowVisualizer;
