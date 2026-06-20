import assert from "node:assert/strict";
import { interpretPrompt, simulateCircuit, validateCircuit } from "../core/circuit-engine.mjs";

const andCircuit = interpretPrompt("Build a circuit that lights an LED only when both switches are ON");
assert.equal(andCircuit.components.find(item => item.type === "gate").props.gateType, "AND");
assert.equal(validateCircuit(andCircuit).valid, true);
assert.equal(simulateCircuit(andCircuit, { swA: true, swB: false }).ledOn, false);
assert.equal(simulateCircuit(andCircuit, { swA: true, swB: true }).ledOn, true);

const xorCircuit = interpretPrompt("Draw an XOR circuit where exactly one switch turns on the LED");
assert.equal(xorCircuit.components.find(item => item.type === "gate").props.gateType, "XOR");
assert.equal(simulateCircuit(xorCircuit, { swA: true, swB: false }).ledOn, true);
assert.equal(simulateCircuit(xorCircuit, { swA: true, swB: true }).ledOn, false);

const divider = interpretPrompt("Create a 12 V voltage divider using two 1 kΩ resistors");
assert.equal(divider.kind, "analog");
assert.equal(divider.components.find(item => item.id === "out").props.voltage, 6);
assert.equal(validateCircuit(divider).valid, true);

console.log("AI Circuit Builder engine tests passed.");