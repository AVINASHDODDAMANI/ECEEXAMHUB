import Link from "next/link";
import { BrandLogo } from "./BrandIdentity";

const footerLinks = [
  { label: "Subjects", href: "/subjects" },
  { label: "Mock Tests", href: "/mock-tests" },
  { label: "Notes", href: "/notes" },
  { label: "PYQs", href: "/previous-year" },
  { label: "Practice", href: "/practice" },
  { label: "Dashboard", href: "/learn" },
  { label: "Resources", href: "/ece-exams" },
];

const trustLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const footerHighlights = ["Free Core Resources", "Structured Notes", "PYQ Practice", "Progress Tracking"];

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.55fr)_minmax(260px,0.55fr)] lg:items-start lg:px-8">
        <div>
          <BrandLogo
            className="max-w-full"
            markClassName="h-14 w-14 sm:h-16 sm:w-16"
            titleClassName="text-[1.75rem] sm:text-[2.2rem]"
            taglineClassName="text-[10px] sm:text-[11px]"
          />
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            Focused preparation for Electronics and Communication Engineering with
            subject-wise learning, previous year questions, mock tests, notes,
            and exam-oriented practice.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
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

        <nav aria-label="Study resources" className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <h3 className="text-base font-bold text-slate-900">Study Resources</h3>
          <div className="mt-3 grid grid-cols-2 gap-2.5 text-sm text-slate-600">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-portal-700">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Trust and support" className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <h3 className="text-base font-bold text-slate-900">Trust & Support</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Learn who the platform is for, how to report corrections, and what to expect
            from our privacy and usage policies.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2.5 text-sm text-slate-600">
            {trustLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-portal-700">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Found a mistake in notes, formulas, links, or questions? Send the page URL
            through Contact so it can be reviewed clearly.
          </p>
        </nav>
      </div>

      <div className="border-t border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-3 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>&copy; 2026 ECE Exam Guide. Structured preparation for ECE students.</p>
          <div className="flex gap-4">
            {trustLinks.slice(0, 3).map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-portal-700">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
