import { memo } from "react";
import { motion } from "framer-motion";
import { buildVectorGrid, electromagneticMotion } from "../../lib/electromagnetic-visualization-utils";

function VectorFieldRendererComponent({ variant, activeStep = 0 }) {
  const vectors = buildVectorGrid();
  const isCurl = variant === "vector-calculus" && activeStep === 2;

  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Vector field animation"
      className="h-64 w-full rounded-2xl border border-slate-200 bg-slate-50"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id="em-vector-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
        </marker>
      </defs>
      <rect x="0" y="0" width="100" height="100" rx="8" fill="#f8fbff" />
      <motion.circle
        cx="50"
        cy="50"
        r="9"
        fill="#dbeafe"
        stroke="#2563eb"
        strokeWidth="1.5"
        animate={{ scale: activeStep === 1 ? [1, 1.25, 1] : 1 }}
        transition={electromagneticMotion.pulse}
      />
      {vectors.map((vector) => (
        <motion.line
          key={vector.id}
          x1={vector.x - 4}
          y1={vector.y}
          x2={vector.x + 4}
          y2={vector.y}
          stroke="#2563eb"
          strokeWidth="1.8"
          markerEnd="url(#em-vector-arrow)"
          initial={false}
          animate={{
            rotate: isCurl ? vector.angle + 120 : activeStep === 0 ? -28 : vector.angle,
            opacity: activeStep === 1 ? [0.55, 1, 0.55] : 0.9,
          }}
          transition={electromagneticMotion.field}
          style={{ transformOrigin: `${vector.x}px ${vector.y}px` }}
        />
      ))}
      <text x="50" y="88" textAnchor="middle" className="fill-slate-700 text-[5px] font-bold">
        {activeStep === 0 ? "Gradient direction" : activeStep === 1 ? "Divergence expansion" : "Curl rotation"}
      </text>
    </svg>
  );
}

const VectorFieldRenderer = memo(VectorFieldRendererComponent);

export default VectorFieldRenderer;
