import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { examDirectory } from "../data/exam-directory";
import { previousPaperDirectory } from "../data/previous-paper-directory";
import seedQuestions from "../data/questions";
import { subjectDirectory } from "../data/subject-directory";
import { fetchQuestions } from "../lib/api-client";
import {
  buildSmartSearchIndex,
  getGroupedSmartSearchResults,
  getSearchSuggestions,
} from "../lib/smart-search";
import { isNavigationActive } from "../lib/site-navigation";
import SmartSearchDropdown from "./SmartSearchDropdown";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects", dropdownType: "subjects" },
  { href: "/ece-exams", label: "ECE Exams", dropdownType: "exams" },
  { href: "/previous-year", label: "Previous Papers", dropdownType: "papers" },
  { href: "/notes", label: "Notes" },
  { href: "/mcqs", label: "MCQs" },
  { href: "/practice", label: "Practice" },
  { href: "/insights", label: "Insights" },
];

const activeNavClass =
  "bg-white/15 text-white shadow-[inset_0_-4px_0_#f4c542,0_0_18px_rgba(244,197,66,0.22)]";
const inactiveNavClass = "text-blue-100 hover:bg-white/10 hover:text-white";

function BrandIcon() {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-portal-50 text-portal-600 shadow-sm">
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="7" width="10" height="10" rx="1.8" stroke="currentColor" strokeWidth="1.9" />
        <path
          d="M4 9V7m0 10v-2m16-8V7m0 10v-2M9 4H7m10 0h-2M9 20H7m10 0h-2M4 12H2m20 0h-2"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function Navbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search topics, exams...",
  searchTarget = "/learn",
}) {
  const router = useRouter();
  const hasSearch = typeof onSearchChange === "function";
  const [localSearch, setLocalSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showMobileScrollCue, setShowMobileScrollCue] = useState(true);
  const [searchQuestions, setSearchQuestions] = useState(seedQuestions);
  const searchRef = useRef(null);
  const mobileNavRef = useRef(null);
  const mobileNavItemRefs = useRef({});
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

  useEffect(() => {
    const navElement = mobileNavRef.current;

    if (!navElement || typeof window === "undefined") {
      return undefined;
    }

    function updateScrollCue() {
      const remainingScroll =
        navElement.scrollWidth - navElement.clientWidth - navElement.scrollLeft;
      setShowMobileScrollCue(remainingScroll > 12);
    }

    updateScrollCue();
    navElement.addEventListener("scroll", updateScrollCue, { passive: true });
    window.addEventListener("resize", updateScrollCue);

    return () => {
      navElement.removeEventListener("scroll", updateScrollCue);
      window.removeEventListener("resize", updateScrollCue);
    };
  }, []);

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
      eyebrow: "ECE Exams",
      title: "Explore all major ECE exam categories",
      actionHref: "/ece-exams",
      actionLabel: "Open Exams Page",
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
    <header className="sticky top-0 z-40 border-b border-portal-200 bg-white shadow-[0_10px_30px_rgba(16,47,96,0.08)]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="scale-[0.9] sm:scale-100">
                <BrandIcon />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[1.05rem] font-extrabold tracking-tight text-portal-600 sm:text-[2rem]">
                  ECE EXAM GUIDE
                </p>
                <p className="text-[11px] leading-4 text-slate-500 sm:text-base">
                  Your Guide to ECE Exams & Learning
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:w-full lg:max-w-[380px] lg:justify-end">
            <div ref={searchRef} className="relative w-full">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 rounded-xl border border-portal-200 bg-white px-3 py-1.5 text-sm shadow-sm"
              >
                <input
                  type="search"
                  value={resolvedSearchValue}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-transparent text-[13px] text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
                />
                <button
                  type="submit"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-portal-700 transition hover:bg-portal-50 sm:h-8 sm:w-8"
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
            </div>
          </div>
        </div>
      </div>

      <div className="bg-portal-600 text-white">
        <div className="mx-auto max-w-[1440px] px-2 sm:px-6 lg:px-8">
          <div className="relative lg:hidden">
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center pr-1">
              <div
                className={`flex h-full items-center bg-gradient-to-l from-portal-600 via-portal-600/90 to-transparent pl-8 pr-2 text-white transition ${
                  showMobileScrollCue ? "opacity-100" : "opacity-0"
                }`}
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M7 5.5 11.5 10 7 14.5M11 5.5 15.5 10 11 14.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <nav
              ref={mobileNavRef}
              className="flex items-center gap-1 overflow-x-auto whitespace-nowrap py-1.5 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {navItems.map((item) => {
                const isActive = isNavigationActive(router.pathname, item.href);

                return (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    ref={(element) => {
                      mobileNavItemRefs.current[item.href] = element;
                    }}
                    onClick={() => centerMobileNavItem(item.href)}
                    className={`relative whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      isActive ? activeNavClass : inactiveNavClass
                    }`}
                  >
                    {item.label}
                    {isActive ? (
                      <span className="absolute inset-x-3 bottom-0 h-1 rounded-full bg-[#f4c542]" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
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
                        <span className="absolute inset-x-4 bottom-0 h-1 rounded-full bg-[#f4c542]" />
                      ) : null}
                    </Link>

                    <div className="pointer-events-none absolute left-0 top-full z-50 w-[760px] max-w-[calc(100vw-4rem)] translate-y-2 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-2xl border border-portal-200 bg-white p-5 text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
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
                    <span className="absolute inset-x-4 bottom-0 h-1 rounded-full bg-[#f4c542]" />
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
