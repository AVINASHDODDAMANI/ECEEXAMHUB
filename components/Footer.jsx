import Link from "next/link";

const footerGroups = [
  {
    title: "About",
    links: [
      { label: "About Us", href: "/" },
      { label: "Contact Us", href: "/learn" },
      { label: "Advertise", href: "/insights" },
      { label: "Careers", href: "/admin" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "GATE ECE", href: "/previous-year?exam=GATE" },
      { label: "ESE Style Prep", href: "/learn" },
      { label: "Semester Concepts", href: "/practice" },
      { label: "Interview Revision", href: "/insights" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Previous Papers", href: "/previous-year" },
      { label: "MCQ Tests", href: "/practice" },
      { label: "Study Notes", href: "/learn" },
      { label: "Formula Sheets", href: "/learn?search=formula" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-white/20 bg-[linear-gradient(180deg,#14348b_0%,#0c2365_100%)] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_0.9fr_0.9fr_1.3fr] lg:px-8">
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xl font-semibold">{group.title}</h3>
            <div className="mt-5 grid gap-3 text-sm text-blue-100">
              {group.links.map((link) => (
                <Link key={link.label} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="text-xl font-semibold">Connect</h3>
          <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100">
            ECEExamHub is your preparation space for electronics and communication
            engineering. Learn concepts, revise formulas, solve MCQs, and review
            previous-year patterns from one clean dashboard.
          </p>
          <div className="mt-6 flex gap-3">
            {["FB", "TW", "IN", "YT"].map((item) => (
              <span
                key={item}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-xs font-semibold"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-5 text-sm text-blue-100 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 ECEExamHub. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/" className="transition hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
