import { interpretPrompt, validateCircuit } from "./circuit-engine.mjs";

export class LocalCircuitProvider {
  name = "Local circuit intelligence";
  async generate(prompt) { return interpretPrompt(prompt); }
}

export class StructuredCircuitProvider {
  constructor({ endpoint, apiKey }) { this.endpoint = endpoint; this.apiKey = apiKey; }
  async generate(prompt) {
    const response = await fetch(this.endpoint, { method: "POST", headers: { "Content-Type": "application/json", ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}) }, body: JSON.stringify({ prompt, response_format: "circuit-document" }) });
    if (!response.ok) throw new Error(`AI provider failed (${response.status}).`);
    const document = await response.json();
    const validation = validateCircuit(document);
    if (!validation.valid) throw new Error(validation.errors.join(" "));
    return document;
  }
}

export const circuitDocumentSchema = {
  type: "object", required: ["title", "kind", "components", "wires"],
  properties: {
    title: { type: "string" }, kind: { enum: ["digital", "analog", "mixed"] },
    components: { type: "array", items: { type: "object", required: ["id", "type", "label", "x", "y", "props"] } },
    wires: { type: "array", items: { type: "object", required: ["id", "from", "to"] } },
  },
};