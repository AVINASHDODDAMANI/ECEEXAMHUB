export default function PageBanner({
  eyebrow,
  title,
  description,
  metrics = [],
}) {
  return (
    <section className="rounded-2xl border border-portal-200 bg-gradient-to-r from-[#f7fbff] to-[#eef5ff] px-4 py-4 shadow-portal sm:px-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-portal-600">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
          {description ? (
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
          ) : null}
        </div>

        {metrics.length ? (
          <div className="grid gap-2.5 sm:grid-cols-3">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="min-w-[120px] rounded-xl border border-portal-200 bg-white px-3.5 py-2.5 shadow-sm"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-1 text-lg font-bold text-portal-700">{item.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
