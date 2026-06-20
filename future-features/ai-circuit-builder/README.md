# AI Circuit Builder

Standalone future feature. It is intentionally not imported, routed, or linked by the live ECE Exam Guide website.

## Image-to-schematic

Set `OPENAI_API_KEY` and optionally `OPENAI_VISION_MODEL` in the website environment. Uploaded circuit images are analyzed server-side and returned as editable circuit documents.

## Current MVP

- Converts natural-language requirements into a structured circuit document.
- Draws an editable SVG schematic with connected wires.
- Supports AND, OR, XOR, NAND, NOR and NOT control circuits.
- Supports switched LED circuits and resistive voltage dividers.
- Allows component dragging and resistor editing.
- Simulates switches, logic output, LED state and approximate LED current.
- Validates graph connections and provides engineering feedback.
- Exports circuit JSON and SVG.
- Provides a provider interface for connecting a structured-output AI backend later.

## Preview

From this directory, run any static web server, for example:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173/standalone/`.

## Test

```powershell
node tests/engine.test.mjs
```

## Future AI integration

Use `core/provider.mjs`. The AI provider must return the circuit-document schema instead of an image. Keeping the output structured makes every symbol, wire, value and position editable and simulatable.