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
