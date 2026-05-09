import { motion, useReducedMotion } from "framer-motion";

const duration = 7;

const shiftKeyframes = [34, 120, 208, 300, 382];
const outputPoints = [
  { x: 528, y: 250, height: 18 },
  { x: 570, y: 228, height: 40 },
  { x: 612, y: 204, height: 64 },
  { x: 654, y: 184, height: 84 },
  { x: 696, y: 212, height: 56 },
];

const transition = {
  duration,
  times: [0, 0.25, 0.5, 0.75, 1],
  repeat: Infinity,
  repeatType: "loop",
  ease: "easeInOut",
};

function OutputBar({ point, index, reduceMotion }) {
  return (
    <motion.rect
      x={point.x}
      y={point.y}
      width="22"
      height={point.height}
      rx="5"
      fill="#7c3aed"
      initial={false}
      animate={
        reduceMotion
          ? { opacity: 0.85 }
          : {
              opacity: [0.15, 0.15, 0.95, 0.95, 0.55],
              scaleY: [0.18, 0.18, 1, 1, 0.75],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        delay: index * 0.42,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: `${point.x + 11}px 268px` }}
    />
  );
}

export default function ConvolutionVisualizer() {
  const reduceMotion = useReducedMotion();
  const motionTransition = reduceMotion
    ? { duration: 0 }
    : transition;

  return (
    <section
      aria-labelledby="convolution-visualizer-title"
      className="mt-5 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"
    >
      <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
          Interactive visualization
        </p>
        <h3
          id="convolution-visualizer-title"
          className="mt-1 text-xl font-black tracking-tight text-slate-950"
        >
          Convolution as sliding, multiplying, and accumulating
        </h3>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-700">
          Watch the impulse response slide across the input. Wherever the two
          signals overlap, their product contributes area. Those accumulated
          areas become the output samples of \(y(t)\).
        </p>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_280px] sm:p-5">
        <div className="overflow-x-auto">
          <svg
            viewBox="0 0 820 390"
            className="min-w-[680px] rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f8fbff)]"
            role="img"
            aria-label="Animated convolution visualization showing input signal, shifted impulse response, overlap product area, and output building over time"
          >
            <rect width="820" height="390" rx="22" fill="transparent" />

            <text x="36" y="42" fill="#0f172a" fontSize="18" fontWeight="900">
              Input x(t) and sliding h(t)
            </text>
            <text x="522" y="42" fill="#0f172a" fontSize="18" fontWeight="900">
              Output y(t)
            </text>

            <line x1="40" y1="270" x2="450" y2="270" stroke="#94a3b8" strokeWidth="2" />
            <line x1="80" y1="82" x2="80" y2="292" stroke="#94a3b8" strokeWidth="2" />
            <line x1="512" y1="270" x2="770" y2="270" stroke="#94a3b8" strokeWidth="2" />
            <line x1="512" y1="82" x2="512" y2="292" stroke="#94a3b8" strokeWidth="2" />

            <path
              d="M92 270 L148 176 L210 176 L272 270"
              fill="rgba(37,99,235,.18)"
              stroke="#2563eb"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <text x="154" y="160" fill="#1d4ed8" fontSize="14" fontWeight="900">
              x(t)
            </text>

            <motion.rect
              x="184"
              y="176"
              width="86"
              height="94"
              rx="12"
              fill="#22c55e"
              opacity="0.25"
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: 0.32 }
                  : {
                      x: [88, 150, 194, 246, 306],
                      width: [18, 64, 86, 62, 20],
                      opacity: [0.12, 0.34, 0.5, 0.34, 0.12],
                    }
              }
              transition={motionTransition}
            />
            <motion.path
              d="M0 270 L48 210 L104 270"
              fill="rgba(249,115,22,.18)"
              stroke="#f97316"
              strokeWidth="5"
              strokeLinejoin="round"
              initial={false}
              animate={reduceMotion ? { x: 194 } : { x: shiftKeyframes }}
              transition={motionTransition}
              style={{ transformOrigin: "52px 270px" }}
            />
            <motion.text
              x="26"
              y="202"
              fill="#c2410c"
              fontSize="14"
              fontWeight="900"
              initial={false}
              animate={reduceMotion ? { x: 194 } : { x: shiftKeyframes }}
              transition={motionTransition}
            >
              h(t - tau)
            </motion.text>

            <motion.path
              d="M530 266 C560 255 580 224 612 198 C640 176 670 182 696 212 C716 236 740 258 760 266"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="380"
              initial={false}
              animate={reduceMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: [380, 300, 205, 95, 0] }}
              transition={motionTransition}
            />

            {outputPoints.map((point, index) => (
              <OutputBar
                key={`${point.x}-${point.height}`}
                point={point}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}

            <motion.circle
              cx="628"
              cy="198"
              r="7"
              fill="#7c3aed"
              initial={false}
              animate={reduceMotion ? { cx: 696, cy: 212 } : { cx: [532, 570, 612, 654, 696], cy: [262, 228, 204, 184, 212] }}
              transition={motionTransition}
            />

            <line x1="455" y1="182" x2="500" y2="182" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            <path d="M500 182 L488 175 L488 189 Z" fill="#0f172a" />
            <text x="458" y="164" fill="#475569" fontSize="12" fontWeight="800">
              accumulate
            </text>

            <text x="92" y="318" fill="#475569" fontSize="13" fontWeight="700">
              multiply only where x(t) and shifted h(t) overlap
            </text>
            <text x="530" y="318" fill="#475569" fontSize="13" fontWeight="700">
              each accumulated area plots one point of y(t)
            </text>
          </svg>
        </div>

        <div className="grid content-start gap-3">
          {[
            ["1", "Slide", "The orange impulse response h(t - tau) moves across the blue input x(t)."],
            ["2", "Multiply", "The green region marks the overlap where point-by-point multiplication matters."],
            ["3", "Accumulate", "The overlap product is summed as area, giving one value of the output."],
            ["4", "Build y(t)", "Repeating the process for every shift draws the purple output waveform."],
          ].map(([step, title, description]) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-portal-600 text-sm font-black text-white">
                  {step}
                </span>
                <h4 className="text-sm font-black text-slate-950">{title}</h4>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
