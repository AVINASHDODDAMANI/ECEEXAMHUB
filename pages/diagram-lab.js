import { useEffect, useMemo, useRef, useState } from "react";
import Layout from "../components/layout";

const examples = [
  {
    label: "Circuit Flow",
    value: `flowchart LR
  A[Voltage Source] --> B[Switch]
  B --> C[Resistor]
  C --> D[Ground]
  C --> E[Voltage Drop]
  E --> F[Power Dissipation]`,
  },
  {
    label: "Signal Chain",
    value: `flowchart LR
  S[Sensor Input] --> A[Amplifier]
  A --> F[Filter]
  F --> ADC[ADC]
  ADC --> MCU[Microcontroller]
  MCU --> O[Display / Control Output]`,
  },
  {
    label: "Control Loop",
    value: `flowchart LR
  R[Reference] --> E((Error))
  E --> C[Controller]
  C --> P[Plant / System]
  P --> Y[Output]
  Y --> H[Feedback Sensor]
  H --> E`,
  },
  {
    label: "Timing Steps",
    value: `sequenceDiagram
  participant CPU
  participant Memory
  participant IO
  CPU->>Memory: Fetch instruction
  Memory-->>CPU: Send opcode
  CPU->>CPU: Decode
  CPU->>IO: Execute output command`,
  },
  {
    label: "State Machine",
    value: `stateDiagram-v2
  [*] --> Idle
  Idle --> Sampling: start
  Sampling --> Processing: data ready
  Processing --> Display: result computed
  Display --> Idle: reset`,
  },
];

const defaultDiagram = examples[0].value;

function HelpCard({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-bold text-slate-950">{title}</h2>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DiagramLabPage() {
  const [diagramText, setDiagramText] = useState(defaultDiagram);
  const [renderedSvg, setRenderedSvg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const renderIdRef = useRef(0);

  const selectedExample = useMemo(
    () => examples.find((example) => example.value === diagramText)?.label || "Custom",
    [diagramText]
  );

  useEffect(() => {
    let isCancelled = false;

    async function renderDiagram() {
      const mermaid = (await import("mermaid")).default;
      const renderId = `diagram-lab-${Date.now()}-${renderIdRef.current++}`;

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        themeVariables: {
          primaryColor: "#eff6ff",
          primaryBorderColor: "#2563eb",
          primaryTextColor: "#0f172a",
          lineColor: "#154a96",
          secondaryColor: "#ecfdf5",
          tertiaryColor: "#fff7ed",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        },
      });

      try {
        const { svg } = await mermaid.render(renderId, diagramText);

        if (!isCancelled) {
          setRenderedSvg(svg);
          setErrorMessage("");
        }
      } catch (error) {
        if (!isCancelled) {
          setRenderedSvg("");
          setErrorMessage(error?.message || "Could not render this diagram text.");
        }
      }
    }

    renderDiagram();

    return () => {
      isCancelled = true;
    };
  }, [diagramText]);

  return (
    <Layout
      title="AI Diagram Lab | ECE Exam Guide"
      description="Convert technical text into visual flowcharts, signal chains, control loops, sequence diagrams, and state diagrams."
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1440px] pb-20">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 pt-1 text-sm text-slate-500">
          <a href="/" className="font-medium text-slate-600 transition hover:text-portal-700">
            Home
          </a>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-portal-700">AI Diagram Lab</span>
        </nav>

        <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Text to Technical Visualization
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            AI Diagram Lab
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Type a technical diagram description using Mermaid syntax and turn it
            into a clean visual. Use it for ECE block diagrams, circuit flows,
            control loops, signal chains, sequence diagrams, and state machines.
          </p>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  Diagram Text
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Current mode: {selectedExample}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDiagramText(defaultDiagram)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Reset
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {examples.map((example) => (
                <button
                  key={example.label}
                  type="button"
                  onClick={() => setDiagramText(example.value)}
                  className="rounded-full border border-portal-200 bg-portal-50 px-3 py-1.5 text-xs font-bold text-portal-700 transition hover:bg-white"
                >
                  {example.label}
                </button>
              ))}
            </div>

            <textarea
              value={diagramText}
              onChange={(event) => setDiagramText(event.target.value)}
              spellCheck={false}
              className="mt-4 min-h-[420px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-sm leading-6 text-blue-50 outline-none transition focus:border-portal-300 focus:ring-4 focus:ring-portal-100"
            />
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  Visualization
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Renders live as you type
                </p>
              </div>
            </div>

            <div className="mt-4 min-h-[420px] overflow-auto rounded-2xl border border-slate-200 bg-[#f8fbff] p-4">
              {errorMessage ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-sm font-black text-rose-800">Diagram error</p>
                  <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-rose-700">
                    {errorMessage}
                  </pre>
                </div>
              ) : (
                <div
                  className="diagram-preview min-w-[560px] [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
                  dangerouslySetInnerHTML={{ __html: renderedSvg }}
                />
              )}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-3">
          <HelpCard
            title="What you can create"
            items={[
              "Flowcharts for circuit and signal flow.",
              "Sequence diagrams for processor or communication timing.",
              "State diagrams for FSM, embedded, and control logic.",
            ]}
          />
          <HelpCard
            title="Useful syntax"
            items={[
              "Use flowchart LR for left-to-right block diagrams.",
              "Use A[Block] --> B[Next Block] for connections.",
              "Use sequenceDiagram or stateDiagram-v2 for advanced visuals.",
            ]}
          />
          <HelpCard
            title="Best ECE use cases"
            items={[
              "Control-system loops and feedback paths.",
              "ADC, DSP, microcontroller, and output chains.",
              "Network theorem steps and troubleshooting workflows.",
            ]}
          />
        </section>
      </div>
    </Layout>
  );
}
