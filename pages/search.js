import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout";
import questions from "../data/questions";
import {
  buildSmartSearchIndex,
  getGroupedSmartSearchResults,
  getPopularSearches,
  getSmartSearchResults,
} from "../lib/smart-search";

const RECENT_SEARCHES_KEY = "eceexamhub-recent-searches";

const groupAccent = {
  Topics: "border-blue-200 bg-blue-50 text-blue-800",
  Subjects: "border-violet-200 bg-violet-50 text-violet-800",
  Concepts: "border-blue-200 bg-blue-50 text-blue-800",
  MCQs: "border-emerald-200 bg-emerald-50 text-emerald-800",
  PYQs: "border-orange-200 bg-orange-50 text-orange-800",
  Practice: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Notes: "border-cyan-200 bg-cyan-50 text-cyan-800",
};

const groupLabel = {
  Concepts: "Theory",
};

function readRecentSearches() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(RECENT_SEARCHES_KEY);
    const parsedValue = rawValue ? JSON.parse(rawValue) : [];
    return Array.isArray(parsedValue) ? parsedValue.slice(0, 5) : [];
  } catch {
    return [];
  }
}

function writeRecentSearch(query) {
  if (typeof window === "undefined" || !query) {
    return;
  }

  const currentSearches = readRecentSearches();
  const nextSearches = [
    query,
    ...currentSearches.filter(
      (item) => item.toLowerCase() !== query.toLowerCase()
    ),
  ].slice(0, 5);

  window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextSearches));
}

export default function SearchPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const searchIndex = useMemo(() => buildSmartSearchIndex(questions), []);
  const groupedResults = useMemo(
    () => getGroupedSmartSearchResults(searchValue, searchIndex, 8),
    [searchIndex, searchValue]
  );
  const allResults = useMemo(
    () => getSmartSearchResults(searchValue, searchIndex, 40),
    [searchIndex, searchValue]
  );
  const popularSearches = useMemo(() => getPopularSearches(6), []);
  const hasQuery = searchValue.trim().length > 0;
  const hasResults = allResults.length > 0;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const nextQuery = typeof router.query.q === "string" ? router.query.q : "";
    setSearchValue(nextQuery);
    setRecentSearches(readRecentSearches());

    if (nextQuery.trim()) {
      writeRecentSearch(nextQuery.trim());
      setRecentSearches(readRecentSearches());
    }
  }, [router.isReady, router.query.q]);

  return (
    <Layout
      title="ECE Exam Guide | Search"
      description="Search ECE Exam Guide topics, notes, MCQs, previous papers, and subject resources."
      noIndex
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    >
      <div className="mx-auto max-w-[1100px] pb-20">
        <div className="mb-5 flex items-center gap-2.5 border-b border-portal-100 pb-4 pt-1 text-sm text-slate-500">
          <Link href="/" className="font-medium text-portal-600 transition hover:text-portal-700">
            Home
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <Link href="/subjects" className="font-medium text-portal-600 transition hover:text-portal-700">
            Subjects
          </Link>
          <span className="text-slate-300" aria-hidden="true">/</span>
          <span className="font-medium text-slate-700">Search</span>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            Search
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {hasQuery ? `Results for "${searchValue}"` : "Find topics, MCQs, notes, and subjects"}
          </h1>
          <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-slate-700">
            Search understands short keywords like basic, current, voltage, KCL,
            notes, and MCQs.
          </p>
        </section>

        {!hasQuery ? (
          <section className="mt-5 grid gap-4 md:grid-cols-2">
            <SuggestionPanel title="Popular searches" items={popularSearches} />
            <SuggestionPanel
              title="Recently searched"
              items={recentSearches.map((item) => ({
                label: item,
                href: `/search?q=${encodeURIComponent(item)}`,
                group: "Recent",
              }))}
              emptyText="Your recent searches will appear here."
            />
          </section>
        ) : null}

        {hasQuery && hasResults ? (
          <section className="mt-5 grid gap-4">
            {groupedResults.map((group) => (
              <div
                key={group.group}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-bold text-slate-950">
                    {groupLabel[group.group] || group.group}
                  </h2>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${
                      groupAccent[group.group] || "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {group.items.length} shown
                  </span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <SearchResultCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        ) : null}

        {hasQuery && !hasResults ? (
          <section className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-950">
                No exact result, but try these
              </h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                Use shorter keywords or open a related page below.
              </p>
            </div>
            <SuggestionPanel title="Related popular pages" items={popularSearches} />
          </section>
        ) : null}
      </div>
    </Layout>
  );
}

function SearchResultCard({ item }) {
  return (
    <Link
      href={item.href}
      className="rounded-xl border border-slate-200 bg-[#f8fbff] p-4 transition hover:-translate-y-0.5 hover:border-portal-300 hover:bg-white hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-950">{item.title}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-portal-700">
            {item.subtitle}
          </p>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
            {item.description}
          </p>
        </div>
        <span className="rounded-full border border-portal-200 bg-white px-2.5 py-1 text-[11px] font-bold text-portal-700">
          {item.badge}
        </span>
      </div>
    </Link>
  );
}

function SuggestionPanel({ title, items, emptyText = "No suggestions yet." }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-bold text-slate-950">{title}</h2>
      <div className="mt-3 grid gap-2">
        {items.length ? (
          items.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="flex items-center justify-between rounded-xl border border-portal-200 bg-[#f8fbff] px-3 py-2.5 text-sm font-bold text-slate-800 transition hover:border-portal-300 hover:bg-white hover:text-portal-700"
            >
              <span>{item.label}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-portal-600">
                {item.group}
              </span>
            </Link>
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-sm font-medium text-slate-600">
            {emptyText}
          </p>
        )}
      </div>
    </div>
  );
}
