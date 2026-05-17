import { memo } from "react";
import { motion } from "framer-motion";
import AntennaWaveAnimationWrapper from "./AntennaWaveAnimationWrapper";

function RadiationPatternVisualizerComponent({ type = "radiation-pattern", activeStep = 0 }) {
  const narrowBeam = activeStep >= 1;

  return (
    <AntennaWaveAnimationWrapper ariaLabel={`${type} radiation pattern visualization`}>
      <svg viewBox="0 0 620 270" className="h-72 w-full" preserveAspectRatio="xMidYMid meet">
        <rect x="30" y="24" width="560" height="222" rx="22" fill="#f8fbff" />
        <line x1="310" y1="52" x2="310" y2="220" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="132" y1="136" x2="488" y2="136" stroke="#cbd5e1" strokeWidth="2" />
        {[50, 82, 114].map((r) => (
          <circle key={r} cx="310" cy="136" r={r} fill="none" stroke="#e2e8f0" strokeWidth="2" />
        ))}
        <motion.path
          d={narrowBeam ? "M310 136 C356 78 430 74 504 136 C430 198 356 194 310 136 Z" : "M310 136 C360 46 456 54 510 136 C456 218 360 226 310 136 Z"}
          fill="#dbeafe"
          stroke="#154a96"
          strokeWidth="3"
          animate={{ opacity: [0.72, 1, 0.72], scale: [0.98, 1.02, 0.98] }}
          style={{ transformOrigin: "310px 136px" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d={narrowBeam ? "M310 136 C264 92 204 98 162 136 C204 174 264 180 310 136 Z" : "M310 136 C260 72 194 82 142 136 C194 190 260 200 310 136 Z"}
          fill="#dcfce7"
          stroke="#16a34a"
          strokeWidth="2"
          animate={{ opacity: [0.42, 0.78, 0.42] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="310" cy="136" r="10" fill="#f97316" />
        <motion.path
          d="M310 136 L442 92"
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ rotate: activeStep === 2 ? [-8, 8, -8] : 0 }}
          style={{ transformOrigin: "310px 136px" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <path d="M404 94 A86 86 0 0 1 404 178" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        <text x="428" y="139" fill="#92400e" fontSize="12" fontWeight="900">beamwidth</text>
        <text x="310" y="35" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">radiation pattern and main lobe</text>
        <text x="310" y="238" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">gain/directivity describe how concentrated this pattern is</text>
      </svg>
    </AntennaWaveAnimationWrapper>
  );
}

const RadiationPatternVisualizer = memo(RadiationPatternVisualizerComponent);

export default RadiationPatternVisualizer;
