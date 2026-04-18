import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import seedQuestions from "../data/questions";
import { fetchQuestions } from "../lib/api-client";
import {
  buildSmartSearchIndex,
  getGroupedSmartSearchResults,
  getSearchSuggestions,
} from "../lib/smart-search";
import { SITE_NAVIGATION, isNavigationActive } from "../lib/site-navigation";
import SmartSearchDropdown from "./SmartSearchDropdown";

export default function Navbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search topic, subject, or keyword",
  searchTarget = "/learn",
}) {
  const router = useRouter();
  const hasSearch = typeof onSearchChange === "function";
  const [localSearch, setLocalSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuestions, setSearchQuestions] = useState(seedQuestions);
  const searchRef = useRef(null);
  const resolvedSearchValue = hasSearch ? searchValue : localSearch;
  const deferredQuery = useDeferredValue(resolvedSearchValue.trim());
  const searchIndex = useMemo(
    () => buildSmartSearchIndex(searchQuestions),
    [searchQuestions]
  );
  const groupedResults = useMemo(
    () => getGroupedSmartSearchResults(deferredQuery, searchIndex),
    [deferredQuery, searchIndex]
  );
  const suggestions = useMemo(
    () => getSearchSuggestions(deferredQuery),
    [deferredQuery]
  );
  const shouldShowDropdown = isSearchOpen && deferredQuery.length >= 2;

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function refreshQuestionPool() {
      try {
        const latestQuestions = await fetchQuestions({}, { signal: controller.signal });
        if (mounted && latestQuestions.length) {
          setSearchQuestions(latestQuestions);
        }
      } catch {
        // Seed data already keeps the search responsive offline.
      }
    }

    refreshQuestionPool();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (hasSearch) {
      return;
    }

    const nextSearch =
      typeof router.query.search === "string" ? router.query.search : "";
    setLocalSearch(nextSearch);
  }, [hasSearch, router.query.search]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!searchRef.current?.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    setIsSearchOpen(false);
  }, [router.asPath]);

  function handleSearchChange(value) {
    if (hasSearch) {
      onSearchChange(value);
    } else {
      setLocalSearch(value);
    }

    setIsSearchOpen(true);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();

    if (hasSearch) {
      return;
    }

    const trimmedValue = resolvedSearchValue.trim();
    router.push({
      pathname: searchTarget,
      query: trimmedValue ? { search: trimmedValue } : {},
    });
  }

  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-slatebrand-700/70 bg-slatebrand-900/95 px-5 py-4 text-white shadow-panel backdrop-blur">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold text-white">
                E
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slatebrand-300">
                  Beginner-Friendly ECE Prep
                </p>
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                  ECEExamHub
                </h1>
              </div>
            </Link>
          </div>

          <div className="flex flex-1 flex-col gap-4 xl:items-end">
            <nav className="flex flex-wrap gap-2">
              {SITE_NAVIGATION.map((link) => {
                const isActive = isNavigationActive(router.pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-white text-slatebrand-900 shadow-sm"
                        : "bg-white/10 text-slatebrand-100 hover:bg-white/20"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start xl:w-auto">
              <div ref={searchRef} className="relative flex-1 sm:min-w-[420px]">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white px-4 py-3 text-slate-700 shadow-sm"
                >
                  <svg
                    className="h-4 w-4 flex-none text-slate-400"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M14.167 14.167L17.5 17.5M15.833 9.167A6.667 6.667 0 1 1 2.5 9.167a6.667 6.667 0 0 1 13.333 0Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <input
                    type="search"
                    value={resolvedSearchValue}
                    onChange={(event) => handleSearchChange(event.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder={searchPlaceholder}
                    className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />

                  {!hasSearch ? (
                    <button
                      type="submit"
                      className="rounded-xl bg-slatebrand-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slatebrand-800"
                    >
                      Search
                    </button>
                  ) : null}
                </form>

                {shouldShowDropdown ? (
                  <SmartSearchDropdown
                    query={deferredQuery}
                    groupedResults={groupedResults}
                    suggestions={suggestions}
                    onSelect={() => setIsSearchOpen(false)}
                  />
                ) : null}
              </div>

              <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-slatebrand-100">
                Exams: GATE, ISRO, BEL, BARC
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
