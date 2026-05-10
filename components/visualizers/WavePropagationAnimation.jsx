import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { buildWavePath, electromagneticMotion } from "../../lib/electromagnetic-visualization-utils";

function WavePropagationAnimationComponent({ variant, activeStep = 0 }) {
  const electricPath = useMemo(() => buildWavePath({ amplitude: 24, cycles: 2.2 }), []);
  const magneticPath = useMemo(() => buildWavePath({ amplitude: 16, cycles: 2.2, phase: Math.PI / 2 }), []);
  const isLine = variant === "transmission-line";
  const isGuide = variant === "waveguide";

  return (
    <svg
      viewBox="0 0 360 150"
      role="img"
      aria-label={`${variant} wave propagation animation`}
      className="h-64 w-full rounded-2xl border border-slate-200 bg-slate-50"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0" y="0" width="360" height="150" rx="18" fill="#f8fbff" />
      {isGuide ? (
        <>
          <rect x="35" y="32" width="290" height="86" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
          {[70, 110, 150, 190, 230, 270].map((x, index) => (
            <motion.path
              key={x}
              d={`M${x} 38 C${x - 20} 60 ${x + 20} 90 ${x} 112`}
              fill="none"
              stroke={index % 2 ? "#7c3aed" : "#0f766e"}
              strokeWidth="2"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ ...electromagneticMotion.field, delay: index * 0.12 }}
            />
          ))}
          <text x="180" y="137" textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">Rectangular waveguide mode pattern</text>
        </>
      ) : isLine ? (
        <>
          <line x1="35" y1="52" x2="325" y2="52" stroke="#334155" strokeWidth="3" />
          <line x1="35" y1="98" x2="325" y2="98" stroke="#334155" strokeWidth="3" />
          <motion.circle cx="70" cy="75" r="7" fill="#2563eb" animate={{ x: [0, 220, 0] }} transition={electromagneticMotion.wave} />
          <motion.circle cx="290" cy="75" r="5" fill="#dc2626" animate={{ x: [0, -170, 0], opacity: [0.15, 0.8, 0.15] }} transition={electromagneticMotion.field} />
          <text x="180" y="132" textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">Blue incident wave, red reflected wave</text>
        </>
      ) : (
        <>
          <motion.path
            d={electricPath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            animate={{ x: [0, 22, 0] }}
            transition={electromagneticMotion.wave}
            transform="translate(0 15)"
          />
          <motion.path
            d={magneticPath}
            fill="none"
            stroke="#16a34a"
            strokeWidth="3"
            strokeDasharray="8 6"
            animate={{ x: [0, 22, 0], opacity: activeStep === 1 ? [0.55, 1, 0.55] : 0.9 }}
            transition={electromagneticMotion.wave}
            transform="translate(0 15)"
          />
          <motion.line
            x1="65"
            y1="125"
            x2="295"
            y2="125"
            stroke="#f97316"
            strokeWidth="3"
            markerEnd="url(#wave-arrow)"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={electromagneticMotion.field}
          />
          <defs>
            <marker id="wave-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
            </marker>
          </defs>
          <text x="70" y="25" className="fill-blue-700 text-[11px] font-bold">E field</text>
          <text x="285" y="25" className="fill-green-700 text-[11px] font-bold">H field</text>
          <text x="180" y="143" textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">Power travels along S = E x H</text>
        </>
      )}
    </svg>
  );
}

const WavePropagationAnimation = memo(WavePropagationAnimationComponent);

export default WavePropagationAnimation;
