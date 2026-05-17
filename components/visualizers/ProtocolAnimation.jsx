import { memo } from "react";
import { motion } from "framer-motion";
import { embeddedFlowMotion } from "../../lib/embedded-visualization-utils";
import EmbeddedAnimationWrapper from "./EmbeddedAnimationWrapper";

const protocolLabels = {
  protocol: ["TX", "Frame", "Bus", "RX", "ACK"],
  timing: ["Clock", "Count", "Match", "ISR", "PWM"],
  rtos: ["IRQ", "Ready", "Run", "Lock", "Signal"],
  "memory-power": ["Flash", "RAM", "Cache", "Sleep", "Wake"],
};

function ProtocolAnimationComponent({ type = "protocol", activeStep = 0, ariaLabel }) {
  const labels = protocolLabels[type] || protocolLabels.protocol;

  return (
    <EmbeddedAnimationWrapper ariaLabel={ariaLabel}>
      <svg viewBox="0 0 620 240" className="h-64 w-full" preserveAspectRatio="xMidYMid meet">
        <rect x="30" y="28" width="560" height="184" rx="24" fill="#f8fbff" />
        <line x1="86" y1="122" x2="534" y2="122" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
        {labels.map((label, index) => {
          const x = 86 + index * 112;
          const active = index <= activeStep + 1;

          return (
            <g key={label}>
              <motion.circle
                cx={x}
                cy="122"
                r={active ? 24 : 19}
                fill={active ? "#eff6ff" : "#ffffff"}
                stroke={active ? "#154a96" : "#94a3b8"}
                strokeWidth="3"
                animate={{ r: active ? [22, 26, 22] : 19 }}
                transition={{ ...embeddedFlowMotion.pulse, delay: index * 0.08 }}
              />
              <text x={x} y="127" textAnchor="middle" fill="#0f172a" fontSize="11.5" fontWeight="900">
                {label}
              </text>
              {index < labels.length - 1 ? (
                <motion.circle
                  cx={x + 56}
                  cy="122"
                  r="5"
                  fill="#f97316"
                  animate={{ x: [0, 36, 0], opacity: active ? [0.2, 1, 0.2] : 0.15 }}
                  transition={{ duration: 1.3, repeat: Infinity, delay: index * 0.16 }}
                />
              ) : null}
            </g>
          );
        })}
        <motion.path
          d={type === "timing" ? "M88 178 H158 V154 H228 V178 H298 V154 H368 V178 H532" : "M90 178 C170 150 238 196 310 170 C388 142 454 194 532 164"}
          fill="none"
          stroke={type === "timing" ? "#2563eb" : "#16a34a"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 8"
          animate={{ strokeDashoffset: [32, 0] }}
          transition={embeddedFlowMotion.flow}
        />
        <text x="310" y="58" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">
          {type === "timing" ? "timing event flow" : type === "rtos" ? "real-time scheduling flow" : type === "memory-power" ? "memory and power-state flow" : "serial data transfer flow"}
        </text>
      </svg>
    </EmbeddedAnimationWrapper>
  );
}

const ProtocolAnimation = memo(ProtocolAnimationComponent);

export default ProtocolAnimation;
