import dynamic from "next/dynamic";
import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { isNavigationActive } from "../lib/site-navigation";
import { BrandLogo } from "./BrandIdentity";

const SmartSearchDropdown = dynamic(() => import("./SmartSearchDropdown"), {
  loading: () => null,
  ssr: false,
});

const navItems = [
  { href: "/", label: "Home", mobilePrimary: true },
  { href: "/subjects", label: "Subjects", mobilePrimary: true },
  { href: "/previous-year", label: "PYQs", mobilePrimary: true },
  { href: "/mock-tests", label: "Mock Tests", mobileLabel: "Tests", mobilePrimary: true },
  { href: "/notes", label: "Notes" },
  { href: "/diagram-lab", label: "AI Diagrams", mobileLabel: "Diagrams" },
  { href: "/learn", label: "Dashboard" },
  { href: "/ece-exams", label: "Resources", mobileLabel: "Resources" },
];

const activeNavClass = "bg-white/14 text-white shadow-[inset_0_-2px_0_rgba(255,255,255,0.96)]";
const inactiveNavClass = "text-blue-100/95 hover:bg-white/8 hover:text-white";
const utilityLinks = [
  { href: "/mcqs", label: "Practice MCQs" },
  { href: "/mock-tests", label: "Mock Test" },
];

function isTopNavActive(pathname, href) {
  if (pathname === "/learn/[subjectSlug]/[topicSlug]") {
    return href === "/subjects";
  }

  if (href === "/learn") {
    return pathname === "/learn";
  }

  return isNavigationActive(pathname, href);
}

export default function Navbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search Laplace transform, MOSFET, Bode plot...",
  searchTarget = "/search",
}) {
  const router = useRouter();
  const hasSearch = typeof onSearchChange === "function";
  const [localSearch, setLocalSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuestions, setSearchQuestions] = useState([]);
  const [searchRuntime, setSearchRuntime] = useState(null);
  const [isSearchBooting, setIsSearchBooting] = useState(false);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const isMountedRef = useRef(true);
  const searchRuntimePromiseRef = useRef(null);
  const hasFetchedRemoteQuestionsRef = useRef(false);
  const resolvedSearchValue = hasSearch ? searchValue : localSearch;
  const deferredQuery = useDeferredValue(resolvedSearchValue.trim());
  const searchIndex = useMemo(() => {
    if (!searchRuntime) {
      return [];
    }

    return searchRuntime.buildSmartSearchIndex(searchQuestions);
  }, [searchQuestions, searchRuntime]);
  const groupedResults = useMemo(
    () =>
      searchRuntime && deferredQuery.length >= 2
        ? searchRuntime.getGroupedSmartSearchResults(deferredQuery, searchIndex)
        : [],
    [deferredQuery, searchIndex, searchRuntime]
  );
  const suggestions = useMemo(
    () =>
      searchRuntime && deferredQuery.length >= 2
        ? searchRuntime.getSearchSuggestions(deferredQuery, searchIndex)
        : [],
    [deferredQuery, searchIndex, searchRuntime]
  );
  const topicSuggestions = useMemo(
    () =>
      searchRuntime && deferredQuery.length >= 2
        ? searchRuntime.getTopicSearchSuggestions(deferredQuery, searchIndex, 4)
        : [],
    [deferredQuery, searchIndex, searchRuntime]
  );
  const shouldShowDropdown =
    isSearchOpen && deferredQuery.length >= 2 && Boolean(searchRuntime);
  const shouldShowSearchLoading =
    isSearchOpen && deferredQuery.length >= 2 && isSearchBooting && !searchRuntime;

  async function ensureSearchRuntime() {
    if (searchRuntimePromiseRef.current) {
      return searchRuntimePromiseRef.current;
    }

    if (isMountedRef.current) {
      setIsSearchBooting(true);
    }

    searchRuntimePromiseRef.current = Promise.all([
      import("../data/questions"),
      import("../lib/api-client"),
      import("../lib/smart-search"),
    ])
      .then(([questionsModule, apiClientModule, smartSearchModule]) => {
        const nextRuntime = {
          seedQuestions: questionsModule.default || [],
          fetchQuestions: apiClientModule.fetchQuestions,
          buildSmartSearchIndex: smartSearchModule.buildSmartSearchIndex,
          getSmartSearchResults: smartSearchModule.getSmartSearchResults,
          getGroupedSmartSearchResults: smartSearchModule.getGroupedSmartSearchResults,
          getSearchSuggestions: smartSearchModule.getSearchSuggestions,
          getTopicSearchSuggestions: smartSearchModule.getTopicSearchSuggestions,
        };

        if (isMountedRef.current) {
          setSearchRuntime(nextRuntime);
          setSearchQuestions((currentValue) =>
            currentValue.length ? currentValue : nextRuntime.seedQuestions
          );
        }

        return nextRuntime;
      })
      .catch((error) => {
        searchRuntimePromiseRef.current = null;
        throw error;
      })
      .finally(() => {
        if (isMountedRef.current) {
          setIsSearchBooting(false);
        }
      });

    return searchRuntimePromiseRef.current;
  }

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isSearchOpen && deferredQuery.length < 2) {
      return undefined;
    }

    const controller = new AbortController();
    let isCancelled = false;

    async function warmSearch() {
      const runtime = await ensureSearchRuntime();

      if (
        isCancelled ||
        hasFetchedRemoteQuestionsRef.current ||
        !runtime?.fetchQuestions
      ) {
        return;
      }

      hasFetchedRemoteQuestionsRef.current = true;

      try {
        const latestQuestions = await runtime.fetchQuestions({}, { signal: controller.signal });
        if (!isCancelled && latestQuestions.length && isMountedRef.current) {
          setSearchQuestions(latestQuestions);
        }
      } catch {
        hasFetchedRemoteQuestionsRef.current = false;
      }
    }

    warmSearch();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [deferredQuery.length, isSearchOpen]);

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
      const isInsideDesktopSearch = desktopSearchRef.current?.contains(event.target);
      const isInsideMobileSearch = mobileSearchRef.current?.contains(event.target);

      if (!isInsideDesktopSearch && !isInsideMobileSearch) {
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
    void ensureSearchRuntime();
  }

  function handleSearchFocus() {
    setIsSearchOpen(true);
    void ensureSearchRuntime();
  }

  async function handleSearchSubmit(event) {
    event.preventDefault();

    const trimmedValue = resolvedSearchValue.trim();

    if (trimmedValue && searchTarget === "/search") {
      try {
        const runtime = searchRuntime || (await ensureSearchRuntime());
        const nextIndex =
          searchIndex.length || !runtime
            ? searchIndex
            : runtime.buildSmartSearchIndex(searchQuestions.length ? searchQuestions : runtime.seedQuestions);
        const normalizedQuery = trimmedValue.toLowerCase().replace(/[^a-z0-9]+/gi, " ").trim();
        const exactMatches = nextIndex.filter(
          (item) => item.title.toLowerCase().replace(/[^a-z0-9]+/gi, " ").trim() === normalizedQuery
        );
        const paperIntent = /\b(paper|papers|pyq|pyqs|previous|year|question|questions)\b/.test(
          normalizedQuery
        );
        const rankedMatches = runtime.getSmartSearchResults(trimmedValue, nextIndex, 8);
        const directMatch =
          exactMatches.find((item) => item.group === "Subjects") ||
          exactMatches.find((item) => item.group === "Chapters") ||
          exactMatches.find((item) => item.group === "Topics") ||
          exactMatches.find((item) => item.group === "Subtopics") ||
          exactMatches[0] ||
          (paperIntent ? rankedMatches.find((item) => item.group === "Papers") : null);

        if (directMatch?.href) {
          setIsSearchOpen(false);
          router.push(directMatch.href);
          return;
        }
      } catch {
        // Fall back to the full search page if the lazy search index is unavailable.
      }
    }

    router.push({
      pathname: searchTarget,
      query: trimmedValue
        ? { [searchTarget === "/search" ? "q" : "search"]: trimmedValue }
        : {},
    });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-3 py-2 sm:px-6 sm:py-3 lg:px-8">
        <div className="flex flex-col gap-2 lg:grid lg:grid-cols-[auto_minmax(340px,1fr)_auto] lg:items-center lg:gap-4">
          <div className="grid grid-cols-[auto_minmax(136px,1fr)_auto] items-center gap-2 lg:flex lg:justify-between lg:gap-3">
            <Link href="/" className="min-w-0">
              <BrandLogo
                className="max-w-[104px] sm:max-w-[250px] lg:max-w-[340px]"
                markClassName="h-9 w-9 sm:h-[3rem] sm:w-[3rem] lg:h-14 lg:w-14"
                titleClassName="text-[0.72rem] sm:text-[1.05rem] lg:text-[1.85rem]"
                taglineClassName="text-[9px] sm:text-[11px]"
              />
            </Link>

            <div ref={mobileSearchRef} className="relative min-w-0 lg:hidden">
              <form
                onSubmit={handleSearchSubmit}
                className="flex h-10 items-center gap-2 rounded-full border border-slate-200/90 bg-slate-50 px-3 text-sm shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition focus-within:border-portal-300 focus-within:bg-white focus-within:shadow-[0_10px_26px_rgba(21,74,150,0.12)]"
              >
                <input
                  type="search"
                  value={resolvedSearchValue}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  onFocus={handleSearchFocus}
                  placeholder="Search"
                  className="min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-[13px] font-medium text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
                />
                <button
                  type="submit"
                  className="inline-flex flex-none items-center justify-center border-0 bg-transparent p-0 text-portal-700 outline-none transition hover:text-portal-800 focus-visible:outline-none"
                  aria-label="Search"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M14.167 14.167L17.5 17.5M15.833 9.167A6.667 6.667 0 1 1 2.5 9.167a6.667 6.667 0 0 1 13.333 0Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>

              {shouldShowDropdown ? (
                <SmartSearchDropdown
                  query={deferredQuery}
                  groupedResults={groupedResults}
                  suggestions={suggestions}
                  topicSuggestions={topicSuggestions}
                  onSelect={() => setIsSearchOpen(false)}
                />
              ) : null}

              {shouldShowSearchLoading ? (
                <div className="absolute left-0 right-0 top-full z-50 mt-3 rounded-2xl border border-portal-200 bg-white px-4 py-5 text-left shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
                  <p className="text-sm font-semibold text-slate-900">
                    Preparing search...
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Loading concepts, PYQs, and practice suggestions.
                  </p>
                </div>
              ) : null}
            </div>

            <Link
              href="/subjects"
              className="inline-flex h-10 flex-none items-center justify-center rounded-xl border border-portal-200 bg-[#f8fbff] px-3 text-xs font-bold text-portal-800 shadow-sm transition hover:bg-white lg:hidden"
            >
              Browse
            </Link>
          </div>

          <div className="hidden items-center gap-3 lg:flex lg:justify-self-center lg:w-full lg:max-w-[560px]">
            <div ref={desktopSearchRef} className="relative w-full">
              <form
                onSubmit={handleSearchSubmit}
                className="flex h-11 items-center gap-2 rounded-full border border-slate-200/90 bg-slate-50 px-4 text-sm shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition focus-within:border-portal-300 focus-within:bg-white focus-within:shadow-[0_12px_30px_rgba(21,74,150,0.12)]"
              >
                <input
                  type="search"
                  value={resolvedSearchValue}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  onFocus={handleSearchFocus}
                  placeholder={searchPlaceholder}
                  className="min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-base font-medium text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
                />
                <button
                  type="submit"
                  className="inline-flex flex-none items-center justify-center border-0 bg-transparent p-0 text-portal-700 outline-none transition hover:text-portal-800 focus-visible:outline-none"
                  aria-label="Search"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M14.167 14.167L17.5 17.5M15.833 9.167A6.667 6.667 0 1 1 2.5 9.167a6.667 6.667 0 0 1 13.333 0Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>

              {shouldShowDropdown ? (
                <SmartSearchDropdown
                  query={deferredQuery}
                  groupedResults={groupedResults}
                  suggestions={suggestions}
                  topicSuggestions={topicSuggestions}
                  onSelect={() => setIsSearchOpen(false)}
                />
              ) : null}

              {shouldShowSearchLoading ? (
                <div className="absolute left-0 right-0 top-full z-50 mt-3 rounded-2xl border border-portal-200 bg-white px-4 py-5 text-left shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
                  <p className="text-sm font-semibold text-slate-900">
                    Preparing search...
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Loading concepts, PYQs, and practice suggestions.
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="hidden items-center justify-end gap-2 lg:flex">
            {utilityLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-portal-300 hover:text-portal-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[linear-gradient(135deg,#103a78_0%,#0f4b9b_100%)] text-white">
        <div className="mx-auto max-w-[1440px] px-2 sm:px-6 lg:px-8">
          <div className="lg:hidden">
            <nav className="grid grid-cols-4 gap-1.5 py-1.5">
              {navItems.map((item) => {
                const isActive = isTopNavActive(router.pathname, item.href);

                return (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    className={`relative flex min-h-9 items-center justify-center rounded-xl px-1.5 py-1.5 text-center text-[11px] font-bold leading-tight transition sm:text-[12px] ${
                      isActive ? activeNavClass : inactiveNavClass
                    }`}
                  >
                    {item.mobileLabel || item.label}
                    {isActive ? (
                      <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-white" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </div>

          <nav className="hidden items-center gap-1 overflow-x-auto whitespace-nowrap py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex lg:py-0">
            {navItems.map((item) => {
              const isActive = isTopNavActive(router.pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:py-2.5 sm:text-sm ${
                    isActive ? activeNavClass : inactiveNavClass
                  }`}
                >
                  {item.label}
                  {isActive ? (
                    <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-white" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
