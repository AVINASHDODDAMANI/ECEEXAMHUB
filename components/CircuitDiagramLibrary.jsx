/*
  Add circuit diagram images in this file.

  Put image files inside:
  public/circuits/

  Then add one entry below:
  "diode-bridge": {
    src: "/circuits/diode-bridge.png",
    alt: "Diode bridge circuit",
  },

  Use the id anywhere as:
  diagram: "diode-bridge"

  SVG/React diagrams are still supported if needed, but direct images are the
  simplest option.
*/

function ExampleCircuitDiagram() {
  return (
    <svg
      viewBox="0 0 520 220"
      className="h-auto w-full"
      role="img"
      aria-label="Example circuit diagram"
    >
      <rect width="520" height="220" rx="12" fill="#ffffff" />
      <g stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M80 110h110" />
        <path d="M190 110h14l8 -16l16 32l16 -32l16 32l16 -32l8 16h14" />
        <path d="M298 110h110" />
        <path d="M408 110v70H80V110" />
      </g>
      <g fill="#111111" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700">
        <text x="224" y="82">R</text>
        <text x="70" y="95">+</text>
        <text x="70" y="184">-</text>
        <text x="30" y="146">V</text>
      </g>
    </svg>
  );
}

function Gate2025Q57DiodeBridgeImages() {
  return (
    <img
      src="/circuits/image.png"
      alt="GATE 2025 Q57 ideal diode bridge circuit"
      className="h-auto max-h-[360px] w-auto max-w-full rounded-lg border border-slate-200 bg-white object-contain"
    />
  );
}

function Gate2025Q57PlotOption({ src, label }) {
  return (
    <img
      src={src}
      alt={`GATE 2025 Q57 plot option ${label}`}
      className="h-auto max-h-[180px] w-full max-w-[520px] rounded-md border border-slate-200 bg-white object-contain"
    />
  );
}

export const circuitDiagramLibrary = {
  /*
  "diode-bridge": {
    src: "/circuits/diode-bridge.png",
    alt: "Diode bridge circuit",
  },
  */
  "gate-2025-q57-diode-bridge": Gate2025Q57DiodeBridgeImages,
  "gate-2025-q57-option-a": () => <Gate2025Q57PlotOption src="/circuits/image1.png?v=q57-a-20260601" label="A" />,
  "gate-2025-q57-option-b": () => <Gate2025Q57PlotOption src="/circuits/image2.png?v=q57-b-20260601" label="B" />,
  "gate-2025-q57-option-c": () => <Gate2025Q57PlotOption src="/circuits/image3.png?v=q57-c-20260601" label="C" />,
  "gate-2025-q57-option-d": () => <Gate2025Q57PlotOption src="/circuits/image4.png?v=q57-d-20260601" label="D" />,
  "gate-2025-q61-diode-bias": {
    src: "/circuits/image61.png?v=q61-20260601",
    alt: "GATE 2025 Q61 ideal diode circuit",
    className: "h-auto max-h-[420px] w-[70%] max-w-full rounded-lg border border-slate-200 bg-white object-contain",
  },
  "gate-2025-q62-setup-timing": {
    src: "/circuits/image62.png?v=q62-updated-20260601",
    alt: "GATE 2025 Q62 sequential circuit timing diagram",
    className: "h-auto max-h-[420px] w-[70%] max-w-full rounded-lg border border-slate-200 bg-white object-contain",
  },
  "example-circuit": ExampleCircuitDiagram,
};
