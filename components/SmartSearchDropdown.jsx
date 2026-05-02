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
  Topics: "bg-blue-50 text-blue-700",
  Subjects: "bg-violet-50 text-violet-700",
  Concepts: "bg-blue-50 text-blue-700",
  MCQs: "bg-emerald-50 text-emerald-700",
  PYQs: "bg-orange-50 text-orange-700",
  Practice: "bg-emerald-50 text-emerald-700",
  Notes: "bg-cyan-50 text-cyan-700",
};

export default function SmartSearchDropdown({
  query,
  groupedResults,
  suggestions = [],
  onSelect,
}) {
  const hasResults = groupedResults.some((group) => group.items.length);

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-portal-200 bg-white text-left shadow-[0_24px_80px_rgba(15,23,42,0.18)] transition duration-150">
      <div className="max-h-[28rem] overflow-y-auto p-3">
        {hasResults ? (
          groupedResults.map((group) => (
            <section key={group.group} className="mb-3 last:mb-0">
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  {group.group}
                </p>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    groupAccent[group.group]
                  }`}
                >
                  {group.items.length} result{group.items.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="grid gap-2">
                {group.items.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onSelect}
                    className="rounded-xl border border-portal-200 bg-[#f8fbff] px-4 py-3 transition hover:-translate-y-0.5 hover:border-portal-300 hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900">
                          {highlightText(item.title, query)}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-portal-600">
                          {highlightText(item.subtitle, query)}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {highlightText(item.description, query)}
                        </p>
                      </div>
                      <span className="rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[11px] font-bold text-portal-700 shadow-sm">
                        {item.badge}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="rounded-xl border border-portal-200 bg-[#f8fbff] px-4 py-5">
            <p className="text-sm font-bold text-slate-900">
              Try these results instead
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              We could not find a perfect match for "{query}", but these pages are usually helpful.
            </p>
            {suggestions.length ? (
              <div className="mt-4 grid gap-2">
                {suggestions.map((suggestion) => (
                  <Link
                    key={`${suggestion.href}-${suggestion.label}`}
                    href={suggestion.href}
                    onClick={onSelect}
                    className="flex items-center justify-between rounded-xl border border-portal-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 transition hover:border-portal-300 hover:text-portal-700"
                  >
                    <span>{suggestion.label}</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-portal-600">
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
