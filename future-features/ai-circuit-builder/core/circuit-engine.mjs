const LOGIC_WORDS = [
  { type: "XOR", pattern: /exactly one|one but not both|exclusive|\bxor\b/i },
  { type: "NAND", pattern: /not both|\bnand\b/i },
  { type: "NOR", pattern: /neither|\bnor\b/i },
  { type: "AND", pattern: /both|all switches|\band\b/i },
  { type: "OR", pattern: /either|any switch|\bor\b/i },
];

const templates = {
  logicGate(gateType = "AND") {
    return {
      title: `${gateType} gate LED controller`,
      summary: `Two input switches drive a ${gateType} gate. The gate output feeds an LED through a current-limiting resistor.`,
      kind: "digital",
      components: [
        component("vcc", "supply", "+5 V", 70, 55, { voltage: 5 }),
        component("swA", "switch", "SW A", 150, 125, { state: false }),
        component("swB", "switch", "SW B", 150, 255, { state: false }),
        component("gate", "gate", gateType, 375, 190, { gateType }),
        component("r1", "resistor", "R1", 545, 190, { resistance: 220 }),
        component("led", "led", "LED1", 675, 190, { color: "yellow" }),
        component("gnd", "ground", "GND", 675, 320, {}),
      ],
      wires: [
        wire("w1", "vcc.out", "swA.in"), wire("w2", "vcc.out", "swB.in"),
        wire("w3", "swA.out", "gate.in1"), wire("w4", "swB.out", "gate.in2"),
        wire("w5", "gate.out", "r1.in"), wire("w6", "r1.out", "led.anode"),
        wire("w7", "led.cathode", "gnd.in"),
      ],
    };
  },
  inverter() {
    const doc = templates.logicGate("NOT");
    doc.title = "Inverting LED controller";
    doc.summary = "A single switch drives a NOT gate; the LED turns on when the switch is off.";
    doc.components = doc.components.filter(item => item.id !== "swB");
    doc.wires = doc.wires.filter(item => !["w2", "w4"].includes(item.id));
    return doc;
  },
  ledSeries(voltage = 9, resistance = 330) {
    return {
      title: "Series LED circuit",
      summary: `${voltage} V source, switch, ${resistance} Ω current-limiting resistor and LED in series.`,
      kind: "analog",
      components: [component("v1", "battery", `V1 ${voltage} V`, 80, 185, { voltage }), component("sw1", "switch", "SW1", 225, 120, { state: false }), component("r1", "resistor", "R1", 390, 120, { resistance }), component("led", "led", "LED1", 570, 120, { color: "yellow" }), component("gnd", "ground", "GND", 570, 285, {})],
      wires: [wire("w1", "v1.positive", "sw1.in"), wire("w2", "sw1.out", "r1.in"), wire("w3", "r1.out", "led.anode"), wire("w4", "led.cathode", "gnd.in"), wire("w5", "gnd.in", "v1.negative")],
    };
  },
  voltageDivider(vin = 12, r1 = 1000, r2 = 1000) {
    return {
      title: "Resistive voltage divider",
      summary: `${vin} V divider using ${formatOhms(r1)} and ${formatOhms(r2)}. Ideal output is ${(vin * r2 / (r1 + r2)).toFixed(2)} V.`,
      kind: "analog",
      components: [component("v1", "battery", `VIN ${vin} V`, 100, 180, { voltage: vin }), component("r1", "resistor", "R1", 330, 105, { resistance: r1 }), component("out", "terminal", "VOUT", 520, 180, { voltage: vin * r2 / (r1 + r2) }), component("r2", "resistor", "R2", 330, 255, { resistance: r2 }), component("gnd", "ground", "GND", 520, 310, {})],
      wires: [wire("w1", "v1.positive", "r1.in"), wire("w2", "r1.out", "out.in"), wire("w3", "out.in", "r2.in"), wire("w4", "r2.out", "gnd.in"), wire("w5", "gnd.in", "v1.negative")],
    };
  },
};

function component(id, type, label, x, y, props = {}) { return { id, type, label, x, y, props }; }
function wire(id, from, to) { return { id, from, to }; }
function numberNear(prompt, token, fallback) { const match = prompt.match(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(?:${token})`, "i")); return match ? Number(match[1]) : fallback; }
function formatOhms(value) { return value >= 1000 ? `${value / 1000} kΩ` : `${value} Ω`; }

export function interpretPrompt(rawPrompt) {
  const prompt = String(rawPrompt || "").trim();
  if (!prompt) throw new Error("Describe the circuit you want to build.");
  let document;
  if (/voltage divider|divide.*voltage/i.test(prompt)) {
    const voltage = numberNear(prompt, "v(?:olt)?s?", 12);
    const resistors = [...prompt.matchAll(/(\d+(?:\.\d+)?)\s*(k)?\s*(?:ohm|Ω)/gi)].map(match => Number(match[1]) * (match[2] ? 1000 : 1));
    document = templates.voltageDivider(voltage, resistors[0] || 1000, resistors[1] || resistors[0] || 1000);
  } else if (/led/i.test(prompt) && /(switch|gate|both|either|xor|nand|nor|not)/i.test(prompt)) {
    const logic = LOGIC_WORDS.find(item => item.pattern.test(prompt));
    document = /invert|\bnot gate\b|when.*off/i.test(prompt) ? templates.inverter() : templates.logicGate(logic?.type || "AND");
  } else if (/led/i.test(prompt)) {
    document = templates.ledSeries(numberNear(prompt, "v(?:olt)?s?", 9), numberNear(prompt, "(?:ohm|Ω)", 330));
  } else {
    document = templates.logicGate("AND");
    document.summary = "I inferred a two-input logic controller. Add LED, voltage-divider, gate, or switching details for a more specific circuit.";
  }
  return { ...document, id: `circuit-${Date.now()}`, prompt, createdAt: new Date().toISOString(), analysis: analyzeCircuit(document) };
}

export function simulateCircuit(document, state = {}) {
  const switches = Object.fromEntries(document.components.filter(item => item.type === "switch").map(item => [item.id, state[item.id] ?? item.props.state ?? false]));
  const gate = document.components.find(item => item.type === "gate");
  const inputs = Object.values(switches);
  let output = inputs.length ? inputs[0] : true;
  if (gate) {
    const [a = false, b = false] = inputs;
    const functions = { AND: a && b, OR: a || b, XOR: a !== b, NAND: !(a && b), NOR: !(a || b), NOT: !a };
    output = functions[gate.props.gateType] ?? false;
  }
  const resistor = document.components.find(item => item.type === "resistor");
  const supply = document.components.find(item => ["supply", "battery"].includes(item.type));
  const ledCurrent = output && resistor && supply ? Math.max(0, (supply.props.voltage - 2) / resistor.props.resistance * 1000) : 0;
  return { switches, output, ledOn: output && document.components.some(item => item.type === "led"), ledCurrentMa: Number(ledCurrent.toFixed(1)) };
}

export function analyzeCircuit(document) {
  const notes = [];
  const resistor = document.components.find(item => item.type === "resistor");
  const led = document.components.find(item => item.type === "led");
  if (led && !resistor) notes.push({ level: "warning", text: "Add a series resistor to limit LED current." });
  if (led && resistor) notes.push({ level: "good", text: `${resistor.label} limits LED current and protects the output stage.` });
  if (!document.components.some(item => item.type === "ground")) notes.push({ level: "warning", text: "The circuit has no ground/reference node." });
  else notes.push({ level: "good", text: "A complete reference and return path is present." });
  if (document.kind === "digital") notes.push({ level: "info", text: "Toggle the input switches to simulate the complete truth table." });
  return notes;
}

export function validateCircuit(document) {
  const ids = new Set(document.components.map(item => item.id));
  const errors = [];
  if (ids.size !== document.components.length) errors.push("Component IDs must be unique.");
  for (const item of document.components) {
    const connected = document.wires.some(connection => connection.from.startsWith(`${item.id}.`) || connection.to.startsWith(`${item.id}.`));
    if (!connected) errors.push(`${item.label} is not connected.`);
  }
  for (const connection of document.wires) {
    const fromId = connection.from.split(".")[0], toId = connection.to.split(".")[0];
    if (!ids.has(fromId) || !ids.has(toId)) errors.push(`Broken connection ${connection.id}: ${connection.from} → ${connection.to}`);
  }
  return { valid: errors.length === 0, errors };
}

export const examplePrompts = [
  "Build a circuit that lights an LED only when both switches are ON",
  "Draw an XOR circuit where exactly one switch turns on the LED",
  "Create a 12 V voltage divider using two 1 kΩ resistors",
  "Build a 9 V battery, switch, 330 ohm resistor and LED circuit",
];