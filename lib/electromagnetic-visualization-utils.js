export const electromagneticMotion = {
  field: {
    duration: 2.6,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
  wave: {
    duration: 3.2,
    repeat: Infinity,
    ease: "linear",
  },
  pulse: {
    duration: 1.8,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
};

export function buildFieldLines(count = 8, radius = 34) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (Math.PI * 2 * index) / count;
    return {
      id: `field-${index}`,
      x1: 50 + Math.cos(angle) * 9,
      y1: 50 + Math.sin(angle) * 9,
      x2: 50 + Math.cos(angle) * radius,
      y2: 50 + Math.sin(angle) * radius,
    };
  });
}

export function buildVectorGrid(columns = 5, rows = 4) {
  const xStep = 100 / (columns + 1);
  const yStep = 100 / (rows + 1);

  return Array.from({ length: columns * rows }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    return {
      id: `vector-${column}-${row}`,
      x: xStep * (column + 1),
      y: yStep * (row + 1),
      angle: (column - row) * 10,
    };
  });
}

export function buildWavePath({
  width = 360,
  height = 120,
  amplitude = 24,
  cycles = 2,
  samples = 72,
  phase = 0,
}) {
  const midY = height / 2;
  const points = [];

  for (let index = 0; index <= samples; index += 1) {
    const progress = index / samples;
    const x = progress * width;
    const y = midY - Math.sin(progress * Math.PI * 2 * cycles + phase) * amplitude;
    points.push(`${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  return points.join(" ");
}

export function buildCircularFieldRings(count = 4) {
  return Array.from({ length: count }, (_, index) => ({
    id: `ring-${index}`,
    radius: 12 + index * 9,
  }));
}
