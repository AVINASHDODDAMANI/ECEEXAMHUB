import Link from "next/link";

export default function FeatureCard({ title, description, href, cta }) {
  return (
    <article className="group rounded-[1.8rem] border border-slate-800/80 bg-slate-950/90 p-6 text-slate-100 transition duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/95">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
            {title}
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {description}
          </p>
        </div>
        <div className="mt-auto">
          <Link
            href={href}
            className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            {cta}
          </Link>
        </div>
      </div>
    </article>
  );
}
