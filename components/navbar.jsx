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
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[56px] max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-sm font-bold text-white">
            E
          </span>
          <span className="text-lg font-semibold text-white">ECEExamHub</span>
        </Link>

        <nav className="flex overflow-x-auto whitespace-nowrap gap-4">
          {SITE_NAVIGATION.map((link) => {
            const isActive = isNavigationActive(router.pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div ref={searchRef} className="relative">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
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
                placeholder="Search..."
                className="w-32 bg-transparent outline-none placeholder:text-slate-500 sm:w-40"
              />
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

          <button
            type="button"
            className="md:hidden rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-400 hover:text-white"
            onClick={() => {
              // Mobile menu toggle - placeholder
            }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
