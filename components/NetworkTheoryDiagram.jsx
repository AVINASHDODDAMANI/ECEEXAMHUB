function DiagramFrame({ children, label }) {
  return (
    <svg viewBox="0 0 560 260" className="mx-auto h-auto w-[640px] max-w-none md:w-[82%] md:max-w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

function BasicCircuitDiagram() {
  return (
    <DiagramFrame label="Basic source and resistor circuit for voltage current and power">
      <defs>
        <filter id="basic-current-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="basic-resistor-glow" x="-30%" y="-80%" width="160%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="basic-voltage-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.25" />
        </linearGradient>
        <marker
          id="basic-current-arrow"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0 0 10 5 0 10Z" fill="#154a96" />
        </marker>
        <marker
          id="basic-voltage-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0 0 8 4 0 8Z" fill="#64748b" />
        </marker>
      </defs>

      <style>{`
        .basic-wire {
          fill: none;
          stroke: #111827;
          stroke-width: 3.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .basic-current-dot {
          fill: #1d4ed8;
          filter: url(#basic-current-glow);
        }

        .basic-resistor-energy {
          stroke: url(#basic-voltage-gradient);
          stroke-width: 6;
          stroke-linecap: round;
          opacity: 0.42;
          filter: url(#basic-resistor-glow);
          animation: basicResistorPulse 1.8s ease-in-out infinite;
        }

        .basic-drop-line {
          stroke: url(#basic-voltage-gradient);
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-dasharray: 7 8;
          animation: basicVoltageDrop 4.8s linear infinite;
        }

        .basic-arrow-slide {
          animation: basicArrowSlide 1.2s ease-out both;
        }

        .basic-fade-label {
          opacity: 0;
          animation: basicFadeIn 0.8s ease-out forwards;
        }

        .basic-fade-label.delay-one {
          animation-delay: 0.35s;
        }

        .basic-fade-label.delay-two {
          animation-delay: 0.75s;
        }

        @keyframes basicResistorPulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.6; }
        }

        @keyframes basicVoltageDrop {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -32; }
        }

        @keyframes basicArrowSlide {
          from { transform: translateX(-28px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes basicFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <path id="basic-current-path" d="M86 112V88H192H278H326V202H86V152" fill="none" />

      <path className="basic-wire" d="M86 152V202H326V88H278" />
      <path className="basic-wire" d="M192 88H86V112" />

      <circle cx="86" cy="132" r="20" fill="#ffffff" stroke="#154a96" strokeWidth="3.5" />
      <path d="M86 116v10M86 139v10M76 126h20" stroke="#154a96" strokeWidth="2.8" strokeLinecap="round" />
      <text x="48" y="136" fill="#154a96" fontSize="16" fontWeight="700">Vs</text>
      <text x="102" y="104" fill="#154a96" fontSize="15" fontWeight="800">+</text>
      <text x="103" y="167" fill="#64748b" fontSize="17" fontWeight="800">-</text>

      <path
        className="basic-resistor-energy"
        d="M192 88h12l8-15 16 30 16-30 16 30 16-30 8 15h12"
        fill="none"
      />
      <path
        d="M192 88h12l8-15 16 30 16-30 16 30 16-30 8 15h12"
        fill="none"
        stroke="#1e293b"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="235" y="58" fill="#0f172a" fontSize="16" fontWeight="800">R</text>

      <g className="basic-arrow-slide">
        <path
          d="M158 43H286"
          stroke="#154a96"
          strokeWidth="2.7"
          strokeLinecap="round"
          markerEnd="url(#basic-current-arrow)"
        />
        <text x="142" y="48" fill="#154a96" fontSize="16" fontWeight="800">I</text>
        <text x="198" y="30" fill="#475569" fontSize="12.5" fontWeight="700">clockwise current</text>
        <path
          d="M298 39c16 5 25 17 25 33"
          fill="none"
          stroke="#154a96"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path
          d="M323 72l-7-9m7 9l7-9"
          stroke="#154a96"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <circle className="basic-current-dot" r="4.5">
        <animateMotion dur="7s" repeatCount="indefinite" path="M86 112V88H192H278H326V202H86V152" />
      </circle>
      <circle className="basic-current-dot" r="4.5">
        <animateMotion
          dur="7s"
          begin="-2.33s"
          repeatCount="indefinite"
          path="M86 112V88H192H278H326V202H86V152"
        />
      </circle>
      <circle className="basic-current-dot" r="4.5">
        <animateMotion
          dur="7s"
          begin="-4.66s"
          repeatCount="indefinite"
          path="M86 112V88H192H278H326V202H86V152"
        />
      </circle>

      <circle cx="62" cy="229" r="4.5" fill="#1d4ed8" filter="url(#basic-current-glow)" />
      <text x="74" y="233" fill="#475569" fontSize="12" fontWeight="700">
        moving blue dots show current
      </text>

      <path
        className="basic-drop-line"
        d="M196 124h96"
      />
      <text x="194" y="145" fill="#154a96" fontSize="14" fontWeight="800">+</text>
      <text x="286" y="145" fill="#64748b" fontSize="16" fontWeight="800">-</text>
      <text x="214" y="147" fill="#64748b" fontSize="11.5" fontWeight="700">voltage drop</text>

      <g className="basic-fade-label delay-one">
        <text x="382" y="72" fill="#0f172a" fontSize="15" fontWeight="700">Ohm's law</text>
        <text x="382" y="98" fill="#154a96" fontSize="20" fontWeight="800">V = IR</text>
      </g>
      <g className="basic-fade-label delay-two">
        <text x="382" y="140" fill="#0f172a" fontSize="15" fontWeight="700">Power absorbed</text>
        <text x="382" y="166" fill="#154a96" fontSize="20" fontWeight="800">P = VI</text>
      </g>
      <path d="M368 44V214" stroke="#e2e8f0" strokeWidth="2" />
      <text x="382" y="196" fill="#64748b" fontSize="12.5" fontWeight="600">
        Current enters the + side,
      </text>
      <text x="382" y="214" fill="#64748b" fontSize="12.5" fontWeight="600">
        so the resistor absorbs power.
      </text>
    </DiagramFrame>
  );
}

function KirchhoffDiagram() {
  return (
    <DiagramFrame label="Kirchhoff current law and voltage law circuit diagram">
      <circle cx="180" cy="122" r="8" fill="#154a96" />
      <path d="M180 56v58M180 130v72M112 122h60M188 122h88" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M180 56l-8 12m8-12l8 12" stroke="#154a96" strokeWidth="3" strokeLinecap="round" />
      <path d="M112 122l12-8m-12 8l12 8" stroke="#154a96" strokeWidth="3" strokeLinecap="round" />
      <path d="M268 122l-12-8m12 8l-12 8" stroke="#154a96" strokeWidth="3" strokeLinecap="round" />
      <path d="M180 202l-8-12m8 12l8-12" stroke="#154a96" strokeWidth="3" strokeLinecap="round" />
      <text x="160" y="44" fill="#154a96" fontSize="15" fontWeight="700">I1</text>
      <text x="86" y="116" fill="#154a96" fontSize="15" fontWeight="700">I2</text>
      <text x="278" y="116" fill="#154a96" fontSize="15" fontWeight="700">I3</text>
      <text x="160" y="224" fill="#154a96" fontSize="15" fontWeight="700">I4</text>
      <text x="80" y="238" fill="#475569" fontSize="15" fontWeight="700">At a node: sum of currents entering = sum of currents leaving</text>

      <path d="M348 86h58" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M406 86h16m8-18v36m0-18h20m8-18v36m0-18h20" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M478 86h26v80H348V86" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="348" cy="126" r="24" fill="#ffffff" stroke="#154a96" strokeWidth="4" />
      <path d="M338 126c7-14 11 14 18 0s11 14 18 0" fill="none" stroke="#154a96" strokeWidth="2.5" strokeLinecap="round" />
      <text x="424" y="54" fill="#475569" fontSize="15" fontWeight="700">Loop with source and resistor</text>
      <text x="378" y="192" fill="#154a96" fontSize="15" fontWeight="700">Around a loop: sum of voltages = 0</text>
    </DiagramFrame>
  );
}

function NodalMeshDiagram() {
  return (
    <DiagramFrame label="Two loop circuit for nodal and mesh analysis">
      <path d="M92 82h110M92 82v108M92 190h110M202 82v108" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M202 82h108M202 190h108M310 82v108" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="92" cy="136" r="22" fill="#ffffff" stroke="#154a96" strokeWidth="4" />
      <path d="M84 124v24M100 124v24M77 136h30" stroke="#154a96" strokeWidth="3" strokeLinecap="round" />
      <path d="M136 82h16m8-18v36m0-18h18m8-18v36" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M248 82h16m8-18v36m0-18h18m8-18v36" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M202 116v16m-18 8h36m-18 8v16" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="144" y="50" fill="#475569" fontSize="14" fontWeight="700">R1</text>
      <text x="256" y="50" fill="#475569" fontSize="14" fontWeight="700">R2</text>
      <text x="226" y="138" fill="#475569" fontSize="14" fontWeight="700">R3</text>
      <path d="M146 124c-10 -16 26 -32 40 0" fill="none" stroke="#154a96" strokeWidth="3" />
      <path d="M258 124c-10 -16 26 -32 40 0" fill="none" stroke="#154a96" strokeWidth="3" />
      <text x="148" y="118" fill="#154a96" fontSize="14" fontWeight="700">I1</text>
      <text x="260" y="118" fill="#154a96" fontSize="14" fontWeight="700">I2</text>
      <circle cx="202" cy="82" r="6" fill="#154a96" />
      <circle cx="310" cy="82" r="6" fill="#154a96" />
      <text x="188" y="68" fill="#154a96" fontSize="14" fontWeight="700">V1</text>
      <text x="296" y="68" fill="#154a96" fontSize="14" fontWeight="700">V2</text>
      <text x="352" y="94" fill="#475569" fontSize="15" fontWeight="700">Nodal analysis uses node voltages</text>
      <text x="352" y="126" fill="#475569" fontSize="15" fontWeight="700">Mesh analysis uses loop currents</text>
      <text x="352" y="170" fill="#154a96" fontSize="15" fontWeight="700">Choose the method that gives fewer equations</text>
    </DiagramFrame>
  );
}

function TheveninDiagram() {
  return (
    <DiagramFrame label="Thevenin equivalent circuit diagram">
      <rect x="70" y="78" width="150" height="92" rx="18" fill="#ffffff" stroke="#154a96" strokeWidth="4" />
      <text x="98" y="118" fill="#154a96" fontSize="20" fontWeight="700">Original</text>
      <text x="92" y="144" fill="#154a96" fontSize="20" fontWeight="700">network</text>
      <path d="M220 106h50M220 142h50" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M270 106h38m0 0v36m0 0h-38" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="274" y="132" fill="#475569" fontSize="14" fontWeight="700">RL</text>
      <path d="M244 70h96" stroke="#154a96" strokeWidth="3" strokeLinecap="round" />
      <path d="M340 70l-14 -8m14 8l-14 8" stroke="#154a96" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="250" y="54" fill="#154a96" fontSize="15" fontWeight="700">Equivalent at the load terminals</text>

      <circle cx="394" cy="124" r="22" fill="#ffffff" stroke="#154a96" strokeWidth="4" />
      <path d="M386 112v24M402 112v24M379 124h30" stroke="#154a96" strokeWidth="3" strokeLinecap="round" />
      <text x="374" y="162" fill="#475569" fontSize="14" fontWeight="700">Vth</text>
      <path d="M416 124h52" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M468 124h16m8-18v36m0-18h18m8-18v36" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="486" y="92" fill="#475569" fontSize="14" fontWeight="700">Rth</text>
      <path d="M520 124h22v36h-70" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M472 160h16m0 0v-36m0 36h16m0 0v-36" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="486" y="206" fill="#475569" fontSize="14" fontWeight="700">RL</text>
      <text x="332" y="216" fill="#154a96" fontSize="15" fontWeight="700">The load sees the same external behavior after replacement</text>
    </DiagramFrame>
  );
}

function TwoPortDiagram() {
  return (
    <DiagramFrame label="Two port network diagram with input and output terminals">
      <path d="M90 82v96M120 82v96" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M440 82v96M470 82v96" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <rect x="172" y="64" width="216" height="132" rx="24" fill="#ffffff" stroke="#154a96" strokeWidth="4" />
      <text x="214" y="112" fill="#154a96" fontSize="22" fontWeight="700">Two-port</text>
      <text x="208" y="142" fill="#154a96" fontSize="22" fontWeight="700">network</text>
      <text x="222" y="172" fill="#475569" fontSize="16" fontWeight="700">Z  Y  h  ABCD</text>
      <path d="M120 108h52M388 108h52M120 152h52M388 152h52" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M122 96l14 -8m-14 8l14 8" stroke="#154a96" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M438 96l-14 -8m14 8l-14 8" stroke="#154a96" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="62" y="100" fill="#154a96" fontSize="14" fontWeight="700">I1</text>
      <text x="476" y="100" fill="#154a96" fontSize="14" fontWeight="700">I2</text>
      <text x="52" y="152" fill="#475569" fontSize="14" fontWeight="700">V1</text>
      <text x="476" y="152" fill="#475569" fontSize="14" fontWeight="700">V2</text>
      <text x="118" y="220" fill="#154a96" fontSize="15" fontWeight="700">Input variables are related to output variables by parameter sets</text>
    </DiagramFrame>
  );
}

function BridgeDiagram() {
  return (
    <DiagramFrame label="Bridge circuit and special network transformation diagram">
      <path d="M96 76l84 48-84 48M180 124h108M288 76l84 48-84 48" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M96 76h192M96 172h192" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M180 76v96M288 76v96" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="124" y="68" fill="#475569" fontSize="14" fontWeight="700">R1</text>
      <text x="124" y="186" fill="#475569" fontSize="14" fontWeight="700">R2</text>
      <text x="300" y="68" fill="#475569" fontSize="14" fontWeight="700">R3</text>
      <text x="300" y="186" fill="#475569" fontSize="14" fontWeight="700">R4</text>
      <text x="224" y="116" fill="#154a96" fontSize="14" fontWeight="700">Bridge branch</text>
      <text x="226" y="144" fill="#475569" fontSize="14" fontWeight="700">Rg</text>
      <text x="358" y="96" fill="#475569" fontSize="15" fontWeight="700">Check for balance, symmetry, or</text>
      <text x="358" y="126" fill="#475569" fontSize="15" fontWeight="700">transform the network before solving</text>
      <text x="358" y="176" fill="#154a96" fontSize="15" fontWeight="700">Special structure can simplify the whole circuit</text>
    </DiagramFrame>
  );
}

function GraphDiagram() {
  return (
    <DiagramFrame label="Graph theory view of a network with nodes branches and a tree">
      <circle cx="118" cy="74" r="8" fill="#154a96" />
      <circle cx="224" cy="74" r="8" fill="#154a96" />
      <circle cx="332" cy="74" r="8" fill="#154a96" />
      <circle cx="118" cy="176" r="8" fill="#154a96" />
      <circle cx="224" cy="176" r="8" fill="#154a96" />
      <circle cx="332" cy="176" r="8" fill="#154a96" />
      <path d="M118 74h106M224 74h108M118 176h106M224 176h108M118 74v102M224 74v102M332 74v102M118 74l106 102M224 74l108 102" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M118 74h106M224 74v102M224 176h108M118 74v102M118 176h106" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <text x="366" y="82" fill="#475569" fontSize="15" fontWeight="700">Green lines show one possible tree</text>
      <text x="366" y="112" fill="#475569" fontSize="15" fontWeight="700">Remaining branches act as links</text>
      <text x="366" y="154" fill="#154a96" fontSize="15" fontWeight="700">Nodes, branches, loops, and cut-sets</text>
      <text x="366" y="184" fill="#154a96" fontSize="15" fontWeight="700">describe structure before numerical solving</text>
      <text x="110" y="54" fill="#475569" fontSize="13" fontWeight="700">N1</text>
      <text x="216" y="54" fill="#475569" fontSize="13" fontWeight="700">N2</text>
      <text x="324" y="54" fill="#475569" fontSize="13" fontWeight="700">N3</text>
    </DiagramFrame>
  );
}

function ResonanceDiagram() {
  return (
    <DiagramFrame label="Series RLC resonance circuit diagram">
      <circle cx="82" cy="126" r="26" fill="#ffffff" stroke="#154a96" strokeWidth="4" />
      <path d="M72 126c8-18 14 18 22 0s14 18 22 0" fill="none" stroke="#154a96" strokeWidth="2.5" strokeLinecap="round" />
      <text x="50" y="176" fill="#475569" fontSize="14" fontWeight="700">AC source</text>
      <path d="M108 126h52" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M160 126h16m8-16v32m0-16h18m8-16v32m0-16h18" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="182" y="98" fill="#475569" fontSize="14" fontWeight="700">R</text>
      <path d="M228 126h34" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M262 126c10-22 22 22 32 0s22 22 32 0 22 22 32 0" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="304" y="98" fill="#475569" fontSize="14" fontWeight="700">L</text>
      <path d="M358 126h34" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M392 102v48M410 102v48M410 126h70" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="396" y="88" fill="#475569" fontSize="14" fontWeight="700">C</text>
      <path d="M480 126v56H82V152" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="180" y="214" fill="#154a96" fontSize="15" fontWeight="700">At resonance: XL = XC and the net reactance becomes zero</text>
      <text x="340" y="214" fill="#475569" fontSize="15" fontWeight="700">Z = R only</text>
    </DiagramFrame>
  );
}

function TransientDiagram() {
  return (
    <DiagramFrame label="RC transient charging circuit diagram">
      <circle cx="82" cy="138" r="24" fill="#ffffff" stroke="#154a96" strokeWidth="4" />
      <path d="M74 126v24M90 126v24M67 138h30" stroke="#154a96" strokeWidth="3" strokeLinecap="round" />
      <text x="60" y="182" fill="#475569" fontSize="14" fontWeight="700">V</text>
      <path d="M106 138h46" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M152 138h12l10-18 12 36 12-36 12 36 10-18h22" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="192" y="106" fill="#475569" fontSize="14" fontWeight="700">R</text>
      <path d="M242 138h50" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M292 114v48M310 114v48" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="294" y="102" fill="#475569" fontSize="14" fontWeight="700">C</text>
      <path d="M310 138h64v48H82" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M128 112h20m10 -10v20" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <text x="118" y="92" fill="#475569" fontSize="14" fontWeight="700">Switch at t = 0</text>
      <text x="330" y="124" fill="#154a96" fontSize="15" fontWeight="700">Vc(t)</text>
      <path d="M406 178c18-44 38-60 84-86" fill="none" stroke="#154a96" strokeWidth="3" strokeLinecap="round" />
      <text x="376" y="210" fill="#154a96" fontSize="15" fontWeight="700">Exponential rise with time constant tau = RC</text>
    </DiagramFrame>
  );
}

export default function NetworkTheoryDiagram({ type }) {
  if (type === "basic-circuit") {
    return <BasicCircuitDiagram />;
  }

  if (type === "kirchhoff") {
    return <KirchhoffDiagram />;
  }

  if (type === "nodal-mesh") {
    return <NodalMeshDiagram />;
  }

  if (type === "thevenin") {
    return <TheveninDiagram />;
  }

  if (type === "two-port") {
    return <TwoPortDiagram />;
  }

  if (type === "bridge") {
    return <BridgeDiagram />;
  }

  if (type === "graph") {
    return <GraphDiagram />;
  }

  if (type === "resonance") {
    return <ResonanceDiagram />;
  }

  if (type === "transient") {
    return <TransientDiagram />;
  }

  return null;
}
