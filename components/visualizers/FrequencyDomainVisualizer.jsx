import { memo } from "react";
import { motion } from "framer-motion";

const transition = { duration: 2.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" };

function Frame({ children, label = "frequency" }) {
  return (
    <svg viewBox="0 0 380 180" className="w-full rounded-2xl border border-slate-200 bg-white" role="img" aria-label={label}>
      <line x1="38" y1="142" x2="350" y2="142" stroke="#94a3b8" strokeWidth="2" />
      <line x1="38" y1="24" x2="38" y2="142" stroke="#94a3b8" strokeWidth="2" />
      <text x="320" y="164" fill="#475569" fontSize="12" fontWeight="800">k</text>
      <text x="10" y="34" fill="#475569" fontSize="12" fontWeight="800">|X|</text>
      {children}
    </svg>
  );
}

function FrequencyBins({ activeStep = 0 }) {
  const bars = [0.25, 0.72, 0.38, 0.9, 0.42, 0.28, 0.58, 0.2];
  return bars.map((value, index) => {
    const x = 58 + index * 34;
    const h = value * 94;
    return (
      <g key={index}>
        <motion.rect
          x={x}
          y={142 - h}
          width="18"
          height={h}
          rx="5"
          fill={index === activeStep + 1 ? "#f59e0b" : "#154a96"}
          animate={{ height: [h * 0.8, h, h * 0.8], y: [142 - h * 0.8, 142 - h, 142 - h * 0.8] }}
          transition={{ ...transition, delay: index * 0.08 }}
        />
        <text x={x + 9} y="158" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="800">{index}</text>
      </g>
    );
  });
}

function FFTButterfly({ activeStep = 0 }) {
  const leftY = [42, 78, 114, 150];
  const rightY = [58, 98, 134, 156];
  return (
    <svg viewBox="0 0 380 180" className="w-full rounded-2xl border border-slate-200 bg-white" role="img" aria-label="FFT butterfly stages">
      {[0, 1, 2].map((stage) => (
        <text key={stage} x={46 + stage * 128} y="26" fill="#475569" fontSize="12" fontWeight="900">
          Stage {stage + 1}
        </text>
      ))}
      {leftY.map((y, index) => (
        <g key={index}>
          <circle cx="42" cy={y} r="6" fill="#154a96" />
          <circle cx="162" cy={rightY[index]} r="6" fill={activeStep >= 1 ? "#f59e0b" : "#94a3b8"} />
          <circle cx="292" cy={leftY[(index + 1) % leftY.length]} r="6" fill={activeStep >= 2 ? "#16a34a" : "#94a3b8"} />
          <motion.path
            d={`M48 ${y} C84 ${y} 112 ${rightY[index]} 156 ${rightY[index]}`}
            fill="none"
            stroke="#154a96"
            strokeWidth="2.5"
            animate={{ pathLength: [0.25, 1, 0.25] }}
            transition={{ ...transition, delay: index * 0.08 }}
          />
          <path d={`M168 ${rightY[index]} C208 ${rightY[index]} 248 ${leftY[(index + 1) % leftY.length]} 286 ${leftY[(index + 1) % leftY.length]}`} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        </g>
      ))}
      <text x="204" y="86" fill="#154a96" fontSize="13" fontWeight="900">W_N</text>
    </svg>
  );
}

function ZPlane({ activeStep = 0 }) {
  return (
    <svg viewBox="0 0 380 180" className="w-full rounded-2xl border border-slate-200 bg-white" role="img" aria-label="Z plane poles zeros and ROC">
      <line x1="50" y1="90" x2="330" y2="90" stroke="#94a3b8" strokeWidth="2" />
      <line x1="190" y1="24" x2="190" y2="158" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="190" cy="90" r="54" fill="none" stroke="#154a96" strokeWidth="3" strokeDasharray="8 7" />
      <motion.circle
        cx="190"
        cy="90"
        r={activeStep >= 2 ? 76 : 42}
        fill="#dbeafe"
        opacity="0.42"
        animate={{ r: activeStep >= 2 ? [68, 78, 68] : [38, 46, 38] }}
        transition={transition}
      />
      {[[142, 90], [230, 68]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <line x1={x - 8} y1={y - 8} x2={x + 8} y2={y + 8} stroke="#dc2626" strokeWidth="4" />
          <line x1={x + 8} y1={y - 8} x2={x - 8} y2={y + 8} stroke="#dc2626" strokeWidth="4" />
        </g>
      ))}
      <circle cx="256" cy="118" r="9" fill="none" stroke="#16a34a" strokeWidth="4" />
      <text x="246" y="42" fill="#154a96" fontSize="13" fontWeight="900">unit circle</text>
      <text x="212" y="154" fill="#475569" fontSize="12" fontWeight="800">Re(z)</text>
    </svg>
  );
}

function FrequencyDomainVisualizerComponent({ type = "frequency", activeStep = 0 }) {
  if (type === "fft") {
    return <FFTButterfly activeStep={activeStep} />;
  }

  if (type === "zplane") {
    return <ZPlane activeStep={activeStep} />;
  }

  return (
    <Frame label="DFT frequency bins">
      <FrequencyBins activeStep={activeStep} />
    </Frame>
  );
}

const FrequencyDomainVisualizer = memo(FrequencyDomainVisualizerComponent);

export default FrequencyDomainVisualizer;
