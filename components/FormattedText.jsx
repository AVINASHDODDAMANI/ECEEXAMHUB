const symbolReplacements = [
  [/\blambda(\d+)\b/gi, "λ_$1"],
  [/\btheta(\d+)\b/gi, "θ_$1"],
  [/\blambda\b/gi, "λ"],
  [/\btheta\b/gi, "θ"],
  [/\balpha\b/gi, "α"],
  [/\bbeta\b/gi, "β"],
  [/\bpi\b/gi, "π"],
  [/\bgrad\b/gi, "∇"],
  [/\binfinity\b/gi, "∞"],
  [/\bohm\b/gi, "Ω"],
  [/\bmicro\b/gi, "µ"],
  [/->/g, "→"],
  [/=>/g, "⇒"],
  [/\+\/-/g, "±"],
  [/!=/g, "≠"],
  [/<=/g, "≤"],
  [/>=/g, "≥"],
  [/\bxhat\b/g, "x̂"],
  [/\byhat\b/g, "ŷ"],
  [/\bux\b/g, "uₓ"],
  [/\buy\b/g, "uᵧ"],
];

function normalizeText(value = "") {
  return symbolReplacements.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    String(value || "")
  );
}

function readGrouped(text, startIndex) {
  if (text[startIndex] !== "(") {
    let endIndex = startIndex;

    while (endIndex < text.length && /[A-Za-z0-9+\-*/.]/.test(text[endIndex])) {
      endIndex += 1;
    }

    return {
      value: text.slice(startIndex, endIndex),
      endIndex,
    };
  }

  let depth = 0;

  for (let index = startIndex; index < text.length; index += 1) {
    if (text[index] === "(") {
      depth += 1;
    }

    if (text[index] === ")") {
      depth -= 1;

      if (depth === 0) {
        return {
          value: text.slice(startIndex + 1, index),
          endIndex: index + 1,
        };
      }
    }
  }

  return {
    value: text.slice(startIndex + 1),
    endIndex: text.length,
  };
}

function renderInlineMath(text, keyPrefix = "text") {
  const normalizedText = normalizeText(text);
  const parts = [];
  let index = 0;

  while (index < normalizedText.length) {
    if (normalizedText.startsWith("sqrt(", index)) {
      const group = readGrouped(normalizedText, index + 4);
      parts.push(
        <span key={`${keyPrefix}-sqrt-${index}`} className="whitespace-nowrap">
          √({renderInlineMath(group.value, `${keyPrefix}-sqrt-${index}`)})
        </span>
      );
      index = group.endIndex;
      continue;
    }

    if (normalizedText[index] === "^") {
      const group = readGrouped(normalizedText, index + 1);
      parts.push(
        <sup key={`${keyPrefix}-sup-${index}`} className="text-[0.75em]">
          {renderInlineMath(group.value, `${keyPrefix}-sup-${index}`)}
        </sup>
      );
      index = group.endIndex;
      continue;
    }

    if (normalizedText[index] === "_") {
      const group = readGrouped(normalizedText, index + 1);
      parts.push(
        <sub key={`${keyPrefix}-sub-${index}`} className="text-[0.75em]">
          {renderInlineMath(group.value, `${keyPrefix}-sub-${index}`)}
        </sub>
      );
      index = group.endIndex;
      continue;
    }

    const nextSpecial = normalizedText
      .slice(index + 1)
      .search(/\^|_|sqrt\(/);
    const endIndex =
      nextSpecial === -1 ? normalizedText.length : index + 1 + nextSpecial;

    parts.push(normalizedText.slice(index, endIndex));
    index = endIndex;
  }

  return parts;
}

export default function FormattedText({ text, className = "" }) {
  const lines = String(text || "").split("\n");

  return (
    <div className={className}>
      {lines.map((line, index) =>
        line.trim() ? (
          <p key={`${index}-${line}`} className={index === 0 ? "" : "mt-2"}>
            {renderInlineMath(line, `line-${index}`)}
          </p>
        ) : (
          <div key={`space-${index}`} className="h-3" />
        )
      )}
    </div>
  );
}

export function InlineFormattedText({ text, className = "" }) {
  return <span className={className}>{renderInlineMath(String(text || ""), "inline")}</span>;
}
