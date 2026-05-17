import Link from "next/link";
import { BrandLogo } from "./BrandIdentity";

const footerLinks = [
  { label: "Subjects", href: "/subjects" },
  { label: "Notes", href: "/notes" },
  { label: "Previous Papers", href: "/previous-year" },
  { label: "Practice", href: "/practice" },
  { label: "GATE ECE", href: "/previous-year?exam=GATE" },
  { label: "ECE Exams", href: "/ece-exams" },
];

const footerHighlights = ["Structured Notes", "Previous Papers", "Practice Sets", "MCQs"];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)] lg:items-start lg:px-8">
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

        <nav aria-label="Footer" className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <h3 className="text-base font-bold text-slate-900">Important Links</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-portal-700">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
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
