import Link from "next/link";
import { BrandLogo } from "./BrandIdentity";

const footerGroups = [
  {
    title: "Exam Sections",
    links: [
      { label: "Subjects", href: "/subjects" },
      { label: "Previous Papers", href: "/previous-year" },
      { label: "Notes", href: "/notes" },
      { label: "MCQs", href: "/mcqs" },
    ],
  },
  {
    title: "Learning",
    links: [
      { label: "Study Materials", href: "/learn" },
      { label: "Practice Zone", href: "/practice" },
      { label: "Mock Tests", href: "/mock-tests" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    title: "Popular Prep",
    links: [
      { label: "GATE ECE", href: "/previous-year?exam=GATE" },
      { label: "BEL & PSU", href: "/previous-year?exam=BEL" },
      { label: "ISRO Questions", href: "/previous-year?exam=ISRO" },
      { label: "BARC Revision", href: "/previous-year?exam=BARC" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "About", href: "/" },
      { label: "Contact", href: "/" },
      { label: "Resources", href: "/notes" },
      { label: "Support", href: "/practice" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-portal-200 bg-white">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr_0.8fr] lg:px-8">
        <div>
          <BrandLogo
            className="max-w-full"
            markClassName="h-14 w-14 sm:h-16 sm:w-16"
            titleClassName="text-[1.75rem] sm:text-[2.2rem]"
            taglineClassName="text-[10px] sm:text-[11px]"
          />
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
            Learn ECE topics, revise formulas, browse previous year papers, and
            practice exam-focused questions.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-base font-bold text-slate-900">{group.title}</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              {group.links.map((link) => (
                <Link key={link.label} href={link.href} className="transition hover:text-portal-700">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-portal-200 bg-[#f8fbff]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-4 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>&copy; 2026 ECE Exam Guide.</p>
          <div className="flex gap-4">
            <Link href="/" className="transition hover:text-portal-700">
              Privacy
            </Link>
            <Link href="/" className="transition hover:text-portal-700">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
