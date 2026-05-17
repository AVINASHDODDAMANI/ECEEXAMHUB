import { memo } from "react";
import { motion } from "framer-motion";
import VLSIAnimationWrapper from "./VLSIAnimationWrapper";

function TransistorAnimationComponent({ activeStep = 0 }) {
  const channelOpacity = activeStep === 0 ? 0.25 : activeStep === 1 ? 0.7 : 1;

  return (
    <VLSIAnimationWrapper ariaLabel="MOS transistor animated structure with gate source drain channel and current">
      <svg viewBox="0 0 620 260" className="h-72 w-full" preserveAspectRatio="xMidYMid meet">
        <rect x="30" y="178" width="560" height="42" rx="16" fill="#e0f2fe" stroke="#bae6fd" />
        <text x="310" y="205" textAnchor="middle" fill="#075985" fontSize="13" fontWeight="900">P-type substrate</text>
        <rect x="118" y="128" width="94" height="52" rx="12" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
        <rect x="408" y="128" width="94" height="52" rx="12" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
        <text x="165" y="158" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="900">Source</text>
        <text x="455" y="158" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="900">Drain</text>
        <rect x="248" y="116" width="124" height="14" rx="7" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <rect x="238" y="74" width="144" height="34" rx="10" fill="#fff7ed" stroke="#fb923c" strokeWidth="2" />
        <text x="310" y="96" textAnchor="middle" fill="#9a3412" fontSize="13" fontWeight="900">Gate</text>
        <motion.rect
          x="198"
          y="134"
          width="224"
          height="32"
          rx="16"
          fill="#22c55e"
          animate={{ opacity: channelOpacity, scaleX: [0.72, 1, 0.72] }}
          style={{ transformOrigin: "310px 150px" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <text x="310" y="156" textAnchor="middle" fill="#064e3b" fontSize="12" fontWeight="900">inversion channel</text>
        <motion.path
          d="M220 150 H400"
          fill="none"
          stroke="#154a96"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="12 10"
          animate={{ strokeDashoffset: [32, 0], opacity: activeStep < 2 ? 0.45 : 1 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M310 70 V42"
          stroke="#f97316"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <text x="310" y="34" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">VGS controls channel charge</text>
        <text x="96" y="236" fill="#475569" fontSize="12" fontWeight="800">Cutoff</text>
        <text x="282" y="236" fill="#475569" fontSize="12" fontWeight="800">Linear</text>
        <text x="456" y="236" fill="#475569" fontSize="12" fontWeight="800">Saturation</text>
      </svg>
    </VLSIAnimationWrapper>
  );
}

const TransistorAnimation = memo(TransistorAnimationComponent);

export default TransistorAnimation;
