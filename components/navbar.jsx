import dynamic from "next/dynamic";
import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { examDirectory } from "../data/exam-directory";
import { previousPaperDirectory } from "../data/previous-paper-directory";
import { subjectDirectory } from "../data/subject-directory";
import { isNavigationActive } from "../lib/site-navigation";
import { BrandLogo } from "./BrandIdentity";

const SmartSearchDropdown = dynamic(() => import("./SmartSearchDropdown"), {
  loading: () => null,
  ssr: false,
});

const navItems = [
  { href: "/", label: "Home", mobilePrimary: true },
  { href: "/subjects", label: "Subjects", dropdownType: "subjects", mobilePrimary: true },
  { href: "/ece-exams", label: "ECE Exams", mobileLabel: "Exams", dropdownType: "exams", mobilePrimary: true },
  { href: "/previous-year", label: "Previous Papers", dropdownType: "papers" },
  { href: "/notes", label: "Notes" },
  { href: "/mcqs", label: "MCQs", mobilePrimary: true },
  { href: "/practice", label: "Practice" },
  { href: "/insights", label: "Insights" },
];

const mobilePrimaryNavItems = navItems.filter((item) => item.mobilePrimary);

const activeNavClass = "bg-white/14 text-white shadow-[inset_0_-2px_0_rgba(255,255,255,0.96)]";
const inactiveNavClass = "text-blue-100/95 hover:bg-white/8 hover:text-white";
const utilityLinks = [
  { href: "/subjects", label: "Browse Subjects" },
  { href: "/previous-year", label: "Previous Papers" },
];

export default function Navbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search subjects, topics, papers...",
  searchTarget = "/search",
}) {
  const router = useRouter();
  const hasSearch = typeof onSearchChange === "function";
  const [localSearch, setLocalSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuestions, setSearchQuestions] = useState([]);
  const [searchRuntime, setSearchRuntime] = useState(null);
  const [isSearchBooting, setIsSearchBooting] = useState(false);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const mobileNavRef = useRef(null);
  const mobileNavItemRefs = useRef({});
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
          getGroupedSmartSearchResults: smartSearchModule.getGroupedSmartSearchResults,
          getSearchSuggestions: smartSearchModule.getSearchSuggestions,
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

  function centerMobileNavItem(href, behavior = "smooth") {
    const navElement = mobileNavRef.current;
    const activeElement = mobileNavItemRefs.current[href];

    if (!navElement || !activeElement || typeof window === "undefined") {
      return;
    }

    const nextScrollLeft =
      activeElement.offsetLeft -
      navElement.clientWidth / 2 +
      activeElement.offsetWidth / 2;
    const maxScrollLeft = navElement.scrollWidth - navElement.clientWidth;

    navElement.scrollTo({
      left: Math.max(0, Math.min(nextScrollLeft, maxScrollLeft)),
      behavior,
    });
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
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    const navElement = mobileNavRef.current;

    if (!navElement || typeof window === "undefined" || window.innerWidth >= 1024) {
      return undefined;
    }

    const activeItem = navItems.find((item) =>
      isNavigationActive(router.pathname, item.href)
    );

    if (!activeItem) {
      return undefined;
    }

    const activeElement = mobileNavItemRefs.current[activeItem.href];

    if (!activeElement) {
      return undefined;
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      centerMobileNavItem(activeItem.href);
    });

    const timeoutId = window.setTimeout(() => {
      centerMobileNavItem(activeItem.href, "auto");
    }, 180);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(timeoutId);
    };
  }, [router.asPath, router.pathname]);

  function getDropdownConfig(type) {
    if (type === "subjects") {
      return {
        eyebrow: "Core Subjects",
        title: "Explore all ECE subjects from one place",
        actionHref: "/subjects",
        actionLabel: "Open Subjects Page",
        items: subjectDirectory.map((subject) => ({
          key: subject.title,
          href: subject.href,
          title: `${subject.id}. ${subject.title}`,
          description: subject.description,
        })),
      };
    }

    if (type === "papers") {
      return {
        eyebrow: "Previous Papers",
        title: "Browse major previous-paper collections by exam",
        actionHref: "/previous-year",
        actionLabel: "Open Previous Papers",
        items: previousPaperDirectory.map((paper) => ({
          key: paper.title,
          href: paper.href,
          title: paper.title,
          description: paper.meta,
        })),
      };
    }

    return {
      eyebrow: "Exam Guides",
      title: "Open exam-wise guidance, stages, cutoffs, and strategy",
      actionHref: "/ece-exams",
      actionLabel: "Open Exam Guides",
      items: examDirectory.map((exam) => ({
        key: exam.title,
        href: exam.href,
        title: exam.title,
        description: exam.shortDescription,
      })),
    };
  }

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

  function handleSearchSubmit(event) {
    event.preventDefault();

    const trimmedValue = resolvedSearchValue.trim();
    router.push({
      pathname: searchTarget,
      query: trimmedValue
        ? { [searchTarget === "/search" ? "q" : "search"]: trimmedValue }
        : {},
    });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[auto_minmax(340px,1fr)_auto] lg:items-center lg:gap-6">
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

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
              className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-portal-200 bg-[#f8fbff] text-portal-800 shadow-sm transition hover:bg-white lg:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-main-menu"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                {isMobileMenuOpen ? (
                  <path
                    d="M5.5 5.5l9 9M14.5 5.5l-9 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 6h12M4 10h12M4 14h12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
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
          <div className="relative lg:hidden">
            <nav
              ref={mobileNavRef}
              className="grid grid-cols-4 gap-1.5 py-2"
            >
              {mobilePrimaryNavItems.map((item) => {
                const isActive = isNavigationActive(router.pathname, item.href);

                return (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    ref={(element) => {
                      mobileNavItemRefs.current[item.href] = element;
                    }}
                    onClick={() => centerMobileNavItem(item.href)}
                    className={`relative flex min-h-10 items-center justify-center whitespace-nowrap rounded-xl px-2 py-2 text-center text-[12px] font-bold transition sm:text-[13px] ${
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

            {isMobileMenuOpen ? (
              <div
                id="mobile-main-menu"
                className="absolute left-0 right-0 top-full z-50 rounded-b-2xl border-x border-b border-portal-900/20 bg-white p-2 text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.22)]"
              >
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((item) => {
                    const isActive = isNavigationActive(router.pathname, item.href);

                    return (
                      <Link
                        key={`mobile-menu-${item.href}`}
                        href={item.href}
                        className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                          isActive
                            ? "border-portal-200 bg-portal-50 text-portal-800"
                            : "border-slate-200 bg-white text-slate-700 hover:border-portal-200 hover:text-portal-700"
                        }`}
                      >
                        {item.mobileLabel || item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <nav className="hidden items-center gap-1 overflow-x-auto whitespace-nowrap py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex lg:py-0">
            {navItems.map((item) => {
              const isActive = isNavigationActive(router.pathname, item.href);

              if (item.dropdownType) {
                const dropdown = getDropdownConfig(item.dropdownType);

                return (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className={`relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:py-3 sm:text-sm ${
                        isActive ? activeNavClass : inactiveNavClass
                      }`}
                    >
                      {item.label}
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path
                          d="M5 7.5 10 12.5l5-5"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {isActive ? (
                        <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-white" />
                      ) : null}
                    </Link>

                    <div className="pointer-events-none absolute left-0 top-full z-50 w-[760px] max-w-[calc(100vw-4rem)] translate-y-2 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
                              {dropdown.eyebrow}
                            </p>
                            <h3 className="mt-1 text-lg font-bold text-slate-900">
                              {dropdown.title}
                            </h3>
                          </div>
                          <Link
                            href={dropdown.actionHref}
                            className="rounded-full border border-portal-200 bg-portal-50 px-3 py-1.5 text-xs font-bold text-portal-700 transition hover:bg-white"
                          >
                            {dropdown.actionLabel}
                          </Link>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                          {dropdown.items.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.key}
                              href={dropdownItem.href}
                              className="rounded-xl border border-portal-200 bg-[#f8fbff] px-4 py-3 transition hover:border-portal-300 hover:bg-white"
                            >
                              <p className="text-sm font-bold text-slate-900">{dropdownItem.title}</p>
                              <p className="mt-1 text-xs leading-5 text-slate-600">
                                {dropdownItem.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:py-3 sm:text-sm ${
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
