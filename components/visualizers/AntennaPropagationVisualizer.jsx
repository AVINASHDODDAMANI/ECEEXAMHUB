import { memo } from "react";
import { motion } from "framer-motion";
import AntennaWaveAnimationWrapper from "./AntennaWaveAnimationWrapper";

function Path({ d, color = "#154a96", delay = 0, active = true }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="10 8"
      animate={{ strokeDashoffset: [36, 0], opacity: active ? [0.45, 1, 0.45] : 0.3 }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay }}
    />
  );
}

function AntennaPropagationVisualizerComponent({ type = "propagation-modes", activeStep = 0 }) {
  const showIonosphere = type === "ionosphere" || type === "propagation-modes";
  const showRadar = type === "space-wave";

  return (
    <AntennaWaveAnimationWrapper ariaLabel={`${type} wave propagation visualization`}>
      <svg viewBox="0 0 620 270" className="h-72 w-full" preserveAspectRatio="xMidYMid meet">
        <rect x="30" y="24" width="560" height="222" rx="22" fill="#f8fbff" />
        <path d="M64 218 C178 194 274 226 394 204 C470 190 532 204 558 194" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
        <text x="96" y="236" fill="#166534" fontSize="12" fontWeight="900">earth / terrain</text>
        {showIonosphere ? (
          <>
            <path d="M72 70 C190 42 388 42 548 70" fill="none" stroke="#a78bfa" strokeWidth="10" strokeLinecap="round" opacity="0.35" />
            <text x="310" y="56" textAnchor="middle" fill="#5b21b6" fontSize="12" fontWeight="900">ionosphere</text>
          </>
        ) : null}
        <g>
          <line x1="116" y1="202" x2="116" y2="138" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <path d="M92 152 L116 136 L140 152" fill="none" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <text x="116" y="128" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="900">Tx</text>
        </g>
        <g>
          <line x1="504" y1="202" x2="504" y2="144" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <path d="M482 156 L504 142 L526 156" fill="none" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <text x="504" y="134" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="900">Rx</text>
        </g>
        {type === "propagation-modes" ? (
          <>
            <Path d="M124 184 C218 210 390 210 498 184" color="#16a34a" active={activeStep === 0 || activeStep === 2} />
            <Path d="M124 150 C232 34 382 34 498 150" color="#7c3aed" delay={0.15} active={activeStep >= 1} />
            <Path d="M132 142 L492 148" color="#154a96" delay={0.3} active={activeStep === 2} />
          </>
        ) : type === "ionosphere" ? (
          <>
            <Path d="M124 184 C210 210 392 210 498 184" color="#16a34a" active={activeStep === 0} />
            <Path d="M124 150 C240 28 374 28 498 150" color="#7c3aed" delay={0.15} active={activeStep >= 1} />
            <text x="388" y="86" fill="#5b21b6" fontSize="12" fontWeight="900">fc / MUF check</text>
          </>
        ) : showRadar ? (
          <>
            <Path d="M132 144 L452 118" color="#154a96" active />
            <Path d="M452 118 L140 162" color="#ef4444" delay={0.22} active={activeStep >= 2} />
            <motion.circle cx="452" cy="118" r="13" fill="#fee2e2" stroke="#ef4444" animate={{ scale: [0.9, 1.18, 0.9] }} transition={{ duration: 1.8, repeat: Infinity }} />
            <text x="452" y="100" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="900">target</text>
          </>
        ) : null}
        <text x="310" y="250" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">
          {showRadar ? "radar uses transmit path plus delayed echo" : "different paths dominate at different frequencies and heights"}
        </text>
      </svg>
    </AntennaWaveAnimationWrapper>
  );
}

const AntennaPropagationVisualizer = memo(AntennaPropagationVisualizerComponent);

export default AntennaPropagationVisualizer;
