export const processorMotion = {
  bus: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  pulse: { duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
};

export const processorBlocks = [
  { id: "cpu", label: "CPU", x: 135, y: 35, w: 90, h: 54 },
  { id: "memory", label: "Memory", x: 20, y: 42, w: 82, h: 42 },
  { id: "io", label: "I/O", x: 258, y: 42, w: 82, h: 42 },
  { id: "alu", label: "ALU", x: 150, y: 105, w: 60, h: 32 },
];

export function getBusPath(from = "memory", to = "cpu") {
  const paths = {
    "memory-cpu": "M102 63 H135",
    "cpu-memory": "M135 70 H102",
    "cpu-io": "M225 63 H258",
    "io-cpu": "M258 70 H225",
    "cpu-alu": "M180 89 V105",
    "alu-cpu": "M190 105 V89",
  };

  return paths[`${from}-${to}`] || paths["memory-cpu"];
}

export function getExecutionSteps() {
  return [
    { id: "fetch", label: "Fetch" },
    { id: "decode", label: "Decode" },
    { id: "execute", label: "Execute" },
    { id: "write", label: "Write Back" },
  ];
}
