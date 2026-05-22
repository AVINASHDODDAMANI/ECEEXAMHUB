import Link from "next/link";

export function EducationalBulletList({ items = [], bulletClassName = "bg-portal-600" }) {
  if (!items.length) {
    return null;
  }

  return (
    <ul className="mt-3 grid min-w-0 gap-2 text-sm leading-7 text-slate-700 sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex min-w-0 gap-2.5">
          <span className={`mt-2.5 h-1.5 w-1.5 flex-none rounded-full ${bulletClassName}`} />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function EducationalFormulaGrid({ formulas = [] }) {
  if (!formulas.length) {
    return null;
  }

  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {formulas.map((formula) => (
        <article key={formula.label} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">
            {formula.label}
          </h3>
          <p className="mt-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-950 sm:text-base">
            {formula.expression}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{formula.note}</p>
        </article>
      ))}
    </div>
  );
}

export function EducationalExampleCard({ example }) {
  if (!example) {
    return null;
  }

  return (
    <article className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <h3 className="text-base font-black text-slate-950">{example.title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-700">{example.prompt}</p>
      {example.steps?.length ? (
        <div className="mt-3 grid gap-2">
          {example.steps.map((step) => (
            <div key={step} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-700">
              {step}
            </div>
          ))}
        </div>
      ) : null}
      {example.answer ? (
        <div className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800">
          Answer: {example.answer}
        </div>
      ) : null}
    </article>
  );
}

export function EducationalInfoCard({ title, children, tone = "slate" }) {
  const toneClassName =
    tone === "amber"
      ? "border-amber-200 bg-amber-50/70"
      : tone === "emerald"
      ? "border-emerald-200 bg-emerald-50"
      : "border-slate-200 bg-slate-50";
  const titleClassName =
    tone === "amber"
      ? "text-amber-800"
      : tone === "emerald"
      ? "text-emerald-800"
      : "text-slate-500";

  return (
    <div className={`rounded-2xl border p-4 ${toneClassName}`}>
      <h3 className={`text-sm font-black uppercase tracking-[0.12em] ${titleClassName}`}>
        {title}
      </h3>
      <div className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{children}</div>
    </div>
  );
}

export function EducationalTopicSection({ id, title, children }) {
  return (
    <section
      id={id}
      className="min-w-0 scroll-mt-28 overflow-hidden rounded-[26px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
      <div className="mt-3 min-w-0 text-sm leading-7 text-slate-700 sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function EducationalTheoryLayout({
  eyebrow,
  title,
  summary,
  breadcrumbs = [],
  menu,
  metrics = [],
  sections = [],
  footer,
  navLabel,
  containerClassName = "max-w-[1440px]",
}) {
  return (
    <div className={`mx-auto min-w-0 pb-20 ${containerClassName}`}>
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex flex-col gap-3 pt-1 sm:flex-row sm:items-start sm:justify-between"
      >
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          {breadcrumbs.map((item, index) => (
            <li key={`${item.label}-${index}`} className="contents">
              {index > 0 ? <span className="text-slate-300">/</span> : null}
              {item.href ? (
                <Link href={item.href} className="font-medium text-slate-600 transition hover:text-portal-700">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-portal-700">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
        {menu}
      </nav>

      <header className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
          {summary}
        </p>
        {metrics.length ? (
          <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="font-bold text-slate-950">{metric.label}</p>
                <p className="mt-1 leading-6">{metric.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </header>

      <nav
        aria-label={navLabel || `${title} topic sections`}
        className="sticky top-20 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur"
      >
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-portal-200 hover:bg-portal-50 hover:text-portal-700"
            >
              {section.navLabel || section.title}
            </a>
          ))}
        </div>
      </nav>

      <article className="mt-5 grid gap-5">
        {sections.map((section) => (
          <EducationalTopicSection key={section.id} id={section.id} title={section.title}>
            {section.children}
          </EducationalTopicSection>
        ))}
      </article>

      {footer ? <div className="mt-5">{footer}</div> : null}
    </div>
  );
}
