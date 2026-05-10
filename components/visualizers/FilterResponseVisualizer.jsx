import { memo } from "react";
import { motion } from "framer-motion";

const transition = { duration: 2.3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" };

function FilterResponseVisualizerComponent({ type = "filter", activeStep = 0 }) {
  const isDesign = type === "filter-design";
  const path = isDesign
    ? activeStep === 1
      ? "M44 134 C84 132 112 128 144 126 C176 124 206 42 238 42 C270 42 302 124 342 128"
      : "M44 132 C94 130 128 44 178 44 C218 44 252 130 342 132"
    : "M44 76 C78 42 108 128 142 82 S206 34 238 86 S302 132 342 74";

  return (
    <svg viewBox="0 0 380 180" className="w-full rounded-2xl border border-slate-200 bg-white" role="img" aria-label="Digital filter response">
      <line x1="38" y1="142" x2="350" y2="142" stroke="#94a3b8" strokeWidth="2" />
      <line x1="38" y1="24" x2="38" y2="142" stroke="#94a3b8" strokeWidth="2" />
      <text x="302" y="164" fill="#475569" fontSize="12" fontWeight="800">{isDesign ? "frequency" : "time"}</text>
      <text x="10" y="34" fill="#475569" fontSize="12" fontWeight="800">{isDesign ? "|H|" : "x/y"}</text>

      {isDesign ? (
        <>
          <rect x="54" y="36" width="104" height="106" rx="14" fill="#dcfce7" opacity="0.55" />
          <rect x="238" y="36" width="96" height="106" rx="14" fill="#fee2e2" opacity="0.55" />
          <text x="78" y="58" fill="#166534" fontSize="12" fontWeight="900">passband</text>
          <text x="260" y="58" fill="#991b1b" fontSize="12" fontWeight="900">stopband</text>
          <line x1="188" y1="32" x2="188" y2="142" stroke="#f59e0b" strokeWidth="3" strokeDasharray="7 7" />
          <text x="176" y="28" fill="#f59e0b" fontSize="12" fontWeight="900">fc</text>
        </>
      ) : (
        <>
          <motion.path
            d="M44 72 C72 28 96 128 122 82 S174 34 202 86 S254 132 282 76 S326 32 342 92"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="3"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={transition}
          />
          <text x="52" y="42" fill="#64748b" fontSize="12" fontWeight="900">noisy input</text>
        </>
      )}

      <motion.path
        d={path}
        fill="none"
        stroke="#154a96"
        strokeWidth="4"
        strokeLinecap="round"
        animate={{ pathLength: [0.25, 1, 0.25] }}
        transition={transition}
      />

      {!isDesign ? (
        <text x="248" y="126" fill="#154a96" fontSize="12" fontWeight="900">filtered output</text>
      ) : null}
    </svg>
  );
}

const FilterResponseVisualizer = memo(FilterResponseVisualizerComponent);

export default FilterResponseVisualizer;
