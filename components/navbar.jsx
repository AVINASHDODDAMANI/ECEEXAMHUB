import dynamic from "next/dynamic";
import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { isNavigationActive } from "../lib/site-navigation";
import { sanitizeSearchInput } from "../lib/sanitize";
import { getSearchRedirectHref } from "../lib/search-redirects";
import { subjectDirectory } from "../data/subject-directory";
import { BrandLogo } from "./BrandIdentity";

const SmartSearchDropdown = dynamic(() => import("./SmartSearchDropdown"), {
  loading: () => null,
  ssr: false,
});

const navItems = [
  { href: "/", label: "Home", mobilePrimary: true },
  { href: "/subjects", label: "Notes", hasMenu: true, mobilePrimary: true },
  { href: "/notes", label: "Quick Notes", hasMenu: true, mobileLabel: "Quick Notes", mobilePrimary: true },
  { href: "/previous-year", label: "PYQ Papers", mobileLabel: "PYQs", mobilePrimary: true },
  { href: "/practice", label: "Numericals", mobileLabel: "Practice" },
  { href: "/ece-exams", label: "Resources", hasMenu: true, mobileLabel: "Resources" },
  { href: "/placement-preparation", label: "Placement Preparation", hasMenu: true, mobileLabel: "Placement" },
  { href: "/about", label: "About Us", mobileLabel: "About" },
];

const activeNavClass = "text-[#071d49] after:absolute after:inset-x-3 after:-bottom-3 after:h-0.5 after:rounded-full after:bg-[#ff7417]";
const inactiveNavClass = "text-[#071d49] hover:text-[#ff7417]";

const notesMenuSubjects = subjectDirectory.map((subject) => ({
  label: subject.title,
  href: subject.href,
}));

const placementMenuItems = [
  { label: "English Grammar", href: "/grammar" },
  { label: "Aptitude", href: "/practice" },
  { label: "Logical Reasoning", href: "/placement-preparation#logical-reasoning" },
  { label: "Verbal Ability", href: "/grammar/error-detection" },
  { label: "Interview Questions", href: "/placement-preparation#interview-questions" },
  { label: "Resume Building", href: "/placement-preparation#resume-building" },
];

function isTopNavActive(pathname, href) {
  if (pathname === "/learn/[subjectSlug]/[topicSlug]") {
    return href === "/subjects";
  }

  if (href === "/placement-preparation") {
    return pathname === "/placement-preparation" || pathname === "/grammar" || pathname.startsWith("/grammar/");
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
  const [authUser, setAuthUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopSearchRef = useRef(null);
  const desktopSearchInputRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
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
        ? searchRuntime.getGroupedSmartSearchResults(deferredQuery, searchIndex, 3)
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
        ? searchRuntime.getTopicSearchSuggestions(deferredQuery, searchIndex, 3)
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

    const nextSearch = sanitizeSearchInput(router.query.search);
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
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    let isCancelled = false;

    async function loadAuthUser() {
      try {
        const response = await fetch("/api/auth/me", { credentials: "same-origin" });
        const data = await response.json();

        if (!isCancelled) {
          setAuthUser(data.user || null);
        }
      } catch {
        if (!isCancelled) {
          setAuthUser(null);
        }
      }
    }

    loadAuthUser();

    return () => {
      isCancelled = true;
    };
  }, [router.asPath]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      setAuthUser(null);
      router.push("/");
    }
  }

  function handleSearchChange(value) {
    const safeValue = String(value || "")
      .replace(/[\u0000-\u001F\u007F]/g, "")
      .replace(/\s+/g, " ")
      .slice(0, 120);

    if (hasSearch) {
      onSearchChange(safeValue);
    } else {
      setLocalSearch(safeValue);
    }

    setIsSearchOpen(true);
    void ensureSearchRuntime();
  }

  function handleSearchFocus() {
    setIsSearchOpen(true);
    void ensureSearchRuntime();
  }

  function focusSearchInput(inputRef) {
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  function handleDesktopSearchOpen() {
    setIsSearchOpen(true);
    void ensureSearchRuntime();
    focusSearchInput(desktopSearchInputRef);
  }

  async function handleSearchSubmit(event) {
    event.preventDefault();

    const trimmedValue = sanitizeSearchInput(resolvedSearchValue);
    const paperRedirectHref = getSearchRedirectHref(trimmedValue);

    if (paperRedirectHref && searchTarget === "/search") {
      setIsSearchOpen(false);
      router.push(paperRedirectHref);
      return;
    }

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
        const queryTokens = normalizedQuery.split(" ").filter(Boolean);
        const hasPaperYear =
          /\b(19|20)\d{2}\b/.test(normalizedQuery) ||
          queryTokens.some((token) => /^(19|20)\d{1,2}$/.test(token));
        const paperIntent = /\b(paper|papers|pyq|pyqs|previous|year|question|questions)\b/.test(
          normalizedQuery
        ) || (hasPaperYear && /\b(gate|isro|bel|barc|ese|ies|drdo|iocl|ssc|rrb|ae|je|state)\b/.test(normalizedQuery));
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

  function renderSearchBox(inputRef) {
    return (
    <>
      <form
        onSubmit={handleSearchSubmit}
        className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm shadow-[0_12px_28px_rgba(15,23,42,0.10)] transition focus-within:border-[#ff7417] lg:h-11 lg:px-4"
      >
        <input
          ref={inputRef}
          type="search"
          value={resolvedSearchValue}
          onChange={(event) => handleSearchChange(event.target.value)}
          onFocus={handleSearchFocus}
          placeholder={searchPlaceholder}
          className="navbar-search-input min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-xs font-medium text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0 sm:text-sm [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
        />
        <button
          type="submit"
          className="inline-flex flex-none items-center justify-center border-0 bg-transparent p-0 text-[#071d49] outline-none transition hover:text-[#ff7417]"
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
          <p className="text-sm font-semibold text-slate-900">Preparing search...</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Loading concepts, PYQs, and practice suggestions.
          </p>
        </div>
      ) : null}
    </>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[70px] max-w-[1440px] items-center gap-2 px-3 py-2 sm:px-6 lg:min-h-[86px] lg:gap-4 lg:px-8 lg:py-3">
        <Link href="/" className="min-w-0 flex-none">
          <BrandLogo
            className="max-w-[108px] sm:max-w-[270px]"
            markClassName="h-8 w-8 sm:h-14 sm:w-14"
            titleClassName="text-[0.68rem] sm:text-[1.45rem]"
            taglineClassName="text-[9px] normal-case tracking-normal sm:text-[10px]"
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 overflow-visible whitespace-nowrap lg:flex">
          {navItems.map((item) => {
            const isActive = isTopNavActive(router.pathname, item.href);
            const isNotesMenu = item.label === "Notes";
            const isPlacementMenu = item.href === "/placement-preparation";

            if (isNotesMenu) {
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`relative inline-flex items-center gap-1 px-3 py-2 text-sm font-extrabold transition ${
                      isActive ? activeNavClass : inactiveNavClass
                    }`}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  <div className="invisible absolute left-1/2 top-full z-50 w-[min(520px,calc(100vw-32px))] -translate-x-1/2 pt-2 text-left opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-[0_18px_48px_rgba(15,23,42,0.14)]">
                    <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#ff7417]">Notes Chapters</p>
                      </div>
                      <Link href="/subjects" className="text-xs font-black text-[#071d49] hover:text-[#ff7417]">
                        View all
                      </Link>
                    </div>
                    <div className="grid max-h-56 gap-1 overflow-y-auto pr-1 sm:grid-cols-2">
                      {notesMenuSubjects.map((subject) => (
                        <Link
                          key={subject.href}
                          href={subject.href}
                          className="min-w-0 rounded-md border border-transparent px-2.5 py-2 transition hover:border-orange-100 hover:bg-orange-50/70"
                        >
                          <span className="block truncate text-xs font-black text-[#071d49]">{subject.label}</span>
                        </Link>
                      ))}
                    </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (isPlacementMenu) {
              return (
                <div key={item.href} className="group relative">
                  <Link href={item.href} className={`relative inline-flex items-center gap-1 px-3 py-2 text-sm font-extrabold transition ${isActive ? activeNavClass : inactiveNavClass}`} aria-haspopup="true">
                    {item.label}
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-2 text-left opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-[0_18px_48px_rgba(15,23,42,0.14)]">
                      <div className="mb-2 border-b border-slate-100 pb-2"><p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#ff7417]">Placement Preparation</p></div>
                      <div className="grid gap-1">{placementMenuItems.map(menuItem => <Link key={menuItem.label} href={menuItem.href} className="rounded-md px-3 py-2 text-xs font-black text-[#071d49] transition hover:bg-orange-50 hover:text-[#ff7417]">{menuItem.label}</Link>)}</div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative inline-flex items-center gap-1 px-3 py-2 text-sm font-extrabold transition ${
                  isActive ? activeNavClass : inactiveNavClass
                }`}
              >
                {item.label}
                {item.hasMenu ? (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <div ref={desktopSearchRef} className="relative">
            <button
              type="button"
              onClick={handleDesktopSearchOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#071d49] transition hover:bg-slate-100 hover:text-[#ff7417]"
              aria-label="Open search"
            >
              <svg className="h-6 w-6" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M14.167 14.167L17.5 17.5M15.833 9.167A6.667 6.667 0 1 1 2.5 9.167a6.667 6.667 0 0 1 13.333 0Z"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isSearchOpen ? (
              <div className="absolute right-0 top-full z-50 mt-3 w-[420px]">
                {renderSearchBox(desktopSearchInputRef)}
              </div>
            ) : null}
          </div>
          {authUser ? (
            <>
              <Link
                href="/learn"
                className="inline-flex h-11 max-w-[190px] items-center justify-center truncate rounded-md bg-[#061b4f] px-5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#0b2a70]"
              >
                {authUser.name || authUser.email || authUser.phone || "Account"}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 px-5 text-sm font-extrabold text-[#071d49] shadow-sm transition hover:border-[#ff7417] hover:text-[#ff7417]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#061b4f] px-7 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#0b2a70]"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#ff7417] px-7 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#e96009]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div ref={mobileSearchRef} className="relative min-w-0 flex-1 lg:hidden">
          {renderSearchBox(mobileSearchInputRef)}
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((value) => !value)}
          className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-slate-200 bg-white text-[#071d49] shadow-sm transition hover:border-[#ff7417] hover:text-[#ff7417] lg:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-main-nav"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {isMobileMenuOpen ? (
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div
          id="mobile-main-nav"
          className="border-t border-slate-200 bg-white px-3 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)] lg:hidden"
        >
          <nav className="grid gap-1">
            {navItems.map((item) => {
              const isActive = isTopNavActive(router.pathname, item.href);
              const isNotesMenu = item.label === "Notes";
            const isPlacementMenu = item.href === "/placement-preparation";

              return (
                <div key={`mobile-menu-${item.href}`}>
                  <Link
                    href={item.href}
                    className={`flex min-h-11 items-center justify-between rounded-lg px-3 py-2 text-sm font-extrabold transition ${
                      isActive ? "bg-orange-50 text-[#ff7417]" : "text-[#071d49] hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.mobileLabel || item.label}</span>
                    {item.hasMenu ? (
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="m7 5 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : null}
                  </Link>
                  {isNotesMenu ? (
                    <div className="ml-3 mt-1 grid gap-1 border-l border-orange-100 pl-3">
                      {notesMenuSubjects.map((subject) => (
                        <Link
                          key={`mobile-note-${subject.href}`}
                          href={subject.href}
                          className="rounded-lg px-3 py-2 text-xs font-bold text-slate-700 hover:bg-orange-50 hover:text-[#ff7417]"
                        >
                          {subject.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                  {isPlacementMenu ? (
                    <div className="ml-3 mt-1 grid gap-1 border-l border-orange-100 pl-3">
                      {placementMenuItems.map((menuItem) => (
                        <Link key={`mobile-placement-${menuItem.label}`} href={menuItem.href} className="rounded-lg px-3 py-2 text-xs font-bold text-slate-700 hover:bg-orange-50 hover:text-[#ff7417]">{menuItem.label}</Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
            {authUser ? (
              <>
                <Link
                  href="/learn"
                  className="flex h-11 min-w-0 items-center justify-center truncate rounded-md bg-[#061b4f] px-3 text-sm font-extrabold text-white"
                >
                  {authUser.name || "Account"}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="h-11 rounded-md border border-slate-200 px-3 text-sm font-extrabold text-[#071d49]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex h-11 items-center justify-center rounded-md bg-[#061b4f] px-3 text-sm font-extrabold text-white"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="flex h-11 items-center justify-center rounded-md bg-[#ff7417] px-3 text-sm font-extrabold text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}

      <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-2 py-1.5 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => {
          const isActive = isTopNavActive(router.pathname, item.href);

          return (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className={`relative flex h-8 flex-none items-center justify-center rounded-md px-2.5 text-center text-[11px] font-extrabold leading-tight transition ${
                isActive ? "bg-orange-50 text-[#ff7417]" : "text-[#071d49]"
              }`}
            >
              {item.mobileLabel || item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
