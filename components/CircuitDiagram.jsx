function OpAmpDifferentiatorDiagram() {
  return (
    <svg viewBox="0 0 520 220" className="h-auto w-full" role="img" aria-label="Op-amp differentiator circuit">
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
    <svg viewBox="0 0 520 220" className="h-auto w-full" role="img" aria-label="Series RLC circuit">
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

export default function CircuitDiagram({ question }) {
  const topic = (question?.topic || "").toLowerCase();
  const text = `${question?.question || ""} ${topic}`.toLowerCase();

  if (text.includes("differentiator") || text.includes("op-amp")) {
    return <OpAmpDifferentiatorDiagram />;
  }

  if (text.includes("rlc") || text.includes("resonance")) {
    return <SeriesRlcDiagram />;
  }

  return null;
}
