import { memo } from "react";
import { motion } from "framer-motion";
import VLSIAnimationWrapper from "./VLSIAnimationWrapper";

const layerColors = {
  diffusion: "#bbf7d0",
  poly: "#f97316",
  metal: "#93c5fd",
  contact: "#334155",
  oxide: "#fde68a",
};

function FabricationLayers({ activeStep }) {
  const layers = [
    { y: 174, h: 34, label: "silicon wafer", fill: "#e0f2fe" },
    { y: 140, h: 24, label: "oxide", fill: layerColors.oxide },
    { y: 104, h: 24, label: "doped well", fill: "#fecdd3" },
    { y: 68, h: 22, label: "metal/contact", fill: layerColors.metal },
  ];

  return layers.map((layer, index) => (
    <motion.g key={layer.label} animate={{ opacity: activeStep >= Math.min(index, 2) ? 1 : 0.35 }} transition={{ duration: 0.3 }}>
      <rect x={110 + index * 18} y={layer.y} width={400 - index * 36} height={layer.h} rx="8" fill={layer.fill} stroke="#cbd5e1" />
      <text x="310" y={layer.y + layer.h / 2 + 5} textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="900">{layer.label}</text>
    </motion.g>
  ));
}

function LayoutLayers({ activeStep }) {
  return (
    <g>
      <rect x="88" y="64" width="444" height="142" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      <motion.rect x="130" y="126" width="360" height="44" rx="12" fill={layerColors.diffusion} animate={{ opacity: activeStep >= 0 ? 1 : 0.35 }} />
      <motion.rect x="230" y="82" width="28" height="110" rx="8" fill={layerColors.poly} animate={{ opacity: activeStep >= 0 ? 1 : 0.35 }} />
      <motion.rect x="362" y="82" width="28" height="110" rx="8" fill={layerColors.poly} animate={{ opacity: activeStep >= 0 ? 1 : 0.35 }} />
      <motion.path d="M104 102 H516 M104 192 H516" stroke={layerColors.metal} strokeWidth="14" strokeLinecap="round" animate={{ opacity: activeStep >= 1 ? 1 : 0.35 }} />
      {[150, 244, 376, 470].map((x) => (
        <motion.rect key={x} x={x} y="94" width="18" height="18" rx="5" fill={layerColors.contact} animate={{ scale: activeStep >= 1 ? [1, 1.18, 1] : 1 }} transition={{ duration: 1.7, repeat: Infinity }} />
      ))}
      <text x="310" y="232" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="800">green diffusion, orange poly, blue metal, dark contacts</text>
    </g>
  );
}

function ChipLayoutVisualizerComponent({ type = "layout", activeStep = 0 }) {
  const isFabrication = type === "fabrication";

  return (
    <VLSIAnimationWrapper ariaLabel={`${type} chip layout visualization`}>
      <svg viewBox="0 0 620 260" className="h-72 w-full" preserveAspectRatio="xMidYMid meet">
        <rect x="30" y="24" width="560" height="214" rx="22" fill="#f8fbff" />
        {isFabrication ? <FabricationLayers activeStep={activeStep} /> : <LayoutLayers activeStep={activeStep} />}
        <motion.path
          d="M112 44 H508"
          stroke="#154a96"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 10"
          animate={{ strokeDashoffset: [40, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
        <text x="310" y="48" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">
          {isFabrication ? "wafer process sequence" : "layout connectivity"}
        </text>
      </svg>
    </VLSIAnimationWrapper>
  );
}

const ChipLayoutVisualizer = memo(ChipLayoutVisualizerComponent);

export default ChipLayoutVisualizer;
