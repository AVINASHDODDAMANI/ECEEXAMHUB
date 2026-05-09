import { memo } from "react";
import { motion } from "framer-motion";
import {
  buildConstellationPoints,
  buildEnvelopePath,
  buildSinePath,
  buildStaircasePath,
  pulseTransition,
  visualizationTransition,
} from "../../lib/communication-visualization-utils";

function PlotFrame({ children, xLabel = "time", yLabel = "amplitude", ariaLabel }) {
  return (
    <svg viewBox="0 0 380 170" className="w-full rounded-2xl border border-slate-200 bg-white" role="img" aria-label={ariaLabel}>
      <line x1="36" y1="135" x2="352" y2="135" stroke="#94a3b8" strokeWidth="2" />
      <line x1="36" y1="18" x2="36" y2="135" stroke="#94a3b8" strokeWidth="2" />
      <text x="306" y="158" fill="#475569" fontSize="12" fontWeight="700">{xLabel}</text>
      <text x="12" y="28" fill="#475569" fontSize="12" fontWeight="700">{yLabel}</text>
      <g transform="translate(36 18)">{children}</g>
    </svg>
  );
}

function SpectrumBars({ bars = [], labels = [] }) {
  return (
    <svg viewBox="0 0 380 170" className="w-full rounded-2xl border border-slate-200 bg-white" role="img" aria-label="Spectrum bars">
      <line x1="36" y1="135" x2="352" y2="135" stroke="#94a3b8" strokeWidth="2" />
      <line x1="36" y1="18" x2="36" y2="135" stroke="#94a3b8" strokeWidth="2" />
      <g transform="translate(36 18)">
        {bars.map((value, index) => {
          const spacing = 316 / Math.max(bars.length, 1);
          const x = spacing * index + spacing / 2 - 10;
          const barHeight = value * 108;
          const y = 117 - barHeight;

          return (
            <g key={`${value}-${index}`}>
              <motion.rect
                x={x}
                y={y}
                width="20"
                height={barHeight}
                rx="6"
                fill="#154a96"
                animate={{ height: [barHeight * 0.82, barHeight, barHeight * 0.82], y: [117 - barHeight * 0.82, y, 117 - barHeight * 0.82] }}
                transition={{ ...visualizationTransition, delay: index * 0.12 }}
              />
              {labels[index] ? (
                <text x={x + 10} y="136" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">
                  {labels[index]}
                </text>
              ) : null}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function WaveformAnimatorComponent({ variant, visual }) {
  if (variant === "spectrum") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <PlotFrame ariaLabel="Time domain waveform" xLabel="t" yLabel="x(t)">
          <motion.path
            d={buildSinePath({ width: 316, height: 117, amplitude: 30, cycles: 2.5 })}
            fill="none"
            stroke="#154a96"
            strokeWidth="4"
            animate={{ pathLength: [0.1, 1, 0.1] }}
            transition={visualizationTransition}
          />
        </PlotFrame>
        <SpectrumBars bars={visual.spectrumBars} />
      </div>
    );
  }

  if (variant === "am") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <PlotFrame ariaLabel="Amplitude modulation waveform" xLabel="t" yLabel="AM">
          <motion.path
            d={buildEnvelopePath({ width: 316, height: 117 })}
            fill="none"
            stroke="#154a96"
            strokeWidth="4"
            animate={{ pathLength: [0.1, 1, 0.1] }}
            transition={visualizationTransition}
          />
          <path
            d={buildSinePath({ width: 316, height: 117, amplitude: 26, cycles: 1, samples: 80 })}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="7 6"
          />
        </PlotFrame>
        <SpectrumBars bars={visual.spectrumBars} labels={visual.labels} />
      </div>
    );
  }

  if (variant === "angle") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <PlotFrame ariaLabel="Narrowband FM" xLabel="t" yLabel="NBFM">
          <motion.path
            d={buildSinePath({ width: 316, height: 117, amplitude: 26, cycles: 4.8 })}
            fill="none"
            stroke="#154a96"
            strokeWidth="4"
            animate={{ pathLength: [0.1, 1, 0.1] }}
            transition={visualizationTransition}
          />
        </PlotFrame>
        <PlotFrame ariaLabel="Wideband FM" xLabel="t" yLabel="WBFM">
          <motion.path
            d="M 0 58 C 14 26 26 26 40 58 S 68 90 82 58 S 98 18 116 58 S 142 100 168 58 S 190 12 210 58 S 246 104 270 58 S 294 18 316 58"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4"
            animate={{ pathLength: [0.1, 1, 0.1] }}
            transition={visualizationTransition}
          />
        </PlotFrame>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <PlotFrame ariaLabel="Sampled message and PAM" xLabel="t" yLabel="PAM">
          <motion.path
            d={buildSinePath({ width: 316, height: 117, amplitude: 28, cycles: 1.2 })}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="3"
          />
          {visual.sampleHeights.map((value, index) => {
            const x = 22 + index * 42;
            const y = 117 - value * 90;

            return (
              <motion.g key={`${value}-${index}`} animate={{ opacity: [0.55, 1, 0.55] }} transition={{ ...visualizationTransition, delay: index * 0.18 }}>
                <line x1={x} y1="117" x2={x} y2={y} stroke="#154a96" strokeWidth="4" />
                <circle cx={x} cy={y} r="5" fill="#f59e0b" />
              </motion.g>
            );
          })}
        </PlotFrame>
        <div className="grid gap-3">
          <PlotFrame ariaLabel="Pulse width modulation" xLabel="t" yLabel="PWM">
            {visual.pulseWidths.map((width, index) => {
              const x = index * 58 + 14;
              return (
                <motion.rect
                  key={`w-${width}-${index}`}
                  x={x}
                  y="34"
                  width={width}
                  height="83"
                  rx="4"
                  fill="#154a96"
                  animate={{ opacity: [0.68, 1, 0.68] }}
                  transition={{ ...visualizationTransition, delay: index * 0.15 }}
                />
              );
            })}
          </PlotFrame>
          <PlotFrame ariaLabel="Pulse position modulation" xLabel="t" yLabel="PPM">
            {visual.pulseOffsets.map((offset, index) => {
              const x = index * 58 + 20 + offset;
              return (
                <motion.rect
                  key={`p-${offset}-${index}`}
                  x={x}
                  y="34"
                  width="18"
                  height="83"
                  rx="4"
                  fill="#f59e0b"
                  animate={{ y: [34, 28, 34] }}
                  transition={{ ...pulseTransition, delay: index * 0.15 }}
                />
              );
            })}
          </PlotFrame>
        </div>
      </div>
    );
  }

  if (variant === "digital") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <PlotFrame ariaLabel="Quantization staircase" xLabel="t" yLabel="xq">
          <motion.path
            d={buildStaircasePath(visual.staircase)}
            fill="none"
            stroke="#154a96"
            strokeWidth="4"
            animate={{ pathLength: [0.1, 1, 0.1] }}
            transition={visualizationTransition}
          />
        </PlotFrame>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="grid grid-cols-3 gap-3">
            {visual.bits.map((bit, index) => (
              <motion.div
                key={bit}
                className="rounded-xl border border-portal-100 bg-portal-50 px-3 py-4 text-center font-mono text-sm font-black text-slate-900"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ ...visualizationTransition, delay: index * 0.18 }}
              >
                {bit}
              </motion.div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-slate-800">
            Delta modulation tracks the waveform by sending up/down decisions instead of full-level codes.
          </div>
        </div>
      </div>
    );
  }

  if (variant === "digital-mod") {
    const points = buildConstellationPoints(visual.constellationPoints);

    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="grid gap-2">
            {["ASK: amplitude switches", "FSK: frequency switches", "PSK: phase switches"].map((label, index) => (
              <motion.div
                key={label}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800"
                animate={{ x: [0, 6, 0] }}
                transition={{ ...visualizationTransition, delay: index * 0.2 }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 240 240" className="w-full rounded-2xl border border-slate-200 bg-white p-3" role="img" aria-label="Constellation diagram">
          <line x1="120" y1="24" x2="120" y2="216" stroke="#94a3b8" strokeWidth="2" />
          <line x1="24" y1="120" x2="216" y2="120" stroke="#94a3b8" strokeWidth="2" />
          <text x="204" y="114" fill="#475569" fontSize="12" fontWeight="700">I</text>
          <text x="126" y="36" fill="#475569" fontSize="12" fontWeight="700">Q</text>
          {points.map((point, index) => (
            <motion.circle
              key={point.id}
              cx={120 + point.x}
              cy={120 - point.y}
              r="9"
              fill={index < 4 ? "#154a96" : "#f59e0b"}
              animate={{ scale: [0.84, 1.1, 0.84] }}
              transition={{ ...visualizationTransition, delay: index * 0.14 }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === "noise") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <PlotFrame ariaLabel="Clean and noisy signals" xLabel="t" yLabel="r(t)">
          <path
            d={buildSinePath({ width: 316, height: 117, amplitude: 24, cycles: 2.3 })}
            fill="none"
            stroke="#16a34a"
            strokeWidth="3"
          />
          <motion.path
            d="M 0 57 C 16 18 29 36 46 52 S 74 85 94 60 S 116 22 136 63 S 160 102 184 62 S 210 26 232 54 S 258 110 286 62 S 304 32 316 62"
            fill="none"
            stroke="#dc2626"
            strokeWidth="4"
            animate={{ pathLength: [0.2, 1, 0.2] }}
            transition={visualizationTransition}
          />
        </PlotFrame>
        <div className="grid gap-3">
          {visual.snrBars.map((value, index) => (
            <div key={`${value}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between text-sm font-bold text-slate-800">
                <span>{visual.labels[index]}</span>
                <span>{Math.round(value * 100)}%</span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-slate-100">
                <motion.div
                  className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-portal-600"
                  animate={{ width: [`${Math.max(value * 72, 18)}%`, `${value * 100}%`, `${Math.max(value * 72, 18)}%`] }}
                  transition={{ ...visualizationTransition, delay: index * 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "information") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="grid gap-3">
            {visual.probabilities.map((value, index) => (
              <motion.div
                key={`${value}-${index}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ ...visualizationTransition, delay: index * 0.18 }}
              >
                <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                  <span>Event {index + 1}</span>
                  <span>p = {value}</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-200">
                  <div className="h-3 rounded-full bg-portal-600" style={{ width: `${value * 100}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex h-full flex-col justify-between gap-3">
            {["Less probable -> more surprise", "Average surprise -> entropy", "Bandwidth + SNR -> channel capacity"].map((label, index) => (
              <motion.div
                key={label}
                className="rounded-xl border border-portal-100 bg-portal-50 px-4 py-4 text-sm font-bold text-slate-800"
                animate={{ y: [0, -4, 0] }}
                transition={{ ...visualizationTransition, delay: index * 0.16 }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const WaveformAnimator = memo(WaveformAnimatorComponent);

export default WaveformAnimator;
