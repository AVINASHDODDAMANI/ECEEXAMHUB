export const visualizationTransition = {
  duration: 3.2,
  repeat: Infinity,
  ease: "easeInOut",
};

export const pulseTransition = {
  duration: 1.8,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

export const cardMotionProps = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.35, ease: "easeOut" },
};

export function buildSinePath({
  width = 360,
  height = 120,
  amplitude = 28,
  cycles = 2,
  phase = 0,
  samples = 48,
}) {
  const midY = height / 2;
  const points = [];

  for (let index = 0; index <= samples; index += 1) {
    const progress = index / samples;
    const x = progress * width;
    const angle = progress * Math.PI * 2 * cycles + phase;
    const y = midY - Math.sin(angle) * amplitude;
    points.push(`${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  return points.join(" ");
}

export function buildEnvelopePath({
  width = 360,
  height = 120,
  carrierCycles = 8,
  messageCycles = 1,
  carrierAmplitude = 18,
  envelopeAmplitude = 18,
  samples = 120,
}) {
  const midY = height / 2;
  const points = [];

  for (let index = 0; index <= samples; index += 1) {
    const progress = index / samples;
    const x = progress * width;
    const envelope = 1 + 0.65 * Math.sin(progress * Math.PI * 2 * messageCycles);
    const y =
      midY -
      envelope *
        Math.sin(progress * Math.PI * 2 * carrierCycles) *
        carrierAmplitude -
      Math.sin(progress * Math.PI * 2 * messageCycles) * envelopeAmplitude;
    points.push(`${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  return points.join(" ");
}

export function buildStaircasePath(levels = [], {
  width = 360,
  height = 120,
} = {}) {
  if (!levels.length) {
    return "";
  }

  const stepWidth = width / levels.length;
  const points = [];

  levels.forEach((level, index) => {
    const x = index * stepWidth;
    const y = height - level * height;

    if (index === 0) {
      points.push(`M ${x.toFixed(2)} ${y.toFixed(2)}`);
    } else {
      points.push(`L ${x.toFixed(2)} ${levels[index - 1] ? (height - levels[index - 1] * height).toFixed(2) : y.toFixed(2)}`);
      points.push(`L ${x.toFixed(2)} ${y.toFixed(2)}`);
    }

    points.push(`L ${(x + stepWidth).toFixed(2)} ${y.toFixed(2)}`);
  });

  return points.join(" ");
}

export function buildConstellationPoints(points = []) {
  return points.map(([x, y], index) => ({
    id: `${x}-${y}-${index}`,
    x,
    y,
  }));
}
