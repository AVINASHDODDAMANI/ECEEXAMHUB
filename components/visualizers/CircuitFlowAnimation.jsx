import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const flowTransition = {
  duration: 3.2,
  repeat: Infinity,
  ease: "easeInOut",
};

function CircuitFlowAnimationComponent({ mode = "flow", activeStep = 0, labels = [] }) {
  const reduceMotion = useReducedMotion();
  const pulse = reduceMotion ? {} : { scale: [0.94, 1.06, 0.94], opacity: [0.72, 1, 0.72] };
  const dash = reduceMotion ? {} : { strokeDashoffset: [28, 0] };
  const activeX = 92 + activeStep * 118;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3"
      aria-label={`Circuit flow animation: ${mode}`}
    >
      <svg viewBox="0 0 620 300" role="img" aria-label="Simplified animated electrical circuit visualization" className="h-auto w-full">
        <defs>
          <marker id={`na-arrow-${mode}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#154a96" />
          </marker>
          <filter id={`na-glow-${mode}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="24" y="24" width="572" height="252" rx="24" fill="#f8fbff" stroke="#dbeafe" />
        <path
          d="M92 150 H220 C250 150 250 92 280 92 H432 C470 92 500 122 500 150 C500 178 470 208 432 208 H182 C132 208 92 170 92 150"
          fill="none"
          stroke="#0f172a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          d="M92 150 H220 C250 150 250 92 280 92 H432 C470 92 500 122 500 150 C500 178 470 208 432 208 H182 C132 208 92 170 92 150"
          fill="none"
          stroke="#154a96"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="12 10"
          markerEnd={`url(#na-arrow-${mode})`}
          animate={dash}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />

        <circle cx="92" cy="150" r="34" fill="#eff6ff" stroke="#111827" strokeWidth="4" />
        <text x="82" y="144" fill="#dc2626" fontSize="20" fontWeight="900">+</text>
        <text x="85" y="170" fill="#2563eb" fontSize="20" fontWeight="900">-</text>
        <text x="62" y="111" fill="#154a96" fontSize="13" fontWeight="900">source</text>

        {mode === "norton" || mode === "parallel" ? (
          <>
            <circle cx="354" cy="150" r="36" fill="#ecfdf5" stroke="#111827" strokeWidth="4" />
            <path d="M354 176 V124" stroke="#059669" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#na-arrow-${mode})`} />
            <path d="M430 112 V188" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
            <path d="M416 112 h28M416 188 h28" stroke="#111827" strokeWidth="4" />
            <text x="334" y="220" fill="#047857" fontSize="13" fontWeight="900">parallel equivalent</text>
          </>
        ) : mode === "power" ? (
          <>
            {[70, 112, 158, 116, 84].map((height, index) => (
              <motion.rect
                key={height + index}
                x={286 + index * 34}
                y={210 - height}
                width="22"
                height={height}
                rx="6"
                fill={index === 2 ? "#16a34a" : "#93c5fd"}
                animate={reduceMotion ? {} : { opacity: index === activeStep % 5 ? 1 : 0.55 }}
                transition={{ duration: 0.35 }}
              />
            ))}
            <text x="280" y="232" fill="#14532d" fontSize="13" fontWeight="900">power peaks at match</text>
          </>
        ) : mode === "swap" ? (
          <>
            <motion.circle cx="285" cy="150" r="28" fill="#fef3c7" stroke="#f59e0b" strokeWidth="4" animate={pulse} transition={flowTransition} />
            <motion.circle cx="430" cy="150" r="24" fill="#dcfce7" stroke="#22c55e" strokeWidth="4" animate={pulse} transition={{ ...flowTransition, delay: 0.6 }} />
            <path d="M310 118 C344 82 388 82 420 118" fill="none" stroke="#7c3aed" strokeWidth="4" strokeDasharray="8 7" />
            <text x="304" y="222" fill="#6d28d9" fontSize="13" fontWeight="900">source and response swap</text>
          </>
        ) : mode === "balance" ? (
          <>
            <rect x="278" y="104" width="156" height="92" rx="18" fill="#f0fdf4" stroke="#bbf7d0" />
            <text x="298" y="138" fill="#166534" fontSize="14" fontWeight="900">power in</text>
            <text x="298" y="168" fill="#166534" fontSize="14" fontWeight="900">= power out</text>
            <motion.path d="M270 150 H228 M442 150 H486" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" animate={dash} transition={{ duration: 1.5, repeat: Infinity }} />
          </>
        ) : (
          <>
            <path d="M288 150 h18 l10 -18 l20 36 l20 -36 l20 36 l10 -18 h18" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="326" y="124" fill="#111827" fontSize="14" fontWeight="900">R</text>
            <motion.circle cx={activeX > 510 ? 510 : activeX} cy={activeStep % 2 ? 208 : 150} r="9" fill="#154a96" filter={`url(#na-glow-${mode})`} animate={pulse} transition={flowTransition} />
          </>
        )}

        <g>
          {labels.slice(0, 4).map((label, index) => (
            <g key={label} transform={`translate(${68 + index * 132} 254)`}>
              <rect width="118" height="28" rx="9" fill={index === activeStep % 4 ? "#dbeafe" : "#ffffff"} stroke="#bfdbfe" />
              <text x="12" y="18" fill="#0f172a" fontSize="11" fontWeight="900">{label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

const CircuitFlowAnimation = memo(CircuitFlowAnimationComponent);

export default CircuitFlowAnimation;
