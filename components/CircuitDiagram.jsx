import { circuitDiagramLibrary } from "./CircuitDiagramLibrary";

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

function Gate2025SequentialCircuitDiagram() {
  return (
    <svg viewBox="0 0 760 420" className="h-auto w-full" role="img" aria-label="GATE 2025 sequential circuit with multiplexers flip-flops and timing signals">
      <rect width="760" height="420" rx="14" fill="#f8fbff" />
      <text x="34" y="40" fill="#0f172a" fontSize="18" fontWeight="900">Sequential circuit and timing diagram</text>

      <g stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <rect x="70" y="84" width="64" height="82" rx="4" fill="#fff" />
        <path d="M70 106l-34 28l34 28" />
        <text x="82" y="112" fill="#0f172a" fontSize="15" fontWeight="800">1</text>
        <text x="82" y="154" fill="#0f172a" fontSize="15" fontWeight="800">0</text>
        <text x="32" y="114" fill="#334155" fontSize="15" fontWeight="800">S</text>
        <text x="24" y="156" fill="#334155" fontSize="15" fontWeight="800">P0</text>

        <rect x="202" y="82" width="104" height="96" rx="4" fill="#fff" />
        <text x="222" y="118" fill="#0f172a" fontSize="15" fontWeight="800">D</text>
        <text x="270" y="116" fill="#0f172a" fontSize="15" fontWeight="800">Q</text>
        <text x="266" y="160" fill="#0f172a" fontSize="15" fontWeight="800">Q</text>
        <path d="M204 152l14 10l-14 10" />

        <rect x="405" y="84" width="64" height="82" rx="4" fill="#fff" />
        <path d="M405 106l-34 28l34 28" />
        <text x="417" y="112" fill="#0f172a" fontSize="15" fontWeight="800">1</text>
        <text x="417" y="154" fill="#0f172a" fontSize="15" fontWeight="800">0</text>
        <text x="356" y="114" fill="#334155" fontSize="15" fontWeight="800">P1</text>

        <rect x="540" y="82" width="104" height="96" rx="4" fill="#fff" />
        <text x="560" y="118" fill="#0f172a" fontSize="15" fontWeight="800">D</text>
        <text x="608" y="116" fill="#0f172a" fontSize="15" fontWeight="800">Q</text>
        <path d="M542 152l14 10l-14 10" />

        <path d="M134 124h68M306 120h65M469 124h71M306 158h65M644 120h36v72h-40" />
        <path d="M680 192c26 0 26 44 0 44c-24 0-24-44 0-44zM704 214h30" />
        <text x="738" y="220" fill="#0f172a" fontSize="17" fontWeight="900">Y</text>
        <path d="M254 178v36h338v-36" />
        <path d="M102 166v44h335v-44" />
      </g>

      <g fill="#334155" fontSize="14" fontWeight="800">
        <text x="90" y="196">SEL</text>
        <text x="424" y="196">SEL</text>
        <text x="230" y="198">CLK</text>
        <text x="568" y="198">CLK</text>
      </g>

      <g stroke="#154a96" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M168 302h28v-24h28v24h28v-24h28v24h28v-24h28v24h28v-24h28v24" />
        <path d="M168 338h94v-34h80v34h72" />
        <path d="M168 374h154v-34h52v34h40" />
        <path d="M248 260v132M328 260v132M382 260v132" stroke="#94a3b8" strokeDasharray="8 7" />
      </g>
      <g fill="#0f172a" fontSize="14" fontWeight="900">
        <text x="104" y="306">CLK</text>
        <text x="112" y="342">SEL</text>
        <text x="132" y="378">S</text>
        <text x="238" y="410">T0</text>
        <text x="318" y="410">T1</text>
        <text x="372" y="410">T2</text>
        <text x="418" y="410">T3</text>
      </g>
    </svg>
  );
}

function Gate2025BjtBiasDiagram() {
  return (
    <svg viewBox="0 0 620 760" className="h-auto w-full md:w-[70%]" role="img" aria-label="GATE 2025 Q47 BJT bias circuit">
      <rect width="620" height="760" rx="14" fill="#f8fbff" />

      <defs>
        <marker id="gate-q47-arrow-clean" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto">
          <path d="M0 0L12 6L0 12Z" fill="#111827" />
        </marker>
      </defs>

      <g stroke="#111827" strokeWidth="4" strokeLinecap="square" strokeLinejoin="round" fill="none">
        <path d="M200 70H455" />
        <path d="M230 70V160" />
        <path d="M455 70V130" />
        <path d="M230 270V320" />
        <path d="M230 405V585" />
        <path d="M230 405H410" />
        <path d="M455 255V335H410" />
        <path d="M410 335V405" />
        <path d="M410 500V585" />
      </g>

      <g stroke="#111827" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M455 130l-16 10l32 16l-32 16l32 16l-32 16l32 16l-16 10" />
        <path d="M230 480l-16 10l32 16l-32 16l32 16l-32 16l16 10" />
        <path d="M410 425l-16 10l32 16l-32 16l32 16l-16 10" />
      </g>

      <g stroke="#111827" strokeWidth="4" strokeLinecap="square" strokeLinejoin="round" fill="none">
        <path d="M230 320H198" />
        <path d="M198 320l32 -50l32 50Z" />
        <path d="M198 360h64" />
        <path d="M230 360V405" />
      </g>

      <g stroke="#111827" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M230 160H170V270H230" />
        <path d="M230 180l-42 35" />
        <path d="M230 270l-42 -35" />
        <path d="M208 195l22 -35" />
        <path d="M209 193l21 -33l-30 9" />

        <path d="M410 335v90" />
        <path d="M410 355l44 35" />
        <path d="M410 425l44 -35" />
        <path d="M432 410l-22 36" />
        <path d="M431 412l-21 34l30 -10" />
      </g>

      <g stroke="#111827" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M118 205V320H230" />
        <path d="M118 205H170" />
        <path d="M118 205v92" />
        <path d="M118 205l-9 17M118 205l9 17" />
        <path d="M378 405V318" />
        <path d="M378 318l-9 17M378 318l9 17" />
      </g>

      <g stroke="#111827" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M490 330V402" markerEnd="url(#gate-q47-arrow-clean)" />
        <path d="M385 468V540" markerEnd="url(#gate-q47-arrow-clean)" />
        <path d="M390 422H302" markerEnd="url(#gate-q47-arrow-clean)" />
        <path d="M165 345V420" markerEnd="url(#gate-q47-arrow-clean)" />
      </g>

      <g stroke="#111827" strokeWidth="4" strokeLinecap="square" fill="none">
        <path d="M200 585h60M210 603h40M220 620h20" />
        <path d="M380 585h60M390 603h40M400 620h20" />
      </g>

      <g fill="#111827" fontFamily="Arial, sans-serif" fontSize="27" fontWeight="500">
        <text x="322" y="60" fontSize="30" fontWeight="700" textAnchor="middle">20 V</text>
        <text x="178" y="82" fontSize="30" fontWeight="700">+</text>
        <text x="485" y="188">R<tspan baselineShift="sub" fontSize="18">2</tspan></text>
        <text x="178" y="535">R<tspan baselineShift="sub" fontSize="18">1</tspan></text>
        <text x="438" y="480">R<tspan baselineShift="sub" fontSize="18">L</tspan></text>
        <text x="270" y="220">Q<tspan baselineShift="sub" fontSize="18">2</tspan></text>
        <text x="466" y="420">Q<tspan baselineShift="sub" fontSize="18">1</tspan></text>
        <text x="276" y="345">V<tspan baselineShift="sub" fontSize="18">Z</tspan></text>
        <text x="140" y="348">I<tspan baselineShift="sub" fontSize="18">Z</tspan></text>
        <text x="510" y="370">I<tspan baselineShift="sub" fontSize="18">E</tspan></text>
        <text x="342" y="522">I<tspan baselineShift="sub" fontSize="18">L</tspan></text>
        <text x="330" y="455">I<tspan baselineShift="sub" fontSize="18">B</tspan></text>
        <text x="70" y="175">V<tspan baselineShift="sub" fontSize="18">EB2</tspan></text>
        <text x="305" y="366">V<tspan baselineShift="sub" fontSize="18">EB1</tspan></text>
        <text x="268" y="315">+</text>
        <text x="268" y="378">-</text>
        <text x="126" y="195">-</text>
        <text x="132" y="230">+</text>
        <text x="390" y="330">+</text>
        <text x="390" y="416">-</text>
      </g>
    </svg>
  );
}

function Gate2025BjtBiasDiagramLegacy() {
  return (
    <svg viewBox="0 0 860 620" className="h-auto w-full" role="img" aria-label="GATE 2025 Q47 BJT bias circuit">
      <rect width="860" height="620" rx="14" fill="#f8fbff" />
      <text x="32" y="42" fill="#0f172a" fontSize="20" fontWeight="900">Q47 transistor bias circuit</text>

      <defs>
        <marker id="gate-q47-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill="#1e293b" />
        </marker>
      </defs>

      <g stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M285 92H650" />
        <path d="M310 92V185" />
        <path d="M650 92V168" />
        <text x="446" y="76" fill="#1e293b" fontSize="34" fontWeight="900">20V</text>
        <text x="240" y="104" fill="#1e293b" fontSize="34" fontWeight="900">+</text>

        <path d="M330 278V326" />
        <path d="M330 400V490" />
        <path d="M330 490V532" />
        <path d="M306 532h48M314 546h32M322 560h16" />
        <path d="M330 400H500" />

        <path d="M650 290V332H586" />
        <path d="M586 332V414" />
        <path d="M586 490V532" />
        <path d="M562 532h48M570 546h32M578 560h16" />
      </g>

      <g stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M650 168l-18 12l36 18l-36 18l36 18l-36 18l36 18l-18 12" />
        <text x="690" y="232" fill="#1e293b" fontSize="32" fontWeight="900">R₂</text>

        <path d="M330 414l-18 12l36 18l-36 18l36 18l-18 10" />
        <text x="270" y="462" fill="#1e293b" fontSize="32" fontWeight="900">R₁</text>

        <path d="M586 414l-18 12l36 18l-36 18l36 18l-18 10" />
        <text x="628" y="468" fill="#1e293b" fontSize="32" fontWeight="900">Rₗ</text>
      </g>

      <g stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M330 326H292" />
        <path d="M292 326l38-56l38 56" />
        <path d="M292 356h76" />
        <path d="M330 356V400" />
        <text x="384" y="335" fill="#1e293b" fontSize="32" fontWeight="900">Vᵥ</text>
        <text x="248" y="332" fill="#1e293b" fontSize="30" fontWeight="900">Iᶻ</text>
        <path d="M258 300V380" markerEnd="url(#gate-q47-arrow)" />
        <text x="390" y="304" fill="#1e293b" fontSize="30" fontWeight="900">+</text>
        <text x="392" y="372" fill="#1e293b" fontSize="30" fontWeight="900">−</text>
      </g>

      <g stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M330 185H255V278H330" />
        <path d="M330 205l-58 37" />
        <path d="M330 278l-58-36" />
        <path d="M306 222l24-37" />
        <path d="M308 220l22-35l-31 10" />
        <text x="370" y="254" fill="#1e293b" fontSize="34" fontWeight="900">Q₂</text>

        <path d="M500 332H586" />
        <path d="M500 332v82" />
        <path d="M500 352l58 38" />
        <path d="M500 414l58-24" />
        <path d="M532 401l-32 48" />
        <path d="M528 404l-28 45l36-15" />
        <text x="604" y="414" fill="#1e293b" fontSize="34" fontWeight="900">Q₁</text>
      </g>

      <g stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M205 185V278" />
        <path d="M205 185l-10 18M205 185l10 18" />
        <text x="116" y="250" fill="#1e293b" fontSize="34" fontWeight="900">Vᴇʙ₂</text>
        <text x="206" y="170" fill="#1e293b" fontSize="30" fontWeight="900">+</text>
        <text x="206" y="298" fill="#1e293b" fontSize="30" fontWeight="900">−</text>

        <path d="M462 400V292" />
        <path d="M462 292l-10 18M462 292l10 18" />
        <text x="392" y="376" fill="#1e293b" fontSize="34" fontWeight="900">Vᴇʙ₁</text>
        <text x="476" y="306" fill="#1e293b" fontSize="30" fontWeight="900">+</text>
        <text x="476" y="400" fill="#1e293b" fontSize="30" fontWeight="900">−</text>
      </g>

      <g stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M690 294V376" markerEnd="url(#gate-q47-arrow)" />
        <text x="716" y="354" fill="#1e293b" fontSize="34" fontWeight="900">Iᴇ</text>

        <path d="M548 438V510" markerEnd="url(#gate-q47-arrow)" />
        <text x="486" y="486" fill="#1e293b" fontSize="34" fontWeight="900">Iₗ</text>

        <path d="M480 424H382" markerEnd="url(#gate-q47-arrow)" />
        <text x="410" y="466" fill="#1e293b" fontSize="34" fontWeight="900">Iʙ</text>
      </g>
    </svg>
  );
}

function Gate2025ChargeSheetDiagram() {
  return (
    <svg viewBox="0 0 520 360" className="h-auto w-full md:w-[78%]" role="img" aria-label="Square metal sheet from x minus 2 to 2 and y minus 2 to 2">
      <rect width="520" height="360" rx="14" fill="#f8fbff" />
      <text x="34" y="38" fill="#0f172a" fontSize="18" fontWeight="900">4 m x 4 m sheet on x-y plane</text>
      <g stroke="#1e293b" strokeWidth="3" strokeLinecap="round">
        <path d="M260 310V72" />
        <path d="M104 190h312" />
        <path d="M260 72l-8 14M260 72l8 14M416 190l-14-8M416 190l-14 8" />
      </g>
      <rect x="160" y="90" width="200" height="200" fill="#e2e8f0" stroke="#334155" strokeWidth="3" opacity="0.85" />
      <g stroke="#94a3b8" strokeWidth="2">
        <path d="M178 90l-18 200M214 90l-18 200M250 90l-18 200M286 90l-18 200M322 90l-18 200M360 126l-146 164M360 170l-110 120M360 214l-74 76" />
      </g>
      <g fill="#0f172a" fontSize="15" fontWeight="800">
        <text x="376" y="194">x (m)</text>
        <text x="270" y="82">y (m)</text>
        <text x="132" y="92">(-2, 2)</text>
        <text x="354" y="92">(2, 2)</text>
        <text x="126" y="306">(-2, -2)</text>
        <text x="348" y="306">(2, -2)</text>
        <text x="154" y="334">rho_s(x,y) = 4|y| microC/m²</text>
      </g>
    </svg>
  );
}

function Gate2025BlockSignalFlowDiagram() {
  return (
    <svg viewBox="0 0 900 520" className="h-auto w-full max-w-[450px]" role="img" aria-label="GATE 2025 Q56 block diagram">
      <rect width="900" height="520" fill="#ffffff" />
      <defs>
        <marker id="gate-q56-arrow" markerWidth="9.6" markerHeight="9.6" refX="8.8" refY="4.8" orient="auto">
          <path d="M0 0L9.6 4.8L0 9.6Z" fill="#111111" />
        </marker>
      </defs>

      <g stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M68 250h120" markerEnd="url(#gate-q56-arrow)" />
        <path d="M266 250h178" markerEnd="url(#gate-q56-arrow)" />
        <path d="M570 250h164" markerEnd="url(#gate-q56-arrow)" />
        <path d="M822 250h58" markerEnd="url(#gate-q56-arrow)" />
        <path d="M320 250V82" />
        <path d="M320 82h140" markerEnd="url(#gate-q56-arrow)" />
        <path d="M606 82h172" />
        <path d="M778 82v124" markerEnd="url(#gate-q56-arrow)" />
        <path d="M650 250v206" />
        <path d="M650 456H220" />
        <path d="M220 456V294" markerEnd="url(#gate-q56-arrow)" />
      </g>
      <g stroke="#111111" strokeWidth="4" fill="#ffffff">
        <circle cx="220" cy="250" r="44" />
        <rect x="446" y="209" width="124" height="82" rx="1" />
        <rect x="462" y="36" width="144" height="92" rx="1" />
        <circle cx="778" cy="250" r="44" />
      </g>
      <g fill="#111111" fontFamily="Times New Roman, serif" fontSize="34" fontStyle="italic">
        <text x="10" y="224">R(s)</text>
        <text x="498" y="262">G<tspan baselineShift="sub" fontSize="22">1</tspan></text>
        <text x="516" y="96">G<tspan baselineShift="sub" fontSize="22">2</tspan></text>
        <text x="856" y="224">Y(s)</text>
      </g>
      <g fill="#111111" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="800">
        <text x="190" y="258">+</text>
        <text x="212" y="286">-</text>
        <text x="770" y="225">+</text>
        <text x="752" y="258">+</text>
      </g>
      <path d="M190 220l60 60M250 220l-60 60M748 220l60 60M808 220l-60 60" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Gate2025Q56OptionDiagram({ variant }) {
  const viewWidth = 620;
  const nodeY = 104;
  const Arrow = ({ x, y, angle = 0 }) => (
    <path
      d={`M${x} ${y}l-9.9 -5.5v11Z`}
      fill="#111111"
      transform={`rotate(${angle} ${x} ${y})`}
    />
  );
  const Node = ({ x, y = nodeY }) => (
    <circle cx={x} cy={y} r="5.2" fill="#ffffff" stroke="#111111" strokeWidth="2.1" />
  );
  const Label = ({ x, y, children }) => <text x={x} y={y}>{children}</text>;
  const labels = {
    a: { first: "1", mid: "1", out: "G1", top: "G2", feedback: "-1" },
    b: { first: "1", mid: "G1", out: "1", top: "G2", feedback: "-1" },
    c: { first: "1", mid: "G1", out: "G2", top: "1", feedback: "-1" },
    d: { first: "1", mid: "G1", out: "1", top: "G2", feedback: "1" },
  }[variant];
  const compact = variant === "a" || variant === "c";
  const x1 = 156;
  const x2 = 292;
  const x3 = compact ? 428 : 444;
  const x4 = 548;

  function GainText({ gain, x, y }) {
    if (gain === "G1") {
      return <Label x={x} y={y}>G<tspan baselineShift="sub" fontSize="13">1</tspan></Label>;
    }

    if (gain === "G2") {
      return <Label x={x} y={y}>G<tspan baselineShift="sub" fontSize="13">2</tspan></Label>;
    }

    return <Label x={x} y={y}>{gain}</Label>;
  }

  if (variant === "a" || variant === "c") {
    const feedbackLabel = variant === "c" ? "1" : "-1";

    return (
      <svg viewBox="0 0 820 330" className="h-auto w-full max-w-[260px] sm:max-w-[390px]" role="img" aria-label={`GATE 2025 Q56 option ${variant.toUpperCase()} signal flow graph`}>
        <rect width="820" height="330" fill="#ffffff" />
        <g stroke="#111111" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M72 156H194" />
          <path d="M224 156H606" />
          <path d="M636 156H750" />
          <path d="M210 146C238 40 580 40 620 146" />
          <path d="M620 168C575 286 270 286 210 168" />
        </g>
        <Arrow x="162" y="156" />
        <Arrow x="410" y="156" />
        <Arrow x="710" y="156" />
        <Arrow x="615" y="142" angle="74" />
        <Arrow x="210" y="168" angle="-84" />
        <circle cx="54" cy="156" r="18" fill="#ffffff" stroke="#111111" strokeWidth="3.2" />
        <circle cx="210" cy="156" r="15" fill="#111111" />
        <circle cx="620" cy="156" r="15" fill="#111111" />
        <circle cx="768" cy="156" r="18" fill="#ffffff" stroke="#111111" strokeWidth="3.2" />
        <g fill="#111111" fontFamily="Times New Roman, serif" fontSize="28" fontStyle="italic">
          <text x="30" y="206">R(s)</text>
          <text x="742" y="206">Y(s)</text>
          <text x="382" y="54">G<tspan baselineShift="sub" fontSize="18">2</tspan></text>
          <text x="365" y="144">G<tspan baselineShift="sub" fontSize="18">1</tspan></text>
        </g>
        <g fill="#111111" fontFamily="Times New Roman, serif" fontSize="26">
          <text x="130" y="136">1</text>
          <text x="698" y="136">1</text>
          <text x="390" y="306">{feedbackLabel}</text>
        </g>
      </svg>
    );
  }

  if (variant === "b") {
    return (
      <svg viewBox="0 0 1100 540" className="h-auto w-full max-w-[260px] sm:max-w-[390px]" role="img" aria-label="GATE 2025 Q56 option B signal flow graph">
        <rect width="1100" height="540" fill="#ffffff" />
        <g stroke="#111111" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M92 260H270" />
          <path d="M304 260H540" />
          <path d="M574 260H810" />
          <path d="M844 260H1010" />
          <path d="M288 248C330 82 770 82 828 248" />
          <path d="M558 280C540 398 330 398 288 280" />
        </g>
        <Arrow x="236" y="260" />
        <Arrow x="464" y="260" />
        <Arrow x="716" y="260" />
        <Arrow x="942" y="260" />
        <Arrow x="822" y="236" angle="75" />
        <Arrow x="288" y="280" angle="-84" />
        <circle cx="54" cy="260" r="28" fill="#ffffff" stroke="#111111" strokeWidth="5" />
        <circle cx="288" cy="260" r="22" fill="#111111" />
        <circle cx="558" cy="260" r="22" fill="#111111" />
        <circle cx="828" cy="260" r="22" fill="#111111" />
        <circle cx="1048" cy="260" r="28" fill="#ffffff" stroke="#111111" strokeWidth="5" />
        <g fill="#111111" fontFamily="Times New Roman, serif" fontSize="52" fontStyle="italic">
          <text x="16" y="330">R(s)</text>
          <text x="1015" y="330">Y(s)</text>
          <text x="532" y="82">G<tspan baselineShift="sub" fontSize="32">2</tspan></text>
          <text x="430" y="300">G<tspan baselineShift="sub" fontSize="32">1</tspan></text>
        </g>
        <g fill="#111111" fontFamily="Times New Roman, serif" fontSize="44">
          <text x="158" y="236">1</text>
          <text x="418" y="236">1</text>
          <text x="672" y="236">1</text>
          <text x="932" y="236">1</text>
          <text x="548" y="150">1</text>
          <text x="410" y="420">-1</text>
        </g>
      </svg>
    );
  }

  if (variant === "d") {
    return (
      <svg viewBox="0 0 1100 540" className="h-auto w-full max-w-[260px] sm:max-w-[390px]" role="img" aria-label="GATE 2025 Q56 option D signal flow graph">
        <rect width="1100" height="540" fill="#ffffff" />
        <g stroke="#111111" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M92 260H270" />
          <path d="M306 260H636" />
          <path d="M672 260H860" />
          <path d="M896 260H1010" />
          <path d="M288 248C318 72 590 72 654 248" />
          <path d="M878 280C812 448 398 448 288 280" />
        </g>
        <Arrow x="214" y="260" />
        <Arrow x="424" y="260" />
        <Arrow x="760" y="260" />
        <Arrow x="954" y="260" />
        <Arrow x="448" y="82" angle="17" />
        <Arrow x="564" y="404" angle="180" />
        <circle cx="54" cy="260" r="28" fill="#ffffff" stroke="#111111" strokeWidth="5" />
        <circle cx="288" cy="260" r="28" fill="#ffffff" stroke="#111111" strokeWidth="5" />
        <circle cx="654" cy="260" r="28" fill="#ffffff" stroke="#111111" strokeWidth="5" />
        <circle cx="878" cy="260" r="28" fill="#ffffff" stroke="#111111" strokeWidth="5" />
        <circle cx="1048" cy="260" r="28" fill="#ffffff" stroke="#111111" strokeWidth="5" />
        <g fill="#111111" fontFamily="Times New Roman, serif" fontSize="52" fontStyle="italic">
          <text x="16" y="330">R(s)</text>
          <text x="1015" y="330">Y(s)</text>
          <text x="430" y="92">G<tspan baselineShift="sub" fontSize="32">2</tspan></text>
          <text x="410" y="312">G<tspan baselineShift="sub" fontSize="32">1</tspan></text>
        </g>
        <g fill="#111111" fontFamily="Times New Roman, serif" fontSize="44">
          <text x="146" y="310">1</text>
          <text x="740" y="310">1</text>
          <text x="940" y="310">1</text>
          <text x="560" y="468">-1</text>
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox={`0 0 ${viewWidth} 180`} className="h-auto w-full max-w-[260px] sm:max-w-[390px]" role="img" aria-label={`GATE 2025 Q56 option ${variant.toUpperCase()} signal flow graph`}>
      <rect width={viewWidth} height="180" fill="#ffffff" />
      <g stroke="#111111" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={`M82 ${nodeY}H${x1 - 12}`} />
        <path d={`M${x1 + 12} ${nodeY}H${x2 - 12}`} />
        <path d={`M${x2 + 12} ${nodeY}H${x3 - 12}`} />
        {!compact ? <path d={`M${x3 + 12} ${nodeY}H${x4 - 26}`} /> : null}
        <path d={`M${x1} ${nodeY - 4}C${x1 + 8} 28 ${x3 - 12} 28 ${x3} ${nodeY}`} />
        <path d={`M${x2} ${nodeY}C${x2} 158 ${x1 - 16} 158 ${x1 - 16} ${nodeY}`} />
      </g>
      <Arrow x="116" y={nodeY} />
      <Arrow x="226" y={nodeY} />
      <Arrow x={compact ? 358 : 368} y={nodeY} />
      {!compact ? <Arrow x="502" y={nodeY} /> : null}
      <Arrow x={x3 - 18} y="28" />
      <Arrow x={x1 - 16} y="136" angle="205" />
      <Node x={x1} />
      <Node x={x2} />
      {!compact ? <Node x={x3} /> : null}
      <g fill="#111111" fontFamily="Times New Roman, serif" fontSize="17" fontStyle="italic">
        <Label x="28" y="109">R(s)</Label>
        <Label x={compact ? "440" : "558"} y="109">Y(s)</Label>
        <GainText gain={labels.first} x="112" y="132" />
        <GainText gain={labels.mid} x="222" y="132" />
        <GainText gain={labels.out} x={compact ? "356" : "370"} y="132" />
        <GainText gain={labels.top} x={compact ? "300" : "312"} y="34" />
        <GainText gain={labels.feedback} x="164" y="168" />
      </g>
    </svg>
  );
}

function Gate2025DiodeBridgeDiagram() {
  return (
    <svg viewBox="0 0 765 470" className="h-auto w-full" role="img" aria-label="GATE 2025 Q57 ideal diode bridge circuit">
      <rect width="765" height="470" fill="#ffffff" />
      <defs>
        <marker id="gate-q57-current-arrow" markerWidth="16" markerHeight="16" refX="15" refY="8" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0L16 8L0 16Z" fill="#000000" />
        </marker>
      </defs>

      <g stroke="#000000" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M110 51H560" />
        <path d="M110 412H560" />
        <path d="M560 51L389 231L560 412L733 231Z" />
        <path d="M389 231H733" />
      </g>

      <g fill="#ffffff" stroke="#000000" strokeWidth="4.5">
        <circle cx="110" cy="51" r="13" />
        <circle cx="110" cy="412" r="13" />
      </g>
      <g fill="#000000">
        <circle cx="560" cy="51" r="9.5" />
        <circle cx="389" cy="231" r="9.5" />
        <circle cx="733" cy="231" r="9.5" />
        <circle cx="560" cy="412" r="9.5" />
      </g>

      <g stroke="#000000" strokeWidth="3.7" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M497 144l42 31l-46 16Z" />
        <path d="M497 144l42 42" />
        <path d="M512 190l-24 25" />

        <path d="M646 144l-42 31l46 16Z" />
        <path d="M646 144l-42 42" />
        <path d="M655 190l27 27" />

        <path d="M498 319l42 -31l-46 -16Z" />
        <path d="M498 319l42 -42" />
        <path d="M514 273l-29 -29" />

        <path d="M646 319l-42 -31l46 -16Z" />
        <path d="M646 319l-42 -42" />
        <path d="M655 273l27 -28" />
      </g>

      <g stroke="#000000" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M506 231h31l8 -14l16 28l16 -28l16 28l16 -28l16 28l8 -14h31" />
      </g>

      <g stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M253 78H356" markerEnd="url(#gate-q57-current-arrow)" />
        <path d="M57 64v84" />
        <path d="M57 141l-27 0l27 53l27 -53Z" fill="#000000" />
        <path d="M57 404v-66" />
        <path d="M57 338l-27 53h54Z" fill="#000000" />
      </g>

      <g fill="#000000" fontFamily="Times New Roman, serif" fontStyle="italic">
        <text x="28" y="86" fontSize="36">+</text>
        <text x="92" y="337" fontSize="42">V<tspan baselineShift="sub" fontSize="25">I</tspan></text>
        <text x="286" y="176" fontSize="42">I<tspan baselineShift="sub" fontSize="25">I</tspan></text>
        <text x="534" y="211" fontSize="39">- V<tspan baselineShift="sub" fontSize="24">O</tspan> +</text>
        <text x="546" y="316" fontSize="46" fontStyle="normal">R</text>
      </g>
    </svg>
  );
}

function Gate2025DiodeBiasDiagram() {
  return (
    <svg viewBox="0 0 760 520" className="h-auto w-full md:w-[82%]" role="img" aria-label="GATE 2025 Q61 ideal diode circuit">
      <rect width="760" height="520" fill="#ffffff" />

      <g stroke="#111111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M160 90H355" />
        <path d="M455 90H610V450H160" />
        <path d="M160 115V390" />
        <path d="M610 90V190" />
        <path d="M610 240V300" />
        <path d="M610 375V450" />
      </g>

      <g stroke="#111111" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M355 90h14l10 -28l22 56l22 -56l22 56l10 -28h14" />
      </g>

      <g stroke="#111111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M575 190h70l-35 50Z" />
        <path d="M575 250h70" />
        <path d="M610 250v50" />
      </g>

      <g stroke="#111111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M582 300h56" />
        <path d="M550 330h120" />
      </g>

      <g fill="#ffffff" stroke="#111111" strokeWidth="5">
        <circle cx="160" cy="90" r="13" />
        <circle cx="160" cy="450" r="13" />
      </g>

      <g fill="#111111" fontFamily="Times New Roman, serif">
        <text x="385" y="45" fontSize="46" fontWeight="700">R</text>
        <text x="102" y="125" fontSize="42">+</text>
        <text x="102" y="458" fontSize="42">-</text>
        <text x="142" y="300" fontSize="42" fontStyle="italic" textAnchor="end">
          V<tspan baselineShift="sub" fontSize="25">I</tspan>
        </text>
        <text x="665" y="378" fontSize="42">5 V</text>
      </g>
    </svg>
  );
}

function Gate2025SetupTimingDiagram() {
  return (
    <svg viewBox="0 0 980 570" className="h-auto w-[70%] max-w-full" role="img" aria-label="GATE 2025 Q62 sequential circuit with two D flip-flops and AND feedback">
      <rect width="980" height="570" fill="#ffffff" />

      <g stroke="#000000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M38 68H885V246" />
        <path d="M38 68V218H128" />
        <path d="M306 218H440" />
        <path d="M616 218H744" />
        <path d="M842 246H920" />
        <path d="M885 68V246" />
        <path d="M38 475H514V396" />
        <path d="M218 475V396" />
      </g>

      <g stroke="#000000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="#ffffff">
        <rect x="128" y="170" width="178" height="226" rx="2" />
        <rect x="440" y="170" width="176" height="226" rx="2" />
        <path d="M744 198H798C852 198 876 225 876 262C876 299 852 326 798 326H744Z" />
      </g>

      <g stroke="#000000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M128 358l32 19l-32 19" />
        <path d="M440 358l32 19l-32 19" />
        <path d="M678 276H744" />
      </g>

      <circle cx="218" cy="475" r="11" fill="#000000" />

      <g fill="#000000" fontFamily="Times New Roman, serif">
        <text x="148" y="228" fontSize="42">D</text>
        <text x="260" y="228" fontSize="42">Q</text>
        <text x="256" y="354" fontSize="42">
          <tspan textDecoration="overline">Q</tspan>
        </text>

        <text x="462" y="228" fontSize="42">D</text>
        <text x="573" y="228" fontSize="42">Q</text>
        <text x="570" y="354" fontSize="42">
          <tspan textDecoration="overline">Q</tspan>
        </text>

        <text x="55" y="527" fontSize="42" fontStyle="italic">CLK</text>
        <text x="690" y="323" fontSize="42" fontStyle="italic">X</text>
        <text x="936" y="260" fontSize="42" fontStyle="italic">X</text>
      </g>
    </svg>
  );
}

function Gate2025InducedLoopDiagram() {
  return (
    <svg viewBox="0 0 620 420" className="h-auto w-full md:w-[88%]" role="img" aria-label="GATE 2025 Q65 rectangular loop with two 2 ohm resistors in changing magnetic field">
      <rect width="620" height="420" rx="14" fill="#f8fbff" />
      <text x="32" y="42" fill="#0f172a" fontSize="18" fontWeight="900">Single loop: total resistance = 4 ohm</text>
      <defs>
        <pattern id="gate-q65-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0h12" stroke="#cbd5e1" strokeWidth="4" />
        </pattern>
        <marker id="gate-q65-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill="#1e293b" />
        </marker>
      </defs>
      <rect x="126" y="96" width="230" height="210" fill="url(#gate-q65-hatch)" stroke="#1e293b" strokeWidth="3" />
      <VerticalResistor x={126} y={150} height={92} label="2 ohm" />
      <VerticalResistor x={356} y={150} height={92} label="2 ohm" />
      <path d="M356 96H126M126 306h230" stroke="#1e293b" strokeWidth="3" fill="none" />
      <path d="M286 96h-70" stroke="#1e293b" strokeWidth="3" markerEnd="url(#gate-q65-arrow)" />
      <path d="M238 316c-44 -34 -46 -92 -4 -128" stroke="#1e293b" strokeWidth="3" fill="none" markerEnd="url(#gate-q65-arrow)" />
      <g fill="#0f172a" fontSize="16" fontWeight="900">
        <text x="240" y="82">I</text>
        <text x="178" y="340">Loop area = 5 m^2</text>
        <text x="382" y="128">B(t) = 0.5t T</text>
        <text x="382" y="154">along +z</text>
      </g>
      <g stroke="#154a96" strokeWidth="3" strokeLinecap="round" markerEnd="url(#gate-q65-arrow)">
        <path d="M454 312h90" />
        <path d="M454 312v-90" />
        <path d="M454 312l-54 54" />
      </g>
      <g fill="#0f172a" fontSize="16" fontWeight="900">
        <text x="552" y="318">x</text>
        <text x="448" y="214">y</text>
        <text x="390" y="386">z</text>
      </g>
    </svg>
  );
}

function Gate2025GenericFigure({ diagram }) {
  const configs = {
    "gate-2025-q4-iteration-curve": {
      title: "Iterative curve lengths",
      kind: "curve",
      notes: ["Iteration 0: length 1", "Iteration 1: 5 segments, each 1/3", "Iteration 2: each segment becomes 5 smaller segments"],
    },
    "gate-2025-q5-piecewise-plot": {
      title: "Representative plot for f(x) = -|x|/x",
      kind: "piecewise",
      notes: ["x < 0: f(x) = 1", "x > 0: f(x) = -1", "x = 0 is excluded"],
    },
    "gate-2025-q7-broken-stick": {
      title: "One-meter stick broken at b1 and b2",
      kind: "stick",
      notes: ["0 < b1 < b2 < 1", "Pieces: b1, b2 - b1, 1 - b2"],
    },
    "gate-2025-q8-musical-chairs": {
      title: "Initial circular order",
      kind: "circle",
      notes: ["Clockwise movement", "P, Q, R, S, T, U, V, W around the circle"],
    },
    "gate-2025-q15-capacity-plot": {
      title: "AWGN capacity versus bandwidth",
      kind: "saturating",
      notes: ["C = W log2(1 + Pav/(N0 W))", "Increasing curve with finite limiting value"],
    },
    "gate-2025-q16-nyquist": {
      title: "Nyquist plot reference",
      kind: "nyquist",
      notes: ["Unit circle and negative real-axis crossings", "S: gain crossover", "Q: phase crossover"],
    },
    "gate-2025-q17-discrete-system": {
      title: "Discrete-time system",
      kind: "blocks",
      notes: ["x[n] -> h1[n] -> sum -> h2[n] -> sum -> y[n]", "Injected terms: +b delta[n] and -b delta[n]"],
    },
    "gate-2025-q19-network": {
      title: "Node-voltage network",
      kind: "network",
      notes: ["8 V source, 2 ohm and 1 ohm path to node X", "3 ohm branch with 1 A from 9 V node"],
    },
    "gate-2025-q20-parallel-admittance": {
      title: "Parallel AC admittance circuit",
      kind: "parallel",
      notes: ["Source: 1 angle 90 degrees V", "Branches: j0.25 S, -j0.1 S, 0.2 S"],
    },
    "gate-2025-q21-small-signal-bjt": {
      title: "BJT small-signal equivalent",
      kind: "bjt-small",
      notes: ["Input: Vs through Rs and r_pi", "Controlled source: beta ib", "Load: RL"],
    },
    "gate-2025-q22-bjt-bias": {
      title: "BJT bias circuit",
      kind: "bjt-bias",
      notes: ["VCC = 10 V", "Collector resistor 5 kohm", "Emitter resistor 3 kohm"],
    },
    "gate-2025-q24-full-adder": {
      title: "Full adder with XOR input control",
      kind: "adder",
      notes: ["Inputs: X, Y, Z", "Z controls XOR and carry-in", "Output: F"],
    },
    "gate-2025-q26-root-locus": {
      title: "Root locus",
      kind: "root",
      notes: ["Open-loop poles on real axis", "Question point: -1 + j1"],
    },
    "gate-2025-q34-bandpass-filter": {
      title: "Ideal op-amp bandpass filter",
      kind: "filter",
      notes: ["Input R and 10C path", "Feedback: 2R with 0.1C branch", "Lower -3 dB frequency = 1 MHz"],
    },
    "gate-2025-q35-dac": {
      title: "4-bit weighted-resistor DAC",
      kind: "dac",
      notes: ["Inputs b3 b2 b1 b0", "Resistors R, 2R, 4R, 8R", "Inverting op-amp with R feedback"],
    },
    "gate-2025-q39-lti-meter": {
      title: "LTI circuit with AC meters",
      kind: "rlc-meter",
      notes: ["M1: ideal AC voltmeter", "M2: ideal AC ammeter", "Series load: 5 ohm, C, 1 H"],
    },
    "gate-2025-q40-two-port": {
      title: "Two-port resistive ladder",
      kind: "twoport",
      notes: ["Series 2 ohm sections", "Two shunt 2 ohm resistors"],
    },
    "gate-2025-q43-mos-differential": {
      title: "MOS differential pair",
      kind: "mos",
      notes: ["VDD = 5 V", "1 kohm drain resistors", "2 mA tail current"],
    },
  };
  const config = configs[diagram];

  if (!config) {
    return null;
  }

  const notes = config.notes || [];

  return (
    <svg viewBox="0 0 760 360" className="h-auto w-full" role="img" aria-label={config.title}>
      <rect width="760" height="360" rx="14" fill="#f8fbff" />
      <text x="34" y="42" fill="#0f172a" fontSize="18" fontWeight="900">{config.title}</text>
      <g stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {config.kind === "curve" ? (
          <>
            <path d="M90 95h360M90 160h90v-52h90v52h180M90 250h44v-42h46v-44h50v44h50v-44h50v44h46v42h74" />
            <text x="470" y="100" fill="#334155" fontSize="15">1</text>
            <text x="470" y="165" fill="#334155" fontSize="15">segment length 1/3</text>
            <text x="470" y="255" fill="#334155" fontSize="15">segment length 1/9</text>
          </>
        ) : null}
        {config.kind === "piecewise" ? (
          <>
            <path d="M160 280V80M90 180h360M160 110h-90M160 250h120" />
            <path d="M160 80l-8 14M160 80l8 14M450 180l-14-8M450 180l-14 8" />
            <text x="178" y="116" fill="#334155" fontSize="16">f(x)=1 for x&lt;0</text>
            <text x="286" y="256" fill="#334155" fontSize="16">f(x)=-1 for x&gt;0</text>
          </>
        ) : null}
        {config.kind === "stick" ? (
          <>
            <path d="M90 165h500" />
            <path d="M90 150v30M590 150v30M255 138v54M410 138v54" />
            <text x="84" y="206" fill="#334155" fontSize="16">0</text>
            <text x="585" y="206" fill="#334155" fontSize="16">1</text>
            <text x="245" y="126" fill="#334155" fontSize="16">b1</text>
            <text x="400" y="126" fill="#334155" fontSize="16">b2</text>
          </>
        ) : null}
        {config.kind === "circle" ? (
          <>
            <circle cx="265" cy="185" r="92" />
            {["P","Q","R","S","T","U","V","W"].map((label, index) => {
              const angle = -90 + index * 45;
              const x = 265 + 118 * Math.cos((angle * Math.PI) / 180);
              const y = 185 + 118 * Math.sin((angle * Math.PI) / 180);
              return <text key={label} x={x} y={y} fill="#0f172a" fontSize="17" fontWeight="900" textAnchor="middle">{label}</text>;
            })}
            <path d="M340 105c42 34 52 96 20 142" />
            <path d="M365 247l-16-2l10-13" />
          </>
        ) : null}
        {config.kind === "saturating" ? (
          <>
            <path d="M120 280V80M120 280h420" />
            <path d="M140 265C210 130 320 102 520 98" stroke="#154a96" strokeWidth="4" />
            <path d="M520 98h42" stroke="#94a3b8" strokeDasharray="8 7" />
            <text x="82" y="84" fill="#334155" fontSize="16">C</text>
            <text x="548" y="302" fill="#334155" fontSize="16">W</text>
          </>
        ) : null}
        {config.kind === "nyquist" || config.kind === "root" ? (
          <>
            <path d="M130 185h420M340 300V70" />
            <circle cx="340" cy="185" r="95" stroke="#94a3b8" strokeDasharray="8 7" />
            <path d={config.kind === "nyquist" ? "M430 85C250 68 206 300 412 286C510 276 520 112 430 85Z" : "M230 185C290 105 400 105 460 185C400 265 290 265 230 185Z"} stroke="#154a96" strokeWidth="4" />
            <text x="228" y="176" fill="#0f172a" fontSize="17" fontWeight="900">Q</text>
            <text x="280" y="252" fill="#0f172a" fontSize="17" fontWeight="900">S</text>
            <text x="238" y="96" fill="#0f172a" fontSize="17" fontWeight="900">P</text>
            <text x="446" y="178" fill="#0f172a" fontSize="17" fontWeight="900">R</text>
          </>
        ) : null}
        {["blocks", "adder"].includes(config.kind) ? (
          <>
            <rect x="140" y="125" width="120" height="70" fill="#fff" />
            <rect x="330" y="125" width="120" height="70" fill="#fff" />
            <path d="M60 160h80M260 160h70M450 160h110" />
            <circle cx="295" cy="160" r="22" fill="#fff" />
            <text x="174" y="168" fill="#0f172a" fontSize="16" fontWeight="900">{config.kind === "adder" ? "Full" : "h1[n]"}</text>
            <text x="362" y="168" fill="#0f172a" fontSize="16" fontWeight="900">{config.kind === "adder" ? "XOR" : "h2[n]"}</text>
            <text x="66" y="148" fill="#334155" fontSize="15">{config.kind === "adder" ? "X,Y,Z" : "x[n]"}</text>
            <text x="568" y="166" fill="#334155" fontSize="15">{config.kind === "adder" ? "F" : "y[n]"}</text>
          </>
        ) : null}
        {["network", "parallel", "bjt-small", "bjt-bias", "filter", "dac", "rlc-meter", "twoport", "mos"].includes(config.kind) ? (
          <>
            <path d="M120 110h420M120 260h420" />
            <VoltageSource x={120} y={185} label={config.kind === "parallel" ? "1∠90° V" : "Vs"} />
            <Resistor x={190} y={110} label={config.kind === "network" ? "2Ω" : config.kind === "twoport" ? "2Ω" : "R"} />
            <Resistor x={330} y={110} label={config.kind === "twoport" ? "2Ω" : config.kind === "rlc-meter" ? "5Ω" : config.kind === "dac" ? "R/2R/4R/8R" : "2R"} />
            <VerticalResistor x={290} y={110} label={config.kind === "parallel" ? "j0.25S" : config.kind === "mos" ? "M1" : "2Ω"} />
            <VerticalResistor x={430} y={110} label={config.kind === "parallel" ? "-j0.1S" : config.kind === "mos" ? "M2" : config.kind === "bjt-bias" ? "3kΩ" : "2Ω"} />
            <path d="M540 110v150" />
            <text x="565" y="185" fill="#334155" fontSize="16" fontWeight="900">{config.kind === "filter" ? "op-amp filter" : config.kind === "dac" ? "op-amp DAC" : config.kind === "mos" ? "tail 2mA" : "output"}</text>
          </>
        ) : null}
      </g>
      <g fill="#334155" fontSize="14" fontWeight="700">
        {notes.map((note, index) => (
          <text key={note} x="34" y={302 + index * 22}>{note}</text>
        ))}
      </g>
    </svg>
  );
}

function QuestionImageDiagram({ src, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className || "h-auto max-h-[420px] w-auto max-w-full rounded-lg border border-slate-200 bg-white object-contain"}
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
  const libraryDiagram = circuitDiagramLibrary[diagram];

  if (typeof libraryDiagram === "function") {
    const LibraryDiagram = libraryDiagram;
    return <LibraryDiagram question={question} />;
  }

  if (libraryDiagram?.src) {
    return (
      <QuestionImageDiagram
        src={libraryDiagram.src}
        alt={libraryDiagram.alt || `${question?.exam?.join(" ") || "Question"} diagram`}
        className={libraryDiagram.className}
      />
    );
  }

  if (diagram === "bel-dec-2023-q17-circuit") {
    return <BelMaximumPowerCircuit />;
  }

  if (diagram === "bel-dec-2023-q19-circuit") {
    return <BelTheveninDependentSourceCircuit />;
  }

  if (diagram === "bel-may-2025-q1044-sfg") {
    return <BelSignalFlowGraphDiagram />;
  }

  if (diagram === "gate-2025-q45-sequential") {
    return <Gate2025SequentialCircuitDiagram />;
  }

  if (diagram === "gate-2025-q47-bjt-bias") {
    return <Gate2025BjtBiasDiagram />;
  }

  if (diagram === "gate-2025-q49-charge-sheet") {
    return <Gate2025ChargeSheetDiagram />;
  }

  if (diagram === "gate-2025-q56-block-sfg") {
    return <Gate2025BlockSignalFlowDiagram />;
  }

  if (diagram === "gate-2025-q56-option-a") {
    return <Gate2025Q56OptionDiagram variant="a" />;
  }

  if (diagram === "gate-2025-q56-option-b") {
    return <Gate2025Q56OptionDiagram variant="b" />;
  }

  if (diagram === "gate-2025-q56-option-c") {
    return <Gate2025Q56OptionDiagram variant="c" />;
  }

  if (diagram === "gate-2025-q56-option-d") {
    return <Gate2025Q56OptionDiagram variant="d" />;
  }

  if (diagram === "gate-2025-q57-diode-bridge") {
    return <Gate2025DiodeBridgeDiagram />;
  }

  if (diagram === "gate-2025-q61-diode-bias") {
    return <Gate2025DiodeBiasDiagram />;
  }

  if (diagram === "gate-2025-q62-setup-timing") {
    return <Gate2025SetupTimingDiagram />;
  }

  if (diagram === "gate-2025-q65-induced-loop") {
    return <Gate2025InducedLoopDiagram />;
  }

  if (diagram.startsWith("gate-2025-")) {
    return <Gate2025GenericFigure diagram={diagram} />;
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
