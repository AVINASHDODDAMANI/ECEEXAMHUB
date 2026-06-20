import Link from "next/link";
import { useMemo, useState } from "react";
import type { GameModeId } from "../../types/ece-iq";

type Gate = "AND" | "OR" | "NAND" | "XOR";
type Wire = "a" | "b" | "out";

interface Props {
  mode: GameModeId;
  onClose: () => void;
  onComplete: (correct: boolean, reward: { xp: number; coins: number; rating: number }) => void;
}

const gates: Gate[] = ["AND", "OR", "NAND", "XOR"];

function GateShape({ gate }: { gate: Gate }) {
  return (
    <div className="grid h-20 w-28 place-items-center rounded-r-full border-2 border-violet-300 bg-violet-400/10 text-sm font-black text-violet-100 shadow-[0_0_28px_rgba(167,139,250,.12)]">
      {gate}
    </div>
  );
}

function BuilderMission({ onClose, onComplete }: Omit<Props, "mode">) {
  const [gate, setGate] = useState<Gate | null>(null);
  const [wires, setWires] = useState<Wire[]>([]);
  const [switches, setSwitches] = useState<[boolean, boolean]>([false, false]);
  const [feedback, setFeedback] = useState("");
  const [verified, setVerified] = useState(false);
  const connected = (wire: Wire) => wires.includes(wire);
  const gateOutput = gate === "AND" ? switches[0] && switches[1] : gate === "OR" ? switches[0] || switches[1] : gate === "NAND" ? !(switches[0] && switches[1]) : gate === "XOR" ? switches[0] !== switches[1] : false;
  const ledOn = connected("a") && connected("b") && connected("out") && gateOutput;

  function addWire(wire: Wire) {
    if (!gate) return setFeedback("Place a gate on the workbench first.");
    setWires(current => current.includes(wire) ? current.filter(item => item !== wire) : [...current, wire]);
    setFeedback("");
  }

  function validate() {
    if (!gate) return setFeedback("No logic gate detected. Drag the AND gate into the workbench.");
    if (wires.length < 3) return setFeedback(`Open circuit: ${3 - wires.length} connection${3 - wires.length === 1 ? "" : "s"} missing.`);
    if (gate !== "AND") return setFeedback(`${gate} responds incorrectly for this specification. Compare its truth table with “both switches ON”.`);
    if (verified) return;
    setVerified(true);
    setFeedback("Design verified across all four input states. The 220 Ω resistor limits LED current to a safe value. Minimal logic: one AND gate.");
    onComplete(true, { xp: 280, coins: 45, rating: 24 });
  }

  return (
    <MissionFrame title="Build Lab 01" subtitle="Coincidence detector" onClose={onClose}>
      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
        <p className="text-[10px] font-black uppercase tracking-[.18em] text-amber-300">Engineering brief</p>
        <p className="mt-1 text-sm font-bold leading-6 text-white">Design a circuit that lights the LED only when both switches are ON.</p>
      </div>
      <TopicLinks links={[{label:"Logic gates",href:"/logic-gates-and-boolean-algebra"},{label:"Combinational circuits",href:"/combinational-circuits"},{label:"Karnaugh maps",href:"/karnaugh-map"}]}/>

      <div className="mt-4 grid gap-4 lg:grid-cols-[150px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-black/20 p-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">Component bay</p>
          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {gates.map(item => <button key={item} draggable onDragStart={event => event.dataTransfer.setData("gate", item)} onClick={() => { setGate(item); setWires([]); }} className={`rounded-xl border px-3 py-2 text-left text-xs font-black transition ${gate === item ? "border-violet-400 bg-violet-400/15 text-violet-200" : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/30"}`}><span className="mr-2 text-slate-600">⠿</span>{item}</button>)}
          </div>
          <p className="mt-3 text-[10px] leading-4 text-slate-500">Drag or tap a gate to place it.</p>
        </aside>

        <div onDragOver={event => event.preventDefault()} onDrop={event => { const item = event.dataTransfer.getData("gate") as Gate; if (gates.includes(item)) { setGate(item); setWires([]); } }} className="overflow-x-auto rounded-2xl border border-cyan-400/20 bg-[#07101f]">
          <svg className="h-auto min-h-[360px] min-w-[720px] w-full" viewBox="0 0 760 360" role="img" aria-label="Interactive logic circuit schematic">
            <defs>
              <pattern id="builder-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#164e63" strokeOpacity=".22"/></pattern>
              <filter id="led-glow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <rect width="760" height="360" fill="url(#builder-grid)"/>
            <path d="M38 38H722 M38 38V265" stroke="#164e63" strokeWidth="2"/><circle cx="38" cy="145" r="4" fill="#22d3ee"/><circle cx="38" cy="265" r="4" fill="#22d3ee"/><text x="42" y="28" fill="#22d3ee" fontSize="11" fontWeight="800">+5 V LOGIC SUPPLY</text>
            <path d="M38 322H722" stroke="#334155" strokeWidth="2"/><text x="42" y="343" fill="#64748b" fontSize="10" fontWeight="700">0 V REFERENCE / GROUND</text>

            {[0,1].map(index => { const y=index===0?120:240; const active=switches[index]; return <g key={index} role="button" tabIndex={0} aria-label={`Toggle switch ${index===0?"A":"B"}, currently ${active?"on":"off"}`} onClick={() => setSwitches(value => value.map((item,i)=>i===index?!item:item) as [boolean,boolean])} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();setSwitches(value=>value.map((item,i)=>i===index?!item:item) as [boolean,boolean]);}}} className="cursor-pointer">
              <rect x="50" y={y-42} width="150" height="84" rx="15" fill={active?"#083344":"#0f172a"} stroke={active?"#22d3ee":"#475569"} strokeWidth="2"/>
              <text x="70" y={y-14} fill="#e2e8f0" fontSize="12" fontWeight="900">SWITCH {index===0?"A":"B"}</text><text x="70" y={y+9} fill={active?"#67e8f9":"#94a3b8"} fontSize="10" fontWeight="800">{active?"CLOSED · ON":"OPEN · OFF"}</text>
              <circle cx="108" cy={y+25} r="5" fill="#22d3ee"/><circle cx="174" cy={y+25} r="5" fill="#22d3ee"/><path d={active?`M108 ${y+25}H174`:`M108 ${y+25}L168 ${y+3}`} stroke={active?"#67e8f9":"#94a3b8"} strokeWidth="4" strokeLinecap="round"/>
              <path d={`M38 ${y+25}H108 M174 ${y+25}H220`} stroke="#22d3ee" strokeWidth="3"/>
            </g>})}

            {gate ? <g>
              {connected("a") ? <path d="M220 145 C275 145 300 140 360 140" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"/> : <path d="M220 145H345" stroke="#334155" strokeWidth="3" strokeDasharray="7 7"/>}
              {connected("b") ? <path d="M220 265 C275 265 300 220 360 220" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"/> : <path d="M220 265 C275 265 300 220 345 220" fill="none" stroke="#334155" strokeWidth="3" strokeDasharray="7 7"/>}
              {gate==="AND"||gate==="NAND"?<path d="M360 105H410A75 75 0 0 1 410 255H360Z" fill="#17152f" stroke="#a78bfa" strokeWidth="3"/>:<><path d="M360 105Q390 180 360 255H410Q490 180 410 105Z" fill="#17152f" stroke="#a78bfa" strokeWidth="3"/>{gate==="XOR"?<path d="M348 105Q378 180 348 255" fill="none" stroke="#a78bfa" strokeWidth="3"/>:null}</>}
              <text x="402" y="184" textAnchor="middle" fill="#f5f3ff" fontSize="16" fontWeight="900">{gate}</text>
              <circle onClick={()=>addWire("a")} className="cursor-pointer" cx="360" cy="140" r="11" fill={connected("a")?"#22d3ee":"#1e293b"} stroke={connected("a")?"#a5f3fc":"#94a3b8"} strokeWidth="3"/><circle onClick={()=>addWire("b")} className="cursor-pointer" cx="360" cy="220" r="11" fill={connected("b")?"#22d3ee":"#1e293b"} stroke={connected("b")?"#a5f3fc":"#94a3b8"} strokeWidth="3"/>
              {gate==="NAND"?<circle cx="485" cy="180" r="10" fill="#0f172a" stroke="#a78bfa" strokeWidth="3"/>:null}<path d={`M${gate==="NAND"?495:480} 180H500`} stroke="#a78bfa" strokeWidth="3"/>
              <circle onClick={()=>addWire("out")} className="cursor-pointer" cx="500" cy="180" r="11" fill={connected("out")?"#8b5cf6":"#1e293b"} stroke={connected("out")?"#ddd6fe":"#94a3b8"} strokeWidth="3"/>
              <text x="360" y="285" textAnchor="middle" fill="#64748b" fontSize="10">Tap each round terminal to connect or disconnect</text>
            </g>:<g><rect x="335" y="105" width="165" height="150" rx="22" fill="#0f172a" stroke="#475569" strokeWidth="2" strokeDasharray="8 7"/><text x="417" y="172" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="800">DROP LOGIC GATE</text><text x="417" y="194" textAnchor="middle" fill="#475569" fontSize="10">or select from component bay</text></g>}

            {connected("out")&&gate?<g><path d="M511 180H545" stroke={ledOn?"#fde047":"#8b5cf6"} strokeWidth="4"/><path d="M545 180l9-14 14 28 14-28 14 28 14-14H628" fill="none" stroke={ledOn?"#fde047":"#a78bfa"} strokeWidth="4" strokeLinejoin="round"/><text x="575" y="148" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="800">220 Ω · ¼ W</text><path d="M628 180H650" stroke={ledOn?"#fde047":"#8b5cf6"} strokeWidth="4"/></g>:<path d="M511 180H645" stroke="#334155" strokeWidth="3" strokeDasharray="7 7"/>}
            <g filter={ledOn?"url(#led-glow)":undefined}><circle cx="680" cy="180" r="30" fill={ledOn?"#fde047":"#111827"} stroke={ledOn?"#fef08a":"#475569"} strokeWidth="4"/><path d="M665 180H695M680 165V195" stroke={ledOn?"#854d0e":"#64748b"} strokeWidth="3"/><path d="M650 180H650M710 180V322" stroke={ledOn?"#fde047":"#475569"} strokeWidth="4"/></g>
            <path d="M698 145l12-12m-4 1h5v5M705 157l15-8m-5-1 5 2-2 5" stroke={ledOn?"#fde047":"#475569"} strokeWidth="2"/>
            <text x="680" y="225" textAnchor="middle" fill={ledOn?"#fde047":"#64748b"} fontSize="10" fontWeight="900">LED {ledOn?"ON":"OFF"}</text>
            <circle cx="710" cy="322" r="5" fill="#64748b"/>
          </svg>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1">{[[0,0,0],[0,1,0],[1,0,0],[1,1,1]].map(([a,b,y]) => <div key={`${a}${b}`} className={`rounded-lg border px-2 py-1.5 text-center text-[9px] font-black ${switches[0]===Boolean(a) && switches[1]===Boolean(b) ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-200" : "border-white/5 bg-black/15 text-slate-600"}`}>A {a} · B {b} → Y {y}</div>)}</div>
      <MissionFooter feedback={feedback} validated={verified} onReset={() => { setGate(null); setWires([]); setSwitches([false, false]); setFeedback(""); setVerified(false); }} onValidate={validate} />
    </MissionFrame>
  );
}

function FaultMission({ onClose, onComplete }: Omit<Props, "mode">) {
  const [selected, setSelected] = useState<string | null>(null);
  const [repaired, setRepaired] = useState(false);
  const [feedback, setFeedback] = useState("");
  const parts = useMemo(() => [{ id: "supply", label: "5 V SUPPLY", x: "left-4 top-[112px]" }, { id: "resistor", label: "330 Ω", x: "left-[30%] top-[104px]" }, { id: "led", label: "LED", x: "right-[26%] top-[96px]" }, { id: "ground", label: "GROUND", x: "right-4 top-[112px]" }], []);
  function inspect(id: string) { setSelected(id); setFeedback(id === "led" ? "Anomaly detected: LED cathode is facing the positive rail." : `${parts.find(part => part.id === id)?.label} passes continuity and voltage checks.`); }
  function repair() { if (selected !== "led") return setFeedback("Select the faulty component before authorizing repair."); setRepaired(true); setFeedback("Repair successful. LED polarity corrected; current path restored."); window.setTimeout(() => onComplete(true, { xp: 240, coins: 36, rating: 18 }), 650); }
  return <MissionFrame title="Fault Lab 01" subtitle="Satellite beacon offline" onClose={onClose}>
    <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4"><p className="text-[10px] font-black uppercase tracking-[.18em] text-rose-300">Live alert</p><p className="mt-1 text-sm font-bold leading-6 text-white">Telemetry beacon has power, but its status LED is dark. Inspect the circuit and isolate the fault.</p></div><TopicLinks links={[{label:"Diodes and applications",href:"/diodes-and-applications"},{label:"Circuit laws",href:"/circuit-laws"},{label:"Circuit elements",href:"/circuit-elements"}]}/>
    <div className="relative mt-4 min-h-[300px] overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#07101f] p-4"><svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 300" preserveAspectRatio="none"><path d="M80 150 H720" stroke="#334155" strokeWidth="5"/><path d="M80 150 H250 M350 150 H455 M555 150 H720" stroke="#22d3ee" strokeWidth="4"/><path d="M250 150 l18-25 30 50 30-50 22 25" fill="none" stroke="#a78bfa" strokeWidth="4"/><path d={repaired ? "M480 115 L530 150 L480 185 Z M535 110 V190" : "M540 115 L490 150 L540 185 Z M485 110 V190"} fill="none" stroke={repaired ? "#facc15" : "#fb7185"} strokeWidth="5"/></svg><div className="relative min-h-[260px]">{parts.map(part => <button key={part.id} onClick={() => inspect(part.id)} className={`absolute ${part.x} rounded-xl border px-3 py-2 text-[10px] font-black transition ${selected === part.id ? "border-cyan-300 bg-cyan-400/20 text-cyan-100" : "border-white/10 bg-[#111a30] text-slate-400 hover:border-cyan-400/30"}`}>{part.label}</button>)}</div></div>
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-5 text-slate-300">{feedback || "Select a component to run voltage and continuity diagnostics."}</p><button onClick={repair} className="flex-none rounded-xl bg-gradient-to-r from-rose-400 to-orange-400 px-5 py-2.5 text-xs font-black text-slate-950">Repair component</button></div>
  </MissionFrame>;
}

function SignalMission({ onClose, onComplete }: Omit<Props, "mode">) {
  const [amplitude, setAmplitude] = useState(2);
  const [frequency, setFrequency] = useState(1);
  const [feedback, setFeedback] = useState("");
  const points = Array.from({ length: 81 }, (_, i) => `${i * 5},${90 - Math.sin(i / 8 * frequency) * amplitude * 14}`).join(" ");
  function validate() {
    if (amplitude === 4 && frequency === 2) {
      setFeedback("Waveform locked: 4 V peak at 2 kHz. Sampling margin and dynamic range are both valid.");
      window.setTimeout(() => onComplete(true, { xp: 230, coins: 32, rating: 17 }), 900);
    } else setFeedback(`Analyzer mismatch: target is 4 V / 2 kHz; measured ${amplitude} V / ${frequency} kHz.`);
  }
  return <MissionFrame title="Signal Lab 01" subtitle="Telemetry carrier recovery" onClose={onClose}>
    <Brief tone="blue" label="Live telemetry" text="Recover the corrupted carrier. Tune the signal generator to 4 V peak amplitude and 2 kHz frequency." /><TopicLinks links={[{label:"Introduction to signals",href:"/introduction-to-signals"},{label:"Signal properties",href:"/systems-and-their-properties"},{label:"Frequency-domain analysis",href:"/frequency-domain-analysis"}]}/>
    <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_280px]"><div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-blue-400/20 bg-[#07101f] p-4"><div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(96,165,250,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,.1)_1px,transparent_1px)] [background-size:25px_25px]"/><svg viewBox="0 0 400 180" className="relative mt-10 w-full"><path d="M0 90H400M20 0V180" stroke="#334155"/><polyline points={points} fill="none" stroke="#60a5fa" strokeWidth="3"/><text x="28" y="20" fill="#94a3b8" fontSize="11">OSCILLOSCOPE CH-1</text></svg></div><div className="rounded-2xl border border-white/10 bg-black/20 p-5"><Control label="Amplitude" value={`${amplitude} V`} min={1} max={6} valueNumber={amplitude} onChange={setAmplitude}/><div className="mt-7"><Control label="Frequency" value={`${frequency} kHz`} min={1} max={5} valueNumber={frequency} onChange={setFrequency}/></div><div className="mt-7 grid grid-cols-2 gap-2"><Metric label="Target" value="4 V · 2 kHz"/><Metric label="Measured" value={`${amplitude} V · ${frequency} kHz`}/></div></div></div>
    <MissionFooter feedback={feedback} onReset={() => { setAmplitude(2); setFrequency(1); setFeedback(""); }} onValidate={validate}/>
  </MissionFrame>;
}

function NetworkMission({ onClose, onComplete }: Omit<Props, "mode">) {
  const correct = ["source", "resistor", "load", "ground"];
  const [path, setPath] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const nodes = [{id:"source",label:"12 V",x:"left-[8%] top-[45%]"},{id:"resistor",label:"R1",x:"left-[34%] top-[22%]"},{id:"capacitor",label:"C1",x:"left-[34%] bottom-[18%]"},{id:"load",label:"LOAD",x:"right-[25%] top-[45%]"},{id:"ground",label:"GND",x:"right-[6%] top-[45%]"}];
  function choose(id: string) { if (!path.includes(id)) setPath(items => [...items, id]); }
  function validate() { const valid = path.join() === correct.join(); if (valid) { setFeedback("Current path verified. The bypass capacitor remains a parallel branch, not part of the load loop."); window.setTimeout(() => onComplete(true,{xp:260,coins:38,rating:20}),900); } else setFeedback("KCL check failed. Trace the load-current loop from source to ground; do not place the bypass branch in series."); }
  return <MissionFrame title="Network Planet · Grid Repair" subtitle="Restore the orbital sensor current path" onClose={onClose}><Brief tone="emerald" label="Power grid failure" text="Build the load-current path in the correct order. Select circuit nodes from the source to ground."/><TopicLinks links={[{label:"Network topology",href:"/network-topology"},{label:"DC circuit analysis",href:"/dc-circuit-analysis"},{label:"Circuit laws",href:"/circuit-laws"}]}/><div className="relative mt-4 min-h-[340px] overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#07101f]"><svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 340"><path d="M100 170H280V95H580V170H710M280 170V265H480V170" fill="none" stroke="#334155" strokeWidth="4" strokeDasharray="8 7"/></svg>{nodes.map((node,index)=><button key={node.id} onClick={()=>choose(node.id)} className={`absolute ${node.x} grid h-16 w-16 place-items-center rounded-full border-2 text-xs font-black transition ${path.includes(node.id)?"border-emerald-200 bg-emerald-400 text-emerald-950 shadow-[0_0_30px_rgba(52,211,153,.35)]":"border-slate-600 bg-[#111a30] text-slate-300 hover:border-emerald-400"}`}><span>{node.label}</span>{path.includes(node.id)?<small className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-white text-[9px] text-emerald-900">{path.indexOf(node.id)+1}</small>:null}</button>)}</div><MissionFooter feedback={feedback || (path.length ? `Path: ${path.map(id=>nodes.find(n=>n.id===id)?.label).join(" → ")}` : "Select the first node in the load-current path.")} onReset={()=>{setPath([]);setFeedback("");}} onValidate={validate}/></MissionFrame>;
}

function MemoryMission({ onClose, onComplete }: Omit<Props, "mode">) {
  const sequence = ["SOURCE", "SWITCH", "RESISTOR", "LED"];
  const choices = ["LED", "CAPACITOR", "SOURCE", "RESISTOR", "SWITCH", "GROUND"];
  const [observing, setObserving] = useState(true);
  const [answer, setAnswer] = useState<string[]>([]);
  const [feedback,setFeedback]=useState("");
  function validate(){if(answer.join()===sequence.join()){setFeedback("Visual netlist reconstructed with perfect topology recall.");window.setTimeout(()=>onComplete(true,{xp:210,coins:30,rating:15}),900);}else setFeedback("Topology mismatch. Recall both component order and current direction, then rebuild.");}
  return <MissionFrame title="Memory Lab · Black Box" subtitle="Reconstruct a vanished circuit" onClose={onClose}><Brief tone="rose" label="Visual memory test" text={observing?"Study the circuit path. Hide it when ready, then rebuild from memory.":"The reference is hidden. Rebuild the exact current path."}/><TopicLinks links={[{label:"Circuit elements",href:"/circuit-elements"},{label:"Combinational circuits",href:"/combinational-circuits"},{label:"Network topology",href:"/network-topology"}]}/><div className="mt-4 rounded-2xl border border-rose-400/20 bg-[#07101f] p-5">{observing?<div className="flex min-h-[180px] flex-wrap items-center justify-center gap-3">{sequence.map((item,index)=><div key={item} className="flex items-center gap-3"><span className="rounded-xl border border-rose-300/30 bg-rose-400/10 px-4 py-4 text-xs font-black text-rose-100">{item}</span>{index<sequence.length-1?<span className="text-rose-300">→</span>:null}</div>)}</div>:<><div className="flex min-h-[90px] flex-wrap items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 p-3">{answer.length?answer.map((item,index)=><button key={`${item}-${index}`} onClick={()=>setAnswer(items=>items.filter((_,i)=>i!==index))} className="rounded-lg bg-rose-400/15 px-3 py-2 text-xs font-black text-rose-100">{index+1}. {item}</button>):<span className="text-xs font-bold text-slate-600">Tap components below to rebuild the path</span>}</div><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">{choices.map(item=><button key={item} disabled={answer.includes(item)} onClick={()=>setAnswer(items=>[...items,item])} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-black text-slate-300 disabled:opacity-30">{item}</button>)}</div></>}</div>{observing?<button onClick={()=>setObserving(false)} className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-400 to-violet-500 px-5 py-3 text-sm font-black text-white">Hide circuit and rebuild</button>:<MissionFooter feedback={feedback} onReset={()=>{setAnswer([]);setFeedback("");}} onValidate={validate}/>}</MissionFrame>;
}

function DesignMission({ onClose, onComplete }: Omit<Props, "mode">) {
  const [resistance,setResistance]=useState(100);
  const [feedback,setFeedback]=useState("");
  const current=Math.round((12-5)/resistance*1000);
  function validate(){if(resistance===70){setFeedback("Design passes: 70 Ω sets 100 mA at the 5 V regulator node. Resistor dissipation is 0.7 W, so specify at least a 1 W part.");window.setTimeout(()=>onComplete(true,{xp:250,coins:35,rating:19}),900);}else setFeedback(`Calculated load current is ${current} mA. Adjust R = (12 V − 5 V) / 0.1 A and check power rating.`);}
  return <MissionFrame title="Engineering Design Bay" subtitle="Solar regulator recovery" onClose={onClose}><Brief tone="amber" label="Daily live mission" text="A 12 V solar bus must feed a 5 V regulator node at 100 mA. Size the series resistor and verify its power."/><TopicLinks links={[{label:"Power supplies",href:"/power-supplies"},{label:"Diodes and applications",href:"/diodes-and-applications"},{label:"Circuit laws",href:"/circuit-laws"}]}/><div className="mt-4 grid gap-4 md:grid-cols-[1fr_300px]"><div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-amber-400/20 bg-[#07101f] p-5"><div className="flex items-center gap-3 text-center"><span className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-4 text-xs font-black text-cyan-100">12 V SOLAR</span><span className="text-cyan-300">──</span><span className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-xs font-black text-amber-100">R = {resistance} Ω</span><span className="text-cyan-300">──</span><span className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-xs font-black text-emerald-100">5 V / 100 mA</span></div></div><div className="rounded-2xl border border-white/10 bg-black/20 p-5"><Control label="Series resistance" value={`${resistance} Ω`} min={40} max={140} valueNumber={resistance} onChange={setResistance} step={10}/><div className="mt-6 grid grid-cols-2 gap-2"><Metric label="Load current" value={`${current} mA`}/><Metric label="Target" value="100 mA"/></div><p className="mt-5 text-xs leading-5 text-slate-500">Engineering AI checks operating point, tolerance and component power—not just the numeric answer.</p></div></div><MissionFooter feedback={feedback} onReset={()=>{setResistance(100);setFeedback("");}} onValidate={validate}/></MissionFrame>;
}

function TopicLinks({links}:{links:{label:string;href:string}[]}) {
  return <div className="mt-3 flex flex-col gap-2 rounded-xl border border-cyan-400/15 bg-cyan-400/[.045] px-3 py-2.5 sm:flex-row sm:items-center"><span className="flex-none text-[9px] font-black uppercase tracking-[.16em] text-cyan-300">Learn the concepts</span><div className="flex flex-wrap gap-1.5">{links.map(link=><Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold text-slate-300 transition hover:border-cyan-400/35 hover:bg-cyan-400/10 hover:text-cyan-100">{link.label}<span aria-hidden="true" className="ml-1 text-cyan-400">↗</span></Link>)}</div></div>;
}
function Brief({tone,label,text}:{tone:string;label:string;text:string}) { const styles:Record<string,string>={blue:"border-blue-400/20 bg-blue-400/10 text-blue-300",emerald:"border-emerald-400/20 bg-emerald-400/10 text-emerald-300",rose:"border-rose-400/20 bg-rose-400/10 text-rose-300",amber:"border-amber-400/20 bg-amber-400/10 text-amber-300"}; return <div className={`rounded-2xl border p-4 ${styles[tone]}`}><p className="text-[10px] font-black uppercase tracking-[.18em]">{label}</p><p className="mt-1 text-sm font-bold leading-6 text-white">{text}</p></div>; }
function Control({label,value,min,max,valueNumber,onChange,step=1}:{label:string;value:string;min:number;max:number;valueNumber:number;onChange:(value:number)=>void;step?:number}){return <label className="block"><span className="flex justify-between text-xs font-black text-slate-300"><span>{label}</span><span className="text-cyan-300">{value}</span></span><input className="mt-4 w-full accent-cyan-400" type="range" min={min} max={max} step={step} value={valueNumber} onChange={event=>onChange(Number(event.target.value))}/></label>}
function Metric({label,value}:{label:string;value:string}){return <div className="rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-[9px] font-black uppercase tracking-wider text-slate-500">{label}</p><p className="mt-1 text-xs font-black text-white">{value}</p></div>}
function MissionFrame({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#020617]/95 p-3 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="engineering-mission-title"><div className="mx-auto my-3 w-full max-w-5xl rounded-[26px] border border-cyan-400/20 bg-[#0b1326] p-4 text-white shadow-[0_30px_100px_rgba(0,0,0,.65)] sm:p-6"><header className="mb-5 flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-300">Interactive engineering mission</p><h2 id="engineering-mission-title" className="mt-1 text-2xl font-black text-white">{title}</h2><p className="text-xs text-slate-500">{subtitle}</p></div><button onClick={onClose} aria-label="Close mission" className="rounded-xl border border-white/10 px-3 py-2 text-sm font-black text-slate-400 hover:bg-white/5 hover:text-white">✕</button></header>{children}</div></div>;
}

function MissionFooter({ feedback, onReset, onValidate, validated = false }: { feedback: string; onReset: () => void; onValidate: () => void; validated?: boolean }) {
  return <div className={`mt-4 flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${validated ? "border-emerald-400/30 bg-emerald-400/10" : "border-white/10 bg-white/5"}`}><div><p className={`text-[10px] font-black uppercase tracking-wider ${validated ? "text-emerald-300" : "text-violet-300"}`}>{validated ? "Engineering AI · verification passed" : "Engineering AI"}</p><p className="mt-1 text-xs leading-5 text-slate-300">{feedback || "Build the circuit, test all input states, then ask me to validate it."}</p></div><div className="flex gap-2"><button onClick={onReset} className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-black text-slate-400">Reset</button><button disabled={validated} onClick={onValidate} className={`rounded-xl px-5 py-2.5 text-xs font-black ${validated ? "cursor-default bg-emerald-400/20 text-emerald-200" : "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950"}`}>{validated ? "Design verified ✓" : "Validate design"}</button></div></div>;
}

export default function EngineeringMission({ mode, onClose, onComplete }: Props) {
  if (mode === "logic-gate-master") return <BuilderMission onClose={onClose} onComplete={onComplete}/>;
  if (mode === "circuit-detective") return <FaultMission onClose={onClose} onComplete={onComplete}/>;
  if (mode === "signal-analyst") return <SignalMission onClose={onClose} onComplete={onComplete}/>;
  if (mode === "network-challenge") return <NetworkMission onClose={onClose} onComplete={onComplete}/>;
  if (mode === "memory-lab") return <MemoryMission onClose={onClose} onComplete={onComplete}/>;
  return <DesignMission onClose={onClose} onComplete={onComplete}/>;
}