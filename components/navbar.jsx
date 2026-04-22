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

const headerCategories = [
  { label: "Subjects", href: "/subjects" },
  { label: "MCQs", href: "/mcqs" },
  { label: "Notes", href: "/notes" },
  { label: "Mock Tests", href: "/mock-tests" },
];

export default function Navbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search Signals and Systems, Networks, formulas...",
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
    <header className="sticky top-0 z-30 border-b border-blue-200/20 bg-[linear-gradient(180deg,#1743b0_0%,#123792_100%)] text-white shadow-[0_18px_40px_rgba(12,35,101,0.28)]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 py-2.5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2 20 6.5v11L12 22l-8-4.5v-11L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path d="M8.5 8.5h7v7h-7z" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </span>
            <div>
              <p className="text-xl font-semibold tracking-tight">ECEHub</p>
              <p className="text-[9px] uppercase tracking-[0.16em] text-blue-100">
                Learn | Practice | Solve
              </p>
            </div>
          </Link>

          <div ref={searchRef} className="relative min-w-[220px] flex-1">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/95 px-3 py-1.5 text-sm text-slate-900 shadow-[0_12px_28px_rgba(7,18,60,0.16)]"
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
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
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

          <div className="ml-auto hidden items-center gap-3 md:flex">
            <Link href="/admin" className="text-sm font-medium text-white transition hover:text-blue-100">
              Login
            </Link>
            <Link
              href="/learn"
              className="rounded-lg border border-white/25 bg-white px-3 py-1.5 text-sm font-medium text-[#123792] transition hover:bg-blue-50"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="border-t border-white/15">
          <nav className="flex items-center gap-2 overflow-x-auto py-2">
            {headerCategories.map((item) => {
              const isActive = isNavigationActive(router.pathname, item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    isActive
                      ? "bg-white/16 text-white shadow-[inset_0_-3px_0_0_#63d985]"
                      : "border border-white/10 text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <nav className="hidden">
          {SITE_NAVIGATION.map((item) => {
            const isActive = isNavigationActive(router.pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-white text-slate-950"
                    : "bg-slate-900 text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
