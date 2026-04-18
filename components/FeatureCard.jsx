import Link from "next/link";

export default function FeatureCard({ title, description, href, cta }) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-slate-100 hover:bg-slate-900 transition">

      <p className="text-xs font-semibold text-amber-400">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-400 leading-5">
        {description}
      </p>

      <Link
        href={href}
        className="mt-2 inline-block text-xs font-semibold text-white underline"
      >
        {cta}
      </Link>

    </article>
  );
}