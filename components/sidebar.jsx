import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/", label: "Home" },
  { href: "/practice", label: "Practice" },
  { href: "/previous-year", label: "Previous Year" },
  { href: "/insights", label: "Insights" },
  { href: "/admin", label: "Admin" },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-full border-b border-white/50 bg-slatebrand-900 px-4 py-5 text-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:border-slatebrand-800 lg:px-6 lg:py-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slatebrand-300">
          ECE Preparation
        </p>
        <h2 className="mt-3 text-3xl font-semibold">Learn. Practice. Rank.</h2>
        <p className="mt-3 max-w-xs text-sm leading-6 text-slatebrand-200">
          Topic-wise MCQs, previous year papers, and exam insights in one place.
        </p>
      </div>

      <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {links.map((link) => {
          const isActive = router.pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-white text-slatebrand-900 shadow-panel"
                  : "bg-slatebrand-800/60 text-slatebrand-100 hover:bg-slatebrand-700"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-3xl border border-slatebrand-700 bg-slatebrand-800/70 p-5">
        <p className="text-sm font-semibold text-white">Quick Revision Tip</p>
        <p className="mt-2 text-sm leading-6 text-slatebrand-200">
          Alternate between topic-wise practice and previous year sets to improve both accuracy and recall speed.
        </p>
      </div>
    </aside>
  );
}
