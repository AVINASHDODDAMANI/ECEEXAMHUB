import validator from "validator";

const DEFAULT_TEXT_LENGTH = 5000;
const DEFAULT_SEARCH_LENGTH = 120;
const SAFE_DIAGRAM_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,120}$/i;

function toSingleValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function cleanText(value, { maxLength = DEFAULT_TEXT_LENGTH, keepNewLines = true } = {}) {
  const rawValue = toSingleValue(value);

  if (rawValue === undefined || rawValue === null) {
    return "";
  }

  const normalizedValue = validator.stripLow(String(rawValue), keepNewLines).trim();
  return normalizedValue.slice(0, maxLength);
}

export function sanitizeSearchInput(value, maxLength = DEFAULT_SEARCH_LENGTH) {
  return cleanText(value, { maxLength, keepNewLines: false }).replace(/\s+/g, " ");
}

export function sanitizeStoredText(value, options = {}) {
  return cleanText(value, options)
    .replace(/<\/?[a-z][\s\S]*?>/gi, "")
    .replace(/\s+\n/g, "\n");
}

export function sanitizeStoredTextList(values = [], options = {}) {
  return Array.isArray(values)
    ? values.map((value) => sanitizeStoredText(value, options)).filter(Boolean)
    : [];
}

export function sanitizeSlugLikeInput(value, maxLength = 120) {
  return cleanText(value, { maxLength, keepNewLines: false }).replace(/[^\w\s&./()+-]/g, "");
}

export function sanitizeDiagramReference(value) {
  const diagram = cleanText(value, { maxLength: 1000, keepNewLines: false });

  if (!diagram) {
    return "";
  }

  if (SAFE_DIAGRAM_ID_PATTERN.test(diagram)) {
    return diagram;
  }

  if (
    validator.isURL(diagram, {
      protocols: ["http", "https"],
      require_protocol: true,
      require_valid_protocol: true,
      allow_underscores: true,
    }) &&
    /\.(avif|gif|jpe?g|png|webp)(?:[?#].*)?$/i.test(diagram)
  ) {
    return diagram;
  }

  return "";
}
