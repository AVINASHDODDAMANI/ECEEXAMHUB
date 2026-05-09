import { motion } from "framer-motion";
import { controlSystemVisualizationData } from "../data/control-system-visualization-data";

const dotTransition = { duration: 3.2, repeat: Infinity, ease: "easeInOut" };

function VisualCard({ children, title, subtitle, ariaLabel }) {
  return (
    <div
      className="mt-5 overflow-hidden rounded-2xl border border-portal-100 bg-gradient-to-br from-white via-portal-50 to-white shadow-sm"
      role="img"
      aria-label={ariaLabel}
    >
      <div className="border-b border-portal-100 px-4 py-4 sm:px-5">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-portal-700">Animated concept visual</p>
        <h3 className="mt-1 text-lg font-black tracking-tight text-slate-950 sm:text-xl">{title}</h3>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-700">{subtitle}</p>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function StepExplanation({ steps }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {steps.map(([title, text], index) => (
        <li key={title} className="rounded-xl border border-slate-200 bg-white/85 p-3">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-portal-600 text-xs font-black text-white">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-black text-slate-950">{title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">{text}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function VariableLabels({ variables }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {variables.map(([symbol, meaning]) => (
        <div key={symbol} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/85 px-3 py-2">
          <span className="rounded-lg bg-slate-950 px-2 py-1 font-mono text-xs font-black text-white">{symbol}</span>
          <span className="text-sm leading-5 text-slate-700">{meaning}</span>
        </div>
      ))}
    </div>
  );
}

function SignalDot({ className = "", delay = 0, animate }) {
  return (
    <motion.span
      className={`absolute h-3 w-3 rounded-full bg-accent-500 shadow-[0_0_0_6px_rgba(245,158,11,0.18)] ${className}`}
      animate={animate}
      transition={{ ...dotTransition, delay }}
    />
  );
}

function Arrow({ className = "" }) {
  return <span className={`h-0.5 min-w-8 flex-1 bg-portal-300 ${className}`} />;
}

function Block({ label, sublabel }) {
  return (
    <div className="min-w-24 rounded-xl border border-portal-200 bg-white px-3 py-3 text-center shadow-sm">
      <p className="text-sm font-black text-slate-950">{label}</p>
      {sublabel ? <p className="mt-1 text-xs font-semibold text-slate-500">{sublabel}</p> : null}
    </div>
  );
}

function FeedbackVisual() {
  return (
    <div className="relative min-h-[250px] rounded-2xl border border-slate-200 bg-white p-4">
      <div className="relative flex items-center gap-2 overflow-x-auto pb-4 pt-6">
        <Block label="r(t)" sublabel="Input" />
        <Arrow />
        <Block label="Σ" sublabel="e=r-c" />
        <Arrow />
        <Block label="Controller" sublabel="Gc(s)" />
        <Arrow />
        <Block label="Plant" sublabel="G(s)" />
        <Arrow />
        <Block label="c(t)" sublabel="Output" />
        <SignalDot className="left-5 top-2" animate={{ x: [0, 120, 240, 360, 480], opacity: [0.2, 1, 1, 1, 0.2] }} />
      </div>
      <div className="mx-auto mt-2 flex max-w-[620px] items-center justify-center gap-2 rounded-xl border border-dashed border-portal-300 bg-portal-50 px-3 py-3 text-xs font-bold text-portal-800">
        <span>Feedback H(s)</span>
        <motion.span animate={{ x: [80, 0, -80, 0, 80] }} transition={dotTransition} className="h-2 w-2 rounded-full bg-portal-600" />
        <span>measures output and returns correction information</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <b className="text-slate-950">Open-loop:</b> command goes forward only.
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-slate-700">
          <b className="text-slate-950">Closed-loop:</b> output returns to reduce error.
        </div>
      </div>
    </div>
  );
}

function ModelingVisual() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <svg viewBox="0 0 520 230" className="min-h-[220px] w-full" aria-hidden="true">
          <line x1="30" y1="185" x2="490" y2="185" stroke="#cbd5e1" strokeWidth="4" />
          <motion.rect x="195" y="82" width="104" height="72" rx="12" fill="#154a96" animate={{ x: [195, 225, 185, 205, 195] }} transition={dotTransition} />
          <text x="247" y="123" textAnchor="middle" fill="white" fontWeight="800">M</text>
          <path d="M45 118 h40 l14 -24 l28 48 l28 -48 l28 48 l28 -48 l28 48 l14 -24 h38" fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinejoin="round" />
          <text x="135" y="70" textAnchor="middle" fill="#0f172a" fontWeight="700">Spring K</text>
          <line x1="300" y1="118" x2="430" y2="118" stroke="#64748b" strokeWidth="5" />
          <line x1="350" y1="88" x2="350" y2="148" stroke="#64748b" strokeWidth="5" />
          <text x="382" y="78" textAnchor="middle" fill="#0f172a" fontWeight="700">Damper B</text>
          <motion.path d="M120 36 C185 18 275 18 350 36" fill="none" stroke="#154a96" strokeWidth="3" strokeDasharray="8 8" animate={{ pathLength: [0.15, 1, 0.15] }} transition={dotTransition} />
          <text x="238" y="28" textAnchor="middle" fill="#154a96" fontWeight="800">F(t) {"->"} x(t)</text>
        </svg>
        <div className="grid content-center gap-3">
          {["Physical system", "Differential equation", "Laplace transform", "Transfer function"].map((item, index) => (
            <motion.div
              key={item}
              className="rounded-xl border border-portal-100 bg-portal-50 px-4 py-3 text-sm font-black text-slate-800"
              animate={{ opacity: [0.62, 1, 0.62] }}
              transition={{ ...dotTransition, delay: index * 0.35 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlockVisual() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="relative flex min-h-[210px] items-center gap-2 overflow-x-auto">
        <Block label="R(s)" />
        <Arrow />
        <Block label="Σ" sublabel="+ -" />
        <Arrow />
        <Block label="G1" />
        <Arrow />
        <Block label="G2" />
        <Arrow />
        <Block label="C(s)" />
        <SignalDot className="left-4 top-20" animate={{ x: [0, 110, 220, 330, 440], opacity: [0.25, 1, 1, 1, 0.25] }} />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {["Series: G1G2", "Feedback: G/(1+GH)", "Mason: ΣPkΔk / Δ"].map((label) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-sm font-black text-slate-800">{label}</div>
        ))}
      </div>
    </div>
  );
}

function PlotFrame({ children, xLabel = "time", yLabel = "output" }) {
  return (
    <svg viewBox="0 0 520 260" className="min-h-[230px] w-full rounded-2xl border border-slate-200 bg-white" aria-hidden="true">
      <line x1="62" y1="210" x2="480" y2="210" stroke="#94a3b8" strokeWidth="2" />
      <line x1="62" y1="30" x2="62" y2="210" stroke="#94a3b8" strokeWidth="2" />
      <text x="470" y="235" fill="#475569" fontSize="13" fontWeight="700">{xLabel}</text>
      <text x="16" y="42" fill="#475569" fontSize="13" fontWeight="700">{yLabel}</text>
      {children}
    </svg>
  );
}

function TimeVisual() {
  return (
    <PlotFrame>
      <line x1="62" y1="100" x2="480" y2="100" stroke="#dbeafe" strokeWidth="24" />
      <line x1="62" y1="90" x2="480" y2="90" stroke="#bfdbfe" strokeDasharray="6 8" />
      <line x1="62" y1="110" x2="480" y2="110" stroke="#bfdbfe" strokeDasharray="6 8" />
      <motion.path d="M62 210 C95 188 116 126 150 103 C190 76 214 48 250 72 C284 96 294 112 340 101 C390 92 420 99 480 100" fill="none" stroke="#154a96" strokeWidth="5" strokeLinecap="round" animate={{ pathLength: [0, 1] }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
      <text x="139" y="132" fill="#0f172a" fontWeight="800">Tr</text>
      <text x="238" y="58" fill="#0f172a" fontWeight="800">Tp / Mp</text>
      <text x="386" y="133" fill="#0f172a" fontWeight="800">Ts</text>
    </PlotFrame>
  );
}

function StabilityVisual() {
  return (
    <PlotFrame xLabel="σ" yLabel="jω">
      <rect x="62" y="30" width="209" height="180" fill="#dcfce7" opacity="0.75" />
      <rect x="271" y="30" width="209" height="180" fill="#fee2e2" opacity="0.85" />
      <line x1="271" y1="30" x2="271" y2="210" stroke="#0f172a" strokeWidth="3" />
      {[[160, 82], [206, 146], [271, 78], [370, 132]].map(([cx, cy], index) => (
        <motion.g key={`${cx}-${cy}`} animate={{ scale: [0.85, 1.12, 0.85] }} transition={{ ...dotTransition, delay: index * 0.28 }} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <line x1={cx - 8} y1={cy - 8} x2={cx + 8} y2={cy + 8} stroke="#154a96" strokeWidth="4" />
          <line x1={cx + 8} y1={cy - 8} x2={cx - 8} y2={cy + 8} stroke="#154a96" strokeWidth="4" />
        </motion.g>
      ))}
      <text x="138" y="48" fill="#166534" fontWeight="800">Stable</text>
      <text x="285" y="48" fill="#92400e" fontWeight="800">Marginal</text>
      <text x="360" y="48" fill="#991b1b" fontWeight="800">Unstable</text>
    </PlotFrame>
  );
}

function RootVisual() {
  return (
    <PlotFrame xLabel="real axis" yLabel="imag axis">
      <path d="M122 148 C190 110 226 90 270 105 C318 123 350 158 430 86" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="8 8" />
      <path d="M122 148 C190 188 226 206 270 190 C318 173 350 138 430 190" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="8 8" />
      <text x="116" y="154" fill="#0f172a" fontSize="28" fontWeight="800">×</text>
      <text x="186" y="154" fill="#0f172a" fontSize="28" fontWeight="800">×</text>
      <text x="427" y="92" fill="#0f172a" fontSize="24" fontWeight="800">○</text>
      <motion.circle cx="0" cy="0" r="8" fill="#154a96" animate={{ offsetDistance: ["0%", "100%"] }} transition={dotTransition} style={{ offsetPath: "path('M122 148 C190 110 226 90 270 105 C318 123 350 158 430 86')" }} />
      <motion.circle cx="0" cy="0" r="8" fill="#154a96" animate={{ offsetDistance: ["0%", "100%"] }} transition={{ ...dotTransition, delay: 0.4 }} style={{ offsetPath: "path('M122 148 C190 188 226 206 270 190 C318 173 350 138 430 190')" }} />
      <text x="246" y="118" fill="#154a96" fontWeight="800">breakaway</text>
    </PlotFrame>
  );
}

function FrequencyVisual() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <PlotFrame xLabel="t" yLabel="sin">
        <motion.path d="M62 122 C100 62 136 62 174 122 S248 182 286 122 S360 62 398 122 S442 182 480 122" fill="none" stroke="#154a96" strokeWidth="4" animate={{ pathLength: [0.1, 1, 0.1] }} transition={dotTransition} />
        <path d="M62 146 C100 105 136 105 174 146 S248 187 286 146 S360 105 398 146 S442 187 480 146" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="8 8" />
      </PlotFrame>
      <PlotFrame xLabel="log ω" yLabel="dB">
        <motion.path d="M70 62 L180 62 L280 122 L470 184" fill="none" stroke="#154a96" strokeWidth="5" animate={{ pathLength: [0, 1] }} transition={dotTransition} />
        <path d="M70 180 C155 172 220 132 285 105 C360 74 420 86 470 128" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="7 7" />
        <text x="84" y="82" fill="#0f172a" fontWeight="800">Bode</text>
        <text x="356" y="112" fill="#0f172a" fontWeight="800">Nyquist idea</text>
      </PlotFrame>
    </div>
  );
}

function ControllersVisual() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ["P", "fast push", "h-20"],
          ["I", "zero error", "h-28"],
          ["D", "damping", "h-16"],
          ["PID", "balanced", "h-24"],
        ].map(([label, text, height], index) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-black text-slate-950">{label}</p>
            <div className="mt-3 flex h-32 items-end rounded-lg bg-white p-2">
              <motion.div className={`w-full rounded-md bg-portal-600 ${height}`} animate={{ height: ["25%", "78%", "48%", "65%"] }} transition={{ ...dotTransition, delay: index * 0.25 }} />
            </div>
            <p className="mt-2 text-center text-xs font-bold text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StateVisual() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid content-center gap-3">
          {["u", "B", "x", "A", "C", "y"].map((item, index) => (
            <motion.div key={item} className="rounded-xl border border-portal-100 bg-portal-50 px-4 py-3 text-center font-mono text-lg font-black text-slate-900" animate={{ opacity: [0.55, 1, 0.55] }} transition={{ ...dotTransition, delay: index * 0.2 }}>
              {item}
            </motion.div>
          ))}
        </div>
        <div className="flex min-h-[260px] items-center justify-center rounded-xl bg-slate-50 p-4">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} className="grid h-44 w-44 place-items-center rounded-full border-4 border-dashed border-portal-300">
            <div className="rounded-xl bg-white px-4 py-3 text-center shadow-sm">
              <p className="font-mono text-xl font-black text-portal-700">x(t)</p>
              <p className="text-xs font-bold text-slate-500">system memory</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DesignVisual() {
  return (
    <PlotFrame>
      <path d="M62 100 L480 100" stroke="#16a34a" strokeWidth="4" strokeDasharray="8 8" />
      <text x="350" y="88" fill="#166534" fontWeight="800">desired</text>
      <motion.path d="M62 210 C110 186 132 116 178 77 C218 44 248 54 284 92 C318 126 354 112 480 101" fill="none" stroke="#154a96" strokeWidth="5" animate={{ d: ["M62 210 C110 186 132 116 178 77 C218 44 248 54 284 92 C318 126 354 112 480 101", "M62 210 C118 178 160 125 208 106 C270 82 330 98 480 100", "M62 210 C110 186 132 116 178 77 C218 44 248 54 284 92 C318 126 354 112 480 101"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <text x="98" y="58" fill="#0f172a" fontWeight="800">tune Kp, Ki, Kd</text>
    </PlotFrame>
  );
}

const visualMap = {
  feedback: FeedbackVisual,
  modeling: ModelingVisual,
  block: BlockVisual,
  time: TimeVisual,
  stability: StabilityVisual,
  root: RootVisual,
  frequency: FrequencyVisual,
  controllers: ControllersVisual,
  state: StateVisual,
  design: DesignVisual,
};

export default function ControlSystemVisualizer({ slug }) {
  const data = controlSystemVisualizationData[slug];
  if (!data) return null;
  const Visual = visualMap[data.type] || FeedbackVisual;

  return (
    <VisualCard title={data.title} subtitle={data.subtitle} ariaLabel={data.ariaLabel}>
      <div className="grid gap-5">
        <Visual />
        <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
          <StepExplanation steps={data.steps} />
          <div className="grid gap-3">
            <VariableLabels variables={data.variables} />
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-slate-800">
              Exam takeaway: {data.takeaway}
            </div>
          </div>
        </div>
      </div>
    </VisualCard>
  );
}
