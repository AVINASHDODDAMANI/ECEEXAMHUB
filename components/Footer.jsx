import Link from "next/link";
import { BrandLogo } from "./BrandIdentity";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Subjects", href: "/subjects" },
      { label: "ECE Exams", href: "/ece-exams" },
      { label: "Previous Papers", href: "/previous-year" },
    ],
  },
  {
    title: "Practice",
    links: [
      { label: "Study Materials", href: "/learn" },
      { label: "Notes", href: "/notes" },
      { label: "MCQs", href: "/mcqs" },
      { label: "Practice Zone", href: "/practice" },
      { label: "Mock Tests", href: "/mock-tests" },
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
    title: "Platform",
    links: [
      { label: "Question Bank", href: "/previous-year#question-bank" },
      { label: "Insights", href: "/insights" },
      { label: "Revision Topics", href: "/learn" },
      { label: "Subject Library", href: "/subjects" },
    ],
  },
];

const footerHighlights = ["Structured Notes", "Previous Papers", "Practice Sets", "MCQs"];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.25fr_repeat(4,minmax(0,1fr))] lg:px-8">
        <div>
          <BrandLogo
            className="max-w-full"
            markClassName="h-14 w-14 sm:h-16 sm:w-16"
            titleClassName="text-[1.75rem] sm:text-[2.2rem]"
            taglineClassName="text-[10px] sm:text-[11px]"
          />
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
            Focused preparation for Electronics and Communication Engineering with
            subject-wise learning, previous papers, and exam-oriented practice.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {footerHighlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {item}
              </span>
            ))}
          </div>
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

      <div className="border-t border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>&copy; 2026 ECE Exam Guide. Also known as ECE Exam Hub. Structured preparation for ECE students.</p>
          <div className="flex gap-4">
            <Link href="/subjects" className="transition hover:text-portal-700">
              Subjects
            </Link>
            <Link href="/previous-year" className="transition hover:text-portal-700">
              Previous Papers
            </Link>
            <Link href="/insights" className="transition hover:text-portal-700">
              Insights
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
