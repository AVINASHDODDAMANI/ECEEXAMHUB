import { officialPreviousPapers } from "../data/official-previous-papers";

function normalizeSearchQuery(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getPaperSearchParts(query = "") {
  const normalizedQuery = normalizeSearchQuery(query);
  const tokens = normalizedQuery.split(" ").filter(Boolean);
  const year = tokens.find((token) => /^(19|20)\d{2}$/.test(token)) || "";
  const month =
    [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ].find((monthName) => tokens.includes(monthName)) || "";
  const exam = ["gate", "bel", "isro", "barc", "ese", "drdo"].find((item) =>
    tokens.includes(item)
  );

  return { normalizedQuery, tokens, exam: exam?.toUpperCase() || "", year, month };
}

export function getSearchRedirectHref(query = "") {
  const { normalizedQuery, exam, year, month } = getPaperSearchParts(query);

  if (
    /\bbel\b/.test(normalizedQuery) &&
    /(\bformula\b|\bformulas\b|\bformula sheet\b)/.test(normalizedQuery)
  ) {
    return "/bel-formula-sheet";
  }

  if (/\bbel\b/.test(normalizedQuery) && /\bexpected\b/.test(normalizedQuery)) {
    return "/bel-expected-questions-2026";
  }

  if (
    /\bbel\b/.test(normalizedQuery) &&
    /\b(chapter|topic|subject)\b/.test(normalizedQuery) &&
    /\b(pyq|pyqs|question|questions)\b/.test(normalizedQuery)
  ) {
    return "/bel-chapter-wise-pyqs";
  }

  if (
    /\bbel\b/.test(normalizedQuery) &&
    /\b(repeated|repeat|frequent|frequently)\b/.test(normalizedQuery)
  ) {
    return "/bel-electronics-repeated-questions";
  }

  if (
    /\bbel\b/.test(normalizedQuery) &&
    /\b(important|weightage|topics|topic)\b/.test(normalizedQuery)
  ) {
    return "/bel-most-important-topics";
  }

  if (
    /\bbel\b/.test(normalizedQuery) &&
    /\b(electronics|ece)\b/.test(normalizedQuery) &&
    /\b(pyq|pyqs|question|questions)\b/.test(normalizedQuery)
  ) {
    return "/bel-electronics-previous-year-questions";
  }

  if (
    /\bbel\b/.test(normalizedQuery) &&
    /\b(previous|pyq|paper|papers|question|questions)\b/.test(normalizedQuery)
  ) {
    return year ? "" : "/bel-previous-year-question-papers";
  }

  if (
    /\bgate\b/.test(normalizedQuery) &&
    /\b(previous|pyq|paper|papers|question|questions)\b/.test(normalizedQuery)
  ) {
    return year ? "" : "/gate-previous-year-question-papers";
  }

  if (
    /\b(circuit|network)\b/.test(normalizedQuery) &&
    /\b(elements?|components?)\b/.test(normalizedQuery)
  ) {
    return "/circuit-elements";
  }

  if (
    /^(resistor|resistance|capacitor|capacitance|inductor|inductance|rlc|voltage source|current source|independent voltage source|independent current source|dependent source|controlled source|source transformation|vcvs|vccs|ccvs|cccs)$/.test(
      normalizedQuery
    )
  ) {
    return "/circuit-elements";
  }

  if (
    /\b(resistor|resistance|capacitor|capacitance|inductor|inductance)\b/.test(normalizedQuery) &&
    /\b(circuit|network|element|elements|analysis|notes|formula|formulas)\b/.test(normalizedQuery)
  ) {
    return "/circuit-elements";
  }

  if (
    /\b(independent|dependent|controlled)\s+(voltage\s+|current\s+)?source\b/.test(normalizedQuery) ||
    /\b(voltage|current)\s+source\b/.test(normalizedQuery) ||
    /\b(source transformation|vcvs|vccs|ccvs|cccs|controlled source|dependent source)\b/.test(normalizedQuery)
  ) {
    return "/circuit-elements";
  }

  if (/\bnetwork\b/.test(normalizedQuery) && /\b(analysis|theory)\b/.test(normalizedQuery) && /\b(notes|pdf)\b/.test(normalizedQuery)) {
    return "/network-analysis-notes";
  }

  if (/\banalog\b/.test(normalizedQuery) && /\belectronics?\b/.test(normalizedQuery) && /\b(notes|pdf)\b/.test(normalizedQuery)) {
    return "/analog-electronics-notes";
  }

  if (/\bdigital\b/.test(normalizedQuery) && /\belectronics?\b/.test(normalizedQuery) && /\b(notes|pdf)\b/.test(normalizedQuery)) {
    return "/digital-electronics-notes";
  }

  if (
    /\bboolean\b/.test(normalizedQuery) &&
    /\balgebra\b/.test(normalizedQuery) &&
    !/\b(kmap|kmaps|k map|k maps|karnaugh)\b/.test(normalizedQuery)
  ) {
    return "/logic-gates-and-boolean-algebra";
  }

  if (/\blogic\b/.test(normalizedQuery) && /\bgates?\b/.test(normalizedQuery)) {
    return "/logic-gates-and-boolean-algebra";
  }

  if (
    /\bnetwork\b/.test(normalizedQuery) &&
    /\banalog\b/.test(normalizedQuery) &&
    /\bdigital\b/.test(normalizedQuery)
  ) {
    return "/subjects";
  }

  if (/\bsignals?\b/.test(normalizedQuery) && /\bsystems?\b/.test(normalizedQuery) && /\b(notes|pdf)\b/.test(normalizedQuery)) {
    return "/signals-and-systems-notes";
  }

  if (/\bcommunications?\b/.test(normalizedQuery) && /\bsystems?\b/.test(normalizedQuery) && /\b(notes|pdf)\b/.test(normalizedQuery)) {
    return "/communication-systems-pdf-notes";
  }

  if (!normalizedQuery || !exam || !year) {
    return "";
  }

  const matchingPapers = officialPreviousPapers.filter(
    (paper) => paper.exam === exam && String(paper.year) === String(year)
  );

  if (!matchingPapers.length) {
    return `/previous-year?search=${encodeURIComponent(`${exam} ${year}`)}`;
  }

  if (month) {
    const monthMatch = matchingPapers.find(
      (paper) => normalizeSearchQuery(paper.month) === month
    );

    if (monthMatch?.slug) {
      return `/solution/${monthMatch.slug}`;
    }
  }

  if (matchingPapers.length === 1 && matchingPapers[0].slug) {
    return `/solution/${matchingPapers[0].slug}`;
  }

  return `/previous-year?search=${encodeURIComponent(`${exam} ${year}`)}`;
}
