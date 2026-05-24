function OpAmpDifferentiatorDiagram() {
  return (
    <svg viewBox="0 0 520 220" className="h-auto w-full md:w-[78%]" role="img" aria-label="Op-amp differentiator circuit">
      <rect width="520" height="220" rx="16" fill="#f8fbff" />
      <path d="M42 110h72" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="28" y="104" fill="#475569" fontSize="15" fontWeight="700">Vin</text>
      <path d="M116 86v48M130 86v48M130 110h74" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="111" y="73" fill="#475569" fontSize="14" fontWeight="700">C</text>
      <path d="M204 110h58" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M262 66v88l88-44-88-44Z" fill="#ffffff" stroke="#154a96" strokeWidth="4" strokeLinejoin="round" />
      <path d="M252 94h18M252 126h18" stroke="#154a96" strokeWidth="3" strokeLinecap="round" />
      <text x="274" y="98" fill="#154a96" fontSize="18" fontWeight="700">-</text>
      <text x="274" y="132" fill="#154a96" fontSize="18" fontWeight="700">+</text>
      <path d="M204 110v-48h52m114 48h58v-48h-50" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M256 62h22m12 0h30m12 0h46" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M278 54v16M290 54v16M320 54v16M332 54v16" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <text x="307" y="46" fill="#475569" fontSize="14" fontWeight="700">Rf</text>
      <path d="M350 110h96" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="450" y="104" fill="#475569" fontSize="15" fontWeight="700">Vout</text>
      <path d="M262 126h-24v42" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M224 168h28M229 176h18M234 184h8" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SeriesRlcDiagram() {
  return (
    <svg viewBox="0 0 520 220" className="h-auto w-full md:w-[78%]" role="img" aria-label="Series RLC circuit">
      <rect width="520" height="220" rx="16" fill="#f8fbff" />
      <circle cx="74" cy="112" r="28" fill="#ffffff" stroke="#154a96" strokeWidth="4" />
      <path d="M64 112c8-18 14 18 22 0s14 18 22 0" fill="none" stroke="#154a96" strokeWidth="2.5" strokeLinecap="round" />
      <text x="48" y="162" fill="#475569" fontSize="14" fontWeight="700">AC source</text>
      <path d="M102 112h58" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M160 112h16m8-16v32m0-16h18m8-16v32m0-16h18" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="183" y="84" fill="#475569" fontSize="14" fontWeight="700">R</text>
      <path d="M228 112h38" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M266 112c10-22 22 22 32 0s22 22 32 0 22 22 32 0" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="311" y="84" fill="#475569" fontSize="14" fontWeight="700">L</text>
      <path d="M362 112h34" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M396 88v48M414 88v48M414 112h54" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="399" y="75" fill="#475569" fontSize="14" fontWeight="700">C</text>
      <path d="M468 112v56H74V140" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="205" y="188" fill="#154a96" fontSize="15" fontWeight="700">At resonance: XL = XC</text>
    </svg>
  );
}

function Resistor({ x, y, width = 64, label }) {
  const lead = 10;
  const bodyWidth = width - lead * 2;
  const step = bodyWidth / 6;

  return (
    <g>
      <path
        d={`M${x} ${y}h${lead} l${step} -11 l${step} 22 l${step} -22 l${step} 22 l${step} -22 l${step} 22 h${lead}`}
        fill="none"
        stroke="#1e293b"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      {label ? (
        <text x={x + width / 2} y={y - 18} fill="#334155" fontSize="15" fontWeight="800" textAnchor="middle">
          {label}
        </text>
      ) : null}
    </g>
  );
}

function VerticalResistor({ x, y, height = 72, label }) {
  const lead = 10;
  const bodyHeight = height - lead * 2;
  const step = bodyHeight / 6;

  return (
    <g>
      <path
        d={`M${x} ${y}v${lead} l-11 ${step} l22 ${step} l-22 ${step} l22 ${step} l-22 ${step} l22 ${step} v${lead}`}
        fill="none"
        stroke="#1e293b"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      {label ? (
        <text x={x + 25} y={y + height / 2 + 5} fill="#334155" fontSize="15" fontWeight="800">
          {label}
        </text>
      ) : null}
    </g>
  );
}

function SourceArrow({ x, y, label }) {
  return (
    <g>
      <circle cx={x} cy={y} r="25" fill="#ffffff" stroke="#154a96" strokeWidth="3.5" />
      <path d={`M${x} ${y + 13}v-24`} stroke="#154a96" strokeLinecap="round" strokeWidth="3" />
      <path d={`M${x - 7} ${y - 4}l7 -8 7 8`} fill="none" stroke="#154a96" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      {label ? (
        <text x={x + 34} y={y + 5} fill="#334155" fontSize="15" fontWeight="800">
          {label}
        </text>
      ) : null}
    </g>
  );
}

function VoltageSource({ x, y, label }) {
  return (
    <g>
      <circle cx={x} cy={y} r="25" fill="#ffffff" stroke="#154a96" strokeWidth="3.5" />
      <path d={`M${x - 7} ${y - 8}h14M${x} ${y - 15}v14M${x - 7} ${y + 11}h14`} stroke="#154a96" strokeLinecap="round" strokeWidth="2.5" />
      {label ? (
        <text x={x - 34} y={y + 5} fill="#334155" fontSize="15" fontWeight="800" textAnchor="end">
          {label}
        </text>
      ) : null}
    </g>
  );
}

function DependentCurrentSource({ x, y, label }) {
  return (
    <g>
      <path
        d={`M${x} ${y - 31}l31 31 -31 31 -31 -31Z`}
        fill="#ffffff"
        stroke="#154a96"
        strokeLinejoin="round"
        strokeWidth="3.5"
      />
      <path d={`M${x} ${y + 14}v-25`} stroke="#154a96" strokeLinecap="round" strokeWidth="3" />
      <path d={`M${x - 7} ${y - 4}l7 -8 7 8`} fill="none" stroke="#154a96" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      {label ? (
        <text x={x + 42} y={y + 5} fill="#334155" fontSize="15" fontWeight="800">
          {label}
        </text>
      ) : null}
    </g>
  );
}

function BelMaximumPowerCircuit() {
  return (
    <svg viewBox="0 0 610 300" className="h-auto w-full" role="img" aria-label="BEL maximum power transfer circuit with voltage source current source and load resistor">
      <rect width="610" height="300" rx="12" fill="#f8fbff" />
      <path d="M95 80h78M237 80h78M379 80h72v144H95V130M95 80v25" fill="none" stroke="#1e293b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <Resistor x={173} y={80} label="5 ohms" />
      <Resistor x={315} y={80} label="10 ohms" />
      <VoltageSource x={95} y={130} label="20 V" />
      <path d="M95 155v69M237 80v35M237 187v37M379 80v46M379 176v48M451 80h51v28M502 190v34" fill="none" stroke="#1e293b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <VerticalResistor x={237} y={115} label="10 ohms" />
      <SourceArrow x={379} y={151} label="4 A" />
      <VerticalResistor x={502} y={108} height={82} label="RL" />
      <circle cx="451" cy="80" r="4.5" fill="#9f1239" />
      <circle cx="451" cy="224" r="4.5" fill="#9f1239" />
      <text x="460" y="73" fill="#9f1239" fontSize="15" fontWeight="900">A</text>
      <text x="460" y="243" fill="#9f1239" fontSize="15" fontWeight="900">B</text>
    </svg>
  );
}

function BelTheveninDependentSourceCircuit() {
  return (
    <svg viewBox="0 0 610 300" className="h-auto w-full" role="img" aria-label="BEL Thevenin equivalent circuit question with dependent current source">
      <rect width="610" height="300" rx="12" fill="#f8fbff" />
      <path d="M112 86h72M248 86h66M378 86h27M112 86v26M112 162v64h266M248 86v57M248 205v21" fill="none" stroke="#1e293b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <VoltageSource x={112} y={137} label="4 V" />
      <Resistor x={184} y={86} label="5 ohms" />
      <Resistor x={314} y={86} label="3 ohms" />
      <DependentCurrentSource x={248} y={174} label="0.1 Vx" />
      <circle cx="405" cy="86" r="5" fill="#0f172a" />
      <circle cx="378" cy="226" r="5" fill="#0f172a" />
      <text x="420" y="92" fill="#334155" fontSize="17" fontWeight="900">A</text>
      <text x="392" y="232" fill="#334155" fontSize="17" fontWeight="900">B</text>
      <text x="423" y="114" fill="#334155" fontSize="18" fontWeight="900">+</text>
      <text x="391" y="214" fill="#334155" fontSize="18" fontWeight="900">-</text>
      <text x="424" y="166" fill="#334155" fontSize="18" fontWeight="800">Vx</text>
    </svg>
  );
}

function BelSignalFlowGraphDiagram() {
  return (
    <svg
      viewBox="0 0 640 250"
      className="h-auto w-full"
      role="img"
      aria-label="BEL signal flow graph showing forward paths from R(s) to Y(s)"
    >
      <rect width="640" height="250" rx="16" fill="#ffffff" />

      <g stroke="#7aa0cf" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M20 154h42" />
        <path d="M62 154L116 104" />
        <path d="M62 154L116 204" />
        <path d="M116 104H320" />
        <path d="M116 204H320" />
        <path d="M320 104H406" />
        <path d="M320 204H406" />
        <path d="M406 104L458 154" />
        <path d="M406 204L458 154" />
        <path d="M458 154h40" />
        <path d="M116 104C168 62 220 26 278 26C316 26 336 44 336 76V104" />
      </g>

      <g fill="#3569b8" fontSize="14" fontWeight="500">
        <text x="47" y="186">R(s)</text>
        <text x="472" y="186">Y(s)</text>
        <text x="102" y="141">G1</text>
        <text x="102" y="173">G5</text>
        <text x="170" y="129">G2</text>
        <text x="176" y="188">G6</text>
        <text x="308" y="129">G3</text>
        <text x="314" y="188">G7</text>
        <text x="398" y="141">G4</text>
        <text x="398" y="173">G8</text>
        <text x="150" y="42">H1</text>
      </g>

      <g fill="#3569b8">
        <path d="M82 136l-8 6 8 6z" />
        <path d="M82 172l-8 6 8 6z" />
        <path d="M212 104l-8 -6v12z" />
        <path d="M350 104l-8 -6v12z" />
        <path d="M212 204l-8 -6v12z" />
        <path d="M350 204l-8 -6v12z" />
        <path d="M438 136l8 6 -10 2z" />
        <path d="M438 172l8 -6 -10 -2z" />
        <path d="M192 42l8 -6 -2 10z" />
      </g>

      <text x="24" y="236" fill="#0f172a" fontSize="16" fontWeight="500">
        Count the forward paths in the signal flow graph.
      </text>
    </svg>
  );
}

function QuestionImageDiagram({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-auto max-h-[420px] w-auto max-w-full rounded-lg border border-slate-200 bg-white object-contain"
    />
  );
}

function isImageDiagram(value = "") {
  return /\.(avif|gif|jpe?g|png|webp)(?:[?#].*)?$/i.test(value);
}

export default function CircuitDiagram({ question }) {
  const diagram = question?.diagram || "";
  const topic = (question?.topic || "").toLowerCase();
  const text = `${question?.question || ""} ${topic}`.toLowerCase();

  if (diagram === "bel-dec-2023-q17-circuit") {
    return <BelMaximumPowerCircuit />;
  }

  if (diagram === "bel-dec-2023-q19-circuit") {
    return <BelTheveninDependentSourceCircuit />;
  }

  if (diagram === "bel-may-2025-q1044-sfg") {
    return <BelSignalFlowGraphDiagram />;
  }

  if (isImageDiagram(diagram)) {
    return (
      <QuestionImageDiagram
        src={diagram}
        alt={`${question?.exam?.join(" ") || "Question"} diagram`}
      />
    );
  }

  if (text.includes("differentiator") || text.includes("op-amp")) {
    return <OpAmpDifferentiatorDiagram />;
  }

  if (text.includes("rlc") || text.includes("resonance")) {
    return <SeriesRlcDiagram />;
  }

  return null;
}
