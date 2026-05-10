import { memo } from "react";
import { motion } from "framer-motion";

const transition = { duration: 2.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" };

function Axis({ xLabel = "n", yLabel = "x[n]" }) {
  return (
    <>
      <line x1="36" y1="132" x2="348" y2="132" stroke="#94a3b8" strokeWidth="2" />
      <line x1="36" y1="22" x2="36" y2="132" stroke="#94a3b8" strokeWidth="2" />
      <text x="322" y="154" fill="#475569" fontSize="12" fontWeight="800">{xLabel}</text>
      <text x="10" y="30" fill="#475569" fontSize="12" fontWeight="800">{yLabel}</text>
    </>
  );
}

function SinePath({ stroke = "#154a96", opacity = 1 }) {
  return (
    <motion.path
      d="M44 82 C72 28 98 28 126 82 S180 136 208 82 S262 28 290 82 S330 132 346 106"
      fill="none"
      stroke={stroke}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={opacity}
      animate={{ pathLength: [0.25, 1, 0.25] }}
      transition={transition}
    />
  );
}

function Samples({ color = "#f59e0b", activeStep = 0 }) {
  const points = [
    [58, 58],
    [88, 34],
    [118, 68],
    [148, 110],
    [178, 126],
    [208, 82],
    [238, 38],
    [268, 42],
    [298, 86],
    [328, 124],
  ];

  return points.map(([x, y], index) => (
    <motion.g
      key={`${x}-${y}`}
      animate={{ opacity: activeStep >= 1 ? [0.7, 1, 0.7] : 0.35 }}
      transition={{ ...transition, delay: index * 0.06 }}
    >
      <line x1={x} y1="132" x2={x} y2={y} stroke={color} strokeWidth="2.5" />
      <circle cx={x} cy={y} r="4.5" fill={color} />
    </motion.g>
  ));
}

function SequenceStems({ activeStep = 0 }) {
  const values = [0, 1, 0, 0.72, 0.42, 0.18, 0.08];
  return values.map((value, index) => {
    const x = 66 + index * 38;
    const y = 132 - value * 88;
    return (
      <g key={index}>
        <line x1={x} y1="132" x2={x} y2={y} stroke={index <= activeStep + 1 ? "#154a96" : "#cbd5e1"} strokeWidth="4" />
        <motion.circle
          cx={x}
          cy={y}
          r={index === activeStep ? 7 : 5}
          fill={index <= activeStep + 1 ? "#f59e0b" : "#94a3b8"}
          animate={{ r: index === activeStep ? [5, 8, 5] : 5 }}
          transition={transition}
        />
      </g>
    );
  });
}

function SignalAnimationComponent({ type = "flow", activeStep = 0 }) {
  if (type === "sequence") {
    return (
      <svg viewBox="0 0 380 170" className="w-full rounded-2xl border border-slate-200 bg-white" role="img" aria-label="Discrete sequence stems">
        <Axis />
        <SequenceStems activeStep={activeStep} />
        <text x="58" y="32" fill="#154a96" fontSize="13" fontWeight="900">impulse</text>
        <text x="194" y="54" fill="#f59e0b" fontSize="13" fontWeight="900">decay / stability</text>
      </svg>
    );
  }

  if (type === "sampling") {
    return (
      <svg viewBox="0 0 380 170" className="w-full rounded-2xl border border-slate-200 bg-white" role="img" aria-label="Sampling waveform">
        <Axis xLabel="t" yLabel="x(t)" />
        <SinePath stroke="#cbd5e1" opacity={0.9} />
        <Samples activeStep={activeStep} />
        <motion.path
          d={activeStep === 1 ? "M44 82 C86 40 118 62 148 110 S214 96 238 38 S300 78 346 106" : "M44 82 C72 28 98 28 126 82 S180 136 208 82 S262 28 290 82 S330 132 346 106"}
          fill="none"
          stroke="#154a96"
          strokeWidth="3"
          strokeDasharray="7 7"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={transition}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 380 170" className="w-full rounded-2xl border border-slate-200 bg-white" role="img" aria-label="Analog to digital signal flow">
      <Axis xLabel="time" yLabel="signal" />
      <SinePath />
      <Samples activeStep={activeStep} />
    </svg>
  );
}

const SignalAnimation = memo(SignalAnimationComponent);

export default SignalAnimation;
