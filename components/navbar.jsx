import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import seedQuestions from "../data/questions";
import { subjectDirectory } from "../data/subject-directory";
import { fetchQuestions } from "../lib/api-client";
import {
  buildSmartSearchIndex,
  getGroupedSmartSearchResults,
  getSearchSuggestions,
} from "../lib/smart-search";
import { SITE_NAVIGATION, isNavigationActive } from "../lib/site-navigation";
import SmartSearchDropdown from "./SmartSearchDropdown";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects", hasDropdown: true },
  { href: "/learn", label: "Study Materials" },
  { href: "/previous-year", label: "Previous Papers" },
  { href: "/notes", label: "Notes" },
  { href: "/mcqs", label: "MCQs" },
  { href: "/practice", label: "Practice" },
  { href: "/insights", label: "Insights" },
];

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSubjectsOpen, setIsMobileSubjectsOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
    setIsMobileSubjectsOpen(false);
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
    <header className="sticky top-0 z-40 border-b border-portal-200 bg-white shadow-[0_10px_30px_rgba(16,47,96,0.08)]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start justify-between gap-3">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <BrandIcon />
              <div className="min-w-0">
                <p className="truncate text-xl font-extrabold tracking-tight text-portal-600 sm:text-[2rem]">
                  ECE EXAM GUIDE
                </p>
                <p className="text-sm text-slate-500 sm:text-base">
                  Your Guide to ECE Exams & Learning
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-portal-200 bg-portal-50 text-portal-700 transition hover:bg-portal-100 lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {isMobileMenuOpen ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3 lg:w-full lg:max-w-[480px] lg:justify-end">
            <div ref={searchRef} className="relative w-full">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-3 rounded-xl border border-portal-200 bg-white px-4 py-3 text-sm shadow-sm"
              >
                <input
                  type="search"
                  value={resolvedSearchValue}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-portal-700 transition hover:bg-portal-50"
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
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <nav className="hidden items-center gap-1 overflow-x-auto lg:flex">
            {navItems.map((item) => {
              const isActive = isNavigationActive(router.pathname, item.href);

              if (item.hasDropdown) {
                return (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className={`relative inline-flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-semibold transition ${
                        isActive ? "text-white" : "text-blue-100 hover:text-white"
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
                        <span className="absolute inset-x-4 bottom-0 h-[3px] rounded-full bg-[#f4c542]" />
                      ) : null}
                    </Link>

                    <div className="pointer-events-none absolute left-0 top-full z-50 w-[760px] max-w-[calc(100vw-4rem)] translate-y-2 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-2xl border border-portal-200 bg-white p-5 text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-portal-600">
                              Core Subjects
                            </p>
                            <h3 className="mt-1 text-lg font-bold text-slate-900">
                              Explore all ECE subjects from one place
                            </h3>
                          </div>
                          <Link
                            href="/subjects"
                            className="rounded-full border border-portal-200 bg-portal-50 px-3 py-1.5 text-xs font-bold text-portal-700 transition hover:bg-white"
                          >
                            Open Subjects Page
                          </Link>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                          {subjectDirectory.map((subject) => (
                            <Link
                              key={subject.title}
                              href={subject.href}
                              className="rounded-xl border border-portal-200 bg-[#f8fbff] px-4 py-3 transition hover:border-portal-300 hover:bg-white"
                            >
                              <p className="text-sm font-bold text-slate-900">{subject.id}. {subject.title}</p>
                              <p className="mt-1 text-xs leading-5 text-slate-600">
                                {subject.description}
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
                  className={`relative whitespace-nowrap px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "text-white" : "text-blue-100 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive ? (
                    <span className="absolute inset-x-4 bottom-0 h-[3px] rounded-full bg-[#f4c542]" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {isMobileMenuOpen ? (
            <div className="grid gap-2 py-3 lg:hidden">
              {navItems.map((item) => {
                const isActive = isNavigationActive(router.pathname, item.href);

                if (item.hasDropdown) {
                  return (
                    <div key={item.href} className="rounded-lg border border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsMobileSubjectsOpen((value) => !value)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                          isActive
                            ? "bg-white text-portal-700"
                            : "text-blue-50 hover:bg-white/10"
                        }`}
                      >
                        <span>{item.label}</span>
                        <svg className={`h-4 w-4 transition ${isMobileSubjectsOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path
                            d="M5 7.5 10 12.5l5-5"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {isMobileSubjectsOpen ? (
                        <div className="grid gap-2 border-t border-white/10 p-3">
                          <Link
                            href="/subjects"
                            className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-portal-700"
                          >
                            Open Subjects Page
                          </Link>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {subjectDirectory.map((subject) => (
                              <Link
                                key={subject.title}
                                href={subject.href}
                                className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-blue-50"
                              >
                                {subject.id}. {subject.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-white text-portal-700"
                        : "border border-white/10 text-blue-50 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      <nav className="hidden">
        {SITE_NAVIGATION.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
