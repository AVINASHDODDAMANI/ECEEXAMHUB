import { memo } from "react";
import { motion } from "framer-motion";
import AntennaWaveAnimationWrapper from "./AntennaWaveAnimationWrapper";

const labelsByType = {
  "tx-rx-flow": ["Transmitter", "Antenna", "EM wave", "Receiver"],
  dipole: ["Feed", "Current max", "Radiation", "Pattern"],
  array: ["Elements", "Phase", "Add fields", "Steer beam"],
  special: ["Structure", "Aperture", "Focused beam", "Use case"],
  measurement: ["Source", "Mismatch", "VSWR", "Pattern"],
  modern: ["Link", "Beamform", "Scan/MIMO", "Capacity"],
};

function FlowBlocks({ type, activeStep }) {
  const labels = labelsByType[type] || labelsByType["tx-rx-flow"];

  return labels.map((label, index) => {
    const x = 50 + index * 137;
    const isActive = index <= activeStep + 1;

    return (
      <g key={label}>
        <motion.rect
          x={x}
          y="96"
          width="112"
          height="56"
          rx="15"
          fill={isActive ? "#eff6ff" : "#ffffff"}
          stroke={isActive ? "#154a96" : "#cbd5e1"}
          strokeWidth="2"
          animate={{ y: isActive ? [96, 90, 96] : 96 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: index * 0.08 }}
        />
        <text x={x + 56} y="129" textAnchor="middle" fill="#0f172a" fontSize="12.5" fontWeight="900">{label}</text>
        {index < labels.length - 1 ? (
          <motion.path
            d={`M${x + 116} 124 H${x + 134}`}
            stroke="#f97316"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="8 8"
            animate={{ strokeDashoffset: [24, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.25, repeat: Infinity, delay: index * 0.12 }}
          />
        ) : null}
      </g>
    );
  });
}

function DipoleSketch({ activeStep }) {
  return (
    <g>
      <line x1="310" y1="58" x2="310" y2="210" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
      <circle cx="310" cy="136" r="10" fill="#f97316" />
      {[42, 72, 102].map((rx, index) => (
        <motion.ellipse
          key={rx}
          cx="310"
          cy="136"
          rx={rx}
          ry={rx * 0.62}
          fill="none"
          stroke={index % 2 ? "#16a34a" : "#154a96"}
          strokeWidth="2"
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.95, 1.04, 0.95] }}
          transition={{ duration: 2.3, repeat: Infinity, delay: index * 0.18 }}
        />
      ))}
      <motion.path
        d="M310 72 C326 98 326 174 310 200 C294 174 294 98 310 72"
        fill="none"
        stroke="#ef4444"
        strokeWidth="4"
        strokeLinecap="round"
        animate={{ opacity: activeStep === 0 ? [0.55, 1, 0.55] : 0.85 }}
        transition={{ duration: 1.7, repeat: Infinity }}
      />
      <text x="310" y="235" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">half-wave dipole current and radiated field rings</text>
    </g>
  );
}

function AntennaSignalFlowVisualizerComponent({ type = "tx-rx-flow", activeStep = 0 }) {
  const isDipole = type === "dipole";

  return (
    <AntennaWaveAnimationWrapper ariaLabel={`${type} antenna signal flow visualization`}>
      <svg viewBox="0 0 620 270" className="h-72 w-full" preserveAspectRatio="xMidYMid meet">
        <rect x="30" y="24" width="560" height="222" rx="22" fill="#f8fbff" />
        {isDipole ? <DipoleSketch activeStep={activeStep} /> : <FlowBlocks type={type} activeStep={activeStep} />}
        {!isDipole ? (
          <motion.path
            d="M92 188 C194 164 268 214 352 184 C424 158 476 176 528 148"
            fill="none"
            stroke="#16a34a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="10 8"
            animate={{ strokeDashoffset: [36, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        ) : null}
        {!isDipole ? <text x="310" y="222" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">follow the active antenna concept from left to right</text> : null}
      </svg>
    </AntennaWaveAnimationWrapper>
  );
}

const AntennaSignalFlowVisualizer = memo(AntennaSignalFlowVisualizerComponent);

export default AntennaSignalFlowVisualizer;
