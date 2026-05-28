import Link from "next/link";

function escapeRegExp(value = "") {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text = "", query = "") {
  const tokens = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => escapeRegExp(token));

  if (!tokens.length) {
    return text;
  }

  const pattern = new RegExp(`(${tokens.join("|")})`, "ig");
  const segments = text.split(pattern);

  return segments.map((segment, index) =>
    segment.match(pattern) ? (
      <mark key={`${segment}-${index}`} className="rounded bg-amber-100 px-0.5 text-inherit">
        {segment}
      </mark>
    ) : (
      <span key={`${segment}-${index}`}>{segment}</span>
    )
  );
}

const groupAccent = {
  Chapters: "bg-indigo-50 text-indigo-700",
  Topics: "bg-blue-50 text-blue-700",
  Subtopics: "bg-sky-50 text-sky-700",
  Subjects: "bg-violet-50 text-violet-700",
  Concepts: "bg-blue-50 text-blue-700",
  Formulas: "bg-teal-50 text-teal-700",
  Papers: "bg-amber-50 text-amber-700",
  Questions: "bg-rose-50 text-rose-700",
  MCQs: "bg-emerald-50 text-emerald-700",
  PYQs: "bg-orange-50 text-orange-700",
  Practice: "bg-emerald-50 text-emerald-700",
  Notes: "bg-cyan-50 text-cyan-700",
};

const groupLabel = {
  Subjects: "Notes",
  Concepts: "Theory",
  Notes: "Quick Notes",
};

const groupTone = {
  Chapters: "CH",
  Topics: "TOP",
  Subtopics: "SUB",
  Subjects: "NOTE",
  Concepts: "LEARN",
  Formulas: "FX",
  Papers: "PAPER",
  Questions: "Q",
  MCQs: "MCQ",
  PYQs: "PYQ",
  Practice: "TEST",
  Notes: "QNOTE",
};

export default function SmartSearchDropdown({
  query,
  groupedResults,
  suggestions = [],
  topicSuggestions = [],
  onSelect,
}) {
  const hasResults = groupedResults.some((group) => group.items.length);
  const bestMatches = groupedResults.flatMap((group) =>
    group.items.slice(0, 3).map((item) => ({ ...item, resultGroup: group.group }))
  ).slice(0, 6);
  const mobileMatches = bestMatches.slice(0, 4);
  const compactTopicSuggestions = topicSuggestions.slice(0, 3);
  const fullSearchHref = `/search?q=${encodeURIComponent(query.trim())}`;

  return (
    <div className="absolute left-1/2 top-full z-50 mt-2 w-[calc(100vw-1rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-[0_18px_46px_rgba(15,23,42,0.18)] transition duration-150 sm:w-[min(28rem,calc(100vw-1rem))] lg:left-0 lg:right-0 lg:w-auto lg:translate-x-0">
      <div className="max-h-[18.5rem] overflow-y-auto p-1.5 [scrollbar-width:thin] sm:max-h-[22rem] sm:p-2">
        {compactTopicSuggestions.length ? (
          <section className="border-b border-slate-100 px-1.5 pb-1.5 sm:px-2 sm:pb-2">
            <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {compactTopicSuggestions.map((suggestion) => (
                <Link
                  key={`${suggestion.href}-${suggestion.label}`}
                  href={suggestion.href}
                  onClick={onSelect}
                  className="inline-flex max-w-[10rem] shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-bold text-slate-700 transition hover:border-portal-300 hover:bg-white hover:text-portal-700 sm:max-w-[11rem] sm:text-xs"
                >
                  <span className="truncate">{suggestion.label}</span>
                  <span className="text-[10px] uppercase text-portal-600">
                    {suggestion.group}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {hasResults ? (
          <section>
            <div className="flex items-center justify-between px-2 py-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500 sm:text-[11px]">
                Best matches
              </p>
              <Link
                href={fullSearchHref}
                onClick={onSelect}
                className="rounded-full bg-portal-50 px-2.5 py-1 text-[11px] font-extrabold text-portal-700 transition hover:bg-portal-100"
              >
                View all
              </Link>
            </div>

            <div className="grid divide-y divide-slate-100">
              {mobileMatches.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onSelect}
                  className="rounded-lg px-2 py-2.5 transition hover:bg-slate-50 sm:px-2.5 sm:py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-extrabold leading-5 text-slate-950 sm:text-sm">
                        {highlightText(item.title, query)}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] font-semibold leading-4 text-slate-500 sm:text-xs">
                        {item.group === "Papers"
                          ? highlightText(item.description, query)
                          : highlightText(item.subtitle || item.description, query)}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-extrabold ${
                        groupAccent[item.resultGroup] || "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {groupTone[item.resultGroup] || groupLabel[item.resultGroup] || item.badge}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <div className="rounded-lg bg-slate-50 px-3 py-4">
            <p className="text-sm font-bold text-slate-900">No exact match</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Try a shorter keyword or open one of these pages.
            </p>
            {suggestions.length ? (
              <div className="mt-3 grid gap-1">
                {suggestions.slice(0, 4).map((suggestion) => (
                  <Link
                    key={`${suggestion.href}-${suggestion.label}`}
                    href={suggestion.href}
                    onClick={onSelect}
                    className="flex min-h-10 items-center justify-between rounded-lg bg-white px-3 py-2 text-sm font-bold text-slate-800 transition hover:text-portal-700"
                  >
                    <span className="truncate">{suggestion.label}</span>
                    <span className="ml-3 shrink-0 text-[11px] font-bold uppercase text-portal-600">
                      {suggestion.group}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
