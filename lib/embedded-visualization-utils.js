export const embeddedFlowMotion = {
  pulse: { duration: 1.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
  flow: { duration: 1.4, repeat: Infinity, ease: "linear" },
  step: { duration: 0.35, ease: "easeOut" },
};

export function getActiveIndex(activeStep = 0, length = 1) {
  if (!length) {
    return 0;
  }

  return Math.max(0, Math.min(activeStep, length - 1));
}

export function isBlockActive(index, activeStep) {
  return index <= activeStep + 1;
}

export const embeddedBlockPalette = [
  { fill: "#eff6ff", stroke: "#2563eb", text: "#1e3a8a" },
  { fill: "#ecfdf5", stroke: "#16a34a", text: "#166534" },
  { fill: "#fff7ed", stroke: "#f97316", text: "#9a3412" },
  { fill: "#fef2f2", stroke: "#ef4444", text: "#991b1b" },
  { fill: "#f8fafc", stroke: "#64748b", text: "#0f172a" },
];
