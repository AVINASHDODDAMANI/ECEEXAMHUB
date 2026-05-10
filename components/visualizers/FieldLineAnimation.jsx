import { memo } from "react";
import { motion } from "framer-motion";
import {
  buildCircularFieldRings,
  buildFieldLines,
  electromagneticMotion,
} from "../../lib/electromagnetic-visualization-utils";

function FieldLineAnimationComponent({ variant, activeStep = 0 }) {
  const fieldLines = buildFieldLines(12, variant === "antenna" ? 42 : 38);
  const rings = buildCircularFieldRings(4);
  const isMagnetic = variant === "magnetostatics";
  const isAntenna = variant === "antenna";
  const isShield = variant === "emc";

  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={`${variant} field line animation`}
      className="h-64 w-full rounded-2xl border border-slate-200 bg-slate-50"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id={`em-field-arrow-${variant}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f766e" />
        </marker>
      </defs>
      <rect x="0" y="0" width="100" height="100" rx="8" fill="#f8fbff" />

      {isMagnetic ? (
        <>
          <motion.circle cx="50" cy="50" r="5" fill="#1d4ed8" animate={{ scale: [1, 1.15, 1] }} transition={electromagneticMotion.pulse} />
          <text x="50" y="52" textAnchor="middle" className="fill-white text-[5px] font-black">I</text>
          {rings.map((ring) => (
            <motion.circle
              key={ring.id}
              cx="50"
              cy="50"
              r={ring.radius}
              fill="none"
              stroke="#0f766e"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={{ rotate: 360 }}
              transition={electromagneticMotion.wave}
              style={{ transformOrigin: "50px 50px" }}
            />
          ))}
        </>
      ) : isShield ? (
        <>
          <motion.path d="M8 25 C30 15 38 45 50 36 C62 27 72 18 92 28" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="6 5" animate={{ pathLength: [0.35, 1, 0.35] }} transition={electromagneticMotion.field} />
          <rect x="44" y="18" width="12" height="64" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <motion.path d="M56 48 C66 50 73 56 86 62" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="5 5" animate={{ opacity: [0.15, 0.55, 0.15] }} transition={electromagneticMotion.field} />
          <text x="50" y="91" textAnchor="middle" className="fill-slate-700 text-[5px] font-bold">Shield reduces coupling path</text>
        </>
      ) : (
        <>
          {isAntenna ? (
            <line x1="50" y1="28" x2="50" y2="72" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <motion.circle cx="50" cy="50" r="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" animate={{ scale: [1, 1.12, 1] }} transition={electromagneticMotion.pulse} />
          )}
          {fieldLines.map((line) => (
            <motion.line
              key={line.id}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={variant === "dielectric" ? "#7c3aed" : "#0f766e"}
              strokeWidth="1.6"
              strokeDasharray={variant === "induction" ? "5 5" : undefined}
              markerEnd={`url(#em-field-arrow-${variant})`}
              animate={{
                opacity: [0.45, 1, 0.45],
                x2: activeStep === 1 ? line.x2 * 0.96 + 2 : line.x2,
                y2: activeStep === 1 ? line.y2 * 0.96 + 2 : line.y2,
              }}
              transition={electromagneticMotion.field}
            />
          ))}
          <text x="50" y="91" textAnchor="middle" className="fill-slate-700 text-[5px] font-bold">
            {isAntenna ? "Radiation expands outward" : variant === "dielectric" ? "Material reshapes electric field" : "Field lines show direction and intensity"}
          </text>
        </>
      )}
    </svg>
  );
}

const FieldLineAnimation = memo(FieldLineAnimationComponent);

export default FieldLineAnimation;
